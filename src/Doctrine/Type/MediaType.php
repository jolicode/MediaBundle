<?php

namespace JoliCode\MediaBundle\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\StringType;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;

class MediaType extends StringType
{
    use MediaTypeTrait;

    #[\Deprecated(message: 'use Types::MEDIA instead')]
    public const string NAME = Types::MEDIA;

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

        $databaseValue = parent::convertToDatabaseValue(Resolver::normalizePath($value), $platform);

        if (mb_strlen((string) $databaseValue) > 255) {
            throw new \InvalidArgumentException('This media path exceeds the maximum length of 255 characters. Rather use the ' . Types::class . '::MEDIA_LONG type for longer paths.');
        }

        return $databaseValue;
    }

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        $column['length'] ??= 255;

        return parent::getSQLDeclaration($column, $platform);
    }

    public function getName(): string
    {
        return Types::MEDIA;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }
}
