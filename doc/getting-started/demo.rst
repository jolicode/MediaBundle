Demo
====

Want to see JoliCode MediaBundle in action? the "demo" folder of the repository contains a fully functional Symfony application showcasing the bundle features integrated with EasyAdmin and Sonata Admin. You can find this demo application in the ``demo/application`` folder of the repository.

Starting the demo application
-----------------------------

To start the demo application, you need to have Docker and `Castor <https://github.com/jolicode/castor#installation>`_ installed on your system. Then, follow these steps:

1. Clone the repository if you haven't already:
    .. code-block:: terminal

        git clone https://github.com/JoliCode/MediaBundle.git
        cd MediaBundle

2. Configure the local domain:
    .. code-block:: terminal

        echo '127.0.0.1 jolimediabundle-demo.test' | sudo tee -a /etc/hosts

3. Start the application using Castor:
    .. code-block:: terminal

        $ castor demo:start

    The first start of the stack should take a few minutes: docker images will be built, and dependencies will be installed.

4. Once the application is started, insert some fixture data:
    .. code-block:: terminal

        $ castor demo:app:db:fixtures

5. Finally, open your browser and navigate to https://jolimediabundle-demo.test. You should see the demo application homepage.

.. tip::

    The ``demo`` castor commands namespace contains other useful commands to interact with the demo application (clearing the cache, loading fixtures, etc.). You can list them by running the ``castor`` command. You can also get detauiled usage instructions by reading `the demo README file <https://github.com/jolicode/MediaBundle/blob/main/demo/README.md>`_.

Stopping the demo application
-----------------------------

To stop the demo application, run the following command:

.. code-block:: terminal

    $ castor demo:docker:stop

To also remove the containers, networks, and volumes associated with the demo application, run:

.. code-block:: terminal

    $ castor demo:docker:destroy

Using the demo application to contribute to JoliCode MediaBundle
----------------------------------------------------------------

The demo application can be a good playground to write and test your contributions to the MediaBundle. When the demo application is started using Castor, it uses the local version of the MediaBundle from your cloned repository. This way, any changes you make to the MediaBundle code will be directly available in the demo application.

When working on asset files (eg. javascript and stylesheets provided by the admin bridges), it can however be a bit anoying to have to rebuild the assets each time you make a change. To ease this process, you can use the following Castor command to watch for changes and automatically rebuild the assets:

.. code-block:: terminal

    $ castor frontend:watch

Each time an asset file is modified, it will be rebuilt in the bridges' folders. In order to also have these changes reflected in the demo application, you can run the following Castor command to watch for changes in the bridges' folders and install the rebuilt assets in the demo application public folder:

.. code-block:: terminal

    $ castor demo:app:front:watch

This way, you can have a smooth development experience when working on the MediaBundle and its demo application. Once the changes are ready, don't forget to stop the watcher and build the assets one last time for production using:

.. code-block:: terminal

    $ castor frontend:compile
