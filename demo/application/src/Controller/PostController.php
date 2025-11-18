<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PostController extends AbstractController
{
    #[Route('/', name: 'app_post_index')]
    public function index(
        PostRepository $postRepository,
    ): Response {
        return $this->render('post/index.html.twig', [
            'posts' => $postRepository->findBy(['isPublished' => true], ['id' => 'DESC']),
        ]);
    }

    #[Route('/blog/{slug}', name: 'app_post_show')]
    public function show(
        #[MapEntity()]
        Post $post,
    ): Response {
        if (!$post->isCurrentlyPublished()) {
            throw $this->createNotFoundException('This post is not published.');
        }

        return $this->render('post/show.html.twig', [
            'post' => $post,
        ]);
    }
}
