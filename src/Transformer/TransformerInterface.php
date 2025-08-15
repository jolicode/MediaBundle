<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Transformation\Transformation;

interface TransformerInterface
{
    public function needsBinaryProcessing(): bool;

    public function processBinary(Binary $binary, ?int $binaryWidth, ?int $binaryHeight): Binary;

    public function transform(Transformation $transformation): void;
}
