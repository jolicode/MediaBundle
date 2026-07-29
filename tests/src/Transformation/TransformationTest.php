<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;

class TransformationTest extends BaseTestCase
{
    public function testHasKnownDimensions(): void
    {
        self::assertTrue($this->createTransformation(self::getFixtureBinary('jpeg'))->hasKnownDimensions());
        self::assertFalse($this->createTransformation(new Binary('image/jpeg', 'jpeg', ''))->hasKnownDimensions());
    }

    public function testSetBinaryResetsStaleDimensionsOnFailure(): void
    {
        $transformation = $this->createTransformation(self::getFixtureBinary('jpeg'));

        self::assertTrue($transformation->hasKnownDimensions());
        self::assertSame(2560, $transformation->binaryWidth);
        self::assertSame(1920, $transformation->binaryHeight);

        $transformation->cropX = 10;
        $transformation->cropY = 10;
        $transformation->cropWidth = 100;
        $transformation->cropHeight = 100;

        // setting an unmeasurable binary must not leak the previous binary dimensions
        $transformation->setBinary(new Binary('image/jpeg', 'jpeg', ''));

        self::assertFalse($transformation->hasKnownDimensions());
        self::assertNull($transformation->binaryWidth);
        self::assertNull($transformation->binaryHeight);
        self::assertNull($transformation->targetWidth);
        self::assertNull($transformation->targetHeight);
        self::assertNull($transformation->cropX);
        self::assertNull($transformation->cropY);
        self::assertNull($transformation->cropWidth);
        self::assertNull($transformation->cropHeight);
    }

    public function testNullDimensionsBehaviour(): void
    {
        $transformation = $this->createTransformation(new Binary('image/jpeg', 'jpeg', ''), new TransformerChain([]));

        self::assertFalse($transformation->hasChangedDimensions());
        self::assertFalse($transformation->hasEffect());
        self::assertFalse($transformation->hasTransformers());
        // the output format differs from the input format, so a conversion must still run
        self::assertTrue($transformation->mustRun());
    }

    public function testHasTransformers(): void
    {
        $transformation = $this->createTransformation(self::getFixtureBinary('jpeg'));

        self::assertTrue($transformation->hasTransformers());

        while ($transformation->shiftTransformers()) {
        }

        self::assertFalse($transformation->hasTransformers());
    }

    private function createTransformation(Binary $binary, ?TransformerChain $transformerChain = null): Transformation
    {
        $media = new Media('test/media.jpeg', $this->originalStorage, $binary);
        $variation = new Variation(
            'admin',
            Format::WEBP,
            $transformerChain ?? new TransformerChain([new Resize(400, 300)]),
        );

        return new Transformation($binary, $media->createVariation($variation));
    }
}
