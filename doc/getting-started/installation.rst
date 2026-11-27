Installation
============

.. meta::
    :description: Install JoliMediaBundle in a Symfony application: require it with Composer, register the bundle, install the image tools and configure it.

Installation steps
------------------

To install JoliMediaBundle, you need to follow these steps:

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

Requirements
------------

.. list-table::
    :header-rows: 1

    * - Dependency
      - Supported versions
    * - PHP
      - 8.2 or later, with the ``ctype``, ``iconv`` and ``mbstring`` extensions, and one of the ``imagick``, ``gmagick`` or ``gd`` extensions (see the `dependencies <dependencies-and-tooling.rst>`_)
    * - Symfony
      - 7 or 8

Optional dependencies
~~~~~~~~~~~~~~~~~~~~~

The admin bridges require the admin they integrate with:

.. list-table::
    :header-rows: 1

    * - Dependency
      - Supported versions
    * - EasyAdmin, for the EasyAdmin bridge
      - 4.26 or later, and 5
    * - SonataAdminBundle, for the SonataAdmin bridge
      - 4
    * - Sylius, for the Sylius bridge
      - 2.1.14 or later in the 2.1 branch, 2.2.5 or later in the 2.2 branch
    * - Sylius Stack, for the Sylius bridge
      - ``sylius/bootstrap-admin-ui`` 0.12.2 or later in the 0.12 branch, ``sylius/grid-bundle`` 1.16 or later in the 1.x branch

The continuous integration runs the tests on PHP 8.3 to 8.6, with the latest versions of Symfony and of the admin bundles that each PHP version allows, and with several releases of EasyAdmin, from 4.29 to the latest 5.x.

Versioning and stability
------------------------

The bundle is released in 0.x versions. A minor version (0.10.0, 0.11.0...) may break backward compatibility, while a patch version (0.11.1...) only fixes bugs.

Each change that breaks backward compatibility is listed at the top of the release in the `CHANGELOG <https://github.com/jolicode/MediaBundle/blob/main/CHANGELOG.md>`_, with a ``bc break`` label and the way to adapt your code. Read it before upgrading to a new minor version, and require the bundle with a constraint such as ``^0.11`` that does not cross minor versions.
