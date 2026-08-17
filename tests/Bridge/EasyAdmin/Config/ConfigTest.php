<?php

namespace JoliCode\MediaBundle\Tests\Bridge\EasyAdmin\Config;

use JoliCode\MediaBundle\Bridge\EasyAdmin\Config\Config;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\Translation\TranslatorInterface;

class ConfigTest extends TestCase
{
    private TranslatorInterface $translator;

    protected function setUp(): void
    {
        $this->translator = $this->createMock(TranslatorInterface::class);
        $this->translator->method('trans')->willReturnArgument(0);
    }

    public function testGetPerPageDefaultValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            null,
        );

        $this->assertSame(20, $config->getPaginationSize());
    }

    public function testGetPerPageCustomValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            null,
            100
        );

        $this->assertEquals(100, $config->getPaginationSize());
    }

    public function testGetTextEditorVariationDefaultValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
        );

        $this->assertNull($config->getTextEditorVariation());
    }

    public function testGetTextEditorVariationCustomValue(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20,
            null,
            20,
            'blog_content',
        );

        $this->assertSame('blog_content', $config->getTextEditorVariation());
    }

    public function testGetTranslationDomain(): void
    {
        $config = new Config(
            $this->translator,
            [],
            [],
            20
        );

        $this->assertSame('JoliMediaEasyAdminBundle', $config->getTranslationDomain());
    }
}
