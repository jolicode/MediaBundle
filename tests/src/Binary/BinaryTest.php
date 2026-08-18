<?php

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

    public function testBinaryPixelDimensionsForUnreadableImage(): void
    {
        $binary = new Binary('image/jpeg', Format::JPEG->value, '');

        $this->assertFalse($binary->getPixelDimensions());
        // the failure is memoized, calling again does not retry the detection
        $this->assertFalse($binary->getPixelDimensions());
        $this->assertNull($binary->getPixelWidth());
        $this->assertNull($binary->getPixelHeight());
    }

    public function testBinaryFormatNormalization(): void
    {
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $binary = new Binary('image/png', Format::PNG->value, $content);
        $this->assertSame(Format::PNG->value, $binary->getFormat());

        $binary = new Binary('image/jpeg', Format::JPEG->value, $content);
        $this->assertSame(Format::JPEG->value, $binary->getFormat());
    }

    public function testBinaryWithContent(): void
    {
        $content = BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH);
        $binary = new Binary('image/png', Format::PNG->value, $content, 'some/path.png');

        $copy = $binary->withContent('replaced content');

        $this->assertNotSame($binary, $copy);
        $this->assertSame('replaced content', $copy->getContent());
        $this->assertSame(\strlen('replaced content'), $copy->getContentSize());
        $this->assertSame('image/png', $copy->getMimeType());
        $this->assertSame(Format::PNG->value, $copy->getFormat());
        $this->assertSame('some/path.png', $copy->getPath());

        // the original binary is left untouched
        $this->assertSame($content, $binary->getContent());
    }

    public function testBinaryWithContentDoesNotCarryThePixelDimensionsOver(): void
    {
        $binary = new Binary(
            'image/png',
            Format::PNG->value,
            BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH),
            null,
            2560,
            1920,
        );

        // the dimensions are guessed again from the new content
        $this->assertFalse($binary->withContent('')->getPixelDimensions());
        $this->assertSame(
            ['height' => 1920, 'width' => 2560],
            $binary->withContent(BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH))->getPixelDimensions(),
        );
    }
}
