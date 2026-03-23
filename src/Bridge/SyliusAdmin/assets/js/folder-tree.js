document.addEventListener('DOMContentLoaded', function () {
    const folderTree = document.getElementById('folder-tree');
    const card = folderTree?.closest('.card');
    const createDirectoryPath = card?.dataset.createDirectoryPath;
    const renameDirectoryPath = card?.dataset.renameDirectoryPath;
    const createForm = document.getElementById('folder-create-form');
    const createBtn = document.querySelector('.folder-create-btn');
    const createInput = createForm?.querySelector('.folder-create-input');

    if (createBtn && createForm) {
        createBtn.addEventListener('click', function () {
            createForm.classList.remove('d-none');
            createInput.focus();
        });

        createForm.querySelector('.folder-create-cancel-btn').addEventListener('click', function () {
            createForm.classList.add('d-none');
            createInput.value = '';
        });

        createForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = createInput.value.trim();
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
                    _csrf_token: document.querySelector('meta[name="csrf-token-create"]')?.content
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

        createInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                createForm.classList.add('d-none');
                createInput.value = '';
            }
        });
    }

    folderTree.addEventListener('click', function (e) {
        const editBtn = e.target.closest('.folder-edit-btn');
        if (!editBtn) return;

        const folderItem = editBtn.closest('.folder-item');
        const viewMode = folderItem.querySelector('.nav-link');
        const form = folderItem.querySelector('.folder-rename-form');
        const input = form.querySelector('.folder-rename-input');

        viewMode.classList.add('d-none');
        form.classList.remove('d-none');
        input.focus();
        input.select();
    });

    folderTree.addEventListener('click', function (e) {
        const cancelBtn = e.target.closest('.folder-cancel-btn');
        if (!cancelBtn) return;

        const folderItem = cancelBtn.closest('.folder-item');
        const viewMode = folderItem.querySelector('.nav-link');
        const form = folderItem.querySelector('.folder-rename-form');
        const input = form.querySelector('.folder-rename-input');
        const originalName = input.dataset.original || input.value;

        input.value = originalName;
        form.classList.add('d-none');
        viewMode.classList.remove('d-none');
    });

    folderTree.addEventListener('submit', function (e) {
        if (!e.target.classList.contains('folder-rename-form')) return;
        e.preventDefault();

        const form = e.target;
        const folderItem = form.closest('.folder-item');
        const viewMode = folderItem.querySelector('.nav-link');
        const input = form.querySelector('.folder-rename-input');
        const newName = input.value.trim();
        const originalName = input.dataset.original || input.value;

        if (!newName || newName === originalName) {
            form.classList.add('d-none');
            viewMode.classList.remove('d-none');
            return;
        }

        const directory = folderItem.dataset.directory;
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

    const inputs = folderTree.querySelectorAll('.folder-rename-input');
    inputs.forEach(input => {
        input.dataset.original = input.value;
    });

    folderTree.addEventListener('keydown', function (e) {
        if (e.target.classList.contains('folder-rename-input')) {
            if (e.key === 'Escape') {
                const folderItem = e.target.closest('.folder-item');
                const viewMode = folderItem.querySelector('.nav-link');
                const form = folderItem.querySelector('.folder-rename-form');
                const input = form.querySelector('.folder-rename-input');

                input.value = input.dataset.original;
                form.classList.add('d-none');
                viewMode.classList.remove('d-none');
            }
        }
    });
});
