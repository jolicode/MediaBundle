<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Tests\Variation\TestPreProcessor;
use JoliCode\MediaBundle\Transformation\DimensionPredictor;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\DependencyInjection\ServiceLocator;

class DimensionPredictorTest extends BaseTestCase
{
    private const MEDIA_PATH = 'dimension-predictor.jpg';

    public static function setUpBeforeClass(): void
    {
        $container = static::getContainer();

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');

        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::MEDIA_PATH, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();
        $libraries->getDefault()->deleteAllVariations(self::MEDIA_PATH);
    }

    public static function tearDownAfterClass(): void
    {
        $container = static::getContainer();

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $library = $libraries->getDefault();
        $library->getOriginalStorage()->delete(self::MEDIA_PATH);
        $library->deleteAllVariations(self::MEDIA_PATH);
    }

    #[DataProvider('provideVariationNames')]
    public function testPredictionMatchesTheGeneratedFile(string $variationName): void
    {
        $container = static::getContainer();

        /** @var DimensionPredictor */
        $predictor = $container->get('joli_media.dimension_predictor');

        /** @var Resolver */
        $resolver = $container->get('joli_media.resolver');

        /** @var Converter */
        $converter = $container->get('joli_media.converter');

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');

        $libraries->getDefault()->deleteAllVariations(self::MEDIA_PATH);
        $mediaVariation = $resolver->resolveMediaVariation(self::MEDIA_PATH, $variationName, 'default');

        self::assertNotNull($mediaVariation);
        self::assertFalse($mediaVariation->isStored(), 'the variation must be predicted before it is generated');

        $predicted = $predictor->predict($mediaVariation);

        self::assertNotNull($predicted, \sprintf('the dimensions of the "%s" variation should be predictable', $variationName));

        $converter->convert(self::MEDIA_PATH, 'default', $variationName);

        $mediaVariation = $resolver->resolveMediaVariation(self::MEDIA_PATH, $variationName, 'default');
        self::assertNotNull($mediaVariation);
        $actual = $mediaVariation->getPixelDimensions();

        self::assertNotFalse($actual);
        self::assertSame(
            ['height' => $actual['height'], 'width' => $actual['width']],
            ['height' => $predicted['height'], 'width' => $predicted['width']],
            \sprintf('the predicted dimensions of the "%s" variation do not match the generated file', $variationName),
        );
    }

    public static function provideVariationNames(): \Generator
    {
        yield 'resize inside, no upscale' => ['variation-standard'];
        yield 'resize inside, larger box' => ['variation-large'];
        yield 'resize exact, upscaling' => ['variation-extra-large'];
        yield 'forced webp output format' => ['variation-standard-webp'];
        yield 'pixel ratio 1x' => ['variation-retina'];
        yield 'pixel ratio 2x' => ['variation-retina-2x']; // "variation-retina@2x", slugged
        yield 'expand, which needs the binary content' => ['variation-expanded'];
    }

    public function testAVariationWithoutTransformerKeepsTheOriginalDimensions(): void
    {
        $container = static::getContainer();

        /** @var DimensionPredictor */
        $predictor = $container->get('joli_media.dimension_predictor');

        /** @var Resolver */
        $resolver = $container->get('joli_media.resolver');

        $media = $resolver->resolveMedia(self::MEDIA_PATH, 'default');
        $mediaVariation = $resolver->resolveMediaVariation($media, 'variation-auto-stored', 'default');

        self::assertNotNull($mediaVariation);
        self::assertNotNull($predictor->predict($mediaVariation));
    }

    public function testAVariationIsSupportedWhenEveryPreProcessorPreservesTheDimensions(): void
    {
        $container = static::getContainer();

        /** @var DimensionPredictor */
        $predictor = $container->get('joli_media.dimension_predictor');

        self::assertTrue($predictor->supports($this->createVariationWithPreProcessor(true)));
    }

    public function testAVariationIsNotSupportedWhenAPreProcessorMayResizeTheBinary(): void
    {
        $container = static::getContainer();

        /** @var DimensionPredictor */
        $predictor = $container->get('joli_media.dimension_predictor');

        self::assertFalse(
            $predictor->supports($this->createVariationWithPreProcessor(false)),
            'a pre-processor free to return a binary of any size must rule the prediction out',
        );
    }

    public function testEveryVariationOfTheTestApplicationIsSupported(): void
    {
        $container = static::getContainer();

        /** @var DimensionPredictor */
        $predictor = $container->get('joli_media.dimension_predictor');

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');

        $variationContainer = $libraries->getDefault()->getVariationContainer();

        foreach ($variationContainer->getNames() as $variationName) {
            self::assertTrue(
                $predictor->supports($variationContainer->get($variationName)),
                \sprintf('the "%s" variation should be predictable: the pre-processors registered by default preserve the pixel dimensions', $variationName),
            );
        }
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function createVariationWithPreProcessor(bool $preservesPixelDimensions): Variation
    {
        return new Variation(
            name: 'test',
            format: null,
            transformerChain: new TransformerChain([new Resize(100, 100)]),
            preProcessors: new ServiceLocator([
                'test' => static fn (): TestPreProcessor => new TestPreProcessor(preservesPixelDimensions: $preservesPixelDimensions),
            ]),
        );
    }
}
