Dependencies and tooling
========================

The JoliMediaBundle has a few dependencies and uses some tools to ensure the quality of the code and the media processing. Unlike other Symfony bundles related to media management (for example ``LiipImagineBundle``), it does not rely on a single PHP image processing library. Instead, it directly wraps common image processing software, which must be installed on the server that runs the application, and uses `the Imagine library <https://github.com/php-imagine/Imagine>`_ as its general-purpose processor.

.. caution::

    The ``cwebp``, ``gif2webp`` and ``gifsicle`` processors are specialized: they can only output WebP and GIF files. Producing a JPEG, PNG or AVIF variation - which is what the admin bridges do for their thumbnails - requires the ``imagine`` processor. It is enabled by default, but it needs a PHP extension that Composer does not install: see `The Imagine library`_ below.

System binaries
---------------

The bundle wraps the following binaries:

- `cwebp and gif2webp <https://developers.google.com/speed/webp/docs/cwebp>`_
- `exiftool <https://exiftool.org/>`_
- `gifsicle <https://www.lcdf.org/gifsicle/>`_
- `ImageMagick <https://imagemagick.org/>`_ (its ``identify`` command)
- `jpegoptim <https://github.com/tjko/jpegoptim>`_
- `mozjpeg <https://github.com/mozilla/mozjpeg>`_
- `oxipng <https://github.com/shssoichiro/oxipng>`_
- `pngquant <https://pngquant.org/>`_

These tools are all available on most systems and can be installed using the package manager of your choice (``apt``, ``brew``, etc.).

A typical Debian-based system can install the required dependencies using the following commands:

.. code-block:: bash

    sudo apt install \
        exiftran \
        file \
        gifsicle \
        imagemagick \
        jpegoptim \
        libheif1 \
        libheif-plugins-all \
        libimage-exiftool-perl \
        libmagickcore-dev \
        pngquant

.. note::

    The ``libheif1`` and ``libheif-plugins-all`` packages are required to handle AVIF and HEIF images with ImageMagick. Depending on your system, the versions provided by the package manager might be outdated and not (fully) support these formats. In this case, you will need to compile ImageMagick from source with HEIF support.

Some tools are not available in the default repositories, so you will need to install them manually. The following commands will install all such tools:

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

The Imagine library
-------------------

The ``imagine`` processor relies on `the Imagine library <https://github.com/php-imagine/Imagine>`_, which is not a system binary but a Composer package. The bundle requires it, so it is installed along with the bundle.

Imagine itself needs one of the ``imagick``, ``gmagick`` or ``gd`` PHP extensions, which Composer does not check. The ``imagine`` processor uses the ``imagick`` one by default, which a Debian-based system can install with:

.. code-block:: bash

    sudo apt install php-imagick

Use the ``driver`` key of the ``imagine`` `processor configuration <../variations/processors.rst>`_ to pick another extension.

Checking the setup
------------------

Once the dependencies are installed, make sure to `configure the bundle <../getting-started/configuration.rst#processors-configuration>`_ to use them, then check that everything is in place:

.. code-block:: terminal

    $ php bin/console joli:media:debug:processors

This command lists the pre-processors, processors and post-processors, tells why some of them are not registered, and checks that the binaries they rely on can be executed. It fails when a registered processor points at a missing binary, so it can be used as a smoke test when deploying.
