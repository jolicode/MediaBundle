<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Controller;

use JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\Type\UploadType;
use JoliCode\MediaBundle\Bridge\Sylius\Config\Config;
use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use League\Flysystem\PathTraversalDetected;
use League\Flysystem\UnableToListContents;
use League\Flysystem\UnableToWriteFile;
use Pagerfanta\Adapter\FixedAdapter;
use Pagerfanta\Exception\NotValidCurrentPageException;
use Pagerfanta\Pagerfanta;
use Pagerfanta\PagerfantaInterface;
use Sylius\Component\Grid\Parameters;
use Sylius\Component\Grid\Provider\GridProviderInterface;
use Sylius\Component\Grid\View\GridViewFactoryInterface;
use Sylius\Component\Grid\View\GridViewInterface;
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
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

#[Route(name: 'joli_media_sylius_admin_')]
class MediaAdminController extends AbstractController
{
    public function __construct(
        private readonly LibraryContainer $libraries,
        private readonly Resolver $resolver,
        private readonly Converter $converter,
        private readonly GridViewFactoryInterface $gridViewFactory,
        private readonly GridProviderInterface $gridProvider,
        private readonly Environment $twig,
        private readonly FormFactoryInterface $formFactory,
        private readonly Config $config,
        private readonly TranslatorInterface $translator,
        private readonly CsrfTokenManagerInterface $csrfTokenManager,
    ) {
    }

