<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize\Mode;

readonly class Resize extends AbstractTransformer implements TransformerInterface
{
    /**
     * @param int|string $width
     * @param int|string $height
     */
    public function __construct(
        private mixed $width,
        private mixed $height,
        private Mode $mode = Mode::exact,
        private bool $allowDownscale = true,
        private bool $allowUpscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $width = $this->width;
        $height = $this->height;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $transformation->targetWidth);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $transformation->targetHeight);
        }

        if (false === $this->allowUpscale && $transformation->targetWidth <= $width && $transformation->targetHeight <= $height) {
            return;
        }

        if (false === $this->allowDownscale && $transformation->targetWidth >= $width && $transformation->targetHeight >= $height) {
            return;
        }

        $xRatio = $width / $transformation->targetWidth;
        $yRatio = $height / $transformation->targetHeight;

        if (Mode::inside === $this->mode) {
            if ($xRatio < $yRatio) {
                $height = (int) round($transformation->targetHeight * $xRatio);
            } else {
                $width = (int) round($transformation->targetWidth * $yRatio);
            }
        } elseif (Mode::outside === $this->mode) {
            if ($xRatio > $yRatio) {
                $height = (int) round($transformation->targetHeight * $xRatio);
            } else {
                $width = (int) round($transformation->targetWidth * $yRatio);
            }
        }

        $transformation->targetWidth = $width;
        $transformation->targetHeight = $height;
    }
}
