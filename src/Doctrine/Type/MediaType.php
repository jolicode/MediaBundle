<?php

namespace JoliCode\MediaBundle\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\StringType;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Resolver\Resolver;

class MediaType extends StringType
{
    #[\Deprecated(message: 'use Types::MEDIA instead')]
    public const string NAME = Types::MEDIA;

    /**
     * @var callable(): Resolver|null
     */
    public static $resolverInitializer;

    private static Resolver $resolver;

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        $column['length'] ??= 255;

        return parent::getSQLDeclaration($column, $platform);
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

    public function convertToPHPValue($value, AbstractPlatform $platform): ?Media
    {
        if (null === $value) {
            return null;
        }

        if (!\is_string($value) && !$value instanceof Media) {
            throw new \InvalidArgumentException(\sprintf('Expected a string or Media object, got %s.', get_debug_type($value)));
        }

        try {
            return $this->getResolver()->resolveMedia($value);
        } catch (\Exception) {
            return new NullMedia($value);
        }
    }

    public function getName(): string
    {
        return Types::MEDIA;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform): bool
    {
        return true;
    }

    private function getResolver(): Resolver
    {
        if (!isset(self::$resolver)) {
            if (!isset(self::$resolverInitializer)) {
                throw new \LogicException('Resolver Initializer is not set.');
            }

            self::$resolver = (self::$resolverInitializer)();
        }

        return self::$resolver;
    }
}