    #[Route(path: '/create-directory', name: 'create_directory', methods: [Request::METHOD_POST])]
    public function createDirectory(Request $request): Response
    {
        $csrfToken = $request->request->getString('_csrf_token');
        $parentPath = urldecode(Resolver::normalizePath($request->request->getString('parentPath')));
        $name = trim($request->request->getString('name'));

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_create_directory', $csrfToken))) {
            $this->addFlash('error', $this->translator->trans('directory.create_failure', [
                '%directory%' => $name,
                '%error%' => 'Invalid CSRF token',
            ], 'JoliMediaSyliusBundle'));

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        if (empty($name)) {
            $this->addFlash('error', $this->translator->trans('directory.name_required', [], 'JoliMediaSyliusBundle'));

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        $newPath = empty($parentPath) ? $name : $parentPath . '/' . $name;
        $isAjax = $request->isXmlHttpRequest();

        try {
            $this->getOriginalStorage()->createDirectory($newPath);

            if (!$isAjax) {
                $this->addFlash('success', $this->translator->trans('directory.create_success', [
                    '%directory%' => $newPath,
                ], 'JoliMediaSyliusBundle'));
            }
        } catch (\Throwable $e) {
            if (!$isAjax) {
                $this->addFlash('error', $this->translator->trans('directory.create_failure', [
                    '%directory%' => $newPath,
                    '%error%' => $e->getMessage(),
                ], 'JoliMediaSyliusBundle'));
            }
        }

        if ($isAjax) {
            $mode = $request->request->get('_mode', 'media_choice');
            if ('folder_choice' === $mode) {
                return $this->renderFolderChoiceHtml($parentPath);
            }

            return $this->renderChooseHtml($parentPath);
        }

        return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
    }

    #[Route(path: '/rename-directory', name: 'rename_directory', methods: [Request::METHOD_POST])]
    public function renameDirectory(Request $request): Response
    {
        $csrfToken = $request->request->getString('_csrf_token');
        $oldPath = Resolver::normalizePath($request->request->getString('oldPath'));
        $newPath = Resolver::normalizePath($request->request->getString('newPath'));

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_rename_directory', $csrfToken))) {
            $this->addFlash('error', 'Invalid CSRF token');

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        if (!$oldPath || !$newPath) {
            $this->addFlash('error', 'Missing parameters');

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        try {
            $this->getOriginalStorage()->moveFolder($oldPath, $newPath);

            $this->addFlash('success', $this->translator->trans(
                'directory.rename_success',
                ['%from%' => $oldPath, '%to%' => $newPath],
                'JoliMediaSyliusBundle'
            ));

            $referer = $request->headers->get('referer');

            return $this->redirect($referer ? str_replace($oldPath, $newPath, $referer) : $this->generateUrl('joli_media_sylius_admin_explore'));
        } catch (\Throwable $e) {
            $this->addFlash('error', $e->getMessage());

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }
    }

    #[Route(path: '/rename', name: 'rename', methods: [Request::METHOD_POST])]
    public function rename(Request $request): Response
    {
        $csrfToken = $request->request->getString('_csrf_token');
        $oldPath = Resolver::normalizePath($request->request->getString('oldPath'));
        $newPath = Resolver::normalizePath($request->request->getString('newPath'));

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_rename', $csrfToken))) {
            $this->addFlash('error', 'Invalid CSRF token');

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        if (!$oldPath || !$newPath) {
            $this->addFlash('error', 'Missing parameters');

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }

        try {
            $this->getOriginalStorage()->move($oldPath, $newPath);

            $this->addFlash('success', $this->translator->trans(
                'media.rename_success',
                ['%from%' => $oldPath, '%to%' => $newPath],
                'JoliMediaSyliusBundle'
            ));

            $referer = $request->headers->get('referer');

            return $this->redirect($referer ? str_replace($oldPath, $newPath, $referer) : $this->generateUrl('joli_media_sylius_admin_explore'));
        } catch (\Throwable $e) {
            $this->addFlash('error', $e->getMessage());

            return $this->redirect($request->headers->get('referer') ?? $this->generateUrl('joli_media_sylius_admin_explore'));
        }
    }

    #[Route(path: '/move', name: 'move', methods: [Request::METHOD_POST])]
    public function move(Request $request): RedirectResponse
    {
        $from = Resolver::normalizePath($request->request->getString('from'));
        $to = Resolver::normalizePath($request->request->getString('to'));

        $csrfToken = $request->request->getString('_csrf_token');

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_move', $csrfToken))) {
            $this->addFlash('error', 'Invalid CSRF token');
        }

        try {
            $target = \sprintf('%s/%s', $to, basename($from));
            $this->getOriginalStorage()->move($from, $target);

            $this->addFlash('success', $this->translator->trans(
                'media.move_success',
                ['%from%' => $from, '%to%' => $target],
                'JoliMediaSyliusBundle'
            ));

            return $this->redirectToRoute('joli_media_sylius_admin_show', ['key' => $target]);
        } catch (\Throwable $e) {
            $this->addFlash('danger', $this->translator->trans(
                'media.move_failure',
                ['%from%' => $from, '%to%' => $to, '%error%' => $e->getMessage()],
                'JoliMediaSyliusBundle'
            ));

            return $this->redirectToRoute('joli_media_sylius_admin_show', ['key' => $from]);
        }
    }

    #[Route(path: '/delete', name: 'delete', methods: [Request::METHOD_POST, Request::METHOD_DELETE])]
    public function delete(Request $request): Response
    {
        $key = $request->query->getString('key');

        $csrfToken = $request->request->getString('_csrf_token');

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken($key, $csrfToken))) {
            $this->addFlash('error', 'Invalid CSRF token');
        }

        if ('' === $key) {
            $this->addFlash('error', 'Missing path parameter');
        }

        try {
            $this->getOriginalStorage()->delete($key);

            $this->addFlash('success', $this->translator->trans('sylius.resource.delete', ['%resource%' => $key], domain: 'flashes'));
        } catch (\Throwable $e) {
            $this->addFlash('error', $e->getMessage());
        }

        $parentKey = \dirname($key);

