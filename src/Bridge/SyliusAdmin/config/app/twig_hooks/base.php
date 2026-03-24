<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'sylius_admin.base#stylesheets' => [
                'joli_media_sylius_admin' => [
                    'template' => '@JoliMediaSyliusAdmin/base/styles.html.twig',
                ],
            ],

            'sylius_admin.base#javascripts' => [
                'joli_media_sylius_admin' => [
                    'template' => '@JoliMediaSyliusAdmin/base/scripts.html.twig',
                ],
            ],
        ],
    ]);
};
