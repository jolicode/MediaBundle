<?php

namespace JoliCode\MediaBundle\Inspector;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\PostProcessor\PostProcessorInterface;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Processor\ProcessorInterface;

/**
 * Reports what the processing chain is made of, and what is missing from it.
 */
readonly class ProcessingChainInspector
{
    /**
     * @param iterable<PreProcessorInterface>                                                            $preProcessors
     * @param array<string, array{binaries?: array<string, string>, unavailabilityReason?: string|null}> $processorDiagnostics
     * @param array<string, array{binaries?: array<string, string>, unavailabilityReason?: string|null}> $postProcessorDiagnostics
     */
    public function __construct(
        private ProcessorContainer $processorContainer,
        private PostProcessorContainer $postProcessorContainer,
        private iterable $preProcessors = [],
        private array $processorDiagnostics = [],
        private array $postProcessorDiagnostics = [],
    ) {
    }

    public function inspect(): ProcessingChainStatus
    {
        return new ProcessingChainStatus(
            $this->inspectPreProcessors(),
            $this->inspectProcessors(),
            $this->inspectPostProcessors(),
        );
    }

    /**
     * @return ProcessorStatus[]
     */
    private function inspectPreProcessors(): array
    {
        $statuses = [];

        foreach ($this->preProcessors as $preProcessor) {
            $statuses[] = new ProcessorStatus(
                name: (new \ReflectionClass($preProcessor))->getShortName(),
                kind: ProcessorStatus::KIND_PRE_PROCESSOR,
                registered: true,
                class: $preProcessor::class,
            );
        }

        return $statuses;
    }

    /**
     * @return ProcessorStatus[]
     */
    private function inspectProcessors(): array
    {
        $statuses = [];

        foreach ($this->processorDiagnostics as $name => $diagnostic) {
            $registered = $this->processorContainer->has($name);
            $processor = $registered ? $this->processorContainer->get($name) : null;

            $statuses[] = new ProcessorStatus(
                name: $name,
                kind: ProcessorStatus::KIND_PROCESSOR,
                registered: $registered,
                unavailabilityReason: $registered ? null : ($diagnostic['unavailabilityReason'] ?? null),
                class: $processor instanceof ProcessorInterface ? $processor::class : null,
                inputFormats: $processor instanceof ProcessorInterface ? $this->toFormatValues($processor->getProcessableInputFormats()) : [],
                outputFormats: $processor instanceof ProcessorInterface ? $this->toFormatValues($processor->getProcessableOutputFormats()) : [],
                binaries: $registered ? ($diagnostic['binaries'] ?? []) : [],
            );
        }

        return $statuses;
    }

    /**
     * @return ProcessorStatus[]
     */
    private function inspectPostProcessors(): array
    {
        $statuses = [];

        foreach ($this->postProcessorDiagnostics as $name => $diagnostic) {
            $registered = $this->postProcessorContainer->has($name);
            $postProcessor = $registered ? $this->postProcessorContainer->get($name) : null;

            $statuses[] = new ProcessorStatus(
                name: $name,
                kind: ProcessorStatus::KIND_POST_PROCESSOR,
                registered: $registered,
                unavailabilityReason: $registered ? null : ($diagnostic['unavailabilityReason'] ?? null),
                class: $postProcessor instanceof PostProcessorInterface ? $postProcessor::class : null,
                inputFormats: $postProcessor instanceof PostProcessorInterface ? $this->toFormatValues($postProcessor->getProcessableFormats()) : [],
                binaries: $registered ? ($diagnostic['binaries'] ?? []) : [],
            );
        }

        return $statuses;
    }

    /**
     * @param Format[] $formats
     *
     * @return string[]
     */
    private function toFormatValues(array $formats): array
    {
        return array_map(static fn (Format $format): string => $format->value, $formats);
    }
}
