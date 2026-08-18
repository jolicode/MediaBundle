<?php

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use JoliCode\MediaBundle\Tests\Application\Kernel;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CreateMediaEventListenerTest extends WebTestCase
{
    private const TEST_FOLDER = 'pre-create-media-event';

    private EventDispatcherInterface $eventDispatcher;

    private OriginalStorage $originalStorage;

    protected function setUp(): void
    {
        parent::setUp();
        $container = static::getContainer();

        /** @var LibraryContainer */
        $libraries = $container->get('joli_media.library_container');
        $this->originalStorage = $libraries->get('default')->getOriginalStorage();

        /** @var EventDispatcherInterface */
        $eventDispatcher = $container->get('event_dispatcher');
        $this->eventDispatcher = $eventDispatcher;

        if ($this->originalStorage->hasDirectory(self::TEST_FOLDER)) {
            $this->originalStorage->deleteDirectory(self::TEST_FOLDER);
        }
    }

    protected function tearDown(): void
    {
        if ($this->originalStorage->hasDirectory(self::TEST_FOLDER)) {
            $this->originalStorage->deleteDirectory(self::TEST_FOLDER);
        }

        parent::tearDown();
    }

    public function testAListenerCanReplaceTheBinaryOfACreatedMedia(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                $event->binary = $event->binary->withContent(strtoupper($event->binary->getContent()));
            },
        );

        $path = self::TEST_FOLDER . '/replaced.txt';
        $media = $this->originalStorage->createMedia($path, 'sensitive content');

        $this->assertSame('SENSITIVE CONTENT', $media->getBinary()->getContent());
        $this->assertSame('SENSITIVE CONTENT', $this->originalStorage->get($path)->getContent());
    }

    public function testAListenerCanRejectACreatedMediaByThrowing(): void
    {
        $this->eventDispatcher->addListener(
            MediaEvents::PRE_CREATE_MEDIA,
            static function (PreCreateMediaEvent $event): void {
                throw new \RuntimeException('This media is not acceptable');
            },
        );

        $path = self::TEST_FOLDER . '/rejected.txt';

        try {
            $this->originalStorage->createMediaFromBinary($path, new Binary('text/plain', 'txt', 'sensitive content'));
            $this->fail('The exception thrown by the listener should not have been swallowed.');
        } catch (\RuntimeException $e) {
            $this->assertSame('This media is not acceptable', $e->getMessage());
        }

        $this->assertFalse($this->originalStorage->has($path), 'Nothing should have been written to the storage.');
    }

    protected static function getKernelClass(): string
    {
        return Kernel::class;
    }
}
