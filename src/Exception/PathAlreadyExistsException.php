<?php

namespace JoliCode\MediaBundle\Exception;

use JoliCode\MediaBundle\Storage\OriginalStorage;

class PathAlreadyExistsException extends \RuntimeException
{
    public function __construct(
        private readonly OriginalStorage $storage,
        private readonly string $path,
    ) {
        parent::__construct();
        $this->message = \sprintf(
            'The path "%s" already exists in the library "%s".',
            $this->path,
            $this->storage->getLibrary()->getName()
        );
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getStorage(): OriginalStorage
    {
        return $this->storage;
    }
}
