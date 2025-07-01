<?php

namespace JoliCode\MediaBundle\Variation;

use JoliCode\MediaBundle\Exception\VariationNotFoundException;
use JoliCode\MediaBundle\Storage\CacheStorage;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\String\Slugger\SluggerInterface;

class VariationContainer
{
    public function __construct(
        private readonly ServiceLocator $variations,
        private readonly CacheStorage $storage,
        private readonly SluggerInterface $slugger = new AsciiSlugger(),
    ) {
    }

    public function get(string $name): Variation
    {
        if (!$this->has($name)) {
            throw new VariationNotFoundException(\sprintf('Variation "%s" does not exist.', $name));
        }

        return $this->variations->get($this->formatName($name));
    }

    /**
     * @return string[]
     */
    public function getNames(): array
    {
        return array_keys($this->variations->getProvidedServices());
    }

    public function getStorage(): CacheStorage
    {
        return $this->storage;
    }

    public function has(string $name): bool
    {
        return $this->variations->has($this->formatName($name));
    }

    /**
     * @return iterable<Variation>
     */
    public function list(): iterable
    {
        return $this->variations;
    }

    private function formatName(string $name): string
    {
        return $this->slugger->slug($name)->lower()->toString();
    }
}
