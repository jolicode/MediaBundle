<?php

namespace JoliCode\MediaBundle\Bridge\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Vote;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class MediaVoter extends Voter
{
    protected function supports(string $attribute, mixed $subject): bool
    {
        return \in_array($attribute, AdminAction::ALL, true) && $subject instanceof AdminAction;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token, ?Vote $vote = null): bool
    {
        $user = $token->getUser();

        return match ($attribute) {
            AdminAction::LIST => $this->canList($user, $subject->libraryName, $subject->path),
            AdminAction::SHOW => $this->canShow($user, $subject->libraryName, $subject->path),
            AdminAction::CREATE_DIRECTORY => $this->canCreateDirectory($user, $subject->libraryName, $subject->path, $subject->to),
            AdminAction::UPLOAD => $this->canUpload($user, $subject->libraryName, $subject->path),
            AdminAction::DELETE => $this->canDelete($user, $subject->libraryName, $subject->path),
            AdminAction::DELETE_DIRECTORY => $this->canDeleteDirectory($user, $subject->libraryName, $subject->path),
            AdminAction::MOVE => $this->canMove($user, $subject->libraryName, $subject->path, $subject->to),
            AdminAction::RENAME_DIRECTORY => $this->canRenameDirectory($user, $subject->libraryName, $subject->path, $subject->to),
            AdminAction::REGENERATE_VARIATION => $this->canRegenerateVariation($user, $subject->libraryName, $subject->path, $subject->variation),
            default => false,
        };
    }

    protected function canList(?UserInterface $user, string $libraryName, string $path): bool
    {
        return true;
    }

    protected function canShow(?UserInterface $user, string $libraryName, string $path): bool
    {
        return true;
    }

    protected function canCreateDirectory(?UserInterface $user, string $libraryName, ?string $in = null, ?string $name = null): bool
    {
        return true;
    }

    protected function canUpload(?UserInterface $user, string $libraryName, ?string $path = null): bool
    {
        return true;
    }

    protected function canDelete(?UserInterface $user, string $libraryName, string $path): bool
    {
        return true;
    }

    protected function canDeleteDirectory(?UserInterface $user, string $libraryName, string $path): bool
    {
        return true;
    }

    protected function canMove(?UserInterface $user, string $libraryName, string $from, ?string $to = null): bool
    {
        return true;
    }

    protected function canRenameDirectory(?UserInterface $user, string $libraryName, string $from, ?string $to = null): bool
    {
        return true;
    }

    protected function canRegenerateVariation(?UserInterface $user, string $libraryName, string $path, string $variationName): bool
    {
        return true;
    }
}
