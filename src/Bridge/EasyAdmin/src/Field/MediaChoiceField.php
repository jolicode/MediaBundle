<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\MediaChoiceType;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Contracts\Translation\TranslatableInterface;

final class MediaChoiceField implements FieldInterface
{
    use FieldTrait;

    /**
     * @param TranslatableInterface|string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        $package = new PathPackage(
            '/bundles/jolimediaeasyadmin',
            new JsonManifestVersionStrategy(__DIR__ . '/../../public/manifest.json'),
        );

        return (new self())
            ->setProperty($propertyName)
            ->setLabel($label)
            ->setFormType(MediaChoiceType::class)
            ->addCssFiles($package->getUrl('joli-media-easy-admin.css'))
            ->addJsFiles($package->getUrl('joli-media-easy-admin.js'))
            ->setTemplatePath('@JoliMediaEasyAdmin/field/media_choice.html.twig')
            ->addFormTheme('@JoliMediaEasyAdmin/form/form_theme.html.twig')
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
