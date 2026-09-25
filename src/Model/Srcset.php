<?php

namespace JoliCode\MediaBundle\Model;

/**
 * @implements \IteratorAggregate<int, SrcsetCandidate>
 */
readonly class Srcset implements \Countable, \IteratorAggregate, \Stringable
{
    /**
     * @var SrcsetCandidate[]
     */
    private array $candidates;

    public function __construct(SrcsetCandidate ...$candidates)
    {
        $this->candidates = array_values($candidates);
    }

    public function __toString(): string
    {
        return implode(', ', array_map(strval(...), $this->candidates));
    }

    public function count(): int
    {
        return \count($this->candidates);
    }

    /**
     * @return SrcsetCandidate[]
     */
    public function getCandidates(): array
    {
        return $this->candidates;
    }

    public function getIterator(): \Traversable
    {
        return new \ArrayIterator($this->candidates);
    }

    public function getSmallestWidth(): ?int
    {
        $widths = array_filter(array_map(static fn (SrcsetCandidate $candidate): ?int => $candidate->width, $this->candidates));

        return [] === $widths ? null : min($widths);
    }

    public function isEmpty(): bool
    {
        return [] === $this->candidates;
    }

    /**
     * @return array<int, array{url: string, variation: string, descriptor: string, width: int|null, height: int|null, mimeType: string|null}>
     */
    public function toArray(): array
    {
        return array_map(static fn (SrcsetCandidate $candidate): array => $candidate->toArray(), $this->candidates);
    }
}
