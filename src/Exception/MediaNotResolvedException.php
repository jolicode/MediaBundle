<?php

namespace JoliCode\MediaBundle\Exception;

use JoliCode\MediaBundle\Model\NullMedia;

class MediaNotResolvedException extends \LogicException
{
    private readonly string $path;

    private readonly string $libraryName;

    public function __construct(
        string $message = '',
        ?NullMedia $media = null,
        ?string $path = null,
        ?string $libraryName = null,
    ) {
        if ($media instanceof NullMedia) {
            if (null !== $path || null !== $libraryName) {
                throw new \InvalidArgumentException('You must provide either a media or a path, not both');
            }

            $this->path = $media->getPath();
            $this->libraryName = $media->getLibrary()->getName();
        } else {
            if (null === $path || null === $libraryName) {
                throw new \InvalidArgumentException('You must provide either a media or a path and library name');
            }

            $this->path = $path;
            $this->libraryName = $libraryName;
        }

        parent::__construct(\sprintf('%s (path: %s, library: %s)', $message, $this->path, $this->libraryName));
    }
}
