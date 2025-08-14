<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Controller;

use JoliCode\MediaBundle\Bridge\SonataAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\CreateDirectoryType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\DeleteDirectoryType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\DeleteType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\MoveType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\RenameDirectoryType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\RenameType;
use JoliCode\MediaBundle\Bridge\SonataAdmin\Form\Type\UploadType;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Exception\MediaInUseException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use League\Flysystem\PathTraversalDetected;
use League\Flysystem\UnableToListContents;
use League\Flysystem\UnableToWriteFile;
use Sonata\AdminBundle\Admin\Pool;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

#[Route(name: 'joli_media_sonata_admin_')]
class MediaAdminController extends AbstractController
{
    public function __construct(
        private readonly Pool $sonataAdminPool,
        private readonly Config $config,
        private readonly LibraryContainer $libraries,
        private readonly Resolver $resolver,
        private readonly Converter $converter,
        private readonly TranslatorInterface $translator,
        private readonly Environment $twig,
        private readonly FormFactoryInterface $formFactory,
        private readonly string $sonataAdminLayoutTemplate,
        private readonly string $sonataAdminAjaxTemplate,
    ) {
    }

    #[Route(path: '/create-directory', name: 'create_directory', methods: [Request::METHOD_POST])]
    public function createDirectory(Request $request): RedirectResponse
    {
        $directory = null;
        $form = $this->createCreateDirectoryForm(null);
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The directory form is not submitted');
        }

        if ($form->isValid()) {
            $parentDirectory = $form->get('parentDirectory')->getData();
            $directory = $form->get('directory')->getData();

            if ('' !== $parentDirectory) {
                $directory = \sprintf('%s/%s', $parentDirectory, $directory);
            }

            try {
                $directory = ltrim((string) $directory, '/');
                $this->getOriginalStorage()->createDirectory($directory);
                $this->addFlash(
                    'sonata_flash_success',
                    $this->translator->trans(
                        'directory.created_success',
                        ['%directory%' => $directory],
                        'JoliMediaSonataAdminBundle',
                    )
                );
            } catch (\Exception $e) {
                $directory = $form->get('parentDirectory')->getData() ?? '';
                $this->addFlash(
                    'sonata_flash_error',
                    $this->translator->trans(
                        'directory.created_failure', [
                            '%directory%' => $form->get('directory')->getData(),
                            '%error%' => $e->getMessage(),
                        ], 'JoliMediaSonataAdminBundle',
                    )
                );
            }
        } else {
            $directory = $form->get('parentDirectory')->getData() ?? '';
            $this->addFlash(
                'sonata_flash_error',
                $this->translator->trans(
                    'directory.created_failure', [
                        '%directory%' => $form->get('directory')->getData(),
                        '%error%' => $form->getErrors(true, false),
                    ], 'JoliMediaSonataAdminBundle',
                )
            );
        }

        $intent = match ($form->get('intent')->getData()) {
            'choose' => 'joli_media_sonata_admin_choose',
            'choose_directory' => 'joli_media_sonata_admin_choose_directory',
            default => 'joli_media_sonata_admin_explore',
        };

