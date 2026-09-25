<?php

namespace JoliCode\MediaBundle\Storage;

use Symfony\Contracts\Cache\ItemInterface;

trait MissingFileCacheTrait
{
    // a missing file may be created at any time, possibly by another process
    private const MISSING_FILE_EXPIRES_AFTER = 60;

    private function expireEarlyWhenMissing(ItemInterface $item, string $storagePath): void
    {
        if (!$this->filesystem->has($storagePath)) {
            $item->expiresAfter(self::MISSING_FILE_EXPIRES_AFTER);
        }
    }

    private function getMissingFileTimestamp(): int
    {
        // floored to the current hour, so that the cache keys derived from it remain stable
        $now = time();

        return $now - ($now % 3600);
    }
}
