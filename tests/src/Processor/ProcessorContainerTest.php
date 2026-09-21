<?php

namespace JoliCode\MediaBundle\Tests\Processor;

use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Tests\Transformation\StubProcessor;

class ProcessorContainerTest extends BaseTestCase
{
    public function testListReturnsTheRegisteredProcessors(): void
    {
        $container = new ProcessorContainer();
        self::assertSame([], $container->list());

        $imagine = new StubProcessor(self::getFixtureBinary('webp'));
        $container->add('imagine', $imagine);

        self::assertSame(['imagine' => $imagine], $container->list());
    }

    public function testProcessorsAreTriedInPriorityOrderWhateverTheRegistrationOrder(): void
    {
        $container = new ProcessorContainer();
        $processors = [];

        // register them in reverse order: the priority must not depend on it
        foreach (['imagine', 'gifsicle', 'gif2webp', 'cwebp'] as $name) {
            $processors[$name] = new StubProcessor(self::getFixtureBinary('webp'));
            $container->add($name, $processors[$name]);
        }

        self::assertSame(
            [$processors['cwebp'], $processors['gif2webp'], $processors['gifsicle'], $processors['imagine']],
            $container->getProcessors('jpeg', 'webp'),
        );
    }

    public function testAProcessorRegisteredUnderAnUnknownNameIsIgnored(): void
    {
        // third-party processors have no place in the priority order yet
        $container = new ProcessorContainer();
        $container->add('third_party', new StubProcessor(self::getFixtureBinary('webp')));

        self::assertSame([], $container->getProcessors('jpeg', 'webp'));
        self::assertArrayHasKey('third_party', $container->list());
    }
}
