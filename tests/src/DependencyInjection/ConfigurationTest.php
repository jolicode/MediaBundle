<?php

namespace JoliCode\MediaBundle\Tests\DependencyInjection;

use JoliCode\MediaBundle\JoliMediaBundle;
use JoliCode\MediaBundle\PreProcessor\ExifRemovalPreProcessor;
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
