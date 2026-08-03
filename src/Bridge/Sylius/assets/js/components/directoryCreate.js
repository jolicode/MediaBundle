const configureDirectoryCreate = () => {
    const createDirectoryForm = document.querySelector('[data-component="directory-create-form"]');

    if (!createDirectoryForm) {
        return;
    }

    const createDirectoryInput = createDirectoryForm.querySelector('[data-component="directory-create-input"]');
    const createDirectoryCancelBtn = createDirectoryForm.querySelector('[data-component="directory-create-cancel"]');

    createDirectoryForm.hidden = true;

    document.addEventListener('click', (e) => {
        const createDirectoryBtn = e.target.closest('[data-component="directory-create"]');

        if (createDirectoryBtn) {
            e.preventDefault();
            createDirectoryForm.hidden = !createDirectoryForm.hidden;
            if (!createDirectoryForm.hidden) {
                createDirectoryInput.focus();
            }
        }
    });

    createDirectoryForm.addEventListener('submit', (e) => {
        const name = createDirectoryInput.value.trim();
        if (!name) {
            e.preventDefault();
            return;
        }

        // The form will submit normally via HTML
    });

    const resetCreateDirectoryForm = () => {
        createDirectoryForm.hidden = true;
        createDirectoryInput.value = '';
    };

    createDirectoryCancelBtn?.addEventListener('click', resetCreateDirectoryForm);

    createDirectoryInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resetCreateDirectoryForm();
        }
    });
};

export default configureDirectoryCreate;
