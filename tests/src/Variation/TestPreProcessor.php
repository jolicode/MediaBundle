<?php

namespace JoliCode\MediaBundle\Tests\Variation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;

class TestPreProcessor implements PreProcessorInterface
{
    public function __construct(private readonly ?Format $defaultOutputFormat = null, private readonly bool $shouldSupport = true)
    {
    }

    public function getDefaultOutputFormat(): ?Format
    {
        return $this->defaultOutputFormat;
    }

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary
    {
        return $binary;
    }

    public function supports(Binary $binary): bool
    {
        return $this->shouldSupport;
    }
}
