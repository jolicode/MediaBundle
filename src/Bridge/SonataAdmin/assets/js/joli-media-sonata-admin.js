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
    const headerTools = target.closest('.joli-media-header-tools');
    let activeTool = null;

    for (const tool of ['dropzone', 'new-directory', 'rename-directory']) {
      const toolContainer = headerTools.querySelector('.' + tool + '-container');

      if (toolContainer) {
        if (tool !== currentTool) {
          toolContainer.classList.remove(tool + '-active');
        } else {
          toolContainer.classList.toggle(tool + '-active');
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

    if (!dropzone.classList.contains('dropzone-initialized')) {
      dropzoneInstance = addDropzone(dropzone.querySelector('[data-component=dropzone]'));
      dropzone.classList.add('dropzone-initialized');
    }

    if (!dropzone.classList.contains('dropzone-active')) {
      dropzoneInstance.removeAllFiles(true);
    }
  });

  jQuery('body').on('click', '[data-component=media-rename]', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const headerTools = e.target.closest('.content-header');
    const fileRenameForm = headerTools.querySelector('.rename-file-container');

    fileRenameForm.classList.toggle('rename-active');
    fileRenameForm.querySelector('input[type=text]').focus();
  });
});
