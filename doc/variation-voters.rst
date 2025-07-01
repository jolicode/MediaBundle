Variation voters
================

There are cases where you want to restrict the media that are eligible to be converted using a given variation. For example, you could want to restrict the use of a certain variation to the files located in a specific directory, or to the files that are larger than a minimal size.

The MediaBundle provides a way to define *voters* that can be used to restrict the media that can be converted using a given variation. A voter is a service that implements the ``Joli\MediaBundle\Variation\Voter\VoterInterface`` interface. This interface defines a single method, ``vote(Media $media)``, that should return a boolean indicating whether the voter supports the given media.

Some voter classes are provided by the bundle out of the box and can be configured in the ``config/packages/joli_media.yaml`` file as a ``voters`` key under the variation definition that should use the voter.

For example:

.. code-block:: yaml

    joli_media:
        libraries:
            default:
                cache:
                    variations:
                        profile_picture:
                            transformers:
                                thumbnail:
                                    width: 64
                                    height: 64
                            voters:
                                -
                                    type: folder
                                    path: user/profile_pictures

The above configuration defines a variation named ``profile_picture`` that will only be applied to the media located in the ``user/profile_pictures`` directory.

If the variation is used on a media that is not located in the ``user/profile_pictures`` directory, the variation will not be applied to the media. The converter will skip the media and continue with the next one.

If multiple voters are defined, all the voters must return ``true`` for the variation to be applied to the media.

Why are voters useful?
----------------------

When the number of media is large and the number of variations grows, the number of variations that need to be generated can become very large. By using voters, you can restrict the number of variations that need to be generated, which can save a lot of time and resources.

For example, if a given variation is only used on your website for a very specific subset of your media files, you can define a voter that restricts the use of the variation to this subset of media files. This way, the variation will only be generated for the media files that are actually used on your website, and not for all the media files in your library.

.. tip::

    Voters are facultative. If you don't define any voter for a variation, the variation will be applicable to all the media files in the library. In order to omit voters, simply don't define the ``voters`` key in the variation configuration.

Voter types
-----------

"folder" voter
~~~~~~~~~~~~~~

The "folder" voter has been described in the example above. It restricts the use of the variation to the media located in a specific directory. The voter has the following options:

- ``path``: the path of the directory where the media should be located to be eligible for the variation

"filesize" voter
~~~~~~~~~~~~~~~~

The "filesize" voter restricts the use of the variation to the media that are larger than a minimal size and smaller than a maximal size. The voter has the following options:

- ``min``: the minimal size of the media in bytes
- ``max``: the maximal size of the media in bytes

"format" voter
~~~~~~~~~~~~~~

The "format" voter restricts the use of the variation to the media that have a specific format. The voter has the following options:

- ``format``: the format of the media (for example, "jpeg", "png", "webp", ...)

"mimeType" voter
~~~~~~~~~~~~~~~~

The "mimeType" voter restricts the use of the variation to the media that have a specific MIME type. The voter has the following options:

- ``mime_type``: the MIME type of the media (for example, "image/jpeg", "image/png", "image/webp", ...)

"allOf" voter
~~~~~~~~~~~~~

This particular type of voter allows you to combine multiple voters. The voter will return ``true`` only if all the voters return ``true``. The voter has the following options:

- ``voters``: an array of voters that should all return ``true`` for the voter to return ``true``

"oneOf" voter
~~~~~~~~~~~~~

This particular type of voter allows you to combine multiple voters. The voter will return ``true`` if at least one of the voters returns ``true``. The voter has the following options:

- ``voters``: an array of voters of which at least one should return ``true`` for the voter to return ``true``

For example:

.. code-block:: yaml

    joli_media:
        libraries:
            default:
                cache:
                    variations:
                        profile_picture:
                            transformers:
                                thumbnail:
                                    width: 64
                                    height: 64
                            voters:
                                -
                                    type: format
                                    format: jpg
                                -
                                    type: oneOf
                                    voters:
                                        -
                                            type: mimeType
                                            mime_type: image/png
                                        -
                                            type: allOf
                                            voters:
                                                -
                                                    type: folder
                                                    path: uploaded-files/user-profile-pictures
                                                -
                                                    type: filesize
                                                    max: 100000
                                                    min: 5000
                                        -
                                            type: allOf
                                            voters:
                                                -
                                                    type: folder
                                                    path: archive/user-profile
                                                -
                                                    type: filesize
                                                    max: 2000000
                                                    min: 100000

With the above configuration, the ``profile_picture`` variation will be applied to the media that are in the ``jpg`` format and that are either in the ``image/png`` MIME type or that are in the ``uploaded-files/user-profile-pictures`` directory and have a size between 5KB and 100KB, or that are in the ``archive/user-profile`` directory and have a size between 100KB and 2MB.

There can be up to 3 nesting levels in ``allOf`` or ``oneOf`` voters, which allows to create complex conditions that must be met for the variation to be applied to the media.
