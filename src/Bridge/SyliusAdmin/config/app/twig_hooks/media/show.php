<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.show.content.header' =>  [
                'breadcrumbs' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/show/content/header/breadcrumbs.html.twig',
                    'configuration' => [
                        'title' => '@=_context.media.getPath()',
                    ],
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header.title_block' => [
                'title' => [
                    //'template' => '@SyliusBootstrapAdminUi/shared/crud/show/content/header/title_block/title.html.twig',
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/title_block/title.html.twig',
                    'configuration' => [
                        'title' => '@=_context.media.getPath()',
                    ],
                ],
            ],

            'joli_media_sylius_admin.media.show.content' => [
                'body' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body' => [
                'tabs' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs.html.twig',
                    'priority' => -10,
                ],
            ],
            'joli_media_sylius_admin.media.show.content.body.tabs' => [
                'header' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/header.html.twig',
                ],
                'content' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.header' => [
                'general' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/header/general.html.twig',
                    'priority' => -10,
                ],
                'variations' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/header/variations.html.twig',
                    'priority' => -10,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content' => [
                'general' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general.html.twig',
                    'priority' => -10,
                ],
                'variations' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/variations.html.twig',
                    'priority' => -20,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content.general' => [
                'preview' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/preview.html.twig',
                    'priority' => -10,
                ],
                'url' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/url.html.twig',
                    'priority' => -20,
                ],
                'markdown' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/markdown.html.twig',
                    'priority' => -30,
                ],
                'html' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/html.html.twig',
                    'priority' => -40,
                ],
                'file_type' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/file_type.html.twig',
                    'priority' => -50,
                ],
                'file_size' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/file_size.html.twig',
                    'priority' => -60,
                ],
                'dimensions' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/general/dimensions.html.twig',
                    'priority' => -70,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content.variations' => [
                'table' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content/variations/table.html.twig',
                    'priority' => -10,
                ],
            ],
        ],
    ]);
};
