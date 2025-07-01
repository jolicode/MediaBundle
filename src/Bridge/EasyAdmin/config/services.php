<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\MediaChoiceType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\UploadType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Twig\JoliMediaEasyAdminExtension;

return static function (ContainerConfigurator $container): void {
    $container->services()

        // config
        ->set('joli_media_easy_admin.config', Config::class)
        ->args([
            '$visibility' => param('joli_media_easy_admin.visibility'),
            '$acceptedFiles' => param('joli_media_easy_admin.upload.accepted_files'),
            '$maxFiles' => param('joli_media_easy_admin.upload.max_files'),
            '$maxFileSize' => param('joli_media_easy_admin.upload.max_file_size'),
            '$translator' => service('translator')->ignoreOnInvalid(),
        ])

        // controller
        ->set('joli_media_easy_admin.controller.admin', MediaAdminController::class)
        ->args([
            '$libraries' => service('joli_media.library_container'),
            '$config' => service('joli_media_easy_admin.config'),
            '$resolver' => service('joli_media.resolver'),
            '$converter' => service('joli_media.converter'),
            '$translator' => service('translator')->ignoreOnInvalid(),
            '$twig' => service('twig'),
            '$formFactory' => service('form.factory'),
            '$adminUrlGenerator' => service(AdminUrlGenerator::class),
        ])
        ->call('setContainer', [service('service_container')])
        ->tag('controller.service_arguments')
        ->alias(MediaAdminController::class, 'joli_media_easy_admin.controller.admin')
        ->public()

        // form
        ->set('joli_media_easy_admin.form.data_transfomer.media', MediaTransformer::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
        ])
        ->tag('form.type')
        ->set('joli_media_easy_admin.form.type.media_choice', MediaChoiceType::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
            '$libraries' => service('joli_media.library_container'),
            '$transformer' => service('joli_media_easy_admin.form.data_transfomer.media'),
        ])
        ->tag('form.type')
        ->set('joli_media_easy_admin.form.type.upload', UploadType::class)
        ->args([
            '$config' => service('joli_media_easy_admin.config'),
        ])
        ->tag('form.type')

        // twig
        ->set('joli_media_easy_admin.twig_extension', JoliMediaEasyAdminExtension::class)
        ->tag('twig.extension')
    ;
};
