<?php

namespace JoliCode\MediaBundle\Tests\Twig\Component;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Twig\Components\Img;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\UX\TwigComponent\Test\InteractsWithTwigComponents;

class ImgTest extends BaseTestCase
{
    use InteractsWithTwigComponents;

    private const COMPLETELY_STORED_MEDIA = 'circle-pattern.jpg';

    private const PARTIALLY_STORED_MEDIA = 'partially-stored-media.jpg';

    private const TIFF_MEDIA = 'tiff-media.tiff';

    private const BROKEN_FILENAME = 'some\ filename.jpg';

    private const NON_EXISTING_FILENAME = 'some\ filename\ that\ does\ not\ exist.jpg';

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        $container = static::getContainer();

        /** @var Converter */
        $converter = $container->get('joli_media.converter');

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');

        // store the self::COMPLETELY_STORED_MEDIA media and all its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::COMPLETELY_STORED_MEDIA, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();

        $converter->convert($media, 'default', 'variation-standard');
        $converter->convert($media, 'default', 'variation-standard-webp');
        $converter->convert($media, 'default', 'variation-large');
        $converter->convert($media, 'default', 'variation-large-webp');
        $converter->convert($media, 'default', 'variation-extra-large');
        $converter->convert($media, 'default', 'variation-extra-large-webp');

        // store the self::PARTIALLY_STORED_MEDIA media but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::PARTIALLY_STORED_MEDIA, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();

        // store the self::PARTIALLY_STORED_MEDIA media in the "auto_generate" library, but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::PARTIALLY_STORED_MEDIA, $libraries->get('auto_generate')->getOriginalStorage(), $binary);
        $media->store();

