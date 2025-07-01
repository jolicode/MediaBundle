# JoliMediaEasyAdminBundle

This bundle provides an integration of [JoliMediaBundle](../../README.md) with [EasyAdminBundle](https://github.com/EasyCorp/EasyAdminBundle)

It features:

 * a media library to manage media in EasyAdmin
 * a media browser to select media in EasyAdmin forms
 * a media preview in EasyAdmin list views

## Installation

This bundle is available as a bridge between JoliMediaBundle and EasyAdminBundle. It is automatically installed when installing JoliMediaBundle.

in order to enable the bundle, please add the following line in your `bundles.php`:

```php
return [
    // ...
    JoliCode\MediaBundle\Bridge\EasyAdmin\JoliMediaEasyAdminBundle::class => ['all' => true],
];
```

Also, you must define the routes to the media library:

```yaml
_joli_media_easy_admin:
    resource: "@JoliMediaEasyAdminBundle/src/Controller/"
    prefix: /admin/media
```
