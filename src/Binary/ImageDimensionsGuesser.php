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
            return self::guessSvg($content);
        }

        [$width, $height] = $imageSize;

        // a JPEG or TIFF rotated by its EXIF orientation is displayed with its dimensions swapped
        if (\in_array($imageSize[2], [\IMAGETYPE_JPEG, \IMAGETYPE_TIFF_II, \IMAGETYPE_TIFF_MM], true)
            && ExifOrientation::swapsDimensions(ExifOrientation::read($content))
        ) {
            [$width, $height] = [$height, $width];
        }

        return [
            'height' => $height,
            'width' => $width,
        ];
    }

    /**
     * getimagesize() cannot read SVG: use the intrinsic size of its root element,
     * from its unitless or "px" width and height, or else from its viewBox.
     *
     * @return false|array{height: int, width: int}
     */
    private static function guessSvg(string $content): array|false
    {
        if (!str_contains($content, '<svg')) {
            return false;
        }

        $reader = new \XMLReader();
        // silence the warnings emitted on malformed contents
        set_error_handler(static fn (): bool => true);

        try {
            // no network access, and the entities are not substituted
            if (!$reader->XML($content, null, \LIBXML_NONET)) {
                return false;
            }

            do {
                if (!$reader->read()) {
                    return false;
                }
            } while (\XMLReader::ELEMENT !== $reader->nodeType);

            if ('svg' !== $reader->localName) {
                return false;
            }

            $width = self::toPixels($reader->getAttribute('width'));
            $height = self::toPixels($reader->getAttribute('height'));
            $viewBox = array_map(floatval(...), preg_split('/[\s,]+/', trim($reader->getAttribute('viewBox') ?? '')) ?: []);
        } finally {
            $reader->close();
            restore_error_handler();
        }

        if (4 === \count($viewBox) && $viewBox[2] > 0 && $viewBox[3] > 0) {
            $width ??= null !== $height ? $height * $viewBox[2] / $viewBox[3] : $viewBox[2];
            $height ??= $width * $viewBox[3] / $viewBox[2];
        }

        if (null === $width || null === $height || (int) round($width) < 1 || (int) round($height) < 1) {
            return false;
        }

        return [
            'height' => (int) round($height),
            'width' => (int) round($width),
        ];
    }

    private static function toPixels(?string $length): ?float
    {
        if (null === $length || 1 !== preg_match('/^\s*(\d+(?:\.\d+)?|\.\d+)\s*(?:px)?\s*$/', $length, $matches)) {
            return null;
        }

        return (float) $matches[1];
    }
}
