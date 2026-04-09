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

        const baseUrl = editButton.href.split('?')[0];
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
                const displayPart = decodeURIComponent(part);
                html += '<span class="breadcrumb-separator">/</span>';
                if (index === parts.length - 1) {
                    html += `<span class="breadcrumb-current">${displayPart}</span>`;
                } else {
                    const href = `${baseUrl}?key=${encodeURIComponent(pathSoFar)}`;
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

    let currentFolderPath = getCurrentFolderPath();

    const configureModal = (html) => {
        if (modalContent) {
            modalContent.innerHTML = html;
            
            // Always update breadcrumb to ensure it's correct for current folder
            updateBreadcrumb(currentFolderPath);
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
        fetchFolder(editButton.href).then(configureModal);
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

        if (target.closest('.folder-modal-breadcrumb') || target.closest('.gallery-grid--folders')) {
            const url = new URL(href, window.location.origin);
            let folderPath = url.searchParams.get('key') || '';
            
            if (!folderPath) {
                const pathMatch = href.match(/\/media\/choose(?:\/(.+))?$/);
                if (pathMatch && pathMatch[1]) {
                    folderPath = pathMatch[1];
                }
            }
            
            currentFolderPath = folderPath;
            updateBreadcrumb(currentFolderPath);
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
        const formData = new FormData(form);
        const url = form.action;

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
