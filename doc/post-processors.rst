Post-processors
===============

Post-processors are responsible for optimizing the media variations after the transformation. They are applied after the transformation has been computed and the media has been transformed to its final shape.

Configuration
-------------

The post-processors configuration is defined in the ``post_processors`` key of the ``joli_media`` configuration. The library currently supports the following post-processors:

- ``gifsicle``: the post-processor to optimize GIF images
- ``jpegoptim``: the post-processor to optimize JPEG images
- ``mozjpeg``: the post-processor to optimize JPEG images
- ``oxipng``: the post-processor to optimize PNG images
- ``pngquant``: the post-processor to optimize PNG images

While there are many other image optimization tools available, these are the ones that are currently supported by the library and that we found are the most efficient to compress images while keeping a good quality.

.. tip::

    Read the documentation page about `dependencies and tooling <dependencies-and-tooling.rst>`_ to learn how to install these tools on your system.
