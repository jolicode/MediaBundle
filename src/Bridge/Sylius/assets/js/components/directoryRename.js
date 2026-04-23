const configureDirectoryRename = () => {
    const container = document.querySelector('[data-component*="directory-list"]');
    const headerRenameForm = document.querySelector('[data-component="directory-rename-form"]');
    const headerRenameInput = headerRenameForm?.querySelector('.directory-rename-input');
    const headerRenameCancelBtn = headerRenameForm?.querySelector('.directory-rename-cancel-btn');

    if (!container) {
        return;
    }

    document.addEventListener('click', (e) => {
        const headerRenameBtn = e.target.closest('.directory-rename-header-btn');

        if (headerRenameBtn) {
            e.preventDefault();
            headerRenameForm?.classList.toggle('d-none');
            if (!headerRenameForm?.classList.contains('d-none')) {
                headerRenameInput.focus();
                headerRenameInput.select();
            }
        }
    });

    headerRenameForm?.addEventListener('submit', (e) => {
        const name = headerRenameInput.value.trim();
        if (!name) {
            e.preventDefault();
            return;
        }

        const oldPath = headerRenameForm.querySelector('input[name="oldPath"]')?.value || '';
        const parentPath = oldPath.includes('/') ? oldPath.substring(0, oldPath.lastIndexOf('/') + 1) : '';
        const newPath = parentPath + name;

        let newPathInput = headerRenameForm.querySelector('input[name="newPath"]');
        if (!newPathInput) {
            newPathInput = document.createElement('input');
            newPathInput.type = 'hidden';
            newPathInput.name = 'newPath';
            headerRenameForm.appendChild(newPathInput);
        }
        newPathInput.value = newPath;
    });

    headerRenameCancelBtn?.addEventListener('click', () => {
        headerRenameForm.classList.add('d-none');
        headerRenameInput.value = '';
    });

    headerRenameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            headerRenameForm.classList.add('d-none');
            headerRenameInput.value = '';
        }
    });

    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.directory-rename-btn');
        if (!editBtn) return;

        const row = editBtn.closest('tr');
        const pathCell = row.querySelector('.directory-name').closest('td');
        const nameSpan = pathCell.querySelector('.directory-name');

        const form = pathCell.querySelector('.directory-rename-form');
        nameSpan.classList.add('d-none');
        form.classList.remove('d-none');

        const input = form.querySelector('.directory-rename-input');
        input.dataset.original = input.value;
        input.focus();
        input.select();
    });

    container.addEventListener('click', (e) => {
        const cancelBtn = e.target.closest('.directory-rename-cancel-btn');
        if (!cancelBtn) return;

        const form = cancelBtn.closest('.directory-rename-form');
        const nameSpan = form.parentElement.querySelector('.directory-name');
        const input = form.querySelector('.directory-rename-input');

        input.value = input.dataset.original;
        form.classList.add('d-none');
        nameSpan.classList.remove('d-none');
    });

    container.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('directory-rename-form')) return;
        e.preventDefault();

        const form = e.target;
        const pathCell = form.closest('td');
        const row = pathCell.closest('tr');
        const nameSpan = pathCell.querySelector('.directory-name');
        const input = form.querySelector('.directory-rename-input');
        const newName = input.value.trim();
        const originalName = input.dataset.original;

        if (!newName || newName === originalName) {
            form.classList.add('d-none');
            nameSpan.classList.remove('d-none');
            return;
        }

        const directory = row.dataset.directory;
        const parentPath = directory.includes('/') ? directory.substring(0, directory.lastIndexOf('/') + 1) : '';
        const newPath = parentPath + newName;

        const oldPathInput = form.querySelector('input[name="oldPath"]');
        if (oldPathInput) {
            oldPathInput.value = directory;
        }

        const newPathInput = form.querySelector('input[name="newPath"]');
        if (newPathInput) {
            newPathInput.value = newPath;
        }

        form.submit();
    });

    container.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('directory-rename-input')) {
            if (e.key === 'Escape') {
                const form = e.target.closest('.directory-rename-form');
                const nameSpan = form.parentElement.querySelector('.directory-name');

                e.target.value = e.target.dataset.original;
                form.classList.add('d-none');
                nameSpan.classList.remove('d-none');
            }
        }
    });
};

export default configureDirectoryRename;
