<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
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
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/breadcrumbs.html.twig',
                ],
                'dropzone' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/dropzone.html.twig',
                ],
                'create_directory' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/create_directory.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header.title_block' => [
                'title' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/header/title_block/title.html.twig',
                    'configuration' => [
                        'title' => 'media_library',
                    ],
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body' => [
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
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view/grid/data_table.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.grid.data_table' => [
                'header' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view/grid/data_table/header.html.twig',
                ],
                'body' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view/grid/data_table/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.grid.data_table.body' => [
                'directories' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view/grid/data_table/body/directories.html.twig',
                ],
                'rows' => [
                    'template' => '@JoliMediaSyliusAdmin/media/index/content/body/tabs/content/list_view/grid/data_table/body/rows.html.twig',
                ],
            ],
        ],
    ]);
};
