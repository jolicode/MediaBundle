<?php

namespace frontend;

use Castor\Attribute\AsTask;

use function Castor\io;
use function Castor\notify;
use function docker\docker_run;

#[AsTask(description: 'Compile assets')]
function compile(): void
{
    io()->title('Compiling frontend assets');

    install();
    docker_run('yarn encore production');

    notify('Frontend assets have been compiled.');
    io()->success('Frontend assets have been compiled.');
}

#[AsTask(description: 'Install assets')]
function install(): void
{
    io()->title('Installing frontend assets');

    docker_run('yarn install');

    io()->success('Frontend assets have been installed.');
}

#[AsTask(description: 'Update asset dependencies')]
function update(): void
{
    io()->title('Updating frontend assets');

    docker_run('yarn upgrade');

    io()->success('Frontend assets have been updated.');
}

#[AsTask(description: 'Watch frontend assets')]
function watch(): void
{
    io()->title('Watching frontend assets. Type CTRL+C to stop.');

    install();
    docker_run('yarn encore dev --watch');

    notify('Frontend assets are being watched. Type CTRL+C to stop.');
    io()->success('Frontend assets are being watched. Type CTRL+C to stop.');
}
