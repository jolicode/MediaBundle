<?php

namespace JoliCode\MediaBundle;

use Symfony\Component\DependencyInjection\Loader\Configurator\ReferenceConfigurator;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Metadata\ExifMetadataReader;
use Imagine\Imagick\Imagine;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PreProcessor\HeifPreProcessor;
use JoliCode\MediaBundle\Processor\Imagick;
use JoliCode\MediaBundle\Transformer\Resize\Mode;
use Symfony\Component\Config\Definition\Builder\NodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\Argument\ServiceLocatorArgument;
use Symfony\Component\DependencyInjection\Argument\TaggedIteratorArgument;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;
use Symfony\Component\String\Slugger\AsciiSlugger;

use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

class JoliMediaBundle extends AbstractBundle
{
    public function boot(): void
    {
        // doctrine media type
        $resolverInitializer = fn (): ?object => $this->container->get('joli_media.resolver');
        MediaType::$resolverInitializer = $resolverInitializer;
    }

    public function configure(DefinitionConfigurator $definition): void
    {
        $definition->rootNode()
            ->children()
                ->scalarNode('default_library')
                    ->defaultValue(null)
                ->end()
                ->append($this->addLibrariesNode())
                ->append($this->addPreProcessorsNode())
                ->append($this->addProcessorsNode())
                ->append($this->addPostProcessorsNode())
            ->end()
        ;
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $container->import('../config/services.php');

        $builder->setParameter('env(JOLI_MEDIA_CWEBP_BINARY)', '/usr/local/bin/cwebp');
        $builder->setParameter('env(JOLI_MEDIA_GIF2WEBP_BINARY)', '/usr/local/bin/gif2webp');
        $builder->setParameter('env(JOLI_MEDIA_GIFSICLE_BINARY)', '/usr/local/bin/gifsicle');
        $builder->setParameter('env(JOLI_MEDIA_IDENTIFY_BINARY)', '/usr/local/bin/identify');
        $builder->setParameter('env(JOLI_MEDIA_JPEGOPTIM_BINARY)', '/usr/local/bin/jpegoptim');
        $builder->setParameter('env(JOLI_MEDIA_MOZJPEG_BINARY)', '/usr/local/bin/mozjpeg');
        $builder->setParameter('env(JOLI_MEDIA_OXIPNG_BINARY)', '/usr/local/bin/oxipng');
        $builder->setParameter('env(JOLI_MEDIA_PNGQUANT_BINARY)', '/usr/local/bin/pngquant');

        $builder->setParameter('joli_media.binary.cwebp', '%env(JOLI_MEDIA_CWEBP_BINARY)%');
        $builder->setParameter('joli_media.binary.gif2webp', '%env(JOLI_MEDIA_GIF2WEBP_BINARY)%');
        $builder->setParameter('joli_media.binary.gifsicle', '%env(JOLI_MEDIA_GIFSICLE_BINARY)%');
        $builder->setParameter('joli_media.binary.identify', '%env(JOLI_MEDIA_IDENTIFY_BINARY)%');
        $builder->setParameter('joli_media.binary.jpegoptim', '%env(JOLI_MEDIA_JPEGOPTIM_BINARY)%');
        $builder->setParameter('joli_media.binary.mozjpeg', '%env(JOLI_MEDIA_MOZJPEG_BINARY)%');
        $builder->setParameter('joli_media.binary.oxipng', '%env(JOLI_MEDIA_OXIPNG_BINARY)%');
        $builder->setParameter('joli_media.binary.pngquant', '%env(JOLI_MEDIA_PNGQUANT_BINARY)%');

        // libraries
        foreach ($config['libraries'] as $libraryName => $libraryConfig) {
            $this->createLibraryService($container, $builder, $libraryName, $libraryConfig);
        }

        // define the default library name
        $builder->getDefinition('joli_media.library_container')
            ->setArgument('$defaultLibraryName', $config['default_library'] ?? array_key_first($config['libraries']))
        ;

        // pre-processors
        if (!in_array(HeifPreProcessor::class, $config['pre_processors'])) {
            // Automatically add the Heif pre-processor if not manually configured
            array_unshift($config['pre_processors'], HeifPreProcessor::class);
        }

        $this->createPreProcessorServices($container, $config['pre_processors']);

        // processors
        $this->createProcessorServices($container, $config['processors']);

        // post-processors
        $this->createPostProcessorServices($container, $config['post_processors']);
    }

