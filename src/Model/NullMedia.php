<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class NullMedia extends Media
{
    private readonly string $path;

    /**
     * NullMedia is a placeholder for a media that does not exist or cannot be resolved.
     * It throws exceptions on all operations to indicate that it is not a valid media.
     *
     * @param Media|string $path the path to the media, or a Media object
     */
    public function __construct(
        Media|string $path,
    ) {
        $this->path = $path instanceof Media ? $path->getPath() : $path;
    }

    public function addVariation(MediaVariation $variation): void
    {
        throw new \LogicException('Cannot add a variation to a NullMedia');
    }

    public function createVariation(string|Variation $variation): MediaVariation
    {
        throw new \LogicException('Cannot create variation on a NullMedia');
    }

    public function getBinary(): Binary
    {
        throw new \LogicException('Cannot get binary from a NullMedia');
    }

    public function getFilename(): string
    {
        return basename($this->path);
    }

    public function getFileSize(): int
    {
        throw new \LogicException('Cannot get file size from a NullMedia');
    }

    public function getFileType(): string
    {
        throw new \LogicException('Cannot get file type from a NullMedia');
    }

    public function getFormat(): string
    {
        throw new \LogicException('Cannot get format from a NullMedia');
    }

    public function getMimeType(): string
    {
        throw new \LogicException('Cannot get mime type from a NullMedia');
    }

    public function getLastModified(): \DateTime
    {
        throw new \LogicException('Cannot get last modified date from a NullMedia');
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getPixelDimensions(): array|false
    {
        throw new \LogicException('Cannot get pixel dimensions from a NullMedia');
    }

    public function getStorage(): OriginalStorage
    {
        throw new \LogicException('Cannot get storage from a NullMedia');
    }

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        throw new \LogicException('Cannot get URL from a NullMedia');
    }

    public function getVariation(string $variationName): MediaVariation
    {
        throw new \LogicException('Cannot get variation from a NullMedia');
    }

    /**
     * @return array<string, MediaVariation>
     */
    public function getVariations(): array
    {
        throw new \LogicException('Cannot get variations from a NullMedia');
    }

    public function hasVariation(string $variationName): bool
    {
        throw new \LogicException('Cannot check variation existence on a NullMedia');
    }

    public function isStored(): bool
    {
        return false;
    }

    public function store(?Binary $binary = null): void
    {
        throw new \LogicException('A NullMedia cannot be stored');
    }
}
