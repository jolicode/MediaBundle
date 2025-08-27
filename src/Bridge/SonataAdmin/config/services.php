<?php

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use JoliCode\MediaBundle\Bridge\Security\Voter\MediaVoter;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Asset\Package;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Bridge\SonataAdmin\FieldDescription\TypeGuesser;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\MediaChoiceType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\UploadType;
use JoliCode\MediaBundle\Bridge\Twig\JoliMediaAdminExtension;

return static function (ContainerConfigurator $container): void {
    $container->services()

        // assets
        ->set('joli_media_sonata_admin.assets_package', Package::class)
        ->args([service('request_stack')])
        ->tag('assets.package', ['package' => Package::NAME])

        // config
        ->set('joli_media_sonata_admin.config', Config::class)
        ->args([
            '$visibility' => param('joli_media_sonata_admin.visibility'),
            '$acceptedFiles' => param('joli_media_sonata_admin.upload.accepted_files'),
            '$maxFiles' => param('joli_media_sonata_admin.upload.max_files'),
            '$maxFileSize' => param('joli_media_sonata_admin.upload.max_file_size'),
            '$translator' => service('translator')->ignoreOnInvalid(),
        ])

        // controller
        ->set('joli_media_sonata_admin.controller.admin', MediaAdminController::class)
        ->args([
            '$sonataAdminPool' => service('sonata.admin.pool'),
            '$config' => service('joli_media_sonata_admin.config'),
            '$libraries' => service('joli_media.library_container'),
            '$resolver' => service('joli_media.resolver'),
            '$converter' => service('joli_media.converter'),
            '$translator' => service('translator')->ignoreOnInvalid(),
            '$twig' => service('twig'),
            '$formFactory' => service('form.factory'),
            '$sonataAdminLayoutTemplate' => param('joli_media_sonata_admin.sonata_admin.templates.layout'),
            '$sonataAdminAjaxTemplate' => param('joli_media_sonata_admin.sonata_admin.templates.ajax'),
            '$authorizationChecker' => service('security.authorization_checker')->ignoreOnInvalid(),
        ])
        ->call('setContainer', [service('service_container')])
        ->tag('controller.service_arguments')
        ->alias(MediaAdminController::class, 'joli_media_sonata_admin.controller.admin')
        ->public()

        // form
        ->set('joli_media_sonata_admin.form.data_transfomer.media', MediaTransformer::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
        ])
        ->tag('form.type')
        ->set('joli_media_sonata_admin.form.type.media_choice', MediaChoiceType::class)
        ->args([
            '$resolver' => service('joli_media.resolver'),
            '$libraries' => service('joli_media.library_container'),
            '$transformer' => service('joli_media_sonata_admin.form.data_transfomer.media'),
        ])
        ->tag('form.type')
        ->set('joli_media_sonata_admin.form.type.upload', UploadType::class)
        ->args([
            '$config' => service('joli_media_sonata_admin.config'),
        ])
        ->tag('form.type')

        // security
        ->set('joli_media_admin.security.voter', MediaVoter::class)
        ->tag('security.voter')

        // twig
        ->set('joli_media_admin.twig_extension', JoliMediaAdminExtension::class)
        ->args([
            '$libraries' => service('joli_media.library_container'),
            '$authorizationChecker' => service('security.authorization_checker')->ignoreOnInvalid(),
        ])
        ->tag('twig.extension')

        // type guesser
        ->set('joli_media_sonata_admin.guesser.orm_list', TypeGuesser::class)
        ->tag('sonata.admin.guesser.orm_list')
        ->set('joli_media_sonata_admin.guesser.orm_show', TypeGuesser::class)
        ->tag('sonata.admin.guesser.orm_show')
    ;
};
