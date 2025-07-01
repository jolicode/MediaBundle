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

        if (!isset($options['process'])) {
            return $process;
        }

        if (isset($options['process']['timeout'])) {
            $process->setTimeout($options['process']['timeout']);
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
     * @param int[]    $validReturns
     * @param string[] $errors
     */
    protected function isSuccessfulProcess(Process $process, array $validReturns = [0], array $errors = ['ERROR']): bool
    {
        if ([] !== $validReturns && !\in_array($process->getExitCode(), $validReturns, true)) {
            return false;
        }

        foreach ($errors as $string) {
            if (false !== mb_strpos($process->getOutput(), (string) $string)) {
                return false;
            }
        }

        return true;
    }
}
