JoliMediaBundle
===============

The JoliMediaBundle provides a set of tools to manage media in Symfony applications.

It proposes multiple features:

- `EasyAdmin <https://symfony.com/bundles/EasyAdminBundle/current/index.html>`_ and `SonataAdmin <https://symfony.com/bundles/SonataAdminBundle/current/index.html>`_ integrations
- abstract media storage
- processors to transform media (crop / resize / etc.)
- post processors to optimize the media size
- Twig components to output ``<img>`` and ``<picture>`` tags
- command line tools to generate media variations

Goals and utilities
-------------------

The JoliMediaBundle aims to provide numerous facilities to manage media in Symfony applications:

- `CLI commands <commands.rst>`_ to generate media variations that are high quality yet lightweight
- a `concise yet precise configuration <configuration.rst>`_ to define how media should be stored and processed
- a set of fine-tuned `post-processors <post-processors.rst>`_ to optimize media variations
- `Twig components <twig-components.rst>`_ to display media using best practices
- the ability to generate `URLs for media <url-generation.rst>`_ and their `variations <variations.rst>`_
- `events <events.rst>`_ to allow you to hook into the media processing pipeline
- an `integration with Doctrine entities <using-in-entities.rst>`_ is provided, so you can easily manage media in your entities

The bundle is designed to be extensible and can be easily customized to fit your needs, and fast to minimize the impact on your application's performance.

Table of contents
-----------------

- `Installation <installation.rst>`_
- `Configuration <configuration.rst>`_
- `EasyAdmin Bridge <bridges/easy-admin.rst>`_
- `Sonata Admin Bridge <bridges/sonata-admin.rst>`_
- `Commands <commands.rst>`_
- `Events <events.rst>`_
- `Using in entities <using-in-entities.rst>`_
- `Media deletion behavior <media-deletion-behavior.rst>`_
- `Post-processors <post-processors.rst>`_
- `Twig components <twig-components.rst>`_
- `URL generation <url-generation.rst>`_
- `Tests and QA tooling <tests-and-qa-tooling.rst>`_
- `Variations <variations.rst>`_
- `Variation voters <variation-voters.rst>`_

Vocabulary
----------

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
