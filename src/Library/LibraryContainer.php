<?php

namespace JoliCode\MediaBundle\Library;

use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ServiceLocator;

class LibraryContainer
{
    public function __construct(
        private readonly ServiceLocator $libraries,
        private ?string $defaultLibraryName = null,
        private readonly ?LoggerInterface $logger = null,
    ) {
        if (0 === $libraries->count()) {
            $this->logger?->warning('No library has been defined in the MediaBundle configuration. Please add one to be able to use the bundle features.');
        }

        if (null === $this->defaultLibraryName && $libraries->count() > 0) {
            $names = array_keys($libraries->getProvidedServices());
            $this->defaultLibraryName = $names[0];
        }

        if (null !== $this->defaultLibraryName && !$this->has($this->defaultLibraryName)) {
            throw new \InvalidArgumentException(\sprintf('Library "%s" not found.', $this->defaultLibraryName));
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
        if (null === $this->defaultLibraryName) {
            throw new \InvalidArgumentException('The default library is not defined');
        }

        return $this->get($this->defaultLibraryName);
    }

    public function getDefaultName(): string
    {
        if (null === $this->defaultLibraryName) {
            throw new \InvalidArgumentException('The default library is not defined');
        }

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
