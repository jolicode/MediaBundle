<?php

namespace JoliCode\MediaBundle\Tests\Model;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;

class MediaVariationTest extends BaseTestCase
{
    /**
     * @var (callable(): Converter)|null
     */
    private $previousConverterInitializer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->previousConverterInitializer = MediaVariation::$converterInitializer;
        MediaVariation::$converterInitializer = null;
    }

    protected function tearDown(): void
    {
        MediaVariation::$converterInitializer = $this->previousConverterInitializer;

        parent::tearDown();
    }

    public function testGetUrlDoesNotConvertWithoutConverterInitializer(): void
    {
        $mediaVariation = $this->createStoredMedia($this->createLibrary(true))->createVariation('thumbnail');

        self::assertStringStartsWith('/auto/cache/thumbnail/', $mediaVariation->getUrl());
        self::assertFalse($mediaVariation->isStored());
    }

    public function testGetUrlConvertsWhenMustStoreWhenGeneratingUrl(): void
    {
        $calls = 0;
        MediaVariation::$converterInitializer = function () use (&$calls): Converter {
            ++$calls;

            return $this->converter;
        };

        $mediaVariation = $this->createStoredMedia($this->createLibrary(true))->createVariation('thumbnail');

        self::assertStringStartsWith('/auto/cache/thumbnail/', $mediaVariation->getUrl());
        self::assertTrue($mediaVariation->isStored());
        self::assertSame(1, $calls);

        // a stored variation must not trigger another conversion
        $mediaVariation->getUrl();
        self::assertSame(1, $calls);
    }

    public function testGetUrlDoesNotConvertWhenMustStoreWhenGeneratingUrlIsDisabled(): void
    {
        $calls = 0;
        MediaVariation::$converterInitializer = function () use (&$calls): Converter {
            ++$calls;

            return $this->converter;
        };

        $mediaVariation = $this->createStoredMedia($this->createLibrary(false))->createVariation('thumbnail');

        self::assertStringStartsWith('/auto/cache/thumbnail/', $mediaVariation->getUrl());
        self::assertFalse($mediaVariation->isStored());
        self::assertSame(0, $calls);
    }

    public function testGetUrlHonorsTheVariationLevelOverride(): void
    {
        MediaVariation::$converterInitializer = fn (): Converter => $this->converter;

        // the variation-level setting enables the conversion in a library where it is disabled
        $mediaVariation = $this->createStoredMedia($this->createLibrary(false, true))->createVariation('thumbnail');
        $mediaVariation->getUrl();
        self::assertTrue($mediaVariation->isStored());

        // the variation-level setting disables the conversion in a library where it is enabled
        $mediaVariation = $this->createStoredMedia($this->createLibrary(true, false))->createVariation('thumbnail');
        $mediaVariation->getUrl();
        self::assertFalse($mediaVariation->isStored());
    }

    public function testGetUrlGuardsAgainstNestedConversion(): void
    {
        $mediaVariation = $this->createStoredMedia($this->createLibrary(true))->createVariation('thumbnail');

        $calls = 0;
        MediaVariation::$converterInitializer = function () use (&$calls, $mediaVariation): Converter {
            ++$calls;
            // simulate a URL generation happening during the conversion, as the
            // profiler does when it collects the transformation data
            $mediaVariation->getUrl();

            return $this->converter;
        };

        $mediaVariation->getUrl();

        self::assertSame(1, $calls);
        self::assertTrue($mediaVariation->isStored());
    }

    private function createLibrary(bool $mustStoreWhenGeneratingUrl, ?bool $variationMustStoreWhenGeneratingUrl = null): Library
    {
        $urlGenerator = $this->createUrlGenerator([
            'auto' => [
                'original' => '/auto/media',
                'cache' => '/auto/cache',
            ],
        ]);
        $originalStorage = $this->createOriginalStorage('auto', $this->createFilesystem(), '/auto/media', $urlGenerator);
        $cacheStorage = $this->createCacheStorage('auto', $this->createFilesystem(), '/auto/cache', $urlGenerator, $mustStoreWhenGeneratingUrl);
        $variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
            mustStoreWhenGeneratingUrl: $variationMustStoreWhenGeneratingUrl,
        );

        return new Library(
            'auto',
            $originalStorage,
            $cacheStorage,
            $this->createVariationContainer($cacheStorage, [
                'thumbnail' => static fn (): Variation => $variation,
            ]),
        );
    }

    private function createStoredMedia(Library $library): Media
    {
        $media = new Media('test.jpg', $library->getOriginalStorage(), self::getFixtureBinary('jpeg'));
        $media->store();

        return $media;
    }
}
