Dependencies and tooling
========================

The JoliMediaBundle has a few dependencies and uses some tools to ensure the quality of the code and the media processing. Unlike other Symfony bundles related to media management (for example ``LiipImagineBundle``), it does not require any external library to process media, and does not depend on any specific image processing library. Instead, it directly wraps common image processing software such as `cwebp <https://developers.google.com/speed/webp/docs/cwebp>`_, `gifsicle <https://www.lcdf.org/gifsicle/>`_, `imagemagick <https://imagemagick.org/>`_, `jpegoptim <https://github.com/tjko/jpegoptim>`_, `mozjpeg <https://github.com/mozilla/mozjpeg>`_, `oxipng <https://github.com/shssoichiro/oxipng>`_ and `pngquant <https://pngquant.org/>`_, which are all available on most systems and can be installed using the package manager of your choice (``apt``, ``brew``, etc.).

A typical Debian-based system can install the required dependencies using the following commands:

.. code-block:: bash

    sudo apt install \
        exiftran \
        file \
        gifsicle \
        imagemagick \
        jpegoptim \
        libmagickcore-dev \
        pngquant

Some tools are not available in the default repositories, so you will need to install them manually. The following commands will install all such tools:

.. code-block:: bash

    cd /tmp \
        && wget -O libwebp-1.5.0-linux-x86-64.tar.gz https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.5.0-linux-x86-64.tar.gz \
        && tar xzvf libwebp-1.5.0-linux-x86-64.tar.gz \
        && cp libwebp-1.5.0-linux-x86-64/bin/cwebp /usr/local/bin/cwebp \
        && cp libwebp-1.5.0-linux-x86-64/bin/gif2webp /usr/local/bin/gif2webp

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

Once the dependencies are installed, make sure to `configure the bundle <configuration.rst#processors-configuration>`_ to use them.
