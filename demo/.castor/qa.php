<?php

namespace demo\qa;

// use Castor\Attribute\AsRawTokens;
use Castor\Attribute\AsOption;
use Castor\Attribute\AsTask;

use function Castor\io;
use function Castor\variable;
use function demo\docker\docker_compose_run;
use function demo\docker\docker_exit_code;

#[AsTask(description: 'Runs all QA tasks', namespace: 'qa')]
function all(): int
{
    $cs = cs();
    $phpstan = phpstan();
    $rector = rector();
    $twigCs = twigCs();

    return max($cs, $phpstan, $twigCs, $rector);
}

#[AsTask(description: 'Installs tooling', namespace: 'qa')]
function install(): void
{
    io()->title('Installing QA tooling');

    docker_compose_run('composer install -o', workDir: '/var/www/tools/php-cs-fixer');
    docker_compose_run('composer install -o', workDir: '/var/www/tools/phpstan');
    docker_compose_run('composer install -o', workDir: '/var/www/tools/twig-cs-fixer');
    docker_compose_run('composer install -o', workDir: '/var/www/tools/rector');
}

#[AsTask(description: 'Updates tooling', namespace: 'qa')]
function update(): void
{
    io()->title('Updating QA tooling');

    docker_compose_run('composer update -o', workDir: '/var/www/tools/php-cs-fixer');
    docker_compose_run('composer update -o', workDir: '/var/www/tools/phpstan');
    docker_compose_run('composer update -o', workDir: '/var/www/tools/twig-cs-fixer');
    docker_compose_run('composer update -o', workDir: '/var/www/tools/rector');
}

// /**
//  * @param string[] $rawTokens
//  */
// #[AsTask(description: 'Runs PHPUnit', aliases: ['phpunit'])]
// function phpunit(#[AsRawTokens] array $rawTokens = []): int
// {
//     io()->section('Running PHPUnit...');
//
//     return docker_exit_code('bin/phpunit ' . implode(' ', $rawTokens));
// }

#[AsTask(description: 'Runs PHPStan', namespace: 'qa')]
function phpstan(
    #[AsOption(description: 'Generate baseline file', shortcut: 'b')]
    bool $baseline = false,
): int {
    if (!is_dir(variable('root_dir') . '/tools/phpstan/vendor')) {
        install();
    }

    io()->section('Running PHPStan...');

    $options = $baseline ? '--generate-baseline --allow-empty-baseline' : '';
    $command = \sprintf('phpstan analyse --memory-limit=-1 %s -v', $options);

    return docker_exit_code($command, workDir: '/var/www');
}

#[AsTask(description: 'Fixes Coding Style', namespace: 'qa')]
function cs(bool $dryRun = false): int
{
    if (!is_dir(variable('root_dir') . '/tools/php-cs-fixer/vendor')) {
        install();
    }

    io()->section('Running PHP CS Fixer...');

    if ($dryRun) {
        return docker_exit_code('php-cs-fixer fix --dry-run --diff', workDir: '/var/www');
    }

    return docker_exit_code('php-cs-fixer fix', workDir: '/var/www');
}

#[AsTask(description: 'Run the rector upgrade', namespace: 'qa')]
function rector(bool $dryRun = false): int
{
    if (!is_dir(variable('root_dir') . '/tools/rector/vendor')) {
        io()->error('rector is not installed. Run `castor qa:install` first.');

        return 1;
    }

    return docker_exit_code('rector process' . ($dryRun ? ' --dry-run' : ''), workDir: '/var/www/application');
}

#[AsTask(description: 'Fixes Twig Coding Style', namespace: 'qa')]
function twigCs(bool $dryRun = false): int
{
    if (!is_dir(variable('root_dir') . '/tools/twig-cs-fixer/vendor')) {
        install();
    }

    io()->section('Running Twig CS Fixer...');

    if ($dryRun) {
        return docker_exit_code('twig-cs-fixer', workDir: '/var/www');
    }

    return docker_exit_code('twig-cs-fixer --fix', workDir: '/var/www');
}
