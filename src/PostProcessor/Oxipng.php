<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

readonly class Oxipng extends AbstractPostProcessor implements PostProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'optimization' => 4,
        'strip' => 'all',
        'zopfli' => true,
    ];

    public function getName(): string
    {
        return 'oxipng';
    }

    /**
     * @return Format[]
     */
    public function getProcessableFormats(): array
    {
        return [Format::PNG];
    }

    public function process(Binary $binary, array $postProcessingOptions = []): Binary
    {
        $this->checkFormat($binary->getFormat());

        if (false === $this->isEnabled()) {
            return $binary;
        }

        $temporaryFile = $this->writeTemporaryFile($binary);
        $process = $this->createProcess(array_merge(
            [$this->binary],
            $this->parseOptions($postProcessingOptions),
            [$temporaryFile],
        ));
        $this->logger?->info('Post-processing image with Oxipng', [
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
            $this->logger?->error('Oxipng post-processing failed', ['exception' => $exception]);
        } finally {
            unlink($temporaryFile);
        }

        $this->logger?->info('Processed image with Oxipng', [
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
                case 'optimization':
                    $parsedOptions[] = '-o';
                    $parsedOptions[] = $value;

                    break;
                case 'strip':
                    if (\is_array($value)) {
                        $value = implode(',', $value);
                    }

                    $parsedOptions[] = '--strip';
                    $parsedOptions[] = $value;

                    break;
                case 'zopfli':
                    if (true === $value) {
                        $parsedOptions[] = '--zopfli';
                    }

                    break;
            }
        }

        return $parsedOptions;
    }
}
