<?php

namespace JoliCode\MediaBundle\Inspector;

use JoliCode\MediaBundle\Model\Format;

readonly class ProcessingChainStatus
{
    /**
     * @param ProcessorStatus[] $preProcessors
     * @param ProcessorStatus[] $processors
     * @param ProcessorStatus[] $postProcessors
     */
    public function __construct(
        public array $preProcessors = [],
        public array $processors = [],
        public array $postProcessors = [],
    ) {
    }

    /**
     * @return ProcessorStatus[]
     */
    public function getAll(): array
    {
        return array_merge($this->preProcessors, $this->processors, $this->postProcessors);
    }

    /**
     * @return ProcessorStatus[] the registered processors whose binaries cannot be executed
     */
    public function getBrokenProcessors(): array
    {
        return array_values(array_filter(
            $this->getAll(),
            static fn (ProcessorStatus $status): bool => $status->registered && [] !== $status->getMissingBinaries(),
        ));
    }

    /**
     * @return string[] every format the registered processors can produce
     */
    public function getReachableOutputFormats(): array
    {
        $formats = [];

        foreach ($this->processors as $status) {
            if ($status->registered) {
                $formats = array_merge($formats, $status->outputFormats);
            }
        }

        return array_values(array_unique($formats));
    }

    /**
     * Without the "imagine" processor, no variation can output a JPEG, PNG or AVIF file.
     */
    public function isLimitedToWebp(): bool
    {
        return [] === array_diff($this->getReachableOutputFormats(), [Format::WEBP->value, Format::GIF->value]);
    }
}
