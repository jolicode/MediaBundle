<?php

namespace App\Twig\Component;

use App\Entity\Post;
use App\Form\PostType;
use Sylius\TwigHooks\LiveComponent\HookableLiveComponentTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;
use Symfony\UX\LiveComponent\LiveCollectionTrait;

#[AsLiveComponent(
    name: 'post_form_component',
    template: '@SyliusBootstrapAdminUi/shared/crud/common/content/form.html.twig',
)]
class PostFormComponent extends AbstractController
{
    use LiveCollectionTrait;
    use DefaultActionTrait;
    use HookableLiveComponentTrait;

    #[LiveProp]
    public Post $resource;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(PostType::class, $this->resource);
    }
}
