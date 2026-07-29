<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Widen extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int|string $width,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $dimensions = $this->requireTargetDimensions($transformation);
        $width = $this->width;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $dimensions['width']);
        }

        if (false === $this->allowDownscale && $width <= $dimensions['width']) {
            return;
        }

        $ratio = $width / $dimensions['width'];
        $transformation->targetHeight = (int) round($dimensions['height'] * $ratio);
        $transformation->targetWidth = $width;
    }
}
