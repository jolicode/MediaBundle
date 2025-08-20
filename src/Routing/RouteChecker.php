<?php

namespace JoliCode\MediaBundle\Routing;

use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;

readonly class RouteChecker
{
    public function __construct(
        private LibraryContainer $libraries,
        private Resolver $resolver,
    ) {
    }

    public function check(array $params): bool
    {
        $libraryName = $params['library'] ?? null;
        $variation = $params['variation'] ?? null;
        $slug = $params['slug'] ?? null;

        if (null === $slug || null === $libraryName || !$this->libraries->has($libraryName)) {
            return false;
        }

        if (null !== $variation && !$this->libraries->get($libraryName)->getVariationContainer()->has($variation)) {
            return false;
        }

        try {
            $media = $this->resolver->resolve($slug, $libraryName);
        } catch (\Exception) {
            return false;
        }

        return null !== $media;
    }
}
