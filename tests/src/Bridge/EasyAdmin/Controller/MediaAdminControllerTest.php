<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;

class MediaAdminControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    private EntityRepository $pageRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();
        $container = static::getContainer();

        /** @var EntityManagerInterface */
        $entityManager = $container->get(EntityManagerInterface::class);
        $this->pageRepository = $entityManager->getRepository(Page::class);

        if (self::$kernel instanceof Kernel) {
            $application = new Application(self::$kernel);
            $application->setAutoExit(false);
            $application->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --no-interaction --quiet'));
        }
    }

    public function testDelete(): void
    {
        // MediaDeleteBehavior::RESTRICT
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore');
        $media = $this->findInGalleryFromName($crawler, 'restrict.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin/media/show/restrict.pdf');
        $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-danger', 'The media "restrict.pdf" is used in the "mediaRestrict" field of the "JoliCode\MediaBundle\Tests\Application\Entity\Page" entity. It cannot be deleted.');

        // MediaDeleteBehavior::SET_NULL
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore');
        $media = $this->findInGalleryFromName($crawler, 'set_null.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin/media/explore');
        $crawler = $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-success', 'Media "set_null.pdf" deleted successfully');

        $this->client->request(Request::METHOD_GET, '/admin/media/show/set_null.pdf');
        $this->assertResponseStatusCodeSame(404);

        /** @var Page $page */
        $page = $this->pageRepository->findOneBy(['title' => 'Page 1']);
        $this->assertNull($page->getMediaSetNull());

        // no MediaDeleteBahavior defined
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore');
        $media = $this->findInGalleryFromName($crawler, 'default.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin/media/explore');
        $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-success', 'Media "default.pdf" deleted successfully');

        $this->client->request(Request::METHOD_GET, '/admin/media/show/default.pdf');
        $this->assertResponseStatusCodeSame(404);

        /** @var Page $page */
        $page = $this->pageRepository->findOneBy(['title' => 'Page 1']);
        $this->assertSame('default.pdf', $page->getMediaDefault()->getPath());
    }

    public function testUploadAtRoot(): void
    {
        // test upload at the root of the media library
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('form[name="upload"]');
        $form = $crawler->filter('form[name="upload"]')->form();

        $tmpFile = tempnam(sys_get_temp_dir(), 'upload-test');
        copy(__DIR__ . '/../../../../fixtures/circle-pattern.png', $tmpFile);

        $phpValues = $form->getPhpValues();
        unset($phpValues['upload']['path']);

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues, [
            'upload' => [
                'file' => new UploadedFile(
                    $tmpFile,
                    'circle-pattern.png',
                    'image/png',
                    null,
                    true,
                ),
            ],
        ]);

        $this->assertResponseFormatSame('json');
        $this->assertResponseIsSuccessful();
        $responseContent = $this->client->getResponse()->getContent();
        $this->assertIsString($responseContent);

        $response = json_decode($responseContent, true);
        $this->assertArrayHasKey('files', $response);
        $this->assertCount(1, $response['files']);

        $this->assertArrayHasKey('name', $response['files'][0]);
        $this->assertArrayHasKey('url', $response['files'][0]);
        $this->assertArrayHasKey('size', $response['files'][0]);
        $this->assertArrayHasKey('type', $response['files'][0]);
        $this->assertArrayHasKey('thumbnailUrl', $response['files'][0]);

        $this->assertSame('circle-pattern.png', $response['files'][0]['name']);
        $this->assertSame('/media/original/circle-pattern.png', $response['files'][0]['url']);
        $this->assertSame(62563, $response['files'][0]['size']);
        $this->assertSame('image/png', $response['files'][0]['type']);
        $this->assertSame('/media/cache/joli-media-easy-admin/circle-pattern.png', $response['files'][0]['thumbnailUrl']);
    }

    public function testViewMode(): void
    {
        // test switching view mode between grid and list
        $this->client->followRedirects();
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore');

        $gridViewLink = $crawler->selectLink('Grid view');
        $this->assertStringContainsString('active', (string) $gridViewLink->attr('class')); // grid is default
        $this->assertSelectorCount(6, '.gallery-grid-item');
        $this->assertSelectorNotExists('.gallery-list-item');

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringNotContainsString('active', (string) $listViewLink->attr('class'));

        $crawler = $this->client->click($listViewLink->link());

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringContainsString('active', (string) $listViewLink->attr('class'));
        $this->assertSelectorNotExists('.gallery-grid-item');
        $this->assertSelectorCount(6, '.gallery-list-item');

        $gridViewLink = $crawler->selectLink('Grid view');
        $this->assertStringNotContainsString('active', (string) $gridViewLink->attr('class'));

        $crawler = $this->client->click($gridViewLink->link()); // back to grid

        $this->assertStringContainsString('active', (string) $crawler->selectLink('Grid view')->attr('class'));
        $this->assertSelectorCount(6, '.gallery-grid-item');
        $this->assertSelectorNotExists('.gallery-list-item');

        // test the view mode inside a subfolder
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/explore/sub/folder');
        $gridViewLink = $crawler->selectLink('Grid view');
        $this->assertStringContainsString('active', (string) $gridViewLink->attr('class')); // grid is default
        $this->assertSelectorCount(3, '.gallery-grid-item');
        $this->assertSelectorNotExists('.gallery-list-item');

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringNotContainsString('active', (string) $listViewLink->attr('class'));

        $crawler = $this->client->click($listViewLink->link());

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringContainsString('active', (string) $listViewLink->attr('class'));
        $this->assertSelectorNotExists('.gallery-grid-item');
        $this->assertSelectorCount(3, '.gallery-list-item');
    }

    public function testTheMediaLibraryRootRedirectsToTheExplorer(): void
    {
        $this->client->request(Request::METHOD_GET, '/admin/media');
        $this->assertResponseRedirects('http://localhost/admin/media/explore');

        $this->client->followRedirect();
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('.gallery');
    }

    public function testMediaPickerButton(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/page/new');
        $this->assertResponseIsSuccessful();

        // the folder to open is only known client-side, so the picker URL carries a
        // placeholder which the JavaScript replaces with the folder to browse
        $pickerUrl = $crawler->filter('a.joli-media-choice-edit')->first()->attr('href');
        $this->assertIsString($pickerUrl);
        $this->assertStringEndsWith('/admin/media/choose-file/__FOLDER__', $pickerUrl);

        $this->client->request(Request::METHOD_GET, str_replace('__FOLDER__', 'sub/folder', $pickerUrl));
        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('.breadcrumb-item.active', 'folder');
    }

    public function testSearchFormDisplay(): void
    {
        // the choose media modal has a toggable search panel
        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('[data-component="search"]');
        $this->assertSelectorExists('.search-container .joli-media-search-input');

        // the media library has an always visible search bar next to the breadcrumb
        $this->client->request(Request::METHOD_GET, '/admin/media/explore');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorNotExists('[data-component="search"]');
        $this->assertSelectorNotExists('.joli-media-search-input');
        $this->assertSelectorExists('form.joli-media-search-form input[name="query"]');
        // with pretty URLs, searching only needs to submit the query to the current URL
        $this->assertSelectorNotExists('form.joli-media-search-form input[name="routeName"]');

        // the folder picker modal has no JS support for the search form, it must not be displayed there
        $this->client->request(Request::METHOD_GET, '/admin/media/choose-directory');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorNotExists('[data-component="search"]');
        $this->assertSelectorNotExists('.joli-media-search-input');
    }

    public function testSearch(): void
    {
        // matches both directories and medias, recursively
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=deep');
        $this->assertResponseIsSuccessful();
        $this->assertSame('deep', $crawler->filter('.joli-media-search-input')->attr('value'));
        $this->assertSelectorCount(1, 'ul.gallery-grid--folders .gallery-grid-item');
        $this->assertSelectorTextContains('ul.gallery-grid--folders .gallery-grid-item__name', 'deep');
        $this->assertSelectorCount(1, 'ul.gallery-grid--files .gallery-grid-item');
        $this->assertSame('sub/folder/deep/test.txt', $crawler->filter('ul.gallery-grid--files .gallery-grid-item__link')->attr('data-media-url'));

        // the search is case-insensitive
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=DEEP');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorCount(1, 'ul.gallery-grid--folders .gallery-grid-item');
        $this->assertSelectorCount(1, 'ul.gallery-grid--files .gallery-grid-item');
        $this->assertSame('sub/folder/deep/test.txt', $crawler->filter('ul.gallery-grid--files .gallery-grid-item__link')->attr('data-media-url'));

        // the search is scoped to the current directory
        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file/sub?query=circle');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorCount(1, 'ul.gallery-grid--files .gallery-grid-item');

        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file/not_used?query=circle');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorCount(0, 'ul.gallery-grid--files .gallery-grid-item');

        // a search without any match displays empty results
        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=doesnotexist');
        $this->assertResponseIsSuccessful();
        $this->assertSelectorCount(0, 'ul.gallery-grid--folders .gallery-grid-item');
        $this->assertSelectorCount(0, 'ul.gallery-grid--files .gallery-grid-item');
    }

    public function testSearchResultsAreSorted(): void
    {
        // recursive listings are not sorted by the storage, the controller must
        // sort them to guarantee a stable pagination
        $crawler = $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=pdf');
        $this->assertResponseIsSuccessful();

        $paths = $crawler->filter('ul.gallery-grid--files .gallery-grid-item__link')
            ->each(static fn (Crawler $node): string => (string) $node->attr('data-media-url'))
        ;
        $this->assertSame([
            'default.pdf',
            'not_used/default.pdf',
            'restrict.pdf',
            'set_null.pdf',
        ], $paths);
    }

    public function testSearchWithAnOutOfRangePageNumber(): void
    {
        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=pdf&page=1');
        $this->assertResponseIsSuccessful();

        $this->client->request(Request::METHOD_GET, '/admin/media/choose-file?query=pdf&page=2');
        $this->assertResponseStatusCodeSame(400);
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function findInGalleryFromName(Crawler $crawler, string $name): Crawler
    {
        return $crawler->filter('ul.gallery-grid--files .gallery-grid-item__link')
            ->reduce(static fn (Crawler $node): bool => str_contains($node->filter('.gallery-grid-item__name')->text(), $name))
        ;
    }
}
