<?php

namespace JoliCode\MediaBundle\Tests\Srcset;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Srcset\SrcsetBuilder;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class SrcsetBuilderTest extends BaseTestCase
{
    private const STORED_MEDIA = 'srcset-builder-stored.jpg';

    private const UNSTORED_MEDIA = 'srcset-builder-unstored.jpg';

    private const SMALL_MEDIA = 'srcset-builder-small.jpg';

    private const NOT_AN_IMAGE = 'srcset-builder-not-an-image.txt';

    public static function setUpBeforeClass(): void
    {
        $container = static::getContainer();

        /** @var Converter */
        $converter = $container->get('joli_media.converter');

        /** @var Resolver */
        $resolver = $container->get('joli_media.resolver');

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $originalStorage = $libraries->getDefault()->getOriginalStorage();

        // store the self::STORED_MEDIA media and all its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::STORED_MEDIA, $originalStorage, $binary);
        $media->store();

        $converter->convert($media, 'default', 'variation-standard');
        $converter->convert($media, 'default', 'variation-large');
        $converter->convert($media, 'default', 'variation-extra-large');
        $converter->convert($media, 'default', 'variation-retina');

        // store the self::SMALL_MEDIA media, which is too small to be resized by the variations forbidding the upscale
        $smallBinary = $resolver->resolveMediaVariation(self::STORED_MEDIA, 'variation-retina', 'default')?->getBinary();
        self::assertInstanceOf(Binary::class, $smallBinary);
        $media = new Media(self::SMALL_MEDIA, $originalStorage, new Binary('image/jpeg', Format::JPEG->value, $smallBinary->getContent()));
        $media->store();

        // store the self::UNSTORED_MEDIA media but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::UNSTORED_MEDIA, $originalStorage, $binary);
        $media->store();
        $libraries->getDefault()->deleteAllVariations(self::UNSTORED_MEDIA);

        $media = new Media(self::NOT_AN_IMAGE, $originalStorage, new Binary('text/plain', 'txt', 'not an image at all'));
        $media->store();
    }

    public static function tearDownAfterClass(): void
    {
        $container = static::getContainer();

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $library = $libraries->getDefault();

        foreach ([self::STORED_MEDIA, self::UNSTORED_MEDIA, self::SMALL_MEDIA, self::NOT_AN_IMAGE] as $path) {
            $library->getOriginalStorage()->delete($path);
            $library->deleteAllVariations($path);
        }
    }

    public function testItBuildsWidthDescriptorsFromTheGeneratedFiles(): void
    {
        $srcset = $this->getBuilder()->build(
            self::STORED_MEDIA,
            ['variation-large', 'variation-standard', 'variation-extra-large'],
            'default',
        );

        self::assertCount(3, $srcset);
        self::assertSame(
            '/media/cache/variation-standard/srcset-builder-stored.jpg 145w, /media/cache/variation-large/srcset-builder-stored.jpg 800w, /media/cache/variation-extra-large/srcset-builder-stored.jpg 1800w',
            (string) $srcset,
            'the candidates are ordered by increasing width, whatever the order they were asked in',
        );
        self::assertSame(145, $srcset->getSmallestWidth());

        foreach ($srcset as $candidate) {
            self::assertTrue($candidate->isStored());
            self::assertFalse($candidate->hasPredictedDimensions);
            self::assertSame('image/jpeg', $candidate->mimeType);
        }
    }

    public function testItComputesTheWidthsOfTheVariationsWhichAreNotGeneratedYet(): void
    {
        $srcset = $this->getBuilder()->build(
            self::UNSTORED_MEDIA,
            ['variation-standard', 'variation-large', 'variation-extra-large'],
            'default',
        );

        self::assertCount(3, $srcset);
        self::assertSame(
            '/media/cache/variation-standard/srcset-builder-unstored.jpg 145w, /media/cache/variation-large/srcset-builder-unstored.jpg 800w, /media/cache/variation-extra-large/srcset-builder-unstored.jpg 1800w',
            (string) $srcset,
        );

        foreach ($srcset as $candidate) {
            self::assertFalse($candidate->isStored());
            self::assertTrue($candidate->hasPredictedDimensions);
        }
    }

