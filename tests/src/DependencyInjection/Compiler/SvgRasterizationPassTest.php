<?php

namespace JoliCode\MediaBundle\Tests\DependencyInjection\Compiler;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\DependencyInjection\Compiler\SvgRasterizationPass;
use JoliCode\MediaBundle\Processor\Imagine;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class SvgRasterizationPassTest extends TestCase
{
    public function testItIgnoresADisabledSetting(): void
    {
        $container = $this->createContainer(GdImagine::class, false);

        (new SvgRasterizationPass())->process($container);

        $this->addToAssertionCount(1);
    }

    public function testItRequiresTheImagickDriver(): void
    {
        $container = $this->createContainer(GdImagine::class, true);

        $this->expectException(\LogicException::class);
        $this->expectExceptionMessage('requires the "imagick" driver');

        (new SvgRasterizationPass())->process($container);
    }

    public function testItAcceptsAnImagickDriverSupportingSvg(): void
    {
        if ([] === \Imagick::queryFormats('SVG')) {
            self::markTestSkipped('ImageMagick does not support SVG on this system.');
        }

        $container = $this->createContainer(ImagickImagine::class, true);

        (new SvgRasterizationPass())->process($container);

        $this->addToAssertionCount(1);
    }

    public function testTheRsvgConvertRendererDoesNotRequireImagick(): void
    {
        $container = $this->createContainer(GdImagine::class, true, '/usr/bin/rsvg-convert');

        (new SvgRasterizationPass())->process($container);

        $this->addToAssertionCount(1);
    }

    private function createContainer(string $driverClass, bool $rasterizeSvg, ?string $rsvgConvertBinary = null): ContainerBuilder
    {
        $container = new ContainerBuilder();
        $container->register('.joli_media.imagine.imagine', $driverClass);
        $container->register('.joli_media.processor.imagine', Imagine::class)
            ->setArgument('$rasterizeSvg', $rasterizeSvg)
            ->setArgument('$rsvgConvertBinary', $rsvgConvertBinary)
        ;

        return $container;
    }
}
