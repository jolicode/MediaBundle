<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Command;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'joli:media:convert',
    description: 'Generate media cache files for specific files in a library',
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
            ->addArgument(
                'filename',
                InputArgument::IS_ARRAY | InputArgument::REQUIRED,
                'Pass a specific filename to generate cache for. Only this file will be converted',
            )
            ->addOption(
                'library',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific library to generate cache for',
                $this->libraries->getDefaultName(),
            )
            ->addOption(
                'variation',
                null,
                InputOption::VALUE_REQUIRED,
                'Pass a specific variation name to generate cache for',
                null
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

        foreach ($input->getArgument('filename') as $filename) {
            try {
                $this->converter->convert(
                    $filename,
                    $input->getOption('library'),
                    $input->getOption('variation'),
                    $input->getOption('force'),
                );
            } catch (\Exception $e) {
                $ioStyle->error(\sprintf('There was an exception during the conversion of the file "%s" from the library "%s"',
                    $filename,
                    $input->getOption('library'),
                ));
                $ioStyle->error(
                    $e->getMessage(),
                );

                return Command::FAILURE;
            }

            $ioStyle->success(\sprintf('The file "%s" from the library "%s" has been converted successfully.',
                $filename,
                $input->getOption('library'),
            ));
        }

        return Command::SUCCESS;
    }
}
