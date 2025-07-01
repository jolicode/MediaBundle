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
                mode: inside
            heighten:
                height: 600

The above configuration defines a *variation* that will output WebP files with a width of 200 pixels and a height of 150 pixels. If the original image is smaller than 200x150, it will not be resized. If the original image is larger than 200x150, it will be resized to fit within the 200x150 box. The heighten transformer will then ensure that the image is 600 pixels tall, upscaling it if required.


.. tip::

    There are chances that, for compatibility reasons, you want to keep the original image format. In this case, you can omit the ``format`` key in the variation configuration. If you wish to generate variations both in the original format and in WebP format, you can define two variations with the same transformers, one without the ``format`` key, and one with the ``format`` key set to ``webp``. A better alternative, however, is to use the ``enable_auto_webp`` configuration directive, which will automatically generate WebP variations for all the variations that do not have a ``format`` key set.

Transformers
------------

heighten
~~~~~~~~

This transform resizes the image to a specific height, keeping the aspect ratio.


.. code-block:: yaml

    heighten:
        height: 600

Options:

- ``height``: the height of the image
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

Resize
~~~~~~

This transform resizes the image to a specific width and height. There are several resize modes:

- ``exact``: in this mode, the image is resized to the exact dimensions specified. The aspect ratio is not preserved.
- ``inside``: in this mode, the image is resized to fit within the dimensions specified. The aspect ratio is preserved.
- ``outside``: in this mode, the image is resized to cover the dimensions specified. The aspect ratio is preserved.

For example, imagine you have an image that is 900x600 pixels.

- resizing in ``exact`` mode to ``300x300`` will result in a ``300x300`` image - the aspect ratio is not preserved
- resizing in ``inside`` mode to ``300x300`` will result in a ``300x200`` image - the aspect ratio is preserved
- resizing in ``outside`` mode to ``300x300`` will result in a ``450x300`` image - the aspect ratio is preserved

Options:

- ``height``: the height of the image
- ``width``: the width of the image
- ``mode``: the resize mode (``exact``, ``inside`` or ``outside``) - default: ``exact``
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

Thumbnail
~~~~~~~~~

This transform resizes the image to a specific width and height and crops it to fit the dimensions exactly. The aspect ratio of the container is not preserved but the aspect ratio of the image content is - cropping will be applied to the image content so it does not look distorted.


.. code-block:: yaml

    thumbnail:
        height: 200
        width: 200

Options:

- ``height``: the height of the image
- ``width``: the width of the image
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

For example, imagine you have an image that is 900x600 pixels. Applying the ``thumbnail`` transformer with the dimensions ``300x300`` will result in a ``300x300`` image. The image will be cropped to fit the 1:1 aspect ratio, then resized to 300x300 pixels.

Widen
~~~~~

This transform resizes the image to a specific width, keeping the aspect ratio.


.. code-block:: yaml

    widen:
        width: 600


Options:

- ``width``: the width of the image
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

Transformers are applied sequentially
-------------------------------------

Transformers are applied in the order they are defined in the configuration file. Each transformer does not translate to an immediate physical operation on the image - instead, a *transformation* is computed, that is a set of operations (cropping, resizing) that will be physically applied to the image if required.

For example, if the transformers defined for a given variation do not produce any change to the image, the image will not be modified, and it will be passed through as-is to the `post-processors <post-processors.rst>`_.

When a media file is converted, the converter will apply the transformers in the order they are defined in the configuration file. With the following example:

.. code-block:: yaml

    admin:
        format: webp
        transformers:
            resize:
                width: 200
                height: 150
                mode: inside
            heighten:
                height: 600

The converter will first apply the ``resize`` transformer, then the ``heighten`` transformer. The order of the transformers is important - if you swap the order of the transformers in the configuration file, the output will be different.
