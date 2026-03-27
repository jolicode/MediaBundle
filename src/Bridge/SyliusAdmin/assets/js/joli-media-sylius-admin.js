import '../styles/base.css';
import '../styles/box.css';
import '../styles/clipboard.css';
import '../styles/dropzone.css';
import '../styles/gallery.css';
import '../styles/media-choice.css';
import '../styles/media-preview.css';
import './components/mediaSelector';
import addDropzone from './components/dropzone';
import configureClipboard from './components/clipboard';
import configureDirectoryCreate from './components/directoryCreate';
import configureDirectoryRename from './components/directoryRename';
import configureDirectoryDelete from './components/directoryDelete';

document.addEventListener('DOMContentLoaded', () => {
    configureClipboard();
    configureDirectoryCreate();
    configureDirectoryRename();
    configureDirectoryDelete();

    let dropzoneInstance = null;

    document.addEventListener('click', (e) => {
        const mediaAddButton = e.target.closest('[data-component="media-add"]');

        if (mediaAddButton) {
            e.preventDefault();
            e.stopPropagation();

            const dropzoneContainer = mediaAddButton.closest('.joli-media-choose-container, .joli-media-header-tools')?.querySelector('.dropzone-container');
            if (!dropzoneContainer) {
                return;
            }

            dropzoneContainer.classList.toggle('dropzone-active');

            const dropzoneForm = dropzoneContainer.querySelector('[data-component="dropzone"]');
            if (!dropzoneForm) {
                return;
            }

            if (!dropzoneContainer.classList.contains('dropzone-initialized')) {
                dropzoneInstance = addDropzone(dropzoneForm);
                dropzoneContainer.classList.add('dropzone-initialized');
            }

            if (!dropzoneContainer.classList.contains('dropzone-active')) {
                dropzoneInstance?.removeAllFiles(true);
            }
        }
    });
});