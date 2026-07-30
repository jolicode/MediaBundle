<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\Routing;

use EasyCorp\Bundle\EasyAdminBundle\Config\Option\EA;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Routing\MediaAdminRouteLoader;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class MediaAdminRouteLoaderTest extends TestCase
{
    public function testItAppliesTheConfiguredPathPrefixToTheMediaLibraryRoutes(): void
    {
        $routes = $this->load('media-library');

        $this->assertSame('/admin/media-library/explore/{key}', $routes->get('admin_joli_media_explore')?->getPath());
        $this->assertSame('/admin/media-library/upload', $routes->get('admin_joli_media_upload')?->getPath());
    }

    public function testItLeavesTheOtherAdminRoutesUntouched(): void
    {
        $routes = $this->load('media-library');

        $this->assertSame('/admin/post/{entityId}', $routes->get('admin_post_detail')?->getPath());
    }

    public function testItSupportsANestedPathPrefix(): void
    {
        $routes = $this->load('library/media');

        $this->assertSame('/admin/library/media/explore/{key}', $routes->get('admin_joli_media_explore')?->getPath());
    }

    private function load(string $pathPrefix): RouteCollection
    {
        $placeholder = MediaAdminController::PATH_PREFIX_PLACEHOLDER;
        $collection = new RouteCollection();
        $collection->add('admin_joli_media_explore', new Route(
            \sprintf('/admin/%s/explore/{key}', $placeholder),
            [EA::CRUD_CONTROLLER_FQCN => MediaAdminController::class],
        ));
        $collection->add('admin_joli_media_upload', new Route(
            \sprintf('/admin/%s/upload', $placeholder),
            [EA::CRUD_CONTROLLER_FQCN => MediaAdminController::class],
        ));
        $collection->add('admin_post_detail', new Route(
            '/admin/post/{entityId}',
            [EA::CRUD_CONTROLLER_FQCN => 'App\Controller\Admin\PostCrudController'],
        ));

        $decorated = $this->createMock(LoaderInterface::class);
        $decorated->method('load')->willReturn($collection);

        return (new MediaAdminRouteLoader($decorated, $pathPrefix))->load('.', 'easyadmin.routes');
    }
}
