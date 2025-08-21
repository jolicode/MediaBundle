<?php

namespace JoliCode\MediaBundle\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Inspector\TransformationDataHolder;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Transformer\BinaryOperation\BinaryOperationInterface;
use JoliCode\MediaBundle\Transformer\WithOperationTransformerInterface;
use JoliCode\MediaBundle\Transformer\WithTransformTransformerInterface;
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
        $this->transformationDataHolder?->create($transformation);

        while ($transformer = $transformation->shiftTransformers()) {
            if ($transformer instanceof WithTransformTransformerInterface) {
                $transformer->transform($transformation);
            }

            if ($transformer instanceof WithOperationTransformerInterface) {
                $binaryOperation = $transformer->getBinaryOperation($transformation->targetWidth, $transformation->targetHeight);
                $binary = $this->runBinaryOperation(
                    $transformation,
                    $binaryOperation,
                    $this->runTransformation($transformation),
                );
                $transformation = new Transformation(
                    $binary,
                    $transformation->getMediaVariation(),
                    $binary->getPixelWidth(),
                    $binary->getPixelHeight(),
                    $transformation->transformers,
                );
            }
        }

        $binary = $this->runTransformation($transformation);

        return $this->runPostProcessors($transformation, $binary);
    }

    private function runBinaryOperation(Transformation $transformation, BinaryOperationInterface $binaryOperation, Binary $binary): Binary
    {
        $processor = $this->processorContainer->get($binaryOperation->getProcessorName());
        $processorOptions = $transformation->getProcessorOptions($processor->getName());

        if ($this->logger instanceof LoggerInterface) {
            $this->logger->info('Running binary operation', [
                'operation' => $binaryOperation::class,
                'processor' => $processor->getName(),
            ]);
        }

        $binary = $processor->processBinaryOperation($binary, $binaryOperation, $processorOptions);

        $this->transformationDataHolder?->addStep($transformation, \sprintf(
            'Executed a "%s" binary operation with the "%s" processor',
            $binaryOperation::class,
            $processor->getName(),
        ), [
            'operation' => $binaryOperation->getMetadata(),
        ]);

        return $binary;
    }

    private function runTransformation(Transformation $transformation): Binary
    {
        if (!$transformation->mustRun) {
            return $transformation->getBinary();
        }

        $transformation->mustRun = false;
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

        $this->transformationDataHolder?->complete($transformation, $binary);

        return $binary;
    }
}
