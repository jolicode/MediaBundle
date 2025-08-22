<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Storage\CacheStorage;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class MediaVariation implements StorableInterface
{
    private ?bool $stored = null;

    public function __construct(
        private readonly Media $media,
        private readonly Variation $variation,
        private ?Binary $binary = null,
    ) {
    }

    public function delete(): void
    {
        if ($this->isStored()) {
            $this->getStorage()
                ->delete($this->media->getPath(), $this->variation)
            ;
        }

        $this->stored = false;
        $this->binary = null;
    }

    public function getBinary(): Binary
    {
        if (!$this->binary instanceof Binary) {
            if (!$this->isStored()) {
                throw new \RuntimeException('This media variation is not stored and its binary is not set');
            }

            $this->binary = $this->getStorage()->get($this->media->getPath(), $this->variation);
        }

        return $this->binary;
    }

    public function getFileSize(): int
    {
        return $this->getStorage()->getFileSize($this->media->getPath(), $this->variation);
    }

    public function getFormat(): string
    {
        return $this->getStorage()->getFormat($this->media->getPath(), $this->variation);
    }

    public function getMedia(): Media
    {
        return $this->media;
    }

    public function getMimeType(): string
    {
        return $this->getStorage()->getMimeType($this->media->getPath(), $this->variation);
    }

    public function getStorage(): CacheStorage
    {
        return $this->media->getLibrary()->getCacheStorage();
    }

    public function getStoragePath(): string
    {
        return $this->getStorage()->getStrategy()->getPath($this->media->getPath(), $this->variation);
    }

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        return $this->getStorage()->getUrl($this->media->getPath(), $this->variation, $referenceType);
    }

    public function getVariation(): Variation
    {
        return $this->variation;
    }

    public function isStorable(): bool
    {
        return $this->binary instanceof Binary;
    }

    public function isStored(): bool
    {
        if (null === $this->stored) {
            $this->stored = $this->getStorage()->has(
                $this->media->getPath(),
                $this->variation,
            );
        }

        return $this->stored;
    }

    public function store(?Binary $binary = null): void
    {
        if ($binary instanceof Binary) {
            $this->binary = $binary;
        }

        $this->getStorage()->store($this);
        $this->stored = true;
    }
}
