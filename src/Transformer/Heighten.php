<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

readonly class Heighten implements TransformerInterface
{
    public function __construct(
        private int $height,
        private bool $allowDownscale = true,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        if (false === $this->allowDownscale && $this->height <= $transformation->height) {
            return;
        }

        $ratio = $this->height / $transformation->height;
        $transformation->width = (int) round($transformation->width * $ratio);
        $transformation->height = $this->height;
    }
}
