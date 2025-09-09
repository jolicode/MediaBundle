<?php

namespace JoliCode\MediaBundle\Conversion;

use JoliCode\MediaBundle\Inspector\TransformationDataHolder;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use Psr\Log\LoggerInterface;

readonly class Converter
{
    public function __construct(
        private LibraryContainer $libraries,
        private Resolver $resolver,
        private TransformationProcessor $transformationProcessor,
        private ?TransformationDataHolder $transformationDataHolder = null,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function convert(Media|string $media, ?string $libraryName = null, ?string $variationName = null, bool $force = false): void
    {
        if ($media instanceof Media) {
            if (null !== $libraryName && $libraryName !== $media->getLibrary()->getName()) {
                throw new \InvalidArgumentException(\sprintf('The media "%s" is stored in the library "%s", not in "%s"', $media->getPath(), $media->getLibrary()->getName(), $libraryName));
            }

            $path = $media->getPath();
            $libraryName = $media->getLibrary()->getName();
        } else {
            $path = $media;
            $media = $this->resolver->resolveMedia($path, $libraryName);
        }

        $variationContainer = $this->libraries->get($libraryName)->getVariationContainer();

        $variations = null === $variationName ? $variationContainer->list() : [$variationContainer->get($variationName)];

        foreach ($variations as $variation) {
            if (!$variation->canBeAppliedTo($media)) {
                $this->logger?->info(\sprintf(
                    'Variation "%s" cannot be applied to media "%s" du to a voter restriction',
                    $variation->getName(),
                    $media->getPath(),
                ));

                continue;
            }

            $mediaVariation = $variation->getForMedia(
                $media,
                $this->resolver->guessMediaVariationFormat($media, $variation, $libraryName),
            );
            $this->convertMediaVariation($mediaVariation, $force);
        }
    }

    public function convertMediaVariation(MediaVariation $mediaVariation, bool $force = true): void
    {
        if (!\in_array(Format::fromName($mediaVariation->getMedia()->getFormat()), $this->transformationProcessor->getProcessableInputFormats(), true)) {
            return;
        }

        if (!$force && $mediaVariation->isStored()) {
            return;
        }

        $this->transformationDataHolder?->create($mediaVariation);
        $binary = $mediaVariation->getMedia()->getBinary();

        foreach ($mediaVariation->getVariation()->getPreProcessors() as $preProcessor) {
            try {
                $binary = $preProcessor->process($binary, $mediaVariation);
            } catch (\Exception $e) {
                $this->logger?->error(\sprintf(
                    'Error while processing pre-processor "%s" for media "%s": %s',
                    $preProcessor::class,
                    $mediaVariation->getMedia()->getPath(),
                    $e->getMessage(),
                ));

                return;
            }
        }

        $transformation = new Transformation($binary, $mediaVariation);
        $binary = $this->transformationProcessor->process($transformation);
        $mediaVariation->store($binary);
        $this->transformationDataHolder?->complete($mediaVariation, $binary);
    }

    public function convertIfMustStoreWhenGeneratingUrl(MediaVariation $mediaVariation): void
    {
        if ($mediaVariation->getStorage()->mustStoreWhenGeneratingUrl($mediaVariation)) {
            $this->convertMediaVariation($mediaVariation);
        }
    }

    public function getMediaVariation(string $path, string $variationName, ?string $libraryName = null): ?MediaVariation
    {
        return $this->resolver->resolveMediaVariation($path, $variationName, $libraryName);
    }
}
