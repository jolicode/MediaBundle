<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

interface PredictableTransformerInterface
{
    public function predictDimensions(Transformation $transformation): void;
}
