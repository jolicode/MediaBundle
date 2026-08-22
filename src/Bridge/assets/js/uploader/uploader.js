import { createElement, filesize, interpolate, isAcceptedType } from './helpers';
import createThumbnail from './thumbnail';

const ADDED = 'added';
const QUEUED = 'queued';
const UPLOADING = 'uploading';
const SUCCESS = 'success';
const ERROR = 'error';
const CANCELED = 'canceled';

const defaultOptions = {
  paramName: 'file',
  maxFileSize: 20, // MB
  maxFiles: null,
  acceptedFiles: null,
  previewTemplate: '',
  thumbnailWidth: 120,
  thumbnailHeight: 120,
  maxThumbnailFileSize: 10, // MB
  parallelUploads: 2,
  messages: {
    default: 'Drop files here to upload',
    fileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
    invalidFileType: "You can't upload files of this type.",
    maxFilesExceeded: 'You cannot upload any more files.',
    responseError: 'Server responded with {{statusCode}} code.',
  },
  sending: () => {},
  success: () => {},
  error: null,
};

// A minimal drag and drop file uploader, tailored to what the media library
// needs: one multipart request per file, a preview built from a template
// rendered by Twig, and client side validation mirroring the server one.
//
// The element it is attached to is the upload <form> itself, so the request
// URL, the method and the companion inputs (path, CSRF token) all come from
// the markup.
export default class Uploader {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      ...defaultOptions,
      ...options,
      messages: { ...defaultOptions.messages, ...(options.messages || {}) },
    };

    this.url = element.getAttribute('action');

    if (!this.url) {
      throw new Error('The uploader element has no "action" attribute.');
    }

    this.method = element.getAttribute('method') || 'post';
    this.files = [];
    this.thumbnailQueue = [];
    this.processingThumbnail = false;

    this.element.setAttribute('enctype', 'multipart/form-data');

    this.setupMessage();
    this.setupHiddenFileInput();
    this.setupListeners();
  }

  /* Setup */

  setupMessage() {
    if (this.element.querySelector('.uploader-message')) {
      return;
    }

    this.element.appendChild(
      createElement(
        `<div class="uploader-message"><button class="uploader-button" type="button">${this.options.messages.default}</button></div>`,
      ),
    );
  }

  // The input lives outside of the form, so that it is neither collected by
  // getFormData() nor hidden by the admin stylesheets. It is recreated after
  // every change, otherwise picking the same file twice in a row would not
  // fire a new "change" event.
  setupHiddenFileInput() {
    if (this.hiddenFileInput) {
      this.hiddenFileInput.parentNode?.removeChild(this.hiddenFileInput);
    }

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('form', this.element.id);
    input.setAttribute('tabindex', '-1');
    input.setAttribute('aria-hidden', 'true');
    input.className = 'uploader-hidden-input';

    if (null === this.options.maxFiles || this.options.maxFiles > 1) {
      input.setAttribute('multiple', 'multiple');
    }

    if (null !== this.options.acceptedFiles) {
      input.setAttribute('accept', this.options.acceptedFiles);
    }

    // not using "display: none", as some browsers ignore clicks on such elements
    input.style.visibility = 'hidden';
    input.style.position = 'absolute';
    input.style.top = '0';
    input.style.left = '0';
    input.style.height = '0';
    input.style.width = '0';

    input.addEventListener('change', () => {
      this.handleFiles(input.files);
      this.setupHiddenFileInput();
    });

    document.body.appendChild(input);
    this.hiddenFileInput = input;
  }

  setupListeners() {
    // dragging something which is not a file must not be interfered with
    const holdsFiles = (e) => e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes('Files');
    const noPropagation = (e) => {
      if (!holdsFiles(e)) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();
    };

    this.element.addEventListener('dragenter', (e) => {
      noPropagation(e);
      this.element.toggleAttribute('data-drag-hover', true);
    });

    this.element.addEventListener('dragover', (e) => {
      // makes it possible to drag files from the Chrome downloads bar
      const effect = e.dataTransfer.effectAllowed;
      e.dataTransfer.dropEffect = 'move' === effect || 'linkMove' === effect ? 'move' : 'copy';

      noPropagation(e);
      this.element.toggleAttribute('data-drag-hover', true);
    });

    for (const eventName of ['dragleave', 'dragend', 'drop']) {
      this.element.addEventListener(eventName, () => {
        this.element.toggleAttribute('data-drag-hover', false);
      });
    }

    this.element.addEventListener('drop', (e) => {
      noPropagation(e);
      this.drop(e);
    });

    // only the zone itself and its message open the file picker: the previews
    // hold links to the uploaded media, which must stay clickable
    this.element.addEventListener('click', (e) => {
      const message = this.element.querySelector('.uploader-message');

      if (e.target === this.element || (message && message.contains(e.target))) {
        this.hiddenFileInput.click();
      }
    });
  }

  /* Adding files */

  drop(e) {
    if (!e.dataTransfer) {
      return;
    }

    const { files, items } = e.dataTransfer;

    if (!files.length) {
      return;
    }

    // a dropped directory shows up in "files" as a bogus zero-length entry,
    // so it has to be walked through the items API instead
    if (items && items.length && null != items[0].webkitGetAsEntry) {
      this.addFilesFromItems(items);
    } else {
      this.handleFiles(files);
    }
  }

  handleFiles(files) {
    for (const file of files) {
      this.addFile(file);
    }
  }

  addFilesFromItems(items) {
    for (const item of items) {
      let entry;

      if (null != item.webkitGetAsEntry && (entry = item.webkitGetAsEntry())) {
        if (entry.isFile) {
          this.addFile(item.getAsFile());
        } else if (entry.isDirectory) {
          this.addFilesFromDirectory(entry);
        }
      } else if (null != item.getAsFile && (null == item.kind || 'file' === item.kind)) {
        this.addFile(item.getAsFile());
      }
    }
  }

  // Walks a dropped directory recursively. Its files are uploaded flat, into
  // the directory currently being browsed.
  addFilesFromDirectory(directory) {
    const reader = directory.createReader();
    const readEntries = () => {
      reader.readEntries((entries) => {
        if (0 === entries.length) {
          return;
        }

        for (const entry of entries) {
          if (entry.isFile) {
            entry.file((file) => {
              if ('.' === file.name.substring(0, 1)) {
                return;
              }

              this.addFile(file);
            });
          } else if (entry.isDirectory) {
            this.addFilesFromDirectory(entry);
          }
        }

        // browsers only hand over the first 100 entries at a time
        readEntries();
      }, (error) => console.log(error));
    };

    readEntries();
  }

  addFile(file) {
    file.upload = { progress: 0, total: file.size, bytesSent: 0 };
    file.status = ADDED;
    file.accepted = false;
    this.files.push(file);

    this.createPreview(file);
    this.enqueueThumbnail(file);

    const error = this.validate(file);

    if (error) {
      this.fail(file, error);

      return;
    }

    file.accepted = true;
    file.status = QUEUED;

    // deferred, so that a whole multiple selection is added before uploading
    setTimeout(() => this.processQueue(), 0);
  }

  // Mirrors the server side constraints, in the same order, so that the
  // message shown is the one the user would have got from the form.
  validate(file) {
    const { maxFileSize, maxFiles, acceptedFiles, messages } = this.options;

    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      // the marker names come from the translated strings and must not change
      return interpolate(messages.fileTooBig, {
        filesize: Math.round(file.size / 1024 / 10.24) / 100,
        maxFilesize: maxFileSize,
      });
    }

    if (!isAcceptedType(file, acceptedFiles)) {
      return messages.invalidFileType;
    }

    if (null != maxFiles && this.files.filter((f) => f.accepted).length >= maxFiles) {
      return interpolate(messages.maxFilesExceeded, { maxFiles });
    }

    return null;
  }

  /* Previews */

  createPreview(file) {
    if (!this.options.previewTemplate) {
      return;
    }

    file.previewElement = createElement(this.options.previewTemplate.trim());

    if (!file.previewElement) {
      return;
    }

    this.element.appendChild(file.previewElement);
    this.element.toggleAttribute('data-started', true);

    for (const node of file.previewElement.querySelectorAll('[data-upload-name]')) {
      node.textContent = file.name;
    }

    for (const node of file.previewElement.querySelectorAll('[data-upload-size]')) {
      node.innerHTML = filesize(file.size);
    }
  }

  enqueueThumbnail(file) {
    if (!file.previewElement || !file.type.match(/image.*/)) {
      return;
    }

    if (file.size > this.options.maxThumbnailFileSize * 1024 * 1024) {
      return;
    }

    this.thumbnailQueue.push(file);
    setTimeout(() => this.processThumbnailQueue(), 0);
  }

  // One thumbnail at a time, to avoid a memory spike when many files are
  // selected at once.
  processThumbnailQueue() {
    if (this.processingThumbnail || 0 === this.thumbnailQueue.length) {
      return;
    }

    this.processingThumbnail = true;

    const file = this.thumbnailQueue.shift();

    createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, (dataUrl) => {
      if (dataUrl && file.previewElement) {
        for (const node of file.previewElement.querySelectorAll('[data-upload-thumbnail]')) {
          node.alt = file.name;
          node.src = dataUrl;
        }

        setTimeout(() => file.previewElement.setAttribute('data-thumbnail', 'image'), 1);
      }

      this.processingThumbnail = false;
      this.processThumbnailQueue();
    });
  }

  setStatus(file, status) {
    file.status = status;

    if (file.previewElement) {
      file.previewElement.setAttribute('data-status', status);
    }
  }

  updateProgress(file, progress) {
    file.upload.progress = progress;

    if (!file.previewElement) {
      return;
    }

    for (const node of file.previewElement.querySelectorAll('[data-upload-progress]')) {
      if ('PROGRESS' === node.nodeName) {
        node.value = progress;
      } else {
        node.style.width = `${progress}%`;
      }
    }
  }

  /* Uploading */

  processQueue() {
    const uploading = this.files.filter((file) => UPLOADING === file.status).length;
    const queued = this.files.filter((file) => QUEUED === file.status);

    for (let i = uploading; i < this.options.parallelUploads && queued.length; i++) {
      this.uploadFile(queued.shift());
    }
  }

  uploadFile(file) {
    const xhr = new XMLHttpRequest();

    file.xhr = xhr;
    this.setStatus(file, UPLOADING);
    this.updateProgress(file, 0);

    xhr.open(this.method, this.url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    (xhr.upload || xhr).onprogress = (e) => {
      if (!e.lengthComputable) {
        return;
      }

      file.upload.total = e.total;
      file.upload.bytesSent = e.loaded;
      this.updateProgress(file, Math.min(100, (100 * e.loaded) / e.total));
    };

    xhr.onload = () => this.finish(file, xhr);
    xhr.onerror = () => {
      if (CANCELED !== file.status) {
        this.fail(file, this.responseError(xhr));
      }
    };

    const formData = new FormData();

    this.options.sending(file, xhr, formData);
    this.addFormElementData(formData);

    // last, as the file is expected to close the multipart body
    formData.append(this.options.paramName, file, file.name);

    xhr.send(formData);
  }

  // Carries the other inputs of the form along with the file: the destination
  // path and the CSRF token. File inputs are skipped, as the real file is
  // appended separately under the very same name.
  addFormElementData(formData) {
    for (const input of this.element.querySelectorAll('input, textarea, select, button')) {
      const name = input.getAttribute('name');
      const type = (input.getAttribute('type') || '').toLowerCase();

      if (null === name || 'file' === type) {
        continue;
      }

      if ('SELECT' === input.tagName && input.hasAttribute('multiple')) {
        for (const option of input.options) {
          if (option.selected) {
            formData.append(name, option.value);
          }
        }
      } else if (!type || ('checkbox' !== type && 'radio' !== type) || input.checked) {
        formData.append(name, input.value);
      }
    }
  }

  finish(file, xhr) {
    if (CANCELED === file.status) {
      return;
    }

    const contentType = xhr.getResponseHeader('content-type');
    let response = xhr.responseText;

    if (contentType && -1 !== contentType.indexOf('application/json')) {
      try {
        response = JSON.parse(response);
      } catch (e) {
        response = null;
      }
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      this.fail(file, (response && response.error) || this.responseError(xhr));

      return;
    }

    this.updateProgress(file, 100);
    this.options.success(file, response);
    this.setStatus(file, SUCCESS);
    this.complete(file);
  }

  responseError(xhr) {
    return interpolate(this.options.messages.responseError, { statusCode: xhr.status });
  }

  fail(file, message) {
    this.setStatus(file, ERROR);

    if (this.options.error) {
      this.options.error(file, message);
    } else if (file.previewElement) {
      for (const node of file.previewElement.querySelectorAll('[data-upload-error]')) {
        node.textContent = message;
      }
    }

    this.complete(file);
  }

  complete(file) {
    if (file.previewElement) {
      file.previewElement.toggleAttribute('data-complete', true);
    }

    this.processQueue();
  }

  /* Removing files */

  removeFile(file) {
    if (UPLOADING === file.status) {
      // the status must be set before aborting, so that the handlers bail out
      file.status = CANCELED;
      file.xhr?.abort();
    }

    this.files = this.files.filter((f) => f !== file);
    this.thumbnailQueue = this.thumbnailQueue.filter((f) => f !== file);
    file.previewElement?.parentNode?.removeChild(file.previewElement);

    if (0 === this.files.length) {
      this.element.toggleAttribute('data-started', false);
    }
  }

  removeAllFiles(cancelIfNecessary = false) {
    // iterating over a copy, as removeFile() mutates the list
    for (const file of this.files.slice()) {
      if (UPLOADING !== file.status || cancelIfNecessary) {
        this.removeFile(file);
      }
    }
  }
}
