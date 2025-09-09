<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Variation;

use JoliCode\MediaBundle\Exception\VariationNotFoundException;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;

class VariationContainerTest extends BaseTestCase
{
    protected function setUp(): void
    {
        $this->urlGenerator = $this->createUrlGenerator([
            'default' => [
                'original' => '/media',
                'cache' => '/cache',
            ],
        ]);
        $this->cacheFilesystem = $this->createFilesystem();
        $this->cacheStorage = $this->createCacheStorage(
            'default',
            $this->cacheFilesystem,
            '/cache',
            $this->urlGenerator,
        );
        $this->variationContainer = $this->createVariationContainer($this->cacheStorage);
    }

    public function testCaseInsensitivity(): void
    {
        $variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );
        $this->variationContainer = $this->createVariationContainer($this->cacheStorage, [
            'thumbnail' => fn (): Variation => $variation,
        ]);

        self::assertSame($variation, $this->variationContainer->get('thumbnail'));
        self::assertSame($variation, $this->variationContainer->get('ThuMbNaIl'));
        self::assertSame($variation, $this->variationContainer->get('THUMBNAIL'));

        self::assertTrue($this->variationContainer->has('thumbnail'));
        self::assertTrue($this->variationContainer->has('ThuMbNaIl'));
        self::assertTrue($this->variationContainer->has('THUMBNAIL'));
    }

    public function testGetNonExistentVariation(): void
    {
        $this->expectException(VariationNotFoundException::class);
        $this->expectExceptionMessage('Variation "non-existent" does not exist.');

        $this->variationContainer->get('non-existent');
        self::assertFalse($this->variationContainer->has('non-existent'));
    }

    public function testGetVariations(): void
    {
        $thumbnail = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );

        $large = new Variation(
            'large',
            Format::WEBP,
            new TransformerChain([]),
        );
        $this->variationContainer = $this->createVariationContainer($this->cacheStorage, [
            'thumbnail' => fn (): Variation => $thumbnail,
            'large' => fn (): Variation => $large,
        ]);

        $variations = $this->variationContainer->list();
        self::assertCount(2, $variations);
        self::assertSame($thumbnail, $this->variationContainer->get('thumbnail'));
        self::assertSame($large, $this->variationContainer->get('large'));
    }

    public function testGetNames(): void
    {
        $thumbnail = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );

        $large = new Variation(
            'large',
            Format::WEBP,
            new TransformerChain([]),
        );
        $this->variationContainer = $this->createVariationContainer($this->cacheStorage, [
            'thumbnail' => fn (): Variation => $thumbnail,
            'large' => fn (): Variation => $large,
        ]);

        $names = $this->variationContainer->getNames();
        self::assertCount(2, $names);
        self::assertContains('thumbnail', $names);
        self::assertContains('large', $names);
    }

    public function testGetStorage(): void
    {
        self::assertSame($this->cacheStorage, $this->variationContainer->getStorage());
    }
}