        // store the self::TIFF_MEDIA media
        $binary = new Binary('image/tiff', Format::TIFF->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::TIFF_FIXTURE_PATH));
        $media = new Media(self::TIFF_MEDIA, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();

        $converter->convert($media, 'default', 'variation-standard');

        // store the self::BROKEN_FILENAME media but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::BROKEN_FILENAME, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();

        $container = static::getContainer();

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $library = $libraries->getDefault();
        $library->getOriginalStorage()->delete(self::COMPLETELY_STORED_MEDIA);
        $library->getOriginalStorage()->delete(self::PARTIALLY_STORED_MEDIA);
        $library->deleteAllVariations(self::PARTIALLY_STORED_MEDIA);

        $library = $libraries->get('auto_generate');
        $library->getOriginalStorage()->delete(self::PARTIALLY_STORED_MEDIA);
        $library->deleteAllVariations(self::PARTIALLY_STORED_MEDIA);
    }

    /**
     * @param array<string, mixed> $configuration
     */
    #[DataProvider('provideComponentsData')]
    public function testComponents(string $component, array $configuration, string $expected): void
    {
        $rendered = $this->renderTwigComponent(
            name: $component,
            data: $configuration,
        );
        $crawler = new Crawler(\sprintf('<!DOCTYPE html><html><body>%s</body></html>', $rendered));
        $img = $crawler->filterXPath('//body/*')->first();
        $html = preg_replace(['/(\n\s*)+/', '/\s+/'], ['', ' '], $img->outerHtml());

        if ($expected !== $html) {
            echo "\n\n" . $html . "\n\n";
        }

        $this->assertEquals(
            $expected,
            $html,
        );
    }

    public static function provideComponentsData(): \Generator
    {
        yield 'unresolved-media' => [
            Img::class,
            [
                'path' => 'mire.png',
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/mire.png" loading="lazy" decoding="async" alt="Alternative text">',
        ];
        yield 'existing-media' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109">',
        ];
        yield 'existing-media-srcset' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => ['variation-standard'],
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109">',
        ];
        yield 'existing-media-srcset-multiple' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => ['variation-standard', 'variation-large', 'variation-extra-large'],
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" srcset="/media/cache/variation-standard/circle-pattern.jpg 145w, /media/cache/variation-large/circle-pattern.jpg 800w, /media/cache/variation-extra-large/circle-pattern.jpg 1800w" sizes="145px" width="145" height="109">',
        ];
        yield 'existing-media-tiff' => [
            Img::class,
            [
                'path' => self::TIFF_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/tiff-media.26258f1a.jpeg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109">',
        ];
        yield 'partial-existing-media' => [
            Img::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text">',
        ];
        yield 'partial-existing-media-srcset' => [
            Img::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => ['variation-standard'],
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text">',
        ];
        yield 'partial-existing-media-srcset-multiple' => [
            Img::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => ['variation-standard', 'variation-large', 'variation-extra-large'],
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text" srcset="/media/cache/variation-standard/partially-stored-media.jpg 145w, /media/cache/variation-large/partially-stored-media.jpg 800w, /media/cache/variation-extra-large/partially-stored-media.jpg 1800w" sizes="145px">',
        ];
        yield 'existing-media-with-skip-auto-dimensions' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'skipAutoDimensions' => true,
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async">',
        ];
        yield 'existing-media-with-class' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'class' => 'img-class',
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" class="img-class" width="145" height="109">',
        ];
        yield 'existing-media-with-width' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'width' => 200,
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="200">',
        ];
        yield 'existing-media-with-width-height' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'width' => 200,
                'height' => 200,
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="200" height="200">',
        ];
        yield 'existing-media-with-loading-decoding' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'loading' => false,
                'decoding' => false,
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" alt="Alternative text" width="145" height="109">',
        ];
        yield 'existing-media-with-aspect-ratio' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'style' => 'aspect-ratio: calc(30 / 10)',
            ],
            '<img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" style="aspect-ratio: calc(30 / 10)" width="145" height="109">',
        ];
        yield 'existing-media-variation-cannot-be-read' => [
            Img::class,
            [
                'path' => self::BROKEN_FILENAME,
                'variation' => 'variation-standard',
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename.jpg" loading="lazy" decoding="async">',
        ];
        yield 'existing-media-variation-cannot-be-read-srcset' => [
            Img::class,
            [
                'path' => self::BROKEN_FILENAME,
                'variation' => ['variation-standard'],
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename.jpg" loading="lazy" decoding="async">',
        ];
        yield 'existing-media-variation-cannot-be-read-srcset-multiple' => [
            Img::class,
            [
                'path' => self::BROKEN_FILENAME,
                'variation' => ['variation-standard', 'variation-large', 'variation-extra-large'],
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename.jpg" loading="lazy" decoding="async" srcset="/media/cache/variation-standard/some%5C%20filename.jpg 145w, /media/cache/variation-large/some%5C%20filename.jpg 800w, /media/cache/variation-extra-large/some%5C%20filename.jpg 1800w" sizes="145px">',
        ];
        yield 'non-existing-media-variation' => [
            Img::class,
            [
                'path' => self::NON_EXISTING_FILENAME,
                'variation' => 'variation-standard',
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename%5C%20that%5C%20does%5C%20not%5C%20exist.jpg" loading="lazy" decoding="async">',
        ];
        yield 'non-existing-media-srcset' => [
            Img::class,
            [
                'path' => self::NON_EXISTING_FILENAME,
                'variation' => ['variation-standard'],
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename%5C%20that%5C%20does%5C%20not%5C%20exist.jpg" loading="lazy" decoding="async">',
        ];
        yield 'non-existing-media-srcset-multiple' => [
            Img::class,
            [
                'path' => self::NON_EXISTING_FILENAME,
                'variation' => ['variation-standard', 'variation-large', 'variation-extra-large'],
            ],
            '<img src="/media/cache/variation-standard/some%5C%20filename%5C%20that%5C%20does%5C%20not%5C%20exist.jpg" loading="lazy" decoding="async">',
        ];
    }

    public function testNonResolvedMedia(): void
    {
        $nonResolvedMedia = new NullMedia(
            self::NON_EXISTING_FILENAME,
            $this->originalStorage
        );
        $cases = [
            'non-resolved-media' => [
                [
                    'media' => $nonResolvedMedia,
                ],
                '<img src="/media/original/some%5C%20filename%5C%20that%5C%20does%5C%20not%5C%20exist.jpg" loading="lazy" decoding="async">',
            ],
            'non-resolved-media-variation' => [
                [
                    'media' => $nonResolvedMedia,
                    'variation' => 'variation-standard',
                ],
                '<img src="/media/cache/variation-standard/some%5C%20filename%5C%20that%5C%20does%5C%20not%5C%20exist.jpg" loading="lazy" decoding="async">',
            ],
        ];

        foreach ($cases as [$configuration, $expected]) {
            $this->testComponents(Img::class, $configuration, $expected);
        }
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
