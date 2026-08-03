import buildFolderUrl from "./folderUrl.js";

const configureMediaChoiceContainer = (mediaChoiceContainer) => {
    const id = mediaChoiceContainer.dataset.mediaId;
    const mediaContainer = document.getElementById(`joli-media-container_${id}`);
    const deleteButton = mediaChoiceContainer.querySelector(
        '[data-component="media-choice-delete"]',
    );
    const editButton = mediaChoiceContainer.querySelector('[data-component="media-choice-edit"]');
    const inputElement = document.getElementById(id);
    const modal = document.getElementById(`modal-media-choice_${id}`);
    document.body.appendChild(modal);
    const modalContent = modal.querySelector('[data-component="media-choice-modal-body"]');

    let currentSearchValue = '';
    let currentFolderUrl = buildFolderUrl(
        editButton.attributes.href.value,
        editButton.dataset.folder,
    );

    const fetchFolder = (url) => fetch(url).then((response) => response.text());

    const getSearchUrl = (baseUrl) => {
        if (!currentSearchValue) return baseUrl;

        const url = new URL(baseUrl, window.location.origin);
        url.searchParams.set('query', currentSearchValue);

        return `${url.pathname}${url.search}${url.hash}`;
    };

    // the folder URL must not retain pagination or search parameters, so that
    // a new search (or clearing the search) always starts back at page 1
    const getFolderUrl = (href) => {
        const url = new URL(href, window.location.origin);
        url.searchParams.delete('page');
        url.searchParams.delete('query');

        return `${url.pathname}${url.search}${url.hash}`;
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

    const openSearchPanel = () => {
        const searchContainer = modalContent.querySelector('[data-component="search-container"]');

        if (searchContainer) {
            searchContainer.toggleAttribute('data-active', true);
            searchContainer.querySelector('[data-component="media-search-input"]').focus();
        }
    };

    const setupSearch = () => {
        const searchForm = modalContent.querySelector('[data-component="media-search"]');
        const searchInput = modalContent.querySelector('[data-component="media-search-input"]');
        if (!searchForm || !searchInput) return;

        currentSearchValue = searchInput.value;

        const newSearchForm = searchForm.cloneNode(true);
        searchForm.parentNode.replaceChild(newSearchForm, searchForm);

        const newInput = newSearchForm.querySelector('[data-component="media-search-input"]');

        // the modal content is re-rendered on every fetch: keep the search
        // panel visible as long as a search is active
        if (currentSearchValue) {
            openSearchPanel();
        }

        newSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentSearchValue = newInput.value.trim();
            fetchFolder(getSearchUrl(currentFolderUrl)).then(configureModal);
        });

        newInput.addEventListener('search', () => {
            if (!newInput.value) {
                currentSearchValue = '';
                fetchFolder(currentFolderUrl).then((html) => {
                    configureModal(html);
                    openSearchPanel();
                });
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
            currentFolderUrl = getFolderUrl(target.attributes.href.value);
            fetchFolder(getSearchUrl(target.attributes.href.value)).then(configureModal);
            return;
        }

        mediaContainer.innerHTML = target.dataset.mediaTemplate;
        mediaChoiceContainer.toggleAttribute("data-empty", false);
        setFieldValue(target.dataset.mediaUrl);
        editButton.dataset.folder = target.dataset.mediaFolder;
        closeModal();
    };

    const handleDelete = (event) => {
        event.preventDefault();
        mediaChoiceContainer.toggleAttribute("data-empty", true);

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
        currentFolderUrl = buildFolderUrl(
            editButton.attributes.href.value,
            editButton.dataset.folder,
        );

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

const MEDIA_CHOICE_SELECTOR = '[data-component="media-choice"]';

const configureMediaSelector = () => {
    // containers added after the initial render (collection fields, for instance)
    // are configured on their first click
    document.addEventListener("click", (event) => {
        const target = event.target.closest(MEDIA_CHOICE_SELECTOR);

        if (target !== null && target.dataset.configured === undefined) {
            configureMediaChoiceContainer(target);

            // the click may land on the icon or the label of the button, not on the
            // button itself, hence the "closest" lookup
            const editButton = event.target.closest('[data-component="media-choice-edit"]');

            if (editButton !== null) {
                // force reload the modal content
                editButton.dispatchEvent(new Event("click"));
            }
        }
    });

    document
        .querySelectorAll(MEDIA_CHOICE_SELECTOR)
        .forEach(configureMediaChoiceContainer);
};

export default configureMediaSelector;
