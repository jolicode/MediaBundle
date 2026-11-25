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
    public function testAPathWhoseExtensionIsTheOneOfAnAcceptedTypeIsAccepted(string $path): void
    {
        $config = $this->createConfig(['image/*', 'application/pdf']);

        self::assertTrue($config->acceptsPath($path));
        $config->assertPathIsAccepted($path);
    }

    public static function provideAcceptedPaths(): \Generator
    {
        yield ['image.png'];
        yield ['folder/image.jpeg'];
        yield ['folder/IMAGE.JPG'];
        yield ['folder.html/image.gif'];
        yield ['image.svg'];
        yield ['document.pdf'];
        yield ['archive.html.png'];
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAPathWhoseExtensionIsNotTheOneOfAnAcceptedTypeIsRefused(string $path): void
    {
        $config = $this->createConfig(['image/*', 'application/pdf']);

        self::assertFalse($config->acceptsPath($path));

        $this->expectException(UploadException::class);
        $this->expectExceptionMessage('media.upload.uploader.invalid_file_type');
        $config->assertPathIsAccepted($path);
    }

    public static function provideRefusedPaths(): \Generator
    {
        yield 'another type' => ['page.html'];
        yield 'another type, in a folder' => ['folder/image.png.html'];
        yield 'another type, uppercase' => ['PAGE.HTML'];
        yield 'unknown extension' => ['image.unknown-extension'];
        yield 'no extension' => ['image'];
        yield 'no extension, in a dotted folder' => ['folder.png/image'];
        // Flysystem writes the three paths below to "page.html"
        yield 'trailing dot segment' => ['page.html/.'];
        yield 'parent segment' => ['page.html/image.png/..'];
        yield 'backslash' => ['image.png\page.html'];
        yield 'path leaving the root' => ['../image.png'];
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAnyPathIsAcceptedWhenTheAcceptedFilesAreNotRestricted(string $path): void
    {
        $config = $this->createConfig([]);

        self::assertTrue($config->acceptsPath($path));
        $config->assertPathIsAccepted($path);
    }

    public function testAnExactTypeDoesNotAcceptTheOtherTypesOfItsFamily(): void
    {
        $config = $this->createConfig(['image/png']);

        self::assertTrue($config->acceptsPath('image.png'));
        self::assertFalse($config->acceptsPath('image.gif'));
    }

    /**
     * @param string[] $acceptedFiles
     */
    private function createConfig(array $acceptedFiles): Config
    {
        $translator = $this->createStub(TranslatorInterface::class);
        $translator->method('trans')->willReturnArgument(0);

        return new Config($translator, [], $acceptedFiles, 20);
    }
}
