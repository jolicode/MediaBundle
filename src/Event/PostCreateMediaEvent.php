<?php

namespace JoliCode\MediaBundle\Event;

use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\OriginalStorage;

final class PostCreateMediaEvent extends MediaEvent
{
    public function __construct(
        public readonly OriginalStorage $originalStorage,
        public readonly Media $media,
    ) {
    }
}
