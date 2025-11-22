<?php

namespace JoliCode\MediaBundle;

use Imagine\Image\ImagineInterface;
use Imagine\Image\Metadata\ExifMetadataReader;
use Imagine\Gd\Imagine as GdImagine;
use Imagine\Gmagick\Imagine as GmagickImagine;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\DependencyInjection\Compiler\CollectorPass;
use JoliCode\MediaBundle\DependencyInjection\Compiler\DoctrinePass;
use JoliCode\MediaBundle\Doctrine\Type\MediaLongType;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PreProcessor\HeifPreProcessor;
use JoliCode\MediaBundle\Processor\Imagine;
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
        if (!class_exists(\Doctrine\DBAL\Types\StringType::class)) {
            return;
        }

        // doctrine media type
        $resolverInitializer = fn (): ?object => $this->container->get('joli_media.resolver');
        MediaType::$resolverInitializer = $resolverInitializer;
        MediaLongType::$resolverInitializer = $resolverInitializer;
    }

    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $container->addCompilerPass(new CollectorPass());
        $container->addCompilerPass(new DoctrinePass());
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
        $builder->setParameter('env(JOLI_MEDIA_EXIFTOOL_BINARY)', '/usr/local/bin/exiftool');
        $builder->setParameter('env(JOLI_MEDIA_GIF2WEBP_BINARY)', '/usr/local/bin/gif2webp');
        $builder->setParameter('env(JOLI_MEDIA_GIFSICLE_BINARY)', '/usr/local/bin/gifsicle');
        $builder->setParameter('env(JOLI_MEDIA_IDENTIFY_BINARY)', '/usr/local/bin/identify');
        $builder->setParameter('env(JOLI_MEDIA_JPEGOPTIM_BINARY)', '/usr/local/bin/jpegoptim');
        $builder->setParameter('env(JOLI_MEDIA_MOZJPEG_BINARY)', '/usr/local/bin/mozjpeg');
        $builder->setParameter('env(JOLI_MEDIA_OXIPNG_BINARY)', '/usr/local/bin/oxipng');
        $builder->setParameter('env(JOLI_MEDIA_PNGQUANT_BINARY)', '/usr/local/bin/pngquant');

        $builder->setParameter('joli_media.binary.cwebp', '%env(JOLI_MEDIA_CWEBP_BINARY)%');
        $builder->setParameter('joli_media.binary.exiftool', '%env(JOLI_MEDIA_EXIFTOOL_BINARY)%');
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
                        Types::MEDIA_LONG => MediaLongType::class,
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
                    ->append($this->addPixelRatiosNode())
                    ->append($this->addVariationsNode())
                    ->append($this->addPostProcessorOptionsNode())
                    ->append($this->addProcessorOptionsNode())
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
            ->useAttributeAsKey('name')
            ->arrayPrototype()
                ->children()
                    ->scalarNode('format')->end()
                    ->booleanNode('enable_auto_webp')
                        ->info('If true and the format config attribute is not set or different from "webp", enables an additionnal webp version of the variation.')
                    ->end()
                    ->append($this->addPixelRatiosNode())
                    ->arrayNode('transformers')
                        ->arrayPrototype()
                            ->children()
                                ->scalarNode('type')
                                    ->defaultNull()
                                    ->validate()
                                        ->ifNotInArray(['crop', 'expand', 'heighten', 'resize', 'thumbnail', 'widen'])
                                        ->thenInvalid('Invalid transformer type "%s". Valid types are "crop", "expand", "heighten", "resize", "thumbnail", "widen".')
                                    ->end()
                                ->end()
                                ->booleanNode('allow_downscale')
                                    ->defaultTrue()
                                ->end()
                                ->booleanNode('allow_upscale')
                                    ->defaultTrue()
                                ->end()
                                ->scalarNode('background_color')->end()
                                ->scalarNode('crop_position')
                                    ->defaultNull()
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && in_array(preg_match('/^\d+%$/', $value), [0, false], true) && !in_array($value, ['start', 'center', 'end']))
                                        ->thenInvalid('Invalid crop_position value "%s". Valid positions are "start", "center", "end" or a percentage (e.g. "50%%").')
                                    ->end()
                                ->end()
                                ->scalarNode('height')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value > 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true))
                                        ->thenInvalid('Invalid height value "%s".')
                                    ->end()
                                ->end()
                                ->scalarNode('width')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value > 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true))
                                        ->thenInvalid('Invalid width value "%s".')
                                    ->end()
                                ->end()
                                ->scalarNode('mode')->end()
                                ->scalarNode('position_x')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value >= 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true) && !in_array($value, ['start', 'center', 'end']))
                                        ->thenInvalid('Invalid position_x value "%s". It must be a number, a percentage (e.g. "50%%") or one of "start", "center", "end".')
                                    ->end()
                                ->end()
                                ->scalarNode('position_y')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value >= 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true) && !in_array($value, ['start', 'center', 'end']))
                                        ->thenInvalid('Invalid position_y value "%s". It must be a number, a percentage (e.g. "50%%") or one of "start", "center", "end".')
                                    ->end()
                                ->end()
                                ->scalarNode('start_x')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value >= 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true))
                                        ->thenInvalid('Invalid start_x value "%s". It must be a number or a percentage (e.g. "50%%").')
                                    ->end()
                                ->end()
                                ->scalarNode('start_y')
                                    ->validate()
                                        ->ifTrue(fn ($value): bool => null !== $value && !(is_numeric($value) && $value >= 0) && in_array(preg_match('/^\d+%$/', (string) $value), [0, false], true))
                                        ->thenInvalid('Invalid start_y value "%s". It must be a number or a percentage (e.g. "50%%").')
                                    ->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                    ->append($this->addPostProcessorOptionsNode())
                    ->append($this->addPreProcessorsNode())
                    ->append($this->addProcessorOptionsNode())
                    ->append($this->addVotersNode())
                ->end()
            ->end()
        ;
    }

    private function addPixelRatiosNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('pixel_ratios');

        return $treeBuilder->getRootNode()
            ->floatPrototype()->end()
            ->defaultValue([])
            ->info('List of pixel ratios to generate variations for. The value 1 must be included in the list.')
            ->validate()
                ->ifTrue(fn ($v): bool => !in_array(1, $v, true))
                ->thenInvalid('The pixel_ratios array must contain the value 1.')
            ->end()
            ->validate()
                ->ifTrue(fn ($v): bool => count($v) !== count(array_unique($v)))
                ->thenInvalid('The pixel_ratios array cannot contain duplicate values.')
            ->end()
        ;
    }

    private function addPostProcessorsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('post_processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->addDefaultsIfNotSet()
            ->children()
                ->append($this->addGifsiclePostProcessorNode())
                ->append($this->addJpegoptimPostProcessorNode())
                ->append($this->addMozjpegPostProcessorNode())
                ->append($this->addOxipngPostProcessorNode())
                ->append($this->addPngquantPostProcessorNode())
            ->end()
        ;
    }

    private function addPostProcessorOptionsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('post_processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->children()
                ->append($this->addGifsiclePostProcessorOptionsNode('gifsicle'))
                ->append($this->addJpegoptimPostProcessorOptionsNode('jpegoptim'))
                ->append($this->addMozjpegPostProcessorOptionsNode('mozjpeg'))
                ->append($this->addOxipngPostProcessorOptionsNode('oxipng'))
                ->append($this->addPngquantPostProcessorOptionsNode('pngquant'))
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
            ->addDefaultsIfNotSet()
            ->children()
                ->append($this->addCwebpProcessorNode())
                ->append($this->addGif2webpProcessorNode())
                ->append($this->addGifsicleProcessorNode())
                ->append($this->addImagineProcessorNode())
                ->arrayNode('imagick')
                    ->setDeprecated('jolicode/media-bundle', '0.0.1', 'The "%node%" processor is deprecated, use the "imagine" processor with the "imagick" driver instead.')
                    ->children()
                        ->append($this->addImagineProcessorOptionsNode('options'))
                    ->end()
                ->end()
            ->end()
        ;
    }

    private function addProcessorOptionsNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('processors');
        $node = $treeBuilder->getRootNode();

        return $node
            ->children()
                ->append($this->addCwebpProcessorOptionsNode('cwebp'))
                ->append($this->addGif2webpProcessorOptionsNode('gif2webp'))
                ->append($this->addGifsicleProcessorOptionsNode('gifsicle'))
                ->append($this->addImagineProcessorOptionsNode('imagine'))
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
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.cwebp%')
                ->end()
                ->scalarNode('identify_binary')
                    ->defaultValue('%joli_media.binary.identify%')
                ->end()
                ->append($this->addCwebpProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addCwebpProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the cwebp post-processor')
                ->end()
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
        ;
    }

    private function addGif2webpProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('gif2webp');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.gif2webp%')
                ->end()
                ->append($this->addGif2webpProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addGif2webpProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the gif2webp post-processor')
                ->end()
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
        ;
    }

    private function addGifsicleProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('gifsicle');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.gifsicle%')
                ->end()
                ->append($this->addGifsicleProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addGifsicleProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the gifsicle post-processor')
                ->end()
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
        ;
    }

    private function addImagineProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('imagine');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->enumNode('driver')
                    ->values(['gd', 'gmagick', 'imagick'])
                    ->defaultValue('imagick')
                    ->info('The Imagine driver to use for image processing. Available options: "gd", "gmagick", "imagick".')
                ->end()
                ->append($this->addImagineProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addImagineProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the imagine post-processor')
                ->end()
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
        ;
    }

    private function addGifsiclePostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('gifsicle');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.gifsicle%')
                ->end()
                ->append($this->addGifsiclePostProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addGifsiclePostProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the gifsicle post-processor')
                ->end()
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
        ;
    }

    private function addJpegoptimPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('jpegoptim');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.jpegoptim%')
                ->end()
                ->append($this->addJpegoptimPostProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addJpegoptimPostProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the jpegoptim post-processor')
                ->end()
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
        ;
    }

    private function addMozjpegPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('mozjpeg');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.mozjpeg%')
                ->end()
                ->append($this->addMozjpegPostProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addMozjpegPostProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the mozjpeg post-processor')
                ->end()
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
        ;
    }

    private function addOxipngPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('oxipng');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.oxipng%')
                ->end()
                ->append($this->addOxipngPostProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addOxipngPostProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the oxipng post-processor')
                ->end()
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
        ;
    }

    private function addPngquantPostProcessorNode(): NodeDefinition
    {
        $treeBuilder = new TreeBuilder('pngquant');

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('binary')
                    ->defaultValue('%joli_media.binary.pngquant%')
                ->end()
                ->append($this->addPngquantPostProcessorOptionsNode('options'))
            ->end()
        ;
    }

    private function addPngquantPostProcessorOptionsNode(string $name): NodeDefinition
    {
        $treeBuilder = new TreeBuilder($name);

        return $treeBuilder->getRootNode()
            ->addDefaultsIfNotSet()
            ->treatFalseLike(['enabled' => false])
            ->children()
                ->booleanNode('enabled')
                    ->defaultTrue()
                    ->info('Enable the pngquant post-processor')
                ->end()
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
                ->get(HeifPreProcessor::class)
                ->arg('$imagine', service('.joli_media.imagine.imagine'))
            ;
        }

        foreach ($preProcessorsConfig as $preProcessorClass) {
            $container->services()
                ->get($preProcessorClass)
                ->tag('joli_media.pre_processor', ['name' => $preProcessorClass])
            ;
        }
    }

    private function createProcessorServices(ContainerConfigurator $container, array $processorsConfig): void
    {
        $processorContainerService = $container->services()->get('joli_media.processor_container');

        if (isset($processorsConfig['cwebp']) && $processorsConfig['cwebp']['options']['enabled']) {
            $container->services()
                ->get('.joli_media.processor.cwebp')
                ->arg('$cwebpBinary', $processorsConfig['cwebp']['binary'])
                ->arg('$options', $processorsConfig['cwebp']['options'])
                ->arg('$identifyBinary', $processorsConfig['cwebp']['identify_binary'])
            ;

            $processorContainerService->call('add', ['cwebp', service('.joli_media.processor.cwebp')]);
        }

        if (isset($processorsConfig['gif2webp']) && $processorsConfig['gif2webp']['options']['enabled']) {
            $container->services()
                ->get('.joli_media.processor.gif2webp')
                ->arg('$gif2webpBinary', $processorsConfig['gif2webp']['binary'])
                ->arg('$options', $processorsConfig['gif2webp']['options'])
            ;

            $processorContainerService->call('add', ['gif2webp', service('.joli_media.processor.gif2webp')]);
        }

        if (isset($processorsConfig['gifsicle']) && $processorsConfig['gifsicle']['options']['enabled']) {
            $container->services()
                ->get('.joli_media.processor.gifsicle')
                ->arg('$binary', $processorsConfig['gifsicle']['binary'])
                ->arg('$options', $processorsConfig['gifsicle']['options'])
            ;

            $processorContainerService->call('add', ['gifsicle', service('.joli_media.processor.gifsicle')]);
        }

        if (isset($processorsConfig['imagine']) && $processorsConfig['imagine']['options']['enabled'] && interface_exists(ImagineInterface::class)) {
            $container->services()
                ->set('.joli_media.imagine.metadata_reader', ExifMetadataReader::class)
            ;

            $imagineDriverClass = match ($processorsConfig['imagine']['driver']) {
                'gd' => GdImagine::class,
                'gmagick' => GmagickImagine::class,
                default => ImagickImagine::class,
            };

            $container->services()
                ->set('.joli_media.imagine.imagine', $imagineDriverClass)
                ->call('setMetadataReader', [service('.joli_media.imagine.metadata_reader')])
            ;

            $container->services()
                ->set('.joli_media.processor.imagine', Imagine::class)
                ->args([
                    '$imagine' => service('.joli_media.imagine.imagine'),
                    '$options' => $processorsConfig['imagine']['options'],
                    '$logger' => service('logger')->ignoreOnInvalid(),
                ])
            ;
            $processorContainerService->call('add', ['imagine', service('.joli_media.processor.imagine')]);
        }
    }

    private function createLibraryService(ContainerConfigurator $container, ContainerBuilder $builder, string $libraryName, array $libraryConfig): void
    {
        $libraryServiceId = '.joli_media.library.'.$libraryName;
        $originalStorageServiceId = $libraryServiceId.'.storage.original';
        $cacheStorageServiceId = $libraryServiceId.'.storage.cache';
        $mediaPropertyAccessorServiceId = $libraryServiceId.'.media_property_accessor';
        $mediaVariationPropertyAccessorServiceId = $libraryServiceId.'.media_variation_property_accessor';
        $container->services()
            ->set($mediaPropertyAccessorServiceId)
            ->parent('.joli_media.media_property_accessor.abstract')
            ->arg('$libraryName', $libraryName)
            ->arg('$filesystem', service($libraryConfig['original']['flysystem']))
        ;
        $container->services()
            ->set($mediaVariationPropertyAccessorServiceId)
            ->parent('.joli_media.media_variation_property_accessor.abstract')
            ->arg('$libraryName', $libraryName)
            ->arg('$filesystem', service($libraryConfig['cache']['flysystem']))
            ->arg('$strategy', service(sprintf('.joli_media.storage.strategy.%s', $libraryConfig['cache']['url_generator']['strategy'])))
        ;

        $container->services()
            ->set($originalStorageServiceId)
            ->parent('.joli_media.storage.original.abstract')
            ->arg('$filesystem', service($libraryConfig['original']['flysystem']))
            ->arg('$strategy', service(sprintf('.joli_media.storage.strategy.%s', $libraryConfig['original']['url_generator']['strategy'])))
            ->arg('$urlPath', $libraryConfig['original']['url_generator']['path'])
            ->arg('$enableServeUsingPhp', $libraryConfig['original']['enable_serve_using_php'])
            ->arg('$trashPath', $libraryConfig['original']['trash_path'])
            ->arg('$mediaPropertyAccessor', service($mediaPropertyAccessorServiceId))
        ;
        $container->services()
            ->set($cacheStorageServiceId)
            ->parent('.joli_media.storage.cache.abstract')
            ->arg('$filesystem', service($libraryConfig['cache']['flysystem']))
            ->arg('$strategy', service(sprintf('.joli_media.storage.strategy.%s', $libraryConfig['cache']['url_generator']['strategy'])))
            ->arg('$urlPath', $libraryConfig['cache']['url_generator']['path'])
            ->arg('$mustStoreWhenGeneratingUrl', $libraryConfig['cache']['must_store_when_generating_url'])
            ->arg('$mediaVariationPropertyAccessor', service($mediaVariationPropertyAccessorServiceId))
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
            $addWebpVariation = (
                !isset($variationConfig['format'])
                || 'webp' !== $variationConfig['format']
            ) && (
                isset($variationConfig['enable_auto_webp']) && $variationConfig['enable_auto_webp']
                || !isset($variationConfig['enable_auto_webp']) && $libraryConfig['enable_auto_webp']
            );
            $pixelRatios = count($variationConfig['pixel_ratios']) > 0 ? $variationConfig['pixel_ratios'] : (count($libraryConfig['pixel_ratios']) > 0 ? $libraryConfig['pixel_ratios'] : [1]);

            foreach ($pixelRatios as $pixelRatio) {
                $ratioVariationName = $variationName;
                $ratioVariationConfig = $variationConfig;

                if (1.0 !== (float) $pixelRatio) {
                    $ratioVariationName .= '@'.$pixelRatio.'x';
                }

                $ratioVariationConfig['pixel_ratio'] = $pixelRatio;
                $variationServiceId = $this->createVariationService($container, $builder, $libraryName, $libraryConfig, $ratioVariationName, $ratioVariationConfig);

                if ($addWebpVariation) {
                    $ratioVariationConfig['format'] = 'webp';
                    $webpVariationServiceId = $this->createVariationService($container, $builder, $libraryName, $libraryConfig, $ratioVariationName.'.webp', $ratioVariationConfig);
                    $container->services()
                        ->get($variationServiceId)
                        ->call('setWebpAlternativeVariation', [service($webpVariationServiceId)])
                    ;
                }
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
        $transformerType = $transformerConfig['type'] ?? $transformerName;
        $transformerServiceId = sprintf(
            '.joli_media.variation.%s.%s.transformer.%s',
            $libraryName,
            $variationName,
            $transformerName
        );

        if ('crop' === $transformerType) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.crop.abstract')
                ->private()
                ->args([
                    '$startX' => $transformerConfig['start_x'] ?? null,
                    '$startY' => $transformerConfig['start_y'] ?? null,
                    '$height' => $transformerConfig['height'],
                    '$width' => $transformerConfig['width'],
                ]);
        } elseif ('expand' === $transformerType) {
            if (!interface_exists(ImagineInterface::class)) {
                throw new \LogicException('The "Expand" transformer requires the Imagine library to be installed. Please install the "imagine/imagine" package.');
            }

            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.expand.abstract')
                ->private()
                ->args([
                    '$imagineProcessor' => service('.joli_media.processor.imagine'),
                    '$width' => $transformerConfig['width'],
                    '$height' => $transformerConfig['height'],
                    '$positionX' => $transformerConfig['position_x'] ?? null,
                    '$positionY' => $transformerConfig['position_y'] ?? null,
                    '$backgroundColor' => $transformerConfig['background_color'] ?? null,
                    '$logger' => service('logger')->ignoreOnInvalid(),
                ]);
        } elseif ('heighten' === $transformerType) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.heighten.abstract')
                ->private()
                ->args([
                    '$height' => $transformerConfig['height'],
                    '$allowDownscale' => $transformerConfig['allow_downscale']
                ]);
        } elseif ('resize' === $transformerType) {
            $mode = $transformerConfig['mode'] ?? Mode::exact->value;

            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.resize.abstract')
                ->private()
                ->args([
                    '$width' => $transformerConfig['width'],
                    '$height' => $transformerConfig['height'],
                    '$mode' => Mode::from($mode),
                    '$allowUpscale' => $transformerConfig['allow_upscale'],
                    '$allowDownscale' => $transformerConfig['allow_downscale'],
                ]);
        } elseif ('thumbnail' === $transformerType) {
            $container->services()
                ->set($transformerServiceId)
                ->parent('.joli_media.transformer.thumbnail.abstract')
                ->private()
                ->args([
                    '$width' => $transformerConfig['width'],
                    '$height' => $transformerConfig['height'],
                    '$allowUpscale' => $transformerConfig['allow_upscale'],
                    '$cropPosition' => $transformerConfig['crop_position'] ?? null,
                ]);
        } elseif ('widen' === $transformerType) {
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
                $transformerType,
                $variationName,
                $libraryName,
            ));
        }

        return $transformerServiceId;
    }

    private function createVariationService(ContainerConfigurator $container, ContainerBuilder $builder, string $libraryName, array $libraryConfig, string $variationName, array $variationConfig): string
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
            ->arg('$transformers', array_map(service(...), $transformerIds))
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
                '$processorsConfiguration' => array_replace_recursive($libraryConfig['processors'] ?? [], $variationConfig['processors'] ?? []),
                '$postProcessorsConfiguration' => array_replace_recursive($libraryConfig['post_processors'] ?? [], $variationConfig['post_processors'] ?? []),
                '$voters' => array_map(service(...), $voterServiceIds),
                '$multiplier' => $variationConfig['pixel_ratio'],
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
                    '$voters' => array_map(service(...), $subVoterServiceIds),
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
                    '$voters' => array_map(service(...), $subVoterServiceIds),
                ])
            ;
        } else {
            throw new \InvalidArgumentException(sprintf('The voter type "%s" is not supported.', $voterConfig['type']));
        }
    }
}
