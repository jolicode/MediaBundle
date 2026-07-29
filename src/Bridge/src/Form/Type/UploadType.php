<?php

namespace JoliCode\MediaBundle\Bridge\Form\Type;

use JoliCode\MediaBundle\Bridge\Config\AbstractConfig;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class UploadType extends AbstractType
{
    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $config = $options['config'];
        \assert($config instanceof AbstractConfig);
        $maxFilesize = $config->getUploadOption('maxFileSize');
        $acceptedFiles = $config->getUploadOption('acceptedFiles');

        $builder
            ->add('path', HiddenType::class, [
                'required' => true,
            ])
            ->add('file', FileType::class, [
                'required' => true,
                'constraints' => [
                    new File(
                        maxSize: null !== $maxFilesize ? \sprintf('%dM', $maxFilesize) : null,
                        mimeTypes: $acceptedFiles,
                    ),
                ],
            ])
        ;
    }

    #[\Override]
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setRequired('config');
        $resolver->setAllowedTypes('config', AbstractConfig::class);
        $resolver->setDefault('translation_domain', static fn (Options $options): string => $options['config']->getTranslationDomain());
    }
}
