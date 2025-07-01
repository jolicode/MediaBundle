<?php

namespace docker;

use Castor\Attribute\AsOption;
use Castor\Attribute\AsTask;
use Castor\Context;
use Symfony\Component\Process\Process;

use function Castor\context;
use function Castor\exit_code;
use function Castor\io;
use function Castor\log;
use function Castor\run as castor_run;

const DEFAULT_PHP_VERSION = '8.3';

#[AsTask(description: 'Build the test infrastructure')]
function build(
    #[AsOption(description: 'PHP version to use')]
    ?string $phpVersion = null,
    #[AsOption(description: 'Push new image layers')]
    bool $push = false,
): int {
    $phpVersion ??= DEFAULT_PHP_VERSION;
    $userId = posix_geteuid();

    if ($userId > 256000) {
        $userId = 1000;
    }

    if (0 === $userId) {
        log('Running as root? Fallback to fake user id.', 'warning');
        $userId = 1000;
    }

    if (!isLoggedInGhcr()) {
        if ($push) {
            io()->error('You are not logged in to ghcr.io, so you cannot push the image.');

            return 1;
        }
        io()->warning('You should log in to ghcr.io, so you can pull a prebuilt image.');
    }

    return exit_code(\sprintf(
        'docker build -t %s --build-arg USER_ID=%s --cache-from=type=registry,ref=%s --pull --build-arg PHP_VERSION=%s %s %s',
        getImageName($phpVersion),
        $userId,
        getImageName($phpVersion),
        $phpVersion,
        $push ? ' --build-arg BUILDKIT_INLINE_CACHE=1 --push' : '',
        realpath(__DIR__ . '/../tests/infrastructure'),
    ), context: context()->withTimeout(null));
}

#[AsTask(description: 'Open a shell (bash) into the tests container')]
function builder(?string $phpVersion = null): void
{
    $c = context()
        ->withTimeout(null)
        ->withTty()
        ->withEnvironment($_ENV + $_SERVER)
        ->withAllowFailure()
    ;
    docker_run('bash', $c, $phpVersion);
}

function docker_exit_code(
    string $runCommand,
    ?Context $c = null,
    ?string $phpVersion = null,
    ?string $workDir = null,
): int {
    $c = ($c ?? context())->withAllowFailure();

    $process = docker_run(
        runCommand: $runCommand,
        c: $c,
        phpVersion: $phpVersion,
        workDir: $workDir,
    );

    return $process->getExitCode() ?? 0;
}

function docker_run(
    string $runCommand,
    ?Context $c = null,
    ?string $phpVersion = null,
    ?string $workDir = null,
): Process {
    $phpVersion ??= DEFAULT_PHP_VERSION;
    $c ??= context();
    $c = $c->withTimeout(null);

    $process = castor_run(\sprintf(
        'docker image inspect %s',
        getImageName($phpVersion),
    ), context: context()->withAllowFailure(true)->withQuiet(true));

    if (false === $process->isSuccessful()) {
        throw new \LogicException(\sprintf('Unable to find %s image. Did you forget to run castor docker:build ?', getImageName($phpVersion)));
    }

    $command = [
        'docker',
        'run',
        '--init',
        '--rm',
    ];

    if (false === $c->quiet && ($c->tty || $c->pty)) {
        $command[] = '-i';
    }

    $command[] = '-t';
    $command[] = '-v';
    $command[] = \sprintf('%s:/home/app:cached', realpath(\dirname(__DIR__)));

    if (null !== $workDir) {
        $command[] = '-w';
        $command[] = $workDir;
    }

    $command[] = getImageName($phpVersion);
    $command[] = '/bin/sh';
    $command[] = '-c';
    $command[] = "exec {$runCommand}";

    return castor_run($command, context: $c);
}

function getImageName(string $phpVersion): string
{
    $path = realpath(__DIR__ . '/../tests/infrastructure/Dockerfile');

    if (false === $path) {
        throw new \RuntimeException('Unable to find the Dockerfile.');
    }

    return \sprintf(
        'ghcr.io/jolicode/joli-media-bundle/tests-%s:%s',
        $phpVersion,
        md5_file($path),
    );
}

function isLoggedInGhcr(): bool
{
    return castor_run('docker login ghcr.io', context: context()->withAllowFailure(true)->withPty(false)->withQuiet(true))->isSuccessful();
}
