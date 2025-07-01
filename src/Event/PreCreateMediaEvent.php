<?php

namespace JoliCode\MediaBundle\Event;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Storage\OriginalStorage;

final class PreCreateMediaEvent extends MediaEvent
{
    public function __construct(
        public readonly OriginalStorage $originalStorage,
        public readonly string $path,
        public readonly Binary $binary,
    ) {
    }
}
