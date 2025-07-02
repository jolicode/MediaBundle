<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\UnableToReadFile;
use Psr\Log\LoggerInterface;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(
    template: '@JoliMediaBundle/templates/components/Source.html.twig',
)]
class Source
{
    public Media $media;

    public string $srcset;

    public ?string $type = null;

    public ?int $height = null;

    public ?int $width = null;

    /**
     * @var array<string, string>|null
     */
    public ?array $webpAlternativeSrcset = [];

    public function __construct(
        private readonly Converter $converter,
        private readonly Resolver $resolver,
        private readonly ?LoggerInterface $logger = null,
    ) {
    }

    /**
     * @param array<string, string>|null $srcset
     */
    public function mount(
        Media $media,
        ?string $variation = null,
        ?array $srcset = null,
    ): void {
        $this->media = $media;

        if (null !== $variation) {
            $mediaVariation = $this->resolver->resolveMediaVariation($media, $variation);

            if (!$mediaVariation instanceof MediaVariation) {
                throw new \InvalidArgumentException(\sprintf('Media variation "%s" not found for the media "%s".', $variation, $media->getPath()));
            }

            $this->srcset = $mediaVariation->getUrl();

            try {
                $this->converter->convertIfMustStoreWhenGeneratingUrl($mediaVariation);
            } catch (\RuntimeException $e) {
                $this->logger?->warning('Could not generate the variation file', [
                    'exception' => $e,
                    'mediaVariation' => $mediaVariation,
                ]);
            }

            if ($mediaVariation->isStored()) {
                $this->type = $mediaVariation->getMimeType();
                $dimensions = $mediaVariation->getBinary()->getPixelDimensions();

                if (false !== $dimensions) {
                    $this->width = $dimensions['width'];
                    $this->height = $dimensions['height'];
                }
            }

            return;
        }

        if (null === $srcset) {
            throw new \InvalidArgumentException('You must provide either a srcset or a name');
        }

        $candidates = [];
        $types = [];
        $webpAlternativeSrcset = [];

        foreach ($srcset as $descriptor => $name) {
            try {
                $mediaVariation = $this->resolver->resolveMediaVariation($media, $name);
            } catch (UnableToReadFile $e) {
                $this->logger?->warning('Could not resolve media variation', [
                    'exception' => $e,
                    'media' => $media,
                    'variation' => $name,
                ]);
                continue;
            }

            if (!$mediaVariation instanceof MediaVariation) {
                throw new \InvalidArgumentException(\sprintf('Media variation "%s" not found for the media "%s".', $name, $media->getPath()));
            }

            try {
                $this->converter->convertIfMustStoreWhenGeneratingUrl($mediaVariation);
                $candidates[] = \sprintf('%s %s', $mediaVariation->getUrl(), $descriptor);
            } catch (\RuntimeException $e) {
                $this->logger?->warning('Could not generate the variation file', [
                    'exception' => $e,
                    'mediaVariation' => $mediaVariation,
                ]);
            }

            if ($mediaVariation->isStored()) {
                $types[] = $mediaVariation->getMimeType();

                if (null === $this->height) {
                    $dimensions = $mediaVariation->getBinary()->getPixelDimensions();

                    if (false !== $dimensions) {
                        $this->width = $dimensions['width'];
                        $this->height = $dimensions['height'];
                    }
                }
            }

            if (!\in_array('image/webp', $types, true)) {
                $webpAlternativeVariation = $mediaVariation->getVariation()->getWebpAlternativeVariation();

                if ($webpAlternativeVariation instanceof Variation) {
                    $webpAlternativeSrcset[$descriptor] = $webpAlternativeVariation->getName();
                }
            }
        }

        if (\count(array_unique($types)) > 1) {
            $variationNames = array_unique(array_values($srcset));
            sort($variationNames);
            $mimeTypes = array_unique($types);
            sort($mimeTypes);

            throw new \InvalidArgumentException(\sprintf("When defining a picture's source, you must provide the same mime type for all variations. The following variations have different mime types: %s (%s)", implode(', ', $variationNames), implode(', ', $mimeTypes)));
        }

        if ([] !== $types) {
            $this->type = $types[0];
        }

        $this->srcset = implode(', ', $candidates);

        if ('image/webp' !== $this->type) {
            $this->webpAlternativeSrcset = $webpAlternativeSrcset;
        }
    }
}
