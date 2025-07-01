<?php

namespace JoliCode\MediaBundle\Library;

use JoliCode\MediaBundle\Storage\CacheStorage;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Variation\Variation;
use JoliCode\MediaBundle\Variation\VariationContainer;

readonly class Library
{
    public function __construct(
        private string $name,
        private OriginalStorage $originalStorage,
        private CacheStorage $cacheStorage,
        private VariationContainer $variationContainer,
    ) {
        $originalStorage->setLibrary($this);
        $cacheStorage->setLibrary($this);
    }

    public function deleteAllVariations(string $path): void
    {
        foreach ($this->variationContainer->list() as $variation) {
            $this->cacheStorage->delete($path, $variation);
        }
    }

    public function getCacheStorage(): CacheStorage
    {
        return $this->cacheStorage;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getOriginalStorage(): OriginalStorage
    {
        return $this->originalStorage;
    }

    public function getVariation(string $name): Variation
    {
        return $this->variationContainer->get($name);
    }

    public function getVariationContainer(): VariationContainer
    {
        return $this->variationContainer;
    }

    public function hasVariation(string $name): bool
    {
        return $this->variationContainer->has($name);
    }
}
