Concepts
========

.. meta::
    :description: The terms used in the JoliMediaBundle documentation: library, storages, variation, transformer, processor, pre-processor, post-processor, converter and resolver.

The bundle uses multiple terms that are defined below.

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
