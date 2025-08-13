<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

readonly class Jpegoptim extends AbstractPostProcessor implements PostProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'strip_all' => true,
        'progressive' => true,
        'max_quality' => 80,
    ];

    public function getName(): string
    {
        return 'jpegoptim';
    }

    /**
     * @return Format[]
     */
    public function getProcessableFormats(): array
    {
        return [Format::JPEG];
    }

    public function process(Binary $binary, array $postProcessingOptions = []): Binary
    {
        $this->checkFormat($binary->getFormat());

        if (false === $this->isEnabled() || isset($postProcessingOptions['enabled']) && false === $postProcessingOptions['enabled']) {
            $this->logger?->info('Jpegoptim post-processor is disabled, skipping processing.');

            return $binary;
        }

        $temporaryFile = $this->writeTemporaryFile($binary);
        $process = $this->createProcess(array_merge(
            [$this->binary],
            $this->parseOptions($postProcessingOptions),
            [$temporaryFile],
        ));
        $this->logger?->info('Post-processing image with Jpegoptim', [
            'original size' => $binary->getContentSize(),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->mustRun();

            if ($binary->getContentSize() > filesize($temporaryFile)) {
                $binary = new Binary(
                    $binary->getMimeType(),
                    $binary->getFormat(),
                    file_get_contents($temporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $temporaryFile)),
                );
            }
        } catch (\Exception $exception) {
            $this->logger?->error('Jpegoptim post-processing failed', ['exception' => $exception]);
        } finally {
            unlink($temporaryFile);
        }

        $this->logger?->info('Processed image with Jpegoptim', [
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
                case 'strip_all':
                    if (true === $value) {
                        $parsedOptions[] = '--strip-all';
                    }

                    break;
                case 'progressive':
                    if (true === $value) {
                        $parsedOptions[] = '--all-progressive';
                    }

                    break;
                case 'max_quality':
                    $parsedOptions[] = '--max=' . $value;

                    break;
            }
        }

        return $parsedOptions;
    }
}
