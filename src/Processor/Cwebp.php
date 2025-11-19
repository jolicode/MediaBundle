<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;
use Symfony\Component\Process\Process;

readonly class Cwebp extends AbstractProcessor implements ProcessorInterface
{
    /**
     * @var array<string, array<string, mixed>>
     */
    private const DEFAULT_OPTIONS = [
        'near_lossless' => [
            'quality' => 40,
            'method' => 6,
            'metadata' => 'none',
            'near_lossless' => 0,
        ],
        'lossy' => [
            'quality' => 75,
            'method' => 6,
            'af' => true,
            'pass' => 10,
            'metadata' => 'none',
        ],
    ];

    /**
     * @param array<string, array<string, mixed>> $options
     */
    public function __construct(
        private ?string $cwebpBinary = '/usr/local/bin/cwebp',
        private ?string $identifyBinary = '/usr/bin/identify',
        private array $options = [],
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getName(): string
    {
        return 'cwebp';
    }

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array
    {
        return [Format::JPEG, Format::PNG, Format::WEBP, Format::TIFF];
    }

    /**
     * @return Format[]
     */
    public function getProcessableOutputFormats(): array
    {
        return [Format::WEBP];
    }

    /**
     * @param array<string, array<string, mixed>> $processingOptions
     */
    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        $this->checkOutputFormat($forceOutputFormat ?? $transformation->getOutputFormat());

        $temporaryFile = $this->writeTemporaryFile($binary);
        $fileSize = filesize($temporaryFile);

        $nearLossless = !\in_array(Format::fromName($binary->getFormat()), [Format::JPEG, Format::TIFF]) && !$this->guessIsPhotoFile($temporaryFile);
        $transformationOptions = $transformation->getAsCwebpOptions();
        $process = $this->getCwebpProcess(
            $temporaryFile,
            $transformationOptions,
            $this->getPresetOptions(
                $nearLossless ? 'near_lossless' : 'lossy',
                $processingOptions,
            ),
        );
        $this->logger?->info('Processing image with Cwebp', [
            'original size' => filesize($temporaryFile),
            'command' => $process->getCommandLine(),
            'transformation' => $transformation,
        ]);

        try {
            $process->mustRun();

            if ($nearLossless) {
                $isPixelRatioCorrect = $this->checkPixelRatioIsSatisfying($temporaryFile);

                if (!$isPixelRatioCorrect || $transformation->hasReducedArea() && $fileSize <= filesize($temporaryFile)) {
                    if (!$isPixelRatioCorrect) {
                        $this->logger?->info(\sprintf(
                            'The webp file generated from %s does not have a dense enough pixel ratio, and it seems to remain a large file. Trying a more agressive compression options set.',
                            $binary->getPath(),
                        ));
                    } else {
                        $this->logger?->info(\sprintf(
                            'The webp file generated from %s is bigger than the original file while its dimensions are smaller. Trying a more agressive compression options set.',
                            $binary->getPath(),
                        ));
                    }

                    unlink($temporaryFile);
                    $temporaryFile = $this->writeTemporaryFile($binary);
                    $process = $this->getCwebpProcess($temporaryFile, $transformationOptions, $this->getPresetOptions('lossy', $processingOptions));
                    $this->logger?->info('Processing image with Cwebp', [
                        'original size' => filesize($temporaryFile),
                        'command' => $process->getCommandLine(),
                        'transformation' => $transformation,
                    ]);
                    $process->mustRun();
                }
            }

            $this->logger?->info('Processed image with Cwebp', [
                'processed size' => filesize($temporaryFile),
            ]);

            return new Binary(
                'image/webp',
                Format::WEBP->value,
                file_get_contents($temporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $temporaryFile)),
            );
        } catch (\Exception $exception) {
            $this->logger?->error('Cwebp processing failed', ['exception' => $exception]);

            throw $exception;
        } finally {
            unlink($temporaryFile);
        }
    }

    /**
     * @param array<int|string|null> $transformationOptions
     * @param string[]               $processingOptions
     */
    private function getCwebpProcess(string $temporaryFile, array $transformationOptions, array $processingOptions): Process
    {
        return $this->createProcess(array_merge(
            [$this->cwebpBinary],
            $processingOptions,
            [
                $temporaryFile,
                '-o',
                $temporaryFile,
            ],
            $transformationOptions
        ));
    }

    /**
     * @param array<string, array<string, mixed>> $presetOptions
     *
     * @return string[]
     */
    private function getPresetOptions(string $presetName, array $presetOptions): array
    {
        $presets = $this->parsePresets($presetOptions);

        if (!isset($presets[$presetName])) {
            throw new \InvalidArgumentException(\sprintf('Preset "%s" not found.', $presetName));
        }

        return $presets[$presetName];
    }

    private function checkPixelRatioIsSatisfying(string $filename): bool
    {
        if (filesize($filename) < 100000) {
            return true;
        }

        $imageSize = getimagesize($filename);

        if (!\is_array($imageSize)) {
            return true;
        }

        // if the file size is large compared to the image dimensions, it's likely a photo
        return $imageSize[0] * $imageSize[1] / filesize($filename) > 3;
    }

    private function guessIsPhotoFile(string $filename): bool
    {
        // if the image has more than 20k colors, it's likely a photo
        $process = new Process([$this->identifyBinary, '-format', '%k', $filename]);
        $process->mustRun();

        $output = $process->getOutput();

        return (int) trim($output) >= 20000;
    }

    /**
     * @param array<string, array<string, mixed>> $options
     *
     * @return array<string, string[]>
     */
    private function parsePresets(array $options = []): array
    {
        $presets = array_merge(self::DEFAULT_OPTIONS, $this->options, $options);
        unset($presets['enabled']);
        $parsedOptions = [];

        foreach ($presets as $name => $preset) {
            $parsedOption = [];

            foreach ($preset as $key => $value) {
                switch ($key) {
                    case 'quality':
                        $parsedOption[] = '-q';
                        $parsedOption[] = (int) $value;

                        break;
                    case 'method':
                        $parsedOption[] = '-m';
                        $parsedOption[] = (int) $value;

                        break;
                    case 'af':
                        if (true === $value) {
                            $parsedOption[] = '-af';
                        }

                        break;
                    case 'pass':
                        $parsedOption[] = '-pass';
                        $parsedOption[] = (int) $value;

                        break;
                    case 'metadata':
                        if (\is_array($value)) {
                            $value = implode(',', $value);
                        }

                        $parsedOption[] = '-metadata';
                        $parsedOption[] = $value;

                        break;
                    case 'near_lossless':
                        $parsedOption[] = '-near_lossless';
                        $parsedOption[] = (int) $value;

                        break;
                }
            }

            $parsedOptions[$name] = $parsedOption;
        }

        return $parsedOptions;
    }
}
