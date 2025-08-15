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

        $cropPosition = $this->cropPosition;

        if ('start' === $cropPosition) {
            $cropPosition = 0;
        } elseif ('center' === $cropPosition || null === $cropPosition) {
            $cropPosition = 50;
        } elseif ('end' === $cropPosition) {
            $cropPosition = 100;
        } elseif ($this->isPercentageValue($cropPosition)) {
            $cropPosition = $this->convertPercentageValue($cropPosition);
        } else {
            throw new \InvalidArgumentException(\sprintf('Invalid crop position "%s". Expected "start", "center", "end" or a percentage value.', $this->cropPosition));
        }

        if ($expectedRatio > $currentRatio) {
            // crop width
            $cropWidth = $transformation->width;
            $cropHeight = (int) round($cropWidth / $expectedRatio);
            $cropX = 0;
            $cropY = (int) round(($transformation->height - $cropHeight) * $cropPosition / 100);
        } else {
            // crop height
            $cropHeight = $transformation->height;
            $cropWidth = (int) round($cropHeight * $expectedRatio);
            $cropY = 0;
            $cropX = (int) round(($transformation->width - $cropWidth) * $cropPosition / 100);
        }

        $transformation->width = $this->width;
        $transformation->height = $this->height;
        $transformation->cropX = $cropX + $transformation->cropX;
        $transformation->cropY = $cropY + $transformation->cropY;
        $transformation->cropWidth = $cropWidth;
        $transformation->cropHeight = $cropHeight;
    }
}
