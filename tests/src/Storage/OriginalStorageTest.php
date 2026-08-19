<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Event\PostDeleteFolderEvent;
use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\OriginalStorage;
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

    public function testDeleteDirectoryForbidsTrashPathWithTrailingSlash(): void
    {
        $storage = $this->createStorageWithTrashPath('trash/');
        $this->originalFilesystem->createDirectory('trash');

        $this->expectException(ForbiddenPathException::class);
        $storage->deleteDirectory('trash');
    }

    public function testListDirectoriesHidesTrashPathWithTrailingSlash(): void
    {
        $storage = $this->createStorageWithTrashPath('trash/');
        $this->originalFilesystem->createDirectory('trash/sub');
        $this->originalFilesystem->createDirectory('visible');

        $directories = $storage->listDirectories('');

        $this->assertContains('visible', $directories);
        $this->assertNotContains('trash', $directories);
        $this->assertNotContains('trash/sub', $directories);
        $this->assertSame('trash', $storage->getTrashPath());
    }

    public function testMoveFolderForbidsTrashPathWithTrailingSlash(): void
    {
        $storage = $this->createStorageWithTrashPath('trash/');
        $this->originalFilesystem->createDirectory('trash');

        $this->expectException(ForbiddenPathException::class);
        $storage->moveFolder('trash', 'elsewhere');
    }

    public function testDeletingTheTrashDirectoryIsForbiddenWhenAPostDeleteFolderListenerIsRegistered(): void
    {
        // a listener is what makes deleteDirectory() go through the trash directory,
        // where it used to move the trash into itself - see #157
        $this->eventDispatcher->addListener(
            MediaEvents::POST_DELETE_FOLDER,
            static function (PostDeleteFolderEvent $event): void {
            },
        );
        $storage = $this->createStorageWithTrashPath('trash/');
        $this->originalFilesystem->write('trash/abcdef/deleted.png', 'content');

        try {
            $this->expectException(ForbiddenPathException::class);
            $this->expectExceptionMessage('The path "trash" is reserved.');
            $storage->deleteDirectory('trash');
        } finally {
            $this->assertTrue($this->originalFilesystem->fileExists('trash/abcdef/deleted.png'), 'The trash content must be left untouched.');
        }
    }

    #[DataProvider('provideForbiddenTrashPaths')]
    public function testDeletingAMediaInTheTrashDirectoryIsForbidden(string $path): void
    {
        $this->expectException(ForbiddenPathException::class);
        $this->expectExceptionMessage('The path ".trash" is reserved.');

        $this->originalStorage->delete($path);
    }

    public function testListDirectoriesHidesTheTrashAndItsDescendants(): void
    {
        $this->originalFilesystem->createDirectory('.trash/abcdef/sub');
        $this->originalFilesystem->createDirectory('visible/sub');

        $directories = $this->originalStorage->listDirectories('');

        $this->assertSame(['visible', 'visible/sub'], $directories);
    }

    public function testListFilesHidesTheTrashContents(): void
    {
        $this->originalFilesystem->write('.trash/abcdef/deleted.png', 'content');
        $this->originalFilesystem->write('kept.png', 'content');

        $this->assertSame(['kept.png'], $this->originalStorage->listFiles(''));
    }

    public function testListMediasHidesTheTrashContents(): void
    {
        $this->originalFilesystem->write('.trash/abcdef/deleted.png', 'content');
        $this->originalFilesystem->write('kept.png', 'content');

        $medias = $this->originalStorage->listMedias('');

        $this->assertCount(1, $medias);
        $this->assertSame('kept.png', $medias[0]->getPath());
        $this->assertSame(1, $this->originalStorage->listMediasPaginated('', recursive: true)['total']);
    }

    #[DataProvider('provideTrashPaths')]
    public function testIsTrashPath(string $path, bool $expected): void
    {
        $this->assertSame($expected, $this->originalStorage->isTrashPath($path));
    }

    /**
     * @return iterable<string, array{string, bool}>
     */
    public static function provideTrashPaths(): iterable
    {
        yield 'the trash directory itself' => ['.trash', true];
        yield 'a trailing slash' => ['.trash/', true];
        yield 'a leading slash' => ['/.trash', true];
        yield 'a leading dot segment' => ['./.trash', true];
        yield 'a file in the trash directory' => ['.trash/x/y.png', true];
        yield 'a directory sharing the trash prefix' => ['.trashy', false];
        yield 'an unrelated directory' => ['other', false];
        yield 'the storage root' => ['', false];
    }

    public function testTheTrashPathCannotBeEmpty(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('The trash path cannot be empty.');

        $this->createStorageWithTrashPath('/');
    }

    private function createStorageWithTrashPath(string $trashPath): OriginalStorage
    {
        $storage = $this->createOriginalStorage(
            'default',
            $this->originalFilesystem,
            '/media',
            $this->urlGenerator,
            $trashPath,
        );
        $cacheStorage = $this->createCacheStorage('default', $this->createFilesystem(), '/cache', $this->urlGenerator);
        // the Library constructor wires itself into both storages
        new Library('default', $storage, $cacheStorage, $this->createVariationContainer($cacheStorage));

        return $storage;
    }
}
