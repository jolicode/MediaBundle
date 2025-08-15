<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize\Mode;

readonly class Resize extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int $width,
        private int $height,
        private Mode $mode = Mode::exact,
        private bool $allowDownscale = true,
        private bool $allowUpscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        if (false === $this->allowUpscale && $transformation->targetWidth <= $this->width && $transformation->targetHeight <= $this->height) {
            return;
        }

        if (false === $this->allowDownscale && $transformation->targetWidth >= $this->width && $transformation->targetHeight >= $this->height) {
            return;
        }

        if (Mode::inside === $this->mode) {
            $xRatio = $this->width / $transformation->targetWidth;
            $yRatio = $this->height / $transformation->targetHeight;

            if ($xRatio < $yRatio) {
                $width = $this->width;
                $height = (int) round($transformation->targetHeight * $xRatio);
            } else {
                $width = (int) round($transformation->targetWidth * $yRatio);
                $height = $this->height;
            }
        } elseif (Mode::outside === $this->mode) {
            $xRatio = $this->width / $transformation->targetWidth;
            $yRatio = $this->height / $transformation->targetHeight;

            if ($xRatio > $yRatio) {
                $width = $this->width;
                $height = (int) round($transformation->targetHeight * $xRatio);
            } else {
                $width = (int) round($transformation->targetWidth * $yRatio);
                $height = $this->height;
            }
        } else {
            $width = $this->width;
            $height = $this->height;
        }

        $transformation->targetWidth = $width;
        $transformation->targetHeight = $height;
    }
}
