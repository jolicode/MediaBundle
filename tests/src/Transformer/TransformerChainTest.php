<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Transformer;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\Resize\Mode;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Transformer\Widen;
use JoliCode\MediaBundle\Variation\Variation;

class TransformerChainTest extends BaseTestCase
{
    private Resize $resizeTransformer;

    private Widen $widenTransformer;

    private TransformerChain $chain;

    protected function setUp(): void
    {
        parent::setUp();

        $this->resizeTransformer = new Resize(800, 600, Mode::inside);
        $this->widenTransformer = new Widen(1200);
        $this->chain = new TransformerChain([$this->resizeTransformer, $this->widenTransformer]);
    }

    public function testGetTransformers(): void
    {
        $transformers = $this->chain->getTransformers();

        self::assertCount(2, $transformers);
        self::assertSame($this->resizeTransformer, $transformers[0]);
        self::assertSame($this->widenTransformer, $transformers[1]);
    }

    public function testIteratorImplementation(): void
    {
        // Test rewind and current
        $this->chain->rewind();
        self::assertSame($this->resizeTransformer, $this->chain->current());
        self::assertSame(0, $this->chain->key());
        self::assertTrue($this->chain->valid());

        // Test next
        $this->chain->next();
        self::assertSame($this->widenTransformer, $this->chain->current());
        self::assertSame(1, $this->chain->key());
        self::assertTrue($this->chain->valid());

        // Test end of chain
        $this->chain->next();
        self::assertFalse($this->chain->valid());
    }

    public function testCurrentThrowsExceptionWhenInvalid(): void
    {
        $this->chain->rewind();
        $this->chain->next();
        $this->chain->next(); // Move past the last transformer

        $this->expectException(\OutOfBoundsException::class);
        $this->expectExceptionMessage('No current transformer available.');

        $this->chain->current();
    }

    public function testTransformersAreAppliedInOrder(): void
    {
        $binary = BaseTestCase::getFixtureBinary(Format::PNG->value);

        $media = new Media('test.png', $this->originalStorage, $binary);
        $variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([
                $this->resizeTransformer,
                $this->widenTransformer,
            ]),
        );
        $mediaVariation = $media->createVariation($variation);
        $transformation = new Transformation($binary, $mediaVariation);

        // Set initial dimensions
        $transformation->targetWidth = 1600;
        $transformation->targetHeight = 1200;

        // Apply transformers through the chain
        while ($transformer = $transformation->shiftTransformers()) {
            $transformer->transform($transformation);
        }

        self::assertEquals(1200, $transformation->targetWidth);
        self::assertEquals(900, $transformation->targetHeight);
    }

    public function testEmptyChain(): void
    {
        $emptyChain = new TransformerChain([]);

        self::assertEmpty($emptyChain->getTransformers());
        self::assertFalse($emptyChain->valid());

        $this->expectException(\OutOfBoundsException::class);
        $this->expectExceptionMessage('No current transformer available.');

        $emptyChain->current();
    }
}
