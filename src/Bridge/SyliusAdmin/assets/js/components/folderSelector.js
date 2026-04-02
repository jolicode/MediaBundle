const openFolderChoiceModal = (folderChoiceButton) => {
    const modal = document.getElementById('modal-folder-choice');
    if (!modal) {
        return;
    }

    const modalBody = modal.querySelector('.modal-body');
    const currentMediaPath = folderChoiceButton.closest('[data-media-key]')?.dataset.mediaKey || '';

    const fetchFolder = (url) => {
        return fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        }).then((response) => response.text());
    };

    let currentFolderPath = folderChoiceButton.dataset.folder || '';

    const configureModal = (html) => {
        if (modalBody) {
            modalBody.innerHTML = html;
            attachModalEvents();
        }
    };

    const submitMove = (targetFolderPath) => {
        const moveForm = document.querySelector('#move-form');
        if (moveForm) {
            const fromInput = moveForm.querySelector('input[name="from"]');
            const toInput = moveForm.querySelector('input[name="to"]');
            if (fromInput) {
                fromInput.value = currentMediaPath;
            }
            if (toInput) {
                toInput.value = targetFolderPath || '';
            }
            moveForm.submit();
        }
    };

    const attachModalEvents = () => {
        const folderItems = modalBody?.querySelectorAll('a[data-folder-path]');
        folderItems?.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const folderPath = item.dataset.folderPath || '';
                const href = item.getAttribute('href');

                if (href && !href.endsWith('#')) {
                    currentFolderPath = folderPath;
                    fetchFolder(href).then(configureModal);
                }
            });
        });

        const moveBtn = modal.querySelector('.folder-move-btn');
        if (moveBtn) {
            moveBtn.dataset.folderPath = currentFolderPath;
            moveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                submitMove(currentFolderPath);
            });
        }
    };

    const baseUrl = folderChoiceButton.getAttribute('href') || '';
    const initialFolder = folderChoiceButton.dataset.folder || '';
    let fetchUrl = baseUrl;
    if (initialFolder) {
        fetchUrl = baseUrl.replace(/\/$/, '') + '/' + encodeURIComponent(initialFolder);
    }

    fetchFolder(fetchUrl).then(configureModal);

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

const configureFolderSelector = () => {
    const folderSelectors = document.querySelectorAll("[data-component=media-move]");

    folderSelectors.forEach((folderSelector) => {
        folderSelector.addEventListener("click", (event) => {
            event.preventDefault();
            openFolderChoiceModal(folderSelector);
        });
    });
};

export default configureFolderSelector;
