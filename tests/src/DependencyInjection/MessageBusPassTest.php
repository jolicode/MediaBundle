<?php

namespace JoliCode\MediaBundle\Tests\DependencyInjection;

use JoliCode\MediaBundle\DependencyInjection\Compiler\MessageBusPass;
use JoliCode\MediaBundle\Event\Listener\StoreVariationsEventListener;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\Messenger\MessageBus;

class MessageBusPassTest extends TestCase
{
    public function testAMessengerBusIsAccepted(): void
    {
        $container = $this->createContainer('messenger.default_bus');
        $container->register('messenger.bus.default', MessageBus::class);
        $container->setAlias('messenger.default_bus', 'messenger.bus.default');

        (new MessageBusPass())->process($container);

        $this->addToAssertionCount(1);
    }

    public function testNoBusIsAccepted(): void
    {
        (new MessageBusPass())->process($this->createContainer(null));

        $this->addToAssertionCount(1);
    }

    public function testAMissingServiceIsRejected(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('there is no such service');

        (new MessageBusPass())->process($this->createContainer('messenger.default_bus'));
    }

    public function testAServiceThatIsNotABusIsRejected(): void
    {
        $container = $this->createContainer('logger');
        $container->register('logger', NullLogger::class);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('which is not a Messenger bus');

        (new MessageBusPass())->process($container);
    }

    private function createContainer(?string $bus): ContainerBuilder
    {
        $container = new ContainerBuilder();
        $listener = $container->register('joli_media.event_listener.store_variations', StoreVariationsEventListener::class);

        if (null !== $bus) {
            $listener->setArgument('$messageBus', new Reference($bus));
        }

        return $container;
    }
}
