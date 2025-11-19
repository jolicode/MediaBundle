<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Filesystem\Filesystem;

class MediaFixtures extends Fixture
{
    #[\Override]
    public function load(ObjectManager $manager): void
    {
        $filesystem = new Filesystem();
        $filesystem->mirror(
            __DIR__ . '/media',
            __DIR__ . '/../../public/media/original'
        );
    }
}
