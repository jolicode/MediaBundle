<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use JoliCode\MediaBundle\Resolver\Resolver;

class BrandFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        private readonly Resolver $resolver,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        foreach (['Acme', 'Globex', 'Initech'] as $name) {
            $brand = new Brand();
            $brand->name = $name;
            $brand->logo = $this->resolver->resolve('articles/circle-pattern.png');
            $brand->banner = $this->resolver->resolve('articles/circle-pattern.webp');
            $manager->persist($brand);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            MediaFixtures::class,
        ];
    }
}
