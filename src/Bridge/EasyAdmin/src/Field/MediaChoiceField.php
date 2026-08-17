<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Config\Asset;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Asset\Package;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\MediaChoiceType;
use Symfony\Contracts\Translation\TranslatableInterface;

final class MediaChoiceField implements FieldInterface
{
    use FieldTrait;

    /**
     * @param TranslatableInterface|string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        return (new self())
            ->setProperty($propertyName)
            ->setLabel($label)
            ->setFormType(MediaChoiceType::class)
            ->addCssFiles(Asset::new(Package::CSS_FILE)->package(Package::NAME))
            ->addJsFiles(Asset::new(Package::JS_FILE)->package(Package::NAME))
            ->setTemplatePath('@JoliMediaEasyAdmin/field/media_choice.html.twig')
            ->addFormTheme(MediaChoiceType::FORM_THEME)
        ;
    }

    public function setFolder(string $folder): self
    {
        $this->setFormTypeOptions([
            'folder' => $folder,
        ]);

        return $this;
    }
}
