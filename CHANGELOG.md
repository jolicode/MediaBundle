# Changelog

## [Unreleased]

- feature - The media picked from an EasyAdmin `TextEditorField` toolbar can now be inserted as one of its variations, configured field by field with the new `MediaTextEditorField`, or for the whole project with the `joli_media_easy_admin.text_editor.variation` directive - see the [EasyAdmin bridge documentation](doc/bridges/easy-admin.rst)
- feature - The EasyAdmin media library is now browsed through pretty URLs whenever the application uses EasyAdmin pretty URLs - see the [EasyAdmin bridge documentation](doc/bridges/easy-admin.rst)
- improvement - The admin bridges JavaScript no longer relies on UI classes to find or toggle elements: behavior is hooked on `data-component` attributes, and state on `data-active`, `data-empty`, `data-copied` or the `hidden` attribute
- improvement - Allow `symfony/ux-twig-component` 3.x in addition to 2.x
- fix - `Media` objects are now correctly restored when unserialized, for instance when they are read from the Doctrine second level cache
- fix - The EasyAdmin media selector widget is now rendered when the `MediaChoiceType` is used outside of a `MediaChoiceField`, for instance when it is nested into another form type such as the A2lix `TranslationsType` - see the [EasyAdmin bridge documentation](doc/bridges/easy-admin.rst)

## [0.8.0] - 2026-07-30

- feature - Mutualize the admin bridges duplicated code into the shared `JoliCode\MediaBundle\Bridge` namespace
- fix - The Sylius bridge admin templates no longer hardcode versioned asset filenames
- improvement - The EasyAdmin bridge templates now render every button using the `<twig:ea:Button>` component

## [0.7.0] - 2026-07-29

- feature - Add a global `process_timeout` configuration directive to control the timeout of the external binary processes, with per processor, pre-processor and post-processor overrides
- fix - Fix a `DivisionByZeroError` when applying transformers to a media whose pixel dimensions cannot be determined (e.g. an empty or truncated image file): a typed `UnprocessableMediaException` carrying the media path, library, variation, mime type, format and content size is now thrown instead
- fix - The `joli:media:convert` and `joli:media:batch-convert` commands now continue with the remaining files when the conversion of a file fails, report the failed files and exit with a failure status (previously, a parallelized `batch-convert` silently ignored crashed child processes and reported success)
- fix - The `Imagine` processor now performs the format conversion when a variation has a target format but no dimension change, instead of storing the source bytes untouched under the variation path
- fix - A failing pre-processor no longer prevents the remaining pre-processors of the chain from running
- fix - `Transformation::setBinary()` no longer keeps the dimensions of the previously set binary when the new binary cannot be measured
- fix - The `Expand` transformer now throws an `UnprocessableMediaException` instead of silently skipping the transformation when the binary dimensions are unknown
- fix - `Binary::getPixelDimensions()` now memoizes a failed dimension detection and no longer leaks temporary files on error
- feature - Add `Transformation::hasKnownDimensions()` and `Transformation::hasTransformers()`
- feature - `ConversionPool` now checks the exit code of the child processes and exposes their failures; it also lives in its own autoloadable class file
- fix - Transformer dimension options (`width`, `height`, `start_x`, `start_y`, `position_x`, `position_y`) are now validated and normalized at container compile time: numeric values are cast to integers, and invalid or missing values raise a clear configuration error. The transformer constructors are now typed `int|string` instead of `mixed` (minor BC break for subclasses or float config values)

## [0.6.1] - 2026-07-27

- fix - Allow to use pre-processors defined outside the bundle at the global state

## [0.6.0] - 2026-07-19

- doc - Add a note about the Sylius bridge integration
- feature - Add German, Romanian and Russian translations
- feature - Auto register the EasyAdmin media field to work with the media custom doctrine types
- feature - Allow to search media in the EasyAdmin and Sonata Admin bridges
- fix - Fix production cache:clear crash when DoctrineBundle's metadata warmer runs

## [0.5.0] - 2026-06-09

- feat(Sylius): Decorate the Sylius image uploader
- feat(Sylius): Search in the choose media modal
- fix(Sylius): Fix responsive in choose media modal
- feat(Sylius): Move a directory
- fix(Sylius): Fix media get path

## [0.4.1] - 2026-05-15

- fix - Fix rename directory when there are no media
- fix - Fix create directory action when choosing a media

## [0.4.0] - 2026-05-13

- feature - Filtering and sorting medias & directories
- feature - Add a bridge for a Joli Media Sylius Admin & Shop
- feature - Customize the product images in the Sylius shop
- feature - Allow to use the media on Sylius image resources
- fix - Fix delete modal on Sylius bridge
- docs - Upgrade the database for the sylius resource medias
- docs - Fix a php code block in the Sylius bridge
- docs - Add links to the new Sylius bridge docs
- docs - Customize the product images in the Sylius shop
- docs - Upgrade the database for the sylius resource medias
- docs - Customize the Sylius product grid in the admin panel

## [0.3.2] - 2026-04-10

- fix - Fix move media modal with Easy admin 5

## [0.3.1] - 2026-04-09

- fix - Fix choose modal on Easy admin bridge

## [0.3.0] - 2026-04-09

- feature - Add support for Easy admin 5
- feature - updated frontend deps and compiled public assets
- fix - Restrict Easy admin bundle version
- fix - Fix media removal in EasyAdmin show page

## [0.2.1] - 2025-12-07

- fix - even when the boolean `must_store_when_generating_url` option is set to `true`, the media is not stored when generating a URL using the twig `joli_media_url` filter

## [0.2.0] - 2025-12-01

- feature - added pagination to admin bridges media lists
- fix - Symfony 8.0 compatibility

## [0.1.4] - 2025-11-23

- fix - do not trigger an error when no library is defined

## [0.1.3] - 2025-11-23

- fix - `Request::get()` deprecation
- fix - no exception when rendering a non resolved media
- fix - view mode switch in EA bridge
- fix - have the bundle work correctly when optional dependencies are not installed

## [0.1.2] - 2025-11-20

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
[0.1.4]: https://github.com/jolicode/mediabundle/releases/tag/v0.1.4
[0.2.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.2.0
[0.2.1]: https://github.com/jolicode/mediabundle/releases/tag/v0.2.1
[0.3.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.3.0
[0.3.1]: https://github.com/jolicode/mediabundle/releases/tag/v0.3.1
[0.3.2]: https://github.com/jolicode/mediabundle/releases/tag/v0.3.2
[0.4.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.4.0
[0.4.1]: https://github.com/jolicode/mediabundle/releases/tag/v0.4.1
[0.5.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.5.0
[0.6.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.6.0
[0.6.1]: https://github.com/jolicode/mediabundle/releases/tag/v0.6.1
[0.7.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.7.0
[0.8.0]: https://github.com/jolicode/mediabundle/releases/tag/v0.8.0
