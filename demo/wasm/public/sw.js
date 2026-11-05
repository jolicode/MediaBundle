importScripts('./build/php-sw.js');

// The assets of the bundles: files of public/app/, that need no PHP
forwardToPhp({ except: ['app/bundles/'] });
