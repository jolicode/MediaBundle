<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformer\BinaryOperation\BinaryOperationInterface;

interface WithOperationTransformerInterface
{
    public function getBinaryOperation(?int $binaryWidth, ?int $binaryHeight): BinaryOperationInterface;
}
