<?php

namespace JoliCode\MediaBundle\Transformer;

trait ValueConverterTrait
{
    protected function isPercentageValue(int|string $value): bool
    {
        return \is_string($value) && 1 === preg_match('/^\d+%$/', $value);
    }

    protected function convertPercentageValue(int|string $value, ?int $baseValue = null): int
    {
        if (\is_int($value)) {
            return $value;
        }

        if (!$this->isPercentageValue($value)) {
            throw new \InvalidArgumentException(\sprintf('Value "%s" is not a valid percentage.', $value));
        }

        $value = (int) rtrim($value, '%');

        return null === $baseValue
            ? $value
            : (int) round($baseValue * $value / 100);
    }

    protected function convertPositionValue(int|string|null $value, int $baseValue): int
    {
        if (\is_int($value)) {
            return $value;
        }

        if ('start' === $value) {
            return 0;
        }

        if ('center' === $value || null === $value) {
            return (int) round($baseValue / 2);
        }

        if ('end' === $value) {
            return $baseValue;
        }

        if ($this->isPercentageValue($value)) {
            return $this->convertPercentageValue($value, $baseValue);
        }

        throw new \InvalidArgumentException(\sprintf('Invalid position value "%s". Expected "start", "center", "end", an integer or a percentage value.', $value));
    }
}
