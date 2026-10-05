<?php

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use JoliCode\MediaBundle\Event\Listener\StoreVariationsEventListener;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class StoreVariationsEventListenerTest extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $listener = new StoreVariationsEventListener($this->converter);
        $this->eventDispatcher->addListener(MediaEvents::POST_CREATE_MEDIA, $listener->onMediaPostCreate(...));
        $this->eventDispatcher->addListener(MediaEvents::POST_MOVE_MEDIA, $listener->onMediaPostMove(...));
    }

    public function testVariationsAreNotStoredOnCreateByDefault(): void
    {
        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        self::assertFalse($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testVariationsAreStoredOnCreate(): void
    {
        $this->enableStoreOnCreate();

        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        self::assertTrue($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testVariationsAreStoredAtTheNewPathOnMove(): void
    {
        $this->enableStoreOnCreate();
        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $this->originalStorage->move('test.png', 'folder/moved.png');

        self::assertTrue($this->cacheStorage->has('folder/moved.png', $this->variation));
        self::assertFalse($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testAMediaThatCannotBeProcessedIsCreatedWithoutVariations(): void
    {
        $this->enableStoreOnCreate();

        $this->originalStorage->createMedia('document.txt', 'not an image');

        self::assertTrue($this->originalStorage->has('document.txt'));
        self::assertFalse($this->cacheStorage->has('document.txt', $this->variation));
    }

    private function enableStoreOnCreate(): void
    {
        $this->cacheStorage = $this->createCacheStorage('default', $this->cacheFilesystem, '/cache', $this->urlGenerator, storeOnCreate: true);
        $this->library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->createVariationContainer($this->cacheStorage, ['thumbnail' => fn () => $this->variation]),
        );
    }
}
