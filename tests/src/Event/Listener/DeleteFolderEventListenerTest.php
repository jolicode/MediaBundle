<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Exception\MediaInUseException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Tests\Application\Entity\Article;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;

class DeleteFolderEventListenerTest extends WebTestCase
{
    private EntityRepository $articleRepository;

    private EntityRepository $pageRepository;

    private OriginalStorage $originalStorage;

    protected function setUp(): void
    {
        parent::setUp();
        $container = static::getContainer();

        /** @var EntityManagerInterface */
        $entityManager = $container->get(EntityManagerInterface::class);
        $this->articleRepository = $entityManager->getRepository(Article::class);
        $this->pageRepository = $entityManager->getRepository(Page::class);

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $this->originalStorage = $libraries->get('default')->getOriginalStorage();

        if (self::$kernel instanceof Kernel) {
            $application = new Application(self::$kernel);
            $application->setAutoExit(false);
            $application->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --no-interaction --quiet'));
        }
    }

    #[DataProvider('provideFolderPaths')]
    public function testFolderDeleteWhenNoMediaInUse(string $folderPath): void
    {
        $baseFolderName = 'test-folder-empty';
        $fullFolderPath = $folderPath . '/' . $baseFolderName;

        $dummyFilePath = $fullFolderPath . '/dummy.txt';
        $this->originalStorage->createMedia($dummyFilePath, 'dummy content')->store();
        $this->assertTrue($this->originalStorage->has($dummyFilePath), \sprintf('Dummy file %s should exist after creation.', $dummyFilePath));

        $this->originalStorage->deleteDirectory($fullFolderPath);
        $this->assertFalse($this->originalStorage->has($dummyFilePath), \sprintf('Dummy file %s should not exist after folder deletion.', $dummyFilePath));
        $this->assertFalse($this->originalStorage->has($fullFolderPath), \sprintf('Folder %s should not exist after deletion.', $fullFolderPath));
    }

    #[DataProvider('provideFolderPaths')]
    public function testFolderDeleteWhenMediaInUseRestrict(string $folderPath): void
    {
        $filename = 'circle-pattern.png';
        $previousCount = $this->articleRepository->count([
            'media' => 'sub/folder/' . $filename,
        ]);

        try {
            $this->expectException(MediaInUseException::class);
            $this->expectExceptionMessage('The media "sub/folder/circle-pattern.png" is used in the "mediaRestrict" field of the "JoliCode\MediaBundle\Tests\Application\Entity\Page" entity. It cannot be deleted.');
            $this->originalStorage->deleteDirectory($folderPath);
        } finally {
            $this->assertTrue(
                $this->originalStorage->has('sub/folder/' . $filename),
                'The media should still exist in the storage when it is used by one entity with restrictions.',
            );

            $count = $this->articleRepository->count([
                'media' => 'sub/folder/' . $filename,
            ]);

            $this->assertSame($previousCount, $count, 'The media should not be detached from any entity when it is used by one entity with restrictions.');
        }
    }

    #[DataProvider('provideFolderPaths')]
    public function testFolderDeleteWhenMediaInUseSetNull(string $folderPath): void
    {
        $subfolder = 'deep';
        $filename = $subfolder . '/test.txt';

        $this->originalStorage->deleteDirectory($folderPath . '/' . $subfolder);

        $this->assertFalse(
            $this->originalStorage->has($folderPath . '/' . $filename),
            'The media should be deleted from the storage when it is not used in any protected field.',
        );

        $count = $this->pageRepository->count([
            'mediaDefault' => 'sub/folder/' . $filename,
        ]);
        $this->assertSame(1, $count, 'The media path should be let intact in entity fields that do not define a deletion behavior.');

        $count = $this->pageRepository->count([
            'mediaSetNull' => 'sub/folder/' . $filename,
        ]);
        $this->assertSame(0, $count, 'The media path should be set to null in all entities the define the SET_NULL deletion behavior.');

        $count = $this->articleRepository->count([
            'media' => 'sub/folder/' . $filename,
        ]);
        $this->assertSame(0, $count, 'The media path should be let intact in entity fields that do not define a deletion behavior.');
    }

    public static function provideFolderPaths(): \Generator
    {
        yield 'ok' => ['sub/folder'];
        yield 'leading_slash' => ['/sub/folder'];
        yield 'consecutive_slashes' => ['sub//folder'];
        yield 'consecutive_slashes_with_leading' => ['/sub//folder'];
        yield 'consecutive_slashes_with_leading_and_trailing' => ['/sub//folder/'];
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
