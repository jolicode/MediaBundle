<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Variation\VariationContainer;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class LibraryContainerTest extends BaseTestCase
{
    private Library $customLibrary;

    private Library $defaultLibrary;

    protected function setUp(): void
    {
        $routeCollection = new RouteCollection();
        $routeCollection->add('joli_media_original_default', new Route('/media/{slug}'));
        $routeCollection->add('joli_media_cache_default', new Route('/cache/{variation}/{slug}'));

        $urlGenerator = $this->createUrlGenerator([
            'default' => [
                'original' => '/media-1',
                'cache' => '/cache-1',
            ],
            'custom' => [
                'original' => '/media-2',
                'cache' => '/cache-2',
            ],
        ]);

        $defaultOriginalStorage = $this->createOriginalStorage($this->createFilesystem(), '/media-1', $urlGenerator);
        $defaultCacheStorage = $this->createCacheStorage($this->createFilesystem(), '/cache-1', $urlGenerator);
        $defaultVariationContainer = new VariationContainer(new ServiceLocator([]), $defaultCacheStorage);
        $this->defaultLibrary = new Library(
            'default',
            $defaultOriginalStorage,
            $defaultCacheStorage,
            $defaultVariationContainer,
        );

        $customOriginalStorage = $this->createOriginalStorage($this->createFilesystem(), '/media-2', $urlGenerator);
        $customCacheStorage = $this->createCacheStorage($this->createFilesystem(), '/cache-2', $urlGenerator);
        $customVariationContainer = new VariationContainer(new ServiceLocator([]), $customCacheStorage);
        $this->customLibrary = new Library(
            'custom',
            $customOriginalStorage,
            $customCacheStorage,
            $customVariationContainer,
        );

        $this->libraries = new LibraryContainer(
            new ServiceLocator(
                [
                    'default' => fn (): Library => $this->defaultLibrary,
                    'custom' => fn (): Library => $this->customLibrary,
                ]
            ),
            'default',
        );
    }

    public function testGetNonExistentLibrary(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Library "non-existent" not found.');

        $this->libraries->get('non-existent');
    }

    public function testGetLibrary(): void
    {
        $libraries = iterator_to_array($this->libraries->list());
        self::assertCount(2, $libraries);
        self::assertSame($this->defaultLibrary, $libraries['default']);
        self::assertSame($this->customLibrary, $libraries['custom']);
    }

    public function testHas(): void
    {
        self::assertTrue($this->libraries->has('default'));
        self::assertFalse($this->libraries->has('non-existent'));
    }

    public function testSetDefaultLibraryName(): void
    {
        $this->libraries->setDefaultLibraryName('custom');
        self::assertEquals('custom', $this->libraries->getDefaultName());
        self::assertSame($this->customLibrary, $this->libraries->getDefault());
    }

    public function testSetDefaultLibraryNameToNonExistentLibrary(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Library "non-existent" not found.');

        $this->libraries->setDefaultLibraryName('non-existent');
    }
}
