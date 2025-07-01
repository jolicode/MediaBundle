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

#[AsCommand(
    name: 'joli:media:convert',
    description: 'Generate media cache files',
)]
class ConvertCommand extends Command
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
                'Pass a specific filter name to generate cache for',
                1
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

            $hasParallelization = (int) $input->getOption('parallelization') > 1;

            if ($hasParallelization) {
                $ioStyle->error('Parallelization is not supported yet.');

                return Command::FAILURE;
            }

            foreach ($mediaPaths as $mediaPath) {
                $progressBar->setMessage($mediaPath);

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

            $progressBar->finish();
            $ioStyle->newLine();
            $ioStyle->newLine();
            $ioStyle->success(\sprintf('All the processable files have been converted in the library "%s"', $libraryName));
        }

        return Command::SUCCESS;
    }
}
