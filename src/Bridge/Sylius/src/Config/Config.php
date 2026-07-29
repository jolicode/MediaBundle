<?php

namespace JoliCode\MediaBundle\Bridge\Sylius\Config;

use JoliCode\MediaBundle\Bridge\Config\AbstractConfig;
use Symfony\Contracts\Translation\TranslatorInterface;

readonly class Config extends AbstractConfig
{
    /**
     * @param array<string, bool> $visibility
     * @param array<string>       $acceptedFiles
     * @param int[]               $paginationSizes
     */
    public function __construct(
        TranslatorInterface $translator,
        array $visibility,
        array $acceptedFiles,
        int $maxFileSize,
        private array $paginationSizes,
        ?int $maxFiles = null,
    ) {
        parent::__construct($translator, $visibility, $acceptedFiles, $maxFileSize, $maxFiles);
    }

    #[\Override]
    public function getTranslationDomain(): string
    {
        return 'JoliMediaSyliusBundle';
    }

    /**
     * @return int[]
     */
    public function getPaginationSizes(): array
    {
        return $this->paginationSizes;
    }
}
