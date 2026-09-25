Srcset generation
=================

A ``srcset`` attribute lists several versions of the same image, so that the browser may pick the one that best fits the screen it renders on. This bundle builds those candidates out of the variations of a media.

The `Twig components <twig-components.rst>`_ do it for you, but the generation itself lives in a service, so that anything else may use it too - an API Platform normalizer exposing the variations of a media, a JSON endpoint, a mail renderer, or your own templating.

The ``SrcsetBuilder`` service
-----------------------------

The ``joli_media.srcset_builder`` service - aliased to ``JoliCode\MediaBundle\Srcset\SrcsetBuilder`` - turns a list of variation names into a ``Srcset``::

    use JoliCode\MediaBundle\Srcset\SrcsetBuilder;

    class ProductNormalizer
    {
        public function __construct(
            private readonly SrcsetBuilder $srcsetBuilder,
        ) {
        }

        public function normalize(Product $product): array
        {
            $srcset = $this->srcsetBuilder->build(
                $product->getPicture(),
                ['thumbnail', 'medium', 'large'],
            );

            return [
                'srcset' => (string) $srcset,
                'candidates' => $srcset->toArray(),
            ];
        }
    }

``build()`` gives every candidate a width descriptor:

.. code-block:: text

    /media/cache/thumbnail/picture.jpg 200w, /media/cache/medium/picture.jpg 800w, /media/cache/large/picture.jpg 1600w

The candidates are ordered by increasing width, whatever the order the variations were asked in, and a variation whose width cannot be determined is left out - a width descriptor cannot be built without it. When several variations have the very same width, only the first one is kept, as a ``srcset`` must not hold two candidates with the same descriptor.

Use ``buildWithDescriptors()`` when you want to choose the descriptors yourself, for instance to use pixel density descriptors::

    $srcset = $this->srcsetBuilder->buildWithDescriptors($media, [
        '' => 'thumbnail',
        '2x' => 'thumbnail@2x',
    ]);

Unlike ``build()``, it keeps the candidates whose dimensions are unknown, as their descriptor does not depend on them.

The ``Srcset`` object
---------------------

``Srcset`` is a collection of ``SrcsetCandidate``. Cast it to a string to get the value of the attribute itself, iterate over it to reach each candidate, or call ``toArray()`` to serialize it::

    foreach ($srcset as $candidate) {
        $candidate->url;                     // the URL of the variation
        $candidate->descriptor;              // "800w", "2x", or an empty string
        $candidate->width;                   // int|null
        $candidate->height;                  // int|null
        $candidate->mimeType;                // string|null
        $candidate->hasPredictedDimensions;  // see below
        $candidate->mediaVariation;          // the MediaVariation it describes
    }

    $srcset->getSmallestWidth();  // the width the image is assumed to be displayed at
    $srcset->isEmpty();
    count($srcset);

In Twig
-------

The ``joli_media_srcset`` filter exposes the very same service:

.. code-block:: html+twig

    {# width descriptors, from a list of variations #}
    <img srcset="{{ media|joli_media_srcset(['thumbnail', 'medium', 'large']) }}">

    {# explicit descriptors, from a map #}
    <img srcset="{{ media|joli_media_srcset({ '': 'thumbnail', '2x': 'thumbnail@2x' }) }}">

Where the dimensions come from
------------------------------

A width descriptor needs the width of the variation, which the bundle looks for in two places:

1. **the generated file**, whenever the variation has already been generated - this is the authoritative answer;
2. **the definition of the variation**, otherwise: the transformers are replayed over the pixel dimensions of the original media, without generating anything.

The second case is what keeps the ``srcset`` complete when the variations have not been generated yet - which is the default, unless the ``must_store_when_generating_url`` setting is enabled or the variations were generated beforehand with the ``joli:media:convert`` command. Candidates computed this way have their ``hasPredictedDimensions`` flag set.

.. note::

    The computation is exact for the transformers shipped by this bundle: they are pure computations over the dimensions, and the processors honor the dimensions they are given.

When the computation is not possible
------------------------------------

The dimensions cannot be computed when a step of the conversion pipeline is free to return an image of any size. In practice, this means:

- the variation has a **pre-processor which does not preserve the pixel dimensions** - see the `pre-processors documentation <../variations/pre-processors.rst>`_;
- the variation has a **custom transformer** which needs the binary content, without being able to describe its effect on the dimensions - see below;
- the pixel dimensions of the **original media** cannot be read;
- a `voter <../variations/variation-voters.rst>`_ prevents the variation from being applied to this media.

In those cases the width stays unknown, and the candidate is left out of a ``build()`` ``srcset`` rather than being given a wrong descriptor. Generate the variations beforehand - with the ``joli:media:convert`` command, or by enabling ``must_store_when_generating_url`` - to get their real dimensions instead.

You may ask the ``joli_media.dimension_predictor`` service whether a given variation is concerned::

    use JoliCode\MediaBundle\Transformation\DimensionPredictor;

    $predictor->supports($variation);        // bool, from the variation definition alone
    $predictor->predict($mediaVariation);    // array{width: int, height: int}|null

Transformers which need the binary content
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Most transformers only compute the dimensions the processor is then asked to produce, so they can be replayed as-is. A transformer implementing ``NeedsImmediateProcessingTransformerInterface`` - as ``expand`` does - works on the binary content itself, which is not available when the dimensions are computed. Such a transformer must also implement ``PredictableTransformerInterface`` for the computation to remain possible: its ``predictDimensions()`` method receives a ``Transformation`` whose binary dimensions are the ones computed so far, and sets the dimensions the transformer would produce::

    use JoliCode\MediaBundle\Transformation\Transformation;
    use JoliCode\MediaBundle\Transformer\AbstractTransformer;
    use JoliCode\MediaBundle\Transformer\NeedsImmediateProcessingTransformerInterface;
    use JoliCode\MediaBundle\Transformer\PredictableTransformerInterface;

    readonly class Border extends AbstractTransformer implements NeedsImmediateProcessingTransformerInterface, PredictableTransformerInterface
    {
        public function __construct(
            private int $size,
        ) {
        }

        public function predictDimensions(Transformation $transformation): void
        {
            $dimensions = $this->requireBinaryDimensions($transformation);

            $transformation->setDimensions(
                $dimensions['width'] + 2 * $this->size,
                $dimensions['height'] + 2 * $this->size,
            );
        }

        // transform() draws the border, and ends up with the very same dimensions
    }

.. caution::

    ``transform()`` and ``predictDimensions()`` must agree, or the markup advertises dimensions the generated file does not have. Computing the dimensions in a single method used by both, as ``Expand::getCanvasDimensions()`` does, is the safest way to achieve this.
