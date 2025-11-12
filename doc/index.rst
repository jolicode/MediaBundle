JoliMediaBundle
===============

The JoliMediaBundle provides a set of tools to manage media in Symfony applications.

It proposes multiple features:

- `EasyAdmin <bridges/easy-admin.rst>`_ and `SonataAdmin <bridges/sonata-admin.rst>`_ integrations
- abstract media storage
- processors to transform media (crop / resize / etc.)
- post processors to optimize the media size
- Twig components to output ``<img>`` and ``<picture>`` tags
- `CLI commands <misc-features/commands.rst>`_ to generate ad inspect media variations that are high quality yet lightweight
- `Twig components <misc-features/twig-components.rst>`_ to display media using best practices
- the ability to generate `URLs for media <misc-features/url-generation.rst>`_ and their `variations <variations/variations.rst>`_
- `events <misc-features/events.rst>`_ to allow you to hook into the media processing pipeline
- an `integration with Doctrine entities <misc-features/using-in-doctrine-entities.rst>`_ is provided, so you can easily manage media in your entities

.. image:: ../images/bridges/easyadmin/grid-view.png
   :alt: The EasyAdmin media library grid view

🤓 Goals and approach
--------------------

The JoliMediaBundle aims to provide numerous facilities to manage media in Symfony applications, by using the best tools available, and following best practices. It is built on top of the `Flysystem <https://flysystem.thephpleague.com/>`_ library to provide an abstraction layer for file storage, and multiple media processing libraries to handle media transformations and optimizations.

The project seeks to provide:

- a complete set of featrures to manage media in Symfony applications
- a standard Symfony approach, using services, dependency injection, configuration, and events. The bundle cn be installed in an existing Symfony app, without imposing a specific architecture.
- the best tools available to handle media transformations and optimizations
- tools to output media using best practices, such as responsive images with the ``<picture>`` tag, lazy loading, and more

The bundle is designed to be extensible and can be easily customized to fit your needs, and fast to minimize the impact on your application's performance.

The bundle does not aim to provide a complete Digital Asset Management (DAM) solution, but rather to be a flexible and easy-to-use media management library that can be integrated into your Symfony applications. If you need a full DAM solution, you might want to consider other tools that are specifically designed for that purpose.

🤔 Why another media bundle?
---------------------------

There are multiple ways of managing media files in Symfony applications, and several bundles already exist to provide such features. However, most of them are either unmaintained, too complex, or do not follow best practices. Most of the time, managing media files in Symfony applications requires a lot of custom code to assemble multiple libraries, and we end up with a solution that is hard to maintain and does not follow best practices.

The JoliMediaBundle aims to fill this gap by providing a modern, flexible, and easy-to-use solution to manage media in Symfony applications.

🗣️ Vocabulary
-------------

The library uses multiple terms that are defined below.

- **Binary**: A binary represents a file. It can have a content, a size, an extension or a mime type.
- **Library**: A *library* is a structure that describes where the *media* managed by the library are stored. A library also defines the *variations* that can be applied to these media, and where the according *media variations* are stored.
- **Libraries container**: the *libraries container* is a structure that gives access to the *libraries*.
- **OriginalStorage** and **CacheStorage**: The *original storage* describes the place where the original *media* are stored, while the *cache storage* is the storage where the *media variations* are stored. Both storages are grouped in a *library*.
- **Variation**: A *variation* is a set of transformers that can be applied to a *media*, which generates a *media variation* that is stored in a *cache storage*.
- **Transformers** are operations that can successively be applied to a *media* to create a *variation*.
- a **Transformation** is the operation during which a *media* is transformed into a *variation* using the associated *transformers*.
- **Processors** are responsible for executing a *transformation*, that is applying the *transformers* to the *media*.
- **Post-processors** are responsible for optimizing the *variation* after the *transformation*.
- **Pre-processors** are responsible for preparing the *media* before the *transformation*, for example if you need to apply transforms that are not supported by this bundle
- the **Converter** is the conversion service. Given a *media*, it can generate one or more *variations*.
- the **Resolver** service allows to locate a *media* or a *media variation* in a *storage*. It is used by the *converter* to locate the *media* to convert.
