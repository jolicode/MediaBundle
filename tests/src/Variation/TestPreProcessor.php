<?php

namespace JoliCode\MediaBundle\Tests\Variation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
use JoliCode\MediaBundle\Variation\Variation;

class TestPreProcessor implements PreProcessorInterface
{
    public function __construct(private readonly ?Format $defaultOutputFormat = null, private readonly bool $shouldSupport = true)
    {
    }

    public function getDefaultOutputFormat(): ?Format
    {
        return $this->defaultOutputFormat;
    }

    public function process(Binary $binary, Variation $variation): Binary
    {
        return $binary;
    }

    public function supports(Binary $binary): bool
    {
        return $this->shouldSupport;
    }
}
