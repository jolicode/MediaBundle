<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class MediaTest extends BaseTestCase
{
    private Media $media;

    private Binary $binary;

    protected function setUp(): void
    {
        parent::setUp();

        $this->binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $this->media = new Media('test.jpg', $this->originalStorage, $this->binary);
        $this->media->store();
    }

    public function testGetPath(): void
    {
        self::assertEquals('test.jpg', $this->media->getPath());
    }

    public function testGetFilename(): void
    {
        self::assertEquals('test.jpg', $this->media->getFilename());
    }

    public function testGetBinary(): void
    {
        self::assertSame($this->binary, $this->media->getBinary());
    }

    public function testGetBinaryWhenNotStored(): void
    {
        $media = new Media('not-stored.jpg', $this->originalStorage);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('This media is not stored and its binary is not set');

        $media->getBinary();
    }

    public function testGetFormat(): void
    {
        self::assertEquals('jpeg', $this->media->getFormat());
    }

    public function testGetMimeType(): void
    {
        self::assertEquals('image/jpeg', $this->media->getMimeType());
    }

    public function testGetFileType(): void
    {
        self::assertEquals('image', $this->media->getFileType());
    }

    public function testGetFileSize(): void
    {
        $this->originalFilesystem->write('test.jpg', 'test content');
        self::assertEquals(12, $this->media->getFileSize());
    }

    public function testGetLastModified(): void
    {
        $this->originalFilesystem->write('test.jpg', 'test content');
        $lastModified = $this->media->getLastModified();
        self::assertInstanceOf(\DateTime::class, $lastModified);
    }

    public function testGetPixelDimensions(): void
    {
        $pixelDimensions = $this->media->getPixelDimensions();
        self::assertIsArray($pixelDimensions);
        self::assertArrayHasKey('width', $pixelDimensions);
        self::assertArrayHasKey('height', $pixelDimensions);
        self::assertEquals(2560, $pixelDimensions['width']);
        self::assertEquals(1920, $pixelDimensions['height']);
    }

    public function testGetPixelDimensionsForNonImageContent(): void
    {
        // replace the binary with a non-image content
        $this->originalFilesystem->write('test.jpg', 'test content');
        self::assertFalse($this->media->getPixelDimensions());
    }

    public function testGetStorage(): void
    {
        self::assertSame($this->originalStorage, $this->media->getStorage());
    }

    public function testGetUrl(): void
    {
        self::assertEquals('/media/test.jpg', $this->media->getUrl());
    }

    public function testVariations(): void
    {
        $variation = $this->library->getVariationContainer()->get('thumbnail');
        $mediaVariation = $this->media->createVariation($variation);
        $this->media->addVariation($mediaVariation);

        self::assertTrue($this->media->hasVariation('thumbnail'));
        self::assertSame($mediaVariation, $this->media->getVariation('thumbnail'));
        self::assertEquals(['thumbnail' => $mediaVariation], $this->media->getVariations());
    }

    public function testGetNonExistentVariation(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Variation "non-existent" not found');

        $this->media->getVariation('non-existent');
    }

    public function testIsStored(): void
    {
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $media = new Media('test.png', $this->originalStorage, $binary);
        self::assertFalse($media->isStored());

        $this->originalFilesystem->write('test.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        self::assertFalse($media->isStored());
    }

    public function testStore(): void
    {
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $media = new Media('test.png', $this->originalStorage, $binary);
        $media->store();
        self::assertTrue($this->originalFilesystem->fileExists('test.png'));
        self::assertTrue($media->isStored());
        self::assertEquals(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH), $this->originalFilesystem->read('test.png'));
    }

    public function testStoreWithNewBinary(): void
    {
        $newBinary = new Binary('image/jpeg', Format::JPEG->value, 'new content');
        $this->media->store($newBinary);
        self::assertTrue($this->originalFilesystem->fileExists('test.jpg'));
        self::assertEquals('new content', $this->originalFilesystem->read('test.jpg'));
    }

    public function testStoreWithNoBinary(): void
    {
        $media = new Media('test.jpg', $this->originalStorage);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('No binary set to store');

        $media->store();
    }
}
