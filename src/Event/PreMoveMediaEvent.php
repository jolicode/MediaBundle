<?php

namespace JoliCode\MediaBundle\Event;

use JoliCode\MediaBundle\Storage\OriginalStorage;

final class PreMoveMediaEvent extends MediaEvent
{
    public function __construct(
        public readonly OriginalStorage $originalStorage,
        public readonly string $from,
        public readonly string $to,
    ) {
    }
}
