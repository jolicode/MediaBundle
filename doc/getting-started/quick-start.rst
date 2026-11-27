Quick start
===========

.. meta::
    :description: Display your first image variation with JoliMediaBundle in a few minutes: install the bundle, configure a storage and a variation, and use the Twig component.

This page takes you from an empty Symfony application to a resized image displayed in a page. It only needs the ``imagick`` PHP extension: the admin bridges and the optimization tools can be added later.

Install the bundle
------------------

Install the bundle along with `league/flysystem-bundle <https://github.com/thephpleague/flysystem-bundle>`_, which configures the storages:

.. code-block:: terminal

    $ composer require jolicode/media-bundle league/flysystem-bundle

The recipe of the bundle comes from the ``symfony/recipes-contrib`` repository: when Composer asks whether to execute it, answer yes. It registers the bundle and creates its configuration and routing files. Otherwise, register the bundle yourself in ``config/bundles.php``, as explained in the `installation page <installation.rst>`_.

Make sure that the ``imagick`` PHP extension is enabled. On a Debian-based system:

.. code-block:: bash

    sudo apt install php-imagick

Configure the storages
----------------------

The bundle stores the original files in one storage, and the generated variations in another one. Define them as two local directories:

.. code-block:: yaml

    # config/packages/flysystem.yaml
    flysystem:
        storages:
            media.original.storage:
                adapter: 'local'
                options:
                    directory: '%kernel.project_dir%/public/media/original'
            media.cache.storage:
                adapter: 'local'
                options:
                    directory: '%kernel.project_dir%/public/media/cache'

Define a variation
------------------

Declare a library that uses these storages, with a ``thumbnail`` variation:

.. code-block:: yaml

    # config/packages/joli_media.yaml
    joli_media:
        libraries:
            default:
                original:
                    flysystem: media.original.storage
                    url_generator:
                        path: /media/original/
                cache:
                    flysystem: media.cache.storage
                    url_generator:
                        path: /media/cache/
                variations:
                    thumbnail:
                        transformers:
                            thumbnail:
                                width: 400
                                height: 300

The ``path`` options must match the directories of the storages, seen from the ``public/`` directory: the web server serves the files that exist, and the bundle generates the ones that do not.

Import the routes
-----------------

The recipe creates this file. Check that it exists:

.. code-block:: yaml

    # config/routes/joli_media.yaml
    _joli_media:
        resource: '@JoliMediaBundle/config/routes.php'

Display an image
----------------

Copy an image in the storage of the originals, for example ``public/media/original/photo.jpg``, then display it in any template of your application:

.. code-block:: html+twig

    <twig:joli:Img path="photo.jpg" variation="thumbnail" alt="A photo"/>

The component outputs:

.. code-block:: html

    <img
        src="/media/cache/thumbnail/photo.jpg"
        loading="lazy"
        decoding="async"
        alt="A photo"
        width="400"
        height="300"
    >

Start the application, for example with ``symfony serve``, and open the page. The first request to ``/media/cache/thumbnail/photo.jpg`` generates the variation and stores it in ``public/media/cache/thumbnail/photo.jpg``. The following requests are served directly by the web server.

Next steps
----------

- Describe other `variations <../variations/variations.rst>`_ with the `transformers <../variations/transformers.rst>`_, and generate WebP and high-density versions.
- Use the ``joli:Picture`` `Twig component <../misc-features/twig-components.rst>`_ to output responsive markup.
- Add a media library to your admin with the `EasyAdmin, SonataAdmin or Sylius bridges <../bridges/index.rst>`_.
- Install the `optional tools <dependencies-and-tooling.rst#optional-tools>`_ that optimize the variations.
- Link media to your entities with the `Doctrine type <../misc-features/using-in-doctrine-entities.rst>`_.
