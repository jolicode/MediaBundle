<?php

namespace App\Entity;

use App\Form\UserType;
use App\Grid\UserGrid;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use JoliCode\MediaBundle\DeleteBehavior\Attribute\MediaDeleteBehavior;
use JoliCode\MediaBundle\DeleteBehavior\Strategy;
use JoliCode\MediaBundle\Doctrine\Types as MediaTypes;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;
use Sylius\Resource\Metadata\AsResource;
use Sylius\Resource\Metadata\BulkDelete;
use Sylius\Resource\Metadata\Create;
use Sylius\Resource\Metadata\Delete;
use Sylius\Resource\Metadata\Index;
use Sylius\Resource\Metadata\Update;
use Sylius\Resource\Model\ResourceInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[ORM\Index(name: 'email_idx', columns: ['email'])]
#[ORM\Table(name: '`user`')]
#[AsResource(
    section: 'admin',
    formType: UserType::class,
    templatesDir: '@SyliusAdminUi/crud',
    routePrefix: '/sylius-admin',
    operations: [
        new Create(),
        new Update(),
        new Delete(),
        new Index(grid: UserGrid::class),
        new BulkDelete(),
    ],
)]
class User implements \Stringable, ResourceInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    public ?int $id = null;

    #[ORM\Column(length: 255)]
    public ?string $name = null;

    #[ORM\Column(length: 255)]
    public ?string $email = null;

    #[ORM\Column]
    public ?bool $isActive = null;

    #[MediaConstraint(
        allowedTypes: ['image'],
        allowedPaths: ['users'],
    )]
    #[MediaDeleteBehavior(strategy: Strategy::RESTRICT)]
    #[ORM\Column(type: MediaTypes::MEDIA, nullable: false)]
    public Media $profilePicture;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __toString(): string
    {
        return $this->email ?? '';
    }
}
