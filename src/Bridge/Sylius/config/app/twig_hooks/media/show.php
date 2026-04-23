<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.show' => [
                'modal' => [
                    'template' => '@JoliMediaSylius/admin/media/show/modal/move_media_modal.html.twig',
                    'priority' => 100,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header' => [
                'breadcrumbs' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/breadcrumbs.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header.title_block' => [
                'title' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/title_block/title.html.twig',
                ],
                'actions' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/title_block/actions.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header.title_block.actions' => [
                'rename_media' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/title_block/actions/rename_media.html.twig',
                ],
                'delete_media' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/title_block/actions/delete_media.html.twig',
                ],
                'move_media' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/header/title_block/actions/move_media.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content' => [
                'body' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body.html.twig',
                    'priority' => -10,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body' => [
                'tabs' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs.html.twig',
                    'priority' => -10,
                ],
            ],
            'joli_media_sylius_admin.media.show.content.body.tabs' => [
                'header' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/header.html.twig',
                    'priority' => -10,
                ],
                'content' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content.html.twig',
                    'priority' => -20,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.header' => [
                'general' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/header/general.html.twig',
                    'priority' => -10,
                ],
                'variations' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/header/variations.html.twig',
                    'priority' => -20,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content' => [
                'general' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general.html.twig',
                    'priority' => -10,
                ],
                'variations' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/variations.html.twig',
                    'priority' => -20,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content.general' => [
                'preview' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/preview.html.twig',
                    'priority' => -10,
                ],
                'url' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/url.html.twig',
                    'priority' => -20,
                ],
                'markdown' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/markdown.html.twig',
                    'priority' => -30,
                ],
                'html' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/html.html.twig',
                    'priority' => -40,
                ],
                'file_type' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/file_type.html.twig',
                    'priority' => -50,
                ],
                'file_size' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/file_size.html.twig',
                    'priority' => -60,
                ],
                'dimensions' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/general/dimensions.html.twig',
                    'priority' => -70,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.content.variations' => [
                'table' => [
                    'template' => '@JoliMediaSylius/admin/media/show/content/body/tabs/content/variations/table.html.twig',
                    'priority' => -10,
                ],
            ],
        ],
    ]);
};
