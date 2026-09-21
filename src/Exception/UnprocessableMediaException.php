<?php

namespace JoliCode\MediaBundle\Exception;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Processor\ProcessorInterface;
use JoliCode\MediaBundle\Transformation\Transformation;

class UnprocessableMediaException extends \RuntimeException
{
    public function __construct(
        private readonly string $path,
        private readonly string $libraryName,
        private readonly string $variationName,
        private readonly string $mimeType,
        private readonly string $binaryFormat,
        private readonly int $contentSize,
        private readonly string $reason = '',
    ) {
        parent::__construct($this->format());
    }

    public static function fromTransformation(Transformation $transformation, string $reason): self
    {
        $media = $transformation->getMediaVariation()->getMedia();
        $binary = $transformation->getBinary();

        return new self(
            $media->getPath(),
            $media->getLibrary()->getName(),
            $transformation->getVariationName(),
            $binary->getMimeType(),
            $binary->getFormat(),
            $binary->getContentSize(),
            $reason,
        );
    }

    /**
     * Built when no registered processor was even a candidate for the conversion:
     * the transformation was never attempted, so there is no processor failure to report.
     *
     * @param string[]                          $outputFormats        the output formats that were looked for
     * @param array<string, ProcessorInterface> $registeredProcessors
     */
    public static function noProcessorAvailable(Transformation $transformation, array $outputFormats, array $registeredProcessors): self
    {
        $reason = \sprintf(
            'no registered processor can output %s from a "%s" one',
            self::describeOutputFormats($outputFormats),
            $transformation->getInputFormat(),
        );

        if ([] === $registeredProcessors) {
            $reason .= '. No processor is registered at all';
        } else {
            $descriptions = [];

            foreach ($registeredProcessors as $name => $processor) {
                $descriptions[] = \sprintf('"%s" (outputs: %s)', $name, implode(', ', array_map(
                    static fn (Format $format): string => $format->value,
                    $processor->getProcessableOutputFormats(),
                )));
            }

            $reason .= '. Registered processors: ' . implode(', ', $descriptions);
        }

        // with the imagine processor registered, the failure has another cause
        if (!isset($registeredProcessors['imagine'])) {
            $reason .= '. The "imagine" processor is not registered: enable it to output formats other than WebP and GIF';
        }

        return self::fromTransformation($transformation, $reason . '. Run "php bin/console joli:media:debug:processors" to inspect the processing chain');
    }

    /**
     * Built when every candidate processor was tried and threw.
     *
     * @param array<string, string> $failures the error message of each processor, indexed by processor name
     */
    public static function allProcessorsFailed(Transformation $transformation, array $failures): self
    {
        $descriptions = [];

        foreach ($failures as $name => $message) {
            $descriptions[] = \sprintf('"%s" (%s)', $name, $message);
        }

        return self::fromTransformation($transformation, \sprintf(
            'every processor that could handle this conversion failed: %s',
            implode(', ', $descriptions),
        ));
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getLibraryName(): string
    {
        return $this->libraryName;
    }

    public function getVariationName(): string
    {
        return $this->variationName;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function getBinaryFormat(): string
    {
        return $this->binaryFormat;
    }

    public function getContentSize(): int
    {
        return $this->contentSize;
    }

    public function getReason(): string
    {
        return $this->reason;
    }

    /**
     * @param string[] $outputFormats
     */
    private static function describeOutputFormats(array $outputFormats): string
    {
        $quoted = array_map(static fn (string $format): string => '"' . $format . '"', $outputFormats);

        if (1 === \count($quoted)) {
            return \sprintf('a %s file', $quoted[0]);
        }

        $lastFormat = array_pop($quoted);

        return \sprintf('a %s or %s file', implode(', ', $quoted), $lastFormat);
    }

    private function format(): string
    {
        $message = \sprintf(
            'The media "%s" from the library "%s" cannot be processed for the variation "%s" (mime type "%s", format "%s", %d bytes)',
            $this->path,
            $this->libraryName,
            $this->variationName,
            $this->mimeType,
            $this->binaryFormat,
            $this->contentSize,
        );

        if ('' !== $this->reason) {
            $message .= ': ' . $this->reason;
        }

        return $message;
    }
}
