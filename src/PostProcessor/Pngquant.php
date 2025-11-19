<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use Symfony\Component\Process\Exception\ProcessFailedException;

readonly class Pngquant extends AbstractPostProcessor implements PostProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const DEFAULT_OPTIONS = [
        'quality' => '75-85',
        'speed' => 5,
    ];

    public function getName(): string
    {
        return 'pngquant';
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

        if (false === $this->isEnabled() || isset($postProcessingOptions['enabled']) && false === $postProcessingOptions['enabled']) {
            $this->logger?->info('Pngquant post-processor is disabled, skipping processing.');

            return $binary;
        }

        $process = $this->createProcess(array_merge(
            [$this->binary],
            $this->parseOptions($postProcessingOptions),
            ['-'],
        ));
        $process->setInput($binary->getContent());
        $this->logger?->info('Post-processing image with Pngquant', [
            'original size' => $binary->getContentSize(),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->run();

            if (!$this->isSuccessfulProcess($process, [0, 98, 99], [])) {
                throw new ProcessFailedException($process);
            }

            if ($binary->getContentSize() > \strlen($process->getOutput())) {
                $binary = new Binary(
                    $binary->getMimeType(),
                    $binary->getFormat(),
                    $process->getOutput(),
                );
            }
        } catch (\Exception $exception) {
            $this->logger?->error('Pngquant post-processing failed', ['exception' => $exception]);
        }

        $this->logger?->info('Processed image with Pngquant', [
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
                case 'quality':
                    $parsedOptions[] = '--quality';
                    $parsedOptions[] = $value;

                    break;
                case 'speed':
                    $parsedOptions[] = '--speed';
                    $parsedOptions[] = $value;

                    break;
            }
        }

        return $parsedOptions;
    }
}
