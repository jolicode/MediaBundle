<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Dto\AssetDto;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\CreateDirectoryType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\DeleteDirectoryType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\DeleteType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\MoveType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\RenameDirectoryType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\RenameType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Form\Type\UploadType;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Paginator\MediaPaginator;
use JoliCode\MediaBundle\Bridge\Security\Voter\AdminAction;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Exception\MediaInUseException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use League\Flysystem\PathTraversalDetected;
use League\Flysystem\UnableToListContents;
use League\Flysystem\UnableToWriteFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

#[Route(name: 'joli_media_easy_admin_')]
class MediaAdminController extends AbstractController
{
    public function __construct(
        private readonly LibraryContainer $libraries,
        private readonly Config $config,
        private readonly Resolver $resolver,
        private readonly Converter $converter,
        private readonly TranslatorInterface $translator,
        private readonly Environment $twig,
        private readonly FormFactoryInterface $formFactory,
        private readonly AdminUrlGenerator $adminUrlGenerator,
        private readonly MediaPaginator $mediaPaginator,
        private readonly ?AuthorizationCheckerInterface $authorizationChecker = null,
    ) {
    }

    #[Route(path: '/create-directory', name: 'create_directory', methods: [Request::METHOD_POST])]
    public function createDirectory(Request $request): RedirectResponse
    {
        $this->denyAccessUnlessGranted(AdminAction::CREATE_DIRECTORY, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
        ));

