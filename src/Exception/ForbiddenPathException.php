<?php

namespace JoliCode\MediaBundle\Exception;

class ForbiddenPathException extends \RuntimeException
{
    public function __construct(
        private readonly string $path,
    ) {
        parent::__construct();
        $this->message = \sprintf(
            'The path "%s" is reserved.',
            $this->path,
        );
    }

    public function getPath(): string
    {
        return $this->path;
    }
}
