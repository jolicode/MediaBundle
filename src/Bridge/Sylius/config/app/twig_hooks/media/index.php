<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.index.content' => [
                'header' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header.html.twig',
                ],
                'grid' => [
                    'enabled' => false,
                ],
                'body' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header' => [
                'breadcrumbs' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/breadcrumbs.html.twig',
                ],
                'dropzone' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/dropzone.html.twig',
                ],
                'rename_directory' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/rename_directory.html.twig',
                ],
                'create_directory' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/create_directory.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header.title_block' => [
                'title' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/title_block/title.html.twig',
                    'configuration' => [
                        'title' => 'media_library',
                    ],
                ],
            ],

            'joli_media_sylius_admin.media.index.content.header.title_block.actions' => [
                'back' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/header/title_block/actions/back.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body' => [
                'tabs' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs' => [
                'header' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/header.html.twig',
                ],
                'content' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.header' => [
                'list_view' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/header/list_view.html.twig',
                ],
                'grid_view' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/header/grid_view.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content' => [
                'list_view' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view.html.twig',
                ],
                'grid_view' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/grid_view.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view' => [
                'data_table' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view/data_table.html.twig',
                ],
                'no_data_block' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.data_table' => [
                'header' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view/data_table/header.html.twig',
                ],
                'body' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view/data_table/body.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.data_table.body' => [
                'directories' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view/data_table/body/directories.html.twig',
                ],
                'rows' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/list_view/data_table/body/rows.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.list_view.no_results' => [
                'image' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/image.html.twig',
                ],
                'title' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/title.html.twig',
                ],
                'subtitle' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/subtitle.html.twig',
                ],
                'action' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/action.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.grid_view' => [
                'content' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/body/tabs/content/grid_view/content.html.twig',
                ],
                'no_data_block' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.index.content.body.tabs.content.grid_view.no_results' => [
                'image' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/image.html.twig',
                ],
                'title' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/title.html.twig',
                ],
                'subtitle' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/subtitle.html.twig',
                ],
                'action' => [
                    'template' => '@JoliMediaSylius/admin/media/index/content/grid/no_results/action.html.twig',
                ],
            ],
        ],
    ]);
};
