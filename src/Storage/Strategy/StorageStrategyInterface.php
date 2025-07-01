<?php

namespace JoliCode\MediaBundle\Storage\Strategy;

use JoliCode\MediaBundle\Variation\Variation;

interface StorageStrategyInterface
{
    public function getFilePath(string $path, ?Variation $variation = null): string;

    public function getPath(string $path, ?Variation $variation = null): string;

    public function getRoutePattern(bool $cache = false): string;
}
