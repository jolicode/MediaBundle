<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container): void {
    $container->extension('joli_media', [
        'processors' => [
            'imagick' => [
                'options' => [
                    'jpeg_quality' => 80,
                    'png_quality' => 80,
                    'quality' => 80,
                ],
            ],
        ],
        'post_processors' => [],
        'libraries' => [
            'default' => [
                'original' => [
                    'flysystem' => 'default.original.storage',
                    'url_generator' => [
                        'path' => '/media/original/',
                    ],
                ],
                'cache' => [
                    'flysystem' => 'default.cache.storage',
                    'must_store_when_generating_url' => false,
                    'url_generator' => [
                        'path' => '/media/cache/',
                    ],
                ],
                'enable_auto_webp' => true,
                'variations' => [
                    'variation-standard' => [
                        'transformers' => [
                            'resize' => [
                                'width' => 180,
                                'height' => 109,
                                'mode' => 'inside',
                                'allow_upscale' => false,
                            ],
                        ],
                    ],
                    'variation-large' => [
                        'transformers' => [
                            'resize' => [
                                'width' => 800,
                                'height' => 600,
                                'mode' => 'inside',
                                'allow_upscale' => false,
                            ],
                        ],
                    ],
                    'variation-extra-large' => [
                        'transformers' => [
                            'resize' => [
                                'mode' => 'exact',
                                'width' => 1800,
                                'height' => 1200,
                            ],
                        ],
                    ],
                ],
            ],

            // This storage is used to test the "must_store_when_generating_url" feature
            'auto_generate' => [
                'original' => [
                    'flysystem' => 'auto_generate.original.storage',
                    'url_generator' => [
                        'path' => '/media-auto-generate/original/',
                    ],
                ],
                'cache' => [
                    'flysystem' => 'auto_generate.cache.storage',
                    'must_store_when_generating_url' => true,
                    'url_generator' => [
                        'path' => '/media-auto-generate/cache/',
                    ],
                ],
                'enable_auto_webp' => true,
                'variations' => [
                    'variation-standard' => [
                        'transformers' => [
                            'resize' => [
                                'width' => 180,
                                'height' => 109,
                                'mode' => 'inside',
                                'allow_upscale' => false,
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]);
};
