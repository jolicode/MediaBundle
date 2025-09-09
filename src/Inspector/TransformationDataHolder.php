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
        $key = $this->getKey($mediaVariation);
        $this->data[$key]['url'] = $mediaVariation->getUrl();
        $this->data[$key]['duration'] = $this->getStopWatchEvent()?->getDuration();

        if ('image' === $this->data[$key]['fileType']) {
            $pixelDimensions = $binary->getPixelDimensions();

            if (false !== $pixelDimensions) {
                $this->data[$key]['width'] = $pixelDimensions['width'];
                $this->data[$key]['height'] = $pixelDimensions['height'];
            }
        }

        $this->stopwatch?->stop(self::STOPWATCH_KEY);
    }

    public function create(MediaVariation $mediaVariation): void
    {
        $media = $mediaVariation->getMedia();
        $key = $this->getKey($mediaVariation);
        $this->stopwatch?->openSection();
        $this->stopwatch?->start(self::STOPWATCH_KEY);

        $this->data[$key] = [
            'library' => $media->getLibrary()->getName(),
            'path' => $media->getPath(),
            'variation' => $mediaVariation->getVariation()->getName(),
            'fileType' => $media->getFileType(),
            'steps' => [],
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
        return $this->stopwatch?->getEvent(self::STOPWATCH_KEY);
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

        if (isset($metadata['postProcessorOptions'])) {
            $output['Post-processor options'] = $metadata['postProcessorOptions'];
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
            $output['Transformation properties'] = array_filter([
                'Binary width (before the transformation)' => $metadata['transformation']['binaryWidth'] ?? null,
                'Binary height (before the transformation)' => $metadata['transformation']['binaryHeight'] ?? null,
                'Crop area width' => $metadata['transformation']['cropWidth'] ?? null,
                'Crop area height' => $metadata['transformation']['cropHeight'] ?? null,
                'Crop area left position' => $metadata['transformation']['cropX'] ?? null,
                'Crop area top position' => $metadata['transformation']['cropY'] ?? null,
                'Target width (after the transformation)' => $metadata['transformation']['targetWidth'] ?? null,
                'Target height (after the transformation)' => $metadata['transformation']['targetHeight'] ?? null,
            ]);
        }

        if (isset($metadata['operation'])) {
            $output['Operation properties'] = array_filter([
                'Binary width (before the transformation)' => $metadata['operation']['binaryWidth'] ?? null,
                'Binary height (before the transformation)' => $metadata['operation']['binaryHeight'] ?? null,
                'Left position of the expanded media' => $metadata['operation']['expandPositionX'] ?? null,
                'Top position of the expanded media' => $metadata['operation']['expandPositionY'] ?? null,
                'Background color' => $metadata['operation']['backgroundColor'] ?? null,
                'Target width (after the transformation)' => $metadata['operation']['targetWidth'] ?? null,
                'Target height (after the transformation)' => $metadata['operation']['targetHeight'] ?? null,
            ]);
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
}
