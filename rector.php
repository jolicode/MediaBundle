<?php

declare(strict_types=1);

use Rector\Caching\ValueObject\Storage\FileCacheStorage;
use Rector\Config\RectorConfig;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Symfony\Configs\Rector\Closure\ServiceTagsToDefaultsAutoconfigureRector;
use Rector\Symfony\Set\SymfonySetList;
use Rector\Symfony\Set\TwigSetList;

return RectorConfig::configure()
    ->withCache('./tools/rector/var/cache', FileCacheStorage::class)
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
        strictBooleans: true,
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
        ServiceTagsToDefaultsAutoconfigureRector::class,
    ])
;
