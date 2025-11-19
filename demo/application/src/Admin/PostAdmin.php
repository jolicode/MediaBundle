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
use Sonata\Form\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

/**
 * @phpstan-template T of object
 *
 * @phpstan-extends AbstractAdmin<T>
 */
final class PostAdmin extends AbstractAdmin
{
    #[\Override]
    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::PAGE] = 1;
        $sortValues[DatagridInterface::SORT_ORDER] = 'DESC';
        $sortValues[DatagridInterface::SORT_BY] = 'published_at';
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('title')
            ->add('body')
            ->add('isPublished')
            ->add('publishedAt')
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->addIdentifier('coverMedia')
            ->add('title')
            ->add('author')
            ->add('isPublished')
            ->add('publishedAt')
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
            ->with('Article', ['class' => 'col-md-8'])
            ->add('title')
            ->add('body', TextareaType::class, [
                'required' => true,
                'attr' => ['cols' => 80, 'rows' => 20],
            ])
            ->add('coverMedia', MediaChoiceType::class, [
                'required' => false,
                'help' => 'Upload an image for this post',
                'folder' => 'articles',
            ])
            ->end()
            ->with('Publication metadata', ['class' => 'col-md-4'])
            ->add('isPublished', null, [
                'help' => 'Uncheck this to hide this Article, whatever its publication date',
            ])
            ->add('publishedAt', null, [
                'help' => 'You can set a date in the future to schedule the publication of this article',
                'required' => false,
            ])
            ->add('author')
            ->end()
            ->with('Related Media', ['class' => 'col-md-4'])
            ->add('postMedia', CollectionType::class, [
                'by_reference' => false,
                'help' => 'Add some media to illustrate this post',
            ], [
                'edit' => 'inline',
                'inline' => 'table',
                'sortable' => 'position',
            ])
            ->end()
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->add('title')
            ->add('coverMedia')
            ->add('body')
            ->add('isPublished')
            ->add('publishedAt')
        ;
    }
}
