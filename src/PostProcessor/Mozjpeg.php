<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

readonly class Mozjpeg extends AbstractPostProcessor implements PostProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'optimize' => true,
        'progressive' => true,
        'quality' => 80,
    ];

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

        if (false === $this->isEnabled()) {
            return $binary;
        }

        $process = $this->createProcess(array_merge(
            [$this->binary],
            $this->parseOptions($postProcessingOptions),
        ));
        $this->logger?->info('Post-processing image with Mozjpeg', [
            'original size' => $binary->getContentSize(),
            'command' => $process->getCommandLine(),
        ]);
        $process->setInput($binary->getContent());

        try {
            $process->mustRun();

            if ($binary->getContentSize() > \strlen($process->getOutput())) {
                $binary = new Binary(
                    $binary->getMimeType(),
                    $binary->getFormat(),
                    $process->getOutput(),
                );
            }
        } catch (\Exception $exception) {
            $this->logger?->error('Mozjpeg post-processing failed', ['exception' => $exception]);
        }

        $this->logger?->info('Processed image with Mozjpeg', [
            'processed size' => $binary->getContentSize(),
        ]);

        return $binary;
    }

    /**
     * @param array<string, mixed> $options
     *
     * @return array<int|string>
     */
    private function parseOptions(array $options = []): array
    {
        $options = array_merge(self::DEFAULT_OPTIONS, $this->options, $options);
        $parsedOptions = [];

        foreach ($options as $key => $value) {
            switch ($key) {
                case 'optimize':
                    if (true === $value) {
                        $parsedOptions[] = '-optimize';
                    }

                    break;
                case 'progressive':
                    if (true === $value) {
                        $parsedOptions[] = '-progressive';
                    }

                    break;
                case 'quality':
                    $parsedOptions[] = '-quality';
                    $parsedOptions[] = (int) $value;

                    break;
            }
        }

        return $parsedOptions;
    }
}