    public function testTheComputedWidthsMatchTheGeneratedOnes(): void
    {
        $builder = $this->getBuilder();
        $variations = ['variation-standard', 'variation-large', 'variation-extra-large'];

        self::assertSame(
            array_map(
                static fn (array $candidate): ?int => $candidate['width'],
                $builder->build(self::STORED_MEDIA, $variations, 'default')->toArray(),
            ),
            array_map(
                static fn (array $candidate): ?int => $candidate['width'],
                $builder->build(self::UNSTORED_MEDIA, $variations, 'default')->toArray(),
            ),
            'the same media must yield the same widths, whether its variations are generated or not',
        );
    }

    public function testItKeepsTheDescriptorsItIsGiven(): void
    {
        $srcset = $this->getBuilder()->buildWithDescriptors(
            self::STORED_MEDIA,
            [
                '' => 'variation-standard',
                '2x' => 'variation-large',
            ],
            'default',
        );

        self::assertCount(2, $srcset);
        self::assertSame(
            '/media/cache/variation-standard/srcset-builder-stored.jpg, /media/cache/variation-large/srcset-builder-stored.jpg 2x',
            (string) $srcset,
        );
    }

    public function testItKeepsTheCandidatesWhichAreNotGeneratedYetWhenGivenDescriptors(): void
    {
        $srcset = $this->getBuilder()->buildWithDescriptors(
            self::UNSTORED_MEDIA,
            [
                '' => 'variation-standard',
                '2x' => 'variation-large',
            ],
            'default',
        );

        self::assertSame(
            '/media/cache/variation-standard/srcset-builder-unstored.jpg, /media/cache/variation-large/srcset-builder-unstored.jpg 2x',
            (string) $srcset,
        );
        self::assertSame([145, 800], array_column($srcset->toArray(), 'width'));

        foreach ($srcset as $candidate) {
            self::assertFalse($candidate->isStored());
            self::assertTrue($candidate->hasPredictedDimensions);
        }
    }

    public function testItKeepsTheFirstOfTheCandidatesHavingTheSameWidth(): void
    {
        $srcset = $this->getBuilder()->build(
            self::SMALL_MEDIA,
            ['variation-retina-2x', 'variation-large', 'variation-standard'],
            'default',
        );

        self::assertSame(
            '/media/cache/variation-large/srcset-builder-small.jpg 100w, /media/cache/variation-retina-2x/srcset-builder-small.jpg 200w',
            (string) $srcset,
        );
    }

    public function testItSerializesTheCandidates(): void
    {
        $srcset = $this->getBuilder()->build(self::STORED_MEDIA, ['variation-standard'], 'default');

        self::assertSame([
            [
                'url' => '/media/cache/variation-standard/srcset-builder-stored.jpg',
                'variation' => 'variation-standard',
                'descriptor' => '145w',
                'width' => 145,
                'height' => 109,
                'mimeType' => 'image/jpeg',
            ],
        ], $srcset->toArray());
    }

    public function testItSkipsTheDimensionsWhenAskedTo(): void
    {
        $srcset = $this->getBuilder()->buildWithDescriptors(
            self::STORED_MEDIA,
            ['2x' => 'variation-standard'],
            'default',
            skipDimensions: true,
        );

        self::assertSame('/media/cache/variation-standard/srcset-builder-stored.jpg 2x', (string) $srcset);
        self::assertNull($srcset->getCandidates()[0]->width);
        self::assertNull($srcset->getCandidates()[0]->height);
        self::assertNull($srcset->getSmallestWidth());
    }

    public function testItIgnoresAMediaWhichCannotBeProcessed(): void
    {
        self::assertNull(
            $this->getBuilder()->createCandidate(self::NOT_AN_IMAGE, 'variation-standard', libraryName: 'default'),
        );
        self::assertTrue(
            $this->getBuilder()->build(self::NOT_AN_IMAGE, ['variation-standard', 'variation-large'], 'default')->isEmpty(),
        );
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function getBuilder(): SrcsetBuilder
    {
        $builder = static::getContainer()->get('joli_media.srcset_builder');
        self::assertInstanceOf(SrcsetBuilder::class, $builder);

        return $builder;
    }
}
