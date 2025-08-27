<?php

namespace JoliCode\MediaBundle\Bridge\Twig;

use JoliCode\MediaBundle\Bridge\Security\Voter\AdminAction;
use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class JoliMediaAdminExtension extends AbstractExtension
{
    public function __construct(
        private readonly LibraryContainer $libraries,
        private readonly ?AuthorizationCheckerInterface $authorizationChecker = null,
    ) {
    }

    #[\Override]
    public function getFilters(): array
    {
        return [
            new TwigFilter('joli_media_admin_basename', 'basename'),
            new TwigFilter('joli_media_admin_readable_filesize', $this->getReadableFileSize(...)),
        ];
    }

    #[\Override]
    public function getFunctions()
    {
        return [
            new TwigFunction('joli_media_admin_is_granted', $this->isGranted(...)),
        ];
    }

    public function getReadableFileSize(float|int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
        $bytes = max($bytes, 0);
        $pow = max(floor(($bytes ? log($bytes) : 0) / log(1024)), 0);
        $pow = min($pow, \count($units) - 1);

        $bytes /= 1024 ** $pow;

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    public function isGranted(
        string $action,
        ?string $libraryName = null,
        ?string $path = null,
        ?string $to = null,
        ?string $variation = null,
    ): bool {
        $actionName = \sprintf('%s::%s', AdminAction::class, $action);
        $action = \defined($actionName) ? \constant($actionName) : $action;

        return $this->authorizationChecker?->isGranted($action, new AdminAction(
            libraryName: $libraryName ?? $this->libraries->getDefaultName(),
            path: $path,
            to: $to,
            variation: $variation,
        )) ?? true;
    }
}
