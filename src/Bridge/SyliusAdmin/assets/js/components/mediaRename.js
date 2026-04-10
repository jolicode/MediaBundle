const configureMediaRename = () => {
    const mediaListContainer = document.querySelector('[data-component*="media-list"]');
    const mediaRenameContainer = document.querySelector('[data-component*="media-rename"]');

    if (!mediaListContainer && !mediaRenameContainer) {
        return;
    }

    const handleEditClick = (container, isShowPage) => {
        const editBtn = container.querySelector('.media-rename-btn');
        if (!editBtn) return;

        let nameSpan, form, row;

        if (isShowPage) {
            nameSpan = container.querySelector('.media-name');
            form = container.querySelector('.media-rename-form');
        } else {
            row = editBtn.closest('tr');
            const pathCell = row.querySelector('.media-name').closest('td');
            nameSpan = pathCell.querySelector('.media-name');
            form = pathCell.querySelector('.media-rename-form');
        }

        nameSpan.classList.add('d-none');
        form.classList.remove('d-none');

        const input = form.querySelector('.media-rename-input');
        input.dataset.original = input.value;
        input.focus();
        input.select();
    };

    const handleCancelClick = (container, isShowPage) => {
        let form, nameSpan;

        if (isShowPage) {
            form = container.querySelector('.media-rename-form');
            nameSpan = container.querySelector('.media-name');
        } else {
            const cancelBtn = container.querySelector('.media-rename-cancel-btn');
            if (!cancelBtn) return;
            form = cancelBtn.closest('.media-rename-form');
            nameSpan = form.parentElement.querySelector('.media-name');
        }

        const input = form.querySelector('.media-rename-input');
        input.value = input.dataset.original;
        form.classList.add('d-none');
        nameSpan.classList.remove('d-none');
    };

    const handleSubmit = (e, container, isShowPage) => {
        if (!e.target.classList.contains('media-rename-form')) return;
        e.preventDefault();

        const form = e.target;
        const input = form.querySelector('.media-rename-input');
        const newName = input.value.trim();
        const originalName = input.dataset.original;

        if (!newName || newName === originalName) {
            form.classList.add('d-none');
            if (isShowPage) {
                container.querySelector('.media-name').classList.remove('d-none');
            } else {
                form.parentElement.querySelector('.media-name').classList.remove('d-none');
            }
            return;
        }

        let oldPath, newPath;
        if (isShowPage) {
            oldPath = container.dataset.mediaKey;
            const parentPath = oldPath.includes('/') ? oldPath.substring(0, oldPath.lastIndexOf('/') + 1) : '';
            newPath = parentPath + newName;
        } else {
            const row = form.closest('tr');
            oldPath = row.dataset.media;
            const parentPath = oldPath.includes('/') ? oldPath.substring(0, oldPath.lastIndexOf('/') + 1) : '';
            newPath = parentPath + newName;
        }

        const oldPathInput = form.querySelector('input[name="oldPath"]');
        if (oldPathInput) {
            oldPathInput.value = oldPath;
        }

        const newPathInput = form.querySelector('input[name="newPath"]');
        if (newPathInput) {
            newPathInput.value = newPath;
        }

        form.submit();
    };

    const handleKeydown = (e, container, isShowPage) => {
        if (e.target.classList.contains('media-rename-input')) {
            if (e.key === 'Escape') {
                const form = e.target.closest('.media-rename-form');
                const nameSpan = isShowPage
                    ? container.querySelector('.media-name')
                    : form.parentElement.querySelector('.media-name');

                e.target.value = e.target.dataset.original;
                form.classList.add('d-none');
                nameSpan.classList.remove('d-none');
            }
        }
    };

    if (mediaListContainer) {
        mediaListContainer.querySelectorAll('tr.item').forEach(row => {
            const mediaNameCell = row.querySelector('.media-name');
            if (mediaNameCell) {
                const mediaName = mediaNameCell.textContent.trim();
                const currentKey = document.querySelector('meta[name="current-key"]')?.content || '';
                const mediaKey = currentKey ? `${currentKey}/${mediaName}` : mediaName;
                row.dataset.media = mediaKey;
            }
        });

        mediaListContainer.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.media-rename-btn');
            if (editBtn) {
                const row = editBtn.closest('tr');
                const pathCell = row.querySelector('.media-name').closest('td');
                const nameSpan = pathCell.querySelector('.media-name');
                const form = pathCell.querySelector('.media-rename-form');
                nameSpan.classList.add('d-none');
                form.classList.remove('d-none');
                const input = form.querySelector('.media-rename-input');
                input.dataset.original = input.value;
                input.focus();
                input.select();
            }

            const cancelBtn = e.target.closest('.media-rename-cancel-btn');
            if (cancelBtn) {
                handleCancelClick(mediaListContainer, false);
            }
        });

        mediaListContainer.addEventListener('submit', (e) => handleSubmit(e, mediaListContainer, false));
        mediaListContainer.addEventListener('keydown', (e) => handleKeydown(e, mediaListContainer, false));
    }

    if (mediaRenameContainer) {
        mediaRenameContainer.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.media-rename-btn');
            if (editBtn) {
                handleEditClick(mediaRenameContainer, true);
            }

            const cancelBtn = e.target.closest('.media-rename-cancel-btn');
            if (cancelBtn) {
                handleCancelClick(mediaRenameContainer, true);
            }
        });

        mediaRenameContainer.addEventListener('submit', (e) => handleSubmit(e, mediaRenameContainer, true));
        mediaRenameContainer.addEventListener('keydown', (e) => handleKeydown(e, mediaRenameContainer, true));
    }

    document.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.media-rename-btn');
        if (!editBtn || editBtn.closest('[data-component*="media-list"]')) {
            return;
        }

        const row = editBtn.closest('.row');
        if (!row) {
            return;
        }

        const container = row.querySelector('[data-component*="media-rename"]');
        const nameSpan = container?.querySelector('.media-name');
        const form = container?.querySelector('.media-rename-form');

        if (!nameSpan || !form) {
            return;
        }

        nameSpan.classList.add('d-none');
        form.classList.remove('d-none');
        const input = form.querySelector('.media-rename-input');
        input.dataset.original = input.value;
        input.focus();
        input.select();
    });
};

export default configureMediaRename;