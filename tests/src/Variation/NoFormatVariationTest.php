<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Variation;

use Imagine\Imagick\Imagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Cwebp;
use JoliCode\MediaBundle\Processor\Imagick;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\DependencyInjection\ServiceLocator;

class NoFormatVariationTest extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->variation = new Variation(
            'no-format-variation',
            null,
            new TransformerChain([
                new Resize(400, 300),
            ]),
        );
        $library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->createVariationContainer($this->cacheStorage, [
                'no-format-variation' => fn (): Variation => $this->variation,
            ])
        );
        $libraries = new LibraryContainer(
            new ServiceLocator(
                [
                    'default' => fn (): Library => $library,
                ]
            ),
            'default',
        );
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('cwebp', new Cwebp());
        $processorContainer->add('imagick', new Imagick(new Imagine()));

        $transformationProcessor = new TransformationProcessor(
            $processorContainer,
            new PostProcessorContainer(),
        );
        $this->resolver = new Resolver($libraries, $processorContainer);
        $this->converter = new Converter($libraries, $this->resolver, $transformationProcessor);
    }

    public function testVariationWithAlternateOutputFormat(): void
    {
        // store a tiff media
        $media = new Media('test.tif', $this->originalStorage);
        $media->store(new Binary('image/tif', Format::TIFF->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::TIFF_FIXTURE_PATH)));

        // copvert it to a variation that does not define a target format
        $this->converter->convert($media, null, 'no-format-variation');

        // check that the variation is stored
        self::assertTrue($media->hasVariation('no-format-variation'));
        self::assertInstanceOf(MediaVariation::class, $media->getVariation('no-format-variation'));
        self::assertTrue($media->getVariation('no-format-variation')->isStored());
        self::assertInstanceOf(Binary::class, $media->getVariation('no-format-variation')->getBinary());
        self::assertSame(Format::JPEG->value, $media->getVariation('no-format-variation')->getBinary()->getFormat());
        self::assertSame('image/jpeg', $media->getVariation('no-format-variation')->getBinary()->getMimeType());
        self::assertSame('no-format-variation/test.b54f4814.jpeg', $media->getVariation('no-format-variation')->getStoragePath());

        // resolve the media variation and run the same checks
        $mediaVariation = $this->resolver->resolveMediaVariation('test.tif', 'no-format-variation');
        self::assertInstanceOf(MediaVariation::class, $mediaVariation);
        self::assertTrue($mediaVariation->isStored());
        self::assertInstanceOf(Binary::class, $mediaVariation->getBinary());
        self::assertSame(Format::JPEG->value, $mediaVariation->getBinary()->getFormat());
        self::assertEquals('image/jpeg', $mediaVariation->getBinary()->getMimeType());
        self::assertSame('no-format-variation/test.b54f4814.jpeg', $mediaVariation->getStoragePath());
    }
}
