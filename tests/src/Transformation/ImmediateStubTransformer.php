<?php

namespace JoliCode\MediaBundle\Tests\Transformation;

use JoliCode\MediaBundle\Transformation\Transformation;
use JoliCode\MediaBundle\Transformer\NeedsImmediateProcessingTransformerInterface;
use JoliCode\MediaBundle\Transformer\TransformerInterface;

class ImmediateStubTransformer implements TransformerInterface, NeedsImmediateProcessingTransformerInterface
{
    public bool $transformCalled = false;

    public function getAsMetadata(): array
    {
        return [];
    }

    public function transform(Transformation $transformation): void
    {
        $this->transformCalled = true;
    }
}
