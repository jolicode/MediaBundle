<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use League\Flysystem\UnableToGenerateTemporaryUrl;

class CacheStorageTest extends BaseTestCase
{
    public function testGetFilesystem(): void
    {
        $this->assertSame($this->cacheFilesystem, $this->cacheStorage->getFilesystem());
    }

    public function testGetTemporaryUrlSignsTheStoragePath(): void
    {
        $temporaryUrlGenerator = new RecordingTemporaryUrlGenerator();
        $cacheStorage = $this->createCacheStorage('default', $this->createFilesystem($temporaryUrlGenerator), '/cache', $this->urlGenerator);

        $url = $cacheStorage->getTemporaryUrl('folder/test.png', $this->variation);

        // the signed path is the storage path (variation folder + hashed file
        // name), not the URL slug nor the /cache URL prefix
        $expectedPath = 'thumbnail/folder/test.' . hash('crc32', 'folder/test.png') . '.webp';
        $this->assertSame($expectedPath, $temporaryUrlGenerator->calls[0]['path']);
        $this->assertStringStartsWith('https://signed.example.com/' . $expectedPath . '?expires=', $url);
    }

    public function testGetTemporaryUrlExpiresInOneHourByDefault(): void
    {
        $temporaryUrlGenerator = new RecordingTemporaryUrlGenerator();
        $cacheStorage = $this->createCacheStorage('default', $this->createFilesystem($temporaryUrlGenerator), '/cache', $this->urlGenerator);

        $cacheStorage->getTemporaryUrl('test.png', $this->variation);

        $this->assertEqualsWithDelta(time() + 3600, $temporaryUrlGenerator->calls[0]['expiresAt']->getTimestamp(), 10);
    }

    public function testGetTemporaryUrlThrowsWhenTheAdapterDoesNotSupportIt(): void
    {
        $this->expectException(UnableToGenerateTemporaryUrl::class);

        $this->cacheStorage->getTemporaryUrl('test.png', $this->variation);
    }

    public function testStoreHonorsTheFilesystemVisibility(): void
    {
        $filesystem = $this->createFilesystem(config: ['visibility' => 'private', 'directory_visibility' => 'private']);
        $cacheStorage = $this->createCacheStorage('default', $filesystem, '/cache', $this->urlGenerator);
        // the Library constructor wires itself into both storages
        new Library('default', $this->originalStorage, $cacheStorage, $this->createVariationContainer($cacheStorage));

        $media = new Media('test.jpg', $this->originalStorage, self::getFixtureBinary('jpeg'));
        $mediaVariation = new MediaVariation($media, $this->variation, self::getFixtureBinary('webp'));
        $mediaVariation->store();

        $this->assertSame('private', $filesystem->visibility($cacheStorage->getPath('test.jpg', $this->variation)));
    }
}
