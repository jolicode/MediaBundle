<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Admin\Form\DataTransformer;

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

    public function reverseTransform(mixed $value): ?Media
    {
        if (null === $value) {
            return null;
        }

        try {
            return $this->resolver->resolveMedia($value);
        } catch (\Exception) {
            return $this->resolver->createUnresolvedMedia($value);
        }
    }

    public function transform(mixed $value): ?string
    {
        if (null === $value) {
            return null;
        }

        if (\is_string($value)) {
            return $value;
        }

        if (!$value instanceof Media) {
            throw new TransformationFailedException('Expected a Media object.');
        }

        return $value->getPath();
    }
}
