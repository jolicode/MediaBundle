<?php

namespace JoliCode\MediaBundle\Command\Debug;

use JoliCode\MediaBundle\Inspector\ProcessingChainInspector;
use JoliCode\MediaBundle\Inspector\ProcessingChainStatus;
use JoliCode\MediaBundle\Inspector\ProcessorStatus;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'joli:media:debug:processors',
    description: 'Display the pre-processors, processors and post-processors, and whether their binaries are available',
)]
class ProcessorsCommand extends Command
{
    public function __construct(
        private readonly ProcessingChainInspector $inspector,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption(
                'no-fail',
                null,
                InputOption::VALUE_NONE,
                'Always exit successfully, even when a registered processor points at a missing binary',
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $ioStyle = new SymfonyStyle($input, $output);
        $status = $this->inspector->inspect();

        $ioStyle->title('JoliMedia processing chain');

        $this->displayPreProcessors($ioStyle, $status);
        $this->displayProcessors($ioStyle, $status);
        $this->displayPostProcessors($ioStyle, $status);

        return $this->displayDiagnosis($ioStyle, $status, (bool) $input->getOption('no-fail'));
    }

    private function displayPreProcessors(SymfonyStyle $ioStyle, ProcessingChainStatus $status): void
    {
        $ioStyle->section('Pre-processors');

        if ([] === $status->preProcessors) {
            $ioStyle->text('No pre-processor is registered.');

            return;
        }

        $ioStyle->table(['Name', 'Class'], array_map(
            static fn (ProcessorStatus $preProcessor): array => [$preProcessor->name, $preProcessor->class ?? '-'],
            $status->preProcessors,
        ));
    }

    private function displayProcessors(SymfonyStyle $ioStyle, ProcessingChainStatus $status): void
    {
        $ioStyle->section('Processors');
        $rows = [];

        foreach ($status->processors as $processor) {
            $rows[] = [
                $processor->name,
                $this->describeStatus($processor),
                [] === $processor->inputFormats ? '-' : implode(', ', $processor->inputFormats),
                [] === $processor->outputFormats ? '-' : implode(', ', $processor->outputFormats),
                $this->describeBinaries($processor),
            ];
        }

        $ioStyle->table(['Name', 'Status', 'Input formats', 'Output formats', 'Binaries'], $rows);
    }

    private function displayPostProcessors(SymfonyStyle $ioStyle, ProcessingChainStatus $status): void
    {
        $ioStyle->section('Post-processors');
        $rows = [];

        foreach ($status->postProcessors as $postProcessor) {
            $rows[] = [
                $postProcessor->name,
                $this->describeStatus($postProcessor),
                [] === $postProcessor->inputFormats ? '-' : implode(', ', $postProcessor->inputFormats),
                $this->describeBinaries($postProcessor),
            ];
        }

        $ioStyle->table(['Name', 'Status', 'Formats', 'Binaries'], $rows);
    }

    private function displayDiagnosis(SymfonyStyle $ioStyle, ProcessingChainStatus $status, bool $noFail): int
    {
        $brokenProcessors = $status->getBrokenProcessors();

        if ($status->isLimitedToWebp()) {
            $ioStyle->warning([
                'The registered processors can only output ' . implode(', ', $status->getReachableOutputFormats()) . ' files.',
                'Any variation that produces another format - which is what the admin bridges do by default - will fail.',
                'Enable the "imagine" processor to output the other formats.',
            ]);
        }

        if ([] === $brokenProcessors) {
            if (!$status->isLimitedToWebp()) {
                $ioStyle->success('Every registered processor has its binaries available.');
            }

            return Command::SUCCESS;
        }

        $missingBinaries = [];

        foreach ($brokenProcessors as $processor) {
            foreach ($processor->getMissingBinaries() as $binaryName) {
                // "gifsicle" is both a processor and a post-processor, hence the kind
                $missingBinaries[] = \sprintf(
                    '%s "%s": %s',
                    str_replace('_', '-', $processor->kind),
                    $processor->name,
                    $processor->binaries[$binaryName],
                );
            }
        }

        $ioStyle->error('These processors are registered but their binary cannot be executed:');
        $ioStyle->listing($missingBinaries);
        $ioStyle->text('Install the missing binaries, or set the matching JOLI_MEDIA_*_BINARY environment variable.');
        $ioStyle->newLine();

        return $noFail ? Command::SUCCESS : Command::FAILURE;
    }

    private function describeStatus(ProcessorStatus $processor): string
    {
        if (!$processor->registered) {
            return \sprintf('<comment>not registered</comment> (%s)', $processor->unavailabilityReason ?? 'unknown reason');
        }

        if ([] !== $processor->getMissingBinaries()) {
            return '<error>binary missing</error>';
        }

        return '<info>registered</info>';
    }

    private function describeBinaries(ProcessorStatus $processor): string
    {
        if (!$processor->registered) {
            return '-';
        }

        if ([] === $processor->binaries) {
            return 'none (runs in the PHP process)';
        }

        $descriptions = [];

        foreach ($processor->binaries as $binaryName => $path) {
            if (!is_executable($path)) {
                $descriptions[] = \sprintf('%s: %s <error>missing</error>', $binaryName, $path);

                continue;
            }

            $version = $processor->probeVersion($binaryName);
            $descriptions[] = \sprintf('%s: %s <info>ok</info>%s', $binaryName, $path, null === $version ? '' : ' - ' . $version);
        }

        return implode("\n", $descriptions);
    }
}
