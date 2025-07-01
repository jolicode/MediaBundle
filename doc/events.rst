Events Triggered by the MediaBundle
===================================

The ``JoliCode\MediaBundle`` provides several events that allow you to hook into various stages of media and folder operations. These events are dispatched by the bundle and can be used to customize or extend its behavior.

Available Events
----------------

Media Events are triggered when media objects are created or deleted:

- ``PreCreateMediaEvent``: Triggered before a media object is created. Example usage: Validate or modify the media content before it is saved.
- ``PostCreateMediaEvent``: Triggered after a media object is created. Example usage: Perform additional actions, such as logging or notifying other services.
- ``PreDeleteMediaEvent``: Triggered before a media object is deleted. Example usage: Check if the media is in use or prevent deletion under certain conditions.
- ``PostDeleteMediaEvent``: Triggered after a media object is deleted. Example usage: Clean up related resources or notify other parts of the application.

Folder Events are triggered when folders are created or deleted:

- ``PreCreateFolderEvent``: Triggered before a folder is created. Example usage: Validate the folder name or modify its path.
- ``PostCreateFolderEvent``: Triggered after a folder is created. Example usage: Log the creation or notify other services.
- ``PreDeleteFolderEvent``: Triggered before a folder is deleted. Example usage: Check if the folder is empty or prevent deletion under certain conditions.
- ``PostDeleteFolderEvent``: Triggered after a folder is deleted. Example usage: Clean up related resources or notify other parts of the application.

The ``PreResolveMediaEvent`` is triggered before a media object is resolved. This event allows you to modify the media path or perform additional checks before the media is accessed.

.. note::

    There events are triggered when using the APIs provided by the bundle (in the ``OriginalStorage`` class). If media or folders are created or deleted using other means (e.g. directly in the filesystem), these events will not be triggered.

Using Events in Your Application
--------------------------------

To listen to these events, you can create an event subscriber or listener in your application. For example:

### Example: Listening to ``PostDeleteMediaEvent``

Add an event listener on the ``joli.media.pre_delete_media`` event (or the ``MediaEvents::PRE_DELETE_MEDIA`` constant)::

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
        private const string MEDIA_ORIGINAL_PATH = 'some/legacy/prefix/';

        #[AsEventListener(event: MediaEvents::PRE_RESOLVE_MEDIA)]
        public function onPreResolve(PreResolveMediaEvent $event): void
        {
            if (str_starts_with($event->path, self::MEDIA_ORIGINAL_PATH)) {
                $event->path = substr($event->path, strlen(self::MEDIA_ORIGINAL_PATH));
            }
        }
    }
