<?php

use Castor\Attribute\AsTask;

use function Castor\context;
use function Castor\guard_min_version;
use function Castor\import;
use function Castor\io;
use function Castor\notify;
use function Castor\variable;
use function demo\docker\about;
use function demo\docker\build;
use function demo\docker\docker_compose_run;
use function demo\docker\up;

guard_min_version('0.26.0');

import(__DIR__ . '/.castor');

/**
 * @return array{project_name: string, root_domain: string, extra_domains: string[], php_version: string}
 */
function create_default_variables(): array
{
    $projectName = 'jolimediabundle-demo';
    $tld = 'test';

    return [
        'project_name' => $projectName,
        'root_domain' => "{$projectName}.{$tld}",
        'extra_domains' => [],
        'php_version' => '8.4',
        'registry' => 'ghcr.io/jolicode/media-bundle',
    ];
}

#[AsTask(description: 'Builds and starts the infrastructure, then install the application (composer, yarn, ...)')]
function start(): void
{
    io()->title('Starting the stack');

    build();
    install();
    up(profiles: ['default']); // We can't start worker now, they are not installed
    migrate();

    notify('The stack is now up and running.');
    io()->success('The stack is now up and running.');

    about();
}

#[AsTask(description: 'Installs the application (composer, yarn, ...)', namespace: 'app')]
function install(): void
{
    io()->title('Installing the application');

    $basePath = sprintf('%s/application', variable('root_dir'));

    if (is_file("{$basePath}/composer.json")) {
        io()->section('Build a custom composer.json file to use the local JoliMediaBundle');
        $composerJson = json_decode(file_get_contents("{$basePath}/composer.json"), true, 512, JSON_THROW_ON_ERROR);
        $composerJson['require']['jolicode/media-bundle'] = '*';
        $composerJson['minimum-stability'] = 'dev';
        $composerJson['repositories'] = [
            [
                'type' => 'path',
                'url' => '/var/MediaBundle',
                'options' => [
                    'symlink' => true,
                ],
            ],
        ];
        file_put_contents(
            "{$basePath}/docker-composer.json",
            json_encode($composerJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n",
        );
        copy("{$basePath}/symfony.lock", "{$basePath}/docker-symfony.lock");

        io()->section('Installing PHP dependencies');
        docker_compose_run('COMPOSER=docker-composer.json composer install -n --prefer-dist --optimize-autoloader');
    }
    if (is_file("{$basePath}/yarn.lock")) {
        io()->section('Installing Node.js dependencies');
        docker_compose_run('yarn install --frozen-lockfile');
    } elseif (is_file("{$basePath}/package.json")) {
        io()->section('Installing Node.js dependencies');

        if (is_file("{$basePath}/package-lock.json")) {
            docker_compose_run('npm ci');
        } else {
            docker_compose_run('npm install');
        }
    }
    if (is_file("{$basePath}/importmap.php")) {
        io()->section('Installing importmap');
        docker_compose_run('bin/console importmap:install');
    }
}

#[AsTask(name: 'watch', description: 'Watch the frontend changes', namespace: 'app:front')]
function front_watch(): void
{
    $lastCallTime = 0;
    \Castor\watch([
        '../src/Bridge/EasyAdmin/public/...',
        '../src/Bridge/SonataAdmin/public/...',
    ], function (string $file, string $action) use (&$lastCallTime) {
        $currentTime = time();

        if ($currentTime - $lastCallTime < 2) {
            return;
        }

        io()->title('Updated media bundle assets...');
        docker_compose_run('bin/console assets:install');
        $lastCallTime = $currentTime;
    });
}


#[AsTask(description: 'Clears the application cache', namespace: 'app')]
function cache_clear(bool $warm = true): void
{
    io()->title('Clearing the application cache');

    docker_compose_run('rm -rf var/cache/');

    if ($warm) {
        cache_warmup();
    }
}

#[AsTask(description: 'Warms the application cache', namespace: 'app')]
function cache_warmup(): void
{
    io()->title('Warming the application cache');

    docker_compose_run('bin/console cache:warmup', c: context()->withAllowFailure());
}

#[AsTask(description: 'Migrates database schema', namespace: 'app:db')]
function migrate(): void
{
    io()->title('Migrating the database schema');

    docker_compose_run('bin/console doctrine:database:create --if-not-exists');
    docker_compose_run('bin/console doctrine:migration:migrate -n --allow-no-migration --all-or-nothing');
}

#[AsTask(namespace: 'app:db', description: 'Generate new migrate database schema')]
function make_migration(): void
{
    docker_compose_run('bin/console make:migration');
}

#[AsTask(description: 'Loads fixtures', namespace: 'app:db')]
function fixtures(): void
{
    io()->title('Loads fixtures');

    docker_compose_run('bin/console doctrine:fixture:load -n');
}
