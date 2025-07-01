<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Variation\Voter;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Variation\Voter\AllOfVoter;
use JoliCode\MediaBundle\Variation\Voter\FilesizeVoter;
use JoliCode\MediaBundle\Variation\Voter\FolderVoter;
use JoliCode\MediaBundle\Variation\Voter\FormatVoter;
use JoliCode\MediaBundle\Variation\Voter\MimeTypeVoter;
use JoliCode\MediaBundle\Variation\Voter\OneOfVoter;

class VoterTest extends BaseTestCase
{
    private Media $gifMedia;

    private Media $jpegMedia;

    private Media $pngMedia;

    protected function setUp(): void
    {
        parent::setUp();
        $this->gifMedia = new Media('test.gif', $this->originalStorage, BaseTestCase::getFixtureBinary(Format::GIF->value));
        $this->gifMedia->store();

        $this->jpegMedia = new Media('test.jpg', $this->originalStorage, BaseTestCase::getFixtureBinary(Format::JPEG->value));
        $this->jpegMedia->store();

        $this->pngMedia = new Media('test.png', $this->originalStorage, BaseTestCase::getFixtureBinary(Format::PNG->value));
        $this->pngMedia->store();
    }

    public function testFormatVoter(): void
    {
        $voter = new FormatVoter('jpg');
        self::assertTrue($voter->vote($this->jpegMedia));

        $voter = new FormatVoter('png');
        self::assertFalse($voter->vote($this->jpegMedia));
    }

    public function testMimeTypeVoter(): void
    {
        $voter = new MimeTypeVoter('image/jpeg');
        self::assertTrue($voter->vote($this->jpegMedia));

        $voter = new MimeTypeVoter('image/png');
        self::assertFalse($voter->vote($this->jpegMedia));
    }

    public function testAllOfVoterWithAllApproving(): void
    {
        $voters = [
            new FormatVoter('jpg'),
            new MimeTypeVoter('image/jpeg'),
        ];

        $voter = new AllOfVoter($voters);
        self::assertTrue($voter->vote($this->jpegMedia));
    }

    public function testAllOfVoterWithOneRejecting(): void
    {
        $voters = [
            new FormatVoter('jpg'),
            new MimeTypeVoter('image/png'),
        ];

        $voter = new AllOfVoter($voters);
        self::assertFalse($voter->vote($this->jpegMedia));
    }

    public function testOneOfVoterWithOneApproving(): void
    {
        $voters = [
            new FormatVoter('png'),
            new MimeTypeVoter('image/jpeg'),
        ];

        $voter = new OneOfVoter($voters);
        self::assertTrue($voter->vote($this->jpegMedia));
    }

    public function testOneOfVoterWithAllRejecting(): void
    {
        $voters = [
            new FormatVoter('png'),
            new MimeTypeVoter('image/png'),
        ];

        $voter = new OneOfVoter($voters);
        self::assertFalse($voter->vote($this->jpegMedia));
    }

    public function testFilesizeVoter(): void
    {
        // Test with no size limits
        $voter = new FilesizeVoter();
        self::assertTrue($voter->vote($this->jpegMedia));

        // Test with min size
        $voter = new FilesizeVoter(minSize: 1000);
        self::assertTrue($voter->vote($this->jpegMedia));

        $voter = new FilesizeVoter(minSize: 1000000);
        self::assertFalse($voter->vote($this->jpegMedia));

        // Test with max size
        $voter = new FilesizeVoter(maxSize: 1000000);
        self::assertTrue($voter->vote($this->jpegMedia));

        $voter = new FilesizeVoter(maxSize: 1000);
        self::assertFalse($voter->vote($this->jpegMedia));

        // Test with both min and max size
        $voter = new FilesizeVoter(minSize: 1000, maxSize: 1000000);
        self::assertTrue($voter->vote($this->jpegMedia));

        $voter = new FilesizeVoter(minSize: 1000000, maxSize: 1000000);
        self::assertFalse($voter->vote($this->jpegMedia));
    }

    public function testFolderVoter(): void
    {
        // Test with root folder
        $voter = new FolderVoter('');
        self::assertTrue($voter->vote($this->jpegMedia));

        // Test with matching folder
        $voter = new FolderVoter('test');
        self::assertTrue($voter->vote($this->jpegMedia));

        // Test with non-matching folder
        $voter = new FolderVoter('other');
        self::assertFalse($voter->vote($this->jpegMedia));

        // Test with nested folder
        $media = new Media('folder/test.jpg', $this->originalStorage, BaseTestCase::getFixtureBinary(Format::JPEG->value));
        $media->store();

        $voter = new FolderVoter('folder');
        self::assertTrue($voter->vote($media));

        $voter = new FolderVoter('other');
        self::assertFalse($voter->vote($media));
    }

    public function testComplexNestedVoters(): void
    {
        // Level 1: AllOfVoter that requires either JPEG or PNG format, and must be in a specific folder
        $formatVoters = new OneOfVoter([
            new FormatVoter('jpg'),
            new FormatVoter('png'),
        ]);
        $folderVoter = new FolderVoter('test');
        $level1Voter = new AllOfVoter([$formatVoters, $folderVoter]);

        // Level 2: OneOfVoter that requires either the level1 conditions OR a specific MIME type
        $mimeTypeVoter = new MimeTypeVoter('image/gif');
        $level2Voter = new OneOfVoter([$level1Voter, $mimeTypeVoter]);

        // Level 3: AllOfVoter that requires the level2 conditions AND a specific file size
        $filesizeVoter = new FilesizeVoter(minSize: 1000, maxSize: 1024 * 1024); // 1MB
        $level3Voter = new AllOfVoter([$level2Voter, $filesizeVoter]);

        // Test with JPEG media (should pass all levels)
        self::assertTrue($level3Voter->vote($this->jpegMedia));

        // Test with PNG media (should pass all levels)
        self::assertTrue($level3Voter->vote($this->pngMedia));

        // Test with GIF media (should pass through MIME type check)
        self::assertTrue($level3Voter->vote($this->gifMedia));

        // Test with a media that doesn't meet any conditions
        $invalidMedia = new Media('other/invalid.txt', $this->originalStorage, BaseTestCase::getFixtureBinary(Format::JPEG->value));
        $invalidMedia->store();
        self::assertFalse($level3Voter->vote($invalidMedia));

        // Test with a media that doesn't meet any conditions
        $tooLargeMedia = new Media('test/large-file.jpg', $this->originalStorage, new Binary(
            'image/jpg',
            'jpg',
            str_repeat('0', 1024 * 1024 * 2) // 2MB,
        ));
        $tooLargeMedia->store();
        self::assertFalse($level3Voter->vote($invalidMedia));
    }
}
