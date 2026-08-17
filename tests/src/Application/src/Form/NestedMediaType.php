<?php

namespace JoliCode\MediaBundle\Tests\Application\Form;

use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\MediaChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NestedMediaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('media', MediaChoiceType::class, [
            'required' => false,
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'inherit_data' => true,
            'label' => false,
        ]);
    }
}
