<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Media;

readonly class FolderVoter implements VoterInterface
{
    public function __construct(
        private string $folder,
    ) {
    }

    public function vote(Media $media): bool
    {
        return str_starts_with($media->getPath(), $this->folder);
    }
}
