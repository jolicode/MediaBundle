<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\UnableToReadFile;
use Psr\Log\LoggerInterface;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(
    template: '@JoliMediaBundle/templates/components/Img.html.twig',
)]
class Img
{
    public Media|MediaVariation $media;

    public string $path;

    public ?string $class = null;

    public ?int $height = null;

    public ?int $width = null;

    public ?string $webpAlternativeSource = null;

    public function __construct(
        private readonly Converter $converter,
        private readonly Resolver $resolver,
        private readonly LibraryContainer $libraries,
        private readonly ?LoggerInterface $logger = null,
    ) {
    }

    public function mount(
        ?Media $media = null,
        ?string $path = null,
        ?string $library = null,
        ?string $variation = null,
        ?string $class = null,
        bool $skipAutoDimensions = false,
        bool $allowAppendWebpAlternativeSource = false,
    ): void {
        if ($media instanceof Media) {
            if (null !== $path) {
                throw new \InvalidArgumentException('You must provide either a media or a path, not both');
            }

            $originalMedia = $media;
            $path = $media->getPath();

            if (null !== $variation) {
                try {
                    // try to resolve the media variation
                    $media = $this->resolver->resolveMediaVariation($media, $variation);
                } catch (UnableToReadFile $e) {
                    $this->logger?->warning('Could not resolve media variation', [
                        'exception' => $e,
                        'media' => $media,
                        'variation' => $variation,
                    ]);
                    $media = null;
                }
            }
        } else {
            if (null === $path) {
                throw new \InvalidArgumentException('You must provide either a media or a path');
            }

            $media = $this->resolver->resolve($path, $library, $variation);
        }

        $this->path = $path;
        $this->class = $class;

        if (null === $media) {
            if (null !== $variation) {
                // try to resolve the original media, the format might be non-processable
                try {
                    $media = $originalMedia ?? $this->resolver->resolveMedia($path, $library);

                    if ($this->resolver->isMediaProcessable($media)) {
                        // the media variation should have been resolved as it is processable
                        // output the expected url of the media variation
                        $this->path = $media->createVariation($variation)->getUrl();

                        return;
                    }
                } catch (MediaNotFoundException | UnableToReadFile) {
                    $media = null;
                }
            }

            if (!$media instanceof Media) {
                // the media resolver could not resolve the media
                // generate the media URL using the library
                $library = $this->libraries->get($library);

                if (null !== $variation) {
                    $this->path = $library->getCacheStorage()->getUrl($path, $library->getVariation($variation));
                } else {
                    $this->path = $library->getOriginalStorage()->getUrl($path);
                }

                return;
            }
        }

        $this->media = $media;

        if ($media instanceof MediaVariation) {
            try {
                $this->converter->convertIfMustStoreWhenGeneratingUrl($media);

                if ($allowAppendWebpAlternativeSource) {
                    // when displaying an iimg tag in the ocntext of a picture tag, try to get the webp alternative source
                    $webpAlternativeVariation = $media->getVariation()->getWebpAlternativeVariation();

                    if ($webpAlternativeVariation instanceof Variation) {
                        $this->webpAlternativeSource = $webpAlternativeVariation->getName();
                    }
                }
            } catch (\RuntimeException $e) {
                $this->logger?->warning('Could not generate the variation file', [
                    'exception' => $e,
                    'media' => $media,
                ]);
            } finally {
                if (!$media->isStored()) {
                    // the media variation is not stored yet, simply output the template
                    // the media variation will be generated on the fly
                    $this->path = $media->getUrl();

                    return;
                }
            }
        }

        if (!$media->isStored()) {
            throw $this->createNonResolvedException($path, $library, $variation);
        }

        $this->path = $media->getUrl();
        $binary = $media->getBinary();

        if (!str_starts_with($binary->getMimeType(), 'image/')) {
            throw new \RuntimeException(\sprintf('The media "%s"%s is not an image', $path, null !== $library ? \sprintf(' in the library "%s"', $library) : ''));
        }

        if (!$skipAutoDimensions) {
            $dimensions = $binary->getPixelDimensions();

            if (false !== $dimensions) {
                $this->width = $dimensions['width'];
                $this->height = $dimensions['height'];
            }
        }
    }

    private function createNonResolvedException(
        string $path,
        ?string $library = null,
        ?string $variation = null,
    ): \RuntimeException {
        return new \RuntimeException(\sprintf(
            'The media "%s" could not be resolved%s%s',
            $path,
            null !== $library ? \sprintf(' in the library "%s"', $library) : '',
            null !== $variation ? \sprintf(' with variation "%s"', $variation) : '',
        ));
    }
}
