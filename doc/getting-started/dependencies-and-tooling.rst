Dependencies and tooling
========================

.. meta::
    :description: What JoliMediaBundle needs to process images: a PHP extension is enough, and optional tools (cwebp, gifsicle, mozjpeg, oxipng...) improve the output.

The bundle processes the images with `the Imagine library <https://github.com/php-imagine/Imagine>`_, which Composer installs along with it. It also wraps common image processing tools, and uses them for the formats they handle when they are installed on the server that runs the application.

The Imagine library is the only requirement. Every other tool listed on this page is optional.

Required: the Imagine library
-----------------------------

The ``imagine`` processor relies on the Imagine library, which is not a system binary but a Composer package. The bundle requires it, so there is nothing to install for the library itself.

Imagine needs one of the ``imagick``, ``gmagick`` or ``gd`` PHP extensions, which Composer does not check. The ``imagine`` processor uses the ``imagick`` one by default, which a Debian-based system can install with:

.. code-block:: bash

    sudo apt install php-imagick

Use the ``driver`` key of the ``imagine`` `processor configuration <../variations/processors.rst>`_ to pick another extension.

With Imagine and this extension alone, the bundle resizes and crops the images, outputs them in the JPEG, PNG, WebP, AVIF and GIF formats, and the `Twig components <../misc-features/twig-components.rst>`_ generate their complete markup.

The bundle detects the MIME type of the files with the ``fileinfo`` PHP extension, which most PHP installations enable. When this extension is not loaded, it falls back to the ``file`` command.

.. note::

    ImageMagick needs the ``libheif1`` and ``libheif-plugins-all`` packages to handle AVIF and HEIF images. Depending on your system, the versions provided by the package manager might be outdated and not (fully) support these formats. In this case, you will need to compile ImageMagick from source with HEIF support.

.. note::

    `Rasterizing SVG images <../variations/processors.rst#rasterizing-svg-images>`_ is optional and disabled by default. When a library or a variation enables it, it requires the ``imagick`` driver, and an ImageMagick built with SVG support, which a Debian-based system provides with the ``libmagickcore-7.q16-10-extra`` package (installed by the ``libmagickcore-dev`` package). Run ``php -r "var_dump(Imagick::queryFormats('SVG'));"`` to check that SVG is supported.

    The internal SVG renderer of ImageMagick, which most distributions ship, draws simple shapes well, but not gradients, masks, filters or CSS: a gradient comes out black. To render such SVG images, set the ``svg_renderer`` setting to ``rsvg-convert``, which uses librsvg instead and works with any driver. A Debian-based system installs it with the ``librsvg2-bin`` package.

Optional tools
--------------

Each of the following tools takes over one task from Imagine, or adds an optimization step:

.. list-table::
    :header-rows: 1

    * - Tool
      - Used for
      - Debian package
      - Environment variable
    * - `cwebp <https://developers.google.com/speed/webp/docs/cwebp>`_
      - Converting JPEG, PNG, TIFF and WebP images to WebP
      - none, see below
      - ``JOLI_MEDIA_CWEBP_BINARY``
    * - `identify <https://imagemagick.org/script/identify.php>`_
      - Counting the colors of an image, for the ``cwebp`` processor
      - ``imagemagick``
      - ``JOLI_MEDIA_IDENTIFY_BINARY``
    * - `gif2webp <https://developers.google.com/speed/webp/docs/gif2webp>`_
      - Converting GIF images, animated or not, to WebP
      - none, see below
      - ``JOLI_MEDIA_GIF2WEBP_BINARY``
    * - `gifsicle <https://www.lcdf.org/gifsicle/>`_
      - Resizing and optimizing GIF images
      - ``gifsicle``
      - ``JOLI_MEDIA_GIFSICLE_BINARY``
    * - `jpegoptim <https://github.com/tjko/jpegoptim>`_
      - Optimizing JPEG variations
      - ``jpegoptim``
      - ``JOLI_MEDIA_JPEGOPTIM_BINARY``
    * - `mozjpeg <https://github.com/mozilla/mozjpeg>`_
      - Optimizing JPEG variations
      - none, see below
      - ``JOLI_MEDIA_MOZJPEG_BINARY``
    * - `oxipng <https://github.com/shssoichiro/oxipng>`_
      - Optimizing PNG variations
      - none, see below
      - ``JOLI_MEDIA_OXIPNG_BINARY``
    * - `pngquant <https://pngquant.org/>`_
      - Optimizing PNG variations
      - ``pngquant``
      - ``JOLI_MEDIA_PNGQUANT_BINARY``
    * - `exiftool <https://exiftool.org/>`_
      - Removing the metadata of the images, with the `ExifRemovalPreProcessor <../variations/pre-processors.rst>`_
      - ``libimage-exiftool-perl``
      - ``JOLI_MEDIA_EXIFTOOL_BINARY``
    * - `rsvg-convert <https://gitlab.gnome.org/GNOME/librsvg>`_
      - `Rasterizing SVG images <../variations/processors.rst#rasterizing-svg-images>`_ with librsvg
      - ``librsvg2-bin``
      - ``JOLI_MEDIA_RSVG_CONVERT_BINARY``

