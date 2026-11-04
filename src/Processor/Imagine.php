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
    private const DEFAULT_OPTIONS = [
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
        private bool $rasterizeSvg = false,
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
        $formats = [Format::AVIF, Format::GIF, Format::HEIF, Format::JPEG, Format::PNG, Format::TIFF, Format::WEBP];

        if ($this->rasterizeSvg) {
            $formats[] = Format::SVG;
        }

        return $formats;
    }

    /**
     * @return Format[]
     */
    public function getProcessableOutputFormats(): array
    {
        return [Format::AVIF, Format::GIF, Format::JPEG, Format::PNG, Format::WEBP];
    }

    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        $outputFormat = $forceOutputFormat ?? $transformation->getOutputFormat();
        $this->checkOutputFormat($outputFormat);

        if ($transformation->hasEffect() || $outputFormat !== $binary->getFormat()) {
            try {
                $this->logger?->info('Processing image with Imagine', [
                    'original size' => $binary->getContentSize(),
                    'transformation' => $transformation,
                ]);
                $sourceScale = 1.0;

                if (Format::SVG->value === $binary->getFormat()) {
                    [$content, $sourceScale] = $this->renderSvg($binary, $transformation);
                    $image = $this->imagine->load($content);
                } else {
                    $image = $this->imagine->load($binary->getContent());
                }

                $image = $transformation->getAsImagineCallback($sourceScale)($image);
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

    public function getImagine(): ImagineInterface
    {
        return $this->imagine;
    }

    /**
     * @param array<string, mixed> $options
     *
     * @return array<string, mixed>
     */
    public function parseOptions(array $options = []): array
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

    /**
     * Renders the SVG binary as a transparent PNG, at a density high enough for
     * the transformation to only downscale it, so that the variation is sharp.
     *
     * @return array{string, float} the PNG content, and its scale relative to the binary
     */
    private function renderSvg(Binary $binary, Transformation $transformation): array
    {
        $scale = 1.0;
        $output = $transformation->getOutputDimensions();

        if (null !== $output) {
            $scale = max(
                $scale,
                $output['width'] / ($transformation->cropWidth ?? $transformation->binaryWidth),
                $output['height'] / ($transformation->cropHeight ?? $transformation->binaryHeight),
            );
        }

        $imagick = new \Imagick();
        $imagick->setBackgroundColor(new \ImagickPixel('transparent'));
        // 96 dpi is the density at which the SVG pixel units are rendered as is
        $imagick->setResolution(96 * $scale, 96 * $scale);
        $imagick->readImageBlob($binary->getContent());
        $imagick->setImageFormat(Format::PNG->value);

        // the rendered width may slightly differ from the requested one
        $sourceScale = null !== $transformation->binaryWidth ? $imagick->getImageWidth() / $transformation->binaryWidth : 1.0;

        return [$imagick->getImageBlob(), $sourceScale];
    }
}
