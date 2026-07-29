<?php

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type;

use JoliCode\MediaBundle\Bridge\Form\Type\AbstractMediaChoiceType;

class MediaChoiceType extends AbstractMediaChoiceType
{
    #[\Override]
    public function getBlockPrefix(): string
    {
        return 'joli_media_sylius_admin_choice';
    }

    #[\Override]
    protected function getTranslationDomain(): string
    {
        return 'JoliMediaSyliusBundle';
    }
}
