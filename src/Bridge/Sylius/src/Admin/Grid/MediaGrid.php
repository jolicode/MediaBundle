<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid;

use JoliCode\MediaBundle\Bridge\Sylius\Config\Config;
use Sylius\Bundle\GridBundle\Builder\Action\Action;
use Sylius\Bundle\GridBundle\Builder\Action\DeleteAction;
use Sylius\Bundle\GridBundle\Builder\Action\ShowAction;
use Sylius\Bundle\GridBundle\Builder\Action\UpdateAction;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\ItemActionGroup;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\MainActionGroup;
use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Bundle\GridBundle\Builder\Filter\StringFilter;
use Sylius\Bundle\GridBundle\Builder\GridBuilderInterface;
use Sylius\Bundle\GridBundle\Grid\AbstractGrid;
use Sylius\Component\Grid\Attribute\AsGrid;
use Symfony\Contracts\Translation\TranslatorInterface;

#[AsGrid(
    name: 'joli_media_sylius_admin_media',
    provider: 'joli_media_sylius_admin.grid_provider.media',
)]
final class MediaGrid extends AbstractGrid
{
    public function __construct(
        private readonly Config $config,
        private readonly TranslatorInterface $translator,
    ) {
    }

    public function __invoke(GridBuilderInterface $gridBuilder): void
    {
        $gridBuilder
            ->setLimits($this->config->getPaginationSizes())
            ->orderBy('path', 'asc')
            ->withFilters(
                StringFilter::create('search', type: 'contains')
                    ->setLabel('sylius.ui.search'),
            )
            ->withFields(
                TwigField::create('image', '@JoliMediaSylius/admin/media/grid/field/image.html.twig')
                    ->setPath('.')
                    ->setLabel('')
                    ->withOptions(['vars' => [
                        'th_class' => 'text-center',
                        'td_class' => 'text-center',
                    ]]),
                TwigField::create('path', '@JoliMediaSylius/admin/media/grid/field/path.html.twig')
                    ->setPath('.')
                    ->setLabel($this->trans('media.name'))
                    ->setSortable(true),
                TwigField::create('fileType', '@JoliMediaSylius/admin/media/grid/field/file_type.html.twig')
                    ->setLabel($this->trans('media.type.label')),
                TwigField::create('fileSize', '@JoliMediaSylius/admin/media/grid/field/file_size.html.twig')
                    ->setLabel($this->trans('media.size.label_long'))
                    ->setSortable(true)
                    ->withOptions(['vars' => [
                        'th_class' => 'w-20 text-center',
                        'td_class' => 'text-center',
                    ]]),
                TwigField::create('pixelDimensions', '@JoliMediaSylius/admin/media/grid/field/dimensions.html.twig')
                    ->setLabel($this->trans('media.dimensions')),
            )
            ->addActionGroup(MainActionGroup::create(
                Action::create('delete_directory', 'custom')
                    ->setLabel($this->trans('action.delete_directory'))
                    ->setIcon('tabler:pencil')
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/delete_directory.html.twig'),
                Action::create('rename_directory', 'custom')
                    ->setLabel($this->trans('action.rename_directory'))
                    ->setIcon('tabler:pencil')
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/rename_directory.html.twig'),
                Action::create('create_directory', 'custom')
                    ->setLabel($this->trans('directory.create'))
                    ->setIcon('tabler:folder-plus')
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/create_directory.html.twig'),
                Action::create('add_media', 'custom')
                    ->setLabel($this->trans('media.add'))
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/add_media.html.twig'),
            ))
            ->addActionGroup(ItemActionGroup::create(
                ShowAction::create()
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/show.html.twig'),
                UpdateAction::create()
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/update.html.twig')
                    ->setLabel($this->trans('action.rename')),
                DeleteAction::create()
                    ->setTemplate('@JoliMediaSylius/admin/media/grid/action/delete.html.twig'),
            ))
        ;
    }

    private function trans(string $message): string
    {
        return $this->translator->trans($message, domain: 'JoliMediaSyliusBundle');
    }
}
