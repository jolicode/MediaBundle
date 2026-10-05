<?php

namespace JoliCode\MediaBundle\Message;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;

readonly class StoreVariationsHandler
{
    public function __construct(
        private Converter $converter,
    ) {
    }

    public function __invoke(StoreVariations $message): void
    {
        try {
            $this->converter->convert($message->path, $message->libraryName, force: true);
        } catch (MediaNotFoundException) {
            // the media was deleted or moved before the message was handled -
            // a move dispatches a message of its own for the new path
        }
    }
}
