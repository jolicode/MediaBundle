<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Sylius\Grid;

use Sylius\Bundle\GridBundle\Builder\Field\StringField;
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
                TwigField::create('preview', '@JoliMediaSyliusAdmin/media/index/grid/field/preview.html.twig')
                    ->setPath('.')
                    ->setLabel('Preview')
            )
            ->withFields(
                StringField::create('path')
                    ->setLabel('Name'),
            )
            ->withFields(
                StringField::create('fileType')
                    ->setLabel('Type'),
            )
            ->withFields(
                TwigField::create('fileSize', '@JoliMediaSyliusAdmin/media/index/grid/field/file_size.html.twig')
                    ->setLabel('File size')
            )
            ->withFields(
                TwigField::create('pixelDimensions', '@JoliMediaSyliusAdmin/media/index/grid/field/dimensions.html.twig')
                    ->setLabel('Dimensions')
            )
        ;
    }
}
