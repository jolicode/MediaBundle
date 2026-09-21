<?php

namespace JoliCode\MediaBundle\Inspector;

use Symfony\Component\Process\Process;

/**
 * Whether a processor is registered is known at compile time, but its binaries are checked at
 * runtime: the container may have been built in another image.
 */
readonly class ProcessorStatus
{
    public const KIND_PRE_PROCESSOR = 'pre_processor';

    public const KIND_PROCESSOR = 'processor';

    public const KIND_POST_PROCESSOR = 'post_processor';

    /**
     * @param string[]              $inputFormats
     * @param string[]              $outputFormats
     * @param array<string, string> $binaries      the path of each binary this processor runs, indexed by binary name
     */
    public function __construct(
        public string $name,
        public string $kind,
        public bool $registered,
        public ?string $unavailabilityReason = null,
        public ?string $class = null,
        public array $inputFormats = [],
        public array $outputFormats = [],
        public array $binaries = [],
    ) {
    }

    /**
     * @return string[] the name of the binaries that cannot be executed
     */
    public function getMissingBinaries(): array
    {
        $missing = [];

        foreach ($this->binaries as $binaryName => $path) {
            if (!is_executable($path)) {
                $missing[] = $binaryName;
            }
        }

        return $missing;
    }

    public function isUsable(): bool
    {
        return $this->registered && [] === $this->getMissingBinaries();
    }

    /**
     * Spawns a process: only meant for the debug command.
     */
    public function probeVersion(string $binaryName): ?string
    {
        $path = $this->binaries[$binaryName] ?? null;

        if (null === $path || !is_executable($path)) {
            return null;
        }

        // cwebp expects "-version", oxipng and pngquant "--version"
        foreach (['-version', '--version'] as $flag) {
            $process = new Process([$path, $flag]);
            $process->setTimeout(5);

            try {
                $process->run();
            } catch (\Throwable) {
                continue;
            }

            if (!$process->isSuccessful()) {
                continue;
            }

            $firstLine = strtok($process->getOutput() ?: $process->getErrorOutput(), "\n");

            if (false !== $firstLine && '' !== trim($firstLine)) {
                return trim($firstLine);
            }
        }

        return null;
    }
}
