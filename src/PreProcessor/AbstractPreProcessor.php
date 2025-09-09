<?php

namespace JoliCode\MediaBundle\PreProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Processor\AbstractProcessCreator;

abstract readonly class AbstractPreProcessor extends AbstractProcessCreator implements PreProcessorInterface
{
    public function getDefaultOutputFormat(): ?Format
    {
        return null;
    }

    public function supports(Binary $binary): bool
    {
        return true;
    }

    protected function acquireTemporaryFilePath(?string $prefix = null): string
    {
        return tempnam(sys_get_temp_dir(), $prefix ?? 'image');
    }

    protected function writeTemporaryFile(Binary $binary): string
    {
        $temporaryFile = $this->acquireTemporaryFilePath('image');
        file_put_contents($temporaryFile, $binary->getContent());

        return $temporaryFile;
    }
}
