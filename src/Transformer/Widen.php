<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Widen extends AbstractTransformer implements TransformerInterface
{
    /**
     * @param int|string $width
     */
    public function __construct(
        private mixed $width,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $width = $this->width;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $transformation->width);
        }

        if (false === $this->allowDownscale && $width <= $transformation->width) {
            return;
        }

        $ratio = $width / $transformation->width;
        $transformation->height = (int) round($transformation->height * $ratio);
        $transformation->width = $width;
    }
}
