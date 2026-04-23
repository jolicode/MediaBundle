<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Bridge\SyliusAdmin\Controller;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Controller\MediaAdminController;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\DomCrawler\Form;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;

#[CoversClass(MediaAdminController::class)]
final class MediaAdminControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = self::createClient();
        $container = self::getContainer();

        if (self::$kernel instanceof Kernel) {
            $application = new Application(self::$kernel);
            $application->setAutoExit(false);
            $application->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --no-interaction --quiet'));
        }
    }

    public function testExplore(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $this->assertSelectorTextContains('title', 'Media library');

        // Breadcrumbs
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item:first-child', 'Dashboard');
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item.active', 'Media library');

        // List of directories
        $this->assertSame(3, $this->getDirectoryCount($crawler));
        $this->assertSelectorExists('[data-directory=a-folder-with-a-very-long-name-level-1]');
        $this->assertSelectorExists('[data-directory=sub]');

        // List of medias
        $this->assertSame(3, $this->getMediaCount($crawler));
        $this->assertSelectorTextContains('tr.item:last-child', 'set_null.pdf');
    }

    public function testMediaDetails(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/restrict.pdf');
        $this->assertResponseIsSuccessful();

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
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $previousMediaCount = $this->getMediaCount($crawler);

        $deleteButton = $this->client->getCrawler()->filter('tr.item:last-child [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $crawler = $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'set_null.pdf has been successfully deleted.');

        // One media has been removed
        $this->assertSame($previousMediaCount - 1, $this->getMediaCount($crawler));
    }

    public function testChooseMedia(): void
    {
        $this->client->request(Request::METHOD_GET, '/sylius-admin/pages/new');
        $this->assertResponseIsSuccessful();

        // buttons for the media choice
        $this->assertSelectorExists('a.joli-media-choice-edit');
        $this->assertSelectorTextContains('a.joli-media-choice-edit', 'Choose a file');
        $this->assertSelectorExists('button.joli-media-choice-delete');
        $this->assertSelectorTextContains('button.joli-media-choice-delete', 'Remove');
    }

    public function testDeleteDirectoryNotInUse(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $previousDirectoryCount = $this->getDirectoryCount($crawler);

        $deleteButton = $this->client->getCrawler()->filter('[data-directory=not_used] [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $crawler = $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'not_used has been successfully deleted.');

        // One directory has been removed
        $this->assertSame($previousDirectoryCount - 1, $this->getDirectoryCount($crawler));
    }

    public function testDeleteDirectoryInUse(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $previousDirectoryCount = $this->getDirectoryCount($crawler);

        $deleteButton = $this->client->getCrawler()->filter('[data-directory=sub] [data-test-confirm-button]');

        $this->client->submit($deleteButton->form());

        $this->assertResponseRedirects();

        $crawler = $this->client->request('GET', '/sylius-admin/media/explore');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'The media "sub/folder/circle-pattern.png" is used in the "mediaRestrict" field of the "JoliCode\MediaBundle\Tests\Application\Entity\Page" entity. It cannot be deleted.');

        // No directory should have been created
        $this->assertSame($previousDirectoryCount, $this->getDirectoryCount($crawler));
    }

    public function testRenameMedia(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/default.pdf');
        $this->assertResponseIsSuccessful();

        $form = $this->getRenameMediaForm($crawler);

        $phpValues = $form->getPhpValues();
        $phpValues['newPath'] = 'new_name.pdf';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);

        $this->assertResponseRedirects('/sylius-admin/media/show/new_name.pdf');

        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/new_name.pdf');
        $this->assertResponseIsSuccessful();

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'The file default.pdf was successfully renamed to new_name.pdf.');
    }

    public function testRenameDirectory(): void
    {
        // Use existing directory from fixtures
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $form = $this->getDirectoryRenameForm($crawler, 'a-folder-with-a-very-long-name-level-1');

        $phpValues = $form->getPhpValues();
        $phpValues['newPath'] = 'renamed_directory';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);

        $this->assertResponseRedirects();

        // Navigate to the renamed directory to verify
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore/renamed_directory');
        $this->assertResponseIsSuccessful();

        // Verify we're in the renamed directory
        $this->assertSelectorTextContains('ol.breadcrumb li.breadcrumb-item.active', 'renamed_directory');

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'The directory "a-folder-with-a-very-long-name-level-1" was successfully renamed to "renamed_directory"');
    }

    public function testRenameDirectoryFailsWhenTargetExists(): void
    {
        // 'sub' directory already exists in fixtures
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        // Create a directory to rename
        $form = $this->getCreateDirectoryForm($crawler);
        $phpValues = $form->getPhpValues();
        $phpValues['name'] = 'dir_to_rename';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);
        $this->assertResponseRedirects();

        // Try to rename to 'sub' which already exists (should fail)
        $crawler = $this->client->followRedirect();
        $form = $this->getDirectoryRenameForm($crawler, 'dir_to_rename');

        $phpValues = $form->getPhpValues();
        $phpValues['newPath'] = 'sub';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);
        $this->assertResponseRedirects();

        // Verify we're still on the explore page and error flash is shown
        $crawler = $this->client->followRedirect();
        $this->assertResponseIsSuccessful();

        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'Error');
    }

    public function testUploadMediaOnRootDirectory(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $form = $this->getUploadForm($crawler);

        $tmpFile = $this->createTemporaryFile();
        $this->copyFixtureFileContentInTemporaryFile($tmpFile, 'circle-pattern.png');

        $phpValues = $form->getPhpValues();

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
        $this->assertSame('/media/cache/joli-media-sylius-admin/circle-pattern.png', $response['files'][0]['thumbnailUrl']);
    }

    public function testUploadMediaOnSubDirectory(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore/sub');
        $this->assertResponseIsSuccessful();

        $form = $this->getUploadForm($crawler);

        $tmpFile = $this->createTemporaryFile();
        $this->copyFixtureFileContentInTemporaryFile($tmpFile, 'circle-pattern.png');

        $phpValues = $form->getPhpValues();

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
        $this->assertSame('/media/original/sub/circle-pattern.png', $response['files'][0]['url']);
        $this->assertSame(62563, $response['files'][0]['size']);
        $this->assertSame('image/png', $response['files'][0]['type']);
        $this->assertSame('/media/cache/joli-media-sylius-admin/sub/circle-pattern.png', $response['files'][0]['thumbnailUrl']);
    }

    public function testMoveMediaFromRootToSubdirectory(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/default.pdf');
        $this->assertResponseIsSuccessful();

        $form = $this->getMoveMediaForm($crawler);

        $phpValues = $form->getPhpValues();
        $phpValues['to'] = 'sub';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);

        $this->assertResponseRedirects();

        // Media should have been moved in subdirectory
        $this->client->request(Request::METHOD_GET, '/sylius-admin/media/show/sub/default.pdf');
        $this->assertResponseIsSuccessful();

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'The file default.pdf was successfully moved to sub/default.pdf.');
    }

    public function testCreateNewDirectoryInRoot(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $previousDirectoryCount = $this->getDirectoryCount($crawler);

        $this->assertResponseIsSuccessful();

        $form = $this->getCreateDirectoryForm($crawler);

        $phpValues = $form->getPhpValues();
        $phpValues['name'] = 'New directory';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);

        $this->assertResponseRedirects();

        $crawler = $this->client->followRedirect();

        // A new directory should appear
        $this->assertSame($previousDirectoryCount + 1, $this->getDirectoryCount($crawler));

        // Test flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'Directory "New directory" created successfully');
    }

    public function testCreateDirectoryFailsWhenEmptyName(): void
    {
        $crawler = $this->client->request(Request::METHOD_GET, '/sylius-admin/media/explore');
        $this->assertResponseIsSuccessful();

        $form = $this->getCreateDirectoryForm($crawler);

        $phpValues = $form->getPhpValues();
        $phpValues['name'] = '';

        $this->client->request($form->getMethod(), $form->getUri(), $phpValues);

        $this->assertResponseRedirects();

        $crawler = $this->client->followRedirect();

        // Verify error flash message
        $this->assertSelectorExists('[data-test-sylius-flash-message]');
        $this->assertSelectorTextContains('[data-test-sylius-flash-message]', 'Directory name is required');
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function getUploadForm(Crawler $crawler): Form
    {
        $this->assertSelectorExists('form[name="upload"]');

        return $crawler->filter('form[name="upload"]')->form();
    }

    private function getMoveMediaForm(Crawler $crawler): Form
    {
        $this->assertSelectorExists('form[id="move-form"]');

        return $crawler->filter('form[id="move-form"]')->form();
    }

    private function getRenameMediaForm(Crawler $crawler): Form
    {
        $this->assertSelectorExists('form[name="media-rename-form"]');

        return $crawler->filter('form[name="media-rename-form"]')->form();
    }

    private function getDirectoryRenameForm(Crawler $crawler, string $directoryName): Form
    {
        // Find the row with the directory
        $directoryRow = $crawler->filter(\sprintf('[data-directory="%s"]', $directoryName));
        $this->assertCount(1, $directoryRow, \sprintf('Directory row not found for "%s"', $directoryName));

        // Get the form from that row
        $form = $directoryRow->filter('.directory-rename-form');
        $this->assertCount(1, $form, \sprintf('Directory rename form not found for "%s"', $directoryName));

        return $form->form();
    }

    private function getCreateDirectoryForm(Crawler $crawler): Form
    {
        $this->assertSelectorExists('form[data-component="directory-create-form"]');

        return $crawler->filter('form[data-component="directory-create-form"]')->form();
    }

    private function createTemporaryFile(): string
    {
        return tempnam(sys_get_temp_dir(), 'upload-test');
    }

    private function copyFixtureFileContentInTemporaryFile(string $tmpFile, string $filename): void
    {
        copy(\dirname(__DIR__, 4) . '/fixtures/' . $filename, $tmpFile);
    }

    private function getDirectoryCount(Crawler $crawler): int
    {
        return $crawler->filter('[data-test-directory-row]')->count();
    }

    private function getMediaCount(Crawler $crawler): int
    {
        return $crawler->filter('[data-test-row]')->count();
    }
}
