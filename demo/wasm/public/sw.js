// The web server of the demo: PHP runs in this service worker, and answers
// every request under its directory, but the assets of the bundles. The browser
// shows the application as any website, with its URLs in the address bar, the
// history and the reloads.
//
// The browser stops a service worker that has nothing to do, after 30 s in
// Chrome, and PHP with it: the next request starts PHP again, that finds the
// database, the media and the sessions in IndexedDB.

import createPhp, { serveInServiceWorker } from './build/php-web.mjs';

// What PHP keeps in IndexedDB. Keep in sync with DATABASE_URL in
// ../../application/.env.wasm, and with the save_path of the sessions in
// ../../application/config/packages/framework.yaml
const data = '/media-bundle-demo';

// What prepare_embed() writes, in ../../../.castor/wasm.php
const buildId = '/app/build-id';

serveInServiceWorker(async () => {
    const php = await createPhp({ persist: data });

    // In PHP, not with php.FS: what is not in IndexedDB yet is gone once the
    // first run reads it. The media stay with the database. Keep in sync with
    // ../tests/smoke.test.mjs
    const { stdout } = await php.runCode(`
        @mkdir('${data}/media');
        symlink('${data}/media', '/app/public/media');
        echo json_encode([
            'updated' => file_get_contents('${buildId}') === @file_get_contents('${data}/build-id'),
            'seeded' => is_file('${data}/seeded'),
        ]);
    `);
    const { updated, seeded } = JSON.parse(stdout);

    // Once per build: the console takes half a second of each start, in Chrome
    if (!updated) {
        await runConsole(php, 'doctrine:schema:update', '--force');
        await php.runCode(`copy('${buildId}', '${data}/build-id');`);
    }

    // Once: what the fixtures make is kept in IndexedDB. The mark comes
    // last: a tab closed in the middle starts again on the next visit
    if (!seeded) {
        await runConsole(php, 'doctrine:fixtures:load');
        await php.runCode(`touch('${data}/seeded');`);
    }

    return php;
}, {
    documentRoot: '/app/public',
    // Files of the website: keep in sync with prepare_embed(), in
    // ../../../.castor/wasm.php
    except: ['bundles/'],
});

async function runConsole(php, ...args) {
    const { exitCode, stdout, stderr } = await php.runFile('/app/bin/console', { args: [...args, '--no-interaction'] });
    if (0 !== exitCode) {
        throw new Error(`The console exits with ${exitCode}: ${stdout}${stderr}`);
    }
}
