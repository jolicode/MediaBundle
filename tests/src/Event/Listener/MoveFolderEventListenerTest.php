<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Exception\PathAlreadyExistsException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Tests\Application\Entity\Article;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use League\Flysystem\UnableToMoveFile;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;

class MoveFolderEventListenerTest extends WebTestCase
{
    private AbstractPlatform $platform;

    private MediaType $mediaType;

    private EntityRepository $articleRepository;

    private EntityRepository $pageRepository;

    private OriginalStorage $originalStorage;

    private EntityManagerInterface $entityManager;

    protected function setUp(): void
    {
        parent::setUp();
        $container = static::getContainer();

        /** @var EntityManagerInterface $entityManager */
        $entityManager = $container->get(EntityManagerInterface::class);
        $this->entityManager = $entityManager;

        $this->mediaType = new MediaType();
        $this->platform = $entityManager->getConnection()->getDatabasePlatform();
        $this->articleRepository = $entityManager->getRepository(Article::class);
        $this->pageRepository = $entityManager->getRepository(Page::class);

        /** @var LibraryContainer $libraries */
        $libraries = $container->get('joli_media.library_container');
        $this->originalStorage = $libraries->get('default')->getOriginalStorage();

        if (self::$kernel instanceof Kernel) {
            $application = new Application(self::$kernel);
            $application->setAutoExit(false);
            $application->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --no-interaction --quiet'));
        }
    }

    /**
     * @return string[]
     */
    public static function provideFromPaths(): array
    {
        return [
            'sub/folder/deep',
            '/sub/folder/deep',
            'sub//folder/deep',
            '/sub//folder/deep',
            '////sub//folder///deep',
            'sub/folder/deep/',
            '/sub/folder/deep/',
            'sub//folder/deep/',
            '/sub//folder/deep/',
            '////sub//folder///deep/',
            'sub/folder/deep////',
            '/sub/folder/deep////',
            'sub//folder/deep////',
            '/sub//folder/deep////',
            '////sub//folder///deep////',
        ];
    }

    /**
     * @return string[]
     */
    public static function provideToPaths(): array
    {
        return [
            'sub/folder/deep-2',
            '/sub/folder/deep-2',
            'sub//folder/deep-2',
            '/sub//folder/deep-2',
            '////sub//folder///deep-2',
            'sub/folder/deep-2/new-folder',
            'other-folder',
            '//other-folder//',
            'sub/folder/deep-2/',
            '/sub/folder/deep-2/',
            'sub//folder/deep-2/',
            '/sub//folder/deep-2/',
            '////sub//folder///deep-2/',
            'sub/folder/deep-2/new-folder/',
            'other-folder/',
            '//other-folder///',
        ];
    }

    /**
     * @return string[]
     */
    public static function provideForbiddenToPaths(): array
    {
        return [
            'sub',
            'sub/folder',
            'sub/folder/deep',
            'sub/folder/deep/new-folder',
            '',
            '/sub',
            '/sub/folder',
            '/sub/folder/deep',
            '/sub/folder/deep/new-folder',
            '/',
            'sub/',
            'sub/folder/',
            'sub/folder/deep/',
            'sub/folder/deep/new-folder/',
            '//',
            '/sub/',
            '/sub/folder/',
            '/sub/folder/deep/',
            '/sub/folder/deep/new-folder/',
            '///',
        ];
    }

    public static function provideMediaMoveSuccessPaths(): \Generator
    {
        $input = self::provideFromPaths();
        $output = self::provideToPaths();

        foreach ($input as $from) {
            foreach ($output as $to) {
                yield [$from, $to];
            }
        }
    }

    public static function provideMediaMoveFailPaths(): \Generator
    {
        $input = self::provideFromPaths();
        $output = self::provideForbiddenToPaths();

        foreach ($input as $from) {
            foreach ($output as $to) {
                yield [$from, $to];
            }
        }
    }

