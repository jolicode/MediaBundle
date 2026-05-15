<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type\MediaChoiceType;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type\UploadType;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\MediaGrid;
use JoliCode\MediaBundle\Bridge\Sylius\Admin\Grid\Provider\MediaGridProvider;
use JoliCode\MediaBundle\Bridge\Sylius\Config\Config;
use JoliCode\MediaBundle\Bridge\Sylius\Uploader\ImageUploader;
use JoliCode\MediaBundle\Bridge\Twig\JoliMediaAdminExtension;
use Sylius\Component\Core\Uploader\ImageUploaderInterface;

return static function (ContainerConfigurator $container): void {
    $services = $container->services();

    $services
        ->set('joli_media_sylius_admin.config', Config::class)
        ->args([
            '$visibility' => param('joli_media_easy_admin.visibility'),
            '$acceptedFiles' => param('joli_media_easy_admin.upload.accepted_files'),
            '$maxFiles' => param('joli_media_easy_admin.upload.max_files'),
            '$maxFileSize' => param('joli_media_easy_admin.upload.max_file_size'),
            '$translator' => service('translator')->ignoreOnInvalid(),
        ])
    ;

    $services->set('joli_media_sylius_admin.controller.media_admin', MediaAdminController::class)
        ->args([
            service('joli_media.library_container'),
            service('joli_media.resolver'),
            service('joli_media.converter'),
            service('sylius.grid.view_factory'),
            service('sylius.grid.provider'),
            service('twig'),
            service('form.factory'),
            service('joli_media_sylius_admin.config'),
            service('translator'),
            service('security.csrf.token_manager'),
        ])
        ->call('setContainer', [service('service_container')])
        ->tag('controller.service_arguments')
        ->alias(MediaAdminController::class, 'joli_media_sylius_admin.controller.media_admin')
        ->public()
    ;

    $services->set('joli_media_sylius_admin.grid.media_admin', MediaGrid::class)
        ->args([
            service('joli_media_sylius_admin.config'),
            service('translator'),
        ])
        ->tag('sylius.grid')
    ;

    $services->set('joli_media_sylius_admin.grid_provider.media', MediaGridProvider::class)
        ->args([
            service('joli_media.library_container'),
            service('request_stack'),
        ])
        ->tag('sylius.grid_data_provider')
    ;

    $services->set('joli_media_sylius_admin.form.media_transformer', MediaTransformer::class)
        ->args([
            service('joli_media.resolver'),
        ])
    ;

    $services->set('joli_media_sylius_admin.form.media_choice', MediaChoiceType::class)
        ->args([
            service('joli_media.resolver'),
            service('joli_media.library_container'),
            service('joli_media_sylius_admin.form.media_transformer'),
        ])
        ->tag('form.type')
    ;

    $services->set('joli_media_sylius_admin.form.upload', UploadType::class)
        ->args([
            service('joli_media_sylius_admin.config'),
        ])
        ->tag('form.type')
    ;

    // twig
    $services->set('joli_media_admin.twig_extension', JoliMediaAdminExtension::class)
        ->args([
            '$libraries' => service('joli_media.library_container'),
            '$authorizationChecker' => service('security.authorization_checker')->ignoreOnInvalid(),
        ])
        ->tag('twig.extension')
    ;

    if (interface_exists(ImageUploaderInterface::class)) {
        $services->set('joli_media_sylius_admin.uploader.image', ImageUploader::class)
            ->decorate('sylius.uploader.image')
            ->args([
                service('.inner'),
                service('joli_media.library_container'),
            ])
        ;
    }
};
