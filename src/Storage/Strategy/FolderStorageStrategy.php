<?php

namespace JoliCode\MediaBundle\Storage\Strategy;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Variation\Variation;

class FolderStorageStrategy implements StorageStrategyInterface
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
        if ($variation instanceof Variation) {
            return \sprintf('%s/%s',
                $variation->getName(),
                $this->getFilePath($path, $variation),
            );
        }

        return $path;
    }

    public function getRoutePattern(bool $cache = false): string
    {
        return $cache ? '{variation}/{slug}' : '{slug}';
    }
}
