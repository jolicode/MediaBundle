<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\Provider;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\GridPageResolver;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
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

final class MediaGridProvider implements DataProviderInterface
{
    public function __construct(
        private readonly LibraryContainer $libraries,
        private readonly RequestStack $requestStack,
    ) {
    }

    public function getData(Grid $grid, Parameters $parameters): PagerfantaInterface
    {
        $request = $this->requestStack->getCurrentRequest() ?? new Request();
        $key = $request->attributes->getString('key');
        $currentKey = Resolver::normalizePath($key);

        try {
            $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                $currentKey,
                recursive: false,
                page: $request->query->getInt('page', 1),
                perPage: GridPageResolver::getItemsPerPage($grid, $parameters),
            );
        } catch (\OutOfRangeException) {
            throw new BadRequestException('The requested page number is out of range.');
        }

        return new Pagerfanta(new FixedAdapter($paginatedMedias['total'], $paginatedMedias['items']));
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
