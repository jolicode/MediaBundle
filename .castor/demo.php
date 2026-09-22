<?php

namespace demo;

use Castor\Attribute\AsListener;
use Castor\Attribute\AsTask;
use Castor\Docker\Event\DockerComposeBuilderEvent;
use Castor\Docker\Event\RegisterServiceEvent;
use Castor\Docker\Service\PhpMode;
use Castor\Docker\Service\PostgresService;
use Castor\Docker\Service\SymfonyService;
use Castor\Event\FunctionsResolvedEvent;
use Symfony\Component\Process\Process;

use function Castor\Docker\about;
use function Castor\Docker\build;
use function Castor\Docker\docker_compose_run;
use function Castor\Docker\up;
use function Castor\io;
use function Castor\notify;
use function Castor\watch;

const APPLICATION_DIR = '/var/www/demo/application';

/**
 * The whole repository is mounted in the containers, so that the demo application
 * can require the local bundle through a Composer path repository (see install()).
 */
#[AsListener(RegisterServiceEvent::class)]
function register_services(RegisterServiceEvent $event): void
{
    $postgres = (new PostgresService())->withVersion('16');
    $event->addService($postgres);

    $event->addService(
        (new SymfonyService('demo'))
            ->withDirectory(\dirname(__DIR__))
            ->withWorkingDirectory('demo/application')
            ->withVersion('8.4')
            ->withMode(PhpMode::Fpm)
            ->withDockerfile(\dirname(__DIR__) . '/demo/Dockerfile')
            ->withDatabaseService($postgres)
            ->withDomain('jolimediabundle-demo.test')
            ->addExtension('imagick')
            ->withPhpStanVersion('^2.2.6')
            ->addPhpStanExtraDependency('phpstan/extension-installer', '^1.4.3')
            ->addPhpStanExtraDependency('phpstan/phpstan-deprecation-rules', '^2.0.5')
            ->addPhpStanExtraDependency('phpstan/phpstan-symfony', '^2.0.20')
            ->withPhpCsFixerVersion('^3.95.17')
            ->withRectorVersion('^2.5.8')
            ->withPhpTwigCsFixerVersion('^4.0.2')
    );
}

/**
 * Exposes demo/docker to the build, as the "@extra" Twig namespace of
 * demo/Dockerfile
 */
#[AsListener(DockerComposeBuilderEvent::class)]
function complete_compose(DockerComposeBuilderEvent $event): void
{
    foreach (['demo', 'demo-builder'] as $service) {
        $event->builder->service($service)->build()->additionalContext('extra', \dirname(__DIR__) . '/demo/docker');
    }
}

/**
 * Moves the tasks of castor-php/docker under the "demo:" namespace, and drops
 * their global aliases (up, build, about, ...). The negative priority makes it
 * run after the listener of the plugin, which is the one adding these tasks.
 */
#[AsListener(FunctionsResolvedEvent::class, priority: -100)]
function prefix_docker_tasks(FunctionsResolvedEvent $event): void
{
    $pluginDirectory = \dirname(__DIR__) . '/.castor/vendor/castor-php/docker/';

    foreach ($event->taskDescriptors as $descriptor) {
        $file = $descriptor->function->getFileName();
        $namespace = $descriptor->taskAttribute->namespace;

        if (false === $file || !str_starts_with($file, $pluginDirectory) || null === $namespace || str_starts_with($namespace, 'demo')) {
            continue;
        }

        $descriptor->taskAttribute->namespace = 'demo:' . $namespace;
        $descriptor->taskAttribute->aliases = [];
    }
}

#[AsTask(description: 'Builds and starts the infrastructure, then installs the demo application', namespace: 'demo')]
function start(): void
{
    io()->title('Starting the demo stack');

    build();
    up();
    install();

    io()->title('Migrating the database schema');
    demo_run(['bin/console', 'doctrine:database:create', '--if-not-exists']);
    demo_run(['bin/console', 'doctrine:migration:migrate', '-n', '--allow-no-migration', '--all-or-nothing']);

    notify('The demo stack is now up and running.');
    io()->success('The demo stack is now up and running.');

    about();
}

#[AsTask(name: 'install', description: 'Installs the demo application (composer, yarn, ...), using the local bundle', namespace: 'demo:app')]
function install(bool $useLocalBundle = true): void
{
    io()->title('Installing the demo application');

    $basePath = \dirname(__DIR__) . '/demo/application';

    if (is_file("{$basePath}/composer.json")) {
        $environment = [];

        if ($useLocalBundle) {
            io()->section('Build a custom composer.json file to use the local JoliMediaBundle');
            $composerJson = json_decode((string) file_get_contents("{$basePath}/composer.json"), true, 512, \JSON_THROW_ON_ERROR);
            $composerJson['require']['jolicode/media-bundle'] = '*';
            $composerJson['minimum-stability'] = 'dev';
            $composerJson['repositories'] = [
                [
                    'type' => 'path',
                    // the repository root, both on the host and in the containers
                    'url' => '../..',
                    'options' => [
                        'symlink' => true,
                    ],
                ],
            ];
            file_put_contents(
                "{$basePath}/docker-composer.json",
                json_encode($composerJson, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_SLASHES) . "\n",
            );
            copy("{$basePath}/symfony.lock", "{$basePath}/docker-symfony.lock");

            // a docker-composer.lock older than composer.lock may no longer satisfy
            // the constraints, which makes composer install fail
            $dockerComposerLock = "{$basePath}/docker-composer.lock";

            if (is_file($dockerComposerLock) && filemtime($dockerComposerLock) < filemtime("{$basePath}/composer.lock")) {
                unlink($dockerComposerLock);
            }

            $environment = ['COMPOSER' => 'docker-composer.json'];
        }

        io()->section('Installing PHP dependencies');
        demo_run(['composer', 'install', '-n', '--prefer-dist', '--optimize-autoloader'], $environment);
    }

    if (is_file("{$basePath}/yarn.lock")) {
        io()->section('Installing Node.js dependencies');
        demo_run(['yarn', 'install', '--frozen-lockfile']);
    } elseif (is_file("{$basePath}/package.json")) {
        io()->section('Installing Node.js dependencies');

        if (is_file("{$basePath}/package-lock.json")) {
            demo_run(['npm', 'ci']);
        } else {
            demo_run(['npm', 'install']);
        }
    }

    if (is_file("{$basePath}/importmap.php")) {
        io()->section('Installing importmap');
        demo_run(['bin/console', 'importmap:install']);
    }
}

#[AsTask(name: 'watch', description: 'Watches the bundle assets and installs them in the demo application', namespace: 'demo:app:front')]
function front_watch(): void
{
    $root = \dirname(__DIR__);
    $lastCallTime = 0;

    watch([
        "{$root}/src/Bridge/EasyAdmin/public/...",
        "{$root}/src/Bridge/SonataAdmin/public/...",
        "{$root}/src/Bridge/Sylius/public/...",
    ], static function (string $file, string $action) use (&$lastCallTime): void {
        $currentTime = time();

        if ($currentTime - $lastCallTime < 2) {
            return;
        }

        io()->title('Updated media bundle assets...');
        demo_run(['bin/console', 'assets:install']);
        $lastCallTime = $currentTime;
    });
}

/**
 * @param string|list<string>   $command
 * @param array<string, string> $environment
 */
function demo_run(string|array $command, array $environment = []): Process
{
    return docker_compose_run($command, 'demo-builder', workDir: APPLICATION_DIR, environment: $environment);
}
