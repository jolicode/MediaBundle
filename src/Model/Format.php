<?php

namespace JoliCode\MediaBundle\Model;

enum Format: string
{
    case AVIF = 'avif';
    case GIF = 'gif';
    case HEIF = 'heif';
    case JPEG = 'jpeg';
    case PNG = 'png';
    case SVG = 'svg';
    case TIFF = 'tiff';
    case WEBP = 'webp';

    public static function fromName(string $name): ?self
    {
        $name = strtolower($name);

        return match ($name) {
            'heic' => self::HEIF,
            'jpg' => self::JPEG,
            'tif' => self::TIFF,
            default => self::tryFrom($name),
        };
    }

    /**
     * If a variation does not define a target format and no processor is able to output the current format,
     * this method returns an alternative format that can be used as a fallback.
     *
     * For example, if no processor is able to output HEIF, a variation that does not define a specific target
     * format will return a JPEG content instead. As no processor outputs SVG, a SVG media is rasterized to PNG.
     */
    public function getAlternativeFormat(): ?Format
    {
        return match ($this) {
            self::HEIF => self::JPEG,
            self::SVG => self::PNG,
            self::TIFF => self::JPEG,
            default => null,
        };
    }

    /**
     * @return string[]
     */
    public function getPossibleExtensions(): array
    {
        return match ($this) {
            self::AVIF => ['avif'],
            self::GIF => ['gif'],
            self::HEIF => ['heic', 'heif'],
            self::JPEG => ['jpg', 'jpeg'],
            self::PNG => ['png'],
            self::SVG => ['svg'],
            self::TIFF => ['tiff', 'tif'],
            self::WEBP => ['webp'],
        };
    }

    public function getMimeType(): string
    {
        return match ($this) {
            self::AVIF => 'image/avif',
            self::GIF => 'image/gif',
            self::HEIF => 'image/heif',
            self::JPEG => 'image/jpeg',
            self::PNG => 'image/png',
            self::SVG => 'image/svg+xml',
            self::TIFF => 'image/tiff',
            self::WEBP => 'image/webp',
        };
    }

    public function identical(string $value): bool
    {
        return $this === self::fromName($value);
    }
}
