<?php

namespace JoliCode\MediaBundle\Tests\Application\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaTextEditorField;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;

class PageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Page::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('title');
        yield SlugField::new('slug')
            ->setTargetFieldName('title')
        ;
        // the media picked from the toolbar are inserted as this variation
        yield MediaTextEditorField::new('body', variation: 'variation-large');
        // no variation on the field: the one configured for the project is used
        yield TextEditorField::new('summary');
        yield MediaChoiceField::new('mediaRestrict');
        yield MediaChoiceField::new('mediaSetNull');
        yield MediaChoiceField::new('mediaDefault');
    }
}
