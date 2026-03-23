<?php

namespace App\Grid;

use App\Grid\Provider\MediaGridProvider;
use Sylius\Bundle\GridBundle\Builder\Field\StringField;
use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Bundle\GridBundle\Builder\GridBuilderInterface;
use Sylius\Bundle\GridBundle\Grid\AbstractGrid;
use Sylius\Component\Grid\Attribute\AsGrid;

#[AsGrid(
    name: 'joli_media_explore',
    provider: MediaGridProvider::class,
)]
final class MediaGrid extends AbstractGrid
{
    public function __invoke(GridBuilderInterface $gridBuilder): void
    {
        $gridBuilder
            ->withFields(
                TwigField::create('preview', 'media/index/grid/field/preview.html.twig')
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
                TwigField::create('fileSize', 'media/index/grid/field/file_size.html.twig')
                    ->setLabel('File size')
            )
            ->withFields(
                TwigField::create('pixelDimensions', 'media/index/grid/field/dimensions.html.twig')
                    ->setLabel('Dimensions')
            )
        ;
    }
}
