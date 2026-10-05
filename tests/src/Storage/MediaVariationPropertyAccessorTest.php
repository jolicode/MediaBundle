<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Model\Format;
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

class MediaVariationPropertyAccessorTest extends TestCase
{
    private Filesystem $filesystem;

    private MediaVariationPropertyAccessor $accessor;

    private string $storagePath;

    private Variation $variation;

    protected function setUp(): void
    {
        $this->filesystem = new Filesystem(new InMemoryFilesystemAdapter());
        $this->variation = new Variation('thumbnail', Format::WEBP, new TransformerChain([]));
        $strategy = new FolderStorageStrategy();
        $this->storagePath = $strategy->getPath('test.png', $this->variation);
        $this->accessor = new MediaVariationPropertyAccessor(
            'default',
            $strategy,
            $this->filesystem,
            new MimeTypeGuesser(new MimeTypes(), new FileBinaryMimeTypeGuesser()),
            new ArrayAdapter(),
        );
    }

    public function testAStoredVariationIsCached(): void
    {
        $this->filesystem->write($this->storagePath, 'content');
        self::assertTrue($this->accessor->isStored('test.png', $this->variation));

        $this->filesystem->delete($this->storagePath);

        self::assertTrue($this->accessor->isStored('test.png', $this->variation));
    }

    public function testAMissingVariationIsNotCached(): void
    {
        self::assertFalse($this->accessor->isStored('test.png', $this->variation));

        $this->filesystem->write($this->storagePath, 'content');

        self::assertTrue($this->accessor->isStored('test.png', $this->variation));
    }

    public function testClearCacheForgetsAStoredVariation(): void
    {
        $this->filesystem->write($this->storagePath, 'content');
        self::assertTrue($this->accessor->isStored('test.png', $this->variation));
        $this->filesystem->delete($this->storagePath);

        $this->accessor->clearCache('test.png', $this->variation);

        self::assertFalse($this->accessor->isStored('test.png', $this->variation));
    }
}
