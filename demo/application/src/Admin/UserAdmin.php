<?php

declare(strict_types=1);

namespace App\Admin;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\MediaChoiceType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * @phpstan-template T of object
 *
 * @phpstan-extends AbstractAdmin<T>
 */
final class UserAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('name')
            ->add('email')
            ->add('isActive')
        ;
    }

    #[\Override]
    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::PAGE] = 1;
        $sortValues[DatagridInterface::SORT_ORDER] = 'ASC';
        $sortValues[DatagridInterface::SORT_BY] = 'name';
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->addIdentifier('profilePicture')
            ->addIdentifier('name')
            ->add('email')
            ->add('isActive')
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
            ->add('name')
            ->add('email')
            ->add('isActive')
            ->add('profilePicture', MediaChoiceType::class, [
                'required' => true,
                'help' => 'Choose a profile picture for this user',
                'folder' => 'users',
            ])
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('name')
            ->add('email')
            ->add('isActive')
            ->add('profilePicture')
        ;
    }
}
