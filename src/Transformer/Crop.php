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
            $width = $this->convertPercentageValue($width, $transformation->targetWidth);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $transformation->targetHeight);
        }

        if (null === $startX) {
            $startX = (int) round(($transformation->targetWidth - $width) / 2);
        } elseif (\is_string($startX)) {
            $startX = $this->convertPercentageValue($startX, $transformation->targetWidth);
        }

        if (null === $startY) {
            $startY = (int) round(($transformation->targetHeight - (int) $height) / 2);
        } elseif (\is_string($startY)) {
            $startY = $this->convertPercentageValue($startY, $transformation->targetHeight);
        }

        if ($startX >= $transformation->targetWidth || $startY >= $transformation->targetHeight) {
            // the start coordinates are outside the image, so we do not apply the crop
            return;
        }

        $width = min($width, $transformation->targetWidth);
        $height = min($height, $transformation->targetHeight);

        if ($startX < 0) {
            $width += $startX;
            $startX = 0;
        }

        if ($startY < 0) {
            $height += $startY;
            $startY = 0;
        }

        if ($width <= 0 || $height <= 0) {
            // the coordinates or dimensions are invalid, so we do not apply the crop
            return;
        }

        $width = min($width, $transformation->targetWidth - $startX);
        $height = min($height, $transformation->targetHeight - $startY);

        $currentCropWidth = $transformation->cropWidth ?? $transformation->binaryWidth;
        $currentCropHeight = $transformation->cropHeight ?? $transformation->binaryHeight;
        $currentCropX = $transformation->cropX ?? 0;
        $currentCropY = $transformation->cropY ?? 0;

        $additionalCropX = (int) ($startX / $transformation->targetWidth * $currentCropWidth);
        $additionalCropY = (int) ($startY / $transformation->targetHeight * $currentCropHeight);
        $newCropWidth = (int) ($width / $transformation->targetWidth * $currentCropWidth);
        $newCropHeight = (int) ($height / $transformation->targetHeight * $currentCropHeight);

        $transformation->cropX = $currentCropX + $additionalCropX;
        $transformation->cropY = $currentCropY + $additionalCropY;
        $transformation->targetWidth = $width;
        $transformation->targetHeight = $height;
        $transformation->cropWidth = $newCropWidth;
        $transformation->cropHeight = $newCropHeight;
    }
}
