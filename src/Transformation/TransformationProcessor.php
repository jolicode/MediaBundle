<?php

namespace JoliCode\MediaBundle\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use Psr\Log\LoggerInterface;

readonly class TransformationProcessor
{
    public function __construct(
        private ProcessorContainer $processorContainer,
        private PostProcessorContainer $postProcessorContainer,
        private ?LoggerInterface $logger = null,
    ) {
    }

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array
    {
        return $this->processorContainer->getProcessableInputFormats();
    }

    public function process(Transformation $transformation): Binary
    {
        while ($transformer = $transformation->shiftTransformers()) {
            $transformer->transform($transformation);

            if ($transformer->needsBinaryProcessing()) {
                $binary = $this->runTransformation($transformation);
                $binaryProcessor = $this->processorContainer->get($transformer->getBinaryProcessorName());
                $binary = $binaryProcessor->processBinaryOperation(
                    $transformer->getBinaryOperation(
                        $binary, $transformation->targetWidth, $transformation->targetHeight
                    ),
                );

                $transformation = new Transformation(
                    $binary,
                    $transformation->getVariation(),
                    $binary->getPixelWidth(),
                    $binary->getPixelHeight(),
                    $transformation->transformers,
                );
            }
        }

        $binary = $this->runTransformation($transformation);

        return $this->runPostProcessors($transformation, $binary);
    }

    private function runTransformation(Transformation $transformation): Binary
    {
        $outputFormats = $transformation->getPossibleOutputFormats();

        foreach ($outputFormats as $outputFormat) {
            $processors = $this->processorContainer->getProcessors($transformation->getInputFormat(), $outputFormat);

            foreach ($processors as $processor) {
                try {
                    return $processor->process(
                        $transformation->getBinary(),
                        $transformation,
                        $transformation->getProcessorOptions($processor->getName()),
                        $outputFormat,
                    );
                } catch (\Exception $e) {
                    // continue with the next processor
                    $this->logger?->error(\sprintf(
                        'Could not apply the variation "%s" to the media "%s". The "%s" processor failed with the following error:%s',
                        $transformation->getVariationName(),
                        $transformation->getBinary()->getPath() ?? '-',
                        $processor::class,
                        "\n\n" . $e->getMessage(),
                    ));
                }
            }
        }

        throw new \RuntimeException('No processor worked for this variation');
    }

    private function runPostProcessors(Transformation $transformation, Binary $binary): Binary
    {
        foreach ($this->postProcessorContainer->getPostProcessors($binary->getFormat()) as $postProcessor) {
            $binary = $postProcessor->process(
                $binary,
                $transformation->getPostProcessorOptions($postProcessor->getName()),
            );
        }

        return $binary;
    }
}
