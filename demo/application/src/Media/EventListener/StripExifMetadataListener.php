<?php

namespace App\Media\EventListener;

use JoliCode\MediaBundle\Event\MediaEvents;
use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
use JoliCode\MediaBundle\Model\Format;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Process\Process;

/**
 * Strips the metadata of the uploaded images before they are stored as originals.
 *
 * The bundle ships an ExifRemovalPreProcessor, but pre-processors only run in the
 * variation pipeline: the originals keep their metadata, GPS coordinates included.
 * This listener sanitizes the original itself, before it is written to the storage.
 *
 * Note that it uses "-all=" and not the "-ifd1:all=" of the ExifRemovalPreProcessor,
 * which only clears the thumbnail IFD.
 */
final readonly class StripExifMetadataListener
{
    public function __construct(
        #[Autowire('%joli_media.binary.exiftool%')]
        private string $exiftoolBinary,
        private ?LoggerInterface $logger = null,
    ) {
    }

    #[AsEventListener(event: MediaEvents::PRE_CREATE_MEDIA)]
    public function onPreCreateMedia(PreCreateMediaEvent $event): void
    {
        if (!\in_array($event->binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true)) {
            return;
        }

        $temporaryFile = tempnam(sys_get_temp_dir(), 'media');

        if (false === $temporaryFile) {
            throw new \RuntimeException('Unable to create a temporary file.');
        }

        file_put_contents($temporaryFile, $event->binary->getContent());

        try {
            $process = new Process([
                $this->exiftoolBinary,
                '-all=',
                '-m',
                '-overwrite_original',
                $temporaryFile,
            ]);
            // an exception thrown here aborts the media creation, before anything is
            // written to the storage: better to reject the upload than to store a
            // media which still carries its GPS coordinates
            $process->mustRun();

            $content = file_get_contents($temporaryFile);

            if (false === $content) {
                throw new \RuntimeException(\sprintf('Unable to read the content of the temporary file "%s".', $temporaryFile));
            }

            $this->logger?->info('Stripped the metadata of an uploaded media', [
                'path' => $event->path,
                'original size' => $event->binary->getContentSize(),
                'sanitized size' => \strlen($content),
            ]);

            $event->binary = $event->binary->withContent($content);
        } finally {
            unlink($temporaryFile);
        }
    }
}
