<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class Media implements StorableInterface
{
    /**
     * @var array<string, MediaVariation>
     */
    private array $variations = [];

    private ?bool $stored = null;

    public function __construct(
        private readonly string $path,
        private readonly OriginalStorage $storage,
        private ?Binary $binary = null,
    ) {
    }

    public function __serialize(): array
    {
        return [$this->path, $this->storage->getLibrary()->getName()];
    }

    public function addVariation(MediaVariation $variation): void
    {
        $this->variations[$variation->getVariation()->getName()] = $variation;
    }

    public function createVariation(string|Variation $variation): MediaVariation
    {
        if (\is_string($variation)) {
            $variation = $this->storage->getLibrary()->getVariation($variation);
        }

        return $variation->getForMedia($this);
    }

    public function getBinary(): Binary
    {
        if (!$this->binary instanceof Binary) {
            if (!$this->isStored()) {
                throw new \RuntimeException('This media is not stored and its binary is not set');
            }

            $this->binary = $this->storage->get($this->path);
        }

        return $this->binary;
    }

    public function getFilename(): string
    {
        return basename($this->path);
    }

    public function getFileSize(): int
    {
        return $this->storage->getFileSize($this->path);
    }

    public function getFileType(): string
    {
        $mimeTypeParts = explode('/', $this->getMimeType());

        if (2 !== \count($mimeTypeParts)) {
            return 'file';
        }

        if (\in_array($mimeTypeParts[0], ['audio', 'image', 'video'], true)) {
            return $mimeTypeParts[0];
        }

        return match ($this->getMimeType()) {
            'application/msword' => 'word',
            'application/pdf' => 'pdf',
            'application/vnd.ms-excel' => 'excel',
            'application/vnd.ms-powerpoint' => 'powerpoint',
            'application/vnd.oasis.opendocument.presentation' => 'powerpoint',
            'application/vnd.oasis.opendocument.spreadsheet' => 'excel',
            'application/vnd.oasis.opendocument.text' => 'word',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'powerpoint',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'word',
            'application/xml' => 'xml',
            'application/zip' => 'zip',
            'text/csv' => 'csv',
            'text/html' => 'html',
            'text/plain' => 'text',
            'text/xml' => 'xml',

            default => 'file',
        };
    }

    public function getFolderPath(): string
    {
        return \dirname($this->path);
    }

    public function getFormat(): string
    {
        if ($this->binary instanceof Binary) {
            return $this->binary->getFormat();
        }

        return $this->storage->getFormat($this->path);
    }

    public function getMimeType(): string
    {
        if ($this->binary instanceof Binary) {
            return $this->binary->getMimeType();
        }

        return $this->storage->getMimeType($this->path);
    }

    public function getLastModified(): \DateTime
    {
        $timestamp = $this->storage->getLastModified($this->path);

        return new \DateTime('@' . $timestamp);
    }

    public function getLibrary(): Library
    {
        return $this->storage->getLibrary();
    }

    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(): array|false
    {
        return $this->storage->getPixelDimensions($this->path);
    }

    public function getStorage(): OriginalStorage
    {
        return $this->storage;
    }

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        return $this->storage->getUrl($this->path, $referenceType);
    }

    public function getVariation(string $variationName): MediaVariation
    {
        if (!isset($this->variations[$variationName])) {
            throw new \InvalidArgumentException(\sprintf('Variation "%s" not found', $variationName));
        }

        return $this->variations[$variationName];
    }

    /**
     * @return array<string, MediaVariation>
     */
    public function getVariations(): array
    {
        return $this->variations;
    }

    public function hasVariation(string $variationName): bool
    {
        return isset($this->variations[$variationName]);
    }

    public function isStored(): bool
    {
        if (null === $this->stored) {
            $this->stored = $this->storage->has($this->path);
        }

        return $this->stored;
    }

    public function store(?Binary $binary = null): void
    {
        if ($binary instanceof Binary) {
            $this->binary = $binary;
        }

        if (!$this->binary instanceof Binary) {
            throw new \RuntimeException('No binary set to store');
        }

        $this->storage->createMediaFromBinary($this->path, $this->binary);
        $this->stored = true;
    }
}
