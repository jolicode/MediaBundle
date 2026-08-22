<?php

namespace JoliCode\MediaBundle\Tests\Bridge\Config;

use JoliCode\MediaBundle\Bridge\Config\AbstractConfig;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\Translation\TranslatorInterface;

class AbstractConfigTest extends TestCase
{
    private TranslatorInterface $translator;

    protected function setUp(): void
    {
        $this->translator = $this->createMock(TranslatorInterface::class);
        $this->translator->method('trans')->willReturnArgument(0);
    }

    public function testIsVisibleReturnsTrueWhenKeyExists(): void
    {
        $config = $this->createConfig(visibility: ['show_variations_list' => true]);

        $this->assertTrue($config->isVisible('show_variations_list'));
    }

    public function testIsVisibleReturnsFalseWhenKeyDoesNotExist(): void
    {
        $config = $this->createConfig();

        $this->assertFalse($config->isVisible('non_existent_key'));
    }

    public function testIsVisibleReturnsFalseWhenKeyIsFalse(): void
    {
        $config = $this->createConfig(visibility: ['show_variations_list' => false]);

        $this->assertFalse($config->isVisible('show_variations_list'));
    }

    public function testGetUploadOptionAcceptedFiles(): void
    {
        $acceptedFiles = ['image/*', 'video/*'];
        $config = $this->createConfig(acceptedFiles: $acceptedFiles);

        $this->assertEquals($acceptedFiles, $config->getUploadOption('acceptedFiles'));
    }

    public function testGetUploadOptionMaxFileSize(): void
    {
        $config = $this->createConfig(maxFileSize: 50);

        $this->assertEquals(50, $config->getUploadOption('maxFileSize'));
    }

    public function testGetUploadOptionMaxFiles(): void
    {
        $config = $this->createConfig(maxFiles: 10);

        $this->assertEquals(10, $config->getUploadOption('maxFiles'));
    }

    public function testGetUploadOptionThrowsExceptionForUnknownOption(): void
    {
        $config = $this->createConfig();

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Unknown upload option "unknown".');

        $config->getUploadOption('unknown');
    }

    public function testGetUploadOptions(): void
    {
        $config = $this->createConfig(acceptedFiles: ['image/*'], maxFiles: 10);

        $options = $config->getUploadOptions();

        $this->assertIsArray($options);
        $this->assertArrayHasKey('messages', $options);
        $this->assertArrayHasKey('maxFileSize', $options);
        $this->assertArrayHasKey('maxFiles', $options);
        $this->assertArrayHasKey('acceptedFiles', $options);
        $this->assertEquals(20, $options['maxFileSize']);
        $this->assertEquals(10, $options['maxFiles']);
        $this->assertEquals('image/*', $options['acceptedFiles']);
        $this->assertSame([
            'default' => 'media.upload.uploader.default_message',
            'fileTooBig' => 'media.upload.uploader.file_too_big',
            'invalidFileType' => 'media.upload.uploader.invalid_file_type',
            'maxFilesExceeded' => 'media.upload.uploader.max_files_exceeded',
            'responseError' => 'media.upload.uploader.response_error',
        ], $options['messages']);
    }

    public function testGetUploadOptionsWithoutMaxFiles(): void
    {
        $config = $this->createConfig();

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('maxFiles', $options);
    }

    public function testGetUploadOptionsWithEmptyAcceptedFiles(): void
    {
        $config = $this->createConfig();

        $options = $config->getUploadOptions();

        $this->assertArrayNotHasKey('acceptedFiles', $options);
    }

    /**
     * @param array<string, bool> $visibility
     * @param array<string>       $acceptedFiles
     */
    private function createConfig(
        array $visibility = [],
        array $acceptedFiles = [],
        int $maxFileSize = 20,
        ?int $maxFiles = null,
    ): AbstractConfig {
        return new ConcreteConfig($this->translator, $visibility, $acceptedFiles, $maxFileSize, $maxFiles);
    }
}

readonly class ConcreteConfig extends AbstractConfig
{
    #[\Override]
    public function getTranslationDomain(): string
    {
        return 'TestDomain';
    }
}