        return $this->redirectToRoute($intent, ['key' => (string) $directory]);
    }

    #[Route(path: '/delete', name: 'delete', methods: [Request::METHOD_POST])]
    public function delete(Request $request): RedirectResponse
    {
        $key = null;
        $form = $this->createDeleteForm(null);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $key = $form->get('path')->getData();

            // Remove the media and the cache files
            try {
                $this->getOriginalStorage()->delete($key);
            } catch (MediaInUseException $e) {
                $this->addFlash(
                    'sonata_flash_error',
                    $this->translator->trans(
                        'media.error.in_use',
                        [
                            '%media%' => $e->getPath(),
                            '%field%' => $e->getPropertyName(),
                            '%entity%' => $e->getEntityName(),
                        ],
                        'JoliMediaSonataAdminBundle'
                    )
                );

                return $this->redirectToRoute('joli_media_sonata_admin_show', [
                    'key' => $key,
                ]);
            }

            $this->getLibrary()->deleteAllVariations($key);

            $this->addFlash(
                'sonata_flash_success',
                $this->translator->trans(
                    'media.deleted_success',
                    ['%media%' => $key],
                    'JoliMediaSonataAdminBundle'
                )
            );
        }

        return $this->redirectToRoute('joli_media_sonata_admin_explore', ['key' => \dirname((string) $key)]);
    }

    #[Route(path: '/delete-directory', name: 'delete_directory', methods: [Request::METHOD_POST])]
    public function deleteDirectory(Request $request): RedirectResponse
    {
        $key = null;
        $form = $this->createDeleteDirectoryForm(null);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $key = $form->get('path')->getData();

            try {
                $this->getOriginalStorage()->deleteDirectory($key);
            } catch (MediaInUseException $e) {
                $this->addFlash(
                    'sonata_flash_error',
                    $this->translator->trans(
                        'media.error.in_use',
                        [
                            '%media%' => $e->getPath(),
                            '%field%' => $e->getPropertyName(),
                            '%entity%' => $e->getEntityName(),
                        ],
                        'JoliMediaSonataAdminBundle'
                    )
                );

                return $this->redirectToRoute('joli_media_sonata_admin_explore', ['key' => $key]);
            }

            $this->addFlash(
                'sonata_flash_success',
                $this->translator->trans(
                    'directory.deleted_success',
                    ['%directory%' => $key],
                    'JoliMediaSonataAdminBundle'
                )
            );
        }

        return $this->redirectToRoute('joli_media_sonata_admin_explore', ['key' => \dirname((string) $key)]);
    }

    #[Route(path: '/choose-directory/{key}', name: 'choose_directory', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    #[Route(path: '/choose-file/{key}', name: 'choose', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    #[Route(path: '/explore/{key}', name: 'explore', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    public function list(Request $request, string $key = ''): Response
    {
        if ($request->get('view_mode')) {
            $request->getSession()->set('view_mode', $request->get('view_mode'));

            return $this->redirectToRoute($request->get('_route'), ['key' => $key]);
        }

        $currentKey = Resolver::normalizePath($key);

        try {
            $trashPath = $this->getOriginalStorage()->getTrashPath();

            if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
                throw new ForbiddenPathException($trashPath);
            }

            $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
            natcasesort($directories);
        } catch (ForbiddenPathException|PathTraversalDetected|UnableToListContents) {
            $this->addFlash(
                'sonata_flash_error',
                $this->translator->trans(
                    'directory.list_failure',
                    ['%directory%' => $currentKey],
                    'JoliMediaSonataAdminBundle'
                ),
            );

            return $this->redirectToRoute('joli_media_sonata_admin_explore', ['key' => '']);
        }

        $template = match ($request->get('_route')) {
            'joli_media_sonata_admin_choose' => 'choose',
            'joli_media_sonata_admin_choose_directory' => 'choose_directory',
            default => 'explore',
        };

        return new Response($this->twig->render('@JoliMediaSonataAdmin/list.html.twig', [
            'admin_pool' => $this->sonataAdminPool,
            'base_ajax_template' => $this->sonataAdminAjaxTemplate,
            'base_layout_template' => $this->sonataAdminLayoutTemplate,
            'base_template' => \sprintf('@JoliMediaSonataAdmin/%s.html.twig', $template),
            'config' => $this->config,
            'create_directory_form' => $this->createCreateDirectoryForm($key, $template)->createView(),
            'create_media_form' => $this->createUploadForm($currentKey)->createView(),
            'current_key' => $currentKey,
            'delete_directory_form' => $this->createDeleteDirectoryForm($key)->createView(),
            'directories' => $directories,
            'medias' => $this->getOriginalStorage()->listMedias($currentKey, recursive: false),
            'parent_key' => \dirname($currentKey),
            'rename_directory_form' => $this->createRenameDirectoryForm($key)->createView(),
        ]));
    }

    #[Route(path: '/move', name: 'move', methods: [Request::METHOD_POST])]
    public function move(Request $request): RedirectResponse
    {
        $form = $this->createMoveFileForm(null);
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The move form is not submitted');
        }

        $from = Resolver::normalizePath($form->get('from')->getData());
        $to = Resolver::normalizePath($form->get('to')->getData() ?? '');

        if ($form->isValid()) {
            try {
                $target = \sprintf('%s/%s', $to, basename($from));
                $this->getOriginalStorage()->move($from, $target);
                $this->addFlash(
                    'sonata_flash_success',
                    $this->translator->trans(
                        'media.move_success',
                        ['%from%' => $from, '%to%' => $target],
                        'JoliMediaSonataAdminBundle',
                    )
                );

                return $this->redirectToRoute('joli_media_sonata_admin_show', ['key' => $target]);
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        } else {
            $error = $form->getErrors(true, false);
        }

        $this->addFlash(
            'sonata_flash_error',
            $this->translator->trans(
                'media.move_failure', [
                    '%from%' => $from,
                    '%to%' => $to,
                    '%error%' => $error,
                ], 'JoliMediaSonataAdminBundle',
            )
        );

        return $this->redirectToRoute('joli_media_sonata_admin_show', ['key' => $from]);
    }

    #[Route(path: '/regenerate/{variation}/{key}', name: 'regenerate_variation', requirements: ['key' => '.+'])]
    public function regenerateVariation(string $key, string $variation): RedirectResponse
    {
        $media = $this->resolver->resolveMedia($key);
        $variation = $this->getLibrary()->getVariation($variation);
        $mediaVariation = $variation->getForMedia($media);
        $this->converter->convertMediaVariation($mediaVariation);

        $this->addFlash(
            'sonata_flash_success',
            $this->translator->trans(
                'variation.regenerated_success',
                ['%variation%' => $variation->getName(), '%media%' => $media->getPath()],
                'JoliMediaSonataAdminBundle'
            )
        );

        return $this->redirectToRoute('joli_media_sonata_admin_show', [
            'key' => $key,
            '_tab' => 2,
        ]);
    }

    #[Route(path: '/rename-directory', name: 'rename_directory', methods: [Request::METHOD_POST])]
    public function renameDirectory(Request $request): RedirectResponse
    {
        $form = $this->createRenameDirectoryForm(null);
        $form->handleRequest($request);

        if (!$form->isSubmitted()) {
            throw new \InvalidArgumentException('The rename directory form is not submitted');
        }

        $from = Resolver::normalizePath((string) $form->get('from')->getData());
        $to = Resolver::normalizePath($form->get('to')->getData());

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
                        'JoliMediaSonataAdminBundle',
                    )
                );

                return $this->redirectToRoute('joli_media_sonata_admin_explore', [
                    'key' => $target,
                ]);
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
                ], 'JoliMediaSonataAdminBundle',
            )
        );

        return $this->redirectToRoute('joli_media_sonata_admin_explore', [
            'key' => $from,
        ]);
    }

    #[Route(path: '/show/{key}', name: 'show', requirements: ['key' => '.+'])]
    public function show(Request $request, string $key): Response
    {
        $media = $this->resolver->resolveMedia($key);
        $key = $media->getPath();
        $renameFileForm = $this->createRenameFileForm($key);
        $renameFileForm->handleRequest($request);

        if ($renameFileForm->isSubmitted()) {
            $from = basename($key);
            $to = $renameFileForm->get('to')->getData();

            if ($renameFileForm->isValid()) {
                try {
                    $target = \sprintf('%s/%s', $media->getFolderPath(), $to);
                    $this->getOriginalStorage()->move($key, $target);
                    $this->addFlash(
                        'sonata_flash_success',
                        $this->translator->trans(
                            'media.renamed_success',
                            ['%from%' => $from, '%to%' => $to],
                            'JoliMediaSonataAdminBundle',
                        )
                    );

                    return $this->redirectToRoute('joli_media_sonata_admin_show', ['key' => $target]);
                } catch (\Exception $e) {
                    $error = $e->getMessage();
                }
            } else {
                $error = $renameFileForm->getErrors(true, false);
            }

            $this->addFlash(
                'sonata_flash_error',
                $this->translator->trans(
                    'media.renamed_failure', [
                        '%from%' => $from,
                        '%to%' => $to,
                        '%error%' => $error,
                    ], 'JoliMediaSonataAdminBundle',
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
                    $media->createVariation($variation);
                }
            }
        }

        return new Response($this->twig->render('@JoliMediaSonataAdmin/show.html.twig', [
            'admin_pool' => $this->sonataAdminPool,
            'base_layout_template' => $this->sonataAdminLayoutTemplate,
            'base_template' => $this->getBaseTemplate(),
            'config' => $this->config,
            'delete_form' => $this->createDeleteForm($key)->createView(),
            'media' => $media,
            'move_form' => $this->createMoveFileForm($key)->createView(),
            'rename_form' => $renameFileForm->createView(),
        ]));
    }

    #[Route(path: '/upload', name: 'upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $form = $this->createUploadForm();
        $form->handleRequest($request);

        try {
            if (!$form->isSubmitted() || !$form->isValid()) {
                throw new UploadException($this->translator->trans('media.upload.error.invalid_form', domain: 'JoliMediaSonataAdminBundle'));
            }

            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $form->get('file')->getData();
            $filename = $uploadedFile->getClientOriginalName();
            $key = \sprintf('%s/%s', $form->get('path')->getData(), $filename);
            $storage = $this->getOriginalStorage();

            if ($storage->has($key)) {
                throw new UploadException('This file already exist, please change the name');
            }

            $media = $storage->createMedia($key, $uploadedFile->getContent());

            if (str_starts_with($media->getMimeType(), 'image/')) {
                $adminVariation = $this->getLibrary()->getVariation('joli_media_sonata_admin');
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
                    'link' => $this->generateUrl('joli_media_sonata_admin_show', ['key' => $media->getPath()]),
                    'mediaUrl' => $media->getPath(),
                    'mediaFolder' => $media->getFolderPath(),
                    'mediaTemplate' => $this->twig->render('@JoliMediaSonataAdmin/_preview.html.twig', [
                        'media' => $media,
                        'className' => 'media-preview',
                    ]),
                    'mediaPreview' => $this->twig->render('@JoliMediaSonataAdmin/_as_image.html.twig', [
                        'media' => $media,
                    ]),
                ]],
            ]);
        } catch (UnableToWriteFile) {
            $message = $this->translator->trans('media.upload.error.unable_to_write_file', [
                '%file%' => $filename,
            ], 'JoliMediaSonataAdminBundle');
        } catch (UploadException $e) {
            $message = $e->getMessage();
        } catch (\Exception) {
            $message = $this->translator->trans('media.upload.error.default', domain: 'JoliMediaSonataAdminBundle');
        }

        return new JsonResponse([
            'error' => $message,
        ], Response::HTTP_BAD_REQUEST);
    }

    private function getBaseTemplate(): string
    {
        $requestStack = $this->container->get('request_stack');
        $request = $requestStack->getCurrentRequest();

        if ($this->isXmlHttpRequest($request)) {
            return $this->sonataAdminAjaxTemplate;
        }

        return $this->sonataAdminLayoutTemplate;
    }

    private function createDeleteForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(DeleteType::class, null, [
            'action' => $this->generateUrl('joli_media_sonata_admin_delete'),
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
            'action' => $this->generateUrl('joli_media_sonata_admin_delete_directory'),
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
            'action' => $this->generateUrl('joli_media_sonata_admin_move'),
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
            'action' => $this->generateUrl('joli_media_sonata_admin_rename_directory'),
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
            'action' => $this->generateUrl('joli_media_sonata_admin_show', ['key' => $path]),
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
            'action' => $this->generateUrl('joli_media_sonata_admin_upload'),
            'method' => Request::METHOD_POST,
        ]);

        if (null !== $path) {
            $form->setData(['path' => $path]);
        }

        return $form;
    }

    private function getOriginalStorage(): OriginalStorage
    {
        return $this->getLibrary()->getOriginalStorage();
    }

    private function getLibrary(): Library
    {
        return $this->libraries->getDefault();
    }

    private function isXmlHttpRequest(Request $request): bool
    {
        return $request->isXmlHttpRequest()
            || $request->request->getBoolean('_xml_http_request')
            || $request->query->getBoolean('_xml_http_request');
    }
}
