<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Inspector\TransformationDataHolder;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\MediaVariation;
use Psr\Log\LoggerInterface;

readonly class ExifRemovalPreProcessor extends AbstractPreProcessor implements PreProcessorInterface
{
    public function __construct(
        private ?string $exiftoolBinary = '/usr/local/bin/exiftool',
        private ?TransformationDataHolder $transformationDataHolder = null,
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
        $originalSize = filesize($temporaryFile);
        $commandLine = $process->getCommandLine();
        $this->logger?->info('Removing EXIF metadata', [
            'original size' => $originalSize,
            'command' => $commandLine,
        ]);

        try {
            $process->mustRun();
            $resultingSize = filesize($temporaryFile);
            $this->logger?->info('Removed EXIF metadata', [
                'processed size' => $resultingSize,
            ]);
            $this->transformationDataHolder?->addPreProcessorStep($mediaVariation, \sprintf(
                'Executed the "%s" pre-processor',
                self::class,
            ), [
                'command' => $commandLine,
                'original size' => $originalSize,
                'processed size' => $resultingSize,
            ]);

            return new Binary(
                $binary->getMimeType(),
                $binary->getFormat(),
                file_get_contents($temporaryFile) ?: throw new \RuntimeException(\sprintf('Failed to read content from temporary file "%s"', $temporaryFile)),
            );
        } catch (\Exception $exception) {
            $this->logger?->error('EXIF removal failed', ['exception' => $exception]);

            return $binary;
        } finally {
            unlink($temporaryFile);
        }
    }

    public function supports(Binary $binary): bool
    {
        return \in_array($binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true);
    }
}
