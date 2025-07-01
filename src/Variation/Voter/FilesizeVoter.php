<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Media;

readonly class FilesizeVoter implements VoterInterface
{
    public function __construct(
        private ?int $minSize = null,
        private ?int $maxSize = null,
    ) {
    }

    public function vote(Media $media): bool
    {
        $size = $media->getFileSize();

        if (null !== $this->minSize && $size < $this->minSize) {
            return false;
        }

        if (null !== $this->maxSize && $size > $this->maxSize) {
            return false;
        }

        return true;
    }
}
