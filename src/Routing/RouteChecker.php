<?php

namespace JoliCode\MediaBundle\Routing;

use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;

readonly class RouteChecker
{
    public function __construct(
        private LibraryContainer $libraries,
        private Resolver $resolver,
    ) {
    }

    /**
     * @param array{
     *     library: string,
     *     variation?: string|null,
     *     slug: string,
     * } $params
     */
    public function check(array $params): bool
    {
        $library = $params['library'];
        $variation = $params['variation'] ?? null;
        $slug = $params['slug'];

        if (!$this->libraries->has($library)) {
            return false;
        }

        if (null !== $variation) {
            if (!$this->libraries->get($library)->getVariationContainer()->has($variation)) {
                return false;
            }

            try {
                $mediaVariation = $this->resolver->resolveMediaVariation($slug, $variation, $library);
            } catch (\Exception) {
                return false;
            }

            return $mediaVariation instanceof MediaVariation;
        }

        try {
            $media = $this->resolver->resolve($slug, $library);
        } catch (\Exception) {
            return false;
        }

        return null !== $media;
    }
}
