<?php

namespace backend;

use Castor\Attribute\AsTask;

use function Castor\io;
use function docker\docker_run;

#[AsTask(description: 'Install backend dependencies')]
function install(?string $phpVersion = null): void
{
    io()->title('Installing backend dependencies');

    docker_run('composer install', phpVersion: $phpVersion);

    io()->success('Backend dependencies have been installed.');
}
