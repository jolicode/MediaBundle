<?php

namespace JoliCode\MediaBundle\Transformer;

interface NeedsImmediateProcessingTransformerInterface
{
    /**
     * @return array<string, mixed>
     */
    public function getAsMetadata(): array;
}
