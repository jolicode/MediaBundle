<?php

namespace JoliCode\MediaBundle\Model;

enum Format: string
{
    case GIF = 'gif';
    case HEIF = 'heif';
    case JPEG = 'jpeg';
    case PNG = 'png';
    case WEBP = 'webp';

    public static function fromName(string $name): ?self
    {
        $name = strtolower($name);

        if ('heic' === $name) {
            $name = 'heif';
        }

        if ('jpg' === $name) {
            $name = 'jpeg';
        }

        return self::tryFrom($name);
    }

    /**
     * @return string[]
     */
    public function getPossibleExtensions(): array
    {
        return match ($this) {
            self::GIF => ['gif'],
            self::HEIF => ['heic', 'heif'],
            self::JPEG => ['jpg', 'jpeg'],
            self::PNG => ['png'],
            self::WEBP => ['webp'],
        };
    }

    public function getMimeType(): string
    {
        return match ($this) {
            self::GIF => 'image/gif',
            self::HEIF => 'image/heif',
            self::JPEG => 'image/jpeg',
            self::PNG => 'image/png',
            self::WEBP => 'image/webp',
        };
    }
}
