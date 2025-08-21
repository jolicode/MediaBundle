<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Heighten extends AbstractTransformer implements TransformerInterface, WithTransformTransformerInterface
{
    /**
     * @param int|string $height
     */
    public function __construct(
        private mixed $height,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $height = $this->height;

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $transformation->targetHeight);
        }

        if (false === $this->allowDownscale && $height <= $transformation->targetHeight) {
            return;
        }

        $ratio = $height / $transformation->targetHeight;
        $transformation->targetWidth = (int) round($transformation->targetWidth * $ratio);
        $transformation->targetHeight = $height;
        $transformation->mustRun = true;
    }
}
