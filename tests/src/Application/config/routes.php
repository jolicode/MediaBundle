<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes): void {
    $routes->import('../src/Controller/', 'attribute');
    $routes->import('.', 'easyadmin.routes');
    $routes->import('@JoliMediaBundle/config/routes.php');
    $routes->import('@JoliMediaEasyAdminBundle/src/Controller/')->prefix('/admin/media');
};
