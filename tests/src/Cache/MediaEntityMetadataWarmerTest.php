<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Cache;

use Doctrine\Bundle\DoctrineBundle\CacheWarmer\DoctrineMetadataCacheWarmer;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use JoliCode\MediaBundle\Cache\MediaEntityMetadataWarmer;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class MediaEntityMetadataWarmerTest extends KernelTestCase
{
    public function testDoctrineMetadataCacheWarmerCanRunAfterwards(): void
    {
        self::bootKernel();
        $container = static::getContainer();

        /** @var MediaEntityMetadataWarmer $warmer */
        $warmer = $container->get('joli_media.cache_warmer.media_entity_metadata');
        $cacheDir = static::$kernel->getCacheDir();

        $warmer->warmUp($cacheDir);

        // DoctrineBundle's own metadata warmer is optional, so it runs after this
        // one — and it refuses to warm a metadata factory that already holds
        // loaded metadata (LogicException "must load metadata first").
        /** @var ManagerRegistry $registry */
        $registry = $container->get('doctrine');
        /** @var EntityManagerInterface $entityManager */
        $entityManager = $registry->getManager();
        self::assertSame([], $entityManager->getMetadataFactory()->getLoadedMetadata());

        $phpArrayFile = $cacheDir . '/doctrine_metadata_warmer_test.php';
        if (file_exists($phpArrayFile)) {
            unlink($phpArrayFile);
        }

        (new DoctrineMetadataCacheWarmer($entityManager, $phpArrayFile))->warmUp($cacheDir);

        self::assertFileExists($phpArrayFile);
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
