<?php

use Rector\Caching\ValueObject\Storage\FileCacheStorage;
use Rector\Config\RectorConfig;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Symfony\Set\SymfonySetList;
use Rector\TypeDeclaration\Rector\StmtsAwareInterface\SafeDeclareStrictTypesRector;

return RectorConfig::configure()
    ->withCache(__DIR__ . '/var/cache/rector', FileCacheStorage::class)
    ->withPaths([
        __DIR__ . '/config',
        __DIR__ . '/migrations',
        __DIR__ . '/public',
        __DIR__ . '/src',
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
    // the Symfony and Twig upgrade sets are picked from the versions in composer.json
    ->withComposerBased(twig: true, doctrine: true, symfony: true)
    ->withSets([
        DoctrineSetList::DOCTRINE_CODE_QUALITY,
        SymfonySetList::SYMFONY_CODE_QUALITY,
        SymfonySetList::SYMFONY_CONSTRUCTOR_INJECTION,
    ])
    ->withSkip([
        SafeDeclareStrictTypesRector::class,
        // Flex-managed file, keep the inline fully qualified class names
        __DIR__ . '/config/bundles.php',
    ])
;
