<?php

namespace JoliCode\MediaBundle\Tests\Storage\S3;

use Aws\S3\S3Client;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter;
use League\Flysystem\Filesystem;
use League\Flysystem\UrlGeneration\TemporaryUrlGenerator;

/**
 * Runs the storages against a real S3-compatible server, started by "castor tests:s3".
 */
abstract class S3TestCase extends BaseTestCase
{
    protected S3Client $s3Client;

    protected string $bucket;

    private int $filesystemCount = 0;

    protected function setUp(): void
    {
        $endpoint = getenv('S3_ENDPOINT');

        if (false === $endpoint || '' === $endpoint) {
            self::markTestSkipped('The S3_ENDPOINT environment variable is not set, run "castor tests:s3".');
        }

        $this->s3Client = new S3Client([
            'version' => 'latest',
            'region' => 'us-east-1',
            'endpoint' => $endpoint,
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key' => getenv('S3_ACCESS_KEY') ?: '',
                'secret' => getenv('S3_SECRET_KEY') ?: '',
            ],
        ]);
        $this->bucket = 'joli-media-' . bin2hex(random_bytes(6));
        $this->createBucket($this->bucket);

        parent::setUp();
    }

    protected function tearDown(): void
    {
        if (isset($this->bucket)) {
            $this->deleteBucket($this->bucket);
        }

        parent::tearDown();
    }

    /**
     * @param array<string, mixed> $config
     */
    protected function createFilesystem(?TemporaryUrlGenerator $temporaryUrlGenerator = null, array $config = []): Filesystem
    {
        // every filesystem gets its own prefix in the bucket, as distinct libraries would
        return new Filesystem(
            new AwsS3V3Adapter($this->s3Client, $this->bucket, 'fs' . ++$this->filesystemCount),
            $config,
            temporaryUrlGenerator: $temporaryUrlGenerator,
        );
    }

    protected function createBucket(string $bucket): void
    {
        $this->s3Client->createBucket(['Bucket' => $bucket]);
        $this->s3Client->waitUntil('BucketExists', ['Bucket' => $bucket]);
    }

    private function deleteBucket(string $bucket): void
    {
        $objects = $this->s3Client->getPaginator('ListObjectsV2', ['Bucket' => $bucket]);

        foreach ($objects as $page) {
            foreach ($page['Contents'] ?? [] as $object) {
                $this->s3Client->deleteObject(['Bucket' => $bucket, 'Key' => $object['Key']]);
            }
        }

        $this->s3Client->deleteBucket(['Bucket' => $bucket]);
    }
}
