<?php

namespace JoliCode\MediaBundle\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class Media extends Constraint
{
    public const INVALID_EXTENSION_ERROR = 'd3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b';

    /**
     * @var string[]
     */
    public array $allowedExtensions = [];

    /**
     * @var string[]
     */
    public array $allowedMimeTypes = [];

    /**
     * @var string[]
     */
    public array $allowedPaths = [];

    /**
     * @var string[]
     */
    public array $allowedTypes = [];

    public string $extensionMessage = 'This file extension is not allowed. Allowed extensions are: {{ extensions }}.';

    public string $mimeTypeMessage = 'This mime type is not allowed. Allowed mime types are: {{ mimeTypes }}.';

    public string $typeMessage = 'This file type is not allowed. Allowed types are: {{ types }}.';

    public string $pathMessage = 'The file path "{{ value }}" is not allowed. Allowed paths must start with one of the following: {{ paths }}.';

    public string $unresolvedMediaMessage = 'The media "{{ value }}" could not be resolved.';

    /**
     * @param string[]             $allowedExtensions
     * @param string[]             $allowedMimeTypes
     * @param string[]             $allowedPaths
     * @param string[]             $allowedTypes
     * @param array<string, mixed> $options
     */
    public function __construct(
        ?array $allowedExtensions = [],
        ?string $extensionMessage = null,
        ?array $allowedMimeTypes = [],
        ?string $mimeTypeMessage = null,
        ?array $allowedTypes = [],
        ?string $typeMessage = null,
        ?array $allowedPaths = [],
        ?string $pathMessage = null,
        public ?string $library = null,
        ?string $unresolvedMediaMessage = null,
        ?array $groups = null,
        mixed $payload = null,
        array $options = [],
    ) {
        parent::__construct($options, $groups, $payload);

        $this->allowedExtensions = $allowedExtensions ?? $this->allowedExtensions;
        $this->allowedMimeTypes = $allowedMimeTypes ?? $this->allowedMimeTypes;
        $this->allowedTypes = $allowedTypes ?? $this->allowedTypes;
        $this->allowedPaths = $allowedPaths ?? $this->allowedPaths;

        $this->extensionMessage = $extensionMessage ?? $this->extensionMessage;
        $this->mimeTypeMessage = $mimeTypeMessage ?? $this->mimeTypeMessage;
        $this->typeMessage = $typeMessage ?? $this->typeMessage;
        $this->pathMessage = $pathMessage ?? $this->pathMessage;
        $this->unresolvedMediaMessage = $unresolvedMediaMessage ?? $this->unresolvedMediaMessage;
    }

    #[\Override]
    public function validatedBy(): string
    {
        return MediaValidator::class;
    }
}