The bundle works without them. A `post-processor <../variations/post-processors.rst>`_ whose binary is not found is skipped, and a warning is logged. A `processor <../variations/processors.rst>`_ that cannot convert an image leaves it to the next one, down to ``imagine``.

.. caution::

    The ``cwebp``, ``gif2webp`` and ``gifsicle`` processors do not replace the ``imagine`` processor: they can only output WebP and GIF files. Producing a JPEG, PNG or AVIF variation, which is what the admin bridges do for their thumbnails, requires ``imagine``, hence the PHP extension above.

Installing the tools
--------------------

A Debian-based system installs the packaged tools, and the libraries that ImageMagick needs for the AVIF, HEIF and SVG formats, with:

.. code-block:: bash

    sudo apt install \
        file \
        gifsicle \
        imagemagick \
        jpegoptim \
        libheif1 \
        libheif-plugins-all \
        libimage-exiftool-perl \
        libmagickcore-dev \
        librsvg2-bin \
        pngquant

The other tools are not available in the default repositories. The following commands install ``cwebp``, ``gif2webp`` and ``oxipng`` in ``/usr/local/bin``, and ``mozjpeg`` in ``/opt/mozjpeg/bin``:

.. code-block:: bash

    cd /tmp \
        && wget -O libwebp-1.6.0-linux-x86-64.tar.gz https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.6.0-linux-x86-64.tar.gz \
        && tar xzvf libwebp-1.6.0-linux-x86-64.tar.gz \
        && cp libwebp-1.6.0-linux-x86-64/bin/cwebp /usr/local/bin/cwebp \
        && cp libwebp-1.6.0-linux-x86-64/bin/gif2webp /usr/local/bin/gif2webp

    cd /tmp \
        && wget -O mozjpeg.tar.gz https://github.com/mozilla/mozjpeg/archive/refs/tags/v4.1.1.tar.gz \
        && tar xzvf mozjpeg.tar.gz \
        && cd /tmp/mozjpeg-4.1.1 \
        && cmake -G"Unix Makefiles" \
        && make \
        && make install

    cd /tmp \
        && wget -O oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz https://github.com/shssoichiro/oxipng/releases/download/v9.1.5/oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz \
        && tar xzvf oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz \
        && cp oxipng-9.1.5-x86_64-unknown-linux-musl/oxipng /usr/local/bin/oxipng

Paths of the binaries
---------------------

The bundle looks for the binaries in ``/usr/local/bin`` by default (``/usr/bin`` for ``rsvg-convert``), whereas ``apt`` installs them in ``/usr/bin``. Tell the bundle where each tool is with its environment variable. For the installation described above, ``cwebp``, ``gif2webp`` and ``oxipng`` are at their default path, and the other ones are not:

.. code-block:: bash

    # .env
    JOLI_MEDIA_EXIFTOOL_BINARY=/usr/bin/exiftool
    JOLI_MEDIA_GIFSICLE_BINARY=/usr/bin/gifsicle
    JOLI_MEDIA_IDENTIFY_BINARY=/usr/bin/identify
    JOLI_MEDIA_JPEGOPTIM_BINARY=/usr/bin/jpegoptim
    JOLI_MEDIA_MOZJPEG_BINARY=/opt/mozjpeg/bin/cjpeg
    JOLI_MEDIA_PNGQUANT_BINARY=/usr/bin/pngquant

The paths can also be set as container parameters or in the configuration of each processor: see the `processors <../variations/processors.rst>`_ and `post-processors <../variations/post-processors.rst>`_ documentation.

Checking the setup
------------------

The following command lists the pre-processors, processors and post-processors, tells why some of them are not registered, and checks that the binaries they rely on can be executed:

.. code-block:: terminal

    $ php bin/console joli:media:debug:processors

It fails when a processor or a post-processor points at a missing binary, so it can be used as a smoke test when deploying. When you chose not to install some of the tools, run it with the ``--no-fail`` option: it reports the missing binaries without failing.
