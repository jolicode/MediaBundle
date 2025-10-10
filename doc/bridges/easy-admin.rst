EasyAdmin Integration
=====================

The ``JoliMediaBundle`` provides seamless integration with EasyAdmin, enabling you to manage media directly within your EasyAdmin interface. This integration includes features such as a media library, media browser, and media preview capabilities.

.. image:: ../images/bridges/easyadmin/grid-view.png
   :alt: The EasyAdmin media library grid view

.. image:: ../images/bridges/easyadmin/list-view.png
   :alt: The EasyAdmin media library list view

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
- ``accepted_files``: Specifies the MIME types of files that can be uploaded. You can use wildcards like ``image/*`` or specific types like ``application/pdf``.

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
    use Symfony\Component\Asset\PathPackage;
    use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;

    class ArticleCrudController extends AbstractCrudController
    {
        public function configureAssets(Assets $assets): Assets
        {
            // this should not be needed, but there is a bug in EA with assets in nested forms
            // see https://github.com/EasyCorp/EasyAdminBundle/issues/6127
            $package = new PathPackage(
                '/bundles/jolimediaeasyadmin',
                new JsonManifestVersionStrategy(__DIR__ . '/../../../public/bundles/jolimediaeasyadmin/manifest.json'),
            );

            return $assets
                ->addCssFile($package->getUrl('joli-media-easy-admin.css'))
                ->addJsFile($package->getUrl('joli-media-easy-admin.js'))
            ;
        }

        public function configureFields(string $pageName): iterable
        {
            return [
                CollectionField::new('images')
                    ->setHelp('Add some media to illustrate this article')
                    ->renderExpanded(true)
                    ->useEntryCrudForm(ArticleImagesCrudController::class)
                    ->setEntryIsComplex()
            ];
        }
    }


Trix and `TextEditorField` integration
--------------------------------------

When a `TextEditorField` is used in an EasyAdmin form, a media selector button can added to the toolbar. This allows users to easily insert media into the text editor content. In order to enable this feature, you need to use the form theme provided by the JoliMediaEasyAdminBundle. You can do this by adding the following line to your `configureCrud` method in your EasyAdmin controller::

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->addFormTheme('@JoliMediaEasyAdmin/form/form_theme.html.twig')
        ;
    }

You also need to make sure that the assets for the JoliMediaEasyAdminBundle are configured correctly. This can be done in the `configureAssets` method of your EasyAdmin controller::

    use Symfony\Component\Asset\PathPackage;
    use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;

    public function configureAssets(Assets $assets): Assets
    {
        $package = new PathPackage(
            '/bundles/jolimediaeasyadmin',
            new JsonManifestVersionStrategy(__DIR__ . '/../../../public/bundles/jolimediaeasyadmin/manifest.json'),
        );

        return $assets
            ->addCssFile($package->getUrl('joli-media-easy-admin.css'))
            ->addJsFile($package->getUrl('joli-media-easy-admin.js'))
        ;
    }

Restricting access to the Media library controller
--------------------------------------------------

The Media library controller in the bundle uses Symfony's security voters to control access to its actions. By default, all users are allowed to perform all actions on the media library (provided they can access the EasyAdmin interface, of course). However, you might want to restrict access to certain actions based on your application's requirements, the user identity or roles, etc. For this purpose, you can create your own security voter - just make sure to add the ``joli_media_admin.security.voter`` alias to your voter service so that it overrides the default voter provided by the bundle.

You can implement your own Voter from scratch or extend the ``JoliCode\MediaBundle\Bridge\Security\Voter\MediaVoter`` class and override its methods to implement your custom access logic::

    namespace App\Security\Voter;

    use JoliCode\MediaBundle\Bridge\Security\Voter\MediaVoter as BaseMediaVoter;
    use Symfony\Component\DependencyInjection\Attribute\AsAlias;
    use Symfony\Component\Security\Core\User\UserInterface;

    #[AsAlias(id: 'joli_media_admin.security.voter')]
    class MediaVoter extends BaseMediaVoter
    {
        protected function canDelete(?UserInterface $user, string $libraryName, string $path): bool
        {
            if ('john.doe@example.com' === $user?->getUserIdentifier()) {
                // John Doe can delete any media
                return true;
            }

            if ('public-storage' === $libraryName) {
                // only users with the ROLE_ADMIN role can delete media in the public-storage library
                return \in_array('ROLE_ADMIN', $user?->getRoles() ?? [], true);
            }

            // other users cannot delete media in the private folder
            return !str_starts_with($path, 'private/');
        }
    }


The ``JoliCode\MediaBundle\Bridge\Security\Voter\MediaVoter`` class provides several methods that you can override to customize access control for different actions, such as ``canList``, ``canUpload``, ``canDelete``, etc. You can implement your own logic based on the user, library name, path, or any other criteria relevant to your application:

- ``canList``: Determine if the user can list media in a specific library and path
- ``canShow``: Determine if the user can view a specific media item
- ``canCreateDirectory``: Determine if the user can create a directory in a specific parent folder
- ``canUpload``: Determine if the user can upload media to a specific path
- ``canDelete``: Determine if the user can delete a specific media item
- ``canDeleteDirectory``: Determine if the user can delete a specific directory
- ``canMove``: Determine if the user can move a media item from one path to another
- ``canRenameDirectory``: Determine if the user can rename a specific directory
- ``canRegenerateVariation``: Determine if the user can regenerate a specific variation of a media item
