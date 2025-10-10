Post-processors
===============

Post-processors are responsible for optimizing the media variations after the transformation. They are applied after the transformation has been computed and the media has been transformed to its final shape.

Configuration
-------------

The main post-processors configuration is defined in the ``post_processors`` key of the ``joli_media`` configuration. The bundle currently supports the following post-processors:

- ``gifsicle``: the post-processor to optimize GIF images
- ``jpegoptim``: the post-processor to optimize JPEG images
- ``mozjpeg``: the post-processor to optimize JPEG images
- ``oxipng``: the post-processor to optimize PNG images
- ``pngquant``: the post-processor to optimize PNG images

While there are many other image optimization tools available, these are the ones that are currently supported by the bundle and that we found are the most efficient to compress images while keeping a good quality.

.. tip::

    Read the documentation page about `dependencies and tooling <../getting-started/dependencies-and-tooling.rst>`_ to learn how to install these tools on your system.

Each post-processor has a ``binary`` key that defines the path to the binary to use, and an ``options`` key that defines the options to use when executing the binary. The default settings provide a good balance between quality and performance to make sure that the media is optimized while keeping a good quality.

Default configuration
~~~~~~~~~~~~~~~~~~~~~

Here is the default configuration that defines the post-processors options:

.. code-block:: yaml

    joli_media:
        post_processors:
            gifsicle:
                options:
                    optimize: 3
                    lossy: 20
                    colors: 256
            jpegoptim:
                options:
                    strip_all: true
                    progressive: true
                    max_quality: 80
            mozjpeg:
                options:
                    optimize: true
                    progressive: true
                    quality: 80
            oxipng:
                options:
                    optimization: 4
                    strip:
                        - all
                    zopfli: false
            pngquant:
                options:
                    quality: 75-85
                    speed: 5

Disabling a post-processor
~~~~~~~~~~~~~~~~~~~~~~~~~~

All the post-processors are enabled by default, provided the required binaries are installed on your system. If you want to disable a post-processor, you can set the ``enabled`` key to ``false`` in the post-processor configuration. For example, to completely disable jpeg files optimization:

.. code-block:: yaml

    joli_media:
        post_processors:
            jpegoptim:
                enabled: false
            mozjpeg:
                enabled: false

This can event be shotened to:

.. code-block:: yaml

    joli_media:
        post_processors:
            jpegoptim: false
            mozjpeg: false

Customizing post-processor options for a library or a variation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``post_processors`` key can also be used to override the post-processor options for a specific library or variation. This is useful if you want to apply different post-processing options to a library or a variation than the ones defined in the main configuration. In this case, options are deeply merged with the main configuration, so you can override only the options you want to change.

For example, if you want to use a different quality for the JPEG images in the ``example`` library, you can do it like this:

.. code-block:: yaml

    joli_media:
        libraries:
            example:
                post_processors:
                    jpegoptim:
                        max_quality: 90
                    mozjpeg:
                        quality: 95

If you want to override the post-processor options for a specific variation, you can do it like this:

.. code-block:: yaml

    joli_media:
        libraries:
            example:
                variations:
                    my_variation:
                        post_processors:
                            jpegoptim:
                                max_quality: 70
                            mozjpeg:
                                quality: 75
                    no_post_processing_variation:
                        post_processors:
                            jpegoptim: false
                            mozjpeg: false

This allows for fine-tuning the post-processing options for specific use cases, such as generating lower quality thumbnails or higher quality images for specific libraries or variations.

Defining the post-processors binaries install location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The install location of post-processors binaries can be configured:

- as environment variables:

  - ``JOLI_MEDIA_GIFSICLE_BINARY``
  - ``JOLI_MEDIA_JPEGOPTIM_BINARY``
  - ``JOLI_MEDIA_MOZJPEG_BINARY``
  - ``JOLI_MEDIA_OXIPNG_BINARY``
  - ``JOLI_MEDIA_PNGQUANT_BINARY``

- as parameters:

  - ``joli_media.binary.gifsicle``
  - ``joli_media.binary.jpegoptim``
  - ``joli_media.binary.mozjpeg``
  - ``joli_media.binary.oxipng``
  - ``joli_media.binary.pngquant``

- directly under the ``joli_media.post_processors`` configuration

If you do not define any specific configuration for the binaries, the bundle will use the following default paths:

- ``/usr/local/bin/gifsicle`` for the ``gifsicle`` binary
- ``/usr/local/bin/jpegoptim`` for the ``jpegoptim`` binary
- ``/usr/local/bin/mozjpeg`` for the ``mozjpeg`` binary
- ``/usr/local/bin/oxipng`` for the ``oxipng`` binary
- ``/usr/local/bin/pngquant`` for the ``pngquant`` binary
