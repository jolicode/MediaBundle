<?php

namespace JoliCode\MediaBundle\Transformer\BinaryOperation;

use JoliCode\MediaBundle\Binary\Binary;

abstract class BinaryOperation implements BinaryOperationInterface
{
    public function __construct(
        protected readonly Binary $binary,
        protected readonly ?int $binaryWidth,
        protected readonly ?int $binaryHeight,
    ) {
    }
}
