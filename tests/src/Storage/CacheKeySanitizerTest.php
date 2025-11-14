<?php

declare(strict_types=1);

namespace JoliCode\MediaBundle\Tests\Storage;

use JoliCode\MediaBundle\Storage\CacheKeySanitizer;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class CacheKeySanitizerTest extends TestCase
{
    #[DataProvider('provideSanitizationCases')]
    public function testSanitize(string $input, string $expected): void
    {
        $this->assertSame($expected, CacheKeySanitizer::sanitize($input));
    }

    public static function provideSanitizationCases(): array
    {
        return [
            'simple path with slash' => ['folder/file.jpg', 'folder_file.jpg'],
            'path with all reserved characters' => ['path/with@special:chars{test}(1).jpg', 'path_with_special_chars_test__1_.jpg'],
            'backslash' => ['path\\file.jpg', 'path_file.jpg'],
            'colon' => ['namespace:key', 'namespace_key'],
            'at symbol' => ['user@host', 'user_host'],
            'curly braces' => ['prefix{suffix}', 'prefix_suffix_'],
            'parentheses' => ['name(variant)', 'name_variant_'],
            'mixed slashes' => ['folder/subfolder\\file.jpg', 'folder_subfolder_file.jpg'],
            'no reserved characters' => ['simple_key', 'simple_key'],
            'empty string' => ['', ''],
        ];
    }
}
