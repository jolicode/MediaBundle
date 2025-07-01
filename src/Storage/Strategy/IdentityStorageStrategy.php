<?php

namespace JoliCode\MediaBundle\Storage\Strategy;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Variation\Variation;

class IdentityStorageStrategy implements StorageStrategyInterface
{
    public function getFilePath(?string $path = null, ?Variation $variation = null): string
    {
        if ('' === $path || null === $path) {
            return '';
        }

        if ($variation instanceof Variation && $variation->getFormat() instanceof Format) {
            $parts = pathinfo($path);
            $hash = hash('crc32', $path);
            $path = '';

            if ('.' !== $parts['dirname']) {
                $path = $parts['dirname'] . '/';
            }

            $path .= $parts['filename'] . '.' . $hash . '.' . $variation->getFormat()->value;
        }

        return $path;
    }

    public function getPath(string $path, ?Variation $variation = null): string
    {
        return $this->getFilePath($path, $variation);
    }

    public function getRoutePattern(bool $cache = false): string
    {
        return '{slug}';
    }
}
