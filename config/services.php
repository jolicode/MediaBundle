<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use JoliCode\MediaBundle\Cache\MediaEntityMetadataWarmer;
use JoliCode\MediaBundle\Command\AuditCommand;
use JoliCode\MediaBundle\Command\BatchConvertCommand;
use JoliCode\MediaBundle\Command\Cache\PruneCommand;
use JoliCode\MediaBundle\Command\Cache\RemoveCommand;
use JoliCode\MediaBundle\Command\ConvertCommand;
use JoliCode\MediaBundle\Controller\MediaController;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Event\Listener\DeleteFolderEventListener;
use JoliCode\MediaBundle\Event\Listener\DeleteMediaEventListener;
use JoliCode\MediaBundle\Event\Listener\MoveFolderEventListener;
use JoliCode\MediaBundle\Event\Listener\MoveMediaEventListener;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Inspector\DataCollector;
use JoliCode\MediaBundle\Inspector\TransformationDataHolder;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\PostProcessor\Gifsicle as GifsiclePostProcessor;
use JoliCode\MediaBundle\PostProcessor\Jpegoptim;
use JoliCode\MediaBundle\PostProcessor\Mozjpeg;
use JoliCode\MediaBundle\PostProcessor\Oxipng;
use JoliCode\MediaBundle\PostProcessor\Pngquant;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Cwebp;
use JoliCode\MediaBundle\Processor\Gif2webp;
use JoliCode\MediaBundle\Processor\Gifsicle as GifsicleProcessor;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Routing\RouteChecker;
use JoliCode\MediaBundle\Routing\RouteLoader;
use JoliCode\MediaBundle\Storage\CacheStorage;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Storage\Strategy\FolderStorageStrategy;
use JoliCode\MediaBundle\Storage\Strategy\IdentityStorageStrategy;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Crop;
use JoliCode\MediaBundle\Transformer\Expand;
use JoliCode\MediaBundle\Transformer\Heighten;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\Thumbnail;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Transformer\Widen;
use JoliCode\MediaBundle\Twig\Components\Img;
use JoliCode\MediaBundle\Twig\Components\Picture;
use JoliCode\MediaBundle\Twig\Components\Source;
use JoliCode\MediaBundle\Twig\JoliMediaExtension;
use JoliCode\MediaBundle\Validator\MediaValidator;
use JoliCode\MediaBundle\Variation\Variation;
use JoliCode\MediaBundle\Variation\VariationContainer;
use JoliCode\MediaBundle\Variation\Voter\AllOfVoter;
use JoliCode\MediaBundle\Variation\Voter\FilesizeVoter;
use JoliCode\MediaBundle\Variation\Voter\FolderVoter;
use JoliCode\MediaBundle\Variation\Voter\FormatVoter;
use JoliCode\MediaBundle\Variation\Voter\MimeTypeVoter;
use JoliCode\MediaBundle\Variation\Voter\OneOfVoter;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Mime\FileBinaryMimeTypeGuesser;
use Symfony\Component\Mime\MimeTypesInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Contracts\Cache\CacheInterface;

