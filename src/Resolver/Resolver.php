<?php

namespace JoliCode\MediaBundle\Resolver;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Variation\Variation;

readonly class Resolver
{
    public function __construct(
        private LibraryContainer $libraries,
        private ProcessorContainer $processorContainer,
    ) {
    }

    public function isMediaProcessable(Media $media): bool
    {
        return $this->processorContainer->canProcessInputFormat($media->getFormat());
    }

    public static function normalizePath(string $path): string
    {
        return (string) preg_replace('/\/\/+/u', '/', trim($path, '/'));
    }

    public function resolveMedia(Media|string $path, ?string $libraryName = null): Media
    {
        if ($path instanceof Media) {
            return $path;
        }

        if (null === $libraryName) {
            $libraries = [$this->libraries->getDefault(), ...$this->libraries->list()];

            foreach ($libraries as $library) {
                $media = $library->getOriginalStorage()->resolve($path);

                if (null !== $media) {
                    break;
                }
            }
        } else {
            $media = $this->libraries->get($libraryName)->getOriginalStorage()->resolve($path);
        }

        if (null === $media) {
            throw new MediaNotFoundException(\sprintf('Media not found for path "%s" in the library "%s".', $path, $libraryName ?? $this->libraries->getDefaultName()));
        }

        return $media;
    }

    public function resolveMediaVariation(
        Media|string $media,
        Variation|string $variation,
        ?string $libraryName = null,
    ): ?MediaVariation {
        if (!$media instanceof Media) {
            $path = $media;

            try {
                $media = $this->resolveMedia($path, $libraryName);
            } catch (MediaNotFoundException) {
                $variation = $this->getVariation($variation, $libraryName);

                if (!$variation->getFormat() instanceof Format) {
                    // try to see if there a variation with a coinstrained format that can generate a MediaVariation with this path
                    foreach (Format::cases() as $format) {
                        $variationClone = $variation->cloneWithOutputFormat($format);
                        $mediaVariation = $this->tryToResolveVariation($path, $variationClone, $libraryName);

                        if ($mediaVariation instanceof MediaVariation) {
                            // we found a media variation, we can return it
                            return $mediaVariation;
                        }
                    }

                    return null;
                }

                return $this->tryToResolveVariation($path, $variation, $libraryName);
            }
        } else {
            $libraryName = $media->getLibrary()->getName();
        }

        if (!$this->isMediaProcessable($media)) {
            // the media is not processable, we won't be able to get the variation
            return null;
        }

        return $this->getVariation($variation, $libraryName)->getForMedia($media);
    }

    /**
     * @return ($variation is null ? ?Media : ?MediaVariation)
     */
    public function resolve(
        Media|string $media,
        ?string $libraryName = null,
        Variation|string|null $variation = null,
    ): Media|MediaVariation|null {
        if (null === $variation) {
            return $this->resolveMedia($media, $libraryName);
        }

        return $this->resolveMediaVariation($media, $variation, $libraryName);
    }

    private function getVariation(Variation|string $variation, ?string $libraryName = null): Variation
    {
        if (\is_string($variation)) {
            return $this->libraries->get($libraryName)->getVariationContainer()->get($variation);
        }

        return $variation;
    }

    private function tryToResolveVariation(string $path, Variation $variation, ?string $libraryName): ?MediaVariation
    {
        $pathDirname = pathinfo($path, \PATHINFO_DIRNAME);

        // in case the variation has a format we must have added a hash to its path, before the real extension
        $pathFilename = pathinfo(pathinfo($path, \PATHINFO_FILENAME), \PATHINFO_FILENAME);
        $possibleOriginalMedias = $this->libraries->get($libraryName)->getOriginalStorage()->listMedias($pathDirname, $pathFilename, false);

        foreach ($possibleOriginalMedias as $possibleOriginalMedia) {
            $possibleMediaVariationFilename = $this->libraries->get($libraryName)->getCacheStorage()->getStrategy()->getFilePath($possibleOriginalMedia->getPath(), $variation);

            if ($path === $possibleMediaVariationFilename) {
                return $variation->getForMedia($possibleOriginalMedia);
            }
        }

        return null;
    }
}
