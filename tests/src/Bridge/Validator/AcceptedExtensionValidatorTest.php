<?php

namespace JoliCode\MediaBundle\Tests\Bridge\Validator;

use JoliCode\MediaBundle\Bridge\Validator\AcceptedExtension;
use JoliCode\MediaBundle\Bridge\Validator\AcceptedExtensionValidator;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Test\ConstraintValidatorTestCase;
use Symfony\Component\Validator\Validation;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @extends ConstraintValidatorTestCase<AcceptedExtensionValidator>
 */
class AcceptedExtensionValidatorTest extends ConstraintValidatorTestCase
{
    private const EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif', 'pdf'];

    #[DataProvider('provideAcceptedPaths')]
    public function testAPathWithAnAcceptedExtensionIsAccepted(string $path): void
    {
        $this->validator->validate($path, new AcceptedExtension(self::EXTENSIONS));

        $this->assertNoViolation();
    }

    public static function provideAcceptedPaths(): \Generator
    {
        yield ['image.png'];
        yield ['folder/image.jpeg'];
        yield ['folder/IMAGE.JPG'];
        yield ['folder.html/image.gif'];
        yield ['document.pdf'];
        yield ['archive.html.png'];
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAPathWithAnotherExtensionIsRefused(string $path, string $extension): void
    {
        $this->validator->validate($path, new AcceptedExtension(self::EXTENSIONS));

        $this->buildViolation('media.error.invalid_extension')
            ->setParameter('%extension%', \sprintf('"%s"', $extension))
            ->setParameter('%extensions%', '"png", "jpeg", "jpg", "gif", "pdf"')
            ->setCode(AcceptedExtension::INVALID_EXTENSION_ERROR)
            ->assertRaised()
        ;
    }

    public function testTheViolationIsTranslatedInTheGivenDomain(): void
    {
        $translator = $this->createMock(TranslatorInterface::class);
        $translator->expects($this->once())
            ->method('trans')
            ->with('media.error.invalid_extension', ['%extension%' => '"html"', '%extensions%' => '"png"'], 'JoliMediaEasyAdminBundle')
            ->willReturn('translated')
        ;
        $validator = Validation::createValidatorBuilder()->setTranslator($translator)->getValidator();

        $violations = $validator->validate('page.html', new AcceptedExtension(['png'], translationDomain: 'JoliMediaEasyAdminBundle'));

        self::assertSame('translated', $violations->get(0)->getMessage());
    }

    public function testTheNameOfAnUploadedFileIsChecked(): void
    {
        $file = new UploadedFile(__DIR__ . '/../../../fixtures/circle-pattern.gif', 'circle-pattern.html', test: true);

        $this->validator->validate($file, new AcceptedExtension(['gif']));

        $this->buildViolation('media.error.invalid_extension')
            ->setParameter('%extension%', '"html"')
            ->setParameter('%extensions%', '"gif"')
            ->setCode(AcceptedExtension::INVALID_EXTENSION_ERROR)
            ->assertRaised()
        ;
    }

    #[DataProvider('provideRefusedPaths')]
    public function testAnyPathIsAcceptedWhenTheExtensionsAreNotRestricted(string $path): void
    {
        $this->validator->validate($path, new AcceptedExtension());

        $this->assertNoViolation();
    }

    public static function provideRefusedPaths(): \Generator
    {
        yield 'another extension' => ['page.html', 'html'];
        yield 'another extension, in a folder' => ['folder/image.png.html', 'html'];
        yield 'another extension, uppercase' => ['PAGE.HTML', 'html'];
        yield 'an image extension which is not listed' => ['image.svg', 'svg'];
        yield 'no extension' => ['image', ''];
        yield 'no extension, in a dotted folder' => ['folder.png/image', ''];
        // Flysystem writes the three paths below to "page.html"
        yield 'trailing dot segment' => ['page.html/.', 'html'];
        yield 'parent segment' => ['page.html/image.png/..', 'html'];
        yield 'backslash' => ['image.png\page.html', 'html'];
        yield 'path leaving the root' => ['../image.png', ''];
    }

    protected function createValidator(): AcceptedExtensionValidator
    {
        return new AcceptedExtensionValidator();
    }
}
