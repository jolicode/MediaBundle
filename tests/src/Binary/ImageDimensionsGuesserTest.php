<?php

namespace JoliCode\MediaBundle\Tests\Binary;

use JoliCode\MediaBundle\Binary\ExifOrientation;
use JoliCode\MediaBundle\Binary\ImageDimensionsGuesser;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use PHPUnit\Framework\Attributes\DataProvider;

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

    /**
     * @param false|array{height: int, width: int} $expected
     */
    #[DataProvider('provideSvgContents')]
    public function testItReadsTheIntrinsicSizeOfAnSvg(string $content, array|false $expected): void
    {
        self::assertSame($expected, ImageDimensionsGuesser::guess($content));
    }

    public static function provideSvgContents(): \Generator
    {
        yield 'width and height' => ['<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"/>', ['height' => 40, 'width' => 120]];
        yield 'pixel units' => ['<svg xmlns="http://www.w3.org/2000/svg" width="120px" height="40.4px"/>', ['height' => 40, 'width' => 120]];
        yield 'viewBox only' => ['<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"/>', ['height' => 100, 'width' => 300]];
        yield 'height and viewBox' => ['<svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0,0,300,100"/>', ['height' => 50, 'width' => 150]];
        yield 'relative units' => ['<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"/>', false];
        yield 'no size' => ['<svg xmlns="http://www.w3.org/2000/svg"/>', false];
        yield 'external entity' => ['<!DOCTYPE svg [<!ENTITY size SYSTEM "file:///etc/hostname">]><svg xmlns="http://www.w3.org/2000/svg" width="&size;" height="10"/>', false];
        yield 'malformed' => ['<svg width="10" height', false];
        yield 'other root element' => ['<html><svg width="10" height="10"/></html>', false];
    }

    public function testItReadsTheSvgFixture(): void
    {
        self::assertSame(['height' => 40, 'width' => 120], ImageDimensionsGuesser::guess(self::getFixtureBinaryContent(__DIR__ . '/../../fixtures/logo.svg')));
    }

    public function testItFailsOnUnreadableContent(): void
    {
        self::assertFalse(ImageDimensionsGuesser::guess(''));
        self::assertSame(ExifOrientation::UNDEFINED, ExifOrientation::read(''));
    }
}
