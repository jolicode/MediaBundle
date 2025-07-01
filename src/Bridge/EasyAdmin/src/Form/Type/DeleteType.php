<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class DeleteType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_easy_admin_delete';
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'path' => '',
        ]);
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('path', HiddenType::class, [
                'constraints' => [
                    new NotBlank(),
                ],
            ])
        ;
    }
}
