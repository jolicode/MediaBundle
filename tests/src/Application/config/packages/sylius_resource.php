<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension('sylius_resource', [
        'mapping' => [
            'paths' => [
                '%kernel.project_dir%/src/Entity',
            ],
        ],
        'resources' => null,
    ]);
};
