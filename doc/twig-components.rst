Twig components
===============

The bundle provides a set of Twig components to display media in your templates using HTML best practices.

<img> tag
---------

The ``img`` tag is the most common way to display images in HTML. The bundle provides a Twig component to generate the ``img`` tag with the correct ``src`` attribute depending on the media and the variation you want to display.

.. code-block:: html+twig

    <twig:joli:Img
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
    />

This outputs an ``img`` tag with the correct ``src`` attribute and default settings:

.. code-block:: html

    <img
        src="/path/to/cache/variation-name/example-image.png"
        alt="Alternative text"
        width="200"
        height="200"
        loading="lazy"
        decoding="async"
    >

If the image is stored in the default library, you can omit the ``library`` attribute, the component will use the default library. If, however, the image is stored in a different library, you can specify the library name:

.. code-block:: html+twig

    <twig:joli:Img
        path="example-image.png"
        variation="variation_name"
        library="library_name"
        alt="Alternative text"
    />

As you can see, the image width and height are automatically set to the media file intrinsic dimensions. The ``loading`` and ``decoding`` attributes are also set to ``lazy`` and ``async`` respectively to improve the page loading performance. This behavior can however be customized by passing additional ``loading`` and ``decoding`` attributes to the component:

.. code-block:: html+twig

    <twig:joli:Img
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
        loading="{{ false }}"
        decoding="{{ false }}"
    />

generates:

.. code-block:: html

    <img
        src="/path/to/cache/variation-name/example-image.png"
        alt="Alternative text"
        width="200"
        height="200"
    >

The ``skipAutoDimensions`` attribute can be used to prevent the component from setting the ``width`` and ``height`` attributes:

.. code-block:: html+twig

    <twig:joli:Img
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
        skipAutoDimensions
    />

generates:

.. code-block:: html

    <img
        src="/path/to/cache/variation-name/example-image.png"
        alt="Alternative text"
        loading="lazy"
        decoding="async"
    >

<picture> tag
-------------

The ``picture`` tag is used to provide multiple sources for an image, allowing the browser to choose the best one depending on the device's screen size, resolution, and other factors. The bundle provides a Twig component to generate the ``picture`` tag with the correct ``srcset`` attribute depending on the media and the variations you want to display.

.. code-block:: html+twig

    <twig:joli:Picture
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
        picture:class="picture-class"
        img:class="image-class"
    />

generates:

.. code-block:: html

    <picture class="picture-class">
        <source
            srcset="/path/to/cache/variation-name-webp/example-image.b79a8399.webp"
            type="image/webp"
            width="200"
            height="200"
        >
        <img
            src="/path/to/cache/variation-name/example-image.png"
            class="image-class"
            alt="Alternative text"
            width="200"
            height="200"
            loading="lazy
            decoding="async"
        >
    </picture>

.. tip::

    Note, in the example above, that a ``source`` tag has been generated for the webp alternative format. This is done automatically if the ``enable_auto_webp`` configuration directive is set to ``true`` in the configuration file. If you want to disable this behavior, you can set the ``enable_auto_webp`` attribute to ``false``.

The ``sources`` attribute can be a bit more fine-grained by providing the precise list of the variations you want to use, for example:

.. code-block:: html+twig

    <twig:joli:Picture
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
        picture:class="picture-class"
        img:class="image-class"
        sources="{{ ['first_variation_name','second_variation_name'] }}"
    />

generates the exact same HTML as the previous example, but with two additionnal ``source`` tags for the variations you specified. Note that these sources come with the right mime-type, and the ``width`` and ``height`` attributes are set to the media file intrinsic dimensions:

.. code-block:: html

    <picture class="picture-class">
        <source
            srcset="/path/to/cache/first-variation-name/example-image.png"
            type="image/png"
            width="400"
            height="400"
        >
        <source
            srcset="/path/to/cache/second-variation-name/example-image.png"
            type="image/png"
            width="300"
            height="300"
        >
        <source
            srcset="/path/to/cache/variation-name-webp/example-image.b79a8399.webp"
            type="image/webp"
            width="200"
            height="200"
        >
        <img
            src="/path/to/cache/variation-name/example-image.png"
            class="image-class"
            alt="Alternative text"
            width="200"
            height="200"
            loading="lazy
            decoding="async"
        >
    </picture>

The HTML ``<img>`` and ``picture`` tags expose a lot of options to customize the output: ``srcset``, ``sizes``, ``type``, ``media``, ``class``, ``style``, etc. The ``joli:Picture`` twig component offers ways to customize all these options to match your requirements. See the example below:

