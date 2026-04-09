<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Bridge\SonataAdmin\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony\Controller\MediaAdminController;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\HttpFoundation\Request;

#[CoversClass(MediaAdminController::class)]
final class MediaAdminControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    private EntityRepository $pageRepository;

    protected function setUp(): void
    {
        $this->client = self::createClient();
        $container = self::getContainer();

        /** @var EntityManagerInterface */
        $entityManager = $container->get(EntityManagerInterface::class);
        $this->pageRepository = $entityManager->getRepository(Page::class);

        if (self::$kernel instanceof Kernel) {
            $application = new Application(self::$kernel);
            $application->setAutoExit(false);
            $application->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --no-interaction --quiet'));
        }
    }

    public function testExplore(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $this->assertSelectorTextContains('title', 'Media library');

        // Breadcrumbs
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item:first-child', 'Dashboard');
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item.active', 'Media library');

        // List of directories
        $this->assertSelectorCount(3, '[data-test-directory-row]');
        $this->assertSelectorExists('[data-directory=a-folder-with-a-very-long-name-level-1]');
        $this->assertSelectorExists('[data-directory=sub]');

        // List of medias
        $this->assertSelectorCount(3, '[data-test-row]');
        $this->assertSelectorTextContains('tr.item:last-child', 'set_null.pdf');
    }

    public function testMediaDetails(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/restrict.pdf');
        $this->assertResponseIsSuccessful();

        file_put_contents('details.html', $this->client->getResponse()->getContent());

        $this->assertSelectorTextContains('title', 'restrict.pdf');

        // Breadcrumbs
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item:first-child', 'Dashboard');
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item.active', 'restrict.pdf');

        // URL
        $this->assertSelectorExists('[data-test-media-url]');
        $this->assertSelectorTextContains('[data-test-media-url]', '/media/original/restrict.pdf');

        // File type
        $this->assertSelectorExists('[data-test-media-file-type]');
        $this->assertSelectorTextContains('[data-test-media-file-type]', 'PDF');
    }

    public function testDeleteMedia(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $deleteButton = $this->client->getCrawler()->filter('tr.item:last-child [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'set_null.pdf has been successfully deleted.');

        // One media has been removed
        $this->assertSelectorCount(2, '[data-test-row]');
    }

    public function testDeleteDirectoryNotInUse(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $deleteButton = $this->client->getCrawler()->filter('[data-directory=not_used] [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'not_used has been successfully deleted.');

        // One directory has been removed
        $this->assertSelectorCount(2, '[data-test-directory-row]');
    }

    public function testDeleteDirectoryInUse(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $deleteButton = $this->client->getCrawler()->filter('[data-directory=sub] [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'The media "sub/folder/circle-pattern.png" is used in the "mediaRestrict" field of the "JoliCode\MediaBundle\Tests\Application\Entity\Page" entity. It cannot be deleted.');

        // Still have 2 directories
        $this->assertSelectorCount(3, '[data-test-directory-row]');
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
