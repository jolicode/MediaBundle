<?php

namespace JoliCode\MediaBundle\Transformer\Resize;

enum Mode: string
{
    case exact = 'exact';
    case inside = 'inside';
    case outside = 'outside';

    public static function fromName(string $name): self
    {
        return match ($name) {
            'exact' => self::exact,
            'inside' => self::inside,
            'outside' => self::outside,
            default => throw new \InvalidArgumentException(\sprintf('Mode "%s" does not exist.', $name)),
        };
    }
}
