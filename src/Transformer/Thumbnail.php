<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Thumbnail extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int $width,
        private int $height,
        private bool $allowUpscale = true,
        private ?string $cropPosition = 'center',
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        if (false === $this->allowUpscale && ($transformation->targetWidth <= $this->width || $transformation->targetHeight <= $this->height)) {
            return;
        }

        $expectedRatio = $this->width / $this->height;
        $currentRatio = $transformation->targetWidth / $transformation->targetHeight;

        if ($expectedRatio === $currentRatio) {
            // no croping required
            $transformation->targetWidth = $this->width;
            $transformation->targetHeight = $this->height;

            return;
        }

        $cropPosition = $this->getCropPosition();
        $currentCropWidth = $transformation->cropWidth ?? $transformation->binaryWidth;
        $currentCropHeight = $transformation->cropHeight ?? $transformation->binaryHeight;
        $currentCropX = $transformation->cropX ?? 0;
        $currentCropY = $transformation->cropY ?? 0;

        if ($expectedRatio > $currentRatio) {
            // crop vertically
            $cropWidth = $currentCropWidth;
            $cropHeight = (int) round($cropWidth / $expectedRatio);
            $cropX = 0;
            $cropY = (int) round(($currentCropHeight - $cropHeight) * $cropPosition / 100);
        } else {
            // crop horizontally
            $cropHeight = $currentCropHeight;
            $cropWidth = (int) round($cropHeight * $expectedRatio);
            $cropY = 0;
            $cropX = (int) round(($currentCropWidth - $cropWidth) * $cropPosition / 100);
        }

        // update transformation dimensions
        $transformation->targetWidth = $this->width;
        $transformation->targetHeight = $this->height;
        $transformation->cropX = $currentCropX + $cropX;
        $transformation->cropY = $currentCropY + $cropY;
        $transformation->cropWidth = $cropWidth;
        $transformation->cropHeight = $cropHeight;
    }

    private function getCropPosition(): float
    {
        if ('start' === $this->cropPosition) {
            return 0;
        }
        if ('center' === $this->cropPosition || null === $this->cropPosition) {
            return 50;
        }
        if ('end' === $this->cropPosition) {
            return 100;
        }
        if ($this->isPercentageValue($this->cropPosition)) {
            return $this->convertPercentageValue($this->cropPosition);
        }

        throw new \InvalidArgumentException(\sprintf('Invalid crop position "%s". Expected "start", "center", "end" or a percentage value.', $this->cropPosition));
    }
}
