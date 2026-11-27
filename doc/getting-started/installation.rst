Installation
============

.. meta::
    :description: Install JoliMediaBundle in a Symfony application: require it with Composer, register the bundle, install the image tools and configure it.

To install the JoliMediaBundle, you need to follow these steps:

1. **Install the bundle** using Composer:

.. code-block:: terminal

   $ composer require jolicode/media-bundle

2. **Register the bundle** in your Symfony application. If you are using Symfony Flex, this should be done automatically. If not, add the following line to your ``config/bundles.php`` file::

    return [
        // ...
        JoliCode\MediaBundle\JoliMediaBundle::class => ['all' => true],
    ];

3. Install the `software dependencies <../getting-started/dependencies-and-tooling.rst>`_
4. Configure the bundle according to your needs. You can find the configuration options `in the Configuration section <../getting-started/configuration.rst>`_ of the documentation.

Additionally, define the routes for the media library in your routing configuration:

.. code-block:: yaml

    # filepath: config/routes/joli_media.yaml
    _joli_media:
        resource: "@JoliMediaBundle/config/routes.php"

Versioning and stability
------------------------

The bundle is released in 0.x versions. A minor version (0.10.0, 0.11.0...) may break backward compatibility, while a patch version (0.11.1...) only fixes bugs.

Each change that breaks backward compatibility is listed at the top of the release in the `CHANGELOG <https://github.com/jolicode/MediaBundle/blob/main/CHANGELOG.md>`_, with a ``bc break`` label and the way to adapt your code. Read it before upgrading to a new minor version, and require the bundle with a constraint such as ``^0.11`` that does not cross minor versions.
