<?php

namespace JoliCode\MediaBundle\Transformer\BinaryOperation;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Gmagick\Image as GmagickImage;
use Imagine\Gmagick\Imagine as GmagickImagine;
use Imagine\Image\Box;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Palette\Grayscale;
use Imagine\Image\Palette\RGB;
use Imagine\Image\Point;
use Imagine\Imagick\Image as ImagickImage;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformer\ValueConverterTrait;
use Psr\Log\LoggerInterface;

class ExpandBinaryOperation extends AbstractImagineBinaryOperation implements BinaryOperationInterface
{
    use ValueConverterTrait;

    /**
     * @param int|string      $width
     * @param int|string      $height
     * @param int|string|null $positionX
     * @param int|string|null $positionY
     */
    public function __construct(
        private readonly ?LoggerInterface $logger,
        private readonly ?int $binaryWidth,
        private readonly ?int $binaryHeight,
        private readonly mixed $width,
        private readonly mixed $height,
        private readonly mixed $positionX = null,
        private readonly mixed $positionY = null,
        private readonly ?string $backgroundColor = null,
    ) {
    }

    public function execute(Binary $binary): Binary
    {
        if (!$this->imagine instanceof ImagineInterface) {
            throw new \LogicException('Imagine instance is not configured. Please set it using setImagine() method.');
        }

        $imagineOptions = $this->imagineOptions;
        $binaryWidth = $this->binaryWidth;
        $binaryHeight = $this->binaryHeight;

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

        if ($width < $binaryWidth || $height < $binaryHeight) {
            // one of the target dimensions is smaller than the binary dimensions, so we do not apply the expand
            $this->logger?->info('Shipping the expand transform because the target dimensions are smaller than the binary dimensions.', [
                'original width' => $binaryWidth,
                'original height' => $binaryHeight,
                'target width' => $width,
                'target height' => $height,
            ]);

            return $binary;
        }

        $positionX = $this->convertPositionValue($positionX, $width - $binaryWidth);
        $positionY = $this->convertPositionValue($positionY, $height - $binaryHeight);
        $image = $this->imagine->load($binary->getContent());

        $newSize = new Box($width, $height);
        $newPosition = new Point(max(0, $positionX), max(0, $positionY));
        $newColor = null;

        if (null !== $this->backgroundColor) {
            if ($image->palette() instanceof Grayscale) {
                try {
                    $image->palette()->color($this->backgroundColor);
                } catch (\Exception $e) {
                    $this->logger?->info('Invalid background color for Grayscale palette, switching the image to the RGB palette.', [
                        'color' => $this->backgroundColor,
                        'exception' => $e,
                    ]);
                    $image->usePalette(new RGB());
                }
            }

            $newColor = $image->palette()->color($this->backgroundColor);
        }

        $canvas = $this->imagine->create($newSize, $newColor);
        $layers = $image->layers();
        $layers->coalesce();

        if (
            \in_array(Format::fromName($binary->getFormat()), [Format::GIF, Format::WEBP], true)
            && $layers->count() > 1
            && !$this->imagine instanceof GdImagine
        ) {
            $imagineOptions['animated'] = true;
            foreach ($layers as $i => $layer) {
                $newLayer = $this->imagine->create($newSize, $newColor);

                if ($positionX < 0) {
                    $layer = $layer->crop(
                        new Point(-$positionX, 0),
                        new Box($binaryWidth + 2 * $positionX, $binaryHeight),
                    );
                }

                if ($positionY < 0) {
                    $layer = $layer->crop(
                        new Point(0, -$positionY),
                        new Box($binaryWidth, $binaryHeight + 2 * $positionY),
                    );
                }

                $newLayer->paste($layer, $newPosition);

                if ($this->imagine instanceof ImagickImagine && $layer instanceof ImagickImage && $newLayer instanceof ImagickImage) {
                    $newLayer->getImagick()->setImageDelay($layer->getImagick()->getImageDelay());
                    $newLayer->getImagick()->setImageFormat($layer->getImagick()->getImageFormat());
                } elseif ($this->imagine instanceof GmagickImagine && $layer instanceof GmagickImage && $newLayer instanceof GmagickImage) {
                    $newLayer->getGmagick()->setimagedelay($layer->getGmagick()->getimagedelay());
                    $newLayer->getGmagick()->setimageformat($layer->getGmagick()->getimageformat());
                } else {
                    throw new \RuntimeException('Unsupported Imagine driver.');
                }

                if (0 === $i) {
                    $canvas = $newLayer;
                } else {
                    $canvas->layers()->add($newLayer);
                }
            }
        } else {
            if ($positionX < 0) {
                $image = $image->crop(
                    new Point(-$positionX, 0),
                    new Box($binaryWidth + 2 * $positionX, $binaryHeight),
                );
            }

            if ($positionY < 0) {
                $image = $image->crop(
                    new Point(0, -$positionY),
                    new Box($binaryWidth, $binaryHeight + 2 * $positionY),
                );
            }

            $canvas->paste($image, $newPosition);
        }

        $this->logger?->info('Binary processed with the "Expand" transform.');

        return new Binary(
            mimeType: $binary->getMimeType(),
            format: $binary->getFormat(),
            content: $canvas->get($binary->getFormat(), $imagineOptions),
            width: $width,
            height: $height,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function getMetadata(): array
    {
        return [
            'binaryWidth' => $this->binaryWidth,
            'binaryHeight' => $this->binaryHeight,
            'targetWidth' => $this->width,
            'targetHeight' => $this->height,
            'expandPositionX' => $this->positionX,
            'expandPositionY' => $this->positionY,
            'backgroundColor' => $this->backgroundColor,
        ];
    }
}
