<?php

defined('CASTOR_USE_CHDIR') || define('CASTOR_USE_CHDIR', true);

use Castor\Attribute\AsContext;
use Castor\Context;

use function Castor\import;

import(__DIR__ . '/.castor');

#[AsContext(default: true)]
function default_context(): Context
{
    return new Context([
        'project_name' => 'jolimediabundle-demo',
        'root_domain' => 'jolimediabundle-demo.test',
        // used by "castor demo:docker:push"
        'registry' => 'ghcr.io/jolicode/media-bundle',
    ]);
}
