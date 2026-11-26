<?php

namespace JoliCode\MediaBundle\Bridge\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\File;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD)]
class AcceptedExtension extends Constraint
{
    public const INVALID_EXTENSION_ERROR = File::INVALID_EXTENSION_ERROR;

    public string $message = 'media.error.invalid_extension';

    /**
     * @param string[] $extensions
     */
    public function __construct(
        public array $extensions = [],
        ?string $message = null,
        public ?string $translationDomain = null,
        ?array $groups = null,
        mixed $payload = null,
    ) {
        parent::__construct(null, $groups, $payload);

        $this->message = $message ?? $this->message;
    }
}
