<?php

namespace JoliCode\MediaBundle\Model;

use JoliCode\MediaBundle\Binary\Binary;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

interface StorableInterface
{
    public function getBinary(): Binary;

    public function getUrl(
        int $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH,
    ): string;

    public function isStored(): bool;

    public function store(?Binary $binary = null): void;
}
