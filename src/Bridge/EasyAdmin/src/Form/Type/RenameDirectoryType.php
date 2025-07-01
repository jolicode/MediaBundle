<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RenameDirectoryType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_easy_admin_rename';
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('from', HiddenType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('to', TextType::class, [
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
                'label' => 'action.rename_directory',
                'translation_domain' => 'JoliMediaEasyAdminBundle',
            ])
        ;
    }
}
