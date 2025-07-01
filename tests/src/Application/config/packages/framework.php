<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('framework', [
        'secret' => 'F00',
        'csrf_protection' => true,
        'http_method_override' => true,
        'session' => [
            'handler_id' => null,
            'storage_factory_id' => 'session.storage.factory.mock_file',
        ],
        'test' => true,
    ]);
};
