<?php

namespace JoliCode\MediaBundle\Tests\Twig;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use Twig\Environment;

class JoliMediaExtensionTest extends BaseTestCase
{
    private const FILTER_MEDIA = 'joli-media-extension-test.jpg';

    private const DIRECT_MEDIA = 'joli-media-extension-direct-test.jpg';

    public static function setUpBeforeClass(): void
    {
        $libraries = self::getLibraryContainer();

        foreach (['default', 'auto_generate'] as $libraryName) {
            $library = $libraries->get($libraryName);

            foreach ([self::FILTER_MEDIA, self::DIRECT_MEDIA] as $path) {
                $binary = new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH));
                $media = new Media($path, $library->getOriginalStorage(), $binary);
                $media->store();

                // remove variation files possibly left over by a previous run
                $library->deleteAllVariations($path);
            }
        }
    }

    public static function tearDownAfterClass(): void
    {
        $libraries = self::getLibraryContainer();

        foreach (['default', 'auto_generate'] as $libraryName) {
            $library = $libraries->get($libraryName);

            foreach ([self::FILTER_MEDIA, self::DIRECT_MEDIA] as $path) {
                $library->getOriginalStorage()->delete($path);
                $library->deleteAllVariations($path);
            }
        }
    }

    public function testTheFilterStoresTheVariationWhenTheLibraryRequiresIt(): void
    {
        $url = $this->renderUrlFilter(self::FILTER_MEDIA, 'variation-standard', 'auto_generate');

        self::assertSame('/media-auto-generate/cache/variation-standard/' . self::FILTER_MEDIA, $url);
        self::assertTrue($this->isVariationStored('auto_generate', self::FILTER_MEDIA, 'variation-standard'));
    }

    public function testTheFilterDoesNotStoreTheVariationWhenTheLibraryDoesNotRequireIt(): void
    {
        $url = $this->renderUrlFilter(self::FILTER_MEDIA, 'variation-standard', 'default');

        self::assertSame('/media/cache/variation-standard/' . self::FILTER_MEDIA, $url);
        self::assertFalse($this->isVariationStored('default', self::FILTER_MEDIA, 'variation-standard'));
    }

    public function testTheFilterHonorsTheVariationLevelSetting(): void
    {
        // the "variation-auto-stored" variation enables the storage in the
        // "default" library, where it is disabled at the library level
        $this->renderUrlFilter(self::FILTER_MEDIA, 'variation-auto-stored', 'default');

        self::assertTrue($this->isVariationStored('default', self::FILTER_MEDIA, 'variation-auto-stored'));

        // the "variation-never-stored" variation disables the storage in the
        // "auto_generate" library, where it is enabled at the library level
        $this->renderUrlFilter(self::FILTER_MEDIA, 'variation-never-stored', 'auto_generate');

        self::assertFalse($this->isVariationStored('auto_generate', self::FILTER_MEDIA, 'variation-never-stored'));
    }

    public function testGeneratingTheUrlFromTheModelStoresTheVariation(): void
    {
        // the conversion is triggered by MediaVariation::getUrl() itself, without
        // any Twig involvement - eg. from an API Platform normalizer
        $library = self::getLibraryContainer()->get('auto_generate');
        $media = new Media(self::DIRECT_MEDIA, $library->getOriginalStorage());

        $url = $media->createVariation('variation-standard')->getUrl();

        self::assertSame('/media-auto-generate/cache/variation-standard/' . self::DIRECT_MEDIA, $url);
        self::assertTrue($this->isVariationStored('auto_generate', self::DIRECT_MEDIA, 'variation-standard'));
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private static function getLibraryContainer(): LibraryContainer
    {
        /** @var LibraryContainer $libraries */
        $libraries = static::getContainer()->get('joli_media.library_container');

        return $libraries;
    }

    private function renderUrlFilter(string $path, string $variation, string $library): string
    {
        /** @var Environment $twig */
        $twig = static::getContainer()->get('twig');

        return $twig
            ->createTemplate(\sprintf("{{ path|joli_media_url('%s', '%s') }}", $variation, $library))
            ->render(['path' => $path])
        ;
    }

    private function isVariationStored(string $libraryName, string $path, string $variationName): bool
    {
        $library = self::getLibraryContainer()->get($libraryName);

        return $library->getCacheStorage()->has($path, $library->getVariation($variationName));
    }
}