    public function prependExtension(ContainerConfigurator $containerConfigurator, ContainerBuilder $containerBuilder): void
    {
        if ($containerBuilder->hasExtension('twig_component')) {
            // twig components
            $containerBuilder->prependExtensionConfig('twig_component', [
                'defaults' => [
                    'JoliCode\\MediaBundle\\Twig\\Components\\' => [
                        'template_directory' => '@JoliMedia/components/',
                        'name_prefix' => 'joli',
                    ],
                ],
            ]);
        }

        if ($containerBuilder->hasExtension('doctrine')) {
            // doctrine types
            $containerBuilder->prependExtensionConfig('doctrine', [
                'dbal' => [
                    'types' => [
                        Types::MEDIA => MediaType::class,
                    ],
                ],
            ]);
        }
    }

    private function addLibrariesNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('libraries');

        return $treeBuilder->getRootNode()
            ->useAttributeAsKey('name')
            ->arrayPrototype()
                ->children()
                    ->append($this->addOriginalStorageNode('original'))
                    ->append($this->addCacheStorageNode('cache'))
                    ->booleanNode('enable_auto_webp')
                        ->defaultFalse()
                        ->info('If true, enables automatic generation of WebP variations for the media: the configured variations will all be duplicated in WebP format, in addition to the original format.')
                    ->end()
                    ->append($this->addVariationsNode())
                ->end()
            ->end()
        ;
    }

    private function addOriginalStorageNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('original');
        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('flysystem')
                    ->isRequired()
                    ->cannotBeEmpty()
                    ->info('The Flysystem service id for the original storage.')
                ->end()
                ->booleanNode('enable_serve_using_php')
                    ->defaultFalse()
                    ->info('If true, the original files may be served using PHP if the web server cannot serve it. This might be useful for private files.')
                ->end()
                ->scalarNode('trash_path')
                    ->defaultValue('.trash')
                    ->info('Path to the trash directory where deleted files are moved. This path is relative to the original storage root and is hidden when listing files using the bridges.')
                ->end()
                ->arrayNode('url_generator')
                    ->children()
                        ->scalarNode('path')
                            ->defaultValue('/media/' . $name)
                        ->end()
                        ->scalarNode('strategy')
                            ->defaultValue('folder')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addCacheStorageNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('cache');
        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('flysystem')
                    ->isRequired()
                    ->cannotBeEmpty()
                    ->info('The Flysystem service id for the cache storage.')
                ->end()
                ->booleanNode('must_store_when_generating_url')
                    ->defaultFalse()
                    ->info('If true, variation files will be generated, if missing, when their URL is generated.')
                ->end()
                ->arrayNode('url_generator')
                    ->children()
                        ->scalarNode('path')
                            ->defaultValue('/media/' . $name)
                        ->end()
                        ->scalarNode('strategy')
                            ->defaultValue('folder')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addVariationsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('variations');
        return $treeBuilder->getRootNode()
            ->arrayPrototype()
                ->children()
                    ->scalarNode('format')->end()
                    ->arrayNode('transformers')
                        ->useAttributeAsKey('name')
                        ->arrayPrototype()
                            ->children()
                                ->scalarNode('width')->end()
                                ->scalarNode('height')->end()
                                ->scalarNode('mode')->defaultValue(Mode::exact->value)->end()
                                ->booleanNode('allow_downscale')
                                    ->defaultTrue()
                                ->end()
                                ->booleanNode('allow_upscale')
                                    ->defaultTrue()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                    ->append($this->addPostProcessorsNode())
                    ->append($this->addPreProcessorsNode())
                    ->append($this->addProcessorsNode())
                    ->append($this->addVotersNode())
                ->end()
            ->end()
        ;
    }

    private function addPostProcessorsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('post_processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->children()
                ->append($this->addGifsiclePostProcessorNode())
                ->append($this->addJpegoptimPostProcessorNode())
                ->append($this->addMozjpegPostProcessorNode())
                ->append($this->addOxipngPostProcessorNode())
                ->append($this->addPngquantPostProcessorNode())
            ->end()
        ;
    }

    private function addPreProcessorsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('pre_processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->scalarPrototype()
        ->end();
    }

    private function addProcessorsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->children()
                ->append($this->addCwebpProcessorNode())
                ->append($this->addGif2webpProcessorNode())
                ->append($this->addGifsicleProcessorNode())
                ->append($this->addImagickProcessorNode())
            ->end()
        ;
    }

    private function addVotersNode(int $level = 0): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('voters');
        $node = $treeBuilder->getRootNode();
        $maxDepth = 3;

        if ($level >= $maxDepth) {
            // allow up to 3 levels of nested voters
            return $node
                ->validate()
                    ->always(fn () => throw new \LogicException(sprintf('The voters cannot be nested more than %d level.', $maxDepth)))
                ->end()
            ;
        }

        return $node
            ->arrayPrototype()
                ->children()
                    ->scalarNode('type')
                        ->isRequired()
                        ->validate()
                            ->ifNotInArray(['allOf', 'filesize', 'folder', 'format', 'mimeType', 'oneOf'])
                            ->thenInvalid('Invalid voter type %s')
                        ->end()
                    ->end()
                    ->scalarNode('format')->end()
                    ->scalarNode('path')->end()
                    ->scalarNode('mime_type')->end()
                    ->scalarNode('max')->end()
                    ->scalarNode('min')->end()
                    ->append($this->addVotersNode(++$level))
                ->end()
            ->end()
        ;
    }

    private function addCwebpProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('cwebp');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.cwebp%')
                ->end()
                ->scalarNode('identify_binary')
                    ->defaultValue('%joli_media.binary.identify%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->arrayNode('near_lossless')
                            ->children()
                                ->integerNode('quality')
                                    ->defaultValue(40)
                                    ->min(0)
                                    ->max(100)
                                    ->info('Specify the compression factor for RGB channels between 0 and 100')
                                ->end()
                                ->integerNode('method')
                                    ->defaultValue(6)
                                    ->min(1)
                                    ->max(6)
                                    ->info('Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality')
                                ->end()
                                ->arrayNode('metadata')
                                    ->requiresAtLeastOneElement()
                                    ->defaultValue(['none'])
                                    ->enumPrototype()
                                        ->values(['none', 'all', 'icc', 'exif', 'xmp'])
                                    ->end()
                                    ->info('A list of metadata to copy from the input to the output if present')
                                ->end()
                                ->integerNode('near_lossless')
                                    ->defaultValue(0)
                                    ->min(0)
                                    ->max(100)
                                    ->info('Specify the level of near-lossless image preprocessing')
                                ->end()
                            ->end()
                        ->end()
                        ->arrayNode('lossy')
                            ->children()
                                ->integerNode('quality')
                                    ->defaultValue(75)
                                    ->min(0)
                                    ->max(100)
                                    ->info('Specify the compression factor for RGB channels between 0 and 100')
                                ->end()
                                ->integerNode('method')
                                    ->defaultValue(6)
                                    ->min(1)
                                    ->max(6)
                                    ->info('Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality')
                                ->end()
                                ->booleanNode('af')
                                    ->defaultValue(true)
                                    ->info('Turns auto-filter on. This algorithm will spend additional time optimizing the filtering strength to reach a well-balanced quality')
                                ->end()
                                ->arrayNode('metadata')
                                    ->requiresAtLeastOneElement()
                                    ->defaultValue(['none'])
                                    ->enumPrototype()
                                        ->values(['none', 'all', 'icc', 'exif', 'xmp'])
                                    ->end()
                                    ->info('A list of metadata to copy from the input to the output if present')
                                ->end()
                                ->integerNode('pass')
                                    ->defaultValue(10)
                                    ->min(1)
                                    ->max(10)
                                    ->info('Set a maximum number of passes to use during the dichotomy used by options -size or -psnr')
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addGif2webpProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('gif2webp');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.gif2webp%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->booleanNode('lossy')
                            ->defaultValue(true)
                            ->info('Encode the image using lossy compression')
                        ->end()
                        ->booleanNode('min_size')
                            ->defaultValue(true)
                            ->info('Encode image to achieve smallest size. This disables key frame insertion and picks the dispose method resulting in the smallest output for each frame')
                        ->end()
                        ->arrayNode('metadata')
                            ->requiresAtLeastOneElement()
                            ->defaultValue(['none'])
                            ->enumPrototype()
                                ->values(['none', 'all', 'icc', 'xmp'])
                            ->end()
                            ->info('A list of metadata to copy from the input to the output if present')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addGifsicleProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('gifsicle');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.gifsicle%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->integerNode('optimize')
                            ->defaultValue(3)
                            ->min(1)
                            ->max(3)
                            ->info('Attempt to shrink the file sizes of GIF animations. Level determines how much optimization is done; higher levels take longer, but may have better results')
                        ->end()
                        ->integerNode('lossy')
                            ->defaultValue(20)
                            ->min(0)
                            ->info('Alter image colors to shrink output file size at the cost of artifacts and noise. Lossiness determines how many artifacts are allowed; higher values can result in smaller file sizes, but cause more artifacts')
                        ->end()
                        ->integerNode('colors')
                            ->defaultValue(256)
                            ->min(1)
                            ->info('Reduce the number of colors to N')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addImagickProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('imagick');

        return $treeBuilder->getRootNode()
            ->children()
                ->arrayNode('options')
                    ->children()
                        ->integerNode('quality')
                            ->defaultValue(80)
                            ->min(0)
                            ->max(100)
                            ->info('Sets the default image compression quality')
                        ->end()
                        ->integerNode('jpeg_quality')
                            ->defaultValue(80)
                            ->min(0)
                            ->max(100)
                            ->info('Sets the image compression quality for JPEG images')
                        ->end()
                        ->integerNode('png_quality')
                            ->defaultValue(80)
                            ->min(0)
                            ->max(99)
                            ->info('Sets the image compression quality for PNG images')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addGifsiclePostProcessorNode(): NodeDefinition
    {
        return $this->addGifsicleProcessorNode();
    }

    private function addJpegoptimPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('jpegoptim');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.jpegoptim%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->booleanNode('strip_all')
                            ->defaultValue(true)
                            ->info('Strip  all (Comment & Exif) markers from output file')
                        ->end()
                        ->booleanNode('progressive')
                            ->defaultValue(true)
                            ->info('Force all output files to be progressive')
                        ->end()
                        ->integerNode('max_quality')
                            ->defaultValue(80)
                            ->min(0)
                            ->max(100)
                            ->info('Sets the maximum image quality factor')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addMozjpegPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('mozjpeg');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.mozjpeg%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->booleanNode('optimize')
                            ->defaultValue(false)
                            ->info('Optimize Huffman table')
                        ->end()
                        ->booleanNode('progressive')
                            ->defaultValue(false)
                            ->info('Create progressive JPEG file')
                        ->end()
                        ->integerNode('quality')
                            ->defaultValue(80)
                            ->min(0)
                            ->max(100)
                            ->info('Compression quality')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addOxipngPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('oxipng');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.oxipng%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->integerNode('optimization')
                            ->defaultValue(4)
                            ->min(0)
                            ->max(6)
                            ->info('Optimization level. A higher level means slower, but better compression')
                        ->end()
                        ->arrayNode('strip')
                            ->requiresAtLeastOneElement()
                            ->defaultValue(['all'])
                            ->enumPrototype()
                                ->values(['safe', 'all'])
                            ->end()
                            ->info('Strip metadata objects')
                        ->end()
                        ->booleanNode('zopfli')
                            ->defaultValue(false)
                            ->info('Use the slower but better compressing Zopfli algorithm')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addPngquantPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('pngquant');

        return $treeBuilder->getRootNode()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.pngquant%')
                ->end()
                ->arrayNode('options')
                    ->children()
                        ->scalarNode('quality')
                            ->defaultValue('75-85')
                            ->info("Don't save below min, use fewer colors below max")
                        ->end()
                        ->integerNode('speed')
                            ->defaultValue(4)
                            ->min(1)
                            ->max(11)
                            ->info('Speed/quality trade-off. 1=slow, 4=default, 11=fast & rough')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function createPostProcessorServices(ContainerConfigurator $container, array $postProcessorsConfig): void
    {
        $postProcessorContainerService = $container->services()
            ->get('joli_media.post_processor_container')
        ;

        if (isset($postProcessorsConfig['gifsicle'])) {
            $container->services()
                ->get('.joli_media.post_processor.gifsicle')
                ->arg('$binary', $postProcessorsConfig['gifsicle']['binary'])
                ->arg('$options', $postProcessorsConfig['gifsicle']['options'])
            ;

            $postProcessorContainerService->call('add', ['gifsicle', service('.joli_media.post_processor.gifsicle')]);
        }

        if (isset($postProcessorsConfig['jpegoptim'])) {
            $container->services()
                ->get('.joli_media.post_processor.jpegoptim')
                ->arg('$binary', $postProcessorsConfig['jpegoptim']['binary'])
                ->arg('$options', $postProcessorsConfig['jpegoptim']['options'])
            ;

            $postProcessorContainerService->call('add', ['jpegoptim', service('.joli_media.post_processor.jpegoptim')]);
        }

        if (isset($postProcessorsConfig['mozjpeg'])) {
            $container->services()
                ->get('.joli_media.post_processor.mozjpeg')
                ->arg('$binary', $postProcessorsConfig['mozjpeg']['binary'])
                ->arg('$options', $postProcessorsConfig['mozjpeg']['options'])
            ;

            $postProcessorContainerService->call('add', ['mozjpeg', service('.joli_media.post_processor.mozjpeg')]);
        }

        if (isset($postProcessorsConfig['pngquant'])) {
            $container->services()
                ->get('.joli_media.post_processor.pngquant')
                ->arg('$binary', $postProcessorsConfig['pngquant']['binary'])
                ->arg('$options', $postProcessorsConfig['pngquant']['options'])
            ;

            $postProcessorContainerService->call('add', ['pngquant', service('.joli_media.post_processor.pngquant')]);
        }

        if (isset($postProcessorsConfig['oxipng'])) {
            $container->services()
                ->get('.joli_media.post_processor.oxipng')
                ->arg('$binary', $postProcessorsConfig['oxipng']['binary'])
                ->arg('$options', $postProcessorsConfig['oxipng']['options'])
            ;

            $postProcessorContainerService->call('add', ['oxipng', service('.joli_media.post_processor.oxipng')]);
        }

    }

    private function createPreProcessorServices(ContainerConfigurator $container, array $preProcessorsConfig): void
    {
        if (in_array(HeifPreProcessor::class, $preProcessorsConfig)) {
            if (!interface_exists(ImagineInterface::class)) {
                throw new \LogicException('The HeifPreProcessor requires the Imagine library to be installed. Please install the "imagine/imagine" package.');
            }

            $container->services()
                ->set(HeifPreProcessor::class, HeifPreProcessor::class)
                ->args([
                    '$imagine' => service('.joli_media.imagine.imagick'),
                    '$logger' => service('logger')->ignoreOnInvalid(),
                ])
            ;
        }

        foreach ($preProcessorsConfig as $preProcessorServiceId) {
            $container->services()->get($preProcessorServiceId)
                ->tag('joli_media.pre_processor', ['name' => $preProcessorServiceId])
            ;
        }
    }

    private function createProcessorServices(ContainerConfigurator $container, array $processorsConfig): void
    {
        $processorContainerService = $container->services()->get('joli_media.processor_container');

        if (isset($processorsConfig['cwebp'])) {
            $container->services()
                ->get('.joli_media.processor.cwebp')
                ->arg('$cwebpBinary', $processorsConfig['cwebp']['binary'])
                ->arg('$options', $processorsConfig['cwebp']['options'])
                ->arg('$identifyBinary', $processorsConfig['cwebp']['identify_binary'])
            ;

            $processorContainerService->call('add', ['cwebp', service('.joli_media.processor.cwebp')]);
        }

        if (isset($processorsConfig['gif2webp'])) {
            $container->services()
                ->get('.joli_media.processor.gif2webp')
                ->arg('$gif2webpBinary', $processorsConfig['gif2webp']['binary'])
                ->arg('$options', $processorsConfig['gif2webp']['options'])
            ;

            $processorContainerService->call('add', ['gif2webp', service('.joli_media.processor.gif2webp')]);
        }

        if (isset($processorsConfig['gifsicle'])) {
            $container->services()
                ->get('.joli_media.processor.gifsicle')
                ->arg('$binary', $processorsConfig['gifsicle']['binary'])
                ->arg('$options', $processorsConfig['gifsicle']['options'])
            ;

            $processorContainerService->call('add', ['gifsicle', service('.joli_media.processor.gifsicle')]);
        }

        if (isset($processorsConfig['imagick']) && interface_exists(ImagineInterface::class)) {
            $container->services()
                ->set('.joli_media.imagine.metadata_reader', ExifMetadataReader::class)

                ->set('.joli_media.imagine.imagick', Imagine::class)
                ->call('setMetadataReader', [service('.joli_media.imagine.metadata_reader')])
            ;

            $container->services()
                ->set('.joli_media.processor.imagick', Imagick::class)
                ->args([
                    '$imagine' => service('.joli_media.imagine.imagick'),
                    '$options' => $processorsConfig['imagick']['options'],
                    '$logger' => service('logger')->ignoreOnInvalid(),
                ])
            ;
            $processorContainerService->call('add', ['imagick', service('.joli_media.processor.imagick')]);
        }
    }

    private function createLibraryService(ContainerConfigurator $container, ContainerBuilder $builder, string $libraryName, array $libraryConfig): void
    {
        $libraryServiceId = '.joli_media.library.'.$libraryName;
        $originalStorageServiceId = $libraryServiceId.'.storage.original';
        $cacheStorageServiceId = $libraryServiceId.'.storage.cache';
        $container->services()
            ->set($originalStorageServiceId)
            ->parent('.joli_media.storage.original.abstract')
            ->arg('$filesystem', service($libraryConfig['original']['flysystem']))
            ->arg('$strategy', service(sprintf('.joli_media.storage.strategy.%s', $libraryConfig['original']['url_generator']['strategy'])))
            ->arg('$urlPath', $libraryConfig['original']['url_generator']['path'])
            ->arg('$enableServeUsingPhp', $libraryConfig['original']['enable_serve_using_php'])
            ->arg('$trashPath', $libraryConfig['original']['trash_path'])
        ;
        $container->services()
            ->set($cacheStorageServiceId)
            ->parent('.joli_media.storage.cache.abstract')
            ->arg('$filesystem', service($libraryConfig['cache']['flysystem']))
            ->arg('$strategy', service(sprintf('.joli_media.storage.strategy.%s', $libraryConfig['cache']['url_generator']['strategy'])))
            ->arg('$urlPath', $libraryConfig['cache']['url_generator']['path'])
            ->arg('$mustStoreWhenGeneratingUrl', $libraryConfig['cache']['must_store_when_generating_url'])
        ;

        // variations
        $variationContainerServiceId = '.joli_media.variation_container.'.$libraryName;
        $container->services()
            ->set($variationContainerServiceId)
            ->parent('.joli_media.variation_container.abstract')
            ->args([
                '$storage' => service($cacheStorageServiceId),
                '$variations' => new ServiceLocatorArgument(new TaggedIteratorArgument(sprintf('joli_media.%s.variation', $libraryName), indexAttribute: 'name', needsIndexes: true)),
            ]);

        foreach ($libraryConfig['variations'] as $variationName => $variationConfig) {
            $variationServiceId = $this->createVariationService($container, $builder, $libraryName, $variationName, $variationConfig);

            if ($libraryConfig['enable_auto_webp'] && (!isset($variationConfig['format']) || 'webp' !== $variationConfig['format'])) {
                $variationConfig['format'] = 'webp';
                $webpVariationServiceId = $this->createVariationService($container, $builder, $libraryName, $variationName.'.webp', $variationConfig);
                $container->services()
                    ->get($variationServiceId)
                    ->call('setWebpAlternativeVariation', [service($webpVariationServiceId)])
                ;
            }
        }

        $container->services()
            ->set($libraryServiceId)
            ->parent('.joli_media.library.abstract')
            ->args([
                '$name' => $libraryName,
                '$originalStorage' => service($originalStorageServiceId),
                '$cacheStorage' => service($cacheStorageServiceId),
                '$variationContainer' => service($variationContainerServiceId),
            ])
            ->tag('joli_media.library', ['name' => $libraryName])
        ;
    }

    private function createTransformerService(ContainerConfigurator $container, string $libraryName, string $variationName, string $transformerName, array $transformerConfig): string
    {
        $transformerServiceId = sprintf(
            '.joli_media.variation.%s.%s.transformer.%s',
            $libraryName,
            $variationName,
            $transformerName
        );

        if ('heighten' === $transformerName) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.heighten.abstract')
                ->private()
                ->args([
                    '$height' => $transformerConfig['height'],
                    '$allowDownscale' => $transformerConfig['allow_downscale']
                ]);
        } elseif ($transformerName === 'resize') {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.resize.abstract')
                ->private()
                ->args([
                    '$width' => $transformerConfig['width'],
                    '$height' => $transformerConfig['height'],
                    '$mode' => Mode::from($transformerConfig['mode']),
                    '$allowUpscale' => $transformerConfig['allow_upscale'],
                    '$allowDownscale' => $transformerConfig['allow_downscale'],
                ]);
        } elseif ('thumbnail' === $transformerName) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.thumbnail.abstract')
                ->private()
                ->args([
                    '$width' => $transformerConfig['width'],
                    '$height' => $transformerConfig['height'],
                    '$allowUpscale' => $transformerConfig['allow_upscale'],
                ]);
        } elseif ('widen' === $transformerName) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.widen.abstract')
                ->private()
                ->args([
                    '$width' => $transformerConfig['width'],
                    '$allowDownscale' => $transformerConfig['allow_downscale']
                ]);
        } else {
            throw new \InvalidArgumentException(sprintf(
                'The transformer "%s" does not exist (referenced in the variation "%s" of the library "%s").',
                $transformerName,
                $variationName,
                $libraryName,
            ));
        }

        return $transformerServiceId;
    }

    private function createVariationService(ContainerConfigurator $container, ContainerBuilder $builder, string $libraryName, string $variationName, array $variationConfig): string
    {
        $variationServiceId = sprintf(
            '.joli_media.variation.%s.%s',
            $libraryName,
            $variationName
        );
        $variationServiceTag = sprintf('joli_media.%s.variation', $libraryName);
        $preProcessServiceTag = sprintf(
            'joli_media.%s.%s.pre_processor',
            $libraryName,
            $variationName
        );

        $transformerIds = [];

        foreach ($variationConfig['transformers'] as $transformerName => $transformerConfig) {
            $transformerIds[] = $this->createTransformerService($container, $libraryName, $variationName, $transformerName, $transformerConfig);
        }

        $transformerChainServiceId = $variationServiceId.'.transformer_chain';
        $container->services()->set($transformerChainServiceId)
            ->parent('.joli_media.transformer.transformer_chain.abstract')
            ->private()
            ->arg('$transformers', array_map(fn($transformerId): ReferenceConfigurator => service($transformerId), $transformerIds))
        ;

        $voterServiceIds = [];

        if (isset($variationConfig['voters'])) {
            foreach ($variationConfig['voters'] as $key => $voterConfig) {
                $voterServiceId = $variationServiceId . '.voter.' . $key;
                $this->createVoterService($container, $voterServiceId, $voterConfig);
                $voterServiceIds[] = $voterServiceId;
            }
        }

        foreach ($variationConfig['pre_processors'] as $preProcessorServiceId) {
            $builder->registerForAutoconfiguration($preProcessorServiceId)
                ->addTag($preProcessServiceTag)
            ;
        }

        $slugger = new AsciiSlugger();
        $container->services()->set($variationServiceId)
            ->parent('.joli_media.variation.abstract')
            ->private()
            ->args([
                '$name' => $slugger->slug($variationName)->lower()->toString(),
                '$format' => isset($variationConfig['format']) ? Format::fromName($variationConfig['format']) : null,
                '$transformerChain' => service($transformerChainServiceId),
                '$globalPreProcessors' => new ServiceLocatorArgument(new TaggedIteratorArgument('joli_media.pre_processor', indexAttribute: 'name', needsIndexes: true)),
                '$preProcessors' => new ServiceLocatorArgument(new TaggedIteratorArgument($preProcessServiceTag, indexAttribute: 'name', needsIndexes: true)),
                '$processorsConfiguration' => array_map(fn ($options) => $options['options'] ?? [], $variationConfig['processors'] ?? []),
                '$postProcessorsConfiguration' => array_map(fn ($options) => $options['options'] ?? [], $variationConfig['post_processors'] ?? []),
                '$voters' => array_map(fn($voterServiceId): ReferenceConfigurator => service($voterServiceId), $voterServiceIds),
            ])
            ->tag($variationServiceTag, ['name' => $slugger->slug($variationName)->lower()->toString()])
        ;

        return $variationServiceId;
    }

    private function createVoterService(ContainerConfigurator $container, string $voterServiceId, array $voterConfig): void
    {
        if ('allOf' === $voterConfig['type']) {
            $subVoterServiceIds = [];
            foreach ($voterConfig['voters'] as $key => $voter) {
                $subVoterServiceId = $voterServiceId.'.voter.'.$key;
                $this->createVoterService($container, $subVoterServiceId, $voter);
                $subVoterServiceIds[] = $subVoterServiceId;
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.all_of.abstract')
                ->private()
                ->args([
                    '$voters' => array_map(fn($subVoterServiceId): ReferenceConfigurator => service($subVoterServiceId), $subVoterServiceIds),
                ])
            ;
        } elseif ('filesize' === $voterConfig['type']) {
            if (!isset($voterConfig['max']) && !isset($voterConfig['min'])) {
                throw new \InvalidArgumentException('The "max" or "min" keys is required for the "filesize" voter.');
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.filesize.abstract')
                ->private()
                ->args([
                    '$maxSize' => $voterConfig['max'],
                    '$minSize' => $voterConfig['min'],
                ])
            ;
        } elseif ('folder' === $voterConfig['type']) {
            if (!isset($voterConfig['path'])) {
                throw new \InvalidArgumentException('The "path" key is required for the "folder" voter.');
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.folder.abstract')
                ->private()
                ->args([
                    '$folder' => $voterConfig['path'],
                ])
            ;
        } elseif ('format' === $voterConfig['type']) {
            if (!isset($voterConfig['format'])) {
                throw new \InvalidArgumentException('The "format" key is required for the "format" voter.');
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.format.abstract')
                ->private()
                ->args([
                    '$format' => $voterConfig['format'],
                ])
            ;
        } elseif ('mimeType' === $voterConfig['type']) {
            if (!isset($voterConfig['mime_type'])) {
                throw new \InvalidArgumentException('The "mime_type" key is required for the "mimeType" voter.');
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.mime_type.abstract')
                ->private()
                ->args([
                    '$mimeType' => $voterConfig['mime_type'],
                ])
            ;
        } elseif ('oneOf' === $voterConfig['type']) {
            $subVoterServiceIds = [];
            foreach ($voterConfig['voters'] as $key => $voter) {
                $subVoterServiceId = $voterServiceId.'.voter.'.$key;
                $this->createVoterService($container, $subVoterServiceId, $voter);
                $subVoterServiceIds[] = $subVoterServiceId;
            }

            $container->services()->set($voterServiceId)
                ->parent('.joli_media.variation_voter.one_of.abstract')
                ->private()
                ->args([
                    '$voters' => array_map(fn($subVoterServiceId): ReferenceConfigurator => service($subVoterServiceId), $subVoterServiceIds),
                ])
            ;
        } else {
            throw new \InvalidArgumentException(sprintf('The voter type "%s" is not supported.', $voterConfig['type']));
        }
    }
}
