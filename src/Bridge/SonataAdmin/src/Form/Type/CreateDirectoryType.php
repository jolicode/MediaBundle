<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class CreateDirectoryType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_sonata_admin_create_directory';
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'directory' => '',
            'parentDirectory' => '',
            'intent' => 'explore',
        ]);
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('directory', TextType::class, [
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'directory.placeholder',
                ],
                'constraints' => [
                    new NotBlank(),
                    new Length(
                        min: 1,
                        max: 255,
                    ),
                ],
                'required' => true,
                'translation_domain' => 'JoliMediaSonataAdminBundle',
            ])
            ->add('parentDirectory', HiddenType::class)
            ->add('intent', HiddenType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Choice(
                        choices: ['explore', 'choose', 'choose_directory'],
                        message: 'The intent must be either "explore", "choose" or "choose_directory".',
                    ),
                ],
            ])
            ->add('submit', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-primary',
                ],
                'label' => 'directory.create_this_directory',
                'translation_domain' => 'JoliMediaSonataAdminBundle',
            ])
        ;
    }
}
