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

    public function testList(): void
    {
        $this->client->request(Request::METHOD_GET, '/admin?routeName=joli_media_easy_admin_explore');
        $this->assertResponseIsSuccessful();

        $this->assertSelectorExists('a[data-component="media-add"]');
        $this->assertSelectorCount(4, '.gallery-grid-item');
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
