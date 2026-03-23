<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony\Controller\MediaAdminController;

return static function (ContainerConfigurator $container): void {
    $services = $container->services();

    $services->set('joli_media.sylius_admin.controller.media_admin', MediaAdminController::class)
        ->args([
            service('joli_media.library_container'),
            service('sylius.grid.view_factory'),
            service('sylius.grid.provider'),
        ])
        ->call('setContainer', [service('service_container')])
        ->tag('controller.service_arguments')
        ->alias(MediaAdminController::class, 'joli_media.sylius_admin.controller.media_admin')
        ->public()
    ;
};
