<?php

namespace JoliCode\MediaBundle\Routing;

use JoliCode\MediaBundle\Controller\MediaController;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Storage\Strategy\IdentityStorageStrategy;
use Symfony\Bundle\FrameworkBundle\Routing\RouteLoaderInterface;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

readonly class RouteLoader implements RouteLoaderInterface
{
    public function __construct(
        private LibraryContainer $libraries,
    ) {
    }

    public function loadRoutes(): RouteCollection
    {
        $routes = new RouteCollection();

        foreach ($this->libraries->list() as $libraryName => $library) {
            $routeName = 'joli_media_original_' . $libraryName;
            $routes->add($routeName, new Route(\sprintf(
                '%s%s',
                $library->getOriginalStorage()->getUrlPath(),
                $library->getOriginalStorage()->getStrategy()->getRoutePattern(),
            ), [
                '_controller' => [MediaController::class, 'media'],
                'library' => $libraryName,
            ], [
                'slug' => '.+',
            ]));

            $defaults = [
                '_controller' => [MediaController::class, 'variation'],
                'library' => $libraryName,
            ];

            if ($library->getCacheStorage()->getStrategy() instanceof IdentityStorageStrategy) {
                $defaults['variation'] = $library->getVariationContainer()->getNames()[0] ?? null;
            }

            $routeName = 'joli_media_cache_' . $libraryName;
            $routes->add($routeName, new Route(\sprintf(
                '%s%s',
                $library->getCacheStorage()->getUrlPath(),
                $library->getCacheStorage()->getStrategy()->getRoutePattern(true),
            ), $defaults, [
                'variation' => '[A-z0-9_-]+',
                'slug' => '.+',
            ]));
        }

        return $routes;
    }
}
