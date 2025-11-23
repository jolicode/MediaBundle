# Changelog

## [0.1.3] - 2024-11-23

- fix - `Request::get()` deprecation
- fix - no exception when rendering a non resolved media
- fix - view mode switch in EA bridge
- fix - have the bundle work correctly when optional dependencies are not installed

## [0.1.2] - 2024-11-20

- feature - support for Symfony 8.0
- feature - demo application to showcase the bundle features
- fix - remove useless ext-json requirement
- fix - support php 8.2 and test it
- fix - sanitize cache keys to avoid reserved characters validation error
- fix - improve dark mode styles for easyadmin

## [0.1.1] - 2025-11-12

### Added

- Support for AVIF and HEIF image formats

### Fixed

- Fixed the URL of variations displayed in the admin bridges when the image format has an alternative format defined (e.g., tiff or heic to jpeg)

## [0.1.0] - 2025-11-03

This is the initial release of the bundle.

### Added

- EasyAdmin and SonataAdmin integrations
- abstract media storage using Flysystem
- processors to transform media (crop / resize / etc.)
- post processors to optimize the media size
- Twig components to output `<img>` and `<picture>` tags
- CLI commands to generate and inspect media variations that are high quality yet lightweight
- the ability to generate URLs for media and their variations
- events to allow you to hook into the media processing pipeline
- an integration with Doctrine entities, so you can easily manage media in your entities
- debug toolbar and profiler panel to monitor media processing in your application

[0.1.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.1.0
[0.1.1]: https://github.com/jolicode/mediabundle/releases/tag/v0.1.1
[0.1.2]: https://github.com/jolicode/mediabundle/releases/tag/v0.1.2
[0.1.3]: https://github.com/jolicode/mediabundle/releases/tag/v0.1.3
