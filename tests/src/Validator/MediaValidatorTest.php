<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Validator;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\Format;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Resolver\Resolver;
use JoliCode\MediaBundle\Tests\BaseTestCase;
use JoliCode\MediaBundle\Validator\Media as MediaConstraint;
use JoliCode\MediaBundle\Validator\MediaValidator;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Validator\Context\ExecutionContext;
use Symfony\Component\Validator\Exception\UnexpectedValueException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MediaValidatorTest extends BaseTestCase
{
    private MediaValidator $validator;

    private ExecutionContext $context;

    protected function setUp(): void
    {
        parent::setUp();

        $this->validator = new MediaValidator($this->resolver);
        $this->context = new ExecutionContext(
            $this->createMock(ValidatorInterface::class),
            'root',
            new Translator('en'),
        );
        $this->validator->initialize($this->context);
    }

    public function testValidateWithNullValue(): void
    {
        $constraint = new MediaConstraint();
        $this->validator->validate(null, $constraint);

        self::assertCount(0, $this->context->getViolations());
    }

    public function testValidateWithNonStringValue(): void
    {
        $constraint = new MediaConstraint();

        $this->expectException(UnexpectedValueException::class);
        $this->expectExceptionMessage('Expected argument of type "string or JoliCode\MediaBundle\Model\Media", "int" given');

        $this->validator->validate(123, $constraint);
    }

    public function testValidateWithUnresolvedMedia(): void
    {
        $constraint = new MediaConstraint();
        $this->validator->validate('non-existent.jpg', $constraint);

        $violations = $this->context->getViolations();
        self::assertCount(1, $violations);
        self::assertEquals('The media "non-existent.jpg" could not be resolved.', $violations->get(0)->getMessage());
    }

    public function testValidateWithValidMedia(): void
    {
        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/png', Format::PNG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::PNG_FIXTURE_PATH)));
        $media->store();

        $constraint = new MediaConstraint();
        $this->validator->validate('test.jpg', $constraint);

        self::assertCount(0, $this->context->getViolations());
    }

    public function testValidateWithInvalidExtension(): void
    {
        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));
        $media->store();

        $constraint = new MediaConstraint(allowedExtensions: ['png']);
        $this->validator->validate('test.jpg', $constraint);

        $violations = $this->context->getViolations();
        self::assertCount(1, $violations);
        self::assertEquals('This file extension is not allowed. Allowed extensions are: png.', $violations->get(0)->getMessage());
    }

    public function testValidateWithInvalidMimeType(): void
    {
        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));
        $media->store();

        $constraint = new MediaConstraint(allowedMimeTypes: ['image/png']);
        $this->validator->validate('test.jpg', $constraint);

        $violations = $this->context->getViolations();
        self::assertCount(1, $violations);
        self::assertEquals('This mime type is not allowed. Allowed mime types are: image/png.', $violations->get(0)->getMessage());
    }

    public function testValidateWithInvalidType(): void
    {
        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));
        $media->store();

        $constraint = new MediaConstraint(allowedTypes: ['video']);
        $this->validator->validate('test.jpg', $constraint);

        $violations = $this->context->getViolations();
        self::assertCount(1, $violations);
        self::assertEquals('This file type is not allowed. Allowed types are: video.', $violations->get(0)->getMessage());
    }

    public function testValidateWithInvalidPath(): void
    {
        // Create and store a test media
        $media = new Media(
            'some/path/test.jpg',
            $this->originalStorage,
            new Binary(
                'image/jpeg',
                Format::JPEG->value,
                BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH),
            ),
        );
        $media->store();

        $constraint = new MediaConstraint(allowedPaths: ['foo', 'bar']);
        $this->validator->validate('some/path/test.jpg', $constraint);
        $violations = $this->context->getViolations();
        self::assertCount(1, $violations);
        self::assertEquals('The file path "some/path/test.jpg" is not allowed. Allowed paths must start with one of the following: foo, bar.', $violations->get(0)->getMessage());
    }

    public function testValidateWithValidPath(): void
    {
        // Create and store a test media
        $media = new Media(
            'some/path/test.jpg',
            $this->originalStorage,
            new Binary(
                'image/jpeg',
                Format::JPEG->value,
                BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH),
            ),
        );
        $media->store();

        $constraint = new MediaConstraint(allowedPaths: ['foo', 'bar', 'some']);
        $this->validator->validate('some/path/test.jpg', $constraint);
        $violations = $this->context->getViolations();
        self::assertCount(0, $violations);
    }

    public function testValidateWithStorageName(): void
    {
        $resolver = new Resolver($this->libraries, $this->processorContainer);
        $context = $this->createExecutionContext();
        $validator = $this->createValidator($resolver, $context);

        self::assertCount(2, $this->libraries->list());

        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, self::getFixtureBinary(Format::JPEG->value));
        $media->store();

        self::assertCount(0, $context->getViolations());

        // check that it is invalid in a specific storage
        $constraint = new MediaConstraint(library: 'custom');
        $validator->validate('test.jpg', $constraint);
        self::assertCount(1, $context->getViolations());

        // check that it is valid in the default storage
        $validator->initialize($context = $this->createExecutionContext());
        $constraint = new MediaConstraint(library: 'default');
        $validator->validate('test.jpg', $constraint);
        self::assertCount(0, $context->getViolations());

        // Add another media in the custom storage
        $media = new Media('test-2.png', $this->customOriginalStorage, self::getFixtureBinary(Format::PNG->value));
        $media->store();

        // check that it is valid in a specific storage
        $validator->initialize($context = $this->createExecutionContext());
        $constraint = new MediaConstraint(library: 'custom');
        $validator->validate('test-2.png', $constraint);
        self::assertCount(0, $context->getViolations());

        // check that it is invalid in the default storage
        $validator->initialize($context = $this->createExecutionContext());
        $constraint = new MediaConstraint(library: 'default');
        $validator->validate('test-2.png', $constraint);
        self::assertCount(1, $context->getViolations());
    }

    protected function createExecutionContext(): ExecutionContext
    {
        return new ExecutionContext(
            $this->createMock(ValidatorInterface::class),
            'root',
            new Translator('en'),
        );
    }

    protected function createValidator(Resolver $resolver, ExecutionContext $context): MediaValidator
    {
        $validator = new MediaValidator($resolver);
        $validator->initialize($context);

        return $validator;
    }
}
