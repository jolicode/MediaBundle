<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('doctrine', [
        'dbal' => [
            'driver' => 'pdo_sqlite',
            'path' => '%kernel.cache_dir%/test_database.sqlite',
        ],

        'orm' => [
            'naming_strategy' => 'doctrine.orm.naming_strategy.underscore_number_aware',
            'auto_mapping' => true,
            'controller_resolver' => [
                'auto_mapping' => false,
            ],
            'mappings' => [
                'TestEntities' => [
                    'is_bundle' => false,
                    'type' => 'attribute',
                    'dir' => '%kernel.project_dir%/src/Entity',
                    'prefix' => 'JoliCode\MediaBundle\Tests\Application\Entity',
                    'alias' => 'app',
                ],
            ],
        ],
    ]);
};
