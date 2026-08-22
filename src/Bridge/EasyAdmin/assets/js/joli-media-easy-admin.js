import '../styles/jolimedia.css';
import addUploader from '../../../assets/js/components/mediaUploader';
import configureFolderSelector from './components/folderSelector';
import configureMediaSelector from './components/mediaSelector';
import configureClipboard from '../../../assets/js/components/clipboard';
import configureTrixToolbar from './components/configureTrixToolbar';

document.addEventListener('DOMContentLoaded', () => {
  configureFolderSelector();
  configureMediaSelector();
  configureClipboard();
  configureTrixToolbar();
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

      const uploader = switchTool(component, 'uploader');

      if (uploader.dataset.uploaderInitialized !== 'true') {
        uploaderInstance = addUploader(uploader.querySelector('[data-component=uploader]'));
        uploader.dataset.uploaderInitialized = 'true';
      }

      if (!uploader.hasAttribute('data-active')) {
        uploaderInstance.removeAllFiles(true);
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
