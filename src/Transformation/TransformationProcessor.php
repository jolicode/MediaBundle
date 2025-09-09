<?php

namespace JoliCode\MediaBundle\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Inspector\TransformationDataHolder;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Transformer\NeedsImmediateProcessingTransformerInterface;
use Psr\Log\LoggerInterface;

readonly class TransformationProcessor
{
    public function __construct(
        private ProcessorContainer $processorContainer,
        private PostProcessorContainer $postProcessorContainer,
        private ?LoggerInterface $logger = null,
        private ?TransformationDataHolder $transformationDataHolder = null,
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
            if ($transformer instanceof NeedsImmediateProcessingTransformerInterface) {
                $transformation->setBinary(
                    $this->runTransformation($transformation)
                );
            }

            $transformer->transform($transformation);
        }

        $binary = $this->runTransformation($transformation);

        return $this->runPostProcessors($transformation, $binary);
    }

    private function runTransformation(Transformation $transformation): Binary
    {
        if (!$transformation->mustRun()) {
            return $transformation->getBinary();
        }

        $outputFormats = $transformation->getPossibleOutputFormats();

        foreach ($outputFormats as $outputFormat) {
            $processors = $this->processorContainer->getProcessors($transformation->getInputFormat(), $outputFormat);

            foreach ($processors as $processor) {
                $processorOptions = $transformation->getProcessorOptions($processor->getName());
                $statusDescription = '';

                try {
                    $binary = $processor->process(
                        $transformation->getBinary(),
                        $transformation,
                        $processorOptions,
                        $outputFormat,
                    );
                    $statusDescription = \sprintf(
                        'Executed the transformation with the "%s" processor',
                        $processor->getName()
                    );

                    return $binary;
                } catch (\Exception $e) {
                    // continue with the next processor
                    $this->logger?->error(\sprintf(
                        'Could not apply the variation "%s" to the media "%s". The "%s" processor failed with the following error:%s',
                        $transformation->getVariationName(),
                        $transformation->getBinary()->getPath() ?? '-',
                        $processor::class,
                        "\n\n" . $e->getMessage(),
                    ), [
                        'exception' => $e,
                        'media' => $transformation->getBinary()->getPath() ?? '-',
                        'variation' => $transformation->getVariationName(),
                    ]);
                    $statusDescription = \sprintf(
                        'Failed to execute the transformation with the "%s" processor',
                        $processor->getName()
                    );
                } finally {
                    $this->transformationDataHolder?->addStep($transformation, $statusDescription, [
                        'transformation' => $transformation->getAsMetadata(),
                        'processorOptions' => $processorOptions,
                        'outputFormat' => $outputFormat,
                    ]);
                }
            }
        }

        throw new \RuntimeException('No processor worked for this variation');
    }

    private function runPostProcessors(Transformation $transformation, Binary $binary): Binary
    {
        foreach ($this->postProcessorContainer->getPostProcessors($binary->getFormat()) as $postProcessor) {
            $postProcessorOptions = $transformation->getPostProcessorOptions($postProcessor->getName());
            $binary = $postProcessor->process(
                $binary,
                $postProcessorOptions,
            );
            $this->transformationDataHolder?->addStep($transformation, \sprintf(
                'Executed the "%s" post-processor',
                $postProcessor->getName(),
            ), [
                'postProcessorOptions' => $postProcessorOptions,
            ]);
        }

        return $binary;
    }
}
