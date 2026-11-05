// What castor demo:wasm:check runs: what a browser runs, in node. It has no
// IndexedDB: the files stay in the memory of the module.

import assert from 'node:assert/strict';
import { test } from 'node:test';

import createPhp from '../public/build/php-web.mjs';

const php = await createPhp();
// Keep in sync with ../public/index.html
php.FS.mkdirTree('/media-bundle-demo/media');
php.FS.symlink('/media-bundle-demo/media', '/app/public/media');
php.FS.mkdirTree('/usr/local/lib');
php.FS.writeFile('/usr/local/lib/php.ini', ['memory_limit=320M', 'post_max_size=110M', 'upload_max_filesize=10M'].join('\n'));

const cookies = new Map();

async function get(path) {
    const cookie = [...cookies].map(([name, value]) => `${name}=${value}`).join('; ');
    const response = await php.request(
        { url: `https://demo.test/app${path}`, headers: '' === cookie ? {} : { Cookie: cookie } },
        { documentRoot: '/app/public', basePath: '/app' },
    );
    for (const [name, value] of response.headers) {
        if ('set-cookie' === name.toLowerCase()) {
            const [pair] = value.split(';');
            cookies.set(pair.slice(0, pair.indexOf('=')), pair.slice(pair.indexOf('=') + 1));
        }
    }

    return response;
}

const headerOf = (response, wanted) => response.headers.find(([name]) => wanted === name.toLowerCase())?.[1];
const text = (response) => new TextDecoder().decode(response.body);

test('the fixtures create the database and the media', async () => {
    for (const args of [['doctrine:schema:update', '--force'], ['doctrine:fixtures:load']]) {
        const { exitCode, stdout, stderr } = await php.runFile('/app/bin/console', { args: [...args, '--no-interaction'] });

        assert.equal(exitCode, 0, stdout + stderr);
    }
});

test('the pages of the application answer', async () => {
    for (const path of [
        '/',
        '/easy-admin/user',
        '/easy-admin/post',
        '/easy-admin/post/new',
        '/easy-admin/post/1/edit',
        '/easy-admin/brand',
        '/easy-admin/media-library/explore',
        '/sonata-admin/dashboard',
        '/sonata-admin/app/post/list',
        '/sonata-admin/app/post/1/edit',
        '/sonata-admin/media/explore',
        '/sylius-admin/',
        '/sylius-admin/posts',
        '/sylius-admin/posts/1/edit',
        '/sylius-admin/users',
        '/sylius-admin/media/explore',
    ]) {
        const response = await get(path);

        assert.equal(response.status, 200, `${path}: ${response.stderr}`);
    }

    assert.match(text(await get('/')), /\/app\/media\/cache\//, 'The URLs of the media are under the base path.');
});

test('gd makes the variations', async () => {
    for (const [path, type] of [
        ['/media/original/articles/circle-pattern.png', 'image/png'],
        ['/media/cache/admin_list_thumbnail/articles/circle-pattern.jpeg', 'image/webp'],
        ['/media/cache/admin_list_thumbnail/articles/circle-pattern.png', 'image/webp'],
        ['/media/cache/admin_list_thumbnail/articles/circle-pattern.gif', 'image/webp'],
        ['/media/cache/post_body/articles/circle-pattern.jpeg', 'image/jpeg'],
        ['/media/cache/transform_resize/articles/circle-pattern.jpeg', 'image/webp'],
        ['/media/cache/transform_thumbnail/articles/circle-pattern.png', 'image/png'],
        ['/media/cache/transform_chained/articles/circle-pattern.jpeg', 'image/jpeg'],
    ]) {
        const response = await get(path);

        assert.equal(response.status, 200, `${path}: ${response.stderr}`);
        assert.equal(headerOf(response, 'content-type'), type, path);
        assert.ok(0 < response.body.length, path);
    }
});

test('a variation can be regenerated', async () => {
    const show = await get('/easy-admin/media-library/show/articles/circle-pattern.jpeg');
    assert.equal(show.status, 200, show.stderr);
    // The name of a variation is a slug in this URL
    const link = text(show).match(/href="([^"]*\/regenerate\/transform-chained\/[^"]*)"/)?.[1];
    assert.ok(undefined !== link, 'The page of a media has the button.');

    const regenerated = await get(new URL(link).pathname.replace(/^\/app/, ''));
    assert.equal(regenerated.status, 302, regenerated.stderr);

    const page = await get(new URL(headerOf(regenerated, 'location'), 'https://demo.test').pathname.replace(/^\/app/, ''));
    assert.match(text(page), /regenerated/i);
});
