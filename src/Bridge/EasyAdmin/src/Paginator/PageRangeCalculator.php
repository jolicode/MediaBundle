<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Paginator;

/**
 * Calculates page ranges for pagination display.
 *
 * This logic is extracted from EasyAdmin's EntityPaginator to provide
 * a reusable utility for array-based pagination that cannot use Doctrine QueryBuilder.
 *
 * The algorithm is inspired by Django's Paginator:
 * https://github.com/django/django/blob/main/django/core/paginator.py#L134
 *
 * @see \EasyCorp\Bundle\EasyAdminBundle\Orm\EntityPaginator::getPageRange()
 */
final class PageRangeCalculator
{
    /**
     * Calculate page range for pagination display with gaps and ellipsis.
     *
     * Example with currentPage=5, lastPage=20, pagesOnEachSide=2, pagesOnEdges=1:
     * Returns: [1, null, 3, 4, 5, 6, 7, null, 20]
     * Where null represents an ellipsis (gap in pagination).
     *
     * @param int $currentPage     The current page number
     * @param int $lastPage        The last page number
     * @param int $pagesOnEachSide Number of pages to show on each side of current page
     * @param int $pagesOnEdges    Number of pages to show at start/end edges
     *
     * @return iterable<int|null> Page numbers with null for gaps/ellipsis
     */
    public static function getPageRange(
        int $currentPage,
        int $lastPage,
        int $pagesOnEachSide = 2,
        int $pagesOnEdges = 1,
    ): iterable {
        if (0 === $pagesOnEachSide) {
            return;
        }

        if ($lastPage <= ($pagesOnEachSide + $pagesOnEdges) * 2) {
            yield from range(1, $lastPage);

            return;
        }

        if ($currentPage > ($pagesOnEachSide + $pagesOnEdges + 1)) {
            yield from range(1, $pagesOnEdges);
            yield null;
            yield from range($currentPage - $pagesOnEachSide, $currentPage);
        } else {
            yield from range(1, $currentPage);
        }

        if ($currentPage < ($lastPage - $pagesOnEachSide - $pagesOnEdges - 1)) {
            yield from range($currentPage + 1, $currentPage + $pagesOnEachSide);
            yield null;
            yield from range($lastPage - $pagesOnEdges + 1, $lastPage);
        } elseif ($currentPage + 1 <= $lastPage) {
            yield from range($currentPage + 1, $lastPage);
        }
    }
}
