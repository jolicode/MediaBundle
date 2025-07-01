<?php

namespace JoliCode\MediaBundle\DeleteBehavior;

enum Strategy: string
{
    case RESTRICT = 'restrict';
    case SET_NULL = 'set null';
}
