<?php

namespace JoliCode\MediaBundle\Cache;

readonly class MediaEntityMetadata
{
    /**
     * @param class-string $entityName
     */
    public function __construct(
        public string $objectManagerName,
        public string $entityName,
        public string $fieldName,
    ) {
    }
}
