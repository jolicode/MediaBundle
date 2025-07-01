# JoliMediaBundle

This bundle provides a set of tools to manage media in Symfony applications.

> [!CAUTION]
> This bundle is currently in beta and is not yet ready for production use. It is under active development and may change significantly in the future. Please use it with caution and report any issues you encounter.

## Installation

JoliMediaBundle requires Symfony 7+. It can be installed via Composer:

```
composer require jolicode/media-bundle
```

## Documentation

Read the detailed [documentation of the bundle](doc/index.rst).

## Dependencies

The library relies on multiple media conversion tools, you will need to install them as well:

 * cwebp
 * gif2webp
 * gifsicle
 * identify (from ImageMagick)
 * Imagine

Optionally, you can install the following tools to allow for more media post-processing (optimization):

 * gifsicle
 * jpegoptim
 * mozjpeg
 * optipng
 * pngquant

## Configuration

The configuration defines several parameters to configure the media management:

 * storages, which are the different media storage locations
 * variations, which are the formats that media can be converted to
 * processors and post-processors, which are the tools used to convert, resize, crop and optimize media files

## License

This software is published under the [MIT License](LICENSE.md).

## Sponsor

This bundle is sponsored by [JoliCode](https://jolicode.com) and its [Animated GIF training](https://jolicampus.com/formations/gif-anime).
