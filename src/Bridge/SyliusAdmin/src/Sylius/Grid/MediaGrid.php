<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Sylius\Grid;

use Sylius\Bundle\GridBundle\Builder\Action\Action;
use Sylius\Bundle\GridBundle\Builder\Action\CreateAction;
use Sylius\Bundle\GridBundle\Builder\Action\ShowAction;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\ItemActionGroup;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\MainActionGroup;
use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Bundle\GridBundle\Builder\GridBuilderInterface;
use Sylius\Bundle\GridBundle\Grid\AbstractGrid;
use Sylius\Component\Grid\Attribute\AsGrid;

#[AsGrid(
    name: 'joli_media_explore',
    provider: 'joli_media.sylius_admin.grid_provider.media',
)]
final class MediaGrid extends AbstractGrid
{
    public function __invoke(GridBuilderInterface $gridBuilder): void
    {
        $gridBuilder
            ->withFields(
                TwigField::create('image', '@JoliMediaSyliusAdmin/media/grid/field/image.html.twig')
                    ->setPath('.')
                    ->setLabel('Image')
                    ->withOptions(['vars' => [
                        'th_class' => 'w-1 text-center',
                        'td_class' => 'text-center',
                    ]])
            )
            ->withFields(
                TwigField::create('path', '@JoliMediaSyliusAdmin/media/grid/field/path.html.twig')
                    ->setLabel('Name'),
            )
            ->withFields(
                TwigField::create('fileType', '@JoliMediaSyliusAdmin/media/grid/field/file_type.html.twig')
                    ->setLabel('Type'),
            )
            ->withFields(
                TwigField::create('fileSize', '@JoliMediaSyliusAdmin/media/grid/field/file_size.html.twig')
                    ->setLabel('File size')
                    ->withOptions(['vars' => [
                        'th_class' => 'w-20 text-center',
                        'td_class' => 'text-center',
                    ]])
            )
            ->withFields(
                TwigField::create('pixelDimensions', '@JoliMediaSyliusAdmin/media/grid/field/dimensions.html.twig')
                    ->setLabel('Dimensions'),
            )
            ->addActionGroup(MainActionGroup::create(
                Action::create('add_media', 'custom')
                    ->setLabel('Add media')
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/add_media.html.twig'),
            ))
            ->addActionGroup(ItemActionGroup::create(
                ShowAction::create()
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/show.html.twig')
            ))
        ;
    }
}
