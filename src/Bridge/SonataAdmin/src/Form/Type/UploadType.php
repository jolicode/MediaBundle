<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Config\Config;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotNull;

class UploadType extends AbstractType
{
    public function __construct(
        private readonly Config $config,
    ) {
    }

    public function getName(): string
    {
        return 'joli_media_sonata_admin_upload';
    }

    #[\Override]
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $maxFilesize = $this->config->getUploadOption('maxFileSize');
        $acceptedFiles = $this->config->getUploadOption('acceptedFiles');

        $builder
            ->add('path', HiddenType::class, [
                'required' => true,
                'constraints' => [
                    new NotNull(),
                ],
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
        $resolver->setDefaults([
            'translation_domain' => 'JoliMediaSonataAdminBundle',
        ]);
    }
}
