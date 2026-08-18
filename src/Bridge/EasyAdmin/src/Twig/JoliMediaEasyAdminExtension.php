<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Twig;

use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use JoliCode\MediaBundle\Bridge\EasyAdmin\Router\MediaAdminRouter;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class JoliMediaEasyAdminExtension extends AbstractExtension
{
    public function __construct(
        private readonly MediaAdminRouter $mediaAdminRouter,
        private readonly Config $config,
    ) {
    }

    #[\Override]
    public function getFunctions(): array
    {
        return [
            new TwigFunction('joli_media_admin_route', $this->mediaAdminRouter->getRouteName(...)),
            new TwigFunction('joli_media_admin_url', $this->mediaAdminRouter->generateUrl(...)),
            new TwigFunction('joli_media_admin_uses_pretty_urls', $this->mediaAdminRouter->usesPrettyUrls(...)),
            new TwigFunction('joli_media_admin_text_editor_variation', $this->config->getTextEditorVariation(...)),
        ];
    }
}
