<?php

namespace qa;

use Castor\Attribute\AsRawTokens;
use Castor\Attribute\AsTask;

use function Castor\context;
use function Castor\exit_code;
use function Castor\io;
use function infra\docker_exit_code;
use function infra\docker_run;
use function infra\s3_start;

use const infra\S3_ENVIRONMENT;
use const infra\S3_NETWORK;

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

    if (!runs_s3_group($filteredTokens)) {
        return docker_exit_code('vendor/bin/phpunit ' . implode(' ', $filteredTokens), null, $phpVersion);
    }

    s3_start($phpVersion);

    return docker_exit_code('vendor/bin/phpunit ' . implode(' ', $filteredTokens), null, $phpVersion, network: S3_NETWORK, environment: S3_ENVIRONMENT);
}

/**
 * @param string[] $tokens
 */
function runs_s3_group(array $tokens): bool
{
    $groups = ['--group' => [], '--exclude-group' => []];

    foreach ($tokens as $i => $token) {
        foreach (array_keys($groups) as $option) {
            if ($option === $token && isset($tokens[$i + 1])) {
                array_push($groups[$option], ...explode(',', $tokens[$i + 1]));
            } elseif (str_starts_with($token, $option . '=')) {
                array_push($groups[$option], ...explode(',', substr($token, \strlen($option) + 1)));
            }
        }
    }

    if (\in_array('s3', $groups['--exclude-group'], true)) {
        return false;
    }

    return [] === $groups['--group'] || \in_array('s3', $groups['--group'], true);
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
