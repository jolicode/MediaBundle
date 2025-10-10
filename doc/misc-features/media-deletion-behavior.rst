Configuring the Media Deletion Behavior
=======================================

When you delete a media object, you may want to control how the deletion affects the entities of your project that reference it.

For example, you may have already `configured some of your entities to target media files <using-in-entities.rst>`_ managed by the bundle, and you may wish to prevent the deletion of media files used by your entities. The ``JoliCode\MediaBundle`` provides a way to configure the deletion behavior of media fields in your entities.

The ``DeleteMediaEventListener`` class provided by the ``JoliCode\MediaBundle`` is responsible for handling the deletion of media objects in your application. It listens to the ``PreDeleteMediaEvent`` and ensures that media deletion behavior is applied according to the configuration in your entities.

To use the ``DeleteMediaEventListener``, you need to define the deletion behavior for media fields in your entities. This is done using the ``#[MediaDeleteBehavior]`` attribute provided by the bundle. The attribute supports two main strategies:

1. ``SET_NULL``: Sets the media field to ``null`` when the associated media is deleted.
2. ``RESTRICT``: Prevents the deletion of the media if it is still in use by an entity.

Here is an example of how to configure media deletion behavior in an entity, such as ``Article``::

    use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
    use JoliCode\MediaBundle\DeleteBehavior\Strategy;
    use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
    use JoliCode\MediaBundle\Model\Media;
    use JoliCode\MediaBundle\Validator\Media as MediaConstraint;

    #[ORM\Entity]
    class Article
    {
        // ...

        #[MediaConstraint(allowedTypes: ['image', 'video'])]
        #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
        #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
        public ?Media $image = null;

        #[MediaConstraint(allowedTypes: ['image', 'video'])]
        #[MediaDeleteBehavior(strategy: Strategy::RESTRICT)]
        #[ORM\Column(type: MediaTypes::MEDIA, nullable: false)]
        public Media $requiredImage;

        // ...
    }

In this example:

- The ``image`` field is configured with the SET_NULL behavior. When the associated media is deleted, the field will be set to null.
- The ``requiredImage`` field is configured with the RESTRICT behavior. If the media is still in use, an exception will be thrown, preventing its deletion.

Customizing the Listener
------------------------

The ``DeleteMediaEventListener`` listens to the ``PreDeleteMediaEvent`` (see `the "Events" chapter <events.rst>`_) and performs the following actions:

1. It checks the metadata of all entities to find fields that reference the media being deleted.
2. For fields with the ``SET_NULL`` behavior, it sets the field to ``null`` and persists the changes.
3. For fields with the ``RESTRICT`` behavior, it throws a ``MediaInUseException`` if the media is still in use.

If a media object cannot be deleted due to the ``RESTRICT`` behavior, a ``MediaInUseException`` is thrown. You can catch this exception and handle it appropriately in your application::

    use JoliCode\MediaBundle\Exception\MediaInUseException;

    try {
        // Code to delete a media
    } catch (MediaInUseException $e) {
        echo 'Cannot delete media: ' . $e->getMessage();
    }

When using the EasyAdmin or the SonataAdmin bridges, the exception will be automatically handled and a user-friendly message will be displayed in the admin interface.
