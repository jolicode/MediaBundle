Pre-processors
==============

JoliMediaBundle provides different types of transformations, that allow for example to resize or crop images. However, it does not provide advanced transformations to prepare the media before the conversion, such as rotating images, applying filters, backgrounds or watermarks, because these transformations are not supported by all the underlying tools used by the bundle.

*Pre-processors* are responsible for applying transformations to a media before the conversion. They can be used to prepare the media before the transformation, for example to apply a watermark or rotate the media.

Configuration
-------------

The pre-processors configuration is defined in the ``pre_processors`` key of the ``joli_media`` configuration.

.. code-block:: yaml

    joli_media:
        pre_processors:
            - App\Media\PreProcessor\AutoRotateImagePreProcessor
            # - ...

In the example above, the ``AutoRotateImagePreProcessor`` will be applied to the media before any of its variation is computed. The pre-processors are executed sequentially: first the ones the bundle registers automatically (see below), then the ones defined in the configuration file, in the order they are defined.

Pre-processors that use an external binary (such as the ``ExifRemovalPreProcessor``) execute it in an external process, which times out after the duration defined in the global ``joli_media.process_timeout`` directive (60 seconds by default). To override this value for a given pre-processor, use the alternative map syntax of the ``pre_processors`` configuration and define its ``process_timeout`` key, in seconds (``0`` disables the timeout):

.. code-block:: yaml

    joli_media:
        pre_processors:
            App\Media\PreProcessor\AutoRotateImagePreProcessor: ~
            JoliCode\MediaBundle\PreProcessor\ExifRemovalPreProcessor:
                process_timeout: 120

For pre-processors defined in your application, the ``process_timeout`` value is passed to the ``$processTimeout`` argument of the service constructor, which must hence be declared, and returned by an override of the ``getProcessTimeout()`` method::

    public function __construct(
        private ImagineInterface $imagine,
        private ?float $processTimeout = null,
    ) {
    }

    protected function getProcessTimeout(): ?float
    {
        return $this->processTimeout;
    }

Pre-processors that declare this argument without configuring a ``process_timeout`` can inherit the global value by binding the ``joli_media.process_timeout`` container parameter in their service definition.

The pre-processors configuration can also be defined within a specific variation configuration, under the ``variations`` key of the ``joli_media`` configuration. For example:

.. code-block:: yaml

    variations:
        real_estate:
            format: webp
            pre_processors:
                - App\Media\PreProcessor\ApplyWatermarkPreProcessor
                # - ...
            transformers:
                resize:
                    width: 200
                    height: 150
                    mode: inside
                heighten:
                    height: 600

In the example above, the ``ApplyWatermarkPreProcessor`` will be applied to the media before the "real_estate" variation is computed, and after the global pre-processors.

The PreProcessorInterface
-------------------------

A pre-processor class must implement the ``process`` method of the ``Joli\MediaBundle\PreProcessor\PreProcessorInterface`` interface, in order to manipulate the media. As a normal service, pre-processor can use other services - for example the Imagine library. The following pre-processor shows how to expand the size of an image and add a yellow background to it (although you will probably prefer to use `the "Expand" transformer<../variations/transformers.rst>`_)::

    namespace App\Media\PreProcessor;

    use Imagine\Image\Box;
    use Imagine\Image\ImagineInterface;
    use Imagine\Image\Point;
    use JoliCode\MediaBundle\Binary\Binary;
    use JoliCode\MediaBundle\PreProcessor\AbstractPreProcessor;
    use JoliCode\MediaBundle\PreProcessor\PreProcessorInterface;
    use JoliCode\MediaBundle\Variation\Variation;

    readonly class OgImagePreProcessor extends AbstractPreProcessor implements PreProcessorInterface
    {
        private const WIDTH = 1200;
        private const HEIGHT = 1000;

        public function __construct(
            private ImagineInterface $imagine,
        ) {
        }

        public function process(Binary $binary, Variation $variation): Binary
        {
            $image = $this->imagine->load($binary->getContent());

            $width = $image->getSize()->getWidth();
            $height = $image->getSize()->getHeight();

            if (!$width || !$height) {
                return $binary;
            }

            if ($width > self::WIDTH || $height > self::HEIGHT) {
                $ratio = $width / $height;

                if ($width > self::WIDTH) {
                    $height = self::WIDTH / $ratio;
                    $width = self::WIDTH;
                }

                if ($height > self::HEIGHT) {
                    $width = self::HEIGHT * $ratio;
                    $height = self::HEIGHT;
                }

                $image = $image->resize(new Box($width, $height));
            }

            $canvas = $this->imagine->create(
                new Box(self::WIDTH, self::HEIGHT),
                $image->palette()->color('#ffff00'),
            );

            $x = (self::WIDTH - $width) / 2;
            $y = (self::HEIGHT - $height) / 2;

            $canvas->paste($image, new Point($x, $y));

            return new Binary(
                $binary->getMimeType(),
                $binary->getFormat(),
                $canvas->get($binary->getFormat()),
            );
        }
    }

