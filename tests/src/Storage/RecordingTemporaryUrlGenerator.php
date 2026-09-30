<?php

namespace JoliCode\MediaBundle\Tests\Storage;

use League\Flysystem\Config;
use League\Flysystem\UrlGeneration\TemporaryUrlGenerator;

class RecordingTemporaryUrlGenerator implements TemporaryUrlGenerator
{
    /**
     * @var list<array{path: string, expiresAt: \DateTimeInterface, config: Config}>
     */
    public array $calls = [];

    public function temporaryUrl(string $path, \DateTimeInterface $expiresAt, Config $config): string
    {
        $this->calls[] = ['path' => $path, 'expiresAt' => $expiresAt, 'config' => $config];

        return 'https://signed.example.com/' . $path . '?expires=' . $expiresAt->getTimestamp();
    }
}
