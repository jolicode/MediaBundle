<?php

namespace JoliCode\MediaBundle\Tests\Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator as Assert;

#[ORM\Entity]
class Article
{
    #[ORM\Id]
    #[ORM\Column(type: \Doctrine\DBAL\Types\Types::GUID)]
    public readonly string $id;

    public function __construct(
        #[ORM\Column(type: Types::MEDIA, nullable: true)]
        #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
        #[Assert\Media]
        public ?Media $media = null,
    ) {
        $this->id = uuid_create();
    }
}
