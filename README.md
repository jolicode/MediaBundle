# JoliMediaBundle

This bundle provides a tools to manage media in Symfony applications and embed a full-featured media library in your admin.

- processors to transform media (crop / resize / etc.)
- [EasyAdmin](https://symfony.com/bundles/EasyAdminBundle/current/index.html) and [SonataAdmin](https://symfony.com/bundles/SonataAdminBundle/current/index.html) integrations
- processors to transform media (crop / resize / etc.)
- fine-tuned post-processors to optimize the size and quality of media variations
- CLI commands to manage your media libraries from the command line
- Twig components to display media using HTML best practices
- events to allow hooking into the media processing pipeline
- an integration with Doctrine entities, so you can easily link media with your entities
- debug toolbar and profiler panel to monitor media processing in your application

![The MediaBundle provides integrations with Easyadmin and Sonata Admin](doc/images/bridges/easyadmin/grid-view.png)

## Installation

JoliMediaBundle requires Symfony 7+. It can be installed via Composer:

```
composer require jolicode/media-bundle
```

## Documentation

Read the detailed [documentation of the bundle](doc/index.rst).

## License

This software is published under the [MIT License](LICENSE.md).

## Sponsor

This bundle is sponsored by [JoliCode](https://jolicode.com) and its [Animated GIF training](https://jolicampus.com/formations/gif-anime).
