<?php

namespace App\Controller\Admin;

use App\Entity\PostMedia;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;

class PostMediaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PostMedia::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield MediaChoiceField::new('media', false)
            ->setFormTypeOption('attr', [
                'required' => true,
            ])
            ->setColumns(12)
            ->setRequired(true)
            ->setFolder('articles')
        ;
    }
}
