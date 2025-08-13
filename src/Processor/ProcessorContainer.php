<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Model\Format;

class ProcessorContainer
{
    /**
     * @var array<string, ProcessorInterface>
     */
    private array $processors = [];

    public function add(string $name, ProcessorInterface $processor): void
    {
        $this->processors[$name] = $processor;
    }

    public function canProcessInputFormat(string $inputFormat): bool
    {
        foreach ($this->processors as $processor) {
            if ($processor->canProcessInputFormat($inputFormat)) {
                return true;
            }
        }

        return false;
    }

    public function get(string $name): ProcessorInterface
    {
        if (!$this->has($name)) {
            throw new \InvalidArgumentException(\sprintf('Processor "%s" not found.', $name));
        }

        return $this->processors[$name];
    }

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array
    {
        $formats = [];
        $uniqueFormats = [];

        foreach ($this->processors as $processor) {
            $formats = array_merge($formats, $processor->getProcessableInputFormats());
        }

        foreach ($formats as $format) {
            if (!isset($uniqueFormats[$format->value])) {
                $uniqueFormats[$format->value] = $format;
            }
        }

        return array_values($uniqueFormats);
    }

    /**
     * @return string[]
     */
    public function getPotentiallyProcessableInputExtension(): array
    {
        $extensions = [];

        foreach ($this->getProcessableInputFormats() as $inputFormat) {
            $extensions = array_merge($extensions, $inputFormat->getPossibleExtensions());
        }

        return array_unique($extensions);
    }

    public function getProcessor(string $inputFormat, ?string $variationFormat = null): ProcessorInterface
    {
        return $this->getProcessors($inputFormat, $variationFormat)[0];
    }

    /**
     * @return ProcessorInterface[]
     */
    public function getProcessors(string $inputFormat, ?string $variationFormat = null): array
    {
        $outputFormat = $this->getOutputFormat($inputFormat, $variationFormat);
        $processors = [];

        if ($this->has('cwebp')
            && $this->get('cwebp')->canProcessInputFormat($inputFormat)
            && $this->get('cwebp')->canProcessOutputFormat($outputFormat)
        ) {
            $processors[] = $this->get('cwebp');
        }

        if ($this->has('gif2webp')
            && $this->get('gif2webp')->canProcessInputFormat($inputFormat)
            && $this->get('gif2webp')->canProcessOutputFormat($outputFormat)
        ) {
            $processors[] = $this->get('gif2webp');
        }

        if ($this->has('gifsicle')
            && $this->get('gifsicle')->canProcessInputFormat($inputFormat)
            && $this->get('gifsicle')->canProcessOutputFormat($outputFormat)
        ) {
            $processors[] = $this->get('gifsicle');
        }

        if ($this->has('imagine')
            && $this->get('imagine')->canProcessInputFormat($inputFormat)
            && $this->get('imagine')->canProcessOutputFormat($outputFormat)
        ) {
            $processors[] = $this->get('imagine');
        }

        return $processors;
    }

    public function has(string $name): bool
    {
        return isset($this->processors[$name]);
    }

    public function remove(string $name): void
    {
        if (!$this->has($name)) {
            throw new \InvalidArgumentException(\sprintf('Processor "%s" not found.', $name));
        }

        unset($this->processors[$name]);
    }

    public function removeAll(): void
    {
        $this->processors = [];
    }

    private function getOutputFormat(string $inputFormat, ?string $variationFormat = null): string
    {
        if (null !== $variationFormat) {
            return $variationFormat;
        }

        return $inputFormat;
    }
}
