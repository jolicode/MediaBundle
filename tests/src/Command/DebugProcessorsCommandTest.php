<?php

namespace JoliCode\MediaBundle\Tests\Command;

use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Command\Debug\ProcessorsCommand;
use JoliCode\MediaBundle\Inspector\ProcessingChainInspector;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Cwebp;
use JoliCode\MediaBundle\Processor\Gifsicle;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;

class DebugProcessorsCommandTest extends TestCase
{
    private const DIAGNOSTICS = [
        'cwebp' => ['binaries' => ['cwebp' => \PHP_BINARY], 'unavailabilityReason' => 'it is not configured'],
        'gifsicle' => ['binaries' => ['gifsicle' => \PHP_BINARY], 'unavailabilityReason' => null],
        'imagine' => ['binaries' => [], 'unavailabilityReason' => 'it is disabled in the "joli_media.processors.imagine.options.enabled" configuration'],
    ];

    public function testItWarnsWhenTheImagineProcessorIsNotRegistered(): void
    {
        // only a GIF processor is registered: no JPEG or PNG variation can be produced
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('gifsicle', new Gifsicle());

        $commandTester = $this->createCommandTester($processorContainer, self::DIAGNOSTICS);

        $exitCode = $commandTester->execute([]);
        $display = $commandTester->getDisplay();

        // the binary of the only registered processor exists, so this is a warning, not a failure
        self::assertSame(Command::SUCCESS, $exitCode);
        self::assertStringContainsString('gifsicle', $display);
        self::assertStringContainsString('not registered', $display);
        self::assertStringContainsString('joli_media.processors.imagine.options.enabled', $display);
        self::assertStringContainsString('can only output gif files', $display);
        self::assertStringContainsString('Enable the "imagine" processor', $display);
    }

    public function testItSucceedsWhenTheImagineProcessorIsRegistered(): void
    {
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('gifsicle', new Gifsicle());
        $processorContainer->add('imagine', new Imagine(new ImagickImagine()));

        $commandTester = $this->createCommandTester($processorContainer, self::DIAGNOSTICS);

        $exitCode = $commandTester->execute([]);

        self::assertSame(Command::SUCCESS, $exitCode);
        self::assertStringContainsString('avif, gif, jpeg, png, webp', $commandTester->getDisplay());
        self::assertStringNotContainsString('can only output', $commandTester->getDisplay());
        self::assertStringContainsString('Every registered processor has its binaries available', $commandTester->getDisplay());
    }

    public function testItFailsWhenARegisteredProcessorPointsAtAMissingBinary(): void
    {
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('cwebp', new Cwebp());

        $diagnostics = self::DIAGNOSTICS;
        $diagnostics['cwebp']['binaries'] = ['cwebp' => '/nonexistent/cwebp'];
        $commandTester = $this->createCommandTester($processorContainer, $diagnostics);

        $exitCode = $commandTester->execute([]);

        self::assertSame(Command::FAILURE, $exitCode);
        self::assertStringContainsString('/nonexistent/cwebp', $commandTester->getDisplay());
        self::assertStringContainsString('binary missing', $commandTester->getDisplay());
        self::assertStringContainsString('JOLI_MEDIA_*_BINARY', $commandTester->getDisplay());
    }

    public function testTheNoFailOptionKeepsTheCommandInformational(): void
    {
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('cwebp', new Cwebp());

        $diagnostics = self::DIAGNOSTICS;
        $diagnostics['cwebp']['binaries'] = ['cwebp' => '/nonexistent/cwebp'];
        $commandTester = $this->createCommandTester($processorContainer, $diagnostics);

        self::assertSame(Command::SUCCESS, $commandTester->execute(['--no-fail' => true]));
        self::assertStringContainsString('/nonexistent/cwebp', $commandTester->getDisplay());
    }

    /**
     * @param array<string, array{binaries: array<string, string>, unavailabilityReason: string|null}> $diagnostics
     */
    private function createCommandTester(ProcessorContainer $processorContainer, array $diagnostics): CommandTester
    {
        return new CommandTester(new ProcessorsCommand(new ProcessingChainInspector(
            $processorContainer,
            new PostProcessorContainer(),
            [],
            $diagnostics,
        )));
    }
}
