<?php

namespace JoliCode\MediaBundle\Binary;

use JoliCode\MediaBundle\Model\Format;

class Binary
{
    private ?int $height = null;

    private ?int $width = null;

    public function __construct(
        private readonly string $mimeType,
        private string $format,
        private readonly string $content,
        private readonly ?string $path = null,
        ?int $width = null,
        ?int $height = null,
    ) {
        $format = Format::fromName($this->format);

        if ($format instanceof Format) {
            $this->format = $format->value;
        }

        if (null !== $width) {
            $this->width = $width;
        }

        if (null !== $height) {
            $this->height = $height;
        }
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getContentSize(): int
    {
        $content = $this->getContent();

        return \strlen($content);
    }

    public function getFormat(): string
    {
        return $this->format;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @return false|array{height: int, width: int}
     */
    public function getPixelDimensions(): array|false
    {
        if (null === $this->width || null === $this->height) {
            if (!str_starts_with($this->mimeType, 'image/')) {
                return false;
            }

            $temporaryFile = tempnam(sys_get_temp_dir(), 'image');
            file_put_contents($temporaryFile, $this->getContent());
            $imageSize = getimagesize($temporaryFile);
            unlink($temporaryFile);

            if (!\is_array($imageSize)) {
                return false;
            }

            $this->width = $imageSize[0];
            $this->height = $imageSize[1];
        }

        return [
            'height' => $this->height,
            'width' => $this->width,
        ];
    }

    public function getPixelWidth(): ?int
    {
        $dimensions = $this->getPixelDimensions();

        return $dimensions['width'] ?? null;
    }

    public function getPixelHeight(): ?int
    {
        $dimensions = $this->getPixelDimensions();

        return $dimensions['height'] ?? null;
    }
}
