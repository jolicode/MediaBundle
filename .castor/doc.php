<?php

namespace doc;

use Castor\Attribute\AsTask;
use Castor\Context;
use Symfony\Component\Process\Process;

use function Castor\capture;
use function Castor\context;
use function Castor\exit_code;
use function Castor\finder;
use function Castor\fs;
use function Castor\http_download;
use function Castor\io;
use function Castor\log;
use function Castor\run;

const ROOT_DIR = __DIR__ . '/..';

const WEBSITE_DIR = ROOT_DIR . '/doc-website';

const INPUT_DIR = WEBSITE_DIR . '/var/input';

const IMAGE_NAME = 'jolimediabundle-doc';

#[AsTask(description: 'Builds the website of the documentation in doc-website/var/output/')]
function start(): void
{
    docker_build();
    fetch_assets();
    install_js_dependencies();
    rst_to_md();
    build();
}

#[AsTask(description: 'Builds the Docker image of the documentation')]
function docker_build(): int
{
    return exit_code(['docker', 'build', '-t', IMAGE_NAME, WEBSITE_DIR]);
}

#[AsTask(description: 'Fetches the stylesheet and the footer of the JoliCode theme')]
function fetch_assets(): void
{
    io()->title('Fetching the assets of the JoliCode theme');

    $footerFile = WEBSITE_DIR . '/templates/overrides/partials/jolicode-footer.html';
    http_download('https://raw.githubusercontent.com/jolicode/oss-theme/refs/heads/main/Zensical/extra.css', WEBSITE_DIR . '/assets/stylesheets/jolicode.css');
    http_download('https://raw.githubusercontent.com/jolicode/oss-theme/refs/heads/main/snippet-joli-footer.html', $footerFile);

    $license = <<<'HTML'
        JoliMediaBundle is licensed under
        <a href="https://github.com/jolicode/MediaBundle/blob/main/LICENSE.md" target="_blank" rel="noreferrer noopener" class="jf-link">
          MIT license
        </a>
        HTML;

    fs()->dumpFile($footerFile, str_replace(
        ['#GITHUB_REPO', '<!-- #SUBTITLE -->'],
        ['jolicode/MediaBundle', $license],
        fs()->readFile($footerFile),
    ));
}

#[AsTask(description: 'Installs the JS dependencies of the documentation')]
function install_js_dependencies(): void
{
    io()->title('Installing the JS dependencies of the documentation');

    docker_run(['yarn', 'install', '--frozen-lockfile']);
}

#[AsTask(description: 'Converts the RST files of doc/ to Markdown, in doc-website/var/input/')]
function rst_to_md(): void
{
    io()->title('Converting the RST files to Markdown');

    fs()->remove(INPUT_DIR);
    fs()->mkdir(INPUT_DIR . '/assets');
    fs()->copy(WEBSITE_DIR . '/_nav.md', INPUT_DIR . '/_nav.md');
    fs()->copy(WEBSITE_DIR . '/assets/favicon.png', INPUT_DIR . '/assets/favicon.png');

    $files = [];
    foreach (finder()->files()->in(ROOT_DIR . '/doc')->name('*.rst')->sortByName() as $file) {
        $files[] = $file->getRelativePathname();
        fs()->mkdir(\dirname(INPUT_DIR . '/' . $file->getRelativePathname()));
    }

    $script = <<<'SH'
        for file; do
            pandoc -f rst -t gfm --wrap=none --lua-filter=pandoc/meta-to-front-matter.lua --lua-filter=pandoc/links-to-md.lua "../doc/$file" -o "var/input/${file%.rst}.md"
        done
        SH;
    docker_run(['sh', '-c', $script, 'sh', ...$files]);

    // The first and the last commits of a page date it, for its structured data
    foreach ($files as $file) {
        $dates = array_filter(explode("\n", capture(['git', 'log', '--follow', '--format=%cI', '--', 'doc/' . $file], context: context()->withWorkingDirectory(ROOT_DIR))));
        if (!$dates) {
            continue;
        }

        $markdownFile = INPUT_DIR . '/' . substr($file, 0, -4) . '.md';
        fs()->dumpFile($markdownFile, preg_replace('/^---\n/', \sprintf("---\ndate_published: \"%s\"\ndate_modified: \"%s\"\n", end($dates), reset($dates)), fs()->readFile($markdownFile), 1));
    }

    docker_run(['node_modules/prettier/bin/prettier.cjs', '--parser', 'markdown', '--ignore-path', '/dev/null', '--write', 'var/input/**/*.md']);
    docker_run(['yarn', 'build']);

    fs()->mirror(ROOT_DIR . '/doc/images', INPUT_DIR . '/images');
    fs()->mirror(ROOT_DIR . '/doc/images', INPUT_DIR . '/variations/images');
}

#[AsTask(description: 'Builds the website of the documentation, and fails on any warning')]
function build(): void
{
    io()->title('Building the documentation');

    docker_run(['zensical', 'build', '--strict']);
}

#[AsTask(description: 'Serves the documentation on http://localhost:8000/, and rebuilds it on change')]
function serve(): void
{
    io()->title('Serving the documentation');

    docker_run(['zensical', 'serve', '--dev-addr', 'localhost:8000']);
}

/**
 * @param list<string> $command
 */
function docker_run(array $command, ?Context $c = null): Process
{
    $c ??= context();

    if (!run(['docker', 'image', 'inspect', IMAGE_NAME], context: context()->withAllowFailure()->withQuiet())->isSuccessful()) {
        throw new \LogicException(\sprintf('The image "%s" does not exist. Run "castor doc:docker-build" first.', IMAGE_NAME));
    }

    $userId = posix_geteuid();
    $groupId = posix_getegid();

    if ($userId > 256000 || 0 === $userId) {
        if (0 === $userId) {
            log('Running as root? Fallback to fake user id.', 'warning');
        }
        $userId = 1000;
        $groupId = 1000;
    }

    $dockerCommand = [
        'docker', 'run', '--init', '--rm', '-t', '--network=host',
        '-e', 'HOME=/tmp',
        '--user', \sprintf('%d:%d', $userId, $groupId),
        '-v', \sprintf('%s:/app:cached', realpath(ROOT_DIR)),
        '--workdir', '/app/doc-website',
    ];

    if (!$c->quiet && false !== $c->tty && false !== $c->pty) {
        $dockerCommand[] = '-i';
    }

    return run([...$dockerCommand, IMAGE_NAME, ...$command], context: $c);
}
