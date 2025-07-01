<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class JoliMediaSonataAdminExtension extends AbstractExtension
{
    #[\Override]
    public function getFilters(): array
    {
        return [
            new TwigFilter('basename', 'basename'),
            new TwigFilter('readable_filesize', $this->getReadableFileSize(...)),
        ];
    }

    public function getReadableFileSize(float|int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, \count($units) - 1);

        $bytes /= 1024 ** $pow;

        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
