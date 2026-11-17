# JoliMediaBundle in the browser

[The demo application](../application/), its three admins included, compiled to WebAssembly with
[php-wasm-builder](https://lyrixx.github.io/php-wasm-builder/): no server runs PHP, and what you
upload stays in your browser. It is deployed on each push to `main`, on
<https://jolicode.github.io/MediaBundle/demo/>.

```bash
castor demo:wasm:serve   # builds it when it is not built, then serves it on http://127.0.0.1:8000/
castor demo:wasm:build   # builds it again, after a change of the bundle or of the application
castor demo:wasm:check   # checks what is built in node, without a browser
```

PHP runs in the service worker of the demo, `public/sw.js`: it answers every request under its
directory, so the URLs of the application are in the address bar, and a reload stays on the page.
`public/index.html` only shows until the service worker answers: it registers it, then reloads. The
browser stops a service worker that has nothing to do, after 30 s in Chrome: the next request starts
PHP again, that finds the database, the media and the sessions in IndexedDB.

What differs from Docker is in the `wasm` environment of the application: `.env.wasm`, and the
`when@wasm` blocks of its configuration. SQLite replaces PostgreSQL, and there is no network nor
other process to run: only the `imagine` processor works, with gd. So no AVIF, HEIC nor TIFF, and no
`exiftool`. An image that takes more than the 320 MB of `memory_limit` once uncompressed has no
variations: they answer a 500.
