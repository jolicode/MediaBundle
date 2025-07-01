<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;

readonly class FormatVoter implements VoterInterface
{
    public function __construct(
        private string $format,
    ) {
    }

    public function vote(Media $media): bool
    {
        $mediaFormat = Format::fromName($media->getFormat());

        $formats = $mediaFormat instanceof Format ? $mediaFormat->getPossibleExtensions() : [$media->getFormat()];

        return \in_array($this->format, $formats, true);
    }
}
