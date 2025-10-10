Variations
==========

Variations describe the multiple versions of a media file. For example, you might want to generate a thumbnail of an image, or a cropped version, or convert the original image in an alternative format. Variations are defined in the configuration file of the MediaBundle.

For example:

.. code-block:: yaml

    admin:
        format: webp
        transformers:
            resize:
                width: 200
                height: 150
                mode: outside
            heighten:
                height: 600

The above configuration defines a *variation* that will output WebP files that are 600px tall.

First, it resizes the images in order to generate a new, non distorded image, able to contain a 200x150 box. If the original image is smaller than 200x150, it will be expanded. If the original image is larger than 200x150, it will be downsized to exactly containe the 200x150 box.

The heighten transformer will then ensure that the image is 600 pixels tall, upscaling it if required.

This detailed transformation plan is actually processed in only one step, when possible (ie., The image is not resized **then** heightened, but resized and heightened in one go). The `debug tooling <../misc-features/debug-tooling.rst>`_ offered by the bundle can provide information about the processing steps that have actually been performed.

Configuration options
---------------------

Variations expose some configuration options that can be used to customize their behavior:

enable_auto_webp
~~~~~~~~~~~~~~~~

This is a boolean that enables the automatic generation of WebP variations for the media.

When enabled, if the variation format is not already forced to "webp", the variation will be duplicated in WebP format, in addition to the original format. This will create a new variation with the same name as the original one, suffixed with "``_webp``".

For example, if you define a variation named "``thumbnail``" and enable this option, two variations will be generated: "``thumbnail``" (in the original format) and "``thumbnail_webp``" (in WebP format).

If ``enable_auto_webp`` is not defined in a variation, the value of the ``enable_auto_webp`` option defined in the library configuration is used instead.

format
~~~~~~

This is a string that defines the format of the variation. If not set, the original format of the media will be used. If set to "webp", for example, the variation will be generated in WebP format.

.. tip::

    There are chances that, for compatibility reasons, you want to keep the original image format. In this case, you can omit the ``format`` key in the variation configuration. If you wish to generate variations both in the original format and in WebP format, you can define two variations with the same transformers, one without the ``format`` key, and one with the ``format`` key set to ``webp``. A better alternative, however, is to use the ``enable_auto_webp`` configuration directive above, which will automatically generate an additionnal WebP variation.

pixel_ratios
~~~~~~~~~~~~

This setting is useful to easily generate images that are optimized for high-DPI screens (e.g., Retina displays).

This is an array of integers that defines the pixel ratios for which the variation can be generated. When enabled, the variation will be duplicated for each pixel ratio defined in this array, and it will create new variations with the same name as the original one, suffixed with "``@{ratio}x``".

For example, if you define a variation named "``thumbnail``" and set this option to ``[1, 2]``, it will duplicate the variation for pixel ratios 2x, in addition to the 1x version. Two variations will be available: "``thumbnail``" (for the 1x version) and "``thumbnail@2x``" (for the 2x version). You'll be able to explicitely request either variation. If the ``enable_auto_webp`` option is also enabled, the WebP versions will also be generated, resulting in four variations: "``thumbnail``", "``thumbnail@2x``", "``thumbnail_webp``" and "``thumbnail_webp@2x``".

If you use the `twig:joli:Img <../misc-features/twig-components.rst>`_ or  `twig:joli:Picture <../misc-features/twig-components.rst>`_ component with this ``thumbnail`` variation, the generated HTML markup will include all the derivated variations, so that the correct pixel-ratio version is used by devices with higher pixel-density screens.

If ``pixel_ratios`` is not defined in a variation, the value of the ``pixel_ratios`` option defined in the library configuration is used instead.

post_processors
~~~~~~~~~~~~~~~

This allows to override the post-processor options for the variation. This is useful if you want to apply different post-processing options to a variation than the ones defined in the library configuration. The post-processor options are defined in the `post-processors <post-processors.rst>`_ documentation.

processors
~~~~~~~~~~

This allows to override the processor options for the variation. This is useful if you want to apply different processing options to a variation than the ones defined in the library configuration. The processor options are defined in the `processors <processors.rst>`_ documentation.

transformers
~~~~~~~~~~~~

This is an array of transformers that will be applied sequentially to the media to generate the variation. Each transformer is defined by its name and its options. Learn more about `the available transformers <transformers.rst>`_ and their options.

voters
~~~~~~

This is an array of voters that will be used to determine if the variation can be applied to a given media. Voters are used to restrict the use of a variation to a subset of media files. Learn more about `the available voters <variation-voters.rst>`_ and their options.

Full example
------------

Here is a full example of a variation configuration:

.. code-block:: yaml

    joli_media:
        libraries:
            example_library:
                variations:
                    profile_picture:
                        enable_auto_webp: true
                        pixel_ratios: [1, 2, 3]
                        post_processors:
                            jpegoptim:
                                options:
                                    strip_all: false
                                    max_quality: 60
                        processors:
                            imagine:
                                options:
                                    jpeg_quality: 99
                        transformers:
                            thumbnail:
                                width: 100
                                height: 100
                        voters:
                            -
                                type: format
                                format: jpg

Here are some explanations about this configuration:

- ``enable_auto_webp: true``: this will generate the variation in WebP format, in addition to the original format. In other words, you can either explicitely request the ``profile_picture_webp`` variation, which will generate the image in WebP format. If you use the `twig:joli:Picture <../misc-features/twig-components.rst>`_ component, the WebP version will be automatically used by browsers that support it.
- ``pixel_ratios: [1, 2, 3]``: this will generate the variation for pixel ratios 2x and 3x in addition to the 1x version. In other words, you can explicitely request the ``profile_picture@2x`` and ``profile_picture@3x`` variations. If you use the `twig:joli:Picture <../misc-features/twig-components.rst>`_ component, the correct pixel-ratio version will be automatically used by browsers that support it.
- ``post_processors``: this will optimize the JPEG images using jpegoptim with a maximum quality of 60.
- ``processors``: this will ensure that, if the Imagine processor is used, it will use a JPEG quality of 99.
- ``transformers``: this will crop the images to fit within a 100x100 box at 1x scale (so, the 2x and 3x versions will respectively generate 200x200 and 300x300 images).
- ``voters``: this will ensure that the variation will only be applied to JPEG images, as defined by the "format" voter.
