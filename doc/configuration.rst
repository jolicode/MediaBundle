Configuration
=============

The bundle can be configured in the ``config/packages/joli_media.yaml`` file with directives under the ``joli_media`` key:

- ``libraries``: defines the media libraries configuration
- ``default_library``: defines the library to use by default
- ``processors``: defines the media processors configuration
- ``post_processors``: defines the media post processors configuration

Libraries configuration
-----------------------

The ``libraries`` configuration defines where and how the media files are stored. The ``libraries`` configuration node contains the definition of multiple libraries, as there might be in your application several locations where media can be stored - for example, user uploaded profile pictures, product images provided by your internal `Digital asset management <https://en.wikipedia.org/wiki/Digital_asset_management>`_ platform, etc.

.. tip::

    Read more about how the JoliMediaBundle stores media files in the `Storage documentation <storage.rst>`_.

Each library can have its own configuration for the original media and the cache media, as well as the variations that can be created from the original media.

A library is defined by a name and contains the multiple information:

- ``original``: the configuration of the original media storage:

  - the ``flysystem`` key contains the id of a Flysystem service that addresses the location where original media are stored. Flysystem is a filesystem abstraction library that allows you to easily swap out a local filesystem for a remote one. The Flysystem service must be defined in the Symfony configuration. You can eithier define it by yourself, or use the `league/flysystem-bundle <https://github.com/thephpleague/flysystem-bundle>`_ or `oneup/flysystem-bundle <https://github.com/1up-lab/OneupFlysystemBundle>`_ to ease up the configuration.
  - its ``url_generator``: the configuration of the way URLs should be generated for the media

    - ``strategy``: the strategy to use to generate the URL.
    - ``path``: the path prefix to use for media URLs

  - ``enable_serve_using_php`` is a boolean (default: ``false``) that enables the ability to serve media files using PHP. By default, for performance reasons, the bundle will not allow serving original media files using PHP. Instead, it is advised to correctly configure the Web server to have media files served as static files. However, there are situations that require media files to be served using PHP (for example, to apply access control). In this case, you can enable this option.
  - ``trash_path``: the path where media files are temporary moved when they are being deleted. If the deletion is not possible (for example, if a listener prevents the deletion), the media file will be restored to its original location. This path is located in the storage and will be hidden in the admin bridges.

- ``cache``: the configuration of the cache media storage:

  - the ``flysystem`` key contains the id of a Flysystem service that addresses the location where cache media are stored.
  - its ``url_generator``: the configuration of the way URLs should be generated for the media variations

- ``variations`` that can be created from the original media. See the `Variation configuration <variations.rst>`_ section for more information
- ``enable_auto_webp`` is a boolean (default: ``false``) that enables the automatic generation of WebP variations for the media. When enabled, the configured variations in the ``variations`` above node will be duplicated in WebP format, in addition to the original format.

Processors configuration
------------------------

The ``processors`` configuration defines the media processors configuration. The library currently supports the following processors:

- ``cwebp``: the processor to convert images to WebP format
- ``gif2webp``: the processor to convert GIF images to WebP format
- ``gifsicle``: the processor to convert GIF images into other GIF files
- ``imagick``: the processor to convert images using the Imagine library

Each processor has a ``binary`` key that defines the path to the binary to use, and an ``options`` key that defines the options to use when executing the binary. The default settings provide a good balance between quality and performance to make sure that the media is optimized while keeping a good quality.

The install location of post-processors binaries can be configured:

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

Post-processors configuration
-----------------------------

Post-processors can be used to optimize the media after the transformation. The library currently supports the following post-processors:

- ``gifsicle``: the post-processor to optimize GIF images
- ``jpegoptim``: the post-processor to optimize JPEG images
- ``mozjpeg``: the post-processor to optimize JPEG images
- ``oxipng``: the post-processor to optimize PNG images
- ``pngquant``: the post-processor to optimize PNG images

TRhere's no specific post-processor for webp images as the webp format is already optimized.

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

Default binary paths
--------------------

If you do not define any specific configuration for the binaries, the bundle will use the following default paths:

- ``/usr/local/bin/cwebp`` for the ``cwebp`` binary
- ``/usr/local/bin/gif2webp`` for the ``gif2webp`` binary
- ``/usr/local/bin/gifsicle`` for the ``gifsicle`` binary
- ``/usr/local/bin/identify`` for the ``identify`` binary
- ``/usr/local/bin/jpegoptim`` for the ``jpegoptim`` binary
- ``/usr/local/bin/cjpeg`` for the ``mozjpeg`` binary
- ``/usr/local/bin/oxipng`` for the ``oxipng`` binary
- ``/usr/local/bin/pngquant`` for the ``pngquant`` binary

