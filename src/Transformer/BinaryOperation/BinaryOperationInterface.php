<?php

namespace JoliCode\MediaBundle\Transformer\BinaryOperation;

use JoliCode\MediaBundle\Binary\Binary;

interface BinaryOperationInterface
{
    public function execute(Binary $binary): Binary;

    /**
     * @return array<string, mixed>
     */
    public function getMetadata(): array;

    public function getProcessorName(): string;
}
