<?php

namespace JoliCode\MediaBundle\Tests\PreProcessor;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Metadata\ExifMetadataReader;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Binary\ExifOrientation;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\PreProcessor\AutoOrientPreProcessor;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\Resize\Mode;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\DependencyInjection\ServiceLocator;

class AutoOrientPreProcessorTest extends BaseTestCase
{
    #[DataProvider('provideDrivers')]
    public function testItRotatesTheImageAndResetsTheOrientation(string $driver): void
    {
        // 60x40 landscape, red left and blue right, orientation 6: displayed as a 40x60 portrait
        $binary = $this->getOrientedFixtureBinary();
        $result = (new AutoOrientPreProcessor($this->createImagine($driver)))->process($binary, $this->createMediaVariation($binary));

        self::assertNotSame($binary, $result);
        self::assertSame('image/jpeg', $result->getMimeType());
        self::assertSame(Format::JPEG->value, $result->getFormat());
        // GD writes no EXIF at all, Imagick resets the tag
        self::assertContains(ExifOrientation::read($result->getContent()), [ExifOrientation::UNDEFINED, ExifOrientation::TOP_LEFT]);
        self::assertSame(['height' => 60, 'width' => 40], $result->getPixelDimensions());

        $imagick = new \Imagick();
        $imagick->readImageBlob($result->getContent());
        self::assertSame(40, $imagick->getImageWidth());
        self::assertSame(60, $imagick->getImageHeight());
        $this->assertColorIs('red', $imagick->getImagePixelColor(20, 5));
        $this->assertColorIs('blue', $imagick->getImagePixelColor(20, 55));
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function provideDrivers(): iterable
    {
        yield 'imagick' => ['imagick'];
        yield 'gd' => ['gd'];
    }

    public function testItLeavesAnUprightImageUntouched(): void
    {
        $binary = self::getFixtureBinary(Format::JPEG->value);

        self::assertSame($binary, (new AutoOrientPreProcessor($this->createImagine('imagick')))->process($binary, $this->createMediaVariation($binary)));
    }

    public function testItOnlySupportsJpegAndTiff(): void
    {
        $preProcessor = new AutoOrientPreProcessor($this->createImagine('imagick'));

        self::assertTrue($preProcessor->supports(self::getFixtureBinary(Format::JPEG->value)));
        self::assertTrue($preProcessor->supports(self::getFixtureBinary(Format::TIFF->value)));
        self::assertFalse($preProcessor->supports(self::getFixtureBinary(Format::PNG->value)));
        self::assertFalse($preProcessor->supports(self::getFixtureBinary(Format::WEBP->value)));
    }

    public function testTheTransformersWorkOnTheRotatedImage(): void
    {
        // computed on the stored 60x40 pixels, the resize would give a 30x20 landscape
        $imagine = $this->createImagine('imagick');
        $binary = $this->getOrientedFixtureBinary();
        $variation = new Variation(
            'thumbnail',
            Format::JPEG,
            new TransformerChain([new Resize(30, 30, Mode::inside)]),
            preProcessors: new ServiceLocator(['auto_orient' => static fn (): AutoOrientPreProcessor => new AutoOrientPreProcessor($imagine)]),
        );
        $media = new Media('test/oriented.jpeg', $this->originalStorage, $binary);
        $transformation = new Transformation($binary, $media->createVariation($variation));

        $processorContainer = new ProcessorContainer();
        $processorContainer->add('imagine', new Imagine($imagine));

        $result = (new TransformationProcessor($processorContainer, new PostProcessorContainer()))->process($transformation);

        self::assertSame(['height' => 30, 'width' => 20], $result->getPixelDimensions());
        self::assertSame(ExifOrientation::TOP_LEFT, ExifOrientation::read($result->getContent()));
    }

    private function createImagine(string $driver): ImagineInterface
    {
        $imagine = 'gd' === $driver ? new GdImagine() : new ImagickImagine();
        $imagine->setMetadataReader(new ExifMetadataReader());

        return $imagine;
    }

    private function getOrientedFixtureBinary(): Binary
    {
        return new Binary('image/jpeg', Format::JPEG->value, self::getFixtureBinaryContent(self::ORIENTED_JPEG_FIXTURE_PATH));
    }

    private function createMediaVariation(Binary $binary): MediaVariation
    {
        $media = new Media('test/oriented.jpeg', $this->originalStorage, $binary);

        return $media->createVariation($this->variation);
    }

    private function assertColorIs(string $expected, \ImagickPixel $pixel): void
    {
        $color = $pixel->getColor();
        $dominant = 'red' === $expected ? 'r' : 'b';
        $other = 'red' === $expected ? 'b' : 'r';

        self::assertGreaterThan(200, $color[$dominant], \sprintf('The pixel should be %s, got %s', $expected, $pixel->getColorAsString()));
        self::assertLessThan(50, $color[$other], \sprintf('The pixel should be %s, got %s', $expected, $pixel->getColorAsString()));
    }
}
