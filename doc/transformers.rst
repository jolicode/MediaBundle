Transformers
============

Transformers represent the successive operations that can be applied to a *media* to create a *variation*.

Available transformers
----------------------

The bundle ships with multiple transformers that aim at allowing for the most common operations on media files. If you have specific needs, you can also implement `your own pre-processor <pre-processors.rst>`_.

Crop
~~~~

This transformer crops a part of the image based on coordinates. It is useful if you want to extract a specific part of the image.

.. code-block:: yaml

    crop:
        start_x: 10%
        start_y: 20%
        width: 50%
        height: 300

If the start coordinates are outside the image, the image will not be modified. If the start coordinates are not defined, the image will be cropped around the center of the image.

If the width or height of the crop area is larger than the image, only the part of the crop area that fits in the image will be used. If the width or height of the crop area is smaller than the image, the image will be cropped to fit the crop area.

Options:

- ``start_x``: the X coordinate of the top-left corner of the crop area. The value can either be an absolute pixel value (e.g. ``300``), or a percentage of the image width (e.g. ``50%``).
- ``start_y``: the Y coordinate of the top-left corner of the crop area. The value can either be an absolute pixel value (e.g. ``300``), or a percentage of the image height (e.g. ``50%``).
- ``width``: the width of the crop area. The value can either be an absolute pixel value (e.g. ``300``), or a percentage of the image width (e.g. ``50%``).
- ``height``: the height of the crop area. The value can either be an absolute pixel value (e.g. ``300``), or a percentage of the image height (e.g. ``50%``).

.. tip::

    This transformer does not resize the image, it only crops it. If you want to resize the image to fit the crop area, you can use the ``thumbnail`` transformer instead.

Expand
~~~~~~

This transformer expands the image to a specific width and height, by adding a background color to the image. It is useful if you want to add a background color to an image that is smaller than the target size, or if you want to create a specific aspect ratio for the image without cropping or distorteding it.

.. code-block:: yaml

    expand:
        width: 600
        height: 400
        background_color: red
        position_x: 100
        position_y: end

Options:

- ``width``: the width of the resulting image. The value can either be an absolute pixel value (e.g. ``600``), or a percentage of the image width (e.g. ``200%`` to double the image width).
- ``height``: the height of the resulting image. The value can either be an absolute pixel value (e.g. ``600``), or a percentage of the image height (e.g. ``200%`` to double the image height).
- ``background_color``: the background color to use for the expansion. The value can be a color name (e.g. ``red``), a hex color (e.g. ``#ff0000``) or an RGB color (e.g. ``rgb(255,0,0)``). If not set, the background color will be transparent for PNG images, and white for JPEG images.
- ``position_x``: the X position of the image in the expanded area. The value can either be an absolute pixel value (e.g. ``300``), a percentage of the image width (e.g. ``50%``), or one of the following: ``start``, ``center``, ``end``. If not set, the image will be centered in the expanded area.
- ``position_y``: the Y position of the image in the expanded area. The value can either be an absolute pixel value (e.g. ``300``), a percentage of the image height (e.g. ``50%``), or one of the following: ``start``, ``center``, ``end``. If not set, the image will be centered in the expanded area.

If the ``width`` or ``height`` is smaller than the original image, the image will be left unchanged.

Heighten
~~~~~~~~

This transformer resizes the image to a specific height, keeping the aspect ratio.

.. code-block:: yaml

    heighten:
        height: 600

Options:

- ``height``: the height of the image. The value can either be an absolute pixel value (e.g. ``600``), or a percentage of the image height (e.g. ``200%`` to double the image height).
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

Resize
~~~~~~

This transformer resizes the image to a specific width and height. There are several resize modes:

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

This transformer resizes the image to a specific width and height and crops it to fit the dimensions exactly. The aspect ratio of the container is not preserved but the aspect ratio of the image content is - cropping will be applied to the image content so it does not look distorted.

If the image is smaller than the specified dimensions, it will be upscaled to fit the dimensions only if the ``allow_upscale`` option is set to ``true``. Else, the image will not be modified.

.. code-block:: yaml

    thumbnail:
        height: 200
        width: 200

Options:

- ``height``: the height of the resulting image
- ``width``: the width of the resulting image
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)
- ``crop_position``: the position of the crop area. The value can be one of the following: ``start``, ``center``, ``end``, or a percentage position from the top left corner.

