const configureMediaChoiceContainer = (mediaChoiceContainer) => {
    const id = mediaChoiceContainer.dataset.mediaId;
    const mediaContainer = document.getElementById(`joli-media-container_${id}`);
    const deleteButton = mediaChoiceContainer.querySelector(
        ".joli-media-choice-delete",
    );
    const editButton = mediaChoiceContainer.querySelector(".joli-media-choice-edit");
    const inputElement = document.getElementById(id);
    const modal = document.getElementById(`modal-media-choice_${id}`);
    document.body.appendChild(modal);
    const modalContent = document.querySelector(
        `#modal-media-choice_${id} .modal-body`,
    );

    let currentSearchValue = '';
    let currentFolderUrl = editButton.attributes.href.value + editButton.dataset.folder;

    const fetchFolder = (url) => fetch(url).then((response) => response.text());

    const getSearchUrl = (baseUrl) => {
        if (!currentSearchValue) return baseUrl;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}search=${encodeURIComponent(currentSearchValue)}`;
    };

    const configureModal = (html) => {
        modalContent.innerHTML = html;
        setupSearch();
    };

    const closeModal = () => {
        const closeButtons = modal.querySelectorAll("[data-bs-dismiss='modal']");
        closeButtons.item(closeButtons.length - 1).dispatchEvent(new Event("click"));
        return;
    };

    const setFieldValue = (value) => {
        inputElement.value = value;
        inputElement.dispatchEvent(new Event("change"));
    };

    const setupSearch = () => {
        const searchForm = modalContent.querySelector('.joli-media-search-form');
        const searchInput = modalContent.querySelector('.joli-media-search-input');
        if (!searchForm || !searchInput) return;

        currentSearchValue = searchInput.value;

        const newSearchForm = searchForm.cloneNode(true);
        searchForm.parentNode.replaceChild(newSearchForm, searchForm);

        const newInput = newSearchForm.querySelector('.joli-media-search-input');

        newSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSearchValue = newInput.value.trim();
            fetchFolder(getSearchUrl(currentFolderUrl)).then(configureModal);
        });

        newInput.addEventListener('search', () => {
            if (!newInput.value) {
                currentSearchValue = '';
                fetchFolder(currentFolderUrl).then(configureModal);
            }
        });
    };

    const handleModalClick = (event) => {
        const target = event.target.closest("a");

        if (
            target === null ||
            target.tagName !== "A" ||
            target.attributes.href === undefined ||
            target.attributes.href.length === 0 ||
            target.attributes.href.value === "#"
        ) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (
            target.dataset.mediaTemplate === undefined ||
            target.dataset.mediaUrl === undefined
        ) {
            // this is not a selectable media
            currentFolderUrl = getSearchUrl(target.attributes.href.value);
            fetchFolder(currentFolderUrl).then(configureModal);
            return;
        }

        mediaContainer.innerHTML = target.dataset.mediaTemplate;
        mediaChoiceContainer.classList.remove("empty");
        setFieldValue(target.dataset.mediaUrl);
        editButton.dataset.folder = target.dataset.mediaFolder;
        closeModal();
    };

    const handleDelete = (event) => {
        event.preventDefault();
        mediaChoiceContainer.classList.add("empty");

        const template = document.getElementById(`template-null-label-${id}`);
        mediaContainer.innerHTML = "";
        mediaContainer.appendChild(template.content.cloneNode(true));

        editButton.dataset.folder = "";
        setFieldValue("");
        return false;
    };

    const handleEdit = (event) => {
        event.preventDefault();
        modalContent.innerHTML = "";
        currentFolderUrl = editButton.attributes.href.value + editButton.dataset.folder;

        fetchFolder(currentFolderUrl).then((html) => {
            configureModal(html);
        });

        return false;
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.target.closest("form");

        if (form.dataset.component === 'media-search') {
            return;
        }

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

    deleteButton.addEventListener("click", handleDelete);
    editButton.addEventListener("click", handleEdit);
    modal.addEventListener("click", handleModalClick);
    modal.addEventListener("submit", handleModalSubmit);

    mediaChoiceContainer.dataset.configured = true;
};

const configureMediaSelector = () => {
    document.querySelectorAll("form.ea-edit-form, form.ea-new-form").forEach((form) =>
        form.addEventListener("click", (event) => {
            const target = event.target.closest(".js-joli-media-choice-container");

            if (target !== null && target.dataset.configured === undefined) {
                configureMediaChoiceContainer(target);

                if (event.target.classList.contains("joli-media-choice-edit")) {
                    // force reload the modal content
                    event.target.dispatchEvent(new Event("click"));
                }
            }
        }),
    );

    document
        .querySelectorAll(".js-joli-media-choice-container")
        .forEach(configureMediaChoiceContainer);
};

export default configureMediaSelector;
