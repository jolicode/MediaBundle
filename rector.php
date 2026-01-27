<?php

declare(strict_types=1);

use Rector\Caching\ValueObject\Storage\FileCacheStorage;
use Rector\Config\RectorConfig;
use Rector\DeadCode\Rector\If_\RemoveAlwaysTrueIfConditionRector;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Symfony\CodeQuality\Rector\Class_\ControllerMethodInjectionToConstructorRector;
use Rector\Symfony\Configs\Rector\Closure\FromServicePublicToDefaultsPublicRector;
use Rector\Symfony\Configs\Rector\Closure\ServiceTagsToDefaultsAutoconfigureRector;
use Rector\Symfony\Set\SymfonySetList;
use Rector\Symfony\Set\TwigSetList;

return RectorConfig::configure()
    ->withCache('./tools/rector/var/cache/bundle', FileCacheStorage::class)
    ->withPaths([
        __DIR__ . '/config',
        __DIR__ . '/src',
        __DIR__ . '/tests/src',
    ])
    ->withImportNames(importShortClasses: false, removeUnusedImports: true)
    ->withParallel(120, 4, 16)
    ->withPhpSets()
    ->withPreparedSets(
        codeQuality: true,
        deadCode: true,
        codingStyle: true,
        earlyReturn: false,
        naming: false,
        typeDeclarations: true,
    )
    ->withSets([
        DoctrineSetList::DOCTRINE_CODE_QUALITY,
        SymfonySetList::CONFIGS,
        SymfonySetList::SYMFONY_70,
        SymfonySetList::SYMFONY_71,
        SymfonySetList::SYMFONY_72,
        SymfonySetList::SYMFONY_CODE_QUALITY,
        SymfonySetList::SYMFONY_CONSTRUCTOR_INJECTION,
        TwigSetList::TWIG_UNDERSCORE_TO_NAMESPACE,
    ])
    ->withSkip([
        RemoveAlwaysTrueIfConditionRector::class => [
            __DIR__ . '/tests/src/Twig/Component/PictureTest.php',
        ],
        ControllerMethodInjectionToConstructorRector::class => [
            __DIR__ . '/src/Bridge/EasyAdmin/src/Controller/MediaAdminController.php',
        ],
        ServiceTagsToDefaultsAutoconfigureRector::class,
        FromServicePublicToDefaultsPublicRector::class,
    ])
;
