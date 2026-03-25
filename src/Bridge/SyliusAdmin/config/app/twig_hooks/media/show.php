<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.show.content.header' => [
                'breadcrumbs' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/show/content/header/breadcrumbs.html.twig',
                    'configuration' => [
                        'title' => 'Media' // '@=media.path',
                    ],
                ],
            ],

//            'joli_media_sylius_admin.media.show.content.header.title_block' => [
//                'title' => [
//                    'enabled' => false,
//                ],
//            ],

            'joli_media_sylius_admin.media.show.content' => [
                'body' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body' => [
                'preview' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/preview.html.twig',
                    'priority' => -10,
                ],
                'url' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/url.html.twig',
                    'priority' => -20,
                ],
                'markdown' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/markdown.html.twig',
                    'priority' => -30,
                ],
                'html' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/html.html.twig',
                    'priority' => -40,
                ],
                'file_type' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/file_type.html.twig',
                    'priority' => -50,
                ],
                'file_size' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/file_size.html.twig',
                    'priority' => -60,
                ],
                'dimensions' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/dimensions.html.twig',
                    'priority' => -70,
                ],
            ],
        ],
    ]);
};
