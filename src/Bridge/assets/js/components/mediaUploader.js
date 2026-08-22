import { Uploader } from '../uploader';

// Wires the upload form of the media library: the options rendered by the
// server win over the defaults, and each successful upload turns its preview
// into a link to the freshly created media.
const addUploader = (element = null) => {
  const uploader = element ?? document.querySelector('[data-component=uploader]');

  if (!uploader) {
    return null;
  }

  const config = uploader.dataset.uploaderConfig ? JSON.parse(uploader.dataset.uploaderConfig) : {};
  const previewTemplate = uploader.querySelector('[data-component="uploader-preview-template"]');
  const defaultConfig = {
    maxFileSize: 20, // MB
    paramName: 'upload[file]',
    previewTemplate: previewTemplate ? previewTemplate.innerHTML : '',
    thumbnailWidth: 180,
    thumbnailHeight: 109,
    success(file, response) {
      const fileInfo = response?.files?.[0];

      if (!file.previewElement || !fileInfo?.link) {
        return;
      }

      const linkElement = file.previewElement.querySelector('[data-upload-link]');

      linkElement.href = fileInfo.link;
      linkElement.setAttribute('data-media-folder', fileInfo.mediaFolder);
      linkElement.setAttribute('data-media-url', fileInfo.mediaUrl);
      linkElement.setAttribute('data-media-template', fileInfo.mediaTemplate);

      // only the EasyAdmin controller exposes the absolute URL
      if (undefined !== fileInfo.mediaFullUrl) {
        linkElement.setAttribute('data-media-full-url', fileInfo.mediaFullUrl);
      }

      if (fileInfo.mediaPreview) {
        file.previewElement.querySelector('[data-upload-thumbnail]')?.remove();
        linkElement.innerHTML = fileInfo.mediaPreview;
      }

      document.dispatchEvent(new CustomEvent('media-uploaded', { detail: { folder: fileInfo.mediaFolder } }));
    },
  };

  return new Uploader(uploader, { ...defaultConfig, ...config });
};

export default addUploader;
