<?php

namespace frontend;

use Castor\Attribute\AsTask;

use function Castor\io;
use function Castor\notify;
use function Castor\run;

#[AsTask(description: 'Compile assets')]
function compile(): void
{
    io()->title('Compiling frontend assets');

    install();
    run('yarn encore production');

    notify('Frontend assets have been compiled.');
    io()->success('Frontend assets have been compiled.');
}

#[AsTask(description: 'Install assets')]
function install(): void
{
    io()->title('Installing frontend assets');

    run('yarn install');

    io()->success('Frontend assets have been installed.');
}

#[AsTask(description: 'Watch frontend assets')]
function watch(): void
{
    io()->title('Watching frontend assets. Type CTRL+C to stop.');

    install();
    run('yarn encore dev --watch');

    notify('Frontend assets are being watched. Type CTRL+C to stop.');
    io()->success('Frontend assets are being watched. Type CTRL+C to stop.');
}
