<?php

namespace JoliCode\MediaBundle\Tests\Bridge\Form\DataTransformer;

use JoliCode\MediaBundle\Bridge\Form\DataTransformer\MediaTransformer;
use JoliCode\MediaBundle\Exception\MediaNotFoundException;
use JoliCode\MediaBundle\Model\Media;
use JoliCode\MediaBundle\Model\NullMedia;
use JoliCode\MediaBundle\Resolver\Resolver;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Form\Exception\TransformationFailedException;

class MediaTransformerTest extends TestCase
{
    private Resolver&MockObject $resolver;
    private MediaTransformer $transformer;

    protected function setUp(): void
    {
        $this->resolver = $this->createMock(Resolver::class);
        $this->transformer = new MediaTransformer($this->resolver);
    }

    public function testTransformNull(): void
    {
        $this->assertNull($this->transformer->transform(null));
    }

    public function testTransformString(): void
    {
        $this->assertSame('some/path.jpg', $this->transformer->transform('some/path.jpg'));
    }

    public function testTransformMedia(): void
    {
        $media = $this->createMock(Media::class);
        $media->method('getPath')->willReturn('folder/file.jpg');

        $this->assertSame('folder/file.jpg', $this->transformer->transform($media));
    }

    public function testTransformThrowsOnUnexpectedValue(): void
    {
        $this->expectException(TransformationFailedException::class);
        $this->expectExceptionMessage('Expected a Media object.');

        $this->transformer->transform(new \stdClass());
    }

    public function testReverseTransformNull(): void
    {
        $this->assertNull($this->transformer->reverseTransform(null));
    }

    public function testReverseTransformResolvesMedia(): void
    {
        $media = $this->createMock(Media::class);
        $this->resolver->method('resolveMedia')->with('folder/file.jpg')->willReturn($media);

        $this->assertSame($media, $this->transformer->reverseTransform('folder/file.jpg'));
    }

    public function testReverseTransformFallsBackToUnresolvedMedia(): void
    {
        $media = $this->createMock(NullMedia::class);
        $this->resolver->method('resolveMedia')->willThrowException(new MediaNotFoundException('not found'));
        $this->resolver->method('createUnresolvedMedia')->with('folder/file.jpg')->willReturn($media);

        $this->assertSame($media, $this->transformer->reverseTransform('folder/file.jpg'));
    }
}
