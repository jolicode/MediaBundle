<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaChoiceType extends AbstractType
{
    public function __construct(
        private readonly Resolver $resolver,
        private readonly LibraryContainer $libraries,
        private readonly MediaTransformer $transformer,
    ) {
    }

    /**
     * @return string
     */
    #[\Override]
    public function getParent()
    {
        return TextType::class;
    }

    public function getName(): string
    {
        return 'media_choice';
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'joli_media_sonata_admin_choice';
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'folder' => '',
            'library' => null,
        ]);
    }

    #[\Override]
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        if ($view->vars['value']) {
            try {
                $view->vars['media'] = $this->resolver->resolveMedia($view->vars['value'], $options['library']);
            } catch (MediaNotFoundException) {
                $view->vars['media'] = new NullMedia($view->vars['value']);
            }

            $storage = $this->libraries->get($options['library'])->getOriginalStorage();
            $folder = \dirname((string) $view->vars['value']);

            if (str_starts_with($folder, $storage->getUrlPath())) {
                $folder = substr($folder, \strlen($storage->getUrlPath()));
            }

            if ('.' === $folder) {
                $folder = '';
            }

            if ($view->vars['media'] instanceof NullMedia) {
                $view->vars['value'] = null;
            }
        } else {
            $view->vars['media'] = null;
            $folder = (string) $options['folder'];
        }

        $view->vars['folder'] = ltrim($folder, '/');
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->addModelTransformer($this->transformer)
            ->setAttribute('folder', $options['folder'])
        ;
    }
}
