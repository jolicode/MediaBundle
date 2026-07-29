<?php

namespace JoliCode\MediaBundle\Command;

use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Process\Process;

class ConversionPool
{
    /**
     * @var string[]
     */
    private array $pool = [];

    /**
     * @var array{process: Process, paths: string[]}[]
     */
    private array $runningProcesses = [];

    /**
     * @var array{paths: string[], exitCode: int|null, errorOutput: string}[]
     */
    private array $failures = [];

    /**
     * @param (\Closure(string[]): Process)|null $processFactory
     */
    public function __construct(
        private readonly string $libraryName,
        private readonly int $parallelization,
        private readonly int $chunkSize,
        private readonly ?string $variation,
        private readonly bool $force,
        private readonly ProgressBar $progressBar,
        private readonly ?\Closure $processFactory = null,
    ) {
    }

    public function add(string $path): void
    {
        $this->pool[] = $path;
    }

    /**
     * @return array{paths: string[], exitCode: int|null, errorOutput: string}[]
     */
    public function getFailures(): array
    {
        return $this->failures;
    }

    public function hasFailures(): bool
    {
        return [] !== $this->failures;
    }

    public function run(): void
    {
        while ([] !== $this->pool) {
            $this->checkRunningProcesses();

            if ($this->canRunProcess()) {
                $this->startNewProcess();
            }

            usleep(10000);
        }

        // Wait for all processes to finish
        while ([] !== $this->runningProcesses) {
            $this->checkRunningProcesses();
            usleep(10000);
        }
    }

    private function canRunProcess(): bool
    {
        return \count($this->runningProcesses) < $this->parallelization;
    }

    private function checkRunningProcesses(): void
    {
        foreach ($this->runningProcesses as $key => $runningProcess) {
            $process = $runningProcess['process'];

            if ($process->isTerminated()) {
                if (!$process->isSuccessful()) {
                    $this->failures[] = [
                        'paths' => $runningProcess['paths'],
                        'exitCode' => $process->getExitCode(),
                        'errorOutput' => trim($process->getErrorOutput() . "\n" . $process->getOutput()),
                    ];
                }

                $this->progressBar->advance(\count($runningProcess['paths']));
                unset($this->runningProcesses[$key]);
            }
        }
    }

    /**
     * @param string[] $paths
     */
    private function createProcess(array $paths): Process
    {
        if ($this->processFactory instanceof \Closure) {
            return ($this->processFactory)($paths);
        }

        $arguments = [
            './bin/console',
            'joli:media:convert',
            '--library',
            $this->libraryName,
        ];

        if (null !== $this->variation) {
            $arguments[] = '--variation';
            $arguments[] = $this->variation;
        }

        if ($this->force) {
            $arguments[] = '--force';
        }

        $arguments[] = '--';

        foreach ($paths as $path) {
            $arguments[] = $path;
        }

        return new Process($arguments);
    }

    private function startNewProcess(): void
    {
        $paths = array_splice($this->pool, 0, $this->chunkSize);

        if ([] === $paths) {
            return;
        }

        $this->progressBar->setMessage($paths[0]);
        $process = $this->createProcess($paths);
        $process->setTimeout(0); // No timeout

        $this->runningProcesses[] = [
            'process' => $process,
            'paths' => $paths,
        ];
        $process->start();
    }
}
