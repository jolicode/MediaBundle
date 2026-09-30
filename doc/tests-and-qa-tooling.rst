Tests and Quality Assurance Tooling
===================================

`Castor <https://castor.jolicode.com/>`_ is used as a task runner to streamline common maintenance tasks. It is also used to run the tests.

.. code-block:: terminal

    $ castor

    backend
        backend:install   Install backend dependencies
    demo
        demo:start        Builds and starts the infrastructure, then installs the demo application
        demo:app:install  Installs the demo application (composer, yarn, ...), using the local bundle
        demo:bash         Run a bash shell inside the PHP container
        demo:composer     Run composer for this service
        demo:symfony      Run a Symfony console command
        demo:qa:cs        Fixes Coding Style
        demo:qa:phpstan   Runs PHPStan
        demo:docker:build Builds the infrastructure
        demo:docker:up    Builds and starts the infrastructure
        demo:docker:stop  Stops the infrastructure
        demo:docker:destroy Cleans the infrastructure (remove container, volume, networks)
        demo:postgres:client Open a psql session on the database
        ...
    frontend
        frontend:compile  Compile assets
        frontend:install  Install assets
        frontend:watch    Watch frontend assets
    infra
        infra:build       Build the Docker image used by the backend, frontend and qa tasks
        infra:s3:start    Start the S3-compatible server used by the tests
        infra:s3:stop     Stop the S3-compatible server used by the tests
        infra:shell       Open a shell (bash) into the Docker image
    qa
        qa:all            [qa] Runs all QA tasks
        qa:cs             [cs] Fixes Coding Style
        qa:doctor-rst     Lint the docs
        qa:install        Installs tooling
        qa:phpstan        [phpstan] Runs PHPStan
        qa:phpunit        [phpunit] Runs PHPUnit tests
        qa:rector         Run the rector upgrade
        qa:twig-cs        Fix twig files
        qa:update         Updates the tooling

The ``qa`` commands are used to run quality assurance tasks, such as running tests, checking coding style, and updating dependencies. The ``demo`` commands drive the demo application and its Docker stack, see :doc:`the demo documentation </getting-started/demo>`.

Running tests
-------------

To run the tests, you can use the following command:

.. code-block:: terminal

    $ castor qa:phpunit

    # test against a specific PHP version
    $ castor qa:phpunit --php-version=8.4

    # test against a specific PHP version, only the "Validator" tests
    $ castor qa:phpunit --php-version=8.4 /Validator

The tests of the ``s3`` group run the storages against a real S3-compatible server (`RustFS`_). ``qa:phpunit`` starts this server when it runs these tests, and leaves it running for the next runs; the first run downloads its Docker image:

.. code-block:: terminal

    # only the S3 tests
    $ castor qa:phpunit --group s3

    # all the tests but the S3 ones, without starting the server
    $ castor qa:phpunit --exclude-group s3

    # stop the S3 server
    $ castor infra:s3:stop

Before contributing
-------------------

Before contributing to the project, make sure to run the tests and check the coding style. You can do this by running the following command:

.. code-block:: terminal

    $ castor infra:build
    $ castor qa:install
    $ castor qa:all

.. _`RustFS`: https://github.com/rustfs/rustfs
