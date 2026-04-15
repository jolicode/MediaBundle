<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return static function (RoutingConfigurator $routes): void {
    $routes->import('../src/Controller/', 'attribute');
    $routes->import('.', 'easyadmin.routes');
    $routes->import('@JoliMediaBundle/config/routes.php');
    $routes->import('@JoliMediaEasyAdminBundle/src/Controller/')->prefix('/admin/media');
    $routes->import('@JoliMediaSyliusAdminBundle/src/Symfony/Controller/')->prefix('/sylius-admin/media');
    $routes->import('@SyliusAdminUiBundle/config/routes.php')->prefix('/sylius-admin');
    $routes->import('sylius.symfony.routing.loader.resource', 'service');
};
