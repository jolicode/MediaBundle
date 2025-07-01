<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('flysystem', [
        'storages' => [
            'default.original.storage' => [
                'adapter' => 'local',
                'options' => [
                    'directory' => '%kernel.project_dir%/public/media/original',
                ],
            ],
            'default.cache.storage' => [
                'adapter' => 'local',
                'options' => [
                    'directory' => '%kernel.project_dir%/public/media/cache',
                ],
            ],

            'auto_generate.original.storage' => [
                'adapter' => 'local',
                'options' => [
                    'directory' => '%kernel.project_dir%/public/media-auto-generate/original',
                ],
            ],
            'auto_generate.cache.storage' => [
                'adapter' => 'local',
                'options' => [
                    'directory' => '%kernel.project_dir%/public/media-auto-generate/cache',
                ],
            ],
        ],
    ]);
};
