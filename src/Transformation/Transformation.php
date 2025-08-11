<?php

namespace JoliCode\MediaBundle\Transformation;

use Imagine\Image\Box;
use Imagine\Image\ImageInterface;
use Imagine\Image\Point;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Variation\Variation;

class Transformation
{
    public ?int $width = null;

    public ?int $height = null;

    public ?int $cropX = null;

    public ?int $cropY = null;

    public ?int $cropWidth = null;

    public ?int $cropHeight = null;

    public function __construct(
        private readonly Binary $binary,
        private readonly Variation $variation,
    ) {
        $dimensions = $this->getInitialDimensions();
        $this->width = $dimensions['width'];
        $this->height = $dimensions['height'];
    }

    public function applyTransformers(): void
    {
        foreach ($this->variation->getTransformerChain() as $transformer) {
            $transformer->transform($this);
        }
    }

    public function getAlternativeOutputFormat(): ?string
    {
        return Format::fromName($this->getOutputFormat())?->getAlternativeFormat()?->value;
    }

    /**
     * @return array<int|string|null>
     */
    public function getAsCwebpOptions(): array
    {
        $options = [];

        if ($this->hasChangedDimensions()) {
            $options[] = '-resize';
            $options[] = $this->width;
            $options[] = $this->height;
        }

        if ($this->hasCrop()) {
            $options[] = '-crop';
            $options[] = $this->cropX;
            $options[] = $this->cropY;
            $options[] = $this->cropWidth;
            $options[] = $this->cropHeight;
        }

        return $options;
    }

    /**
     * @return array<int|string|null>
     */
    public function getAsGifsicleOptions(): array
    {
        $options = [];

        if ($this->hasCrop()) {
            $options[] = '--crop';
            $options[] = \sprintf('%d,%d+%d+%d', $this->cropX, $this->cropY, $this->cropWidth, $this->cropHeight);
        }

        if ($this->hasChangedDimensions()) {
            $options[] = '--resize';
            $options[] = \sprintf('%dx%d', $this->width, $this->height);
        }

        return $options;
    }

    public function getAsImagineCallback(): callable
    {
        return function (ImageInterface $image): ImageInterface {
            if ($this->hasCrop()) {
                $image = $image->crop(
                    new Point((int) $this->cropX, (int) $this->cropY),
                    new Box((int) $this->cropWidth, (int) $this->cropHeight),
                );
            }

            if ($this->hasEffect()) {
                $image = $image->resize(new Box((int) $this->width, (int) $this->height));
            }

            return $image;
        };
    }

    public function getBinary(): Binary
    {
        return $this->binary;
    }

    public function getInputFormat(): string
    {
        return $this->binary->getFormat();
    }

    public function getOutputFormat(): string
    {
        return $this->variation->getFormat()->value ?? $this->binary->getFormat();
    }

    /**
     * @return string[]
     */
    public function getPossibleOutputFormats(): array
    {
        $outputFormats = [$this->getOutputFormat()];

        if (null !== $this->getAlternativeOutputFormat()) {
            $outputFormats[] = $this->getAlternativeOutputFormat();
        }

        return $outputFormats;
    }

    /**
     * @return array<string, string[]>
     */
    public function getPostProcessorOptions(string $postProcessorName): array
    {
        return $this->variation->getPostProcessorConfiguration($postProcessorName);
    }

    /**
     * @return array<string, string[]>
     */
    public function getProcessorOptions(string $processorName): array
    {
        return $this->variation->getProcessorConfiguration($processorName);
    }

    public function getVariationName(): string
    {
        return $this->variation->getName();
    }

    public function hasEffect(): bool
    {
        return $this->hasCrop() || $this->hasChangedDimensions();
    }

    public function hasExpandedArea(): bool
    {
        $dimensions = $this->getInitialDimensions();

        return null !== $this->width && null !== $this->height && $this->width * $this->height > $dimensions['width'] * $dimensions['height'];
    }

    public function hasReducedArea(): bool
    {
        $dimensions = $this->getInitialDimensions();

        return null !== $this->width && null !== $this->height && $this->width * $this->height < $dimensions['width'] * $dimensions['height'];
    }

    public function hasChangedDimensions(): bool
    {
        $dimensions = $this->getInitialDimensions();

        return null !== $this->width && null !== $this->height && ($this->width !== $dimensions['width'] || $this->height !== $dimensions['height']);
    }

    /**
     * @return array{height: int, width: int}
     */
    private function getInitialDimensions(): array
    {
        $dimensions = $this->binary->getPixelDimensions();

        if (false === $dimensions) {
            throw new \RuntimeException('Could not get the size of the image.');
        }

        return $dimensions;
    }

    private function hasCrop(): bool
    {
        return null !== $this->cropX && null !== $this->cropY && null !== $this->cropWidth && null !== $this->cropHeight;
    }
}
