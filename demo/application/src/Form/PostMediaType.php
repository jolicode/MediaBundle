<?php

namespace App\Form;

use App\Entity\PostMedia;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type\MediaChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostMediaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('media', MediaChoiceType::class, [
                'folder' => 'articles',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PostMedia::class,
        ]);
    }
}
