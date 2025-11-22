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
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');
        $media = $this->findInGalleryFromName($crawler, 'restrict.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin?routeName=joli_media_easy_admin_show&routeParams%5Bkey%5D=restrict.pdf');
        $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-danger', 'The media "restrict.pdf" is used in the "mediaRestrict" field of the "JoliCode\MediaBundle\Tests\Application\Entity\Page" entity. It cannot be deleted.');

        // MediaDeleteBehavior::SET_NULL
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');
        $media = $this->findInGalleryFromName($crawler, 'set_null.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin?routeName=joli_media_easy_admin_explore&routeParams%5Bkey%5D=.');
        $crawler = $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-success', 'Media "set_null.pdf" deleted successfully');

        $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_show&routeParams%5Bkey%5D=set_null.pdf');
        $this->assertResponseStatusCodeSame(404);

        /** @var Page $page */
        $page = $this->pageRepository->findOneBy(['title' => 'Page 1']);
        $this->assertNull($page->getMediaSetNull());

        // no MediaDeleteBahavior defined
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');
        $media = $this->findInGalleryFromName($crawler, 'default.pdf');
        $crawler = $this->client->click($media->link());
        $this->assertResponseIsSuccessful();

        $this->client->submit($crawler->filter('form[name="delete"]')->form());
        $this->assertResponseRedirects('/admin?routeName=joli_media_easy_admin_explore&routeParams%5Bkey%5D=.');
        $this->client->followRedirect();
        $this->assertSelectorTextContains('.alert-success', 'Media "default.pdf" deleted successfully');

        $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_show&routeParams%5Bkey%5D=default.pdf');
        $this->assertResponseStatusCodeSame(404);

        /** @var Page $page */
        $page = $this->pageRepository->findOneBy(['title' => 'Page 1']);
        $this->assertSame('default.pdf', $page->getMediaDefault()->getPath());
    }

    public function testUploadAtRoot(): void
    {
        // test upload at the root of the media library
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');
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
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');

        $gridViewLink = $crawler->selectLink('Grid view');
        $this->assertStringContainsString('active', (string) $gridViewLink->attr('class')); // grid is default
        $this->assertSelectorCount(5, '.gallery-grid-item');
        $this->assertSelectorNotExists('.gallery-list-item');

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringNotContainsString('active', (string) $listViewLink->attr('class'));

        $crawler = $this->client->click($listViewLink->link());

        $listViewLink = $crawler->selectLink('List view');
        $this->assertStringContainsString('active', (string) $listViewLink->attr('class'));
        $this->assertSelectorNotExists('.gallery-grid-item');
        $this->assertSelectorCount(5, '.gallery-list-item');

        $gridViewLink = $crawler->selectLink('Grid view');
        $this->assertStringNotContainsString('active', (string) $gridViewLink->attr('class'));

        $crawler = $this->client->click($gridViewLink->link()); // back to grid

        $this->assertStringContainsString('active', (string) $crawler->selectLink('Grid view')->attr('class'));
        $this->assertSelectorCount(5, '.gallery-grid-item');
        $this->assertSelectorNotExists('.gallery-list-item');

        // test the view mode inside a subfolder
        $crawler = $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore&routeParams%5Bkey%5D=/sub/folder');
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

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function findInGalleryFromName(Crawler $crawler, string $name): Crawler
    {
        return $crawler->filter('ul.gallery-grid--files .gallery-grid-item__link')
            ->reduce(fn (Crawler $node): bool => str_contains($node->filter('.gallery-grid-item__name')->text(), $name))
        ;
    }
}
