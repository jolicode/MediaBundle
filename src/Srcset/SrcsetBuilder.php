<?php

namespace JoliCode\MediaBundle\Srcset;

use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Model\Srcset;
use JoliCode\MediaBundle\Model\SrcsetCandidate;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Transformation\DimensionPredictor;
use League\Flysystem\UnableToReadFile;
use Psr\Log\LoggerInterface;

readonly class SrcsetBuilder
{
    public function __construct(
        private Resolver $resolver,
        private DimensionPredictor $dimensionPredictor,
        private ?LoggerInterface $logger = null,
    ) {
    }

    /**
     * @param string[] $variationNames
     */
    public function build(
        Media|string $media,
        array $variationNames,
        ?string $libraryName = null,
    ): Srcset {
        $candidates = [];

        foreach ($variationNames as $variationName) {
            $candidate = $this->tryCreateCandidate($media, $variationName, null, $libraryName, false);

            if (!$candidate instanceof SrcsetCandidate || null === $candidate->width) {
                // a width descriptor cannot be built without the width
                continue;
            }

            // a srcset must not hold two candidates of the same width, the first one wins
            $candidates[$candidate->width] ??= $candidate;
        }

        ksort($candidates, \SORT_NUMERIC);

        return new Srcset(...array_values($candidates));
    }

    /**
     * @param array<string, string> $variationNamesByDescriptor the keys are the descriptors ("2x", "800w", or an empty string)
     */
    public function buildWithDescriptors(
        Media|string $media,
        array $variationNamesByDescriptor,
        ?string $libraryName = null,
        bool $skipDimensions = false,
    ): Srcset {
        $candidates = [];

        foreach ($variationNamesByDescriptor as $descriptor => $variationName) {
            $candidate = $this->tryCreateCandidate($media, $variationName, (string) $descriptor, $libraryName, $skipDimensions);

            if ($candidate instanceof SrcsetCandidate) {
                $candidates[] = $candidate;
            }
        }

        return new Srcset(...$candidates);
    }

    /**
     * @param string|null $descriptor when null, a width descriptor is built from the width of the variation
     *
     * @return SrcsetCandidate|null null when the variation does not apply to this media
     *
     * @throws UnableToReadFile
     */
    public function createCandidate(
        Media|string $media,
        string $variationName,
        ?string $descriptor = null,
        ?string $libraryName = null,
        bool $skipDimensions = false,
    ): ?SrcsetCandidate {
        $mediaVariation = $this->resolver->resolveMediaVariation($media, $variationName, $libraryName);

        if (!$mediaVariation instanceof MediaVariation) {
            return null;
        }

        // generate the URL first: depending on the "must_store_when_generating_url"
        // setting, this stores the variation file
        $url = $mediaVariation->getUrl();
        $dimensions = null;
        $hasPredictedDimensions = false;

        if ($mediaVariation->isStored()) {
            $mimeType = $mediaVariation->getMimeType();

            if (!$skipDimensions) {
                $storedDimensions = $mediaVariation->getPixelDimensions();
                $dimensions = false === $storedDimensions ? null : $storedDimensions;
            }
        } else {
            // if the variation forces a format, we can use it to determine the mime type
            $mimeType = $mediaVariation->getVariation()->getFormat()?->getMimeType();

            if (!$skipDimensions) {
                $dimensions = $this->dimensionPredictor->predict($mediaVariation);
                $hasPredictedDimensions = null !== $dimensions;
            }
        }

        $width = $dimensions['width'] ?? null;

        return new SrcsetCandidate(
            mediaVariation: $mediaVariation,
            url: $url,
            descriptor: $descriptor ?? (null === $width ? '' : $width . 'w'),
            width: $width,
            height: $dimensions['height'] ?? null,
            mimeType: $mimeType,
            hasPredictedDimensions: $hasPredictedDimensions,
        );
    }

    private function tryCreateCandidate(
        Media|string $media,
        string $variationName,
        ?string $descriptor,
        ?string $libraryName,
        bool $skipDimensions,
    ): ?SrcsetCandidate {
        try {
            return $this->createCandidate($media, $variationName, $descriptor, $libraryName, $skipDimensions);
        } catch (UnableToReadFile $unableToReadFile) {
            $this->logger?->warning('Could not resolve media variation', [
                'exception' => $unableToReadFile,
                'media' => $media,
                'variation' => $variationName,
            ]);

            return null;
        }
    }
}
