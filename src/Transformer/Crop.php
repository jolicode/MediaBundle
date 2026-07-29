<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Crop extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int|string|null $startX,
        private int|string|null $startY,
        private int|string $width,
        private int|string $height,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $dimensions = $this->requireTargetDimensions($transformation);
        $startX = $this->startX;
        $startY = $this->startY;
        $width = $this->width;
        $height = $this->height;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $dimensions['width']);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $dimensions['height']);
        }

        if (null === $startX) {
            $startX = (int) round(($dimensions['width'] - $width) / 2);
        } elseif (\is_string($startX)) {
            $startX = $this->convertPercentageValue($startX, $dimensions['width']);
        }

        if (null === $startY) {
            $startY = (int) round(($dimensions['height'] - $height) / 2);
        } elseif (\is_string($startY)) {
            $startY = $this->convertPercentageValue($startY, $dimensions['height']);
        }

        if ($startX >= $dimensions['width'] || $startY >= $dimensions['height']) {
            // the start coordinates are outside the image, so we do not apply the crop
            return;
        }

        $width = min($width, $dimensions['width']);
        $height = min($height, $dimensions['height']);

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

        $binaryDimensions = $this->requireBinaryDimensions($transformation);
        $width = min($width, $dimensions['width'] - $startX);
        $height = min($height, $dimensions['height'] - $startY);

        $currentCropWidth = $transformation->cropWidth ?? $binaryDimensions['width'];
        $currentCropHeight = $transformation->cropHeight ?? $binaryDimensions['height'];
        $currentCropX = $transformation->cropX ?? 0;
        $currentCropY = $transformation->cropY ?? 0;

        $additionalCropX = (int) ($startX / $dimensions['width'] * $currentCropWidth);
        $additionalCropY = (int) ($startY / $dimensions['height'] * $currentCropHeight);
        $newCropWidth = (int) ($width / $dimensions['width'] * $currentCropWidth);
        $newCropHeight = (int) ($height / $dimensions['height'] * $currentCropHeight);

        $transformation->cropX = $currentCropX + $additionalCropX;
        $transformation->cropY = $currentCropY + $additionalCropY;
        $transformation->targetWidth = $width;
        $transformation->targetHeight = $height;
        $transformation->cropWidth = $newCropWidth;
        $transformation->cropHeight = $newCropHeight;
    }
}
