<?php

namespace JoliCode\MediaBundle\Transformer;

abstract readonly class AbstractTransformer implements TransformerInterface
{
    use ValueConverterTrait;
}
