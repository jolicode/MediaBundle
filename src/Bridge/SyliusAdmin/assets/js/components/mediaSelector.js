const getContainerForElement = (element) => {
    return element.closest(".js-joli-media-choice-container");
};

const configureMediaChoiceContainer = (mediaChoiceContainer) => {
    const id = mediaChoiceContainer.dataset.mediaId;
    const mediaContainer = document.getElementById(`joli-media-container_${id}`);
    const deleteButton = mediaChoiceContainer.querySelector(
        ".joli-media-choice-delete",
    );
    const editButton = mediaChoiceContainer.querySelector(".joli-media-choice-edit");
    const inputElement = document.getElementById(id);
    const modal = document.getElementById(`modal-media-choice_${id}`);

    if (!modal || !deleteButton || !editButton) {
        return;
    }

    document.body.appendChild(modal);
    const modalContent = modal.querySelector('.modal-body');

    const fetchFolder = (url) => fetch(url).then((response) => response.text());

    const updateBreadcrumb = (newFolderPath) => {
        const breadcrumb = modalContent?.querySelector('.folder-modal-breadcrumb');
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

    const configureModal = (html) => {
        if (modalContent) {
            modalContent.innerHTML = html;
            
            // Always update breadcrumb to ensure it's correct for current folder
            updateBreadcrumb(currentFolderPath);
            
            setupCreateFolder();
        }
    };

    const closeModal = () => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
    };

    const setFieldValue = (value) => {
        inputElement.value = value;
        inputElement.dispatchEvent(new Event("change"));
    };

    const reloadModal = () => {
        const basePath = getBasePath();
        const url = currentFolderPath 
            ? `${basePath}/${currentFolderPath}` 
            : basePath;
        fetchFolder(url).then(configureModal);
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

        const href = target.attributes.href.value;

        if (
            target.dataset.mediaTemplate !== undefined &&
            target.dataset.mediaUrl !== undefined
        ) {
            event.preventDefault();
            event.stopPropagation();
            mediaContainer.innerHTML = target.dataset.mediaTemplate;
            mediaChoiceContainer.classList.remove("empty");
            setFieldValue(target.dataset.mediaUrl);
            closeModal();
            return;
        }

        if (href === "#") {
            return;
        }

        if (target.closest('.folder-modal-breadcrumb') || target.closest('.gallery-grid--folders') || target.closest('.pagination')) {
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
            }
        }

        event.preventDefault();
        event.stopPropagation();
        fetchFolder(href).then(configureModal);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        mediaChoiceContainer.classList.add("empty");

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
        modalContent.innerHTML = "";

        fetchFolder(editButton.href).then((html) => {
            configureModal(html);
            const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
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
        const createBtn = modal.querySelector('[data-component="directory-create"]');
        const createForm = modal.querySelector('[data-component="directory-create-form"]');

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

    deleteButton.addEventListener("click", handleDelete);
    editButton.addEventListener("click", handleEdit);
    modal.addEventListener("click", handleModalClick);
    modal.addEventListener("submit", handleModalSubmit);
    document.addEventListener("media-uploaded", handleMediaUploaded);

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
});

const configureMediaSelector = () => {
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
