<?php

namespace JoliCode\MediaBundle\Storage;

final class TemporaryUrlExpiration
{
    public const DEFAULT = '+1 hour';

    public static function resolve(\DateTimeInterface|\DateInterval|null $expiresAt): \DateTimeInterface
    {
        if (null === $expiresAt) {
            return new \DateTimeImmutable(self::DEFAULT);
        }

        if ($expiresAt instanceof \DateInterval) {
            return (new \DateTimeImmutable())->add($expiresAt);
        }

        return $expiresAt;
    }
}
