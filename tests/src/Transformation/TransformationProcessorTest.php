<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Exception\UnprocessableMediaException;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\DependencyInjection\ServiceLocator;

class TransformationProcessorTest extends BaseTestCase
{
    public function testProcessThrowsForUnprocessableMediaWithTransformers(): void
    {
        $binary = new Binary('image/jpeg', 'jpeg', '', 'test/empty.jpeg');
        $transformation = $this->createTransformation(
            $binary,
            new TransformerChain([new Resize(400, 300)]),
        );
        $processor = $this->createTransformationProcessor();

        try {
            $processor->process($transformation);
            self::fail('An UnprocessableMediaException should have been thrown.');
        } catch (UnprocessableMediaException $unprocessableMediaException) {
            self::assertSame('test/empty.jpeg', $unprocessableMediaException->getPath());
            self::assertSame('default', $unprocessableMediaException->getLibraryName());
            self::assertSame('admin', $unprocessableMediaException->getVariationName());
            self::assertSame('image/jpeg', $unprocessableMediaException->getMimeType());
            self::assertSame('jpeg', $unprocessableMediaException->getBinaryFormat());
            self::assertSame(0, $unprocessableMediaException->getContentSize());
            self::assertStringContainsString('test/empty.jpeg', $unprocessableMediaException->getMessage());
            self::assertStringContainsString('could not be determined', $unprocessableMediaException->getMessage());
        }
    }

    public function testProcessAllowsPureFormatConversionForUnprocessableMedia(): void
    {
        // a variation without transformers must keep working, even when the
        // pixel dimensions of the media cannot be determined
        $binary = new Binary('image/jpeg', 'jpeg', '', 'test/empty.jpeg');
        $transformation = $this->createTransformation($binary, new TransformerChain([]));
        $result = self::getFixtureBinary('webp');
        $processor = $this->createTransformationProcessor($result);

        self::assertSame($result, $processor->process($transformation));
    }

    public function testProcessHonoursPreProcessorsRestoringDimensions(): void
    {
        // a pre-processor turning an unmeasurable binary into a measurable one
        // (e.g. the HeifPreProcessor on PHP < 8.5) must avoid the guard
        $binary = new Binary('image/jpeg', 'jpeg', '', 'test/empty.jpeg');
        $preProcessor = new CallbackPreProcessor(static fn (): Binary => self::getFixtureBinary('jpeg'));
        $transformation = $this->createTransformation(
            $binary,
            new TransformerChain([new Resize(400, 300)]),
            ['restore' => static fn (): CallbackPreProcessor => $preProcessor],
        );
        $result = self::getFixtureBinary('webp');
        $processor = $this->createTransformationProcessor($result);

        self::assertSame($result, $processor->process($transformation));
        self::assertTrue($transformation->hasKnownDimensions());
    }

    public function testFailingPreProcessorDoesNotSkipSubsequentPreProcessors(): void
    {
        $secondPreProcessorCalled = false;
        $failingPreProcessor = new CallbackPreProcessor(static function (): Binary {
            throw new \RuntimeException('This pre-processor fails.');
        });
        $recordingPreProcessor = new CallbackPreProcessor(static function (Binary $binary) use (&$secondPreProcessorCalled): Binary {
            $secondPreProcessorCalled = true;

            return $binary;
        });
        $transformation = $this->createTransformation(
            self::getFixtureBinary('jpeg'),
            new TransformerChain([]),
            [
                'failing' => static fn (): CallbackPreProcessor => $failingPreProcessor,
                'recording' => static fn (): CallbackPreProcessor => $recordingPreProcessor,
            ],
        );
        $processor = $this->createTransformationProcessor(self::getFixtureBinary('webp'));

        $processor->process($transformation);

        self::assertTrue($secondPreProcessorCalled);
    }

    public function testProcessThrowsWhenIntermediateBinaryIsUnmeasurable(): void
    {
        $immediateTransformer = new ImmediateStubTransformer();
        $transformation = $this->createTransformation(
            self::getFixtureBinary('jpeg'),
            new TransformerChain([$immediateTransformer]),
        );
        // the elected processor produces an unmeasurable binary
        $processor = $this->createTransformationProcessor(new Binary('image/webp', 'webp', ''));

        try {
            $processor->process($transformation);
            self::fail('An UnprocessableMediaException should have been thrown.');
        } catch (UnprocessableMediaException $unprocessableMediaException) {
            self::assertStringContainsString('intermediate binary', $unprocessableMediaException->getMessage());
            self::assertFalse($immediateTransformer->transformCalled);
        }
    }

    /**
     * @param array<string, callable> $preProcessors
     */
    private function createTransformation(Binary $binary, TransformerChain $transformerChain, array $preProcessors = []): Transformation
    {
        $media = new Media($binary->getPath() ?? 'test/media.jpeg', $this->originalStorage, $binary);
        $variation = new Variation(
            'admin',
            Format::WEBP,
            $transformerChain,
            preProcessors: new ServiceLocator($preProcessors),
        );

        return new Transformation($binary, $media->createVariation($variation));
    }

    private function createTransformationProcessor(?Binary $result = null): TransformationProcessor
    {
        $processorContainer = new ProcessorContainer();
        $processorContainer->add('imagine', new StubProcessor($result ?? self::getFixtureBinary('webp')));

        return new TransformationProcessor($processorContainer, new PostProcessorContainer());
    }
}
