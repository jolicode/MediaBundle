<?php

declare(strict_types=1);

namespace App\Admin;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\MediaChoiceType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

/**
 * @phpstan-template T of object
 *
 * @phpstan-extends AbstractAdmin<T>
 */
final class PostMediaAdmin extends AbstractAdmin
{
    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('post')
            ->add('media')
        ;
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->add('media', MediaChoiceType::class, [
                'required' => true,
            ])
        ;
    }
}
