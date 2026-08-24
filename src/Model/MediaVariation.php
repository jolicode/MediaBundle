<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\MediaVariationNotStoredException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Storage\CacheStorage;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class MediaVariation implements StorableInterface
{
    /**
     * @var (callable(): Converter)|null
     */
    public static $converterInitializer;

    private ?bool $stored = null;

    private bool $isConvertingForUrlGeneration = false;

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

    public function getLibrary(): Library
    {
        return $this->media->getLibrary();
    }

    public function getMedia(): Media
    {
        return $this->media;
    }

    public function getMimeType(): string
    {
        return $this->getStorage()->getMimeType($this->media->getPath(), $this->variation);
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(): array|false
    {
        return $this->getStorage()->getPixelDimensions($this->media->getPath(), $this->variation);
    }

    public function getStorage(): CacheStorage
    {
        return $this->getLibrary()->getCacheStorage();
    }

    public function getStoragePath(): string
    {
        return $this->getStorage()->getStrategy()->getPath($this->media->getPath(), $this->variation);
    }

    /**
     * A temporary URL points directly at the storage backend and bypasses the
     * media controller, so the variation file must exist before its URL is
     * signed: it is generated when missing, whatever the value of the
     * must_store_when_generating_url setting, and conversion failures are not
     * swallowed.
     *
     * @param array<string, mixed> $config extra options forwarded to the filesystem adapter
     *
     * @throws MediaVariationNotStoredException when the variation file cannot be generated
     */
    public function getTemporaryUrl(
        \DateTimeInterface|\DateInterval|null $expiresAt = null,
        array $config = [],
    ): string {
        if (!$this->isStored()) {
            $this->convertForUrlGeneration(fn (Converter $converter) => $converter->convertMediaVariation($this, false));

            if (!$this->isStored()) {
                throw new MediaVariationNotStoredException($this);
            }
        }

        return $this->getStorage()->getTemporaryUrl($this->media->getPath(), $this->variation, $expiresAt, $config);
    }

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        if ($this->getStorage()->mustStoreWhenGeneratingUrl($this)) {
            $this->convertForUrlGeneration(fn (Converter $converter) => $converter->convertIfMustStoreWhenGeneratingUrl($this));
        }

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

    /**
     * @param callable(Converter): void $convert
     */
    private function convertForUrlGeneration(callable $convert): void
    {
        if (!isset(self::$converterInitializer) || $this->isConvertingForUrlGeneration) {
            return;
        }

        // guard against re-entrance: the conversion pipeline may generate
        // the URL of the variation being converted (eg. in the profiler)
        $this->isConvertingForUrlGeneration = true;

        try {
            $convert((self::$converterInitializer)());
        } finally {
            $this->isConvertingForUrlGeneration = false;
        }
    }
}
