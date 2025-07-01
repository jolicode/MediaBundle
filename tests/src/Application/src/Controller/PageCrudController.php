<?php

namespace JoliCode\MediaBundle\Tests\Application\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;
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
        yield MediaChoiceField::new('mediaRestrict');
        yield MediaChoiceField::new('mediaSetNull');
        yield MediaChoiceField::new('mediaDefault');
    }
}
