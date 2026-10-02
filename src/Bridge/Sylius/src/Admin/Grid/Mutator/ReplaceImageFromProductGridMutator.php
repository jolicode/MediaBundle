<?php

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\Mutator;

use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Component\Grid\Attribute\AsGridMutator;
use Sylius\Component\Grid\Builder\GridBuilderInterface;
use Sylius\Component\Grid\Mutator\GridMutatorInterface;

#[AsGridMutator(
    grid: 'sylius_admin_product',
)]
final class ReplaceImageFromProductGridMutator implements GridMutatorInterface
{
    public function __invoke(GridBuilderInterface $gridBuilder): void
    {
        $gridBuilder
            ->withFields(
                TwigField::create('image', template: '@JoliMediaSylius/admin/product/grid/field/image.html.twig'),
            )
        ;
    }
}
