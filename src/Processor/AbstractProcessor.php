<?php

namespace JoliCode\MediaBundle\Processor;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Transformation\Transformation;

abstract readonly class AbstractProcessor extends AbstractProcessCreator implements ProcessorInterface
{
    abstract public function process(Binary $binary, Transformation $transformation, array $processingOptions = [], ?string $forceOutputFormat = null): Binary;

    public function canProcessInputFormat(string $inputFormat): bool
    {
        return \in_array(Format::fromName($inputFormat), $this->getProcessableInputFormats(), true);
    }

    public function canProcessOutputFormat(string $outputFormat): bool
    {
        return \in_array(Format::fromName($outputFormat), $this->getProcessableOutputFormats(), true);
    }

    abstract public function getName(): string;

    abstract public function getProcessableInputFormats(): array;

    abstract public function getProcessableOutputFormats(): array;

    protected function acquireTemporaryFilePath(?string $prefix = null): string
    {
        return tempnam(sys_get_temp_dir(), $prefix ?? 'image');
    }

    protected function checkOutputFormat(string $outputFormat): void
    {
        if (!$this->canProcessOutputFormat($outputFormat)) {
            throw new \InvalidArgumentException(\sprintf('The processor "%s" cannot process "%s" files. Available formats are: %s', static::class, $outputFormat, implode(', ', array_map(fn (Format $value) => $value->value, $this->getProcessableOutputFormats()))));
        }
    }

    protected function writeTemporaryFile(Binary $binary): string
    {
        $temporaryFile = $this->acquireTemporaryFilePath('image');
        file_put_contents($temporaryFile, $binary->getContent());

        return $temporaryFile;
    }
}
