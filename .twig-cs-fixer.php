<?php

$ruleset = new TwigCsFixer\Ruleset\Ruleset();
$ruleset->addStandard(new TwigCsFixer\Standard\TwigCsFixer());
$ruleset->overrideRule(new TwigCsFixer\Rules\Punctuation\PunctuationSpacingRule(
    ['}' => 1],
    ['{' => 1],
));

$finder = new TwigCsFixer\File\Finder();
$finder
    ->in('templates')
    ->in('src/Bridge/EasyAdmin/templates')
    ->in('src/Bridge/SonataAdmin/templates')
;

$config = new TwigCsFixer\Config\Config();
$config->setRuleset($ruleset);
$config->setFinder($finder);

return $config;
