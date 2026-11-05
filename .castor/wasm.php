<?php

namespace demo\wasm;

use Castor\Attribute\AsOption;
use Castor\Attribute\AsTask;
use PhpWasm\Opcache;
use PhpWasm\Stack;
use PhpWasm\Target;
use Symfony\Component\Console\Input\InputOption;

use function Castor\context;
use function Castor\exit_code;
use function Castor\finder;
use function Castor\fs;
use function Castor\io;
use function Castor\run;
use function PhpWasm\build as build_stacks;
use function PhpWasm\check_stack;
use function PhpWasm\test_page;

const WASM_DIR = __DIR__ . '/../demo/wasm';

const SITE_DIR = WASM_DIR . '/build/site';

const WASM_PHP_VERSION = '8.5.12';

/**
 * @param list<string> $set
 */
#[AsTask(description: 'Builds the demo application in WebAssembly, with the bundle of this repository', namespace: 'demo:wasm')]
function build(
    #[AsOption(description: 'Given to "docker buildx bake --set", for a cache', mode: InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY)]
    array $set = [],
): void {
    io()->title('Building the demo in WebAssembly');

    io()->section('The application');
    install_application();

    io()->section('What PHP embeds');
    prepare_embed();

    io()->section('PHP');
    build_stacks([stack()], $set);

    $wasm = stack()->artifact(Target::Web, 'wasm');
    io()->success(\sprintf('%s: %d MB.', basename($wasm), filesize($wasm) / 1_000_000));
}

#[AsTask(description: 'Serves the demo on 127.0.0.1, and builds it first when it is not built', namespace: 'demo:wasm')]
function serve(
    #[AsOption(description: 'The port to listen to')]
    int $port = 8000,
): int {
    build_unless_built();

    io()->success("The demo is on http://127.0.0.1:{$port}/. Ctrl+C stops the server.");

    return exit_code(['php', '-S', "127.0.0.1:{$port}", '-t', WASM_DIR . '/public']);
}

#[AsTask(description: 'Checks in node what is built: the pages of the admins, and the images that gd makes', namespace: 'demo:wasm')]
function check(): void
{
    build_unless_built();

    check_stack(stack());
    test_page('demo/wasm/tests/smoke.test.mjs');
}

#[AsTask(description: 'Lays out what GitHub Pages serves in demo/wasm/build/site/, and builds the demo first when it is not built', namespace: 'demo:wasm')]
function site(): void
{
    build_unless_built();

    fs()->remove(SITE_DIR);
    fs()->mirror(WASM_DIR . '/public', SITE_DIR . '/demo');
}

function stack(): Stack
{
    return Stack::named('media-bundle-demo')
        ->php(WASM_PHP_VERSION)
        // What the demo application needs. intl, with its data, for the dates of EasyAdmin
        ->extensions('ctype', 'dom', 'exif', 'fileinfo', 'filter', 'gd', 'iconv', 'intl', 'mbstring', 'pdo_sqlite', 'session', 'simplexml', 'tokenizer', 'xml')
        ->embed('demo/wasm/build/embed', at: '/app')
        ->warmup('bin/console', 'cache:warmup')
        ->opcache(Opcache::Runtime)
        // The application, and the images that gd opens, uncompressed
        ->memory('512mb')
        // It runs in node too
        ->targets(Target::Web)
        ->outputDir('demo/wasm/public/build')
    ;
}

function build_unless_built(): void
{
    if (!is_file(stack()->artifact(Target::Web, 'mjs'))) {
        build();
    }
}

