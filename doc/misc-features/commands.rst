Commands
========

The MediaBundle provides some commands to streamline the management of media and their variations.

.. code-block:: terminal

    $ php ./bin/console
      ...
      joli
        joli:media:audit                           Display information about the media and the associated cache files
        joli:media:batch-convert                   Generate media cache files
        joli:media:cache:prune                     Remove files in the media cache storage, that are not associated with any media from the original storage
        joli:media:cache:remove                    Remove media cache files
        joli:media:convert                         Generate media cache files for specific files in a library
        joli:media:debug:processors                Display the pre-processors, processors and post-processors, and whether their binaries are available
      ...


joli:media:audit
----------------

This command can be used to display information about the media and the associated cache files. It can be useful to check the status of the media and the cache files, and to identify potential issues.

.. code-block:: terminal

    $ php ./bin/console joli:media:audit [options]

    Library "build"
    ===============

    ------------------ -----------
    Media count        81
    Media size         1.33 MB
    ------------------ -----------
    Variations count   42
    Variations size    572.64 KB
    ------------------ -----------

    +---------------------------------------+-----------+-----------+-----------+--------------+
    | Path                                  | Size      | Variation | content   | content-webp |
    |                                       |           | s size    |           |              |
    +---------------------------------------+-----------+-----------+-----------+--------------+
    | photos/contact.jpg                    | 123.21 KB | 92.84 KB  | 59.67 KB  | 33.17 KB     |
    | photos/goodies.jpg                    | 40.55 KB  | 29.92 KB  | 19.45 KB  | 10.46 KB     |

    (...)

    | photos/team.jpg                       | 70.93 KB  | -         | ❌        | ❌           |
    | photos/training.jpg                   | 77.89 KB  | 56.16 KB  | 37.23 KB  | 18.93 KB     |
    +---------------------------------------+-----------+-----------+-----------+--------------+

    Library "social_preview"
    ========================

    ------------------ ---------
    Media count        1
    Media size         9.68 KB
    ------------------ ---------
    Variations count   1
    Variations size    9.68 KB
    ------------------ ---------

    +----------------------------------+---------+-----------+----------------+
    | Path                             | Size    | Variation | social-preview |
    |                                  |         | s size    |                |
    +----------------------------------+---------+-----------+----------------+
    | markdown-stress-test-article.png | 9.68 KB | 9.68 KB   | 9.68 KB        |
    +----------------------------------+---------+-----------+----------------+


Options
~~~~~~~

The command supports the following options:

- ``--path``: a path to filter the media path to display. If not provided, all the media will be displayed.
- ``--library``: the name of the library to display. If not provided, all the libraries will be displayed.
- ``--detail``: whether to display detailed information about the media and the variations. If not set, only the count and the size of the media and the variations will be displayed.


joli:media:batch-convert
------------------------

This command can be used to bulk-generate media variations. It is useful when you have a lot of media to generate, or when you want to regenerate all the media variations (after, for example, changing the `variations configuration <../variations/variations.rst>`_).

.. code-block:: terminal

    $ php ./bin/console joli:media:batch-convert [options]

If the ``--parallelization`` option is set, the command will use multiple processes to generate the variations in parallel, which can significantly speed up the process. The ``--chunk-size`` option allows you to control how many media will be processed in each process, to avoid spawning a process for each media. Under the hood, the sub-processes use the ``joli:media:convert`` command to generate the variations.

When a media cannot be converted (for example, an empty or corrupted image file), the command continues with the remaining media, then lists the files that could not be converted and exits with a failure status.

Options
~~~~~~~

The command supports the following options:

- ``--path``: a path to filter the media to process. If not provided, all the media will be processed.
- ``--library``: the name of the library to generate the variations for. If not provided, all the libraries will be processed.
- ``--variation``: the name of the variation to apply to the media. If not provided, all the variations will be generated.
- ``--force``: if set, the command will regenerate all the variations, even if they already exist.
- ``--parallelization``: the number of parallel processes to use. If not provided, the command will perform the conversion sequentially, one media at a time. This option is useful to speed up the conversion process, especially when you have a lot of media to process.
- ``--chunk-size``: the number of media to process in each process. This is useful when using the ``--parallelization`` option, to avoid spawning process to process a single media at a time. The default value is 10, but you can adjust it according to your needs.

