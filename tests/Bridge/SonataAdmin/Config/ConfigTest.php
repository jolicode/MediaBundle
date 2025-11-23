<?php

namespace JoliCode\MediaBundle\Tests\Bridge\SonataAdmin\Config;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Config\Config;
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

    public function testGetPerPageDefaultValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            null,
            null
        );

        $this->assertNull($config->getPerPage());
    }

    public function testGetPerPageCustomValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            null,
            100
        );

        $this->assertEquals(100, $config->getPerPage());
    }

    public function testIsVisibleReturnsTrueWhenKeyExists(): void
    {
        $config = new Config(
            $this->translator,
            ['show_variations_list' => true],
            [],
            20
        );

        $this->assertTrue($config->isVisible('show_variations_list'));
    }

    public function testIsVisibleReturnsFalseWhenKeyDoesNotExist(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20
        );

        $this->assertFalse($config->isVisible('non_existent_key'));
    }

    public function testIsVisibleReturnsFalseWhenKeyIsFalse(): void
    {
        $config = new Config(
            $this->translator,
            ['show_variations_list' => false],
            [],
            20
        );

        $this->assertFalse($config->isVisible('show_variations_list'));
    }

    public function testGetUploadOptionAcceptedFiles(): void
    {
        $acceptedFiles = ['image/*', 'video/*'];
        $config = new Config(
            $this->translator,
            [],
            $acceptedFiles,
            20
        );

        $this->assertEquals($acceptedFiles, $config->getUploadOption('acceptedFiles'));
    }

    public function testGetUploadOptionMaxFileSize(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            50
        );

        $this->assertEquals(50, $config->getUploadOption('maxFileSize'));
    }

    public function testGetUploadOptionMaxFiles(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            10
        );

        $this->assertEquals(10, $config->getUploadOption('maxFiles'));
    }

    public function testGetUploadOptionThrowsExceptionForUnknownOption(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20
        );

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Unknown upload option "unknown".');

        $config->getUploadOption('unknown');
    }

    public function testGetUploadOptions(): void
    {
        $config = new Config(
            $this->translator,
            [],
            ['image/*'],
            20,
            10
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
            $this->translator,
            [],
            [],
            20,
            null
        );

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('maxFiles', $options);
    }

    public function testGetUploadOptionsWithEmptyAcceptedFiles(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20
        );

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('acceptedFiles', $options);
    }
}
