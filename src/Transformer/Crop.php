<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Crop extends AbstractTransformer implements TransformerInterface
{
    /**
     * @param int|string|null $startX
     * @param int|string|null $startY
     * @param int|string      $width
     * @param int|string      $height
     */
    public function __construct(
        private mixed $startX,
        private mixed $startY,
        private mixed $width,
        private mixed $height,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $startX = $this->startX;
        $startY = $this->startY;
        $width = $this->width;
        $height = $this->height;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $transformation->width);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $transformation->height);
        }

        if (null === $startX) {
            $startX = (int) round(($transformation->width - $width) / 2);
        } elseif (\is_string($startX)) {
            $startX = $this->convertPercentageValue($startX, $transformation->width);
        }

        if (null === $startY) {
            $startY = (int) round(($transformation->height - (int) $height) / 2);
        } elseif (\is_string($startY)) {
            $startY = $this->convertPercentageValue($startY, $transformation->height);
        }

        if ($startX >= $transformation->width || $startY >= $transformation->height) {
            return;
        }

        if ($startX < 0) {
            $width += $startX;
            $startX = 0;
        }

        if ($startY < 0) {
            $height += $startY;
            $startY = 0;
        }

        $width = min($width, $transformation->width - $startX);
        $height = min($height, $transformation->height - $startY);

        $transformation->width = $width;
        $transformation->height = $height;
        $transformation->cropX = $startX + $transformation->cropX;
        $transformation->cropY = $startY + $transformation->cropY;
        $transformation->cropWidth = $width;
        $transformation->cropHeight = $height;
    }
}
