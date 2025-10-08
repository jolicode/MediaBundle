<?php

namespace JoliCode\MediaBundle\Inspector;

use JoliCode\MediaBundle\Library\LibraryContainer;
use Symfony\Bundle\FrameworkBundle\DataCollector\AbstractDataCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\VarDumper\Cloner\Data;

class DataCollector extends AbstractDataCollector
{
    public function __construct(
        private readonly LibraryContainer $libraryContainer,
        private readonly ?TransformationDataHolder $transformationDataHolder = null,
    ) {
    }

    public function collect(Request $request, Response $response, ?\Throwable $exception = null): void
    {
        $transformations = $this->transformationDataHolder?->getData() ?? [];

        foreach ($transformations as $key => $transformation) {
            if (isset($transformation['steps'])) {
                foreach ($transformation['steps'] as $stepKey => $step) {
                    if (isset($step['metadata'])) {
                        foreach ($step['metadata'] as $categoryKey => $metadataCategory) {
                            foreach ($metadataCategory as $metadataKey => $metadataValue) {
                                $transformations[$key]['steps'][$stepKey]['metadata'][$categoryKey][$metadataKey] = $this->cloneVar($metadataValue);
                            }
                        }
                    }
                }
            }
        }

        $collectedData = [
            'libraries' => [],
            'transformations' => $transformations,
        ];

        foreach ($this->libraryContainer->list() as $library) {
            $variations = [];

            foreach ($library->getVariationContainer()->list() as $variation) {
                $transformers = [];

                foreach ($variation->getTransformerChain()->getTransformers() as $transformer) {
                    $class = new \ReflectionClass($transformer);
                    $properties = [
                        'type' => $this->cloneVar($class->getShortName()),
                    ];
                    $reflect = new \ReflectionClass($transformer);
                    $props = $reflect->getProperties();

                    foreach ($props as $prop) {
                        if (\in_array(
                            $prop->getName(),
                            ['width', 'height', 'startX', 'startY', 'mode', 'positionX', 'positionY', 'allowDownscale', 'allowUpscale', 'backgroundColor', 'cropPosition'],
                        ) && null !== $prop->getValue($transformer)) {
                            if ('mode' === $prop->getName()) {
                                $properties[$prop->getName()] = $this->cloneVar($prop->getValue($transformer)->value);

                                continue;
                            }

                            $properties[$prop->getName()] = $this->cloneVar($prop->getValue($transformer));
                        }
                    }

                    $transformers[] = $properties;
                }

                $variations[] = [
                    'name' => $variation->getName(),
                    'format' => $variation->getFormat()?->name,
                    'multiplier' => $variation->getMultiplier(),
                    'transformers' => $transformers,
                ];
            }

            $collectedData['libraries'][$library->getName()] = [
                'name' => $library->getName(),
                'serviceId' => \sprintf('.joli_media.library.%s', $library->getName()),
                'variations' => $variations,
                'isDefault' => $library->getName() === $this->libraryContainer->getDefaultName(),
            ];
        }

        $collectedData['duration'] = $this->transformationDataHolder?->getTotalDuration() ?? 0;

        $this->data = $collectedData;
    }

    /**
     * @return array<string, array{name: string, serviceId: string, variations: string[], isDefault: bool}>
     */
    public function getLibraries(): array
    {
        return $this->data['libraries'] ?? [];
    }

    public function getName(): string
    {
        return 'joli_media';
    }

    public function getTotalDuration(): float
    {
        return $this->data['duration'] ?? 0;
    }

    /**
     * @return array<string, mixed>|Data
     */
    public function getTransformations(): array|Data
    {
        return $this->data['transformations'] ?? [];
    }
}
