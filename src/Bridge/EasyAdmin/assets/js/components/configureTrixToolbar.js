const configureTrixToolbar = () => {
    document.querySelectorAll("trix-toolbar").forEach((toolbar) => {
        const buttonRow = toolbar.querySelector(".trix-button-row");
        const widget = toolbar.closest(".form-widget");
        const editor = widget.querySelector("trix-editor");

        if (!editor) {
            return;
        }

        const id = editor.getAttribute('input');
        const modal = widget.querySelector('.modal-media-choice');
        document.body.appendChild(modal);
        const modalContent = document.querySelector(
            `#modal-media-choice_${id} .modal-body`,
        );

        if (!buttonRow) {
            return;
        }

        const fetchFolder = (url) => fetch(url).then((response) => response.text());

        const configureModal = (html) => {
            modalContent.innerHTML = html;
        };

        const handleEdit = (event) => {
            event.preventDefault();
            event.stopPropagation();

            // Trigger the media selection modal
            modalContent.innerHTML = "";
            const folder = modal.dataset.folder || '';

            fetchFolder(
                modal.dataset.href + folder,
            ).then(configureModal);

            return false;
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
                fetchFolder(target.attributes.href.value).then(configureModal);
                return;
            }

            if (target.dataset.mediaType === 'image') {
                editor.editor.insertHTML(target.dataset.mediaOriginalTemplate);
            } else {
                const attachment = new Trix.Attachment({
                    content: target.dataset.mediaOriginalTemplate,
                });
                editor.editor.insertAttachment(attachment);
            }

            modal.dataset.folder = target.dataset.mediaFolder || '';

            closeModal();
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

        const closeModal = () => {
            const closeButtons = modal.querySelectorAll("[data-bs-dismiss='modal']");
            closeButtons.item(closeButtons.length - 1).dispatchEvent(new Event("click"));
            return;
        };

        // Create a custom button
        const buttonGroup = document.createElement('span');
        buttonGroup.classList.add('trix-button-group', 'trix-button-group--jolimedia-tools');
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-trix-attribute', 'jolimedia');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', `#modal-media-choice_${id}`);
        button.classList.add('trix-button', 'trix-button--icon', 'trix-button--icon-image');
        button.title = 'Insert media';
        buttonGroup.appendChild(button);

        button.addEventListener("click", handleEdit);
        modal.addEventListener("click", handleModalClick);
        modal.addEventListener("submit", handleModalSubmit);

        // locate the spacer and insert the button group before it
        const spacer = buttonRow.querySelector('.trix-button-group-spacer');
        spacer.before(buttonGroup);
    });
};

export default configureTrixToolbar;
