<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Command\Cache;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'joli:media:cache:prune',
    description: 'Remove files in the media cache storage, that are not associated with any media from the original storage',
)]
class PruneCommand extends Command
{
    public function __construct(
        private readonly Resolver $resolver,
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
                'Pass a specific path name to check. All the files under this path will be checked and, if not associated with any media from the original storage, removed'
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to check'
            )
            ->addOption(
                'variation',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific variation name to check'
            )
            ->addOption(
                'force',
                null,
                InputOption::VALUE_NONE,
                'Force the removal of the orphan cache files. If not set, the command will output the list of the files that would be removed',
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

            // get all the media files in the original storage
            $mediaPaths = $library->getOriginalStorage()->listFiles($input->getOption('path'));
            $medias = [];

            foreach ($mediaPaths as $mediaPath) {
                try {
                    $media = $this->resolver->resolveMedia($mediaPath, $libraryName);

                    if ($this->resolver->isMediaProcessable($media)) {
                        $medias[] = $media;
                    }
                } catch (MediaNotFoundException $e) {
                    $ioStyle->warning($e->getMessage());

                    continue;
                }
            }

            foreach ($variations as $variation) {
                // list files in this variation directory
                $files = $library->getCacheStorage()->list(path: $input->getOption('path'), variation: $variation);

                if (0 === \count($files)) {
                    continue;
                }

                // get all variation paths
                $variationPaths = [];

                foreach ($medias as $media) {
                    if ($variation->canBeAppliedTo($media)) {
                        $mediaVariation = $media->createVariation($variation);
                        $variationPaths[$mediaVariation->getStoragePath()] = $mediaVariation;
                    }
                }

                $diff = array_diff($files, array_keys($variationPaths));

                foreach ($diff as $diffFile) {
                    if ($input->getOption('force')) {
                        $library->getCacheStorage()->deleteFile($diffFile);
                    }

                    $removedFiles[] = $diffFile;
                }
            }

            $ioStyle->newLine();

            if ($input->getOption('force')) {
                $ioStyle->success(\sprintf('%d cache files have been removed in the library "%s"', \count($removedFiles), $libraryName));
            } elseif ([] === $removedFiles) {
                $ioStyle->success(\sprintf('No cache files to remove in the library "%s"', $libraryName));
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
