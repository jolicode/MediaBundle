<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Heighten extends AbstractTransformer implements TransformerInterface
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
            $height = $this->convertPercentageValue($height, $transformation->height);
        }

        if (false === $this->allowDownscale && $height <= $transformation->height) {
            return;
        }

        $ratio = $height / $transformation->height;
        $transformation->width = (int) round($transformation->width * $ratio);
        $transformation->height = $height;
    }
}
