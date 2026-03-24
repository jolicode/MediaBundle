/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@deltablot/dropzone/dist/dropzone.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@deltablot/dropzone/dist/dropzone.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dropzone: () => (/* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039),
/* harmony export */   "default": () => (/* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039)
/* harmony export */ });
// The Emitter class provides the ability to call `.on()` on Dropzone to listen
// to events.
// It is strongly based on component's emitter class, and I removed the
// functionality because of the dependency hell with different frameworks.
class $4040acfd8584338d$export$2e2bcd8739ae039 {
    // Add an event listener for given event
    on(event, fn) {
        this._callbacks = this._callbacks || {};
        // Create namespace for this event
        if (!this._callbacks[event]) this._callbacks[event] = [];
        this._callbacks[event].push(fn);
        return this;
    }
    emit(event, ...args) {
        this._callbacks = this._callbacks || {};
        let callbacks = this._callbacks[event];
        if (callbacks) for (let callback of callbacks)callback.apply(this, args);
        // trigger a corresponding DOM event
        if (this.element) this.element.dispatchEvent(this.makeEvent("dropzone:" + event, {
            args: args
        }));
        return this;
    }
    makeEvent(eventName, detail) {
        let params = {
            bubbles: true,
            cancelable: true,
            detail: detail
        };
        if (typeof window.CustomEvent === "function") return new CustomEvent(eventName, params);
        else {
            // IE 11 support
            // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
    }
    // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.
    off(event, fn) {
        if (!this._callbacks || arguments.length === 0) {
            this._callbacks = {};
            return this;
        }
        // specific event
        let callbacks = this._callbacks[event];
        if (!callbacks) return this;
        // remove all handlers
        if (arguments.length === 1) {
            delete this._callbacks[event];
            return this;
        }
        // remove specific handler
        for(let i = 0; i < callbacks.length; i++){
            let callback = callbacks[i];
            if (callback === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    }
}



var $b5cb5f094c2e1764$export$2e2bcd8739ae039 = `
<div class="dz-preview dz-file-preview">
  <div class="dz-image"><img data-dz-thumbnail /></div>
  <div class="dz-details">
    <div class="dz-size"><span data-dz-size></span></div>
    <div class="dz-filename"><span data-dz-name></span></div>
  </div>
  <div class="dz-progress">
    <span class="dz-upload" data-dz-uploadprogress></span>
  </div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <div class="dz-success-mark">
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z"
      />
    </svg>
  </div>
  <div class="dz-error-mark">
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"
      />
    </svg>
  </div>
</div>`;


let $4ca367182776f80b$var$defaultOptions = {
    /**
   * Has to be specified on elements other than form (or when the form doesn't
   * have an `action` attribute).
   *
   * You can also provide a function that will be called with `files` and
   * `dataBlocks`  and must return the url as string.
   */ url: null,
    /**
   * Can be changed to `"put"` if necessary. You can also provide a function
   * that will be called with `files` and must return the method (since `v3.12.0`).
   */ method: "post",
    /**
   * Will be set on the XHRequest.
   */ withCredentials: false,
    /**
   * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
   * If set to null or 0, no timeout is going to be set.
   */ timeout: null,
    /**
   * How many file uploads to process in parallel (See the
   * Enqueuing file uploads documentation section for more info)
   */ parallelUploads: 2,
    /**
   * Whether to send multiple files in one request. If
   * this it set to true, then the fallback file input element will
   * have the `multiple` attribute as well. This option will
   * also trigger additional events (like `processingmultiple`). See the events
   * documentation section for more information.
   */ uploadMultiple: false,
    /**
   * Whether you want files to be uploaded in chunks to your server. This can't be
   * used in combination with `uploadMultiple`.
   *
   * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
   */ chunking: false,
    /**
   * If `chunking` is enabled, this defines whether **every** file should be chunked,
   * even if the file size is below chunkSize. This means, that the additional chunk
   * form data will be submitted and the `chunksUploaded` callback will be invoked.
   */ forceChunking: false,
    /**
   * If `chunking` is `true`, then this defines the chunk size in bytes.
   */ chunkSize: 2097152,
    /**
   * If `true`, the individual chunks of a file are being uploaded simultaneously.
   * The limit of concurrent connections is governed by `parallelUploads`.
   */ parallelChunkUploads: false,
    /**
   * Whether a chunk should be retried if it fails.
   */ retryChunks: false,
    /**
   * If `retryChunks` is true, how many times should it be retried.
   */ retryChunksLimit: 3,
    /**
   * The maximum filesize (in MiB) that is allowed to be uploaded.
   */ maxFilesize: 256,
    /**
   * The name of the file param that gets transferred.
   * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
   * Dropzone will append `[]` to the name.
   */ paramName: "file",
    /**
   * Whether thumbnails for images should be generated
   */ createImageThumbnails: true,
    /**
   * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
   */ maxThumbnailFilesize: 10,
    /**
   * If `null`, the ratio of the image will be used to calculate it.
   */ thumbnailWidth: 120,
    /**
   * The same as `thumbnailWidth`. If both are null, images will not be resized.
   */ thumbnailHeight: 120,
    /**
   * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
   * Can be either `contain` or `crop`.
   */ thumbnailMethod: "crop",
    /**
   * If set, images will be resized to these dimensions before being **uploaded**.
   * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
   * ratio of the file will be preserved.
   *
   * The `options.transformFile` function uses these options, so if the `transformFile` function
   * is overridden, these options don't do anything.
   */ resizeWidth: null,
    /**
   * See `resizeWidth`.
   */ resizeHeight: null,
    /**
   * The mime type of the resized image (before it gets uploaded to the server).
   * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
   * See `resizeWidth` for more information.
   */ resizeMimeType: null,
    /**
   * The quality of the resized images. See `resizeWidth`.
   */ resizeQuality: 0.8,
    /**
   * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
   * Can be either `contain` or `crop`.
   */ resizeMethod: "contain",
    /**
   * The base that is used to calculate the **displayed** filesize. You can
   * change this to 1024 if you would rather display kibibytes, mebibytes,
   * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
   * not `1 kilobyte`. You can change this to `1024` if you don't care about
   * validity.
   */ filesizeBase: 1000,
    /**
   * If not `null` defines how many files this Dropzone handles. If it exceeds,
   * the event `maxfilesexceeded` will be called. The dropzone element gets the
   * class `dz-max-files-reached` accordingly so you can provide visual
   * feedback.
   */ maxFiles: null,
    /**
   * An optional object to send additional headers to the server. Eg:
   * `{ "My-Awesome-Header": "header value" }`
   */ headers: null,
    /**
   * Should the default headers be set or not?
   * Accept: application/json <- for requesting json response
   * Cache-Control: no-cache <- Request shouldn't be cached
   * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
   */ defaultHeaders: true,
    /**
   * If `true`, the dropzone element itself will be clickable, if `false`
   * nothing will be clickable.
   *
   * You can also pass an HTML element, a CSS selector (for multiple elements)
   * or an array of those. In that case, all of those elements will trigger an
   * upload when clicked.
   */ clickable: true,
    /**
   * Whether hidden files in directories should be ignored.
   */ ignoreHiddenFiles: true,
    /**
   * The default implementation of `accept` checks the file's mime type or
   * extension against this list. This is a comma separated list of mime
   * types or file extensions.
   *
   * Eg.: `image/*,application/pdf,.psd`
   *
   * If the Dropzone is `clickable` this option will also be used as
   * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
   * parameter on the hidden file input as well.
   */ acceptedFiles: null,
    /**
   * If false, files will be added to the queue but the queue will not be
   * processed automatically.
   * This can be useful if you need some additional user input before sending
   * files (or if you want want all files sent at once).
   * If you're ready to send the file simply call `myDropzone.processQueue()`.
   *
   * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
   * section for more information.
   */ autoProcessQueue: true,
    /**
   * If false, files added to the dropzone will not be queued by default.
   * You'll have to call `enqueueFile(file)` manually.
   */ autoQueue: true,
    /**
   * If `true`, this will add a link to every file preview to remove or cancel (if
   * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
   * and `dictRemoveFile` options are used for the wording.
   */ addRemoveLinks: false,
    /**
   * Defines where to display the file previews – if `null` the
   * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
   * selector. The element should have the `dropzone-previews` class so
   * the previews are displayed properly.
   */ previewsContainer: null,
    /**
   * Set this to `true` if you don't want previews to be shown.
   */ disablePreviews: false,
    /**
   * This is the element the hidden input field (which is used when clicking on the
   * dropzone to trigger file selection) will be appended to. This might
   * be important in case you use frameworks to switch the content of your page.
   *
   * Can be a selector string, or an element directly.
   */ hiddenInputContainer: "body",
    /**
   * If null, no capture type will be specified
   * If camera, mobile devices will skip the file selection and choose camera
   * If microphone, mobile devices will skip the file selection and choose the microphone
   * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
   * On apple devices multiple must be set to false.  AcceptedFiles may need to
   * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
   */ capture: null,
    /**
   * **Deprecated**. Use `renameFile` instead.
   */ renameFilename: null,
    /**
   * A function that is invoked before the file is uploaded to the server and renames the file.
   * This function gets the `File` as argument and can use the `file.name`. The actual name of the
   * file that gets used during the upload can be accessed through `file.upload.filename`.
   */ renameFile: null,
    /**
   * If `true` the fallback will be forced. This is very useful to test your server
   * implementations first and make sure that everything works as
   * expected without dropzone if you experience problems, and to test
   * how your fallbacks will look.
   */ forceFallback: false,
    /**
   * The text used before any files are dropped.
   */ dictDefaultMessage: "Drop files here to upload",
    /**
   * The text that replaces the default message text it the browser is not supported.
   */ dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
    /**
   * The text that will be added before the fallback form.
   * If you provide a  fallback element yourself, or if this option is `null` this will
   * be ignored.
   */ dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
    /**
   * If the filesize is too big.
   * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
   */ dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    /**
   * If the file doesn't match the file type.
   */ dictInvalidFileType: "You can't upload files of this type.",
    /**
   * If the server response was invalid.
   * `{{statusCode}}` will be replaced with the servers status code.
   */ dictResponseError: "Server responded with {{statusCode}} code.",
    /**
   * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
   */ dictCancelUpload: "Cancel upload",
    /**
   * The text that is displayed if an upload was manually canceled
   */ dictUploadCanceled: "Upload canceled.",
    /**
   * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
   */ dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
    /**
   * If `addRemoveLinks` is true, the text to be used to remove a file.
   */ dictRemoveFile: "Remove file",
    /**
   * If this is not null, then the user will be prompted before removing a file.
   */ dictRemoveFileConfirmation: null,
    /**
   * Displayed if `maxFiles` is st and exceeded.
   * The string `{{maxFiles}}` will be replaced by the configuration value.
   */ dictMaxFilesExceeded: "You cannot upload any more files.",
    /**
   * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
   * `b` for bytes.
   */ dictFileSizeUnits: {
        tb: "TB",
        gb: "GB",
        mb: "MB",
        kb: "KB",
        b: "b"
    },
    /**
   * Called when dropzone initialized
   * You can add event listeners here
   */ init () {},
    /**
   * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
   * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
   * of a function, this needs to return a map.
   *
   * The default implementation does nothing for normal uploads, but adds relevant information for
   * chunked uploads.
   *
   * This is the same as adding hidden input fields in the form element.
   */ params (files, xhr, chunk) {
        if (chunk) return {
            dzuuid: chunk.file.upload.uuid,
            dzchunkindex: chunk.index,
            dztotalfilesize: chunk.file.size,
            dzchunksize: this.options.chunkSize,
            dztotalchunkcount: chunk.file.upload.totalChunkCount,
            dzchunkbyteoffset: chunk.index * this.options.chunkSize
        };
    },
    /**
   * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
   * and a `done` function as parameters.
   *
   * If the done function is invoked without arguments, the file is "accepted" and will
   * be processed. If you pass an error message, the file is rejected, and the error
   * message will be displayed.
   * This function will not be called if the file is too big or doesn't match the mime types.
   */ accept (file, done) {
        return done();
    },
    /**
   * The callback that will be invoked when all chunks have been uploaded for a file.
   * It gets the file for which the chunks have been uploaded as the first parameter,
   * and the `done` function as second. `done()` needs to be invoked when everything
   * needed to finish the upload process is done.
   */ chunksUploaded: function(file, done) {
        done();
    },
    /**
   * Sends the file as binary blob in body instead of form data.
   * If this is set, the `params` option will be ignored.
   * It's an error to set this to `true` along with `uploadMultiple` since
   * multiple files cannot be in a single binary body.
   */ binaryBody: false,
    /**
   * Gets called when the browser is not supported.
   * The default implementation shows the fallback input field and adds
   * a text.
   */ fallback () {
        // This code should pass in IE7... :(
        let messageElement;
        this.element.className = `${this.element.className} dz-browser-not-supported`;
        for (let child of this.element.getElementsByTagName("div"))if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message"; // Removes the 'dz-default' class
            break;
        }
        if (!messageElement) {
            messageElement = (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).createElement('<div class="dz-message"><span></span></div>');
            this.element.appendChild(messageElement);
        }
        let span = messageElement.getElementsByTagName("span")[0];
        if (span) {
            if (span.textContent != null) span.textContent = this.options.dictFallbackMessage;
            else if (span.innerText != null) span.innerText = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
    },
    /**
   * Gets called to calculate the thumbnail dimensions.
   *
   * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
   *
   *  - `srcWidth` & `srcHeight` (required)
   *  - `trgWidth` & `trgHeight` (required)
   *  - `srcX` & `srcY` (optional, default `0`)
   *  - `trgX` & `trgY` (optional, default `0`)
   *
   * Those values are going to be used by `ctx.drawImage()`.
   */ resize (file, width, height, resizeMethod) {
        let info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
        };
        let srcRatio = file.width / file.height;
        // Automatically calculate dimensions if not specified
        if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
        } else if (width == null) width = height * srcRatio;
        else if (height == null) height = width / srcRatio;
        // Make sure images aren't upscaled
        width = Math.min(width, info.srcWidth);
        height = Math.min(height, info.srcHeight);
        let trgRatio = width / height;
        if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === "crop") {
                if (srcRatio > trgRatio) {
                    info.srcHeight = file.height;
                    info.srcWidth = info.srcHeight * trgRatio;
                } else {
                    info.srcWidth = file.width;
                    info.srcHeight = info.srcWidth / trgRatio;
                }
            } else if (resizeMethod === "contain") {
                // Method 'contain'
                if (srcRatio > trgRatio) height = width / srcRatio;
                else width = height * srcRatio;
            } else throw new Error(`Unknown resizeMethod '${resizeMethod}'`);
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        info.trgWidth = width;
        info.trgHeight = height;
        return info;
    },
    /**
   * Can be used to transform the file (for example, resize an image if necessary).
   *
   * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
   * images according to those dimensions.
   *
   * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
   * to be invoked with the file when the transformation is done.
   */ transformFile (file, done) {
        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
        else return done(file);
    },
    /**
   * A string that contains the template used for each dropped
   * file. Change it to fulfill your needs but make sure to properly
   * provide all elements.
   *
   * If you want to use an actual HTML element instead of providing a String
   * as a config option, you could create a div with the id `tpl`,
   * put the template inside it and provide the element like this:
   *
   *     document
   *       .querySelector('#tpl')
   *       .innerHTML
   *
   */ previewTemplate: (0, $b5cb5f094c2e1764$export$2e2bcd8739ae039),
    /*
   Those functions register themselves to the events on init and handle all
   the user interface specific stuff. Overwriting them won't break the upload
   but can break the way it's displayed.
   You can overwrite them if you don't like the default behavior. If you just
   want to add an additional event handler, register it on the dropzone object
   and don't overwrite those options.
   */ // Those are self explanatory and simply concern the DragnDrop.
    drop (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragstart (e) {},
    dragend (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    dragenter (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragover (e) {
        return this.element.classList.add("dz-drag-hover");
    },
    dragleave (e) {
        return this.element.classList.remove("dz-drag-hover");
    },
    paste (e) {},
    // Called whenever there are no files left in the dropzone anymore, and the
    // dropzone should be displayed as if in the initial state.
    reset () {
        return this.element.classList.remove("dz-started");
    },
    // Called when a file is added to the queue
    // Receives `file`
    addedfile (file) {
        if (this.element === this.previewsContainer) this.element.classList.add("dz-started");
        if (this.previewsContainer && !this.options.disablePreviews) {
            file.previewElement = (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility
            this.previewsContainer.appendChild(file.previewElement);
            for (var node of file.previewElement.querySelectorAll("[data-dz-name]"))node.textContent = file.name;
            for (node of file.previewElement.querySelectorAll("[data-dz-size]"))node.innerHTML = this.filesize(file.size);
            if (this.options.addRemoveLinks) {
                file._removeLink = (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).createElement(`<a class="dz-remove" href="javascript:undefined;" data-dz-remove>${this.options.dictRemoveFile}</a>`);
                file.previewElement.appendChild(file._removeLink);
            }
            let removeFileEvent = (e)=>{
                e.preventDefault();
                e.stopPropagation();
                if (file.status === (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).UPLOADING) {
                    if (this.options.dictCancelUploadConfirmation) return (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).confirm(this.options.dictCancelUploadConfirmation, ()=>this.removeFile(file));
                    else return this.removeFile(file);
                } else {
                    if (this.options.dictRemoveFileConfirmation) return (0, $3ed269f2f0fb224b$export$2e2bcd8739ae039).confirm(this.options.dictRemoveFileConfirmation, ()=>this.removeFile(file));
                    else return this.removeFile(file);
                }
            };
            for (let removeLink of file.previewElement.querySelectorAll("[data-dz-remove]"))removeLink.addEventListener("click", removeFileEvent);
        }
    },
    // Called whenever a file is removed.
    removedfile (file) {
        if (file.previewElement != null && file.previewElement.parentNode != null) file.previewElement.parentNode.removeChild(file.previewElement);
        return this._updateMaxFilesReachedClass();
    },
    // Called when a thumbnail has been generated
    // Receives `file` and `dataUrl`
    thumbnail (file, dataUrl) {
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            for (let thumbnailElement of file.previewElement.querySelectorAll("[data-dz-thumbnail]")){
                thumbnailElement.alt = file.name;
                thumbnailElement.src = dataUrl;
            }
            return setTimeout(()=>file.previewElement.classList.add("dz-image-preview"), 1);
        }
    },
    // Called whenever an error occurs
    // Receives `file` and `message`
    error (file, message) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-error");
            if (typeof message !== "string" && message.error) message = message.error;
            for (let node of file.previewElement.querySelectorAll("[data-dz-errormessage]"))node.textContent = message;
        }
    },
    errormultiple () {},
    // Called when a file gets processed. Since there is a queue, not all added
    // files are processed immediately.
    // Receives `file`
    processing (file) {
        if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");
            if (file._removeLink) return file._removeLink.innerHTML = this.options.dictCancelUpload;
        }
    },
    processingmultiple () {},
    // Called whenever the upload progress gets updated.
    // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
    // To get the total number of bytes of the file, use `file.size`
    uploadprogress (file, progress, bytesSent) {
        if (file.previewElement) for (let node of file.previewElement.querySelectorAll("[data-dz-uploadprogress]"))node.nodeName === "PROGRESS" ? node.value = progress : node.style.width = `${progress}%`;
    },
    // Called whenever the total upload progress gets updated.
    // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
    totaluploadprogress () {},
    // Called just before the file is sent. Gets the `xhr` object as second
    // parameter, so you can modify it (for example to add a CSRF token) and a
    // `formData` object to add additional information.
    sending () {},
    sendingmultiple () {},
    // When the complete upload is finished and successful
    // Receives `file`
    success (file) {
        if (file.previewElement) return file.previewElement.classList.add("dz-success");
    },
    successmultiple () {},
    // When the upload is canceled.
    canceled (file) {
        return this.emit("error", file, this.options.dictUploadCanceled);
    },
    canceledmultiple () {},
    // When the upload is finished, either with success or an error.
    // Receives `file`
    complete (file) {
        if (file._removeLink) file._removeLink.innerHTML = this.options.dictRemoveFile;
        if (file.previewElement) return file.previewElement.classList.add("dz-complete");
    },
    completemultiple () {},
    maxfilesexceeded () {},
    maxfilesreached () {},
    queuecomplete () {},
    addedfiles () {},
    emptyfolder () {}
};
var $4ca367182776f80b$export$2e2bcd8739ae039 = $4ca367182776f80b$var$defaultOptions;


