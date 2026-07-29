<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Processor\ProcessorInterface;
use JoliCode\MediaBundle\Transformation\Transformation;

class StubProcessor implements ProcessorInterface
{
    public function __construct(private readonly Binary $result)
    {
    }

    public function canProcessInputFormat(string $inputFormat): bool
    {
        return true;
    }

    public function canProcessOutputFormat(string $inputFormat): bool
    {
        return true;
    }

    public function getName(): string
    {
        return 'stub';
    }

    public function getProcessableInputFormats(): array
    {
        return Format::cases();
    }

    public function getProcessableOutputFormats(): array
    {
        return Format::cases();
    }

    public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary
    {
        return $this->result;
    }
}
