<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Post implements \Stringable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $title = null;

    #[Gedmo\Slug(fields: ['title'])]
    #[ORM\Column(length: 255)]
    public ?string $slug = null;

    #[ORM\Column(type: Types::TEXT)]
    public ?string $body = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    public ?User $author = null;

    #[MediaConstraint(allowedTypes: ['image', 'video'])]
    #[MediaDeleteBehavior(strategy: Strategy::SET_NULL)]
    #[ORM\Column(type: MediaTypes::MEDIA_LONG, nullable: true)]
    public ?Media $coverMedia = null;

    #[ORM\Column]
    public ?bool $isPublished = null;

    #[ORM\Column(nullable: true)]
    public ?\DateTimeImmutable $publishedAt = null;

    /**
     * @var Collection<int, PostMedia>
     */
    #[ORM\OneToMany(targetEntity: PostMedia::class, mappedBy: 'post', orphanRemoval: true, cascade: ['persist'])]
    public Collection $postMedia;

    public function __construct()
    {
        $this->postMedia = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->title ?? '';
    }

    public function addPostMedium(PostMedia $postMedium): static
    {
        if (!$this->postMedia->contains($postMedium)) {
            $this->postMedia->add($postMedium);
            $postMedium->post = $this;
        }

        return $this;
    }

    public function removePostMedium(PostMedia $postMedium): static
    {
        // set the owning side to null (unless already changed)
        if ($this->postMedia->removeElement($postMedium) && $postMedium->post === $this) {
            $postMedium->post = null;
        }

        return $this;
    }

    public function isCurrentlyPublished(): bool
    {
        if (!$this->isPublished) {
            return false;
        }

        if (!$this->publishedAt instanceof \DateTimeImmutable) {
            return false;
        }

        return $this->publishedAt <= new \DateTimeImmutable();
    }
}
