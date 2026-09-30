<?php

namespace JoliCode\MediaBundle\Exception;

use JoliCode\MediaBundle\Model\MediaVariation;

class MediaVariationNotStoredException extends \RuntimeException
{
    public function __construct(
        private readonly MediaVariation $mediaVariation,
    ) {
        parent::__construct();
        $this->message = \sprintf(
            'The variation "%s" of the media "%s" is not stored and could not be generated.',
            $this->mediaVariation->getVariation()->getName(),
            $this->mediaVariation->getMedia()->getPath(),
        );
    }

    public function getMediaVariation(): MediaVariation
    {
        return $this->mediaVariation;
    }
}
