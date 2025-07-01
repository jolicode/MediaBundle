<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('twig_component', [
        'anonymous_template_directory' => 'components/',
    ]);
};
