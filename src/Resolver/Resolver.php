<?php

namespace JoliCode\MediaBundle\Resolver;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Variation\Variation;

readonly class Resolver
{
    public function __construct(
        private LibraryContainer $libraries,
        private ProcessorContainer $processorContainer,
    ) {
    }

    public function createUnresolvedMedia(Media|string $path, ?string $libraryName = null): NullMedia
    {
        if ($path instanceof Media) {
            if (null !== $libraryName && $libraryName !== $path->getLibrary()->getName()) {
                throw new \InvalidArgumentException(\sprintf('The media "%s" is stored in the library "%s", not in "%s"', $path->getPath(), $path->getLibrary()->getName(), $libraryName));
            }

            return new NullMedia($path->getPath(), $path->getLibrary()->getOriginalStorage());
        }

        $library = null === $libraryName ? $this->libraries->getDefault() : $this->libraries->get($libraryName);

        return new NullMedia($path, $library->getOriginalStorage());
    }

    public function guessMediaVariationFormat(Media|string $media, Variation|string $variation, ?string $libraryName = null): ?string
    {
        if ($media instanceof Media) {
            if (null !== $libraryName && $libraryName !== $media->getLibrary()->getName()) {
                throw new \InvalidArgumentException(\sprintf('The media "%s" is stored in the library "%s", not in "%s"', $media->getPath(), $media->getLibrary()->getName(), $libraryName));
            }
        } else {
            $media = $this->resolveMedia($media, $libraryName);
        }

        if (!$variation instanceof Variation) {
            $variation = $media->getLibrary()->getVariationContainer()->get($variation);
        }

        $mediaFormat = $media->getFormat();

        if (!$this->acceptsFormat($variation, $mediaFormat)) {
            return null;
        }

        $outputFormat = $variation->getFormat()->value ?? $mediaFormat;
        $outputFormats = [$outputFormat];

        if ($alternativeOutputFormat = Format::fromName($outputFormat)?->getAlternativeFormat()?->value) {
            $outputFormats[] = $alternativeOutputFormat;
        }

        foreach ($outputFormats as $outputFormat) {
            $processors = $this->processorContainer->getProcessors($mediaFormat, $outputFormat);

            if ([] !== $processors) {
                return $outputFormat;
            }
        }

        return null;
    }

    /**
     * With a variation, also tells whether that variation accepts the format
     * of the media: a SVG media is only processable by the variations that
     * rasterize it.
     */
    public function isMediaProcessable(Media $media, Variation|string|null $variation = null): bool
    {
        if ($media instanceof NullMedia) {
            return false;
        }

        $mediaFormat = $media->getFormat();

        if (!$this->processorContainer->canProcessInputFormat($mediaFormat)) {
            return false;
        }

        return null === $variation || $this->acceptsFormat($this->getVariation($variation, $media->getLibrary()->getName()), $mediaFormat);
    }

    /**
     * Tells whether the media stored at the given path can be processed,
     * based on the extension of the path alone.
     *
     * Unlike isMediaProcessable(), this never reaches the storage backend, so
     * that it can be called for every media of a large collection - for
     * instance to decide whether to sign the URLs of its variations. The
     * extension is trusted: a file whose extension does not match its
     * content gets the wrong answer, use isMediaProcessable() when that
     * matters.
     */
    public function isPathProcessable(string $path): bool
    {
        return $this->processorContainer->canProcessInputFormat(pathinfo($path, \PATHINFO_EXTENSION));
    }

    public static function normalizePath(string $path): string
    {
        return (string) preg_replace(
            ['/\/\/+/u', '/^(\.\/)+/u', '/\/(\.\/)+/u'],
            ['/', '', '/'],
            trim($path, '/'),
        );
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
                    // try to see if there is a variation with a constrained format that can generate a MediaVariation with this path
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

        if (!$this->isMediaProcessable($media, $variation)) {
            // the media is not processable, we won't be able to get the variation
            return null;
        }

        return $this->getVariation($variation, $libraryName)->getForMedia(
            $media,
            $this->guessMediaVariationFormat($media, $variation, $libraryName),
        );
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

    private function acceptsFormat(Variation $variation, string $mediaFormat): bool
    {
        return $variation->rasterizesSvg() || Format::SVG !== Format::fromName($mediaFormat);
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
