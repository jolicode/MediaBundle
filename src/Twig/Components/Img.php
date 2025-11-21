<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Model\NullMedia;
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

    /**
     * @var array<int, string> key is the width, value is the URL
     */
    public array $srcset = [];

    public ?string $sizes = null;

    public function __construct(
        private readonly Converter $converter,
        private readonly Resolver $resolver,
        private readonly LibraryContainer $libraries,
        private readonly ?LoggerInterface $logger = null,
    ) {
    }

    /**
     * @param string|string[]|null $variation
     */
    public function mount(
        ?Media $media = null,
        ?string $path = null,
        ?string $library = null,
        string|array|null $variation = null,
        ?string $class = null,
        ?string $sizes = null,
        ?string $width = null,
        ?string $height = null,
        bool $skipAutoDimensions = false,
        bool $allowAppendWebpAlternativeSource = false,
    ): void {
        if (null === $variation) {
            $srcset = [];
        } elseif (\is_array($variation)) {
            $srcset = $variation;
            $variation = ([] !== $srcset) ? $srcset[0] : null;
        } else {
            $srcset = [$variation];
        }

        if ($media instanceof NullMedia) {
            $this->logger?->error(\sprintf(
                'The media "%s" could not be resolved in the library "%s", and it will be rendered as a <img> tag with a non-existent src attribute. This may happen if the media file has been physically deleted without the entity being updated. You may need to configure the media removal behavior.',
                $media->getPath(),
                $media->getLibrary()->getName(),
            ));
            $path = $media->getPath();
            $media = null;
        } elseif ($media instanceof Media) {
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
                } catch (MediaNotFoundException|UnableToReadFile) {
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
            }
        }

        $this->path = $media->getUrl();

        if (!$media->isStored()) {
            $this->logger?->warning(\sprintf(
                'The media "%s" could not be resolved%s%s',
                $path,
                null !== $library ? \sprintf(' in the library "%s"', $library) : '',
                null !== $variation ? \sprintf(' with variation "%s"', $variation) : '',
            ));
        } else {
            $binary = $media->getBinary();

            if (!str_starts_with($binary->getMimeType(), 'image/')) {
                $this->logger?->warning(\sprintf(
                    'The media "%s"%s is not an image',
                    $path,
                    null !== $library ? \sprintf(' in the library "%s"', $library) : '',
                ));

                return;
            }
        }

        if (null !== $width || null !== $height) {
            $this->width = null !== $width ? (int) $width : null;
            $this->height = null !== $height ? (int) $height : null;
        } elseif ($media->isStored() && !$skipAutoDimensions) {
            $dimensions = $binary->getPixelDimensions();

            if (false !== $dimensions) {
                $this->width = $dimensions['width'];
                $this->height = $dimensions['height'];
            }
        }

        if (\count($srcset) > 1) {
            $library = $this->media->getLibrary()->getName();

            foreach ($srcset as $variationName) {
                $variationMedia = $this->resolver->resolveMediaVariation($path, $variationName, $library);

                if (!$variationMedia instanceof MediaVariation) {
                    $this->logger?->warning(\sprintf(
                        'The media variation "%s" for media "%s" could not be resolved in the library "%s"',
                        $variationName,
                        $path,
                        $library,
                    ));

                    continue;
                }

                try {
                    $this->converter->convertMediaVariation($variationMedia, false);
                } catch (\RuntimeException $e) {
                    $this->logger?->warning('Could not generate the variation file', [
                        'exception' => $e,
                        'media' => $variationMedia,
                    ]);
                }

                if (!$variationMedia->isStored()) {
                    continue;
                }

                $binary = $variationMedia->getBinary();
                $dimensions = $binary->getPixelDimensions();

                if (false !== $dimensions) {
                    $this->srcset[$dimensions['width']] = $variationMedia->getUrl();
                }
            }
        }

        ksort($this->srcset, \SORT_NUMERIC);

        if (\count($this->srcset) > 1) {
            if (null === $sizes) {
                // if no sizes are provided, assume the image will be displayed at its original width
                if (null !== $this->width) {
                    $this->sizes = $this->width . 'px';
                } else {
                    $minWidth = min(array_keys($this->srcset));
                    $this->sizes = $minWidth . 'px';
                }
            } else {
                $this->sizes = $sizes;
            }
        } else {
            // only one variation, simply output its URL
            $this->srcset = [];
            $this->sizes = $sizes;
        }
    }
}
