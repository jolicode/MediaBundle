<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('sylius_twig_hooks', [
        'hooks' => [
            'joli_media_sylius_admin.media.show' => [
                'modal' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/modal/move_media_modal.html.twig',
                    'priority' => 100,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header' => [
                'breadcrumbs' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/breadcrumbs.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header.title_block' => [
                'title' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/title_block/title.html.twig',
                ],
                'actions' => [
                    'template' => '@JoliMediaSyliusAdmin/shared/crud/show/content/header/title_block/actions.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content.header.title_block.actions' => [
                'rename_media' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/title_block/actions/rename_media.html.twig',
                ],
                'delete_media' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/title_block/actions/delete_media.html.twig',
                ],
                'move_media' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/header/title_block/actions/move_media.html.twig',
                ],
            ],

            'joli_media_sylius_admin.media.show.content' => [
                'body' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body.html.twig',
                    'priority' => -10,
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
                    'priority' => -10,
                ],
                'content' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/content.html.twig',
                    'priority' => -20,
                ],
            ],

            'joli_media_sylius_admin.media.show.content.body.tabs.header' => [
                'general' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/header/general.html.twig',
                    'priority' => -10,
                ],
                'variations' => [
                    'template' => '@JoliMediaSyliusAdmin/media/show/content/body/tabs/header/variations.html.twig',
                    'priority' => -20,
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
