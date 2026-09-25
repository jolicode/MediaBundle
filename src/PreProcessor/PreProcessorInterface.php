<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;

interface PreProcessorInterface
{
    public function getDefaultOutputFormat(): ?Format;

    /**
     * Whether the returned binary always has the same pixel dimensions as the given one.
     */
    public function preservesPixelDimensions(): bool;

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary;

    public function supports(Binary $binary): bool;
}
