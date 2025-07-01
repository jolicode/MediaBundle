<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

interface TransformerInterface
{
    public function transform(Transformation $transformation): void;
}
