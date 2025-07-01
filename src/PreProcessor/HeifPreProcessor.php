<?php

namespace JoliCode\MediaBundle\PreProcessor;

use Imagine\Image\Box;
use Imagine\Image\ImagineInterface;
use Imagine\Image\Point;
use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Variation\Variation;
use Psr\Log\LoggerInterface;

readonly class HeifPreProcessor extends AbstractPreProcessor implements PreProcessorInterface
{
    public function __construct(
        private ImagineInterface $imagine,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getDefaultOutputFormat(): ?Format
    {
        return Format::JPEG;
    }

    public function process(Binary $binary, Variation $variation): Binary
    {
        if (!$this->supports($binary)) {
            return $binary;
        }

        $image = $this->imagine->load($binary->getContent());
        $width = $image->getSize()->getWidth();
        $height = $image->getSize()->getHeight();
        $canvas = $this->imagine->create(
            new Box($width, $height),
        );
        $canvas->paste($image, new Point(0, 0));
        $this->logger?->info('Pre-processed HEIF binary');

        return new Binary(
            'image/jpeg',
            Format::JPEG->value,
            $canvas->__toString(),
        );
    }

    public function supports(Binary $binary): bool
    {
        return Format::HEIF->value === $binary->getFormat();
    }
}
