Demo
====

Want to see JoliCode MediaBundle in action? the "demo" folder of the repository contains a fully functional Symfony application showcasing the bundle features integrated with EasyAdmin and Sonata Admin. You can find this demo application in the ``demo/application`` folder of the repository.

Starting the demo application
-----------------------------

To start the demo application, you need to have Docker and `Castor <https://github.com/jolicode/castor#installation>`_ installed on your system. Then, follow these steps:

1. Clone the repository if you haven't already:

.. code-block:: terminal

    $ git clone https://github.com/JoliCode/MediaBundle.git
    $ cd MediaBundle/demo

2. Configure the local domain:

.. code-block:: terminal

    $ echo '127.0.0.1 jolimediabundle-demo.test' | sudo tee -a /etc/hosts

3. Start the application using Castor:

.. code-block:: terminal

    $ castor start

The first start of the stack should take a few minutes: docker images will be built, and dependencies will be installed.

4. Once the application is started, insert some fixture data:

.. code-block:: terminal

    $ castor app:db:fixtures

5. Finally, open your browser and navigate to https://jolimediabundle-demo.test. You should see the demo application homepage.

