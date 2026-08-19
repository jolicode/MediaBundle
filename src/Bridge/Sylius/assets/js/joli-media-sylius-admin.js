import '../styles/base.css';
import '../styles/box.css';
import '../styles/clipboard.css';
import '../styles/uploader.css';
import '../styles/gallery.css';
import '../styles/media-choice.css';
import '../styles/media-preview.css';
import '../styles/media-show.css';
import './modal-portal';
import configureMediaSelector from './components/mediaSelector';
import addUploader from '../../../assets/js/components/mediaUploader';
import configureClipboard from '../../../assets/js/components/clipboard';
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

    let uploaderInstance = null;

    document.addEventListener('click', (e) => {
        const mediaAddButton = e.target.closest('[data-component="media-add"]');

        if (mediaAddButton) {
            e.preventDefault();
            e.stopPropagation();

            const uploaderContainer = mediaAddButton.closest('[data-component="media-tools"]')?.querySelector('[data-component="uploader-container"]');
            if (!uploaderContainer) {
                return;
            }

            const isActive = !uploaderContainer.hasAttribute('data-active');
            uploaderContainer.toggleAttribute('data-active', isActive);

            const uploaderForm = uploaderContainer.querySelector('[data-component="uploader"]');
            if (!uploaderForm) {
                return;
            }

            if (uploaderContainer.dataset.uploaderInitialized !== 'true') {
                uploaderInstance = addUploader(uploaderForm);
                uploaderContainer.dataset.uploaderInitialized = 'true';
            }

            if (!isActive) {
                uploaderInstance?.removeAllFiles(true);
            }
        }
    });
});
