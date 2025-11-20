<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/easy-admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        return $this->redirectToRoute('admin_user_index');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<div class="d-flex align-items-center flex-column">
                    <div>
                        <img alt="" src="https://jolicode.com/images/goodies/logo.svg">
                    </div>
                    <div>
                        Media Bundle Demo
                    </div>
                </div>')
            ->setFaviconPath('https://jolicode.com/build/images/favicons/favicon-32x32.png')
            ->renderContentMaximized()
        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToCrud('Users', 'fas fa-users', User::class);

        yield MenuItem::section('Contents');
        yield MenuItem::linkToCrud('Posts', 'fa fa-file-text', Post::class);
        yield MenuItem::linkToRoute('Media Library', 'fa fa-image', 'joli_media_easy_admin_explore');
    }
}
