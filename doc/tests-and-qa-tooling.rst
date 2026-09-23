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
    tests
        tests:build       Build the test infrastructure
        tests:builder     Open a shell (bash) into the tests container

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

Before contributing
-------------------

Before contributing to the project, make sure to run the tests and check the coding style. You can do this by running the following command:

.. code-block:: terminal

    $ castor tests:build
    $ castor qa:install
    $ castor qa:all
