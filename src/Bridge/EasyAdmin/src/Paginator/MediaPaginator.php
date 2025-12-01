<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Paginator;

use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use JoliCode\MediaBundle\Model\Media;

/**
 * Paginator adapter for media files to work with EasyAdmin's pagination template.
 * This adapter provides the same interface as EasyAdmin's EntityPaginator
 * but works with array data instead of Doctrine entities.
 */
class MediaPaginator
{
    private int $currentPage;

    private int $pageSize;

    private int $numResults;

    /**
     * @var array<Media>
     */
    private array $results;

    private string $routeName;

    private string $currentKey;

    public function __construct(
        private readonly AdminUrlGenerator $adminUrlGenerator,
    ) {
    }

    /**
     * @param array{items: array<Media>, total: int, page: int, perPage: int} $paginationData
     */
    public function paginate(array $paginationData, string $routeName, string $currentKey): self
    {
        $this->currentPage = $paginationData['page'];
        $this->pageSize = $paginationData['perPage'];
        $this->numResults = $paginationData['total'];
        $this->results = $paginationData['items'];
        $this->routeName = $routeName;
        $this->currentKey = $currentKey;

        return $this;
    }

    public function generateUrlForPage(int $page): string
    {
        return $this->adminUrlGenerator
            ->setRoute($this->routeName, ['key' => $this->currentKey])
            ->set('page', $page)
            ->generateUrl()
        ;
    }

    public function getCurrentPage(): int
    {
        return $this->currentPage;
    }

    public function getLastPage(): int
    {
        return (int) ceil($this->numResults / $this->pageSize);
    }

    /**
     * Returns the page range for pagination display.
     *
     * Delegates to PageRangeCalculator which implements the same algorithm
     * as EasyAdmin's EntityPaginator for consistency.
     *
     * @return iterable<int|null>
     *
     * @see PageRangeCalculator::getPageRange()
     * @see \EasyCorp\Bundle\EasyAdminBundle\Orm\EntityPaginator::getPageRange()
     */
    public function getPageRange(?int $pagesOnEachSide = null, ?int $pagesOnEdges = null): iterable
    {
        return PageRangeCalculator::getPageRange(
            $this->getCurrentPage(),
            $this->getLastPage(),
            $pagesOnEachSide ?? 2,
            $pagesOnEdges ?? 1,
        );
    }

    public function getPageSize(): int
    {
        return $this->pageSize;
    }

    public function hasPreviousPage(): bool
    {
        return $this->currentPage > 1;
    }

    public function getPreviousPage(): int
    {
        return max(1, $this->currentPage - 1);
    }

    public function hasNextPage(): bool
    {
        return $this->currentPage < $this->getLastPage();
    }

    public function getNextPage(): int
    {
        return min($this->getLastPage(), $this->currentPage + 1);
    }

    public function hasToPaginate(): bool
    {
        return $this->numResults > $this->pageSize;
    }

    public function getNumResults(): int
    {
        return $this->numResults;
    }

    /**
     * @return array<Media>
     */
    public function getResults(): array
    {
        return $this->results;
    }
}
