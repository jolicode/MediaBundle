<?php

namespace JoliCode\MediaBundle\Tests\Bridge;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Yaml\Yaml;

class TranslationsTest extends TestCase
{
    #[DataProvider('provideTranslationFiles')]
    public function testATranslationFileHasTheKeysOfTheEnglishOne(string $file, string $englishFile): void
    {
        $keys = self::flattenKeys(Yaml::parseFile($file));
        $englishKeys = self::flattenKeys(Yaml::parseFile($englishFile));

        $this->assertSame([], array_values(array_diff($englishKeys, $keys)), 'Missing keys in ' . $file);
        $this->assertSame([], array_values(array_diff($keys, $englishKeys)), 'Extra keys in ' . $file);
    }

    public static function provideTranslationFiles(): \Generator
    {
        foreach (glob(__DIR__ . '/../../../src/Bridge/*/translations/*.en.yaml') ?: [] as $englishFile) {
            foreach (glob(substr($englishFile, 0, -\strlen('en.yaml')) . '*.yaml') ?: [] as $file) {
                if ($file !== $englishFile) {
                    yield basename($file) => [$file, $englishFile];
                }
            }
        }
    }

    /**
     * @param array<string, mixed> $translations
     *
     * @return list<string>
     */
    private static function flattenKeys(array $translations, string $prefix = ''): array
    {
        $keys = [];

        foreach ($translations as $key => $value) {
            if (\is_array($value)) {
                $keys = [...$keys, ...self::flattenKeys($value, $prefix . $key . '.')];
            } else {
                $keys[] = $prefix . $key;
            }
        }

        return $keys;
    }
}
