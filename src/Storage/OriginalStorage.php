<?php

namespace JoliCode\MediaBundle\Storage;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Binary\MimeTypeGuesser;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Event\PostCreateFolderEvent;
use JoliCode\MediaBundle\Event\PostCreateMediaEvent;
use JoliCode\MediaBundle\Event\PostDeleteFolderEvent;
use JoliCode\MediaBundle\Event\PostDeleteMediaEvent;
use JoliCode\MediaBundle\Event\PostMoveFolderEvent;
use JoliCode\MediaBundle\Event\PostMoveMediaEvent;
use JoliCode\MediaBundle\Event\PreCreateFolderEvent;
use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
use JoliCode\MediaBundle\Event\PreDeleteFolderEvent;
use JoliCode\MediaBundle\Event\PreDeleteMediaEvent;
use JoliCode\MediaBundle\Event\PreMoveFolderEvent;
use JoliCode\MediaBundle\Event\PreMoveMediaEvent;
use JoliCode\MediaBundle\Event\PreResolveMediaEvent;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Exception\PathAlreadyExistsException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\Strategy\StorageStrategyInterface;
use League\Flysystem\Config;
use League\Flysystem\DirectoryListing;
use League\Flysystem\Filesystem;
use League\Flysystem\StorageAttributes;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class OriginalStorage
{
    private Library $library;

    public function __construct(
        private readonly StorageStrategyInterface $strategy,
        private readonly Filesystem $filesystem,
        private readonly string $urlPath,
        private readonly bool $enableServeUsingPhp,
        private readonly string $trashPath,
        private readonly UrlGeneratorInterface $urlGenerator,
        private readonly MimeTypeGuesser $mimeTypeGuesser,
        private readonly EventDispatcherInterface $dispatcher,
        private readonly MediaPropertyAccessor $mediaPropertyAccessor,
    ) {
    }

    public function __sleep(): array
    {
        return [
            'urlPath',
            'strategy',
        ];
    }

    public function createDirectory(string $path): void
    {
        $path = Resolver::normalizePath($path);

        if ($this->trashPath === $path || str_starts_with($path, $this->trashPath . '/')) {
            throw new ForbiddenPathException($this->trashPath);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_CREATE_FOLDER)) {
            $event = new PreCreateFolderEvent($this, $path);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_CREATE_FOLDER);
        }

        $this->filesystem->createDirectory($path);

        if ($this->dispatcher->hasListeners(MediaEvents::POST_CREATE_FOLDER)) {
            $event = new PostCreateFolderEvent($this, $path);
            $this->dispatcher->dispatch($event, MediaEvents::POST_CREATE_FOLDER);
        }
    }

    public function createMedia(string $path, string $content): Media
    {
        $mimeType = $this->mimeTypeGuesser->guessMimeTypeFromContent($content);
        $format = $this->mimeTypeGuesser->getPossibleExtension($mimeType);
        $binary = new Binary(
            $mimeType,
            $format,
            $content,
            $path,
        );

        return $this->createMediaFromBinary($path, $binary);
    }

    public function createMediaFromBinary(string $path, Binary $binary): Media
    {
        $path = Resolver::normalizePath($path);

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_CREATE_MEDIA)) {
            $event = new PreCreateMediaEvent($this, $path, $binary);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_CREATE_MEDIA);
        }

        $this->getLibrary()->deleteAllVariations($path);
        $this->filesystem->write($path, $binary->getContent(), [
            Config::OPTION_VISIBILITY => 'public',
            Config::OPTION_DIRECTORY_VISIBILITY => 'public',
        ]);
        $this->mediaPropertyAccessor->clearCache($path);
        $media = new Media($path, $this, $binary);

        if ($this->dispatcher->hasListeners(MediaEvents::POST_CREATE_MEDIA)) {
            $event = new PostCreateMediaEvent($this, $media);
            $this->dispatcher->dispatch($event, MediaEvents::POST_CREATE_MEDIA);
        }

        return $media;
    }

    public function delete(string $path): void
    {
        $path = Resolver::normalizePath($path);

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_DELETE_MEDIA)) {
            $event = new PreDeleteMediaEvent($this, $path);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_DELETE_MEDIA);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::POST_DELETE_MEDIA)) {
            // create a temporary path to avoid deleting the directory
            $trashDirectory = \sprintf('%s/%s', $this->trashPath, uniqid());
            $this->filesystem->createDirectory($trashDirectory);
            $trashPath = \sprintf('%s/%s', $trashDirectory, $path);
            $this->filesystem->move($path, $trashPath);

            try {
                $event = new PostDeleteMediaEvent($this, $path);
                $this->dispatcher->dispatch($event, MediaEvents::POST_DELETE_MEDIA);
            } catch (\Throwable $e) {
                // if an exception is thrown, we rollback the deletion
                $this->filesystem->move($trashPath, $path);
                $this->filesystem->deleteDirectory($trashDirectory);

                throw $e;
            }

            // if no exception was thrown, perform the deletion
            $this->filesystem->delete($trashPath);
            $this->mediaPropertyAccessor->clearCache($path);
            $this->library->deleteAllVariations(substr($trashPath, \strlen($trashDirectory) + 1));
            $this->filesystem->deleteDirectory($trashDirectory);
        } else {
            // if no event listeners, just delete the file and its variations
            $this->filesystem->delete($path);
            $this->mediaPropertyAccessor->clearCache($path);
            $this->library->deleteAllVariations($path);
        }
    }

    public function deleteDirectory(string $path): void
    {
        $path = Resolver::normalizePath($path);

        if ($this->trashPath === $path || str_starts_with($path, $this->trashPath . '/')) {
            throw new ForbiddenPathException($this->trashPath);
        }

        if ('' === $path) {
            throw new ForbiddenPathException($this->trashPath);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_DELETE_FOLDER)) {
            $event = new PreDeleteFolderEvent($this, $path);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_DELETE_FOLDER);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::POST_DELETE_FOLDER)) {
            // create a temporary path to avoid deleting the directory
            $trashDirectory = \sprintf('%s/%s', $this->trashPath, uniqid());
            $this->filesystem->createDirectory($trashDirectory);
            $trashPath = \sprintf('%s/%s', $trashDirectory, $path);
            $this->filesystem->move($path, $trashPath);

            try {
                $event = new PostDeleteFolderEvent($this, $path);
                $this->dispatcher->dispatch($event, MediaEvents::POST_DELETE_FOLDER);
            } catch (\Throwable $e) {
                // if an exception is thrown, we rollback the deletion
                $this->filesystem->move($trashPath, $path);
                $this->filesystem->deleteDirectory($trashDirectory);

                throw $e;
            }

            // if no exception was thrown, perform the deletion
            foreach ($this->listMedias($trashPath, recursive: true) as $media) {
                $this->delete($media->getPath());
                $realPath = substr($media->getPath(), \strlen($trashDirectory) + 1);
                $this->mediaPropertyAccessor->clearCache($realPath);
                $this->library->deleteAllVariations($realPath);
            }

            $this->filesystem->deleteDirectory($trashDirectory);
        } else {
            // if no event listeners, just delete the directory
            foreach ($this->listMedias($path, recursive: true) as $media) {
                $this->delete($media->getPath());
                $this->library->deleteAllVariations($media->getPath());
            }

            $this->filesystem->deleteDirectory($path);
        }
    }

    public function get(string $path): Binary
    {
        $path = $this->strategy->getPath($path);
        $mimeType = $this->getMimeType($path);
        $format = $this->mimeTypeGuesser->getPossibleExtension($mimeType);

        return new Binary(
            $mimeType,
            $format,
            $this->filesystem->read($path),
            $path,
        );
    }

    public function getFileSize(string $path): int
    {
        return $this->mediaPropertyAccessor->getFileSize($path);
    }

    public function getFilesystem(): Filesystem
    {
        return $this->filesystem;
    }

    public function getFormat(string $path): string
    {
        return $this->mediaPropertyAccessor->getFormat($path);
    }

    public function getMimeType(string $path): string
    {
        return $this->mediaPropertyAccessor->getMimeType($path);
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(string $path): array|false
    {
        return $this->mediaPropertyAccessor->getPixelDimensions($path);
    }

    public function getLastModified(string $path): int
    {
        return $this->mediaPropertyAccessor->getLastModified($path);
    }

    public function getLibrary(): Library
    {
        return $this->library;
    }

    public function getMediaPropertyAccessor(): MediaPropertyAccessor
    {
        return $this->mediaPropertyAccessor;
    }

    public function getStrategy(): StorageStrategyInterface
    {
        return $this->strategy;
    }

    public function getTrashPath(): string
    {
        return $this->trashPath;
    }

    public function getUrl(
        string $path,
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string {
        $parameters = [
            'slug' => $this->strategy->getFilePath(Resolver::normalizePath($path)),
        ];

        return $this->urlGenerator->generate(
            $this->getRouteName(),
            $parameters,
            $referenceType,
        );
    }

    public function getUrlPath(): string
    {
        return $this->urlPath;
    }

    public function has(string $path): bool
    {
        return $this->filesystem->fileExists($this->strategy->getPath($path));
    }

    public function hasDirectory(string $path): bool
    {
        return $this->filesystem->directoryExists($this->strategy->getPath($path));
    }

    public function isServeUsingPhpEnabled(): bool
    {
        return $this->enableServeUsingPhp;
    }

    /**
     * @return string[]
     */
    public function listDirectories(?string $path = null, ?string $contains = null, bool $recursive = true): array
    {
        return $this->list($path, $contains, 'dir', $recursive)
            ->filter(fn (StorageAttributes $attributes): bool => $this->trashPath !== $attributes->path())
            ->sortByPath()
            ->map(fn (StorageAttributes $attributes): string => $attributes->path())
            ->toArray()
        ;
    }

    /**
     * @return string[]
     */
    public function listFiles(?string $path = null, ?string $contains = null, bool $recursive = true): array
    {
        return $this->list($path, $contains, 'file', $recursive)
            ->sortByPath()
            ->map(fn (StorageAttributes $attributes): string => $attributes->path())
            ->toArray()
        ;
    }

    /**
     * @return Media[]
     */
    public function listMedias(?string $path = null, ?string $contains = null, bool $recursive = true): array
    {
        $listing = $this->list($path, $contains, 'file', $recursive)
            ->map(fn (StorageAttributes $attributes): Media => new Media(Resolver::normalizePath($attributes->path()), $this))
            ->toArray()
        ;

        if (!$recursive) {
            usort($listing, fn (Media $a, Media $b): int => strtolower($a->getPath()) <=> strtolower($b->getPath()));
        }

        return $listing;
    }

    /**
     * @return array{items: Media[], total: int, page: int, perPage: int, totalPages: int}
     */
    public function listMediasPaginated(
        ?string $path = null,
        ?string $contains = null,
        bool $recursive = false,
        int $page = 1,
        int $perPage = 50
    ): array {
        $allMedias = $this->listMedias($path, $contains, $recursive);

        $total = \count($allMedias);
        $totalPages = (int) ceil($total / $perPage);
        $page = max(1, min($page, $totalPages ?: 1));
        $offset = ($page - 1) * $perPage;

        $items = \array_slice($allMedias, $offset, $perPage);

        return [
            'items' => $items,
            'total' => $total,
            'page' => $page,
            'perPage' => $perPage,
            'totalPages' => $totalPages,
        ];
    }

    public function move(string $from, string $to): void
    {
        $from = Resolver::normalizePath($from);
        $to = Resolver::normalizePath($to);

        if ($this->trashPath === $to || str_starts_with($to, $this->trashPath . '/') || $this->trashPath === $from || str_starts_with($from, $this->trashPath . '/')) {
            throw new ForbiddenPathException($this->trashPath);
        }

        if ($this->has($to)) {
            throw new PathAlreadyExistsException($this, $to);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_MOVE_MEDIA)) {
            $event = new PreMoveMediaEvent($this, $from, $to);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_MOVE_MEDIA);
        }

        $this->filesystem->move($from, $to);

        if ($this->dispatcher->hasListeners(MediaEvents::POST_MOVE_MEDIA)) {
            try {
                $event = new PostMoveMediaEvent($this, $from, $to);
                $this->dispatcher->dispatch($event, MediaEvents::POST_MOVE_MEDIA);
            } catch (\Throwable $e) {
                // if an exception is thrown, we rollback the move
                $this->filesystem->move($to, $from);

                throw $e;
            }
        }

        $this->mediaPropertyAccessor->clearCache($from);
        $this->getLibrary()->deleteAllVariations($from);
    }

    public function moveFolder(string $from, string $to): void
    {
        $from = Resolver::normalizePath($from);
        $to = Resolver::normalizePath($to);

        if ($this->trashPath === $to || str_starts_with($to, $this->trashPath . '/') || $this->trashPath === $from || str_starts_with($from, $this->trashPath . '/')) {
            throw new ForbiddenPathException($this->trashPath);
        }

        if ($this->hasDirectory($to)) {
            throw new PathAlreadyExistsException($this, $to);
        }

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_MOVE_FOLDER)) {
            $event = new PreMoveFolderEvent($this, $from, $to);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_MOVE_FOLDER);
        }

        $this->filesystem->move($from, $to);

        if ($this->dispatcher->hasListeners(MediaEvents::POST_MOVE_FOLDER)) {
            try {
                $event = new PostMoveFolderEvent($this, $from, $to);
                $this->dispatcher->dispatch($event, MediaEvents::POST_MOVE_FOLDER);

                // if no exception was thrown, cleanup metadata and variations for all moved medias
                foreach ($this->listMedias($to, recursive: true) as $media) {
                    $realPath = \sprintf('%s/%s', $from, substr($media->getPath(), \strlen($to) + 1));
                    $this->mediaPropertyAccessor->clearCache($realPath);
                    $this->library->deleteAllVariations($realPath);
                }
            } catch (\Throwable $e) {
                // if an exception is thrown, we rollback the move
                $this->filesystem->move($to, $from);

                throw $e;
            }
        }
    }

    public function resolve(string $path): ?Media
    {
        $path = Resolver::normalizePath($path);

        if ($this->dispatcher->hasListeners(MediaEvents::PRE_RESOLVE_MEDIA)) {
            $event = new PreResolveMediaEvent($this, $path);
            $this->dispatcher->dispatch($event, MediaEvents::PRE_RESOLVE_MEDIA);
            $path = $event->path;
        }

        if ($this->has($path)) {
            return new Media($path, $this);
        }

        $urlPath = Resolver::normalizePath($this->urlPath) . '/';

        if (str_starts_with($path, $urlPath)) {
            // in many occasions, the provided path is the full URL path,
            // so we try to remove the URL path prefix
            $path = substr($path, \strlen($urlPath));

            if ($this->has($path)) {
                return new Media($path, $this);
            }
        }

        return null;
    }

    public function setLibrary(Library $library): void
    {
        $this->library = $library;
    }

    private function getRouteName(): string
    {
        return 'joli_media_original_' . $this->getLibrary()->getName();
    }

    private function list(
        ?string $path = null,
        ?string $contains = null,
        ?string $type = null,
        bool $recursive = true,
    ): DirectoryListing {
        $listing = $this->filesystem->listContents($this->strategy->getPath($path ?? ''), $recursive);

        if (null !== $type) {
            if ('file' === $type) {
                $listing = $listing->filter(fn (StorageAttributes $attributes): bool => $attributes->isFile());
            } elseif ('dir' === $type) {
                $listing = $listing->filter(fn (StorageAttributes $attributes): bool => $attributes->isDir());
            } else {
                throw new \InvalidArgumentException('Invalid type');
            }
        }

        if (null !== $path && '.' !== $path) {
            // @TODO check rather using the withPath() method
            $listing = $listing->filter(fn (StorageAttributes $attributes): bool => (bool) preg_match(
                '/^' . preg_quote($this->strategy->getPath($path), '/') . '/',
                $attributes->path(),
            ));
        }

        if (null !== $contains) {
            $listing = $listing->filter(fn (StorageAttributes $attributes): bool => (bool) preg_match(
                '/' . preg_quote($contains, '/') . '/',
                $attributes->path(),
            ));
        }

        return $listing;
    }
}
