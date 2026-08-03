const ROW_FORM_SELECTOR = '[data-component="directory-rename-row-form"]';
const INPUT_SELECTOR = '[data-component="directory-rename-input"]';
const NAME_SELECTOR = '[data-component="directory-name"]';

const configureDirectoryRename = () => {
    const container = document.querySelector('[data-component*="directory-list"]');
    const headerRenameForm = document.querySelector('[data-component="directory-rename-form"]');
    const headerRenameInput = headerRenameForm?.querySelector(INPUT_SELECTOR);
    const headerRenameCancelBtn = headerRenameForm?.querySelector('[data-component="directory-rename-cancel"]');

    document.addEventListener('click', (e) => {
        const headerRenameBtn = e.target.closest('[data-component="directory-rename-header"]');

        if (headerRenameBtn && headerRenameForm) {
            e.preventDefault();
            headerRenameForm.hidden = !headerRenameForm.hidden;
            if (!headerRenameForm.hidden) {
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

    const resetHeaderRenameForm = () => {
        headerRenameForm.hidden = true;
        headerRenameInput.value = '';
    };

    headerRenameCancelBtn?.addEventListener('click', resetHeaderRenameForm);

    headerRenameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resetHeaderRenameForm();
        }
    });

    if (!container) {
        return;
    }

    const closeRowRenameForm = (form) => {
        const input = form.querySelector(INPUT_SELECTOR);
        const nameSpan = form.parentElement.querySelector(NAME_SELECTOR);

        input.value = input.dataset.original;
        form.hidden = true;
        nameSpan.hidden = false;
    };

    container.addEventListener('click', (e) => {
        const editBtn = e.target.closest('[data-component="directory-rename-row"]');
        if (!editBtn) return;

        const row = editBtn.closest('tr');
        const pathCell = row.querySelector(NAME_SELECTOR).closest('td');
        const nameSpan = pathCell.querySelector(NAME_SELECTOR);

        const form = pathCell.querySelector(ROW_FORM_SELECTOR);
        nameSpan.hidden = true;
        form.hidden = false;

        const input = form.querySelector(INPUT_SELECTOR);
        input.dataset.original = input.value;
        input.focus();
        input.select();
    });

    container.addEventListener('click', (e) => {
        const cancelBtn = e.target.closest('[data-component="directory-rename-cancel"]');
        if (!cancelBtn) return;

        closeRowRenameForm(cancelBtn.closest(ROW_FORM_SELECTOR));
    });

    container.addEventListener('submit', (e) => {
        if (!e.target.matches(ROW_FORM_SELECTOR)) return;
        e.preventDefault();

        const form = e.target;
        const pathCell = form.closest('td');
        const row = pathCell.closest('tr');
        const nameSpan = pathCell.querySelector(NAME_SELECTOR);
        const input = form.querySelector(INPUT_SELECTOR);
        const newName = input.value.trim();
        const originalName = input.dataset.original;

        if (!newName || newName === originalName) {
            form.hidden = true;
            nameSpan.hidden = false;
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
        if (e.key === 'Escape' && e.target.matches(INPUT_SELECTOR)) {
            closeRowRenameForm(e.target.closest(ROW_FORM_SELECTOR));
        }
    });
};

export default configureDirectoryRename;
