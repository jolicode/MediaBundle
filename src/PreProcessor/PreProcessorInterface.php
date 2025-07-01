<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Variation\Variation;

interface PreProcessorInterface
{
    public function getDefaultOutputFormat(): ?Format;

    public function process(Binary $binary, Variation $variation): Binary;

    public function supports(Binary $binary): bool;
}
