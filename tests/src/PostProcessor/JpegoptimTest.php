<?php

namespace JoliCode\MediaBundle\Tests\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\PostProcessor\Jpegoptim;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class JpegoptimTest extends TestCase
{
    private string $fakeBinary;

    protected function setUp(): void
    {
        // shrinks the processed file to a single byte, so that its execution is visible
        $this->fakeBinary = tempnam(sys_get_temp_dir(), 'fake-jpegoptim');
        file_put_contents($this->fakeBinary, "#!/bin/sh\nfor last; do :; done\nprintf x > \"\$last\"\n");
        chmod($this->fakeBinary, 0o755);
    }

    protected function tearDown(): void
    {
        unlink($this->fakeBinary);
    }

    /**
     * @param array<string, mixed> $globalOptions
     * @param array<string, mixed> $postProcessingOptions
     */
    #[DataProvider('provideEnabledOptions')]
    public function testTheEnabledOptionOfTheVariationOverridesTheGlobalOne(array $globalOptions, array $postProcessingOptions, bool $expectedToRun): void
    {
        $postProcessor = new Jpegoptim($this->fakeBinary, $globalOptions);

        $binary = $postProcessor->process(new Binary('image/jpeg', 'jpeg', 'original content'), $postProcessingOptions);

        $this->assertSame($expectedToRun ? 'x' : 'original content', $binary->getContent());
    }

    public static function provideEnabledOptions(): \Generator
    {
        yield 'enabled by default' => [[], [], true];
        yield 'disabled globally' => [['enabled' => false], [], false];
        yield 'disabled globally, other variation options' => [['enabled' => false], ['max_quality' => 70], false];
        yield 'disabled globally, enabled by the variation' => [['enabled' => false], ['enabled' => true], true];
        yield 'enabled globally, disabled by the variation' => [['enabled' => true], ['enabled' => false], false];
    }
}
