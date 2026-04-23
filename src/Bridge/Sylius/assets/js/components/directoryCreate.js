const configureDirectoryCreate = () => {
    const createDirectoryForm = document.querySelector('[data-component="directory-create-form"]');
    const createDirectoryInput = createDirectoryForm?.querySelector('.directory-create-input');
    const createDirectoryCancelBtn = createDirectoryForm?.querySelector('.directory-create-cancel-btn');

    if (!createDirectoryForm) {
        return;
    }

    createDirectoryForm.classList.add('d-none');

    document.addEventListener('click', (e) => {
        const createDirectoryBtn = e.target.closest('[data-component="directory-create"]');

        if (createDirectoryBtn) {
            e.preventDefault();
            createDirectoryForm.classList.toggle('d-none');
            if (!createDirectoryForm.classList.contains('d-none')) {
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

    createDirectoryCancelBtn?.addEventListener('click', () => {
        createDirectoryForm.classList.add('d-none');
        createDirectoryInput.value = '';
    });

    createDirectoryInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            createDirectoryForm.classList.add('d-none');
            createDirectoryInput.value = '';
        }
    });
};

export default configureDirectoryCreate;
