const STORAGE_KEY = 'joli-media-tabs-active';

const configureTabsState = () => {
    const tabContainer = document.querySelector('[data-bs-toggle="tabs"]');
    if (!tabContainer) {
        return;
    }

    const restoreTab = () => {
        const storedTab = localStorage.getItem(STORAGE_KEY);
        if (!storedTab) {
            return;
        }

        const tab = tabContainer.querySelector(`[href="#${storedTab}"]`);
        if (tab) {
            const bsTab = new bootstrap.Tab(tab);
            bsTab.show();
        }
    };

    tabContainer.addEventListener('shown.bs.tab', (e) => {
        const target = e.target.getAttribute('href');
        if (target) {
            localStorage.setItem(STORAGE_KEY, target.replace('#', ''));
        }
    });

    restoreTab();
};

export default configureTabsState;
