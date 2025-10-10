<?php

namespace JoliCode\MediaBundle\Transformer;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Gmagick\Image as GmagickImage;
use Imagine\Gmagick\Imagine as GmagickImagine;
use Imagine\Image\Box;
use Imagine\Image\Palette\Grayscale;
use Imagine\Image\Palette\RGB;
use Imagine\Image\Point;
use Imagine\Imagick\Image as ImagickImage;
use Imagine\Imagick\Imagine as ImagickImagine;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Processor\Imagine as ImagineProcessor;
use JoliCode\MediaBundle\Transformation\Transformation;
use Psr\Log\LoggerInterface;

readonly class Expand extends AbstractTransformer implements TransformerInterface, NeedsImmediateProcessingTransformerInterface
{
    /**
     * @param int|string      $width
     * @param int|string      $height
     * @param int|string|null $positionX
     * @param int|string|null $positionY
     */
    public function __construct(
        private ImagineProcessor $imagineProcessor,
        private mixed $width,
        private mixed $height,
        private mixed $positionX = null,
        private mixed $positionY = null,
        private ?string $backgroundColor = null,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function transform(Transformation $transformation): void
    {
        $imagine = $this->imagineProcessor->getImagine();
        $processorOptions = $transformation->getProcessorOptions('imagine');
        $imagineOptions = $this->imagineProcessor->parseOptions($processorOptions);

        $binary = $transformation->getBinary();
        $binaryWidth = $binary->getPixelWidth();
        $binaryHeight = $binary->getPixelHeight();

        $this->logger?->info('Processing binary with the "Expand" transform.', [
            'binaryWidth' => $binaryWidth,
            'binaryHeight' => $binaryHeight,
        ]);

        if (null === $binaryWidth || null === $binaryHeight) {
            $this->logger?->warning('Binary width or height is null, cannot process Expand transform.');

            return;
        }

        $this->logger?->info('Processing binary with the "Expand" transform.', [
            'binaryWidth' => $binaryWidth,
            'binaryHeight' => $binaryHeight,
        ]);
        $width = $this->width;
        $height = $this->height;
        $positionX = $this->positionX;
        $positionY = $this->positionY;

        $width = \is_string($width) ? $this->convertPercentageValue($width, $binaryWidth) : $transformation->multiply($width);

        if (\is_string($height)) {
            $height = $this->convertPercentageValue($height, $binaryHeight);
        } else {
            $height = $transformation->multiply($height);
        }

        if ($width < $binaryWidth || $height < $binaryHeight) {
            // one of the target dimensions is smaller than the binary dimensions, so we do not apply the expand
            $this->logger?->info('Shipping the expand transform because the target dimensions are smaller than the binary dimensions.', [
                'original width' => $binaryWidth,
                'original height' => $binaryHeight,
                'target width' => $width,
                'target height' => $height,
            ]);

            return;
        }

        if (\is_int($positionX)) {
            $positionX = $transformation->multiply($positionX);
        }

        if (\is_int($positionY)) {
            $positionY = $transformation->multiply($positionY);
        }

        $positionX = $this->convertPositionValue($positionX, $width - $binaryWidth);
        $positionY = $this->convertPositionValue($positionY, $height - $binaryHeight);
        $image = $imagine->load($binary->getContent());

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

        $canvas = $imagine->create($newSize, $newColor);
        $layers = $image->layers();
        $layers->coalesce();

        if (
            \in_array(Format::fromName($binary->getFormat()), [Format::GIF, Format::WEBP], true)
            && $layers->count() > 1
            && !$imagine instanceof GdImagine
        ) {
            $imagineOptions['animated'] = true;
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

        $transformation->setBinary(new Binary(
            mimeType: $binary->getMimeType(),
            format: $binary->getFormat(),
            content: $canvas->get($binary->getFormat(), $imagineOptions),
            width: $width,
            height: $height,
        ));
    }
}
