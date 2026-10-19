<?php

namespace JoliCode\MediaBundle\Message;

/**
 * Asks for all the variations of a media to be generated and stored, when the
 * cache.store_on_create setting dispatches them to a Messenger bus.
 */
final readonly class StoreVariations
{
    public function __construct(
        public string $libraryName,
        public string $path,
    ) {
    }
}
