<?php

namespace JoliCode\MediaBundle\Tests\Bridge\Config;

use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Contracts\Translation\TranslatorInterface;

class AcceptedPathTest extends TestCase
{
    #[DataProvider('provideAcceptedPaths')]
    public function testAPathWithAnAcceptedExtensionIsAccepted(string $path): void
    {
        $config = $this->createConfig(['png', 'jpeg', 'jpg', 'gif', 'pdf']);

        self::assertTrue($config->acceptsPath($path));
        $config->assertPathIsAccepted($path);
    }

    public static function provideAcceptedPaths(): \Generator
    {
        yield ['image.png'];
        yield ['folder/image.jpeg'];
        yield ['folder/IMAGE.JPG'];
        yield ['folder.html/image.gif'];
        yield ['document.pdf'];
        yield ['archive.html.png'];
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAPathWithAnotherExtensionIsRefused(string $path): void
    {
        $config = $this->createConfig(['png', 'jpeg', 'jpg', 'gif', 'pdf']);

        self::assertFalse($config->acceptsPath($path));

        $this->expectException(UploadException::class);
        $this->expectExceptionMessage('media.upload.uploader.invalid_file_type');
        $config->assertPathIsAccepted($path);
    }

    public static function provideRefusedPaths(): \Generator
    {
        yield 'another extension' => ['page.html'];
        yield 'another extension, in a folder' => ['folder/image.png.html'];
        yield 'another extension, uppercase' => ['PAGE.HTML'];
        yield 'an image extension which is not listed' => ['image.svg'];
        yield 'no extension' => ['image'];
        yield 'no extension, in a dotted folder' => ['folder.png/image'];
        // Flysystem writes the three paths below to "page.html"
        yield 'trailing dot segment' => ['page.html/.'];
        yield 'parent segment' => ['page.html/image.png/..'];
        yield 'backslash' => ['image.png\page.html'];
        yield 'path leaving the root' => ['../image.png'];
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAnyPathIsAcceptedWhenTheExtensionsAreNotRestricted(string $path): void
    {
        $config = $this->createConfig([]);

        self::assertTrue($config->acceptsPath($path));
        $config->assertPathIsAccepted($path);
    }

    public function testTheConfiguredExtensionsIgnoreTheCaseAndTheLeadingDot(): void
    {
        $config = $this->createConfig(['.PNG', 'Jpg']);

        self::assertTrue($config->acceptsPath('image.png'));
        self::assertTrue($config->acceptsPath('image.JPG'));
        self::assertFalse($config->acceptsPath('image.gif'));
    }

    public function testTheExtensionsDoNotDependOnTheAcceptedFiles(): void
    {
        $config = new Config($this->createTranslator(), [], ['text/plain'], 20, acceptedExtensions: ['csv']);

        self::assertTrue($config->acceptsPath('export.csv'));
        self::assertFalse($config->acceptsPath('notes.txt'));
    }

    /**
     * @param string[] $acceptedExtensions
     */
    private function createConfig(array $acceptedExtensions): Config
    {
        return new Config($this->createTranslator(), [], [], 20, acceptedExtensions: $acceptedExtensions);
    }

    private function createTranslator(): TranslatorInterface
    {
        $translator = $this->createStub(TranslatorInterface::class);
        $translator->method('trans')->willReturnArgument(0);

        return $translator;
    }
}
