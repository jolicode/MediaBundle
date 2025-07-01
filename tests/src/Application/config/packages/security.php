<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\Security\Core\User\InMemoryUser;

return static function (ContainerConfigurator $container): void {
    $container->extension('security', [
        'password_hashers' => [
            InMemoryUser::class => 'plaintext',
        ],

        'providers' => [
            'test_users' => [
                'memory' => [
                    'users' => [
                        'user' => [
                            'password' => '1234',
                            'roles' => ['ROLE_USER'],
                        ],
                        'admin' => [
                            'password' => '1234',
                            'roles' => ['ROLE_ADMIN'],
                        ],
                    ],
                ],
            ],
        ],

        'firewalls' => [
            'secure_admin' => [
                'pattern' => '^/secure_admin',
                'provider' => 'test_users',
                'http_basic' => null,
                'logout' => null,
            ],
        ],

        'role_hierarchy' => [
            'ROLE_ADMIN' => ['ROLE_USER'],
        ],

        'access_control' => [
            ['path' => '^/secure_admin', 'roles' => ['ROLE_USER']],
        ],
    ]);
};
