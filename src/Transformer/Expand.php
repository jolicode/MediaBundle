<?php

namespace JoliCode\MediaBundle\Transformer;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Gmagick\Image as GmagickImage;
use Imagine\Gmagick\Imagine as GmagickImagine;
use Imagine\Image\Box;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Point;
use Imagine\Imagick\Image as ImagickImage;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
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
        private mixed $width,
        private mixed $height,
        private mixed $positionX = null,
        private mixed $positionY = null,
        private ?string $backgroundColor = null,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getBinaryOperation(Binary $binary, ?int $binaryWidth, ?int $binaryHeight): callable
    {
        return function (ImagineInterface $imagine, array $options) use ($binary, $binaryWidth, $binaryHeight): Binary {
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
            $image = $imagine->load($binary->getContent());

            $newSize = new Box($width, $height);
            $newPosition = new Point(max(0, $positionX), max(0, $positionY));
            $newColor = null !== $this->backgroundColor ? $image->palette()->color($this->backgroundColor) : null;
            $canvas = $imagine->create($newSize, $newColor);
            $layers = $image->layers();
            $layers->coalesce();

            if (
                \in_array(Format::fromName($binary->getFormat()), [Format::GIF, Format::WEBP], true)
                && $layers->count() > 1
                && !$imagine instanceof GdImagine
            ) {
                $options['animated'] = true;

                foreach ($layers as $i => $layer) {
                    $newLayer = $imagine->create($newSize, $newColor);

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

                    if ($imagine instanceof ImagickImagine && $layer instanceof ImagickImage && $newLayer instanceof ImagickImage) {
                        $newLayer->getImagick()->setImageDelay($layer->getImagick()->getImageDelay());
                        $newLayer->getImagick()->setImageFormat($layer->getImagick()->getImageFormat());
                    } elseif ($imagine instanceof GmagickImagine && $layer instanceof GmagickImage && $newLayer instanceof GmagickImage) {
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
                content: $canvas->get($binary->getFormat(), $options),
                width: $width,
                height: $height,
            );
        };
    }

    public function getBinaryProcessorName(): string
    {
        return 'imagine';
    }

    public function needsBinaryProcessing(): bool
    {
        return true;
    }

    public function transform(Transformation $transformation): void
    {
    }
}
