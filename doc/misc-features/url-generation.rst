URL generation
==============

Generating the URL for a given media or one of its variations can be done by calling the ``getUrl()`` method on the ``Media`` or ``MediaVariation`` object::

    // $library is an instance of JoliCode\MediaBundle\Library\Library. It can be retrived from the services container
    $media = new Media('example-image.png', $library);

    // absolute path
    echo $media->getUrl();

    // absolute URL
    echo $media->getUrl(UrlGeneratorInterface::ABSOLUTE_URL);

    // $variation is an instance of JoliCode\MediaBundle\Variation\Variation
    $mediaVariation = new MediaVariation($media, 'variation_name');
    echo $mediaVariation->getUrl();
    echo $mediaVariation->getUrl(UrlGeneratorInterface::ABSOLUTE_URL);

There are few chances that you need to instanciate the ``Media`` or ``MediaVariation`` classes yourself. Most of the time, you'll prefer relying on the media ``Resolver`` service to get the media or media variation objects::

    $resolver = $this->get('joli_media.resolver');
    $media = $resolver->resolve('example-image.png', 'library_name');
    $mediaVariation = $resolver->resolve('example-image.png', 'library_name', 'variation_name');

    echo $media->getUrl();
    echo $mediaVariation->getUrl();


.. tip::

    In many applications, there will be only one library defined. In this case, you can omit the library name when resolving the media or media variation::

        $media = $resolver->resolve('example-image.png');
        $mediaVariation = $resolver->resolve('example-image.png', null, 'variation_name');

Generating the variation file along with its URL
------------------------------------------------

