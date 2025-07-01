<?php

namespace JoliCode\MediaBundle\Storage;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Storage\Strategy\StorageStrategyInterface;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\Config;
use League\Flysystem\Filesystem;
use League\Flysystem\StorageAttributes;
use Symfony\Component\Mime\MimeTypesInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CacheStorage
{
    private Library $library;

    public function __construct(
        private readonly StorageStrategyInterface $strategy,
        private readonly Filesystem $filesystem,
        private readonly string $urlPath,
        private readonly bool $mustStoreWhenGeneratingUrl,
        private readonly UrlGeneratorInterface $urlGenerator,
        private readonly MimeTypesInterface $mimeTypes,
    ) {
    }

    public function delete(string $path, Variation $variation): void
    {
        $this->deleteFile($this->strategy->getPath($path, $variation));
    }

    public function deleteDirectory(string $path, Variation $variation): void
    {
        $this->deleteDir($this->strategy->getPath($path, $variation));
    }

    public function deleteDir(string $path): void
    {
        $this->filesystem->deleteDirectory($path);
    }

    public function deleteFile(string $path): void
    {
        $this->filesystem->delete($path);
    }

    public function get(string $path, Variation $variation): Binary
    {
        $path = $this->strategy->getPath($path, $variation);
        $mimeType = $this->filesystem->mimeType($path);
        $format = $this->getExtension($mimeType);

        return new Binary(
            $mimeType,
            $format,
            $this->filesystem->read($path),
            $path,
        );
    }

    public function getFileSize(string $path, Variation $variation): int
    {
        return $this->filesystem->filesize($this->strategy->getPath($path, $variation));
    }

    public function getFormat(string $path, Variation $variation): string
    {
        return $this->getExtension($this->getMimeType($path, $variation));
    }

    public function getMimeType(string $path, Variation $variation): string
    {
        return $this->filesystem->mimeType($this->strategy->getPath($path, $variation));
    }

    public function getPath(string $path, Variation $variation): string
    {
        return $this->strategy->getPath($path, $variation);
    }

    public function getLibrary(): Library
    {
        return $this->library;
    }

    public function getStrategy(): StorageStrategyInterface
    {
        return $this->strategy;
    }

    public function getUrl(
        string $path,
        Variation $variation,
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        $parameters = [
            'slug' => $this->strategy->getFilePath($path, $variation),
            'variation' => $variation->getName(),
        ];

        return $this->urlGenerator->generate(
            $this->getRouteName(),
            $parameters,
            $referenceType,
        );
    }

    public function getUrlPath(): string
    {
        return $this->urlPath;
    }

    public function has(string $path, Variation $variation): bool
    {
        return $this->filesystem->has($this->strategy->getPath($path, $variation));
    }

    /**
     * @return string[]
     */
    public function list(?string $path = null, ?string $contains = null, ?Variation $variation = null): array
    {
        $pathCriterion = '';

        if ($variation instanceof Variation) {
            $pathCriterion = '^' . preg_quote($this->strategy->getPath('', $variation), '/');
            if (null !== $path) {
                $pathCriterion .= '/' . preg_quote((string) $contains, '/');
            }
        } elseif (null !== $path) {
            $pathCriterion .= '^' . preg_quote((string) $contains, '/');
        }

        $listing = $this->filesystem->listContents($path ?? '', true)
            ->filter(fn (StorageAttributes $attributes): bool => $attributes->isFile())
        ;

        if ('' !== $pathCriterion) {
            // @TODO check rather using the withPath() method
            $listing = $listing->filter(fn (StorageAttributes $attributes): bool => (bool) preg_match('/' . $pathCriterion . '/', $attributes->path()));
        }

        if (null !== $contains) {
            $listing = $listing->filter(fn (StorageAttributes $attributes): bool => (bool) preg_match('/' . preg_quote($contains, '/') . '/', $attributes->path()));
        }

        return $listing
            ->map(fn (StorageAttributes $attributes): string => $attributes->path())
            ->toArray()
        ;
    }

    /**
     * @return string[]
     */
    public function listDirectories(?string $parent = null, ?Variation $variation = null): array
    {
        $path = $this->strategy->getPath($parent ?? '', $variation);

        return $this->filesystem->listContents($path, false)
            ->filter(fn (StorageAttributes $attributes): bool => $attributes->isDir())
            ->sortByPath()
            ->map(fn (StorageAttributes $attributes): string => $attributes->path())
            ->toArray()
        ;
    }

    /**
     * @return string[]
     */
    public function listFilePaths(?string $path = null, ?Variation $variation = null): array
    {
        $path = $this->strategy->getPath($path ?? '', $variation);

        return $this->filesystem->listContents($path, false)
            ->filter(fn (StorageAttributes $attributes): bool => $attributes->isFile())
            ->sortByPath()
            ->map(fn (StorageAttributes $attributes): string => $attributes->path())
            ->toArray()
        ;
    }

    public function setLibrary(Library $library): void
    {
        $this->library = $library;
    }

    public function store(MediaVariation $mediaVariation): void
    {
        $path = $this->strategy->getPath(
            $mediaVariation->getMedia()->getPath(),
            $mediaVariation->getVariation(),
        );
        $this->filesystem->write($path, $mediaVariation->getBinary()->getContent(), [
            Config::OPTION_VISIBILITY => 'public',
            Config::OPTION_DIRECTORY_VISIBILITY => 'public',
        ]);
    }

    public function mustStoreWhenGeneratingUrl(MediaVariation $mediaVariation): bool
    {
        return !$mediaVariation->isStored() && $this->mustStoreWhenGeneratingUrl;
    }

    private function getExtension(string $mimeType): string
    {
        $possibleExtensions = $this->mimeTypes->getExtensions($mimeType);

        if ([] === $possibleExtensions) {
            throw new \InvalidArgumentException(\sprintf('No possible extension found for mime type "%s"', $mimeType));
        }

        return $possibleExtensions[0];
    }

    private function getRouteName(): string
    {
        return 'joli_media_cache_' . $this->getLibrary()->getName();
    }
}
