<?php

namespace JoliCode\MediaBundle\Transformer;

use Imagine\Image\Box;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Point;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;

readonly class Expand extends AbstractTransformer implements TransformerInterface
{
    /**
     * @param int|string      $width
     * @param int|string      $height
     * @param int|string|null $positionX
     * @param int|string|null $positionY
     */
    public function __construct(
        private ImagineInterface $imagine,
        private mixed $width,
        private mixed $height,
        private mixed $positionX = null,
        private mixed $positionY = null,
        private ?string $backgroundColor = null,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function needsBinaryProcessing(): bool
    {
        return true;
    }

    public function processBinary(Binary $binary, ?int $binaryWidth, ?int $binaryHeight): Binary
    {
        if (null === $binaryWidth || null === $binaryHeight) {
            $binaryWidth = $binary->getPixelWidth();
            $binaryHeight = $binary->getPixelHeight();
        }

        if (null === $binaryWidth || null === $binaryHeight) {
            $this->logger?->warning('Binary width or height is null, cannot process Expand transform.');

            return $binary;
        }

        $this->logger?->info('Processing binary with the "Expand" transform.', [
            'binaryWidth' => $binaryWidth,
            'binaryHeight' => $binaryHeight,
        ]);
        $width = $this->width;
        $height = $this->height;
        $positionX = $this->positionX;
        $positionY = $this->positionY;

        if (\is_string($width)) {
            $width = $this->convertPercentageValue($width, $binaryWidth);
        }

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $binaryHeight);
        }

        $positionX = $this->convertPositionValue($positionX, $width - $binaryWidth);
        $positionY = $this->convertPositionValue($positionY, $height - $binaryHeight);

        $image = $this->imagine->load($binary->getContent());
        $canvas = $this->imagine->create(
            new Box($width, $height),
            null !== $this->backgroundColor ? $image->palette()->color($this->backgroundColor) : null,
        );
        $canvas->paste($image, new Point($positionX, $positionY));

        $this->logger?->info('Binary processed with the "Expand" transform.');

        return new Binary(
            mimeType: $binary->getMimeType(),
            format: $binary->getFormat(),
            content: $canvas->get($binary->getFormat()),
            width: $width,
            height: $height,
        );
    }

    public function transform(Transformation $transformation): void
    {
    }
}
