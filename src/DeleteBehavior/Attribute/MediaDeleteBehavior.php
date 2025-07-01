<?php

namespace JoliCode\MediaBundle\DeleteBehavior\Attribute;

use JoliCode\MediaBundle\DeleteBehavior\Strategy;

#[\Attribute(\Attribute::TARGET_PROPERTY)]
readonly class MediaDeleteBehavior
{
    #[\Deprecated(message: 'use Strategy::RESTRICT instead')]
    public const RESTRICT = Strategy::RESTRICT;

    #[\Deprecated(message: 'use Strategy::SET_NULL instead')]
    public const SET_NULL = Strategy::SET_NULL;

    public function __construct(
        public Strategy $strategy,
    ) {
    }
}
