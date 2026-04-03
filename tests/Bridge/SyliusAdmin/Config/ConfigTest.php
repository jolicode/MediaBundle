<?php

namespace JoliCode\MediaBundle\Tests\Bridge\SyliusAdmin\Config;

use JoliCode\MediaBundle\Bridge\SyliusAdmin\Config\Config;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\Translation\TranslatorInterface;

class ConfigTest extends TestCase
{
    private TranslatorInterface $translator;

    protected function setUp(): void
    {
        $this->translator = $this->createMock(TranslatorInterface::class);
        $this->translator->method('trans')->willReturnArgument(0);
    }

    public function testGetPaginationSizesCustomValue(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [25, 50, 100],
        );

        $this->assertSame([25, 50, 100], $config->getPaginationSizes());
    }

    public function testIsVisibleReturnsTrueWhenKeyExists(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: ['show_variations_list' => true],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->assertTrue($config->isVisible('show_variations_list'));
    }

    public function testIsVisibleReturnsFalseWhenKeyDoesNotExist(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->assertFalse($config->isVisible('non_existent_key'));
    }

    public function testIsVisibleReturnsFalseWhenKeyIsFalse(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: ['show_variations_list' => false],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->assertFalse($config->isVisible('show_variations_list'));
    }

    public function testGetUploadOptionAcceptedFiles(): void
    {
        $acceptedFiles = ['image/*', 'video/*'];
        $config = new Config(
            translator: $this->translator,
            visibility: ['show_variations_list' => false],
            acceptedFiles: $acceptedFiles,
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->assertEquals($acceptedFiles, $config->getUploadOption('acceptedFiles'));
    }

    public function testGetUploadOptionMaxFileSize(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: ['show_variations_list' => false],
            acceptedFiles: [],
            maxFileSize: 50,
            paginationSizes: [],
        );

        $this->assertEquals(50, $config->getUploadOption('maxFileSize'));
    }

    public function testGetUploadOptionMaxFiles(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: ['show_variations_list' => false],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
            maxFiles: 10,
        );

        $this->assertEquals(10, $config->getUploadOption('maxFiles'));
    }

    public function testGetUploadOptionThrowsExceptionForUnknownOption(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Unknown upload option "unknown".');

        $config->getUploadOption('unknown');
    }

    public function testGetUploadOptions(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: ['image/*'],
            maxFileSize: 20,
            paginationSizes: [],
            maxFiles: 10,
        );

        $options = $config->getUploadOptions();

        $this->assertIsArray($options);
        $this->assertArrayHasKey('maxFilesize', $options);
        $this->assertArrayHasKey('maxFiles', $options);
        $this->assertArrayHasKey('acceptedFiles', $options);
        $this->assertEquals(20, $options['maxFilesize']);
        $this->assertEquals(10, $options['maxFiles']);
        $this->assertEquals('image/*', $options['acceptedFiles']);
    }

    public function testGetUploadOptionsWithoutMaxFiles(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: ['image/*'],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('maxFiles', $options);
    }

    public function testGetUploadOptionsWithEmptyAcceptedFiles(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 20,
            paginationSizes: [],
        );

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('acceptedFiles', $options);
    }
}
