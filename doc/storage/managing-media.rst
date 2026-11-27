Managing media from your code
=============================

.. meta::
    :description: Create, list, move and delete media from your own Symfony code with JoliMediaBundle, for example to store a file uploaded in a front-end form.

The admin bridges are not the only way to add media: the storage of a library exposes the operations they rely on, so that your own code can create, list, move and delete media. A typical use case is a file uploaded in a front-end form, such as the avatar of a user.

Getting the storage of a library
--------------------------------

The ``LibraryContainer`` service gives access to the libraries, and each library to the storage of its original media::

    use JoliCode\MediaBundle\Library\LibraryContainer;

    class AvatarUploader
    {
        public function __construct(
            private readonly LibraryContainer $libraries,
        ) {
        }

        public function upload(): void
        {
            // the default library, or $this->libraries->get('library_name')
            $storage = $this->libraries->getDefault()->getOriginalStorage();

            // ...
        }
    }

Storing an uploaded file
------------------------

The following controller stores the image uploaded by a user, and links it to the ``avatar`` property of the user entity - a property using the `Doctrine media type <../misc-features/using-in-doctrine-entities.rst>`_::

    namespace App\Controller;

    use App\Entity\User;
    use Doctrine\ORM\EntityManagerInterface;
    use JoliCode\MediaBundle\Library\LibraryContainer;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Attribute\Route;
    use Symfony\Component\Validator\Constraints\Image;

    class AvatarController extends AbstractController
    {
        #[Route('/profile/avatar')]
        public function upload(Request $request, LibraryContainer $libraries, EntityManagerInterface $entityManager): Response
        {
            $form = $this->createFormBuilder()
                ->add('file', FileType::class, [
                    'constraints' => [new Image(maxSize: '5M')],
                ])
                ->getForm()
                ->handleRequest($request)
            ;

            if ($form->isSubmitted() && $form->isValid()) {
                /** @var User $user */
                $user = $this->getUser();
                $file = $form->get('file')->getData();

                $path = \sprintf('avatars/%d.%s', $user->getId(), $file->guessExtension());
                $user->avatar = $libraries->getDefault()->getOriginalStorage()->createMedia($path, $file->getContent());
                $entityManager->flush();

                return $this->redirectToRoute('profile');
            }

            return $this->render('profile/avatar.html.twig', [
                'form' => $form,
            ]);
        }
    }

``createMedia()`` writes the file at the given path, and returns a ``Media`` object. When a file already exists at this path, it is replaced, and its variations are deleted so that they are generated again from the new file. The variations of the new media are then available like any other one:

.. code-block:: html+twig

    <twig:joli:Img media="{{ app.user.avatar }}" variation="avatar" alt=""/>

.. tip::

    Choose the path yourself rather than reusing the name of the uploaded file, which is chosen by the user: it may contain characters you do not want in a URL, collide with another file, or carry an extension which does not match its content. The ``guessExtension()`` method of the uploaded file reads the extension from its content.

The ``Image`` constraint makes sure that the uploaded file is an image. To check the files that are already stored, for example a path submitted by a form, use the `Media constraint <../misc-features/using-in-doctrine-entities.rst#validating-media-in-entities>`_.

The other operations
--------------------

The ``OriginalStorage`` service exposes the other operations on the media and the folders::

    $storage = $libraries->getDefault()->getOriginalStorage();

    // create a folder
    $storage->createDirectory('products');

    // create a media from a string
    $media = $storage->createMedia('products/shoe.jpg', $content);

    // list the media of a folder, as Media objects
    $medias = $storage->listMedias('products', recursive: false);

    // or page by page
    $page = $storage->listMediasPaginated('products', page: 2, perPage: 20);

    // list the paths of the files and folders
    $paths = $storage->listFiles('products');
    $folders = $storage->listDirectories();

    // get a media, or null when it does not exist
    $media = $storage->resolve('products/shoe.jpg');
    $storage->has('products/shoe.jpg');

    // move or rename a media, or a folder
    $storage->move('products/shoe.jpg', 'products/sneaker.jpg');
    $storage->moveFolder('products', 'catalog');

    // delete a media, or a folder and its content
    $storage->delete('catalog/sneaker.jpg');
    $storage->deleteDirectory('catalog');

These methods remove the variations which are no longer valid, and dispatch the `events <../misc-features/events.rst>`_ of the bundle. As a consequence, the `deletion behaviors <../misc-features/media-deletion-behavior.rst>`_ configured on your entities apply, and the Doctrine columns which reference a moved media are updated.

.. note::

    The files written directly in the storage, with Flysystem or by any other means, do not dispatch these events. See the `storage documentation <storage.rst#media-property-accessor>`_ for the cache to clear in this case.
