const openFolderChoiceModal = (folderChoiceButton) => {
    const modal = document.getElementById('modal-folder-choice');
    document.body.appendChild(modal);
    const modalContent = modal.querySelector('.modal-body');
    const pageActions = folderChoiceButton.closest('.page-actions');
    const inputElement = pageActions.querySelector('#move_to');

    const fetchFolder = (url) => fetch(url).then((response) => response.text());

    const configureModal = (html) => {
        modalContent.innerHTML = html;
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

        if (target.dataset.folderPath === undefined) {
            // this is not the folder selection button
            fetchFolder(target.attributes.href.value).then(configureModal);
            return;
        }

        setFieldValue(target.dataset.folderPath);
        closeModal();
        document.querySelector('#modal-move p').textContent = target.dataset.confirmation;
        document.querySelector('#modal-move #modal-move-button').addEventListener('click', () => {
            document.querySelector('#move-form').submit();
        });
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

    modal.addEventListener("click", handleModalClick);
    modal.addEventListener("submit", handleModalSubmit);
    configureModal('');
    fetchFolder(
        folderChoiceButton.attributes.href.value + folderChoiceButton.dataset.folder,
    ).then(configureModal);
};

const configureFolderSelector = () => {
    const folderSelector = document.querySelector("[data-component=media-move]");

    if (!folderSelector) {
        return;
    }

    folderSelector.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openFolderChoiceModal(event.currentTarget);
    });
};

export default configureFolderSelector;
