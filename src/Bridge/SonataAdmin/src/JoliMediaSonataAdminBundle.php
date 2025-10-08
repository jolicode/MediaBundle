<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin;

use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

class JoliMediaSonataAdminBundle extends AbstractBundle
{
    public function configure(DefinitionConfigurator $definition): void
    {
        $definition->rootNode()
            ->children()
                ->arrayNode('upload')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->integerNode('max_files')
                            ->defaultValue(null)
                            ->info('Maximum number of files that can be uploaded at once.')
                        ->end()
                        ->integerNode('max_file_size')
                            ->defaultValue(20)
                            ->info('Maximum file size for uploads, in Megabytes.')
                        ->end()
                        ->arrayNode('accepted_files')
                            ->defaultValue([])
                            ->scalarPrototype()->end()
                            ->info('List of accepted file mime types, e.g. image/png, image/*. Leave empty to allow any file type.')
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('visibility')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->booleanNode('show_markdown_code')
                            ->defaultFalse()
                            ->info('If true, shows the media Markdown code on the media show page.')
                        ->end()
                        ->booleanNode('show_html_code')
                            ->defaultFalse()
                            ->info('If true, shows the media HTML code on the media show page.')
                        ->end()
                        ->booleanNode('show_variations_action_regenerate')
                            ->defaultFalse()
                            ->info('If true, shows the action to regenerate variations on the media show page.')
                        ->end()
                        ->booleanNode('show_variations_list')
                            ->defaultTrue()
                            ->info('If true, shows the list of variations in a dedicated tab on the media show page.')
                        ->end()
                        ->booleanNode('show_variations_list_admin_variations')
                            ->defaultFalse()
                            ->info('If true, shows the variations defined in by the admin bridge in the variations list tab.')
                        ->end()
                        ->booleanNode('show_variations_stored')
                            ->defaultFalse()
                            ->info('If true, shows wether a variation is already stored in the media library or not.')
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('sonata_admin')
                    ->children()
                        ->arrayNode('templates')
                            ->children()
                                ->scalarNode('ajax')
                                    ->defaultValue('@JoliMediaSonataAdmin/ajax.html.twig')
                                ->end()
                                ->scalarNode('layout')
                                    ->defaultValue('@JoliMediaSonataAdmin/layout.html.twig')
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $bundles = $builder->getParameter('kernel.bundles');

        if (!isset($bundles['JoliMediaBundle'])) {
            throw new \RuntimeException(
                'The bundle "JoliMediaBundle" needs to be registered in order to use JoliMediaSonataAdminBundle.'
            );
        }

        if (!isset($bundles['SonataAdminBundle'])) {
            throw new \RuntimeException(
                'The bundle "SonataAdminBundle" needs to be registered in order to use JoliMediaSonataAdminBundle.'
            );
        }

        $container->import('../config/services.php');

        $container->services()
            ->get('joli_media_sonata_admin.config')
            ->arg('$visibility', $config['visibility'])
            ->arg('$acceptedFiles', $config['upload']['accepted_files'])
            ->arg('$maxFiles', $config['upload']['max_files'])
            ->arg('$maxFileSize', $config['upload']['max_file_size'])
        ;

        $container->services()
            ->get('joli_media_sonata_admin.controller.admin')
            ->arg('$sonataAdminLayoutTemplate', $config['sonata_admin']['templates']['layout'] ?? '@SonataAdmin/standard_layout.html.twig')
            ->arg('$sonataAdminAjaxTemplate', $config['sonata_admin']['templates']['ajax'] ?? '@SonataAdmin/ajax_layout.html.twig')
        ;
    }

    public function prependExtension(ContainerConfigurator $containerConfigurator, ContainerBuilder $containerBuilder): void
    {
        $sonataAdminConfig = $containerBuilder->getExtensionConfig('sonata_admin');
        $joliMediaConfig = $containerBuilder->getExtensionConfig('joli_media');

        if (isset($sonataAdminConfig[0]['templates'])) {
            $containerBuilder->prependExtensionConfig($this->getContainerExtension()->getAlias(), [
                'sonata_admin' => [
                    'templates' => [
                        'ajax' => $sonataAdminConfig[0]['templates']['ajax'] ?? null,
                        'layout' => $sonataAdminConfig[0]['templates']['layout'] ?? null,
                    ],
                ],
            ]);
        }

        $containerBuilder->prependExtensionConfig('sonata_doctrine_orm_admin', [
            'templates' => [
                'types' => [
                    'list' => [
                        'media' => '@JoliMediaSonataAdmin/field_types/media_list.html.twig',
                    ],
                    'show' => [
                        'media' => '@JoliMediaSonataAdmin/field_types/media_show.html.twig',
                    ],
                ],
            ],
        ]);

        $containerBuilder->prependExtensionConfig('twig', [
            'form_themes' => [
                '@JoliMediaSonataAdmin/form/media_choice.html.twig',
            ],
        ]);
        $package =  new PathPackage(
            '/bundles/jolimediasonataadmin',
            new JsonManifestVersionStrategy(__DIR__ . '/../public/manifest.json'),
        );
        $containerBuilder->prependExtensionConfig('sonata_admin', [
            'assets' => [
                'extra_javascripts' => [
                    $package->getUrl('joli-media-sonata-admin.js'),
                ],
                'extra_stylesheets' => [
                    $package->getUrl('joli-media-sonata-admin.css'),
                ],
            ],
        ]);

        if (isset($joliMediaConfig[0]['default_library'])) {
            $joliMediaDefaultLibrary = $joliMediaConfig[0]['default_library'];
        } elseif (isset($joliMediaConfig[0]['libraries']) && count($joliMediaConfig[0]['libraries']) > 0) {
            $joliMediaDefaultLibrary = array_key_first($joliMediaConfig[0]['libraries']);
        } else {
            throw new \RuntimeException('It is required to define a library in the JoliMediaBundle configuration before using the JoliMediaSonataAdminBundle.');
        }

        $containerBuilder->prependExtensionConfig('joli_media', [
            'libraries' => [
                $joliMediaDefaultLibrary => [
                    'variations' => [
                        'joli_media_sonata_admin' => [
                            'enable_auto_webp' => false,
                            'pixel_ratios' => [1],
                            'transformers' => [
                                'resize' => [
                                    'width' => 180,
                                    'height' => 109,
                                    'mode' => 'inside',
                                    'allow_upscale' => false,
                                ],
                            ],
                        ],
                        'joli_media_sonata_admin_large' => [
                            'enable_auto_webp' => false,
                            'pixel_ratios' => [1],
                            'transformers' => [
                                'resize' => [
                                    'width' => 800,
                                    'height' => 600,
                                    'mode' => 'inside',
                                    'allow_upscale' => false,
                                ],
                            ],
                        ],
                        'joli_media_sonata_admin_small' => [
                            'enable_auto_webp' => false,
                            'pixel_ratios' => [1],
                            'transformers' => [
                                'thumbnail' => [
                                    'width' => 20,
                                    'height' => 24,
                                    'allow_upscale' => true,
                                ],
                            ],
                        ],
                    ]
                ],
            ],
        ]);
    }
}
