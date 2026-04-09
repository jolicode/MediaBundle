<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Sylius\Grid;

use Sylius\Component\Grid\Definition\Grid;
use Sylius\Component\Grid\Parameters;

final class GridPageResolver
{
    private const DEFAULT_MAX_PER_PAGE = 10;

    public static function getCurrentPage(Grid $grid, Parameters $parameters): int
    {
        return $parameters->has('page') ? (int) $parameters->get('page') : 1;
    }

    public static function getItemsPerPage(Grid $grid, Parameters $parameters): int
    {
        return self::resolveMaxPerPage(
            $parameters->has('limit') ? (int) $parameters->get('limit') : null,
            $grid->getLimits(),
        );
    }

    /**
     * @param int[] $gridLimits
     */
    private static function resolveMaxPerPage(?int $requestLimit, array $gridLimits = []): int
    {
        if (null === $requestLimit) {
            $firstGridLimit = reset($gridLimits);

            return false === $firstGridLimit ? self::DEFAULT_MAX_PER_PAGE : $firstGridLimit;
        }

        if ([] !== $gridLimits) {
            $maxGridLimit = max($gridLimits);

            // Cannot retrieve more items than configured in the grid
            return min($requestLimit, $maxGridLimit);
        }

        return $requestLimit;
    }
}
