<?php

namespace JoliCode\MediaBundle\Tests\Inspector;

use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Inspector\DataCollector;
use JoliCode\MediaBundle\Inspector\ProcessingChainInspector;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DataCollectorTest extends TestCase
{
    public function testAHealthyProcessingChainDoesNotRaiseAWarning(): void
    {
        $collector = $this->createCollector(['imagine' => ['binaries' => ['php' => \PHP_BINARY]]]);

        $collector->collect(new Request(), new Response());

        self::assertFalse($collector->hasProcessingChainWarning());
        self::assertSame(0, $collector->getProcessors()['brokenProcessorsCount'] ?? null);
    }

    public function testAMissingBinaryRaisesAWarning(): void
    {
        $collector = $this->createCollector(['imagine' => ['binaries' => ['php' => '/nonexistent/binary']]]);

        $collector->collect(new Request(), new Response());

        self::assertTrue($collector->hasProcessingChainWarning());
        self::assertSame(1, $collector->getProcessors()['brokenProcessorsCount'] ?? null);
    }

    public function testBeingLimitedToWebpRaisesAWarning(): void
    {
        $collector = new DataCollector(
            new LibraryContainer(new ServiceLocator([])),
            null,
            new ProcessingChainInspector(new ProcessorContainer(), new PostProcessorContainer()),
        );

        $collector->collect(new Request(), new Response());

        self::assertTrue($collector->hasProcessingChainWarning());
        self::assertSame(0, $collector->getProcessors()['brokenProcessorsCount'] ?? null);
    }

    public function testNoWarningIsRaisedWithoutAnInspector(): void
    {
        $collector = new DataCollector(new LibraryContainer(new ServiceLocator([])));

        $collector->collect(new Request(), new Response());

        self::assertFalse($collector->hasProcessingChainWarning());
    }

    /**
     * @param array<string, array{binaries?: array<string, string>, unavailabilityReason?: string|null}> $processorDiagnostics
     */
    private function createCollector(array $processorDiagnostics): DataCollector
    {
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('imagine', new Imagine(new ImagickImagine()));

        return new DataCollector(
            new LibraryContainer(new ServiceLocator([])),
            null,
            new ProcessingChainInspector($processorContainer, new PostProcessorContainer(), [], $processorDiagnostics),
        );
    }
}
