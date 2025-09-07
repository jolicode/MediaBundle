<?php

namespace JoliCode\MediaBundle\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Resolver\Resolver;
use League\Flysystem\Filesystem;
use League\Flysystem\UnableToRetrieveMetadata;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class MediaPropertyAccessor
{
    public function __construct(
        private readonly string $libraryName,
        private readonly Filesystem $filesystem,
        private readonly MimeTypeGuesser $mimeTypeGuesser,
        private readonly CacheInterface $cache,
    ) {
    }

    public function getMimeType(string $path): string
    {
        return $this->cache->get(
            $this->getCacheKey($path, 'mime_type'),
            fn (ItemInterface $item): string => $this->guessMimeType($path),
        );
    }

    public function getFormat(string $path): string
    {
        $mimeType = $this->getMimeType($path);

        return $this->mimeTypeGuesser->getPossibleExtension($mimeType);
    }

    public function getFileSize(string $path): int
    {
        return $this->cache->get(
            $this->getCacheKey($path, 'filesize'),
            fn (ItemInterface $item): int => $this->filesystem->fileSize($path)
        );
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(string $path): array|false
    {
        return $this->cache->get(
            $this->getCacheKey($path, 'pixel_dimensions'),
            /**
             * @return false|array{height: int, width: int}
             */
            fn (ItemInterface $item): array|false => $this->guessPixelDimensions($path)
        );
    }

    public function getLastModified(string $path): int
    {
        return $this->cache->get(
            \sprintf('joli_media_property_%s_%s_lastModified', $this->libraryName, Resolver::normalizePath($path)),
            function (ItemInterface $item) use ($path): int {
                $item->expiresAfter(24 * 60 * 60); // every day, check if the file has been modified

                return $this->filesystem->lastModified($path);
            },
        );
    }

    private function getCacheKey(string $path, string $property): string
    {
        return \sprintf(
            'joli_media_property_%s_%s_%s_%s',
            $this->libraryName,
            Resolver::normalizePath($path),
            $this->getLastModified($path),
            $property,
        );
    }

    private function guessMimeType(string $path): string
    {
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
    private function guessPixelDimensions(string $path): array|false
    {
        if (!str_starts_with($this->guessMimeType($path), 'image/')) {
            return false;
        }

        $temporaryFile = tempnam(sys_get_temp_dir(), 'image');
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
