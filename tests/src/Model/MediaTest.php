<?php

namespace JoliCode\MediaBundle\Tests\Model;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Exception\InvalidSerializedMediaException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use Symfony\Component\DependencyInjection\ServiceLocator;

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

    public function testSerializeOnlyStoresScalars(): void
    {
        self::assertSame([
            'path' => 'test.jpg',
            'library' => 'default',
        ], $this->media->__serialize());

        // the storage is a service, it must never end up in the payload
        self::assertStringNotContainsString(OriginalStorage::class, serialize($this->media));
    }

    public function testSerializeUnserializeRestoresMedia(): void
    {
        Media::$libraryContainerInitializer = fn (): LibraryContainer => $this->libraries;

        $restored = unserialize(serialize($this->media));

        self::assertInstanceOf(Media::class, $restored);
        self::assertSame('test.jpg', $restored->getPath());
        self::assertSame('default', $restored->getLibrary()->getName());
        self::assertSame($this->originalStorage, $restored->getStorage());
    }

    public function testUnserializeResetsTheRuntimeState(): void
    {
        Media::$libraryContainerInitializer = fn (): LibraryContainer => $this->libraries;
        $this->media->addVariation(new MediaVariation($this->media, $this->variation));

        $restored = unserialize(serialize($this->media));

        self::assertInstanceOf(Media::class, $restored);
        self::assertSame([], $restored->getVariations());
    }

    public function testUnserializeUsesTheCurrentLibraryContainer(): void
    {
        Media::$libraryContainerInitializer = fn (): LibraryContainer => $this->libraries;
        $payload = serialize($this->media);

        // the container is rebuilt whenever the kernel is rebooted: the restored
        // media must not be attached to a stale one
        $otherLibraries = new LibraryContainer(
            new ServiceLocator([
                'default' => fn (): Library => $this->libraries->get('custom'),
            ]),
            'default',
        );
        Media::$libraryContainerInitializer = static fn (): LibraryContainer => $otherLibraries;

        $restored = unserialize($payload);

        self::assertInstanceOf(Media::class, $restored);
        self::assertSame($this->customOriginalStorage, $restored->getStorage());
    }

    public function testUnserializeSupportsLegacyIndexedPayload(): void
    {
        Media::$libraryContainerInitializer = fn (): LibraryContainer => $this->libraries;

        $restored = (new \ReflectionClass(Media::class))->newInstanceWithoutConstructor();
        $restored->__unserialize([
            0 => 'test.jpg',
            1 => 'default',
        ]);

        self::assertSame('test.jpg', $restored->getPath());
        self::assertSame('default', $restored->getLibrary()->getName());
        self::assertSame($this->originalStorage, $restored->getStorage());
    }

    public function testUnserializeThrowsOnInvalidPayload(): void
    {
        Media::$libraryContainerInitializer = fn (): LibraryContainer => $this->libraries;

        $restored = (new \ReflectionClass(Media::class))->newInstanceWithoutConstructor();

        $this->expectException(InvalidSerializedMediaException::class);
        $this->expectExceptionMessage('Invalid serialized media payload.');

        $restored->__unserialize(['path' => 'test.jpg']);
    }
}
