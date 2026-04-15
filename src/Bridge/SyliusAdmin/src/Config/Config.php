<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Config;

use Symfony\Contracts\Translation\TranslatorInterface;

readonly class Config
{
    /**
     * @param array<string>       $acceptedFiles
     * @param array<string, bool> $visibility
     * @param int[]               $paginationSizes
     */
    public function __construct(
        private TranslatorInterface $translator,
        private array $visibility,
        private array $acceptedFiles,
        private int $maxFileSize,
        private array $paginationSizes,
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
            'dictDefaultMessage' => $this->translator->trans('media.upload.dropzone.default_message', [], 'JoliMediaSyliusAdminBundle'),
            'dictFallbackMessage' => $this->translator->trans('media.upload.dropzone.fallback_message', [], 'JoliMediaSyliusAdminBundle'),
            'dictFallbackText' => $this->translator->trans('media.upload.dropzone.fallback_text', [], 'JoliMediaSyliusAdminBundle'),
            'dictFileTooBig' => $this->translator->trans('media.upload.dropzone.file_too_big', [], 'JoliMediaSyliusAdminBundle'),
            'dictInvalidFileType' => $this->translator->trans('media.upload.dropzone.invalid_file_type', [], 'JoliMediaSyliusAdminBundle'),
            'dictMaxFilesExceeded' => $this->translator->trans('media.upload.dropzone.max_files_exceeded', [], 'JoliMediaSyliusAdminBundle'),
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

    /**
     * @return int[]
     */
    public function getPaginationSizes(): array
    {
        return $this->paginationSizes;
    }
}
