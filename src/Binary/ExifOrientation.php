<?php

namespace JoliCode\MediaBundle\Binary;

use Imagine\Image\Metadata\ExifMetadataReader;

/**
 * Reads the EXIF orientation of an image, without decoding its pixels.
 */
final class ExifOrientation
{
    public const UNDEFINED = 0;

    public const TOP_LEFT = 1;

    /**
     * 1 to 8, or UNDEFINED when the tag or the exif extension is missing.
     */
    public static function read(string $content): int
    {
        if (!self::isSupported()) {
            return self::UNDEFINED;
        }

        try {
            $metadata = (new ExifMetadataReader())->readData($content);
        } catch (\Throwable) {
            return self::UNDEFINED;
        }

        return (int) ($metadata['ifd0.Orientation'] ?? self::UNDEFINED);
    }

    public static function isSupported(): bool
    {
        return '' === ExifMetadataReader::getUnsupportedReason();
    }

    /**
     * Orientations 5 to 8 rotate the image by 90° or 270°.
     */
    public static function swapsDimensions(int $orientation): bool
    {
        return $orientation >= 5 && $orientation <= 8;
    }
}
