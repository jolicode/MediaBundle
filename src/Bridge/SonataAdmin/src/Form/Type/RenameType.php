<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RenameType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_sonata_admin_rename';
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('to', TextType::class, [
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'media.placeholder',
                ],
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Length(
                        min: 1,
                        max: 255,
                    ),
                ],
            ])
            ->add('submit', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-primary',
                ],
                'label' => 'action.rename_file',
            ])
        ;
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'translation_domain' => 'JoliMediaSonataAdminBundle',
        ]);
    }
}
