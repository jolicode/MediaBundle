<?php

namespace JoliCode\MediaBundle\Variation;

use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Voter\VoterInterface;
use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\String\Slugger\SluggerInterface;

class Variation
{
    /**
     * @param array<string, string[]> $postProcessingOptions
     * @param VoterInterface[]        $voters
     */
    public function __construct(
        private readonly string $name,
        private readonly ?Format $format,
        private readonly TransformerChain $transformerChain,
        private readonly SluggerInterface $slugger = new AsciiSlugger(),
        private readonly ServiceLocator $globalPreProcessors = new ServiceLocator([]),
        private readonly ServiceLocator $preProcessors = new ServiceLocator([]),
        private readonly array $postProcessingOptions = [],
        private readonly array $voters = [],
        private ?self $webpAlternativeVariation = null,
    ) {
    }

    public function canBeAppliedTo(Media $media): bool
    {
        foreach ($this->voters as $voter) {
            if (!$voter->vote($media)) {
                return false;
            }
        }

        return true;
    }

    public function cloneWithOutputFormat(Format $format): self
    {
        return new self(
            $this->name,
            $format,
            $this->transformerChain,
            $this->slugger,
            $this->globalPreProcessors,
            $this->preProcessors,
            $this->postProcessingOptions,
            $this->voters,
            $this->webpAlternativeVariation,
        );
    }

    public function getFormat(): ?Format
    {
        return $this->format;
    }

    public function getForMedia(Media $media): MediaVariation
    {
        if ($media->hasVariation($this->name)) {
            return $media->getVariation($this->name);
        }

        if (!$this->canBeAppliedTo($media)) {
            throw new \RuntimeException(\sprintf('The voters for the variation "%s" prevent to process the media "%s"', $this->name, $media->getPath()));
        }

        $forcedFormat = $this->getForcedFormatForMedia($media);

        if ($forcedFormat instanceof Format) {
            $variation = new MediaVariation($media, $this->cloneWithOutputFormat($forcedFormat));
        } else {
            $variation = new MediaVariation($media, $this);
        }

        $media->addVariation($variation);

        return $variation;
    }

    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return array<string, string[]>
     */
    public function getPostProcessingOptions(): array
    {
        return $this->postProcessingOptions;
    }

    /**
     * @return \Generator<PreProcessorInterface>
     */
    public function getPreProcessors(): \Generator
    {
        foreach ($this->globalPreProcessors as $id => $service) {
            yield $id => $service;
        }

        foreach ($this->preProcessors as $id => $service) {
            yield $id => $service;
        }
    }

    public function getSlug(): string
    {
        return $this->slugger->slug($this->name)->lower()->toString();
    }

    public function getTransformerChain(): TransformerChain
    {
        return $this->transformerChain;
    }

    public function getWebpAlternativeVariation(): ?self
    {
        return $this->webpAlternativeVariation;
    }

    public function hasWebpAlternativeVariation(): bool
    {
        return $this->webpAlternativeVariation instanceof self;
    }

    public function setWebpAlternativeVariation(self $webpAlternativeVariation): void
    {
        $this->webpAlternativeVariation = $webpAlternativeVariation;
    }

    private function getForcedFormatForMedia(Media $media): ?Format
    {
        if (!$this->format instanceof Format) {
            foreach ($this->preProcessors as $preProcessor) {
                if (null !== $preProcessor->getDefaultOutputFormat() && $preProcessor->supports($media->getBinary())) {
                    return $preProcessor->getDefaultOutputFormat();
                }
            }
        }

        return null;
    }
}
