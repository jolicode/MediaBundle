<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.index' => [
                'title' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/common/content/header/title_block/title.html.twig',
                    'configuration' => [
                        'title' => 'Media',
                    ],
                ],
            ],

            'joli_media_sylius_admin.media.index.content' => [
                'header' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header.html.twig',
                ],
                'grid' => [
                    'enabled' => false,
                ],
                'body' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header' => [
                'breadcrumbs' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/index/content/header/breadcrumbs.html.twig',
                    'configuration' => [
                        'title' => 'Media',
                    ],
                ],
                'dropzone' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/dropzone.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header.title_block' => [
                'title' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/common/content/header/title_block/title.html.twig',
                    'configuration' => [
                        'title' => 'Media',
                    ],
                ],
//                'dropzone' => [
//                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/dropzone.html.twig',
//                ],
            ],

            'joli_media_sylius_admin.media.index.content.body' => [
                'tree' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tree.html.twig',
                ],
                'tabs' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs' => [
                'header' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/header.html.twig',
                ],
                'content' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.header' => [
                'list_view' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/header/list_view.html.twig',
                ],
                'grid_view' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/header/grid_view.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content' => [
                'list_view' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view.html.twig',
                ],
                'grid_view' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/grid_view.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view' => [
                'grid' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/index/content/grid.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.grid' => [
                'data_table' => [
                    'template' => '@SyliusBootstrapAdminUi/shared/crud/index/content/grid/data_table.html.twig',
                ],
            ],
        ],
    ]);
};
