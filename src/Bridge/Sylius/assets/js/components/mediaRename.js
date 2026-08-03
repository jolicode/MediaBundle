const FORM_SELECTOR = '[data-component="media-rename-form"]';
const INPUT_SELECTOR = '[data-component="media-rename-input"]';
const NAME_SELECTOR = '[data-component="media-name"]';

/**
 * The rename button lives inside the row it renames on the media list, but in
 * the page actions on the media show page, where a single rename form exists.
 */
const findRenameForm = (renameBtn) => {
    const row = renameBtn.closest('tr');

    if (row) {
        return row.querySelector(FORM_SELECTOR);
    }

    return document.querySelector(`[data-component="media-rename"] ${FORM_SELECTOR}`);
};

const openRenameForm = (form) => {
    const nameSpan = form.parentElement.querySelector(NAME_SELECTOR);
    const input = form.querySelector(INPUT_SELECTOR);

    nameSpan.hidden = true;
    form.hidden = false;

    input.dataset.original = input.value;
    input.focus();
    input.select();
};

const closeRenameForm = (form, restoreValue = true) => {
    const nameSpan = form.parentElement.querySelector(NAME_SELECTOR);
    const input = form.querySelector(INPUT_SELECTOR);

    if (restoreValue) {
        input.value = input.dataset.original;
    }

    form.hidden = true;
    nameSpan.hidden = false;
};

const configureMediaRename = () => {
    document.addEventListener('click', (e) => {
        const renameBtn = e.target.closest('[data-component="media-rename-toggle"]');
        if (renameBtn) {
            e.preventDefault();
            const form = findRenameForm(renameBtn);
            if (form) {
                openRenameForm(form);
            }

            return;
        }

        const cancelBtn = e.target.closest('[data-component="media-rename-cancel"]');
        if (cancelBtn) {
            closeRenameForm(cancelBtn.closest(FORM_SELECTOR));
        }
    });

    document.addEventListener('submit', (e) => {
        if (!e.target.matches(FORM_SELECTOR)) return;
        e.preventDefault();

        const form = e.target;
        const input = form.querySelector(INPUT_SELECTOR);
        const newName = input.value.trim();
        const originalName = input.dataset.original;

        if (!newName || newName === originalName) {
            closeRenameForm(form, false);

            return;
        }

        const oldPath = form.querySelector('input[name="oldPath"]').value;
        const parentPath = oldPath.includes('/') ? oldPath.substring(0, oldPath.lastIndexOf('/') + 1) : '';
        const newPath = parentPath + newName;

        const newPathInput = form.querySelector('input[name="newPath"]');
        if (newPathInput) {
            newPathInput.value = newPath;
        }

        form.submit();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && e.target.matches(INPUT_SELECTOR)) {
            closeRenameForm(e.target.closest(FORM_SELECTOR));
        }
    });
};

export default configureMediaRename;
