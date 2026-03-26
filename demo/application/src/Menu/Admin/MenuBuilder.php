<?php

declare(strict_types=1);

namespace App\Menu\Admin;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use Sylius\AdminUi\Knp\Menu\MenuBuilderInterface;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;

#[AsDecorator(decorates: 'sylius_admin_ui.knp.menu_builder')]
final readonly class MenuBuilder implements MenuBuilderInterface
{
    public function __construct(
        private FactoryInterface $factory,
    ) {
    }

    public function createMenu(array $options): ItemInterface
    {
        $menu = $this->factory->createItem('root');

        $menu
            ->addChild('dashboard', [
                'route' => 'sylius_admin_ui_dashboard',
            ])
            ->setLabel('sylius.ui.dashboard')
            ->setLabelAttribute('icon', 'tabler:dashboard')
        ;

        $menu
            ->addChild('users', [
                'route' => 'app_admin_user_index',
            ])
            ->setLabel('app.ui.users')
            ->setLabelAttribute('icon', 'tabler:users')
        ;

        $this->addContentsSubMenu($menu);

        return $menu;
    }

    private function addContentsSubMenu(ItemInterface $menu): void
    {
        $library = $menu
            ->addChild('contents')
            ->setLabel('Contents')
            ->setLabelAttribute('icon', 'simple-icons:craftcms')
            ->setExtra('always_open', true)
        ;

        $library->addChild('posts', ['route' => 'app_admin_post_index'])
            ->setLabel('Posts')
        ;

        $library->addChild('media_library', ['route' => 'joli_media_sylius_admin_explore'])
            ->setLabel('media_library')
            ->setExtra('translation_domain', 'JoliMediaSyliusAdminBundle')
        ;
    }
}
