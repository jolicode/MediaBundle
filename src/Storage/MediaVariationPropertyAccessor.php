<?php

namespace JoliCode\MediaBundle\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\Strategy\StorageStrategyInterface;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\Filesystem;
use League\Flysystem\UnableToRetrieveMetadata;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class MediaVariationPropertyAccessor
{
    public function __construct(
        private readonly string $libraryName,
        private readonly StorageStrategyInterface $strategy,
        private readonly Filesystem $filesystem,
        private readonly MimeTypeGuesser $mimeTypeGuesser,
        private readonly CacheInterface $cache,
    ) {
    }

    public function getMimeType(string $path, Variation $variation): string
    {
        return $this->cache->get(
            $this->getCacheKey($path, $variation, 'mime_type'),
            fn (ItemInterface $item): string => $this->guessMimeType($path, $variation),
        );
    }

    public function getFormat(string $path, Variation $variation): string
    {
        $mimeType = $this->getMimeType($path, $variation);

        return $this->mimeTypeGuesser->getPossibleExtension($mimeType);
    }

    public function getFileSize(string $path, Variation $variation): int
    {
        return $this->cache->get(
            $this->getCacheKey($path, $variation, 'filesize'),
            fn (ItemInterface $item): int => $this->filesystem->fileSize($this->strategy->getPath($path, $variation))
        );
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(string $path, Variation $variation): array|false
    {
        return $this->cache->get(
            $this->getCacheKey($path, $variation, 'pixel_dimensions'),
            fn (ItemInterface $item): array|false => $this->guessPixelDimensions($path, $variation)
        );
    }

    public function getLastModified(string $path, Variation $variation): int
    {
        return $this->cache->get(
            \sprintf(
                'joli_media_property_%s_%s_%s_lastModified',
                $this->libraryName,
                $variation->getName(),
                Resolver::normalizePath($path),
            ),
            fn (ItemInterface $item): int => $this->filesystem->lastModified($this->strategy->getPath($path, $variation)),
        );
    }

    private function getCacheKey(string $path, Variation $variation, string $property): string
    {
        return \sprintf(
            'joli_media_property_%s_%s_%s_%s_%s',
            $this->libraryName,
            $variation->getName(),
            Resolver::normalizePath($path),
            $this->getLastModified($path, $variation),
            $property,
        );
    }

    private function guessMimeType(string $path, Variation $variation): string
    {
        $path = $this->strategy->getPath($path, $variation);

        try {
            $mimeType = $this->filesystem->mimeType($path);
        } catch (UnableToRetrieveMetadata) {
            // try to guess the mime type from the content
            $mimeType = $this->mimeTypeGuesser->guessMimeTypeFromContent(
                $this->filesystem->read($path),
            );
        }

        return $mimeType;
    }

    /**
     * @return false|array{height: int, width: int}
     */
    private function guessPixelDimensions(string $path, Variation $variation): array|false
    {
        if (!str_starts_with($this->getMimeType($path, $variation), 'image/')) {
            return false;
        }

        $temporaryFile = tempnam(sys_get_temp_dir(), 'image');
        $path = $this->strategy->getPath($path, $variation);
        file_put_contents($temporaryFile, $this->filesystem->read($path));
        $imageSize = getimagesize($temporaryFile);
        unlink($temporaryFile);

        if (!\is_array($imageSize)) {
            return false;
        }

        return [
            'height' => $imageSize[1],
            'width' => $imageSize[0],
        ];
    }
}
