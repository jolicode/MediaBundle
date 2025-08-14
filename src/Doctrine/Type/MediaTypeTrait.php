<?php

namespace JoliCode\MediaBundle\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Resolver\Resolver;

trait MediaTypeTrait
{
    /**
     * @var callable(): Resolver|null
     */
    public static $resolverInitializer;

    private static Resolver $resolver;

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
