<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Asset;

use Symfony\Component\Asset\Context\RequestStackContext;
use Symfony\Component\Asset\PackageInterface;
use Symfony\Component\Asset\PathPackage;
use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Symfony Asset named package grouping the assets of this bundle. Referencing an
 * asset through it resolves its hashed name when the page is rendered, and prefixes
 * it with the base path of the current request.
 */
final readonly class Package implements PackageInterface
{
    public const NAME = 'joli-media-easy-admin';
    public const CSS_FILE = 'joli-media-easy-admin.css';
    public const JS_FILE = 'joli-media-easy-admin.js';

    private PackageInterface $package;

    public function __construct(RequestStack $requestStack)
    {
        $this->package = new PathPackage(
            '/bundles/jolimediaeasyadmin',
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
