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
     * Implements the same logic as EasyAdmin's EntityPaginator.
     *
     * @return iterable<int|null>
     */
    public function getPageRange(?int $pagesOnEachSide = null, ?int $pagesOnEdges = null): iterable
    {
        $pagesOnEachSide ??= 2;
        $pagesOnEdges ??= 1;

        $lastPage = $this->getLastPage();
        $currentPage = $this->currentPage;

        if ($lastPage <= 1) {
            return [];
        }

        // Calculate the range of pages to show
        $startPage = max(1, $currentPage - $pagesOnEachSide);
        $endPage = min($lastPage, $currentPage + $pagesOnEachSide);

        $pages = [];

        // Add first pages
        if ($startPage > 1 + $pagesOnEdges) {
            for ($i = 1; $i <= $pagesOnEdges; ++$i) {
                $pages[] = $i;
            }

            // Add ellipsis if there's a gap
            if ($startPage > $pagesOnEdges + 2) {
                $pages[] = null;
            } elseif ($startPage === $pagesOnEdges + 2) {
                $pages[] = $pagesOnEdges + 1;
            }
        } else {
            for ($i = 1; $i < $startPage; ++$i) {
                $pages[] = $i;
            }
        }

        // Add middle pages (around current page)
        for ($i = $startPage; $i <= $endPage; ++$i) {
            $pages[] = $i;
        }

        // Add last pages
        if ($endPage < $lastPage - $pagesOnEdges) {
            // Add ellipsis if there's a gap
            if ($endPage < $lastPage - $pagesOnEdges - 1) {
                $pages[] = null;
            } elseif ($endPage === $lastPage - $pagesOnEdges - 1) {
                $pages[] = $lastPage - $pagesOnEdges;
            }

            for ($i = $lastPage - $pagesOnEdges + 1; $i <= $lastPage; ++$i) {
                $pages[] = $i;
            }
        } else {
            for ($i = $endPage + 1; $i <= $lastPage; ++$i) {
                $pages[] = $i;
            }
        }

        return $pages;
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
