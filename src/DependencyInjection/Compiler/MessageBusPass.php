<?php

namespace JoliCode\MediaBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\Messenger\MessageBusInterface;

/**
 * Makes sure that the store_on_create_message_bus setting names a Messenger
 * bus, so that a misconfiguration fails when the container is compiled rather
 * than when a media is created.
 */
class MessageBusPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        if (!$container->hasDefinition('joli_media.event_listener.store_variations')) {
            return;
        }

        $arguments = $container->getDefinition('joli_media.event_listener.store_variations')->getArguments();
        $bus = $arguments['$messageBus'] ?? null;

        if (!$bus instanceof Reference) {
            return;
        }

        $id = (string) $bus;

        if (!interface_exists(MessageBusInterface::class)) {
            throw new InvalidArgumentException(\sprintf('The "joli_media.store_on_create_message_bus" setting is "%s", but the Messenger component is not installed. Run "composer require symfony/messenger", or set the setting to null to generate the variations synchronously.', $id));
        }

        if (!$container->has($id)) {
            throw new InvalidArgumentException(\sprintf('The "joli_media.store_on_create_message_bus" setting is "%s", but there is no such service. Set it to the id of a Messenger bus, such as "messenger.default_bus", or to null to generate the variations synchronously.', $id));
        }

        $class = $container->getParameterBag()->resolveValue($container->findDefinition($id)->getClass());

        if (!\is_string($class) || !is_a($class, MessageBusInterface::class, true)) {
            throw new InvalidArgumentException(\sprintf('The "joli_media.store_on_create_message_bus" setting is "%s", which is not a Messenger bus: its class does not implement %s. Set it to the id of a Messenger bus, such as "messenger.default_bus", or to null to generate the variations synchronously.', $id, MessageBusInterface::class));
        }
    }
}
