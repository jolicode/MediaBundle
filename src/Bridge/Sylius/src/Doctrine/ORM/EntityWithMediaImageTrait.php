<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Doctrine\ORM;

use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;

trait EntityWithMediaImageTrait
{
    #[MediaConstraint(
        allowedTypes: ['image'],
        groups: ['Default', 'sylius'],
    )]
    #[MediaDeleteBehavior(strategy: Strategy::RESTRICT)]
    #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
    private ?Media $media = null;

    public function setMedia(?Media $media): void
    {
        if (property_exists($this, 'path')) {
            $this->path = $media?->getPath();
        }

        $this->media = $media;
    }

    public function getMedia(): ?Media
    {
        return $this->media;
    }

    public function getPath(): ?string
    {
        $mediaPath = $this->media?->getPath();

        if (null !== $mediaPath) {
            return $mediaPath;
        }

        if (property_exists($this, 'path')) {
            return $this->path;
        }

        return null;
    }
}
