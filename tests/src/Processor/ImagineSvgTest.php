<?php

namespace JoliCode\MediaBundle\Tests\Processor;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Image\ImagineInterface;
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
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\Process\ExecutableFinder;

class ImagineSvgTest extends BaseTestCase
{
    // 120x40, a red left half and a blue right half, between two transparent strips
    private const SVG_FIXTURE_PATH = __DIR__ . '/../../fixtures/logo.svg';

    // 120x40, a horizontal gradient from red to blue
    private const GRADIENT_SVG_FIXTURE_PATH = __DIR__ . '/../../fixtures/gradient.svg';

    public function testTheSvgFormatIsOnlyProcessableWhenEnabled(): void
    {
        self::assertNotContains(Format::SVG, (new Imagine(new ImagineImagine()))->getProcessableInputFormats());
        self::assertContains(Format::SVG, (new Imagine(new ImagineImagine(), rasterizeSvg: true))->getProcessableInputFormats());
        self::assertNotContains(Format::SVG, (new Imagine(new ImagineImagine(), rasterizeSvg: true))->getProcessableOutputFormats());
    }

    #[DataProvider('provideSvgRenderers')]
    public function testAVariationWithoutFormatRasterizesTheSvgToASharpTransparentPng(string $renderer): void
    {
        $mediaVariation = $this->convert('email-logo', true, $this->getRsvgConvertBinary($renderer));
        $image = $this->readImage($mediaVariation);

        self::assertSame('image/png', $mediaVariation?->getBinary()->getMimeType());
        // upscaled from 120x40 without blur: rendered at the target size
        self::assertSame([504, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('transparent', $this->getColor($image, 0, 0));
        self::assertSame('red', $this->getColor($image, 250, 84));
        self::assertSame('blue', $this->getColor($image, 253, 84));
    }

    #[DataProvider('provideSvgRenderers')]
    public function testTheCropCoordinatesApplyToTheRasterizedSvg(string $renderer): void
    {
        $mediaVariation = $this->convert('email-logo-right-half', true, $this->getRsvgConvertBinary($renderer));
        $image = $this->readImage($mediaVariation);

        self::assertSame('image/webp', $mediaVariation?->getBinary()->getMimeType());
        self::assertSame([252, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('blue', $this->getColor($image, 5, 84));
        self::assertSame('blue', $this->getColor($image, 247, 84));
    }

    #[DataProvider('provideSvgRenderers')]
    public function testTheSvgIsNotConvertedWhenDisabled(string $renderer): void
    {
        self::assertNull($this->convert('email-logo', false, $this->getRsvgConvertBinary($renderer)));
    }

    public static function provideSvgRenderers(): \Generator
    {
        yield 'imagick' => ['imagick'];
        yield 'rsvg-convert' => ['rsvg-convert'];
    }

    public function testRsvgConvertRendersTheGradients(): void
    {
        $mediaVariation = $this->convert('email-logo', true, $this->getRsvgConvertBinary('rsvg-convert'), self::GRADIENT_SVG_FIXTURE_PATH);
        $image = $this->readImage($mediaVariation);

        self::assertSame([504, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('red', $this->getColor($image, 0, 84));
        self::assertSame('blue', $this->getColor($image, 503, 84));

        // half way, as much red as blue: the internal renderer of ImageMagick paints it black
        $middle = $image->getImagePixelColor(252, 84);
        self::assertEqualsWithDelta(0.5, $middle->getColorValue(\Imagick::COLOR_RED), 0.1);
        self::assertEqualsWithDelta(0.5, $middle->getColorValue(\Imagick::COLOR_BLUE), 0.1);
    }

    public function testRsvgConvertDoesNotNeedTheImagickDriver(): void
    {
        $mediaVariation = $this->convert('email-logo', true, $this->getRsvgConvertBinary('rsvg-convert'), imagine: new GdImagine());
        $image = $this->readImage($mediaVariation);

        self::assertSame('image/png', $mediaVariation?->getBinary()->getMimeType());
        self::assertSame([504, 168], [$image->getImageWidth(), $image->getImageHeight()]);
        self::assertSame('red', $this->getColor($image, 250, 84));
        self::assertSame('blue', $this->getColor($image, 253, 84));
    }

    /**
     * Skips the test when the renderer is not available on this system.
     */
    private function getRsvgConvertBinary(string $renderer): ?string
    {
        if ('imagick' === $renderer) {
            if ([] === \Imagick::queryFormats('SVG')) {
                self::markTestSkipped('ImageMagick does not support SVG on this system.');
            }

            return null;
        }

        return (new ExecutableFinder())->find('rsvg-convert') ?? self::markTestSkipped('rsvg-convert is not installed on this system.');
    }

    private function convert(
        string $variationName,
        bool $rasterizeSvg,
        ?string $rsvgConvertBinary = null,
        string $fixturePath = self::SVG_FIXTURE_PATH,
        ImagineInterface $imagine = new ImagineImagine(),
    ): ?MediaVariation {
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
        $processorContainer->add('imagine', new Imagine($imagine, rasterizeSvg: $rasterizeSvg, rsvgConvertBinary: $rsvgConvertBinary));
        $converter = new Converter($libraries, new Resolver($libraries, $processorContainer), new TransformationProcessor(
            $processorContainer,
            new PostProcessorContainer(),
        ));

        $media = new Media('logo.svg', $this->originalStorage);
        $media->store(new Binary('image/svg+xml', 'svg', self::getFixtureBinaryContent($fixturePath)));

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
