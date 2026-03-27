<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Sylius\Grid;

use JoliCode\MediaBundle\Bridge\SyliusAdmin\Config\Config;
use Sylius\Bundle\GridBundle\Builder\Action\Action;
use Sylius\Bundle\GridBundle\Builder\Action\DeleteAction;
use Sylius\Bundle\GridBundle\Builder\Action\ShowAction;
use Sylius\Bundle\GridBundle\Builder\Action\UpdateAction;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\ItemActionGroup;
use Sylius\Bundle\GridBundle\Builder\ActionGroup\MainActionGroup;
use Sylius\Bundle\GridBundle\Builder\Field\TwigField;
use Sylius\Bundle\GridBundle\Builder\GridBuilderInterface;
use Sylius\Bundle\GridBundle\Grid\AbstractGrid;
use Sylius\Component\Grid\Attribute\AsGrid;
use Symfony\Contracts\Translation\TranslatorInterface;

#[AsGrid(
    name: 'joli_media_explore',
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
            ->withFields(
                TwigField::create('image', '@JoliMediaSyliusAdmin/media/grid/field/image.html.twig')
                    ->setPath('.')
                    ->setLabel('')
                    ->withOptions(['vars' => [
                        'th_class' => 'text-center',
                        'td_class' => 'text-center',
                    ]])
            )
            ->withFields(
                TwigField::create('path', '@JoliMediaSyliusAdmin/media/grid/field/path.html.twig')
                    ->setPath('filename')
                    ->setLabel($this->trans('media.name')),
            )
            ->withFields(
                TwigField::create('fileType', '@JoliMediaSyliusAdmin/media/grid/field/file_type.html.twig')
                    ->setLabel($this->trans('media.type.label')),
            )
            ->withFields(
                TwigField::create('fileSize', '@JoliMediaSyliusAdmin/media/grid/field/file_size.html.twig')
                    ->setLabel($this->trans('media.size.label_long'))
                    ->withOptions(['vars' => [
                        'th_class' => 'w-20 text-center',
                        'td_class' => 'text-center',
                    ]])
            )
            ->withFields(
                TwigField::create('pixelDimensions', '@JoliMediaSyliusAdmin/media/grid/field/dimensions.html.twig')
                    ->setLabel($this->trans('media.dimensions')),
            )
            ->addActionGroup(MainActionGroup::create(
                Action::create('create_directory', 'custom')
                    ->setLabel($this->trans('directory.create'))
                    ->setIcon('tabler:folder-plus')
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/create_directory.html.twig'),
                Action::create('add_media', 'custom')
                    ->setLabel($this->trans('media.add'))
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/add_media.html.twig'),
            ))
            ->addActionGroup(ItemActionGroup::create(
                ShowAction::create()
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/show.html.twig'),
                UpdateAction::create()
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/update.html.twig'),
                DeleteAction::create()
                    ->setTemplate('@JoliMediaSyliusAdmin/media/grid/action/delete.html.twig'),
            ))
        ;
    }

    private function trans(string $message): string
    {
        return $this->translator->trans($message, domain: 'JoliMediaSyliusAdminBundle');
    }
}
