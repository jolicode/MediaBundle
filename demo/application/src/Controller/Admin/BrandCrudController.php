<?php

namespace App\Controller\Admin;

use App\Entity\Brand;
use App\Form\EasyAdminBrandArtworkType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * The media are not declared with a MediaChoiceField: they come from the form
 * type nested into the form builder below.
 */
class BrandCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Brand::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInSingular('Brand')
            ->setEntityLabelInPlural('Brands')
            ->setDefaultSort(['name' => 'ASC'])
        ;
    }

    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('name');

        if (Crud::PAGE_INDEX === $pageName || Crud::PAGE_DETAIL === $pageName) {
            yield MediaChoiceField::new('logo');
            yield MediaChoiceField::new('banner');
        }
    }

    public function createNewFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        return parent::createNewFormBuilder($entityDto, $formOptions, $context)
            ->add('artwork', EasyAdminBrandArtworkType::class)
        ;
    }

    public function createEditFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        return parent::createEditFormBuilder($entityDto, $formOptions, $context)
            ->add('artwork', EasyAdminBrandArtworkType::class)
        ;
    }
}
