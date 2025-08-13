<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;

readonly class Gif2webp extends AbstractProcessor implements ProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'lossy' => true,
        'metadata' => 'none',
        'min_size' => true,
    ];

    /**
     * @param array<string, mixed> $options
     */
    public function __construct(
        private ProcessorContainer $processorContainer,
        private ?string $gif2webpBinary = '/usr/local/bin/gif2webp',
        private array $options = [],
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getName(): string
    {
        return 'gif2webp';
    }

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array
    {
        return [Format::GIF];
    }

    /**
     * @return Format[]
     */
    public function getProcessableOutputFormats(): array
    {
        return [Format::WEBP];
    }

    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        $this->checkOutputFormat($forceOutputFormat ?? $transformation->getOutputFormat());

        // apply the transformations to the gif input
        $gifProcessors = $this->processorContainer->getProcessors(
            $binary->getFormat(),
            Format::GIF->value,
        );
        $transformed = false;

        while (false === $transformed && $gifProcessor = current($gifProcessors)) {
            try {
                $binary = $gifProcessor->process($binary, $transformation, [], Format::GIF->value);
                $transformed = true;
            } catch (\Exception $e) {
                // continue with the next processor
                $this->logger?->error(\sprintf(
                    'Could not apply the variation "%s" to the media "%s". The "%s" processor failed with the following error:%s',
                    $transformation->getVariationName(),
                    $binary->getPath() ?? '-',
                    $gifProcessor::class,
                    "\n\n" . $e->getMessage(),
                ));
            }

            next($gifProcessors);
        }

        if (false === $transformed) {
            throw new \RuntimeException('No processor worked for this variation');
        }

        // use gif2webp to convert the gif to webp
        $outputTemporaryFile = $this->acquireTemporaryFilePath('gif2webp');
        $inputTemporaryFile = $this->writeTemporaryFile($binary);
        $process = $this->createProcess(array_merge([
            $this->gif2webpBinary,
            '-o',
            $outputTemporaryFile,
        ], $this->parseOptions($processingOptions), [
            '--',
            $inputTemporaryFile,
        ]));
        $this->logger?->info('Processing image with Gif2webp', [
            'original size' => filesize($inputTemporaryFile),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->mustRun();

            $this->logger?->info('Processed image with Gif2webp', [
                'processed size' => filesize($outputTemporaryFile),
            ]);

            return new Binary(
                'image/webp',
                Format::WEBP->value,
                file_get_contents($outputTemporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $outputTemporaryFile)),
            );
        } catch (\Exception $exception) {
            $this->logger?->error('Gif2webp processing failed', ['exception' => $exception]);

            throw $exception;
        } finally {
            unlink($outputTemporaryFile);
            unlink($inputTemporaryFile);
        }
    }

    /**
     * @param array<string, mixed> $options
     *
     * @return string[]
     */
    private function parseOptions(array $options = []): array
    {
        $options = array_merge(self::DEFAULT_OPTIONS, $this->options, $options);
        $parsedOptions = [];

        foreach ($options as $key => $value) {
            switch ($key) {
                case 'lossy':
                    if (true === $value) {
                        $parsedOptions[] = '-lossy';
                    }

                    break;
                case 'metadata':
                    if (\is_array($value)) {
                        $value = implode(',', $value);
                    }

                    $parsedOptions[] = '-metadata';
                    $parsedOptions[] = $value;

                    break;
                case 'min_size':
                    if (true === $value) {
                        $parsedOptions[] = '-min_size';
                    }

                    break;
            }
        }

        return $parsedOptions;
    }
}
