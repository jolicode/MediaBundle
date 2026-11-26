<?php

namespace JoliCode\MediaBundle\Bridge\Config;

use League\Flysystem\PathTraversalDetected;
use League\Flysystem\WhitespacePathNormalizer;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Contracts\Translation\TranslatorInterface;

abstract readonly class AbstractConfig
{
    /**
     * @var array<string>
     */
    protected array $acceptedExtensions;

    /**
     * @param array<string> $acceptedExtensions
     */
    public function __construct(
        protected TranslatorInterface $translator,
        /**
         * @var array<string, bool>
         */
        protected array $visibility,
        /**
         * @var array<string>
         */
        protected array $acceptedFiles,
        protected int $maxFileSize,
        protected ?int $maxFiles = null,
        array $acceptedExtensions = [],
    ) {
        $this->acceptedExtensions = array_map(
            static fn (string $extension): string => strtolower(ltrim($extension, '.')),
            $acceptedExtensions,
        );
    }

    abstract public function getTranslationDomain(): string;

    public function isVisible(string $key): bool
    {
        return isset($this->visibility[$key]) && $this->visibility[$key];
    }

    public function getUploadOption(string $name): mixed
    {
        return match ($name) {
            'acceptedFiles' => $this->acceptedFiles,
            'maxFileSize' => $this->maxFileSize,
            'maxFiles' => $this->maxFiles,
            default => throw new \InvalidArgumentException(\sprintf('Unknown upload option "%s".', $name)),
        };
    }

    public function acceptsPath(string $path): bool
    {
        if ([] === $this->acceptedExtensions) {
            return true;
        }

        try {
            // the name of the file Flysystem will write, e.g. "file.html" for "file.html/."
            $path = (new WhitespacePathNormalizer())->normalizePath($path);
        } catch (PathTraversalDetected) {
            return false;
        }

        $extension = strtolower(pathinfo($path, \PATHINFO_EXTENSION));

        return '' !== $extension && \in_array($extension, $this->acceptedExtensions, true);
    }

    /**
     * @throws UploadException
     */
    public function assertPathIsAccepted(string $path): void
    {
        if (!$this->acceptsPath($path)) {
            throw new UploadException($this->translator->trans('media.upload.uploader.invalid_file_type', domain: $this->getTranslationDomain()));
        }
    }

    /**
     * @return array<string, int|string|array<string, string>>
     */
    public function getUploadOptions(): array
    {
        $config = [
            'messages' => [
                'default' => $this->translator->trans('media.upload.uploader.default_message', domain: $this->getTranslationDomain()),
                'fileTooBig' => $this->translator->trans('media.upload.uploader.file_too_big', domain: $this->getTranslationDomain()),
                'invalidFileType' => $this->translator->trans('media.upload.uploader.invalid_file_type', domain: $this->getTranslationDomain()),
                'maxFilesExceeded' => $this->translator->trans('media.upload.uploader.max_files_exceeded', domain: $this->getTranslationDomain()),
                'responseError' => $this->translator->trans('media.upload.uploader.response_error', domain: $this->getTranslationDomain()),
            ],
            'maxFileSize' => $this->maxFileSize,
        ];

        if (null !== $this->maxFiles) {
            $config['maxFiles'] = $this->maxFiles;
        }

        if ([] !== $this->acceptedFiles) {
            $config['acceptedFiles'] = implode(',', $this->acceptedFiles);
        }

        return $config;
    }
}
