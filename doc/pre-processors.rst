Pre-processors
==============

JoliMediaBundle provides different type of transformations, that allow for example to resize or crop images. However, it does not provide adavanced transformations to prepare the media before the conversion, such as rotating images, applying filters, backgrounds or watermarks, because these transformations are not supported by all the underlying tools used by the bundle.

*Pre-processors* are responsible for applying transformations to a media before the conversion. They can be used to prepare the media before the transformation, for example to apply a watermark or rotate the media.

Configuration
-------------

The pre-processors configuration is defined in the ``pre_processors`` key of the ``joli_media`` configuration.

.. code-block:: yaml

    joli_media:
        pre_processors:
            - App\Media\PreProcessor\AutoRotateImagePreProcessor
            # - ...

In the example above, the ``AutoRotateImagePreProcessor`` will be applied to the media before any of its variation is computed. The pre-processors are executed sequentially, in the order they are defined in the configuration file.

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

A pre-processor class must implement the ``process`` method of the ``Joli\MediaBundle\PreProcessor\PreProcessorInterface`` interface, in order to manipulate the media. As a normal service, pre-processor can use other services - for example the Imagine library. The following pre-processor shows how to expand the size of an image and add a yellow background to it (although you will probably prefer to use `the "Expand" transformer<transformers.rst>`_)::

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
        private const int WIDTH = 1200;
        private const int HEIGHT = 1000;

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

Built-in pre-processors
-----------------------

Heif pre-processor
~~~~~~~~~~~~~~~~~~

The bundle provides the ``HeifPreProcessor`` pre-processor, which is used to convert HEIF images to JPEG or PNG format. This pre-processor is automatically registered and does not need to be configured in the ``joli_media`` configuration.

HEIF (High Efficiency Image File Format) is a modern image format that is not supported by all browsers and tools, but it is gaining traction due to its efficient compression and high quality. However, many web browsers do not support HEIF images, which can lead to compatibility issues when displaying images on the web. Iphone users can encounter this issue when they take photos in HEIF format, which available on iOS devices since iOS 11.

Therefore, the ``HeifPreProcessor`` will automatically convert HEIF images to JPEG format, so that they can be used in variations and displayed in the browser.

Exif removal pre-processor
~~~~~~~~~~~~~~~~~~~~~~~~~~

The bundle provides the ``ExifRemovalPreProcessor`` pre-processor, which is used to remove EXIF metadata from images. This pre-processor is not registered by default, and must be added to the ``pre_processors`` configuration of the ``joli_media`` configuration, e.g.:

.. code-block:: yaml

    joli_media:
        pre_processors:
            - JoliCode\MediaBundle\PreProcessor\ExifRemovalPreProcessor
            # - ...

This pre-processor uses the `exiftool <https://exiftool.org/>`_ command line tool to remove EXIF metadata from images. It supports JPEG and TIFF images. exiftool must be installed on the server where the application is running, and its path must be configured in the ``JOLI_MEDIA_EXIFTOOL_BINARY`` environment variable or the ``joli_media.binary.exiftool`` configuration parameter (by default, it is set to ``/usr/local/bin/exiftool``).
