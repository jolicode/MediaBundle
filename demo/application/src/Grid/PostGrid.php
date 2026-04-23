<?php

namespace App\Grid;

use App\Entity\Post;
use Sylius\Bundle\GridBundle\Builder\Action\CreateAction;
use Sylius\Bundle\GridBundle\Builder\Action\DeleteAction;
use Sylius\Bundle\GridBundle\Builder\Action\UpdateAction;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\BulkActionGroup;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\ItemActionGroup;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\MainActionGroup;
use Sylius\Bundle\GridBundle\Builder\Field\DateTimeField;
use Sylius\Bundle\GridBundle\Builder\Field\StringField;
use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Bundle\GridBundle\Builder\GridBuilderInterface;
use Sylius\Bundle\GridBundle\Grid\AbstractGrid;
use Sylius\Component\Grid\Attribute\AsGrid;

#[AsGrid(
    resourceClass: Post::class,
    name: 'app_post',
)]
final class PostGrid extends AbstractGrid
{
    public function __invoke(GridBuilderInterface $gridBuilder): void
    {
        $gridBuilder
            ->withFields(
                TwigField::create('coverMedia', 'post/grid/field/cover_media.html.twig')
                    ->setLabel('Cover Media'),
                StringField::create('title')
                    ->setLabel('Title')
                    ->setSortable(true),
                StringField::create('author')
                    ->setLabel('Author')
                    ->setSortable(true),
                TwigField::create('isPublished', '@SyliusBootstrapAdminUi/shared/grid/field/boolean.html.twig')
                    ->setLabel('IsPublished'),
                DateTimeField::create('publishedAt')
                    ->setLabel('Published at'),
            )
            ->addActionGroup(
                MainActionGroup::create(
                    CreateAction::create(),
                )
            )
            ->addActionGroup(
                ItemActionGroup::create(
                    UpdateAction::create(),
                    DeleteAction::create()
                )
            )
            ->addActionGroup(
                BulkActionGroup::create(
                    DeleteAction::create()
                )
            )
        ;
    }
}
