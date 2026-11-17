<?php

namespace JoliCode\MediaBundle\Tests\Model;

use JoliCode\MediaBundle\Model\Format;
use PHPUnit\Framework\TestCase;

class FormatTest extends TestCase
{
    public function testTheSvgFormatFallsBackToPng(): void
    {
        self::assertSame(Format::SVG, Format::fromName('SVG'));
        self::assertSame('image/svg+xml', Format::SVG->getMimeType());
        self::assertSame(['svg'], Format::SVG->getPossibleExtensions());
        self::assertSame(Format::PNG, Format::SVG->getAlternativeFormat());
    }

    public function testOnlyJpegDoesNotSupportTransparency(): void
    {
        self::assertFalse(Format::JPEG->supportsTransparency());
        self::assertTrue(Format::AVIF->supportsTransparency());
        self::assertTrue(Format::GIF->supportsTransparency());
        self::assertTrue(Format::PNG->supportsTransparency());
        self::assertTrue(Format::WEBP->supportsTransparency());
    }
}
