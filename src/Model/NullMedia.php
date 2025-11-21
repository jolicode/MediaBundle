<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Exception\MediaNotResolvedException;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class NullMedia extends Media
{
    /**
     * NullMedia is a placeholder for a media that does not exist or cannot be resolved.
     * It throws exceptions on all operations to indicate that it is not a valid media.
     *
     * @param Media|string $path the path to the media, or a Media object
     */
    public function __construct(
        Media|string $path,
        OriginalStorage $storage,
    ) {
        parent::__construct(
            $path instanceof Media ? $path->getPath() : $path,
            $storage,
        );
    }

    public function addVariation(MediaVariation $variation): void
    {
        throw new MediaNotResolvedException('Cannot add a variation to a NullMedia', $this);
    }

    public function createVariation(string|Variation $variation): MediaVariation
    {
        throw new MediaNotResolvedException('Cannot create variation on a NullMedia', $this);
    }

    public function getBinary(): Binary
    {
        throw new MediaNotResolvedException('Cannot get binary from a NullMedia', $this);
    }

    public function getFileSize(): int
    {
        throw new MediaNotResolvedException('Cannot get file size from a NullMedia', $this);
    }

    public function getFileType(): string
    {
        throw new MediaNotResolvedException('Cannot get file type from a NullMedia', $this);
    }

    public function getFormat(): string
    {
        throw new MediaNotResolvedException('Cannot get format from a NullMedia', $this);
    }

    public function getMimeType(): string
    {
        throw new MediaNotResolvedException('Cannot get mime type from a NullMedia', $this);
    }

    public function getLastModified(): \DateTime
    {
        throw new MediaNotResolvedException('Cannot get last modified date from a NullMedia', $this);
    }

    public function getPixelDimensions(): array|false
    {
        throw new MediaNotResolvedException('Cannot get pixel dimensions from a NullMedia', $this);
    }

    public function getStorage(): OriginalStorage
    {
        throw new MediaNotResolvedException('Cannot get storage from a NullMedia', $this);
    }

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        throw new MediaNotResolvedException('Cannot get URL from a NullMedia', $this);
    }

    public function getVariation(string $variationName): MediaVariation
    {
        throw new MediaNotResolvedException('Cannot get variation from a NullMedia', $this);
    }

    /**
     * @return array<string, MediaVariation>
     */
    public function getVariations(): array
    {
        throw new MediaNotResolvedException('Cannot get variations from a NullMedia', $this);
    }

    public function hasVariation(string $variationName): bool
    {
        throw new MediaNotResolvedException('Cannot check variation existence on a NullMedia');
    }

    public function isStored(): bool
    {
        return false;
    }

    public function store(?Binary $binary = null): void
    {
        throw new MediaNotResolvedException('A NullMedia cannot be stored', $this);
    }
}
