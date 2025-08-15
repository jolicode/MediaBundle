<?php

namespace JoliCode\MediaBundle\Doctrine;

class Types
{
    public const string MEDIA = 'media';

    public const string MEDIA_LONG = 'media_long';

    public const MEDIA_TYPES = [
        self::MEDIA,
        self::MEDIA_LONG,
    ];
}
