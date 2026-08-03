<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\Router;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Context\AdminContextInterface;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Provider\AdminContextProviderInterface;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Router\AdminRouteGeneratorInterface;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGeneratorInterface;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Router\MediaAdminRouter;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class MediaAdminRouterTest extends TestCase
{
    public function testItReturnsTheRouteGeneratedByEasyAdmin(): void
    {
        $router = $this->createRouter('App\Controller\Admin\DashboardController', [
            'explore' => 'admin_joli_media_explore',
        ]);

        $this->assertSame('admin_joli_media_explore', $router->getRouteName('explore'));
        $this->assertTrue($router->usesPrettyUrls());
    }

    public function testItFallsBackToTheLegacyRouteWhenEasyAdminDoesNotGenerateIt(): void
    {
        $router = $this->createRouter('App\Controller\Admin\DashboardController', []);

        $this->assertSame('joli_media_easy_admin_explore', $router->getRouteName('explore'));
        $this->assertFalse($router->usesPrettyUrls());
    }

    public function testItFallsBackToTheLegacyRouteOutsideOfAnAdminRequest(): void
    {
        $router = $this->createRouter(null, ['explore' => 'admin_joli_media_explore']);

        $this->assertSame('joli_media_easy_admin_explore', $router->getRouteName('explore'));
    }

    public function testItRejectsUnknownActions(): void
    {
        $router = $this->createRouter(null, []);

        $this->expectException(\InvalidArgumentException::class);
        $router->getRouteName('doesNotExist');
    }

    public function testItPassesTheExtraParametersToTheGeneratedRoute(): void
    {
        $adminUrlGenerator = $this->createAdminUrlGenerator();
        $adminUrlGenerator
            ->expects($this->once())
            ->method('setRoute')
            ->with('admin_joli_media_explore', ['key' => 'photos', 'page' => 3])
        ;
        $adminUrlGenerator->expects($this->never())->method('set');

        $router = $this->createRouter(
            'App\Controller\Admin\DashboardController',
            ['explore' => 'admin_joli_media_explore'],
            $adminUrlGenerator,
        );

        $this->assertSame(
            '/admin/media/explore/photos?page=3',
            $router->generateUrl('explore', ['key' => 'photos'], ['page' => 3]),
        );
    }

    public function testItKeepsTheExtraParametersTopLevelOnTheLegacyRoute(): void
    {
        $adminUrlGenerator = $this->createAdminUrlGenerator();
        $adminUrlGenerator
            ->expects($this->once())
            ->method('setRoute')
            ->with('joli_media_easy_admin_explore', ['key' => 'photos'])
        ;
        $adminUrlGenerator
            ->expects($this->once())
            ->method('set')
            ->with('page', 3)
        ;

        $router = $this->createRouter('App\Controller\Admin\DashboardController', [], $adminUrlGenerator);

        $this->assertSame(
            '/admin/media/explore/photos?page=3',
            $router->generateUrl('explore', ['key' => 'photos'], ['page' => 3]),
        );
    }

    /**
     * @return AdminUrlGeneratorInterface&MockObject
     */
    private function createAdminUrlGenerator(): MockObject
    {
        $adminUrlGenerator = $this->createMock(AdminUrlGeneratorInterface::class);
        $adminUrlGenerator->method('setRoute')->willReturnSelf();
        $adminUrlGenerator->method('set')->willReturnSelf();
        $adminUrlGenerator->method('generateUrl')->willReturn('/admin/media/explore/photos?page=3');

        return $adminUrlGenerator;
    }

    /**
     * @param array<string, string>                        $generatedRouteNames the route names EasyAdmin generated, indexed by action name
     * @param (AdminUrlGeneratorInterface&MockObject)|null $adminUrlGenerator
     */
    private function createRouter(
        ?string $dashboardFqcn,
        array $generatedRouteNames,
        ?MockObject $adminUrlGenerator = null,
    ): MediaAdminRouter {
        $adminContext = null;

        if (null !== $dashboardFqcn) {
            $adminContext = $this->createMock(AdminContextInterface::class);
            $adminContext->method('getDashboardControllerFqcn')->willReturn($dashboardFqcn);
        }

        $adminContextProvider = $this->createMock(AdminContextProviderInterface::class);
        $adminContextProvider->method('getContext')->willReturn($adminContext);

        $adminRouteGenerator = $this->createMock(AdminRouteGeneratorInterface::class);
        $adminRouteGenerator->method('findRouteName')->willReturnCallback(
            static function (?string $dashboard, ?string $controllerFqcn, ?string $actionName) use ($generatedRouteNames): ?string {
                if (MediaAdminController::class !== $controllerFqcn) {
                    return null;
                }

                return $generatedRouteNames[$actionName] ?? null;
            }
        );

        return new MediaAdminRouter(
            $adminUrlGenerator ?? $this->createAdminUrlGenerator(),
            $adminRouteGenerator,
            $adminContextProvider,
        );
    }
}
