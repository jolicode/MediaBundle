# hadolint global ignore=DL3008

FROM debian:bookworm-20250407-slim AS joli-media

LABEL org.opencontainers.image.source=https://github.com/jolicode/joli-media-bundle-tests

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        gnupg \
    && curl -sSLo /tmp/debsuryorg-archive-keyring.deb https://packages.sury.org/debsuryorg-archive-keyring.deb \
    && dpkg -i /tmp/debsuryorg-archive-keyring.deb \
    && echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php bookworm main" > /etc/apt/sources.list.d/sury.list \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

ARG PHP_VERSION

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        "php${PHP_VERSION}-apcu" \
        "php${PHP_VERSION}-bcmath" \
        "php${PHP_VERSION}-cli" \
        "php${PHP_VERSION}-common" \
        "php${PHP_VERSION}-curl" \
        "php${PHP_VERSION}-fileinfo" \
        "php${PHP_VERSION}-gd" \
        "php${PHP_VERSION}-iconv" \
        "php${PHP_VERSION}-imagick" \
        "php${PHP_VERSION}-intl" \
        "php${PHP_VERSION}-mbstring" \
        "php${PHP_VERSION}-mysql" \
        "php${PHP_VERSION}-redis" \
        "php${PHP_VERSION}-sqlite3" \
        "php${PHP_VERSION}-simplexml" \
        "php${PHP_VERSION}-uuid" \
        "php${PHP_VERSION}-xml" \
        "php${PHP_VERSION}-xsl" \
        "php${PHP_VERSION}-zip" \
        build-essential \
        cmake \
        wget \
        exiftran \
        file \
        gifsicle \
        imagemagick \
        jpegoptim \
        libmagickcore-dev \
        pngquant \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN cd /tmp \
    && wget -O libwebp-1.5.0-linux-x86-64.tar.gz https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.5.0-linux-x86-64.tar.gz \
    && tar xzvf libwebp-1.5.0-linux-x86-64.tar.gz \
    && cp libwebp-1.5.0-linux-x86-64/bin/cwebp /usr/local/bin/cwebp \
    && cp libwebp-1.5.0-linux-x86-64/bin/gif2webp /usr/local/bin/gif2webp

RUN cd /tmp \
    && wget -O mozjpeg.tar.gz https://github.com/mozilla/mozjpeg/archive/refs/tags/v4.1.1.tar.gz \
    && tar xzvf mozjpeg.tar.gz \
    && cd /tmp/mozjpeg-4.1.1 \
    && cmake -G"Unix Makefiles" \
    && make \
    && make install

RUN cd /tmp \
    && wget -O oxipng-8.0.0-x86_64-unknown-linux-musl.tar.gz https://github.com/shssoichiro/oxipng/releases/download/v8.0.0/oxipng-8.0.0-x86_64-unknown-linux-musl.tar.gz \
    && tar xzvf oxipng-8.0.0-x86_64-unknown-linux-musl.tar.gz \
    && cp oxipng-8.0.0-x86_64-unknown-linux-musl/oxipng /usr/local/bin/oxipng

# Fake user to maps with the one on the host
ARG USER_ID
RUN addgroup --gid 1000 app && \
    adduser --system --uid $USER_ID --home /home/app --shell /bin/bash app

# Configuration
COPY etc/. /etc/
COPY php-configuration /etc/php/${PHP_VERSION}
RUN adduser app sudo \
    && mkdir /var/log/php \
    && chmod 777 /var/log/php \
    && phpenmod app-default \
    && phpenmod app-builder

# Composer
COPY --from=composer/composer:2.8.8 /usr/bin/composer /usr/bin/composer
RUN mkdir -p "/home/app/.composer/cache" \
    && chown app: /home/app/.composer -R

# Third party tools
ENV PATH="$PATH:/home/app/tools/bin"

# Good default customization
RUN cat >> /etc/bash.bashrc <<EOF
PS1='\[\e[01;33m\]\u \[\e[00;32m\]\w\[\e[0m\] '
EOF

WORKDIR /home/app
