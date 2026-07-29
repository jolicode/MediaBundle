<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Config;

use JoliCode\MediaBundle\Bridge\Config\AbstractConfig;
use Symfony\Contracts\Translation\TranslatorInterface;

readonly class Config extends AbstractConfig
{
    /**
     * @param array<string, bool> $visibility
     * @param array<string>       $acceptedFiles
     */
    public function __construct(
        TranslatorInterface $translator,
        array $visibility,
        array $acceptedFiles,
        int $maxFileSize,
        ?int $maxFiles = null,
        private int $paginationSize = 25,
    ) {
        parent::__construct($translator, $visibility, $acceptedFiles, $maxFileSize, $maxFiles);
    }

    #[\Override]
    public function getTranslationDomain(): string
    {
        return 'JoliMediaSonataAdminBundle';
    }

    public function getPaginationSize(): int
    {
        return $this->paginationSize;
    }
}
