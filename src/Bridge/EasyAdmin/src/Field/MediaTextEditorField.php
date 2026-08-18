<?php

namespace JoliCode\MediaBundle\Bridge\EasyAdmin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use Symfony\Contracts\Translation\TranslatableInterface;

/**
 * Builds an EasyAdmin TextEditorField whose media picker inserts a given variation
 * of the picked media, instead of the original one.
 *
 * EasyAdmin's TextEditorField is final, so this factory returns it as-is, with the
 * variation name stored in one of its custom options. The very same option can be
 * set on an already built field:
 *
 *     TextEditorField::new('body')
 *         ->setCustomOption(MediaTextEditorField::OPTION_VARIATION, 'blog_content')
 *
 * When no variation is set on the field, the one configured under
 * "joli_media_easy_admin.text_editor.variation" is used.
 */
final class MediaTextEditorField
{
    public const OPTION_VARIATION = 'jolimediaVariation';

    /**
     * @param TranslatableInterface|string|false|null $label
     */
    public static function new(string $propertyName, $label = null, ?string $variation = null): TextEditorField
    {
        return TextEditorField::new($propertyName, $label)
            ->setCustomOption(self::OPTION_VARIATION, $variation)
        ;
    }
}
