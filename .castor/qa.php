<?php

namespace qa;

use Castor\Attribute\AsRawTokens;
use Castor\Attribute\AsTask;

use function Castor\context;
use function Castor\exit_code;
use function Castor\io;
use function docker\docker_exit_code;
use function docker\docker_run;

#[AsTask(description: 'Runs all QA tasks', aliases: ['qa'])]
function all(): int
{
    install();
    $rector = rector();
    $cs = cs();
    $phpstan = phpstan();
    $twigCs = twig_cs();
    $phpunit = phpunit();
    $doctorRst = doctor_rst();

    return max($rector, $cs, $phpstan, $twigCs, $phpunit, $doctorRst);
}

#[AsTask(description: 'Installs tooling')]
function install(): void
{
    docker_run('composer install -o', workDir: '/home/app/tools/php-cs-fixer');
    docker_run('composer install -o', workDir: '/home/app/tools/phpstan');
    docker_run('composer install -o', workDir: '/home/app/tools/rector');
    docker_run('composer install -o', workDir: '/home/app/tools/twig-cs-fixer');
}

#[AsTask(description: 'Updates the tooling')]
function update(): void
{
    docker_run('composer update -o', workDir: '/home/app/tools/php-cs-fixer');
    docker_run('composer update -o', workDir: '/home/app/tools/phpstan');
    docker_run('composer update -o', workDir: '/home/app/tools/rector');
    docker_run('composer update -o', workDir: '/home/app/tools/twig-cs-fixer');
}

#[AsTask(description: 'Fixes Coding Style', aliases: ['cs'])]
function cs(bool $dryRun = false): int
{
    if (!is_dir(__DIR__ . '/../tools/php-cs-fixer/vendor')) {
        io()->error('PHP-CS-Fixer is not installed. Run `castor qa:install` first.');

        return 1;
    }

    return docker_exit_code('php-cs-fixer fix' . ($dryRun ? ' --dry-run --diff' : ''), workDir: '/home/app');
}

#[AsTask(description: 'Runs PHPStan', aliases: ['phpstan'])]
function phpstan(bool $baseline = false): int
{
    if (!is_dir(__DIR__ . '/../tools/phpstan/vendor')) {
        io()->error('PHPStan is not installed. Run `castor qa:install` first.');

        return 1;
    }

    $command = \sprintf('phpstan --memory-limit=-1 --configuration=%s%s', '%s', $baseline ? ' --generate-baseline' : '');

    return max(
        docker_exit_code(\sprintf($command, 'phpstan.neon'), workDir: '/home/app'),
        docker_exit_code(\sprintf($command, 'phpstan-castor.neon'), workDir: '/home/app'),
    );
}

/**
 * @param string[] $rawTokens
 */
#[AsTask(description: 'Runs PHPUnit tests', aliases: ['phpunit'])]
function phpunit(?string $phpVersion = null, #[AsRawTokens] array $rawTokens = []): int
{
    $filteredTokens = $rawTokens;

    if (null !== $phpVersion) {
        $filteredTokens = [];
        $removeNextToken = false;

        foreach ($rawTokens as $token) {
            if ('--php-version' === $token) {
                $removeNextToken = true;

                continue;
            }

            if ($removeNextToken || str_starts_with($token, '--php-version=')) {
                continue;
            }

            $filteredTokens[] = $token;
            $removeNextToken = false;
        }
    }

    docker_run('composer update -n --prefer-dist --optimize-autoloader', null, $phpVersion);

    return docker_exit_code('vendor/bin/phpunit tests/src' . implode(' ', $filteredTokens), null, $phpVersion);
}

#[AsTask(description: 'Run the rector upgrade')]
function rector(bool $dryRun = false): int
{
    if (!is_dir(__DIR__ . '/../tools/rector/vendor')) {
        io()->error('rector is not installed. Run `castor qa:install` first.');

        return 1;
    }

    return docker_exit_code('rector process' . ($dryRun ? ' --dry-run' : ''), workDir: '/home/app');
}

#[AsTask(description: 'Fix twig files')]
function twig_cs(bool $dryRun = false): int
{
    if (!is_dir(__DIR__ . '/../tools/twig-cs-fixer/vendor')) {
        io()->error('Twig-CS-Fixer is not installed. Run `castor qa:install` first.');

        return 1;
    }

    return docker_exit_code('twig-cs-fixer' . ($dryRun ? '' : ' --fix'), workDir: '/home/app');
}

#[AsTask(description: 'Lint the docs')]
function doctor_rst(?string $errorFormat = null): int
{
    $command = [
        'docker',
        'run',
        '--rm',
        '-it',
        '--pull',
        'always',
        '-e',
        'DOCS_DIR=/doc',
        '-v',
        './doc:/doc',
        'oskarstark/doctor-rst:latest',
        '--short',
    ];

    if (null !== $errorFormat) {
        $command[] = '--error-format=' . $errorFormat;
    }

    return exit_code(
        $command,
        context: context()->withWorkingDirectory(\dirname(__DIR__)),
    );
}
