<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class DeleteDirectoryType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_sonata_admin_delete_directory';
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'path' => '',
            'translation_domain' => 'JoliMediaSonataAdminBundle',
        ]);
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('path', HiddenType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Length(min: 1),
                ],
            ])
        ;
    }
}
