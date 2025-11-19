<?php

namespace demo\db;

use Castor\Attribute\AsTask;

use function Castor\context;
use function Castor\io;
use function demo\docker\docker_compose;

#[AsTask(description: 'Connect to the PostgreSQL database', name: 'client', namespace: 'db')]
function postgres_client(): void
{
    io()->title('Connecting to the PostgreSQL database');

    docker_compose(['exec', 'postgres', 'psql', '-U', 'app', 'app'], context()->toInteractive());
}