function install_application(): void
{
    $repository = \dirname(__DIR__);
    $application = WASM_DIR . '/build/application';
    $bundle = WASM_DIR . '/build/media-bundle';

    fs()->remove([$application, $bundle]);

    $demo = "{$repository}/demo/application";
    fs()->mirror($demo, $application, finder()->in($demo)->ignoreDotFiles(false)->ignoreVCSIgnored(true));

    // What the bundle runs: a path repository on the root of this repository
    // would mirror all of it, demo/ too
    fs()->mkdir($bundle);
    fs()->copy("{$repository}/composer.json", "{$bundle}/composer.json");
    foreach (['config', 'src', 'templates'] as $directory) {
        fs()->mirror("{$repository}/{$directory}", "{$bundle}/{$directory}");
    }

    $composer = json_decode(fs()->readFile("{$application}/composer.json"), true, flags: \JSON_THROW_ON_ERROR);
    $composer['config']['platform'] = ['php' => WASM_PHP_VERSION];
    foreach (stack()->extensions as $extension) {
        $composer['config']['platform']["ext-{$extension}"] = WASM_PHP_VERSION;
    }
    $composer['minimum-stability'] = 'dev';
    $composer['repositories'] = [['type' => 'path', 'url' => '../media-bundle', 'options' => ['symlink' => false]]];
    $composer['require']['jolicode/media-bundle'] = '*';
    fs()->dumpFile("{$application}/composer.json", json_encode($composer, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_SLASHES | \JSON_THROW_ON_ERROR));

    $context = context()->withWorkingDirectory($application);
    run(['composer', 'update', 'jolicode/media-bundle', '--with-dependencies', '--minimal-changes', '--no-dev', '--no-scripts', '--no-interaction', '--no-progress', '--classmap-authoritative'], context: $context);
    $console = $context->withEnvironment(['APP_ENV' => 'wasm']);
    run(['php', 'bin/console', 'assets:install', 'public', '--no-interaction'], context: $console);
    // Elsewhere they are downloaded as they are rendered: there is no network in WebAssembly
    run(['php', 'bin/console', 'ux:icons:lock', '--no-interaction'], context: $console);
    // What the templates do not name: the menu of the Sylius admin
    run(['php', 'bin/console', 'ux:icons:import', 'simple-icons:craftcms', 'tabler:dashboard', 'tabler:users', '--no-interaction'], context: $console);
}

/**
 * What is embedded is in the .wasm file and in the memory of the module: the
 * assets of the bundles are files of the website, and the data of symfony/intl
 * only has the locale of the application.
 */
function prepare_embed(): void
{
    $application = WASM_DIR . '/build/application';
    $embed = WASM_DIR . '/build/embed';
    $assets = WASM_DIR . '/public/app/bundles';

    fs()->remove([$embed, $assets]);
    fs()->mirror("{$application}/public/bundles", $assets);

    fs()->mirror($application, $embed, finder()->in($application)->ignoreDotFiles(false)->notPath('#^var(/|$)#'));
    fs()->dumpFile("{$embed}/.env.local", "APP_ENV=wasm\n");

    // What gd does not read: the fixtures leave them out
    fs()->remove(finder()->in("{$embed}/src/DataFixtures/media")->files()->name(['*.avif', '*.heic', '*.tiff']));

    fs()->remove(finder()->in("{$embed}/vendor/symfony/intl/Resources/data")->files()->notName(['en.php', 'meta.php', 'root.php']));
    // Only Imagick reads the color profiles, for CMYK images
    fs()->remove("{$embed}/vendor/imagine/imagine/src/resources/Adobe");
    // The assets are in public/app/bundles/: PHP reads their manifests, and the icons of EasyAdmin
    fs()->remove(finder()->in("{$embed}/public/bundles")->files()->notName('*.json'));
    fs()->remove(finder()->in("{$embed}/vendor")->files()->path('#/public/#')->notName(['*.json', '*.php']));
    fs()->remove(finder()->in("{$embed}/vendor/easycorp/easyadmin-bundle/assets")->depth(0)->notName('icons'));
    // The application is in English
    fs()->remove(finder()->in("{$embed}/vendor")->files()->path('#/translations/#')->notName('/\.en\.[a-z]+$/'));
    fs()->remove(finder()->in("{$embed}/vendor/fakerphp/faker/src/Faker/Provider")->depth(0)->directories()->notName('en_US'));
    fs()->remove(finder()->in("{$embed}/vendor")->directories()->name(['doc', 'docs', 'Tests', 'tests'])->notPath('#/(Test|Tests)/#'));
    fs()->remove(finder()->in("{$embed}/vendor")->files()->name(['*.md', '*.rst', 'LICENSE', 'CHANGELOG*']));

    $size = 0;
    foreach (finder()->in($embed)->ignoreDotFiles(false)->files() as $file) {
        $size += $file->getSize();
    }
    io()->writeln(\sprintf(' %d MB embedded.', $size / 1_000_000));
}
