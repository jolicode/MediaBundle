<?php

namespace JoliCode\MediaBundle\Tests\Application\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\Application\Entity\Page;

class PageFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        private readonly Resolver $resolver,
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $page = new Page();
        $page
            ->setTitle('Page 1')
            ->setSlug('page-1')
            ->setMediaRestrict($this->getMedia('restrict.pdf'))
            ->setMediaSetNull($this->getMedia('set_null.pdf'))
            ->setMediaDefault($this->getMedia('default.pdf'))
        ;
        $manager->persist($page);

        $page = new Page();
        $page
            ->setTitle('Page 2')
            ->setSlug('page-2')
            ->setMediaRestrict($this->getMedia('restrict.pdf'))
            ->setMediaSetNull($this->getMedia('sub/folder/circle-pattern.png'))
            ->setMediaDefault($this->getMedia('sub/folder/deep/test.txt'))
        ;
        $manager->persist($page);

        $page = new Page();
        $page
            ->setTitle('Page 3')
            ->setSlug('page-3')
            ->setMediaRestrict($this->getMedia('sub/folder/circle-pattern.png'))
            ->setMediaSetNull($this->getMedia('sub/folder/deep/test.txt'))
            ->setMediaDefault($this->getMedia('sub/folder/circle-pattern.png'))
        ;
        $manager->persist($page);

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
