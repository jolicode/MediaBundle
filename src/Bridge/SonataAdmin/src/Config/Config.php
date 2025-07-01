<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Config;

use Symfony\Contracts\Translation\TranslatorInterface;

readonly class Config
{
    public function __construct(
        private TranslatorInterface $translator,
        /**
         * @var array<string, bool>
         */
        private array $visibility,
        /**
         * @var array<string>
         */
        private array $acceptedFiles,
        private int $maxFileSize,
        private ?int $maxFiles = null,
    ) {
    }

    public function isVisible(string $key): bool
    {
        return isset($this->visibility[$key]) && true === $this->visibility[$key];
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
     * @return array<string, int|string|array<string>>
     */
    public function getUploadOptions(): array
    {
        $config = [
            'dictDefaultMessage' => $this->translator->trans('media.upload.dropzone.default_message', domain: 'JoliMediaSonataAdminBundle'),
            'dictFallbackMessage' => $this->translator->trans('media.upload.dropzone.fallback_message', domain: 'JoliMediaSonataAdminBundle'),
            'dictFallbackText' => $this->translator->trans('media.upload.dropzone.fallback_text', domain: 'JoliMediaSonataAdminBundle'),
            'dictFileTooBig' => $this->translator->trans('media.upload.dropzone.file_too_big', domain: 'JoliMediaSonataAdminBundle'),
            'dictInvalidFileType' => $this->translator->trans('media.upload.dropzone.invalid_file_type', domain: 'JoliMediaSonataAdminBundle'),
            'dictMaxFilesExceeded' => $this->translator->trans('media.upload.dropzone.max_files_exceeded', domain: 'JoliMediaSonataAdminBundle'),
            'maxFilesize' => $this->maxFileSize,
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
