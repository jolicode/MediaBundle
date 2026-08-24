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
- ``MediaVariation::getTemporaryUrl()`` always makes sure the variation file exists before signing its URL, whatever the value of the ``must_store_when_generating_url`` setting: a pre-signed URL bypasses the ``MediaController``, so a missing variation file could not be generated on the fly when the URL is requested. The variation file is converted and stored when missing, and a ``JoliCode\MediaBundle\Exception\MediaVariationNotStoredException`` is thrown when it cannot be generated - a conversion failure is not swallowed, as it would produce a signed URL to a missing object.

.. tip::

    ``MediaVariation::getTemporaryUrl()`` checks the existence of the variation file on the storage, which adds a round-trip to the storage backend. For hot endpoints, pre-generate the variation files with the ``joli:media:convert`` command.

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
