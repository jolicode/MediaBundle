<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Widen implements TransformerInterface
{
    public function __construct(
        private int $width,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        if (false === $this->allowDownscale && $this->width <= $transformation->width) {
            return;
        }

        $ratio = $this->width / $transformation->width;
        $transformation->height = (int) round($transformation->height * $ratio);
        $transformation->width = $this->width;
    }
}
