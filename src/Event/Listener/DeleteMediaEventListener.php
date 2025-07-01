<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Event\Listener;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManagerInterface;
use JoliCode\MediaBundle\Cache\MediaEntityMetadataWarmer;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Event\PostDeleteMediaEvent;
use JoliCode\MediaBundle\Event\PreDeleteMediaEvent;
use JoliCode\MediaBundle\Exception\MediaInUseException;
use Symfony\Contracts\Cache\CacheInterface;

readonly class DeleteMediaEventListener
{
    public function __construct(
        private Registry $managerRegistry,
        private CacheInterface $cache,
    ) {
    }

    public function onMediaPreDelete(PreDeleteMediaEvent $event): void
    {
        /**
         * @var array<string, array<class-string, array<string, Strategy>>> $metadata
         */
        $metadata = $this->cache->get(MediaEntityMetadataWarmer::MEDIA_DELETE_BEHAVIORS_CACHE_KEY, fn (): array => []);
        $mediaType = new MediaType();

        foreach ($metadata as $objectManagerName => $entities) {
            /** @var EntityManagerInterface $objectManager */
            $objectManager = $this->managerRegistry->getManager($objectManagerName);
            $path = (string) $mediaType->convertToDatabaseValue($event->path, $objectManager->getConnection()->getDatabasePlatform());

            foreach ($entities as $className => $entityMetadata) {
                $repository = $objectManager->getRepository($className);

                foreach ($entityMetadata as $fieldName => $strategy) {
                    if (Strategy::RESTRICT === $strategy) {
                        $object = $repository->findOneBy([$fieldName => $path]);

                        if (null !== $object) {
                            throw new MediaInUseException($path, $className, $fieldName);
                        }
                    }
                }
            }
        }
    }

    public function onMediaPostDelete(PostDeleteMediaEvent $event): void
    {
        $objectManagers = [];
        $mediaType = new MediaType();

        try {
            /**
             * @var array<string, array<class-string, array<string, Strategy>>> $metadata
             */
            $metadata = $this->cache->get(MediaEntityMetadataWarmer::MEDIA_DELETE_BEHAVIORS_CACHE_KEY, fn (): array => []);

            foreach ($metadata as $objectManagerName => $entities) {
                /** @var EntityManagerInterface $objectManager */
                $objectManager = $this->managerRegistry->getManager($objectManagerName);
                $objectManagers[] = $objectManager;

                $path = (string) $mediaType->convertToDatabaseValue($event->path, $objectManager->getConnection()->getDatabasePlatform());
                $objectManager->getConnection()->beginTransaction();

                foreach ($entities as $className => $entityMetadata) {
                    $repository = $objectManager->getRepository($className);

                    foreach ($entityMetadata as $fieldName => $strategy) {
                        if (Strategy::SET_NULL === $strategy) {
                            $repository->createQueryBuilder('e')
                                ->update()
                                ->set('e.' . $fieldName, 'NULL')
                                ->where(\sprintf('e.%s = :path', $fieldName))
                                ->setParameter('path', $path)
                                ->getQuery()
                                ->execute()
                            ;
                        }
                    }
                }
            }

            // Commit the transaction if all operations were successful
            foreach ($objectManagers as $objectManager) {
                $objectManager->getConnection()->commit();
            }
        } catch (\Throwable $throwable) {
            foreach ($objectManagers as $objectManager) {
                // Rollback the transaction in case of an error
                $objectManager->getConnection()->rollBack();
            }

            throw $throwable;
        }
    }
}
