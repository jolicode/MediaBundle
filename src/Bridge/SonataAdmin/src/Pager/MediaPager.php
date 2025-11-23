<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Pager;

use JoliCode\MediaBundle\Model\Media;
use Sonata\AdminBundle\Datagrid\Pager;

/**
 * Pager adapter for media files to work with Sonata Admin's pagination.
 * Extends Sonata's Pager class to reuse all pagination logic,
 * but works with array data instead of Doctrine entities.
 *
 * Note: This class does not use ProxyQueryInterface as it works with array-based data.
 * The query-related methods (getQuery/setQuery) are inherited from the parent class
 * but return/accept null since we don't have database queries.
 */
class MediaPager extends Pager
{
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
        $this->setPage($paginationData['page']);
        $this->setMaxPerPage($paginationData['perPage']);
        $this->countResults = $paginationData['total'];
        $this->results = $paginationData['items'];
        $this->routeName = $routeName;
        $this->currentKey = $currentKey;

        // Calculate and set last page
        $lastPage = $this->maxPerPage > 0 ? (int) ceil($this->countResults / $this->maxPerPage) : 1;
        $this->setLastPage($lastPage);

        return $this;
    }

    public function getCurrentPageResults(): iterable
    {
        return $this->results;
    }

    public function countResults(): int
    {
        return $this->countResults;
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
