Media Storage
=============

The JoliMedia bundle does not directly implement a media storage system. Instead, it heavily relies on the `Flysystem <https://flysystem.thephpleague.com/>`_ library to provide a flexible and extensible storage system.

In the jargon of the ``JoliMediaBundle``, a "Library" describes a collection of Media: how the original media, as added by users or the data source, and the "variations", which are transformed (i.e. reduced in size, or with graphical filters) versions of the original files, are stored.

In order to use the bundle, at least one library must be defined in the configuration - and you can define as many libraries as you want, each with its own configuration:

.. code-block:: yaml

    # config/packages/joli_media.yaml
    joli_media:
        libraries:
            default:
                original:
                    flysystem: "filesystem.original.storage"
                    url_generator:
                        strategy: folder
                        path: /media/original/
                cache:
                    flysystem: "filesystem.cache.storage"
                    url_generator:
                        strategy: folder
                        path: /media/cache/
                enable_auto_webp: false
                variations:
                    banner:
                        format: webp
                        transformers:
                            thumbnail:
                                width: 1920
                                height: 512

                    content:
                        format: webp

Flysystem services
------------------

Both the ``original`` and ``cache`` storages must be defined as Flysystem services. These services can either be defined "manually" in your application, or you can use the `league/flysystem-bundle <https://github.com/thephpleague/flysystem-bundle>`_ or `oneup/flysystem-bundle <https://github.com/1up-lab/OneupFlysystemBundle>`_ to ease up the configuration.

Defining these services "by hand" is done by creating a service that implements the ``League\Flysystem\FilesystemOperator`` interface, and then registering it in the Symfony service container:

.. code-block:: yaml

    # config/services.yaml
    services:
        filesystem.original.adapter:
            class: League\Flysystem\Local\LocalFilesystemAdapter
            arguments:
                '$location': '%kernel.project_dir%/public/media/original'

        filesystem.original.storage:
            class: League\Flysystem\Filesystem
            arguments:
                '$adapter': '@filesystem.original.adapter'

        filesystem.cache.adapter:
            class: League\Flysystem\Local\LocalFilesystemAdapter
            arguments:
                '$location': '%kernel.project_dir%/public/media/cache'

        filesystem.cache.storage:
            class: League\Flysystem\Filesystem
            arguments:
                '$adapter': '@filesystem.cache.adapter'

This snippet defines two Flysystem services: ``filesystem.original.storage`` and ``filesystem.cache.storage``, that are respectivily used to store the original media files and the variations of the media. The services can be named whatever you want, as long as they are referenced in the ``libraries`` configuration of the JoliMediaBundle. Of course, if your application requires multiple libraries, you'll have to define as many Flysystem services as you need.

Serving media directly with a web server
----------------------------------------

For performance reasons, it is advised to serve the media files directly from the web server (e.g. Apache, Caddy, nginx, etc.) instead of going through the Symfony application. This can be done by configuring your web server to serve the files from the directories where the Flysystem services store the media files.

The default Symfony `Web server configuration <https://symfony.com/doc/current/setup/web_server_configuration.html#nginx>`_ includes directives to try to serve static files direcly, with a fallback to the Symfony application if the file is not found. This means that, if a media file is not found or is not readable by the web server, the request will be forwarded to the Symfony application, which can then handle the request and return a 404 error or a custom response. This can be a normal behavior (for example, if a variation is requested but not generated yet), or an error (if the media file is missing, or if the web server application user is missing permissions to access the file).

Serving media with the JoliMedia controllers
--------------------------------------------

The JoliMedia bundle provides `two controllers <https://github.com/jolicode/MediaBundle/blob/main/src/Controller/MediaController.php>`_ to serve media files and their variations:

- The ``variation`` controller tries to resolve a requested media variation, and if it is not found, it tries to generate it on the fly. Subsequent requests for the same variation should be served directly by the webserver (provided the cache storage is accessible by the webserver).
- The ``media`` controller is designed to serve original media files. By default, this controller returns a 404 error, as original media should usually not be served by PHP, but rather by the web server. Silently serving these files using PHP could work, bvut it could also be the sign that the web server is misconfigured, and that the media files are not accessible by the web server application user.

However, there are cases where you might want to serve the original media files through the Symfony application, for example if you need to apply some access control, or if the media files are not stored in a publicly accessible location. In this case, the ``enable_serve_using_php`` configuration option must be set to ``true`` in the original storage configuration:

.. code-block:: yaml

    joli_media:
        libraries:
            private:
                enable_auto_webp: false
                original:
                    enable_serve_using_php: true
                    flysystem: "filesystem.private.original.storage"
                    url_generator:
                        strategy: folder
                        path: /media/original/
                cache:
                    flysystem: "filesystem.private.cache.storage"
                    url_generator:
                        strategy: folder
                        path: /media/cache/
                variations:
                    content:
                        format: webp


.. tip::

    Remember that, by doing to, every request to an original media file will go through the Symfony application, which can have a significant impact on performance. It is therefore recommended to use this option only when necessary, and to ensure that the web server is properly configured to serve the media files directly whenever possible.

Media Property Accessor
-----------------------

To optimize media property access (such as mime type, format, file size, and dimensions), the bundle provides a ``MediaPropertyAccessor`` service. This service caches property values for each media file, using the storage library name, media path, and last modification date as cache keys. This greatly improves performance when listing large media directories, as properties are not recalculated or reloaded from disk for each access.

These cached properties are stored with no expiration time, meaning they remain in the cache until the media file is modified or deleted. If a media file is updated, the last modification date changes, causing the cache key to change and prompting a recalculation of properties on the next access.

In order to avoid requesting the last modification date from the filesystem on each property access, this date is cached based on the library name and the path. This means that if a media file is modified, the last modification date cache must be cleared to ensure that the properties are recalculated correctly. The bundle automatically handles this when media files are added, updated, or deleted through its services, but if you modify media files directly in the storage (e.g., using a custom script or manually), you should clear the last modification date cache for the affected files to ensure accurate property access.
