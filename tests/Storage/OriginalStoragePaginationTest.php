<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\MediaPropertyAccessor;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Storage\Strategy\IdentityStorageStrategy;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use PHPUnit\Framework\TestCase;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\Routing\Generator\UrlGenerator;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\RouteCollection;

class OriginalStoragePaginationTest extends TestCase
{
    private OriginalStorage $storage;
    private Filesystem $filesystem;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem(new InMemoryFilesystemAdapter());

        $urlGenerator = new UrlGenerator(new RouteCollection(), new RequestContext());
        $mimeTypeGuesser = $this->createMock(MimeTypeGuesser::class);
        $mimeTypeGuesser->method('guessMimeTypeFromContent')->willReturn('image/jpeg');
        $mimeTypeGuesser->method('getPossibleExtension')->willReturn('jpg');

        $eventDispatcher = new EventDispatcher();
        $mediaPropertyAccessor = $this->createMock(MediaPropertyAccessor::class);
        $mediaPropertyAccessor->method('getFileSize')->willReturn(1024);
        $mediaPropertyAccessor->method('getMimeType')->willReturn('image/jpeg');
        $mediaPropertyAccessor->method('getFormat')->willReturn('jpg');
        $mediaPropertyAccessor->method('getLastModified')->willReturn(time());

        $this->storage = new OriginalStorage(
            new IdentityStorageStrategy(),
            $this->filesystem,
            '/media',
            false,
            '.trash',
            $urlGenerator,
            $mimeTypeGuesser,
            $eventDispatcher,
            $mediaPropertyAccessor
        );

        $library = $this->createMock(Library::class);
        $this->storage->setLibrary($library);
    }

    public function testListMediasPaginatedFirstPage(): void
    {
        $this->createTestFiles(25);

        $result = $this->storage->listMediasPaginated(null, null, false, 1, 10);

        $this->assertIsArray($result);
        $this->assertArrayHasKey('items', $result);
        $this->assertArrayHasKey('total', $result);
        $this->assertArrayHasKey('page', $result);
        $this->assertArrayHasKey('perPage', $result);
        $this->assertArrayHasKey('totalPages', $result);

        $this->assertCount(10, $result['items']);
        $this->assertEquals(25, $result['total']);
        $this->assertEquals(1, $result['page']);
        $this->assertEquals(10, $result['perPage']);
        $this->assertEquals(3, $result['totalPages']);

        $this->assertContainsOnlyInstancesOf(Media::class, $result['items']);
    }

    public function testListMediasPaginatedLastPage(): void
    {
        $this->createTestFiles(25);

        $result = $this->storage->listMediasPaginated(null, null, false, 3, 10);

        $this->assertCount(5, $result['items']);
        $this->assertEquals(3, $result['page']);
        $this->assertEquals(25, $result['total']);
    }

    public function testListMediasPaginatedPageOutOfRange(): void
    {
        $this->createTestFiles(25);

        $result = $this->storage->listMediasPaginated(null, null, false, 999, 10);

        $this->assertEquals(3, $result['page']);
        $this->assertCount(5, $result['items']);
    }

    public function testListMediasPaginatedEmptyResults(): void
    {
        $result = $this->storage->listMediasPaginated(null, null, false, 1, 10);

        $this->assertCount(0, $result['items']);
        $this->assertEquals(0, $result['total']);
        $this->assertEquals(1, $result['page']);
        $this->assertEquals(0, $result['totalPages']);
    }

    public function testListMediasPaginatedDifferentPerPage(): void
    {
        $this->createTestFiles(100);

        $result20 = $this->storage->listMediasPaginated(null, null, false, 1, 20);
        $result50 = $this->storage->listMediasPaginated(null, null, false, 1, 50);

        $this->assertCount(20, $result20['items']);
        $this->assertEquals(5, $result20['totalPages']);

        $this->assertCount(50, $result50['items']);
        $this->assertEquals(2, $result50['totalPages']);
    }

    public function testListMediasPaginatedWithPath(): void
    {
        $this->filesystem->createDirectory('subfolder');
        $this->filesystem->write('subfolder/image1.jpg', 'content');
        $this->filesystem->write('subfolder/image2.jpg', 'content');
        $this->filesystem->write('image3.jpg', 'content');

        $result = $this->storage->listMediasPaginated('subfolder', null, false, 1, 10);

        $this->assertEquals(2, $result['total']);
        $this->assertCount(2, $result['items']);
    }

    private function createTestFiles(int $count): void
    {
        for ($i = 1; $i <= $count; ++$i) {
            $this->filesystem->write("image{$i}.jpg", 'test content');
        }
    }
}
