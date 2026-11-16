Processors
==========

Processors are responsible to "process" (i.e., *execute*) the transformations. In other words, processors apply a transformation to a media to change its shape or properties.

Configuration
-------------

The main processors configuration is defined in the ``processors`` key of the ``joli_media`` configuration. The bundle currently supports the following processors:

- ``cwebp``: the processor to convert images to WebP format
- ``gif2webp``: the processor to convert GIF images to WebP format
- ``gifsicle``: the processor to convert GIF images into other GIF files
- ``imagine``: the processor to convert images using the Imagine library

.. tip::

    Read the documentation page about `dependencies and tooling <../getting-started/dependencies-and-tooling.rst>`_ to learn how to install these tools on your system.

.. caution::

    The ``cwebp``, ``gif2webp`` and ``gifsicle`` processors are specialized: they can only output WebP and GIF files. Any variation that outputs another format - JPEG, PNG or AVIF - requires the general-purpose ``imagine`` processor. Run the ``joli:media:debug:processors`` `command <../misc-features/commands.rst>`_ to check which processors are registered, and whether their binaries are available.

Processors priority
~~~~~~~~~~~~~~~~~~~

Several processors may be able to handle the same conversion. They are tried in the following order, and the first one that succeeds wins: ``cwebp``, ``gif2webp``, ``gifsicle``, then ``imagine``. The specialized processors come first because they produce better results for the formats they handle.

Default configuration
~~~~~~~~~~~~~~~~~~~~~

Here is the default configuration that defines the processors options. These default settings provide a good balance between quality and performance to make sure that the media is optimized while keeping a good quality.

.. code-block:: yaml

    joli_media:
        processors:
            cwebp:
                options:
                    near_lossless:
                        quality: 40
                        method: 6
                        metadata:
                            - none
                        near_lossless: 0
                    lossy:
                        quality: 75
                        method: 6
                        af: true
                        pass: 10
                        metadata:
                            - none
            gif2webp:
                options:
                    lossy: true
                    metadata:
                        - none
                    min_size: true
            gifsicle:
                options:
                    optimize: 3
                    lossy: 20
                    colors: 256
            imagine:
                rasterize_svg: false
                svg_renderer: imagick
                rsvg_convert_binary: '%joli_media.binary.rsvg_convert%'
                options:
                    jpeg_quality: 80
                    png_quality: 80
                    quality: 80


Processor binaries
~~~~~~~~~~~~~~~~~~

All processors - except the ``imagine`` processor - have a ``binary`` key that defines the path to the binary to use, and an ``options`` key that defines the options to use when executing the binary.

The ``imagine`` processor does not use a binary, it uses the Imagine library to process images. The ``driver`` key can be used to define which Imagine driver to use (e.g. ``gd``, ``imagick`` or ``gmagick``). If not set, ``imagick`` will be used.

Processes timeout
~~~~~~~~~~~~~~~~~

The processors that use a binary execute it in an external process, which times out after the duration defined in the global ``joli_media.process_timeout`` directive (60 seconds by default). Each of these processors can override this value using its ``process_timeout`` key, in seconds. Use ``0`` to disable the timeout:

.. code-block:: yaml

    joli_media:
        # applies to all the external processes created by the bundle
        process_timeout: 120
        processors:
            cwebp:
                # overrides the global timeout for the cwebp processor
                process_timeout: 300
            gifsicle:
                # disables the timeout for the gifsicle processor
                process_timeout: 0

cwebp processor options
~~~~~~~~~~~~~~~~~~~~~~~

The ``cwebp`` processor is used to convert JPEG, PNG, TIFF or WEBP images to WebP format. It supports two presets: ``near_lossless`` and ``lossy``.

The ``near_lossless`` configuration preset is used for images that you want to convert to WebP with minimal quality loss. Under the hood, the bundle never uses the ``near_lossless`` preset for JPEG or TIFF images or for images that contain more than 20000 colors.

The ``lossy`` configuration preset is the default preset, it offers a good balance between quality and file size for most images.

If the ``near_lossless`` preset is used by the processor, it will check that the processing result is not larger than the original image, and that the ratio between the resulting image pixels area and its file size is satisfying. If the processor finds it is necessary, it will fall back to the ``lossy`` preset.

The various configuration keys are mapped to `the official cwebp options <https://developers.google.com/speed/webp/docs/cwebp>`_:

- ``quality``: ``-q``
- ``method``: ``-m``
- ``metadata``: ``-metadata``
- ``near_lossless``: ``-near_lossless``
- ``af``: ``-af``
- ``pass``: ``-pass``

gif2webp processor options
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``gif2webp`` processor is used to convert (animated) GIF images to WebP format. Its configuration keys are mapped to `the official gif2webp options <https://developers.google.com/speed/webp/docs/gif2webp>`_:

- ``lossy``: ``-lossy``
- ``metadata``: ``-metadata``
- ``min_size``: ``-min_size``

gifsicle processor options
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``gifsicle`` processor is used to convert GIF images into other GIF files. It supports the following configuration keys, that are mapped to `the official gifsicle options <https://www.lcdf.org/gifsicle/man.html>`_:

- ``optimize``: ``--optimize``
- ``lossy``: ``--lossy``
- ``colors``: ``--colors``

imagine processor options
~~~~~~~~~~~~~~~~~~~~~~~~~

The ``imagine`` processor is used to convert AVIF, GIF, HEIF, JPEG, PNG, TIFF or WEBP images - and SVG images, when `rasterizing SVG images`_ is enabled - to the AVIF, GIF, JPEG, PNG or WEBP format using `the Imagine library <https://github.com/php-imagine/Imagine>`_. It supports the following configuration keys:

