<?php

namespace JoliCode\MediaBundle\Controller;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Library\LibraryContainer;
use JoliCode\MediaBundle\Resolver\Resolver;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends AbstractController
{
    public function __construct(
        private readonly Converter $converter,
        private readonly LibraryContainer $libraries,
        private readonly Resolver $resolver,
        private readonly ?LoggerInterface $logger = null,
    ) {
    }

    public function media(
        string $library,
        string $slug,
    ): Response {
        $originalStorage = $this->libraries->get($library)->getOriginalStorage();

        if (!$originalStorage->isServeUsingPhpEnabled()) {
            // this route should never be triggered as files must be served by the web server, not by PHP
            throw $this->createNotFoundException(\sprintf('The file "%s" from the library "%s" should be served by the web server', $slug, $library));
        }

        $media = $this->resolver->resolveMedia($slug, $library);
        $binary = $media->getBinary();

        return new Response($binary->getContent(), Response::HTTP_OK, [
            'Content-Type' => $binary->getMimeType(),
        ]);
    }

    public function variation(
        string $library,
        string $variation,
        string $slug,
    ): Response {
        try {
            $mediaVariation = $this->converter->getMediaVariation($slug, $variation, $library) ?? throw $this->createNotFoundException('File not found');

            if ($mediaVariation->isStored()) {
                $this->logger?->info(\sprintf(
                    'Serving the variation "%s" for the media "%s" from the storage "%s". This variation is already stored, which means it should rather be served directly from the storage. Please check your filesystem configuration.',
                    $variation,
                    $mediaVariation->getMedia()->getPath(),
                    $library,
                ));
            }

            $this->converter->convertMediaVariation($mediaVariation, false);
            $binary = $mediaVariation->getBinary();
        } catch (\Exception $exception) {
            throw $this->createNotFoundException('File not found', $exception);
        }

        return new Response($binary->getContent(), Response::HTTP_OK, [
            'Content-Type' => $binary->getMimeType(),
        ]);
    }
}
