<?php

namespace JoliCode\MediaBundle\Tests\Application\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\Application\Entity\Article;

class ArticleFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        private readonly Resolver $resolver,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $article = new Article($this->getMedia('sub/folder/circle-pattern.png'));
        $manager->persist($article);

        $article = new Article($this->getMedia('sub/folder/deep/test.txt'));
        $manager->persist($article);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            MediaFixtures::class,
        ];
    }

    private function getMedia(string $path): Media
    {
        $media = $this->resolver->resolve($path);

        if (null === $media) {
            throw new \RuntimeException(\sprintf('Media "%s" not found', $path));
        }

        return $media;
    }
}
