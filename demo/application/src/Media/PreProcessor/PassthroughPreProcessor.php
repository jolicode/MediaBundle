<?php

namespace App\Media\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PreProcessor\AbstractPreProcessor;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
use Psr\Log\LoggerInterface;

readonly class PassthroughPreProcessor extends AbstractPreProcessor implements PreProcessorInterface
{
    public function __construct(
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary
    {
        if (!$this->supports($binary)) {
            return $binary;
        }

        $this->logger?->info('Traversing the passthrough pre-processor', [
            'mimeType' => $binary->getMimeType(),
            'format' => $binary->getFormat(),
        ]);

        return $binary;
    }

    public function supports(Binary $binary): bool
    {
        return \in_array($binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true);
    }
}
