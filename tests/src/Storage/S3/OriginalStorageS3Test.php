<?php

namespace JoliCode\MediaBundle\Tests\Storage\S3;

use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Model\Media;
use League\Flysystem\UnableToMoveFile;
use PHPUnit\Framework\Attributes\Group;

#[Group('s3')]
class OriginalStorageS3Test extends S3TestCase
{
    public function testCreateMediaWritesTheOriginalOnTheBucket(): void
    {
        $content = self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH);

        $media = $this->originalStorage->createMedia('folder/test.png', $content);

        $this->assertTrue($this->originalStorage->has('folder/test.png'));
        $this->assertSame($content, $this->originalStorage->get('folder/test.png')->getContent());
        $this->assertSame('image/png', $media->getMimeType());
        $this->assertSame(\strlen($content), $media->getFileSize());
        $this->assertSame([], array_values(array_filter(
            $this->listKeys(),
            static fn (string $key): bool => !str_starts_with($key, 'fs1/'),
        )), 'The original must be written under the filesystem prefix only.');
    }

    public function testVariationIsStoredWithItsContentType(): void
    {
        $media = $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $mediaVariation = $media->createVariation('thumbnail');

        $this->converter->convertMediaVariation($mediaVariation);

        $key = 'fs2/' . $this->cacheStorage->getPath('test.png', $this->variation);
        $this->assertSame('image/webp', $this->s3Client->headObject(['Bucket' => $this->bucket, 'Key' => $key])['ContentType']);
    }

    public function testDirectories(): void
    {
        $this->originalStorage->createDirectory('empty');
        $this->originalStorage->createMedia('folder/sub/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $this->assertTrue($this->originalStorage->hasDirectory('empty'));
        $this->assertTrue($this->originalStorage->hasDirectory('folder/sub'));
        $this->assertSame(['empty', 'folder'], $this->originalStorage->listDirectories(recursive: false));
        $this->assertSame(['folder/sub'], $this->originalStorage->listDirectories('folder', recursive: false));
        $this->assertSame(['folder/sub/test.png'], array_map(
            static fn (Media $media): string => $media->getPath(),
            $this->originalStorage->listMedias('folder', recursive: true),
        ));
    }

    public function testRecursiveDirectoryListingIncludesImplicitFolders(): void
    {
        // S3 has no directories: a folder only exists through the keys it prefixes
        $this->originalStorage->createMedia('folder/sub/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $this->assertSame(['folder', 'folder/sub'], $this->originalStorage->listDirectories());
    }

    public function testMove(): void
    {
        $media = $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->converter->convertMediaVariation($media->createVariation('thumbnail'));

        $this->originalStorage->move('test.png', 'moved.png');

        $this->assertFalse($this->originalStorage->has('test.png'));
        $this->assertTrue($this->originalStorage->has('moved.png'));
        $this->assertFalse($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testMoveFolder(): void
    {
        $this->originalStorage->createMedia('folder/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $this->originalStorage->moveFolder('folder', 'moved');

        $this->assertFalse($this->originalStorage->has('folder/test.png'));
        $this->assertTrue($this->originalStorage->has('moved/test.png'));
    }

    public function testMoveFolderKeepsItsEmptySubfolders(): void
    {
        $this->originalStorage->createDirectory('folder/empty');

        $this->originalStorage->moveFolder('folder', 'moved');

        $this->assertTrue($this->originalStorage->hasDirectory('moved/empty'));
        $this->assertFalse($this->originalStorage->hasDirectory('folder'));
    }

    public function testMoveFolderIntoItselfIsRefused(): void
    {
        $this->originalStorage->createMedia('folder/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        try {
            $this->originalStorage->moveFolder('folder', 'folder/sub');
            $this->fail('Moving a folder into itself must be refused.');
        } catch (UnableToMoveFile) {
        }

        $this->assertTrue($this->originalStorage->has('folder/test.png'));
        $this->assertFalse($this->originalStorage->hasDirectory('folder/sub'));
    }

    public function testMovingTheRootFolderIsRefused(): void
    {
        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        try {
            $this->originalStorage->moveFolder('/', 'moved');
            $this->fail('Moving the root folder must be refused.');
        } catch (UnableToMoveFile) {
        }

        $this->assertTrue($this->originalStorage->has('test.png'));
    }

    public function testDeleteDirectoryDeletesTheMediasAndTheirVariations(): void
    {
        $media = $this->originalStorage->createMedia('folder/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->converter->convertMediaVariation($media->createVariation('thumbnail'));

        $this->originalStorage->deleteDirectory('folder');

        $this->assertFalse($this->originalStorage->hasDirectory('folder'));
        $this->assertFalse($this->cacheStorage->has('folder/test.png', $this->variation));
        $this->assertSame([], $this->listKeys());
    }

    public function testDeleteDirectoryWithAPostDeleteListener(): void
    {
        $this->originalStorage->createMedia('folder/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->eventDispatcher->addListener(MediaEvents::POST_DELETE_FOLDER, static function (): void {});

        $this->originalStorage->deleteDirectory('folder');

        $this->assertFalse($this->originalStorage->has('folder/test.png'));
        $this->assertSame([], $this->listKeys());
    }

    public function testDeleteDirectoryIsRolledBackWhenAListenerFails(): void
    {
        $this->originalStorage->createMedia('folder/test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->eventDispatcher->addListener(MediaEvents::POST_DELETE_FOLDER, static function (): void {
            throw new \RuntimeException('The folder is in use.');
        });

        try {
            $this->originalStorage->deleteDirectory('folder');
            $this->fail('The listener exception must be rethrown.');
        } catch (\RuntimeException) {
        }

        $this->assertTrue($this->originalStorage->has('folder/test.png'));
        $this->assertSame([], array_values(array_filter(
            $this->listKeys(),
            static fn (string $key): bool => str_starts_with($key, 'fs1/.trash'),
        )));
    }

    public function testDeleteWithAPostDeleteListener(): void
    {
        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->eventDispatcher->addListener(MediaEvents::POST_DELETE_MEDIA, static function (): void {});

        $this->originalStorage->delete('test.png');

        $this->assertFalse($this->originalStorage->has('test.png'));
        $this->assertSame([], $this->listKeys());
    }

    /**
     * @return list<string>
     */
    private function listKeys(): array
    {
        $keys = [];

        foreach ($this->s3Client->getPaginator('ListObjectsV2', ['Bucket' => $this->bucket]) as $page) {
            foreach ($page['Contents'] ?? [] as $object) {
                $keys[] = $object['Key'];
            }
        }

        return $keys;
    }
}
