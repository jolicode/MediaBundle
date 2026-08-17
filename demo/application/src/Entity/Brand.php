<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;

#[ORM\Entity]
class Brand implements \Stringable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $name = null;

    #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
    #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
    #[MediaConstraint]
    public ?Media $logo = null;

    #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
    #[ORM\Column(type: MediaTypes::MEDIA, nullable: true)]
    #[MediaConstraint]
    public ?Media $banner = null;

    public function __toString(): string
    {
        return $this->name ?? '';
    }
}
