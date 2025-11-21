import '../styles/jolimedia.css';
import addDropzone from './components/dropzone';
import configureFolderSelector from './components/folderSelector';
import configureMediaSelector from './components/mediaSelector';
import configureClipboard from './components/clipboard';
import configureTrixToolbar from './components/configureTrixToolbar';
import initLazyLoad from './components/lazyLoad';
import initInfiniteScroll from './components/infiniteScroll';

// Expose initLazyLoad globally for infinite scroll
window.initLazyLoad = initLazyLoad;

document.addEventListener('DOMContentLoaded', () => {
  configureFolderSelector();
  configureMediaSelector();
  configureClipboard();
  configureTrixToolbar();
  initLazyLoad();
  initInfiniteScroll();
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

      if (!dropzone.classList.contains('dropzone-initialized')) {
        dropzoneInstance = addDropzone(dropzone.querySelector('[data-component=dropzone]'));
        dropzone.classList.add('dropzone-initialized');
      }

      if (!dropzone.classList.contains('dropzone-active')) {
        dropzoneInstance.removeAllFiles(true);
      }
    }

    if (component.matches('[data-component=media-rename]')) {
      event.preventDefault();
      event.stopPropagation();

      const headerTools = component.closest('.joli-media-header-tools');
      const fileRenameForm = headerTools.querySelector('.rename-file-container');

      fileRenameForm.classList.toggle('rename-active');
      fileRenameForm.querySelector('input[type=text]').focus();
    }
  });
});
