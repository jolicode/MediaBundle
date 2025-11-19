<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\FormField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;

class PostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Post::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setSearchFields(['title', 'body'])
            ->setDefaultSort(['publishedAt' => 'DESC'])
        ;
    }

    public function configureFields(string $pageName): iterable
    {
        $media = MediaChoiceField::new('coverMedia')
            ->setRequired(false)
            ->setHelp('Attach an image to this post')
            ->setFolder('articles')
        ;
        $title = TextField::new('title');
        $body = TextEditorField::new('body')
            ->setNumOfRows(20)
        ;
        $isPublished = BooleanField::new('isPublished');
        $publishedAt = DateTimeField::new('publishedAt');
        $author = AssociationField::new('author');
        $postMedia = CollectionField::new('postMedia')
            ->setHelp('Add some media to illustrate this post')
            ->renderExpanded(true)
            ->useEntryCrudForm(PostMediaCrudController::class)
            ->setEntryIsComplex()
        ;

        if (Crud::PAGE_NEW === $pageName || Crud::PAGE_EDIT === $pageName) {
            return [
                FormField::addColumn(8),
                FormField::addFieldset('Content', 'fa fa-newspaper-o'),
                $title,
                $body,
                $media,

                FormField::addColumn(4),
                FormField::addFieldset('Publication metadata', 'fa fa-info-circle'),
                $isPublished,
                $publishedAt,
                $author,

                FormField::addFieldset('Related media', 'fa fa-images'),
                $postMedia,
            ];
        }

        return [
            $media,
            $title,
            $author,
            $isPublished,
            $publishedAt,
        ];
    }
}
