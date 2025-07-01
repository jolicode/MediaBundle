<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Binary;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class BinaryTest extends BaseTestCase
{
    public function testBinaryInitialization(): void
    {
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $binary = new Binary('image/png', Format::PNG->value, $content);

        $this->assertSame('image/png', $binary->getMimeType());
        $this->assertSame(Format::PNG->value, $binary->getFormat());
        $this->assertSame($content, $binary->getContent());
        $this->assertNull($binary->getPath());
    }

    public function testBinaryContentSize(): void
    {
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $binary = new Binary('image/png', Format::PNG->value, $content);

        $this->assertSame(\strlen($content), $binary->getContentSize());
    }

    public function testBinaryPixelDimensionsForImage(): void
    {
        $binary = BaseTestCase::getFixtureBinary(Format::PNG->value);

        $dimensions = $binary->getPixelDimensions();
        $this->assertIsArray($dimensions);
        $this->assertSame(2560, $dimensions['width']);
        $this->assertSame(1920, $dimensions['height']);
    }

    public function testBinaryPixelDimensionsForNonImage(): void
    {
        $binary = new Binary('text/plain', 'txt', 'test content');

        $this->assertFalse($binary->getPixelDimensions());
    }

    public function testBinaryFormatNormalization(): void
    {
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $binary = new Binary('image/png', Format::PNG->value, $content);
        $this->assertSame(Format::PNG->value, $binary->getFormat());

        $binary = new Binary('image/jpeg', Format::JPEG->value, $content);
        $this->assertSame(Format::JPEG->value, $binary->getFormat());
    }
}
