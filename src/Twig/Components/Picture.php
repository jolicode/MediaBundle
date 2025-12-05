<?php

namespace JoliCode\MediaBundle\Twig\Components;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(
    template: '@JoliMediaBundle/templates/components/Picture.html.twig',
)]
class Picture
{
    public string $path;

    public Media $media;

    public bool $appendWebpAlternativeSource = false;

    public bool $hasSources = false;

    public bool $isMediaProcessable = false;

    public function __construct(
        private readonly Resolver $resolver,
        private readonly LibraryContainer $libraries,
    ) {
    }

    /**
     * @param string[]|array<string, string> $sources
     */
    public function mount(
        ?Media $media = null,
        ?string $path = null,
        ?string $library = null,
        ?string $variation = null,
        array $sources = [],
    ): void {
        if ($media instanceof Media) {
            if (null !== $path) {
                throw new \InvalidArgumentException('You must provide either a media or a path, not both');
            }

            $libraryName = $media->getLibrary()->getName();

            if (null !== $library && $libraryName !== $library) {
                throw new \InvalidArgumentException(\sprintf('The media "%s" is stored in the library "%s", not in "%s"', $media->getPath(), $libraryName, $library));
            }
        } else {
            if (null === $path) {
                throw new \InvalidArgumentException('You must provide either a media or a path');
            }

            try {
                $media = $this->resolver->resolveMedia($path, $library);
            } catch (MediaNotFoundException) {
                // the media cannot be found based on the path and library, so we create a fake media object
                // to allow the component to render - there will obviously be a 404 error when trying to access the media
                $media = new Media($path, $this->libraries->get($library)->getOriginalStorage());
            }
        }

        $this->hasSources = [] !== $sources;
        $this->appendWebpAlternativeSource = (null !== $variation)
            && ($media
                ->getLibrary()
                ->getVariation($variation)
                ->getWebpAlternativeVariation() instanceof Variation
            );
        $this->isMediaProcessable = $this->resolver->isMediaProcessable($media);

        $this->media = $media;
    }
}
