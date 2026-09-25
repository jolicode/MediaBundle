<?php

namespace JoliCode\MediaBundle\Tests\Binary;

use JoliCode\MediaBundle\Binary\ExifOrientation;
use JoliCode\MediaBundle\Binary\ImageDimensionsGuesser;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class ImageDimensionsGuesserTest extends BaseTestCase
{
    public function testItReturnsTheStoredDimensionsOfAnUprightImage(): void
    {
        $content = self::getFixtureBinaryContent(self::JPEG_FIXTURE_PATH);

        self::assertSame(ExifOrientation::TOP_LEFT, ExifOrientation::read($content));
        self::assertSame(['height' => 1920, 'width' => 2560], ImageDimensionsGuesser::guess($content));
    }

    public function testItSwapsTheDimensionsOfAnImageRotatedByItsOrientation(): void
    {
        // 60x40 stored pixels, displayed as 40x60 by the orientation 6
        $content = self::getFixtureBinaryContent(self::ORIENTED_JPEG_FIXTURE_PATH);

        self::assertSame(6, ExifOrientation::read($content));
        self::assertSame(['height' => 60, 'width' => 40], ImageDimensionsGuesser::guess($content));
    }

    public function testItIgnoresTheOrientationOfOtherFormats(): void
    {
        self::assertSame(['height' => 1920, 'width' => 2560], ImageDimensionsGuesser::guess(self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH)));
    }

    public function testItFailsOnUnreadableContent(): void
    {
        self::assertFalse(ImageDimensionsGuesser::guess(''));
        self::assertSame(ExifOrientation::UNDEFINED, ExifOrientation::read(''));
    }
}
