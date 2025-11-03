<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Tests\Application\Entity\Article;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;

class MoveMediaEventListenerTest extends WebTestCase
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
            'sub/folder/deep/test.txt',
            '/sub/folder/deep/test.txt',
            'sub//folder/deep/test.txt',
            '/sub//folder/deep/test.txt',
            '////sub//folder///deep/test.txt',
        ];
    }

    /**
     * @return string[]
     */
    public static function provideToPaths(): array
    {
        return [
            'sub/folder/deep/test-2.txt',
            '/sub/folder/deep/test-2.txt',
            'sub//folder/deep/test-2.txt',
            '/sub//folder/deep/test-2.txt',
            '////sub//folder///deep/test-2.txt',
            'sub/folder/deep/new-folder/test-2.txt',
            'other-folder/test-2.txt',
            '//other-folder///test-2.txt',
        ];
    }

    #[DataProvider('provideMediaMovePaths')]
    public function testMediaMove(string $from, string $to): void
    {
        $fixedFrom = $this->mediaType->convertToDatabaseValue($from, $this->platform);
        $fixedTo = $this->mediaType->convertToDatabaseValue($to, $this->platform);

        // retrieve entities that use the media
        /** @var Article[] */
        $articles = $this->articleRepository->findBy(['media' => $fixedFrom]);
        /** @var Page[] */
        $pages = $this->pageRepository->findBy(['mediaDefault' => $fixedFrom]);

        $this->originalStorage->move($from, $to);

        // Check storage
        $this->assertFalse($this->originalStorage->has($from), \sprintf('Media should not exist at old path %s.', $from));
        $this->assertTrue($this->originalStorage->has($to), \sprintf('Media should exist at new path %s.', $to));

        // check that entities have been updated
        foreach ($articles as $article) {
            $this->entityManager->refresh($article);
            $media = $article->media;
            $this->assertInstanceOf(Media::class, $media, 'Page mediaDefault should be an instance of Media.');
            $this->assertSame($fixedTo, $media->getPath(), \sprintf('Article media should be updated to %s.', $fixedTo));
        }

        foreach ($pages as $page) {
            $this->entityManager->refresh($page);
            $media = $page->getMediaDefault();
            $this->assertInstanceOf(Media::class, $media, 'Page mediaDefault should be an instance of Media.');
            $this->assertSame($fixedTo, $media->getPath(), \sprintf('Page mediaDefault should be updated to %s.', $fixedTo));
        }

        $articles = $this->articleRepository->findBy(['media' => $fixedFrom]);
        $pages = $this->pageRepository->findBy(['mediaDefault' => $fixedFrom]);
        $this->assertCount(0, $articles, \sprintf('No Article should use the media at old path %s.', $fixedFrom));
        $this->assertCount(0, $pages, \sprintf('No Page should use the media at old path %s.', $fixedFrom));
    }

    public static function provideMediaMovePaths(): \Generator
    {
        $input = self::provideFromPaths();
        $output = self::provideToPaths();

        foreach ($input as $from) {
            foreach ($output as $to) {
                yield [$from, $to];
            }
        }
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
