<?php

namespace App\Admin;

use App\Form\SonataBrandArtworkType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * The media are not added to the form directly: they come from the form type
 * nested into it.
 *
 * @phpstan-template T of object
 *
 * @phpstan-extends AbstractAdmin<T>
 */
final class BrandAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter->add('name');
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->addIdentifier('name')
            ->add('logo')
            ->add('banner')
            ->add(ListMapper::NAME_ACTIONS, null, [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ],
            ])
        ;
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->with('Brand', ['class' => 'col-md-8'])
            ->add('name')
            ->end()
            ->with('Artwork', ['class' => 'col-md-4'])
            ->add('artwork', SonataBrandArtworkType::class)
            ->end()
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('name')
            ->add('logo')
            ->add('banner')
        ;
    }
}
