<?php

namespace JoliCode\MediaBundle\Tests\Twig\Component;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Twig\Components\Picture;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\UX\TwigComponent\Test\InteractsWithTwigComponents;

class PictureTest extends WebTestCase
{
    use InteractsWithTwigComponents;

    private const COMPLETELY_STORED_MEDIA = 'circle-pattern.jpg';

    private const PARTIALLY_STORED_MEDIA = 'partially-stored-media.jpg';

    private const TIFF_MEDIA = 'tiff-media.tiff';

    private const BROKEN_FILENAME = 'some\ filename.jpg';

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

        // @phpstan-ignore-next-line
        if (Kernel::MAJOR_VERSION < 8 && !(Kernel::MAJOR_VERSION === 7 && Kernel::MINOR_VERSION === 4 && \PHP_VERSION_ID >= 80400)) {
            // Since Symfony 7.4 with PHP 8.4, the native HTML5 parser is used unconditionally
            $expected = str_replace('</source>', '', $expected);
            $expected = str_replace('&gt;', '>', $expected);
        }

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
        yield 'picture-tag' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<picture><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'partial-picture-tag' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
            ],
            '<picture><source srcset="/media/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp"></source><img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text"></picture>',
        ];
        yield 'picture-with-class' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
            ],
            '<picture class="picture-class"><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-sources' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['variation-standard', 'variation-large'],
            ],
            '<picture class="picture-class"><source srcset="/media/cache/variation-standard/circle-pattern.jpg" type="image/jpeg" width="145" height="109"></source><source srcset="/media/cache/variation-large/circle-pattern.jpg" type="image/jpeg" width="800" height="600"></source><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-sources-and-skipAutoDimensions' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['variation-standard', 'variation-large'],
                'skipAutoDimensions' => true,
            ],
            '<picture class="picture-class"><source srcset="/media/cache/variation-standard/circle-pattern.jpg" type="image/jpeg"></source><source srcset="/media/cache/variation-large/circle-pattern.jpg" type="image/jpeg"></source><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
        yield 'partial-picture-with-sources' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['variation-standard', 'variation-large'],
            ],
            '<picture class="picture-class"><source srcset="/media/cache/variation-standard/partially-stored-media.jpg"></source><source srcset="/media/cache/variation-large/partially-stored-media.jpg"></source><source srcset="/media/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp"></source><img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
        yield 'partial-picture-with-sources-and-skipAutoDimensions' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['variation-standard', 'variation-large'],
                'skipAutoDimensions' => true,
            ],
            '<picture class="picture-class"><source srcset="/media/cache/variation-standard/partially-stored-media.jpg"></source><source srcset="/media/cache/variation-large/partially-stored-media.jpg"></source><source srcset="/media/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp"></source><img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
        yield 'auto-generate-partial-picture-with-sources' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'library' => 'auto_generate',
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['variation-standard'],
            ],
            '<picture class="picture-class"><source srcset="/media-auto-generate/cache/variation-standard/partially-stored-media.jpg" type="image/jpeg" width="145" height="109"></source><source srcset="/media-auto-generate/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp" type="image/webp" width="145" height="109"></source><img src="/media-auto-generate/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-media-and-string-srcset' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => [[
                    'media' => '(min-width: 1024px)',
                    'srcset' => 'variation-extra-large',
                ], [
                    'media' => '(max-width: 1023px)',
                    'srcset' => 'variation-large',
                ]],
            ],
            '<picture class="picture-class"><source media="(min-width: 1024px)" srcset="/media/cache/variation-extra-large-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="1800" height="1200"></source><source media="(min-width: 1024px)" srcset="/media/cache/variation-extra-large/circle-pattern.jpg" type="image/jpeg" width="1800" height="1200"></source><source media="(max-width: 1023px)" srcset="/media/cache/variation-large-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="800" height="600"></source><source media="(max-width: 1023px)" srcset="/media/cache/variation-large/circle-pattern.jpg" type="image/jpeg" width="800" height="600"></source><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-sources-and-media' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => [[
                    'media' => '(width > 1024px)',
                    'sizes' => '1920px',
                    'srcset' => [
                        '2560w' => 'variation-extra-large',
                        '1920w' => 'variation-large',
                    ],
                ], [
                    'media' => '(width >= 768px)',
                    'sizes' => '1024px',
                    'srcset' => [
                        '1600w' => 'variation-large',
                        '1024w' => 'variation-standard',
                    ],
                ]],
            ],
            '<picture class="picture-class"><source media="(width &gt; 1024px)" sizes="1920px" srcset="/media/cache/variation-extra-large-webp/circle-pattern.d601f6f2.webp 2560w, /media/cache/variation-large-webp/circle-pattern.d601f6f2.webp 1920w" type="image/webp" width="1800" height="1200"></source><source media="(width &gt; 1024px)" sizes="1920px" srcset="/media/cache/variation-extra-large/circle-pattern.jpg 2560w, /media/cache/variation-large/circle-pattern.jpg 1920w" type="image/jpeg" width="1800" height="1200"></source><source media="(width &gt;= 768px)" sizes="1024px" srcset="/media/cache/variation-large-webp/circle-pattern.d601f6f2.webp 1600w, /media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp 1024w" type="image/webp" width="800" height="600"></source><source media="(width &gt;= 768px)" sizes="1024px" srcset="/media/cache/variation-large/circle-pattern.jpg 1600w, /media/cache/variation-standard/circle-pattern.jpg 1024w" type="image/jpeg" width="800" height="600"></source><source srcset="/media/cache/variation-standard-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"></source><img src="/media/cache/variation-standard/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'partial-picture-with-sources-and-media' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'variation-standard',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => [[
                    'media' => '(width > 1024px)',
                    'sizes' => '1920px',
                    'srcset' => [
                        '2560w' => 'variation-extra-large',
                        '1920w' => 'variation-large',
                    ],
                ], [
                    'media' => '(width >= 768px)',
                    'sizes' => '1024px',
                    'srcset' => [
                        '1600w' => 'variation-large',
                        '1024w' => 'variation-standard',
                    ],
                ]],
            ],
            '<picture class="picture-class"><source media="(width &gt; 1024px)" sizes="1920px" srcset="/media/cache/variation-extra-large-webp/partially-stored-media.b16d66f4.webp 2560w, /media/cache/variation-large-webp/partially-stored-media.b16d66f4.webp 1920w" type="image/webp"></source><source media="(width &gt; 1024px)" sizes="1920px" srcset="/media/cache/variation-extra-large/partially-stored-media.jpg 2560w, /media/cache/variation-large/partially-stored-media.jpg 1920w"></source><source media="(width &gt;= 768px)" sizes="1024px" srcset="/media/cache/variation-large-webp/partially-stored-media.b16d66f4.webp 1600w, /media/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp 1024w" type="image/webp"></source><source media="(width &gt;= 768px)" sizes="1024px" srcset="/media/cache/variation-large/partially-stored-media.jpg 1600w, /media/cache/variation-standard/partially-stored-media.jpg 1024w"></source><source srcset="/media/cache/variation-standard-webp/partially-stored-media.b16d66f4.webp"></source><img src="/media/cache/variation-standard/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
