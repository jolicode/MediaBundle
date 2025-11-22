/**
 * Infinite Scroll for Media Gallery
 * Automatically loads more media items when scrolling near the bottom
 */

const initInfiniteScroll = () => {
  const gallery = document.querySelector('.gallery');
  const loadMoreTrigger = document.querySelector('[data-infinite-scroll-trigger]');

  if (!gallery || !loadMoreTrigger) {
    return;
  }

  let isLoading = false;
  let hasMorePages = loadMoreTrigger.dataset.hasMore === 'true';
  let currentPage = parseInt(loadMoreTrigger.dataset.currentPage, 10);
  const routeName = loadMoreTrigger.dataset.routeName;
  const currentKey = loadMoreTrigger.dataset.currentKey;

  // Loader element
  const loader = document.createElement('div');
  loader.className = 'infinite-scroll-loader';
  loader.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  loader.style.display = 'none';
  loader.style.textAlign = 'center';
  loader.style.padding = '2rem';
  loadMoreTrigger.parentNode.insertBefore(loader, loadMoreTrigger);

  const loadMoreItems = async () => {
    if (isLoading || !hasMorePages) {
      return;
    }

    isLoading = true;
    loader.style.display = 'block';

    try {
      const nextPage = currentPage + 1;
      const url = new URL(window.location.href);
      url.searchParams.set('page', nextPage);

      const response = await fetch(url.toString(), {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load more items');
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const viewMode = document.querySelector('.gallery-grid') ? 'grid' : 'list';

      if (viewMode === 'grid') {
        const newItems = doc.querySelectorAll('.gallery-grid--files > li');
        const targetGrid = document.querySelector('.gallery-grid--files');

        newItems.forEach(item => {
          targetGrid.appendChild(item.cloneNode(true));
        });
      } else {
        const newRows = doc.querySelectorAll('.gallery-list tbody tr:not(:first-child)');
        const targetTbody = document.querySelector('.gallery-list tbody');

        newRows.forEach(row => {
          targetTbody.appendChild(row.cloneNode(true));
        });
      }

      currentPage = nextPage;
      loadMoreTrigger.dataset.currentPage = currentPage;

      if (currentPage >= parseInt(loadMoreTrigger.dataset.totalPages || '999', 10)) {
        hasMorePages = false;
        loadMoreTrigger.dataset.hasMore = 'false';
      }

      const targetContainer = viewMode === 'grid'
        ? document.querySelector('.gallery-grid--files')
        : document.querySelector('.gallery-list tbody');

      if (targetContainer && targetContainer.parentNode) {
        loadMoreTrigger.remove();
        targetContainer.parentNode.insertBefore(loadMoreTrigger, targetContainer.nextSibling);
        observer.unobserve(loadMoreTrigger);
        observer.observe(loadMoreTrigger);
      }

      if (typeof window.initLazyLoad === 'function') {
        window.initLazyLoad();
      }

    } catch (error) {
      console.error('Infinite scroll error:', error);
      loader.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Failed to load more items. Please try again.
        </div>
      `;
    } finally {
      isLoading = false;
      if (!hasMorePages) {
        loader.style.display = 'none';
        observer.unobserve(loadMoreTrigger);
        loadMoreTrigger.remove();
      } else {
        loader.style.display = 'none';
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      });
    },
    {
      rootMargin: '200px',
    }
  );

  observer.observe(loadMoreTrigger);
};

export default initInfiniteScroll;
