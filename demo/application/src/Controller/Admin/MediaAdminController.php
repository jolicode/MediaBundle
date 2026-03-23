<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use JoliCode\MediaBundle\Exception\ForbiddenPathException;
use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use Pagerfanta\PagerfantaInterface;
use Sylius\Component\Grid\Parameters;
use Sylius\Component\Grid\Provider\GridProviderInterface;
use Sylius\Component\Grid\View\GridViewFactoryInterface;
use Sylius\Component\Grid\View\GridViewInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route(name: 'joli_media_sylius_admin_')]
class MediaAdminController extends AbstractController
{
    public function __construct(
        private readonly LibraryContainer $libraries,
        private readonly GridViewFactoryInterface $gridViewFactory,
        private readonly GridProviderInterface $gridProvider,
    ) {
    }

    #[Route(path: '/sylius/media/create-directory', name: 'create_directory', methods: [Request::METHOD_POST])]
    public function createDirectory(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$this->isCsrfTokenValid('media_create_directory', $data['_csrf_token'] ?? '')) {
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

    #[Route(path: '/sylius/media/rename', name: 'rename', methods: [Request::METHOD_POST])]
    public function rename(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$this->isCsrfTokenValid('media_rename', $data['_csrf_token'] ?? '')) {
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

    #[Route(path: '/sylius/media/explore/{key}', name: 'explore', requirements: ['key' => '.*'], methods: [Request::METHOD_GET])]
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

        return $this->render('media/index.html.twig', [
            'key' => $key,
            'current_key' => $currentKey,
            'resources' => $gridView,
            'directories' => $directories,
            'medias' => $gridView->getData(),
        ]);
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
}
