<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;

readonly class Gifsicle extends AbstractProcessor implements ProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'optimize' => 3,
        'lossy' => 20,
        'colors' => 256,
    ];

    /**
     * @param array<string, mixed> $options
     */
    public function __construct(
        private ?string $binary = null,
        private array $options = [],
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getName(): string
    {
        return 'gifsicle';
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
        return [Format::GIF];
    }

    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        $inputTemporaryFile = $this->writeTemporaryFile($binary);
        $outputTemporaryFile = $this->acquireTemporaryFilePath();
        $transformationOptions = $transformation->getAsGifsicleOptions();
        $process = $this->createProcess(array_merge(
            [$this->binary],
            $transformationOptions,
            $this->parseOptions($processingOptions),
            [$inputTemporaryFile, '-o', $outputTemporaryFile],
        ));
        $this->logger?->info('Processing image with Gifsicle', [
            'transformation' => $transformation,
            'original size' => filesize($inputTemporaryFile),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->mustRun();

            $this->logger?->info('Processed image with Gifsicle', [
                'processed size' => filesize($outputTemporaryFile),
            ]);

            return new Binary(
                'image/gif',
                Format::GIF->value,
                file_get_contents($outputTemporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $outputTemporaryFile)),
            );
        } catch (\Exception $exception) {
            $this->logger?->error('Gifsicle processing failed', ['exception' => $exception]);

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
                case 'optimize':
                    $parsedOptions[] = '-O' . $value;

                    break;
                case 'lossy':
                    $parsedOptions[] = '--lossy=' . $value;

                    break;
                case 'colors':
                    $parsedOptions[] = '--colors';
                    $parsedOptions[] = $value;

                    break;
            }
        }

        return $parsedOptions;
    }
}
