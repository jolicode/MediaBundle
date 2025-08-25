Variations
==========

Variations describe the multiple versions of a media file. For example, you might want to generate a thumbnail of an image, or a cropped version, or convert the original image in an alternative format. Variations are defined in the configuration file of the MediaBundle.

For example:

.. code-block:: yaml

    admin:
        transformers:
            resize:
                width: 200
                height: 150
                mode: inside
            heighten:
                height: 600

The above configuration defines a *variation* that will output WebP files with a width of 200 pixels and a height of 150 pixels. If the original image is smaller than 200x150, it will not be resized. If the original image is larger than 200x150, it will be resized to fit within the 200x150 box. The heighten transformer will then ensure that the image is 600 pixels tall, upscaling it if required.

Configuration options
---------------------

Variations expose some configuration options that can be used to customize their behavior:

- ``enable_auto_webp``: is a boolean that enables the automatic generation of WebP variations for the media. When enabled, if the variation format is not already forced to "webp", the variation will be duplicated in WebP format, in addition to the original format.
- ``format``: is a string that defines the format of the variation. If not set, the original format of the media will be used. If set to "webp", for example, the variation will be generated in WebP format.
- ``transformers``: is an array of transformers that will be applied sequentially to the media to generate the variation. Each transformer is defined by its name and its options. Learn more about `the available transformers <transformers.rst>`_ and their options.
- ``post_processors``: this allows to override the post-processor options for the variation. This is useful if you want to apply different post-processing options to a variation than the ones defined in the library configuration. The post-processor options are defined in the `post-processors <post-processors.rst>`_ documentation.
- ``processors``: this allows to override the processor options for the variation. This is useful if you want to apply different processing options to a variation than the ones defined in the library configuration. The processor options are defined in the `processors <processors.rst>`_ documentation.

.. tip::

    There are chances that, for compatibility reasons, you want to keep the original image format. In this case, you can omit the ``format`` key in the variation configuration. If you wish to generate variations both in the original format and in WebP format, you can define two variations with the same transformers, one without the ``format`` key, and one with the ``format`` key set to ``webp``. A better alternative, however, is to use the ``enable_auto_webp`` configuration directive, which will automatically generate an additionnal WebP variation.

