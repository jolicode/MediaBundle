<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use Psr\Log\LoggerInterface;

readonly class ExifRemovalPreProcessor extends AbstractPreProcessor implements PreProcessorInterface
{
    public function __construct(
        private ?string $exiftoolBinary = '/usr/local/bin/exiftool',
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function process(Binary $binary, MediaVariation $mediaVariation): Binary
    {
        if (!$this->supports($binary)) {
            return $binary;
        }

        $temporaryFile = $this->writeTemporaryFile($binary);

        $process = $this->createProcess([
            $this->exiftoolBinary,
            '-ifd1:all=',
            '-m',
            '-overwrite_original',
            $temporaryFile,
        ]);
        $this->logger?->info('Removing EXIF metadata', [
            'original size' => filesize($temporaryFile),
            'command' => $process->getCommandLine(),
        ]);

        try {
            $process->mustRun();
            $this->logger?->info('Removed EXIF metadata', [
                'processed size' => filesize($temporaryFile),
            ]);

            return new Binary(
                $binary->getMimeType(),
                $binary->getFormat(),
                file_get_contents($temporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $temporaryFile)),
            );
        } catch (\Exception $exception) {
            $this->logger?->error('EXIF removal failed', ['exception' => $exception]);

            throw $exception;
        } finally {
            unlink($temporaryFile);
        }
    }

    public function supports(Binary $binary): bool
    {
        return \in_array($binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true);
    }
}
