<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Exception\UnprocessableMediaException;
use JoliCode\MediaBundle\Transformation\Transformation;

abstract readonly class AbstractTransformer implements TransformerInterface
{
    use ValueConverterTrait;

    /**
     * @return array{width: int, height: int}
     */
    protected function requireBinaryDimensions(Transformation $transformation): array
    {
        if (null === $transformation->binaryWidth || null === $transformation->binaryHeight) {
            throw UnprocessableMediaException::fromTransformation($transformation, \sprintf('the pixel dimensions of the media could not be determined, hence the "%s" transformer cannot be applied', static::class));
        }

        return [
            'width' => $transformation->binaryWidth,
            'height' => $transformation->binaryHeight,
        ];
    }

    /**
     * @return array{width: int, height: int}
     */
    protected function requireTargetDimensions(Transformation $transformation): array
    {
        if (null === $transformation->targetWidth || null === $transformation->targetHeight) {
            throw UnprocessableMediaException::fromTransformation($transformation, \sprintf('the pixel dimensions of the media could not be determined, hence the "%s" transformer cannot be applied', static::class));
        }

        return [
            'width' => $transformation->targetWidth,
            'height' => $transformation->targetHeight,
        ];
    }
}
