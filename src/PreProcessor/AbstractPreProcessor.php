<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

abstract readonly class AbstractPreProcessor implements PreProcessorInterface
{
    public function getDefaultOutputFormat(): ?Format
    {
        return null;
    }

    public function supports(Binary $binary): bool
    {
        return true;
    }
}
