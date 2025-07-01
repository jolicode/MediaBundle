# JoliMediaSonataAdminBundle

This bundle provides an integration of [JoliMediaBundle](../../README.md) with [SonataAdminBundle](https://sonata-project.org/).

It features:

 * a media library to manage media in SonataAdmin
 * a media browser to select media in SonataAdmin forms
 * a media preview in SonataAdmin list views

## Installation

This bundle is available as a bridge between JoliMediaBundle and SonataAdminBundle. It is automatically installed when installing JoliMediaBundle.

in order to enable the bundle, please add the following line in your `bundles.php`:

```php
return [
    // ...
    JoliCode\MediaBundle\Bridge\SonataAdmin\JoliMediaSonataAdminBundle::class => ['all' => true],
];
```

Also, you must define the routes to the media library:

```yaml
_joli_media_sonata_admin:
    resource: "@JoliMediaSonataAdminBundle/src/Controller/"
    prefix: /admin/media
```
