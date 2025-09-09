<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;

interface PreProcessorInterface
{
    public function getDefaultOutputFormat(): ?Format;

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary;

    public function supports(Binary $binary): bool;
}
