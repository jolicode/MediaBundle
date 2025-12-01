<?php

namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use JoliCode\MediaBundle\Resolver\Resolver;

class PostFixtures extends Fixture implements DependentFixtureInterface
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
        $extensions = ['avif', 'gif', 'jpeg', 'png', 'webp'];

        for ($i = 0; $i < 100; ++$i) {
            $extension = $extensions[$this->faker->numberBetween(0, \count($extensions) - 1)];
            $media = $this->resolver->resolve('articles/circle-pattern.' . $extension);
            $paragraphs = [];

            for ($j = 0; $j < 5; ++$j) {
                $paragraphs[] = $this->faker->paragraph();
            }

            $post = new Post();
            $post->title = $this->faker->sentence;
            $post->body = implode("\n\n", $paragraphs);
            $post->coverMedia = $media;
            $post->isPublished = $this->faker->boolean(75);
            $post->publishedAt = \DateTimeImmutable::createFromMutable($this->faker->dateTimeBetween('-3 months', '+1 week'));
            $post->author = $this->getReference(
                UserFixtures::REFERENCE_PREFIX . $this->faker->numberBetween(1, 10),
                User::class,
            );
            $manager->persist($post);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            MediaFixtures::class,
            UserFixtures::class,
        ];
    }
}
