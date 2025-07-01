<?php

namespace JoliCode\MediaBundle\Twig;

use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class JoliMediaExtension extends AbstractExtension
{
    public function __construct(
        private readonly Resolver $resolver,
    ) {
    }

    #[\Override]
    public function getFilters(): array
    {
        return [
            new TwigFilter('joli_media', $this->getMediaVariation(...)),
            new TwigFilter('joli_media_url', $this->getUrl(...)),
            new TwigFilter('joli_media_absolute_url', $this->getAbsoluteUrl(...)),
        ];
    }

    private function getAbsoluteUrl(
        string|Media|MediaVariation $path,
        ?string $variationName = null,
        ?string $libraryName = null,
    ): ?string {
        return $this->getUrl($path, $variationName, $libraryName, UrlGeneratorInterface::ABSOLUTE_URL);
    }

    private function getUrl(
        string|Media|MediaVariation $path,
        ?string $variationName = null,
        ?string $libraryName = null,
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): ?string {
        return $this->getMediaVariation($path, $variationName, $libraryName)?->getUrl($referenceType);
    }

    private function getMediaVariation(
        string|Media|MediaVariation $path,
        ?string $variationName = null,
        ?string $libraryName = null,
    ): MediaVariation|Media|null {
        if (null !== $variationName) {
            if (\is_string($path)) {
                $mediaVariation = $this->resolver->resolve($path, $libraryName, $variationName);
            } elseif ($path instanceof Media) {
                $mediaVariation = $this->resolver->resolveMediaVariation($path->getPath(), $variationName, $libraryName ?? $path->getLibrary()->getName());
            } else {
                $mediaVariation = $this->resolver->resolveMediaVariation($path->getMedia()->getPath(), $variationName, $libraryName ?? $path->getMedia()->getLibrary()->getName());
            }

            if (null !== $mediaVariation) {
                return $mediaVariation;
            }
        }

        if ($path instanceof Media) {
            return $path;
        }

        if ($path instanceof MediaVariation) {
            return $path->getMedia();
        }

        // either no variation name was passed or the variation could not be
        // resolved (it maybe the variation is not processable for this media),
        // let's try to resolve the original media
        return $this->resolver->resolve($path, $libraryName);
    }
}
