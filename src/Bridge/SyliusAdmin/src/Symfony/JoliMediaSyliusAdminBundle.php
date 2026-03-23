<?php

/*
 * This file is part of the Sylius package.
 *
 * (c) Sylius Sp. z o.o.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace JoliCode\MediaBundle\Bridge\SyliusAdmin\Symfony;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

final class JoliMediaSyliusAdminBundle extends AbstractBundle
{
    public function getPath(): string
    {
        if (!isset($this->path)) {
            $reflected = new \ReflectionObject($this);
            $this->path = \dirname($reflected->getFileName(), 3);
        }

        return $this->path;
    }

    public function prependExtension(ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $bundles = $builder->getParameter('kernel.bundles');

        $loader = new PhpFileLoader(
            $builder,
            new FileLocator(dirname(__DIR__, 2) . '/config'),
        );

         $loader->load('services.php');

        if (!isset($bundles['SyliusBootstrapAdminUiBundle'])) {
            // TODO throw an exception
            return;
        }

        $container->extension('sylius_twig_hooks', [
            'enable_autoprefixing' => true,
            'hook_name_section_separator' => '#',
        ]);
    }
}
