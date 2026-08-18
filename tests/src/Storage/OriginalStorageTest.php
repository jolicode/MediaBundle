<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use PHPUnit\Framework\Attributes\DataProvider;

class OriginalStorageTest extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function testCreateMedia(): void
    {
        $path = 'test.png';
        $media = $this->originalStorage->createMedia($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $this->assertInstanceOf(Media::class, $media);
        $this->assertSame($path, $media->getPath());
        $this->assertTrue($this->originalFilesystem->fileExists($path));
        $this->assertSame(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH), $this->originalFilesystem->read($path));
    }

    public function testCreateMediaFromBinary(): void
    {
        $path = 'test.png';
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $media = $this->originalStorage->createMediaFromBinary($path, $binary);

        $this->assertInstanceOf(Media::class, $media);
        $this->assertSame($path, $media->getPath());
        $this->assertTrue($this->originalFilesystem->fileExists($path));
        $this->assertSame(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH), $this->originalFilesystem->read($path));
    }

    public function testCreateMediaWithABinaryReplacedByAListener(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                $event->binary = $event->binary->withContent('sanitized content');
            },
        );

        $path = 'test.png';
        $media = $this->originalStorage->createMedia($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $this->assertSame('sanitized content', $this->originalFilesystem->read($path));
        $this->assertSame('sanitized content', $media->getBinary()->getContent());
        // the replacement keeps the mime type and format guessed from the uploaded content
        $this->assertSame('image/png', $media->getBinary()->getMimeType());
    }

    public function testCreateMediaFromBinaryWithABinaryReplacedByAListener(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                $event->binary = $event->binary->withContent('sanitized content');
            },
        );

        $path = 'test.png';
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $media = $this->originalStorage->createMediaFromBinary($path, $binary);

        $this->assertSame('sanitized content', $this->originalFilesystem->read($path));
        $this->assertSame('sanitized content', $media->getBinary()->getContent());
    }

    public function testCreateMediaFromBinaryWithAListenerLeavingTheBinaryUntouched(): void
    {
        $seen = null;
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event) use (&$seen): void {
                $seen = $event->path;
            },
        );

        $path = 'test.png';
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $media = $this->originalStorage->createMediaFromBinary($path, new Binary('image/png', Format::PNG->value, $content));

        $this->assertSame($path, $seen);
        $this->assertSame($content, $this->originalFilesystem->read($path));
        $this->assertSame($content, $media->getBinary()->getContent());
    }

    public function testCreateMediaFromBinaryIsAbortedWhenAListenerThrows(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                throw new \RuntimeException('This media is not acceptable');
            },
        );

        $path = 'test.png';
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        try {
            $this->expectException(\RuntimeException::class);
            $this->expectExceptionMessage('This media is not acceptable');
            $this->originalStorage->createMediaFromBinary($path, $binary);
        } finally {
            $this->assertFalse($this->originalFilesystem->fileExists($path), 'Nothing should have been written to the storage.');
        }
    }

    public function testStoreAdoptsTheBinaryReplacedByAListener(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                $event->binary = $event->binary->withContent('sanitized content');
            },
        );

        $path = 'test.png';
        $binary = new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $media = new Media($path, $this->originalStorage, $binary);
        $media->store();

        $this->assertSame('sanitized content', $this->originalFilesystem->read($path));
        $this->assertSame('sanitized content', $media->getBinary()->getContent());
    }

    #[DataProvider('provideForbiddenTrashPaths')]
    public function testCreateMediaInTheTrashDirectoryIsForbidden(string $path): void
    {
        $this->expectException(ForbiddenPathException::class);
        $this->expectExceptionMessage('The path ".trash" is reserved.');

        try {
            $this->originalStorage->createMedia($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        } finally {
            $this->assertFalse($this->originalFilesystem->fileExists($path));
        }
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function provideForbiddenTrashPaths(): iterable
    {
        yield 'the trash directory itself' => ['.trash'];
        yield 'a file in the trash directory' => ['.trash/test.png'];
        yield 'a file in a subfolder of the trash directory' => ['.trash/sub/folder/test.png'];
        yield 'a non normalized path' => ['/.trash/test.png'];
    }

    public function testGetBinary(): void
    {
        $path = 'test.png';
        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $binary = $this->originalStorage->get($path);

        $this->assertInstanceOf(Binary::class, $binary);
        $this->assertSame(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH), $binary->getContent());
        $this->assertSame('image/png', $binary->getMimeType());
        $this->assertSame(Format::PNG->value, $binary->getFormat());
    }

    public function testGetFileSize(): void
    {
        $path = 'test.png';
        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $this->assertSame(\strlen(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH)), $this->originalStorage->getFileSize($path));
    }

    public function testGetMimeType(): void
    {
        $path = 'test.png';
        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $this->assertSame('image/png', $this->originalStorage->getMimeType($path));
    }

    public function testGetUrl(): void
    {
        $path = 'test.png';
        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $this->assertSame('/media/test.png', $this->originalStorage->getUrl($path));
    }

    public function testHas(): void
    {
        $path = 'test.png';
        $this->assertFalse($this->originalStorage->has($path));

        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $this->assertTrue($this->originalStorage->has($path));
    }

    public function testListFiles(): void
    {
        $this->originalFilesystem->write('test1.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $this->originalFilesystem->write('test2.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $this->originalFilesystem->createDirectory('subdir');
        $this->originalFilesystem->write('subdir/test3.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $files = $this->originalStorage->listFiles('');
        $this->assertCount(3, $files);
        $this->assertContains('test1.png', $files);
        $this->assertContains('test2.png', $files);
        $this->assertContains('subdir/test3.png', $files);
    }

    public function testListMedias(): void
    {
        $this->originalFilesystem->write('test1.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));
        $this->originalFilesystem->write('test2.png', BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $medias = $this->originalStorage->listMedias('');
        $this->assertCount(2, $medias);
        $this->assertInstanceOf(Media::class, $medias[0]);
        $this->assertInstanceOf(Media::class, $medias[1]);
    }

    public function testResolve(): void
    {
        $path = 'test.png';
        $this->originalFilesystem->write($path, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH));

        $media = $this->originalStorage->resolve($path);
        $this->assertInstanceOf(Media::class, $media);
        $this->assertSame($path, $media->getPath());
    }
}
