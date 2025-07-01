<?php

namespace JoliCode\MediaBundle\Tests\Twig\Component;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Twig\Components\Img;
use JoliCode\MediaBundle\Twig\Components\Picture;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\UX\TwigComponent\Test\InteractsWithTwigComponents;

class ImgTest extends WebTestCase
{
    use InteractsWithTwigComponents;

    private const COMPLETELY_STORED_MEDIA = 'circle-pattern.jpg';

    private const PARTIALLY_STORED_MEDIA = 'partially-stored-media.jpg';

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

        $converter->convert($media, 'default', 'joli-media-easy-admin');
        $converter->convert($media, 'default', 'joli-media-easy-admin-webp');
        $converter->convert($media, 'default', 'joli-media-easy-admin-large');
        $converter->convert($media, 'default', 'joli-media-easy-admin-large-webp');
        $converter->convert($media, 'default', 'joli-media-easy-admin-extra-large');
        $converter->convert($media, 'default', 'joli-media-easy-admin-extra-large-webp');

        // store the self::PARTIALLY_STORED_MEDIA media but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::PARTIALLY_STORED_MEDIA, $libraries->getDefault()->getOriginalStorage(), $binary);
        $media->store();

        // store the self::PARTIALLY_STORED_MEDIA media in the "auto_generate" library, but none of its variations
        $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
        $media = new Media(self::PARTIALLY_STORED_MEDIA, $libraries->get('auto_generate')->getOriginalStorage(), $binary);
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
        // img tags
        yield 'unresolved-media' => [
            Img::class,
            [
                'path' => 'mire.png',
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/joli-media-easy-admin/mire.png" loading="lazy" decoding="async" alt="Alternative text">',
        ];
        yield 'existing-media' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109">',
        ];
        yield 'partial-existing-media' => [
            Img::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
            ],
            '<img src="/media/cache/joli-media-easy-admin/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text">',
        ];
        yield 'existing-media-with-skip-auto-dimensions' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'skipAutoDimensions' => true,
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async">',
        ];
        yield 'existing-media-with-class' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'class' => 'img-class',
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" class="img-class" width="145" height="109">',
        ];
        yield 'existing-media-with-width-height' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'width' => 200,
                'height' => 200,
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="200" height="200">',
        ];
        yield 'existing-media-with-loading-decoding' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'loading' => false,
                'decoding' => false,
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" alt="Alternative text" width="145" height="109">',
        ];
        yield 'existing-media-with-aspect-ratio' => [
            Img::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'style' => 'aspect-ratio: calc(30 / 10)',
            ],
            '<img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" style="aspect-ratio: calc(30 / 10)" width="145" height="109">',
        ];

        // picture tags
        yield 'picture-tag' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
            ],
            '<picture><source srcset="/media/cache/joli-media-easy-admin-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"><img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'partial-picture-tag' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
            ],
            '<picture><source srcset="/media/cache/joli-media-easy-admin-webp/partially-stored-media.b16d66f4.webp"><img src="/media/cache/joli-media-easy-admin/partially-stored-media.jpg" loading="lazy" decoding="async" alt="Alternative text"></picture>',
        ];
        yield 'picture-with-class' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
            ],
            '<picture class="picture-class"><source srcset="/media/cache/joli-media-easy-admin-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"><img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-sources' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['joli-media-easy-admin', 'joli-media-easy-admin-large'],
            ],
            '<picture class="picture-class"><source srcset="/media/cache/joli-media-easy-admin/circle-pattern.jpg" type="image/jpeg" width="145" height="109"><source srcset="/media/cache/joli-media-easy-admin-large/circle-pattern.jpg" type="image/jpeg" width="800" height="600"><source srcset="/media/cache/joli-media-easy-admin-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"><img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'partial-picture-with-sources' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['joli-media-easy-admin', 'joli-media-easy-admin-large'],
            ],
            '<picture class="picture-class"><source srcset="/media/cache/joli-media-easy-admin/partially-stored-media.jpg"><source srcset="/media/cache/joli-media-easy-admin-large/partially-stored-media.jpg"><source srcset="/media/cache/joli-media-easy-admin-webp/partially-stored-media.b16d66f4.webp"><img src="/media/cache/joli-media-easy-admin/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
        yield 'auto-generate-partial-picture-with-sources' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'library' => 'auto_generate',
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => ['joli-media-easy-admin'],
            ],
            '<picture class="picture-class"><source srcset="/media-auto-generate/cache/joli-media-easy-admin/partially-stored-media.jpg" type="image/jpeg" width="145" height="109"><source srcset="/media-auto-generate/cache/joli-media-easy-admin-webp/partially-stored-media.b16d66f4.webp" type="image/webp" width="145" height="109"><img src="/media-auto-generate/cache/joli-media-easy-admin/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'picture-with-sources-and-media' => [
            Picture::class,
            [
                'path' => self::COMPLETELY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => [[
                    'media' => '(width > 1024px)',
                    'sizes' => '1920px',
                    'srcset' => [
                        '2560w' => 'joli-media-easy-admin-extra-large',
                        '1920w' => 'joli-media-easy-admin-large',
                    ],
                ], [
                    'media' => '(width >= 768px)',
                    'sizes' => '1024px',
                    'srcset' => [
                        '1600w' => 'joli-media-easy-admin-large',
                        '1024w' => 'joli-media-easy-admin',
                    ],
                ]],
            ],
            '<picture class="picture-class"><source media="(width > 1024px)" sizes="1920px" srcset="/media/cache/joli-media-easy-admin-extra-large/circle-pattern.jpg 2560w, /media/cache/joli-media-easy-admin-large/circle-pattern.jpg 1920w" type="image/jpeg" width="1800" height="1200"><source media="(width > 1024px)" sizes="1920px" srcset="/media/cache/joli-media-easy-admin-extra-large-webp/circle-pattern.d601f6f2.webp 2560w, /media/cache/joli-media-easy-admin-large-webp/circle-pattern.d601f6f2.webp 1920w" type="image/webp" width="1800" height="1200"><source media="(width >= 768px)" sizes="1024px" srcset="/media/cache/joli-media-easy-admin-large/circle-pattern.jpg 1600w, /media/cache/joli-media-easy-admin/circle-pattern.jpg 1024w" type="image/jpeg" width="800" height="600"><source media="(width >= 768px)" sizes="1024px" srcset="/media/cache/joli-media-easy-admin-large-webp/circle-pattern.d601f6f2.webp 1600w, /media/cache/joli-media-easy-admin-webp/circle-pattern.d601f6f2.webp 1024w" type="image/webp" width="800" height="600"><source srcset="/media/cache/joli-media-easy-admin-webp/circle-pattern.d601f6f2.webp" type="image/webp" width="145" height="109"><img src="/media/cache/joli-media-easy-admin/circle-pattern.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text" width="145" height="109"></picture>',
        ];
        yield 'partial-picture-with-sources-and-media' => [
            Picture::class,
            [
                'path' => self::PARTIALLY_STORED_MEDIA,
                'variation' => 'joli-media-easy-admin',
                'alt' => 'Alternative text',
                'picture:class' => 'picture-class',
                'img:class' => 'img-class',
                'sources' => [[
                    'media' => '(width > 1024px)',
                    'sizes' => '1920px',
                    'srcset' => [
                        '2560w' => 'joli-media-easy-admin-extra-large',
                        '1920w' => 'joli-media-easy-admin-large',
                    ],
                ], [
                    'media' => '(width >= 768px)',
                    'sizes' => '1024px',
                    'srcset' => [
                        '1600w' => 'joli-media-easy-admin-large',
                        '1024w' => 'joli-media-easy-admin',
                    ],
                ]],
            ],
            '<picture class="picture-class"><source media="(width > 1024px)" sizes="1920px" srcset="/media/cache/joli-media-easy-admin-extra-large/partially-stored-media.jpg 2560w, /media/cache/joli-media-easy-admin-large/partially-stored-media.jpg 1920w"><source media="(width > 1024px)" sizes="1920px" srcset="/media/cache/joli-media-easy-admin-extra-large-webp/partially-stored-media.b16d66f4.webp 2560w, /media/cache/joli-media-easy-admin-large-webp/partially-stored-media.b16d66f4.webp 1920w"><source media="(width >= 768px)" sizes="1024px" srcset="/media/cache/joli-media-easy-admin-large/partially-stored-media.jpg 1600w, /media/cache/joli-media-easy-admin/partially-stored-media.jpg 1024w"><source media="(width >= 768px)" sizes="1024px" srcset="/media/cache/joli-media-easy-admin-large-webp/partially-stored-media.b16d66f4.webp 1600w, /media/cache/joli-media-easy-admin-webp/partially-stored-media.b16d66f4.webp 1024w"><source srcset="/media/cache/joli-media-easy-admin-webp/partially-stored-media.b16d66f4.webp"><img src="/media/cache/joli-media-easy-admin/partially-stored-media.jpg" loading="lazy" decoding="async" class="img-class" alt="Alternative text"></picture>',
        ];
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
