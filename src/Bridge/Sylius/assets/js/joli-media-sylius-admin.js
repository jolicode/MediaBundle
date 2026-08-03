import '../styles/base.css';
import '../styles/box.css';
import '../styles/clipboard.css';
import '../styles/dropzone.css';
import '../styles/gallery.css';
import '../styles/media-choice.css';
import '../styles/media-preview.css';
import '../styles/media-show.css';
import './modal-portal';
import configureMediaSelector from './components/mediaSelector';
import addDropzone from './components/dropzone';
import configureClipboard from './components/clipboard';
import configureDirectoryCreate from './components/directoryCreate';
import configureDirectoryRename from './components/directoryRename';
import configureMediaRename from './components/mediaRename';
import configureTabsState from './components/tabsState';
import configureFolderSelector from './components/folderSelector';

document.addEventListener('DOMContentLoaded', () => {
    configureMediaSelector();
    configureTabsState();
    configureClipboard();
    configureDirectoryCreate();
    configureDirectoryRename();
    configureMediaRename();
    configureFolderSelector();

    let dropzoneInstance = null;

    document.addEventListener('click', (e) => {
        const mediaAddButton = e.target.closest('[data-component="media-add"]');

        if (mediaAddButton) {
            e.preventDefault();
            e.stopPropagation();

            const dropzoneContainer = mediaAddButton.closest('[data-component="media-tools"]')?.querySelector('[data-component="dropzone-container"]');
            if (!dropzoneContainer) {
                return;
            }

            const isActive = !dropzoneContainer.hasAttribute('data-active');
            dropzoneContainer.toggleAttribute('data-active', isActive);

            const dropzoneForm = dropzoneContainer.querySelector('[data-component="dropzone"]');
            if (!dropzoneForm) {
                return;
            }

            if (dropzoneContainer.dataset.dropzoneInitialized !== 'true') {
                dropzoneInstance = addDropzone(dropzoneForm);
                dropzoneContainer.dataset.dropzoneInitialized = 'true';
            }

            if (!isActive) {
                dropzoneInstance?.removeAllFiles(true);
            }
        }
    });
});