- ``jpeg_quality``: the quality of the JPEG images, from 0 to 100 (default: 80). It is mapped to Imagine's ``jpeg_quality`` option
- ``png_quality``: the quality of the PNG images, from 0 to 100 (default: 80). It is mapped to Imagine's ``png_compression_level`` and ``png_compression_filter`` options
- ``quality``: the quality of the images, from 0 to 100 (default: 80). It is mapped to Imagine's ``quality`` option

.. note::

    The AVIF support is still a bit limited in Imagine. In particular, it does not work with animated AVIF images. As a consequence, converting an animated GIF to AVIF will only keep the first frame of the GIF image.

Rasterizing SVG images
~~~~~~~~~~~~~~~~~~~~~~

Browsers display SVG images as they are, but some contexts cannot: most email clients (Gmail, Outlook...) do not display SVG at all, and need a raster version of, for example, a logo. The ``imagine`` processor can rasterize SVG media into variations, once the ``rasterize_svg`` setting is enabled:

.. code-block:: yaml

    joli_media:
        processors:
            imagine:
                driver: imagick
                rasterize_svg: true
        libraries:
            default:
                variations:
                    email_logo:
                        format: png
                        transformers:
                            heighten:
                                height: 168

SVG is an input format only: no processor outputs SVG, so a variation that does not define a ``format`` turns a SVG media into a PNG one. The transformers use the intrinsic size of the SVG image, read from the ``width`` and ``height`` attributes of its root element (unitless or in pixels), or else from its ``viewBox``. The image is rendered at the size of the variation, so that it stays sharp when it is enlarged, and on a transparent background.

This setting is disabled by default, and only applies to the whole ``imagine`` processor, not to a library or a variation. With the default ``imagick`` SVG renderer, it requires the ``imagick`` driver, along with the SVG support of ImageMagick (see the `dependencies documentation <../getting-started/dependencies-and-tooling.rst#the-imagine-library>`_): when one of them is missing, the container fails to compile with an error that tells what to install.

Choosing the SVG renderer
^^^^^^^^^^^^^^^^^^^^^^^^^

By default, ImageMagick renders the SVG images. Most distributions build it without librsvg, so it uses its internal renderer, which draws simple shapes well, but not gradients, masks, filters or CSS: a logo with a gradient comes out black. Set the ``svg_renderer`` setting to ``rsvg-convert`` to render them with `librsvg <https://gitlab.gnome.org/GNOME/librsvg>`_ instead:

.. code-block:: yaml

    joli_media:
        processors:
            imagine:
                rasterize_svg: true
                svg_renderer: rsvg-convert
                # rsvg_convert_binary: /usr/bin/rsvg-convert

The ``rsvg-convert`` renderer only needs the ``rsvg-convert`` binary (the ``librsvg2-bin`` package of a Debian-based system), and works with any Imagine driver. Its path defaults to the ``JOLI_MEDIA_RSVG_CONVERT_BINARY`` environment variable, or else ``/usr/bin/rsvg-convert``, and the ``joli:media:debug:processors`` `command <../misc-features/commands.rst>`_ checks that it can be executed. The SVG is given to ``rsvg-convert`` on its standard input, so that it does not load the files the SVG references. As for the other binaries, the ``process_timeout`` setting of the ``imagine`` processor overrides the global one.

.. caution::

    A SVG file is an XML document, which can embed scripts or reference external resources. The bundle does not sanitize SVG uploads: this is the job of the application, for example with the `enshrined/svg-sanitize <https://github.com/darylldoyle/svg-sanitizer>`_ library. You should also restrict what ImageMagick is allowed to read with its `security policy <https://imagemagick.org/script/security-policy.php>`_.

.. note::

    JPEG has no transparency: prefer the PNG, WebP or AVIF formats for the variations of SVG images with a transparent background.

Customizing processor options for a library or a variation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``processors`` key can also be used to override the processor options for a specific library or variation. This is useful if you want to apply different processing options to a library or a variation than the ones defined in the main configuration. In this case, options are deeply merged with the main configuration, so you can override only the options you want to change.

For example, if you want to use a different ``jpeg_quality`` for the JPEG images processed by Imagine in the ``example`` library, you can do it like this:

.. code-block:: yaml

    joli_media:
        libraries:
            example:
                processors:
                    imagine:
                        jpeg_quality: 90

If you want to override the processor options for a specific variation, you can do it like this:

.. code-block:: yaml

    joli_media:
        libraries:
            example:
                variations:
                    very_high_quality_variation:
                        processors:
                            imagine:
                                jpeg_quality: 100
                                png_quality: 99
                                quality: 100

This allows for fine-tuning the processing options for specific use cases, such as generating lower quality thumbnails or higher quality images for specific libraries or variations.

Defining the processors binaries install location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The install location of processors binaries can be configured:

- as environment variables:

  - ``JOLI_MEDIA_CWEBP_BINARY``
  - ``JOLI_MEDIA_GIF2WEBP_BINARY``
  - ``JOLI_MEDIA_GIFSICLE_BINARY``
  - ``JOLI_MEDIA_IDENTIFY_BINARY``

- as parameters:

  - ``joli_media.binary.cwebp``
  - ``joli_media.binary.gif2webp``
  - ``joli_media.binary.gifsicle``
  - ``joli_media.binary.identify``

- directly under the ``joli_media.processors`` configuration

If you do not define any specific configuration for the binaries, the bundle will use the following default paths:

- ``/usr/local/bin/cwebp`` for the ``cwebp`` binary
- ``/usr/local/bin/gif2webp`` for the ``gif2webp`` binary
- ``/usr/local/bin/gifsicle`` for the ``gifsicle`` binary
- ``/usr/local/bin/identify`` for the ``identify`` binary
