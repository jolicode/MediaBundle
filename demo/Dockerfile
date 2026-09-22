# syntax=ghcr.io/castor-php/twig-dockerfile:0.1
{#
    Adds the media toolchain JoliMediaBundle relies on to the PHP images of
    castor-php/docker. The binary paths match the JOLI_MEDIA_*_BINARY variables
    of demo/application/.env.
#}
{% extends 'Dockerfile' %}

{% block php_base %}
{{ parent() }}

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        cmake \
        wget \
        exiftran \
        file \
        gifsicle \
        imagemagick \
        jpegoptim \
        libheif1 \
        libheif-plugins-all \
        libimage-exiftool-perl \
        libmagickcore-dev \
        pngquant \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# libwebp: cwebp and gif2webp
RUN cd /tmp \
    && wget -O libwebp-1.6.0-linux-x86-64.tar.gz https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.6.0-linux-x86-64.tar.gz \
    && tar xzvf libwebp-1.6.0-linux-x86-64.tar.gz \
    && cp libwebp-1.6.0-linux-x86-64/bin/cwebp /usr/local/bin/cwebp \
    && cp libwebp-1.6.0-linux-x86-64/bin/gif2webp /usr/local/bin/gif2webp \
    && rm -rf /tmp/libwebp-1.6.0-linux-x86-64*

# mozjpeg: installed in /opt/mozjpeg
RUN cd /tmp \
    && wget -O mozjpeg.tar.gz https://github.com/mozilla/mozjpeg/archive/refs/tags/v4.1.1.tar.gz \
    && tar xzvf mozjpeg.tar.gz \
    && cd /tmp/mozjpeg-4.1.1 \
    && cmake -G"Unix Makefiles" \
    && make \
    && make install \
    && rm -rf /tmp/mozjpeg*

# oxipng
RUN cd /tmp \
    && wget -O oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz https://github.com/shssoichiro/oxipng/releases/download/v9.1.5/oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz \
    && tar xzvf oxipng-9.1.5-x86_64-unknown-linux-musl.tar.gz \
    && cp oxipng-9.1.5-x86_64-unknown-linux-musl/oxipng /usr/local/bin/oxipng \
    && rm -rf /tmp/oxipng-9.1.5-x86_64-unknown-linux-musl*
{% endblock %}

{% block frontend %}
{{ parent() }}

{{ copy('@extra/nginx.conf.twig', '/etc/nginx/nginx.conf') }}
{% endblock %}
