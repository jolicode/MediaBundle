<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->parameters()->set('locale', 'en');

    $services = $container->services()
        ->defaults()
        ->autowire()
        ->autoconfigure()
    ;

    $services->load('JoliCode\MediaBundle\Tests\Application\\', '../src/*')
        ->exclude('../{Entity,Tests,Kernel.php}')
    ;

    $services->load('JoliCode\MediaBundle\Tests\Application\Controller\\', '../src/Controller/')
        ->tag('controller.service_arguments')
    ;
};
