<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Asset;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Context\AdminContextInterface;
use EasyCorp\Bundle\EasyAdminBundle\Dto\AssetDto;

final class AssetRegistrar
{
    public function registerOn(AdminContextInterface $adminContext): void
    {
        $pageAssets = $adminContext->getAssets();
        $crud = $adminContext->getCrud();
        $fieldAssets = $crud?->getFieldAssets($crud->getCurrentPage() ?? '');

        if (!$this->isRegistered(Package::CSS_FILE, $pageAssets->getCssAssets(), $fieldAssets?->getCssAssets())) {
            $pageAssets->addCssAsset($this->createAsset(Package::CSS_FILE));
        }

        if (!$this->isRegistered(Package::JS_FILE, $pageAssets->getJsAssets(), $fieldAssets?->getJsAssets())) {
            $pageAssets->addJsAsset($this->createAsset(Package::JS_FILE));
        }
    }

    private function createAsset(string $file): AssetDto
    {
        $asset = new AssetDto($file);
        $asset->setPackageName(Package::NAME);

        return $asset;
    }

    /**
     * EasyAdmin renders the page assets and the field assets in two distinct blocks
     * without deduplicating them, so an asset already carried by a field must not be
     * added again.
     *
     * @param array<string, AssetDto>      $pageAssets
     * @param array<string, AssetDto>|null $fieldAssets
     */
    private function isRegistered(string $file, array $pageAssets, ?array $fieldAssets): bool
    {
        return \array_key_exists($file, $pageAssets) || \array_key_exists($file, $fieldAssets ?? []);
    }
}
