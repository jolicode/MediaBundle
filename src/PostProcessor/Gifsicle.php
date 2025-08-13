<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

readonly class Gifsicle extends AbstractPostProcessor implements PostProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'optimize' => 3,
        'lossy' => 20,
        'colors' => 256,
    ];

    public function getName(): string
    {
        return 'gifsicle';
    }

    /**
     * @return Format[]
     */
    public function getProcessableFormats(): array
    {
        return [Format::GIF];
    }

    public function process(Binary $binary, array $postProcessingOptions = []): Binary
    {
        $this->checkFormat($binary->getFormat());

        if (false === $this->isEnabled() || isset($postProcessingOptions['enabled']) && false === $postProcessingOptions['enabled']) {
            $this->logger?->info('Gifsicle post-processor is disabled, skipping processing.');

            return $binary;
        }

        $temporaryFile = $this->writeTemporaryFile($binary);
        $outputTemporaryFile = $this->acquireTemporaryFilePath();
        $process = $this->createProcess(array_merge(
            [$this->binary],
            $this->parseOptions($postProcessingOptions),
            ['--no-warnings', '--output', $outputTemporaryFile],
            [$temporaryFile, '-o', $outputTemporaryFile],
        ));
        $this->logger?->info('Post-processing image with Gifsicle', [
            'original size' => $binary->getContentSize(),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->mustRun();

            if ($binary->getContentSize() > filesize($outputTemporaryFile)) {
                $binary = new Binary(
                    $binary->getMimeType(),
                    $binary->getFormat(),
                    file_get_contents($outputTemporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $outputTemporaryFile)),
                );
            }
        } catch (\Exception $exception) {
            $this->logger?->error('Gifsicle post-processing failed', ['exception' => $exception]);
        } finally {
            unlink($temporaryFile);
            unlink($outputTemporaryFile);
        }

        $this->logger?->info('Processed image with Gifsicle', [
            'processed size' => $binary->getContentSize(),
        ]);

        return $binary;
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