        $directory = null;
        $form = $this->createCreateDirectoryForm();
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The directory form is not submitted');
        }

        if ($form->isValid()) {
            $parentDirectory = $form->get('parentDirectory')->getData();
            $directory = $form->get('directory')->getData();

            $this->denyAccessUnlessGranted(AdminAction::CREATE_DIRECTORY, new AdminAction(
                libraryName: $this->getLibrary()->getName(),
                path: $parentDirectory,
                to: $directory,
            ));

            if ('' !== $parentDirectory) {
                $directory = \sprintf('%s/%s', $parentDirectory, $directory);
            }

            try {
                $this->getOriginalStorage()->createDirectory($directory);
                $this->addFlash(
                    'success',
                    $this->translator->trans(
                        'directory.created_success',
                        ['%directory%' => $directory],
                        'JoliMediaEasyAdminBundle',
                    )
                );
            } catch (\Exception $e) {
                $directory = $form->get('parentDirectory')->getData() ?? '';
                $this->addFlash(
                    'danger',
                    $this->translator->trans(
                        'directory.created_failure', [
                            '%directory%' => $form->get('directory')->getData(),
                            '%error%' => $e->getMessage(),
                        ], 'JoliMediaEasyAdminBundle',
                    )
                );
            }
        } else {
            $directory = $form->get('parentDirectory')->getData() ?? '';
            $this->addFlash(
                'danger',
                $this->translator->trans(
                    'directory.created_failure', [
                        '%directory%' => $form->get('directory')->getData(),
                        '%error%' => $form->getErrors(true, false),
                    ], 'JoliMediaEasyAdminBundle',
                )
            );
        }

        $intent = match ($form->get('intent')->getData()) {
            'choose' => 'joli_media_easy_admin_choose',
            'choose_directory' => 'joli_media_easy_admin_choose_directory',
            default => 'joli_media_easy_admin_explore',
        };

        return $this->redirect($this->adminUrlGenerator->setRoute(
            $intent,
            ['key' => (string) $directory],
        )->generateUrl());
    }

    #[Route(path: '/delete', name: 'delete', methods: [Request::METHOD_POST])]
    public function delete(Request $request): RedirectResponse
    {
        $key = null;
        $form = $this->createDeleteForm();
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $key = $form->get('path')->getData();

            $this->denyAccessUnlessGranted(AdminAction::DELETE, new AdminAction(
                libraryName: $this->getLibrary()->getName(),
                path: Resolver::normalizePath($key),
            ));

            // Remove the media and the cache files
            try {
                $this->getOriginalStorage()->delete($key);
            } catch (MediaInUseException $e) {
                $this->addFlash(
                    'danger',
                    $this->translator->trans(
                        'media.error.in_use',
                        [
                            '%media%' => $e->getPath(),
                            '%field%' => $e->getPropertyName(),
                            '%entity%' => $e->getEntityName(),
                        ],
                        'JoliMediaEasyAdminBundle'
                    )
                );

                return $this->redirect($this->adminUrlGenerator->setRoute(
                    'joli_media_easy_admin_show',
                    ['key' => $key],
                )->generateUrl());
            }

            $this->getLibrary()->deleteAllVariations($key);

            $this->addFlash(
                'success',
                $this->translator->trans(
                    'media.deleted_success',
                    ['%media%' => $key],
                    'JoliMediaEasyAdminBundle'
                )
            );
        }

        return $this->redirect($this->adminUrlGenerator->setRoute(
            'joli_media_easy_admin_explore',
            ['key' => \dirname((string) $key)],
        )->generateUrl());
    }

    #[Route(path: '/delete-directory', name: 'delete_directory', methods: [Request::METHOD_POST])]
    public function deleteDirectory(Request $request): RedirectResponse
    {
        $key = null;
        $form = $this->createDeleteDirectoryForm();
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $key = $form->get('path')->getData();

            $this->denyAccessUnlessGranted(AdminAction::DELETE_DIRECTORY, new AdminAction(
                libraryName: $this->getLibrary()->getName(),
                path: Resolver::normalizePath($key),
            ));

            try {
                $this->getOriginalStorage()->deleteDirectory($key);
            } catch (MediaInUseException $e) {
                $this->addFlash(
                    'danger',
                    $this->translator->trans(
                        'media.error.in_use',
                        [
                            '%media%' => $e->getPath(),
                            '%field%' => $e->getPropertyName(),
                            '%entity%' => $e->getEntityName(),
                        ],
                        'JoliMediaEasyAdminBundle'
                    )
                );

                return $this->redirect($this->adminUrlGenerator->setRoute(
                    'joli_media_easy_admin_explore',
                    ['key' => $key],
                )->generateUrl());
            }

            $this->addFlash(
                'success',
                $this->translator->trans(
                    'directory.deleted_success',
                    ['%directory%' => $key],
                    'JoliMediaEasyAdminBundle'
                )
            );
        }

        return $this->redirect($this->adminUrlGenerator->setRoute(
            'joli_media_easy_admin_explore',
            ['key' => \dirname((string) $key)],
        )->generateUrl());
    }

    #[Route(path: '/choose-directory/{key}', name: 'choose_directory', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    #[Route(path: '/choose-file/{key}', name: 'choose', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    #[Route(path: '/explore/{key}', name: 'explore', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    public function list(AdminContext $adminContext, Request $request, string $key = ''): Response
    {
        $this->addAssets($adminContext);
        $routeName = $request->query->get('routeName', 'joli_media_easy_admin_explore');

        if ($request->query->get('view_mode')) {
            $request->getSession()->set('view_mode', $request->query->get('view_mode'));

            return $this->redirect($this->adminUrlGenerator
                ->setRoute($routeName, [
                    'key' => $key,
                ])
                ->generateUrl()
            );
        }

        $currentKey = Resolver::normalizePath($key);
        $this->denyAccessUnlessGranted(AdminAction::LIST, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
            path: $currentKey,
        ));

        try {
            $trashPath = $this->getOriginalStorage()->getTrashPath();

            if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
                throw new ForbiddenPathException($trashPath);
            }

            $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
            natcasesort($directories);
        } catch (ForbiddenPathException|PathTraversalDetected|UnableToListContents) {
            $this->addFlash(
                'danger',
                $this->translator->trans(
                    'directory.list_failure',
                    ['%directory%' => $currentKey],
                    'JoliMediaEasyAdminBundle'
                ),
            );

            return $this->redirect($this->adminUrlGenerator
                ->setRoute($routeName, ['key' => ''])
                ->generateUrl()
            );
        }

        $template = match ($routeName) {
            'joli_media_easy_admin_choose' => 'choose',
            'joli_media_easy_admin_choose_directory' => 'choose_directory',
            default => 'explore',
        };

        $page = max(1, $request->query->getInt('page', 1));
        $perPage = $this->config->getPerPage() ?? 50;

        $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
            $currentKey,
            recursive: false,
            page: $page,
            perPage: $perPage
        );

        $paginator = $this->mediaPaginator->paginate($paginatedMedias, $routeName, $currentKey);

        return new Response($this->twig->render('@JoliMediaEasyAdmin/list.html.twig', [
            'base_template' => \sprintf('@JoliMediaEasyAdmin/%s.html.twig', $template),
            'breadcrumb' => $this->generateBreadcrumb($currentKey, $routeName),
            'config' => $this->config,
            'create_directory_form' => $this->createCreateDirectoryForm($key, $template)->createView(),
            'create_media_form' => $this->createUploadForm($currentKey)->createView(),
            'current_key' => $currentKey,
            'delete_directory_form' => $this->createDeleteDirectoryForm($key)->createView(),
            'directories' => $directories,
            'medias' => $paginator->getResults(),
            'paginator' => $paginator,
            'parent_key' => \dirname($currentKey),
            'rename_directory_form' => $this->createRenameDirectoryForm($key)->createView(),
            'route_name' => $routeName,
        ]));
    }

    #[Route(path: '/move', name: 'move', methods: [Request::METHOD_POST])]
    public function move(Request $request): RedirectResponse
    {
        $form = $this->createMoveFileForm();
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The move form is not submitted');
        }

        $from = Resolver::normalizePath($form->get('from')->getData());
        $to = Resolver::normalizePath($form->get('to')->getData() ?? '');

        $this->denyAccessUnlessGranted(AdminAction::MOVE, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
            path: $from,
            to: $to,
        ));

        if ($form->isValid()) {
            try {
                $target = \sprintf('%s/%s', $to, basename($from));
                $this->getOriginalStorage()->move($from, $target);
                $this->addFlash(
                    'success',
                    $this->translator->trans(
                        'media.move_success',
                        ['%from%' => $from, '%to%' => $target],
                        'JoliMediaEasyAdminBundle',
                    )
                );

                return $this->redirect($this->adminUrlGenerator->setRoute(
                    'joli_media_easy_admin_show',
                    ['key' => $target],
                )->generateUrl());
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        } else {
            $error = $form->getErrors(true, false);
        }

        $this->addFlash(
            'danger',
            $this->translator->trans(
                'media.move_failure', [
                    '%from%' => $from,
                    '%to%' => $to,
                    '%error%' => $error,
                ], 'JoliMediaEasyAdminBundle',
            )
        );

        return $this->redirect($this->adminUrlGenerator->setRoute(
            'joli_media_easy_admin_show',
            ['key' => $from],
        )->generateUrl());
    }

    #[Route(path: '/regenerate/{variation}/{key}', name: 'regenerate_variation', requirements: ['key' => '.+'], methods: [Request::METHOD_GET])]
    public function regenerateVariation(string $key, string $variation): RedirectResponse
    {
        $this->denyAccessUnlessGranted(AdminAction::REGENERATE_VARIATION, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
            path: Resolver::normalizePath($key),
            variation: $variation,
        ));

        $media = $this->resolver->resolveMedia($key);
        $mediaVariation = $this->resolver->resolveMediaVariation($media, $variation, $this->getLibrary()->getName());

        if (!$mediaVariation instanceof MediaVariation) {
            $this->addFlash(
                'danger',
                $this->translator->trans(
                    'variation.regenerated_failure',
                    ['%variation%' => $variation, '%media%' => $media->getPath()],
                    'JoliMediaEasyAdminBundle'
                )
            );
        } else {
            $this->converter->convertMediaVariation($mediaVariation);
            $this->addFlash(
                'success',
                $this->translator->trans(
                    'variation.regenerated_success',
                    ['%variation%' => $variation, '%media%' => $media->getPath()],
                    'JoliMediaEasyAdminBundle'
                )
            );
        }

        return $this->redirect($this->adminUrlGenerator
            ->setRoute('joli_media_easy_admin_show', [
                'key' => $key,
                '_tab' => 2,
            ],
            )->generateUrl());
    }

    #[Route(path: '/rename-directory', name: 'rename_directory', methods: [Request::METHOD_POST])]
    public function renameDirectory(Request $request): RedirectResponse
    {
        $form = $this->createRenameDirectoryForm();
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The rename directory form is not submitted');
        }

        $from = Resolver::normalizePath((string) $form->get('from')->getData());
        $to = Resolver::normalizePath($form->get('to')->getData());

        $this->denyAccessUnlessGranted(AdminAction::RENAME_DIRECTORY, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
            path: $from,
            to: $to,
        ));

        if ($form->isValid()) {
            try {
                $target = $to;
                $parentDirectory = \dirname($from);

                if ('.' !== $parentDirectory) {
                    $target = \sprintf('%s/%s', $parentDirectory, $to);
                }

                $this->getOriginalStorage()->moveFolder($from, $target);
                $this->addFlash(
                    'success',
                    $this->translator->trans(
                        'directory.rename.success',
                        ['%from%' => $from, '%to%' => $to],
                        'JoliMediaEasyAdminBundle',
                    )
                );

                return $this->redirect($this->adminUrlGenerator->setRoute(
                    'joli_media_easy_admin_explore',
                    ['key' => $target],
                )->generateUrl());
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        } else {
            $error = $form->getErrors(true, false);
        }

        $this->addFlash(
            'danger',
            $this->translator->trans(
                'directory.rename.failure', [
                    '%from%' => $from,
                    '%to%' => $to,
                    '%error%' => $error,
                ], 'JoliMediaEasyAdminBundle',
            )
        );

        return $this->redirect($this->adminUrlGenerator->setRoute(
            'joli_media_easy_admin_explore',
            ['key' => $from],
        )->generateUrl());
    }

    #[Route(path: '/show/{key}', name: 'show', requirements: ['key' => '.+'], methods: [Request::METHOD_GET, Request::METHOD_POST])]
    public function show(AdminContext $adminContext, Request $request, string $key): Response
    {
        $this->denyAccessUnlessGranted(AdminAction::SHOW, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
            path: Resolver::normalizePath($key),
        ));

        $media = $this->resolver->resolveMedia($key);
        $key = $media->getPath();
        $this->addAssets($adminContext);
        $query = $request->query->all();
        $displayedTab = $query['routeParams']['_tab'] ?? 1;

        $renameFileForm = $this->createRenameFileForm($key);
        $renameFileForm->handleRequest($request);

        if ($renameFileForm->isSubmitted()) {
            $from = basename($key);
            $to = $renameFileForm->get('to')->getData();

            if ($renameFileForm->isValid()) {
                try {
                    $target = \sprintf('%s/%s', $media->getFolderPath(), $to);
                    $this->denyAccessUnlessGranted(AdminAction::MOVE, new AdminAction(
                        libraryName: $this->getLibrary()->getName(),
                        path: Resolver::normalizePath($key),
                        to: $target,
                    ));
                    $this->getOriginalStorage()->move($key, $target);
                    $this->addFlash(
                        'success',
                        $this->translator->trans(
                            'media.renamed_success',
                            ['%from%' => $from, '%to%' => $to],
                            'JoliMediaEasyAdminBundle',
                        )
                    );

                    return $this->redirect($this->adminUrlGenerator->setRoute(
                        'joli_media_easy_admin_show',
                        ['key' => $target],
                    )->generateUrl());
                } catch (\Exception $e) {
                    $error = $e->getMessage();
                }
            } else {
                $error = $renameFileForm->getErrors(true, false);
            }

            $this->addFlash(
                'danger',
                $this->translator->trans(
                    'media.renamed_failure', [
                        '%from%' => $from,
                        '%to%' => $to,
                        '%error%' => $error,
                    ], 'JoliMediaEasyAdminBundle',
                )
            );
        }

        if ($this->resolver->isMediaProcessable($media)) {
            $variations = $this->getLibrary()->getVariationContainer()->list();

            foreach ($variations as $variation) {
                if (!$this->config->isVisible('show_variations_list_admin_variations')
                    && (str_starts_with($variation->getName(), 'joli-media-easy-admin')
                        || str_starts_with($variation->getName(), 'joli-media-sonata-admin'))
                ) {
                    continue;
                }

                if ($variation->canBeAppliedTo($media)) {
                    $this->resolver->resolveMediaVariation($media, $variation, $this->getLibrary()->getName());
                }
            }
        }

        return new Response($this->twig->render('@JoliMediaEasyAdmin/show.html.twig', [
            'breadcrumb' => $this->generateBreadcrumb($key, 'joli_media_easy_admin_explore'),
            'config' => $this->config,
            'delete_form' => $this->createDeleteForm($key)->createView(),
            'displayed_tab' => $displayedTab,
            'file' => $key,
            'media' => $media,
            'move_form' => $this->createMoveFileForm($key)->createView(),
            'rename_form' => $renameFileForm->createView(),
        ]));
    }

    #[Route(path: '/upload', name: 'upload', methods: [Request::METHOD_POST])]
    public function upload(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted(AdminAction::UPLOAD, new AdminAction(
            libraryName: $this->getLibrary()->getName(),
        ));

        $form = $this->createUploadForm();
        $form->handleRequest($request);

        try {
            if (!$form->isSubmitted() || !$form->isValid()) {
                throw new UploadException($this->translator->trans('media.upload.error.invalid_form', domain: 'JoliMediaEasyAdminBundle'));
            }

            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $form->get('file')->getData();
            $filename = $uploadedFile->getClientOriginalName();
            $key = \sprintf('%s/%s', $form->get('path')->getData(), $filename);
            $storage = $this->getOriginalStorage();

            $this->denyAccessUnlessGranted(AdminAction::UPLOAD, new AdminAction(
                libraryName: $this->getLibrary()->getName(),
                path: Resolver::normalizePath($key),
            ));

            if ($storage->has($key)) {
                throw new UploadException($this->translator->trans('media.upload.error.already_exists', ['%file%' => $filename], 'JoliMediaEasyAdminBundle'));
            }

            $media = $storage->createMedia($key, $uploadedFile->getContent());

            if (str_starts_with($media->getMimeType(), 'image/')) {
                $adminVariation = $this->getLibrary()->getVariation('joli_media_easy_admin');
                $thumbnailUrl = $media->createVariation($adminVariation)->getUrl();
            } else {
                $thumbnailUrl = null;
            }

            $size = $uploadedFile->getSize();
            $mime = $uploadedFile->getMimeType();

            // remove from temporary upload dir
            unlink($uploadedFile->getRealPath());

            return new JsonResponse([
                'files' => [[
                    'url' => $media->getUrl(),
                    'thumbnailUrl' => $thumbnailUrl,
                    'name' => $filename,
                    'size' => $size,
                    'type' => $mime,
                    'link' => $this->adminUrlGenerator->setRoute('joli_media_easy_admin_show', ['key' => $media->getPath()])->generateUrl(),
                    'mediaUrl' => $media->getPath(),
                    'mediaFullUrl' => $media->getUrl(),
                    'mediaType' => $media->getFileType(),
                    'mediaFolder' => $media->getFolderPath(),
                    'mediaTemplate' => $this->twig->render('@JoliMediaEasyAdmin/_preview.html.twig', [
                        'media' => $media,
                        'className' => 'media-preview',
                    ]),
                    'mediaOriginalTemplate' => $this->twig->render('@JoliMediaEasyAdmin/_preview.html.twig', [
                        'media' => $media,
                        'variation' => false,
                    ]),
                    'mediaPreview' => $this->twig->render('@JoliMediaEasyAdmin/_as_image.html.twig', [
                        'media' => $media,
                    ]),
                ]],
            ]);
        } catch (UnableToWriteFile) {
            $message = $this->translator->trans('media.upload.error.unable_to_write_file', [
                '%file%' => $filename,
            ], 'JoliMediaEasyAdminBundle');
        } catch (UploadException $e) {
            $message = $e->getMessage();
        } catch (\Exception) {
            $message = $this->translator->trans('media.upload.error.default', domain: 'JoliMediaEasyAdminBundle');
        }

        return new JsonResponse([
            'error' => $message,
        ], Response::HTTP_BAD_REQUEST);
    }

    protected function denyAccessUnlessGranted(mixed $attribute, mixed $subject = null, string $message = 'Access Denied.'): void
    {
        if (!$this->authorizationChecker instanceof AuthorizationCheckerInterface) {
            return;
        }

        if (!$this->authorizationChecker->isGranted($attribute, $subject)) {
            $e = $this->createAccessDeniedException($message);
            $e->setAttributes([$attribute]);
            $e->setSubject($subject);

            throw $e;
        }
    }

    private function addAssets(AdminContext $adminContext): void
    {
        $package = new PathPackage(
            '/bundles/jolimediaeasyadmin',
            new JsonManifestVersionStrategy(__DIR__ . '/../../public/manifest.json'),
        );
        $adminAssets = $adminContext->getAssets();
        $adminAssets->addCssAsset(new AssetDto($package->getUrl('joli-media-easy-admin.css')));
        $adminAssets->addJsAsset(new AssetDto($package->getUrl('joli-media-easy-admin.js')));
    }

    private function createDeleteForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(DeleteType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_delete'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData(['path' => $path]);
        }

        return $form;
    }

    private function createDeleteDirectoryForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(DeleteDirectoryType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_delete_directory'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData(['path' => $path]);
        }

        return $form;
    }

    private function createCreateDirectoryForm(?string $parentPath = null, ?string $intent = null): FormInterface
    {
        $form = $this->formFactory->create(CreateDirectoryType::class, null, [
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $parentPath) {
            $form->setData(['parentDirectory' => $parentPath, 'intent' => $intent ?? 'explore']);
        }

        return $form;
    }

    private function createMoveFileForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(MoveType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_move'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData(['from' => $path]);
        }

        return $form;
    }

    private function createRenameDirectoryForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(RenameDirectoryType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_rename_directory'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData([
                'from' => $path,
                'to' => basename($path),
            ]);
        }

        return $form;
    }

    private function createRenameFileForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(RenameType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_show', ['key' => $path]),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData([
                'to' => basename($path),
            ]);
        }

        return $form;
    }

    private function createUploadForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(UploadType::class, null, [
            'action' => $this->generateUrl('joli_media_easy_admin_upload'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData(['path' => $path]);
        }

        return $form;
    }

    /**
     * @return array<array{url: string, name: string}>
     */
    private function generateBreadcrumb(string $path, string $routeName): array
    {
        $breadcrumb = [];
        $folderName = $path;
        $breadcrumb[] = [
            'url' => $this->adminUrlGenerator
                ->setRoute($routeName)
                ->generateUrl(),
            'name' => $this->translator->trans('media_library', domain: 'JoliMediaEasyAdminBundle'),
        ];
        $breadcrumbPaths = [];

        foreach (explode('/', $folderName) as $part) {
            if (('' === $part | '.' === $part) !== 0) {
                continue;
            }

            if ('..' === $part && [] !== $breadcrumbPaths) {
                array_pop($breadcrumbPaths);
                array_pop($breadcrumb);

                continue;
            }

            $breadcrumbPaths[] = $part;
            $currentBreadcrumbPath = implode('/', $breadcrumbPaths);
            $breadcrumb[] = [
                'url' => $this->adminUrlGenerator
                    ->setRoute($routeName, ['key' => '/' . $currentBreadcrumbPath])
                    ->generateUrl(),
                'name' => $part,
            ];
        }

        return $breadcrumb;
    }

    private function getOriginalStorage(): OriginalStorage
    {
        return $this->getLibrary()->getOriginalStorage();
    }

    private function getLibrary(): Library
    {
        return $this->libraries->getDefault();
    }
}
