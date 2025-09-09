<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use JoliCode\MediaBundle\Doctrine\Type\MediaType;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class MediaTypeTest extends BaseTestCase
{
    public function testConvertToDatabaseValueNormalizesPath(): void
    {
        $mediaType = new MediaType();
        $platform = $this->createMock(AbstractPlatform::class);

        $stringTestCases = [
            ['/foo/bar', 'foo/bar'],
            ['//foo//bar//', 'foo/bar'],
            ['foo/bar', 'foo/bar'],
            ['foo//bar', 'foo/bar'],
            ['foo/bar/', 'foo/bar'],
            ['foo/bar//', 'foo/bar'],
            ['./foo/bar', 'foo/bar'],
            ['/./foo/bar', 'foo/bar'],
            ['./././foo/bar', 'foo/bar'],
            ['', ''],
        ];

        foreach ($stringTestCases as $case) {
            $input = $case[0];
            $expected = $case[1];
            $this->assertSame($expected, $mediaType->convertToDatabaseValue($input, $platform), 'Failed for string input: ' . $input);
        }

        // Test null input directly
        $this->assertNull($mediaType->convertToDatabaseValue(null, $platform), 'Failed for null input');

        // Test with Media object inputs
        $media = new Media('/foo/bar/file.jpg', $this->originalStorage, $this->getFixtureBinary(Format::JPEG->value));
        $this->assertSame('foo/bar/file.jpg', $mediaType->convertToDatabaseValue($media, $platform));

        $media = new Media('//foo//bar//file.jpg', $this->originalStorage, $this->getFixtureBinary(Format::JPEG->value));
        $this->assertSame('foo/bar/file.jpg', $mediaType->convertToDatabaseValue($media, $platform));

        $media = new Media('foo//bar/file.jpg', $this->originalStorage, $this->getFixtureBinary(Format::JPEG->value));
        $this->assertSame('foo/bar/file.jpg', $mediaType->convertToDatabaseValue($media, $platform));

        $media = new Media('foo/bar//file.jpg', $this->originalStorage, $this->getFixtureBinary(Format::JPEG->value));
        $this->assertSame('foo/bar/file.jpg', $mediaType->convertToDatabaseValue($media, $platform));

        $media = new Media('/foo/bar//file.jpg', $this->originalStorage, $this->getFixtureBinary(Format::JPEG->value));
        $this->assertSame('foo/bar/file.jpg', $mediaType->convertToDatabaseValue($media, $platform));
    }
}
