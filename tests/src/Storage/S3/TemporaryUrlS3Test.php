<?php

namespace JoliCode\MediaBundle\Tests\Storage\S3;

use JoliCode\MediaBundle\Conversion\Converter;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\MediaVariation;
use PHPUnit\Framework\Attributes\Group;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Contracts\Cache\CacheInterface;

#[Group('s3')]
class TemporaryUrlS3Test extends S3TestCase
{
    /**
     * @var (callable(): Converter)|null
     */
    private $previousConverterInitializer;

    private CacheInterface $cache;

    protected function setUp(): void
    {
        $this->cache = new ArrayAdapter();

        parent::setUp();

        $this->previousConverterInitializer = MediaVariation::$converterInitializer;
        MediaVariation::$converterInitializer = fn (): Converter => $this->converter;
    }

    protected function tearDown(): void
    {
        MediaVariation::$converterInitializer = $this->previousConverterInitializer;

        parent::tearDown();
    }

    public function testTemporaryUrlOfAnOriginal(): void
    {
        $content = self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH);
        $media = $this->originalStorage->createMedia('folder/test.png', $content);

        $response = $this->fetch($media->getTemporaryUrl());

        $this->assertSame(200, $response['status']);
        $this->assertSame('image/png', $response['contentType']);
        $this->assertSame($content, $response['body']);
        $this->assertSame(403, $this->fetch($this->s3Client->getObjectUrl($this->bucket, 'fs1/folder/test.png'))['status']);
    }

    public function testTemporaryUrlOfAMissingVariationGeneratesIt(): void
    {
        $media = $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));

        $response = $this->fetch($media->createVariation('thumbnail')->getTemporaryUrl());

        $this->assertSame(200, $response['status']);
        $this->assertSame('image/webp', $response['contentType']);
        $this->assertTrue($this->cacheStorage->has('test.png', $this->variation));
    }

    public function testTemporaryUrlOfAStoredVariationDoesNotReachTheBucketOnceCached(): void
    {
        $media = $this->originalStorage->createMedia('test.png', self::getFixtureBinaryContent(self::PNG_FIXTURE_PATH));
        $this->converter->convertMediaVariation($media->createVariation('thumbnail'));
        $this->commands = [];

        (new Media('test.png', $this->originalStorage))->createVariation('thumbnail')->getTemporaryUrl();
        $firstRequests = $this->commands;
        $this->commands = [];

        for ($i = 0; $i < 5; ++$i) {
            (new Media('test.png', $this->originalStorage))->createVariation('thumbnail')->getTemporaryUrl();
        }

        // presigning goes through the middlewares as a GetObject command, without sending it
        $this->assertSame(['HeadObject', 'GetObject'], $firstRequests);
        $this->assertSame(array_fill(0, 5, 'GetObject'), $this->commands);
    }

    protected function createCache(): CacheInterface
    {
        return $this->cache;
    }
}
