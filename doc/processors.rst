Processors
==========

Processors are responsible to "process" (ie., *execute*) the transformations. In other words, processors apply a transformation to a media to change its shape or properties.

Configuration
-------------

The main processors configuration is defined in the ``processors`` key of the ``joli_media`` configuration. The bundle currently supports the following processors:

- ``cwebp``: the processor to convert images to WebP format
- ``gif2webp``: the processor to convert GIF images to WebP format
- ``gifsicle``: the processor to convert GIF images into other GIF files
- ``imagimagineick``: the processor to convert images using the Imagine library

.. tip::

    Read the documentation page about `dependencies and tooling <dependencies-and-tooling.rst>`_ to learn how to install these tools on your system.

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
                options:
                    jpeg_quality: 80
                    png_quality: 80
                    quality: 80


Processor binaries
~~~~~~~~~~~~~~~~~~

All processors - except the ``imagine`` processor - have a ``binary`` key that defines the path to the binary to use, and an ``options`` key that defines the options to use when executing the binary.

The ``imagine`` processor does not use a binary, it uses the Imagine library to process images. The ``driver`` key can be used to define which Imagine driver to use (eg. ``gd``, ``imagick`` or ``gmagick``). If not set, ``gmagick`` will be used.

cwebp processor options
~~~~~~~~~~~~~~~~~~~~~~~

The ``gif2webp`` processor is used to convert JPEG, PNG, TIFF or WEBP images to WebP format. It supports two presets: ``near_lossless`` and ``lossy``.

The ``near_lossless`` configuration preset is used for images that you want to convert to WebP with minimal quality loss. Under the hood, the bundle never uses the ``near_lossless`` preset for JPEG or TIFF images or for imahgs that contain more than 20000 colors.

The ``lossy`` configuration preset is the default preset, it offers a good balance between quality and file size for most images.

If the ``near_lossless`` preset is used by the processor, it will check that the processing result is not larger than the original image, and that the ratio between the resulting image pixels area and its file size is staisfying. If the processor finds it is necessary, it will fall back to the ``lossy`` preset.

The various confioguration keys are mapped to `the official cwebp options <https://developers.google.com/speed/webp/docs/cwebp>`:

- ``quality``: ``-q``
- ``method``: ``-m``
- ``metadata``: ``-metadata``
- ``near_lossless``: ``-near_lossless``
- ``af``: ``-af``
- ``pass``: ``-pass``

gif2webp processor options
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``gif2webp`` processor is used to convert GIF images to WebP format. Its configuration keys are mapped to `the official gif2webp options <https://developers.google.com/speed/webp/docs/gif2webp>`:

- ``lossy``: ``-lossy``
- ``metadata``: ``-metadata``
- ``min_size``: ``-min_size``

gifsicle processor options
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``gifsicle`` processor is used to convert GIF images into other GIF files. It supports the following configuration keys, that are mapped to `the official gifsicle options <https://www.lcdf.org/gifsicle/man.html>`:

- ``optimize``: ``--optimize``
- ``lossy``: ``--lossy``
- ``colors``: ``--colors``

imagine processor options
~~~~~~~~~~~~~~~~~~~~~~~~~

The ``imagine`` processor is used to convert GIF, HEIF, JPEG, PNG, TIFF or WEBP images to the GIF, JPEG, PNG or TIFF format using `the Imagine library <https://github.com/php-imagine/Imagine>`. It supports the following configuration keys:

- ``jpeg_quality``: the quality of the JPEG images, from 0 to 100 (default: 80). It is mapped to Imagine's ``jpeg_quality`` option
- ``png_quality``: the quality of the PNG images, from 0 to 100 (default: 80). It is mapped to Imagine's ``png_compression_level`` and ``png_compression_filter`` options
- ``quality``: the quality of the images, from 0 to 100 (default: 80). It is mapped to Imagine's ``quality`` option

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