        return $this->redirectToRoute('joli_media_sylius_admin_explore', [
            'key' => $parentKey,
        ]);
    }

    #[Route(path: '/delete-directory', name: 'delete_directory', methods: [Request::METHOD_POST, Request::METHOD_DELETE])]
    public function deleteDirectory(Request $request): RedirectResponse
    {
        $key = $request->query->getString('key');

        $csrfToken = $request->request->getString('_csrf_token');

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken($key, $csrfToken))) {
            $this->addFlash('error', 'Invalid CSRF token');
        }

        if ('' === $key) {
            $this->addFlash('error', 'Missing path parameter');
        }

        try {
            $this->getOriginalStorage()->deleteDirectory($key);

            $this->addFlash('success', $this->translator->trans('sylius.resource.delete', ['%resource%' => $key], domain: 'flashes'));
        } catch (\Throwable $e) {
            $this->addFlash('error', $e->getMessage());
        }

        /** @var string|null $referer */
        $referer = $request->headers->get('referer');

        if (null !== $referer && $this->isValidReferer($referer, $request)) {
            return $this->redirect($referer);
        }

        return $this->redirectToRoute('joli_media_sylius_admin_explore');
    }

    #[Route(path: '/regenerate/{variation}/{key}', name: 'regenerate_variation', requirements: ['key' => '.+'], methods: [Request::METHOD_GET])]
    public function regenerateVariation(Request $request, string $key, string $variation): RedirectResponse
    {
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

        /** @var string|null $referer */
        $referer = $request->headers->get('referer');

        if (null !== $referer && $this->isValidReferer($referer, $request)) {
            return $this->redirect($referer);
        }

        return $this->redirectToRoute('joli_media_sylius_admin_show', ['key' => $key]);
    }

    #[Route(path: '/explore/{key}', name: 'explore', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    public function list(Request $request, string $key = ''): Response
    {
        $currentKey = Resolver::normalizePath($key);
        $request->attributes->set('currentKey', $currentKey);

        $trashPath = $this->getOriginalStorage()->getTrashPath();

        if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
            throw new ForbiddenPathException($trashPath);
        }

        $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
        natcasesort($directories);

        $gridView = $this->getGridView($request, 'joli_media_sylius_admin_media');

        return new Response($this->twig->render('@JoliMediaSylius/admin/media/index.html.twig', [
            'key' => $key,
            'current_key' => $currentKey,
            'resources' => $gridView,
            'directories' => $directories,
            'medias' => $gridView->getData(),
            'config' => $this->config,
            'create_media_form' => $this->createUploadForm($currentKey)->createView(),
        ]));
    }

    #[Route(path: '/choose/{key}', name: 'choose', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
    public function choose(Request $request, string $key = ''): Response
    {
        $currentKey = Resolver::normalizePath($key);
        $request->attributes->set('currentKey', $currentKey);
        $parentKey = '' !== $currentKey ? (($pos = strrpos($currentKey, '/')) !== false ? substr($currentKey, 0, $pos) : '') : '';

        $perPage = $this->config->getPaginationSizes()[0] ?? 10;

        try {
            $trashPath = $this->getOriginalStorage()->getTrashPath();

            if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
                throw new ForbiddenPathException($trashPath);
            }

            $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
            natcasesort($directories);
        } catch (ForbiddenPathException|PathTraversalDetected|UnableToListContents) {
            $directories = [];
        }

        if ($request->isXmlHttpRequest()) {
            try {
                $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                    $currentKey,
                    perPage: $perPage,
                );
                $medias = $paginatedMedias['items'];
            } catch (\OutOfRangeException) {
                $medias = [];
            }

            return new Response($this->twig->render('@JoliMediaSylius/admin/media/choose_directory.html.twig', [
                'key' => $key,
                'current_key' => $currentKey,
                'parent_key' => $parentKey,
                'directories' => $directories,
                'medias' => $medias,
            ]));
        }

        $page = $request->query->getInt('page', 1);

        try {
            $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                $currentKey,
                page: $page,
                perPage: $perPage,
            );
            $medias = new Pagerfanta(new FixedAdapter($paginatedMedias['total'], $paginatedMedias['items']));
            $medias->setCurrentPage($page);
        } catch (NotValidCurrentPageException) {
            $medias = new Pagerfanta(new FixedAdapter(0, []));
        }

        return new Response($this->twig->render('@JoliMediaSylius/admin/media/choose.html.twig', [
            'key' => $key,
            'current_key' => $currentKey,
            'directories' => $directories,
            'medias' => $medias,
            'create_media_form' => $this->createUploadForm($currentKey)->createView(),
            'config' => $this->config,
            'csrf_token_create' => $this->csrfTokenManager->getToken('media_create_directory')->getValue(),
        ]));
    }

    #[Route(path: '/upload', name: 'upload', methods: [Request::METHOD_POST])]
    public function upload(Request $request): JsonResponse
    {
        $form = $this->createUploadForm();
        $form->handleRequest($request);

        try {
            if (!$form->isSubmitted() || !$form->isValid()) {
                return new JsonResponse([
                    'error' => 'Invalid form',
                ], Response::HTTP_BAD_REQUEST);
            }

            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $form->get('file')->getData();
            $filename = $uploadedFile->getClientOriginalName();
            $key = \sprintf('%s/%s', $form->get('path')->getData(), $filename);
            $storage = $this->getOriginalStorage();

            if ($storage->has($key)) {
                return new JsonResponse([
                    'error' => 'This file already exists, please change the name',
                ], Response::HTTP_BAD_REQUEST);
            }

            $media = $storage->createMedia($key, $uploadedFile->getContent());

            $size = $uploadedFile->getSize();
            $mime = $uploadedFile->getMimeType();

            unlink($uploadedFile->getRealPath());

            if (str_starts_with($media->getMimeType(), 'image/')) {
                $adminVariation = $this->getLibrary()->getVariation('joli_media_sylius_admin');
                $thumbnailUrl = $media->createVariation($adminVariation)->getUrl();
            } else {
                $thumbnailUrl = null;
            }

            return new JsonResponse([
                'files' => [[
                    'url' => $media->getUrl(),
                    'thumbnailUrl' => $thumbnailUrl,
                    'name' => $filename,
                    'size' => $size,
                    'type' => $mime,
                    'link' => $this->generateUrl('joli_media_sylius_admin_explore', ['key' => $media->getPath()]),
                    'mediaUrl' => $media->getPath(),
                    'mediaFolder' => $media->getFolderPath(),
                    'mediaTemplate' => $this->twig->render('@JoliMediaSylius/_preview.html.twig', [
                        'media' => $media,
                        'className' => 'media-preview',
                    ]),
                    'mediaPreview' => $this->twig->render('@JoliMediaSylius/_as_image.html.twig', [
                        'media' => $media,
                    ]),
                ]],
            ]);
        } catch (UnableToWriteFile) {
            return new JsonResponse([
                'error' => 'Unable to write file',
            ], Response::HTTP_BAD_REQUEST);
        } catch (UploadException $e) {
            return new JsonResponse([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        } catch (\Exception) {
            return new JsonResponse([
                'error' => 'An error occurred during upload',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route(path: '/show/{key}', name: 'show', requirements: ['key' => '.+'], methods: [Request::METHOD_GET, Request::METHOD_POST])]
    public function show(Request $request, string $key): Response
    {
        $media = $this->resolver->resolveMedia($key);

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

        return new Response($this->twig->render('@JoliMediaSylius/admin/media/show.html.twig', [
            'config' => $this->config,
            'media' => $media,
        ]));
    }

    private function renderChooseHtml(string $currentKey): Response
    {
        try {
            $trashPath = $this->getOriginalStorage()->getTrashPath();

            if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
                throw new ForbiddenPathException($trashPath);
            }

            $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
            natcasesort($directories);
        } catch (ForbiddenPathException|PathTraversalDetected|UnableToListContents) {
            $directories = [];
        }

        try {
            $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                $currentKey,
                perPage: $this->config->getPaginationSizes()[0] ?? 10,
            );
            $medias = new Pagerfanta(new FixedAdapter($paginatedMedias['total'], $paginatedMedias['items']));
            $medias->setCurrentPage(1);
        } catch (NotValidCurrentPageException) {
            $medias = new Pagerfanta(new FixedAdapter(0, []));
        }

        return new Response($this->twig->render('@JoliMediaSylius/admin/media/choose.html.twig', [
            'key' => $currentKey,
            'current_key' => $currentKey,
            'directories' => $directories,
            'medias' => $medias,
            'create_media_form' => $this->createUploadForm($currentKey)->createView(),
            'config' => $this->config,
            'csrf_token_create' => $this->csrfTokenManager->getToken('media_create_directory')->getValue(),
        ]));
    }

    private function renderFolderChoiceHtml(string $currentKey): Response
    {
        $parentKey = '' !== $currentKey ? (($pos = strrpos($currentKey, '/')) !== false ? substr($currentKey, 0, $pos) : '') : '';

        try {
            $trashPath = $this->getOriginalStorage()->getTrashPath();

            if ($trashPath === $currentKey || str_starts_with($currentKey, $trashPath . '/')) {
                throw new ForbiddenPathException($trashPath);
            }

            $directories = $this->getOriginalStorage()->listDirectories($currentKey, recursive: false);
            natcasesort($directories);
        } catch (ForbiddenPathException|PathTraversalDetected|UnableToListContents) {
            $directories = [];
        }

        try {
            $paginatedMedias = $this->getOriginalStorage()->listMediasPaginated(
                $currentKey,
                perPage: $this->config->getPaginationSizes()[0] ?? 10,
            );
            $medias = $paginatedMedias['items'];
        } catch (\OutOfRangeException) {
            $medias = [];
        }

        return new Response($this->twig->render('@JoliMediaSylius/admin/media/choose_directory.html.twig', [
            'key' => $currentKey,
            'current_key' => $currentKey,
            'parent_key' => $parentKey,
            'directories' => $directories,
            'medias' => $medias,
        ]));
    }

    private function getGridView(Request $request, string $grid): GridViewInterface
    {
        $gridDefinition = $this->gridProvider->get($grid);

        $limit = $request->query->get('limit');
        $criteria = $request->query->all('criteria');
        $sorting = $request->query->all('sorting');

        $gridView = $this->gridViewFactory->create(
            $gridDefinition,
            new Parameters([
                'criteria' => $criteria,
                'limit' => $limit ?? $gridDefinition->getLimits()[0] ?? 10,
                'sorting' => [] !== $sorting ? $sorting : $gridDefinition->getSorting(),
            ]),
        );

        $data = $gridView->getData();

        if ($data instanceof PagerfantaInterface) {
            if (null !== $limit) {
                $data->setMaxPerPage((int) $limit);
            }

            $data->setCurrentPage($request->query->getInt('page', 1));
        }

        return $gridView;
    }

    private function getOriginalStorage(): OriginalStorage
    {
        return $this->getLibrary()->getOriginalStorage();
    }

    private function getLibrary(): Library
    {
        return $this->libraries->getDefault();
    }

    private function createUploadForm(?string $path = null): FormInterface
    {
        $form = $this->formFactory->create(UploadType::class, null, [
            'action' => $this->generateUrl('joli_media_sylius_admin_upload'),
        ]);

        if (null !== $path) {
            $form->setData(['path' => $path]);
        }

        return $form;
    }

    private function isValidReferer(string $referer, Request $request): bool
    {
        $parsed = parse_url($referer);
        if (false === $parsed) {
            return false;
        }

        // Relative URL → OK
        if (!isset($parsed['host'])) {
            return true;
        }

        // Same host only
        return $parsed['host'] === $request->getHost();
    }
}
