# JoliMediaBundle demo project

This folder contains a Symfony application showcasing JoliMediaBundle, integrated
with EasyAdmin and Sonata Admin. It always runs against the bundle sources of this
repository, which makes it a convenient playground to develop the bundle.

## Running the application locally

### Requirements

The Docker environment is driven by [Castor](https://github.com/jolicode/castor#installation)
and the [castor-php/docker](https://castor-php.github.io/docker/) plugin, and requires:

 * Docker (with Compose v2.23 or later)
 * [Castor](https://github.com/jolicode/castor#installation)
 * [mkcert](https://github.com/FiloSottile/mkcert#installation) (optional, for locally trusted HTTPS certificates)

All the commands below are run from the root of the repository.

#### Castor completion

Once `castor` is installed, you can install the console autocompletion script.
If you are using bash:

```bash
castor completion | sudo tee /etc/bash_completion.d/castor
```

`castor` supports completion for `bash`, `zsh` & `fish` shells. For other
shells, please refer to your shell documentation.

### Docker environment

The stack is described in PHP, in [`.castor/demo.php`](../.castor/demo.php),
and the Docker Compose file is generated from it (`compose.generated.yaml`).
All the tasks of the plugin are exposed under the `demo:` namespace
(`demo:docker:*`, `demo:postgres:*`, `demo:worktree:*`).
It provides:

 - PostgreSQL 16
 - the `demo` container: nginx + PHP-FPM 8.4, with the media toolchain the bundle
   relies on (ImageMagick, exiftool, gifsicle, jpegoptim, pngquant, libwebp,
   mozjpeg, oxipng), see [`Dockerfile`](Dockerfile)
 - the `demo-builder` container, with Composer, Node.js and the QA tools

HTTPS routing is handled by the global Caddy router of castor-php/docker, which
binds ports 80 and 443 once for all the projects using the plugin.

### Domain configuration (first time only)

Before running the application for the first time, ensure the domain name
points to the IP of your Docker daemon by editing your `/etc/hosts` file.
This IP is probably `127.0.0.1` unless you run Docker in a special VM.

```bash
echo '127.0.0.1 jolimediabundle-demo.test' | sudo tee -a /etc/hosts
```

### SSL certificates

Certificates are minted on demand by the router. If `mkcert` is installed and
its root CA is trusted (`mkcert -install`), the certificates are trusted by your
browser. Otherwise, Caddy uses its own local CA and you will have to accept a
security warning.

### Starting the stack

```bash
castor demo:start
```

> [!NOTE]
> The first start of the stack takes a few minutes: the Docker images are built,
> and the dependencies of the application are installed.

The application is then available on https://jolimediabundle-demo.test. Load some
fixtures with:

```bash
castor demo:db:fixtures
```

`castor demo:docker:about` sums up the project and lists its URLs.

### Working with the local bundle

`castor demo:app:install` generates a `docker-composer.json` file which requires
`jolicode/media-bundle` from the repository root (a Composer path repository,
symlinked), and installs the dependencies with it. Any change made to the bundle
sources is immediately visible in the demo application.

When working on the assets of the admin bridges, run `castor frontend:watch` to
rebuild them, and `castor demo:app:front:watch` to install them in the demo
application each time they change.

### Other tasks

 - `castor demo:bash`: open a shell in the builder container
 - `castor demo:composer <args>`, `castor demo:symfony <args>`: run Composer or the Symfony console
 - `castor demo:cache-clear`, `castor demo:db:migrate`: usual application chores
 - `castor demo:qa:cs`, `castor demo:qa:phpstan`, `castor demo:qa:rector`, `castor demo:qa:twig-cs`: QA tools of the demo application
 - `castor demo:postgres:client`: open a psql session
 - `castor demo:docker:stop`, `castor demo:docker:destroy`, `castor demo:docker:logs`, `castor demo:docker:ps`: drive the infrastructure

Run `castor` to list all the available tasks.
