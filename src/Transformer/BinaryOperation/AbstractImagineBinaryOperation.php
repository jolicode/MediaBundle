<?php

namespace JoliCode\MediaBundle\Transformer\BinaryOperation;

use Imagine\Image\ImagineInterface;

abstract class AbstractImagineBinaryOperation implements BinaryOperationInterface
{
    protected ?ImagineInterface $imagine = null;

    /**
     * @var array<string, mixed>
     */
    protected array $imagineOptions = [];

    public function setImagine(ImagineInterface $imagine): void
    {
        $this->imagine = $imagine;
    }

    /**
     * @param array<string, mixed> $imagineOptions
     */
    public function setImagineOptions(array $imagineOptions): void
    {
        $this->imagineOptions = $imagineOptions;
    }

    public function getProcessorName(): string
    {
        return 'imagine';
    }
}
