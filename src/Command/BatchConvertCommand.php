<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Command;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Process\Process;

#[AsCommand(
    name: 'joli:media:batch-convert',
    description: 'Generate media cache files',
)]
class BatchConvertCommand extends Command
{
    public function __construct(
        private readonly Converter $converter,
        private readonly LibraryContainer $libraries,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption(
                'path',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific path name to generate cache for. All the media files under this path will be converted',
                null
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to generate cache for',
                null
            )
            ->addOption(
                'variation',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific variation name to generate cache for',
                null
            )
            ->addOption(
                'parallelization',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass the number of parallel processes to use for the conversion. If set to 0, no parallelization will be used',
                0
            )
            ->addOption(
                'chunk-size',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass the number of files to process in each chunk when using parallelization. This is useful to optimize the usage of resources',
                10
            )
            ->addOption(
                'force',
                null,
                InputOption::VALUE_NONE,
                'Force the generation of the cache file, even if it already exists',
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $ioStyle = new SymfonyStyle($input, $output);

        if (null === $input->getOption('library')) {
            $libraries = $this->libraries->list();
        } else {
            $libraryName = $input->getOption('library');
            $libraries = [$libraryName => $this->libraries->get($libraryName)];
        }

        foreach ($libraries as $libraryName => $library) {
            $mediaPaths = $library->getOriginalStorage()->listFiles($input->getOption('path'));
            $progressBar = $ioStyle->createProgressBar(\count($mediaPaths));
            $progressBar->setFormat(ProgressBar::getFormatDefinition(ProgressBar::FORMAT_VERY_VERBOSE) . ' %message%');
            $progressBar->setMessage('Starting');
            $progressBar->start();

            if ((int) $input->getOption('parallelization') > 0) {
                $pool = new ConversionPool(
                    $libraryName,
                    (int) $input->getOption('parallelization'),
                    (int) $input->getOption('chunk-size'),
                    $input->getOption('variation'),
                    $input->getOption('force'),
                    $progressBar,
                );
            }

            foreach ($mediaPaths as $mediaPath) {
                if (isset($pool)) {
                    $pool->add($mediaPath);
                } else {
                    try {
                        $this->converter->convert(
                            $mediaPath,
                            $libraryName,
                            $input->getOption('variation'),
                            $input->getOption('force'),
                        );
                    } catch (\Exception $e) {
                        $ioStyle->newLine();
                        $ioStyle->newLine();
                        $ioStyle->error(\sprintf('There was an exception during the conversion of the file "%s" from the library "%s"',
                            $mediaPath,
                            $libraryName,
                        ));
                        $ioStyle->error(
                            $e->getMessage(),
                        );

                        return Command::FAILURE;
                    }

                    $progressBar->advance();
                }
            }

            if (isset($pool)) {
                $ioStyle->info(\sprintf('Running %d processes in parallel for the library "%s"', $input->getOption('parallelization'), $libraryName));
                $pool->run();
            }

            $progressBar->finish();
            $ioStyle->newLine();
            $ioStyle->newLine();
            $ioStyle->success(\sprintf('All the processable files have been converted in the library "%s"', $libraryName));
        }

        return Command::SUCCESS;
    }
}

class ConversionPool
{
    /** @var string[] */
    private array $pool = [];

    /** @var array{process: Process, count: int}[] */
    private array $runningProcesses = [];

    public function __construct(
        private readonly string $libraryName,
        private readonly int $parallelization,
        private readonly int $chunkSize,
        private readonly ?string $variation,
        private readonly bool $force,
        private readonly ProgressBar $progressBar,
    ) {
    }

    public function add(string $path): void
    {
        $this->pool[] = $path;
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
        foreach ($this->runningProcesses as $key => $process) {
            if ($process['process']->isTerminated()) {
                $this->progressBar->advance($process['count']);
                unset($this->runningProcesses[$key]);
            }
        }
    }

    private function startNewProcess(): void
    {
        $paths = array_splice($this->pool, 0, $this->chunkSize);

        if ([] === $paths) {
            return;
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

        foreach ($paths as $path) {
            $arguments[] = $path;
        }

        $this->progressBar->setMessage($path);
        $process = new Process($arguments);
        $process->setTimeout(0); // No timeout

        $this->startProcess($process, \count($paths));
    }

    private function startProcess(Process $process, int $count): void
    {
        $this->runningProcesses[] = [
            'process' => $process,
            'count' => $count,
        ];
        $process->start();
    }
}