return static function (ContainerConfigurator $container): void {
    $container->services()

        // command
        ->set('joli_media.command.audit', AuditCommand::class)
        ->public()
        ->args([
            service('joli_media.library_container'),
        ])
        ->tag('console.command')

        ->set('joli_media.command.batch_convert', BatchConvertCommand::class)
        ->public()
        ->args([
            service('joli_media.converter'),
            service('joli_media.library_container'),
        ])
        ->tag('console.command')

        ->set('joli_media.command.convert', ConvertCommand::class)
        ->public()
        ->args([
            service('joli_media.converter'),
            service('joli_media.library_container'),
        ])
        ->tag('console.command')

        ->set('joli_media.command.prune_cache', PruneCommand::class)
        ->public()
        ->args([
            service('joli_media.resolver'),
            service('joli_media.library_container'),
        ])
        ->tag('console.command')

        ->set('joli_media.command.remove_cache', RemoveCommand::class)
        ->public()
        ->args([
            service('joli_media.library_container'),
        ])
        ->tag('console.command')

        // controller
        ->set(MediaController::class, MediaController::class)
        ->public()
        ->args([
            service('joli_media.converter'),
            service('joli_media.library_container'),
            service('joli_media.resolver'),
        ])
        ->call('setContainer', [service('service_container')])

        // converter
        ->set('joli_media.converter', Converter::class)
        ->public()
        ->args([
            '$libraries' => service('joli_media.library_container'),
            '$resolver' => service('joli_media.resolver'),
            '$transformationProcessor' => service('joli_media.transformation_processor'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])
        ->public()
        ->alias(Converter::class, 'joli_media.converter')

        // data collector
        ->set('joli_media.data_collector', DataCollector::class)
        ->args([
            '$libraryContainer' => service('joli_media.library_container'),
            '$transformationDataHolder' => service('joli_media.data_collector.transformation_data_holder'),
        ])
        ->tag('data_collector', ['id' => DataCollector::class, 'template' => '@JoliMedia/inspector/data_collector.html.twig'])

        ->set('joli_media.data_collector.transformation_data_holder', TransformationDataHolder::class)
        ->args([
            '$stopwatch' => service('debug.stopwatch')->ignoreOnInvalid(),
        ])

        // events
        ->set('joli_media.cache_warmer.media_entity_metadata', MediaEntityMetadataWarmer::class)
        ->args([
            service('doctrine'),
            service(CacheInterface::class),
        ])
        ->tag('kernel.cache_warmer', [
            'priority' => 0,
        ])
        ->set('joli_media.event_listener.folder_delete', DeleteFolderEventListener::class)
        ->args([
            service('doctrine'),
            service(CacheInterface::class),
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::PRE_DELETE_FOLDER,
            'method' => 'onFolderPreDelete',
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::POST_DELETE_FOLDER,
            'method' => 'onFolderPostDelete',
        ])
        ->set('joli_media.event_listener.folder_move', MoveFolderEventListener::class)
        ->args([
            service('doctrine'),
            service(CacheInterface::class),
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::POST_MOVE_FOLDER,
            'method' => 'onFolderPostMove',
        ])
        ->set('joli_media.event_listener.media_delete', DeleteMediaEventListener::class)
        ->args([
            service('doctrine'),
            service(CacheInterface::class),
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::PRE_DELETE_MEDIA,
            'method' => 'onMediaPreDelete',
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::POST_DELETE_MEDIA,
            'method' => 'onMediaPostDelete',
        ])
        ->set('joli_media.event_listener.media_move', MoveMediaEventListener::class)
        ->args([
            service('doctrine'),
            service(CacheInterface::class),
        ])
        ->tag('kernel.event_listener', [
            'event' => MediaEvents::POST_MOVE_MEDIA,
            'method' => 'onMediaPostMove',
        ])

        // library
        ->set('joli_media.library_container', LibraryContainer::class)
        ->public()
        ->arg('$libraries', tagged_locator('joli_media.library', indexAttribute: 'name'))
        ->alias(LibraryContainer::class, 'joli_media.library_container')

        ->set('.joli_media.library.abstract', Library::class)
        ->abstract()
        ->arg('$name', param('joli_media.library.name'))
        ->arg('$originalStorage', abstract_arg('.joli_media.storage.original'))
        ->arg('$cacheStorage', abstract_arg('.joli_media.storage.cache'))
        ->arg('$variationContainer', abstract_arg('.joli_media.variation_container'))

        // mime types
        ->set('joli_media.mime_type_guesser', FileBinaryMimeTypeGuesser::class)

        // processors
        ->set('.joli_media.processor.cwebp', Cwebp::class)
        ->args([
            '$cwebpBinary' => param('joli_media.processors.cwebp.binary'),
            '$identifyBinary' => param('joli_media.processors.cwebp.identify_binary'),
            '$options' => param('joli_media.processors.cwebp.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.processor.gif2webp', Gif2webp::class)
        ->args([
            '$processorContainer' => service('joli_media.processor_container'),
            '$gif2webpBinary' => param('joli_media.processors.gif2webp.binary'),
            '$options' => param('joli_media.processors.gif2webp.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.processor.gifsicle', GifsicleProcessor::class)
        ->args([
            '$binary' => param('joli_media.processors.gifsicle.binary'),
            '$options' => param('joli_media.processors.gifsicle.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('joli_media.processor_container', ProcessorContainer::class)

        // post-processors
        ->set('.joli_media.post_processor.gifsicle', GifsiclePostProcessor::class)
        ->args([
            '$binary' => param('joli_media.post_processors.gifsicle.binary'),
            '$options' => param('joli_media.post_processors.gifsicle.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.post_processor.jpegoptim', Jpegoptim::class)
        ->args([
            '$binary' => param('joli_media.post_processors.jpegoptim.binary'),
            '$options' => param('joli_media.post_processors.jpegoptim.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.post_processor.mozjpeg', Mozjpeg::class)
        ->args([
            '$binary' => param('joli_media.post_processors.mozjpeg.binary'),
            '$options' => param('joli_media.post_processors.mozjpeg.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.post_processor.oxipng', Oxipng::class)
        ->args([
            '$binary' => param('joli_media.post_processors.oxipng.binary'),
            '$options' => param('joli_media.post_processors.oxipng.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.post_processor.pngquant', Pngquant::class)
        ->args([
            '$binary' => param('joli_media.post_processors.pngquant.binary'),
            '$options' => param('joli_media.post_processors.pngquant.options'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('joli_media.post_processor_container', PostProcessorContainer::class)

        // resolver
        ->set('joli_media.resolver', Resolver::class)
        ->args([
            service('joli_media.library_container'),
            service('joli_media.processor_container'),
        ])
        ->public()
        ->alias(Resolver::class, 'joli_media.resolver')

        // routing
        ->set('joli_media.route_checker', RouteChecker::class)
        ->args([
            service('joli_media.library_container'),
            service('joli_media.resolver'),
        ])
        ->tag('routing.condition_service')

        ->set('joli_media.route_loader', RouteLoader::class)
        ->args([
            service('joli_media.library_container'),
        ])
        ->tag('routing.route_loader')

        // storage
        ->set('.joli_media.storage.original.abstract', OriginalStorage::class)
        ->abstract()
        ->arg('$strategy', abstract_arg('.joli_media.storage.strategy'))
        ->arg('$filesystem', param('joli_media.storage.filesystem'))
        ->arg('$urlPath', param('joli_media.storage.url_generator.path'))
        ->arg('$urlGenerator', service(UrlGeneratorInterface::class))
        ->arg('$enableServeUsingPhp', param('joli_media.storage.enable_serve_using_php'))
        ->arg('$trashPath', param('joli_media.storage.trash_path'))
        ->arg('$mimeTypeGuesser', service('joli_media.mime_type_guesser'))
        ->arg('$mimeTypes', service(MimeTypesInterface::class))
        ->arg('$cache', service(CacheInterface::class))
        ->arg('$dispatcher', service(EventDispatcherInterface::class))

        ->set('.joli_media.storage.cache.abstract', CacheStorage::class)
        ->abstract()
        ->arg('$strategy', abstract_arg('.joli_media.storage.strategy'))
        ->arg('$filesystem', param('joli_media.storage.filesystem'))
        ->arg('$urlPath', param('joli_media.storage.url_generator.path'))
        ->arg('$urlGenerator', service(UrlGeneratorInterface::class))
        ->arg('$mimeTypes', service(MimeTypesInterface::class))

        ->set('.joli_media.storage.strategy.folder', FolderStorageStrategy::class)
        ->args([
            service(SluggerInterface::class),
        ])

        ->set('.joli_media.storage.strategy.identity', IdentityStorageStrategy::class)
        ->args([
            service(SluggerInterface::class),
        ])

        // transformation
        ->set('joli_media.transformation_processor', TransformationProcessor::class)
        ->args([
            '$processorContainer' => service('joli_media.processor_container'),
            '$postProcessorContainer' => service('joli_media.post_processor_container'),
            '$logger' => service('logger')->ignoreOnInvalid(),
            '$transformationDataHolder' => service('joli_media.data_collector.transformation_data_holder'),
        ])

        // transformers
        ->set('.joli_media.transformer.transformer_chain.abstract', TransformerChain::class)
        ->abstract()
        ->args([
            '$transformers' => abstract_arg('transformers'),
        ])

        ->set('.joli_media.transformer.crop.abstract', Crop::class)
        ->abstract()
        ->args([
            '$startX' => abstract_arg('start_x'),
            '$startY' => abstract_arg('start_y'),
            '$width' => abstract_arg('width'),
            '$height' => abstract_arg('height'),
        ])

        ->set('.joli_media.transformer.expand.abstract', Expand::class)
        ->abstract()
        ->args([
            '$width' => abstract_arg('width'),
            '$height' => abstract_arg('height'),
            '$positionX' => abstract_arg('position_x'),
            '$positionY' => abstract_arg('position_y'),
            '$backgroundColor' => abstract_arg('background_color'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])

        ->set('.joli_media.transformer.heighten.abstract', Heighten::class)
        ->abstract()
        ->args([
            '$height' => abstract_arg('height'),
            '$allowDownscale' => abstract_arg('allowDownscale'),
        ])

        ->set('.joli_media.transformer.resize.abstract', Resize::class)
        ->abstract()
        ->args([
            '$width' => abstract_arg('width'),
            '$height' => abstract_arg('height'),
            '$mode' => abstract_arg('mode'),
            '$allowDownscale' => abstract_arg('allowDownscale'),
            '$allowUpscale' => abstract_arg('allowUpscale'),
        ])

        ->set('.joli_media.transformer.thumbnail.abstract', Thumbnail::class)
        ->abstract()
        ->args([
            '$width' => abstract_arg('width'),
            '$height' => abstract_arg('height'),
            '$allowUpscale' => abstract_arg('allowUpscale'),
        ])

        ->set('.joli_media.transformer.widen.abstract', Widen::class)
        ->abstract()
        ->args([
            '$width' => abstract_arg('width'),
            '$allowDownscale' => abstract_arg('allowDownscale'),
        ])

        // twig
        ->set('joli_media.twig_extension', JoliMediaExtension::class)
        ->args([
            service('joli_media.resolver'),
        ])
        ->tag('twig.extension')

        ->set('joli_media.twig.component.img', Img::class)
        ->args([
            '$converter' => service('joli_media.converter'),
            '$resolver' => service('joli_media.resolver'),
            '$libraries' => service('joli_media.library_container'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])
        ->tag('twig.component')

        ->set('joli_media.twig.component.picture', Picture::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
            '$libraries' => service('joli_media.library_container'),
        ])
        ->tag('twig.component')

        ->set('joli_media.twig.component.source', Source::class)
        ->args([
            '$converter' => service('joli_media.converter'),
            '$resolver' => service('joli_media.resolver'),
            '$logger' => service('logger')->ignoreOnInvalid(),
        ])
        ->tag('twig.component')

        // validator
        ->set('joli_media.validator.media', MediaValidator::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
        ])
        ->tag('validator.constraint_validator')

        // variation
        ->set('.joli_media.variation_container.abstract', VariationContainer::class)
        ->abstract()
        ->args([
            '$storage' => abstract_arg('storage'),
            '$slugger' => service(SluggerInterface::class),
        ])

        ->set('.joli_media.variation.abstract', Variation::class)
        ->abstract()
        ->args([
            '$name' => abstract_arg('name'),
            '$format' => abstract_arg('format'),
            '$transformerChain' => abstract_arg('transformerChain'),
            '$slugger' => service(SluggerInterface::class),
            '$processorsConfiguration' => abstract_arg('processors_configuration'),
            '$postProcessorsConfiguration' => abstract_arg('post_processors_configuration'),
            '$voters' => abstract_arg('joli_media.voters'),
        ])

        // voter
        ->set('.joli_media.variation_voter.all_of.abstract', AllOfVoter::class)
        ->abstract()
        ->args([
            '$voters' => abstract_arg('voters'),
        ])

        ->set('.joli_media.variation_voter.filesize.abstract', FilesizeVoter::class)
        ->abstract()
        ->args([
            '$minSize' => abstract_arg('min_size'),
            '$maxSize' => abstract_arg('max_size'),
        ])

        ->set('.joli_media.variation_voter.folder.abstract', FolderVoter::class)
        ->abstract()
        ->args([
            '$folder' => abstract_arg('folder'),
        ])

        ->set('.joli_media.variation_voter.format.abstract', FormatVoter::class)
        ->abstract()
        ->args([
            '$format' => abstract_arg('format'),
        ])

        ->set('.joli_media.variation_voter.mime_type.abstract', MimeTypeVoter::class)
        ->abstract()
        ->args([
            '$mimeType' => abstract_arg('mime_type'),
        ])

        ->set('.joli_media.variation_voter.one_of.abstract', OneOfVoter::class)
        ->abstract()
        ->args([
            '$voters' => abstract_arg('voters'),
        ])
    ;
};
