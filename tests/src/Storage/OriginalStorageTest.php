<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;

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
