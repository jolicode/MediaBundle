<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Command\Cache;

use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'joli:media:cache:remove',
    description: 'Remove media cache files',
)]
class RemoveCommand extends Command
{
    public function __construct(
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
                'Pass a specific path name to remove cache from. All the cache files associated with media under this path will be removed'
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to remove cache from'
            )
            ->addOption(
                'variation',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific variation name to remove cache from'
            )
            ->addOption(
                'force',
                null,
                InputOption::VALUE_NONE,
                'Force the removal of the cache files. If not set, the command will output the list of the files that would be removed',
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
            $removedFiles = [];

            if (null === $input->getOption('variation')) {
                $variations = $library->getVariationContainer()->list();
            } else {
                $variationName = $input->getOption('variation');

                if (!$library->hasVariation($variationName)) {
                    $ioStyle->info(\sprintf('Variation "%s" not found in the library "%s", skipping', $variationName, $libraryName));

                    continue;
                }

                $variations = [$variationName => $library->getVariation($variationName)];
            }

            $mediaPaths = $library->getOriginalStorage()->listFiles($input->getOption('path'));

            $progressBar = $ioStyle->createProgressBar(\count($mediaPaths));
            $progressBar->setFormat(ProgressBar::getFormatDefinition(ProgressBar::FORMAT_VERY_VERBOSE) . ' %message%');
            $progressBar->setMessage('Starting');
            $progressBar->start();

            foreach ($mediaPaths as $mediaPath) {
                $progressBar->setMessage($mediaPath);
                $progressBar->advance();

                foreach ($variations as $variation) {
                    if (!$library->getCacheStorage()->has($mediaPath, $variation)) {
                        continue;
                    }

                    if ($input->getOption('force')) {
                        $library->getCacheStorage()->delete($mediaPath, $variation);
                    }

                    $removedFiles[] = $library->getCacheStorage()->getPath($mediaPath, $variation);
                }
            }

            $progressBar->finish();
            $ioStyle->newLine();
            $ioStyle->newLine();

            if ($input->getOption('force')) {
                $ioStyle->success(\sprintf('%d cache files have been removed in the library "%s"', \count($removedFiles), $libraryName));
            } else {
                $ioStyle->section(\sprintf(
                    '%d cache files would be removed in the library "%s". Pass the option --force to actually remove these files.',
                    \count($removedFiles),
                    $libraryName,
                ));
                sort($removedFiles);
                $ioStyle->listing($removedFiles);
            }
        }

        return Command::SUCCESS;
    }
}
