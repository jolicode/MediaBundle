<?php

namespace JoliCode\MediaBundle\Tests\DependencyInjection;

use JoliCode\MediaBundle\Inspector\ProcessingChainInspector;
use JoliCode\MediaBundle\Inspector\ProcessorStatus;
use JoliCode\MediaBundle\PreProcessor\AutoOrientPreProcessor;
use JoliCode\MediaBundle\PreProcessor\HeifPreProcessor;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class PreProcessorsRegistrationTest extends BaseTestCase
{
    public function testTheBundlePreProcessorsAreRegisteredByDefaultInOrder(): void
    {
        /** @var ProcessingChainInspector $inspector */
        $inspector = static::getContainer()->get('joli_media.processing_chain_inspector');

        $classes = array_map(
            static fn (ProcessorStatus $preProcessor): ?string => $preProcessor->class,
            $inspector->inspect()->preProcessors,
        );

        self::assertSame([HeifPreProcessor::class, AutoOrientPreProcessor::class], $classes);
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
