Events Triggered by the MediaBundle
===================================

The ``JoliCode\MediaBundle`` provides several events that allow you to hook into various stages of media and folder operations. These events are dispatched by the bundle and can be used to customize or extend its behavior.

Available Events
----------------

Media Events are triggered when media objects are created or deleted:

- ``PreCreateMediaEvent``: Triggered before a media object is created. Example usage: Reject an upload, or replace its content before it is written to the storage - see `Sanitizing a Media Before It Is Stored`_.
- ``PostCreateMediaEvent``: Triggered after a media object is created. Example usage: Perform additional actions, such as logging or notifying other services.
- ``PreDeleteMediaEvent``: Triggered before a media object is deleted. Example usage: Check if the media is in use or prevent deletion under certain conditions.
- ``PostDeleteMediaEvent``: Triggered after a media object is deleted. Example usage: Clean up related resources or notify other parts of the application.
- ``PreMoveMediaEvent``: Triggered before a media object is moved or renamed. Example usage: Prevent the move under certain conditions.
- ``PostMoveMediaEvent``: Triggered after a media object is moved or renamed. Example usage: Update the references to the media in the application. If a listener throws an exception, the move is rolled back.

Folder Events are triggered when folders are created or deleted:

- ``PreCreateFolderEvent``: Triggered before a folder is created. Example usage: Validate the folder name or modify its path.
- ``PostCreateFolderEvent``: Triggered after a folder is created. Example usage: Log the creation or notify other services.
- ``PreDeleteFolderEvent``: Triggered before a folder is deleted. Example usage: Check if the folder is empty or prevent deletion under certain conditions.
- ``PostDeleteFolderEvent``: Triggered after a folder is deleted. Example usage: Clean up related resources or notify other parts of the application.
- ``PreMoveFolderEvent``: Triggered before a folder is moved or renamed. Example usage: Prevent the move under certain conditions.
- ``PostMoveFolderEvent``: Triggered after a folder is moved or renamed. Example usage: Update the references to the medias it holds. If a listener throws an exception, the move is rolled back.

The ``PreResolveMediaEvent`` is triggered before a media object is resolved. This event allows you to modify the media path or perform additional checks before the media is accessed.

.. note::

    There events are triggered when using the APIs provided by the bundle (in the ``OriginalStorage`` class). If media or folders are created or deleted using other means (e.g. directly in the filesystem), these events will not be triggered.

Using Events in Your Application
--------------------------------

To listen to these events, you can create an event subscriber or listener in your application. For example, here is an event listener on the ``joli.media.pre_delete_media`` event (or the ``MediaEvents::PRE_DELETE_MEDIA`` constant)::

    namespace App\EventListener;

    use JoliCode\MediaBundle\Event\MediaEvents;
    use JoliCode\MediaBundle\Event\PreDeleteMediaEvent;
    use Psr\Log\LoggerInterface;
    use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

    class MediaEventListener
    {
        public function __construct(private readonly LoggerInterface $logger)
        {
        }

        #[AsEventListener(event: MediaEvents::PRE_DELETE_MEDIA)]
        public function onPreDeleteMedia(PreDeleteMediaEvent $event): void
        {
            $mediaPath = $event->path;
            $this->logger->info(sprintf('Media "%s" is about to be deleted.', $mediaPath));

            // Add custom logic here
        }
    }

When resolving a media, the ``PreResolveMediaEvent`` can be used to modify the media path or perform additional checks before the media is accessed::

    namespace App\EventListener;

    use JoliCode\MediaBundle\Event\MediaEvents;
    use JoliCode\MediaBundle\Event\PreResolveMediaEvent;
    use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

    final class ResolveEventListener
    {
        private const MEDIA_ORIGINAL_PATH = 'some/legacy/prefix/';

        #[AsEventListener(event: MediaEvents::PRE_RESOLVE_MEDIA)]
        public function onPreResolve(PreResolveMediaEvent $event): void
        {
            if (str_starts_with($event->path, self::MEDIA_ORIGINAL_PATH)) {
                $event->path = substr($event->path, strlen(self::MEDIA_ORIGINAL_PATH));
            }
        }
    }

Sanitizing a Media Before It Is Stored
--------------------------------------

The ``PreCreateMediaEvent`` is dispatched by the ``OriginalStorage`` before anything is written to the storage, and its ``binary`` property is writable. A listener can therefore replace the content which is about to be stored, and the storage will write the replacement instead of the uploaded content - without any additional read or write.

A typical use case is stripping the metadata of the uploaded images: the ``ExifRemovalPreProcessor`` shipped by the bundle only runs in the variation pipeline, so the originals keep their metadata, GPS coordinates included. The following listener sanitizes the original itself::

    namespace App\EventListener;

    use JoliCode\MediaBundle\Event\MediaEvents;
    use JoliCode\MediaBundle\Event\PreCreateMediaEvent;
    use JoliCode\MediaBundle\Model\Format;
    use Symfony\Component\DependencyInjection\Attribute\Autowire;
    use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
    use Symfony\Component\Process\Process;

    final readonly class StripExifMetadataListener
    {
        public function __construct(
            #[Autowire('%joli_media.binary.exiftool%')]
            private string $exiftoolBinary,
        ) {
        }

        #[AsEventListener(event: MediaEvents::PRE_CREATE_MEDIA)]
        public function onPreCreateMedia(PreCreateMediaEvent $event): void
        {
            if (!in_array($event->binary->getFormat(), [Format::JPEG->value, Format::TIFF->value], true)) {
                return;
            }

            $temporaryFile = tempnam(sys_get_temp_dir(), 'media');
            file_put_contents($temporaryFile, $event->binary->getContent());

            try {
                (new Process([$this->exiftoolBinary, '-all=', '-m', '-overwrite_original', $temporaryFile]))->mustRun();
                $event->binary = $event->binary->withContent(file_get_contents($temporaryFile));
            } finally {
                unlink($temporaryFile);
            }
        }
    }

A working version of this listener is part of `the demo application <../getting-started/demo.rst>`_.

The ``Binary::withContent()`` method builds a copy of the binary holding a different content, and preserving its mime type and format. When the replacement is of another nature, build a new ``Binary`` instead.

.. note::

    The listener is called before anything is written: throwing an exception aborts the creation of the media, and nothing is stored. This is the recommended way to reject an upload which does not satisfy the rules of the application.

.. caution::

    The ``path`` property of the event is read-only, and the storage writes the replacement under the very same path. **A listener must therefore preserve the format of the binary**, otherwise the stored file would carry a misleading extension - and the mime type reported for it afterwards, which most storages derive from the extension, would be wrong.

    Conversions which change the format, such as turning a RAW or HEIC upload into a JPEG, must be performed by the caller before ``createMedia()`` is called, so that the target path can carry the right extension.

Finally, note that the mime type served to the clients is computed from the *stored file*, and not from the mime type declared by the binary: a listener cannot alter the ``Content-Type`` of the responses.
