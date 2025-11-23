<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[ORM\Index(name: 'email_idx', columns: ['email'])]
#[ORM\Table(name: '`user`')]
class User implements \Stringable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(length: 255)]
    public string $name;

    #[ORM\Column(length: 255)]
    public string $email;

    #[ORM\Column]
    public ?bool $isActive = null;

    #[MediaConstraint(
        allowedTypes: ['image'],
        allowedPaths: ['users'],
    )]
    #[MediaDeleteBehavior(strategy: Strategy::RESTRICT)]
    #[ORM\Column(type: MediaTypes::MEDIA, nullable: false)]
    public Media $profilePicture;

    public function __toString(): string
    {
        return $this->email;
    }
}
