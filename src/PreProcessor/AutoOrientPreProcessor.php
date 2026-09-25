<?php

namespace JoliCode\MediaBundle\PreProcessor;

use Imagine\Filter\Basic\Autorotate;
use Imagine\Gmagick\Image as GmagickImage;
use Imagine\Image\ImageInterface;
use Imagine\Image\ImagineInterface;
use Imagine\Imagick\Image as ImagickImage;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Binary\ExifOrientation;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use Psr\Log\LoggerInterface;

/**
 * Rotates the pixels according to the EXIF orientation tag, then resets the tag.
 * The Imagine instance needs an EXIF metadata reader, as the bundle configures it.
 */
readonly class AutoOrientPreProcessor extends AbstractPreProcessor implements PreProcessorInterface
{
    public function __construct(
        private ImagineInterface $imagine,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function preservesPixelDimensions(): bool
    {
        // the dimensions reported for the source already account for the orientation tag
        return true;
    }

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary
    {
        if (!$this->supports($binary)) {
            return $binary;
        }

        $orientation = ExifOrientation::read($binary->getContent());

        if (\in_array($orientation, [ExifOrientation::UNDEFINED, ExifOrientation::TOP_LEFT], true)) {
            return $binary;
        }

        $image = (new Autorotate())->apply($this->imagine->load($binary->getContent()));
        $this->resetOrientation($image);
        $this->logger?->info('Applied the EXIF orientation of the image', [
            'orientation' => $orientation,
        ]);

        return $binary->withContent($image->get($binary->getFormat(), self::INTERMEDIATE_OUTPUT_OPTIONS));
    }

    public function supports(Binary $binary): bool
    {
        return \in_array($binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true);
    }

    /**
     * Imagine cannot write metadata, and these drivers keep the EXIF profile of the source.
     */
    private function resetOrientation(ImageInterface $image): void
    {
        if ($image instanceof ImagickImage) {
            $image->getImagick()->setImageOrientation(\Imagick::ORIENTATION_TOPLEFT);
        } elseif ($image instanceof GmagickImage) {
            try {
                $image->getGmagick()->removeimageprofile('exif');
            } catch (\GmagickException) {
                // no EXIF profile to remove
            }
        }
    }
}
