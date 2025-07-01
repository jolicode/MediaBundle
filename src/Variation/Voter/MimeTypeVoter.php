<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Media;

readonly class MimeTypeVoter implements VoterInterface
{
    public function __construct(
        private string $mimeType,
    ) {
    }

    public function vote(Media $media): bool
    {
        return $media->getMimeType() === $this->mimeType;
    }
}
