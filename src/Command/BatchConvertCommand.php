<?php

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
                'Pass a specific path name to generate cache for. All the media files under this path will be converted'
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to generate cache for'
            )
            ->addOption(
                'variation',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific variation name to generate cache for'
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
        $hasFailures = false;

        if (null === $input->getOption('library')) {
            $libraries = $this->libraries->list();
        } else {
            $libraryName = $input->getOption('library');
            $libraries = [$libraryName => $this->libraries->get($libraryName)];
        }

        foreach ($libraries as $libraryName => $library) {
            $failures = [];
            $pool = null;
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
                if ($pool instanceof ConversionPool) {
                    $pool->add($mediaPath);
                } else {
                    try {
                        $this->converter->convert(
                            $mediaPath,
                            $libraryName,
                            $input->getOption('variation'),
                            $input->getOption('force'),
                        );
                    } catch (\Throwable $e) {
                        $failures[] = [
                            'paths' => [$mediaPath],
                            'exitCode' => null,
                            'errorOutput' => $e->getMessage(),
                        ];
                    }

                    $progressBar->advance();
                }
            }

            if ($pool instanceof ConversionPool) {
                $ioStyle->info(\sprintf('Running %d processes in parallel for the library "%s"', $input->getOption('parallelization'), $libraryName));
                $pool->run();
                $failures = array_merge($failures, $pool->getFailures());
            }

            $progressBar->finish();
            $ioStyle->newLine();
            $ioStyle->newLine();

            if ([] === $failures) {
                $ioStyle->success(\sprintf('All the processable files have been converted in the library "%s"', $libraryName));

                continue;
            }

            $hasFailures = true;
            $ioStyle->error(\sprintf(
                'Some files could not be converted in the library "%s":',
                $libraryName,
            ));

            foreach ($failures as $failure) {
                $ioStyle->writeln(\sprintf(
                    ' - %s%s',
                    implode(', ', $failure['paths']),
                    null !== $failure['exitCode'] ? \sprintf(' (exit code %d)', $failure['exitCode']) : '',
                ));

                if ('' !== $failure['errorOutput']) {
                    $ioStyle->writeln('   ' . str_replace("\n", "\n   ", $failure['errorOutput']));
                }
            }
        }

        return $hasFailures ? Command::FAILURE : Command::SUCCESS;
    }
}
