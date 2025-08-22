<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;

interface ProcessorInterface
{
    public function canProcessInputFormat(string $inputFormat): bool;

    public function canProcessOutputFormat(string $inputFormat): bool;

    public function getName(): string;

    /**
     * @return Format[]
     */
    public function getProcessableInputFormats(): array;

    /**
     * @return Format[]
     */
    public function getProcessableOutputFormats(): array;

    /**
     * @param array<string, mixed> $processingOptions
     */
    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary;
}
