let folderChoiceButtonRef = null;

const openFolderChoiceModal = (folderChoiceButton) => {
    const modal = document.getElementById('modal-folder-choice');
    if (!modal) {
        return;
    }

    folderChoiceButtonRef = folderChoiceButton;

    const modalBody = modal.querySelector('.modal-body');
    const listContainer = modalBody?.querySelector('.folder-list-container');
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
        if (listContainer) {
            listContainer.innerHTML = html;
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
        const folderItems = listContainer?.querySelectorAll('a[data-folder-path]');
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

    const setupCreateFolder = () => {
        const createBtn = modal.querySelector('[data-component="folder-create"]');
        const createForm = modal.querySelector('.folder-create-form');
        const createInput = modal.querySelector('.folder-create-input');
        const cancelBtn = modal.querySelector('.folder-create-cancel');

        createBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            createForm.classList.toggle('d-none');
            if (!createForm.classList.contains('d-none')) {
                createInput.focus();
            }
        });

        cancelBtn?.addEventListener('click', () => {
            createForm.classList.add('d-none');
            createInput.value = '';
        });

        createForm?.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = createInput.value.trim();
            if (!name) {
                return;
            }

            const formData = new FormData(createForm);
            const csrfToken = formData.get('_csrf_token');

            fetch(createForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parentPath: currentFolderPath,
                    name: name,
                    _csrf_token: csrfToken
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        createForm.classList.add('d-none');
                        createInput.value = '';
                        refreshFolderList();
                    } else {
                        alert('Error creating folder: ' + (data.error || 'Unknown error'));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error creating folder');
                });
        });

        createInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                createForm.classList.add('d-none');
                createInput.value = '';
            }
        });
    };

    const refreshFolderList = () => {
        if (folderChoiceButtonRef) {
            const baseUrl = folderChoiceButtonRef.getAttribute('href') || '';
            let fetchUrl = baseUrl;
            if (currentFolderPath) {
                fetchUrl = baseUrl.replace(/\/$/, '') + '/' + encodeURIComponent(currentFolderPath);
            }
            fetchFolder(fetchUrl).then(configureModal);
        }
    };

    setupCreateFolder();

    const baseUrl = folderChoiceButton.getAttribute('href') || '';
    let fetchUrl = baseUrl;
    if (currentFolderPath) {
        fetchUrl = baseUrl.replace(/\/$/, '') + '/' + encodeURIComponent(currentFolderPath);
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