    #[DataProvider('provideMediaMoveSuccessPaths')]
    public function testFolderMove(string $from, string $to): void
    {
        $fixedFrom = $this->mediaType->convertToDatabaseValue($from, $this->platform);
        $fixedTo = $this->mediaType->convertToDatabaseValue($to, $this->platform);

        // retrieve entities that use the media
        /** @var Article[] */
        $articles = $this->articleRepository->findBy(['media' => $fixedFrom . '/test.txt']);
        /** @var Page[] */
        $pages = $this->pageRepository->findBy(['mediaDefault' => $fixedFrom . '/test.txt']);

        $this->originalStorage->moveFolder($from, $to);

        // Check storage
        $this->assertFalse($this->originalStorage->has($from . '/test.txt'), \sprintf('Media should not exist at old path %s.', $from));
        $this->assertTrue($this->originalStorage->has($to . '/test.txt'), \sprintf('Media should exist at new path %s.', $to));

        // check that entities have been updated
        foreach ($articles as $article) {
            $this->entityManager->refresh($article);
            $media = $article->media;
            $this->assertInstanceOf(Media::class, $media, 'Article media should be an instance of the Media class.');
            $this->assertSame($fixedTo . '/test.txt', $media->getPath(), \sprintf('Article media should be updated to %s.', $fixedTo));
        }

        foreach ($pages as $page) {
            $this->entityManager->refresh($page);
            $media = $page->getMediaDefault();
            $this->assertInstanceOf(Media::class, $media, 'Article media should be an instance of the Media class.');
            $this->assertSame($fixedTo . '/test.txt', $media->getPath(), \sprintf('Page mediaDefault should be updated to %s.', $fixedTo));
        }

        $articles = $this->articleRepository->findBy(['media' => $fixedFrom . '/test.txt']);
        $pages = $this->pageRepository->findBy(['mediaDefault' => $fixedFrom . '/test.txt']);
        $this->assertCount(0, $articles, \sprintf('No Article should use the media at old path %s.', $fixedFrom));
        $this->assertCount(0, $pages, \sprintf('No Page should use the media at old path %s.', $fixedFrom));
    }

    #[DataProvider('provideMediaMoveFailPaths')]
    public function testFolderForbiddenMove(string $from, string $to): void
    {
        $fixedFrom = $this->mediaType->convertToDatabaseValue($from, $this->platform);
        $fixedTo = $this->mediaType->convertToDatabaseValue($to, $this->platform);

        // retrieve entities that use the media
        /** @var Article[] */
        $articles = $this->articleRepository->findBy(['media' => $fixedFrom . '/test.txt']);
        /** @var Page[] */
        $pages = $this->pageRepository->findBy(['mediaDefault' => $fixedFrom . '/test.txt']);

        try {
            $this->originalStorage->moveFolder($from, $to);
        } catch (PathAlreadyExistsException $e) {
            $this->assertStringContainsString('already exists in the library', $e->getMessage(), \sprintf('Expected exception message for moving folder from %s to %s.', $from, $to));
        } catch (UnableToMoveFile) {
        } finally {
            if ($fixedFrom !== $fixedTo) {
                // Check storage
                $this->assertTrue($this->originalStorage->has($from . '/test.txt'), \sprintf('Media should exist at old path %s.', $from));
                $this->assertFalse($this->originalStorage->has($to . '/test.txt'), \sprintf('Media should not exist at new path %s.', $to));

                // check that entities have not been updated
                foreach ($articles as $article) {
                    $this->entityManager->refresh($article);
                    $media = $article->media;
                    $this->assertInstanceOf(Media::class, $media, 'Article media should be an instance of the Media class.');
                    $this->assertSame($fixedFrom . '/test.txt', $media->getPath(), 'Article media should not have been updated.');
                }

                foreach ($pages as $page) {
                    $this->entityManager->refresh($page);
                    $media = $page->getMediaDefault();
                    $this->assertInstanceOf(Media::class, $media, 'Article media should be an instance of the Media class.');
                    $this->assertSame($fixedFrom . '/test.txt', $media->getPath(), 'Page mediaDefault should not have been updated.');
                }
            }
        }
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
