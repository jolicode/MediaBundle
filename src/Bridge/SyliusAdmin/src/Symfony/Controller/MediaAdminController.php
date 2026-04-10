<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony\Controller;

use JoliCode\MediaBundle\Bridge\SyliusAdmin\Config\Config;
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
        $data = json_decode($request->getContent(), true);

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_create_directory', $data['_csrf_token'] ?? ''))) {
            return $this->json(['success' => false, 'error' => 'Invalid CSRF token'], 400);
        }

        unset($data['_csrf_token']);

        if (!isset($data['parentPath'], $data['name'])) {
            return $this->json(['success' => false, 'error' => 'Missing parameters'], 400);
        }

        $name = trim($data['name']);
        if (empty($name)) {
            return $this->json(['success' => false, 'error' => 'Directory name cannot be empty'], 400);
        }

        $parentPath = rtrim($data['parentPath'], '/');
        $newPath = empty($parentPath) ? $name : $parentPath . '/' . $name;

        try {
            $this->getOriginalStorage()->createDirectory($newPath);

            return $this->json(['success' => true]);
        } catch (\Throwable $e) {
            return $this->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    #[Route(path: '/rename-directory', name: 'rename_directory', methods: [Request::METHOD_POST])]
    public function renameDirectory(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_rename', $data['_csrf_token'] ?? ''))) {
            return $this->json(['success' => false, 'error' => 'Invalid CSRF token'], 400);
        }

        unset($data['_csrf_token']);

        if (!isset($data['oldPath'], $data['newPath'])) {
            return $this->json(['success' => false, 'error' => 'Missing parameters'], 400);
        }

        try {
            $this->getOriginalStorage()->moveFolder($data['oldPath'], $data['newPath']);

            return $this->json(['success' => true]);
        } catch (\Throwable $e) {
            return $this->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    #[Route(path: '/rename', name: 'rename', methods: [Request::METHOD_POST])]
    public function rename(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('media_rename', $data['_csrf_token'] ?? ''))) {
            return $this->json(['success' => false, 'error' => 'Invalid CSRF token'], 400);
        }

        unset($data['_csrf_token']);

        if (!isset($data['oldPath'], $data['newPath'])) {
            return $this->json(['success' => false, 'error' => 'Missing parameters'], 400);
        }

        try {
            $this->getOriginalStorage()->move($data['oldPath'], $data['newPath']);

            $referer = $request->headers->get('referer');
            $redirectUrl = $referer ? str_replace(rawurlencode($data['oldPath']), rawurlencode($data['newPath']), $referer) : null;

            return $this->json([
                'success' => true,
                'newPath' => $data['newPath'],
                'redirectUrl' => $redirectUrl,
            ]);
        } catch (\Throwable $e) {
            return $this->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    #[Route(path: '/move', name: 'move', methods: [Request::METHOD_POST])]
    public function move(Request $request): RedirectResponse
    {
        $from = Resolver::normalizePath($request->request->getString('from'));
        $to = Resolver::normalizePath($request->request->getString('to'));

        try {
            $target = \sprintf('%s/%s', $to, basename($from));
            $this->getOriginalStorage()->move($from, $target);

            $this->addFlash('success', $this->translator->trans(
                'media.move_success',
                ['%from%' => $from, '%to%' => $target],
                'JoliMediaSyliusAdminBundle'
            ));

            return $this->redirectToRoute('joli_media_sylius_admin_show', ['key' => $target]);
        } catch (\Throwable $e) {
            $this->addFlash('danger', $this->translator->trans(
                'media.move_failure',
                ['%from%' => $from, '%to%' => $to, '%error%' => $e->getMessage()],
                'JoliMediaSyliusAdminBundle'
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

        $gridView = $this->getGridView($request, 'joli_media_explore');

        return new Response($this->twig->render('@JoliMediaSyliusAdmin/media/index.html.twig', [
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

            return new Response($this->twig->render('@JoliMediaSyliusAdmin/media/choose_directory.html.twig', [
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
            $medias = $paginatedMedias['items'];
            $pagination = [
                'page' => $paginatedMedias['page'],
                'totalPages' => $paginatedMedias['totalPages'],
                'total' => $paginatedMedias['total'],
            ];
        } catch (\OutOfRangeException) {
            $medias = [];
            $pagination = [
                'page' => 1,
                'totalPages' => 1,
                'total' => 0,
            ];
        }

        return new Response($this->twig->render('@JoliMediaSyliusAdmin/media/choose.html.twig', [
            'key' => $key,
            'current_key' => $currentKey,
            'directories' => $directories,
            'medias' => $medias,
            'pagination' => $pagination,
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

            return new JsonResponse([
                'files' => [[
                    'url' => $media->getUrl(),
                    'thumbnailUrl' => null,
                    'name' => $filename,
                    'size' => $size,
                    'type' => $mime,
                    'link' => $this->generateUrl('joli_media_sylius_admin_explore', ['key' => $media->getPath()]),
                    'mediaUrl' => $media->getPath(),
                    'mediaFolder' => $media->getFolderPath(),
                    'mediaTemplate' => $this->twig->render('@JoliMediaSyliusAdmin/_preview.html.twig', [
                        'media' => $media,
                        'className' => 'media-preview',
                    ]),
                    'mediaPreview' => $this->twig->render('@JoliMediaSyliusAdmin/_as_image.html.twig', [
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

        return new Response($this->twig->render('@JoliMediaSyliusAdmin/media/show.html.twig', [
            'config' => $this->config,
            'media' => $media,
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
        $form = $this->formFactory->create(\JoliCode\MediaBundle\Bridge\SyliusAdmin\Form\Type\UploadType::class, null, [
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
