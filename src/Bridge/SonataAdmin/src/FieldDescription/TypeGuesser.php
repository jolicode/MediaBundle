<?php

namespace JoliCode\MediaBundle\Bridge\SonataAdmin\FieldDescription;

use Sonata\AdminBundle\FieldDescription\FieldDescriptionInterface;
use Sonata\AdminBundle\FieldDescription\TypeGuesserInterface;
use Symfony\Component\Form\Guess\Guess;
use Symfony\Component\Form\Guess\TypeGuess;

final class TypeGuesser implements TypeGuesserInterface
{
    public function guess(FieldDescriptionInterface $fieldDescription): TypeGuess
    {
        return match ($fieldDescription->getMappingType()) {
            'media' => new TypeGuess('media', [], Guess::HIGH_CONFIDENCE),
            'media_long' => new TypeGuess('media', [], Guess::HIGH_CONFIDENCE),
            default => new TypeGuess(FieldDescriptionInterface::TYPE_STRING, [], Guess::LOW_CONFIDENCE),
        };
    }
}
