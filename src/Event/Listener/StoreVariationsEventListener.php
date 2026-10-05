<?php

namespace JoliCode\MediaBundle\Event\Listener;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Event\PostCreateMediaEvent;
use JoliCode\MediaBundle\Event\PostMoveMediaEvent;
use JoliCode\MediaBundle\Message\StoreVariations;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use Symfony\Component\Messenger\MessageBusInterface;

/**
 * Generates and stores all the variations of a media when it is created or
 * moved, in the libraries where the cache.store_on_create setting is enabled:
 * synchronously, or through a Messenger bus when the store_on_create_message_bus
 * setting names one.
 */
readonly class StoreVariationsEventListener
{
    public function __construct(
        private Converter $converter,
        private ?MessageBusInterface $messageBus = null,
    ) {
    }

    public function onMediaPostCreate(PostCreateMediaEvent $event): void
    {
        $this->store($event->originalStorage, $event->media);
    }

    public function onMediaPostMove(PostMoveMediaEvent $event): void
    {
        $this->store($event->originalStorage, $event->to);
    }

    private function store(OriginalStorage $originalStorage, Media|string $media): void
    {
        $library = $originalStorage->getLibrary();

        if (!$library->getCacheStorage()->mustStoreOnCreate()) {
            return;
        }

        if (null !== $this->messageBus) {
            $this->messageBus->dispatch(new StoreVariations($library->getName(), $media instanceof Media ? $media->getPath() : $media));

            return;
        }

        // forced: no variation is stored at this path yet - those of a
        // created media are deleted beforehand, those of a moved media stay
        // at its previous path - so checking would only cost a request to the
        // storage backend per variation
        $this->converter->convert($media, $library->getName(), force: true);
    }
}
