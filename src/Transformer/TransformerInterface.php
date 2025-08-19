<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Transformation\Transformation;

interface TransformerInterface
{
    public function getBinaryOperation(Binary $binary, ?int $binaryWidth, ?int $binaryHeight): callable;

    public function getBinaryProcessorName(): string;

    public function needsBinaryProcessing(): bool;

    public function transform(Transformation $transformation): void;
}
