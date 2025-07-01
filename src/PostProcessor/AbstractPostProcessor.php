<?php

namespace JoliCode\MediaBundle\PostProcessor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Processor\AbstractProcessCreator;
use Psr\Log\LoggerInterface;

abstract readonly class AbstractPostProcessor extends AbstractProcessCreator implements PostProcessorInterface
{
    /**
     * @param array<string, mixed> $options
     */
    public function __construct(
        protected ?string $binary = null,
        protected array $options = [],
        protected ?LoggerInterface $logger = null,
    ) {
    }

    abstract public function process(Binary $binary, array $postProcessingOptions = []): Binary;

    public function canProcessFormat(string $format): bool
    {
        return \in_array(Format::fromName($format), $this->getProcessableFormats(), true);
    }

    abstract public function getProcessableFormats(): array;

    protected function acquireTemporaryFilePath(?string $prefix = null): string
    {
        return tempnam(sys_get_temp_dir(), $prefix ?? 'image');
    }

    protected function checkFormat(string $format): void
    {
        if (!$this->canProcessFormat($format)) {
            throw new \InvalidArgumentException(\sprintf('The post-processor "%s" cannot process "%s" files. Available formats are: %s', static::class, $format, implode(', ', array_map(fn ($value) => $value->value, $this->getProcessableFormats()))));
        }
    }

    protected function isEnabled(): bool
    {
        if (null === $this->binary || '' === $this->binary || '0' === $this->binary) {
            return false;
        }

        if (!file_exists($this->binary)) {
            if ($this->logger instanceof LoggerInterface) {
                $this->logger->warning(\sprintf(
                    'The %s binary "%s" does not exist, the post-processing will be skipped',
                    static::class,
                    $this->binary,
                ));
            }

            return false;
        }

        return true;
    }

    protected function writeTemporaryFile(Binary $binary): string
    {
        $temporaryFile = $this->acquireTemporaryFilePath('image');
        file_put_contents($temporaryFile, $binary->getContent());

        return $temporaryFile;
    }
}
