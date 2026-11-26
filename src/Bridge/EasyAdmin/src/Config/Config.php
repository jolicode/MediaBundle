<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Config;

use JoliCode\MediaBundle\Bridge\Config\AbstractConfig;
use Symfony\Contracts\Translation\TranslatorInterface;

readonly class Config extends AbstractConfig
{
    /**
     * @param array<string, bool> $visibility
     * @param array<string>       $acceptedFiles
     * @param array<string>       $acceptedExtensions
     */
    public function __construct(
        TranslatorInterface $translator,
        array $visibility,
        array $acceptedFiles,
        int $maxFileSize,
        ?int $maxFiles = null,
        private int $paginationSize = 20,
        private ?string $textEditorVariation = null,
        array $acceptedExtensions = [],
    ) {
        parent::__construct($translator, $visibility, $acceptedFiles, $maxFileSize, $maxFiles, $acceptedExtensions);
    }

    #[\Override]
    public function getTranslationDomain(): string
    {
        return 'JoliMediaEasyAdminBundle';
    }

    public function getPaginationSize(): int
    {
        return $this->paginationSize;
    }

    /**
     * Name of the variation inserted by default when a media is picked from a
     * TextEditorField - null means that the original media is inserted.
     */
    public function getTextEditorVariation(): ?string
    {
        return $this->textEditorVariation;
    }
}