For example, imagine you have an image that is 900x600 pixels. Applying the ``thumbnail`` transformer with the dimensions ``300x300`` will result in a ``300x300`` image. The image will be cropped to fit the 1:1 aspect ratio, then resized to 300x300 pixels.

By default, the crop area will be centered on the image. If you want to crop the image from the top-left corner, you can set the ``crop_position`` option to ``start``. If you want to crop the image from the bottom-right corner, you can set the ``crop_position`` option to ``end``.

Whith the example above (a ``900x600`` image) and a ``300x300`` thumbnail, the crop area will be defined as follows:

- if you set the ``crop_position`` option to ``25%`` for a ``300x300`` thumbnail, the resulting image will be cropped from ```150x0`` to ``450x300``.
- if you set the ``crop_position`` option to ``50%``, the resulting image will be cropped from ``300x0`` to ``600x300``
- if you set the ``crop_position`` option to ``75%``, the resulting image will be cropped from ``450x0`` to ``750x300``
- if you set the ``crop_position`` option to ``100%``, the resulting image will be cropped from ``600x0`` to ``900x300``.

Widen
~~~~~

This transformer resizes the image to a specific width, keeping the aspect ratio.

.. code-block:: yaml

    widen:
        width: 600

Options:

- ``width``: the width of the image. The value can either be an absolute pixel value (e.g. ``600``), or a percentage of the image width (e.g. ``200%`` to double the image width).
- ``allow_downscale``: whether to allow downscaling the image (default: ``true``)
- ``allow_upscale``: whether to allow upscaling the image (default: ``true``)

Transformers are applied sequentially
-------------------------------------

Transformers are applied in the order they are defined in the configuration file. Each transformer does not translate to an immediate physical operation on the image - instead, a *transformation* is computed, that is a set of operations (cropping, resizing) that will be physically applied to the image if required.

For example, if the transformers defined for a given variation do not produce any change to the image, the image will not be modified, and it will be passed through as-is to the `post-processors <post-processors.rst>`_.

When a media file is converted, the converter will apply the transformers in the order they are defined in the configuration file. With the following example:

.. code-block:: yaml

    my_variation:
        transformers:
            resize:
                width: 200
                height: 150
                mode: inside
            heighten:
                height: 600

The converter will first apply the ``resize`` transformer, then the ``heighten`` transformer, which means that you should get an image 600px tall. The order of the transformers is important: if you swap the order of the transformers in the configuration file, the output will be different (most likely an image contained in a 200x150px rectangle).

If you need to apply the same type of transformation multiple times for a given variation, you can define multiple transformers of the same type. For example, if you want to resize an image to 200x150px, then heighten it to 600px, then resizing it again to 300x200px, you can do it like this:

.. code-block:: yaml

    my_variation:
        transformers:
            -
                type: resize
                width: 200
                height: 150
            -
                type: heighten
                height: 600
            -
                type: resize
                width: 300
                height: 200

Example transformer configurations
----------------------------------

This section provides some example configurations for the transformers. These examples are illustrated using the following image:

.. figure:: images/example.png
   :alt: Example image for the transformers
   :width: 100px

+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| Transformers sequence                    | Original image                | Generated image                                                  |
+==========================================+===============================+==================================================================+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/crop.png                              |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         crop:                            |                               |                                                                  |
|             width: 70                    |                               |                                                                  |
|             height: 40                   |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/crop-position.png                     |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         crop:                            |                               |                                                                  |
|             width: 50                    |                               |                                                                  |
|             height: 50                   |                               |                                                                  |
|             start_x: 50%                 |                               |                                                                  |
|             start_y: 10%                 |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/expand.png                            |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         expand:                          |                               |                                                                  |
|             width: 150                   |                               |                                                                  |
|             height: 200                  |                               |                                                                  |
|             background_color: '#aaffaa'  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/crop-then-expand.png                  |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         crop:                            |                               |                                                                  |
|             width: 60                    |                               |                                                                  |
|             height: 60                   |                               |                                                                  |
|         expand:                          |                               |                                                                  |
|             width: 150                   |                               |                                                                  |
|             height: 200                  |                               |                                                                  |
|             background_color: '#ffccff'  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/crop-then-expand-position.png         |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         crop:                            |                               |                                                                  |
|             width: 60                    |                               |                                                                  |
|             height: 60                   |                               |                                                                  |
|         expand:                          |                               |                                                                  |
|             width: 200                   |                               |                                                                  |
|             height: 150                  |                               |                                                                  |
|             background_color: '#ffccff'  |                               |                                                                  |
|             position_x: end              |                               |                                                                  |
|             position_y: end              |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/heighten.png                          |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         heighten:                        |                               |                                                                  |
|             height: 300                  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/resize-exact.png                      |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         resize:                          |                               |                                                                  |
|             width: 90                    |                               |                                                                  |
|             height: 150                  |                               |                                                                  |
|             mode: exact                  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/resize-inside.png                     |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         resize:                          |                               |                                                                  |
|             width: 90                    |                               |                                                                  |
|             height: 150                  |                               |                                                                  |
|             mode: inside                 |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/resize-outside.png                    |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         resize:                          |                               |                                                                  |
|             width: 90                    |                               |                                                                  |
|             height: 150                  |                               |                                                                  |
|             mode: outside                |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/thumbnail-vertical.png                |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         thumbnail:                       |                               |                                                                  |
|             width: 40                    |                               |                                                                  |
|             height: 120                  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/thumbnail-horizontal.png              |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         thumbnail:                       |                               |                                                                  |
|             width: 120                   |                               |                                                                  |
|             height: 40                   |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/thumbnail-vertical-position-start.png |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         thumbnail:                       |                               |                                                                  |
|             width: 40                    |                               |                                                                  |
|             height: 120                  |                               |                                                                  |
|             crop_position: start         |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/thumbnail-horizontal-position-end.png |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         thumbnail:                       |                               |                                                                  |
|             width: 120                   |                               |                                                                  |
|             height: 40                   |                               |                                                                  |
|             crop_position: end           |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/widen.png                             |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         widen:                           |                               |                                                                  |
|             width: 300%                  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
| .. code-block:: yaml                     | .. image:: images/example.png | .. image:: images/examples/multiple-chained.png                  |
|                                          |                               |                                                                  |
|     transformers:                        |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: crop                   |                               |                                                                  |
|             width: 60                    |                               |                                                                  |
|             height: 60                   |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: expand                 |                               |                                                                  |
|             width: 80                    |                               |                                                                  |
|             height: 80                   |                               |                                                                  |
|             background_color: '#ffcccc'  |                               |                                                                  |
|             position_x: end              |                               |                                                                  |
|             position_y: end              |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: heighten               |                               |                                                                  |
|             height: 100                  |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: expand                 |                               |                                                                  |
|             width: 120                   |                               |                                                                  |
|             height: 120                  |                               |                                                                  |
|             background_color: '#ccffcc'  |                               |                                                                  |
|             position_x: start            |                               |                                                                  |
|             position_y: end              |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: widen                  |                               |                                                                  |
|             width: 140                   |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: expand                 |                               |                                                                  |
|             width: 160                   |                               |                                                                  |
|             height: 160                  |                               |                                                                  |
|             background_color: '#ccccff'  |                               |                                                                  |
|             position_x: start            |                               |                                                                  |
|             position_y: start            |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: resize                 |                               |                                                                  |
|             width: 180                   |                               |                                                                  |
|             height: 180                  |                               |                                                                  |
|             mode: exact                  |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: expand                 |                               |                                                                  |
|             width: 200                   |                               |                                                                  |
|             height: 200                  |                               |                                                                  |
|             background_color: '#ffff44'  |                               |                                                                  |
|         -                                |                               |                                                                  |
|             type: thumbnail              |                               |                                                                  |
|             width: 100                   |                               |                                                                  |
|             height: 100                  |                               |                                                                  |
|                                          |                               |                                                                  |
+------------------------------------------+-------------------------------+------------------------------------------------------------------+
