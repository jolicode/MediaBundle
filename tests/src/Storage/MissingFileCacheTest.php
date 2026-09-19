<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Storage\MediaPropertyAccessor;
use JoliCode\MediaBundle\Storage\MediaVariationPropertyAccessor;
use JoliCode\MediaBundle\Storage\Strategy\FolderStorageStrategy;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Mime\FileBinaryMimeTypeGuesser;
use Symfony\Component\Mime\MimeTypes;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class MissingFileCacheTest extends TestCase
{
    private Filesystem $filesystem;

    /**
     * @var array<string, int> key is the cache key, value is the lifetime given to the cache item
     */
    private array $lifetimes = [];

    private MediaPropertyAccessor $mediaPropertyAccessor;

    private MediaVariationPropertyAccessor $mediaVariationPropertyAccessor;

    private Variation $variation;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem(new InMemoryFilesystemAdapter());
        $this->lifetimes = [];
        $this->variation = new Variation('thumbnail', Format::JPEG, new TransformerChain([]));

        $cache = $this->createMock(CacheInterface::class);
        $cache->method('get')->willReturnCallback(function (string $key, callable $callback) {
            $item = $this->createMock(ItemInterface::class);
            $item->method('expiresAfter')->willReturnCallback(function (int $lifetime) use ($item, $key): ItemInterface {
                $this->lifetimes[$key] = $lifetime;

                return $item;
            });

            return $callback($item);
        });
        $mimeTypeGuesser = new MimeTypeGuesser(new MimeTypes(), new FileBinaryMimeTypeGuesser());

        $this->mediaPropertyAccessor = new MediaPropertyAccessor('default', $this->filesystem, $mimeTypeGuesser, $cache);
        $this->mediaVariationPropertyAccessor = new MediaVariationPropertyAccessor('default', new FolderStorageStrategy(), $this->filesystem, $mimeTypeGuesser, $cache);
    }

    public function testThePropertiesOfAMissingMediaExpireEarly(): void
    {
        self::assertFalse($this->mediaPropertyAccessor->getPixelDimensions('missing.jpg'));
        self::assertSame(0, $this->mediaPropertyAccessor->getFileSize('missing.jpg'));
        self::assertSame(60, $this->getLifetime('pixel_dimensions'));
        self::assertSame(60, $this->getLifetime('mime_type'));
        self::assertSame(60, $this->getLifetime('filesize'));
        self::assertSame(60, $this->getLifetime('lastModified'));
    }

    public function testThePropertiesOfAStoredMediaDoNotExpireEarly(): void
    {
        $this->filesystem->write('stored.jpg', BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));

        self::assertNotFalse($this->mediaPropertyAccessor->getPixelDimensions('stored.jpg'));
        self::assertNull($this->getLifetime('pixel_dimensions'));
        self::assertSame(3600 * 24, $this->getLifetime('lastModified'));
    }

    public function testTheLastModifiedTimestampOfAMissingMediaIsStable(): void
    {
        $timestamp = $this->mediaPropertyAccessor->getLastModified('missing.jpg');

        self::assertSame(0, $timestamp % 3600);
        self::assertLessThanOrEqual(time(), $timestamp);
        self::assertGreaterThan(time() - 3600, $timestamp);
    }

    public function testThePropertiesOfAMissingMediaVariationExpireEarly(): void
    {
        self::assertFalse($this->mediaVariationPropertyAccessor->getPixelDimensions('missing.jpg', $this->variation));
        self::assertSame(0, $this->mediaVariationPropertyAccessor->getFileSize('missing.jpg', $this->variation));
        self::assertSame(60, $this->getLifetime('pixel_dimensions'));
        self::assertSame(60, $this->getLifetime('mime_type'));
        self::assertSame(60, $this->getLifetime('filesize'));
        self::assertSame(60, $this->getLifetime('lastModified'));
    }

    public function testThePropertiesOfAStoredMediaVariationDoNotExpireEarly(): void
    {
        $this->filesystem->write(
            (new FolderStorageStrategy())->getPath('stored.jpg', $this->variation),
            BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH),
        );

        self::assertNotFalse($this->mediaVariationPropertyAccessor->getPixelDimensions('stored.jpg', $this->variation));
        self::assertNull($this->getLifetime('pixel_dimensions'));
        self::assertSame(3600 * 24, $this->getLifetime('lastModified'));
    }

    public function testTheLastModifiedTimestampOfAMissingMediaVariationIsStable(): void
    {
        $timestamp = $this->mediaVariationPropertyAccessor->getLastModified('missing.jpg', $this->variation);

        self::assertSame(0, $timestamp % 3600);
        self::assertLessThanOrEqual(time(), $timestamp);
        self::assertGreaterThan(time() - 3600, $timestamp);
    }

    private function getLifetime(string $property): ?int
    {
        foreach ($this->lifetimes as $key => $lifetime) {
            if (str_ends_with($key, '_' . $property)) {
                return $lifetime;
            }
        }

        return null;
    }
}
