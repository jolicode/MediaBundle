<?php

namespace JoliCode\MediaBundle\Binary;

use Symfony\Component\Mime\MimeTypeGuesserInterface;
use Symfony\Component\Mime\MimeTypesInterface;

class MimeTypeGuesser
{
    public function __construct(
        private readonly MimeTypesInterface $mimeTypes,
        private readonly MimeTypeGuesserInterface $mimeTypeGuesser,
    ) {
    }

    public function getPossibleExtension(string $mimeType): string
    {
        $possibleExtensions = $this->mimeTypes->getExtensions($mimeType);

        return $possibleExtensions[0] ?? $mimeType;
    }

    public function guessMimeTypeFromContent(string $content): string
    {
        $temporaryFile = tempnam(sys_get_temp_dir(), 'media');
        file_put_contents($temporaryFile, $content);
        $mimeType = $this->mimeTypeGuesser->guessMimeType($temporaryFile);
        unlink($temporaryFile);

        return $mimeType ?? 'application/octet-stream';
    }
}
