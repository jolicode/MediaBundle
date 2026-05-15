<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\Sylius\Uploader;

use JoliCode\MediaBundle\Library\Library;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Storage\OriginalStorage;
use Sylius\Component\Core\Model\ImageInterface;
use Sylius\Component\Core\Uploader\ImageUploaderInterface;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\HttpFoundation\File\File;

#[AsDecorator(decorates: 'sylius.uploader.image')]
final readonly class ImageUploader implements ImageUploaderInterface
{
    public function __construct(
        private ImageUploaderInterface $imageUploader,
        private LibraryContainer $libraries,
    ) {
    }

    public function upload(ImageInterface $image): void
    {
        $this->imageUploader->upload($image);

        $file = $image->getFile();

        if (!$file instanceof File) {
            return;
        }

        $media = $this->getOriginalStorage()->createMedia($image->getPath(), $file->getContent());

        if (!method_exists($image, 'setMedia')) {
            return;
        }

        $image->setMedia($media);
    }

    public function remove(string $path): bool
    {
        return $this->imageUploader->remove($path);
    }

    private function getOriginalStorage(): OriginalStorage
    {
        return $this->getLibrary()->getOriginalStorage();
    }

    private function getLibrary(): Library
    {
        return $this->libraries->getDefault();
    }
}
