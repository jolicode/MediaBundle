<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\DependencyInjection;

use JoliCode\MediaBundle\Bridge\EasyAdmin\JoliMediaEasyAdminBundle;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\Processor;

class ConfigurationTest extends TestCase
{
    public function testDefaultConfiguration(): void
    {
        $config = $this->processConfiguration([]);

        $this->assertArrayHasKey('pagination', $config);
        $this->assertArrayHasKey('per_page', $config['pagination']);
        $this->assertArrayHasKey('infinite_scroll', $config['pagination']);

        $this->assertEquals(50, $config['pagination']['per_page']);
        $this->assertFalse($config['pagination']['infinite_scroll']);
    }

    public function testCustomPaginationConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pagination' => [
                    'per_page' => 100,
                    'infinite_scroll' => true,
                ],
            ],
        ]);

        $this->assertEquals(100, $config['pagination']['per_page']);
        $this->assertTrue($config['pagination']['infinite_scroll']);
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
        $this->assertFalse($config['pagination']['infinite_scroll']);
    }

    public function testInfiniteScrollOnlyConfiguration(): void
    {
        $config = $this->processConfiguration([
            [
                'pagination' => [
                    'infinite_scroll' => true,
                ],
            ],
        ]);

        $this->assertEquals(50, $config['pagination']['per_page']);
        $this->assertTrue($config['pagination']['infinite_scroll']);
    }

    private function processConfiguration(array $configs): array
    {
        $bundle = new JoliMediaEasyAdminBundle();
        $treeBuilder = new TreeBuilder('joli_media_easy_admin');

        // Get the configuration tree from the bundle
        $reflection = new \ReflectionMethod($bundle, 'configure');
        $reflection->setAccessible(true);

        $configurator = $this->createMock(\Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator::class);
        $configurator->expects($this->once())
            ->method('rootNode')
            ->willReturn($treeBuilder->getRootNode())
        ;

        $reflection->invoke($bundle, $configurator);

        $processor = new Processor();

        return $processor->process($treeBuilder->buildTree(), $configs);
    }
}
