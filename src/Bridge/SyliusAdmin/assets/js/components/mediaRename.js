const configureMediaRename = () => {
    const container = document.querySelector('[data-component*="media-list"]');
    const renameMediaPath = document.querySelector('[data-rename-media-path]')?.dataset.renameMediaPath;

    if (!container || !renameMediaPath) {
        return;
    }

    container.querySelectorAll('tr.item').forEach(row => {
        const mediaNameCell = row.querySelector('.media-name');
        if (mediaNameCell) {
            const mediaName = mediaNameCell.textContent.trim();
            const currentKey = document.querySelector('meta[name="current-key"]')?.content || '';
            const mediaKey = currentKey ? `${currentKey}/${mediaName}` : mediaName;
            row.dataset.media = mediaKey;
        }
    });

    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.media-rename-btn');
        if (!editBtn) return;

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
    });

    container.addEventListener('click', (e) => {
        const cancelBtn = e.target.closest('.media-rename-cancel-btn');
        if (!cancelBtn) return;

        const form = cancelBtn.closest('.media-rename-form');
        const nameSpan = form.parentElement.querySelector('.media-name');
        const input = form.querySelector('.media-rename-input');

        input.value = input.dataset.original;
        form.classList.add('d-none');
        nameSpan.classList.remove('d-none');
    });

    container.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('media-rename-form')) return;
        e.preventDefault();

        const form = e.target;
        const pathCell = form.closest('td');
        const row = pathCell.closest('tr');
        const nameSpan = pathCell.querySelector('.media-name');
        const input = form.querySelector('.media-rename-input');
        const newName = input.value.trim();
        const originalName = input.dataset.original;

        if (!newName || newName === originalName) {
            form.classList.add('d-none');
            nameSpan.classList.remove('d-none');
            return;
        }

        const mediaKey = row.dataset.media;
        const parentPath = mediaKey.includes('/') ? mediaKey.substring(0, mediaKey.lastIndexOf('/') + 1) : '';
        const newPath = parentPath + newName;

        fetch(renameMediaPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldPath: mediaKey,
                newPath: newPath,
                _csrf_token: document.querySelector('meta[name="csrf-token"]')?.content
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('Error renaming media: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error renaming media');
            });
    });

    container.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('media-rename-input')) {
            if (e.key === 'Escape') {
                const form = e.target.closest('.media-rename-form');
                const nameSpan = form.parentElement.querySelector('.media-name');

                e.target.value = e.target.dataset.original;
                form.classList.add('d-none');
                nameSpan.classList.remove('d-none');
            }
        }
    });
};

export default configureMediaRename;