import { Dropzone } from "@deltablot/dropzone";

const addDropzone = (element = null) => {
  let dropzone = element;

  if (dropzone === null) {
    dropzone = document.querySelector('[data-component=dropzone]');
  }

  if (dropzone) {
    const config = dropzone.dataset.dropzoneConfig ? JSON.parse(dropzone.dataset.dropzoneConfig) : {};
    const defaultConfig = {
      addRemoveLinks: false,
      maxFilesize: 20, // MB
      paramName: 'upload[file]',
      previewTemplate: dropzone.querySelector('.dz-preview-template').innerHTML,
      thumbnailWidth: 180,
      thumbnailHeight: 109,
      sending(file, xhr) {
        if (file.previewElement) {
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);

              if (response?.files[0]?.link) {
                const fileInfo = response.files[0];
                const linkElement = file.previewElement.querySelector(
                  "[data-dz-link]"
                );
                linkElement.href = fileInfo.link;
                linkElement.setAttribute("data-media-folder", fileInfo.mediaFolder);
                linkElement.setAttribute("data-media-url", fileInfo.mediaUrl);
                linkElement.setAttribute("data-media-template", fileInfo.mediaTemplate);

                if (fileInfo.mediaPreview) {
                  file.previewElement.querySelector("[data-dz-thumbnail]").remove();
                  linkElement.innerHTML = fileInfo.mediaPreview;
                }
              }
            }
          }
        }
      }
    };

    return new Dropzone(dropzone, { ...defaultConfig, ...config });
  }

  return null;
};

export default addDropzone;
