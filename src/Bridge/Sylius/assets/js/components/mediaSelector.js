const getContainerForElement = (element) => {
    return element.closest(".js-joli-media-choice-container");
};

const isLiveComponent = (element) => {
    let current = element;
    while (current && current !== document.body) {
        if (current.dataset.controller && current.dataset.controller.includes('live-collection')) {
            return true;
        }
        current = current.parentElement;
    }
    return false;
};

const hasLiveController = (element) => {
    let current = element;
    while (current && current !== document.body) {
        if (current.dataset.controller && /\blive\b/.test(current.dataset.controller) && !current.dataset.controller.includes('live-collection')) {
            return true;
        }
        current = current.parentElement;
    }
    return false;
};

const configureMediaChoiceContainer = (mediaChoiceContainer) => {
    const id = mediaChoiceContainer.dataset.mediaId;
    const mediaContainer = mediaChoiceContainer.querySelector(`[id^="joli-media-container_"]`);
    const deleteButton = mediaChoiceContainer.querySelector(
        ".joli-media-choice-delete",
    );
    const editButton = mediaChoiceContainer.querySelector(".joli-media-choice-edit");
    const inputElement = mediaChoiceContainer.querySelector(`[id="${id}"]`);
    let modal = document.getElementById(`modal-media-choice_${id}`);

    if (!modal || !deleteButton || !editButton || !inputElement || !mediaContainer) {
        return;
    }

    if (modal.dataset.moved === "true" && mediaChoiceContainer.dataset.configured === "true") {
        return;
    }

    // Move modal to body only once
    if (modal.dataset.moved !== "true") {
        document.body.appendChild(modal);
        modal.dataset.moved = "true";
    }

    // Only set configured flag, don't overwrite handlers
    if (!mediaChoiceContainer.dataset.configured) {
        mediaChoiceContainer.dataset.configured = "true";
        
        if (mediaContainer && !isLiveComponent(mediaChoiceContainer)) {
            const debugObserver = new MutationObserver(() => {
                const previews = mediaContainer.querySelectorAll('.media-preview');
                if (previews.length > 1) {
                    previews.forEach((el, i) => {
                        if (i < previews.length - 1) el.remove();
                    });
                }
            });
            debugObserver.observe(mediaContainer, { childList: true, subtree: true });
        }
    }

    if (mediaChoiceContainer.dataset.mediaValue) {
        inputElement.value = mediaChoiceContainer.dataset.mediaValue;
        
        if (mediaChoiceContainer.dataset.mediaTemplate) {
            mediaChoiceContainer.classList.remove("empty");
        }
        
        inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const modalContent = modal.querySelector('.modal-body');

    const fetchFolder = (url) => fetch(url).then((response) => response.text());

    const updateBreadcrumb = (newFolderPath) => {
        const currentModalEl = document.getElementById(`modal-media-choice_${id}`);
        const currentModalContent = currentModalEl?.querySelector('.modal-body');
        const breadcrumb = currentModalContent?.querySelector('.folder-modal-breadcrumb');
        if (!breadcrumb) return;

        const basePath = getBasePath();
        const rootText = 'Media Library';
        const parts = newFolderPath ? newFolderPath.split('/').filter(p => p) : [];

        let html = '';
        html += `<a href="${basePath}" data-folder-path="">${rootText}</a>`;

        if (parts.length > 0) {
            let pathSoFar = '';
            parts.forEach((part, index) => {
                if (index > 0) {
                    pathSoFar += '/';
                }
                pathSoFar += part;
                const displayPart = decodeURIComponent(part);
                html += '<span class="breadcrumb-separator">/</span>';
                if (index === parts.length - 1) {
                    html += `<span class="breadcrumb-current">${displayPart}</span>`;
                } else {
                    const href = `${basePath}/${pathSoFar}`;
                    html += `<a href="${href}" data-folder-path="${pathSoFar}">${displayPart}</a>`;
                }
            });
        }

        breadcrumb.innerHTML = html;
    };

    const getCurrentFolderPath = () => {
        const url = new URL(editButton.href, window.location.origin);
        let folderPath = url.searchParams.get('key') || '';
        
        if (!folderPath) {
            const pathMatch = editButton.href.match(/\/media\/choose(?:\/(.+))?$/);
            if (pathMatch && pathMatch[1]) {
                folderPath = pathMatch[1];
            }
        }
        
        return folderPath;
    };

    const getBasePath = () => {
        return editButton.dataset.basePath || editButton.href.split('?')[0];
    };

    let currentFolderPath = getCurrentFolderPath();
    let currentSearchValue = '';

    const getSearchUrl = (baseUrl) => {
        if (!currentSearchValue) return baseUrl;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}search=${encodeURIComponent(currentSearchValue)}`;
    };

    const setupSearch = () => {
        const currentModalEl = document.getElementById(`modal-media-choice_${id}`);
        if (!currentModalEl) return;

        const searchForm = currentModalEl.querySelector('.joli-media-search-form');
        const searchInput = currentModalEl.querySelector('.joli-media-search-input');
        if (!searchForm || !searchInput) return;

        currentSearchValue = searchInput.value;

        const newSearchForm = searchForm.cloneNode(true);
        searchForm.parentNode.replaceChild(newSearchForm, searchForm);

        const newInput = newSearchForm.querySelector('.joli-media-search-input');

        newSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSearchValue = newInput.value.trim();
            const basePath = getBasePath();
            const url = currentFolderPath
                ? `${basePath}/${currentFolderPath}`
                : basePath;
            fetchFolder(getSearchUrl(url)).then(configureModal);
        });

        newInput.addEventListener('search', () => {
            if (!newInput.value) {
                currentSearchValue = '';
                const basePath = getBasePath();
                const url = currentFolderPath
                    ? `${basePath}/${currentFolderPath}`
                    : basePath;
                fetchFolder(url).then(configureModal);
            }
        });
    };

    const configureModal = (html) => {
        const currentModalEl = document.getElementById(`modal-media-choice_${id}`);
        if (!currentModalEl) return;
        
        const currentModalContent = currentModalEl.querySelector('.modal-body');
        if (!currentModalContent) return;
        
        currentModalContent.innerHTML = html;
        updateBreadcrumb(currentFolderPath);
        setupCreateFolder();
        setupSearch();
    };

    const closeModal = () => {
        const currentModal = document.getElementById(`modal-media-choice_${id}`);
        if (!currentModal) return;
        
        const bsModal = bootstrap.Modal.getInstance(currentModal) || bootstrap.Modal.getOrCreateInstance(currentModal);
        if (bsModal) {
            bsModal.hide();
        }
    };

const setFieldValue = (value, template = null) => {
        if (mediaChoiceContainer.dataset.settingValue === "true") {
            return;
        }
        mediaChoiceContainer.dataset.settingValue = "true";
        
        inputElement.value = value;
        mediaChoiceContainer.dataset.mediaValue = value;
        
        if (template) {
            mediaChoiceContainer.dataset.mediaTemplate = template;
            mediaChoiceContainer.classList.remove("empty");
            
            if (mediaContainer && !isLiveComponent(mediaChoiceContainer)) {
                mediaContainer.innerHTML = template;
            }
        }
        
        inputElement.dispatchEvent(new Event("change", { bubbles: true }));
        
        setTimeout(() => {
            mediaChoiceContainer.dataset.settingValue = "false";
        }, 100);
    };

const getParentControllers = (element) => {
    const controllers = [];
    let current = element;
    while (current && current !== document.body) {
        if (current.dataset.controller) {
            controllers.push(current.dataset.controller);
        }
        current = current.parentElement;
    }
    return controllers;
};

    const reloadModal = () => {
        const basePath = getBasePath();
        const url = currentFolderPath 
            ? `${basePath}/${currentFolderPath}` 
            : basePath;
        fetchFolder(getSearchUrl(url)).then(configureModal);
    };

    const handleModalClick = (event) => {
        const target = event.target.closest("a");

        if (
            target === null ||
            target.tagName !== "A" ||
            target.attributes.href === undefined ||
            target.attributes.href.length === 0
        ) {
            return;
        }

        let href = target.attributes.href.value;

        if (
            target.dataset.mediaTemplate !== undefined &&
            target.dataset.mediaUrl !== undefined
        ) {
            event.preventDefault();
            event.stopPropagation();
            setFieldValue(target.dataset.mediaUrl, target.dataset.mediaTemplate);
            const currentModalEl = document.getElementById(`modal-media-choice_${id}`);
            if (currentModalEl?.classList.contains('show')) {
                closeModal();
            }
            return;
        }

        if (href === "#") {
            return;
        }

        if (target.closest('.folder-modal-breadcrumb') || target.closest('.gallery-grid--folders') || target.closest('.gallery-grid-item') || target.closest('.pagination') || href.match(/\/media\/choose/)) {
            const url = new URL(href, window.location.origin);
            let folderPath = url.searchParams.get('key') || '';
            
            if (!folderPath) {
                const pathMatch = href.match(/\/media\/choose(?:\/(.+))?$/);
                if (pathMatch && pathMatch[1]) {
                    folderPath = pathMatch[1];
                }
            }
            
            if (target.closest('.pagination')) {
                currentFolderPath = folderPath;
            } else {
                currentFolderPath = folderPath;
                updateBreadcrumb(currentFolderPath);
                href = getSearchUrl(href);
            }
        }

        event.preventDefault();
        event.stopPropagation();
        fetchFolder(href).then(configureModal);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        mediaChoiceContainer.classList.add("empty");
        mediaChoiceContainer.dataset.mediaTemplate = "";
        mediaChoiceContainer.dataset.mediaValue = "";

        const template = document.getElementById(`template-null-label-${id}`);
        mediaContainer.innerHTML = "";
        if (template) {
            mediaContainer.appendChild(template.content.cloneNode(true));
        }

        setFieldValue("");
        return false;
    };

    const handleEdit = (event) => {
        event.preventDefault();
        
        const modalEl = document.getElementById(`modal-media-choice_${id}`);
        if (!modalEl) return;
        
        const modalBody = modalEl.querySelector('.modal-body');
        if (modalBody) modalBody.innerHTML = "";

        fetchFolder(editButton.href).then((html) => {
            if (modalBody) modalBody.innerHTML = html;
            setupCreateFolder();
            setupSearch();
            const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
            bsModal.show();
        });

        return false;
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target.closest("form");
        const url = form.action;
        let formData = new FormData(form);

        fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        })
            .then((response) => response.text())
            .then(configureModal)
        ;
    };

    const handleMediaUploaded = () => {
        reloadModal();
    };

    const setupCreateFolder = () => {
        const currentModalEl = document.getElementById(`modal-media-choice_${id}`);
        if (!currentModalEl) return;
        
        const createBtn = currentModalEl.querySelector('[data-component="directory-create"]');
        const createForm = currentModalEl.querySelector('[data-component="directory-create-form"]');

        if (!createForm) {
            return;
        }

        const createInput = createForm.querySelector('.directory-create-input');
        const cancelBtn = createForm.querySelector('.directory-create-cancel-btn');
        const parentPathInput = createForm.querySelector('.directory-create-parent-path');

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

        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            const name = createInput.value.trim();
            if (!name) {
                return;
            }

            parentPathInput.value = currentFolderPath;

            const searchInput = createForm.querySelector('.directory-create-search');
            if (searchInput) {
                searchInput.value = currentSearchValue;
            }

            fetch(createForm.action, {
                method: 'POST',
                body: new FormData(createForm),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
                .then(response => response.text())
                .then((html) => {
                    configureModal(html);
                })
                .catch((error) => {
                    console.error('Error creating directory:', error);
                });
        });

        createInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                createForm.classList.add('d-none');
                createInput.value = '';
            }
        });
    };

    if (!modal.dataset.handlersAttached) {
        deleteButton.addEventListener("click", handleDelete);
        editButton.addEventListener("click", handleEdit);
        modal.dataset.handlersAttached = "true";
    }

    mediaChoiceContainer._handleModalClick = handleModalClick;
    mediaChoiceContainer._handleModalSubmit = handleModalSubmit;
    mediaChoiceContainer.dataset.configured = true;
};

document.addEventListener("click", (event) => {
    const editButton = event.target.closest(".joli-media-choice-edit");
    if (editButton) {
        const container = getContainerForElement(editButton);
        if (container && container.dataset.configured !== "true") {
            configureMediaChoiceContainer(container);
        }
    }
    
    const modal = event.target.closest('[id^="modal-media-choice_"]');
    if (modal) {
        const match = modal.id.match(/modal-media-choice_(.+)/);
        if (match) {
            const id = match[1];
            const container = document.querySelector(`.js-joli-media-choice-container[data-media-id="${id}"]`);
            if (container && container.dataset.configured === "true" && container._handleModalClick) {
                container._handleModalClick(event);
            }
        }
    }
});

document.addEventListener("submit", (event) => {
    const modal = event.target.closest('[id^="modal-media-choice_"]');
    if (modal) {
        const match = modal.id.match(/modal-media-choice_(.+)/);
        if (match) {
            const id = match[1];
            const container = document.querySelector(`.js-joli-media-choice-container[data-media-id="${id}"]`);
            if (container && container.dataset.configured === "true" && container._handleModalSubmit) {
                container._handleModalSubmit(event);
            }
        }
    }
});

const configureMediaSelector = () => {
    const seenIds = new Set();
    document.querySelectorAll('[id^="modal-media-choice_"]').forEach((modal) => {
        if (seenIds.has(modal.id)) {
            modal.remove();
            return;
        }
        seenIds.add(modal.id);
    });
    
    document.querySelectorAll(".js-joli-media-choice-container").forEach((container) => {
        if (container.dataset.configured === undefined) {
            configureMediaChoiceContainer(container);
        }
    });
};

document.addEventListener("DOMContentLoaded", configureMediaSelector);
document.addEventListener("turbo:frame-load", configureMediaSelector);
document.addEventListener("turbo:stream-render", configureMediaSelector);
document.addEventListener("turbo:streams:append", configureMediaSelector);
document.addEventListener("turbo:streams:prepend", configureMediaSelector);
document.addEventListener("turbo:before-stream-render", configureMediaSelector);
document.addEventListener("ux:autocomplete:initialize", configureMediaSelector);

let debounceTimer = null;

const debouncedConfigure = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(configureMediaSelector, 50);
};

const observer = new MutationObserver(debouncedConfigure);
observer.observe(document.body, { childList: true, subtree: true });

export default configureMediaSelector;
