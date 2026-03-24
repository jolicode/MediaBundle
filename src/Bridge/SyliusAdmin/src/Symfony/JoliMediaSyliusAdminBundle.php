<?php

/*
 * This file is part of the Sylius package.
 *
 * (c) Sylius Sp. z o.o.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony;

use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

final class JoliMediaSyliusAdminBundle extends AbstractBundle
{
    public function getPath(): string
    {
        if (!isset($this->path)) {
            $reflected = new \ReflectionObject($this);
            $this->path = \dirname($reflected->getFileName(), 3);
        }

        return $this->path;
    }

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
                    ->end()
                ->end()
            ->end()
        ;
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $bundles = $builder->getParameter('kernel.bundles');

        if (!isset($bundles['SyliusBootstrapAdminUiBundle'])) {
            return;
        }

        $container->import('../../config/services.php');

        $container->services()
            ->get('joli_media_sylius_admin.config')
            ->arg('$visibility', $config['visibility'])
            ->arg('$acceptedFiles', $config['upload']['accepted_files'])
            ->arg('$maxFiles', $config['upload']['max_files'])
            ->arg('$maxFileSize', $config['upload']['max_file_size'])
        ;

        $builder->prependExtensionConfig('framework', [
            'assets' => [
                'packages' => [
                    'joli_media_sylius_admin' => [
                        'base_path' => '/bundles/jolimediasyliusadmin',
                    ],
                ],
            ],
        ]);
    }

    public function prependExtension(ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $joliMediaConfig = $builder->getExtensionConfig('joli_media');

        if (isset($joliMediaConfig[0]['default_library'])) {
            $joliMediaDefaultLibrary = $joliMediaConfig[0]['default_library'];
        } elseif (isset($joliMediaConfig[0]['libraries']) && \count($joliMediaConfig[0]['libraries']) > 0) {
            $joliMediaDefaultLibrary = array_key_first($joliMediaConfig[0]['libraries']);
        } else {
            throw new \RuntimeException('It is required to define a library in the JoliMediaBundle configuration before using the JoliMediaSyliusAdminBundle.');
        }

        $builder->prependExtensionConfig('twig', [
            'form_themes' => [
                '@JoliMediaSyliusAdmin/form/form_theme.html.twig',
            ],
        ]);

        $builder->prependExtensionConfig('joli_media', [
            'libraries' => [
                $joliMediaDefaultLibrary => [
                    'variations' => [
                        'joli_media_sylius_admin' => [
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
                    ],
                ],
            ],
        ]);

        $builder->prependExtensionConfig('sylius_twig_hooks', [
            'enable_autoprefixing' => true,
            'hook_name_section_separator' => '#',
        ]);
    }
}
