<?php

namespace JoliCode\MediaBundle\Transformer;

class TransformerChain implements \Iterator
{
    private int $position = 0;

    public function __construct(
        /**
         * @var array<int, TransformerInterface>
         */
        private readonly array $transformers,
    ) {
    }

    /**
     * @return TransformerInterface[]
     */
    public function getTransformers(): array
    {
        return $this->transformers;
    }

    public function rewind(): void
    {
        $this->position = 0;
    }

    public function key(): int
    {
        return $this->position;
    }

    public function current(): TransformerInterface
    {
        if (!$this->valid()) {
            throw new \OutOfBoundsException('No current transformer available.');
        }

        return $this->transformers[$this->position];
    }

    public function next(): void
    {
        ++$this->position;
    }

    public function valid(): bool
    {
        return isset($this->transformers[$this->position]);
    }
}
