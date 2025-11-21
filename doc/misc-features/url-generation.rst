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

Twig extension
--------------

The bundle provides Twig filters to generate the URL of a media or a media variation:

- ``joli_media_url()`` to generate the URL of a media or one of its variations. Available parameters are:

  - the variation name
  - the library name
  - the type of URL to generate (absolute or relative), based on the ``Symfony\Component\Routing\Generator\UrlGeneratorInterface`` constants

- ``joli_media_absolute_url()`` is a shortcut to the ``joli_media_url()`` filter, in order to generate absolute URLs. It is equivalent to calling ``joli_media_url()`` with the ``UrlGeneratorInterface::ABSOLUTE_URL`` constant.

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