Example configuration
---------------------

Here is the default configuration:

.. code-block:: yaml

    joli_media:
        default_library:      default
        libraries:

            # Prototype
            default:
                original:
                    flysystem:               default.original.storage # Required
                    url_generator:
                        path:                /media/original
                    enable_serve_using_php: false
                cache:
                    path:                    default.cache.storage # Required
                    url_generator:
                        path:                /media/cache
                    must_store_when_generating_url: false
                enable_auto_webp:     false
                variations:
                    product:
                        transformers:
                            resize:
                                width:   200
                                height:  200
                                mode:    inside
                                allow_downscale:      true
                                allow_upscale:        true
                        pre_processors:       []
                        voters:
                            -
                                type: folder
                                path: products
    processors:
        cwebp:
            binary:               '%joli_media.binary.cwebp%'
            identify_binary:      '%joli_media.binary.identify%'
            options:
                near_lossless:

                    # Specify the compression factor for RGB channels between 0 and 100
                    quality:              40

                    # Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality
                    method:               6

                    # A list of metadata to copy from the input to the output if present
                    metadata:

                        # Default:
                        - none

                    # Specify the level of near-lossless image preprocessing
                    near_lossless:        0
                lossy:

                    # Specify the compression factor for RGB channels between 0 and 100
                    quality:              75

                    # Specify the compression method to use. This parameter controls the trade off between encoding speed and the compressed file size and quality
                    method:               6

                    # Turns auto-filter on. This algorithm will spend additional time optimizing the filtering strength to reach a well-balanced quality
                    af:                   true

                    # A list of metadata to copy from the input to the output if present
                    metadata:

                        # Default:
                        - none

                    # Set a maximum number of passes to use during the dichotomy used by options -size or -psnr
                    pass:                 10
        gif2webp:
            binary:               '%joli_media.binary.gif2webp%'
            options:

                # Encode the image using lossy compression
                lossy:                true

                # Encode image to achieve smallest size. This disables key frame insertion and picks the dispose method resulting in the smallest output for each frame
                min_size:             true

                # A list of metadata to copy from the input to the output if present
                metadata:

                    # Default:
                    - none
        gifsicle:
            binary:               '%joli_media.binary.gifsicle%'
            options:

                # Attempt to shrink the file sizes of GIF animations. Level determines how much optimization is done; higher levels take longer, but may have better results
                optimize:             3

                # Alter image colors to shrink output file size at the cost of artifacts and noise. Lossiness determines how many artifacts are allowed; higher values can result in smaller file sizes, but cause more artifacts
                lossy:                20

                # Reduce the number of colors to N
                colors:               256
        imagick:
            options:

                # Sets the default image compression quality
                quality:              80

                # Sets the image compression quality for JPEG images
                jpeg_quality:         80

                # Sets the image compression quality for PNG images
                png_quality:          80
    post_processors:
        gifsicle:
            binary:               '%joli_media.binary.gifsicle%'
            options:

                # Attempt to shrink the file sizes of GIF animations. Level determines how much optimization is done; higher levels take longer, but may have better results
                optimize:             3

                # Alter image colors to shrink output file size at the cost of artifacts and noise. Lossiness determines how many artifacts are allowed; higher values can result in smaller file sizes, but cause more artifacts
                lossy:                20

                # Reduce the number of colors to N
                colors:               256
        jpegoptim:
            binary:               '%joli_media.binary.jpegoptim%'
            options:

                # Strip  all (Comment & Exif) markers from output file
                strip_all:            true

                # Force all output files to be progressive
                progressive:          true

                # Sets the maximum image quality factor
                max_quality:          80
        mozjpeg:
            binary:               '%joli_media.binary.mozjpeg%'
            options:

                # Optimize Huffman table
                optimize:             false

                # Create progressive JPEG file
                progressive:          false

                # Compression quality
                quality:              80
        oxipng:
            binary:               '%joli_media.binary.oxipng%'
            options:

                # Optimization level. A higher level means slower, but better compression
                optimization:         4

                # Strip metadata objects
                strip:

                    # Default:
                    - all

                # Use the slower but better compressing Zopfli algorithm
                zopfli:               false
        pngquant:
            binary:               '%joli_media.binary.pngquant%'
            options:

                # Don't save below min, use fewer colors below max
                quality:              75-85

                # Speed/quality trade-off. 1=slow, 4=default, 11=fast & rough
                speed:                4
