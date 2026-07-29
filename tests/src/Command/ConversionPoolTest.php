<?php

namespace JoliCode\MediaBundle\Tests\Command;

use JoliCode\MediaBundle\Command\ConversionPool;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\Process\Process;

class ConversionPoolTest extends TestCase
{
    public function testFailedProcessesAreReported(): void
    {
        $pool = new ConversionPool(
            'default',
            2,
            2,
            null,
            false,
            new ProgressBar(new NullOutput()),
            static fn (array $paths): Process => new Process([\PHP_BINARY, '-r', 'fwrite(STDERR, "boom"); exit(1);']),
        );

        $pool->add('test/a.jpeg');
        $pool->add('test/b.jpeg');
        $pool->add('test/c.jpeg');
        $pool->run();

        self::assertTrue($pool->hasFailures());
        $failures = $pool->getFailures();
        self::assertCount(2, $failures);
        self::assertSame([['test/a.jpeg', 'test/b.jpeg'], ['test/c.jpeg']], array_column($failures, 'paths'));

        foreach ($failures as $failure) {
            self::assertSame(1, $failure['exitCode']);
            self::assertStringContainsString('boom', $failure['errorOutput']);
        }
    }

    public function testSuccessfulProcessesAreNotReported(): void
    {
        $pool = new ConversionPool(
            'default',
            2,
            2,
            null,
            false,
            new ProgressBar(new NullOutput()),
            static fn (array $paths): Process => new Process([\PHP_BINARY, '-r', 'exit(0);']),
        );

        $pool->add('test/a.jpeg');
        $pool->run();

        self::assertFalse($pool->hasFailures());
        self::assertSame([], $pool->getFailures());
    }
}
