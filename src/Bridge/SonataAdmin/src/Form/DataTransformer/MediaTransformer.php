<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Form\DataTransformer;

use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

readonly class MediaTransformer implements DataTransformerInterface
{
    public function __construct(
        private Resolver $resolver,
    ) {
    }

    public function reverseTransform(mixed $path): ?Media
    {
        if (null === $path) {
            return null;
        }

        try {
            return $this->resolver->resolveMedia($path);
        } catch (\Exception) {
            return $this->resolver->createUnresolvedMedia($path);
        }
    }

    public function transform(mixed $media): ?string
    {
        if (null === $media) {
            return null;
        }

        if (\is_string($media)) {
            // If the input is a string, we assume it's a path and return it directly.
            return $media;
        }

        if (!$media instanceof Media) {
            throw new TransformationFailedException('Expected a Media object.');
        }

        return $media->getPath();
    }
}
