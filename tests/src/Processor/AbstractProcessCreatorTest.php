<?php

namespace JoliCode\MediaBundle\Tests\Processor;

use JoliCode\MediaBundle\Processor\AbstractProcessCreator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Process\Process;

class AbstractProcessCreatorTest extends TestCase
{
    public function testDefaultTimeoutIsAppliedWhenNotConfigured(): void
    {
        $process = (new ProcessCreator())->create(['ls']);

        self::assertSame(60.0, $process->getTimeout());
    }

    public function testConfiguredTimeoutIsApplied(): void
    {
        $process = (new ProcessCreator(120.0))->create(['ls']);

        self::assertSame(120.0, $process->getTimeout());
    }

    public function testZeroTimeoutDisablesTheTimeout(): void
    {
        $process = (new ProcessCreator(0.0))->create(['ls']);

        self::assertNull($process->getTimeout());
    }

    public function testPerCallTimeoutOverridesTheConfiguredTimeout(): void
    {
        $process = (new ProcessCreator(120.0))->create(['ls'], [
            'process' => [
                'timeout' => 30,
            ],
        ]);

        self::assertSame(30.0, $process->getTimeout());
    }
}

readonly class ProcessCreator extends AbstractProcessCreator
{
    public function __construct(
        private ?float $processTimeout = null,
    ) {
    }

    /**
     * @param array<int|string|null> $arguments
     * @param array<string, mixed>   $options
     */
    public function create(array $arguments = [], array $options = []): Process
    {
        return $this->createProcess($arguments, $options);
    }

    protected function getProcessTimeout(): ?float
    {
        return $this->processTimeout;
    }
}
