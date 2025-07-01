<?php

namespace JoliCode\MediaBundle\Tests\Application\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\KernelInterface;

class MediaFixtures extends Fixture
{
    public function __construct(
        private readonly KernelInterface $kernel,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $filesystem = new Filesystem();
        $filesystem->remove($this->kernel->getProjectDir() . '/public/media/original');
        $filesystem->mirror(
            __DIR__ . '/Resources/media',
            $this->kernel->getProjectDir() . '/public/media/original'
        );
    }
}
