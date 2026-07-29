<?php

namespace JoliCode\MediaBundle\Binary;

final class ImageDimensionsGuesser
{
    /**
     * @return false|array{height: int, width: int}
     */
    public static function guess(string $content): array|false
    {
        $temporaryFile = tempnam(sys_get_temp_dir(), 'image');

        if (false === $temporaryFile) {
            return false;
        }

        // silence the notices emitted by getimagesize() on unreadable contents
        set_error_handler(static fn (): bool => true);

        try {
            file_put_contents($temporaryFile, $content);
            $imageSize = getimagesize($temporaryFile);
        } finally {
            restore_error_handler();
            unlink($temporaryFile);
        }

        if (!\is_array($imageSize)) {
            return false;
        }

        return [
            'height' => $imageSize[1],
            'width' => $imageSize[0],
        ];
    }
}
