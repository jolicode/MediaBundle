<?php

namespace pages;

use Castor\Attribute\AsOption;
use Castor\Attribute\AsTask;

use function Castor\fs;
use function Castor\io;

const ROOT_DIR = __DIR__ . '/..';

const DOC_DIR = ROOT_DIR . '/doc-website/var/output';

const DEMO_DIR = ROOT_DIR . '/demo/wasm/public';

const SITE_DIR = ROOT_DIR . '/doc-website/var/site';

#[AsTask(description: 'Lays out what GitHub Pages serves in doc-website/var/site/: the documentation, and the demo in demo/')]
function site(
    #[AsOption(description: 'Where the site is in its URLs')]
    string $basePath = '/',
): void {
    if (!str_starts_with($basePath, '/') || !str_ends_with($basePath, '/')) {
        throw new \InvalidArgumentException(\sprintf('The base path "%s" must start and end with "/".', $basePath));
    }

    if (!is_file(DOC_DIR . '/404.html')) {
        throw new \RuntimeException('The documentation is not built. Run "castor doc:start" first.');
    }

    if (!is_file(DEMO_DIR . '/build/php-web.mjs')) {
        throw new \RuntimeException('The demo is not built. Run "castor demo:wasm:build" first.');
    }

    if (file_exists(DOC_DIR . '/demo')) {
        throw new \LogicException('The documentation must not have a demo/ page: the demo is served there.');
    }

    fs()->remove(SITE_DIR);
    fs()->mirror(DOC_DIR, SITE_DIR);
    fs()->mirror(DEMO_DIR, SITE_DIR . '/demo');

    // A link to a page of the demo, in a browser that does not have its service
    // worker yet: the demo starts it, then opens that page
    $demo = \sprintf('"%sdemo/"', $basePath);
    $script = <<<HTML
        <script>
            if (location.pathname.startsWith({$demo}) && !navigator.serviceWorker?.controller) {
                location.replace({$demo} + '?path=' + encodeURIComponent(location.pathname + location.search + location.hash));
            }
        </script>
        HTML;

    $notFound = str_replace('<head>', "<head>\n{$script}", fs()->readFile(SITE_DIR . '/404.html'), $count);
    if (1 !== $count) {
        throw new \LogicException('The 404 page of the documentation must have one <head>.');
    }
    fs()->dumpFile(SITE_DIR . '/404.html', $notFound);

    io()->success(\sprintf('The site is in %s.', realpath(SITE_DIR)));
}
