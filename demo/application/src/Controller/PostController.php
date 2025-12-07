<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PostController extends AbstractController
{
    public function __construct(private readonly PostRepository $postRepository)
    {
    }

    #[Route('/', name: 'app_post_index')]
    public function index(): Response
    {
        return $this->render('post/index.html.twig', [
            'posts' => $this->postRepository->findBy(['isPublished' => true], ['publishedAt' => 'DESC']),
        ]);
    }

    #[Route('/blog/{slug:post}', name: 'app_post_show')]
    public function show(Post $post): Response
    {
        if (!$post->isCurrentlyPublished()) {
            throw $this->createNotFoundException('This post is not published.');
        }

        return $this->render('post/show.html.twig', [
            'post' => $post,
        ]);
    }
}
