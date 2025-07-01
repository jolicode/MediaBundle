<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\Asset;

use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\Asset\PackageInterface;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Component\HttpFoundation\RequestStack;

final readonly class Package implements PackageInterface
{
    public const string NAME = 'joli-media-sonata-admin';

    private PackageInterface $package;

    public function __construct(RequestStack $requestStack)
    {
        $this->package = new PathPackage(
            '/bundles/jolimediasonataadmin',
            new JsonManifestVersionStrategy(__DIR__ . '/../../public/manifest.json'),
            new RequestStackContext($requestStack)
        );
    }

    public function getUrl(string $assetPath): string
    {
        return $this->package->getUrl($assetPath);
    }

    public function getVersion(string $assetPath): string
    {
        return $this->package->getVersion($assetPath);
    }
}
