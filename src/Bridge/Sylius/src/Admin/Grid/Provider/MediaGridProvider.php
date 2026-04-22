<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\Provider;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\GridPageResolver;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use Pagerfanta\Adapter\FixedAdapter;
use Pagerfanta\Pagerfanta;
use Pagerfanta\PagerfantaInterface;
use Sylius\Component\Grid\Data\DataProviderInterface;
use Sylius\Component\Grid\Definition\Grid;
use Sylius\Component\Grid\Parameters;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

final readonly class MediaGridProvider implements DataProviderInterface
{
    private const ASC = 'asc';

    private const DESC = 'desc';

    public function __construct(
        private LibraryContainer $libraries,
        private RequestStack $requestStack,
    ) {
    }

    public function getData(Grid $grid, Parameters $parameters): PagerfantaInterface
    {
        $request = $this->requestStack->getCurrentRequest() ?? new Request();
        $key = $request->attributes->getString('key');
        $currentKey = Resolver::normalizePath($key);

        $criteria = $parameters->get('criteria');
        $recursive = !empty($criteria['search']['value'] ?? null);

        /** @var array<string, string> $sorting */
        $sorting = $parameters->get('sorting') ?? $grid->getSorting();

        try {
            $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                $currentKey,
                recursive: $recursive,
                page: $request->query->getInt('page', 1),
                perPage: GridPageResolver::getItemsPerPage($grid, $parameters),
                filter: $this->createFilteringCallback($criteria),
                sort: $this->createSortingCallback($sorting),
            );
        } catch (\OutOfRangeException) {
            throw new BadRequestException('The requested page number is out of range.');
        }

        return new Pagerfanta(new FixedAdapter($paginatedMedias['total'], $paginatedMedias['items']));
    }

    /**
     * @param array<string, mixed> $criteria
     */
    private function createFilteringCallback(array $criteria): ?\Closure
    {
        if (!empty($criteria['search']['value'] ?? null)) {
            $searchValue = $criteria['search']['value'];

            return static fn (Media $media): bool => str_contains(strtolower($media->getPath()), strtolower($searchValue));
        }

        return null;
    }

    /**
     * @param array<string, string> $sorting
     */
    private function createSortingCallback(array $sorting): ?\Closure
    {
        if (self::ASC === ($sorting['path'] ?? null)) {
            return static fn (Media $a, Media $b): int => $a->getPath() <=> $b->getPath();
        }

        if (self::DESC === ($sorting['path'] ?? null)) {
            return static fn (Media $a, Media $b): int => $b->getPath() <=> $a->getPath();
        }

        if (self::ASC === ($sorting['fileSize'] ?? null)) {
            return static fn (Media $a, Media $b): int => $a->getFileSize() <=> $b->getFileSize();
        }

        if (self::DESC === ($sorting['fileSize'] ?? null)) {
            return static fn (Media $a, Media $b): int => $b->getFileSize() <=> $a->getFileSize();
        }

        return null;
    }

    private function getOriginalStorage(): OriginalStorage
    {
        return $this->getLibrary()->getOriginalStorage();
    }

    private function getLibrary(): Library
    {
        return $this->libraries->getDefault();
    }
}
