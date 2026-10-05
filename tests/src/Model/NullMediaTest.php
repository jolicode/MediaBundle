<?php

namespace JoliCode\MediaBundle\Tests\Model;

use JoliCode\MediaBundle\Exception\MediaNotResolvedException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Tests\Storage\RecordingTemporaryUrlGenerator;

class NullMediaTest extends BaseTestCase
{
    public function testGetTemporaryUrlThrows(): void
    {
        $temporaryUrlGenerator = new RecordingTemporaryUrlGenerator();
        $storage = $this->createOriginalStorage('default', $this->createFilesystem($temporaryUrlGenerator), '/media', $this->urlGenerator);
        $cacheStorage = $this->createCacheStorage('default', $this->createFilesystem(), '/cache', $this->urlGenerator);
        new Library('default', $storage, $cacheStorage, $this->createVariationContainer($cacheStorage));

        try {
            (new NullMedia('missing.jpg', $storage))->getTemporaryUrl();
            self::fail('A NullMedia must not sign a temporary URL.');
        } catch (MediaNotResolvedException) {
        }

        self::assertSame([], $temporaryUrlGenerator->calls);
    }
}
