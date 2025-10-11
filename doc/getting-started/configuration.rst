Configuration
=============

The bundle can be configured in the ``config/packages/joli_media.yaml`` file with directives under the ``joli_media`` key:

- ``libraries``: defines the media libraries configuration
- ``default_library``: defines the library to use by default
- ``processors``: defines the media processors configuration
- ``post_processors``: defines the media post processors configuration

Libraries configuration
-----------------------

The ``libraries`` configuration defines where and how the media files are stored. The ``libraries`` configuration node contains the definition of multiple libraries, as there might be in your application several locations where media can be stored - for example, user uploaded profile pictures, product images provided by your internal `Digital asset management <https://en.wikipedia.org/wiki/Digital_asset_management>`_ platform, etc.

.. tip::

    Read more about how the JoliMediaBundle stores media files in the `Storage documentation <../storage/storage.rst>`_.

Each library can have its own configuration for the original media and the cache media, as well as the variations that can be created from the original media.

A library is defined by a name and contains the multiple information:

- ``original``: the configuration of the original media storage:

  - the ``flysystem`` key contains the id of a Flysystem service that addresses the location where original media are stored. Flysystem is a filesystem abstraction library that allows you to easily swap out a local filesystem for a remote one. The Flysystem service must be defined in the Symfony configuration. You can eithier define it by yourself, or use the `league/flysystem-bundle <https://github.com/thephpleague/flysystem-bundle>`_ or `oneup/flysystem-bundle <https://github.com/1up-lab/OneupFlysystemBundle>`_ to ease up the configuration.
  - its ``url_generator``: the configuration of the way URLs should be generated for the media

    - ``strategy``: the strategy to use to generate the URL.
    - ``path``: the path prefix to use for media URLs. Use a trailing slash to have the media URLs generated correctly.

  - ``enable_serve_using_php`` is a boolean (default: ``false``) that enables the ability to serve media files using PHP. By default, for performance reasons, the bundle will not allow serving original media files using PHP. Instead, it is advised to correctly configure the Web server to have media files served as static files. However, there are situations that require media files to be served using PHP (for example, to apply access control). In this case, you can enable this option.
  - ``trash_path``: the path where media files are temporary moved when they are being deleted. If the deletion is not possible (for example, if a listener prevents the deletion), the media file will be restored to its original location. This path is located in the storage and will be hidden in the admin bridges.

- ``cache``: the configuration of the cache media storage:

  - the ``flysystem`` key contains the id of a Flysystem service that addresses the location where cache media are stored.
  - its ``url_generator``: the configuration of the way URLs should be generated for the media variations

- ``variations`` that can be created from the original media. See the `Variation configuration <../variations/variations.rst>`_ section for more information
- ``enable_auto_webp`` is a boolean (default: ``false``) that enables the automatic generation of WebP variations for the media. When enabled, the configured variations in the ``variations`` above node will be duplicated in WebP format, in addition to the original format.
- ``pixel_ratios``: an array of pixel ratios (default: ``[1]``) that will be applied by default to all variations. For example, if you define a variation named ``thumbnail`` with a width of ``100px``, and the pixel ratios ``[1, 2]``, two variations will be generated: ``thumbnail`` (100px width) and ``thumbnail@2x`` (200px width). You can override this configuration on each variation.

Processors configuration
------------------------

Processors are responsible to apply transformations to the media files. Read the `Processors documentation <../variations/processors.rst>`_ to learn more about how to configure them.

Post-processors configuration
-----------------------------

Post-processors can be used to optimize the media after the transformation. Read the `Post-processors documentation <../variations/post-processors.rst>`_ to learn more about how to configure them.

Example minimal configuration
-----------------------------

Here is an example minimal configuration that defines one library and one variation:

.. code-block:: yaml

    joli_media:
        default_library: default
        libraries:
            default:
                original:
                    flysystem: default.original.storage
                    url_generator:
                        path: /media/original/
                cache:
                    flysystem: default.cache.storage
                    url_generator:
                        path: /media/cache/
                    must_store_when_generating_url: false
                variations:
                    product:
                        transformers:
                            resize:
                                width: 200
                                height: 200
                                mode: inside
                                allow_downscale: true
                                allow_upscale: true

To configure the bundle to your needs, you can explore the following configuration sections:

- `Post-processors configuration <../variations/post-processors.rst>`_
- `Processors configuration <../variations/processors.rst>`_
- `Variations configuration <../variations/variations.rst>`_
