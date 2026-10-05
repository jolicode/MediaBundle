<?php

namespace JoliCode\MediaBundle\Tests\Event\Listener;

use JoliCode\MediaBundle\Event\Listener\StoreVariationsEventListener;
use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Message\StoreVariations;
use JoliCode\MediaBundle\Message\StoreVariationsHandler;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\MessageBusInterface;

class StoreVariationsEventListenerTest extends BaseTestCase
{
    public function testVariationsAreNotStoredOnCreateByDefault(): void
    {
        $this->listen();

        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        self::assertFalse($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testVariationsAreStoredOnCreate(): void
    {
        $this->enableStoreOnCreate();
        $this->listen();

        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        self::assertTrue($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testVariationsAreStoredAtTheNewPathOnMove(): void
    {
        $this->enableStoreOnCreate();
        $this->listen();
        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $this->originalStorage->move('test.png', 'folder/moved.png');

        self::assertTrue($this->cacheStorage->has('folder/moved.png', $this->variation));
        self::assertFalse($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testAMediaThatCannotBeProcessedIsCreatedWithoutVariations(): void
    {
        $this->enableStoreOnCreate();
        $this->listen();

        $this->originalStorage->createMedia('document.txt', 'not an image');

        self::assertTrue($this->originalStorage->has('document.txt'));
        self::assertFalse($this->cacheStorage->has('document.txt', $this->variation));
    }

    public function testTheGenerationIsDispatchedToTheMessageBus(): void
    {
        $bus = new class implements MessageBusInterface {
            /** @var list<StoreVariations> */
            public array $messages = [];

            public function dispatch(object $message, array $stamps = []): Envelope
            {
                \assert($message instanceof StoreVariations);
                $this->messages[] = $message;

                return new Envelope($message, $stamps);
            }
        };
        $this->enableStoreOnCreate();
        $this->listen($bus);

        $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->originalStorage->move('test.png', 'folder/moved.png');

        self::assertEquals([
            new StoreVariations('default', 'test.png'),
            new StoreVariations('default', 'folder/moved.png'),
        ], $bus->messages);
        self::assertFalse($this->cacheStorage->has('folder/moved.png', $this->variation), 'The handler generates them, not the listener.');

        (new StoreVariationsHandler($this->converter))($bus->messages[1]);

        self::assertTrue($this->cacheStorage->has('folder/moved.png', $this->variation));
    }

    public function testTheHandlerIgnoresAMediaThatIsGoneByTheTimeItIsHandled(): void
    {
        (new StoreVariationsHandler($this->converter))(new StoreVariations('default', 'deleted.png'));

        self::assertFalse($this->cacheStorage->has('deleted.png', $this->variation));
    }

    private function enableStoreOnCreate(): void
    {
        $this->cacheStorage = $this->createCacheStorage('default', $this->cacheFilesystem, '/cache', $this->urlGenerator, storeOnCreate: true);
        $this->library = new Library(
            'default',
            $this->originalStorage,
            $this->cacheStorage,
            $this->createVariationContainer($this->cacheStorage, ['thumbnail' => fn (): Variation => $this->variation]),
        );
    }

    private function listen(?MessageBusInterface $messageBus = null): void
    {
        $listener = new StoreVariationsEventListener($this->converter, $messageBus);
        $this->eventDispatcher->addListener(MediaEvents::POST_CREATE_MEDIA, $listener->onMediaPostCreate(...));
        $this->eventDispatcher->addListener(MediaEvents::POST_MOVE_MEDIA, $listener->onMediaPostMove(...));
    }
}