By default, generating the URL of a media variation does not generate the variation file itself - it is generated on the fly, the first time the URL is requested. If the ``must_store_when_generating_url`` setting is enabled (either in the library's ``cache`` configuration or on the variation itself - see the `Configuration documentation <../getting-started/configuration.rst>`_), ``MediaVariation::getUrl()`` generates and stores the missing variation file before returning the URL.

Since this behavior is implemented by ``MediaVariation::getUrl()`` itself, it applies everywhere a variation URL is generated: in the Twig components and filters, in the admin bridges, or in your own code - for instance in an API Platform normalizer.

Note that a conversion failure never makes ``getUrl()`` throw: the error is logged as a warning, and the URL is returned anyway (the ``MediaController`` will then try to generate the variation on the fly when the URL is requested).

Temporary (pre-signed) URLs
---------------------------

When the media files are stored on a bucket (Amazon S3, MinIO, etc.), it is often preferable to let the storage backend serve them directly through pre-signed URLs, instead of proxying the files through PHP. The ``getTemporaryUrl()`` method, available on the ``Media`` and ``MediaVariation`` objects (and on the underlying ``OriginalStorage`` and ``CacheStorage`` services), generates such URLs::

    // valid for one hour by default
    echo $media->getTemporaryUrl();

    // absolute expiration date
    echo $media->getTemporaryUrl(new \DateTimeImmutable('+20 minutes'));

    // validity duration
    echo $media->getTemporaryUrl(new \DateInterval('PT20M'));

    // extra options forwarded to the filesystem adapter
    echo $media->getTemporaryUrl(config: ['ResponseContentDisposition' => 'attachment; filename=example.png']);

    echo $mediaVariation->getTemporaryUrl();

This requires a Flysystem adapter able to generate temporary URLs (the AWS S3 and Async AWS S3 adapters, among others), or a ``League\Flysystem\UrlGeneration\TemporaryUrlGenerator`` explicitly configured on the filesystem. When the adapter does not support temporary URLs (e.g. the Local adapter), a ``League\Flysystem\UnableToGenerateTemporaryUrl`` exception is thrown.

Unlike ``getUrl()``, which points at a route handled by the ``MediaController``:

- there is no ``$referenceType`` parameter: the URL host comes from the storage backend and the signature, not from the Symfony router;
- the signed path is the storage path of the file, so the ``url_generator.path`` prefix of the library has no effect on it;
- ``MediaVariation::getTemporaryUrl()`` always makes sure the variation file exists before signing its URL, whatever the value of the ``must_store_when_generating_url`` setting: a pre-signed URL bypasses the ``MediaController``, so a missing variation file could not be generated on the fly when the URL is requested. The variation file is converted and stored when missing, and a ``JoliCode\MediaBundle\Exception\MediaVariationNotStoredException`` is thrown when it cannot be generated - a conversion failure is not swallowed, as it would produce a signed URL to a missing object.

.. tip::

    ``MediaVariation::getTemporaryUrl()`` checks the existence of the variation file on the storage. Once a variation file is known to exist, this is cached like its other properties (for one day), so that signing its URL does not reach the storage backend anymore; a missing variation file is not cached, and is checked again on the next call. For hot endpoints, pre-generate the variation files with the ``joli:media:convert`` command.

    The bundle clears this cache when it deletes a variation file. A variation file deleted outside of the bundle (by a lifecycle rule of the bucket, for instance) is still considered as stored until this cache expires.

.. warning::

    Do not cache a response containing pre-signed URLs beyond their expiration. Also note that most backends limit the validity duration (7 days for AWS Signature Version 4, for instance).

Pre-signed URLs are mostly useful on private buckets. The bundle writes the media and variation files without forcing any visibility, so the visibility configured on the Flysystem storage applies:

.. code-block:: yaml

    # config/packages/flysystem.yaml
    flysystem:
        storages:
            media.storage:
                adapter: 'aws'
                visibility: private
                directory_visibility: private

Generating the variation files on creation
------------------------------------------

Generating variation files lazily suits a local filesystem, where checking whether a file exists is cheap, and where the application serves the files itself, so that it can generate a missing one when it is requested. Neither holds on a bucket (Amazon S3, MinIO, etc.):

- each existence check is a request to the storage backend, so a page or an API response listing many media would send one per variation;
- the variations are often served by the storage backend itself (pre-signed URLs, a CDN), without going through the application and its ``MediaController``, so a missing variation file is never generated.

Enable the ``store_on_create`` setting of the library's ``cache`` configuration to generate and store all the variations of a media as soon as it is created:

.. code-block:: yaml

    # config/packages/joli_media.yaml
    joli_media:
        libraries:
            default:
                cache:
                    flysystem: default.cache.storage
                    store_on_create: true

With this setting:

- every variation that can be applied to the media (see the `voters <../variations/variation-voters.rst>`_) is generated, including the pixel-ratio variations and the automatic WebP alternatives. A media that no processor can read (a PDF, an SVG) is stored without variations;
- the variations are generated again at the new path when a media is moved with ``OriginalStorage::move()``, as the variations of its previous path are deleted. Moving a folder does not generate them: run the ``joli:media:convert`` command afterwards;
- the variations are generated without checking whether they already exist, so that it does not send any existence check to the storage backend;
- by default, they are generated synchronously: creating a media takes longer, and a conversion failure is not swallowed - the exception is thrown from ``createMedia()`` (the original file is stored nevertheless) or from ``move()`` (the move is rolled back).

The setting only applies to the media created or moved after it was enabled. Generate the variations of the existing media, and those of variations added later to the configuration, with the ``joli:media:convert`` command.

Generating them in the background
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To keep the creation of a media fast, the generation can be handed over to `Symfony Messenger <https://symfony.com/doc/current/messenger.html>`_. Name the bus to dispatch it to in the ``store_on_create_message_bus`` setting:

.. code-block:: yaml

    # config/packages/joli_media.yaml
    joli_media:
        store_on_create_message_bus: messenger.default_bus

A ``JoliCode\MediaBundle\Message\StoreVariations`` message is then dispatched for each created or moved media, instead of generating its variations right away. As with any message, Messenger handles it synchronously unless it is routed to a transport - route it to an asynchronous one to generate the variations in a worker:

.. code-block:: yaml

    # config/packages/messenger.yaml
    framework:
        messenger:
            transports:
                async: '%env(MESSENGER_TRANSPORT_DSN)%'
            routing:
                JoliCode\MediaBundle\Message\StoreVariations: async

The setting is checked when the container is compiled: it fails if the Messenger component is not installed, or if the service is not a Messenger bus.

When the variations are generated in the background:

- they do not exist until the worker has handled the message - a URL that bypasses the ``MediaController`` (a pre-signed URL, a CDN) points at a missing file in the meantime;
- a conversion failure follows the retry strategy of the transport, instead of being thrown from ``createMedia()`` or ``move()``;
- a media deleted or moved before its message is handled is skipped - a move dispatches a message of its own for the new path.

Twig extension
--------------

The bundle provides Twig filters to generate the URL of a media or a media variation:

- ``joli_media_url()`` to generate the URL of a media or one of its variations. Available parameters are:

  - the variation name
  - the library name
  - the type of URL to generate (absolute or relative), based on the ``Symfony\Component\Routing\Generator\UrlGeneratorInterface`` constants

- ``joli_media_absolute_url()`` is a shortcut to the ``joli_media_url()`` filter, in order to generate absolute URLs. It is equivalent to calling ``joli_media_url()`` with the ``UrlGeneratorInterface::ABSOLUTE_URL`` constant.

- ``joli_media_srcset()`` to generate the value of a ``srcset`` attribute out of several variations of a media - see the `srcset generation documentation <srcset.rst#in-twig>`_. Available parameters are:

  - the list of variation names, or a map of descriptors to variation names
  - the library name

Example
~~~~~~~

Imagine the following configuration:

- 2 libraries named ``media`` and ``contributions``
- the image ``example-image.png`` is stored in the ``media`` library
- the image ``example-contribution.png`` is stored in the ``contributions`` library

.. code-block:: twig

    {# get the absolute path of the original 'example-image.png' media from the default library #}
    {{ 'example-image.png'|joli_media_url() }}
    {# output: /path-to-original-media-library/example-image.png #}

    {# get the absolute path of the 'example-image.png' media from the default library, in the variation 'variation_name' #}
    {{ 'example-image.png'|joli_media_url('variation_name') }}
    {# output: /path/to/cache/variation-name/example-image.png #}

    {# get the absolute path of the 'example-image.png' media from the 'media' library, in the variation 'variation_name' #}
    {{ 'example-image.png'|joli_media_url('variation_name', 'media') }}
    {# output: /path/to/cache/variation-name/example-image.png #}

    {# try to generate an URL for a media that does not exist in the default library #}
    {{ 'example-contribution.png'|joli_media_url('variation_name') }}
    {# output: no URL, as the media can not be found in the default library #}

    {# get the absolute path of the 'example-contribution.png' media from the 'contributions' library, in the variation 'variation_name' #}
    {{ 'example-contribution.png'|joli_media_url('variation_name', 'contributions') }}
    {# output: /some/other/path/to/cache/variation-name/example-contribution.png #}

    {# get the absolute URL of the 'example-image.png' media from the default library, in the variation 'variation_name' #}
    {{ 'example-image.png'|joli_media_url('variation_name', null, constant('Symfony\\Component\\Routing\\Generator\\UrlGeneratorInterface::ABSOLUTE_URL')) }}
    {# output: https://example.com/path/to/cache/variation-name/example-image.png #}

    {# get the absolute URL of the 'example-image.png' media from the default library, in the variation 'variation_name' #}
    {{ 'example-image.png'|joli_media_absolute_url('variation_name') }}
    {# output: https://example.com/path/to/cache/variation-name/example-image.png #}
