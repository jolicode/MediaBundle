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

    const updateBreadcrumb = (newFolderPath) => {
        const breadcrumb = modal.querySelector('.folder-modal-breadcrumb');
        if (!breadcrumb) return;

        const baseUrl = folderChoiceButton.getAttribute('href') || '';
        const rootText = 'Media Library';
        const parts = newFolderPath ? newFolderPath.split('/').filter(p => p) : [];

        let html = '';
        html += `<a href="${baseUrl}" data-folder-path="">${rootText}</a>`;

        if (parts.length > 0) {
            let pathSoFar = '';
            parts.forEach((part, index) => {
                if (index > 0) {
                    pathSoFar += '/';
                }
                pathSoFar += part;
                html += '<span class="breadcrumb-separator">/</span>';
                if (index === parts.length - 1) {
                    html += `<span class="breadcrumb-current">${part}</span>`;
                } else {
                    const href = baseUrl.replace(/\/$/, '') + '/' + encodeURIComponent(pathSoFar);
                    html += `<a href="${href}" data-folder-path="${pathSoFar}">${part}</a>`;
                }
            });
        }

        breadcrumb.innerHTML = html;
    };

    const configureModal = (html) => {
        if (listContainer) {
            listContainer.innerHTML = html;
            updateBreadcrumb(currentFolderPath);
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
        const breadcrumb = modal.querySelector('.folder-modal-breadcrumb');
        breadcrumb?.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-folder-path]');
            if (!link) return;

            e.preventDefault();
            e.stopPropagation();
            const href = link.getAttribute('href');

            if (href && !href.endsWith('#')) {
                const url = new URL(href, window.location.origin);
                const folderPath = url.searchParams.get('key') || '';
                currentFolderPath = folderPath;
                updateBreadcrumb(currentFolderPath);
                fetchFolder(href).then(configureModal);
            }
        });

        const folderParent = listContainer?.querySelector('.folder-parent a');
        folderParent?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const folderPath = folderParent.dataset.folderPath || '';
            const href = folderParent.getAttribute('href');

            console.log('folderParent clicked, folderPath:', folderPath);

            if (href && !href.endsWith('#')) {
                currentFolderPath = folderPath;
                updateBreadcrumb(currentFolderPath);
                fetchFolder(href).then(configureModal);
            }
        });

        const folderItems = listContainer?.querySelectorAll('a[data-folder-path]');
        folderItems?.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const folderPath = item.dataset.folderPath || '';
                const href = item.getAttribute('href');

                if (href && !href.endsWith('#')) {
                    currentFolderPath = folderPath;
                    updateBreadcrumb(currentFolderPath);
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

    updateBreadcrumb(currentFolderPath);
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
