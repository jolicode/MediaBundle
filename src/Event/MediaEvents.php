<?php

namespace JoliCode\MediaBundle\Event;

final class MediaEvents
{
    public const PRE_CREATE_FOLDER = 'joli.media.pre_create_folder';

    public const POST_CREATE_FOLDER = 'joli.media.post_create_folder';

    public const PRE_DELETE_FOLDER = 'joli.media.pre_delete_folder';

    public const POST_DELETE_FOLDER = 'joli.media.post_delete_folder';

    public const PRE_MOVE_FOLDER = 'joli.media.pre_move_folder';

    public const POST_MOVE_FOLDER = 'joli.media.post_move_folder';

    public const PRE_CREATE_MEDIA = 'joli.media.pre_create_media';

    public const POST_CREATE_MEDIA = 'joli.media.post_create_media';

    public const PRE_DELETE_MEDIA = 'joli.media.pre_delete_media';

    public const POST_DELETE_MEDIA = 'joli.media.post_delete_media';

    public const PRE_MOVE_MEDIA = 'joli.media.pre_move_media';

    public const POST_MOVE_MEDIA = 'joli.media.post_move_media';

    public const PRE_RESOLVE_MEDIA = 'joli.media.pre_resolve_media';
}
