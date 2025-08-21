<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformation\Transformation;

interface WithTransformTransformerInterface
{
    public function transform(Transformation $transformation): void;
}
