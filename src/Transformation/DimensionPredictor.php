<?php

namespace JoliCode\MediaBundle\Transformation;

use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Transformer\NeedsImmediateProcessingTransformerInterface;
use JoliCode\MediaBundle\Transformer\PredictableTransformerInterface;
use JoliCode\MediaBundle\Variation\Variation;
use Psr\Log\LoggerInterface;

readonly class DimensionPredictor
{
    public function __construct(
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function supports(Variation $variation): bool
    {
        foreach ($variation->getPreProcessors() as $preProcessor) {
            if (!$preProcessor->preservesPixelDimensions()) {
                // the pre-processor may return a binary of any size
                return false;
            }
        }

        foreach ($variation->getTransformerChain()->getTransformers() as $transformer) {
            if ($transformer instanceof PredictableTransformerInterface) {
                continue;
            }

            if ($transformer instanceof NeedsImmediateProcessingTransformerInterface) {
                // the transformer needs the binary content, which is not available here
                return false;
            }
        }

        return true;
    }

    /**
     * @return array{height: int, width: int}|null
     */
    public function predict(MediaVariation $mediaVariation): ?array
    {
        $variation = $mediaVariation->getVariation();

        if (!$this->supports($variation)) {
            return null;
        }

        $media = $mediaVariation->getMedia();

        if (!$variation->canBeAppliedTo($media)) {
            return null;
        }

        $dimensions = $media->getPixelDimensions();

        if (false === $dimensions) {
            return null;
        }

        $transformation = Transformation::forDimensions($mediaVariation, $dimensions['width'], $dimensions['height']);

        try {
            while ($transformer = $transformation->shiftTransformers()) {
                if ($transformer instanceof PredictableTransformerInterface) {
                    if ($transformer instanceof NeedsImmediateProcessingTransformerInterface) {
                        // the TransformationProcessor processes the binary before running this
                        // transformer, so restart from the dimensions computed so far
                        $output = $transformation->getOutputDimensions();

                        if (null === $output) {
                            return null;
                        }

                        $transformation->setDimensions($output['width'], $output['height']);
                    }

                    $transformer->predictDimensions($transformation);

                    continue;
                }

                $transformer->transform($transformation);
            }
        } catch (\Throwable $throwable) {
            $this->logger?->debug('Could not predict the dimensions of a media variation', [
                'exception' => $throwable,
                'media' => $media->getPath(),
                'variation' => $variation->getName(),
            ]);

            return null;
        }

        return $transformation->getOutputDimensions();
    }
}
