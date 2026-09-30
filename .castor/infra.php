<?php

namespace infra;

use Castor\Attribute\AsOption;
use Castor\Attribute\AsTask;
use Castor\Context;
use Symfony\Component\Process\Process;

use function Castor\context;
use function Castor\exit_code;
use function Castor\io;
use function Castor\log;
use function Castor\run as castor_run;

const DEFAULT_PHP_VERSION = '8.2';

const S3_IMAGE = 'rustfs/rustfs:1.0.0';

const S3_NETWORK = 'jolimediabundle-tests';

const S3_CONTAINER = 'jolimediabundle-tests-s3';

const S3_ENVIRONMENT = [
    'S3_ENDPOINT' => 'http://' . S3_CONTAINER . ':9000',
    'S3_ACCESS_KEY' => 'joli-media',
    'S3_SECRET_KEY' => 'joli-media-secret',
];

#[AsTask(description: 'Build the Docker image used by the backend, frontend and qa tasks')]
function build(
    #[AsOption(description: 'PHP version to use')]
    ?string $phpVersion = null,
    #[AsOption(description: 'Push new image layers')]
    bool $push = false,
): int {
    $phpVersion ??= DEFAULT_PHP_VERSION;
    io()->title(\sprintf('Building the Docker image for PHP %s', $phpVersion));
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

    $exitCode = exit_code(\sprintf(
        'docker build -t %s --build-arg USER_ID=%s --cache-from=type=registry,ref=%s --pull --build-arg PHP_VERSION=%s %s %s',
        getImageName($phpVersion),
        $userId,
        getImageName($phpVersion),
        $phpVersion,
        $push ? ' --build-arg BUILDKIT_INLINE_CACHE=1 --push' : '',
        realpath(__DIR__ . '/../tests/infrastructure'),
    ), context: context()->withTimeout(null));

    if (0 === $exitCode) {
        io()->success(\sprintf('The Docker image for PHP %s has been built.', $phpVersion));
    } else {
        io()->error('The Docker image could not be built.');
    }

    return $exitCode;
}

#[AsTask(name: 's3:start', description: 'Start the S3-compatible server used by the tests')]
function s3_start(
    #[AsOption(description: 'PHP version to use')]
    ?string $phpVersion = null,
): void {
    io()->title('Starting the S3 server');
    $quiet = context()->withAllowFailure(true)->withQuiet(true);

    if (!castor_run(['docker', 'network', 'inspect', S3_NETWORK], context: $quiet)->isSuccessful()) {
        castor_run(['docker', 'network', 'create', S3_NETWORK], context: context()->withQuiet(true));
    }

    $running = castor_run(['docker', 'container', 'inspect', '-f', '{{.State.Running}}', S3_CONTAINER], context: $quiet);

    if ('true' === trim($running->getOutput())) {
        io()->text(\sprintf('The %s container is already running.', S3_CONTAINER));
    } else {
        if (!castor_run(['docker', 'image', 'inspect', S3_IMAGE], context: $quiet)->isSuccessful()) {
            io()->text(\sprintf('Downloading the %s image...', S3_IMAGE));
            castor_run(['docker', 'pull', S3_IMAGE], context: context()->withTimeout(null));
        }

        io()->text(\sprintf('Starting the %s container...', S3_CONTAINER));
        castor_run(['docker', 'rm', '-f', S3_CONTAINER], context: $quiet);
        castor_run([
            'docker', 'run', '-d',
            '--name', S3_CONTAINER,
            '--network', S3_NETWORK,
            '-e', 'RUSTFS_ACCESS_KEY=' . S3_ENVIRONMENT['S3_ACCESS_KEY'],
            '-e', 'RUSTFS_SECRET_KEY=' . S3_ENVIRONMENT['S3_SECRET_KEY'],
            '--tmpfs', '/data:uid=10001,gid=10001',
            '--tmpfs', '/logs:uid=10001,gid=10001',
            S3_IMAGE,
            '/data',
        ], context: $quiet);
    }

    $ready = docker_exit_code(
        \sprintf('sh -c \'for i in $(seq 30); do curl -sf %s/health/ready >/dev/null && exit 0; sleep 1; done; exit 1\'', S3_ENVIRONMENT['S3_ENDPOINT']),
        $quiet,
        $phpVersion,
        network: S3_NETWORK,
    );

    if (0 !== $ready) {
        throw new \RuntimeException(\sprintf('The S3 server did not start, see "docker logs %s". Run the tests with "--exclude-group s3" to skip the S3 tests.', S3_CONTAINER));
    }

    io()->success('The S3 server is ready.');
}

#[AsTask(name: 's3:stop', description: 'Stop the S3-compatible server used by the tests')]
function s3_stop(): void
{
    io()->title('Stopping the S3 server');
    $quiet = context()->withAllowFailure(true)->withQuiet(true);

    if (!castor_run(['docker', 'container', 'inspect', S3_CONTAINER], context: $quiet)->isSuccessful()) {
        io()->success('The S3 server is not running.');

        return;
    }

    castor_run(['docker', 'rm', '-f', S3_CONTAINER], context: $quiet);
    io()->success('The S3 server has been stopped.');
}

#[AsTask(description: 'Open a shell (bash) into the Docker image')]
function shell(?string $phpVersion = null): void
{
    $c = context()
        ->withTimeout(null)
        ->withTty()
        ->withEnvironment($_ENV + $_SERVER)
        ->withAllowFailure()
    ;
    docker_run('bash', $c, $phpVersion);
}

/**
 * @param array<string, string> $environment
 */
function docker_exit_code(
    string $runCommand,
    ?Context $c = null,
    ?string $phpVersion = null,
    ?string $workDir = null,
    ?string $network = null,
    array $environment = [],
): int {
    $c = ($c ?? context())->withAllowFailure();

    $process = docker_run(
        runCommand: $runCommand,
        c: $c,
        phpVersion: $phpVersion,
        workDir: $workDir,
        network: $network,
        environment: $environment,
    );

    return $process->getExitCode() ?? 0;
}

/**
 * @param array<string, string> $environment
 */
function docker_run(
    string $runCommand,
    ?Context $c = null,
    ?string $phpVersion = null,
    ?string $workDir = null,
    ?string $network = null,
    array $environment = [],
): Process {
    $phpVersion ??= DEFAULT_PHP_VERSION;
    $c ??= context();
    $c = $c->withTimeout(null);

    $process = castor_run(\sprintf(
        'docker image inspect %s',
        getImageName($phpVersion),
    ), context: context()->withAllowFailure(true)->withQuiet(true));

    if (false === $process->isSuccessful()) {
        throw new \LogicException(\sprintf('Unable to find %s image. Did you forget to run castor infra:build ?', getImageName($phpVersion)));
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

    if (null !== $network) {
        $command[] = '--network';
        $command[] = $network;
    }

    foreach ($environment as $name => $value) {
        $command[] = '-e';
        $command[] = \sprintf('%s=%s', $name, $value);
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
