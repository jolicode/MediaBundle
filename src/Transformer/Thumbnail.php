<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Thumbnail implements TransformerInterface
{
    public function __construct(
        private int $width,
        private int $height,
        private bool $allowUpscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        if (false === $this->allowUpscale && ($transformation->width <= $this->width || $transformation->height <= $this->height)) {
            return;
        }

        $expectedRatio = $this->width / $this->height;
        $currentRatio = $transformation->width / $transformation->height;

        if ($expectedRatio === $currentRatio) {
            // no croping required
            $transformation->width = $this->width;
            $transformation->height = $this->height;

            return;
        }

        if ($expectedRatio > $currentRatio) {
            // crop width
            $cropWidth = $transformation->width;
            $cropHeight = (int) round($cropWidth / $expectedRatio);
            $cropX = 0;
            $cropY = (int) round(($transformation->height - $cropHeight) / 2);
        } else {
            // crop height
            $cropHeight = $transformation->height;
            $cropWidth = (int) round($cropHeight * $expectedRatio);
            $cropY = 0;
            $cropX = (int) round(($transformation->width - $cropWidth) / 2);
        }

        $transformation->width = $this->width;
        $transformation->height = $this->height;
        $transformation->cropX = $cropX + $transformation->cropX;
        $transformation->cropY = $cropY + $transformation->cropY;
        $transformation->cropWidth = $cropWidth;
        $transformation->cropHeight = $cropHeight;
    }
}
