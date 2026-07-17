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
    }

    public function testValidateWithNullValue(): void
    {
        $constraint = new MediaConstraint();
        $this->doValidate($this->validator, null, $constraint, $this->context);

        self::assertCount(0, $this->context->getViolations());
    }

    public function testValidateWithNonStringValue(): void
    {
        $constraint = new MediaConstraint();

        $this->expectException(UnexpectedValueException::class);
        $this->expectExceptionMessage('Expected argument of type "string or JoliCode\MediaBundle\Model\Media", "int" given');

        $this->doValidate($this->validator, 123, $constraint, $this->context);
    }

    public function testValidateWithUnresolvedMedia(): void
    {
        $constraint = new MediaConstraint();
        $this->doValidate($this->validator, 'non-existent.jpg', $constraint, $this->context);

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
        $this->doValidate($this->validator, 'test.jpg', $constraint, $this->context);

        self::assertCount(0, $this->context->getViolations());
    }

    public function testValidateWithInvalidExtension(): void
    {
        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, new Binary('image/jpeg', Format::JPEG->value, BaseTestCase::getFixtureBinaryContent(BaseTestCase::JPEG_FIXTURE_PATH)));
        $media->store();

        $constraint = new MediaConstraint(allowedExtensions: ['png']);
        $this->doValidate($this->validator, 'test.jpg', $constraint, $this->context);

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
        $this->doValidate($this->validator, 'test.jpg', $constraint, $this->context);

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
        $this->doValidate($this->validator, 'test.jpg', $constraint, $this->context);

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
        $this->doValidate($this->validator, 'some/path/test.jpg', $constraint, $this->context);
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
        $this->doValidate($this->validator, 'some/path/test.jpg', $constraint, $this->context);
        $violations = $this->context->getViolations();
        self::assertCount(0, $violations);
    }

    public function testValidateWithStorageName(): void
    {
        $resolver = new Resolver($this->libraries, $this->processorContainer);
        $validator = new MediaValidator($resolver);

        self::assertCount(2, $this->libraries->list());

        // Create and store a test media
        $media = new Media('test.jpg', $this->originalStorage, self::getFixtureBinary(Format::JPEG->value));
        $media->store();

        // check that it is invalid in a specific storage
        $context = $this->createExecutionContext();
        $constraint = new MediaConstraint(library: 'custom');
        $this->doValidate($validator, 'test.jpg', $constraint, $context);
        self::assertCount(1, $context->getViolations());

        // check that it is valid in the default storage
        $context = $this->createExecutionContext();
        $constraint = new MediaConstraint(library: 'default');
        $this->doValidate($validator, 'test.jpg', $constraint, $context);
        self::assertCount(0, $context->getViolations());

        // Add another media in the custom storage
        $media = new Media('test-2.png', $this->customOriginalStorage, self::getFixtureBinary(Format::PNG->value));
        $media->store();

        // check that it is valid in a specific storage
        $context = $this->createExecutionContext();
        $constraint = new MediaConstraint(library: 'custom');
        $this->doValidate($validator, 'test-2.png', $constraint, $context);
        self::assertCount(0, $context->getViolations());

        // check that it is invalid in the default storage
        $context = $this->createExecutionContext();
        $constraint = new MediaConstraint(library: 'default');
        $this->doValidate($validator, 'test-2.png', $constraint, $context);
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

    protected function doValidate(MediaValidator $validator, mixed $value, MediaConstraint $constraint, ExecutionContext $context): void
    {
        if (method_exists($validator, 'validateInContext')) {
            $validator->validateInContext($value, $constraint, $context);
        } else {
            $validator->initialize($context);
            $validator->validate($value, $constraint);
        }
    }
}
