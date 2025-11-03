<?php

namespace JoliCode\MediaBundle\Inspector;

use JoliCode\MediaBundle\Binary\Binary;
use JoliCode\MediaBundle\Model\MediaVariation;
use JoliCode\MediaBundle\Transformation\Transformation;
use Symfony\Component\Stopwatch\Stopwatch;
use Symfony\Component\Stopwatch\StopwatchEvent;

class TransformationDataHolder
{
    private const string STOPWATCH_KEY = 'JoliMediaBundle';

    private const TRANSFORMATION_PROPERTIES = [
        'binaryWidth' => 'Binary width (before the transformation)',
        'binaryHeight' => 'Binary height (before the transformation)',
        'cropWidth' => 'Crop area width',
        'cropHeight' => 'Crop area height',
        'cropX' => 'Crop area left position',
        'cropY' => 'Crop area top position',
        'targetWidth' => 'Target width (after the transformation)',
        'targetHeight' => 'Target height (after the transformation)',
        'expandPositionX' => 'Left position of the expanded media',
        'expandPositionY' => 'Top position of the expanded media',
        'backgroundColor' => 'Background color',
    ];

    /**
     * @var array<string, mixed>
     */
    private array $data = [];

    public function __construct(
        private readonly ?Stopwatch $stopwatch,
    ) {
    }

    public function complete(MediaVariation $mediaVariation, Binary $binary): void
    {
        if (true !== $this->stopwatch?->isStarted(self::STOPWATCH_KEY)) {
            return;
        }

        $key = $this->getKey($mediaVariation);
        $this->data[$key]['url'] = $mediaVariation->getUrl();
        $this->data[$key]['duration'] = $this->getStopWatchEvent()?->getDuration();

        if ('image' === $this->data[$key]['fileType']) {
            $pixelDimensions = $binary->getPixelDimensions();
            $this->data[$key]['outputFileSize'] = $binary->getContentSize();

            if (false !== $pixelDimensions) {
                $this->data[$key]['width'] = $pixelDimensions['width'];
                $this->data[$key]['height'] = $pixelDimensions['height'];
            }
        }

        $this->stopwatch->stop(self::STOPWATCH_KEY);
    }

    public function create(MediaVariation $mediaVariation): void
    {
        if (true === $this->stopwatch?->isStarted(self::STOPWATCH_KEY)) {
            return;
        }

        $media = $mediaVariation->getMedia();
        $key = $this->getKey($mediaVariation);
        $this->stopwatch?->openSection();
        $this->stopwatch?->start(self::STOPWATCH_KEY);

        $this->data[$key] = [
            'library' => $media->getLibrary()->getName(),
            'path' => $media->getPath(),
            'variation' => $mediaVariation->getVariation()->getName(),
            'fileType' => $media->getFileType(),
            'fileSize' => $media->getFileSize(),
            'steps' => [],
        ];
    }

    /**
     * @param array<string, mixed> $metadata
     */
    public function addPostProcessorStep(MediaVariation $mediaVariation, string $description, array $metadata = []): void
    {
        $this->getStopWatchEvent()?->lap();

        $this->data[$this->getKey($mediaVariation)]['steps'][] = [
            'operation' => $description,
            'duration' => $this->getStopWatchEvent()?->getLastPeriod()?->getDuration(),
            'metadata' => $this->parsePostProcessorMetadata($metadata),
        ];
    }

    /**
     * @param array<string, mixed> $metadata
     */
    public function addPreProcessorStep(MediaVariation $mediaVariation, string $description, array $metadata = []): void
    {
        $this->getStopWatchEvent()?->lap();

        $this->data[$this->getKey($mediaVariation)]['steps'][] = [
            'operation' => $description,
            'duration' => $this->getStopWatchEvent()?->getLastPeriod()?->getDuration(),
            'metadata' => $this->parsePreProcessorMetadata($metadata),
        ];
    }

    /**
     * @param array<string, mixed> $metadata
     */
    public function addStep(Transformation $transformation, string $description, array $metadata = []): void
    {
        $mediaVariation = $transformation->getMediaVariation();
        $this->getStopWatchEvent()?->lap();

        $this->data[$this->getKey($mediaVariation)]['steps'][] = [
            'operation' => $description,
            'duration' => $this->getStopWatchEvent()?->getLastPeriod()?->getDuration(),
            'metadata' => $this->parseMetadata($transformation, $metadata),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getData(): array
    {
        return $this->data;
    }

    public function getTotalDuration(): float
    {
        $totalDuration = 0.0;

        foreach ($this->data as $transformation) {
            if (isset($transformation['duration'])) {
                $totalDuration += $transformation['duration'];
            } else {
                foreach ($transformation['steps'] as $step) {
                    $totalDuration += $step['duration'];
                }
            }
        }

        return $totalDuration;
    }

    public function reset(): void
    {
        $this->data = [];
    }

    private function getKey(MediaVariation $mediaVariation): string
    {
        $media = $mediaVariation->getMedia();

        return \sprintf(
            '%s-%s-%s',
            $media->getLibrary()->getName(),
            $media->getPath(),
            $mediaVariation->getVariation()->getName(),
        );
    }

    private function getStopWatchEvent(): ?StopwatchEvent
    {
        if (true !== $this->stopwatch?->isStarted(self::STOPWATCH_KEY)) {
            return null;
        }

        return $this->stopwatch->getEvent(self::STOPWATCH_KEY);
    }

    /**
     * @param array<string, mixed> $metadata
     *
     * @return array<string, array<string, mixed>>
     */
    private function parseMetadata(Transformation $transformation, array $metadata): array
    {
        $output = [];

        foreach ($metadata as $key => $value) {
            if (\is_array($value) && [] === $value) {
                unset($metadata[$key]);
            }
        }

        if (isset($metadata['processorOptions'])) {
            $output['Processor options'] = $metadata['processorOptions'];
        }

        if (isset($metadata['outputFormat']) && $metadata['outputFormat'] !== $transformation->getInputFormat()) {
            $output['Formats'] = array_filter([
                'Binary input format' => $transformation->getInputFormat(),
                'Output format' => $metadata['outputFormat'],
            ]);
        }

        if (isset($metadata['transformation'])) {
            $output['Transformation properties'] = $this->getNamesProperties(
                $metadata['transformation'],
            );
        }

        return array_filter($output);
    }

    /**
     * @param array<string, mixed> $properties
     *
     * @return array<string, mixed>
     */
    private function getNamesProperties(array $properties): array
    {
        $output = [];

        foreach ($properties as $key => $value) {
            if (isset(self::TRANSFORMATION_PROPERTIES[$key])) {
                $output[self::TRANSFORMATION_PROPERTIES[$key]] = $value;
            }
        }

        return array_filter($output);
    }

    /**
     * @param array<string, mixed> $metadata
     *
     * @return array<string, array<string, mixed>>
     */
    private function parsePreProcessorMetadata(array $metadata): array
    {
        $output = [];

        foreach ($metadata as $key => $value) {
            if (\is_array($value) && [] === $value) {
                continue;
            }

            $output[ucfirst($key)] = $value;
        }

        return [] === $output ? [] : [
            'Pre-processor properties' => $output,
        ];
    }

    /**
     * @param array<string, mixed> $metadata
     *
     * @return array<string, array<string, mixed>>
     */
    private function parsePostProcessorMetadata(array $metadata): array
    {
        $output = [];

        foreach ($metadata as $key => $value) {
            if (\is_array($value) && [] === $value) {
                continue;
            }

            $output[ucfirst($key)] = $value;
        }

        return [] === $output ? [] : [
            'Post-processor options' => $output,
        ];
    }
}
