<?php

namespace JoliCode\MediaBundle\Tests\Command;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Command\BatchConvertCommand;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Transformer\Resize;
use JoliCode\MediaBundle\Transformer\TransformerChain;
use JoliCode\MediaBundle\Variation\Variation;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;

class BatchConvertCommandTest extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // use a variation with a transformer, so unmeasurable medias are rejected
        $this->variation = new Variation(
            'thumbnail',
            Format::WEBP,
            new TransformerChain([new Resize(400, 300)]),
        );
    }

    public function testBatchConvertReportsFailuresAndContinues(): void
    {
        $this->storeMedia('test/a.jpeg', self::getFixtureBinary('jpeg'));
        $this->storeMedia('test/broken.jpeg', new Binary('image/jpeg', 'jpeg', ''));
        $this->storeMedia('test/c.jpeg', self::getFixtureBinary('jpeg'));

        $commandTester = new CommandTester(new BatchConvertCommand($this->converter, $this->libraries));
        $exitCode = $commandTester->execute([
            '--library' => 'default',
        ]);

        self::assertSame(Command::FAILURE, $exitCode);
        self::assertTrue($this->cacheStorage->has('test/a.jpeg', $this->variation));
        self::assertFalse($this->cacheStorage->has('test/broken.jpeg', $this->variation));
        self::assertTrue($this->cacheStorage->has('test/c.jpeg', $this->variation));
        self::assertStringContainsString('test/broken.jpeg', $commandTester->getDisplay());
        self::assertStringContainsString('Some files could not be converted', $commandTester->getDisplay());
    }

    public function testBatchConvertSucceeds(): void
    {
        $this->storeMedia('test/a.jpeg', self::getFixtureBinary('jpeg'));

        $commandTester = new CommandTester(new BatchConvertCommand($this->converter, $this->libraries));
        $exitCode = $commandTester->execute([
            '--library' => 'default',
        ]);

        self::assertSame(Command::SUCCESS, $exitCode);
        self::assertTrue($this->cacheStorage->has('test/a.jpeg', $this->variation));
        self::assertStringContainsString('All the processable files have been converted', $commandTester->getDisplay());
    }

    private function storeMedia(string $path, Binary $binary): void
    {
        $media = new Media($path, $this->originalStorage);
        $media->store($binary);
    }
}
