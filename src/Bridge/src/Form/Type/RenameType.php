<?php

namespace JoliCode\MediaBundle\Bridge\Form\Type;

use JoliCode\MediaBundle\Bridge\Validator\AcceptedExtension;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RenameType extends AbstractType
{
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
                    new AcceptedExtension(
                        $options['accepted_extensions'],
                        translationDomain: \is_string($options['translation_domain']) ? $options['translation_domain'] : null,
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
        $resolver->setDefault('accepted_extensions', []);
        $resolver->setAllowedTypes('accepted_extensions', 'string[]');
    }
}
