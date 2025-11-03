<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Storage\Strategy;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Storage\Strategy\FolderStorageStrategy;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use PHPUnit\Framework\TestCase;

class FolderStorageStrategyTest extends TestCase
{
    private FolderStorageStrategy $strategy;

    protected function setUp(): void
    {
        $this->strategy = new FolderStorageStrategy();
    }

    public function testGetFilePathWithoutVariation(): void
    {
        self::assertEquals('', $this->strategy->getFilePath(''));
        self::assertEquals('', $this->strategy->getFilePath());
        self::assertEquals('test.jpg', $this->strategy->getFilePath('test.jpg'));
        self::assertEquals('path/to/test.jpg', $this->strategy->getFilePath('path/to/test.jpg'));
    }

    public function testGetFilePathWithVariation(): void
    {
        $variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );

        $path = 'test.jpg';
        $expectedHash = hash('crc32', $path);
        $expectedPath = \sprintf('test.%s.webp', $expectedHash);
        self::assertEquals($expectedPath, $this->strategy->getFilePath($path, $variation));

        $path = 'path/to/test.jpg';
        $expectedHash = hash('crc32', $path);
        $expectedPath = \sprintf('path/to/test.%s.webp', $expectedHash);
        self::assertEquals($expectedPath, $this->strategy->getFilePath($path, $variation));
    }

    public function testGetPathWithoutVariation(): void
    {
        self::assertEquals('test.jpg', $this->strategy->getPath('test.jpg'));
        self::assertEquals('path/to/test.jpg', $this->strategy->getPath('path/to/test.jpg'));
    }

    public function testGetPathWithVariation(): void
    {
        $variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([]),
        );

        $path = 'test.jpg';
        $expectedHash = hash('crc32', $path);
        $expectedPath = \sprintf('thumbnail/test.%s.webp', $expectedHash);
        self::assertEquals($expectedPath, $this->strategy->getPath($path, $variation));

        $path = 'path/to/test.jpg';
        $expectedHash = hash('crc32', $path);
        $expectedPath = \sprintf('thumbnail/path/to/test.%s.webp', $expectedHash);
        self::assertEquals($expectedPath, $this->strategy->getPath($path, $variation));
    }

    public function testGetRoutePattern(): void
    {
        self::assertEquals('{slug}', $this->strategy->getRoutePattern());
        self::assertEquals('{variation}/{slug}', $this->strategy->getRoutePattern(true));
    }
}
