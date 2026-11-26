<?php

namespace JoliCode\MediaBundle\Bridge\Validator;

use League\Flysystem\PathTraversalDetected;
use League\Flysystem\WhitespacePathNormalizer;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class AcceptedExtensionValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof AcceptedExtension) {
            throw new UnexpectedTypeException($constraint, AcceptedExtension::class);
        }

        if (null === $value || '' === $value || [] === $constraint->extensions) {
            return;
        }

        if ($value instanceof UploadedFile) {
            $value = $value->getClientOriginalName();
        }

        if (!\is_string($value)) {
            throw new UnexpectedValueException($value, 'string or ' . UploadedFile::class);
        }

        try {
            // the name of the file Flysystem will write, e.g. "file.html" for "file.html/."
            $extension = strtolower(pathinfo((new WhitespacePathNormalizer())->normalizePath($value), \PATHINFO_EXTENSION));
        } catch (PathTraversalDetected) {
            $extension = '';
        }

        if ('' !== $extension && \in_array($extension, $constraint->extensions, true)) {
            return;
        }

        $violation = $this->context->buildViolation($constraint->message)
            ->setParameter('%extension%', $this->formatValue($extension))
            ->setParameter('%extensions%', $this->formatValues($constraint->extensions))
            ->setCode(AcceptedExtension::INVALID_EXTENSION_ERROR)
        ;

        if (null !== $constraint->translationDomain) {
            $violation->setTranslationDomain($constraint->translationDomain);
        }

        $violation->addViolation();
    }
}
