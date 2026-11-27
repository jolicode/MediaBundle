JoliMediaBundle
===============

.. meta::
    :description: JoliMediaBundle manages media in Symfony applications: storage, variations, optimization, Twig components, and EasyAdmin, SonataAdmin and Sylius integrations.

The JoliMediaBundle provides a set of tools to manage media in Symfony applications.

.. tip::

    **Try it without installing anything:** the `demo application <https://mediabundle.jolicode.com/demo/>`_ runs in your browser, compiled to WebAssembly, with its EasyAdmin, SonataAdmin and Sylius admins. Upload your own images and see their variations: nothing leaves your browser. The `demo page <getting-started/demo.rst>`_ explains how to run it locally with Docker.

It provides:

- a `media library <bridges/index.rst>`_ for `EasyAdmin <bridges/easy-admin.rst>`_, `SonataAdmin <bridges/sonata-admin.rst>`_ and `Sylius <bridges/sylius.rst>`_, with a media picker for your forms
- a storage layer built on `Flysystem <storage/storage.rst>`_, for local files as well as object storages
- `variations <variations/variations.rst>`_ that resize, crop and convert the images, then `optimize <variations/post-processors.rst>`_ their size
- `Twig components <misc-features/twig-components.rst>`_ that output ``<img>`` and ``<picture>`` tags, with their ``srcset`` and dimensions
- the `generation of URLs <misc-features/url-generation.rst>`_ and `srcset attributes <misc-features/srcset.rst>`_ from your own code
- a `Doctrine column type <misc-features/using-in-doctrine-entities.rst>`_ to link media to your entities
- `console commands <misc-features/commands.rst>`_ to generate and audit the variations, and a `profiler panel <misc-features/debug-tooling.rst>`_
- `events <misc-features/events.rst>`_ to hook into the creation, move and deletion of media

.. image:: ../images/bridges/easyadmin/grid-view.png
   :alt: The EasyAdmin media library grid view

Goals and approach
------------------

The JoliMediaBundle aims to provide numerous facilities to manage media in Symfony applications, by using the best tools available, and following best practices. It is built on top of the `Flysystem <https://flysystem.thephpleague.com/>`_ library to provide an abstraction layer for file storage, and multiple media processing libraries to handle media transformations and optimizations.

The project seeks to provide:

- a complete set of features to manage media in Symfony applications
- a standard Symfony approach, using services, dependency injection, configuration, and events. The bundle can be installed in an existing Symfony app, without imposing a specific architecture.
- the best tools available to handle media transformations and optimizations
- tools to output media using best practices, such as responsive images with the ``<picture>`` tag, lazy loading, and more

The bundle is designed to be extensible and can be easily customized to fit your needs, and fast to minimize the impact on your application's performance.

The bundle does not aim to provide a complete Digital Asset Management (DAM) solution, but rather to be a flexible and easy-to-use media management library that can be integrated into your Symfony applications. If you need a full DAM solution, you might want to consider other tools that are specifically designed for that purpose.

Design choices
--------------

The bundle relies on a few design choices:

- Media are referenced by their path. There is no media entity and no database table: the files in the storage are the only source of truth. With Doctrine, a `dedicated column type <misc-features/using-in-doctrine-entities.rst>`_ stores this path in your entities.
- Variations are defined in the configuration. The URL of a variation contains its name and the path of the media, nothing else, so a visitor cannot request a size you did not define.
- The `transformers <variations/transformers.rst>`_ of a variation are combined into a single operation when possible, which avoids encoding the image several times.
- ``cwebp``, ``mozjpeg``, ``oxipng`` and other tools are used when they are installed. Without them, the Imagine library and one PHP extension are enough: see the `dependencies <getting-started/dependencies-and-tooling.rst>`_.
- The `Twig components <misc-features/twig-components.rst>`_ output ``srcset``, ``width``, ``height``, a WebP ``<source>`` and lazy loading, including for variations that have not been generated yet.
- When a media is renamed or moved, the Doctrine columns that reference it are updated. When it is deleted, you choose between `emptying the column and refusing the deletion <misc-features/media-deletion-behavior.rst>`_.

.. note::

    You can learn more about the motivations behind the creation of this bundle by reading the `blog post published on JoliCode's blog <https://jolicode.com/blog/jolimediabundle-a-new-media-bundle-for-your-symfony-projects>`_.

Where to start
--------------

- The `quick start <getting-started/quick-start.rst>`_ displays a first image variation in a few minutes.
- The `concepts <concepts.rst>`_ page defines the terms used in this documentation: library, variation, transformer, processor...
- The `admin bridges <bridges/index.rst>`_ add the media library to your back office.
