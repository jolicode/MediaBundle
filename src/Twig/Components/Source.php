<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\Srcset;
use JoliCode\MediaBundle\Model\SrcsetCandidate;
use JoliCode\MediaBundle\Srcset\SrcsetBuilder;
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

    public Srcset $srcset;

    public ?string $type = null;

    public ?int $height = null;

    public ?int $width = null;

    /**
     * @var array<string, string>|null
     */
    public ?array $webpAlternativeSrcset = [];

    public function __construct(
        private readonly SrcsetBuilder $srcsetBuilder,
        private readonly ?LoggerInterface $logger = null,
    ) {
        $this->srcset = new Srcset();
    }

    /**
     * @param array<string, string>|string|null $srcset
     */
    public function mount(
        Media $media,
        ?string $variation = null,
        array|string|null $srcset = null,
        bool $skipAutoDimensions = false,
    ): void {
        $this->media = $media;

        if (null !== $variation) {
            $candidate = $this->srcsetBuilder->createCandidate($media, $variation, '', skipDimensions: $skipAutoDimensions);

            if (!$candidate instanceof SrcsetCandidate) {
                throw new \InvalidArgumentException(\sprintf('Media variation "%s" not found for the media "%s".', $variation, $media->getPath()));
            }

            $this->srcset = new Srcset($candidate);
            $this->width = $candidate->width;
            $this->height = $candidate->height;

            if ($candidate->isStored()) {
                $this->type = $candidate->mimeType;
            }

            return;
        }

        if (null === $srcset) {
            throw new \InvalidArgumentException('You must provide either a srcset or a variation name');
        }

        if (\is_string($srcset)) {
            $srcset = ['' => $srcset];
        }

        $candidates = [];
        $types = [];
        $webpAlternativeSrcset = [];

        foreach ($srcset as $descriptor => $name) {
            try {
                $candidate = $this->srcsetBuilder->createCandidate($media, $name, (string) $descriptor, skipDimensions: $skipAutoDimensions);
            } catch (UnableToReadFile $e) {
                $this->logger?->warning('Could not resolve media variation', [
                    'exception' => $e,
                    'media' => $media,
                    'variation' => $name,
                ]);

                continue;
            }

            if (!$candidate instanceof SrcsetCandidate) {
                throw new \InvalidArgumentException(\sprintf('Media variation "%s" not found for the media "%s".', $name, $media->getPath()));
            }

            $candidates[] = $candidate;
            $mediaVariation = $candidate->mediaVariation;

            if (null === $this->height) {
                $this->width = $candidate->width;
                $this->height = $candidate->height;
            }

            if (!$skipAutoDimensions && $mediaVariation->isStored()) {
                $types[] = $candidate->mimeType;
            } elseif ($mediaVariation->getVariation()->getFormat() instanceof Format) {
                // if the variation forces a format, we can use it to determine the mime type
                $types[] = $mediaVariation->getVariation()->getFormat()->getMimeType();
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

        $this->srcset = new Srcset(...$candidates);

        if ('image/webp' !== $this->type) {
            $this->webpAlternativeSrcset = $webpAlternativeSrcset;
        }
    }
}
