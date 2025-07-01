<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Model\Format;

class PostProcessorContainer
{
    /**
     * @var array<string, PostProcessorInterface>
     */
    private array $processors = [];

    public function add(string $name, PostProcessorInterface $processor): void
    {
        $this->processors[$name] = $processor;
    }

    public function get(string $name): PostProcessorInterface
    {
        if (!$this->has($name)) {
            throw new \InvalidArgumentException(\sprintf('Processor "%s" not found.', $name));
        }

        return $this->processors[$name];
    }

    /**
     * @return Format[]
     */
    public function getProcessableFormats(): array
    {
        $formats = [];

        foreach ($this->processors as $processor) {
            $formats = array_merge($formats, $processor->getProcessableFormats());
        }

        return $formats;
    }

    public function getPostProcessor(string $format): PostProcessorInterface
    {
        return $this->getPostProcessors($format)[0];
    }

    /**
     * @return PostProcessorInterface[]
     */
    public function getPostProcessors(string $format): array
    {
        $processors = [];

        if ($this->has('jpegoptim')
            && $this->get('jpegoptim')->canProcessFormat($format)
        ) {
            $processors[] = $this->get('jpegoptim');
        }

        if ($this->has('mozjpeg')
            && $this->get('mozjpeg')->canProcessFormat($format)
        ) {
            $processors[] = $this->get('mozjpeg');
        }

        if ($this->has('pngquant')
            && $this->get('pngquant')->canProcessFormat($format)
        ) {
            $processors[] = $this->get('pngquant');
        }

        if ($this->has('oxipng')
            && $this->get('oxipng')->canProcessFormat($format)
        ) {
            $processors[] = $this->get('oxipng');
        }

        return $processors;
    }

    public function has(string $name): bool
    {
        return isset($this->processors[$name]);
    }

    public function remove(string $name): void
    {
        if (!$this->has($name)) {
            throw new \InvalidArgumentException(\sprintf('Postprocessor "%s" not found.', $name));
        }

        unset($this->processors[$name]);
    }

    public function removeAll(): void
    {
        $this->processors = [];
    }
}
