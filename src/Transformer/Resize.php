<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize\Mode;

readonly class Resize implements TransformerInterface
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
        if (false === $this->allowUpscale && $transformation->width <= $this->width && $transformation->height <= $this->height) {
            return;
        }

        if (false === $this->allowDownscale && $transformation->width >= $this->width && $transformation->height >= $this->height) {
            return;
        }

        if (Mode::inside === $this->mode) {
            $xRatio = $this->width / $transformation->width;
            $yRatio = $this->height / $transformation->height;

            if ($xRatio < $yRatio) {
                $width = $this->width;
                $height = (int) round($transformation->height * $xRatio);
            } else {
                $width = (int) round($transformation->width * $yRatio);
                $height = $this->height;
            }
        } elseif (Mode::outside === $this->mode) {
            $xRatio = $this->width / $transformation->width;
            $yRatio = $this->height / $transformation->height;

            if ($xRatio > $yRatio) {
                $width = $this->width;
                $height = (int) round($transformation->height * $xRatio);
            } else {
                $width = (int) round($transformation->width * $yRatio);
                $height = $this->height;
            }
        } else {
            $width = $this->width;
            $height = $this->height;
        }

        $transformation->width = $width;
        $transformation->height = $height;
    }
}
