import '../styles/jolimedia.css';
import addUploader from '../../../assets/js/components/mediaUploader';
import configureFolderSelector from './components/folderSelector';
import configureMediaSelector from './components/mediaSelector';
import configureClipboard from '../../../assets/js/components/clipboard';

const { jQuery } = window;

document.addEventListener('DOMContentLoaded', () => {
  configureFolderSelector();
  configureMediaSelector();
  configureClipboard();
  let uploaderInstance = null;

  const switchTool = (target, currentTool) => {
    const headerTools = target.closest('[data-component="media-tools"]');
    let activeTool = null;

    for (const tool of ['uploader', 'new-directory', 'rename-directory', 'search']) {
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

    const uploader = switchTool(e.target, 'uploader');

    if (uploader.dataset.uploaderInitialized !== 'true') {
      uploaderInstance = addUploader(uploader.querySelector('[data-component=uploader]'));
      uploader.dataset.uploaderInitialized = 'true';
    }

    if (!uploader.hasAttribute('data-active')) {
      uploaderInstance.removeAllFiles(true);
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
