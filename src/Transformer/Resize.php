<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize\Mode;

readonly class Resize extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int|string $width,
        private int|string $height,
        private Mode $mode = Mode::exact,
        private bool $allowDownscale = true,
        private bool $allowUpscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $dimensions = $this->requireTargetDimensions($transformation);
        $width = $this->width;
        $height = $this->height;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $dimensions['width']);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $dimensions['height']);
        }

        if (false === $this->allowUpscale && $dimensions['width'] <= $width && $dimensions['height'] <= $height) {
            return;
        }

        if (false === $this->allowDownscale && $dimensions['width'] >= $width && $dimensions['height'] >= $height) {
            return;
        }

        if (Mode::exact === $this->mode) {
            $transformation->targetWidth = $width;
            $transformation->targetHeight = $height;

            return;
        }

        $xRatio = $width / $dimensions['width'];
        $yRatio = $height / $dimensions['height'];

        if (Mode::inside === $this->mode) {
            if ($xRatio < $yRatio) {
                $height = (int) round($dimensions['height'] * $xRatio);
            } else {
                $width = (int) round($dimensions['width'] * $yRatio);
            }
        } elseif (Mode::outside === $this->mode) {
            if ($xRatio > $yRatio) {
                $height = (int) round($dimensions['height'] * $xRatio);
            } else {
                $width = (int) round($dimensions['width'] * $yRatio);
            }
        }

        $transformation->targetWidth = $width;
        $transformation->targetHeight = $height;
    }
}
