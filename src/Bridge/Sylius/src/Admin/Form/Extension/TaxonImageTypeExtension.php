<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Extension;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type\MediaChoiceType;
use Sylius\Bundle\CoreBundle\Form\Type\Taxon\TaxonImageType;
use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormBuilderInterface;

class TaxonImageTypeExtension extends AbstractTypeExtension
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('file', MediaChoiceType::class, [
            'property_path' => 'media',
        ]);
    }

    public static function getExtendedTypes(): iterable
    {
        yield TaxonImageType::class;
    }
}
