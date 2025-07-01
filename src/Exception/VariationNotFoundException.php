<?php

namespace JoliCode\MediaBundle\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\WithHttpStatus;

#[WithHttpStatus(Response::HTTP_NOT_FOUND)]
class VariationNotFoundException extends \RuntimeException
{
}