.. code-block:: html+twig

    <twig:joli:Picture
        path="example-image.png"
        variation="variation_name"
        alt="Alternative text"
        picture:class="picture-class"
        img:class="image-class"
        sources="{{ [
            {
                media: '(width > 1024px)',
                sizes: '1920px',
                srcset: {
                    '1920w': 'variation-large',
                    '2560w': 'variation-extra-large'
                }
            },
            {
                media: '(width > 768px)',
                sizes: '1024px',
                srcset: {
                    '1024w': 'variation-medium',
                    '1600w': 'variation-large'
                }
            },
        ] }}"
    />

This will generate the following HTML:

.. code-block:: html

    <picture class="picture-class">
        <source
            media="(width > 1024px)"
            sizes="1920px"
            srcset="
                /media/cache/variation-large/example-image.png 1920w,
                /media/cache/variation-extra-large/example-image.png 2560w
            "
            type="image/png"
            width="1920"
            height="1280"
        >
        <source
            media="(width > 1024px)"
            sizes="1920px"
            srcset="
                /media/cache/variation-large-webp/example-image.b79a8399.webp 1920w,
                /media/cache/variation-extra-large-webp/example-image.b79a8399.webp 2560w
            "
            type="image/webp"
            width="1920"
            height="1280"
        >
        <source
            media="(width > 768px)"
            sizes="1024px"
            srcset="
                /media/cache/variation-small/example-image.png 1024w,
                /media/cache/variation-large/example-image.png 1600w
            "
            type="image/png"
            width="1024"
            height="683"
        >
        <source
            media="(width > 768px)"
            sizes="1024px"
            srcset="
                /media/cache/variation-small-webp/miexample-imagere.b79a8399.webp 1024w,
                /media/cache/variation-large-webp/example-image.b79a8399.webp 1600w
            "
            type="image/webp"
            width="1024"
            height="683"
        >
        <source
            srcset="/media/cache/variation-name-webp/example-image.b79a8399.webp"
            type="image/webp"
            width="200"
            height="200"
        >
        <img
            src="/path/to/cache/variation-name/example-image.png"
            class="image-class"
            alt="Alternative text"
            width="200"
            height="200"
            loading="lazy
            decoding="async"
        >
    </picture>

<source> tag
------------

Would you need even more control over the ``<picture>`` tag, you can use the ``joli:Source`` component. This component generates a ``<source>`` tag with the correct ``srcset`` attribute, depending on the media and the variations you want to display.

For example, the following code:

.. code-block:: html+twig

    <twig:joli:Source
        media="{{ media }}"
        mediaAttr="(width > 1024px)"
        sizes="1024px"
        srcset="{{ {
            '1920w': 'variation-large',
            '2560w': 'variation-extra-large'
        } }}"
    />

will generate the following HTML:

.. code-block:: html

    <source
        media="(width > 1024px)"
        sizes="1024px"
        srcset="
            /media/cache/variation-large/example-image.png 1920w,
            /media/cache/variation-extra-large/example-image.png 2560w
        "
        type="image/png"
        width="1920"
        height="1280"
    >

If the list of the variation names provided in the ``srcset`` attribute resolve to multiple different mime types, then the component will throw an exception. This is to ensure that the ``<source>`` tag is valid and that the browser can choose the best source depending on the device's screen size, resolution, and other factors. You can fix such cases by using multiple ``twig:joli:Source`` components, one for each mime type.

If you prefer to output the complete HTML by hand and only let the bundle generate media URLs, have a look at `the Twig filters provided by the bundle to generate URLs <url-generation#twig-extension>`_.

When are media variation files generated?
-----------------------------------------

When the ``joli:Img`` or ``joli:Picture`` components are used, the media variation files are by default not generated - only their URL is. This is done to improve the performance of the page loading, as generating the media variation files can be a time-consuming process. Media variation files are usually generated and stored in the cache storage when the variation is requested for the first time (using the ``MediaController`` controller), or on demand using the ``joli:media:convert`` command.

This means that, when using the ``joli:Img`` or ``joli:Picture`` components for displaying a newly created media, that does not yet have variation files, the bundle will not be able to retrieve the mime-type, the dimensions and some other information about the requested media variation files. And, by consequence, the ``<img>`` and ``<picture>`` tags will not be able to set the ``width``, ``height``, ``type``, ``sizes``, etc. attributes.

This could be a problem if you are picky about the HTMl attributes or if you do not want media variatiosn to be generated on the fly. In this case, you can set the ``must_store_when_generating_url`` attribute to ``true`` in the cache storage configuration to have the media variation files generated when the URL is generated:

.. code-block:: yaml

    joli_media:
        libraries:
            default:
                cache:
                    must_store_when_generating_url: true
