<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Model\Srcset;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Srcset\SrcsetBuilder;
use JoliCode\MediaBundle\Transformation\DimensionPredictor;
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
     * @var array<string, string> key is the descriptor, value is the WebP variation name
     */
    public array $webpAlternativeSrcset = [];

    public Srcset $srcset;

    public ?string $sizes = null;

    public function __construct(
        private readonly Resolver $resolver,
        private readonly LibraryContainer $libraries,
        private readonly SrcsetBuilder $srcsetBuilder,
        private readonly DimensionPredictor $dimensionPredictor,
        private readonly ?LoggerInterface $logger = null,
    ) {
        $this->srcset = new Srcset();
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
        bool $autoSrcset = true,
    ): void {
        // an explicit list of variations is used as-is
        $expandPixelRatios = $autoSrcset && !\is_array($variation);

        if (null === $variation) {
            $srcsetVariations = [];
        } elseif (\is_array($variation)) {
            $srcsetVariations = $variation;
            $variation = ([] !== $srcsetVariations) ? $srcsetVariations[0] : null;
        } else {
            $srcsetVariations = [$variation];
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

        if ($media instanceof MediaVariation && $allowAppendWebpAlternativeSource) {
            // when displaying an img tag in the context of a picture tag, try to get the webp alternative source
            $webpAlternativeVariation = $media->getVariation()->getWebpAlternativeVariation();

            if ($webpAlternativeVariation instanceof Variation) {
                $this->webpAlternativeSource = $webpAlternativeVariation->getName();
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
        } elseif (!str_starts_with($media->getMimeType(), 'image/')) {
            $this->logger?->warning(\sprintf(
                'The media "%s"%s is not an image',
                $path,
                null !== $library ? \sprintf(' in the library "%s"', $library) : '',
            ));

            return;
        }

        if (null !== $width || null !== $height) {
            $this->width = null !== $width ? (int) $width : null;
            $this->height = null !== $height ? (int) $height : null;
        } elseif (!$skipAutoDimensions) {
            $dimensions = $this->getDimensions($media);

            if (null !== $dimensions) {
                $this->width = $dimensions['width'];
                $this->height = $dimensions['height'];
            }
        }

        if ($expandPixelRatios && null !== $variation) {
            $srcsetVariations = $this->expandPixelRatioVariations($media, $variation);
        }

        if (\count($srcsetVariations) > 1) {
            $this->srcset = $this->srcsetBuilder->build(
                $media instanceof MediaVariation ? $media->getMedia() : $media,
                $srcsetVariations,
            );
        }

        if (\count($this->srcset) > 1) {
            // if no sizes are provided, assume the image will be displayed at its original width
            $this->sizes = $sizes ?? ($this->width ?? $this->srcset->getSmallestWidth()) . 'px';

            if (null !== $this->webpAlternativeSource) {
                $this->webpAlternativeSrcset = $this->getWebpAlternativeSrcset();
            }
        } else {
            // only one variation, simply output its URL
            $this->srcset = new Srcset();
            $this->sizes = $sizes;
        }
    }

    /**
     * @return array{height: int, width: int}|null
     */
    private function getDimensions(Media|MediaVariation $media): ?array
    {
        if ($media->isStored()) {
            $dimensions = $media->getPixelDimensions();

            return false === $dimensions ? null : $dimensions;
        }

        if ($media instanceof MediaVariation) {
            // the variation is not generated yet, compute its dimensions from its definition
            return $this->dimensionPredictor->predict($media);
        }

        return null;
    }

    /**
     * @return array<string, string>
     */
    private function getWebpAlternativeSrcset(): array
    {
        $webpAlternativeSrcset = [];

        foreach ($this->srcset as $candidate) {
            $webpAlternativeVariation = $candidate->mediaVariation->getVariation()->getWebpAlternativeVariation();

            if (!$webpAlternativeVariation instanceof Variation) {
                // keep the single WebP source
                return [];
            }

            $webpAlternativeSrcset[$candidate->descriptor] = $webpAlternativeVariation->getName();
        }

        return $webpAlternativeSrcset;
    }

    /**
     * @return string[]
     */
    private function expandPixelRatioVariations(Media|MediaVariation $media, string $variationName): array
    {
        $variationContainer = $media->getLibrary()->getVariationContainer();

        if (!$variationContainer->has($variationName)) {
            return [$variationName];
        }

        $pixelRatioVariations = $variationContainer->get($variationName)->getPixelRatioVariations();

        if ([] === $pixelRatioVariations) {
            return [$variationName];
        }

        return array_map(static fn (Variation $variation): string => $variation->getName(), $pixelRatioVariations);
    }
}
