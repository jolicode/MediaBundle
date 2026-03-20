<?php

namespace backend;

use Castor\Attribute\AsTask;

use function Castor\io;
use function docker\docker_run;

#[AsTask(description: 'Install backend dependencies')]
function install(
    ?string $phpVersion = null,
    ?string $easyAdminVersion = null,
): void {
    io()->title('Installing backend dependencies');

    if (null !== $easyAdminVersion) {
        docker_run(\sprintf('composer require --dev easycorp/easyadmin-bundle %s --no-update', $easyAdminVersion), phpVersion: $phpVersion);
    }

    docker_run('composer install', phpVersion: $phpVersion);

    io()->success('Backend dependencies have been installed.');
}
