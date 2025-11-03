<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Command;

use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Helper;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Helper\TableSeparator;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'joli:media:audit',
    description: 'Display information about the media and the associated cache files',
)]
class AuditCommand extends Command
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
                'Pass a specific path name to generate cache for. All the media files under this path will be converted'
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to generate cache for'
            )
            ->addOption(
                'detail',
                null,
                InputOption::VALUE_NONE,
                'Display file details. If not set, only global statistics will be displayed (file count, size, etc.)',
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $ioStyle = new SymfonyStyle($input, $output);

        if (null === $input->getOption('library')) {
            $library = $this->libraries->list();
        } else {
            $libraryName = $input->getOption('library');
            $library = [$libraryName => $this->libraries->get($libraryName)];
        }

        foreach ($library as $libraryName => $library) {
            $mediaPaths = $library->getOriginalStorage()->listFiles($input->getOption('path'));
            $globalStatistics = new GlobalStatistic(\count($mediaPaths), 0, 0, 0);
            $details = [];
            $variations = $library->getVariationContainer()->list();

            foreach ($mediaPaths as $path) {
                $fileSize = $library->getOriginalStorage()->getFileSize($path);
                $globalStatistics->incrementMediaSize($fileSize);
                $details[$path] = new PathStatistic($path, $fileSize);

                foreach ($variations as $variationName => $variation) {
                    if ($library->getCacheStorage()->has($path, $variation)) {
                        $variationSize = $library->getCacheStorage()->getFileSize($path, $variation);
                        $globalStatistics->incrementVariationCount();
                        $globalStatistics->incrementVariationSize($variationSize);

                        if ($input->getOption('detail')) {
                            $details[$path]->incrementVariationSize($variationSize);
                            $details[$path]->addVariation($variationName, $variationSize);
                        }
                    }
                }
            }

            $ioStyle->title(\sprintf('Library "%s"', $libraryName));
            $ioStyle->definitionList(
                ['Media count' => $globalStatistics->mediaCount],
                ['Media size' => Helper::formatMemory($globalStatistics->mediaSize)],
                new TableSeparator(),
                ['Variations count' => $globalStatistics->variationsCount],
                ['Variations size' => Helper::formatMemory($globalStatistics->variationsSize)],
            );

            if ($input->getOption('detail')) {
                $variationNames = $library->getVariationContainer()->getNames();
                $headers = array_merge(['Path', 'Size', 'Variations size'], $variationNames);
                $ioStyle->newLine();
                $table = new Table($output);
                $table
                    ->setHeaders($headers)
                    ->setRows(array_map(
                        fn (PathStatistic $statistic): array => $statistic->asTableRow($variationNames),
                        $details
                    ))
                ;

                $i = 0;

                while ($i < iterator_count($variations)) {
                    $table->setColumnMaxWidth($i + 3, 10);
                    ++$i;
                }

                $table->render();
            }
        }

        return Command::SUCCESS;
    }
}

class GlobalStatistic
{
    public function __construct(
        public int $mediaCount,
        public int $mediaSize,
        public int $variationsCount,
        public int $variationsSize,
    ) {
    }

    public function incrementMediaSize(int $size): void
    {
        $this->mediaSize += $size;
    }

    public function incrementVariationCount(): void
    {
        ++$this->variationsCount;
    }

    public function incrementVariationSize(int $size): void
    {
        $this->variationsSize += $size;
    }
}

class PathStatistic
{
    /**
     * @param array<string, int> $variationsSizes
     */
    public function __construct(
        public string $path,
        public int $size = 0,
        public int $variationsSize = 0,
        public array $variationsSizes = [],
    ) {
    }

    public function incrementVariationSize(int $size): void
    {
        $this->variationsSize += $size;
    }

    public function addVariation(string $variationName, int $size): void
    {
        $this->variationsSizes[$variationName] = $size;
    }

    /**
     * @param string[] $variationNames
     *
     * @return array<string>
     */
    public function asTableRow(array $variationNames): array
    {
        return [
            $this->path,
            Helper::formatMemory($this->size),
            $this->variationsSize > 0 ? Helper::formatMemory($this->variationsSize) : '-',
            ...array_map(
                function (string $variationName): string {
                    if (!isset($this->variationsSizes[$variationName])) {
                        return '❌';
                    }

                    return Helper::formatMemory($this->variationsSizes[$variationName]);
                },
                $variationNames
            ),
        ];
    }
}
