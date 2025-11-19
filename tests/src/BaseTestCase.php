<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Cwebp;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\CacheStorage;
use JoliCode\MediaBundle\Storage\MediaPropertyAccessor;
use JoliCode\MediaBundle\Storage\MediaVariationPropertyAccessor;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Storage\Strategy\FolderStorageStrategy;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use JoliCode\MediaBundle\Variation\VariationContainer;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Mime\FileBinaryMimeTypeGuesser;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Component\Routing\Generator\UrlGenerator;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class BaseTestCase extends TestCase
{
    public const AVIF_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.avif';

    public const JPEG_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.jpeg';

    public const GIF_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.gif';

    public const HEIF_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.heic';

    public const PNG_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.png';

    public const TIFF_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.tiff';

    public const WEBP_FIXTURE_PATH = __DIR__ . '/../fixtures/circle-pattern.webp';

    public const FIXTURE_BINARIES = [
        'avif' => self::AVIF_FIXTURE_PATH,
        'gif' => self::GIF_FIXTURE_PATH,
        'heif' => self::HEIF_FIXTURE_PATH,
        'jpeg' => self::JPEG_FIXTURE_PATH,
        'png' => self::PNG_FIXTURE_PATH,
        'tiff' => self::TIFF_FIXTURE_PATH,
        'webp' => self::WEBP_FIXTURE_PATH,
    ];

    protected CacheStorage $cacheStorage;

    protected Converter $converter;

    protected Filesystem $cacheFilesystem;

    protected Filesystem $originalFilesystem;

    protected MimeTypes $mimeTypes;

    protected OriginalStorage $originalStorage;

    protected OriginalStorage $customOriginalStorage;

    protected ProcessorContainer $processorContainer;

    protected Resolver $resolver;

    protected Library $library;

    protected LibraryContainer $libraries;

    protected UrlGeneratorInterface $urlGenerator;

    protected Variation $variation;

    protected VariationContainer $variationContainer;

    protected function setUp(): void
    {
        $this->urlGenerator = $this->createUrlGenerator([
            'default' => [
                'original' => '/media',
                'cache' => '/cache',
            ],
        ]);
        $this->originalFilesystem = $this->createFilesystem();
        $this->cacheFilesystem = $this->createFilesystem();
        $this->originalStorage = $this->createOriginalStorage(
            'default',
            $this->originalFilesystem,
            '/media',
            $this->urlGenerator,
        );
        $this->cacheStorage = $this->createCacheStorage(
            'default',
            $this->cacheFilesystem,
            '/cache',
            $this->urlGenerator,
        );

        $this->variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );
        $this->variationContainer = $this->createVariationContainer($this->cacheStorage, [
            'thumbnail' => fn (): Variation => $this->variation,
        ]);

        $this->library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->variationContainer
        );

        $this->customOriginalStorage = $this->createOriginalStorage(
            'custom',
            $this->createFilesystem(),
            '/custom/media-1',
            $this->urlGenerator,
        );
        $customCacheStorage = $this->createCacheStorage(
            'custom',
            $this->createFilesystem(),
            '/custom/cache-1',
            $this->urlGenerator,
        );
        $variationContainer = $this->createVariationContainer($customCacheStorage);
        $customLibrary = new Library(
            'custom',
            $this->customOriginalStorage,
            $customCacheStorage,
            $variationContainer
        );

        $this->libraries = new LibraryContainer(
            new ServiceLocator(
                [
                    'default' => fn (): Library => $this->library,
                    'custom' => fn (): Library => $customLibrary,
                ]
            ),
            'default',
        );

        $this->processorContainer = new ProcessorContainer();
        $processor = new Cwebp();
        $this->processorContainer->add('cwebp', $processor);

        $this->resolver = new Resolver($this->libraries, $this->processorContainer);
        $transformationProcessor = new TransformationProcessor(
            $this->processorContainer,
            new PostProcessorContainer(),
        );
        $this->converter = new Converter($this->libraries, $this->resolver, $transformationProcessor);
    }

    public static function getFixtureBinary(string $extension): Binary
    {
        if (!\array_key_exists($extension, self::FIXTURE_BINARIES)) {
            throw new \LogicException(\sprintf('No fixture file exists for the extension "%s"', $extension));
        }

        return new Binary(
            'image/' . $extension,
            $extension,
            self::getFixtureBinaryContent(self::FIXTURE_BINARIES[$extension]),
        );
    }

    public static function getFixtureBinaryContent(string $path): string
    {
        $content = file_get_contents($path);

        if (false === $content) {
            throw new \LogicException(\sprintf('Unable to read the file "%s"', $path));
        }

        return $content;
    }

    protected function createFilesystem(): Filesystem
    {
        return new Filesystem(new InMemoryFilesystemAdapter());
    }

    protected function createOriginalStorage(
        string $libraryName,
        Filesystem $filesystem,
        string $urlPath,
        UrlGeneratorInterface $urlGenerator,
    ): OriginalStorage {
        $eventDispatcher = $this->createMock(EventDispatcherInterface::class);
        $cache = $this->createMock(CacheInterface::class);
        $cache->method('get')->willReturnCallback(function (string $key, callable $callback) {
            $item = $this->createMock(ItemInterface::class);

            return $callback($item);
        });
        $mimeTypeGuesser = new MimeTypeGuesser(
            new MimeTypes(),
            new FileBinaryMimeTypeGuesser()
        );
        $mediaPropertyAccessor = new MediaPropertyAccessor(
            $libraryName,
            $filesystem,
            $mimeTypeGuesser,
            $cache,
        );

        return new OriginalStorage(
            new FolderStorageStrategy(),
            $filesystem,
            $urlPath,
            false,
            '.trash',
            $urlGenerator,
            $mimeTypeGuesser,
            $eventDispatcher,
            $mediaPropertyAccessor,
        );
    }

    protected function createCacheStorage(
        string $libraryName,
        Filesystem $filesystem,
        string $urlPath,
        UrlGeneratorInterface $urlGenerator,
    ): CacheStorage {
        $cache = $this->createMock(CacheInterface::class);
        $cache->method('get')->willReturnCallback(function (string $key, callable $callback) {
            $item = $this->createMock(ItemInterface::class);

            return $callback($item);
        });
        $mimeTypeGuesser = new MimeTypeGuesser(
            new MimeTypes(),
            new FileBinaryMimeTypeGuesser()
        );
        $strategy = new FolderStorageStrategy();
        $mediaVariationPropertyAccessor = new MediaVariationPropertyAccessor(
            $libraryName,
            $strategy,
            $filesystem,
            $mimeTypeGuesser,
            $cache,
        );

        return new CacheStorage(
            $strategy,
            $filesystem,
            $urlPath,
            false,
            $urlGenerator,
            $mimeTypeGuesser,
            $mediaVariationPropertyAccessor,
        );
    }

    /**
     * @param array<string, array{original: string, cache: string}> $libraries
     */
    protected function createUrlGenerator(array $libraries = []): UrlGeneratorInterface
    {
        $routeCollection = new RouteCollection();

        foreach ($libraries as $library => $urlPaths) {
            $routeCollection->add(
                'joli_media_original_' . $library,
                new Route($urlPaths['original'] . '/{slug}')
            );
            $routeCollection->add(
                'joli_media_cache_' . $library,
                new Route($urlPaths['cache'] . '/{variation}/{slug}')
            );
        }

        return new UrlGenerator(
            $routeCollection,
            new RequestContext()
        );
    }

    /**
     * @param array<string, callable> $variations
     */
    protected function createVariationContainer(CacheStorage $cacheStorage, array $variations = []): VariationContainer
    {
        return new VariationContainer(new ServiceLocator($variations), $cacheStorage);
    }
}
