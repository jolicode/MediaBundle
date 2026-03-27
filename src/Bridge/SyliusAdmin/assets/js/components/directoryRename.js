const configureDirectoryRename = () => {
    const container = document.querySelector('[data-component="directory-list"]');
    const renameDirectoryPath = document.querySelector('[data-rename-directory-path]')?.dataset.renameDirectoryPath;

    if (!container || !renameDirectoryPath) {
        return;
    }

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

        fetch(renameDirectoryPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldPath: directory,
                newPath: newPath,
                _csrf_token: document.querySelector('meta[name="csrf-token"]')?.content
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('Error renaming folder: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error renaming folder');
            });
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
