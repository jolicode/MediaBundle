<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Event\Listener;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Cache\MediaEntityMetadata;
use JoliCode\MediaBundle\Cache\MediaEntityMetadataWarmer;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Event\PostMoveMediaEvent;
use Symfony\Contracts\Cache\CacheInterface;

readonly class MoveMediaEventListener
{
    public function __construct(
        private Registry $managerRegistry,
        private CacheInterface $cache,
    ) {
    }

    public function onMediaPostMove(PostMoveMediaEvent $event): void
    {
        /**
         * @var MediaEntityMetadata[] $metadata
         */
        $metadata = $this->cache->get(MediaEntityMetadataWarmer::MEDIA_FIELDS_CACHE_KEY, fn (): array => []);
        $mediaType = new MediaType();
        $objectManagers = [];

        try {
            foreach ($metadata as $field) {
                if (!\array_key_exists($field->objectManagerName, $objectManagers)) {
                    /** @var EntityManagerInterface $objectManager */
                    $objectManager = $this->managerRegistry->getManager($field->objectManagerName);
                    $objectManagers[$field->objectManagerName] = $objectManager;
                    $objectManager->getConnection()->beginTransaction();
                } else {
                    $objectManager = $objectManagers[$field->objectManagerName];
                }

                $to = (string) $mediaType->convertToDatabaseValue($event->to, $objectManager->getConnection()->getDatabasePlatform());
                $from = (string) $mediaType->convertToDatabaseValue($event->from, $objectManager->getConnection()->getDatabasePlatform());

                /** @var EntityRepository */
                $repository = $objectManager->getRepository($field->entityName);
                $repository
                    ->createQueryBuilder('e')
                    ->update()
                    ->set(\sprintf('e.%s', $field->fieldName), ':to')
                    ->where(\sprintf('e.%s = :from', $field->fieldName))
                    ->setParameter('from', $from)
                    ->setParameter('to', $to)
                    ->getQuery()
                    ->execute()
                ;
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
