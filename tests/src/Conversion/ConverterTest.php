<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Conversion;

use Imagine\Imagick\Imagine as ImagineImagine;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PostProcessor\PostProcessorContainer;
use JoliCode\MediaBundle\Processor\Cwebp;
use JoliCode\MediaBundle\Processor\Imagine;
use JoliCode\MediaBundle\Processor\ProcessorContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformation\TransformationProcessor;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\DependencyInjection\ServiceLocator;

class ConverterTest extends BaseTestCase
{
    private const array TO_EXTENSIONS = [
        null,
        'jpeg',
        'png',
        'webp',
        'avif',
    ];

    protected function setUp(): void
    {
        parent::setUp();

        $this->library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->createVariationContainer($this->cacheStorage, $this->createVariations())
        );
        $libraries = new LibraryContainer(
            new ServiceLocator(
                [
                    'default' => fn (): Library => $this->library,
                ]
            ),
            'default',
        );
        $this->processorContainer = new ProcessorContainer();
        $this->processorContainer->add('cwebp', new Cwebp());
        $this->processorContainer->add('imagine', new Imagine(new ImagineImagine()));

        $resolver = new Resolver($libraries, $this->processorContainer);
        $this->converter = new Converter($libraries, $resolver, new TransformationProcessor(
            $this->processorContainer,
            new PostProcessorContainer(),
        ));
    }

    #[DataProvider('provideConvertCases')]
    public function testConvert(string $fromExtension, ?string $toExtension, int $expectedSize, string $expectedMimeType): void
    {
        $filename = \sprintf('%s/test.%s', $toExtension ?? $fromExtension, $fromExtension);

        $media = new Media($filename, $this->originalStorage);
        $media->store($this->getFixtureBinary($fromExtension));

        $variationName = $this->getVariationName($toExtension);

        $mediaVariation = $this->converter->getMediaVariation($filename, $variationName, $this->library->getName());

        if (!$mediaVariation instanceof MediaVariation) {
            self::fail(\sprintf('The media variation "%s" was not created.', $variationName));
        }

        $this->converter->convertMediaVariation($mediaVariation, false);

        self::assertInstanceOf(MediaVariation::class, $mediaVariation);
        self::assertSame($variationName, $mediaVariation->getVariation()->getName());
        self::assertTrue($mediaVariation->isStored());
        self::assertSame($expectedMimeType, $mediaVariation->getBinary()->getMimeType());
        self::assertSame($expectedSize, $mediaVariation->getBinary()->getContentSize());
    }

    public static function provideConvertCases(): \Generator
    {
        yield ['avif', null, 21960, 'image/avif'];
        yield ['jpeg', null, 34092, 'image/jpeg'];
        yield ['png', null, 24406, 'image/png'];
        yield ['heif', null, 21070, 'image/jpeg'];
        yield ['tiff', null, 21072, 'image/jpeg'];
        yield ['webp', null, 4280, 'image/webp'];

        yield ['avif', 'jpeg', 34072, 'image/jpeg'];
        yield ['jpeg', 'jpeg', 34092, 'image/jpeg'];
        yield ['png', 'jpeg', 21072, 'image/jpeg'];
        yield ['heif', 'jpeg', 21070, 'image/jpeg'];
        yield ['tiff', 'jpeg', 21072, 'image/jpeg'];
        yield ['webp', 'jpeg', 21144, 'image/jpeg'];

        yield ['avif', 'png', 42562, 'image/png'];
        yield ['jpeg', 'png', 39179, 'image/png'];
        yield ['png', 'png', 24406, 'image/png'];
        yield ['heif', 'png', 26990, 'image/png'];
        yield ['tiff', 'png', 24513, 'image/png'];
        yield ['webp', 'png', 24244, 'image/png'];

        yield ['avif', 'webp', 21240, 'image/webp'];
        yield ['jpeg', 'webp', 7018, 'image/webp'];
        yield ['png', 'webp', 4368, 'image/webp'];
        yield ['heif', 'webp', 8158, 'image/webp'];
        yield ['tiff', 'webp', 7068, 'image/webp'];
        yield ['webp', 'webp', 4280, 'image/webp'];

        yield ['avif', 'avif', 21960, 'image/avif'];
        yield ['jpeg', 'avif', 20926, 'image/avif'];
        yield ['png', 'avif', 7826, 'image/avif'];
        yield ['heif', 'avif', 7860, 'image/avif'];
        yield ['tiff', 'avif', 7826, 'image/avif'];
        yield ['webp', 'avif', 7675, 'image/avif'];
    }

    /**
     * @return array<string, callable>
     */
    private function createVariations(): array
    {
        $variations = [];

        foreach (self::TO_EXTENSIONS as $toExtension) {
            $variationName = $this->getVariationName($toExtension);

            $variations[$variationName] = fn (): Variation => new Variation(
                $variationName,
                $toExtension ? Format::fromName($toExtension) : null,
                new TransformerChain([
                    new Resize(400, 300),
                ]),
            );
        }

        return $variations;
    }

    private function getVariationName(?string $toExtension): string
    {
        return $toExtension ? 'thumbnail-' . $toExtension : 'thumbnail';
    }
}
