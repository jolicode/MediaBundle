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

    const configureModal = (html) => {
        if (modalContent) {
            modalContent.innerHTML = html;
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

const configureMediaSelector = () => {
    document.querySelectorAll(".js-joli-media-choice-container").forEach((container) => {
        if (container.dataset.configured === undefined) {
            configureMediaChoiceContainer(container);
        }
    });
};

document.addEventListener("DOMContentLoaded", configureMediaSelector);

export default configureMediaSelector;
