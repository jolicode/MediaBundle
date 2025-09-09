<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\PreProcessor;

use Imagine\Imagick\Imagine;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\PreProcessor\HeifPreProcessor;
use JoliCode\MediaBundle\Tests\BaseTestCase;

class HeifPreProcessorTest extends BaseTestCase
{
    public function testPreProcess(): void
    {
        $imagine = new Imagine();
        $heifPreProcessor = new HeifPreProcessor(
            $imagine,
        );
        $heifBinary = $this->getFixtureBinary(Format::HEIF->value);
        $media = new Media('test.heif', $this->originalStorage, $heifBinary);
        $mediaVariation = $media->createVariation($this->variation);
        $binary = $heifPreProcessor->process($heifBinary, $mediaVariation);

        self::assertEquals('image/jpeg', $binary->getMimeType());
        self::assertEquals('jpeg', $binary->getFormat());
        self::assertNotEmpty($binary->getContent());
        self::assertNotEquals($heifBinary->getContent(), $binary->getContent());
    }

    public function testConvert(): void
    {
        $this->expectNotToPerformAssertions();
        $media = new Media('test.heic', $this->originalStorage);
        $media->store($this->getFixtureBinary(Format::HEIF->value));

        // convert based on the HEIF Media object
        $this->converter->convert($media, null, 'thumbnail');

        // convert based on the HEIF file name
        $this->converter->convert('test.heic', null, 'thumbnail');
    }
}