Declaring whether the pixel dimensions are preserved
----------------------------------------------------

A pre-processor is free to return a binary of any size, which prevents the bundle from computing the dimensions of a variation without generating it - something the `srcset generation <../misc-features/srcset.rst>`_ relies on to build complete width descriptors on a cold cache.

The ``preservesPixelDimensions()`` method of the interface tells whether this pre-processor always returns a binary having the very same pixel dimensions as the one it is given. ``AbstractPreProcessor`` answers ``false``, which is the safe default: override it when your pre-processor only touches the content of the image, never its size::

    public function preservesPixelDimensions(): bool
    {
        // only the metadata is stripped, the pixel data is left untouched
        return true;
    }

The ``OgImagePreProcessor`` above resizes and repaints the image, so it must keep the ``false`` answer it inherits.

.. caution::

    A pre-processor answering ``true`` while resizing the binary makes the bundle advertise wrong dimensions in the markup it generates. When in doubt, leave the default.

Built-in pre-processors
-----------------------

Heif pre-processor
~~~~~~~~~~~~~~~~~~

The bundle provides the ``HeifPreProcessor`` pre-processor, which is used to convert HEIF images to JPEG or PNG format. This pre-processor is automatically registered and does not need to be configured in the ``joli_media`` configuration. It relies on the Imagine library, so it is only registered when the ``imagine`` `processor <processors.rst>`_ is enabled.

HEIF (High Efficiency Image File Format) is a modern image format that is not supported by all browsers and tools, but it is gaining traction due to its efficient compression and high quality. However, many web browsers do not support HEIF images, which can lead to compatibility issues when displaying images on the web. iPhone users can encounter this issue when they take photos in HEIF format, which is available on iOS devices since iOS 11.

Therefore, the ``HeifPreProcessor`` will automatically convert HEIF images to JPEG format, so that they can be used in variations and displayed in the browser.

Auto-orient pre-processor
~~~~~~~~~~~~~~~~~~~~~~~~~

The bundle provides the ``AutoOrientPreProcessor`` pre-processor, which rotates JPEG and TIFF images according to their EXIF ``Orientation`` tag. This pre-processor is automatically registered and does not need to be configured in the ``joli_media`` configuration. It relies on the Imagine library, so it is only registered when the ``imagine`` `processor <processors.rst>`_ is enabled, and on the ``exif`` PHP extension to read the tag: it does nothing when this extension is not loaded.

Phones and cameras often store a portrait photo as landscape pixels, along with an ``Orientation`` tag which tells the viewer to rotate it. Browsers honor this tag, but the image processing tools do not: without this pre-processor, the transformers would compute their dimensions on the stored, landscape pixels, and the processors and post-processors which drop the metadata (``cwebp``, ``jpegoptim``, ``mozjpeg``...) would produce variations displayed on their side.

The ``AutoOrientPreProcessor`` physically rotates the pixels once, before any transformer runs, and resets the ``Orientation`` tag so that nothing rotates the image twice. Images which are already upright are left untouched, without any re-encoding. It runs after the ``HeifPreProcessor``, so that the orientation is applied to the JPEG this one produces, and before the pre-processors defined in the configuration.

The pixel dimensions reported by the bundle for the original media (for example in the ``width`` and ``height`` attributes of the ``joli:Img`` component) also account for the ``Orientation`` tag, so they match what the browser displays.

Exif removal pre-processor
~~~~~~~~~~~~~~~~~~~~~~~~~~

The bundle provides the ``ExifRemovalPreProcessor`` pre-processor, which is used to remove EXIF metadata from images. This pre-processor is not registered by default, and must be added to the ``pre_processors`` configuration of the ``joli_media`` configuration, e.g.:

.. code-block:: yaml

    joli_media:
        pre_processors:
            - JoliCode\MediaBundle\PreProcessor\ExifRemovalPreProcessor
            # - ...

This pre-processor uses the `exiftool <https://exiftool.org/>`_ command line tool to remove EXIF metadata from images. It supports JPEG and TIFF images. exiftool must be installed on the server where the application is running, and its path must be configured in the ``JOLI_MEDIA_EXIFTOOL_BINARY`` environment variable or the ``joli_media.binary.exiftool`` configuration parameter (by default, it is set to ``/usr/local/bin/exiftool``).