class $3ed269f2f0fb224b$export$2e2bcd8739ae039 extends (0, $4040acfd8584338d$export$2e2bcd8739ae039) {
    static initClass() {
        // Exposing the emitter class, mainly for tests
        this.prototype.Emitter = (0, $4040acfd8584338d$export$2e2bcd8739ae039);
        /*
     This is a list of all available events you can register on a dropzone object.

     You can register an event handler like this:

     dropzone.on("dragEnter", function() { });

     */ this.prototype.events = [
            "drop",
            "dragstart",
            "dragend",
            "dragenter",
            "dragover",
            "dragleave",
            "addedfile",
            "addedfiles",
            "removedfile",
            "thumbnail",
            "error",
            "errormultiple",
            "processing",
            "processingmultiple",
            "uploadprogress",
            "totaluploadprogress",
            "sending",
            "sendingmultiple",
            "success",
            "successmultiple",
            "canceled",
            "canceledmultiple",
            "complete",
            "completemultiple",
            "reset",
            "maxfilesexceeded",
            "maxfilesreached",
            "queuecomplete",
            "emptyfolder"
        ];
        this.prototype._thumbnailQueue = [];
        this.prototype._processingThumbnail = false;
    }
    constructor(el, options){
        super();
        let fallback, left;
        this.element = el;
        this.clickableElements = [];
        this.listeners = [];
        this.files = []; // All files
        if (typeof this.element === "string") this.element = document.querySelector(this.element);
        // make sure we actually have an HTML Element
        if (this.element === null || !this.element instanceof HTMLElement) throw new Error("Invalid dropzone element: not an instance of HTMLElement.");
        if (this.element.dropzone) throw new Error("Dropzone already attached.");
        // Now add this dropzone to the instances.
        $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.push(this);
        // Put the dropzone inside the element itself.
        this.element.dropzone = this;
        let elementOptions = (left = $3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(this.element)) != null ? left : {};
        this.options = Object.assign({}, (0, $4ca367182776f80b$export$2e2bcd8739ae039), elementOptions, options != null ? options : {});
        this.options.previewTemplate = this.options.previewTemplate.replace(/\n*/g, "");
        // If the browser failed, just call the fallback and leave
        if (this.options.forceFallback || !$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported()) return this.options.fallback.call(this);
        // @options.url = @element.getAttribute "action" unless @options.url?
        if (this.options.url == null) this.options.url = this.element.getAttribute("action");
        if (!this.options.url) throw new Error("No URL provided.");
        if (this.options.uploadMultiple && this.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
        if (this.options.binaryBody && this.options.uploadMultiple) throw new Error("You cannot set both: binaryBody and uploadMultiple.");
        if (typeof this.options.method === "string") this.options.method = this.options.method.toUpperCase();
        if ((fallback = this.getExistingFallback()) && fallback.parentNode) // Remove the fallback
        fallback.parentNode.removeChild(fallback);
        // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
        if (this.options.previewsContainer !== false) {
            if (this.options.previewsContainer) this.previewsContainer = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.previewsContainer, "previewsContainer");
            else this.previewsContainer = this.element;
        }
        if (this.options.clickable) {
            if (this.options.clickable === true) this.clickableElements = [
                this.element
            ];
            else this.clickableElements = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements(this.options.clickable, "clickable");
        }
        this.init();
    }
    // Returns all files that have been accepted
    getAcceptedFiles() {
        return this.files.filter((file)=>file.accepted).map((file)=>file);
    }
    // Returns all files that have been rejected
    // Not sure when that's going to be useful, but added for completeness.
    getRejectedFiles() {
        return this.files.filter((file)=>!file.accepted).map((file)=>file);
    }
    getFilesWithStatus(status) {
        return this.files.filter((file)=>file.status === status).map((file)=>file);
    }
    // Returns all files that are in the queue
    getQueuedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED);
    }
    getUploadingFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING);
    }
    getAddedFiles() {
        return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED);
    }
    // Files that are either queued or uploading
    getActiveFiles() {
        return this.files.filter((file)=>file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED).map((file)=>file);
    }
    // The function that gets called when Dropzone is initialized. You
    // can (and should) setup event listeners inside this function.
    init() {
        // In case it isn't set already
        if (this.element.tagName === "form") this.element.setAttribute("enctype", "multipart/form-data");
        if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) this.element.appendChild($3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<div class="dz-default dz-message"><button class="dz-button" type="button">${this.options.dictDefaultMessage}</button></div>`));
        if (this.clickableElements.length) {
            let setupHiddenFileInput = ()=>{
                if (this.hiddenFileInput) this.hiddenFileInput.parentNode?.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = document.createElement("input");
                this.hiddenFileInput.setAttribute("type", "file");
                this.hiddenFileInput.setAttribute("form", this.element.id);
                if (this.options.maxFiles === null || this.options.maxFiles > 1) this.hiddenFileInput.setAttribute("multiple", "multiple");
                this.hiddenFileInput.className = "dz-hidden-input";
                if (this.options.acceptedFiles !== null) this.hiddenFileInput.setAttribute("accept", this.options.acceptedFiles);
                if (this.options.capture !== null) this.hiddenFileInput.setAttribute("capture", this.options.capture);
                // Making sure that no one can "tab" into this field.
                this.hiddenFileInput.setAttribute("tabindex", "-1");
                // Add arialabel for a11y
                this.hiddenFileInput.setAttribute("aria-label", "dropzone hidden input");
                // Not setting `display="none"` because some browsers don't accept clicks
                // on elements that aren't displayed.
                this.hiddenFileInput.style.visibility = "hidden";
                this.hiddenFileInput.style.position = "absolute";
                this.hiddenFileInput.style.top = "0";
                this.hiddenFileInput.style.left = "0";
                this.hiddenFileInput.style.height = "0";
                this.hiddenFileInput.style.width = "0";
                $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.hiddenInputContainer, "hiddenInputContainer").appendChild(this.hiddenFileInput);
                this.hiddenFileInput.addEventListener("change", ()=>{
                    let { files: files } = this.hiddenFileInput;
                    if (files.length) for (let file of files)this.addFile(file);
                    this.emit("addedfiles", files);
                    setupHiddenFileInput();
                });
            };
            setupHiddenFileInput();
        }
        this.URL = window.URL !== null ? window.URL : window.webkitURL;
        // Setup all event listeners on the Dropzone object itself.
        // They're not in @setupEventListeners() because they shouldn't be removed
        // again when the dropzone gets disabled.
        for (let eventName of this.events)this.on(eventName, this.options[eventName]);
        this.on("uploadprogress", ()=>this.updateTotalUploadProgress());
        this.on("removedfile", ()=>this.updateTotalUploadProgress());
        this.on("canceled", (file)=>this.emit("complete", file));
        // Emit a `queuecomplete` event if all files finished uploading.
        this.on("complete", (file)=>{
            if (this.getAddedFiles().length === 0 && this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) // This needs to be deferred so that `queuecomplete` really triggers after `complete`
            return setTimeout(()=>this.emit("queuecomplete"), 0);
        });
        const containsFiles = function(e) {
            return e.dataTransfer.types && e.dataTransfer.types.includes("Files");
        };
        let noPropagation = function(e) {
            // If there are no files, we don't want to stop
            // propagation so we don't interfere with other
            // drag and drop behaviour.
            if (!containsFiles(e)) return;
            e.stopPropagation();
            return e.preventDefault();
        };
        // Create the listeners
        this.listeners = [
            {
                element: this.element,
                events: {
                    dragstart: (e)=>{
                        return this.emit("dragstart", e);
                    },
                    dragenter: (e)=>{
                        noPropagation(e);
                        return this.emit("dragenter", e);
                    },
                    dragover: (e)=>{
                        // Makes it possible to drag files from chrome's download bar
                        // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
                        const efct = e.dataTransfer.effectAllowed;
                        e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy";
                        noPropagation(e);
                        return this.emit("dragover", e);
                    },
                    dragleave: (e)=>{
                        return this.emit("dragleave", e);
                    },
                    drop: (e)=>{
                        noPropagation(e);
                        return this.drop(e);
                    },
                    dragend: (e)=>{
                        return this.emit("dragend", e);
                    }
                }
            }
        ];
        this.clickableElements.forEach((clickableElement)=>{
            return this.listeners.push({
                element: clickableElement,
                events: {
                    click: (evt)=>{
                        // Only the actual dropzone or the message element should trigger file selection
                        if (clickableElement !== this.element || evt.target === this.element || $3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside(evt.target, this.element.querySelector(".dz-message"))) this.hiddenFileInput.click(); // Forward the click
                        return true;
                    }
                }
            });
        });
        this.enable();
        return this.options.init.call(this);
    }
    // Not fully tested yet
    destroy() {
        this.disable();
        this.removeAllFiles(true);
        if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
            this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
            this.hiddenFileInput = null;
        }
        delete this.element.dropzone;
        return $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.splice($3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.indexOf(this), 1);
    }
    updateTotalUploadProgress() {
        let totalUploadProgress;
        let totalBytesSent = 0;
        let totalBytes = 0;
        let activeFiles = this.getActiveFiles();
        if (activeFiles.length) {
            for (let file of this.getActiveFiles()){
                totalBytesSent += file.upload.bytesSent;
                totalBytes += file.upload.total;
            }
            totalUploadProgress = 100 * totalBytesSent / totalBytes;
        } else totalUploadProgress = 100;
        return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    }
    // @options.paramName can be a function taking one parameter rather than a string.
    // A parameter name for a file is obtained simply by calling this with an index number.
    _getParamName(n) {
        if (typeof this.options.paramName === "function") return this.options.paramName(n);
        else return `${this.options.paramName}${this.options.uploadMultiple ? `[${n}]` : ""}`;
    }
    // If @options.renameFile is a function,
    // the function will be used to rename the file.name before appending it to the formData.
    // MacOS 14+ screenshots contain narrow non-breaking space (U+202F) characters in filenames 
    // (e.g., "Screenshot 2024-01-30 at 10.32.07 AM.png" where the space after "07" and before "AM" is U+202F).
    // This function now replaces these with regular spaces to prevent upload issues and maintain compatibility with MacOS
    _renameFile(file) {
        const cleanFile = {
            ...file,
            name: file.name.replace(/\u202F/g, ' ')
        };
        if (typeof this.options.renameFile !== "function") return cleanFile.name;
        return this.options.renameFile(cleanFile);
    }
    // Returns a form that can be used as fallback if the browser does not support DragnDrop
    //
    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
    // This code has to pass in IE7 :(
    getFallbackForm() {
        let existingFallback, form;
        if (existingFallback = this.getExistingFallback()) return existingFallback;
        let fieldsString = '<div class="dz-fallback">';
        if (this.options.dictFallbackText) fieldsString += `<p>${this.options.dictFallbackText}</p>`;
        fieldsString += `<input type="file" name="${this._getParamName(0)}" ${this.options.uploadMultiple ? 'multiple="multiple"' : undefined} /><input type="submit" value="Upload!"></div>`;
        let fields = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(fieldsString);
        if (this.element.tagName !== "FORM") {
            form = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<form action="${this.options.url}" enctype="multipart/form-data" method="${this.options.method}"></form>`);
            form.appendChild(fields);
        } else {
            // Make sure that the enctype and method attributes are set properly
            this.element.setAttribute("enctype", "multipart/form-data");
            this.element.setAttribute("method", this.options.method);
        }
        return form != null ? form : fields;
    }
    // Returns the fallback elements if they exist already
    //
    // This code has to pass in IE7 :(
    getExistingFallback() {
        let getFallback = function(elements) {
            for (let el of elements){
                if (/(^| )fallback($| )/.test(el.className)) return el;
            }
        };
        for (let tagName of [
            "div",
            "form"
        ]){
            var fallback;
            if (fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback;
        }
    }
    // Activates all listeners stored in @listeners
    setupEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.addEventListener(event, listener, false));
                }
                return result;
            })());
    }
    // Deactivates all listeners stored in @listeners
    removeEventListeners() {
        return this.listeners.map((elementListeners)=>(()=>{
                let result = [];
                for(let event in elementListeners.events){
                    let listener = elementListeners.events[event];
                    result.push(elementListeners.element.removeEventListener(event, listener, false));
                }
                return result;
            })());
    }
    // Removes all event listeners and cancels all files in the queue or being processed.
    disable() {
        this.clickableElements.forEach((element)=>element.classList.remove("dz-clickable"));
        this.removeEventListeners();
        this.disabled = true;
        return this.files.map((file)=>this.cancelUpload(file));
    }
    enable() {
        delete this.disabled;
        this.clickableElements.forEach((element)=>element.classList.add("dz-clickable"));
        return this.setupEventListeners();
    }
    // Returns a nicely formatted filesize
    filesize(size) {
        let selectedSize = 0;
        let selectedUnit = "b";
        if (size > 0) {
            let units = [
                "tb",
                "gb",
                "mb",
                "kb",
                "b"
            ];
            for(let i = 0; i < units.length; i++){
                let unit = units[i];
                let cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                if (size >= cutoff) {
                    selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                    selectedUnit = unit;
                    break;
                }
            }
            selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
        }
        return `<strong>${selectedSize}</strong> ${this.options.dictFileSizeUnits[selectedUnit]}`;
    }
    // Adds or removes the `dz-max-files-reached` class from the form.
    _updateMaxFilesReachedClass() {
        if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            if (this.getAcceptedFiles().length === this.options.maxFiles) this.emit("maxfilesreached", this.files);
            return this.element.classList.add("dz-max-files-reached");
        } else return this.element.classList.remove("dz-max-files-reached");
    }
    drop(e) {
        if (!e.dataTransfer) return;
        this.emit("drop", e);
        // Convert the FileList to an Array
        // This is necessary for IE11
        let files = [];
        for(let i = 0; i < e.dataTransfer.files.length; i++)files[i] = e.dataTransfer.files[i];
        // Even if it's a folder, files.length will contain the folders.
        if (files.length) {
            let { items: items } = e.dataTransfer;
            if (items && items.length && items[0].webkitGetAsEntry != null) // The browser supports dropping of folders, so handle items instead of files
            this._addFilesFromItems(items);
            else this.handleFiles(files);
        }
        this.emit("addedfiles", files);
    }
    paste(e) {
        if ($3ed269f2f0fb224b$var$__guard__(e != null ? e.clipboardData : undefined, (x)=>x.items) == null) return;
        this.emit("paste", e);
        let { items: items } = e.clipboardData;
        if (items.length) return this._addFilesFromItems(items);
    }
    handleFiles(files) {
        for (let file of files)this.addFile(file);
    }
    // When a folder is dropped (or files are pasted), items must be handled
    // instead of files.
    _addFilesFromItems(items) {
        return (()=>{
            let result = [];
            for (let item of items){
                var entry;
                if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
                    if (entry.isFile) result.push(this.addFile(item.getAsFile()));
                    else if (entry.isDirectory) // Append all files from that directory to files
                    result.push(this._addFilesFromDirectory(entry, entry.name));
                    else result.push(undefined);
                } else if (item.getAsFile != null) {
                    if (item.kind == null || item.kind === "file") result.push(this.addFile(item.getAsFile()));
                    else result.push(undefined);
                } else result.push(undefined);
            }
            return result;
        })();
    }
    // Goes through the directory, and adds each file it finds recursively
    _addFilesFromDirectory(directory, path) {
        let dirReader = directory.createReader();
        let errorHandler = (error)=>$3ed269f2f0fb224b$var$__guardMethod__(console, "log", (o)=>o.log(error));
        let entryCount = 0;
        var readEntries = ()=>{
            return dirReader.readEntries((entries)=>{
                if (entries.length > 0) {
                    for (let entry of entries){
                        if (entry.isFile) {
                            ++entryCount;
                            entry.file((file)=>{
                                if (this.options.ignoreHiddenFiles && file.name.substring(0, 1) === ".") return;
                                file.fullPath = `${path}/${file.name}`;
                                return this.addFile(file);
                            });
                        } else if (entry.isDirectory) this._addFilesFromDirectory(entry, `${path}/${entry.name}`);
                    }
                    // Recursively call readEntries() again, since browser only handle
                    // the first 100 entries.
                    // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
                    readEntries();
                } else if (entryCount === 0) this.emit("emptyfolder", path);
                return null;
            }, errorHandler);
        };
        return readEntries();
    }
    // If `done()` is called without argument the file is accepted
    // If you call it with an error message, the file is rejected
    // (This allows for asynchronous validation)
    //
    // This function checks the filesize, and if the file.type passes the
    // `acceptedFiles` check.
    accept(file, done) {
        if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1048576) done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
        else if (!$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile(file, this.options.acceptedFiles)) done(this.options.dictInvalidFileType);
        else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
            done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
            this.emit("maxfilesexceeded", file);
        } else this.options.accept.call(this, file, done);
    }
    addFile(file) {
        file.upload = {
            // note: this only works if window.isSecureContext is true, which includes localhost in http
            uuid: window.isSecureContext ? self.crypto.randomUUID() : $3ed269f2f0fb224b$export$2e2bcd8739ae039.uuidv4(),
            progress: 0,
            // Setting the total upload size to file.size for the beginning
            // It's actual different than the size to be transmitted.
            total: file.size,
            bytesSent: 0,
            filename: this._renameFile(file)
        };
        this.files.push(file);
        file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED;
        this.emit("addedfile", file);
        this._enqueueThumbnail(file);
        this.accept(file, (error)=>{
            if (error) {
                file.accepted = false;
                this._errorProcessing([
                    file
                ], error); // Will set the file.status
            } else {
                file.accepted = true;
                if (this.options.autoQueue) this.enqueueFile(file);
                 // Will set .accepted = true
            }
            this._updateMaxFilesReachedClass();
        });
    }
    // Wrapper for enqueueFile
    enqueueFiles(files) {
        for (let file of files)this.enqueueFile(file);
        return null;
    }
    enqueueFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED && file.accepted === true) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
            if (this.options.autoProcessQueue) return setTimeout(()=>this.processQueue(), 0); // Deferring the call
        } else throw new Error("This file can't be queued because it has already been processed or was rejected.");
    }
    _enqueueThumbnail(file) {
        if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1048576) {
            this._thumbnailQueue.push(file);
            return setTimeout(()=>this._processThumbnailQueue(), 0); // Deferring the call
        }
    }
    _processThumbnailQueue() {
        if (this._processingThumbnail || this._thumbnailQueue.length === 0) return;
        this._processingThumbnail = true;
        let file = this._thumbnailQueue.shift();
        return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, (dataUrl)=>{
            this.emit("thumbnail", file, dataUrl);
            this._processingThumbnail = false;
            return this._processThumbnailQueue();
        });
    }
    // Can be called by the user to remove a file
    removeFile(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) this.cancelUpload(file);
        this.files = $3ed269f2f0fb224b$var$without(this.files, file);
        this.emit("removedfile", file);
        if (this.files.length === 0) return this.emit("reset");
    }
    // Removes all files that aren't currently processed from the list
    removeAllFiles(cancelIfNecessary) {
        // Create a copy of files since removeFile() changes the @files array.
        if (cancelIfNecessary == null) cancelIfNecessary = false;
        for (let file of this.files.slice())if (file.status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || cancelIfNecessary) this.removeFile(file);
        return null;
    }
    // Resizes an image before it gets sent to the server. This function is the default behavior of
    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
    // the resized blob.
    resizeImage(file, width, height, resizeMethod, callback) {
        return this.createThumbnail(file, width, height, resizeMethod, true, (dataUrl, canvas)=>{
            if (canvas == null) // The image has not been resized
            return callback(file);
            else {
                let { resizeMimeType: resizeMimeType } = this.options;
                if (resizeMimeType == null) resizeMimeType = file.type;
                let resizedDataURL = canvas.toDataURL(resizeMimeType, this.options.resizeQuality);
                if (resizeMimeType === "image/jpeg" || resizeMimeType === "image/jpg") // Now add the original EXIF information
                resizedDataURL = $3ed269f2f0fb224b$var$restoreExif(file.dataURL, resizedDataURL);
                return callback($3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob(resizedDataURL));
            }
        }, true);
    }
    createThumbnail(file, width, height, resizeMethod, fixOrientation, callback, ignoreExif = false) {
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            file.dataURL = fileReader.result;
            // Don't bother creating a thumbnail for SVG images since they're vector
            // Also skip gif (see #39)
            if (file.type === "image/svg+xml" || file.type === "image/gif") {
                if (callback != null) callback(fileReader.result);
                return;
            }
            this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, undefined, ignoreExif);
        };
        fileReader.readAsDataURL(file);
    }
    // `mockFile` needs to have these attributes:
    //
    //     { name: 'name', size: 12345, imageUrl: '' }
    //
    // `callback` will be invoked when the image has been downloaded and displayed.
    // `crossOrigin` will be added to the `img` tag when accessing the file.
    displayExistingFile(mockFile, imageUrl, callback, crossOrigin, resizeThumbnail = true) {
        this.emit("addedfile", mockFile);
        this.emit("complete", mockFile);
        if (!resizeThumbnail) {
            this.emit("thumbnail", mockFile, imageUrl);
            if (callback) callback();
        } else {
            let onDone = (thumbnail)=>{
                this.emit("thumbnail", mockFile, thumbnail);
                if (callback) callback();
            };
            mockFile.dataURL = imageUrl;
            this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, this.options.fixOrientation, onDone, crossOrigin);
        }
    }
    createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin, ignoreExif = false) {
        // Not using `new Image` here because of a bug in latest Chrome versions.
        // See https://github.com/enyo/dropzone/pull/226
        let img = document.createElement("img");
        if (crossOrigin) img.crossOrigin = crossOrigin;
        // fixOrientation is not needed anymore with browsers handling imageOrientation
        fixOrientation = getComputedStyle(document.body)["imageOrientation"] == "from-image" ? false : fixOrientation;
        img.onload = ()=>{
            let loadExif = (callback)=>callback(1);
            if (typeof EXIF !== "undefined" && EXIF !== null && fixOrientation) loadExif = (callback)=>EXIF.getData(img, function() {
                    return callback(EXIF.getTag(this, "Orientation"));
                });
            return loadExif((orientation)=>{
                file.width = img.width;
                file.height = img.height;
                let resizeInfo = this.options.resize.call(this, file, width, height, resizeMethod);
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = resizeInfo.trgWidth;
                canvas.height = resizeInfo.trgHeight;
                if (orientation > 4) {
                    canvas.width = resizeInfo.trgHeight;
                    canvas.height = resizeInfo.trgWidth;
                }
                switch(orientation){
                    case 2:
                        // horizontal flip
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        // 180° rotate left
                        ctx.translate(canvas.width, canvas.height);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        ctx.translate(0, canvas.height);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        // 90° rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -canvas.width);
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(canvas.height, -canvas.width);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        // 90° rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-canvas.height, 0);
                        break;
                }
                // This is a bugfix for iOS' scaling bug.
                $3ed269f2f0fb224b$var$drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                let thumbnail = canvas.toDataURL("image/png");
                if (callback != null) return callback(thumbnail, canvas);
            });
        };
        if (callback != null) img.onerror = callback;
        var dataURL = file.dataURL;
        if (ignoreExif) dataURL = $3ed269f2f0fb224b$var$removeExif(dataURL);
        return img.src = dataURL;
    }
    // Goes through the queue and processes files if there aren't too many already.
    processQueue() {
        let { parallelUploads: parallelUploads } = this.options;
        let processingLength = this.getUploadingFiles().length;
        let i = processingLength;
        // There are already at least as many files uploading than should be
        if (processingLength >= parallelUploads) return;
        let queuedFiles = this.getQueuedFiles();
        if (!(queuedFiles.length > 0)) return;
        if (this.options.uploadMultiple) // The files should be uploaded in one request
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
        else while(i < parallelUploads){
            if (!queuedFiles.length) return;
             // Nothing left to process
            this.processFile(queuedFiles.shift());
            i++;
        }
    }
    // Wrapper for `processFiles`
    processFile(file) {
        return this.processFiles([
            file
        ]);
    }
    // Loads the file, then calls finishedLoading()
    processFiles(files) {
        for (let file of files){
            file.processing = true; // Backwards compatibility
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING;
            this.emit("processing", file);
        }
        if (this.options.uploadMultiple) this.emit("processingmultiple", files);
        return this.uploadFiles(files);
    }
    _getFilesWithXhr(xhr) {
        let files;
        return files = this.files.filter((file)=>file.xhr === xhr).map((file)=>file);
    }
    // Cancels the file upload and sets the status to CANCELED
    // **if** the file is actually being uploaded.
    // If it's still in the queue, the file is being removed from it and the status
    // set to CANCELED.
    cancelUpload(file) {
        if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) {
            let groupedFiles = this._getFilesWithXhr(file.xhr);
            for (let groupedFile of groupedFiles)groupedFile.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            if (typeof file.xhr !== "undefined") file.xhr.abort();
            for (let groupedFile of groupedFiles)this.emit("canceled", groupedFile);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", groupedFiles);
        } else if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED) {
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
            this.emit("canceled", file);
            if (this.options.uploadMultiple) this.emit("canceledmultiple", [
                file
            ]);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    resolveOption(option, ...args) {
        if (typeof option === "function") return option.apply(this, args);
        return option;
    }
    uploadFile(file) {
        return this.uploadFiles([
            file
        ]);
    }
    uploadFiles(files) {
        this._transformFiles(files, (transformedFiles)=>{
            if (this.options.chunking) {
                // Chunking is not allowed to be used with `uploadMultiple` so we know
                // that there is only __one__file.
                let transformedFile = transformedFiles[0];
                files[0].upload.chunked = this.options.chunking && (this.options.forceChunking || transformedFile.size > this.options.chunkSize);
                files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / this.options.chunkSize);
                if (transformedFile.size === 0) files[0].upload.totalChunkCount = 1;
            }
            if (files[0].upload.chunked) {
                // This file should be sent in chunks!
                // If the chunking option is set, we **know** that there can only be **one** file, since
                // uploadMultiple is not allowed with this option.
                let file = files[0];
                let transformedFile = transformedFiles[0];
                file.upload.chunks = [];
                let handleNextChunk = ()=>{
                    let chunkIndex = 0;
                    // Find the next item in file.upload.chunks that is not defined yet.
                    while(file.upload.chunks[chunkIndex] !== undefined)chunkIndex++;
                    // This means, that all chunks have already been started.
                    if (chunkIndex >= file.upload.totalChunkCount) return;
                    let start = chunkIndex * this.options.chunkSize;
                    let end = Math.min(start + this.options.chunkSize, transformedFile.size);
                    let dataBlock = {
                        name: this._getParamName(0),
                        data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
                        filename: file.upload.filename,
                        chunkIndex: chunkIndex
                    };
                    file.upload.chunks[chunkIndex] = {
                        file: file,
                        index: chunkIndex,
                        dataBlock: dataBlock,
                        status: $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING,
                        progress: 0,
                        retries: 0
                    };
                    this._uploadData(files, [
                        dataBlock
                    ]);
                };
                file.upload.finishedChunkUpload = (chunk, response)=>{
                    let allFinished = true;
                    chunk.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
                    // Clear the data from the chunk
                    chunk.dataBlock = null;
                    chunk.response = chunk.xhr.responseText;
                    chunk.responseHeaders = chunk.xhr.getAllResponseHeaders();
                    // Leaving this reference to xhr will cause memory leaks.
                    chunk.xhr = null;
                    for(let i = 0; i < file.upload.totalChunkCount; i++){
                        if (file.upload.chunks[i] === undefined) return handleNextChunk();
                        if (file.upload.chunks[i].status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS) allFinished = false;
                    }
                    if (allFinished) this.options.chunksUploaded(file, ()=>{
                        this._finished(files, response, null);
                    });
                };
                if (this.options.parallelChunkUploads) {
                    // we want to limit parallelChunkUploads to the same value as parallelUploads option
                    const parallelCount = Math.min(this.options.parallelChunkUploads === true ? this.options.parallelUploads : this.options.parallelChunkUploads, file.upload.totalChunkCount);
                    for(let i = 0; i < parallelCount; i++)handleNextChunk();
                } else handleNextChunk();
            } else {
                let dataBlocks = [];
                for(let i = 0; i < files.length; i++)dataBlocks[i] = {
                    name: this._getParamName(i),
                    data: transformedFiles[i],
                    filename: files[i].upload.filename
                };
                this._uploadData(files, dataBlocks);
            }
        });
    }
    /// Returns the right chunk for given file and xhr
    _getChunk(file, xhr) {
        for(let i = 0; i < file.upload.totalChunkCount; i++){
            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) return file.upload.chunks[i];
        }
    }
    // This function actually uploads the file(s) to the server.
    //
    //  If dataBlocks contains the actual data to upload (meaning, that this could
    // either be transformed files, or individual chunks for chunked upload) then
    // they will be used for the actual data to upload.
    _uploadData(files, dataBlocks) {
        let xhr = new XMLHttpRequest();
        // Put the xhr object in the file objects to be able to reference it later.
        for (let file of files)file.xhr = xhr;
        if (files[0].upload.chunked) // Put the xhr object in the right chunk object, so it can be associated
        // later, and found with _getChunk.
        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
        let method = this.resolveOption(this.options.method, files, dataBlocks);
        let url = this.resolveOption(this.options.url, files, dataBlocks);
        xhr.open(method, url, true);
        // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
        let timeout = this.resolveOption(this.options.timeout, files);
        if (timeout) xhr.timeout = this.resolveOption(this.options.timeout, files);
        // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
        xhr.withCredentials = !!this.options.withCredentials;
        xhr.onload = (e)=>{
            this._finishedUploading(files, xhr, e);
        };
        xhr.ontimeout = ()=>{
            this._handleUploadError(files, xhr, `Request timedout after ${this.options.timeout / 1000} seconds`);
        };
        xhr.onerror = ()=>{
            this._handleUploadError(files, xhr);
        };
        // Some browsers do not have the .upload property
        let progressObj = xhr.upload != null ? xhr.upload : xhr;
        progressObj.onprogress = (e)=>this._updateFilesUploadProgress(files, xhr, e);
        let headers = this.options.defaultHeaders ? {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        } : {};
        if (this.options.binaryBody) headers["Content-Type"] = files[0].type;
        if (this.options.headers) Object.assign(headers, this.options.headers);
        for(let headerName in headers){
            let headerValue = headers[headerName];
            if (headerValue) xhr.setRequestHeader(headerName, headerValue);
        }
        if (this.options.binaryBody) {
            // Since the file is going to be sent as binary body, it doesn't make
            // any sense to generate `FormData` for it.
            for (let file of files)this.emit("sending", file, xhr);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr);
            this.submitRequest(xhr, null, files);
        } else {
            let formData = new FormData();
            // Adding all @options parameters
            if (this.options.params) {
                let additionalParams = this.options.params;
                if (typeof additionalParams === "function") additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
                for(let key in additionalParams){
                    let value = additionalParams[key];
                    if (Array.isArray(value)) // The additional parameter contains an array,
                    // so lets iterate over it to attach each value
                    // individually.
                    for(let i = 0; i < value.length; i++)formData.append(key, value[i]);
                    else formData.append(key, value);
                }
            }
            // Let the user add additional data if necessary
            for (let file of files)this.emit("sending", file, xhr, formData);
            if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr, formData);
            this._addFormElementData(formData);
            // Finally add the files
            // Has to be last because some servers (eg: S3) expect the file to be the last parameter
            for(let i = 0; i < dataBlocks.length; i++){
                let dataBlock = dataBlocks[i];
                formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
            }
            this.submitRequest(xhr, formData, files);
        }
    }
    // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
    _transformFiles(files, done) {
        let transformedFiles = [];
        // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
        let doneCounter = 0;
        for(let i = 0; i < files.length; i++)this.options.transformFile.call(this, files[i], (transformedFile)=>{
            transformedFiles[i] = transformedFile;
            if (++doneCounter === files.length) done(transformedFiles);
        });
    }
    // Takes care of adding other input elements of the form to the AJAX request
    _addFormElementData(formData) {
        // Take care of other input elements
        if (this.element.tagName === "FORM") for (let input of this.element.querySelectorAll("input, textarea, select, button")){
            let inputName = input.getAttribute("name");
            let inputType = input.getAttribute("type");
            if (inputType) inputType = inputType.toLowerCase();
            // If the input doesn't have a name, we can't use it.
            if (typeof inputName === "undefined" || inputName === null) continue;
            if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                // Possibly multiple values
                for (let option of input.options)if (option.selected) formData.append(inputName, option.value);
            } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) formData.append(inputName, input.value);
        }
    }
    // Invoked when there is new progress information about given files.
    // If e is not provided, it is assumed that the upload is finished.
    _updateFilesUploadProgress(files, xhr, e) {
        if (!files[0].upload.chunked) // Handle file uploads without chunking
        for (let file of files){
            if (file.upload.total && file.upload.bytesSent && file.upload.bytesSent == file.upload.total) continue;
            if (e) {
                file.upload.progress = 100 * e.loaded / e.total;
                file.upload.total = e.total;
                file.upload.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                file.upload.progress = 100;
                file.upload.bytesSent = file.upload.total;
            }
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
        else {
            // Handle chunked file uploads
            // Chunked upload is not compatible with uploading multiple files in one
            // request, so we know there's only one file.
            let file = files[0];
            // Since this is a chunked upload, we need to update the appropriate chunk
            // progress.
            let chunk = this._getChunk(file, xhr);
            if (e) {
                chunk.progress = 100 * e.loaded / e.total;
                chunk.total = e.total;
                chunk.bytesSent = e.loaded;
            } else {
                // No event, so we're at 100%
                chunk.progress = 100;
                chunk.bytesSent = chunk.total;
            }
            // Now tally the *file* upload progress from its individual chunks
            file.upload.progress = 0;
            file.upload.total = 0;
            file.upload.bytesSent = 0;
            for(let i = 0; i < file.upload.totalChunkCount; i++)if (file.upload.chunks[i] && typeof file.upload.chunks[i].progress !== "undefined") {
                file.upload.progress += file.upload.chunks[i].progress;
                file.upload.total += file.upload.chunks[i].total;
                file.upload.bytesSent += file.upload.chunks[i].bytesSent;
            }
            // Since the process is a percentage, we need to divide by the amount of
            // chunks we've used.
            file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
            this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
        }
    }
    _finishedUploading(files, xhr, e) {
        let response;
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (xhr.readyState !== 4) return;
        if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
            response = xhr.responseText;
            if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                response = JSON.parse(response);
            } catch (error) {
                e = error;
                response = "Invalid JSON response from server.";
            }
        }
        this._updateFilesUploadProgress(files, xhr);
        if (!(200 <= xhr.status && xhr.status < 300)) this._handleUploadError(files, xhr, response);
        else if (files[0].upload.chunked) files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr), response);
        else this._finished(files, response, e);
    }
    _handleUploadError(files, xhr, response) {
        if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
        if (files[0].upload.chunked && this.options.retryChunks) {
            let chunk = this._getChunk(files[0], xhr);
            if (chunk.retries++ < this.options.retryChunksLimit) {
                this._uploadData(files, [
                    chunk.dataBlock
                ]);
                return;
            } else console.warn("Retried this chunk too often. Giving up.");
        }
        this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
    }
    submitRequest(xhr, formData, files) {
        if (xhr.readyState != 1) {
            console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.");
            return;
        }
        if (this.options.binaryBody) {
            if (files[0].upload.chunked) {
                const chunk = this._getChunk(files[0], xhr);
                xhr.send(chunk.dataBlock.data);
            } else xhr.send(files[0]);
        } else xhr.send(formData);
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _finished(files, responseText, e) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
            this.emit("success", file, responseText, e);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("successmultiple", files, responseText, e);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.
    _errorProcessing(files, message, xhr) {
        for (let file of files){
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR;
            this.emit("error", file, message, xhr);
            this.emit("complete", file);
        }
        if (this.options.uploadMultiple) {
            this.emit("errormultiple", files, message, xhr);
            this.emit("completemultiple", files);
        }
        if (this.options.autoProcessQueue) return this.processQueue();
    }
    static uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c)=>(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
    }
}
$3ed269f2f0fb224b$export$2e2bcd8739ae039.initClass();
// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elements.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
$3ed269f2f0fb224b$export$2e2bcd8739ae039.options = {};
// Returns the options for an element or undefined if none available.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement = function(element) {
    // Get the `Dropzone.options.elementId` for this element if it exists
    if (element.getAttribute("id") && typeof $3ed269f2f0fb224b$export$2e2bcd8739ae039.options !== 'undefined') return $3ed269f2f0fb224b$export$2e2bcd8739ae039.options[$3ed269f2f0fb224b$var$camelize(element.getAttribute("id"))];
    else return undefined;
};
// Holds a list of all dropzone instances
$3ed269f2f0fb224b$export$2e2bcd8739ae039.instances = [];
// Returns the dropzone for given element if any
$3ed269f2f0fb224b$export$2e2bcd8739ae039.forElement = function(element) {
    if (typeof element === "string") element = document.querySelector(element);
    if ((element != null ? element.dropzone : undefined) == null) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    return element.dropzone;
};
// Looks for all .dropzone elements and creates a dropzone for them
$3ed269f2f0fb224b$export$2e2bcd8739ae039.discover = function() {
    let dropzones;
    if (document.querySelectorAll) dropzones = document.querySelectorAll(".dropzone");
    else {
        dropzones = [];
        // IE :(
        let checkElements = (elements)=>(()=>{
                let result = [];
                for (let el of elements)if (/(^| )dropzone($| )/.test(el.className)) result.push(dropzones.push(el));
                else result.push(undefined);
                return result;
            })();
        checkElements(document.getElementsByTagName("div"));
        checkElements(document.getElementsByTagName("form"));
    }
    return (()=>{
        let result = [];
        for (let dropzone of dropzones)// Create a dropzone unless auto discover has been disabled for specific element
        if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(dropzone) !== false) result.push(new $3ed269f2f0fb224b$export$2e2bcd8739ae039(dropzone));
        else result.push(undefined);
        return result;
    })();
};
// Checks if the browser is supported by simply checking if Promise is here: a good cutoff
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported = function() {
    return typeof Promise !== "undefined";
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob = function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for(let i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--)ia[i] = byteString.charCodeAt(i);
    // write the ArrayBuffer to a blob
    return new Blob([
        ab
    ], {
        type: mimeString
    });
};
// Returns an array without the rejected item
const $3ed269f2f0fb224b$var$without = (list, rejectedItem)=>list.filter((item)=>item !== rejectedItem).map((item)=>item);
// abc-def_ghi -> abcDefGhi
const $3ed269f2f0fb224b$var$camelize = (str)=>str.replace(/[\-_](\w)/g, (match)=>match.charAt(1).toUpperCase());
// Creates an element from string
$3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement = function(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
};
// Tests if given element is inside (or simply is) the container
$3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside = function(element, container) {
    if (element === container) return true;
     // Coffeescript doesn't support do/while loops
    while(element = element.parentNode){
        if (element === container) return true;
    }
    return false;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement = function(el, name) {
    let element;
    if (typeof el === "string") element = document.querySelector(el);
    else if (el.nodeType != null) element = el;
    if (element == null) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector or a plain HTML element.`);
    return element;
};
$3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements = function(els, name) {
    let el, elements;
    if (els instanceof Array) {
        elements = [];
        try {
            for (el of els)elements.push(this.getElement(el, name));
        } catch (e) {
            elements = null;
        }
    } else if (typeof els === "string") {
        elements = [];
        for (el of document.querySelectorAll(els))elements.push(el);
    } else if (els.nodeType != null) elements = [
        els
    ];
    if (elements == null || !elements.length) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);
    return elements;
};
// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) return accepted();
    else if (rejected != null) return rejected();
};
// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile = function(file, acceptedFiles) {
    if (!acceptedFiles) return true;
     // If there are no accepted mime types, it's OK
    acceptedFiles = acceptedFiles.split(",");
    let mimeType = file.type;
    let baseMimeType = mimeType.replace(/\/.*$/, "");
    for (let validType of acceptedFiles){
        validType = validType.trim();
        if (validType.charAt(0) === ".") {
            if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) return true;
        } else if (/\/\*$/.test(validType)) {
            // This is something like a image/* mime type
            if (baseMimeType === validType.replace(/\/.*$/, "")) return true;
        } else {
            if (mimeType === validType) return true;
        }
    }
    return false;
};
// Augment jQuery
if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.dropzone = function(options) {
    return this.each(function() {
        return new $3ed269f2f0fb224b$export$2e2bcd8739ae039(this, options);
    });
};
// Dropzone file status codes
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED = "added";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED = "queued";
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ACCEPTED = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
$3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING = "uploading";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.PROCESSING = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING; // alias
$3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED = "canceled";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR = "error";
$3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS = "success";
/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */ // Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
let $3ed269f2f0fb224b$var$detectVerticalSquash = function(img) {
    let ih = img.naturalHeight;
    let canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let { data: data } = ctx.getImageData(1, 0, 1, ih);
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0;
    let ey = ih;
    let py = ih;
    while(py > sy){
        let alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) ey = py;
        else sy = py;
        py = ey + sy >> 1;
    }
    let ratio = py / ih;
    if (ratio === 0) return 1;
    else return ratio;
};
// A replacement for context.drawImage
// (args are for source and destination).
var $3ed269f2f0fb224b$var$drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    let vertSquashRatio = $3ed269f2f0fb224b$var$detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};
// Inspired by MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html
function $3ed269f2f0fb224b$var$removeExif(origFileBase64) {
    var marker = 'data:image/jpeg;base64,';
    if (!origFileBase64.startsWith(marker)) return origFileBase64;
    var origFile = window.atob(origFileBase64.slice(marker.length));
    if (!origFile.startsWith("\xFF\xD8\xFF")) return origFileBase64;
    // loop through the JPEG file segments and copy all but Exif segments into the filtered file.
    var head = 0;
    var filteredFile = "";
    while(head < origFile.length){
        if (origFile.slice(head, head + 2) == "\xFF\xDA") {
            // this is the start of the image data, we don't expect exif data after that.
            filteredFile += origFile.slice(head);
            break;
        } else if (origFile.slice(head, head + 2) == "\xFF\xD8") {
            // this is the global start marker.
            filteredFile += origFile.slice(head, head + 2);
            head += 2;
        } else {
            // we have a segment of variable size.
            var length = origFile.charCodeAt(head + 2) * 256 + origFile.charCodeAt(head + 3);
            var endPoint = head + length + 2;
            var segment = origFile.slice(head, endPoint);
            if (!segment.startsWith("\xFF\xE1")) filteredFile += segment;
            head = endPoint;
        }
    }
    return marker + window.btoa(filteredFile);
}
function $3ed269f2f0fb224b$var$restoreExif(origFileBase64, resizedFileBase64) {
    var marker = 'data:image/jpeg;base64,';
    if (!(origFileBase64.startsWith(marker) && resizedFileBase64.startsWith(marker))) return resizedFileBase64;
    var origFile = window.atob(origFileBase64.slice(marker.length));
    if (!origFile.startsWith("\xFF\xD8\xFF")) return resizedFileBase64;
    // Go through the JPEG file segments one by one and collect any Exif segments we find.
    var head = 0;
    var exifData = "";
    while(head < origFile.length){
        if (origFile.slice(head, head + 2) == "\xFF\xDA") break;
        else if (origFile.slice(head, head + 2) == "\xFF\xD8") // this is the global start marker.
        head += 2;
        else {
            // we have a segment of variable size.
            var length = origFile.charCodeAt(head + 2) * 256 + origFile.charCodeAt(head + 3);
            var endPoint = head + length + 2;
            var segment = origFile.slice(head, endPoint);
            if (segment.startsWith("\xFF\xE1")) exifData += segment;
            head = endPoint;
        }
    }
    if (exifData == "") return resizedFileBase64;
    var resizedFile = window.atob(resizedFileBase64.slice(marker.length));
    if (!resizedFile.startsWith("\xFF\xD8\xFF")) return resizedFileBase64;
    // The first file segment is always header information so insert the Exif data as second segment.
    var splitPoint = 4 + resizedFile.charCodeAt(4) * 256 + resizedFile.charCodeAt(5);
    resizedFile = resizedFile.slice(0, splitPoint) + exifData + resizedFile.slice(splitPoint);
    return marker + window.btoa(resizedFile);
}
function $3ed269f2f0fb224b$var$__guard__(value, transform) {
    return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
}
function $3ed269f2f0fb224b$var$__guardMethod__(obj, methodName, transform) {
    if (typeof obj !== "undefined" && obj !== null && typeof obj[methodName] === "function") return transform(obj, methodName);
    else return undefined;
}



//# sourceMappingURL=dropzone.mjs.map


/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/js/components/clipboard.js"
/*!****************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/clipboard.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var configureClipboard = function configureClipboard() {
  var copy = document.querySelectorAll('[data-clipboard-target]');
  copy.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var button = event.currentTarget;
      navigator.clipboard.writeText(document.querySelector(button.dataset.clipboardTarget).innerText).then(function () {
        // clipboard successfully set
        button.classList.add('is-copied');
        setTimeout(function () {
          button.classList.remove('is-copied');
        }, 2000);
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureClipboard);

/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/js/components/configureTrixToolbar.js"
/*!***************************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/configureTrixToolbar.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var configureTrixToolbar = function configureTrixToolbar() {
  document.querySelectorAll("trix-toolbar").forEach(function (toolbar) {
    var buttonRow = toolbar.querySelector(".trix-button-row");
    var widget = toolbar.closest(".form-widget");
    var editor = widget.querySelector("trix-editor");
    if (!editor) {
      return;
    }
    var id = editor.getAttribute('input');
    var modal = widget.querySelector('.modal-media-choice');
    document.body.appendChild(modal);
    var modalContent = document.querySelector("#modal-media-choice_".concat(id, " .modal-body"));
    if (!buttonRow) {
      return;
    }
    var fetchFolder = function fetchFolder(url) {
      return fetch(url).then(function (response) {
        return response.text();
      });
    };
    var configureModal = function configureModal(html) {
      modalContent.innerHTML = html;
    };
    var handleEdit = function handleEdit(event) {
      event.preventDefault();
      event.stopPropagation();

      // Trigger the media selection modal
      modalContent.innerHTML = "";
      var folder = modal.dataset.folder || '';
      fetchFolder(modal.dataset.href + folder).then(configureModal);
      return false;
    };
    var handleModalClick = function handleModalClick(event) {
      var target = event.target.closest("a");
      if (target === null || target.tagName !== "A" || target.attributes.href === undefined || target.attributes.href.length === 0 || target.attributes.href.value === "#") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (target.dataset.mediaTemplate === undefined || target.dataset.mediaUrl === undefined) {
        // this is not a selectable media
        fetchFolder(target.attributes.href.value).then(configureModal);
        return;
      }
      if (target.dataset.mediaType === 'image') {
        editor.editor.insertHTML(target.dataset.mediaOriginalTemplate);
      } else {
        var attachment = new Trix.Attachment({
          content: target.dataset.mediaOriginalTemplate
        });
        editor.editor.insertAttachment(attachment);
      }
      modal.dataset.folder = target.dataset.mediaFolder || '';
      closeModal();
    };
    var handleModalSubmit = function handleModalSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      var form = event.target.closest("form");
      var formData = new FormData(form);
      var url = form.action;
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then(function (response) {
        return response.text();
      }).then(configureModal);
    };
    var closeModal = function closeModal() {
      var closeButtons = modal.querySelectorAll("[data-bs-dismiss='modal']");
      closeButtons.item(closeButtons.length - 1).dispatchEvent(new Event("click"));
      return;
    };

    // Create a custom button
    var buttonGroup = document.createElement('span');
    buttonGroup.classList.add('trix-button-group', 'trix-button-group--jolimedia-tools');
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-trix-attribute', 'jolimedia');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', "#modal-media-choice_".concat(id));
    button.classList.add('trix-button', 'trix-button--icon', 'trix-button--icon-image');
    button.title = 'Insert media';
    buttonGroup.appendChild(button);
    button.addEventListener("click", handleEdit);
    modal.addEventListener("click", handleModalClick);
    modal.addEventListener("submit", handleModalSubmit);

    // locate the spacer and insert the button group before it
    var spacer = buttonRow.querySelector('.trix-button-group-spacer');
    spacer.before(buttonGroup);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureTrixToolbar);

/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/js/components/dropzone.js"
/*!***************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/dropzone.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _deltablot_dropzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deltablot/dropzone */ "./node_modules/@deltablot/dropzone/dist/dropzone.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var addDropzone = function addDropzone() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var dropzone = element;
  if (dropzone === null) {
    dropzone = document.querySelector('[data-component=dropzone]');
  }
  if (dropzone) {
    var config = dropzone.dataset.dropzoneConfig ? JSON.parse(dropzone.dataset.dropzoneConfig) : {};
    var defaultConfig = {
      addRemoveLinks: false,
      maxFilesize: 20,
      // MB
      paramName: 'upload[file]',
      previewTemplate: dropzone.querySelector('.dz-preview-template').innerHTML,
      thumbnailWidth: 180,
      thumbnailHeight: 109,
      sending: function sending(file, xhr) {
        if (file.previewElement) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var _response$files$;
              var response = JSON.parse(xhr.responseText);
              if (response !== null && response !== void 0 && (_response$files$ = response.files[0]) !== null && _response$files$ !== void 0 && _response$files$.link) {
                var fileInfo = response.files[0];
                var linkElement = file.previewElement.querySelector("[data-dz-link]");
                linkElement.href = fileInfo.link;
                linkElement.setAttribute("data-media-folder", fileInfo.mediaFolder);
                linkElement.setAttribute("data-media-url", fileInfo.mediaUrl);
                linkElement.setAttribute("data-media-full-url", fileInfo.mediaFullUrl);
                linkElement.setAttribute("data-media-template", fileInfo.mediaTemplate);
                if (fileInfo.mediaPreview) {
                  file.previewElement.querySelector("[data-dz-thumbnail]").remove();
                  linkElement.innerHTML = fileInfo.mediaPreview;
                }
              }
            }
          };
        }
      }
    };
    return new _deltablot_dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone(dropzone, _objectSpread(_objectSpread({}, defaultConfig), config));
  }
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDropzone);

/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/js/components/folderSelector.js"
/*!*********************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/folderSelector.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var openFolderChoiceModal = function openFolderChoiceModal(folderChoiceButton) {
  var modal = document.getElementById('modal-folder-choice');
  document.body.appendChild(modal);
  var modalContent = modal.querySelector('.modal-body');
  var pageActions = folderChoiceButton.closest('.page-actions');
  var inputElement = pageActions.querySelector('#move_to');
  var fetchFolder = function fetchFolder(url) {
    return fetch(url).then(function (response) {
      return response.text();
    });
  };
  var configureModal = function configureModal(html) {
    modalContent.innerHTML = html;
  };
  var closeModal = function closeModal() {
    var closeButtons = modal.querySelectorAll("[data-bs-dismiss='modal']");
    closeButtons.item(closeButtons.length - 1).dispatchEvent(new Event("click"));
    return;
  };
  var setFieldValue = function setFieldValue(value) {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("change"));
  };
  var handleModalClick = function handleModalClick(event) {
    var target = event.target.closest("a");
    if (target === null || target.tagName !== "A" || target.attributes.href === undefined || target.attributes.href.length === 0 || target.attributes.href.value === "#") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (target.dataset.folderPath === undefined) {
      // this is not the folder selection button
      fetchFolder(target.attributes.href.value).then(configureModal);
      return;
    }
    setFieldValue(target.dataset.folderPath);
    closeModal();
    document.querySelector('#modal-move p').textContent = target.dataset.confirmation;
    document.querySelector('#modal-move #modal-move-button').addEventListener('click', function () {
      document.querySelector('#move-form').submit();
    });
  };
  var handleModalSubmit = function handleModalSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    var form = event.target.closest("form");
    var formData = new FormData(form);
    var url = form.action;
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(function (response) {
      return response.text();
    }).then(configureModal);
  };
  modal.addEventListener("click", handleModalClick);
  modal.addEventListener("submit", handleModalSubmit);
  configureModal('');
  fetchFolder(folderChoiceButton.attributes.href.value + folderChoiceButton.dataset.folder).then(configureModal);
};
var configureFolderSelector = function configureFolderSelector() {
  var folderSelector = document.querySelector("[data-component=media-move]");
  if (!folderSelector) {
    return;
  }
  folderSelector.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    openFolderChoiceModal(event.currentTarget);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureFolderSelector);

/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/js/components/mediaSelector.js"
/*!********************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/mediaSelector.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var configureMediaChoiceContainer = function configureMediaChoiceContainer(mediaChoiceContainer) {
  var id = mediaChoiceContainer.dataset.mediaId;
  var mediaContainer = document.getElementById("joli-media-container_".concat(id));
  var deleteButton = mediaChoiceContainer.querySelector(".joli-media-choice-delete");
  var editButton = mediaChoiceContainer.querySelector(".joli-media-choice-edit");
  var inputElement = document.getElementById(id);
  var modal = document.getElementById("modal-media-choice_".concat(id));
  document.body.appendChild(modal);
  var modalContent = document.querySelector("#modal-media-choice_".concat(id, " .modal-body"));
  var fetchFolder = function fetchFolder(url) {
    return fetch(url).then(function (response) {
      return response.text();
    });
  };
  var configureModal = function configureModal(html) {
    modalContent.innerHTML = html;
  };
  var closeModal = function closeModal() {
    var closeButtons = modal.querySelectorAll("[data-bs-dismiss='modal']");
    closeButtons.item(closeButtons.length - 1).dispatchEvent(new Event("click"));
    return;
  };
  var setFieldValue = function setFieldValue(value) {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("change"));
  };
  var handleModalClick = function handleModalClick(event) {
    var target = event.target.closest("a");
    if (target === null || target.tagName !== "A" || target.attributes.href === undefined || target.attributes.href.length === 0 || target.attributes.href.value === "#") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (target.dataset.mediaTemplate === undefined || target.dataset.mediaUrl === undefined) {
      // this is not a selectable media
      fetchFolder(target.attributes.href.value).then(configureModal);
      return;
    }
    mediaContainer.innerHTML = target.dataset.mediaTemplate;
    mediaChoiceContainer.classList.remove("empty");
    setFieldValue(target.dataset.mediaUrl);
    editButton.dataset.folder = target.dataset.mediaFolder;
    closeModal();
  };
  var handleDelete = function handleDelete(event) {
    event.preventDefault();
    mediaChoiceContainer.classList.add("empty");
    var template = document.getElementById("template-null-label-".concat(id));
    mediaContainer.innerHTML = "";
    mediaContainer.appendChild(template.content.cloneNode(true));
    editButton.dataset.folder = "";
    setFieldValue("");
    return false;
  };
  var handleEdit = function handleEdit(event) {
    event.preventDefault();
    modalContent.innerHTML = "";
    fetchFolder(editButton.attributes.href.value + editButton.dataset.folder).then(configureModal);
    return false;
  };
  var handleModalSubmit = function handleModalSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    var form = event.target.closest("form");
    var formData = new FormData(form);
    var url = form.action;
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(function (response) {
      return response.text();
    }).then(configureModal);
  };
  deleteButton.addEventListener("click", handleDelete);
  editButton.addEventListener("click", handleEdit);
  modal.addEventListener("click", handleModalClick);
  modal.addEventListener("submit", handleModalSubmit);
  mediaChoiceContainer.dataset.configured = true;
};
var configureMediaSelector = function configureMediaSelector() {
  document.querySelectorAll("form.ea-edit-form, form.ea-new-form").forEach(function (form) {
    return form.addEventListener("click", function (event) {
      var target = event.target.closest(".js-joli-media-choice-container");
      if (target !== null && target.dataset.configured === undefined) {
        configureMediaChoiceContainer(target);
        if (event.target.classList.contains("joli-media-choice-edit")) {
          // force reload the modal content
          event.target.dispatchEvent(new Event("click"));
        }
      }
    });
  });
  document.querySelectorAll(".js-joli-media-choice-container").forEach(configureMediaChoiceContainer);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureMediaSelector);

/***/ },

/***/ "./src/Bridge/EasyAdmin/assets/styles/dropzone.css"
/*!*********************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/styles/dropzone.css ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/joli-media-easy-admin.js ***!
  \*****************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_dropzone_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/dropzone.css */ "./src/Bridge/EasyAdmin/assets/styles/dropzone.css");
/* harmony import */ var _components_dropzone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dropzone */ "./src/Bridge/EasyAdmin/assets/js/components/dropzone.js");
/* harmony import */ var _components_folderSelector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/folderSelector */ "./src/Bridge/EasyAdmin/assets/js/components/folderSelector.js");
/* harmony import */ var _components_mediaSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mediaSelector */ "./src/Bridge/EasyAdmin/assets/js/components/mediaSelector.js");
/* harmony import */ var _components_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/clipboard */ "./src/Bridge/EasyAdmin/assets/js/components/clipboard.js");
/* harmony import */ var _components_configureTrixToolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/configureTrixToolbar */ "./src/Bridge/EasyAdmin/assets/js/components/configureTrixToolbar.js");






document.addEventListener('DOMContentLoaded', function () {
  (0,_components_folderSelector__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_components_mediaSelector__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_components_clipboard__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_components_configureTrixToolbar__WEBPACK_IMPORTED_MODULE_5__["default"])();
  var dropzoneInstance = null;
  var switchTool = function switchTool(target, currentTool) {
    var headerTools = target.closest('.joli-media-header-tools');
    var activeTool = null;
    for (var _i = 0, _arr = ['dropzone', 'new-directory', 'rename-directory']; _i < _arr.length; _i++) {
      var tool = _arr[_i];
      var toolContainer = headerTools.querySelector('.' + tool + '-container');
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
  document.addEventListener('keyup', function (event) {
    if (event.key !== 'Enter') {
      return;
    }
    var component = event.target.closest('[data-component]');
    if (!component) {
      return;
    }
    component.click();
  });
  document.addEventListener('click', function (event) {
    var component = event.target.closest('[data-component]');
    if (!component) {
      return;
    }
    if (component.matches('[data-component=folder-create]')) {
      event.preventDefault();
      event.stopPropagation();
      var folderCreateForm = switchTool(component, 'new-directory');
      folderCreateForm.querySelector('input[type=text]').focus();
    }
    if (component.matches('[data-component=folder-rename]')) {
      event.preventDefault();
      event.stopPropagation();
      var folderRenameForm = switchTool(component, 'rename-directory');
      folderRenameForm.querySelector('input[type=text]').focus();
    }
    if (component.matches('[data-component=media-add]')) {
      event.preventDefault();
      event.stopPropagation();
      var dropzone = switchTool(component, 'dropzone');
      if (!dropzone.classList.contains('dropzone-initialized')) {
        dropzoneInstance = (0,_components_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"])(dropzone.querySelector('[data-component=dropzone]'));
        dropzone.classList.add('dropzone-initialized');
      }
      if (!dropzone.classList.contains('dropzone-active')) {
        dropzoneInstance.removeAllFiles(true);
      }
    }
    if (component.matches('[data-component=media-rename]')) {
      event.preventDefault();
      event.stopPropagation();
      var headerTools = component.closest('.joli-media-header-tools');
      var fileRenameForm = headerTools.querySelector('.rename-file-container');
      fileRenameForm.classList.toggle('rename-active');
      fileRenameForm.querySelector('input[type=text]').focus();
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9saS1tZWRpYS1lYXN5LWFkbWluLmRlMTBkNjNhLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFDQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFVBQVUsU0FBUyxhQUFhO0FBQ3hDLDBDQUEwQyxVQUFVLHNCQUFzQixhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQ0FBbUM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3RELGtCQUFrQjtBQUNsQixjQUFjO0FBQ2Q7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUNBQWlDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSw2QkFBNkI7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUNBQWlDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSwyRkFBMkYsWUFBWTtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFB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c291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWx0YWJsb3QvZHJvcHpvbmUvZGlzdC9kcm9wem9uZS5tanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9FYXN5QWRtaW4vYXNzZXRzL2pzL2NvbXBvbmVudHMvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NvbmZpZ3VyZVRyaXhUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Ryb3B6b25lLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2ZvbGRlclNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL21lZGlhU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9FYXN5QWRtaW4vYXNzZXRzL3N0eWxlcy9kcm9wem9uZS5jc3M/MzM1OCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL0Vhc3lBZG1pbi9hc3NldHMvanMvam9saS1tZWRpYS1lYXN5LWFkbWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBFbWl0dGVyIGNsYXNzIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIGNhbGwgYC5vbigpYCBvbiBEcm9wem9uZSB0byBsaXN0ZW5cbi8vIHRvIGV2ZW50cy5cbi8vIEl0IGlzIHN0cm9uZ2x5IGJhc2VkIG9uIGNvbXBvbmVudCdzIGVtaXR0ZXIgY2xhc3MsIGFuZCBJIHJlbW92ZWQgdGhlXG4vLyBmdW5jdGlvbmFsaXR5IGJlY2F1c2Ugb2YgdGhlIGRlcGVuZGVuY3kgaGVsbCB3aXRoIGRpZmZlcmVudCBmcmFtZXdvcmtzLlxuY2xhc3MgJDQwNDBhY2ZkODU4NDMzOGQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSB7XG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBnaXZlbiBldmVudFxuICAgIG9uKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgIC8vIENyZWF0ZSBuYW1lc3BhY2UgZm9yIHRoaXMgZXZlbnRcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnRdKSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gW107XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudF0ucHVzaChmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbWl0KGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIGZvciAobGV0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcyljYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgLy8gdHJpZ2dlciBhIGNvcnJlc3BvbmRpbmcgRE9NIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KHRoaXMubWFrZUV2ZW50KFwiZHJvcHpvbmU6XCIgKyBldmVudCwge1xuICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBtYWtlRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHBhcmFtcyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSUUgMTEgc3VwcG9ydFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50L0N1c3RvbUV2ZW50XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50LiBJZiBmbiBpcyBub3QgcHJvdmlkZWQsIGFsbCBldmVudFxuICAgIC8vIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCB3aWxsIGJlIHJlbW92ZWQuIElmIG5laXRoZXIgaXMgcHJvdmlkZWQsIGFsbFxuICAgIC8vIGV2ZW50IGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb2ZmKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT09IGZuKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxuXG52YXIgJGI1Y2I1ZjA5NGMyZTE3NjQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSA9IGBcbjxkaXYgY2xhc3M9XCJkei1wcmV2aWV3IGR6LWZpbGUtcHJldmlld1wiPlxuICA8ZGl2IGNsYXNzPVwiZHotaW1hZ2VcIj48aW1nIGRhdGEtZHotdGh1bWJuYWlsIC8+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkei1kZXRhaWxzXCI+XG4gICAgPGRpdiBjbGFzcz1cImR6LXNpemVcIj48c3BhbiBkYXRhLWR6LXNpemU+PC9zcGFuPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkei1maWxlbmFtZVwiPjxzcGFuIGRhdGEtZHotbmFtZT48L3NwYW4+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHotcHJvZ3Jlc3NcIj5cbiAgICA8c3BhbiBjbGFzcz1cImR6LXVwbG9hZFwiIGRhdGEtZHotdXBsb2FkcHJvZ3Jlc3M+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImR6LWVycm9yLW1lc3NhZ2VcIj48c3BhbiBkYXRhLWR6LWVycm9ybWVzc2FnZT48L3NwYW4+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkei1zdWNjZXNzLW1hcmtcIj5cbiAgICA8c3ZnXG4gICAgICB3aWR0aD1cIjU0XCJcbiAgICAgIGhlaWdodD1cIjU0XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNTQgNTRcIlxuICAgICAgZmlsbD1cIndoaXRlXCJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgID5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNMTAuMjA3MSAyOS43OTI5TDE0LjI5MjkgMjUuNzA3MUMxNC42ODM0IDI1LjMxNjYgMTUuMzE2NiAyNS4zMTY2IDE1LjcwNzEgMjUuNzA3MUwyMS4yOTI5IDMxLjI5MjlDMjEuNjgzNCAzMS42ODM0IDIyLjMxNjYgMzEuNjgzNCAyMi43MDcxIDMxLjI5MjlMMzguMjkyOSAxNS43MDcxQzM4LjY4MzQgMTUuMzE2NiAzOS4zMTY2IDE1LjMxNjYgMzkuNzA3MSAxNS43MDcxTDQzLjc5MjkgMTkuNzkyOUM0NC4xODM0IDIwLjE4MzQgNDQuMTgzNCAyMC44MTY2IDQzLjc5MjkgMjEuMjA3MUwyMi43MDcxIDQyLjI5MjlDMjIuMzE2NiA0Mi42ODM0IDIxLjY4MzQgNDIuNjgzNCAyMS4yOTI5IDQyLjI5MjlMMTAuMjA3MSAzMS4yMDcxQzkuODE2NTggMzAuODE2NiA5LjgxNjU4IDMwLjE4MzQgMTAuMjA3MSAyOS43OTI5WlwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImR6LWVycm9yLW1hcmtcIj5cbiAgICA8c3ZnXG4gICAgICB3aWR0aD1cIjU0XCJcbiAgICAgIGhlaWdodD1cIjU0XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNTQgNTRcIlxuICAgICAgZmlsbD1cIndoaXRlXCJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgID5cbiAgICAgIDxwYXRoXG4gICAgICAgIGQ9XCJNMjYuMjkyOSAyMC4yOTI5TDE5LjIwNzEgMTMuMjA3MUMxOC44MTY2IDEyLjgxNjYgMTguMTgzNCAxMi44MTY2IDE3Ljc5MjkgMTMuMjA3MUwxMy4yMDcxIDE3Ljc5MjlDMTIuODE2NiAxOC4xODM0IDEyLjgxNjYgMTguODE2NiAxMy4yMDcxIDE5LjIwNzFMMjAuMjkyOSAyNi4yOTI5QzIwLjY4MzQgMjYuNjgzNCAyMC42ODM0IDI3LjMxNjYgMjAuMjkyOSAyNy43MDcxTDEzLjIwNzEgMzQuNzkyOUMxMi44MTY2IDM1LjE4MzQgMTIuODE2NiAzNS44MTY2IDEzLjIwNzEgMzYuMjA3MUwxNy43OTI5IDQwLjc5MjlDMTguMTgzNCA0MS4xODM0IDE4LjgxNjYgNDEuMTgzNCAxOS4yMDcxIDQwLjc5MjlMMjYuMjkyOSAzMy43MDcxQzI2LjY4MzQgMzMuMzE2NiAyNy4zMTY2IDMzLjMxNjYgMjcuNzA3MSAzMy43MDcxTDM0Ljc5MjkgNDAuNzkyOUMzNS4xODM0IDQxLjE4MzQgMzUuODE2NiA0MS4xODM0IDM2LjIwNzEgNDAuNzkyOUw0MC43OTI5IDM2LjIwNzFDNDEuMTgzNCAzNS44MTY2IDQxLjE4MzQgMzUuMTgzNCA0MC43OTI5IDM0Ljc5MjlMMzMuNzA3MSAyNy43MDcxQzMzLjMxNjYgMjcuMzE2NiAzMy4zMTY2IDI2LjY4MzQgMzMuNzA3MSAyNi4yOTI5TDQwLjc5MjkgMTkuMjA3MUM0MS4xODM0IDE4LjgxNjYgNDEuMTgzNCAxOC4xODM0IDQwLjc5MjkgMTcuNzkyOUwzNi4yMDcxIDEzLjIwNzFDMzUuODE2NiAxMi44MTY2IDM1LjE4MzQgMTIuODE2NiAzNC43OTI5IDEzLjIwNzFMMjcuNzA3MSAyMC4yOTI5QzI3LjMxNjYgMjAuNjgzNCAyNi42ODM0IDIwLjY4MzQgMjYuMjkyOSAyMC4yOTI5WlwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICA8L2Rpdj5cbjwvZGl2PmA7XG5cblxubGV0ICQ0Y2EzNjcxODI3NzZmODBiJHZhciRkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAvKipcbiAgICogSGFzIHRvIGJlIHNwZWNpZmllZCBvbiBlbGVtZW50cyBvdGhlciB0aGFuIGZvcm0gKG9yIHdoZW4gdGhlIGZvcm0gZG9lc24ndFxuICAgKiBoYXZlIGFuIGBhY3Rpb25gIGF0dHJpYnV0ZSkuXG4gICAqXG4gICAqIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kXG4gICAqIGBkYXRhQmxvY2tzYCAgYW5kIG11c3QgcmV0dXJuIHRoZSB1cmwgYXMgc3RyaW5nLlxuICAgKi8gdXJsOiBudWxsLFxuICAgIC8qKlxuICAgKiBDYW4gYmUgY2hhbmdlZCB0byBgXCJwdXRcImAgaWYgbmVjZXNzYXJ5LiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIGZ1bmN0aW9uXG4gICAqIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBgZmlsZXNgIGFuZCBtdXN0IHJldHVybiB0aGUgbWV0aG9kIChzaW5jZSBgdjMuMTIuMGApLlxuICAgKi8gbWV0aG9kOiBcInBvc3RcIixcbiAgICAvKipcbiAgICogV2lsbCBiZSBzZXQgb24gdGhlIFhIUmVxdWVzdC5cbiAgICovIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgLyoqXG4gICAqIFRoZSB0aW1lb3V0IGZvciB0aGUgWEhSIHJlcXVlc3RzIGluIG1pbGxpc2Vjb25kcyAoc2luY2UgYHY0LjQuMGApLlxuICAgKiBJZiBzZXQgdG8gbnVsbCBvciAwLCBubyB0aW1lb3V0IGlzIGdvaW5nIHRvIGJlIHNldC5cbiAgICovIHRpbWVvdXQ6IG51bGwsXG4gICAgLyoqXG4gICAqIEhvdyBtYW55IGZpbGUgdXBsb2FkcyB0byBwcm9jZXNzIGluIHBhcmFsbGVsIChTZWUgdGhlXG4gICAqIEVucXVldWluZyBmaWxlIHVwbG9hZHMgZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm8pXG4gICAqLyBwYXJhbGxlbFVwbG9hZHM6IDIsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc2VuZCBtdWx0aXBsZSBmaWxlcyBpbiBvbmUgcmVxdWVzdC4gSWZcbiAgICogdGhpcyBpdCBzZXQgdG8gdHJ1ZSwgdGhlbiB0aGUgZmFsbGJhY2sgZmlsZSBpbnB1dCBlbGVtZW50IHdpbGxcbiAgICogaGF2ZSB0aGUgYG11bHRpcGxlYCBhdHRyaWJ1dGUgYXMgd2VsbC4gVGhpcyBvcHRpb24gd2lsbFxuICAgKiBhbHNvIHRyaWdnZXIgYWRkaXRpb25hbCBldmVudHMgKGxpa2UgYHByb2Nlc3NpbmdtdWx0aXBsZWApLiBTZWUgdGhlIGV2ZW50c1xuICAgKiBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqLyB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgeW91IHdhbnQgZmlsZXMgdG8gYmUgdXBsb2FkZWQgaW4gY2h1bmtzIHRvIHlvdXIgc2VydmVyLiBUaGlzIGNhbid0IGJlXG4gICAqIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBgdXBsb2FkTXVsdGlwbGVgLlxuICAgKlxuICAgKiBTZWUgW2NodW5rc1VwbG9hZGVkXSgjY29uZmlnLWNodW5rc1VwbG9hZGVkKSBmb3IgdGhlIGNhbGxiYWNrIHRvIGZpbmFsaXNlIGFuIHVwbG9hZC5cbiAgICovIGNodW5raW5nOiBmYWxzZSxcbiAgICAvKipcbiAgICogSWYgYGNodW5raW5nYCBpcyBlbmFibGVkLCB0aGlzIGRlZmluZXMgd2hldGhlciAqKmV2ZXJ5KiogZmlsZSBzaG91bGQgYmUgY2h1bmtlZCxcbiAgICogZXZlbiBpZiB0aGUgZmlsZSBzaXplIGlzIGJlbG93IGNodW5rU2l6ZS4gVGhpcyBtZWFucywgdGhhdCB0aGUgYWRkaXRpb25hbCBjaHVua1xuICAgKiBmb3JtIGRhdGEgd2lsbCBiZSBzdWJtaXR0ZWQgYW5kIHRoZSBgY2h1bmtzVXBsb2FkZWRgIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZC5cbiAgICovIGZvcmNlQ2h1bmtpbmc6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBJZiBgY2h1bmtpbmdgIGlzIGB0cnVlYCwgdGhlbiB0aGlzIGRlZmluZXMgdGhlIGNodW5rIHNpemUgaW4gYnl0ZXMuXG4gICAqLyBjaHVua1NpemU6IDIwOTcxNTIsXG4gICAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGluZGl2aWR1YWwgY2h1bmtzIG9mIGEgZmlsZSBhcmUgYmVpbmcgdXBsb2FkZWQgc2ltdWx0YW5lb3VzbHkuXG4gICAqIFRoZSBsaW1pdCBvZiBjb25jdXJyZW50IGNvbm5lY3Rpb25zIGlzIGdvdmVybmVkIGJ5IGBwYXJhbGxlbFVwbG9hZHNgLlxuICAgKi8gcGFyYWxsZWxDaHVua1VwbG9hZHM6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBXaGV0aGVyIGEgY2h1bmsgc2hvdWxkIGJlIHJldHJpZWQgaWYgaXQgZmFpbHMuXG4gICAqLyByZXRyeUNodW5rczogZmFsc2UsXG4gICAgLyoqXG4gICAqIElmIGByZXRyeUNodW5rc2AgaXMgdHJ1ZSwgaG93IG1hbnkgdGltZXMgc2hvdWxkIGl0IGJlIHJldHJpZWQuXG4gICAqLyByZXRyeUNodW5rc0xpbWl0OiAzLFxuICAgIC8qKlxuICAgKiBUaGUgbWF4aW11bSBmaWxlc2l6ZSAoaW4gTWlCKSB0aGF0IGlzIGFsbG93ZWQgdG8gYmUgdXBsb2FkZWQuXG4gICAqLyBtYXhGaWxlc2l6ZTogMjU2LFxuICAgIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZmlsZSBwYXJhbSB0aGF0IGdldHMgdHJhbnNmZXJyZWQuXG4gICAqICoqTk9URSoqOiBJZiB5b3UgaGF2ZSB0aGUgb3B0aW9uICBgdXBsb2FkTXVsdGlwbGVgIHNldCB0byBgdHJ1ZWAsIHRoZW5cbiAgICogRHJvcHpvbmUgd2lsbCBhcHBlbmQgYFtdYCB0byB0aGUgbmFtZS5cbiAgICovIHBhcmFtTmFtZTogXCJmaWxlXCIsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgdGh1bWJuYWlscyBmb3IgaW1hZ2VzIHNob3VsZCBiZSBnZW5lcmF0ZWRcbiAgICovIGNyZWF0ZUltYWdlVGh1bWJuYWlsczogdHJ1ZSxcbiAgICAvKipcbiAgICogSW4gTUIuIFdoZW4gdGhlIGZpbGVuYW1lIGV4Y2VlZHMgdGhpcyBsaW1pdCwgdGhlIHRodW1ibmFpbCB3aWxsIG5vdCBiZSBnZW5lcmF0ZWQuXG4gICAqLyBtYXhUaHVtYm5haWxGaWxlc2l6ZTogMTAsXG4gICAgLyoqXG4gICAqIElmIGBudWxsYCwgdGhlIHJhdGlvIG9mIHRoZSBpbWFnZSB3aWxsIGJlIHVzZWQgdG8gY2FsY3VsYXRlIGl0LlxuICAgKi8gdGh1bWJuYWlsV2lkdGg6IDEyMCxcbiAgICAvKipcbiAgICogVGhlIHNhbWUgYXMgYHRodW1ibmFpbFdpZHRoYC4gSWYgYm90aCBhcmUgbnVsbCwgaW1hZ2VzIHdpbGwgbm90IGJlIHJlc2l6ZWQuXG4gICAqLyB0aHVtYm5haWxIZWlnaHQ6IDEyMCxcbiAgICAvKipcbiAgICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHRodW1ibmFpbFdpZHRoYCBhbmQgYHRodW1ibmFpbEhlaWdodGAgYXJlIHByb3ZpZGVkLlxuICAgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXG4gICAqLyB0aHVtYm5haWxNZXRob2Q6IFwiY3JvcFwiLFxuICAgIC8qKlxuICAgKiBJZiBzZXQsIGltYWdlcyB3aWxsIGJlIHJlc2l6ZWQgdG8gdGhlc2UgZGltZW5zaW9ucyBiZWZvcmUgYmVpbmcgKip1cGxvYWRlZCoqLlxuICAgKiBJZiBvbmx5IG9uZSwgYHJlc2l6ZVdpZHRoYCAqKm9yKiogYHJlc2l6ZUhlaWdodGAgaXMgcHJvdmlkZWQsIHRoZSBvcmlnaW5hbCBhc3BlY3RcbiAgICogcmF0aW8gb2YgdGhlIGZpbGUgd2lsbCBiZSBwcmVzZXJ2ZWQuXG4gICAqXG4gICAqIFRoZSBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBmdW5jdGlvbiB1c2VzIHRoZXNlIG9wdGlvbnMsIHNvIGlmIHRoZSBgdHJhbnNmb3JtRmlsZWAgZnVuY3Rpb25cbiAgICogaXMgb3ZlcnJpZGRlbiwgdGhlc2Ugb3B0aW9ucyBkb24ndCBkbyBhbnl0aGluZy5cbiAgICovIHJlc2l6ZVdpZHRoOiBudWxsLFxuICAgIC8qKlxuICAgKiBTZWUgYHJlc2l6ZVdpZHRoYC5cbiAgICovIHJlc2l6ZUhlaWdodDogbnVsbCxcbiAgICAvKipcbiAgICogVGhlIG1pbWUgdHlwZSBvZiB0aGUgcmVzaXplZCBpbWFnZSAoYmVmb3JlIGl0IGdldHMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlcikuXG4gICAqIElmIGBudWxsYCB0aGUgb3JpZ2luYWwgbWltZSB0eXBlIHdpbGwgYmUgdXNlZC4gVG8gZm9yY2UganBlZywgZm9yIGV4YW1wbGUsIHVzZSBgaW1hZ2UvanBlZ2AuXG4gICAqIFNlZSBgcmVzaXplV2lkdGhgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi8gcmVzaXplTWltZVR5cGU6IG51bGwsXG4gICAgLyoqXG4gICAqIFRoZSBxdWFsaXR5IG9mIHRoZSByZXNpemVkIGltYWdlcy4gU2VlIGByZXNpemVXaWR0aGAuXG4gICAqLyByZXNpemVRdWFsaXR5OiAwLjgsXG4gICAgLyoqXG4gICAqIEhvdyB0aGUgaW1hZ2VzIHNob3VsZCBiZSBzY2FsZWQgZG93biBpbiBjYXNlIGJvdGgsIGByZXNpemVXaWR0aGAgYW5kIGByZXNpemVIZWlnaHRgIGFyZSBwcm92aWRlZC5cbiAgICogQ2FuIGJlIGVpdGhlciBgY29udGFpbmAgb3IgYGNyb3BgLlxuICAgKi8gcmVzaXplTWV0aG9kOiBcImNvbnRhaW5cIixcbiAgICAvKipcbiAgICogVGhlIGJhc2UgdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgKipkaXNwbGF5ZWQqKiBmaWxlc2l6ZS4gWW91IGNhblxuICAgKiBjaGFuZ2UgdGhpcyB0byAxMDI0IGlmIHlvdSB3b3VsZCByYXRoZXIgZGlzcGxheSBraWJpYnl0ZXMsIG1lYmlieXRlcyxcbiAgICogZXRjLi4uIDEwMjQgaXMgdGVjaG5pY2FsbHkgaW5jb3JyZWN0LCBiZWNhdXNlIGAxMDI0IGJ5dGVzYCBhcmUgYDEga2liaWJ5dGVgXG4gICAqIG5vdCBgMSBraWxvYnl0ZWAuIFlvdSBjYW4gY2hhbmdlIHRoaXMgdG8gYDEwMjRgIGlmIHlvdSBkb24ndCBjYXJlIGFib3V0XG4gICAqIHZhbGlkaXR5LlxuICAgKi8gZmlsZXNpemVCYXNlOiAxMDAwLFxuICAgIC8qKlxuICAgKiBJZiBub3QgYG51bGxgIGRlZmluZXMgaG93IG1hbnkgZmlsZXMgdGhpcyBEcm9wem9uZSBoYW5kbGVzLiBJZiBpdCBleGNlZWRzLFxuICAgKiB0aGUgZXZlbnQgYG1heGZpbGVzZXhjZWVkZWRgIHdpbGwgYmUgY2FsbGVkLiBUaGUgZHJvcHpvbmUgZWxlbWVudCBnZXRzIHRoZVxuICAgKiBjbGFzcyBgZHotbWF4LWZpbGVzLXJlYWNoZWRgIGFjY29yZGluZ2x5IHNvIHlvdSBjYW4gcHJvdmlkZSB2aXN1YWxcbiAgICogZmVlZGJhY2suXG4gICAqLyBtYXhGaWxlczogbnVsbCxcbiAgICAvKipcbiAgICogQW4gb3B0aW9uYWwgb2JqZWN0IHRvIHNlbmQgYWRkaXRpb25hbCBoZWFkZXJzIHRvIHRoZSBzZXJ2ZXIuIEVnOlxuICAgKiBgeyBcIk15LUF3ZXNvbWUtSGVhZGVyXCI6IFwiaGVhZGVyIHZhbHVlXCIgfWBcbiAgICovIGhlYWRlcnM6IG51bGwsXG4gICAgLyoqXG4gICAqIFNob3VsZCB0aGUgZGVmYXVsdCBoZWFkZXJzIGJlIHNldCBvciBub3Q/XG4gICAqIEFjY2VwdDogYXBwbGljYXRpb24vanNvbiA8LSBmb3IgcmVxdWVzdGluZyBqc29uIHJlc3BvbnNlXG4gICAqIENhY2hlLUNvbnRyb2w6IG5vLWNhY2hlIDwtIFJlcXVlc3Qgc2hvdWxkbid0IGJlIGNhY2hlZFxuICAgKiBYLVJlcXVlc3RlZC1XaXRoOiBYTUxIdHRwUmVxdWVzdCA8LSBXZSBzZW50IHRoZSByZXF1ZXN0IHZpYSBYTUxIdHRwUmVxdWVzdFxuICAgKi8gZGVmYXVsdEhlYWRlcnM6IHRydWUsXG4gICAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGRyb3B6b25lIGVsZW1lbnQgaXRzZWxmIHdpbGwgYmUgY2xpY2thYmxlLCBpZiBgZmFsc2VgXG4gICAqIG5vdGhpbmcgd2lsbCBiZSBjbGlja2FibGUuXG4gICAqXG4gICAqIFlvdSBjYW4gYWxzbyBwYXNzIGFuIEhUTUwgZWxlbWVudCwgYSBDU1Mgc2VsZWN0b3IgKGZvciBtdWx0aXBsZSBlbGVtZW50cylcbiAgICogb3IgYW4gYXJyYXkgb2YgdGhvc2UuIEluIHRoYXQgY2FzZSwgYWxsIG9mIHRob3NlIGVsZW1lbnRzIHdpbGwgdHJpZ2dlciBhblxuICAgKiB1cGxvYWQgd2hlbiBjbGlja2VkLlxuICAgKi8gY2xpY2thYmxlOiB0cnVlLFxuICAgIC8qKlxuICAgKiBXaGV0aGVyIGhpZGRlbiBmaWxlcyBpbiBkaXJlY3RvcmllcyBzaG91bGQgYmUgaWdub3JlZC5cbiAgICovIGlnbm9yZUhpZGRlbkZpbGVzOiB0cnVlLFxuICAgIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBgYWNjZXB0YCBjaGVja3MgdGhlIGZpbGUncyBtaW1lIHR5cGUgb3JcbiAgICogZXh0ZW5zaW9uIGFnYWluc3QgdGhpcyBsaXN0LiBUaGlzIGlzIGEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgbWltZVxuICAgKiB0eXBlcyBvciBmaWxlIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIEVnLjogYGltYWdlLyosYXBwbGljYXRpb24vcGRmLC5wc2RgXG4gICAqXG4gICAqIElmIHRoZSBEcm9wem9uZSBpcyBgY2xpY2thYmxlYCB0aGlzIG9wdGlvbiB3aWxsIGFsc28gYmUgdXNlZCBhc1xuICAgKiBbYGFjY2VwdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0KVxuICAgKiBwYXJhbWV0ZXIgb24gdGhlIGhpZGRlbiBmaWxlIGlucHV0IGFzIHdlbGwuXG4gICAqLyBhY2NlcHRlZEZpbGVzOiBudWxsLFxuICAgIC8qKlxuICAgKiBJZiBmYWxzZSwgZmlsZXMgd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVldWUgYnV0IHRoZSBxdWV1ZSB3aWxsIG5vdCBiZVxuICAgKiBwcm9jZXNzZWQgYXV0b21hdGljYWxseS5cbiAgICogVGhpcyBjYW4gYmUgdXNlZnVsIGlmIHlvdSBuZWVkIHNvbWUgYWRkaXRpb25hbCB1c2VyIGlucHV0IGJlZm9yZSBzZW5kaW5nXG4gICAqIGZpbGVzIChvciBpZiB5b3Ugd2FudCB3YW50IGFsbCBmaWxlcyBzZW50IGF0IG9uY2UpLlxuICAgKiBJZiB5b3UncmUgcmVhZHkgdG8gc2VuZCB0aGUgZmlsZSBzaW1wbHkgY2FsbCBgbXlEcm9wem9uZS5wcm9jZXNzUXVldWUoKWAuXG4gICAqXG4gICAqIFNlZSB0aGUgW2VucXVldWluZyBmaWxlIHVwbG9hZHNdKCNlbnF1ZXVpbmctZmlsZS11cGxvYWRzKSBkb2N1bWVudGF0aW9uXG4gICAqIHNlY3Rpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqLyBhdXRvUHJvY2Vzc1F1ZXVlOiB0cnVlLFxuICAgIC8qKlxuICAgKiBJZiBmYWxzZSwgZmlsZXMgYWRkZWQgdG8gdGhlIGRyb3B6b25lIHdpbGwgbm90IGJlIHF1ZXVlZCBieSBkZWZhdWx0LlxuICAgKiBZb3UnbGwgaGF2ZSB0byBjYWxsIGBlbnF1ZXVlRmlsZShmaWxlKWAgbWFudWFsbHkuXG4gICAqLyBhdXRvUXVldWU6IHRydWUsXG4gICAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhpcyB3aWxsIGFkZCBhIGxpbmsgdG8gZXZlcnkgZmlsZSBwcmV2aWV3IHRvIHJlbW92ZSBvciBjYW5jZWwgKGlmXG4gICAqIGFscmVhZHkgdXBsb2FkaW5nKSB0aGUgZmlsZS4gVGhlIGBkaWN0Q2FuY2VsVXBsb2FkYCwgYGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb25gXG4gICAqIGFuZCBgZGljdFJlbW92ZUZpbGVgIG9wdGlvbnMgYXJlIHVzZWQgZm9yIHRoZSB3b3JkaW5nLlxuICAgKi8gYWRkUmVtb3ZlTGlua3M6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBEZWZpbmVzIHdoZXJlIHRvIGRpc3BsYXkgdGhlIGZpbGUgcHJldmlld3Mg4oCTIGlmIGBudWxsYCB0aGVcbiAgICogRHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgaXMgdXNlZC4gQ2FuIGJlIGEgcGxhaW4gYEhUTUxFbGVtZW50YCBvciBhIENTU1xuICAgKiBzZWxlY3Rvci4gVGhlIGVsZW1lbnQgc2hvdWxkIGhhdmUgdGhlIGBkcm9wem9uZS1wcmV2aWV3c2AgY2xhc3Mgc29cbiAgICogdGhlIHByZXZpZXdzIGFyZSBkaXNwbGF5ZWQgcHJvcGVybHkuXG4gICAqLyBwcmV2aWV3c0NvbnRhaW5lcjogbnVsbCxcbiAgICAvKipcbiAgICogU2V0IHRoaXMgdG8gYHRydWVgIGlmIHlvdSBkb24ndCB3YW50IHByZXZpZXdzIHRvIGJlIHNob3duLlxuICAgKi8gZGlzYWJsZVByZXZpZXdzOiBmYWxzZSxcbiAgICAvKipcbiAgICogVGhpcyBpcyB0aGUgZWxlbWVudCB0aGUgaGlkZGVuIGlucHV0IGZpZWxkICh3aGljaCBpcyB1c2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlXG4gICAqIGRyb3B6b25lIHRvIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb24pIHdpbGwgYmUgYXBwZW5kZWQgdG8uIFRoaXMgbWlnaHRcbiAgICogYmUgaW1wb3J0YW50IGluIGNhc2UgeW91IHVzZSBmcmFtZXdvcmtzIHRvIHN3aXRjaCB0aGUgY29udGVudCBvZiB5b3VyIHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSBhIHNlbGVjdG9yIHN0cmluZywgb3IgYW4gZWxlbWVudCBkaXJlY3RseS5cbiAgICovIGhpZGRlbklucHV0Q29udGFpbmVyOiBcImJvZHlcIixcbiAgICAvKipcbiAgICogSWYgbnVsbCwgbm8gY2FwdHVyZSB0eXBlIHdpbGwgYmUgc3BlY2lmaWVkXG4gICAqIElmIGNhbWVyYSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIGNhbWVyYVxuICAgKiBJZiBtaWNyb3Bob25lLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIG1pY3JvcGhvbmVcbiAgICogSWYgY2FtY29yZGVyLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIGNhbWVyYSBpbiB2aWRlbyBtb2RlXG4gICAqIE9uIGFwcGxlIGRldmljZXMgbXVsdGlwbGUgbXVzdCBiZSBzZXQgdG8gZmFsc2UuICBBY2NlcHRlZEZpbGVzIG1heSBuZWVkIHRvXG4gICAqIGJlIHNldCB0byBhbiBhcHByb3ByaWF0ZSBtaW1lIHR5cGUgKGUuZy4gXCJpbWFnZS8qXCIsIFwiYXVkaW8vKlwiLCBvciBcInZpZGVvLypcIikuXG4gICAqLyBjYXB0dXJlOiBudWxsLFxuICAgIC8qKlxuICAgKiAqKkRlcHJlY2F0ZWQqKi4gVXNlIGByZW5hbWVGaWxlYCBpbnN0ZWFkLlxuICAgKi8gcmVuYW1lRmlsZW5hbWU6IG51bGwsXG4gICAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkIGJlZm9yZSB0aGUgZmlsZSBpcyB1cGxvYWRlZCB0byB0aGUgc2VydmVyIGFuZCByZW5hbWVzIHRoZSBmaWxlLlxuICAgKiBUaGlzIGZ1bmN0aW9uIGdldHMgdGhlIGBGaWxlYCBhcyBhcmd1bWVudCBhbmQgY2FuIHVzZSB0aGUgYGZpbGUubmFtZWAuIFRoZSBhY3R1YWwgbmFtZSBvZiB0aGVcbiAgICogZmlsZSB0aGF0IGdldHMgdXNlZCBkdXJpbmcgdGhlIHVwbG9hZCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCBgZmlsZS51cGxvYWQuZmlsZW5hbWVgLlxuICAgKi8gcmVuYW1lRmlsZTogbnVsbCxcbiAgICAvKipcbiAgICogSWYgYHRydWVgIHRoZSBmYWxsYmFjayB3aWxsIGJlIGZvcmNlZC4gVGhpcyBpcyB2ZXJ5IHVzZWZ1bCB0byB0ZXN0IHlvdXIgc2VydmVyXG4gICAqIGltcGxlbWVudGF0aW9ucyBmaXJzdCBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlcnl0aGluZyB3b3JrcyBhc1xuICAgKiBleHBlY3RlZCB3aXRob3V0IGRyb3B6b25lIGlmIHlvdSBleHBlcmllbmNlIHByb2JsZW1zLCBhbmQgdG8gdGVzdFxuICAgKiBob3cgeW91ciBmYWxsYmFja3Mgd2lsbCBsb29rLlxuICAgKi8gZm9yY2VGYWxsYmFjazogZmFsc2UsXG4gICAgLyoqXG4gICAqIFRoZSB0ZXh0IHVzZWQgYmVmb3JlIGFueSBmaWxlcyBhcmUgZHJvcHBlZC5cbiAgICovIGRpY3REZWZhdWx0TWVzc2FnZTogXCJEcm9wIGZpbGVzIGhlcmUgdG8gdXBsb2FkXCIsXG4gICAgLyoqXG4gICAqIFRoZSB0ZXh0IHRoYXQgcmVwbGFjZXMgdGhlIGRlZmF1bHQgbWVzc2FnZSB0ZXh0IGl0IHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAqLyBkaWN0RmFsbGJhY2tNZXNzYWdlOiBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGRyYWcnbidkcm9wIGZpbGUgdXBsb2Fkcy5cIixcbiAgICAvKipcbiAgICogVGhlIHRleHQgdGhhdCB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGUgZmFsbGJhY2sgZm9ybS5cbiAgICogSWYgeW91IHByb3ZpZGUgYSAgZmFsbGJhY2sgZWxlbWVudCB5b3Vyc2VsZiwgb3IgaWYgdGhpcyBvcHRpb24gaXMgYG51bGxgIHRoaXMgd2lsbFxuICAgKiBiZSBpZ25vcmVkLlxuICAgKi8gZGljdEZhbGxiYWNrVGV4dDogXCJQbGVhc2UgdXNlIHRoZSBmYWxsYmFjayBmb3JtIGJlbG93IHRvIHVwbG9hZCB5b3VyIGZpbGVzIGxpa2UgaW4gdGhlIG9sZGVuIGRheXMuXCIsXG4gICAgLyoqXG4gICAqIElmIHRoZSBmaWxlc2l6ZSBpcyB0b28gYmlnLlxuICAgKiBge3tmaWxlc2l6ZX19YCBhbmQgYHt7bWF4RmlsZXNpemV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSByZXNwZWN0aXZlIGNvbmZpZ3VyYXRpb24gdmFsdWVzLlxuICAgKi8gZGljdEZpbGVUb29CaWc6IFwiRmlsZSBpcyB0b28gYmlnICh7e2ZpbGVzaXplfX1NaUIpLiBNYXggZmlsZXNpemU6IHt7bWF4RmlsZXNpemV9fU1pQi5cIixcbiAgICAvKipcbiAgICogSWYgdGhlIGZpbGUgZG9lc24ndCBtYXRjaCB0aGUgZmlsZSB0eXBlLlxuICAgKi8gZGljdEludmFsaWRGaWxlVHlwZTogXCJZb3UgY2FuJ3QgdXBsb2FkIGZpbGVzIG9mIHRoaXMgdHlwZS5cIixcbiAgICAvKipcbiAgICogSWYgdGhlIHNlcnZlciByZXNwb25zZSB3YXMgaW52YWxpZC5cbiAgICogYHt7c3RhdHVzQ29kZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHNlcnZlcnMgc3RhdHVzIGNvZGUuXG4gICAqLyBkaWN0UmVzcG9uc2VFcnJvcjogXCJTZXJ2ZXIgcmVzcG9uZGVkIHdpdGgge3tzdGF0dXNDb2RlfX0gY29kZS5cIixcbiAgICAvKipcbiAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciB0aGUgY2FuY2VsIHVwbG9hZCBsaW5rLlxuICAgKi8gZGljdENhbmNlbFVwbG9hZDogXCJDYW5jZWwgdXBsb2FkXCIsXG4gICAgLyoqXG4gICAqIFRoZSB0ZXh0IHRoYXQgaXMgZGlzcGxheWVkIGlmIGFuIHVwbG9hZCB3YXMgbWFudWFsbHkgY2FuY2VsZWRcbiAgICovIGRpY3RVcGxvYWRDYW5jZWxlZDogXCJVcGxvYWQgY2FuY2VsZWQuXCIsXG4gICAgLyoqXG4gICAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgY29uZmlybWF0aW9uIHdoZW4gY2FuY2VsbGluZyB1cGxvYWQuXG4gICAqLyBkaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWwgdGhpcyB1cGxvYWQ/XCIsXG4gICAgLyoqXG4gICAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCB0byByZW1vdmUgYSBmaWxlLlxuICAgKi8gZGljdFJlbW92ZUZpbGU6IFwiUmVtb3ZlIGZpbGVcIixcbiAgICAvKipcbiAgICogSWYgdGhpcyBpcyBub3QgbnVsbCwgdGhlbiB0aGUgdXNlciB3aWxsIGJlIHByb21wdGVkIGJlZm9yZSByZW1vdmluZyBhIGZpbGUuXG4gICAqLyBkaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbjogbnVsbCxcbiAgICAvKipcbiAgICogRGlzcGxheWVkIGlmIGBtYXhGaWxlc2AgaXMgc3QgYW5kIGV4Y2VlZGVkLlxuICAgKiBUaGUgc3RyaW5nIGB7e21heEZpbGVzfX1gIHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUuXG4gICAqLyBkaWN0TWF4RmlsZXNFeGNlZWRlZDogXCJZb3UgY2Fubm90IHVwbG9hZCBhbnkgbW9yZSBmaWxlcy5cIixcbiAgICAvKipcbiAgICogQWxsb3dzIHlvdSB0byB0cmFuc2xhdGUgdGhlIGRpZmZlcmVudCB1bml0cy4gU3RhcnRpbmcgd2l0aCBgdGJgIGZvciB0ZXJhYnl0ZXMgYW5kIGdvaW5nIGRvd24gdG9cbiAgICogYGJgIGZvciBieXRlcy5cbiAgICovIGRpY3RGaWxlU2l6ZVVuaXRzOiB7XG4gICAgICAgIHRiOiBcIlRCXCIsXG4gICAgICAgIGdiOiBcIkdCXCIsXG4gICAgICAgIG1iOiBcIk1CXCIsXG4gICAgICAgIGtiOiBcIktCXCIsXG4gICAgICAgIGI6IFwiYlwiXG4gICAgfSxcbiAgICAvKipcbiAgICogQ2FsbGVkIHdoZW4gZHJvcHpvbmUgaW5pdGlhbGl6ZWRcbiAgICogWW91IGNhbiBhZGQgZXZlbnQgbGlzdGVuZXJzIGhlcmVcbiAgICovIGluaXQgKCkge30sXG4gICAgLyoqXG4gICAqIENhbiBiZSBhbiAqKm9iamVjdCoqIG9mIGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byB0cmFuc2ZlciB0byB0aGUgc2VydmVyLCAqKm9yKiogYSBgRnVuY3Rpb25gXG4gICAqIHRoYXQgZ2V0cyBpbnZva2VkIHdpdGggdGhlIGBmaWxlc2AsIGB4aHJgIGFuZCwgaWYgaXQncyBhIGNodW5rZWQgdXBsb2FkLCBgY2h1bmtgIGFyZ3VtZW50cy4gSW4gY2FzZVxuICAgKiBvZiBhIGZ1bmN0aW9uLCB0aGlzIG5lZWRzIHRvIHJldHVybiBhIG1hcC5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nIGZvciBub3JtYWwgdXBsb2FkcywgYnV0IGFkZHMgcmVsZXZhbnQgaW5mb3JtYXRpb24gZm9yXG4gICAqIGNodW5rZWQgdXBsb2Fkcy5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgc2FtZSBhcyBhZGRpbmcgaGlkZGVuIGlucHV0IGZpZWxkcyBpbiB0aGUgZm9ybSBlbGVtZW50LlxuICAgKi8gcGFyYW1zIChmaWxlcywgeGhyLCBjaHVuaykge1xuICAgICAgICBpZiAoY2h1bmspIHJldHVybiB7XG4gICAgICAgICAgICBkenV1aWQ6IGNodW5rLmZpbGUudXBsb2FkLnV1aWQsXG4gICAgICAgICAgICBkemNodW5raW5kZXg6IGNodW5rLmluZGV4LFxuICAgICAgICAgICAgZHp0b3RhbGZpbGVzaXplOiBjaHVuay5maWxlLnNpemUsXG4gICAgICAgICAgICBkemNodW5rc2l6ZTogdGhpcy5vcHRpb25zLmNodW5rU2l6ZSxcbiAgICAgICAgICAgIGR6dG90YWxjaHVua2NvdW50OiBjaHVuay5maWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQsXG4gICAgICAgICAgICBkemNodW5rYnl0ZW9mZnNldDogY2h1bmsuaW5kZXggKiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGdldHMgYSBbZmlsZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vRmlsZSlcbiAgICogYW5kIGEgYGRvbmVgIGZ1bmN0aW9uIGFzIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIElmIHRoZSBkb25lIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIHRoZSBmaWxlIGlzIFwiYWNjZXB0ZWRcIiBhbmQgd2lsbFxuICAgKiBiZSBwcm9jZXNzZWQuIElmIHlvdSBwYXNzIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkLCBhbmQgdGhlIGVycm9yXG4gICAqIG1lc3NhZ2Ugd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBub3QgYmUgY2FsbGVkIGlmIHRoZSBmaWxlIGlzIHRvbyBiaWcgb3IgZG9lc24ndCBtYXRjaCB0aGUgbWltZSB0eXBlcy5cbiAgICovIGFjY2VwdCAoZmlsZSwgZG9uZSkge1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIGFsbCBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGZvciBhIGZpbGUuXG4gICAqIEl0IGdldHMgdGhlIGZpbGUgZm9yIHdoaWNoIHRoZSBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsXG4gICAqIGFuZCB0aGUgYGRvbmVgIGZ1bmN0aW9uIGFzIHNlY29uZC4gYGRvbmUoKWAgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIGV2ZXJ5dGhpbmdcbiAgICogbmVlZGVkIHRvIGZpbmlzaCB0aGUgdXBsb2FkIHByb2Nlc3MgaXMgZG9uZS5cbiAgICovIGNodW5rc1VwbG9hZGVkOiBmdW5jdGlvbihmaWxlLCBkb25lKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBTZW5kcyB0aGUgZmlsZSBhcyBiaW5hcnkgYmxvYiBpbiBib2R5IGluc3RlYWQgb2YgZm9ybSBkYXRhLlxuICAgKiBJZiB0aGlzIGlzIHNldCwgdGhlIGBwYXJhbXNgIG9wdGlvbiB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIEl0J3MgYW4gZXJyb3IgdG8gc2V0IHRoaXMgdG8gYHRydWVgIGFsb25nIHdpdGggYHVwbG9hZE11bHRpcGxlYCBzaW5jZVxuICAgKiBtdWx0aXBsZSBmaWxlcyBjYW5ub3QgYmUgaW4gYSBzaW5nbGUgYmluYXJ5IGJvZHkuXG4gICAqLyBiaW5hcnlCb2R5OiBmYWxzZSxcbiAgICAvKipcbiAgICogR2V0cyBjYWxsZWQgd2hlbiB0aGUgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBzaG93cyB0aGUgZmFsbGJhY2sgaW5wdXQgZmllbGQgYW5kIGFkZHNcbiAgICogYSB0ZXh0LlxuICAgKi8gZmFsbGJhY2sgKCkge1xuICAgICAgICAvLyBUaGlzIGNvZGUgc2hvdWxkIHBhc3MgaW4gSUU3Li4uIDooXG4gICAgICAgIGxldCBtZXNzYWdlRWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IGAke3RoaXMuZWxlbWVudC5jbGFzc05hbWV9IGR6LWJyb3dzZXItbm90LXN1cHBvcnRlZGA7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKSlpZiAoLyhefCApZHotbWVzc2FnZSgkfCApLy50ZXN0KGNoaWxkLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50ID0gY2hpbGQ7XG4gICAgICAgICAgICBjaGlsZC5jbGFzc05hbWUgPSBcImR6LW1lc3NhZ2VcIjsgLy8gUmVtb3ZlcyB0aGUgJ2R6LWRlZmF1bHQnIGNsYXNzXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICBtZXNzYWdlRWxlbWVudCA9ICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jcmVhdGVFbGVtZW50KCc8ZGl2IGNsYXNzPVwiZHotbWVzc2FnZVwiPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNwYW4gPSBtZXNzYWdlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIilbMF07XG4gICAgICAgIGlmIChzcGFuKSB7XG4gICAgICAgICAgICBpZiAoc3Bhbi50ZXh0Q29udGVudCAhPSBudWxsKSBzcGFuLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja01lc3NhZ2U7XG4gICAgICAgICAgICBlbHNlIGlmIChzcGFuLmlubmVyVGV4dCAhPSBudWxsKSBzcGFuLmlubmVyVGV4dCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRGYWxsYmFja0Zvcm0oKSk7XG4gICAgfSxcbiAgICAvKipcbiAgICogR2V0cyBjYWxsZWQgdG8gY2FsY3VsYXRlIHRoZSB0aHVtYm5haWwgZGltZW5zaW9ucy5cbiAgICpcbiAgICogSXQgZ2V0cyBgZmlsZWAsIGB3aWR0aGAgYW5kIGBoZWlnaHRgIChib3RoIG1heSBiZSBgbnVsbGApIGFzIHBhcmFtZXRlcnMgYW5kIG11c3QgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nOlxuICAgKlxuICAgKiAgLSBgc3JjV2lkdGhgICYgYHNyY0hlaWdodGAgKHJlcXVpcmVkKVxuICAgKiAgLSBgdHJnV2lkdGhgICYgYHRyZ0hlaWdodGAgKHJlcXVpcmVkKVxuICAgKiAgLSBgc3JjWGAgJiBgc3JjWWAgKG9wdGlvbmFsLCBkZWZhdWx0IGAwYClcbiAgICogIC0gYHRyZ1hgICYgYHRyZ1lgIChvcHRpb25hbCwgZGVmYXVsdCBgMGApXG4gICAqXG4gICAqIFRob3NlIHZhbHVlcyBhcmUgZ29pbmcgdG8gYmUgdXNlZCBieSBgY3R4LmRyYXdJbWFnZSgpYC5cbiAgICovIHJlc2l6ZSAoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKSB7XG4gICAgICAgIGxldCBpbmZvID0ge1xuICAgICAgICAgICAgc3JjWDogMCxcbiAgICAgICAgICAgIHNyY1k6IDAsXG4gICAgICAgICAgICBzcmNXaWR0aDogZmlsZS53aWR0aCxcbiAgICAgICAgICAgIHNyY0hlaWdodDogZmlsZS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNyY1JhdGlvID0gZmlsZS53aWR0aCAvIGZpbGUuaGVpZ2h0O1xuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZSBkaW1lbnNpb25zIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgaWYgKHdpZHRoID09IG51bGwgJiYgaGVpZ2h0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHdpZHRoID0gaW5mby5zcmNXaWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IGluZm8uc3JjSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHdpZHRoID09IG51bGwpIHdpZHRoID0gaGVpZ2h0ICogc3JjUmF0aW87XG4gICAgICAgIGVsc2UgaWYgKGhlaWdodCA9PSBudWxsKSBoZWlnaHQgPSB3aWR0aCAvIHNyY1JhdGlvO1xuICAgICAgICAvLyBNYWtlIHN1cmUgaW1hZ2VzIGFyZW4ndCB1cHNjYWxlZFxuICAgICAgICB3aWR0aCA9IE1hdGgubWluKHdpZHRoLCBpbmZvLnNyY1dpZHRoKTtcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5taW4oaGVpZ2h0LCBpbmZvLnNyY0hlaWdodCk7XG4gICAgICAgIGxldCB0cmdSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBpZiAoaW5mby5zcmNXaWR0aCA+IHdpZHRoIHx8IGluZm8uc3JjSGVpZ2h0ID4gaGVpZ2h0KSB7XG4gICAgICAgICAgICAvLyBJbWFnZSBpcyBiaWdnZXIgYW5kIG5lZWRzIHJlc2NhbGluZ1xuICAgICAgICAgICAgaWYgKHJlc2l6ZU1ldGhvZCA9PT0gXCJjcm9wXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3JjUmF0aW8gPiB0cmdSYXRpbykge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnNyY0hlaWdodCA9IGZpbGUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnNyY1dpZHRoID0gaW5mby5zcmNIZWlnaHQgKiB0cmdSYXRpbztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnNyY1dpZHRoID0gZmlsZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zcmNIZWlnaHQgPSBpbmZvLnNyY1dpZHRoIC8gdHJnUmF0aW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNpemVNZXRob2QgPT09IFwiY29udGFpblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gTWV0aG9kICdjb250YWluJ1xuICAgICAgICAgICAgICAgIGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSBoZWlnaHQgPSB3aWR0aCAvIHNyY1JhdGlvO1xuICAgICAgICAgICAgICAgIGVsc2Ugd2lkdGggPSBoZWlnaHQgKiBzcmNSYXRpbztcbiAgICAgICAgICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzaXplTWV0aG9kICcke3Jlc2l6ZU1ldGhvZH0nYCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5zcmNYID0gKGZpbGUud2lkdGggLSBpbmZvLnNyY1dpZHRoKSAvIDI7XG4gICAgICAgIGluZm8uc3JjWSA9IChmaWxlLmhlaWdodCAtIGluZm8uc3JjSGVpZ2h0KSAvIDI7XG4gICAgICAgIGluZm8udHJnV2lkdGggPSB3aWR0aDtcbiAgICAgICAgaW5mby50cmdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIENhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgZmlsZSAoZm9yIGV4YW1wbGUsIHJlc2l6ZSBhbiBpbWFnZSBpZiBuZWNlc3NhcnkpLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIGByZXNpemVXaWR0aGAgYW5kIGByZXNpemVIZWlnaHRgIChpZiBwcm92aWRlZCkgYW5kIHJlc2l6ZXNcbiAgICogaW1hZ2VzIGFjY29yZGluZyB0byB0aG9zZSBkaW1lbnNpb25zLlxuICAgKlxuICAgKiBHZXRzIHRoZSBgZmlsZWAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgYW5kIGEgYGRvbmUoKWAgZnVuY3Rpb24gYXMgdGhlIHNlY29uZCwgdGhhdCBuZWVkc1xuICAgKiB0byBiZSBpbnZva2VkIHdpdGggdGhlIGZpbGUgd2hlbiB0aGUgdHJhbnNmb3JtYXRpb24gaXMgZG9uZS5cbiAgICovIHRyYW5zZm9ybUZpbGUgKGZpbGUsIGRvbmUpIHtcbiAgICAgICAgaWYgKCh0aGlzLm9wdGlvbnMucmVzaXplV2lkdGggfHwgdGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCkgJiYgZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykpIHJldHVybiB0aGlzLnJlc2l6ZUltYWdlKGZpbGUsIHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCwgdGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCwgdGhpcy5vcHRpb25zLnJlc2l6ZU1ldGhvZCwgZG9uZSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIGRvbmUoZmlsZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICogQSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgdGVtcGxhdGUgdXNlZCBmb3IgZWFjaCBkcm9wcGVkXG4gICAqIGZpbGUuIENoYW5nZSBpdCB0byBmdWxmaWxsIHlvdXIgbmVlZHMgYnV0IG1ha2Ugc3VyZSB0byBwcm9wZXJseVxuICAgKiBwcm92aWRlIGFsbCBlbGVtZW50cy5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gdXNlIGFuIGFjdHVhbCBIVE1MIGVsZW1lbnQgaW5zdGVhZCBvZiBwcm92aWRpbmcgYSBTdHJpbmdcbiAgICogYXMgYSBjb25maWcgb3B0aW9uLCB5b3UgY291bGQgY3JlYXRlIGEgZGl2IHdpdGggdGhlIGlkIGB0cGxgLFxuICAgKiBwdXQgdGhlIHRlbXBsYXRlIGluc2lkZSBpdCBhbmQgcHJvdmlkZSB0aGUgZWxlbWVudCBsaWtlIHRoaXM6XG4gICAqXG4gICAqICAgICBkb2N1bWVudFxuICAgKiAgICAgICAucXVlcnlTZWxlY3RvcignI3RwbCcpXG4gICAqICAgICAgIC5pbm5lckhUTUxcbiAgICpcbiAgICovIHByZXZpZXdUZW1wbGF0ZTogKDAsICRiNWNiNWYwOTRjMmUxNzY0JGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLFxuICAgIC8qXG4gICBUaG9zZSBmdW5jdGlvbnMgcmVnaXN0ZXIgdGhlbXNlbHZlcyB0byB0aGUgZXZlbnRzIG9uIGluaXQgYW5kIGhhbmRsZSBhbGxcbiAgIHRoZSB1c2VyIGludGVyZmFjZSBzcGVjaWZpYyBzdHVmZi4gT3ZlcndyaXRpbmcgdGhlbSB3b24ndCBicmVhayB0aGUgdXBsb2FkXG4gICBidXQgY2FuIGJyZWFrIHRoZSB3YXkgaXQncyBkaXNwbGF5ZWQuXG4gICBZb3UgY2FuIG92ZXJ3cml0ZSB0aGVtIGlmIHlvdSBkb24ndCBsaWtlIHRoZSBkZWZhdWx0IGJlaGF2aW9yLiBJZiB5b3UganVzdFxuICAgd2FudCB0byBhZGQgYW4gYWRkaXRpb25hbCBldmVudCBoYW5kbGVyLCByZWdpc3RlciBpdCBvbiB0aGUgZHJvcHpvbmUgb2JqZWN0XG4gICBhbmQgZG9uJ3Qgb3ZlcndyaXRlIHRob3NlIG9wdGlvbnMuXG4gICAqLyAvLyBUaG9zZSBhcmUgc2VsZiBleHBsYW5hdG9yeSBhbmQgc2ltcGx5IGNvbmNlcm4gdGhlIERyYWduRHJvcC5cbiAgICBkcm9wIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBkcmFnc3RhcnQgKGUpIHt9LFxuICAgIGRyYWdlbmQgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIGRyYWdlbnRlciAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ292ZXIgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIGRyYWdsZWF2ZSAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgcGFzdGUgKGUpIHt9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciB0aGVyZSBhcmUgbm8gZmlsZXMgbGVmdCBpbiB0aGUgZHJvcHpvbmUgYW55bW9yZSwgYW5kIHRoZVxuICAgIC8vIGRyb3B6b25lIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgaWYgaW4gdGhlIGluaXRpYWwgc3RhdGUuXG4gICAgcmVzZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1zdGFydGVkXCIpO1xuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW4gYSBmaWxlIGlzIGFkZGVkIHRvIHRoZSBxdWV1ZVxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgIGFkZGVkZmlsZSAoZmlsZSkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSB0aGlzLnByZXZpZXdzQ29udGFpbmVyKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LXN0YXJ0ZWRcIik7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdzQ29udGFpbmVyICYmICF0aGlzLm9wdGlvbnMuZGlzYWJsZVByZXZpZXdzKSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50ID0gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZpZXdUZW1wbGF0ZS50cmltKCkpO1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3VGVtcGxhdGUgPSBmaWxlLnByZXZpZXdFbGVtZW50OyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcbiAgICAgICAgICAgIGZvciAodmFyIG5vZGUgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotbmFtZV1cIikpbm9kZS50ZXh0Q29udGVudCA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgIGZvciAobm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1zaXplXVwiKSlub2RlLmlubmVySFRNTCA9IHRoaXMuZmlsZXNpemUoZmlsZS5zaXplKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkUmVtb3ZlTGlua3MpIHtcbiAgICAgICAgICAgICAgICBmaWxlLl9yZW1vdmVMaW5rID0gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNyZWF0ZUVsZW1lbnQoYDxhIGNsYXNzPVwiZHotcmVtb3ZlXCIgaHJlZj1cImphdmFzY3JpcHQ6dW5kZWZpbmVkO1wiIGRhdGEtZHotcmVtb3ZlPiR7dGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlfTwvYT5gKTtcbiAgICAgICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmFwcGVuZENoaWxkKGZpbGUuX3JlbW92ZUxpbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlbW92ZUZpbGVFdmVudCA9IChlKT0+e1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLlVQTE9BRElORykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb24pIHJldHVybiAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY29uZmlybSh0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbiwgKCk9PnRoaXMucmVtb3ZlRmlsZShmaWxlKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uKSByZXR1cm4gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNvbmZpcm0odGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uLCAoKT0+dGhpcy5yZW1vdmVGaWxlKGZpbGUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCByZW1vdmVMaW5rIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXJlbW92ZV1cIikpcmVtb3ZlTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlRmlsZUV2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIGEgZmlsZSBpcyByZW1vdmVkLlxuICAgIHJlbW92ZWRmaWxlIChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50ICE9IG51bGwgJiYgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlICE9IG51bGwpIGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbiBhIHRodW1ibmFpbCBoYXMgYmVlbiBnZW5lcmF0ZWRcbiAgICAvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBkYXRhVXJsYFxuICAgIHRodW1ibmFpbCAoZmlsZSwgZGF0YVVybCkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZmlsZS1wcmV2aWV3XCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgdGh1bWJuYWlsRWxlbWVudCBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei10aHVtYm5haWxdXCIpKXtcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmFsdCA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LnNyYyA9IGRhdGFVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKT0+ZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotaW1hZ2UtcHJldmlld1wiKSwgMSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciBhbiBlcnJvciBvY2N1cnNcbiAgICAvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBtZXNzYWdlYFxuICAgIGVycm9yIChmaWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1lcnJvclwiKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIiAmJiBtZXNzYWdlLmVycm9yKSBtZXNzYWdlID0gbWVzc2FnZS5lcnJvcjtcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotZXJyb3JtZXNzYWdlXVwiKSlub2RlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3JtdWx0aXBsZSAoKSB7fSxcbiAgICAvLyBDYWxsZWQgd2hlbiBhIGZpbGUgZ2V0cyBwcm9jZXNzZWQuIFNpbmNlIHRoZXJlIGlzIGEgcXVldWUsIG5vdCBhbGwgYWRkZWRcbiAgICAvLyBmaWxlcyBhcmUgcHJvY2Vzc2VkIGltbWVkaWF0ZWx5LlxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgIHByb2Nlc3NpbmcgKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LXByb2Nlc3NpbmdcIik7XG4gICAgICAgICAgICBpZiAoZmlsZS5fcmVtb3ZlTGluaykgcmV0dXJuIGZpbGUuX3JlbW92ZUxpbmsuaW5uZXJIVE1MID0gdGhpcy5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWQ7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb2Nlc3NpbmdtdWx0aXBsZSAoKSB7fSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlIHVwbG9hZCBwcm9ncmVzcyBnZXRzIHVwZGF0ZWQuXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgLCBgcHJvZ3Jlc3NgIChwZXJjZW50YWdlIDAtMTAwKSBhbmQgYGJ5dGVzU2VudGAuXG4gICAgLy8gVG8gZ2V0IHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgb2YgdGhlIGZpbGUsIHVzZSBgZmlsZS5zaXplYFxuICAgIHVwbG9hZHByb2dyZXNzIChmaWxlLCBwcm9ncmVzcywgYnl0ZXNTZW50KSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSBmb3IgKGxldCBub2RlIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXVwbG9hZHByb2dyZXNzXVwiKSlub2RlLm5vZGVOYW1lID09PSBcIlBST0dSRVNTXCIgPyBub2RlLnZhbHVlID0gcHJvZ3Jlc3MgOiBub2RlLnN0eWxlLndpZHRoID0gYCR7cHJvZ3Jlc3N9JWA7XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlIHRvdGFsIHVwbG9hZCBwcm9ncmVzcyBnZXRzIHVwZGF0ZWQuXG4gICAgLy8gQ2FsbGVkIHdpdGggdG90YWxVcGxvYWRQcm9ncmVzcyAoMC0xMDApLCB0b3RhbEJ5dGVzIGFuZCB0b3RhbEJ5dGVzU2VudFxuICAgIHRvdGFsdXBsb2FkcHJvZ3Jlc3MgKCkge30sXG4gICAgLy8gQ2FsbGVkIGp1c3QgYmVmb3JlIHRoZSBmaWxlIGlzIHNlbnQuIEdldHMgdGhlIGB4aHJgIG9iamVjdCBhcyBzZWNvbmRcbiAgICAvLyBwYXJhbWV0ZXIsIHNvIHlvdSBjYW4gbW9kaWZ5IGl0IChmb3IgZXhhbXBsZSB0byBhZGQgYSBDU1JGIHRva2VuKSBhbmQgYVxuICAgIC8vIGBmb3JtRGF0YWAgb2JqZWN0IHRvIGFkZCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICAgIHNlbmRpbmcgKCkge30sXG4gICAgc2VuZGluZ211bHRpcGxlICgpIHt9LFxuICAgIC8vIFdoZW4gdGhlIGNvbXBsZXRlIHVwbG9hZCBpcyBmaW5pc2hlZCBhbmQgc3VjY2Vzc2Z1bFxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgIHN1Y2Nlc3MgKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1zdWNjZXNzXCIpO1xuICAgIH0sXG4gICAgc3VjY2Vzc211bHRpcGxlICgpIHt9LFxuICAgIC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBjYW5jZWxlZC5cbiAgICBjYW5jZWxlZCAoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgZmlsZSwgdGhpcy5vcHRpb25zLmRpY3RVcGxvYWRDYW5jZWxlZCk7XG4gICAgfSxcbiAgICBjYW5jZWxlZG11bHRpcGxlICgpIHt9LFxuICAgIC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBmaW5pc2hlZCwgZWl0aGVyIHdpdGggc3VjY2VzcyBvciBhbiBlcnJvci5cbiAgICAvLyBSZWNlaXZlcyBgZmlsZWBcbiAgICBjb21wbGV0ZSAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5fcmVtb3ZlTGluaykgZmlsZS5fcmVtb3ZlTGluay5pbm5lckhUTUwgPSB0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGU7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSByZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotY29tcGxldGVcIik7XG4gICAgfSxcbiAgICBjb21wbGV0ZW11bHRpcGxlICgpIHt9LFxuICAgIG1heGZpbGVzZXhjZWVkZWQgKCkge30sXG4gICAgbWF4ZmlsZXNyZWFjaGVkICgpIHt9LFxuICAgIHF1ZXVlY29tcGxldGUgKCkge30sXG4gICAgYWRkZWRmaWxlcyAoKSB7fSxcbiAgICBlbXB0eWZvbGRlciAoKSB7fVxufTtcbnZhciAkNGNhMzY3MTgyNzc2ZjgwYiRleHBvcnQkMmUyYmNkODczOWFlMDM5ID0gJDRjYTM2NzE4Mjc3NmY4MGIkdmFyJGRlZmF1bHRPcHRpb25zO1xuXG5cbmNsYXNzICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgZXh0ZW5kcyAoMCwgJDQwNDBhY2ZkODU4NDMzOGQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkge1xuICAgIHN0YXRpYyBpbml0Q2xhc3MoKSB7XG4gICAgICAgIC8vIEV4cG9zaW5nIHRoZSBlbWl0dGVyIGNsYXNzLCBtYWlubHkgZm9yIHRlc3RzXG4gICAgICAgIHRoaXMucHJvdG90eXBlLkVtaXR0ZXIgPSAoMCwgJDQwNDBhY2ZkODU4NDMzOGQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSk7XG4gICAgICAgIC8qXG4gICAgIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgZXZlbnRzIHlvdSBjYW4gcmVnaXN0ZXIgb24gYSBkcm9wem9uZSBvYmplY3QuXG5cbiAgICAgWW91IGNhbiByZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIGxpa2UgdGhpczpcblxuICAgICBkcm9wem9uZS5vbihcImRyYWdFbnRlclwiLCBmdW5jdGlvbigpIHsgfSk7XG5cbiAgICAgKi8gdGhpcy5wcm90b3R5cGUuZXZlbnRzID0gW1xuICAgICAgICAgICAgXCJkcm9wXCIsXG4gICAgICAgICAgICBcImRyYWdzdGFydFwiLFxuICAgICAgICAgICAgXCJkcmFnZW5kXCIsXG4gICAgICAgICAgICBcImRyYWdlbnRlclwiLFxuICAgICAgICAgICAgXCJkcmFnb3ZlclwiLFxuICAgICAgICAgICAgXCJkcmFnbGVhdmVcIixcbiAgICAgICAgICAgIFwiYWRkZWRmaWxlXCIsXG4gICAgICAgICAgICBcImFkZGVkZmlsZXNcIixcbiAgICAgICAgICAgIFwicmVtb3ZlZGZpbGVcIixcbiAgICAgICAgICAgIFwidGh1bWJuYWlsXCIsXG4gICAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICAgICBcImVycm9ybXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwicHJvY2Vzc2luZ1wiLFxuICAgICAgICAgICAgXCJwcm9jZXNzaW5nbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwidXBsb2FkcHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIFwidG90YWx1cGxvYWRwcm9ncmVzc1wiLFxuICAgICAgICAgICAgXCJzZW5kaW5nXCIsXG4gICAgICAgICAgICBcInNlbmRpbmdtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBcInN1Y2Nlc3NtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJjYW5jZWxlZFwiLFxuICAgICAgICAgICAgXCJjYW5jZWxlZG11bHRpcGxlXCIsXG4gICAgICAgICAgICBcImNvbXBsZXRlXCIsXG4gICAgICAgICAgICBcImNvbXBsZXRlbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwicmVzZXRcIixcbiAgICAgICAgICAgIFwibWF4ZmlsZXNleGNlZWRlZFwiLFxuICAgICAgICAgICAgXCJtYXhmaWxlc3JlYWNoZWRcIixcbiAgICAgICAgICAgIFwicXVldWVjb21wbGV0ZVwiLFxuICAgICAgICAgICAgXCJlbXB0eWZvbGRlclwiXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMucHJvdG90eXBlLl90aHVtYm5haWxRdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGxldCBmYWxsYmFjaywgbGVmdDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWw7XG4gICAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdOyAvLyBBbGwgZmlsZXNcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGFjdHVhbGx5IGhhdmUgYW4gSFRNTCBFbGVtZW50XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IG51bGwgfHwgIXRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRyb3B6b25lIGVsZW1lbnQ6IG5vdCBhbiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudC5cIik7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZHJvcHpvbmUpIHRocm93IG5ldyBFcnJvcihcIkRyb3B6b25lIGFscmVhZHkgYXR0YWNoZWQuXCIpO1xuICAgICAgICAvLyBOb3cgYWRkIHRoaXMgZHJvcHpvbmUgdG8gdGhlIGluc3RhbmNlcy5cbiAgICAgICAgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbnN0YW5jZXMucHVzaCh0aGlzKTtcbiAgICAgICAgLy8gUHV0IHRoZSBkcm9wem9uZSBpbnNpZGUgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICAgICAgICB0aGlzLmVsZW1lbnQuZHJvcHpvbmUgPSB0aGlzO1xuICAgICAgICBsZXQgZWxlbWVudE9wdGlvbnMgPSAobGVmdCA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9uc0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSkgIT0gbnVsbCA/IGxlZnQgOiB7fTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgKDAsICQ0Y2EzNjcxODI3NzZmODBiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLCBlbGVtZW50T3B0aW9ucywgb3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucyA6IHt9KTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnByZXZpZXdUZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUucmVwbGFjZSgvXFxuKi9nLCBcIlwiKTtcbiAgICAgICAgLy8gSWYgdGhlIGJyb3dzZXIgZmFpbGVkLCBqdXN0IGNhbGwgdGhlIGZhbGxiYWNrIGFuZCBsZWF2ZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZvcmNlRmFsbGJhY2sgfHwgISQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNCcm93c2VyU3VwcG9ydGVkKCkpIHJldHVybiB0aGlzLm9wdGlvbnMuZmFsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgLy8gQG9wdGlvbnMudXJsID0gQGVsZW1lbnQuZ2V0QXR0cmlidXRlIFwiYWN0aW9uXCIgdW5sZXNzIEBvcHRpb25zLnVybD9cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cmwgPT0gbnVsbCkgdGhpcy5vcHRpb25zLnVybCA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnVybCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gVVJMIHByb3ZpZGVkLlwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSAmJiB0aGlzLm9wdGlvbnMuY2h1bmtpbmcpIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3Qgc2V0IGJvdGg6IHVwbG9hZE11bHRpcGxlIGFuZCBjaHVua2luZy5cIik7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmluYXJ5Qm9keSAmJiB0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3Qgc2V0IGJvdGg6IGJpbmFyeUJvZHkgYW5kIHVwbG9hZE11bHRpcGxlLlwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMubWV0aG9kID09PSBcInN0cmluZ1wiKSB0aGlzLm9wdGlvbnMubWV0aG9kID0gdGhpcy5vcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAoKGZhbGxiYWNrID0gdGhpcy5nZXRFeGlzdGluZ0ZhbGxiYWNrKCkpICYmIGZhbGxiYWNrLnBhcmVudE5vZGUpIC8vIFJlbW92ZSB0aGUgZmFsbGJhY2tcbiAgICAgICAgZmFsbGJhY2sucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmYWxsYmFjayk7XG4gICAgICAgIC8vIERpc3BsYXkgcHJldmlld3MgaW4gdGhlIHByZXZpZXdzQ29udGFpbmVyIGVsZW1lbnQgb3IgdGhlIERyb3B6b25lIGVsZW1lbnQgdW5sZXNzIGV4cGxpY2l0bHkgc2V0IHRvIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyKSB0aGlzLnByZXZpZXdzQ29udGFpbmVyID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5nZXRFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciwgXCJwcmV2aWV3c0NvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrYWJsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja2FibGUgPT09IHRydWUpIHRoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5nZXRFbGVtZW50cyh0aGlzLm9wdGlvbnMuY2xpY2thYmxlLCBcImNsaWNrYWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gYWNjZXB0ZWRcbiAgICBnZXRBY2NlcHRlZEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLmFjY2VwdGVkKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gcmVqZWN0ZWRcbiAgICAvLyBOb3Qgc3VyZSB3aGVuIHRoYXQncyBnb2luZyB0byBiZSB1c2VmdWwsIGJ1dCBhZGRlZCBmb3IgY29tcGxldGVuZXNzLlxuICAgIGdldFJlamVjdGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PiFmaWxlLmFjY2VwdGVkKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgZ2V0RmlsZXNXaXRoU3RhdHVzKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLnN0YXR1cyA9PT0gc3RhdHVzKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlXG4gICAgZ2V0UXVldWVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRCk7XG4gICAgfVxuICAgIGdldFVwbG9hZGluZ0ZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcpO1xuICAgIH1cbiAgICBnZXRBZGRlZEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCk7XG4gICAgfVxuICAgIC8vIEZpbGVzIHRoYXQgYXJlIGVpdGhlciBxdWV1ZWQgb3IgdXBsb2FkaW5nXG4gICAgZ2V0QWN0aXZlRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORyB8fCBmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5RVUVVRUQpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICAvLyBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCB3aGVuIERyb3B6b25lIGlzIGluaXRpYWxpemVkLiBZb3VcbiAgICAvLyBjYW4gKGFuZCBzaG91bGQpIHNldHVwIGV2ZW50IGxpc3RlbmVycyBpbnNpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBJbiBjYXNlIGl0IGlzbid0IHNldCBhbHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gXCJmb3JtXCIpIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJlbmN0eXBlXCIsIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiKTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSAmJiAhdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHotbWVzc2FnZVwiKSkgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuY3JlYXRlRWxlbWVudChgPGRpdiBjbGFzcz1cImR6LWRlZmF1bHQgZHotbWVzc2FnZVwiPjxidXR0b24gY2xhc3M9XCJkei1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+JHt0aGlzLm9wdGlvbnMuZGljdERlZmF1bHRNZXNzYWdlfTwvYnV0dG9uPjwvZGl2PmApKTtcbiAgICAgICAgaWYgKHRoaXMuY2xpY2thYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgc2V0dXBIaWRkZW5GaWxlSW5wdXQgPSAoKT0+e1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGRlbkZpbGVJbnB1dCkgdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQodGhpcy5oaWRkZW5GaWxlSW5wdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJmaWxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImZvcm1cIiwgdGhpcy5lbGVtZW50LmlkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzID09PSBudWxsIHx8IHRoaXMub3B0aW9ucy5tYXhGaWxlcyA+IDEpIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuY2xhc3NOYW1lID0gXCJkei1oaWRkZW4taW5wdXRcIjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgIT09IG51bGwpIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jYXB0dXJlICE9PSBudWxsKSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjYXB0dXJlXCIsIHRoaXMub3B0aW9ucy5jYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAvLyBNYWtpbmcgc3VyZSB0aGF0IG5vIG9uZSBjYW4gXCJ0YWJcIiBpbnRvIHRoaXMgZmllbGQuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYXJpYWxhYmVsIGZvciBhMTF5XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcImRyb3B6b25lIGhpZGRlbiBpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAvLyBOb3Qgc2V0dGluZyBgZGlzcGxheT1cIm5vbmVcImAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRvbid0IGFjY2VwdCBjbGlja3NcbiAgICAgICAgICAgICAgICAvLyBvbiBlbGVtZW50cyB0aGF0IGFyZW4ndCBkaXNwbGF5ZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLndpZHRoID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5nZXRFbGVtZW50KHRoaXMub3B0aW9ucy5oaWRkZW5JbnB1dENvbnRhaW5lciwgXCJoaWRkZW5JbnB1dENvbnRhaW5lclwiKS5hcHBlbmRDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgeyBmaWxlczogZmlsZXMgfSA9IHRoaXMuaGlkZGVuRmlsZUlucHV0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXRoaXMuYWRkRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiYWRkZWRmaWxlc1wiLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgIHNldHVwSGlkZGVuRmlsZUlucHV0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0dXBIaWRkZW5GaWxlSW5wdXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlVSTCA9IHdpbmRvdy5VUkwgIT09IG51bGwgPyB3aW5kb3cuVVJMIDogd2luZG93LndlYmtpdFVSTDtcbiAgICAgICAgLy8gU2V0dXAgYWxsIGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgRHJvcHpvbmUgb2JqZWN0IGl0c2VsZi5cbiAgICAgICAgLy8gVGhleSdyZSBub3QgaW4gQHNldHVwRXZlbnRMaXN0ZW5lcnMoKSBiZWNhdXNlIHRoZXkgc2hvdWxkbid0IGJlIHJlbW92ZWRcbiAgICAgICAgLy8gYWdhaW4gd2hlbiB0aGUgZHJvcHpvbmUgZ2V0cyBkaXNhYmxlZC5cbiAgICAgICAgZm9yIChsZXQgZXZlbnROYW1lIG9mIHRoaXMuZXZlbnRzKXRoaXMub24oZXZlbnROYW1lLCB0aGlzLm9wdGlvbnNbZXZlbnROYW1lXSk7XG4gICAgICAgIHRoaXMub24oXCJ1cGxvYWRwcm9ncmVzc1wiLCAoKT0+dGhpcy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkpO1xuICAgICAgICB0aGlzLm9uKFwicmVtb3ZlZGZpbGVcIiwgKCk9PnRoaXMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpKTtcbiAgICAgICAgdGhpcy5vbihcImNhbmNlbGVkXCIsIChmaWxlKT0+dGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSkpO1xuICAgICAgICAvLyBFbWl0IGEgYHF1ZXVlY29tcGxldGVgIGV2ZW50IGlmIGFsbCBmaWxlcyBmaW5pc2hlZCB1cGxvYWRpbmcuXG4gICAgICAgIHRoaXMub24oXCJjb21wbGV0ZVwiLCAoZmlsZSk9PntcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEFkZGVkRmlsZXMoKS5sZW5ndGggPT09IDAgJiYgdGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdldFF1ZXVlZEZpbGVzKCkubGVuZ3RoID09PSAwKSAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlZmVycmVkIHNvIHRoYXQgYHF1ZXVlY29tcGxldGVgIHJlYWxseSB0cmlnZ2VycyBhZnRlciBgY29tcGxldGVgXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKT0+dGhpcy5lbWl0KFwicXVldWVjb21wbGV0ZVwiKSwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjb250YWluc0ZpbGVzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuZGF0YVRyYW5zZmVyLnR5cGVzICYmIGUuZGF0YVRyYW5zZmVyLnR5cGVzLmluY2x1ZGVzKFwiRmlsZXNcIik7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBub1Byb3BhZ2F0aW9uID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGZpbGVzLCB3ZSBkb24ndCB3YW50IHRvIHN0b3BcbiAgICAgICAgICAgIC8vIHByb3BhZ2F0aW9uIHNvIHdlIGRvbid0IGludGVyZmVyZSB3aXRoIG90aGVyXG4gICAgICAgICAgICAvLyBkcmFnIGFuZCBkcm9wIGJlaGF2aW91ci5cbiAgICAgICAgICAgIGlmICghY29udGFpbnNGaWxlcyhlKSkgcmV0dXJuO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0OiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJkcmFnc3RhcnRcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRyYWdlbnRlcjogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdlbnRlclwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ292ZXI6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZXMgaXQgcG9zc2libGUgdG8gZHJhZyBmaWxlcyBmcm9tIGNocm9tZSdzIGRvd25sb2FkIGJhclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTUyNjQzMC9kcmFnLWFuZC1kcm9wLWZpbGUtdXBsb2Fkcy1mcm9tLWNocm9tZS1kb3dubG9hZHMtYmFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlZmN0ID0gZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIiA9PT0gZWZjdCB8fCBcImxpbmtNb3ZlXCIgPT09IGVmY3QgPyBcIm1vdmVcIiA6IFwiY29weVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9Qcm9wYWdhdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJkcmFnb3ZlclwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2xlYXZlOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJkcmFnbGVhdmVcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRyb3A6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9Qcm9wYWdhdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3AoZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRyYWdlbmQ6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdlbmRcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaCgoY2xpY2thYmxlRWxlbWVudCk9PntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBjbGlja2FibGVFbGVtZW50LFxuICAgICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogKGV2dCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgdGhlIGFjdHVhbCBkcm9wem9uZSBvciB0aGUgbWVzc2FnZSBlbGVtZW50IHNob3VsZCB0cmlnZ2VyIGZpbGUgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2thYmxlRWxlbWVudCAhPT0gdGhpcy5lbGVtZW50IHx8IGV2dC50YXJnZXQgPT09IHRoaXMuZWxlbWVudCB8fCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmVsZW1lbnRJbnNpZGUoZXZ0LnRhcmdldCwgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHotbWVzc2FnZVwiKSkpIHRoaXMuaGlkZGVuRmlsZUlucHV0LmNsaWNrKCk7IC8vIEZvcndhcmQgdGhlIGNsaWNrXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5pbml0LmNhbGwodGhpcyk7XG4gICAgfVxuICAgIC8vIE5vdCBmdWxseSB0ZXN0ZWQgeWV0XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRmlsZXModHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbkZpbGVJbnB1dCAhPSBudWxsID8gdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZSA6IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudC5kcm9wem9uZTtcbiAgICAgICAgcmV0dXJuICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzLnNwbGljZSgkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcy5pbmRleE9mKHRoaXMpLCAxKTtcbiAgICB9XG4gICAgdXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpIHtcbiAgICAgICAgbGV0IHRvdGFsVXBsb2FkUHJvZ3Jlc3M7XG4gICAgICAgIGxldCB0b3RhbEJ5dGVzU2VudCA9IDA7XG4gICAgICAgIGxldCB0b3RhbEJ5dGVzID0gMDtcbiAgICAgICAgbGV0IGFjdGl2ZUZpbGVzID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpO1xuICAgICAgICBpZiAoYWN0aXZlRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZ2V0QWN0aXZlRmlsZXMoKSl7XG4gICAgICAgICAgICAgICAgdG90YWxCeXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuYnl0ZXNTZW50O1xuICAgICAgICAgICAgICAgIHRvdGFsQnl0ZXMgKz0gZmlsZS51cGxvYWQudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbFVwbG9hZFByb2dyZXNzID0gMTAwICogdG90YWxCeXRlc1NlbnQgLyB0b3RhbEJ5dGVzO1xuICAgICAgICB9IGVsc2UgdG90YWxVcGxvYWRQcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcInRvdGFsdXBsb2FkcHJvZ3Jlc3NcIiwgdG90YWxVcGxvYWRQcm9ncmVzcywgdG90YWxCeXRlcywgdG90YWxCeXRlc1NlbnQpO1xuICAgIH1cbiAgICAvLyBAb3B0aW9ucy5wYXJhbU5hbWUgY2FuIGJlIGEgZnVuY3Rpb24gdGFraW5nIG9uZSBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYSBzdHJpbmcuXG4gICAgLy8gQSBwYXJhbWV0ZXIgbmFtZSBmb3IgYSBmaWxlIGlzIG9idGFpbmVkIHNpbXBseSBieSBjYWxsaW5nIHRoaXMgd2l0aCBhbiBpbmRleCBudW1iZXIuXG4gICAgX2dldFBhcmFtTmFtZShuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnBhcmFtTmFtZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtTmFtZShuKTtcbiAgICAgICAgZWxzZSByZXR1cm4gYCR7dGhpcy5vcHRpb25zLnBhcmFtTmFtZX0ke3RoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSA/IGBbJHtufV1gIDogXCJcIn1gO1xuICAgIH1cbiAgICAvLyBJZiBAb3B0aW9ucy5yZW5hbWVGaWxlIGlzIGEgZnVuY3Rpb24sXG4gICAgLy8gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byByZW5hbWUgdGhlIGZpbGUubmFtZSBiZWZvcmUgYXBwZW5kaW5nIGl0IHRvIHRoZSBmb3JtRGF0YS5cbiAgICAvLyBNYWNPUyAxNCsgc2NyZWVuc2hvdHMgY29udGFpbiBuYXJyb3cgbm9uLWJyZWFraW5nIHNwYWNlIChVKzIwMkYpIGNoYXJhY3RlcnMgaW4gZmlsZW5hbWVzIFxuICAgIC8vIChlLmcuLCBcIlNjcmVlbnNob3QgMjAyNC0wMS0zMCBhdCAxMC4zMi4wNyBBTS5wbmdcIiB3aGVyZSB0aGUgc3BhY2UgYWZ0ZXIgXCIwN1wiIGFuZCBiZWZvcmUgXCJBTVwiIGlzIFUrMjAyRikuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBub3cgcmVwbGFjZXMgdGhlc2Ugd2l0aCByZWd1bGFyIHNwYWNlcyB0byBwcmV2ZW50IHVwbG9hZCBpc3N1ZXMgYW5kIG1haW50YWluIGNvbXBhdGliaWxpdHkgd2l0aCBNYWNPU1xuICAgIF9yZW5hbWVGaWxlKGZpbGUpIHtcbiAgICAgICAgY29uc3QgY2xlYW5GaWxlID0ge1xuICAgICAgICAgICAgLi4uZmlsZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZS5yZXBsYWNlKC9cXHUyMDJGL2csICcgJylcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucmVuYW1lRmlsZSAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gY2xlYW5GaWxlLm5hbWU7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVuYW1lRmlsZShjbGVhbkZpbGUpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGEgZm9ybSB0aGF0IGNhbiBiZSB1c2VkIGFzIGZhbGxiYWNrIGlmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgRHJhZ25Ecm9wXG4gICAgLy9cbiAgICAvLyBJZiB0aGUgZHJvcHpvbmUgaXMgYWxyZWFkeSBhIGZvcm0sIG9ubHkgdGhlIGlucHV0IGZpZWxkIGFuZCBidXR0b24gYXJlIHJldHVybmVkLiBPdGhlcndpc2UgYSBjb21wbGV0ZSBmb3JtIGVsZW1lbnQgaXMgcHJvdmlkZWQuXG4gICAgLy8gVGhpcyBjb2RlIGhhcyB0byBwYXNzIGluIElFNyA6KFxuICAgIGdldEZhbGxiYWNrRm9ybSgpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nRmFsbGJhY2ssIGZvcm07XG4gICAgICAgIGlmIChleGlzdGluZ0ZhbGxiYWNrID0gdGhpcy5nZXRFeGlzdGluZ0ZhbGxiYWNrKCkpIHJldHVybiBleGlzdGluZ0ZhbGxiYWNrO1xuICAgICAgICBsZXQgZmllbGRzU3RyaW5nID0gJzxkaXYgY2xhc3M9XCJkei1mYWxsYmFja1wiPic7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrVGV4dCkgZmllbGRzU3RyaW5nICs9IGA8cD4ke3RoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tUZXh0fTwvcD5gO1xuICAgICAgICBmaWVsZHNTdHJpbmcgKz0gYDxpbnB1dCB0eXBlPVwiZmlsZVwiIG5hbWU9XCIke3RoaXMuX2dldFBhcmFtTmFtZSgwKX1cIiAke3RoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSA/ICdtdWx0aXBsZT1cIm11bHRpcGxlXCInIDogdW5kZWZpbmVkfSAvPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJVcGxvYWQhXCI+PC9kaXY+YDtcbiAgICAgICAgbGV0IGZpZWxkcyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuY3JlYXRlRWxlbWVudChmaWVsZHNTdHJpbmcpO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgIT09IFwiRk9STVwiKSB7XG4gICAgICAgICAgICBmb3JtID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50KGA8Zm9ybSBhY3Rpb249XCIke3RoaXMub3B0aW9ucy51cmx9XCIgZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiBtZXRob2Q9XCIke3RoaXMub3B0aW9ucy5tZXRob2R9XCI+PC9mb3JtPmApO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChmaWVsZHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGVuY3R5cGUgYW5kIG1ldGhvZCBhdHRyaWJ1dGVzIGFyZSBzZXQgcHJvcGVybHlcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJlbmN0eXBlXCIsIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgdGhpcy5vcHRpb25zLm1ldGhvZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCA/IGZvcm0gOiBmaWVsZHM7XG4gICAgfVxuICAgIC8vIFJldHVybnMgdGhlIGZhbGxiYWNrIGVsZW1lbnRzIGlmIHRoZXkgZXhpc3QgYWxyZWFkeVxuICAgIC8vXG4gICAgLy8gVGhpcyBjb2RlIGhhcyB0byBwYXNzIGluIElFNyA6KFxuICAgIGdldEV4aXN0aW5nRmFsbGJhY2soKSB7XG4gICAgICAgIGxldCBnZXRGYWxsYmFjayA9IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBlbCBvZiBlbGVtZW50cyl7XG4gICAgICAgICAgICAgICAgaWYgKC8oXnwgKWZhbGxiYWNrKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCB0YWdOYW1lIG9mIFtcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICBcImZvcm1cIlxuICAgICAgICBdKXtcbiAgICAgICAgICAgIHZhciBmYWxsYmFjaztcbiAgICAgICAgICAgIGlmIChmYWxsYmFjayA9IGdldEZhbGxiYWNrKHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSkpIHJldHVybiBmYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBY3RpdmF0ZXMgYWxsIGxpc3RlbmVycyBzdG9yZWQgaW4gQGxpc3RlbmVyc1xuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5tYXAoKGVsZW1lbnRMaXN0ZW5lcnMpPT4oKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yKGxldCBldmVudCBpbiBlbGVtZW50TGlzdGVuZXJzLmV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudExpc3RlbmVycy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgfVxuICAgIC8vIERlYWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcbiAgICByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcCgoZWxlbWVudExpc3RlbmVycyk9PigoKT0+e1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gZWxlbWVudExpc3RlbmVycy5ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSgpKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGFuZCBjYW5jZWxzIGFsbCBmaWxlcyBpbiB0aGUgcXVldWUgb3IgYmVpbmcgcHJvY2Vzc2VkLlxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCk9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWNsaWNrYWJsZVwiKSk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLm1hcCgoZmlsZSk9PnRoaXMuY2FuY2VsVXBsb2FkKGZpbGUpKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICBkZWxldGUgdGhpcy5kaXNhYmxlZDtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KT0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotY2xpY2thYmxlXCIpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGEgbmljZWx5IGZvcm1hdHRlZCBmaWxlc2l6ZVxuICAgIGZpbGVzaXplKHNpemUpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkU2l6ZSA9IDA7XG4gICAgICAgIGxldCBzZWxlY3RlZFVuaXQgPSBcImJcIjtcbiAgICAgICAgaWYgKHNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgdW5pdHMgPSBbXG4gICAgICAgICAgICAgICAgXCJ0YlwiLFxuICAgICAgICAgICAgICAgIFwiZ2JcIixcbiAgICAgICAgICAgICAgICBcIm1iXCIsXG4gICAgICAgICAgICAgICAgXCJrYlwiLFxuICAgICAgICAgICAgICAgIFwiYlwiXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVuaXRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgdW5pdCA9IHVuaXRzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjdXRvZmYgPSBNYXRoLnBvdyh0aGlzLm9wdGlvbnMuZmlsZXNpemVCYXNlLCA0IC0gaSkgLyAxMDtcbiAgICAgICAgICAgICAgICBpZiAoc2l6ZSA+PSBjdXRvZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTaXplID0gc2l6ZSAvIE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRVbml0ID0gdW5pdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0ZWRTaXplID0gTWF0aC5yb3VuZCgxMCAqIHNlbGVjdGVkU2l6ZSkgLyAxMDsgLy8gQ3V0dGluZyBvZiBkaWdpdHNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDxzdHJvbmc+JHtzZWxlY3RlZFNpemV9PC9zdHJvbmc+ICR7dGhpcy5vcHRpb25zLmRpY3RGaWxlU2l6ZVVuaXRzW3NlbGVjdGVkVW5pdF19YDtcbiAgICB9XG4gICAgLy8gQWRkcyBvciByZW1vdmVzIHRoZSBgZHotbWF4LWZpbGVzLXJlYWNoZWRgIGNsYXNzIGZyb20gdGhlIGZvcm0uXG4gICAgX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB0aGlzLmVtaXQoXCJtYXhmaWxlc3JlYWNoZWRcIiwgdGhpcy5maWxlcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1tYXgtZmlsZXMtcmVhY2hlZFwiKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LW1heC1maWxlcy1yZWFjaGVkXCIpO1xuICAgIH1cbiAgICBkcm9wKGUpIHtcbiAgICAgICAgaWYgKCFlLmRhdGFUcmFuc2ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmVtaXQoXCJkcm9wXCIsIGUpO1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBGaWxlTGlzdCB0byBhbiBBcnJheVxuICAgICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBmb3IgSUUxMVxuICAgICAgICBsZXQgZmlsZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGUuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgaSsrKWZpbGVzW2ldID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbaV07XG4gICAgICAgIC8vIEV2ZW4gaWYgaXQncyBhIGZvbGRlciwgZmlsZXMubGVuZ3RoIHdpbGwgY29udGFpbiB0aGUgZm9sZGVycy5cbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHsgaXRlbXM6IGl0ZW1zIH0gPSBlLmRhdGFUcmFuc2ZlcjtcbiAgICAgICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggJiYgaXRlbXNbMF0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsKSAvLyBUaGUgYnJvd3NlciBzdXBwb3J0cyBkcm9wcGluZyBvZiBmb2xkZXJzLCBzbyBoYW5kbGUgaXRlbXMgaW5zdGVhZCBvZiBmaWxlc1xuICAgICAgICAgICAgdGhpcy5fYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVzXCIsIGZpbGVzKTtcbiAgICB9XG4gICAgcGFzdGUoZSkge1xuICAgICAgICBpZiAoJDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRfXyhlICE9IG51bGwgPyBlLmNsaXBib2FyZERhdGEgOiB1bmRlZmluZWQsICh4KT0+eC5pdGVtcykgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmVtaXQoXCJwYXN0ZVwiLCBlKTtcbiAgICAgICAgbGV0IHsgaXRlbXM6IGl0ZW1zIH0gPSBlLmNsaXBib2FyZERhdGE7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHJldHVybiB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XG4gICAgfVxuICAgIGhhbmRsZUZpbGVzKGZpbGVzKSB7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5hZGRGaWxlKGZpbGUpO1xuICAgIH1cbiAgICAvLyBXaGVuIGEgZm9sZGVyIGlzIGRyb3BwZWQgKG9yIGZpbGVzIGFyZSBwYXN0ZWQpLCBpdGVtcyBtdXN0IGJlIGhhbmRsZWRcbiAgICAvLyBpbnN0ZWFkIG9mIGZpbGVzLlxuICAgIF9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcykge1xuICAgICAgICByZXR1cm4gKCgpPT57XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKXtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsICYmIChlbnRyeSA9IGl0ZW0ud2Via2l0R2V0QXNFbnRyeSgpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSByZXN1bHQucHVzaCh0aGlzLmFkZEZpbGUoaXRlbS5nZXRBc0ZpbGUoKSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkgLy8gQXBwZW5kIGFsbCBmaWxlcyBmcm9tIHRoYXQgZGlyZWN0b3J5IHRvIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgZW50cnkubmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmdldEFzRmlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmtpbmQgPT0gbnVsbCB8fCBpdGVtLmtpbmQgPT09IFwiZmlsZVwiKSByZXN1bHQucHVzaCh0aGlzLmFkZEZpbGUoaXRlbS5nZXRBc0ZpbGUoKSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KSgpO1xuICAgIH1cbiAgICAvLyBHb2VzIHRocm91Z2ggdGhlIGRpcmVjdG9yeSwgYW5kIGFkZHMgZWFjaCBmaWxlIGl0IGZpbmRzIHJlY3Vyc2l2ZWx5XG4gICAgX2FkZEZpbGVzRnJvbURpcmVjdG9yeShkaXJlY3RvcnksIHBhdGgpIHtcbiAgICAgICAgbGV0IGRpclJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgICAgbGV0IGVycm9ySGFuZGxlciA9IChlcnJvcik9PiQzZWQyNjlmMmYwZmIyMjRiJHZhciRfX2d1YXJkTWV0aG9kX18oY29uc29sZSwgXCJsb2dcIiwgKG8pPT5vLmxvZyhlcnJvcikpO1xuICAgICAgICBsZXQgZW50cnlDb3VudCA9IDA7XG4gICAgICAgIHZhciByZWFkRW50cmllcyA9ICgpPT57XG4gICAgICAgICAgICByZXR1cm4gZGlyUmVhZGVyLnJlYWRFbnRyaWVzKChlbnRyaWVzKT0+e1xuICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgZW50cmllcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKytlbnRyeUNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmZpbGUoKGZpbGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlSGlkZGVuRmlsZXMgJiYgZmlsZS5uYW1lLnN1YnN0cmluZygwLCAxKSA9PT0gXCIuXCIpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5mdWxsUGF0aCA9IGAke3BhdGh9LyR7ZmlsZS5uYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZEZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB0aGlzLl9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZW50cnksIGAke3BhdGh9LyR7ZW50cnkubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBjYWxsIHJlYWRFbnRyaWVzKCkgYWdhaW4sIHNpbmNlIGJyb3dzZXIgb25seSBoYW5kbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IDEwMCBlbnRyaWVzLlxuICAgICAgICAgICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9EaXJlY3RvcnlSZWFkZXIjcmVhZEVudHJpZXNcbiAgICAgICAgICAgICAgICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5Q291bnQgPT09IDApIHRoaXMuZW1pdChcImVtcHR5Zm9sZGVyXCIsIHBhdGgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlYWRFbnRyaWVzKCk7XG4gICAgfVxuICAgIC8vIElmIGBkb25lKClgIGlzIGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50IHRoZSBmaWxlIGlzIGFjY2VwdGVkXG4gICAgLy8gSWYgeW91IGNhbGwgaXQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZFxuICAgIC8vIChUaGlzIGFsbG93cyBmb3IgYXN5bmNocm9ub3VzIHZhbGlkYXRpb24pXG4gICAgLy9cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0aGUgZmlsZXNpemUsIGFuZCBpZiB0aGUgZmlsZS50eXBlIHBhc3NlcyB0aGVcbiAgICAvLyBgYWNjZXB0ZWRGaWxlc2AgY2hlY2suXG4gICAgYWNjZXB0KGZpbGUsIGRvbmUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSAmJiBmaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUgKiAxMDQ4NTc2KSBkb25lKHRoaXMub3B0aW9ucy5kaWN0RmlsZVRvb0JpZy5yZXBsYWNlKFwie3tmaWxlc2l6ZX19XCIsIE1hdGgucm91bmQoZmlsZS5zaXplIC8gMTAyNCAvIDEwLjI0KSAvIDEwMCkucmVwbGFjZShcInt7bWF4RmlsZXNpemV9fVwiLCB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUpKTtcbiAgICAgICAgZWxzZSBpZiAoISQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNWYWxpZEZpbGUoZmlsZSwgdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMpKSBkb25lKHRoaXMub3B0aW9ucy5kaWN0SW52YWxpZEZpbGVUeXBlKTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuICAgICAgICAgICAgZG9uZSh0aGlzLm9wdGlvbnMuZGljdE1heEZpbGVzRXhjZWVkZWQucmVwbGFjZShcInt7bWF4RmlsZXN9fVwiLCB0aGlzLm9wdGlvbnMubWF4RmlsZXMpKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcIm1heGZpbGVzZXhjZWVkZWRcIiwgZmlsZSk7XG4gICAgICAgIH0gZWxzZSB0aGlzLm9wdGlvbnMuYWNjZXB0LmNhbGwodGhpcywgZmlsZSwgZG9uZSk7XG4gICAgfVxuICAgIGFkZEZpbGUoZmlsZSkge1xuICAgICAgICBmaWxlLnVwbG9hZCA9IHtcbiAgICAgICAgICAgIC8vIG5vdGU6IHRoaXMgb25seSB3b3JrcyBpZiB3aW5kb3cuaXNTZWN1cmVDb250ZXh0IGlzIHRydWUsIHdoaWNoIGluY2x1ZGVzIGxvY2FsaG9zdCBpbiBodHRwXG4gICAgICAgICAgICB1dWlkOiB3aW5kb3cuaXNTZWN1cmVDb250ZXh0ID8gc2VsZi5jcnlwdG8ucmFuZG9tVVVJRCgpIDogJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS51dWlkdjQoKSxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgLy8gU2V0dGluZyB0aGUgdG90YWwgdXBsb2FkIHNpemUgdG8gZmlsZS5zaXplIGZvciB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAvLyBJdCdzIGFjdHVhbCBkaWZmZXJlbnQgdGhhbiB0aGUgc2l6ZSB0byBiZSB0cmFuc21pdHRlZC5cbiAgICAgICAgICAgIHRvdGFsOiBmaWxlLnNpemUsXG4gICAgICAgICAgICBieXRlc1NlbnQ6IDAsXG4gICAgICAgICAgICBmaWxlbmFtZTogdGhpcy5fcmVuYW1lRmlsZShmaWxlKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRDtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkZWRmaWxlXCIsIGZpbGUpO1xuICAgICAgICB0aGlzLl9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpO1xuICAgICAgICB0aGlzLmFjY2VwdChmaWxlLCAoZXJyb3IpPT57XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBmaWxlLmFjY2VwdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JQcm9jZXNzaW5nKFtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVxuICAgICAgICAgICAgICAgIF0sIGVycm9yKTsgLy8gV2lsbCBzZXQgdGhlIGZpbGUuc3RhdHVzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbGUuYWNjZXB0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1F1ZXVlKSB0aGlzLmVucXVldWVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAvLyBXaWxsIHNldCAuYWNjZXB0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gV3JhcHBlciBmb3IgZW5xdWV1ZUZpbGVcbiAgICBlbnF1ZXVlRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmVucXVldWVGaWxlKGZpbGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZW5xdWV1ZUZpbGUoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQgJiYgZmlsZS5hY2NlcHRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRDtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHNldFRpbWVvdXQoKCk9PnRoaXMucHJvY2Vzc1F1ZXVlKCksIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcbiAgICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihcIlRoaXMgZmlsZSBjYW4ndCBiZSBxdWV1ZWQgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCBvciB3YXMgcmVqZWN0ZWQuXCIpO1xuICAgIH1cbiAgICBfZW5xdWV1ZVRodW1ibmFpbChmaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY3JlYXRlSW1hZ2VUaHVtYm5haWxzICYmIGZpbGUudHlwZS5tYXRjaCgvaW1hZ2UuKi8pICYmIGZpbGUuc2l6ZSA8PSB0aGlzLm9wdGlvbnMubWF4VGh1bWJuYWlsRmlsZXNpemUgKiAxMDQ4NTc2KSB7XG4gICAgICAgICAgICB0aGlzLl90aHVtYm5haWxRdWV1ZS5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCk9PnRoaXMuX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpLCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgfHwgdGhpcy5fdGh1bWJuYWlsUXVldWUubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSB0cnVlO1xuICAgICAgICBsZXQgZmlsZSA9IHRoaXMuX3RodW1ibmFpbFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChmaWxlLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsIHRoaXMub3B0aW9ucy50aHVtYm5haWxIZWlnaHQsIHRoaXMub3B0aW9ucy50aHVtYm5haWxNZXRob2QsIHRydWUsIChkYXRhVXJsKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidGh1bWJuYWlsXCIsIGZpbGUsIGRhdGFVcmwpO1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2FuIGJlIGNhbGxlZCBieSB0aGUgdXNlciB0byByZW1vdmUgYSBmaWxlXG4gICAgcmVtb3ZlRmlsZShmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcpIHRoaXMuY2FuY2VsVXBsb2FkKGZpbGUpO1xuICAgICAgICB0aGlzLmZpbGVzID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHdpdGhvdXQodGhpcy5maWxlcywgZmlsZSk7XG4gICAgICAgIHRoaXMuZW1pdChcInJlbW92ZWRmaWxlXCIsIGZpbGUpO1xuICAgICAgICBpZiAodGhpcy5maWxlcy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLmVtaXQoXCJyZXNldFwiKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlcyBhbGwgZmlsZXMgdGhhdCBhcmVuJ3QgY3VycmVudGx5IHByb2Nlc3NlZCBmcm9tIHRoZSBsaXN0XG4gICAgcmVtb3ZlQWxsRmlsZXMoY2FuY2VsSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgY29weSBvZiBmaWxlcyBzaW5jZSByZW1vdmVGaWxlKCkgY2hhbmdlcyB0aGUgQGZpbGVzIGFycmF5LlxuICAgICAgICBpZiAoY2FuY2VsSWZOZWNlc3NhcnkgPT0gbnVsbCkgY2FuY2VsSWZOZWNlc3NhcnkgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiB0aGlzLmZpbGVzLnNsaWNlKCkpaWYgKGZpbGUuc3RhdHVzICE9PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORyB8fCBjYW5jZWxJZk5lY2Vzc2FyeSkgdGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gUmVzaXplcyBhbiBpbWFnZSBiZWZvcmUgaXQgZ2V0cyBzZW50IHRvIHRoZSBzZXJ2ZXIuIFRoaXMgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2ZcbiAgICAvLyBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBpZiBgcmVzaXplV2lkdGhgIG9yIGByZXNpemVIZWlnaHRgIGFyZSBzZXQuIFRoZSBjYWxsYmFjayBpcyBpbnZva2VkIHdpdGhcbiAgICAvLyB0aGUgcmVzaXplZCBibG9iLlxuICAgIHJlc2l6ZUltYWdlKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgdHJ1ZSwgKGRhdGFVcmwsIGNhbnZhcyk9PntcbiAgICAgICAgICAgIGlmIChjYW52YXMgPT0gbnVsbCkgLy8gVGhlIGltYWdlIGhhcyBub3QgYmVlbiByZXNpemVkXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmlsZSk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgeyByZXNpemVNaW1lVHlwZTogcmVzaXplTWltZVR5cGUgfSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAocmVzaXplTWltZVR5cGUgPT0gbnVsbCkgcmVzaXplTWltZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgICAgICAgICAgICAgbGV0IHJlc2l6ZWREYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChyZXNpemVNaW1lVHlwZSwgdGhpcy5vcHRpb25zLnJlc2l6ZVF1YWxpdHkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNpemVNaW1lVHlwZSA9PT0gXCJpbWFnZS9qcGVnXCIgfHwgcmVzaXplTWltZVR5cGUgPT09IFwiaW1hZ2UvanBnXCIpIC8vIE5vdyBhZGQgdGhlIG9yaWdpbmFsIEVYSUYgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICByZXNpemVkRGF0YVVSTCA9ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRyZXN0b3JlRXhpZihmaWxlLmRhdGFVUkwsIHJlc2l6ZWREYXRhVVJMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5kYXRhVVJJdG9CbG9iKHJlc2l6ZWREYXRhVVJMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgICBjcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIGlnbm9yZUV4aWYgPSBmYWxzZSkge1xuICAgICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKCk9PntcbiAgICAgICAgICAgIGZpbGUuZGF0YVVSTCA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgICAgLy8gRG9uJ3QgYm90aGVyIGNyZWF0aW5nIGEgdGh1bWJuYWlsIGZvciBTVkcgaW1hZ2VzIHNpbmNlIHRoZXkncmUgdmVjdG9yXG4gICAgICAgICAgICAvLyBBbHNvIHNraXAgZ2lmIChzZWUgIzM5KVxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gXCJpbWFnZS9zdmcreG1sXCIgfHwgZmlsZS50eXBlID09PSBcImltYWdlL2dpZlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIGNhbGxiYWNrKGZpbGVSZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRodW1ibmFpbEZyb21VcmwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIHVuZGVmaW5lZCwgaWdub3JlRXhpZik7XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gICAgLy8gYG1vY2tGaWxlYCBuZWVkcyB0byBoYXZlIHRoZXNlIGF0dHJpYnV0ZXM6XG4gICAgLy9cbiAgICAvLyAgICAgeyBuYW1lOiAnbmFtZScsIHNpemU6IDEyMzQ1LCBpbWFnZVVybDogJycgfVxuICAgIC8vXG4gICAgLy8gYGNhbGxiYWNrYCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaW1hZ2UgaGFzIGJlZW4gZG93bmxvYWRlZCBhbmQgZGlzcGxheWVkLlxuICAgIC8vIGBjcm9zc09yaWdpbmAgd2lsbCBiZSBhZGRlZCB0byB0aGUgYGltZ2AgdGFnIHdoZW4gYWNjZXNzaW5nIHRoZSBmaWxlLlxuICAgIGRpc3BsYXlFeGlzdGluZ0ZpbGUobW9ja0ZpbGUsIGltYWdlVXJsLCBjYWxsYmFjaywgY3Jvc3NPcmlnaW4sIHJlc2l6ZVRodW1ibmFpbCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkZWRmaWxlXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICBpZiAoIXJlc2l6ZVRodW1ibmFpbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidGh1bWJuYWlsXCIsIG1vY2tGaWxlLCBpbWFnZVVybCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgb25Eb25lID0gKHRodW1ibmFpbCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgbW9ja0ZpbGUsIHRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1vY2tGaWxlLmRhdGFVUkwgPSBpbWFnZVVybDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChtb2NrRmlsZSwgdGhpcy5vcHRpb25zLnRodW1ibmFpbFdpZHRoLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsSGVpZ2h0LCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsTWV0aG9kLCB0aGlzLm9wdGlvbnMuZml4T3JpZW50YXRpb24sIG9uRG9uZSwgY3Jvc3NPcmlnaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVRodW1ibmFpbEZyb21VcmwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIGNyb3NzT3JpZ2luLCBpZ25vcmVFeGlmID0gZmFsc2UpIHtcbiAgICAgICAgLy8gTm90IHVzaW5nIGBuZXcgSW1hZ2VgIGhlcmUgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBsYXRlc3QgQ2hyb21lIHZlcnNpb25zLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvcHVsbC8yMjZcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGlmIChjcm9zc09yaWdpbikgaW1nLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgICAgIC8vIGZpeE9yaWVudGF0aW9uIGlzIG5vdCBuZWVkZWQgYW55bW9yZSB3aXRoIGJyb3dzZXJzIGhhbmRsaW5nIGltYWdlT3JpZW50YXRpb25cbiAgICAgICAgZml4T3JpZW50YXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpW1wiaW1hZ2VPcmllbnRhdGlvblwiXSA9PSBcImZyb20taW1hZ2VcIiA/IGZhbHNlIDogZml4T3JpZW50YXRpb247XG4gICAgICAgIGltZy5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgbGV0IGxvYWRFeGlmID0gKGNhbGxiYWNrKT0+Y2FsbGJhY2soMSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIEVYSUYgIT09IFwidW5kZWZpbmVkXCIgJiYgRVhJRiAhPT0gbnVsbCAmJiBmaXhPcmllbnRhdGlvbikgbG9hZEV4aWYgPSAoY2FsbGJhY2spPT5FWElGLmdldERhdGEoaW1nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVYSUYuZ2V0VGFnKHRoaXMsIFwiT3JpZW50YXRpb25cIikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGxvYWRFeGlmKChvcmllbnRhdGlvbik9PntcbiAgICAgICAgICAgICAgICBmaWxlLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgICAgICAgIGZpbGUuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgcmVzaXplSW5mbyA9IHRoaXMub3B0aW9ucy5yZXNpemUuY2FsbCh0aGlzLCBmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpO1xuICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2gob3JpZW50YXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGZsaXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTgwwrAgcm90YXRlIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmVydGljYWwgZmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgwLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmVydGljYWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOTDCsCByb3RhdGUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIC1jYW52YXMud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLmhlaWdodCwgLWNhbnZhcy53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDkwwrAgcm90YXRlIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoLTAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtY2FudmFzLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGJ1Z2ZpeCBmb3IgaU9TJyBzY2FsaW5nIGJ1Zy5cbiAgICAgICAgICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZHJhd0ltYWdlSU9TRml4KGN0eCwgaW1nLCByZXNpemVJbmZvLnNyY1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWCA6IDAsIHJlc2l6ZUluZm8uc3JjWSAhPSBudWxsID8gcmVzaXplSW5mby5zcmNZIDogMCwgcmVzaXplSW5mby5zcmNXaWR0aCwgcmVzaXplSW5mby5zcmNIZWlnaHQsIHJlc2l6ZUluZm8udHJnWCAhPSBudWxsID8gcmVzaXplSW5mby50cmdYIDogMCwgcmVzaXplSW5mby50cmdZICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1kgOiAwLCByZXNpemVJbmZvLnRyZ1dpZHRoLCByZXNpemVJbmZvLnRyZ0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IHRodW1ibmFpbCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHJldHVybiBjYWxsYmFjayh0aHVtYm5haWwsIGNhbnZhcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIGltZy5vbmVycm9yID0gY2FsbGJhY2s7XG4gICAgICAgIHZhciBkYXRhVVJMID0gZmlsZS5kYXRhVVJMO1xuICAgICAgICBpZiAoaWdub3JlRXhpZikgZGF0YVVSTCA9ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRyZW1vdmVFeGlmKGRhdGFVUkwpO1xuICAgICAgICByZXR1cm4gaW1nLnNyYyA9IGRhdGFVUkw7XG4gICAgfVxuICAgIC8vIEdvZXMgdGhyb3VnaCB0aGUgcXVldWUgYW5kIHByb2Nlc3NlcyBmaWxlcyBpZiB0aGVyZSBhcmVuJ3QgdG9vIG1hbnkgYWxyZWFkeS5cbiAgICBwcm9jZXNzUXVldWUoKSB7XG4gICAgICAgIGxldCB7IHBhcmFsbGVsVXBsb2FkczogcGFyYWxsZWxVcGxvYWRzIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGxldCBwcm9jZXNzaW5nTGVuZ3RoID0gdGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSBwcm9jZXNzaW5nTGVuZ3RoO1xuICAgICAgICAvLyBUaGVyZSBhcmUgYWxyZWFkeSBhdCBsZWFzdCBhcyBtYW55IGZpbGVzIHVwbG9hZGluZyB0aGFuIHNob3VsZCBiZVxuICAgICAgICBpZiAocHJvY2Vzc2luZ0xlbmd0aCA+PSBwYXJhbGxlbFVwbG9hZHMpIHJldHVybjtcbiAgICAgICAgbGV0IHF1ZXVlZEZpbGVzID0gdGhpcy5nZXRRdWV1ZWRGaWxlcygpO1xuICAgICAgICBpZiAoIShxdWV1ZWRGaWxlcy5sZW5ndGggPiAwKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSAvLyBUaGUgZmlsZXMgc2hvdWxkIGJlIHVwbG9hZGVkIGluIG9uZSByZXF1ZXN0XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhxdWV1ZWRGaWxlcy5zbGljZSgwLCBwYXJhbGxlbFVwbG9hZHMgLSBwcm9jZXNzaW5nTGVuZ3RoKSk7XG4gICAgICAgIGVsc2Ugd2hpbGUoaSA8IHBhcmFsbGVsVXBsb2Fkcyl7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlZEZpbGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgIC8vIE5vdGhpbmcgbGVmdCB0byBwcm9jZXNzXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NGaWxlKHF1ZXVlZEZpbGVzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFdyYXBwZXIgZm9yIGBwcm9jZXNzRmlsZXNgXG4gICAgcHJvY2Vzc0ZpbGUoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzRmlsZXMoW1xuICAgICAgICAgICAgZmlsZVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLy8gTG9hZHMgdGhlIGZpbGUsIHRoZW4gY2FsbHMgZmluaXNoZWRMb2FkaW5nKClcbiAgICBwcm9jZXNzRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnByb2Nlc3NpbmcgPSB0cnVlOyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORztcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInByb2Nlc3NpbmdcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwicHJvY2Vzc2luZ211bHRpcGxlXCIsIGZpbGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkRmlsZXMoZmlsZXMpO1xuICAgIH1cbiAgICBfZ2V0RmlsZXNXaXRoWGhyKHhocikge1xuICAgICAgICBsZXQgZmlsZXM7XG4gICAgICAgIHJldHVybiBmaWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS54aHIgPT09IHhocikubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIENhbmNlbHMgdGhlIGZpbGUgdXBsb2FkIGFuZCBzZXRzIHRoZSBzdGF0dXMgdG8gQ0FOQ0VMRURcbiAgICAvLyAqKmlmKiogdGhlIGZpbGUgaXMgYWN0dWFsbHkgYmVpbmcgdXBsb2FkZWQuXG4gICAgLy8gSWYgaXQncyBzdGlsbCBpbiB0aGUgcXVldWUsIHRoZSBmaWxlIGlzIGJlaW5nIHJlbW92ZWQgZnJvbSBpdCBhbmQgdGhlIHN0YXR1c1xuICAgIC8vIHNldCB0byBDQU5DRUxFRC5cbiAgICBjYW5jZWxVcGxvYWQoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBlZEZpbGVzID0gdGhpcy5fZ2V0RmlsZXNXaXRoWGhyKGZpbGUueGhyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwZWRGaWxlIG9mIGdyb3VwZWRGaWxlcylncm91cGVkRmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWxlLnhociAhPT0gXCJ1bmRlZmluZWRcIikgZmlsZS54aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwZWRGaWxlIG9mIGdyb3VwZWRGaWxlcyl0aGlzLmVtaXQoXCJjYW5jZWxlZFwiLCBncm91cGVkRmlsZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJjYW5jZWxlZG11bHRpcGxlXCIsIGdyb3VwZWRGaWxlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQgfHwgZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEKSB7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQ7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjYW5jZWxlZFwiLCBmaWxlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgW1xuICAgICAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIHJlc29sdmVPcHRpb24ob3B0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBvcHRpb24uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuICAgIHVwbG9hZEZpbGUoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhbXG4gICAgICAgICAgICBmaWxlXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICB1cGxvYWRGaWxlcyhmaWxlcykge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1GaWxlcyhmaWxlcywgKHRyYW5zZm9ybWVkRmlsZXMpPT57XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNodW5raW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2h1bmtpbmcgaXMgbm90IGFsbG93ZWQgdG8gYmUgdXNlZCB3aXRoIGB1cGxvYWRNdWx0aXBsZWAgc28gd2Uga25vd1xuICAgICAgICAgICAgICAgIC8vIHRoYXQgdGhlcmUgaXMgb25seSBfX29uZV9fZmlsZS5cbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcbiAgICAgICAgICAgICAgICBmaWxlc1swXS51cGxvYWQuY2h1bmtlZCA9IHRoaXMub3B0aW9ucy5jaHVua2luZyAmJiAodGhpcy5vcHRpb25zLmZvcmNlQ2h1bmtpbmcgfHwgdHJhbnNmb3JtZWRGaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBmaWxlc1swXS51cGxvYWQudG90YWxDaHVua0NvdW50ID0gTWF0aC5jZWlsKHRyYW5zZm9ybWVkRmlsZS5zaXplIC8gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybWVkRmlsZS5zaXplID09PSAwKSBmaWxlc1swXS51cGxvYWQudG90YWxDaHVua0NvdW50ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgZmlsZSBzaG91bGQgYmUgc2VudCBpbiBjaHVua3MhXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNodW5raW5nIG9wdGlvbiBpcyBzZXQsIHdlICoqa25vdyoqIHRoYXQgdGhlcmUgY2FuIG9ubHkgYmUgKipvbmUqKiBmaWxlLCBzaW5jZVxuICAgICAgICAgICAgICAgIC8vIHVwbG9hZE11bHRpcGxlIGlzIG5vdCBhbGxvd2VkIHdpdGggdGhpcyBvcHRpb24uXG4gICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1swXTtcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5jaHVua3MgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlTmV4dENodW5rID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNodW5rSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IGl0ZW0gaW4gZmlsZS51cGxvYWQuY2h1bmtzIHRoYXQgaXMgbm90IGRlZmluZWQgeWV0LlxuICAgICAgICAgICAgICAgICAgICB3aGlsZShmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gIT09IHVuZGVmaW5lZCljaHVua0luZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMsIHRoYXQgYWxsIGNodW5rcyBoYXZlIGFscmVhZHkgYmVlbiBzdGFydGVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtJbmRleCA+PSBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gY2h1bmtJbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHRoaXMub3B0aW9ucy5jaHVua1NpemUsIHRyYW5zZm9ybWVkRmlsZS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9jayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2dldFBhcmFtTmFtZSgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZSA/IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZShzdGFydCwgZW5kKSA6IHRyYW5zZm9ybWVkRmlsZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLnVwbG9hZC5maWxlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rSW5kZXg6IGNodW5rSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuY2h1bmtzW2NodW5rSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjaHVua0luZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJsb2NrOiBkYXRhQmxvY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyaWVzOiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCbG9ja1xuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQgPSAoY2h1bmssIHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWxsRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaHVuay5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlNVQ0NFU1M7XG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHRoZSBkYXRhIGZyb20gdGhlIGNodW5rXG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmRhdGFCbG9jayA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rLnJlc3BvbnNlID0gY2h1bmsueGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsucmVzcG9uc2VIZWFkZXJzID0gY2h1bmsueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBMZWF2aW5nIHRoaXMgcmVmZXJlbmNlIHRvIHhociB3aWxsIGNhdXNlIG1lbW9yeSBsZWFrcy5cbiAgICAgICAgICAgICAgICAgICAgY2h1bmsueGhyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhbmRsZU5leHRDaHVuaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXS5zdGF0dXMgIT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUykgYWxsRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsRmluaXNoZWQpIHRoaXMub3B0aW9ucy5jaHVua3NVcGxvYWRlZChmaWxlLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gbGltaXQgcGFyYWxsZWxDaHVua1VwbG9hZHMgdG8gdGhlIHNhbWUgdmFsdWUgYXMgcGFyYWxsZWxVcGxvYWRzIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbGxlbENvdW50ID0gTWF0aC5taW4odGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzID09PSB0cnVlID8gdGhpcy5vcHRpb25zLnBhcmFsbGVsVXBsb2FkcyA6IHRoaXMub3B0aW9ucy5wYXJhbGxlbENodW5rVXBsb2FkcywgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFsbGVsQ291bnQ7IGkrKyloYW5kbGVOZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaGFuZGxlTmV4dENodW5rKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhQmxvY2tzID0gW107XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKWRhdGFCbG9ja3NbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2dldFBhcmFtTmFtZShpKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtZWRGaWxlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGVzW2ldLnVwbG9hZC5maWxlbmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBsb2FkRGF0YShmaWxlcywgZGF0YUJsb2Nrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLy8gUmV0dXJucyB0aGUgcmlnaHQgY2h1bmsgZm9yIGdpdmVuIGZpbGUgYW5kIHhoclxuICAgIF9nZXRDaHVuayhmaWxlLCB4aHIpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gIT09IHVuZGVmaW5lZCAmJiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ueGhyID09PSB4aHIpIHJldHVybiBmaWxlLnVwbG9hZC5jaHVua3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhY3R1YWxseSB1cGxvYWRzIHRoZSBmaWxlKHMpIHRvIHRoZSBzZXJ2ZXIuXG4gICAgLy9cbiAgICAvLyAgSWYgZGF0YUJsb2NrcyBjb250YWlucyB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkIChtZWFuaW5nLCB0aGF0IHRoaXMgY291bGRcbiAgICAvLyBlaXRoZXIgYmUgdHJhbnNmb3JtZWQgZmlsZXMsIG9yIGluZGl2aWR1YWwgY2h1bmtzIGZvciBjaHVua2VkIHVwbG9hZCkgdGhlblxuICAgIC8vIHRoZXkgd2lsbCBiZSB1c2VkIGZvciB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkLlxuICAgIF91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKSB7XG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSBmaWxlIG9iamVjdHMgdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgaXQgbGF0ZXIuXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpZmlsZS54aHIgPSB4aHI7XG4gICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgLy8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSByaWdodCBjaHVuayBvYmplY3QsIHNvIGl0IGNhbiBiZSBhc3NvY2lhdGVkXG4gICAgICAgIC8vIGxhdGVyLCBhbmQgZm91bmQgd2l0aCBfZ2V0Q2h1bmsuXG4gICAgICAgIGZpbGVzWzBdLnVwbG9hZC5jaHVua3NbZGF0YUJsb2Nrc1swXS5jaHVua0luZGV4XS54aHIgPSB4aHI7XG4gICAgICAgIGxldCBtZXRob2QgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLm1ldGhvZCwgZmlsZXMsIGRhdGFCbG9ja3MpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy51cmwsIGZpbGVzLCBkYXRhQmxvY2tzKTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICAvLyBTZXR0aW5nIHRoZSB0aW1lb3V0IGFmdGVyIG9wZW4gYmVjYXVzZSBvZiBJRTExIGlzc3VlOiBodHRwczovL2dpdGxhYi5jb20vbWVuby9kcm9wem9uZS9pc3N1ZXMvOFxuICAgICAgICBsZXQgdGltZW91dCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMudGltZW91dCwgZmlsZXMpO1xuICAgICAgICBpZiAodGltZW91dCkgeGhyLnRpbWVvdXQgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnRpbWVvdXQsIGZpbGVzKTtcbiAgICAgICAgLy8gSGFzIHRvIGJlIGFmdGVyIGAub3BlbigpYC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbnlvL2Ryb3B6b25lL2lzc3Vlcy8xNzlcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgeGhyLm9ubG9hZCA9IChlKT0+e1xuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgYFJlcXVlc3QgdGltZWRvdXQgYWZ0ZXIgJHt0aGlzLm9wdGlvbnMudGltZW91dCAvIDEwMDB9IHNlY29uZHNgKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhocik7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgZG8gbm90IGhhdmUgdGhlIC51cGxvYWQgcHJvcGVydHlcbiAgICAgICAgbGV0IHByb2dyZXNzT2JqID0geGhyLnVwbG9hZCAhPSBudWxsID8geGhyLnVwbG9hZCA6IHhocjtcbiAgICAgICAgcHJvZ3Jlc3NPYmoub25wcm9ncmVzcyA9IChlKT0+dGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyLCBlKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdEhlYWRlcnMgPyB7XG4gICAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcbiAgICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCJcbiAgICAgICAgfSA6IHt9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBmaWxlc1swXS50eXBlO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIE9iamVjdC5hc3NpZ24oaGVhZGVycywgdGhpcy5vcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICBmb3IobGV0IGhlYWRlck5hbWUgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBsZXQgaGVhZGVyVmFsdWUgPSBoZWFkZXJzW2hlYWRlck5hbWVdO1xuICAgICAgICAgICAgaWYgKGhlYWRlclZhbHVlKSB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5KSB7XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgZmlsZSBpcyBnb2luZyB0byBiZSBzZW50IGFzIGJpbmFyeSBib2R5LCBpdCBkb2Vzbid0IG1ha2VcbiAgICAgICAgICAgIC8vIGFueSBzZW5zZSB0byBnZW5lcmF0ZSBgRm9ybURhdGFgIGZvciBpdC5cbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5lbWl0KFwic2VuZGluZ1wiLCBmaWxlLCB4aHIpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwic2VuZGluZ211bHRpcGxlXCIsIGZpbGVzLCB4aHIpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgbnVsbCwgZmlsZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAvLyBBZGRpbmcgYWxsIEBvcHRpb25zIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxQYXJhbXMgPSB0aGlzLm9wdGlvbnMucGFyYW1zO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRkaXRpb25hbFBhcmFtcyA9PT0gXCJmdW5jdGlvblwiKSBhZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcy5jYWxsKHRoaXMsIGZpbGVzLCB4aHIsIGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkID8gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocikgOiBudWxsKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiBhZGRpdGlvbmFsUGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gYWRkaXRpb25hbFBhcmFtc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIC8vIFRoZSBhZGRpdGlvbmFsIHBhcmFtZXRlciBjb250YWlucyBhbiBhcnJheSxcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gbGV0cyBpdGVyYXRlIG92ZXIgaXQgdG8gYXR0YWNoIGVhY2ggdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5kaXZpZHVhbGx5LlxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMZXQgdGhlIHVzZXIgYWRkIGFkZGl0aW9uYWwgZGF0YSBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5lbWl0KFwic2VuZGluZ1wiLCBmaWxlLCB4aHIsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcInNlbmRpbmdtdWx0aXBsZVwiLCBmaWxlcywgeGhyLCBmb3JtRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpO1xuICAgICAgICAgICAgLy8gRmluYWxseSBhZGQgdGhlIGZpbGVzXG4gICAgICAgICAgICAvLyBIYXMgdG8gYmUgbGFzdCBiZWNhdXNlIHNvbWUgc2VydmVycyAoZWc6IFMzKSBleHBlY3QgdGhlIGZpbGUgdG8gYmUgdGhlIGxhc3QgcGFyYW1ldGVyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YUJsb2Nrcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9jayA9IGRhdGFCbG9ja3NbaV07XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGRhdGFCbG9jay5uYW1lLCBkYXRhQmxvY2suZGF0YSwgZGF0YUJsb2NrLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVHJhbnNmb3JtcyBhbGwgZmlsZXMgd2l0aCB0aGlzLm9wdGlvbnMudHJhbnNmb3JtRmlsZSBhbmQgaW52b2tlcyBkb25lIHdpdGggdGhlIHRyYW5zZm9ybWVkIGZpbGVzIHdoZW4gZG9uZS5cbiAgICBfdHJhbnNmb3JtRmlsZXMoZmlsZXMsIGRvbmUpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkRmlsZXMgPSBbXTtcbiAgICAgICAgLy8gQ2x1bXN5IHdheSBvZiBoYW5kbGluZyBhc3luY2hyb25vdXMgY2FsbHMsIHVudGlsIEkgZ2V0IHRvIGFkZCBhIHByb3BlciBGdXR1cmUgbGlicmFyeS5cbiAgICAgICAgbGV0IGRvbmVDb3VudGVyID0gMDtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKXRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlLmNhbGwodGhpcywgZmlsZXNbaV0sICh0cmFuc2Zvcm1lZEZpbGUpPT57XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZEZpbGVzW2ldID0gdHJhbnNmb3JtZWRGaWxlO1xuICAgICAgICAgICAgaWYgKCsrZG9uZUNvdW50ZXIgPT09IGZpbGVzLmxlbmd0aCkgZG9uZSh0cmFuc2Zvcm1lZEZpbGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFRha2VzIGNhcmUgb2YgYWRkaW5nIG90aGVyIGlucHV0IGVsZW1lbnRzIG9mIHRoZSBmb3JtIHRvIHRoZSBBSkFYIHJlcXVlc3RcbiAgICBfYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKSB7XG4gICAgICAgIC8vIFRha2UgY2FyZSBvZiBvdGhlciBpbnB1dCBlbGVtZW50c1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09IFwiRk9STVwiKSBmb3IgKGxldCBpbnB1dCBvZiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b25cIikpe1xuICAgICAgICAgICAgbGV0IGlucHV0TmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICBsZXQgaW5wdXRUeXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcbiAgICAgICAgICAgIGlmIChpbnB1dFR5cGUpIGlucHV0VHlwZSA9IGlucHV0VHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGlucHV0IGRvZXNuJ3QgaGF2ZSBhIG5hbWUsIHdlIGNhbid0IHVzZSBpdC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXROYW1lID09PSBcInVuZGVmaW5lZFwiIHx8IGlucHV0TmFtZSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoaW5wdXQudGFnTmFtZSA9PT0gXCJTRUxFQ1RcIiAmJiBpbnB1dC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSkge1xuICAgICAgICAgICAgICAgIC8vIFBvc3NpYmx5IG11bHRpcGxlIHZhbHVlc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiBpbnB1dC5vcHRpb25zKWlmIChvcHRpb24uc2VsZWN0ZWQpIGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpbnB1dFR5cGUgfHwgaW5wdXRUeXBlICE9PSBcImNoZWNrYm94XCIgJiYgaW5wdXRUeXBlICE9PSBcInJhZGlvXCIgfHwgaW5wdXQuY2hlY2tlZCkgZm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEludm9rZWQgd2hlbiB0aGVyZSBpcyBuZXcgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgZ2l2ZW4gZmlsZXMuXG4gICAgLy8gSWYgZSBpcyBub3QgcHJvdmlkZWQsIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLlxuICAgIF91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpIHtcbiAgICAgICAgaWYgKCFmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgLy8gSGFuZGxlIGZpbGUgdXBsb2FkcyB3aXRob3V0IGNodW5raW5nXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpe1xuICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLnRvdGFsICYmIGZpbGUudXBsb2FkLmJ5dGVzU2VudCAmJiBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPT0gZmlsZS51cGxvYWQudG90YWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDEwMCAqIGUubG9hZGVkIC8gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGV2ZW50LCBzbyB3ZSdyZSBhdCAxMDAlXG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gZmlsZS51cGxvYWQudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBmaWxlLCBmaWxlLnVwbG9hZC5wcm9ncmVzcywgZmlsZS51cGxvYWQuYnl0ZXNTZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjaHVua2VkIGZpbGUgdXBsb2Fkc1xuICAgICAgICAgICAgLy8gQ2h1bmtlZCB1cGxvYWQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB1cGxvYWRpbmcgbXVsdGlwbGUgZmlsZXMgaW4gb25lXG4gICAgICAgICAgICAvLyByZXF1ZXN0LCBzbyB3ZSBrbm93IHRoZXJlJ3Mgb25seSBvbmUgZmlsZS5cbiAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbMF07XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGlzIGlzIGEgY2h1bmtlZCB1cGxvYWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBhcHByb3ByaWF0ZSBjaHVua1xuICAgICAgICAgICAgLy8gcHJvZ3Jlc3MuXG4gICAgICAgICAgICBsZXQgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlLCB4aHIpO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICBjaHVuay5wcm9ncmVzcyA9IDEwMCAqIGUubG9hZGVkIC8gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBjaHVuay50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgICAgICAgY2h1bmsuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGV2ZW50LCBzbyB3ZSdyZSBhdCAxMDAlXG4gICAgICAgICAgICAgICAgY2h1bmsucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgICAgICAgY2h1bmsuYnl0ZXNTZW50ID0gY2h1bmsudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3cgdGFsbHkgdGhlICpmaWxlKiB1cGxvYWQgcHJvZ3Jlc3MgZnJvbSBpdHMgaW5kaXZpZHVhbCBjaHVua3NcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsID0gMDtcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9IDA7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAmJiB0eXBlb2YgZmlsZS51cGxvYWQuY2h1bmtzW2ldLnByb2dyZXNzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLmJ5dGVzU2VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBwcm9jZXNzIGlzIGEgcGVyY2VudGFnZSwgd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIGFtb3VudCBvZlxuICAgICAgICAgICAgLy8gY2h1bmtzIHdlJ3ZlIHVzZWQuXG4gICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IGZpbGUudXBsb2FkLnByb2dyZXNzIC8gZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50O1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidXBsb2FkcHJvZ3Jlc3NcIiwgZmlsZSwgZmlsZS51cGxvYWQucHJvZ3Jlc3MsIGZpbGUudXBsb2FkLmJ5dGVzU2VudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZpbmlzaGVkVXBsb2FkaW5nKGZpbGVzLCB4aHIsIGUpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICBpZiAoZmlsZXNbMF0uc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEKSByZXR1cm47XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSAhPT0gXCJhcnJheWJ1ZmZlclwiICYmIHhoci5yZXNwb25zZVR5cGUgIT09IFwiYmxvYlwiKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBpZiAoeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpICYmIH54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikpIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gXCJJbnZhbGlkIEpTT04gcmVzcG9uc2UgZnJvbSBzZXJ2ZXIuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyKTtcbiAgICAgICAgaWYgKCEoMjAwIDw9IHhoci5zdGF0dXMgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHRoaXMuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKTtcbiAgICAgICAgZWxzZSBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIGZpbGVzWzBdLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkKHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpLCByZXNwb25zZSk7XG4gICAgICAgIGVsc2UgdGhpcy5fZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlLCBlKTtcbiAgICB9XG4gICAgX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQpIHJldHVybjtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkICYmIHRoaXMub3B0aW9ucy5yZXRyeUNodW5rcykge1xuICAgICAgICAgICAgbGV0IGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XG4gICAgICAgICAgICBpZiAoY2h1bmsucmV0cmllcysrIDwgdGhpcy5vcHRpb25zLnJldHJ5Q2h1bmtzTGltaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGxvYWREYXRhKGZpbGVzLCBbXG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmRhdGFCbG9ja1xuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBjb25zb2xlLndhcm4oXCJSZXRyaWVkIHRoaXMgY2h1bmsgdG9vIG9mdGVuLiBHaXZpbmcgdXAuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vycm9yUHJvY2Vzc2luZyhmaWxlcywgcmVzcG9uc2UgfHwgdGhpcy5vcHRpb25zLmRpY3RSZXNwb25zZUVycm9yLnJlcGxhY2UoXCJ7e3N0YXR1c0NvZGV9fVwiLCB4aHIuc3RhdHVzKSwgeGhyKTtcbiAgICB9XG4gICAgc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcykge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT0gMSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IHNlbmQgdGhpcyByZXF1ZXN0IGJlY2F1c2UgdGhlIFhNTEh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgaXMgbm90IE9QRU5FRC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5KSB7XG4gICAgICAgICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpO1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKGNodW5rLmRhdGFCbG9jay5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB4aHIuc2VuZChmaWxlc1swXSk7XG4gICAgICAgIH0gZWxzZSB4aHIuc2VuZChmb3JtRGF0YSk7XG4gICAgfVxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG4gICAgX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZVRleHQsIGUpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUztcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInN1Y2Nlc3NcIiwgZmlsZSwgcmVzcG9uc2VUZXh0LCBlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlXCIsIGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInN1Y2Nlc3NtdWx0aXBsZVwiLCBmaWxlcywgcmVzcG9uc2VUZXh0LCBlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG4gICAgX2Vycm9yUHJvY2Vzc2luZyhmaWxlcywgbWVzc2FnZSwgeGhyKSB7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpe1xuICAgICAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkVSUk9SO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZmlsZSwgbWVzc2FnZSwgeGhyKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlXCIsIGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVycm9ybXVsdGlwbGVcIiwgZmlsZXMsIG1lc3NhZ2UsIHhocik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZW11bHRpcGxlXCIsIGZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuICAgIH1cbiAgICBzdGF0aWMgdXVpZHY0KCkge1xuICAgICAgICByZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCAoYyk9PigrYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gK2MgLyA0KS50b1N0cmluZygxNikpO1xuICAgIH1cbn1cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5pdENsYXNzKCk7XG4vLyBUaGlzIGlzIGEgbWFwIG9mIG9wdGlvbnMgZm9yIHlvdXIgZGlmZmVyZW50IGRyb3B6b25lcy4gQWRkIGNvbmZpZ3VyYXRpb25zXG4vLyB0byB0aGlzIG9iamVjdCBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmUgZWxlbWVudHMuXG4vL1xuLy8gRXhhbXBsZTpcbi8vXG4vLyAgICAgRHJvcHpvbmUub3B0aW9ucy5teURyb3B6b25lRWxlbWVudElkID0geyBtYXhGaWxlc2l6ZTogMSB9O1xuLy9cbi8vIEFuZCBpbiBodG1sOlxuLy9cbi8vICAgICA8Zm9ybSBhY3Rpb249XCIvdXBsb2FkXCIgaWQ9XCJteS1kcm9wem9uZS1lbGVtZW50LWlkXCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9ucyA9IHt9O1xuLy8gUmV0dXJucyB0aGUgb3B0aW9ucyBmb3IgYW4gZWxlbWVudCBvciB1bmRlZmluZWQgaWYgbm9uZSBhdmFpbGFibGUuXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnNGb3JFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIC8vIEdldCB0aGUgYERyb3B6b25lLm9wdGlvbnMuZWxlbWVudElkYCBmb3IgdGhpcyBlbGVtZW50IGlmIGl0IGV4aXN0c1xuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpICYmIHR5cGVvZiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zWyQzZWQyNjlmMmYwZmIyMjRiJHZhciRjYW1lbGl6ZShlbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpKV07XG4gICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xufTtcbi8vIEhvbGRzIGEgbGlzdCBvZiBhbGwgZHJvcHpvbmUgaW5zdGFuY2VzXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcyA9IFtdO1xuLy8gUmV0dXJucyB0aGUgZHJvcHpvbmUgZm9yIGdpdmVuIGVsZW1lbnQgaWYgYW55XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgICBpZiAoKGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuZHJvcHpvbmUgOiB1bmRlZmluZWQpID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIERyb3B6b25lIGZvdW5kIGZvciBnaXZlbiBlbGVtZW50LiBUaGlzIGlzIHByb2JhYmx5IGJlY2F1c2UgeW91J3JlIHRyeWluZyB0byBhY2Nlc3MgaXQgYmVmb3JlIERyb3B6b25lIGhhZCB0aGUgdGltZSB0byBpbml0aWFsaXplLiBVc2UgdGhlIGBpbml0YCBvcHRpb24gdG8gc2V0dXAgYW55IGFkZGl0aW9uYWwgb2JzZXJ2ZXJzIG9uIHlvdXIgRHJvcHpvbmUuXCIpO1xuICAgIHJldHVybiBlbGVtZW50LmRyb3B6b25lO1xufTtcbi8vIExvb2tzIGZvciBhbGwgLmRyb3B6b25lIGVsZW1lbnRzIGFuZCBjcmVhdGVzIGEgZHJvcHpvbmUgZm9yIHRoZW1cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZGlzY292ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgZHJvcHpvbmVzO1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSBkcm9wem9uZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3B6b25lXCIpO1xuICAgIGVsc2Uge1xuICAgICAgICBkcm9wem9uZXMgPSBbXTtcbiAgICAgICAgLy8gSUUgOihcbiAgICAgICAgbGV0IGNoZWNrRWxlbWVudHMgPSAoZWxlbWVudHMpPT4oKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZWwgb2YgZWxlbWVudHMpaWYgKC8oXnwgKWRyb3B6b25lKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkgcmVzdWx0LnB1c2goZHJvcHpvbmVzLnB1c2goZWwpKTtcbiAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIikpO1xuICAgICAgICBjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9ybVwiKSk7XG4gICAgfVxuICAgIHJldHVybiAoKCk9PntcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkcm9wem9uZSBvZiBkcm9wem9uZXMpLy8gQ3JlYXRlIGEgZHJvcHpvbmUgdW5sZXNzIGF1dG8gZGlzY292ZXIgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIHNwZWNpZmljIGVsZW1lbnRcbiAgICAgICAgaWYgKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9uc0ZvckVsZW1lbnQoZHJvcHpvbmUpICE9PSBmYWxzZSkgcmVzdWx0LnB1c2gobmV3ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkoZHJvcHpvbmUpKTtcbiAgICAgICAgZWxzZSByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKCk7XG59O1xuLy8gQ2hlY2tzIGlmIHRoZSBicm93c2VyIGlzIHN1cHBvcnRlZCBieSBzaW1wbHkgY2hlY2tpbmcgaWYgUHJvbWlzZSBpcyBoZXJlOiBhIGdvb2QgY3V0b2ZmXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzQnJvd3NlclN1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIjtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmRhdGFVUkl0b0Jsb2IgPSBmdW5jdGlvbihkYXRhVVJJKSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuICAgIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KFwiLFwiKVsxXSk7XG4gICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdChcIixcIilbMF0uc3BsaXQoXCI6XCIpWzFdLnNwbGl0KFwiO1wiKVswXTtcbiAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxuICAgIGxldCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGZvcihsZXQgaSA9IDAsIGVuZCA9IGJ5dGVTdHJpbmcubGVuZ3RoLCBhc2MgPSAwIDw9IGVuZDsgYXNjID8gaSA8PSBlbmQgOiBpID49IGVuZDsgYXNjID8gaSsrIDogaS0tKWlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIC8vIHdyaXRlIHRoZSBBcnJheUJ1ZmZlciB0byBhIGJsb2JcbiAgICByZXR1cm4gbmV3IEJsb2IoW1xuICAgICAgICBhYlxuICAgIF0sIHtcbiAgICAgICAgdHlwZTogbWltZVN0cmluZ1xuICAgIH0pO1xufTtcbi8vIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgcmVqZWN0ZWQgaXRlbVxuY29uc3QgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHdpdGhvdXQgPSAobGlzdCwgcmVqZWN0ZWRJdGVtKT0+bGlzdC5maWx0ZXIoKGl0ZW0pPT5pdGVtICE9PSByZWplY3RlZEl0ZW0pLm1hcCgoaXRlbSk9Pml0ZW0pO1xuLy8gYWJjLWRlZl9naGkgLT4gYWJjRGVmR2hpXG5jb25zdCAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkY2FtZWxpemUgPSAoc3RyKT0+c3RyLnJlcGxhY2UoL1tcXC1fXShcXHcpL2csIChtYXRjaCk9Pm1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpKTtcbi8vIENyZWF0ZXMgYW4gZWxlbWVudCBmcm9tIHN0cmluZ1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmlubmVySFRNTCA9IHN0cmluZztcbiAgICByZXR1cm4gZGl2LmNoaWxkTm9kZXNbMF07XG59O1xuLy8gVGVzdHMgaWYgZ2l2ZW4gZWxlbWVudCBpcyBpbnNpZGUgKG9yIHNpbXBseSBpcykgdGhlIGNvbnRhaW5lclxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5lbGVtZW50SW5zaWRlID0gZnVuY3Rpb24oZWxlbWVudCwgY29udGFpbmVyKSB7XG4gICAgaWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikgcmV0dXJuIHRydWU7XG4gICAgIC8vIENvZmZlZXNjcmlwdCBkb2Vzbid0IHN1cHBvcnQgZG8vd2hpbGUgbG9vcHNcbiAgICB3aGlsZShlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKXtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQgPSBmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgIGxldCBlbGVtZW50O1xuICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICBlbHNlIGlmIChlbC5ub2RlVHlwZSAhPSBudWxsKSBlbGVtZW50ID0gZWw7XG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIFxcYCR7bmFtZX1cXGAgb3B0aW9uIHByb3ZpZGVkLiBQbGVhc2UgcHJvdmlkZSBhIENTUyBzZWxlY3RvciBvciBhIHBsYWluIEhUTUwgZWxlbWVudC5gKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnRzID0gZnVuY3Rpb24oZWxzLCBuYW1lKSB7XG4gICAgbGV0IGVsLCBlbGVtZW50cztcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoZWwgb2YgZWxzKWVsZW1lbnRzLnB1c2godGhpcy5nZXRFbGVtZW50KGVsLCBuYW1lKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVscyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKSllbGVtZW50cy5wdXNoKGVsKTtcbiAgICB9IGVsc2UgaWYgKGVscy5ub2RlVHlwZSAhPSBudWxsKSBlbGVtZW50cyA9IFtcbiAgICAgICAgZWxzXG4gICAgXTtcbiAgICBpZiAoZWxlbWVudHMgPT0gbnVsbCB8fCAhZWxlbWVudHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgXFxgJHtuYW1lfVxcYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yLCBhIHBsYWluIEhUTUwgZWxlbWVudCBvciBhIGxpc3Qgb2YgdGhvc2UuYCk7XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xufTtcbi8vIEFza3MgdGhlIHVzZXIgdGhlIHF1ZXN0aW9uIGFuZCBjYWxscyBhY2NlcHRlZCBvciByZWplY3RlZCBhY2NvcmRpbmdseVxuLy9cbi8vIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGp1c3QgdXNlcyBgd2luZG93LmNvbmZpcm1gIGFuZCB0aGVuIGNhbGxzIHRoZVxuLy8gYXBwcm9wcmlhdGUgY2FsbGJhY2suXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNvbmZpcm0gPSBmdW5jdGlvbihxdWVzdGlvbiwgYWNjZXB0ZWQsIHJlamVjdGVkKSB7XG4gICAgaWYgKHdpbmRvdy5jb25maXJtKHF1ZXN0aW9uKSkgcmV0dXJuIGFjY2VwdGVkKCk7XG4gICAgZWxzZSBpZiAocmVqZWN0ZWQgIT0gbnVsbCkgcmV0dXJuIHJlamVjdGVkKCk7XG59O1xuLy8gVmFsaWRhdGVzIHRoZSBtaW1lIHR5cGUgbGlrZSB0aGlzOlxuLy9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzVmFsaWRGaWxlID0gZnVuY3Rpb24oZmlsZSwgYWNjZXB0ZWRGaWxlcykge1xuICAgIGlmICghYWNjZXB0ZWRGaWxlcykgcmV0dXJuIHRydWU7XG4gICAgIC8vIElmIHRoZXJlIGFyZSBubyBhY2NlcHRlZCBtaW1lIHR5cGVzLCBpdCdzIE9LXG4gICAgYWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXMuc3BsaXQoXCIsXCIpO1xuICAgIGxldCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcbiAgICBsZXQgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgXCJcIik7XG4gICAgZm9yIChsZXQgdmFsaWRUeXBlIG9mIGFjY2VwdGVkRmlsZXMpe1xuICAgICAgICB2YWxpZFR5cGUgPSB2YWxpZFR5cGUudHJpbSgpO1xuICAgICAgICBpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgIGlmIChmaWxlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlLm5hbWUubGVuZ3RoIC0gdmFsaWRUeXBlLmxlbmd0aCkgIT09IC0xKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHNvbWV0aGluZyBsaWtlIGEgaW1hZ2UvKiBtaW1lIHR5cGVcbiAgICAgICAgICAgIGlmIChiYXNlTWltZVR5cGUgPT09IHZhbGlkVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCBcIlwiKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWltZVR5cGUgPT09IHZhbGlkVHlwZSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8vIEF1Z21lbnQgalF1ZXJ5XG5pZiAodHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkgIT09IG51bGwpIGpRdWVyeS5mbi5kcm9wem9uZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkodGhpcywgb3B0aW9ucyk7XG4gICAgfSk7XG59O1xuLy8gRHJvcHpvbmUgZmlsZSBzdGF0dXMgY29kZXNcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQgPSBcImFkZGVkXCI7XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRCA9IFwicXVldWVkXCI7XG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIE5vdywgaWYgYSBmaWxlIGlzIGFjY2VwdGVkLCBpdCdzIGVpdGhlciBxdWV1ZWRcbi8vIG9yIHVwbG9hZGluZy5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQUNDRVBURUQgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRDtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HID0gXCJ1cGxvYWRpbmdcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUFJPQ0VTU0lORyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HOyAvLyBhbGlhc1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRCA9IFwiY2FuY2VsZWRcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuRVJST1IgPSBcImVycm9yXCI7XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlNVQ0NFU1MgPSBcInN1Y2Nlc3NcIjtcbi8qXG5cbiBCdWdmaXggZm9yIGlPUyA2IGFuZCA3XG4gU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExOTI5MDk5L2h0bWw1LWNhbnZhcy1kcmF3aW1hZ2UtcmF0aW8tYnVnLWlvc1xuIGJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG5cbiAqLyAvLyBEZXRlY3RpbmcgdmVydGljYWwgc3F1YXNoIGluIGxvYWRlZCBpbWFnZS5cbi8vIEZpeGVzIGEgYnVnIHdoaWNoIHNxdWFzaCBpbWFnZSB2ZXJ0aWNhbGx5IHdoaWxlIGRyYXdpbmcgaW50byBjYW52YXMgZm9yIHNvbWUgaW1hZ2VzLlxuLy8gVGhpcyBpcyBhIGJ1ZyBpbiBpT1M2IGRldmljZXMuIFRoaXMgZnVuY3Rpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc3RvbWl0YS9pb3MtaW1hZ2VmaWxlLW1lZ2FwaXhlbFxubGV0ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRkZXRlY3RWZXJ0aWNhbFNxdWFzaCA9IGZ1bmN0aW9uKGltZykge1xuICAgIGxldCBpaCA9IGltZy5uYXR1cmFsSGVpZ2h0O1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNhbnZhcy53aWR0aCA9IDE7XG4gICAgY2FudmFzLmhlaWdodCA9IGloO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICBsZXQgeyBkYXRhOiBkYXRhIH0gPSBjdHguZ2V0SW1hZ2VEYXRhKDEsIDAsIDEsIGloKTtcbiAgICAvLyBzZWFyY2ggaW1hZ2UgZWRnZSBwaXhlbCBwb3NpdGlvbiBpbiBjYXNlIGl0IGlzIHNxdWFzaGVkIHZlcnRpY2FsbHkuXG4gICAgbGV0IHN5ID0gMDtcbiAgICBsZXQgZXkgPSBpaDtcbiAgICBsZXQgcHkgPSBpaDtcbiAgICB3aGlsZShweSA+IHN5KXtcbiAgICAgICAgbGV0IGFscGhhID0gZGF0YVsocHkgLSAxKSAqIDQgKyAzXTtcbiAgICAgICAgaWYgKGFscGhhID09PSAwKSBleSA9IHB5O1xuICAgICAgICBlbHNlIHN5ID0gcHk7XG4gICAgICAgIHB5ID0gZXkgKyBzeSA+PiAxO1xuICAgIH1cbiAgICBsZXQgcmF0aW8gPSBweSAvIGloO1xuICAgIGlmIChyYXRpbyA9PT0gMCkgcmV0dXJuIDE7XG4gICAgZWxzZSByZXR1cm4gcmF0aW87XG59O1xuLy8gQSByZXBsYWNlbWVudCBmb3IgY29udGV4dC5kcmF3SW1hZ2Vcbi8vIChhcmdzIGFyZSBmb3Igc291cmNlIGFuZCBkZXN0aW5hdGlvbikuXG52YXIgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRyYXdJbWFnZUlPU0ZpeCA9IGZ1bmN0aW9uKGN0eCwgaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcbiAgICBsZXQgdmVydFNxdWFzaFJhdGlvID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRldGVjdFZlcnRpY2FsU3F1YXNoKGltZyk7XG4gICAgcmV0dXJuIGN0eC5kcmF3SW1hZ2UoaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGggLyB2ZXJ0U3F1YXNoUmF0aW8pO1xufTtcbi8vIEluc3BpcmVkIGJ5IE1pbmlmeUpwZWdcbi8vIFNvdXJjZTogaHR0cDovL3d3dy5wZXJyeS5jei9maWxlcy9FeGlmUmVzdG9yZXIuanNcbi8vIGh0dHA6Ly9lbGljb24uYmxvZzU3LmZjMi5jb20vYmxvZy1lbnRyeS0yMDYuaHRtbFxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlbW92ZUV4aWYob3JpZ0ZpbGVCYXNlNjQpIHtcbiAgICB2YXIgbWFya2VyID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcbiAgICBpZiAoIW9yaWdGaWxlQmFzZTY0LnN0YXJ0c1dpdGgobWFya2VyKSkgcmV0dXJuIG9yaWdGaWxlQmFzZTY0O1xuICAgIHZhciBvcmlnRmlsZSA9IHdpbmRvdy5hdG9iKG9yaWdGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIW9yaWdGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiBvcmlnRmlsZUJhc2U2NDtcbiAgICAvLyBsb29wIHRocm91Z2ggdGhlIEpQRUcgZmlsZSBzZWdtZW50cyBhbmQgY29weSBhbGwgYnV0IEV4aWYgc2VnbWVudHMgaW50byB0aGUgZmlsdGVyZWQgZmlsZS5cbiAgICB2YXIgaGVhZCA9IDA7XG4gICAgdmFyIGZpbHRlcmVkRmlsZSA9IFwiXCI7XG4gICAgd2hpbGUoaGVhZCA8IG9yaWdGaWxlLmxlbmd0aCl7XG4gICAgICAgIGlmIChvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMikgPT0gXCJcXHhGRlxceERBXCIpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHN0YXJ0IG9mIHRoZSBpbWFnZSBkYXRhLCB3ZSBkb24ndCBleHBlY3QgZXhpZiBkYXRhIGFmdGVyIHRoYXQuXG4gICAgICAgICAgICBmaWx0ZXJlZEZpbGUgKz0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMikgPT0gXCJcXHhGRlxceEQ4XCIpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGdsb2JhbCBzdGFydCBtYXJrZXIuXG4gICAgICAgICAgICBmaWx0ZXJlZEZpbGUgKz0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpO1xuICAgICAgICAgICAgaGVhZCArPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHNlZ21lbnQgb2YgdmFyaWFibGUgc2l6ZS5cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAyKSAqIDI1NiArIG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDMpO1xuICAgICAgICAgICAgdmFyIGVuZFBvaW50ID0gaGVhZCArIGxlbmd0aCArIDI7XG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IG9yaWdGaWxlLnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcbiAgICAgICAgICAgIGlmICghc2VnbWVudC5zdGFydHNXaXRoKFwiXFx4RkZcXHhFMVwiKSkgZmlsdGVyZWRGaWxlICs9IHNlZ21lbnQ7XG4gICAgICAgICAgICBoZWFkID0gZW5kUG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcmtlciArIHdpbmRvdy5idG9hKGZpbHRlcmVkRmlsZSk7XG59XG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkcmVzdG9yZUV4aWYob3JpZ0ZpbGVCYXNlNjQsIHJlc2l6ZWRGaWxlQmFzZTY0KSB7XG4gICAgdmFyIG1hcmtlciA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCc7XG4gICAgaWYgKCEob3JpZ0ZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpICYmIHJlc2l6ZWRGaWxlQmFzZTY0LnN0YXJ0c1dpdGgobWFya2VyKSkpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICB2YXIgb3JpZ0ZpbGUgPSB3aW5kb3cuYXRvYihvcmlnRmlsZUJhc2U2NC5zbGljZShtYXJrZXIubGVuZ3RoKSk7XG4gICAgaWYgKCFvcmlnRmlsZS5zdGFydHNXaXRoKFwiXFx4RkZcXHhEOFxceEZGXCIpKSByZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG4gICAgLy8gR28gdGhyb3VnaCB0aGUgSlBFRyBmaWxlIHNlZ21lbnRzIG9uZSBieSBvbmUgYW5kIGNvbGxlY3QgYW55IEV4aWYgc2VnbWVudHMgd2UgZmluZC5cbiAgICB2YXIgaGVhZCA9IDA7XG4gICAgdmFyIGV4aWZEYXRhID0gXCJcIjtcbiAgICB3aGlsZShoZWFkIDwgb3JpZ0ZpbGUubGVuZ3RoKXtcbiAgICAgICAgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4REFcIikgYnJlYWs7XG4gICAgICAgIGVsc2UgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4RDhcIikgLy8gdGhpcyBpcyB0aGUgZ2xvYmFsIHN0YXJ0IG1hcmtlci5cbiAgICAgICAgaGVhZCArPSAyO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBzZWdtZW50IG9mIHZhcmlhYmxlIHNpemUuXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gb3JpZ0ZpbGUuY2hhckNvZGVBdChoZWFkICsgMikgKiAyNTYgKyBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAzKTtcbiAgICAgICAgICAgIHZhciBlbmRQb2ludCA9IGhlYWQgKyBsZW5ndGggKyAyO1xuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBvcmlnRmlsZS5zbGljZShoZWFkLCBlbmRQb2ludCk7XG4gICAgICAgICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKFwiXFx4RkZcXHhFMVwiKSkgZXhpZkRhdGEgKz0gc2VnbWVudDtcbiAgICAgICAgICAgIGhlYWQgPSBlbmRQb2ludDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhpZkRhdGEgPT0gXCJcIikgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIHZhciByZXNpemVkRmlsZSA9IHdpbmRvdy5hdG9iKHJlc2l6ZWRGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIXJlc2l6ZWRGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICAvLyBUaGUgZmlyc3QgZmlsZSBzZWdtZW50IGlzIGFsd2F5cyBoZWFkZXIgaW5mb3JtYXRpb24gc28gaW5zZXJ0IHRoZSBFeGlmIGRhdGEgYXMgc2Vjb25kIHNlZ21lbnQuXG4gICAgdmFyIHNwbGl0UG9pbnQgPSA0ICsgcmVzaXplZEZpbGUuY2hhckNvZGVBdCg0KSAqIDI1NiArIHJlc2l6ZWRGaWxlLmNoYXJDb2RlQXQoNSk7XG4gICAgcmVzaXplZEZpbGUgPSByZXNpemVkRmlsZS5zbGljZSgwLCBzcGxpdFBvaW50KSArIGV4aWZEYXRhICsgcmVzaXplZEZpbGUuc2xpY2Uoc3BsaXRQb2ludCk7XG4gICAgcmV0dXJuIG1hcmtlciArIHdpbmRvdy5idG9hKHJlc2l6ZWRGaWxlKTtcbn1cbmZ1bmN0aW9uICQzZWQyNjlmMmYwZmIyMjRiJHZhciRfX2d1YXJkX18odmFsdWUsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwgPyB0cmFuc2Zvcm0odmFsdWUpIDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRNZXRob2RfXyhvYmosIG1ldGhvZE5hbWUsIHRyYW5zZm9ybSkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqW21ldGhvZE5hbWVdID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cmFuc2Zvcm0ob2JqLCBtZXRob2ROYW1lKTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IHskM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5IGFzIGRlZmF1bHQsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgYXMgRHJvcHpvbmV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJvcHpvbmUubWpzLm1hcFxuIiwiY29uc3QgY29uZmlndXJlQ2xpcGJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvcHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jbGlwYm9hcmQtdGFyZ2V0XScpO1xuXG4gICAgY29weS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24uZGF0YXNldC5jbGlwYm9hcmRUYXJnZXQpLmlubmVyVGV4dCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBjbGlwYm9hcmQgc3VjY2Vzc2Z1bGx5IHNldFxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2lzLWNvcGllZCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWNvcGllZCcpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVDbGlwYm9hcmQ7XG4iLCJjb25zdCBjb25maWd1cmVUcml4VG9vbGJhciA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidHJpeC10b29sYmFyXCIpLmZvckVhY2goKHRvb2xiYXIpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uUm93ID0gdG9vbGJhci5xdWVyeVNlbGVjdG9yKFwiLnRyaXgtYnV0dG9uLXJvd1wiKTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdG9vbGJhci5jbG9zZXN0KFwiLmZvcm0td2lkZ2V0XCIpO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB3aWRnZXQucXVlcnlTZWxlY3RvcihcInRyaXgtZWRpdG9yXCIpO1xuXG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZCA9IGVkaXRvci5nZXRBdHRyaWJ1dGUoJ2lucHV0Jyk7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tZWRpYS1jaG9pY2UnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgI21vZGFsLW1lZGlhLWNob2ljZV8ke2lkfSAubW9kYWwtYm9keWAsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFidXR0b25Sb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZldGNoRm9sZGVyID0gKHVybCkgPT4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcblxuICAgICAgICBjb25zdCBjb25maWd1cmVNb2RhbCA9IChodG1sKSA9PiB7XG4gICAgICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBoYW5kbGVFZGl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIG1lZGlhIHNlbGVjdGlvbiBtb2RhbFxuICAgICAgICAgICAgbW9kYWxDb250ZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBtb2RhbC5kYXRhc2V0LmZvbGRlciB8fCAnJztcblxuICAgICAgICAgICAgZmV0Y2hGb2xkZXIoXG4gICAgICAgICAgICAgICAgbW9kYWwuZGF0YXNldC5ocmVmICsgZm9sZGVyLFxuICAgICAgICAgICAgKS50aGVuKGNvbmZpZ3VyZU1vZGFsKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRhcmdldCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRhdGFzZXQubWVkaWFVcmwgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBub3QgYSBzZWxlY3RhYmxlIG1lZGlhXG4gICAgICAgICAgICAgICAgZmV0Y2hGb2xkZXIodGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSkudGhlbihjb25maWd1cmVNb2RhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmRhdGFzZXQubWVkaWFUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmVkaXRvci5pbnNlcnRIVE1MKHRhcmdldC5kYXRhc2V0Lm1lZGlhT3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBuZXcgVHJpeC5BdHRhY2htZW50KHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGFyZ2V0LmRhdGFzZXQubWVkaWFPcmlnaW5hbFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVkaXRvci5lZGl0b3IuaW5zZXJ0QXR0YWNobWVudChhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kYWwuZGF0YXNldC5mb2xkZXIgPSB0YXJnZXQuZGF0YXNldC5tZWRpYUZvbGRlciB8fCAnJztcblxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZU1vZGFsU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImZvcm1cIik7XG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgICAgICAudGhlbihjb25maWd1cmVNb2RhbClcbiAgICAgICAgICAgIDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbG9zZU1vZGFsID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbnMuaXRlbShjbG9zZUJ1dHRvbnMubGVuZ3RoIC0gMSkuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgY3VzdG9tIGJ1dHRvblxuICAgICAgICBjb25zdCBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYnV0dG9uR3JvdXAuY2xhc3NMaXN0LmFkZCgndHJpeC1idXR0b24tZ3JvdXAnLCAndHJpeC1idXR0b24tZ3JvdXAtLWpvbGltZWRpYS10b29scycpO1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10cml4LWF0dHJpYnV0ZScsICdqb2xpbWVkaWEnKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1icy10b2dnbGUnLCAnbW9kYWwnKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1icy10YXJnZXQnLCBgI21vZGFsLW1lZGlhLWNob2ljZV8ke2lkfWApO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndHJpeC1idXR0b24nLCAndHJpeC1idXR0b24tLWljb24nLCAndHJpeC1idXR0b24tLWljb24taW1hZ2UnKTtcbiAgICAgICAgYnV0dG9uLnRpdGxlID0gJ0luc2VydCBtZWRpYSc7XG4gICAgICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVFZGl0KTtcbiAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2spO1xuICAgICAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgICAgICAvLyBsb2NhdGUgdGhlIHNwYWNlciBhbmQgaW5zZXJ0IHRoZSBidXR0b24gZ3JvdXAgYmVmb3JlIGl0XG4gICAgICAgIGNvbnN0IHNwYWNlciA9IGJ1dHRvblJvdy5xdWVyeVNlbGVjdG9yKCcudHJpeC1idXR0b24tZ3JvdXAtc3BhY2VyJyk7XG4gICAgICAgIHNwYWNlci5iZWZvcmUoYnV0dG9uR3JvdXApO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlVHJpeFRvb2xiYXI7XG4iLCJpbXBvcnQgeyBEcm9wem9uZSB9IGZyb20gXCJAZGVsdGFibG90L2Ryb3B6b25lXCI7XG5cbmNvbnN0IGFkZERyb3B6b25lID0gKGVsZW1lbnQgPSBudWxsKSA9PiB7XG4gIGxldCBkcm9wem9uZSA9IGVsZW1lbnQ7XG5cbiAgaWYgKGRyb3B6b25lID09PSBudWxsKSB7XG4gICAgZHJvcHpvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21wb25lbnQ9ZHJvcHpvbmVdJyk7XG4gIH1cblxuICBpZiAoZHJvcHpvbmUpIHtcbiAgICBjb25zdCBjb25maWcgPSBkcm9wem9uZS5kYXRhc2V0LmRyb3B6b25lQ29uZmlnID8gSlNPTi5wYXJzZShkcm9wem9uZS5kYXRhc2V0LmRyb3B6b25lQ29uZmlnKSA6IHt9O1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gICAgICBhZGRSZW1vdmVMaW5rczogZmFsc2UsXG4gICAgICBtYXhGaWxlc2l6ZTogMjAsIC8vIE1CXG4gICAgICBwYXJhbU5hbWU6ICd1cGxvYWRbZmlsZV0nLFxuICAgICAgcHJldmlld1RlbXBsYXRlOiBkcm9wem9uZS5xdWVyeVNlbGVjdG9yKCcuZHotcHJldmlldy10ZW1wbGF0ZScpLmlubmVySFRNTCxcbiAgICAgIHRodW1ibmFpbFdpZHRoOiAxODAsXG4gICAgICB0aHVtYm5haWxIZWlnaHQ6IDEwOSxcbiAgICAgIHNlbmRpbmcoZmlsZSwgeGhyKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZT8uZmlsZXNbMF0/LmxpbmspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW5mbyA9IHJlc3BvbnNlLmZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgXCJbZGF0YS1kei1saW5rXVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5ocmVmID0gZmlsZUluZm8ubGluaztcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLWZvbGRlclwiLCBmaWxlSW5mby5tZWRpYUZvbGRlcik7XG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1tZWRpYS11cmxcIiwgZmlsZUluZm8ubWVkaWFVcmwpO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWVkaWEtZnVsbC11cmxcIiwgZmlsZUluZm8ubWVkaWFGdWxsVXJsKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLXRlbXBsYXRlXCIsIGZpbGVJbmZvLm1lZGlhVGVtcGxhdGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVJbmZvLm1lZGlhUHJldmlldykge1xuICAgICAgICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZHotdGh1bWJuYWlsXVwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmlubmVySFRNTCA9IGZpbGVJbmZvLm1lZGlhUHJldmlldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBEcm9wem9uZShkcm9wem9uZSwgeyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfSk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZERyb3B6b25lO1xuIiwiY29uc3Qgb3BlbkZvbGRlckNob2ljZU1vZGFsID0gKGZvbGRlckNob2ljZUJ1dHRvbikgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWZvbGRlci1jaG9pY2UnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICAgIGNvbnN0IHBhZ2VBY3Rpb25zID0gZm9sZGVyQ2hvaWNlQnV0dG9uLmNsb3Nlc3QoJy5wYWdlLWFjdGlvbnMnKTtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBwYWdlQWN0aW9ucy5xdWVyeVNlbGVjdG9yKCcjbW92ZV90bycpO1xuXG4gICAgY29uc3QgZmV0Y2hGb2xkZXIgPSAodXJsKSA9PiBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xuXG4gICAgY29uc3QgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgIGNsb3NlQnV0dG9ucy5pdGVtKGNsb3NlQnV0dG9ucy5sZW5ndGggLSAxKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWVsZFZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGFyZ2V0LmRhdGFzZXQuZm9sZGVyUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCB0aGUgZm9sZGVyIHNlbGVjdGlvbiBidXR0b25cbiAgICAgICAgICAgIGZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4oY29uZmlndXJlTW9kYWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0YXJnZXQuZGF0YXNldC5mb2xkZXJQYXRoKTtcbiAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtbW92ZSBwJykudGV4dENvbnRlbnQgPSB0YXJnZXQuZGF0YXNldC5jb25maXJtYXRpb247XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1tb3ZlICNtb2RhbC1tb3ZlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vdmUtZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW9kYWxTdWJtaXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiZm9ybVwiKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgICAgIGZldGNoKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbihjb25maWd1cmVNb2RhbClcbiAgICAgICAgO1xuICAgIH07XG5cbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljayk7XG4gICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVNb2RhbFN1Ym1pdCk7XG4gICAgY29uZmlndXJlTW9kYWwoJycpO1xuICAgIGZldGNoRm9sZGVyKFxuICAgICAgICBmb2xkZXJDaG9pY2VCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgZm9sZGVyQ2hvaWNlQnV0dG9uLmRhdGFzZXQuZm9sZGVyLFxuICAgICkudGhlbihjb25maWd1cmVNb2RhbCk7XG59O1xuXG5jb25zdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvciA9ICgpID0+IHtcbiAgICBjb25zdCBmb2xkZXJTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb21wb25lbnQ9bWVkaWEtbW92ZV1cIik7XG5cbiAgICBpZiAoIWZvbGRlclNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb2xkZXJTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBvcGVuRm9sZGVyQ2hvaWNlTW9kYWwoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvcjtcbiIsImNvbnN0IGNvbmZpZ3VyZU1lZGlhQ2hvaWNlQ29udGFpbmVyID0gKG1lZGlhQ2hvaWNlQ29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaWQgPSBtZWRpYUNob2ljZUNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG4gICAgY29uc3QgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgam9saS1tZWRpYS1jb250YWluZXJfJHtpZH1gKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5qb2xpLW1lZGlhLWNob2ljZS1kZWxldGVcIixcbiAgICApO1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvbGktbWVkaWEtY2hvaWNlLWVkaXRcIik7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1vZGFsLW1lZGlhLWNob2ljZV8ke2lkfWApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjbW9kYWwtbWVkaWEtY2hvaWNlXyR7aWR9IC5tb2RhbC1ib2R5YCxcbiAgICApO1xuXG4gICAgY29uc3QgZmV0Y2hGb2xkZXIgPSAodXJsKSA9PiBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xuXG4gICAgY29uc3QgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgIGNsb3NlQnV0dG9ucy5pdGVtKGNsb3NlQnV0dG9ucy5sZW5ndGggLSAxKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWVsZFZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQuZGF0YXNldC5tZWRpYVRlbXBsYXRlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBhIHNlbGVjdGFibGUgbWVkaWFcbiAgICAgICAgICAgIGZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4oY29uZmlndXJlTW9kYWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVkaWFDb250YWluZXIuaW5uZXJIVE1MID0gdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZTtcbiAgICAgICAgbWVkaWFDaG9pY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImVtcHR5XCIpO1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlciA9IHRhcmdldC5kYXRhc2V0Lm1lZGlhRm9sZGVyO1xuICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtZWRpYUNob2ljZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGVtcGxhdGUtbnVsbC1sYWJlbC0ke2lkfWApO1xuICAgICAgICBtZWRpYUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlciA9IFwiXCI7XG4gICAgICAgIHNldEZpZWxkVmFsdWUoXCJcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRWRpdCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBmZXRjaEZvbGRlcihcbiAgICAgICAgICAgIGVkaXRCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlcixcbiAgICAgICAgKS50aGVuKGNvbmZpZ3VyZU1vZGFsKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vZGFsU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImZvcm1cIik7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICBjb25zdCB1cmwgPSBmb3JtLmFjdGlvbjtcblxuICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4oY29uZmlndXJlTW9kYWwpXG4gICAgICAgIDtcbiAgICB9O1xuXG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVEZWxldGUpO1xuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUVkaXQpO1xuICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrKTtcbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgIG1lZGlhQ2hvaWNlQ29udGFpbmVyLmRhdGFzZXQuY29uZmlndXJlZCA9IHRydWU7XG59O1xuXG5jb25zdCBjb25maWd1cmVNZWRpYVNlbGVjdG9yID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb3JtLmVhLWVkaXQtZm9ybSwgZm9ybS5lYS1uZXctZm9ybVwiKS5mb3JFYWNoKChmb3JtKSA9PlxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmpzLWpvbGktbWVkaWEtY2hvaWNlLWNvbnRhaW5lclwiKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQuZGF0YXNldC5jb25maWd1cmVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmVNZWRpYUNob2ljZUNvbnRhaW5lcih0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqb2xpLW1lZGlhLWNob2ljZS1lZGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcmNlIHJlbG9hZCB0aGUgbW9kYWwgY29udGVudFxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuXG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtam9saS1tZWRpYS1jaG9pY2UtY29udGFpbmVyXCIpXG4gICAgICAgIC5mb3JFYWNoKGNvbmZpZ3VyZU1lZGlhQ2hvaWNlQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3I7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zdHlsZXMvZHJvcHpvbmUuY3NzJztcbmltcG9ydCBhZGREcm9wem9uZSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcHpvbmUnO1xuaW1wb3J0IGNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yIGZyb20gJy4vY29tcG9uZW50cy9mb2xkZXJTZWxlY3Rvcic7XG5pbXBvcnQgY29uZmlndXJlTWVkaWFTZWxlY3RvciBmcm9tICcuL2NvbXBvbmVudHMvbWVkaWFTZWxlY3Rvcic7XG5pbXBvcnQgY29uZmlndXJlQ2xpcGJvYXJkIGZyb20gJy4vY29tcG9uZW50cy9jbGlwYm9hcmQnO1xuaW1wb3J0IGNvbmZpZ3VyZVRyaXhUb29sYmFyIGZyb20gJy4vY29tcG9uZW50cy9jb25maWd1cmVUcml4VG9vbGJhcic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yKCk7XG4gIGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IoKTtcbiAgY29uZmlndXJlQ2xpcGJvYXJkKCk7XG4gIGNvbmZpZ3VyZVRyaXhUb29sYmFyKCk7XG4gIGxldCBkcm9wem9uZUluc3RhbmNlID0gbnVsbDtcblxuICBjb25zdCBzd2l0Y2hUb29sID0gKHRhcmdldCwgY3VycmVudFRvb2wpID0+IHtcbiAgICBjb25zdCBoZWFkZXJUb29scyA9IHRhcmdldC5jbG9zZXN0KCcuam9saS1tZWRpYS1oZWFkZXItdG9vbHMnKTtcbiAgICBsZXQgYWN0aXZlVG9vbCA9IG51bGw7XG5cbiAgICBmb3IgKGNvbnN0IHRvb2wgb2YgWydkcm9wem9uZScsICduZXctZGlyZWN0b3J5JywgJ3JlbmFtZS1kaXJlY3RvcnknXSkge1xuICAgICAgY29uc3QgdG9vbENvbnRhaW5lciA9IGhlYWRlclRvb2xzLnF1ZXJ5U2VsZWN0b3IoJy4nICsgdG9vbCArICctY29udGFpbmVyJyk7XG5cbiAgICAgIGlmICh0b29sQ29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0b29sICE9PSBjdXJyZW50VG9vbCkge1xuICAgICAgICAgIHRvb2xDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0b29sICsgJy1hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b29sQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUodG9vbCArICctYWN0aXZlJyk7XG4gICAgICAgICAgYWN0aXZlVG9vbCA9IHRvb2xDb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aXZlVG9vbDtcbiAgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgIT09ICdFbnRlcicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtY29tcG9uZW50XScpO1xuXG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb21wb25lbnQuY2xpY2soKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtY29tcG9uZW50XScpO1xuXG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50Lm1hdGNoZXMoJ1tkYXRhLWNvbXBvbmVudD1mb2xkZXItY3JlYXRlXScpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBmb2xkZXJDcmVhdGVGb3JtID0gc3dpdGNoVG9vbChjb21wb25lbnQsICduZXctZGlyZWN0b3J5Jyk7XG4gICAgICBmb2xkZXJDcmVhdGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQubWF0Y2hlcygnW2RhdGEtY29tcG9uZW50PWZvbGRlci1yZW5hbWVdJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgZm9sZGVyUmVuYW1lRm9ybSA9IHN3aXRjaFRvb2woY29tcG9uZW50LCAncmVuYW1lLWRpcmVjdG9yeScpO1xuICAgICAgZm9sZGVyUmVuYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50Lm1hdGNoZXMoJ1tkYXRhLWNvbXBvbmVudD1tZWRpYS1hZGRdJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgZHJvcHpvbmUgPSBzd2l0Y2hUb29sKGNvbXBvbmVudCwgJ2Ryb3B6b25lJyk7XG5cbiAgICAgIGlmICghZHJvcHpvbmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wem9uZS1pbml0aWFsaXplZCcpKSB7XG4gICAgICAgIGRyb3B6b25lSW5zdGFuY2UgPSBhZGREcm9wem9uZShkcm9wem9uZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21wb25lbnQ9ZHJvcHpvbmVdJykpO1xuICAgICAgICBkcm9wem9uZS5jbGFzc0xpc3QuYWRkKCdkcm9wem9uZS1pbml0aWFsaXplZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRyb3B6b25lLmNsYXNzTGlzdC5jb250YWlucygnZHJvcHpvbmUtYWN0aXZlJykpIHtcbiAgICAgICAgZHJvcHpvbmVJbnN0YW5jZS5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50Lm1hdGNoZXMoJ1tkYXRhLWNvbXBvbmVudD1tZWRpYS1yZW5hbWVdJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgaGVhZGVyVG9vbHMgPSBjb21wb25lbnQuY2xvc2VzdCgnLmpvbGktbWVkaWEtaGVhZGVyLXRvb2xzJyk7XG4gICAgICBjb25zdCBmaWxlUmVuYW1lRm9ybSA9IGhlYWRlclRvb2xzLnF1ZXJ5U2VsZWN0b3IoJy5yZW5hbWUtZmlsZS1jb250YWluZXInKTtcblxuICAgICAgZmlsZVJlbmFtZUZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgncmVuYW1lLWFjdGl2ZScpO1xuICAgICAgZmlsZVJlbmFtZUZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLmZvY3VzKCk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImNvbmZpZ3VyZUNsaXBib2FyZCIsImNvcHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwiY3VycmVudFRhcmdldCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhc2V0IiwiY2xpcGJvYXJkVGFyZ2V0IiwiaW5uZXJUZXh0IiwidGhlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJjb25maWd1cmVUcml4VG9vbGJhciIsInRvb2xiYXIiLCJidXR0b25Sb3ciLCJ3aWRnZXQiLCJjbG9zZXN0IiwiZWRpdG9yIiwiaWQiLCJnZXRBdHRyaWJ1dGUiLCJtb2RhbCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1vZGFsQ29udGVudCIsImNvbmNhdCIsImZldGNoRm9sZGVyIiwidXJsIiwiZmV0Y2giLCJyZXNwb25zZSIsInRleHQiLCJjb25maWd1cmVNb2RhbCIsImh0bWwiLCJpbm5lckhUTUwiLCJoYW5kbGVFZGl0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZm9sZGVyIiwiaHJlZiIsImhhbmRsZU1vZGFsQ2xpY2siLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiYXR0cmlidXRlcyIsInVuZGVmaW5lZCIsImxlbmd0aCIsInZhbHVlIiwibWVkaWFUZW1wbGF0ZSIsIm1lZGlhVXJsIiwibWVkaWFUeXBlIiwiaW5zZXJ0SFRNTCIsIm1lZGlhT3JpZ2luYWxUZW1wbGF0ZSIsImF0dGFjaG1lbnQiLCJUcml4IiwiQXR0YWNobWVudCIsImNvbnRlbnQiLCJpbnNlcnRBdHRhY2htZW50IiwibWVkaWFGb2xkZXIiLCJjbG9zZU1vZGFsIiwiaGFuZGxlTW9kYWxTdWJtaXQiLCJmb3JtIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFjdGlvbiIsIm1ldGhvZCIsImhlYWRlcnMiLCJjbG9zZUJ1dHRvbnMiLCJpdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnV0dG9uR3JvdXAiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGl0bGUiLCJzcGFjZXIiLCJiZWZvcmUiLCJEcm9wem9uZSIsImFkZERyb3B6b25lIiwiYXJndW1lbnRzIiwiZHJvcHpvbmUiLCJjb25maWciLCJkcm9wem9uZUNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImRlZmF1bHRDb25maWciLCJhZGRSZW1vdmVMaW5rcyIsIm1heEZpbGVzaXplIiwicGFyYW1OYW1lIiwicHJldmlld1RlbXBsYXRlIiwidGh1bWJuYWlsV2lkdGgiLCJ0aHVtYm5haWxIZWlnaHQiLCJzZW5kaW5nIiwiZmlsZSIsInhociIsInByZXZpZXdFbGVtZW50Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIl9yZXNwb25zZSRmaWxlcyQiLCJyZXNwb25zZVRleHQiLCJmaWxlcyIsImxpbmsiLCJmaWxlSW5mbyIsImxpbmtFbGVtZW50IiwibWVkaWFGdWxsVXJsIiwibWVkaWFQcmV2aWV3IiwiX29iamVjdFNwcmVhZCIsIm9wZW5Gb2xkZXJDaG9pY2VNb2RhbCIsImZvbGRlckNob2ljZUJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwicGFnZUFjdGlvbnMiLCJpbnB1dEVsZW1lbnQiLCJzZXRGaWVsZFZhbHVlIiwiZm9sZGVyUGF0aCIsInRleHRDb250ZW50IiwiY29uZmlybWF0aW9uIiwic3VibWl0IiwiY29uZmlndXJlRm9sZGVyU2VsZWN0b3IiLCJmb2xkZXJTZWxlY3RvciIsImNvbmZpZ3VyZU1lZGlhQ2hvaWNlQ29udGFpbmVyIiwibWVkaWFDaG9pY2VDb250YWluZXIiLCJtZWRpYUlkIiwibWVkaWFDb250YWluZXIiLCJkZWxldGVCdXR0b24iLCJlZGl0QnV0dG9uIiwiaGFuZGxlRGVsZXRlIiwidGVtcGxhdGUiLCJjbG9uZU5vZGUiLCJjb25maWd1cmVkIiwiY29uZmlndXJlTWVkaWFTZWxlY3RvciIsImNvbnRhaW5zIiwiZHJvcHpvbmVJbnN0YW5jZSIsInN3aXRjaFRvb2wiLCJjdXJyZW50VG9vbCIsImhlYWRlclRvb2xzIiwiYWN0aXZlVG9vbCIsIl9pIiwiX2FyciIsInRvb2wiLCJ0b29sQ29udGFpbmVyIiwidG9nZ2xlIiwia2V5IiwiY29tcG9uZW50IiwiY2xpY2siLCJtYXRjaGVzIiwiZm9sZGVyQ3JlYXRlRm9ybSIsImZvY3VzIiwiZm9sZGVyUmVuYW1lRm9ybSIsInJlbW92ZUFsbEZpbGVzIiwiZmlsZVJlbmFtZUZvcm0iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==