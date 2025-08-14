<?php

namespace JoliCode\MediaBundle\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\TextType;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;

class MediaLongType extends TextType
{
    use MediaTypeTrait;

    public function getName(): string
    {
        return Types::MEDIA_LONG;
    }

    /**
     * @param Media|string|null $value
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform): ?string
    {
        if (null === $value) {
            return null;
        }

        if ($value instanceof Media) {
            $value = $value->getPath();
        }

        return parent::convertToDatabaseValue(Resolver::normalizePath($value), $platform);
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }
}
