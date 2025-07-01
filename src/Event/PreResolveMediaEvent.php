<?php

namespace JoliCode\MediaBundle\Event;

use JoliCode\MediaBundle\Storage\OriginalStorage;

final class PreResolveMediaEvent extends MediaEvent
{
    public function __construct(
        public readonly OriginalStorage $originalStorage,
        public string $path,
    ) {
    }
}
