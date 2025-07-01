<?php

namespace JoliCode\MediaBundle\Tests\Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator as JoliAssert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[UniqueEntity('slug')]
class Page implements \Stringable
{
    #[ORM\Id]
    #[ORM\Column(type: \Doctrine\DBAL\Types\Types::GUID)]
    private readonly string $id;

    #[ORM\Column]
    #[Assert\Length(max: 255)]
    private string $title;

    #[ORM\Column(unique: true)]
    #[Assert\Length(max: 255)]
    private string $slug;

    #[ORM\Column(type: Types::MEDIA)]
    #[MediaDeleteBehavior(strategy: Strategy::RESTRICT)]
    #[JoliAssert\Media]
    private Media $mediaRestrict;

    #[ORM\Column(type: Types::MEDIA, nullable: true)]
    #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
    #[JoliAssert\Media]
    private ?Media $mediaSetNull = null;

    #[ORM\Column(type: Types::MEDIA)]
    #[JoliAssert\Media]
    private Media $mediaDefault;

    public function __construct()
    {
        $this->id = uuid_create();
    }

    public function __toString(): string
    {
        return $this->title;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getMediaRestrict(): Media
    {
        return $this->mediaRestrict;
    }

    public function setMediaRestrict(Media $media): self
    {
        $this->mediaRestrict = $media;

        return $this;
    }

    public function getMediaSetNull(): ?Media
    {
        return $this->mediaSetNull;
    }

    public function setMediaSetNull(?Media $media): self
    {
        $this->mediaSetNull = $media;

        return $this;
    }

    public function getMediaDefault(): Media
    {
        return $this->mediaDefault;
    }

    public function setMediaDefault(Media $media): self
    {
        $this->mediaDefault = $media;

        return $this;
    }
}
