<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_PREFIX = 'user_';

    protected Generator $faker;

    public function __construct(
        private readonly Resolver $resolver,
    ) {
        $this->faker = Factory::create();
        $this->faker->seed(42);
    }

    public function load(ObjectManager $manager): void
    {
        $media = $this->resolver->resolve('users/john-doe.jpg');

        if (!$media instanceof Media) {
            throw new \RuntimeException('Could not load user profile picture media');
        }

        $user = new User();
        $user->email = 'admin@example.com';
        $user->name = 'John Doe';
        $user->isActive = true;
        $user->profilePicture = $media;
        $this->addReference(self::REFERENCE_PREFIX . '1', $user);
        $manager->persist($user);

        for ($i = 2; $i <= 10; ++$i) {
            $user = new User();
            $user->email = $this->faker->email;
            $user->name = $this->faker->name;
            $user->isActive = $this->faker->boolean(75);
            $user->profilePicture = $media;
            $this->addReference(self::REFERENCE_PREFIX . $i, $user);
            $manager->persist($user);
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
