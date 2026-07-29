<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;

class CallbackPreProcessor implements PreProcessorInterface
{
    public function __construct(private readonly \Closure $callback)
    {
    }

    public function getDefaultOutputFormat(): ?Format
    {
        return null;
    }

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary
    {
        return ($this->callback)($binary, $mediaVariation);
    }

    public function supports(Binary $binary): bool
    {
        return true;
    }
}
