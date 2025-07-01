<?php

namespace JoliCode\MediaBundle\Library;

use Symfony\Component\DependencyInjection\ServiceLocator;

class LibraryContainer
{
    public function __construct(
        private readonly ServiceLocator $libraries,
        private string $defaultLibraryName,
    ) {
        if (!$this->has($defaultLibraryName)) {
            throw new \InvalidArgumentException(\sprintf('Library "%s" not found.', $defaultLibraryName));
        }
    }

    public function get(?string $name = null): Library
    {
        if (null === $name) {
            return $this->getDefault();
        }

        if (!$this->has($name)) {
            throw new \InvalidArgumentException(\sprintf('Library "%s" not found.', $name));
        }

        return $this->libraries->get($name);
    }

    public function getDefault(): Library
    {
        return $this->get($this->defaultLibraryName);
    }

    public function getDefaultName(): string
    {
        return $this->defaultLibraryName;
    }

    public function has(string $name): bool
    {
        return $this->libraries->has($name);
    }

    /**
     * @return iterable<Library>
     */
    public function list(): iterable
    {
        return $this->libraries;
    }

    public function setDefaultLibraryName(string $defaultLibraryName): void
    {
        if (!$this->has($defaultLibraryName)) {
            throw new \InvalidArgumentException(\sprintf('Library "%s" not found.', $defaultLibraryName));
        }

        $this->defaultLibraryName = $defaultLibraryName;
    }
}
