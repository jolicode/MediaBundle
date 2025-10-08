<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin;

use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

class JoliMediaEasyAdminBundle extends AbstractBundle
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
            ->end()
        ;
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $bundles = $builder->getParameter('kernel.bundles');

        if (!isset($bundles['JoliMediaBundle'])) {
            throw new \RuntimeException('The bundle "JoliMediaBundle" needs to be registered in order to use JoliMediaEasyAdminBundle.');
        }

        if (!isset($bundles['EasyAdminBundle'])) {
            throw new \RuntimeException('The bundle "EasyAdminBundle" needs to be registered in order to use JoliMediaEasyAdminBundle.');
        }

        $container->import('../config/services.php');

        $container->services()
            ->get('joli_media_easy_admin.config')
            ->arg('$visibility', $config['visibility'])
            ->arg('$acceptedFiles', $config['upload']['accepted_files'])
            ->arg('$maxFiles', $config['upload']['max_files'])
            ->arg('$maxFileSize', $config['upload']['max_file_size'])
        ;
    }

    public function prependExtension(ContainerConfigurator $containerConfigurator, ContainerBuilder $containerBuilder): void
    {
        $joliMediaConfig = $containerBuilder->getExtensionConfig('joli_media');

        $containerBuilder->prependExtensionConfig('twig', [
            'form_themes' => [
                '@JoliMediaEasyAdmin/form/form_theme.html.twig',
            ],
        ]);

        if (isset($joliMediaConfig[0]['default_library'])) {
            $joliMediaDefaultLibrary = $joliMediaConfig[0]['default_library'];
        } elseif (isset($joliMediaConfig[0]['libraries']) && \count($joliMediaConfig[0]['libraries']) > 0) {
            $joliMediaDefaultLibrary = array_key_first($joliMediaConfig[0]['libraries']);
        } else {
            throw new \RuntimeException('It is required to define a library in the JoliMediaBundle configuration before using the JoliMediaEasyAdminBundle.');
        }

        $containerBuilder->prependExtensionConfig('joli_media', [
            'libraries' => [
                $joliMediaDefaultLibrary => [
                    'variations' => [
                        'joli_media_easy_admin' => [
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
                        'joli_media_easy_admin_large' => [
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
                        'joli_media_easy_admin_small' => [
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
                    ],
                ],
            ],
        ]);
    }
}
