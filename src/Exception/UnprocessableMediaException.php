<?php

namespace JoliCode\MediaBundle\Exception;

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
