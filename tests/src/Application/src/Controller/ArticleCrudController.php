<?php

namespace JoliCode\MediaBundle\Tests\Application\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use JoliCode\MediaBundle\Tests\Application\Entity\Article;
use JoliCode\MediaBundle\Tests\Application\Form\NestedMediaType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Declares no MediaChoiceField on purpose: the media widget is only reachable
 * through the nested form type added to the form builder.
 */
class ArticleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Article::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [];
    }

    public function createNewFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        return parent::createNewFormBuilder($entityDto, $formOptions, $context)
            ->add('nested', NestedMediaType::class)
        ;
    }

    public function createEditFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        return parent::createEditFormBuilder($entityDto, $formOptions, $context)
            ->add('nested', NestedMediaType::class)
        ;
    }
}
