<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('joli_media_easy_admin', [
        'text_editor' => [
            'variation' => 'variation-standard',
        ],
        'upload' => [
            'accepted_files' => ['image/*', 'application/pdf'],
        ],
        'visibility' => [
            'show_variations_stored' => true,
        ],
    ]);
};
