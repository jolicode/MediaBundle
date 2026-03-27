const configureDirectoryDelete = () => {
    const container = document.querySelector('[data-component="directory-list"]');
    const deleteDirectoryPath = document.querySelector('[data-delete-directory-path]')?.dataset.deleteDirectoryPath;

    if (!container || !deleteDirectoryPath) {
        return;
    }

    container.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.directory-delete-btn');
        if (!deleteBtn) return;

        const row = deleteBtn.closest('tr');
        const directory = row.dataset.directory;

        if (!confirm('Are you sure you want to delete the folder "' + directory + '"?')) {
            return;
        }

        fetch(deleteDirectoryPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: directory,
                _csrf_token: document.querySelector('meta[name="csrf-token-delete"]')?.content
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert('Error deleting folder: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting folder');
            });
    });
};

export default configureDirectoryDelete;
