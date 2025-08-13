<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Variation;

use Imagine\Imagick\Imagine;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\PreProcessor\HeifPreProcessor;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\Resize\Mode;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use JoliCode\MediaBundle\Variation\Voter\FormatVoter;
use JoliCode\MediaBundle\Variation\Voter\MimeTypeVoter;
use Symfony\Component\DependencyInjection\ServiceLocator;

class VariationTest extends BaseTestCase
{
    private Media $media;

    private TestPreProcessor $preProcessor;

    private TransformerChain $transformerChain;

    protected function setUp(): void
    {
        $this->urlGenerator = $this->createUrlGenerator([
            'default' => [
                'original' => '/media',
                'cache' => '/cache',
            ],
        ]);
        $originalStorage = $this->createOriginalStorage($this->createFilesystem(), '/media', $this->urlGenerator);
        $this->preProcessor = new TestPreProcessor();
        $this->transformerChain = new TransformerChain([
            new Resize(800, 600, Mode::inside),
        ]);

        $this->variation = new Variation(
            'test_variation',
            Format::JPEG,
            $this->transformerChain,
            preProcessors: new ServiceLocator([
                TestPreProcessor::class => fn (): PreProcessorInterface => $this->preProcessor,
            ]),
            postProcessorsConfiguration: ['jpegoptim' => ['options' => ['max_quality' => '80']]],
            voters: [
                new FormatVoter('jpg'),
                new MimeTypeVoter('image/jpeg'),
            ]
        );

        $this->media = new Media('test.jpg', $originalStorage, BaseTestCase::getFixtureBinary(Format::JPEG->value));
    }

    public function testGetName(): void
    {
        self::assertEquals('test_variation', $this->variation->getName());
    }

    public function testGetFormat(): void
    {
        self::assertEquals(Format::JPEG, $this->variation->getFormat());
    }

    public function testGetTransformerChain(): void
    {
        self::assertSame($this->transformerChain, $this->variation->getTransformerChain());
    }

    public function testGetPostProcessingOptions(): void
    {
        self::assertEquals(['options' => ['max_quality' => '80']], $this->variation->getPostProcessorConfiguration('jpegoptim'));
    }

    public function testGetPreProcessors(): void
    {
        self::assertSame($this->preProcessor, $this->variation->getPreProcessors()->current());

        $this->variation = new Variation(
            'test_variation',
            Format::JPEG,
            $this->transformerChain,
            globalPreProcessors: new ServiceLocator([
                HeifPreProcessor::class => fn (): HeifPreProcessor => new HeifPreProcessor(new Imagine()),
            ]),
            preProcessors: new ServiceLocator([
                TestPreProcessor::class => fn (): PreProcessorInterface => $this->preProcessor,
            ]),
            postProcessorsConfiguration: ['jpegoptim' => ['options' => ['max_quality' => '80']]],
            voters: [
                new FormatVoter('jpg'),
                new MimeTypeVoter('image/jpeg'),
            ]
        );

        $preProcessors = iterator_to_array($this->variation->getPreProcessors());
        self::assertCount(2, $preProcessors);
        self::assertArrayHasKey(HeifPreProcessor::class, $preProcessors);
        self::assertInstanceOf(HeifPreProcessor::class, $preProcessors[HeifPreProcessor::class]);
        self::assertArrayHasKey(TestPreProcessor::class, $preProcessors);
        self::assertSame($this->preProcessor, $preProcessors[TestPreProcessor::class]);
    }

    public function testGetSlug(): void
    {
        self::assertEquals('test-variation', $this->variation->getSlug());
    }

    public function testGetForMediaWithExistingVariation(): void
    {
        $mediaVariation = $this->variation->getForMedia($this->media);
        $this->media->addVariation($mediaVariation);

        $result = $this->variation->getForMedia($this->media);
        self::assertSame($mediaVariation, $result);
    }

    public function testGetForMediaWithRejectedVoter(): void
    {
        $variation = new Variation(
            'test_variation_png',
            Format::PNG,
            $this->transformerChain,
            voters: [new FormatVoter('png')]
        );

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('The voters for the variation "test_variation_png" prevent to process the media "test.jpg"');

        $variation->getForMedia($this->media);
    }

    public function testCloneWithOutputFormat(): void
    {
        $clonedVariation = $this->variation->cloneWithOutputFormat(Format::PNG);

        self::assertEquals('test_variation', $clonedVariation->getName());
        self::assertEquals(Format::PNG, $clonedVariation->getFormat());
        self::assertSame($this->transformerChain, $clonedVariation->getTransformerChain());
        self::assertEquals(['options' => ['max_quality' => '80']], $clonedVariation->getPostProcessorConfiguration('jpegoptim'));
        self::assertSame($this->preProcessor, $clonedVariation->getPreProcessors()->current());
    }

    public function testWebpAlternativeVariation(): void
    {
        $webpVariation = new Variation(
            'test_variation_webp',
            Format::WEBP,
            $this->transformerChain,
        );

        $this->variation->setWebpAlternativeVariation($webpVariation);

        self::assertTrue($this->variation->hasWebpAlternativeVariation());
        self::assertSame($webpVariation, $this->variation->getWebpAlternativeVariation());
    }
}
