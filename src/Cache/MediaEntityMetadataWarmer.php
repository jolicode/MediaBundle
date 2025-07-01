<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Cache;

use Doctrine\Bundle\DoctrineBundle\Registry;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\Doctrine\Types;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;
use Symfony\Contracts\Cache\CacheInterface;

readonly class MediaEntityMetadataWarmer implements CacheWarmerInterface
{
    public const MEDIA_DELETE_BEHAVIORS_CACHE_KEY = 'joli_media.entity_metadata.media_delete_behaviors';

    public const MEDIA_FIELDS_CACHE_KEY = 'joli_media.entity_metadata.media_fields';

    public function __construct(
        private Registry $managerRegistry,
        private CacheInterface $cache,
    ) {
    }

    public function isOptional(): bool
    {
        return false;
    }

    public function warmUp(string $cacheDir, ?string $buildDir = null): array
    {
        $mediaDeleteBehaviors = [];
        $mediaFields = [];

        foreach ($this->managerRegistry->getManagers() as $objectManagerName => $objectManager) {
            foreach ($objectManager->getMetadataFactory()->getAllMetadata() as $classMetadata) {
                $entityMediaFields = [];

                foreach ($classMetadata->getFieldNames() as $fieldName) {
                    if (Types::MEDIA === $classMetadata->getTypeOfField($fieldName)) {
                        $mediaFields[] = new MediaEntityMetadata(
                            $objectManagerName,
                            $classMetadata->getName(),
                            $fieldName
                        );
                    }
                }

                foreach ($classMetadata->getReflectionClass()->getProperties() as $property) {
                    foreach ($property->getAttributes() as $attribute) {
                        if (MediaDeleteBehavior::class !== $attribute->getName()) {
                            continue;
                        }

                        /** @var MediaDeleteBehavior $instance */
                        $instance = $attribute->newInstance();
                        $fieldName = $property->getName();

                        if (!$classMetadata->hasField($fieldName) || Types::MEDIA !== $classMetadata->getTypeOfField($fieldName)) {
                            throw new \RuntimeException(\sprintf('The field "%s" of the entity "%s" is not defined as a media field.', $fieldName, $classMetadata->getName()));
                        }

                        $entityMediaFields[$fieldName] = $instance->strategy;
                    }
                }

                if ([] !== $entityMediaFields) {
                    $mediaDeleteBehaviors[$objectManagerName][$classMetadata->getName()] = $entityMediaFields;
                }
            }
        }

        $this->cache->delete(self::MEDIA_FIELDS_CACHE_KEY);
        $this->cache->get(self::MEDIA_FIELDS_CACHE_KEY, fn () => $mediaFields);

        $this->cache->delete(self::MEDIA_DELETE_BEHAVIORS_CACHE_KEY);
        $this->cache->get(self::MEDIA_DELETE_BEHAVIORS_CACHE_KEY, fn (): array => $mediaDeleteBehaviors);

        return [];
    }
}
