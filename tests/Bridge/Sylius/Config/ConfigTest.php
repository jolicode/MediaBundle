<?php

namespace JoliCode\MediaBundle\Tests\Bridge\Sylius\Config;

use JoliCode\MediaBundle\Bridge\Sylius\Config\Config;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\Translation\TranslatorInterface;

#[CoversClass(Config::class)]
final class ConfigTest extends TestCase
{
    private TranslatorInterface $translator;

    protected function setUp(): void
    {
        $this->translator = $this->createMock(TranslatorInterface::class);
        $this->translator->method('trans')->willReturnArgument(0);
    }

    public function testGetPaginationSizesCustomValue(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [25, 50, 100],
        );

        $this->assertSame([25, 50, 100], $config->getPaginationSizes());
    }

    public function testGetTranslationDomain(): void
    {
        $config = new Config(
            translator: $this->translator,
            visibility: [],
            acceptedFiles: [],
            maxFileSize: 0,
            paginationSizes: [],
        );

        $this->assertSame('JoliMediaSyliusBundle', $config->getTranslationDomain());
    }
}
