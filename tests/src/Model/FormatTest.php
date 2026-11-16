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
}
