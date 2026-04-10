const configureDirectoryCreate = () => {
    const createDirectoryPath = document.querySelector('[data-component="directory-create"]')?.dataset.createDirectoryPath;
    const createDirectoryForm = document.querySelector('[data-component="directory-create-form"]');
    const createDirectoryInput = createDirectoryForm?.querySelector('.directory-create-input');
    const createDirectoryCancelBtn = createDirectoryForm?.querySelector('.directory-create-cancel-btn');

    if (!createDirectoryForm || !createDirectoryPath) {
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
        e.preventDefault();

        const name = createDirectoryInput.value.trim();
        if (!name) {
            return;
        }

        const parentPath = document.querySelector('meta[name="current-key"]')?.content || '';

        fetch(createDirectoryPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentPath: parentPath,
                name: name,
                _csrf_token: createDirectoryForm.querySelector('[name="_csrf_token"]')?.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('Error creating folder: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating folder');
            });
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
