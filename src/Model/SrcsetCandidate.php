<?php

namespace JoliCode\MediaBundle\Model;

readonly class SrcsetCandidate implements \Stringable
{
    public function __construct(
        public MediaVariation $mediaVariation,
        public string $url,
        public string $descriptor = '',
        public ?int $width = null,
        public ?int $height = null,
        public ?string $mimeType = null,
        public bool $hasPredictedDimensions = false,
    ) {
    }

    public function __toString(): string
    {
        return trim($this->url . ' ' . $this->descriptor);
    }

    public function getVariationName(): string
    {
        return $this->mediaVariation->getVariation()->getName();
    }

    public function isStored(): bool
    {
        return $this->mediaVariation->isStored();
    }

    /**
     * @return array{url: string, variation: string, descriptor: string, width: int|null, height: int|null, mimeType: string|null}
     */
    public function toArray(): array
    {
        return [
            'url' => $this->url,
            'variation' => $this->getVariationName(),
            'descriptor' => $this->descriptor,
            'width' => $this->width,
            'height' => $this->height,
            'mimeType' => $this->mimeType,
        ];
    }
}
