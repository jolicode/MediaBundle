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
        $mediaRoot = __DIR__ . '/../../public/media/original';
        $filesystem = new Filesystem();
        $filesystem->mirror(__DIR__ . '/media', $mediaRoot);

        $filesystem->mkdir($mediaRoot . '/many-files');

        for ($i = 0; $i < 100; ++$i) {
            $filesystem->copy(
                __DIR__ . '/media/articles/circle-pattern.png',
                $mediaRoot . '/many-files/circle-pattern-' . $i . '.png',
            );
        }
    }
}
