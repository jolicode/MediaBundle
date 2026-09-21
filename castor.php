<?php

defined('CASTOR_USE_CHDIR') || define('CASTOR_USE_CHDIR', true);

use function Castor\import;
use function Castor\mount;

import(__DIR__ . '/.castor');
mount(__DIR__ . '/demo', 'demo');
