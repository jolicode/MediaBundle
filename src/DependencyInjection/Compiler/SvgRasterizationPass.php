<?php

namespace JoliCode\MediaBundle\DependencyInjection\Compiler;

use Imagine\Imagick\Imagine as ImagickImagine;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * Makes sure that the SVG media can be rasterized when the "rasterize_svg"
 * setting is enabled, so that a missing dependency fails when the container is
 * compiled rather than when a media is converted.
 *
 * The "rsvg-convert" SVG renderer needs neither the imagick driver nor the SVG
 * support of ImageMagick. Its binary may only be installed where the application
 * runs, so the "joli:media:debug:processors" command checks it, like the other
 * binaries.
 */
class SvgRasterizationPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        if (!$container->hasDefinition('.joli_media.processor.imagine')) {
            return;
        }

        $arguments = $container->getDefinition('.joli_media.processor.imagine')->getArguments();

        if (true !== ($arguments['$rasterizeSvg'] ?? false) || null !== ($arguments['$rsvgConvertBinary'] ?? null)) {
            return;
        }

        if (ImagickImagine::class !== $container->getDefinition('.joli_media.imagine.imagine')->getClass()) {
            throw new \LogicException('The "joli_media.processors.imagine.rasterize_svg" setting requires the "imagick" driver of the "imagine" processor. Set "joli_media.processors.imagine.driver" to "imagick", set "joli_media.processors.imagine.svg_renderer" to "rsvg-convert", or disable the setting.');
        }

        if (!\extension_loaded('imagick')) {
            throw new \LogicException('The "joli_media.processors.imagine.rasterize_svg" setting requires the "imagick" PHP extension. Install it (e.g. "sudo apt install php-imagick"), or disable the setting.');
        }

        if ([] === \Imagick::queryFormats('SVG')) {
            throw new \LogicException('The "joli_media.processors.imagine.rasterize_svg" setting requires ImageMagick to support SVG, which it does not on this system. Install its SVG coder (e.g. "sudo apt install libmagickcore-7.q16-10-extra"), set "joli_media.processors.imagine.svg_renderer" to "rsvg-convert" (e.g. "sudo apt install librsvg2-bin"), or disable the setting.');
        }
    }
}
