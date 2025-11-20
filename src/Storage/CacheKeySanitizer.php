<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Storage;

use Symfony\Contracts\Cache\ItemInterface;

/**
 * Sanitizes cache keys to ensure they don't contain PSR-6 reserved characters.
 *
 * @see ItemInterface::RESERVED_CHARACTERS
 */
final class CacheKeySanitizer
{
    /**
     * Sanitizes a string by replacing PSR-6 reserved characters with underscores.
     *
     * PSR-6 reserved characters are: {}()/\@:
     *
     * @param string $value The value to sanitize
     *
     * @return string The sanitized value safe to use in cache keys
     */
    public static function sanitize(string $value): string
    {
        return str_replace(str_split(ItemInterface::RESERVED_CHARACTERS), '_', $value);
    }
}
