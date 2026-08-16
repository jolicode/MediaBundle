<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\Controller;

use JoliCode\MediaBundle\Tests\Application\Kernel;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

class MediaChoiceWidgetTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();
    }

    public function testWidgetIsRenderedWhenNestedInAnotherFormType(): void
    {
        $this->client->request(Request::METHOD_GET, '/admin/article/new');
        $this->assertResponseIsSuccessful();

        $this->assertSelectorExists('[data-component="media-choice"]');
        $this->assertSelectorExists('a[data-component="media-choice-edit"]');
        $this->assertMediaAssetsAreLoadedOnce();
    }

    public function testAssetsAreNotDuplicatedWhenUsingMediaChoiceField(): void
    {
        $this->client->request(Request::METHOD_GET, '/admin/page/new');
        $this->assertResponseIsSuccessful();

        $this->assertSelectorExists('[data-component="media-choice"]');
        $this->assertMediaAssetsAreLoadedOnce();
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }

    private function assertMediaAssetsAreLoadedOnce(): void
    {
        $content = $this->client->getResponse()->getContent();
        $this->assertIsString($content);

        $this->assertSame(1, preg_match_all('#/bundles/jolimediaeasyadmin/joli-media-easy-admin\.[a-z0-9]+\.js#', $content), 'The JavaScript file must be loaded exactly once.');
        $this->assertSame(1, preg_match_all('#/bundles/jolimediaeasyadmin/joli-media-easy-admin\.[a-z0-9]+\.css#', $content), 'The stylesheet must be loaded exactly once.');
    }
}
