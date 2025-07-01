Installation
============

To install the JoliMediaBundle, you need to follow these steps:

1. **Install the bundle** using Composer:

.. code-block:: terminal

   $ composer require jolicode/media-bundle

2. **Register the bundle** in your Symfony application. If you are using Symfony Flex, this should be done automatically. If not, add the following line to your ``config/bundles.php`` file::

   return [
       // ...
       Joli\MediaBundle\JoliMediaBundle::class => ['all' => true],
   ];

3. Install the `software dependencies <dependencies-and-tooling.rst>`_
4. Configure the bundle according to your needs. You can find the configuration options `in the Configuration section <configuration.rst>`_ of the documentation.
