<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type;

use EasyCorp\Bundle\EasyAdminBundle\Provider\AdminContextProvider;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Asset\AssetRegistrar;
use JoliCode\MediaBundle\Bridge\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Bridge\Form\Type\AbstractMediaChoiceType;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Form\FormBuilderInterface;

class MediaChoiceType extends AbstractMediaChoiceType
{
    public const FORM_THEME = '@JoliMediaEasyAdmin/form/form_theme.html.twig';

    public function __construct(
        Resolver $resolver,
        LibraryContainer $libraries,
        MediaTransformer $transformer,
        private readonly AssetRegistrar $assetRegistrar,
        private readonly ?AdminContextProvider $adminContextProvider = null,
    ) {
        parent::__construct($resolver, $libraries, $transformer);
    }

    #[\Override]
    public function getBlockPrefix(): string
    {
        return 'joli_media_easy_admin_choice';
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);

        // registering here is safe: EasyAdmin reads the form themes and the assets
        // of the page when rendering it, which happens after the form is built
        $adminContext = $this->adminContextProvider?->getContext();

        if (null === $adminContext) {
            return;
        }

        $crud = $adminContext->getCrud();

        if (null !== $crud && !\in_array(self::FORM_THEME, $crud->getFormThemes(), true)) {
            $crud->addFormTheme(self::FORM_THEME);
        }

        $this->assetRegistrar->registerOn($adminContext);
    }

    #[\Override]
    protected function getTranslationDomain(): string
    {
        return 'JoliMediaEasyAdminBundle';
    }
}
