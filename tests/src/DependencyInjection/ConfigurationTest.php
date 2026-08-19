<?php

namespace JoliCode\MediaBundle\Tests\DependencyInjection;

use JoliCode\MediaBundle\JoliMediaBundle;
use JoliCode\MediaBundle\PreProcessor\ExifRemovalPreProcessor;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;
use Symfony\Component\Config\Definition\Processor;

class ConfigurationTest extends TestCase
{
    public function testDefaultProcessTimeoutConfiguration(): void
    {
        $config = $this->processConfiguration([]);

        $this->assertSame(60.0, $config['process_timeout']);
        $this->assertNull($config['processors']['cwebp']['process_timeout']);
        $this->assertNull($config['processors']['gif2webp']['process_timeout']);
        $this->assertNull($config['processors']['gifsicle']['process_timeout']);
        $this->assertNull($config['post_processors']['gifsicle']['process_timeout']);
        $this->assertNull($config['post_processors']['jpegoptim']['process_timeout']);
        $this->assertNull($config['post_processors']['mozjpeg']['process_timeout']);
        $this->assertNull($config['post_processors']['oxipng']['process_timeout']);
        $this->assertNull($config['post_processors']['pngquant']['process_timeout']);
    }

    public function testGlobalProcessTimeoutConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'process_timeout' => 120,
            ],
        ]);

        $this->assertSame(120, $config['process_timeout']);
    }

    public function testProcessorProcessTimeoutConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'processors' => [
                    'cwebp' => [
                        'process_timeout' => 120,
                    ],
                ],
                'post_processors' => [
                    'jpegoptim' => [
                        'process_timeout' => 0,
                    ],
                ],
            ],
        ]);

        $this->assertSame(120, $config['processors']['cwebp']['process_timeout']);
        $this->assertSame(0, $config['post_processors']['jpegoptim']['process_timeout']);
        $this->assertNull($config['processors']['gif2webp']['process_timeout']);
    }

    public function testNegativeProcessTimeoutIsRejected(): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->processConfiguration([
            [
                'process_timeout' => -1,
            ],
        ]);
    }

    public function testPreProcessorsListConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pre_processors' => [
                    ExifRemovalPreProcessor::class,
                ],
            ],
        ]);

        $this->assertSame([ExifRemovalPreProcessor::class], array_keys($config['pre_processors']));
        $this->assertNull($config['pre_processors'][ExifRemovalPreProcessor::class]['process_timeout']);
    }

    public function testPreProcessorsMapConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pre_processors' => [
                    ExifRemovalPreProcessor::class => [
                        'process_timeout' => 120,
                    ],
                    'App\PreProcessor\CustomPreProcessor' => null,
                ],
            ],
        ]);

        $this->assertSame(120, $config['pre_processors'][ExifRemovalPreProcessor::class]['process_timeout']);
        $this->assertNull($config['pre_processors']['App\PreProcessor\CustomPreProcessor']['process_timeout']);
    }

    public function testDefaultTrashPathConfiguration(): void
    {
        // the default value bypasses the normalization, so it must already be normalized
        $this->assertSame('.trash', $this->processOriginalStorageConfiguration([]));
    }

    #[DataProvider('provideTrashPathsToNormalize')]
    public function testTrashPathIsNormalized(string $trashPath, string $expected): void
    {
        $this->assertSame($expected, $this->processOriginalStorageConfiguration(['trash_path' => $trashPath]));
    }

    /**
     * @return iterable<string, array{string, string}>
     */
    public static function provideTrashPathsToNormalize(): iterable
    {
        yield 'a trailing slash' => ['trash/', 'trash'];
        yield 'a leading slash' => ['/trash', 'trash'];
        yield 'a leading dot segment' => ['./trash/', 'trash'];
        yield 'duplicated slashes' => ['/.trash//sub/', '.trash/sub'];
    }

    #[DataProvider('provideEmptyTrashPaths')]
    public function testEmptyTrashPathIsRejected(string $trashPath): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->processOriginalStorageConfiguration(['trash_path' => $trashPath]);
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function provideEmptyTrashPaths(): iterable
    {
        yield 'an empty string' => [''];
        // these only become empty once normalized, which proves the normalization
        // runs before the emptiness check
        yield 'a single slash' => ['/'];
        yield 'duplicated slashes' => ['//'];
    }

    #[DataProvider('provideTrashPathsWithADotSegment')]
    public function testTrashPathWithADotSegmentIsRejected(string $trashPath): void
    {
        $this->expectException(InvalidConfigurationException::class);

        $this->processOriginalStorageConfiguration(['trash_path' => $trashPath]);
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function provideTrashPathsWithADotSegment(): iterable
    {
        yield 'a leading parent segment' => ['../trash'];
        yield 'an inner parent segment' => ['trash/../../etc'];
        // this one normalizes to "." rather than to an empty string, so it escapes
        // the emptiness check while still pointing at the storage root
        yield 'a lone dot segment' => ['/./'];
    }

    /**
     * @param array<string, mixed> $original
     */
    private function processOriginalStorageConfiguration(array $original): string
    {
        $config = $this->processConfiguration([
            [
                'libraries' => [
                    'default' => [
                        'original' => ['flysystem' => 'flysystem.original'] + $original,
                        'cache' => ['flysystem' => 'flysystem.cache'],
                    ],
                ],
            ],
        ]);

        return $config['libraries']['default']['original']['trash_path'];
    }

    /**
     * @param array<array<string, mixed>> $configs
     *
     * @return array<string, mixed>
     */
    private function processConfiguration(array $configs): array
    {
        $bundle = new JoliMediaBundle();
        $treeBuilder = new TreeBuilder('joli_media');

        $configurator = $this->createMock(DefinitionConfigurator::class);
        $configurator->expects($this->once())
            ->method('rootNode')
            ->willReturn($treeBuilder->getRootNode())
        ;

        $bundle->configure($configurator);

        $processor = new Processor();

        return $processor->process($treeBuilder->buildTree(), $configs);
    }
}
