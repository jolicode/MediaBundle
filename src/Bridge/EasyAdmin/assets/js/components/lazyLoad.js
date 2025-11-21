/**
 * Lazy loading for media thumbnails
 * Uses Intersection Observer API for better performance
 */

const initLazyLoad = () => {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Replace data-src with src to trigger loading
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }

        // Replace data-srcset with srcset
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }

        // Remove loading class once loaded
        img.addEventListener('load', () => {
          img.classList.remove('lazy-loading');
          img.classList.add('lazy-loaded');
        });

        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    // Start loading when image is 200px from viewport
    rootMargin: '200px 0px',
    threshold: 0.01
  });

  // Observe all lazy images
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.classList.add('lazy-loading');
    imageObserver.observe(img);
  });
};

export default initLazyLoad;
