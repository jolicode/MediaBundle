<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Heighten extends AbstractTransformer implements TransformerInterface
{
    public function __construct(
        private int|string $height,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $dimensions = $this->requireTargetDimensions($transformation);
        $height = $this->height;

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $dimensions['height']);
        }

        if (false === $this->allowDownscale && $height <= $dimensions['height']) {
            return;
        }

        $ratio = $height / $dimensions['height'];
        $transformation->targetWidth = (int) round($dimensions['width'] * $ratio);
        $transformation->targetHeight = $height;
    }
}
