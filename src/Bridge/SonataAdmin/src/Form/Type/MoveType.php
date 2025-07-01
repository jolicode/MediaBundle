<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class MoveType extends AbstractType
{
    public function getName(): string
    {
        return 'joli_media_sonata_admin_move';
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
            ->add('to', HiddenType::class, [
                'required' => true,
            ])
        ;
    }
}
