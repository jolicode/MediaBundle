<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Pager;

use JoliCode\MediaBundle\Model\Media;
use Sonata\AdminBundle\Datagrid\PagerInterface;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;

/**
 * Pager adapter for media files to work with Sonata Admin's pagination.
 * This adapter provides the same interface as Sonata's Pager
 * but works with array data instead of Doctrine entities.
 *
 * Note: This class implements PagerInterface which includes query-related methods
 * (getQuery/setQuery) that are not applicable for array-based pagination.
 * These methods are implemented as no-ops to satisfy the interface contract.
 */
class MediaPager implements PagerInterface
{
    private int $page = 1;

    private int $maxPerPage = 50;

    private int $maxPageLinks = 7;

    private int $countResults = 0;

    /**
     * @var array<Media>
     */
    private array $results = [];

    private ?string $routeName = null;

    private ?string $currentKey = null;

    public function init(): void
    {
        // Nothing to initialize for array-based pagination
    }

    /**
     * @param array{items: array<Media>, total: int, page: int, perPage: int} $paginationData
     */
    public function paginate(array $paginationData, string $routeName, string $currentKey): self
    {
        $this->page = $paginationData['page'];
        $this->maxPerPage = $paginationData['perPage'];
        $this->countResults = $paginationData['total'];
        $this->results = $paginationData['items'];
        $this->routeName = $routeName;
        $this->currentKey = $currentKey;

        return $this;
    }

    public function getMaxPerPage(): int
    {
        return $this->maxPerPage;
    }

    public function setMaxPerPage(int $max): void
    {
        $this->maxPerPage = $max;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function setPage(int $page): void
    {
        $this->page = $page;
    }

    public function getNextPage(): int
    {
        return min($this->getLastPage(), $this->page + 1);
    }

    public function getPreviousPage(): int
    {
        return max(1, $this->page - 1);
    }

    public function getFirstPage(): int
    {
        return 1;
    }

    public function isFirstPage(): bool
    {
        return 1 === $this->page;
    }

    public function getLastPage(): int
    {
        return (int) ceil($this->countResults / $this->maxPerPage);
    }

    public function isLastPage(): bool
    {
        return $this->page >= $this->getLastPage();
    }

    public function getQuery(): ?ProxyQueryInterface
    {
        return null;
    }

    /**
     * {@inheritdoc}
     *
     * Note: This method is a no-op as this pager works with array data, not database queries.
     * MediaPager uses array-based pagination and does not work with ProxyQueryInterface.
     *
     * @throws \LogicException if called (optional: you can add this exception for fail-fast behavior)
     */
    public function setQuery(ProxyQueryInterface $query): void
    {
        // No-op: MediaPager uses array-based pagination, not database queries
    }

    public function haveToPaginate(): bool
    {
        return $this->countResults > $this->maxPerPage;
    }

    public function getCurrentPageResults(): iterable
    {
        return $this->results;
    }

    public function countResults(): int
    {
        return $this->countResults;
    }

    /**
     * Returns an array of page numbers to use in pagination links.
     *
     * @param int|null $nbLinks The maximum number of page numbers to return
     *
     * @return int[]
     */
    public function getLinks(?int $nbLinks = null): array
    {
        if (null === $nbLinks) {
            $nbLinks = $this->getMaxPageLinks();
        }

        $links = [];
        $lastPage = $this->getLastPage();

        if ($lastPage <= 1) {
            return [];
        }

        // Calculate how many pages to show on each side of current page
        $pagesOnEachSide = (int) floor(($nbLinks - 1) / 2);

        $startPage = max(1, $this->page - $pagesOnEachSide);
        $endPage = min($lastPage, $this->page + $pagesOnEachSide);

        // Adjust if we're near the beginning or end
        if ($this->page <= $pagesOnEachSide) {
            $endPage = min($lastPage, $nbLinks);
        }

        if ($this->page >= $lastPage - $pagesOnEachSide) {
            $startPage = max(1, $lastPage - $nbLinks + 1);
        }

        for ($i = $startPage; $i <= $endPage; ++$i) {
            $links[] = $i;
        }

        return $links;
    }

    public function setMaxPageLinks(int $maxPageLinks): void
    {
        $this->maxPageLinks = $maxPageLinks;
    }

    public function getMaxPageLinks(): int
    {
        return $this->maxPageLinks;
    }

    public function getRouteName(): string
    {
        return $this->routeName ?? '';
    }

    public function getCurrentKey(): string
    {
        return $this->currentKey ?? '';
    }
}
