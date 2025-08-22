<?php

namespace JoliCode\MediaBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class CollectorPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        // remove the TransformationDataHolder service if the Profiler is not enabled
        if (!$container->hasDefinition('profiler')) {
            $container->removeDefinition('joli_media.data_collector.transformation_data_holder');
        }
    }
}
