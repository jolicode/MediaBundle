<?php

namespace JoliCode\MediaBundle\Processor;

use Imagine\Image\ImagineInterface;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;

readonly class Imagine extends AbstractProcessor implements ProcessorInterface
{
    /**
     * @var array<string, mixed>
     */
    private const array DEFAULT_OPTIONS = [
        'jpeg_quality' => 80,
        'png_quality' => 80,
        'quality' => 80,
    ];

    /**
     * @param array<string, mixed> $options
     */
    public function __construct(
        private ImagineInterface $imagine,
        private array $options = [],
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getDefaultOutputFormat(): Format
    {
        return Format::JPEG;
    }

    public function getName(): string
    {
        return 'imagine';
    }

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array
    {
        return [Format::GIF, Format::HEIF, Format::JPEG, Format::PNG, Format::TIFF, Format::WEBP];
    }

    /**
     * @return Format[]
     */
    public function getProcessableOutputFormats(): array
    {
        return [Format::GIF, Format::JPEG, Format::PNG, Format::WEBP];
    }

    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        $outputFormat = $forceOutputFormat ?? $transformation->getOutputFormat();
        $this->checkOutputFormat($outputFormat);

        if ($transformation->hasEffect()) {
            try {
                $this->logger?->info('Processing image with Imagine', [
                    'original size' => $binary->getContentSize(),
                    'transformation' => $transformation,
                ]);
                $image = $this->imagine->load($binary->getContent());
                $image = $transformation->getAsImagineCallback()($image);
                $options = $this->parseOptions($processingOptions);

                if (\in_array(Format::fromName($outputFormat), [Format::GIF, Format::WEBP], true)) {
                    $options['animated'] = true;
                }

                $outputMimeType = $binary->getMimeType();

                if ($outputFormat !== $binary->getFormat()) {
                    $outputMimeType = Format::fromName($outputFormat)?->getMimeType() ?? $binary->getMimeType();
                }

                $binary = new Binary(
                    $outputMimeType,
                    $outputFormat,
                    $image->get($outputFormat, $options),
                );
                $this->logger?->info('Processed image with Imagine', [
                    'processed size' => $binary->getContentSize(),
                ]);
            } catch (\Exception $e) {
                $this->logger?->error('Imagine processing failed', ['exception' => $e]);

                throw $e;
            }
        }

        return $binary;
    }

    /**
     * @param array<string, mixed> $options
     *
     * @return array<string, mixed>
     */
    private function parseOptions(array $options = []): array
    {
        $options = array_merge(self::DEFAULT_OPTIONS, $this->options, $options);
        $parsedOptions = [];

        foreach ($options as $key => $value) {
            switch ($key) {
                case 'jpeg_quality':
                    $parsedOptions['jpeg_quality'] = (int) $value;

                    break;
                case 'quality':
                    $parsedOptions['quality'] = (int) $value;

                    break;
                case 'png_quality':
                    $parsedOptions['png_compression_level'] = (int) floor($value / 10);
                    $parsedOptions['png_compression_filter'] = (int) $value % 10;

                    break;
            }
        }

        return $parsedOptions;
    }
}
