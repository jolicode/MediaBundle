<?php

namespace JoliCode\MediaBundle\Exception;

class MediaInUseException extends \RuntimeException
{
    public function __construct(
        private readonly string $path,
        private readonly string $entityName,
        private readonly string $propertyName,
    ) {
        parent::__construct($this->format());
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getEntityName(): string
    {
        return $this->entityName;
    }

    public function getPropertyName(): string
    {
        return $this->propertyName;
    }

    private function format(): string
    {
        return \sprintf(
            'The media "%s" is used in the "%s" field of the "%s" entity. It cannot be deleted.',
            $this->path,
            $this->propertyName,
            $this->entityName,
        );
    }
}
