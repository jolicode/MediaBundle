Tests and Quality Assurance Tooling
===================================

`Castor <https://castor.jolicode.com/>`_ is used as a task runner to streamline common maintenance tasks. It is also used to run the tests.

.. code-block:: terminal

    $ castor

    backend
        backend:install   Install backend dependencies
    docker
        docker:build      Build the test infrastructure
        docker:builder    Open a shell (bash) into the tests container
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

The ``qa`` commands are used to run quality assurance tasks, such as running tests, checking coding style, and updating dependencies.

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

    $ castor docker:build
    $ castor qa:install
    $ castor qa:all
