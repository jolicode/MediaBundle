<?php

namespace JoliCode\MediaBundle\Bridge\Config;

use Symfony\Contracts\Translation\TranslatorInterface;

abstract readonly class AbstractConfig
{
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
    ) {
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
