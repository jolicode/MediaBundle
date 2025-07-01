<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Media;

interface VoterInterface
{
    public function vote(Media $media): bool;
}
