<?php

namespace JoliCode\MediaBundle\Transformer;

use JoliCode\MediaBundle\Transformer\BinaryOperation\BinaryOperationInterface;
use JoliCode\MediaBundle\Transformer\BinaryOperation\ExpandBinaryOperation;
use Psr\Log\LoggerInterface;

readonly class Expand extends AbstractTransformer implements TransformerInterface, WithOperationTransformerInterface
{
    /**
     * @param int|string      $width
     * @param int|string      $height
     * @param int|string|null $positionX
     * @param int|string|null $positionY
     */
    public function __construct(
        private mixed $width,
        private mixed $height,
        private mixed $positionX = null,
        private mixed $positionY = null,
        private ?string $backgroundColor = null,
        private ?LoggerInterface $logger = null,
    ) {
    }

    public function getBinaryOperation(?int $binaryWidth, ?int $binaryHeight): BinaryOperationInterface
    {
        return new ExpandBinaryOperation(
            $this->logger,
            $binaryWidth,
            $binaryHeight,
            $this->width,
            $this->height,
            $this->positionX,
            $this->positionY,
            $this->backgroundColor,
        );
    }
}
