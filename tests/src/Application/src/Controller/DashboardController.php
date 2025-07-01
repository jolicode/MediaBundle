<?php

namespace JoliCode\MediaBundle\Tests\Application\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard('/admin', 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('MediaBundle EasyAdmin Tests')
        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');

        yield MenuItem::linkToCrud('Pages', 'fa fa-file-text', Page::class);
    }
}
