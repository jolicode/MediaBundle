<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;

interface PostProcessorInterface
{
    public function canProcessFormat(string $format): bool;

    public function getName(): string;

    /**
     * @return Format[]
     */
    public function getProcessableFormats(): array;

    /**
     * @param array<string, mixed> $postProcessingOptions
     */
    public function process(Binary $binary, array $postProcessingOptions): Binary;
}
