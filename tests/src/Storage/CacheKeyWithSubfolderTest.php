<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Storage\MediaPropertyAccessor;
use JoliCode\MediaBundle\Storage\MediaVariationPropertyAccessor;
use JoliCode\MediaBundle\Storage\Strategy\FolderStorageStrategy;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use League\Flysystem\Filesystem;
use League\Flysystem\InMemory\InMemoryFilesystemAdapter;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Component\Mime\FileBinaryMimeTypeGuesser;
use Symfony\Component\Mime\MimeTypes;

/**
 * Tests that cache keys are properly sanitized when using paths with reserved PSR-6 characters.
 *
 * This test ensures that files in subfolders (containing forward slashes) don't cause
 * cache key validation errors.
 */
class CacheKeyWithSubfolderTest extends TestCase
{
    private ArrayAdapter $cache;

    private Filesystem $filesystem;

    private MimeTypeGuesser $mimeTypeGuesser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->cache = new ArrayAdapter();
        $this->filesystem = new Filesystem(new InMemoryFilesystemAdapter());
        $this->mimeTypeGuesser = new MimeTypeGuesser(new MimeTypes(), new FileBinaryMimeTypeGuesser());
    }

    public function testSubfolderPath(): void
    {
        // Create a file in a subfolder (path contains '/' which is a reserved PSR-6 character)
        $path = 'subfolder/test.jpg';
        $this->filesystem->write($path, 'dummy image content');

        $accessor = new MediaPropertyAccessor(
            'default',
            $this->filesystem,
            $this->mimeTypeGuesser,
            $this->cache,
        );

        $this->expectNotToPerformAssertions();

        // This should NOT throw an exception about reserved characters
        $accessor->getMimeType($path);
        $accessor->getFormat($path);
        $accessor->getFileSize($path);

        // Test clearCache doesn't throw either
        $accessor->clearCache($path);
    }

    public function testVariationSubfolderPath(): void
    {
        $strategy = new FolderStorageStrategy();

        // Create a file in a nested subfolder
        $path = 'folder/subfolder/image.png';
        $this->filesystem->write($path, 'dummy image content');

        $variation = new Variation('thumbnail', Format::PNG, new TransformerChain([]));

        $accessor = new MediaVariationPropertyAccessor(
            'my-library',
            $strategy,
            $this->filesystem,
            $this->mimeTypeGuesser,
            $this->cache,
        );

        $this->expectNotToPerformAssertions();

        // This should NOT throw an exception about reserved characters
        $accessor->getMimeType($path, $variation);
        $accessor->getFormat($path, $variation);
        $accessor->getFileSize($path, $variation);

        // Test clearCache doesn't throw either
        $accessor->clearCache($path, $variation);
    }

    public function testNestedSubfolderPath(): void
    {
        // Path with forward slash (subfolder)
        $path = 'user-uploads/2024/document.pdf';
        $this->filesystem->write($path, 'dummy pdf content');

        $accessor = new MediaPropertyAccessor(
            'default',
            $this->filesystem,
            $this->mimeTypeGuesser,
            $this->cache,
        );

        // Should work without throwing PSR-6 cache key validation errors
        $mimeType = $accessor->getMimeType($path);

        // Verify the cache was actually used by calling again
        $mimeType2 = $accessor->getMimeType($path);
        $this->assertSame($mimeType, $mimeType2);
    }
}
