<?php

namespace JoliCode\MediaBundle\Validator;

use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Model\Media as MediaModel;
use JoliCode\MediaBundle\Resolver\Resolver;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class MediaValidator extends ConstraintValidator
{
    public function __construct(
        private readonly Resolver $resolver,
    ) {
    }

    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof Media) {
            throw new UnexpectedTypeException($constraint, Media::class);
        }

        if (null === $value) {
            return;
        }

        if (\is_string($value)) {
            try {
                $media = $this->resolver->resolveMedia($value, $constraint->library);
            } catch (MediaNotFoundException) {
                $this->context->buildViolation($constraint->unresolvedMediaMessage)
                    ->setParameter('{{ value }}', $value)
                    ->addViolation()
                ;

                return;
            }
        } elseif ($value instanceof MediaModel) {
            $media = $value;
        } else {
            throw new UnexpectedValueException($value, 'string or JoliCode\MediaBundle\Model\Media');
        }

        if ([] !== $constraint->allowedExtensions && !\in_array($media->getFormat(), $constraint->allowedExtensions, true)) {
            $this->context->buildViolation($constraint->extensionMessage)
                ->setParameter('{{ extensions }}', implode(', ', $constraint->allowedExtensions))
                ->addViolation()
            ;
        }

        if ([] !== $constraint->allowedMimeTypes && !\in_array($media->getMimeType(), $constraint->allowedMimeTypes, true)) {
            $this->context->buildViolation($constraint->mimeTypeMessage)
                ->setParameter('{{ mimeTypes }}', implode(', ', $constraint->allowedMimeTypes))
                ->addViolation()
            ;
        }

        if ([] !== $constraint->allowedPaths && [] === array_filter($constraint->allowedPaths, fn ($prefix): bool => str_starts_with($media->getPath(), $prefix))) {
            $this->context->buildViolation($constraint->pathMessage)
                ->setParameter('{{ paths }}', implode(', ', $constraint->allowedPaths))
                ->setParameter('{{ value }}', $media->getPath())
                ->addViolation()
            ;
        }

        if ([] !== $constraint->allowedTypes && !\in_array($media->getFileType(), $constraint->allowedTypes, true)) {
            $this->context->buildViolation($constraint->typeMessage)
                ->setParameter('{{ types }}', implode(', ', $constraint->allowedTypes))
                ->addViolation()
            ;
        }

        if (null !== $constraint->maxPathLength && mb_strlen($media->getPath()) > $constraint->maxPathLength) {
            $this->context->buildViolation($constraint->maxPathLengthMessage)
                ->setParameter('{{ limit }}', (string) $constraint->maxPathLength)
                ->setParameter('{{ value }}', $media->getPath())
                ->addViolation()
            ;
        }
    }
}
