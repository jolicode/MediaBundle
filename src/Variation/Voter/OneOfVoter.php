<?php

namespace JoliCode\MediaBundle\Variation\Voter;

use JoliCode\MediaBundle\Model\Media;

readonly class OneOfVoter implements VoterInterface
{
    /**
     * @param VoterInterface[] $voters
     */
    public function __construct(
        private array $voters = [],
    ) {
    }

    public function vote(Media $media): bool
    {
        foreach ($this->voters as $voter) {
            if ($voter->vote($media)) {
                return true;
            }
        }

        return false;
    }
}
