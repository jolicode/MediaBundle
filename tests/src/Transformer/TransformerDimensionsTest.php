<?php

namespace JoliCode\MediaBundle\Tests\Transformer;

use Imagine\Imagick\Imagine as ImagineImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Exception\UnprocessableMediaException;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Crop;
use JoliCode\MediaBundle\Transformer\Expand;
use JoliCode\MediaBundle\Transformer\Heighten;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\Resize\Mode;
use JoliCode\MediaBundle\Transformer\Thumbnail;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Transformer\TransformerInterface;
use JoliCode\MediaBundle\Transformer\Widen;
use JoliCode\MediaBundle\Variation\Variation;
use PHPUnit\Framework\Attributes\DataProvider;

/**
 * Regression test for the DivisionByZeroError raised by the transformers when
 * the pixel dimensions of a media (e.g. an empty or truncated image file)
 * cannot be determined.
 */
class TransformerDimensionsTest extends BaseTestCase
{
    #[DataProvider('provideTransformers')]
    public function testTransformersRejectUnknownDimensions(TransformerInterface $transformer): void
    {
        $transformation = $this->createTransformationWithUnknownDimensions($transformer);

        $this->expectException(UnprocessableMediaException::class);

        $transformer->transform($transformation);
    }

    public static function provideTransformers(): \Generator
    {
        yield 'widen' => [new Widen(100)];
        yield 'heighten' => [new Heighten(100)];
        yield 'resize exact' => [new Resize(100, 100)];
        yield 'resize inside' => [new Resize(100, 100, Mode::inside)];
        yield 'resize outside' => [new Resize(100, 100, Mode::outside)];
        yield 'thumbnail' => [new Thumbnail(100, 100)];
        yield 'crop' => [new Crop(0, 0, 100, 100)];
        yield 'expand' => [new Expand(new Imagine(new ImagineImagine()), 100, 100)];
    }

    private function createTransformationWithUnknownDimensions(TransformerInterface $transformer): Transformation
    {
        // an empty file, whose pixel dimensions cannot be determined
        $binary = new Binary('image/jpeg', 'jpeg', '', 'test/empty.jpeg');
        $media = new Media('test/empty.jpeg', $this->originalStorage, $binary);
        $variation = new Variation(
            'admin',
            Format::WEBP,
            new TransformerChain([$transformer]),
        );
        $mediaVariation = $media->createVariation($variation);
        $transformation = new Transformation($binary, $mediaVariation);

        self::assertFalse($transformation->hasKnownDimensions());

        return $transformation;
    }
}
