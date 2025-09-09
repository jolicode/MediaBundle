<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Resolver;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use PHPUnit\Framework\Attributes\DataProvider;

class ResolverTest extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function testIsMediaProcessable(): void
    {
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));
        self::assertTrue($this->resolver->isMediaProcessable($media));

        $media = new Media('test.png', $this->originalStorage, new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH)));
        self::assertTrue($this->resolver->isMediaProcessable($media));
    }

    #[DataProvider('providePathNormalizationCases')]
    public function testPathNormalization(string $input, string $expected): void
    {
        self::assertSame($expected, Resolver::normalizePath($input), 'Failed for input: ' . $input);
    }

    public static function providePathNormalizationCases(): \Generator
    {
        yield ['/foo/bar', 'foo/bar'];
        yield ['//foo//bar//', 'foo/bar'];
        yield ['foo/bar', 'foo/bar'];
        yield ['foo//bar', 'foo/bar'];
        yield ['foo/bar/', 'foo/bar'];
        yield ['foo/bar//', 'foo/bar'];
        yield ['./foo/bar', 'foo/bar'];
        yield ['.///foo/bar', 'foo/bar'];
        yield ['.foo/bar', '.foo/bar'];
        yield ['/./foo/bar', 'foo/bar'];
        yield ['/./foo/./bar', 'foo/bar'];
        yield ['/./foo/./././bar', 'foo/bar'];
        yield ['/./foo././././.bar', 'foo./.bar'];
        yield ['/./foo././//./.bar', 'foo./.bar'];
        yield ['./././foo/bar', 'foo/bar'];
        yield ['', ''];
    }

    public function testResolveMedia(): void
    {
        $this->originalFilesystem->write('test.jpg', BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = $this->resolver->resolveMedia('test.jpg');
        self::assertInstanceOf(Media::class, $media);
        self::assertEquals('test.jpg', $media->getPath());

        $this->expectException(MediaNotFoundException::class);
        $this->resolver->resolveMedia('non-existent.jpg');
    }

    public function testResolveMediaWithStorageName(): void
    {
        $this->originalFilesystem->write('test.jpg', BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = $this->resolver->resolveMedia('test.jpg', 'default');
        self::assertInstanceOf(Media::class, $media);
        self::assertEquals('test.jpg', $media->getPath());

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Library "non-existent" not found');
        $this->resolver->resolveMedia('test.jpg', 'non-existent');
    }

    public function testResolveVariation(): void
    {
        $media = new Media('test.jpg', $this->originalStorage);
        $media->store(new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));

        $this->converter->convert('test.jpg', null, 'thumbnail');

        $mediaVariation = $this->resolver->resolveMediaVariation('test.jpg', 'thumbnail');
        self::assertInstanceOf(MediaVariation::class, $mediaVariation);
        self::assertSame($this->variation, $mediaVariation->getVariation());
    }

    public function testResolveVariationWithNonProcessableMedia(): void
    {
        $this->originalFilesystem->write('test.gif', BaseTestCase::getFixtureBinaryContent(BaseTestCase::GIF_FIXTURE_PATH));
        $mediaVariation = $this->resolver->resolveMediaVariation('test.gif', 'thumbnail');
        self::assertNull($mediaVariation);
    }

    public function testResolve(): void
    {
        $this->originalFilesystem->write('test.jpg', BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));

        // Test resolving media
        $result = $this->resolver->resolve('test.jpg');
        self::assertInstanceOf(Media::class, $result);
        self::assertEquals('test.jpg', $result->getPath());

        // Test resolving variation
        $result = $this->resolver->resolve('test.jpg', null, 'thumbnail');
        self::assertInstanceOf(MediaVariation::class, $result);
        self::assertEquals('test.jpg', $result->getMedia()->getPath());

        // Test resolving non-existent path
        $this->expectException(MediaNotFoundException::class);
        $this->resolver->resolve('non-existent.jpg');
    }

    public function testResolveWithStorageName(): void
    {
        $this->originalFilesystem->write('test.jpg', BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));

        // Test resolving media with library name
        $result = $this->resolver->resolve('test.jpg', 'default');
        self::assertInstanceOf(Media::class, $result);
        self::assertEquals('test.jpg', $result->getPath());

        // Test resolving variation with stolibraryrage name
        $result = $this->resolver->resolve('test.jpg', 'default', 'thumbnail');
        self::assertInstanceOf(MediaVariation::class, $result);
        self::assertEquals('test.jpg', $result->getMedia()->getPath());

        // Test resolving with non-existent library
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Library "non-existent" not found');
        $this->resolver->resolve('test.jpg', 'non-existent');
    }
}
