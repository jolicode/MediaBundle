<?php

use Doctrine\Bundle\DoctrineBundle\DoctrineBundle;
use Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle;
use Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle;
use EasyCorp\Bundle\EasyAdminBundle\EasyAdminBundle;
use JoliCode\MediaBundle\Bridge\EasyAdmin\JoliMediaEasyAdminBundle;
use JoliCode\MediaBundle\Bridge\SonataAdmin\JoliMediaSonataAdminBundle;
use JoliCode\MediaBundle\JoliMediaBundle;
use Knp\Bundle\MenuBundle\KnpMenuBundle;
use Sonata\AdminBundle\SonataAdminBundle;
use Sonata\BlockBundle\SonataBlockBundle;
use Sonata\Doctrine\Bridge\Symfony\SonataDoctrineBundle;
use Sonata\DoctrineORMAdminBundle\SonataDoctrineORMAdminBundle;
use Sonata\Exporter\Bridge\Symfony\SonataExporterBundle;
use Sonata\Form\Bridge\Symfony\SonataFormBundle;
use Sonata\Twig\Bridge\Symfony\SonataTwigBundle;
use Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle;
use Symfony\Bundle\DebugBundle\DebugBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\MakerBundle\MakerBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Bundle\WebProfilerBundle\WebProfilerBundle;
use Symfony\UX\StimulusBundle\StimulusBundle;
use Symfony\UX\TwigComponent\TwigComponentBundle;
use Twig\Extra\TwigExtraBundle\TwigExtraBundle;

return [
    FrameworkBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    TwigExtraBundle::class => ['all' => true],
    TwigComponentBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    DoctrineBundle::class => ['all' => true],
    EasyAdminBundle::class => ['all' => true],
    JoliMediaBundle::class => ['all' => true],
    JoliMediaEasyAdminBundle::class => ['all' => true],
    JoliMediaSonataAdminBundle::class => ['all' => true],
    KnpMenuBundle::class => ['all' => true],
    SonataFormBundle::class => ['all' => true],
    SonataBlockBundle::class => ['all' => true],
    SonataDoctrineBundle::class => ['all' => true],
    SonataExporterBundle::class => ['all' => true],
    StimulusBundle::class => ['all' => true],
    SonataTwigBundle::class => ['all' => true],
    SonataAdminBundle::class => ['all' => true],
    SonataDoctrineORMAdminBundle::class => ['all' => true],
    MakerBundle::class => ['dev' => true],
    DoctrineFixturesBundle::class => ['dev' => true, 'test' => true],
    DebugBundle::class => ['dev' => true],
    WebProfilerBundle::class => ['dev' => true, 'test' => true],
    DoctrineMigrationsBundle::class => ['all' => true],
    StofDoctrineExtensionsBundle::class => ['all' => true],
];
