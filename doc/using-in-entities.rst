Using the MediaBundle in Entities
=================================

The MediaBundle itself does not offer database entities. However, it is designed to be easily integrated into your existing entities, so you can link media to your own entities.

Adding a Media Property
-----------------------

Imagine you have an entity called ``Article`` and you want to link a media object to it. You can do this by adding a ``Media`` property to your ``Article`` entity that references the media::

    namespace App\Entity;

    use Doctrine\DBAL\Types\Types;
    use Doctrine\ORM\Mapping as ORM;
    use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
    use JoliCode\MediaBundle\Model\Media;

    #[ORM\Entity]
    class Article
    {
        #[ORM\Id]
        #[ORM\GeneratedValue]
        #[ORM\Column]
        public ?int $id = null;

        #[ORM\Column(length: 255)]
        public ?string $title = null;

        #[ORM\Column(type: Types::TEXT)]
        public ?string $body = null;

        #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
        public ?Media $image = null;
    }

Validating Media in Entities
----------------------------

The bundle includes a validation constraint that can be used to validate such media paths and ensure that the media object is valid and meets the requirements of your application::

    use JoliCode\MediaBundle\Validator\Media as MediaConstraint;

    #[ORM\Entity]
    class Article
    {
        // ...

        #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
        #[MediaConstraint]
        public ?Media $image = null;
    }

The ``Media`` constraint offers multiple options to customize the validation process. For example, you can specify the allowed media types, the mime type, the file extension or the path prefix::

        #[MediaConstraint(
            allowedExtensions: ['jpg', 'jpeg', 'png'],
            extensionMessage: 'Allowed extensions are: {{ extensions }}.',
            allowedMimeTypes: ['image/jpeg', 'image/png'],
            mimeTypeMessage: 'Allowed mime types are: {{ mimeTypes }}.',
            allowedPaths: ['illustration', 'avatar'],
            pathMessage: 'The file path "{{ value }}" is not allowed. Allowed paths must start with one of the following: {{ paths }}.',
            allowedTypes: ['image'],
            typeMessage: 'Allowed types are: {{ types }}.',
        )]
        public ?Media $image = null;

The ``Media`` constraint can also be used with plain string entity fields. In this case, the media path will be validated as a string. This is useful if you want to store the media path in a separate field or if you want to use the media path in a different way::

        #[MediaConstraint]
        public ?string $image = null;

If your application defines multiple media libraries, you can specify the library name to validate against::

        #[MediaConstraint(
            library: 'user-avatars',
        )]
        public ?string $image = null;

In case the media cannot be resolved, you can specify a custom message to be displayed::

        #[MediaConstraint(
            unresolvedMediaMessage: 'The media "{{ value }}" could not be found.',
        )]
        public ?string $image = null;

Configuring the Media Deletion Behavior
---------------------------------------

The ``#[MediaDeleteBehavior]`` attribute can also be used in entities to configure which behavior should be applied when a media object is deleted. This is useful when you want to control how the deletion of a media object affects the entities that reference it. Read the documentation about the `Media Deletion Behavior <media-deletion-behavior.rst>`_ for more information.
