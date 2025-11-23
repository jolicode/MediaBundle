<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class DoctrinePass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        $bundles = $container->getParameter('kernel.bundles');

        if (isset($bundles['DoctrineBundle'])) {
            return;
        }

        $container->removeDefinition('joli_media.cache_warmer.media_entity_metadata');
        $container->removeDefinition('joli_media.event_listener.folder_delete');
        $container->removeDefinition('joli_media.event_listener.folder_move');
        $container->removeDefinition('joli_media.event_listener.media_delete');
        $container->removeDefinition('joli_media.event_listener.media_move');
    }
}
