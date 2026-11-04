<?php

namespace JoliCode\MediaBundle\Tests\Processor;

use Imagine\Imagick\Imagine as ImagineImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Crop;
use JoliCode\MediaBundle\Transformer\Heighten;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\DependencyInjection\ServiceLocator;

class ImagineSvgTest extends BaseTestCase
{
    // 120x40, a red left half and a blue right half, between two transparent strips
    private const SVG_FIXTURE_PATH = __DIR__ . '/../../fixtures/logo.svg';

    protected function setUp(): void
    {
        if ([] === \Imagick::queryFormats('SVG')) {
            self::markTestSkipped('ImageMagick does not support SVG on this system.');
        }

        parent::setUp();
    }

    public function testTheSvgFormatIsOnlyProcessableWhenEnabled(): void
    {
        self::assertNotContains(Format::SVG, (new Imagine(new ImagineImagine()))->getProcessableInputFormats());
        self::assertContains(Format::SVG, (new Imagine(new ImagineImagine(), rasterizeSvg: true))->getProcessableInputFormats());
        self::assertNotContains(Format::SVG, (new Imagine(new ImagineImagine(), rasterizeSvg: true))->getProcessableOutputFormats());
    }

    public function testAVariationWithoutFormatRasterizesTheSvgToASharpTransparentPng(): void
    {
        $mediaVariation = $this->convert('email-logo', true);
        $image = $this->readImage($mediaVariation);

        self::assertSame('image/png', $mediaVariation?->getBinary()->getMimeType());
        // upscaled from 120x40 without blur: rendered at the target size
        self::assertSame([504, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('transparent', $this->getColor($image, 0, 0));
        self::assertSame('red', $this->getColor($image, 250, 84));
        self::assertSame('blue', $this->getColor($image, 253, 84));
    }

    public function testTheCropCoordinatesApplyToTheRasterizedSvg(): void
    {
        $mediaVariation = $this->convert('email-logo-right-half', true);
        $image = $this->readImage($mediaVariation);

        self::assertSame('image/webp', $mediaVariation?->getBinary()->getMimeType());
        self::assertSame([252, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('blue', $this->getColor($image, 5, 84));
        self::assertSame('blue', $this->getColor($image, 247, 84));
    }

    public function testTheSvgIsNotConvertedWhenDisabled(): void
    {
        self::assertNull($this->convert('email-logo', false));
    }

    private function convert(string $variationName, bool $rasterizeSvg): ?MediaVariation
    {
        $library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->createVariationContainer($this->cacheStorage, [
                'email-logo' => static fn (): Variation => new Variation(
                    'email-logo',
                    null,
                    new TransformerChain([new Heighten(168)]),
                ),
                'email-logo-right-half' => static fn (): Variation => new Variation(
                    'email-logo-right-half',
                    Format::WEBP,
                    new TransformerChain([new Crop(60, 0, 60, 40), new Heighten(168)]),
                ),
            ]),
        );
        $libraries = new LibraryContainer(new ServiceLocator(['default' => static fn (): Library => $library]), 'default');
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('imagine', new Imagine(new ImagineImagine(), rasterizeSvg: $rasterizeSvg));
        $converter = new Converter($libraries, new Resolver($libraries, $processorContainer), new TransformationProcessor(
            $processorContainer,
            new PostProcessorContainer(),
        ));

        $media = new Media('logo.svg', $this->originalStorage);
        $media->store(new Binary('image/svg+xml', 'svg', self::getFixtureBinaryContent(self::SVG_FIXTURE_PATH)));

        $converter->convert('logo.svg', variationName: $variationName);
        $mediaVariation = $converter->getMediaVariation('logo.svg', $variationName);

        return $mediaVariation?->isStored() ? $mediaVariation : null;
    }

    private function readImage(?MediaVariation $mediaVariation): \Imagick
    {
        if (!$mediaVariation instanceof MediaVariation) {
            self::fail('The media variation was not stored.');
        }

        $imagick = new \Imagick();
        $imagick->readImageBlob($mediaVariation->getBinary()->getContent());

        return $imagick;
    }

    private function getColor(\Imagick $imagick, int $x, int $y): string
    {
        $pixel = $imagick->getImagePixelColor($x, $y);

        if ($pixel->getColorValue(\Imagick::COLOR_ALPHA) < 0.1) {
            return 'transparent';
        }

        $red = $pixel->getColorValue(\Imagick::COLOR_RED);
        $green = $pixel->getColorValue(\Imagick::COLOR_GREEN);
        $blue = $pixel->getColorValue(\Imagick::COLOR_BLUE);

        // tolerate the lossy encodings, not the blur of an upscaled raster
        return match (true) {
            $red > 0.9 && $green < 0.1 && $blue < 0.1 => 'red',
            $red < 0.1 && $green < 0.1 && $blue > 0.9 => 'blue',
            default => 'blended',
        };
    }
}
