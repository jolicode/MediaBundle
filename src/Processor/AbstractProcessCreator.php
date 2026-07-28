<?php

namespace JoliCode\MediaBundle\Processor;

use Symfony\Component\Process\Process;

abstract readonly class AbstractProcessCreator
{
    /**
     * @param array<int|string|null> $arguments
     * @param array<string, mixed>   $options
     */
    protected function createProcess(array $arguments = [], array $options = []): Process
    {
        $process = new Process($arguments);
        $timeout = $options['process']['timeout'] ?? $this->getProcessTimeout();

        if (null !== $timeout) {
            $process->setTimeout((float) $timeout);
        }

        if (!isset($options['process'])) {
            return $process;
        }

        if (isset($options['process']['working_directory'])) {
            $process->setWorkingDirectory($options['process']['working_directory']);
        }

        if (isset($options['process']['environment_variables']) && \is_array($options['process']['environment_variables'])) {
            $process->setEnv($options['process']['environment_variables']);
        }

        return $process;
    }

    /**
     * The timeout, in seconds, applied to the processes created by createProcess().
     * Classes that expose a configurable timeout must override this method.
     */
    protected function getProcessTimeout(): ?float
    {
        return null;
    }

    /**
     * @param int[]    $validReturns
     * @param string[] $errors
     */
    protected function isSuccessfulProcess(Process $process, array $validReturns = [0], array $errors = ['ERROR']): bool
    {
        if ([] !== $validReturns && !\in_array($process->getExitCode(), $validReturns, true)) {
            return false;
        }

        foreach ($errors as $string) {
            if (str_contains($process->getOutput(), (string) $string)) {
                return false;
            }
        }

        return true;
    }
}
