EasyAdmin Integration
=====================

The ``JoliMediaBundle`` provides seamless integration with EasyAdmin, enabling you to manage media directly within your EasyAdmin interface. This integration includes features such as a media library, media browser, and media preview capabilities.

Enabling the EasyAdmin Integration
----------------------------------

To enable the integration, you need to register the ``JoliMediaEasyAdminBundle`` in your Symfony application. Add the following line to your ``bundles.php`` file::

    // filepath: config/bundles.php
    return [
        // ...
        JoliCode\MediaBundle\Bridge\EasyAdmin\JoliMediaEasyAdminBundle::class => ['all' => true],
    ];

Additionally, define the routes for the media library in your routing configuration:

.. code-block:: yaml

    # filepath: config/routes/joli_media.yaml
    _joli_media_easy_admin:
        resource: "@JoliMediaEasyAdminBundle/src/Controller/"
        prefix: /admin/media

Configuring the EasyAdmin Integration
-------------------------------------

The integration can be configured in the ``config/packages/joli_media_easy_admin.yaml`` file. Below is an example configuration:

.. code-block:: yaml

    joli_media_easy_admin:
        upload:
            max_files: 10
            max_file_size: 20
            accepted_files:
                - image/*
                - video/*
                - application/pdf
        visibility:
            show_variations_stored: true
            show_variations_action_regenerate: true
            show_html_code: true
            show_markdown_code: true

Configuration Options
~~~~~~~~~~~~~~~~~~~~~

The ``upload`` section of the configuration allows you to control the media upload behavior in EasyAdmin:

- ``max_files``: Sets the maximum number of files that can be uploaded at once.
- ``max_file_size``: Sets the maximum file size for uploads (in megabytes).
- ``accepted_files``: Specifies the MIME types of files that can be uploaded. You can use wildcards like `image/*` or specific types like `application/pdf`.

The ``visibility`` section of the configuration allows you to control the visibility of various features in the EasyAdmin media interface:

- ``show_variations_stored``: Enables the display of whether media variations are stored.
- ``show_variations_action_regenerate``: Enables the "Regenerate Variations" action for media.
- ``show_html_code``: Displays the HTML code for embedding media.
- ``show_markdown_code``: Displays the Markdown code for embedding media.

Media selector widget
---------------------

A media selector widget is available for EasyAdmin. You can use it in your admin classes to allow users to select media items easily from the media library::

    use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;

    class ArticleCrudController extends AbstractCrudController
    {
        public function configureFields(string $pageName): iterable
        {
            return [
                MediaChoiceField::new('image')
            ];
        }
    }

The ``MediaChoiceField`` field will render a media selector widget in the form, allowing users to select media items from the media library. A preview of the selected media will be displayed, along with options to upload new media or select existing ones.

This ``setFolder()`` method can be used to specify which folder should be opened by default in the media browser. Note that, if a media was already selected, the media selector will open the folder of the selected media::

    use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;

    class ArticleCrudController extends AbstractCrudController
    {
        public function configureFields(string $pageName): iterable
        {
            return [
                MediaChoiceField::new('image')->setFolder('example-folder')
            ];
        }
    }

The ``MediaChoiceField`` can be nested into a ``CollectionField``, allowing you to manage multiple media items in a single form. This is particularly useful for managing collections of images or other media types::

    use JoliCode\MediaBundle\Bridge\EasyAdmin\Field\MediaChoiceField;

    class ArticleCrudController extends AbstractCrudController
    {
        public function configureFields(string $pageName): iterable
        {
            return [
                CollectionField::new('images')
                    ->setHelp('Add some media to illustrate this article')
                    ->renderExpanded(true)
                    ->useEntryCrudForm(ArticleImagesCrudController::class)
                    ->setEntryIsComplex()
                    // this should not be needed, but there is a bug in EA with assets in nested forms
                    // see https://github.com/EasyCorp/EasyAdminBundle/issues/6127
                    ->addCssFiles($package->getUrl('joli-media-easy-admin.css'))
                    ->addJsFiles($package->getUrl('joli-media-easy-admin.js')),
            ];
        }
    }
