# JoliMediaSyliusBundle

This bundle provides an integration of [JoliMediaBundle](../../../README.md) with [Sylius](https://sylius.com/) and [Sylius Stack](https://stack.sylius.com/).

It features:

 * a media library to manage media in the Sylius admin
 * a media browser to select media in Sylius forms
 * form extensions to pick the images of the products, taxons and admin users from the media library
 * templates to display these images in the admin and the shop with JoliMediaBundle

## Installation

This bundle is available as a bridge between JoliMediaBundle and Sylius. It is automatically installed when installing JoliMediaBundle.

In order to enable the bundle, please add the following line in your `bundles.php`:

```php
return [
    // ...
    JoliCode\MediaBundle\Bridge\Sylius\JoliMediaSyliusBundle::class => ['all' => true],
];
```

Then define the routes to the media library:

```yaml
_joli_media_sylius:
    resource: "@JoliMediaSyliusBundle/src/Admin/Controller/"
    prefix: /admin/media
```

And import the configuration of the bundle:

```yaml
# config/packages/joli_media_sylius.yaml
imports:
    - { resource: '@JoliMediaSyliusBundle/config/app.php' }
```

The [Sylius bridge documentation](../../../doc/bridges/sylius.rst) explains how to configure the Sylius resources, the forms and the templates.