.. tip::

    Instead of removing all the content of the media cache folder, which would let your application regenerate cache files on-demand and expose it to a potential performance hit, you can use this command to regenerate all the media variations in a controlled way, using the ``--force`` option to regenerate all the variations, even if they already exist. Combining this approach with the ``joli:media:cache:prune`` command can help you keep your media cache folder clean and up-to-date without impacting the performance of your application.

joli:media:convert
------------------

This command can be used to generate media variations for one or more media. It is useful if you want to generate variations for a specific media.

.. code-block:: terminal

    $ php ./bin/console joli:media:convert [options] <filename>...

Options
~~~~~~~

The command supports the following options:

- ``filename``: the complete path of the media to process. This is a required argument. You can provide multiple filenames, separated by spaces.
- ``--library``: the name of the library to generate the variations for. If not provided, the media will be searched in the default library.
- ``--variation``: the name of the variation to apply to the media. If not provided, all the variations will be generated.
- ``--force``: if set, the command will regenerate all the variations, even if they already exist.

joli:media:cache:prune
----------------------

Use this command to remove files in the media cache storage that are not associated with any media from the original storage - it could be files that were generated by a previous version of the application, or files that were not properly cleaned up by the application, or that were added in the cache folder manually.

.. code-block:: terminal

    $ php ./bin/console joli:media:cache:prune [options]

By default, the command does not remove any file - use the ``force`` option to actually remove the files.

Options
~~~~~~~

- ``--path``: a specific path name to check. All the files under this path will be checked and, if not associated with any media from the original storage, removed
- ``--library``: the name of the library to check.
- ``--variation``: the name of the variation to check.
- ``--force``: force the removal of the orphan cache files. If not set, the command will output the list of the files that would be removed.

joli:media:cache:remove
-----------------------

Use this command to remove media cache files. This can be useful when you want to remove all the media variations for a specific media, or when you want to remove all the media variations for all the media in a specific library.

.. code-block:: terminal

    $ php ./bin/console joli:media:cache:remove [options]

Options
~~~~~~~

- ``--path``: a specific path name to remove cache from. All the cache files associated with media under this path will be removed
- ``--library``: a specific library to remove cache from.
- ``--variation``: a specific variation name to remove cache from.
- ``--force``: force the removal of the cache files. If not set, the command will output the list of the files that would be removed.

Options can be combined, eg:

.. code-block:: terminal

    $ php ./bin/console joli:media:cache:remove --library=media --variation=profile_pictures --path=michel --force

The above command will remove all cache files in the "media" library, for the "profile_pictures" variation, for all media that contain the word "michel" in their path.

joli:media:debug:processors
---------------------------

Use this command to inspect the processing chain: it lists the `pre-processors <../variations/pre-processors.rst>`_, `processors <../variations/processors.rst>`_ and `post-processors <../variations/post-processors.rst>`_, tells why some of them are not registered, and checks that the binaries they rely on can actually be executed.

It is the first thing to run when a variation fails with an error stating that no registered processor can output the requested format, or that every processor failed.

.. code-block:: terminal

    $ php ./bin/console joli:media:debug:processors [options]

    Processors
    ----------

     ---------- ---------------- ----------------------- ---------------------------- ------------------------------------------
      Name       Status           Input formats           Output formats               Binaries
     ---------- ---------------- ----------------------- ---------------------------- ------------------------------------------
      cwebp      binary missing   jpeg, png, webp, tiff   webp                         cwebp: /usr/local/bin/cwebp ok - 1.6.0
                                                                                       identify: /usr/local/bin/identify missing
      gif2webp   registered       gif                     webp                         gif2webp: /usr/local/bin/gif2webp ok
      gifsicle   registered       gif                     gif                          gifsicle: /usr/bin/gifsicle ok
      imagine    registered       avif, gif, heif, ...    avif, gif, jpeg, png, webp   none (runs in the PHP process)
     ---------- ---------------- ----------------------- ---------------------------- ------------------------------------------

The command warns when the registered processors can only output WebP and GIF files, which means that the ``imagine`` processor is not registered. In this situation, any variation that outputs another format will fail.

The command exits with a non-zero status code when a registered processor points at a binary that cannot be executed, so it can be used as a smoke test when deploying the application.

.. note::

    Whether a processor is registered is decided when the container is compiled, but the binaries are looked for when the command runs. This makes the command reliable even when the container is compiled on another machine than the one that runs the application.

Options
~~~~~~~

- ``--no-fail``: always exit successfully, even when a registered processor points at a missing binary.
