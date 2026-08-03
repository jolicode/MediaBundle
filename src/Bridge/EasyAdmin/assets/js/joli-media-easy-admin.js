import '../styles/jolimedia.css';
import addDropzone from './components/dropzone';
import configureFolderSelector from './components/folderSelector';
import configureMediaSelector from './components/mediaSelector';
import configureClipboard from './components/clipboard';
import configureTrixToolbar from './components/configureTrixToolbar';

document.addEventListener('DOMContentLoaded', () => {
  configureFolderSelector();
  configureMediaSelector();
  configureClipboard();
  configureTrixToolbar();
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

  document.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    const component = event.target.closest('[data-component]');

    if (!component) {
      return;
    }

    component.click();
  });

  document.addEventListener('click', (event) => {
    const component = event.target.closest('[data-component]');

    if (!component) {
      return;
    }

    if (component.matches('[data-component=folder-create]')) {
      event.preventDefault();
      event.stopPropagation();
      const folderCreateForm = switchTool(component, 'new-directory');
      folderCreateForm.querySelector('input[type=text]').focus();
    }

    if (component.matches('[data-component=search]')) {
      event.preventDefault();
      event.stopPropagation();

      const searchPanel = switchTool(component, 'search');
      searchPanel.querySelector('input[type=search]').focus();
    }

    if (component.matches('[data-component=folder-rename]')) {
      event.preventDefault();
      event.stopPropagation();

      const folderRenameForm = switchTool(component, 'rename-directory');
      folderRenameForm.querySelector('input[type=text]').focus();
    }

    if (component.matches('[data-component=media-add]')) {
      event.preventDefault();
      event.stopPropagation();

      const dropzone = switchTool(component, 'dropzone');

      if (dropzone.dataset.dropzoneInitialized !== 'true') {
        dropzoneInstance = addDropzone(dropzone.querySelector('[data-component=dropzone]'));
        dropzone.dataset.dropzoneInitialized = 'true';
      }

      if (!dropzone.hasAttribute('data-active')) {
        dropzoneInstance.removeAllFiles(true);
      }
    }

    if (component.matches('[data-component=media-rename]')) {
      event.preventDefault();
      event.stopPropagation();

      const headerTools = component.closest('[data-component="media-tools"]');
      const fileRenameForm = headerTools.querySelector('[data-component="rename-file-container"]');

      fileRenameForm.toggleAttribute('data-active');
      fileRenameForm.querySelector('input[type=text]').focus();
    }
  });
});
