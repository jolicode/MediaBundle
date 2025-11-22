<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\DependencyInjection;

use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\EasyAdmin\JoliMediaEasyAdminBundle;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;

class ServiceTest extends TestCase
{
    public function testConfigServiceIsRegistered(): void
    {
        $container = $this->createContainer();

        $this->assertTrue(
            class_exists(Config::class),
            'Config class should exist'
        );
    }

    public function testConfigCanBeInstantiatedWithDefaultValues(): void
    {
        $translator = $this->createMock(\Symfony\Contracts\Translation\TranslatorInterface::class);

        $config = new Config(
            $translator,
            [],
            [],
            20
        );

        $this->assertInstanceOf(Config::class, $config);
        $this->assertNull($config->getPerPage());
        $this->assertFalse($config->isInfiniteScrollEnabled());
    }

    public function testConfigCanBeInstantiatedWithCustomPagination(): void
    {
        $translator = $this->createMock(\Symfony\Contracts\Translation\TranslatorInterface::class);

        $config = new Config(
            $translator,
            [],
            [],
            20,
            null,
            100,
            true
        );

        $this->assertEquals(100, $config->getPerPage());
        $this->assertTrue($config->isInfiniteScrollEnabled());
    }

    public function testConfigWithAllParameters(): void
    {
        $translator = $this->createMock(\Symfony\Contracts\Translation\TranslatorInterface::class);

        $visibility = [
            'show_variations_list' => true,
            'show_html_code' => true,
        ];

        $acceptedFiles = ['image/*', 'video/*'];

        $config = new Config(
            $translator,
            $visibility,
            $acceptedFiles,
            50,
            10,
            25,
            true
        );

        $this->assertTrue($config->isVisible('show_variations_list'));
        $this->assertTrue($config->isVisible('show_html_code'));
        $this->assertEquals($acceptedFiles, $config->getUploadOption('acceptedFiles'));
        $this->assertEquals(50, $config->getUploadOption('maxFileSize'));
        $this->assertEquals(10, $config->getUploadOption('maxFiles'));
        $this->assertEquals(25, $config->getPerPage());
        $this->assertTrue($config->isInfiniteScrollEnabled());
    }

    private function createContainer(array $config = []): ContainerBuilder
    {
        $container = new ContainerBuilder(new ParameterBag([
            'kernel.bundles' => [
                'JoliMediaBundle' => true,
                'EasyAdminBundle' => true,
            ],
            'kernel.project_dir' => __DIR__,
        ]));

        $bundle = new JoliMediaEasyAdminBundle();

        $defaultConfig = [
            'pagination' => [
                'per_page' => 50,
                'infinite_scroll' => false,
            ],
            'upload' => [
                'max_files' => null,
                'max_file_size' => 20,
                'accepted_files' => [],
            ],
            'visibility' => [
                'show_markdown_code' => false,
                'show_html_code' => false,
                'show_variations_action_regenerate' => false,
                'show_variations_list' => true,
                'show_variations_list_admin_variations' => false,
                'show_variations_stored' => false,
            ],
        ];

        $mergedConfig = array_replace_recursive($defaultConfig, $config);

        $container->setParameter('joli_media_easy_admin.config', $mergedConfig);

        return $container;
    }
}
