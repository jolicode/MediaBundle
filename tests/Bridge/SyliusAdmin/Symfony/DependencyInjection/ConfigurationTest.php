<?php

namespace JoliCode\MediaBundle\Tests\Bridge\SyliusAdmin\DependencyInjection;

use JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony\JoliMediaSyliusAdminBundle;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\Config\Definition\Processor;

#[CoversClass(JoliMediaSyliusAdminBundle::class)]
final class ConfigurationTest extends TestCase
{
    public function testDefaultConfiguration(): void
    {
        $config = $this->processConfiguration([]);

        $this->assertArrayHasKey('pagination', $config);
        $this->assertArrayHasKey('per_page', $config['pagination']);

        $this->assertEquals([10, 25, 50], $config['pagination']['per_page']);
    }

    public function testCustomPaginationConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pagination' => [
                    'per_page' => 100,
                ],
            ],
        ]);

        $this->assertEquals(100, $config['pagination']['per_page']);
    }

    public function testUploadConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'upload' => [
                    'max_files' => 20,
                    'max_file_size' => 50,
                    'accepted_files' => ['image/*', 'video/*'],
                ],
            ],
        ]);

        $this->assertArrayHasKey('upload', $config);
        $this->assertEquals(20, $config['upload']['max_files']);
        $this->assertEquals(50, $config['upload']['max_file_size']);
        $this->assertEquals(['image/*', 'video/*'], $config['upload']['accepted_files']);
    }

    public function testVisibilityConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'visibility' => [
                    'show_markdown_code' => true,
                    'show_html_code' => true,
                    'show_variations_stored' => false,
                ],
            ],
        ]);

        $this->assertArrayHasKey('visibility', $config);
        $this->assertTrue($config['visibility']['show_markdown_code']);
        $this->assertTrue($config['visibility']['show_html_code']);
        $this->assertFalse($config['visibility']['show_variations_stored']);
    }

    public function testDefaultUploadConfiguration(): void
    {
        $config = $this->processConfiguration([]);

        $this->assertArrayHasKey('upload', $config);
        $this->assertNull($config['upload']['max_files']);
        $this->assertEquals(20, $config['upload']['max_file_size']);
        $this->assertEquals([], $config['upload']['accepted_files']);
    }

    public function testDefaultVisibilityConfiguration(): void
    {
        $config = $this->processConfiguration([]);

        $this->assertArrayHasKey('visibility', $config);
        $this->assertFalse($config['visibility']['show_markdown_code']);
        $this->assertFalse($config['visibility']['show_html_code']);
        $this->assertFalse($config['visibility']['show_variations_action_regenerate']);
        $this->assertTrue($config['visibility']['show_variations_list']);
        $this->assertFalse($config['visibility']['show_variations_list_admin_variations']);
        $this->assertFalse($config['visibility']['show_variations_stored']);
    }

    public function testPartialConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pagination' => [
                    'per_page' => 25,
                ],
            ],
        ]);

        $this->assertEquals(25, $config['pagination']['per_page']);
    }

    private function processConfiguration(array $configs): array
    {
        $bundle = new JoliMediaSyliusAdminBundle();
        $treeBuilder = new TreeBuilder('joli_media_sylius_admin');

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
