import '../styles/jolimedia.css';
import addDropzone from './components/dropzone';
import configureFolderSelector from './components/folderSelector';
import configureMediaSelector from './components/mediaSelector';
import configureClipboard from './components/clipboard';

const { jQuery } = window;

document.addEventListener('DOMContentLoaded', () => {
  configureFolderSelector();
  configureMediaSelector();
  configureClipboard();
  let dropzoneInstance = null;

  const switchTool = (target, currentTool) => {
    const headerTools = target.closest('[data-component="media-tools"]');
    let activeTool = null;

    for (const tool of ['dropzone', 'new-directory', 'rename-directory', 'search']) {
      const toolContainer = headerTools.querySelector(`[data-component="${tool}-container"]`);

      if (toolContainer) {
        if (tool !== currentTool) {
          toolContainer.toggleAttribute('data-active', false);
        } else {
          toolContainer.toggleAttribute('data-active');
          activeTool = toolContainer;
        }
      }
    }

    return activeTool;
  };

  jQuery('body').on('click', '[data-component=folder-create]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const folderCreateForm = switchTool(e.target, 'new-directory');
    folderCreateForm.querySelector('input[type=text]').focus();
  });

  jQuery('body').on('click', '[data-component=search]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const searchPanel = switchTool(e.target, 'search');
    searchPanel.querySelector('input[type=search]').focus();
  });

  jQuery('body').on('click', '[data-component=folder-rename]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const folderRenameForm = switchTool(e.target, 'rename-directory');
    folderRenameForm.querySelector('input[type=text]').focus();
  });

  jQuery('body').on('click', '[data-component=folder-delete]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (confirm(e.currentTarget.dataset.confirm)) {
      document.querySelector('#delete-directory-form').submit();
    }
  });

  jQuery('body').on('click', '[data-component=media-add]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const dropzone = switchTool(e.target, 'dropzone');

    if (dropzone.dataset.dropzoneInitialized !== 'true') {
      dropzoneInstance = addDropzone(dropzone.querySelector('[data-component=dropzone]'));
      dropzone.dataset.dropzoneInitialized = 'true';
    }

    if (!dropzone.hasAttribute('data-active')) {
      dropzoneInstance.removeAllFiles(true);
    }
  });

  jQuery('body').on('click', '[data-component=media-rename]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const fileRenameForm = document.querySelector('[data-component="rename-file-container"]');

    fileRenameForm.toggleAttribute('data-active');
    fileRenameForm.querySelector('input[type=text]').focus();
  });
});
