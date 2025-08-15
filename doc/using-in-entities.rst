Using the MediaBundle in Entities
=================================

The MediaBundle itself does not offer database entities. However, it is designed to easily integrate into your existing entities, so you can link media to your own entities.

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

The ``JoliCode\MediaBundle\Doctrine\Types::MEDIA`` type defines the field as a media field, using a Doctrine String type that stores the media path. The ``Media`` class is a model that represents a media object, and it can be used to get information about the media, such as its size, mime type, access its variations, and more.

As the ``Types::MEDIA`` type extends ``Doctrine\DBAL\Types``, it is limited to storing the media path as a string. This means that you cannot store long paths in such fields, but are limited to the maximum length of a string in your database. If you need to store longer paths, you can use the ``Types::MEDIA_LONG`` type instead, which is designed to handle longer media paths (it extends Doctrine's TextType)::

    namespace App\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
    use JoliCode\MediaBundle\Model\Media;

    #[ORM\Entity]
    class Article
    {
        #[ORM\Column(type: MediaTypes::MEDIA_LONG, nullable: true)]
        public ?Media $imageWithPotentiallyLongPath = null;
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
            maxPathLength: 255,
            maxPathLengthMessage: 'The file path "{{ value }}" exceeds the maximum length of {{ limit }} characters.',
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
