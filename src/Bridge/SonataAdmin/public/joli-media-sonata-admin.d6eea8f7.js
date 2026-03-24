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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/clipboard.js"
/*!******************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/clipboard.js ***!
  \******************************************************************/
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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/dropzone.js"
/*!*****************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/dropzone.js ***!
  \*****************************************************************/
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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/folderSelector.js"
/*!***********************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/folderSelector.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _window = window,
  jQuery = _window.jQuery,
  Admin = _window.Admin;
var FolderSelector = /*#__PURE__*/function () {
  function FolderSelector() {
    var _this = this;
    _classCallCheck(this, FolderSelector);
    _defineProperty(this, "fetchFolder", function (url) {
      _this.currentFolder = url;
      return fetch(url).then(function (response) {
        return response.text();
      });
    });
    _defineProperty(this, "configureModal", function (html) {
      _this.modalContent.innerHTML = html;
      Admin.shared_setup(_this.modal);
    });
    _defineProperty(this, "handleModalClick", function (event) {
      var target = event.target.closest('a');
      if (target === null || target.tagName !== 'A' || target.attributes.href === undefined || target.attributes.href.length === 0 || target.attributes.href.value === '#') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (target.dataset.folderPath === undefined) {
        // this is not a selectable media
        _this.fetchFolder(target.attributes.href.value).then(_this.configureModal);
        return;
      }
      _this.setFieldValue(target.dataset.folderPath);
      jQuery(_this.modal).modal('hide');
      if (confirm(target.dataset.confirmation)) {
        _this.form.submit();
      }
    });
    _defineProperty(this, "handleModalSubmit", function (event) {
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
      }).then(_this.configureModal);
    });
    _defineProperty(this, "setFieldValue", function (value) {
      _this.inputElement.value = value;
      _this.inputElement.dispatchEvent(new Event('change'));
    });
    this.form = document.getElementById('move-form');
    this.inputElement = this.form.querySelector('#move_to');
    this.modal = false;
    this.modalContent = false;
    this.currentFolder = false;
  }
  return _createClass(FolderSelector, [{
    key: "choose",
    value: function choose(event) {
      var _this2 = this;
      event.preventDefault();
      event.stopPropagation();

      // initialize components
      if (!this.modal) {
        this.modal = document.getElementById('field_dialog_folder-choice');
        this.modal.addEventListener('click', this.handleModalClick);
        this.modal.addEventListener("submit", this.handleModalSubmit);
        this.modalContent = document.querySelector("#field_dialog_folder-choice .modal-body");
        document.body.appendChild(this.modal);
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            jQuery(_this2.modal).modal('hide');
          }
        });
      }
      this.modalContent.innerHTML = '';
      this.fetchFolder(event.currentTarget.attributes.href.value + '/' + event.currentTarget.dataset.folder).then(function (html) {
        _this2.configureModal(html);
        jQuery(_this2.modal).modal();
        Admin.setup_list_modal(_this2.modal);
      });
      return false;
    }
  }]);
}();
var configureFolderSelector = function configureFolderSelector() {
  jQuery(document).on('click', '[data-component=folder-choice]', function (e) {
    new FolderSelector().choose(e);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureFolderSelector);

/***/ },

/***/ "./src/Bridge/SonataAdmin/assets/js/components/mediaSelector.js"
/*!**********************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/mediaSelector.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _window = window,
  jQuery = _window.jQuery,
  Admin = _window.Admin;
var MediaSelector = /*#__PURE__*/function () {
  function MediaSelector(mediaChoiceContainer) {
    var _this = this;
    _classCallCheck(this, MediaSelector);
    _defineProperty(this, "fetchFolder", function (url) {
      _this.currentFolder = url;
      return fetch(url).then(function (response) {
        return response.text();
      });
    });
    _defineProperty(this, "configureModal", function (html) {
      _this.modalContent.innerHTML = html;
      Admin.shared_setup(_this.modal);
    });
    _defineProperty(this, "handleModalClick", function (event) {
      var target = event.target.closest('a');
      if (target === null || target.tagName !== 'A' || target.attributes.href === undefined || target.attributes.href.length === 0 || target.attributes.href.value === '#') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (target.dataset.mediaTemplate === undefined || target.dataset.mediaUrl === undefined) {
        // this is not a selectable media
        _this.fetchFolder(target.attributes.href.value).then(_this.configureModal);
        return;
      }
      _this.mediaContainer.innerHTML = target.dataset.mediaTemplate;
      _this.mediaChoiceContainer.classList.remove('empty');
      _this.setFieldValue(target.dataset.mediaUrl);
      _this.editButton.dataset.folder = target.dataset.mediaFolder;
      jQuery(_this.modal).modal('hide');
    });
    _defineProperty(this, "handleModalSubmit", function (event) {
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
      }).then(_this.configureModal);
    });
    _defineProperty(this, "setFieldValue", function (value) {
      _this.inputElement.value = value;
      _this.inputElement.dispatchEvent(new Event('change'));
    });
    this.mediaChoiceContainer = mediaChoiceContainer;
    this.deleteButton = mediaChoiceContainer.querySelector('.js-joli-media-choice-delete');
    this.editButton = mediaChoiceContainer.querySelector('.js-joli-media-choice-edit');
    this.id = mediaChoiceContainer.dataset.mediaId;
    this.mediaContainer = document.getElementById("joli-media-container_".concat(this.id));
    this.inputElement = document.getElementById(this.id);
    this.modal = false;
    this.modalContent = false;
    this.currentFolder = false;
  }
  return _createClass(MediaSelector, [{
    key: "choose",
    value: function choose(event) {
      var _this2 = this;
      event.preventDefault();
      event.stopPropagation();

      // initialize components
      if (!this.modal) {
        this.modal = document.getElementById("field_dialog_".concat(this.id));
        this.modal.addEventListener('click', this.handleModalClick);
        this.modal.addEventListener("submit", this.handleModalSubmit);
        this.modalContent = document.querySelector("#field_dialog_".concat(this.id, " .modal-body"));
        document.body.appendChild(this.modal);
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            jQuery(_this2.modal).modal('hide');
          }
        });
      }
      this.modalContent.innerHTML = '';
      this.fetchFolder(this.editButton.attributes.href.value + '/' + this.editButton.dataset.folder).then(function (html) {
        _this2.configureModal(html);
        jQuery(_this2.modal).modal();
        Admin.setup_list_modal(_this2.modal);
      });
      return false;
    }
  }, {
    key: "delete",
    value: function _delete(event) {
      event.preventDefault();
      event.stopPropagation();
      this.mediaChoiceContainer.classList.add('empty');
      var template = document.getElementById("template-null-label-".concat(this.id));
      this.mediaContainer.innerHTML = "";
      this.mediaContainer.appendChild(template.content.cloneNode(true));
      this.editButton.dataset.folder = '';
      this.setFieldValue('');
    }
  }]);
}();
var configureMediaSelector = function configureMediaSelector() {
  var mediaSelectors = {};
  var getMediaSelector = function getMediaSelector(node) {
    var container = node.closest('.js-joli-media-choice-container');
    var mediaId = container.dataset.mediaId;
    if (!mediaSelectors[mediaId]) {
      mediaSelectors[mediaId] = new MediaSelector(container);
    }
    return mediaSelectors[mediaId];
  };
  jQuery(document).on('click', '.js-joli-media-choice-delete', function (e) {
    getMediaSelector(e.target)["delete"](e);
  });
  jQuery(document).on('click', '.js-joli-media-choice-edit', function (e) {
    getMediaSelector(e.target).choose(e);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configureMediaSelector);

/***/ },

/***/ "./src/Bridge/SonataAdmin/assets/styles/jolimedia.css"
/*!************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/styles/jolimedia.css ***!
  \************************************************************/
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
/*!*********************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/joli-media-sonata-admin.js ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_jolimedia_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/jolimedia.css */ "./src/Bridge/SonataAdmin/assets/styles/jolimedia.css");
/* harmony import */ var _components_dropzone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dropzone */ "./src/Bridge/SonataAdmin/assets/js/components/dropzone.js");
/* harmony import */ var _components_folderSelector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/folderSelector */ "./src/Bridge/SonataAdmin/assets/js/components/folderSelector.js");
/* harmony import */ var _components_mediaSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mediaSelector */ "./src/Bridge/SonataAdmin/assets/js/components/mediaSelector.js");
/* harmony import */ var _components_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/clipboard */ "./src/Bridge/SonataAdmin/assets/js/components/clipboard.js");





var _window = window,
  jQuery = _window.jQuery;
document.addEventListener('DOMContentLoaded', function () {
  (0,_components_folderSelector__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_components_mediaSelector__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_components_clipboard__WEBPACK_IMPORTED_MODULE_4__["default"])();
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
  jQuery('body').on('click', '[data-component=folder-create]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var folderCreateForm = switchTool(e.target, 'new-directory');
    folderCreateForm.querySelector('input[type=text]').focus();
  });
  jQuery('body').on('click', '[data-component=folder-rename]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var folderRenameForm = switchTool(e.target, 'rename-directory');
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
    var dropzone = switchTool(e.target, 'dropzone');
    if (!dropzone.classList.contains('dropzone-initialized')) {
      dropzoneInstance = (0,_components_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"])(dropzone.querySelector('[data-component=dropzone]'));
      dropzone.classList.add('dropzone-initialized');
    }
    if (!dropzone.classList.contains('dropzone-active')) {
      dropzoneInstance.removeAllFiles(true);
    }
  });
  jQuery('body').on('click', '[data-component=media-rename]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var headerTools = e.target.closest('.content-header');
    var fileRenameForm = headerTools.querySelector('.rename-file-container');
    fileRenameForm.classList.toggle('rename-active');
    fileRenameForm.querySelector('input[type=text]').focus();
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9saS1tZWRpYS1zb25hdGEtYWRtaW4uZDZlZWE4ZjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscUNBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsVUFBVSxTQUFTLGFBQWE7QUFDeEMsMENBQTBDLFVBQVUsc0JBQXNCLGFBQWE7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1DQUFtQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQ0FBaUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQsa0JBQWtCO0FBQ2xCLGNBQWM7QUFDZDtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLDZCQUE2QjtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQ0FBaUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLDJGQUEyRixZQUFZO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwyQkFBMkI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsS0FBSztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsMkVBQTJFLEtBQUs7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEdBQTBHO0FBQzFHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR21IO0FBQ25IOzs7Ozs7Ozs7Ozs7Ozs7QUN2NURBLElBQU1BLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQUEsRUFBUztFQUM3QixJQUFNQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUM7RUFFakVGLElBQUksQ0FBQ0csT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztJQUN0QkEsT0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsS0FBSyxFQUFLO01BQ3pDQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ3RCLElBQU1DLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxhQUFhO01BQ2xDQyxTQUFTLENBQUNDLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDWCxRQUFRLENBQUNZLGFBQWEsQ0FBQ0wsTUFBTSxDQUFDTSxPQUFPLENBQUNDLGVBQWUsQ0FBQyxDQUFDQyxTQUFTLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFlBQU07UUFDM0c7UUFDQVQsTUFBTSxDQUFDVSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDakNDLFVBQVUsQ0FBQyxZQUFNO1VBQ2JaLE1BQU0sQ0FBQ1UsU0FBUyxDQUFDRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3hDLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDUixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsaUVBQWV0QixrQkFBa0IsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJjO0FBRS9DLElBQU13QixXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBQSxFQUF1QjtFQUFBLElBQW5CbkIsT0FBTyxHQUFBb0IsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsSUFBSTtFQUNqQyxJQUFJRyxRQUFRLEdBQUd2QixPQUFPO0VBRXRCLElBQUl1QixRQUFRLEtBQUssSUFBSSxFQUFFO0lBQ3JCQSxRQUFRLEdBQUcxQixRQUFRLENBQUNZLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztFQUNoRTtFQUVBLElBQUljLFFBQVEsRUFBRTtJQUNaLElBQU1DLE1BQU0sR0FBR0QsUUFBUSxDQUFDYixPQUFPLENBQUNlLGNBQWMsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNKLFFBQVEsQ0FBQ2IsT0FBTyxDQUFDZSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakcsSUFBTUcsYUFBYSxHQUFHO01BQ3BCQyxjQUFjLEVBQUUsS0FBSztNQUNyQkMsV0FBVyxFQUFFLEVBQUU7TUFBRTtNQUNqQkMsU0FBUyxFQUFFLGNBQWM7TUFDekJDLGVBQWUsRUFBRVQsUUFBUSxDQUFDZCxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQ3dCLFNBQVM7TUFDekVDLGNBQWMsRUFBRSxHQUFHO01BQ25CQyxlQUFlLEVBQUUsR0FBRztNQUNwQkMsT0FBTyxXQUFQQSxPQUFPQSxDQUFDQyxJQUFJLEVBQUVDLEdBQUcsRUFBRTtRQUNqQixJQUFJRCxJQUFJLENBQUNFLGNBQWMsRUFBRTtVQUN2QkQsR0FBRyxDQUFDRSxrQkFBa0IsR0FBRyxZQUFNO1lBQzdCLElBQUlGLEdBQUcsQ0FBQ0csVUFBVSxLQUFLLENBQUMsSUFBSUgsR0FBRyxDQUFDSSxNQUFNLEtBQUssR0FBRyxFQUFFO2NBQUEsSUFBQUMsZ0JBQUE7Y0FDOUMsSUFBTUMsUUFBUSxHQUFHbEIsSUFBSSxDQUFDQyxLQUFLLENBQUNXLEdBQUcsQ0FBQ08sWUFBWSxDQUFDO2NBRTdDLElBQUlELFFBQVEsYUFBUkEsUUFBUSxnQkFBQUQsZ0JBQUEsR0FBUkMsUUFBUSxDQUFFRSxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQUFILGdCQUFBLGVBQWxCQSxnQkFBQSxDQUFvQkksSUFBSSxFQUFFO2dCQUM1QixJQUFNQyxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0UsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBTUcsV0FBVyxHQUFHWixJQUFJLENBQUNFLGNBQWMsQ0FBQzlCLGFBQWEsQ0FDbkQsZ0JBQ0YsQ0FBQztnQkFDRHdDLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHRixRQUFRLENBQUNELElBQUk7Z0JBQ2hDRSxXQUFXLENBQUNFLFlBQVksQ0FBQyxtQkFBbUIsRUFBRUgsUUFBUSxDQUFDSSxXQUFXLENBQUM7Z0JBQ25FSCxXQUFXLENBQUNFLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRUgsUUFBUSxDQUFDSyxRQUFRLENBQUM7Z0JBQzdESixXQUFXLENBQUNFLFlBQVksQ0FBQyxxQkFBcUIsRUFBRUgsUUFBUSxDQUFDTSxhQUFhLENBQUM7Z0JBRXZFLElBQUlOLFFBQVEsQ0FBQ08sWUFBWSxFQUFFO2tCQUN6QmxCLElBQUksQ0FBQ0UsY0FBYyxDQUFDOUIsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUNRLE1BQU0sQ0FBQyxDQUFDO2tCQUNqRWdDLFdBQVcsQ0FBQ2hCLFNBQVMsR0FBR2UsUUFBUSxDQUFDTyxZQUFZO2dCQUMvQztjQUNGO1lBQ0Y7VUFDRixDQUFDO1FBQ0g7TUFDRjtJQUNGLENBQUM7SUFFRCxPQUFPLElBQUlyQyx5REFBUSxDQUFDSyxRQUFRLEVBQUFpQyxhQUFBLENBQUFBLGFBQUEsS0FBTzVCLGFBQWEsR0FBS0osTUFBTSxDQUFFLENBQUM7RUFDaEU7RUFFQSxPQUFPLElBQUk7QUFDYixDQUFDO0FBRUQsaUVBQWVMLFdBQVcsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkQxQixJQUFBc0MsT0FBQSxHQUEwQkMsTUFBTTtFQUF4QkMsTUFBTSxHQUFBRixPQUFBLENBQU5FLE1BQU07RUFBRUMsS0FBSyxHQUFBSCxPQUFBLENBQUxHLEtBQUs7QUFFckIsSUFBTUMsY0FBYztFQUNsQixTQUFBQSxlQUFBLEVBQWM7SUFBQSxJQUFBQyxLQUFBO0lBQUFDLGVBQUEsT0FBQUYsY0FBQTtJQUFBRyxlQUFBLHNCQVFBLFVBQUNDLEdBQUcsRUFBSztNQUNyQkgsS0FBSSxDQUFDSSxhQUFhLEdBQUdELEdBQUc7TUFDeEIsT0FBT0UsS0FBSyxDQUFDRixHQUFHLENBQUMsQ0FBQ3BELElBQUksQ0FBQyxVQUFDK0IsUUFBUTtRQUFBLE9BQUtBLFFBQVEsQ0FBQ3dCLElBQUksQ0FBQyxDQUFDO01BQUEsRUFBQztJQUN2RCxDQUFDO0lBQUFKLGVBQUEseUJBRWdCLFVBQUNLLElBQUksRUFBSztNQUN6QlAsS0FBSSxDQUFDUSxZQUFZLENBQUNyQyxTQUFTLEdBQUdvQyxJQUFJO01BQ2xDVCxLQUFLLENBQUNXLFlBQVksQ0FBQ1QsS0FBSSxDQUFDVSxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUFBUixlQUFBLDJCQUVrQixVQUFDOUQsS0FBSyxFQUFLO01BQzVCLElBQU11RSxNQUFNLEdBQUd2RSxLQUFLLENBQUN1RSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUM7TUFFeEMsSUFDRUQsTUFBTSxLQUFLLElBQUksSUFDZkEsTUFBTSxDQUFDRSxPQUFPLEtBQUssR0FBRyxJQUN0QkYsTUFBTSxDQUFDRyxVQUFVLENBQUMxQixJQUFJLEtBQUs1QixTQUFTLElBQ3BDbUQsTUFBTSxDQUFDRyxVQUFVLENBQUMxQixJQUFJLENBQUM3QixNQUFNLEtBQUssQ0FBQyxJQUNuQ29ELE1BQU0sQ0FBQ0csVUFBVSxDQUFDMUIsSUFBSSxDQUFDMkIsS0FBSyxLQUFLLEdBQUcsRUFDcEM7UUFDQTtNQUNGO01BRUEzRSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ3RCRCxLQUFLLENBQUM0RSxlQUFlLENBQUMsQ0FBQztNQUV2QixJQUFJTCxNQUFNLENBQUMvRCxPQUFPLENBQUNxRSxVQUFVLEtBQUt6RCxTQUFTLEVBQUU7UUFDM0M7UUFDQXdDLEtBQUksQ0FBQ2tCLFdBQVcsQ0FBQ1AsTUFBTSxDQUFDRyxVQUFVLENBQUMxQixJQUFJLENBQUMyQixLQUFLLENBQUMsQ0FBQ2hFLElBQUksQ0FBQ2lELEtBQUksQ0FBQ21CLGNBQWMsQ0FBQztRQUN4RTtNQUNGO01BRUFuQixLQUFJLENBQUNvQixhQUFhLENBQUNULE1BQU0sQ0FBQy9ELE9BQU8sQ0FBQ3FFLFVBQVUsQ0FBQztNQUM3Q3BCLE1BQU0sQ0FBQ0csS0FBSSxDQUFDVSxLQUFLLENBQUMsQ0FBQ0EsS0FBSyxDQUFDLE1BQU0sQ0FBQztNQUVoQyxJQUFJVyxPQUFPLENBQUNWLE1BQU0sQ0FBQy9ELE9BQU8sQ0FBQzBFLFlBQVksQ0FBQyxFQUFFO1FBQ3hDdEIsS0FBSSxDQUFDdUIsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQztNQUNwQjtJQUNGLENBQUM7SUFBQXRCLGVBQUEsNEJBRW1CLFVBQUM5RCxLQUFLLEVBQUs7TUFDN0JBLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFDdEJELEtBQUssQ0FBQzRFLGVBQWUsQ0FBQyxDQUFDO01BRXZCLElBQU1PLElBQUksR0FBR25GLEtBQUssQ0FBQ3VFLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sQ0FBQztNQUN6QyxJQUFNYSxRQUFRLEdBQUcsSUFBSUMsUUFBUSxDQUFDSCxJQUFJLENBQUM7TUFDbkMsSUFBTXBCLEdBQUcsR0FBR29CLElBQUksQ0FBQ0ksTUFBTTtNQUV2QnRCLEtBQUssQ0FBQ0YsR0FBRyxFQUFFO1FBQ1R5QixNQUFNLEVBQUUsTUFBTTtRQUNkQyxJQUFJLEVBQUVKLFFBQVE7UUFDZEssT0FBTyxFQUFFO1VBQ1Asa0JBQWtCLEVBQUU7UUFDdEI7TUFDRixDQUFDLENBQUMsQ0FDQy9FLElBQUksQ0FBQyxVQUFDK0IsUUFBUTtRQUFBLE9BQUtBLFFBQVEsQ0FBQ3dCLElBQUksQ0FBQyxDQUFDO01BQUEsRUFBQyxDQUNuQ3ZELElBQUksQ0FBQ2lELEtBQUksQ0FBQ21CLGNBQWMsQ0FBQztJQUU5QixDQUFDO0lBQUFqQixlQUFBLHdCQUVlLFVBQUNhLEtBQUssRUFBSztNQUN6QmYsS0FBSSxDQUFDK0IsWUFBWSxDQUFDaEIsS0FBSyxHQUFHQSxLQUFLO01BQy9CZixLQUFJLENBQUMrQixZQUFZLENBQUNDLGFBQWEsQ0FBQyxJQUFJQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQXRFQyxJQUFJLENBQUNWLElBQUksR0FBR3hGLFFBQVEsQ0FBQ21HLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDaEQsSUFBSSxDQUFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDUixJQUFJLENBQUM1RSxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ3ZELElBQUksQ0FBQytELEtBQUssR0FBRyxLQUFLO0lBQ2xCLElBQUksQ0FBQ0YsWUFBWSxHQUFHLEtBQUs7SUFDekIsSUFBSSxDQUFDSixhQUFhLEdBQUcsS0FBSztFQUM1QjtFQUFDLE9BQUErQixZQUFBLENBQUFwQyxjQUFBO0lBQUFxQyxHQUFBO0lBQUFyQixLQUFBLEVBbUVELFNBQUFzQixNQUFNQSxDQUFDakcsS0FBSyxFQUFFO01BQUEsSUFBQWtHLE1BQUE7TUFDWmxHLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFDdEJELEtBQUssQ0FBQzRFLGVBQWUsQ0FBQyxDQUFDOztNQUV2QjtNQUNBLElBQUksQ0FBQyxJQUFJLENBQUNOLEtBQUssRUFBRTtRQUNmLElBQUksQ0FBQ0EsS0FBSyxHQUFHM0UsUUFBUSxDQUFDbUcsY0FBYyxDQUFDLDRCQUE0QixDQUFDO1FBQ2xFLElBQUksQ0FBQ3hCLEtBQUssQ0FBQ3ZFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNvRyxnQkFBZ0IsQ0FBQztRQUMzRCxJQUFJLENBQUM3QixLQUFLLENBQUN2RSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDcUcsaUJBQWlCLENBQUM7UUFFN0QsSUFBSSxDQUFDaEMsWUFBWSxHQUFHekUsUUFBUSxDQUFDWSxhQUFhLDBDQUEwQyxDQUFDO1FBQ3JGWixRQUFRLENBQUM4RixJQUFJLENBQUNZLFdBQVcsQ0FBQyxJQUFJLENBQUMvQixLQUFLLENBQUM7UUFFckMzRSxRQUFRLENBQUNJLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDdUcsQ0FBQyxFQUFLO1VBQzFDLElBQUlBLENBQUMsQ0FBQ04sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN0QnZDLE1BQU0sQ0FBQ3lDLE1BQUksQ0FBQzVCLEtBQUssQ0FBQyxDQUFDQSxLQUFLLENBQUMsTUFBTSxDQUFDO1VBQ2xDO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7TUFFQSxJQUFJLENBQUNGLFlBQVksQ0FBQ3JDLFNBQVMsR0FBRyxFQUFFO01BRWhDLElBQUksQ0FBQytDLFdBQVcsQ0FBQzlFLEtBQUssQ0FBQ0csYUFBYSxDQUFDdUUsVUFBVSxDQUFDMUIsSUFBSSxDQUFDMkIsS0FBSyxHQUFHLEdBQUcsR0FBRzNFLEtBQUssQ0FBQ0csYUFBYSxDQUFDSyxPQUFPLENBQUMrRixNQUFNLENBQUMsQ0FBQzVGLElBQUksQ0FBQyxVQUFDd0QsSUFBSSxFQUFLO1FBQ3BIK0IsTUFBSSxDQUFDbkIsY0FBYyxDQUFDWixJQUFJLENBQUM7UUFDekJWLE1BQU0sQ0FBQ3lDLE1BQUksQ0FBQzVCLEtBQUssQ0FBQyxDQUFDQSxLQUFLLENBQUMsQ0FBQztRQUMxQlosS0FBSyxDQUFDOEMsZ0JBQWdCLENBQUNOLE1BQUksQ0FBQzVCLEtBQUssQ0FBQztNQUNwQyxDQUFDLENBQUM7TUFFRixPQUFPLEtBQUs7SUFDZDtFQUFDO0FBQUEsR0FDRjtBQUVELElBQU1tQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQXVCQSxDQUFBLEVBQVM7RUFDcENoRCxNQUFNLENBQUM5RCxRQUFRLENBQUMsQ0FBQytHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsVUFBVUosQ0FBQyxFQUFFO0lBQzFFLElBQUkzQyxjQUFjLENBQUMsQ0FBQyxDQUFDc0MsTUFBTSxDQUFDSyxDQUFDLENBQUM7RUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELGlFQUFlRyx1QkFBdUIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEh0QyxJQUFBbEQsT0FBQSxHQUEwQkMsTUFBTTtFQUF4QkMsTUFBTSxHQUFBRixPQUFBLENBQU5FLE1BQU07RUFBRUMsS0FBSyxHQUFBSCxPQUFBLENBQUxHLEtBQUs7QUFFckIsSUFBTWlELGFBQWE7RUFDakIsU0FBQUEsY0FBWUMsb0JBQW9CLEVBQUU7SUFBQSxJQUFBaEQsS0FBQTtJQUFBQyxlQUFBLE9BQUE4QyxhQUFBO0lBQUE3QyxlQUFBLHNCQVlwQixVQUFDQyxHQUFHLEVBQUs7TUFDckJILEtBQUksQ0FBQ0ksYUFBYSxHQUFHRCxHQUFHO01BQ3hCLE9BQU9FLEtBQUssQ0FBQ0YsR0FBRyxDQUFDLENBQUNwRCxJQUFJLENBQUMsVUFBQytCLFFBQVE7UUFBQSxPQUFLQSxRQUFRLENBQUN3QixJQUFJLENBQUMsQ0FBQztNQUFBLEVBQUM7SUFDdkQsQ0FBQztJQUFBSixlQUFBLHlCQUVnQixVQUFDSyxJQUFJLEVBQUs7TUFDekJQLEtBQUksQ0FBQ1EsWUFBWSxDQUFDckMsU0FBUyxHQUFHb0MsSUFBSTtNQUNsQ1QsS0FBSyxDQUFDVyxZQUFZLENBQUNULEtBQUksQ0FBQ1UsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFBQVIsZUFBQSwyQkFFa0IsVUFBQzlELEtBQUssRUFBSztNQUM1QixJQUFNdUUsTUFBTSxHQUFHdkUsS0FBSyxDQUFDdUUsTUFBTSxDQUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDO01BRXhDLElBQ0VELE1BQU0sS0FBSyxJQUFJLElBQ2ZBLE1BQU0sQ0FBQ0UsT0FBTyxLQUFLLEdBQUcsSUFDdEJGLE1BQU0sQ0FBQ0csVUFBVSxDQUFDMUIsSUFBSSxLQUFLNUIsU0FBUyxJQUNwQ21ELE1BQU0sQ0FBQ0csVUFBVSxDQUFDMUIsSUFBSSxDQUFDN0IsTUFBTSxLQUFLLENBQUMsSUFDbkNvRCxNQUFNLENBQUNHLFVBQVUsQ0FBQzFCLElBQUksQ0FBQzJCLEtBQUssS0FBSyxHQUFHLEVBQ3BDO1FBQ0E7TUFDRjtNQUVBM0UsS0FBSyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUN0QkQsS0FBSyxDQUFDNEUsZUFBZSxDQUFDLENBQUM7TUFFdkIsSUFBSUwsTUFBTSxDQUFDL0QsT0FBTyxDQUFDNEMsYUFBYSxLQUFLaEMsU0FBUyxJQUFJbUQsTUFBTSxDQUFDL0QsT0FBTyxDQUFDMkMsUUFBUSxLQUFLL0IsU0FBUyxFQUFFO1FBQ3ZGO1FBQ0F3QyxLQUFJLENBQUNrQixXQUFXLENBQUNQLE1BQU0sQ0FBQ0csVUFBVSxDQUFDMUIsSUFBSSxDQUFDMkIsS0FBSyxDQUFDLENBQUNoRSxJQUFJLENBQUNpRCxLQUFJLENBQUNtQixjQUFjLENBQUM7UUFDeEU7TUFDRjtNQUVBbkIsS0FBSSxDQUFDaUQsY0FBYyxDQUFDOUUsU0FBUyxHQUFHd0MsTUFBTSxDQUFDL0QsT0FBTyxDQUFDNEMsYUFBYTtNQUM1RFEsS0FBSSxDQUFDZ0Qsb0JBQW9CLENBQUNoRyxTQUFTLENBQUNHLE1BQU0sQ0FBQyxPQUFPLENBQUM7TUFDbkQ2QyxLQUFJLENBQUNvQixhQUFhLENBQUNULE1BQU0sQ0FBQy9ELE9BQU8sQ0FBQzJDLFFBQVEsQ0FBQztNQUMzQ1MsS0FBSSxDQUFDa0QsVUFBVSxDQUFDdEcsT0FBTyxDQUFDK0YsTUFBTSxHQUFHaEMsTUFBTSxDQUFDL0QsT0FBTyxDQUFDMEMsV0FBVztNQUMzRE8sTUFBTSxDQUFDRyxLQUFJLENBQUNVLEtBQUssQ0FBQyxDQUFDQSxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFBQVIsZUFBQSw0QkFFbUIsVUFBQzlELEtBQUssRUFBSztNQUM3QkEsS0FBSyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUN0QkQsS0FBSyxDQUFDNEUsZUFBZSxDQUFDLENBQUM7TUFFdkIsSUFBTU8sSUFBSSxHQUFHbkYsS0FBSyxDQUFDdUUsTUFBTSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDO01BQ3pDLElBQU1hLFFBQVEsR0FBRyxJQUFJQyxRQUFRLENBQUNILElBQUksQ0FBQztNQUNuQyxJQUFNcEIsR0FBRyxHQUFHb0IsSUFBSSxDQUFDSSxNQUFNO01BRXZCdEIsS0FBSyxDQUFDRixHQUFHLEVBQUU7UUFDVHlCLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLElBQUksRUFBRUosUUFBUTtRQUNkSyxPQUFPLEVBQUU7VUFDTCxrQkFBa0IsRUFBRTtRQUN4QjtNQUNGLENBQUMsQ0FBQyxDQUNDL0UsSUFBSSxDQUFDLFVBQUMrQixRQUFRO1FBQUEsT0FBS0EsUUFBUSxDQUFDd0IsSUFBSSxDQUFDLENBQUM7TUFBQSxFQUFDLENBQ25DdkQsSUFBSSxDQUFDaUQsS0FBSSxDQUFDbUIsY0FBYyxDQUFDO0lBRTlCLENBQUM7SUFBQWpCLGVBQUEsd0JBRWUsVUFBQ2EsS0FBSyxFQUFLO01BQ3pCZixLQUFJLENBQUMrQixZQUFZLENBQUNoQixLQUFLLEdBQUdBLEtBQUs7TUFDL0JmLEtBQUksQ0FBQytCLFlBQVksQ0FBQ0MsYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBekVDLElBQUksQ0FBQ2Usb0JBQW9CLEdBQUdBLG9CQUFvQjtJQUNoRCxJQUFJLENBQUNHLFlBQVksR0FBR0gsb0JBQW9CLENBQUNyRyxhQUFhLENBQUMsOEJBQThCLENBQUM7SUFDdEYsSUFBSSxDQUFDdUcsVUFBVSxHQUFHRixvQkFBb0IsQ0FBQ3JHLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztJQUNsRixJQUFJLENBQUN5RyxFQUFFLEdBQUdKLG9CQUFvQixDQUFDcEcsT0FBTyxDQUFDeUcsT0FBTztJQUM5QyxJQUFJLENBQUNKLGNBQWMsR0FBR2xILFFBQVEsQ0FBQ21HLGNBQWMseUJBQUFvQixNQUFBLENBQXlCLElBQUksQ0FBQ0YsRUFBRSxDQUFFLENBQUM7SUFDaEYsSUFBSSxDQUFDckIsWUFBWSxHQUFHaEcsUUFBUSxDQUFDbUcsY0FBYyxDQUFDLElBQUksQ0FBQ2tCLEVBQUUsQ0FBQztJQUNwRCxJQUFJLENBQUMxQyxLQUFLLEdBQUcsS0FBSztJQUNsQixJQUFJLENBQUNGLFlBQVksR0FBRyxLQUFLO0lBQ3pCLElBQUksQ0FBQ0osYUFBYSxHQUFHLEtBQUs7RUFDNUI7RUFBQyxPQUFBK0IsWUFBQSxDQUFBWSxhQUFBO0lBQUFYLEdBQUE7SUFBQXJCLEtBQUEsRUFrRUQsU0FBQXNCLE1BQU1BLENBQUNqRyxLQUFLLEVBQUU7TUFBQSxJQUFBa0csTUFBQTtNQUNabEcsS0FBSyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUN0QkQsS0FBSyxDQUFDNEUsZUFBZSxDQUFDLENBQUM7O01BRXZCO01BQ0EsSUFBSSxDQUFDLElBQUksQ0FBQ04sS0FBSyxFQUFFO1FBQ2YsSUFBSSxDQUFDQSxLQUFLLEdBQUczRSxRQUFRLENBQUNtRyxjQUFjLGlCQUFBb0IsTUFBQSxDQUFpQixJQUFJLENBQUNGLEVBQUUsQ0FBRSxDQUFDO1FBQy9ELElBQUksQ0FBQzFDLEtBQUssQ0FBQ3ZFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNvRyxnQkFBZ0IsQ0FBQztRQUMzRCxJQUFJLENBQUM3QixLQUFLLENBQUN2RSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDcUcsaUJBQWlCLENBQUM7UUFFN0QsSUFBSSxDQUFDaEMsWUFBWSxHQUFHekUsUUFBUSxDQUFDWSxhQUFhLGtCQUFBMkcsTUFBQSxDQUFrQixJQUFJLENBQUNGLEVBQUUsaUJBQWMsQ0FBQztRQUNsRnJILFFBQVEsQ0FBQzhGLElBQUksQ0FBQ1ksV0FBVyxDQUFDLElBQUksQ0FBQy9CLEtBQUssQ0FBQztRQUVyQzNFLFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUN1RyxDQUFDLEVBQUs7VUFDMUMsSUFBSUEsQ0FBQyxDQUFDTixHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3RCdkMsTUFBTSxDQUFDeUMsTUFBSSxDQUFDNUIsS0FBSyxDQUFDLENBQUNBLEtBQUssQ0FBQyxNQUFNLENBQUM7VUFDbEM7UUFDRixDQUFDLENBQUM7TUFDSjtNQUVBLElBQUksQ0FBQ0YsWUFBWSxDQUFDckMsU0FBUyxHQUFHLEVBQUU7TUFFaEMsSUFBSSxDQUFDK0MsV0FBVyxDQUFDLElBQUksQ0FBQ2dDLFVBQVUsQ0FBQ3BDLFVBQVUsQ0FBQzFCLElBQUksQ0FBQzJCLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDbUMsVUFBVSxDQUFDdEcsT0FBTyxDQUFDK0YsTUFBTSxDQUFDLENBQUM1RixJQUFJLENBQUMsVUFBQ3dELElBQUksRUFBSztRQUM1RytCLE1BQUksQ0FBQ25CLGNBQWMsQ0FBQ1osSUFBSSxDQUFDO1FBQ3pCVixNQUFNLENBQUN5QyxNQUFJLENBQUM1QixLQUFLLENBQUMsQ0FBQ0EsS0FBSyxDQUFDLENBQUM7UUFDMUJaLEtBQUssQ0FBQzhDLGdCQUFnQixDQUFDTixNQUFJLENBQUM1QixLQUFLLENBQUM7TUFDcEMsQ0FBQyxDQUFDO01BRUYsT0FBTyxLQUFLO0lBQ2Q7RUFBQztJQUFBMEIsR0FBQTtJQUFBckIsS0FBQSxFQUVELFNBQUF3QyxPQUFNQSxDQUFDbkgsS0FBSyxFQUFFO01BQ1pBLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFDdEJELEtBQUssQ0FBQzRFLGVBQWUsQ0FBQyxDQUFDO01BRXZCLElBQUksQ0FBQ2dDLG9CQUFvQixDQUFDaEcsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQ2hELElBQU11RyxRQUFRLEdBQUd6SCxRQUFRLENBQUNtRyxjQUFjLHdCQUFBb0IsTUFBQSxDQUF3QixJQUFJLENBQUNGLEVBQUUsQ0FBRSxDQUFDO01BQzFFLElBQUksQ0FBQ0gsY0FBYyxDQUFDOUUsU0FBUyxHQUFHLEVBQUU7TUFDbEMsSUFBSSxDQUFDOEUsY0FBYyxDQUFDUixXQUFXLENBQUNlLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7TUFFakUsSUFBSSxDQUFDUixVQUFVLENBQUN0RyxPQUFPLENBQUMrRixNQUFNLEdBQUcsRUFBRTtNQUNuQyxJQUFJLENBQUN2QixhQUFhLENBQUMsRUFBRSxDQUFDO0lBQ3hCO0VBQUM7QUFBQSxHQUNGO0FBRUQsSUFBTXVDLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBUztFQUNuQyxJQUFNQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0VBRXpCLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLElBQUksRUFBSztJQUNqQyxJQUFNQyxTQUFTLEdBQUdELElBQUksQ0FBQ2xELE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQztJQUNqRSxJQUFNeUMsT0FBTyxHQUFHVSxTQUFTLENBQUNuSCxPQUFPLENBQUN5RyxPQUFPO0lBRXpDLElBQUksQ0FBQ08sY0FBYyxDQUFDUCxPQUFPLENBQUMsRUFBRTtNQUM1Qk8sY0FBYyxDQUFDUCxPQUFPLENBQUMsR0FBRyxJQUFJTixhQUFhLENBQUNnQixTQUFTLENBQUM7SUFDeEQ7SUFFQSxPQUFPSCxjQUFjLENBQUNQLE9BQU8sQ0FBQztFQUNoQyxDQUFDO0VBRUR4RCxNQUFNLENBQUM5RCxRQUFRLENBQUMsQ0FBQytHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsVUFBVUosQ0FBQyxFQUFFO0lBQ3hFbUIsZ0JBQWdCLENBQUNuQixDQUFDLENBQUMvQixNQUFNLENBQUMsVUFBTyxDQUFDK0IsQ0FBQyxDQUFDO0VBQ3RDLENBQUMsQ0FBQztFQUVGN0MsTUFBTSxDQUFDOUQsUUFBUSxDQUFDLENBQUMrRyxFQUFFLENBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFVBQVVKLENBQUMsRUFBRTtJQUN0RW1CLGdCQUFnQixDQUFDbkIsQ0FBQyxDQUFDL0IsTUFBTSxDQUFDLENBQUMwQixNQUFNLENBQUNLLENBQUMsQ0FBQztFQUN0QyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsaUVBQWVpQixzQkFBc0IsRTs7Ozs7Ozs7Ozs7QUNuSnJDOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ2U7QUFDa0I7QUFDRjtBQUNSO0FBRXhELElBQUFoRSxPQUFBLEdBQW1CQyxNQUFNO0VBQWpCQyxNQUFNLEdBQUFGLE9BQUEsQ0FBTkUsTUFBTTtBQUVkOUQsUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2xEMEcsc0VBQXVCLENBQUMsQ0FBQztFQUN6QmMscUVBQXNCLENBQUMsQ0FBQztFQUN4QjlILGlFQUFrQixDQUFDLENBQUM7RUFDcEIsSUFBSW1JLGdCQUFnQixHQUFHLElBQUk7RUFFM0IsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQVVBLENBQUl0RCxNQUFNLEVBQUV1RCxXQUFXLEVBQUs7SUFDMUMsSUFBTUMsV0FBVyxHQUFHeEQsTUFBTSxDQUFDQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7SUFDOUQsSUFBSXdELFVBQVUsR0FBRyxJQUFJO0lBRXJCLFNBQUFDLEVBQUEsTUFBQUMsSUFBQSxHQUFtQixDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLENBQUMsRUFBQUQsRUFBQSxHQUFBQyxJQUFBLENBQUEvRyxNQUFBLEVBQUE4RyxFQUFBLElBQUU7TUFBakUsSUFBTUUsSUFBSSxHQUFBRCxJQUFBLENBQUFELEVBQUE7TUFDYixJQUFNRyxhQUFhLEdBQUdMLFdBQVcsQ0FBQ3hILGFBQWEsQ0FBQyxHQUFHLEdBQUc0SCxJQUFJLEdBQUcsWUFBWSxDQUFDO01BRTFFLElBQUlDLGFBQWEsRUFBRTtRQUNqQixJQUFJRCxJQUFJLEtBQUtMLFdBQVcsRUFBRTtVQUN4Qk0sYUFBYSxDQUFDeEgsU0FBUyxDQUFDRyxNQUFNLENBQUNvSCxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2xELENBQUMsTUFBTTtVQUNMQyxhQUFhLENBQUN4SCxTQUFTLENBQUN5SCxNQUFNLENBQUNGLElBQUksR0FBRyxTQUFTLENBQUM7VUFDaERILFVBQVUsR0FBR0ksYUFBYTtRQUM1QjtNQUNGO0lBQ0Y7SUFFQSxPQUFPSixVQUFVO0VBQ25CLENBQUM7RUFFRHZFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQ2lELEVBQUUsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsVUFBVUosQ0FBQyxFQUFFO0lBQ3hFQSxDQUFDLENBQUNyRyxjQUFjLENBQUMsQ0FBQztJQUNsQnFHLENBQUMsQ0FBQzFCLGVBQWUsQ0FBQyxDQUFDO0lBQ25CLElBQU0wRCxnQkFBZ0IsR0FBR1QsVUFBVSxDQUFDdkIsQ0FBQyxDQUFDL0IsTUFBTSxFQUFFLGVBQWUsQ0FBQztJQUM5RCtELGdCQUFnQixDQUFDL0gsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUNnSSxLQUFLLENBQUMsQ0FBQztFQUM1RCxDQUFDLENBQUM7RUFFRjlFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQ2lELEVBQUUsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsVUFBVUosQ0FBQyxFQUFFO0lBQ3hFQSxDQUFDLENBQUNyRyxjQUFjLENBQUMsQ0FBQztJQUNsQnFHLENBQUMsQ0FBQzFCLGVBQWUsQ0FBQyxDQUFDO0lBRW5CLElBQU00RCxnQkFBZ0IsR0FBR1gsVUFBVSxDQUFDdkIsQ0FBQyxDQUFDL0IsTUFBTSxFQUFFLGtCQUFrQixDQUFDO0lBQ2pFaUUsZ0JBQWdCLENBQUNqSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQ2dJLEtBQUssQ0FBQyxDQUFDO0VBQzVELENBQUMsQ0FBQztFQUVGOUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDaUQsRUFBRSxDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxVQUFVSixDQUFDLEVBQUU7SUFDeEVBLENBQUMsQ0FBQ3JHLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCcUcsQ0FBQyxDQUFDMUIsZUFBZSxDQUFDLENBQUM7SUFFbkIsSUFBSUssT0FBTyxDQUFDcUIsQ0FBQyxDQUFDbkcsYUFBYSxDQUFDSyxPQUFPLENBQUN5RSxPQUFPLENBQUMsRUFBRTtNQUM1Q3RGLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM2RSxNQUFNLENBQUMsQ0FBQztJQUMzRDtFQUNGLENBQUMsQ0FBQztFQUVGM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDaUQsRUFBRSxDQUFDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxVQUFVSixDQUFDLEVBQUU7SUFDcEVBLENBQUMsQ0FBQ3JHLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCcUcsQ0FBQyxDQUFDMUIsZUFBZSxDQUFDLENBQUM7SUFFbkIsSUFBTXZELFFBQVEsR0FBR3dHLFVBQVUsQ0FBQ3ZCLENBQUMsQ0FBQy9CLE1BQU0sRUFBRSxVQUFVLENBQUM7SUFFakQsSUFBSSxDQUFDbEQsUUFBUSxDQUFDVCxTQUFTLENBQUM2SCxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtNQUN4RGIsZ0JBQWdCLEdBQUczRyxnRUFBVyxDQUFDSSxRQUFRLENBQUNkLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO01BQ25GYyxRQUFRLENBQUNULFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO0lBQ2hEO0lBRUEsSUFBSSxDQUFDUSxRQUFRLENBQUNULFNBQVMsQ0FBQzZILFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO01BQ25EYixnQkFBZ0IsQ0FBQ2MsY0FBYyxDQUFDLElBQUksQ0FBQztJQUN2QztFQUNGLENBQUMsQ0FBQztFQUVGakYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDaUQsRUFBRSxDQUFDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxVQUFVSixDQUFDLEVBQUU7SUFDdkVBLENBQUMsQ0FBQ3JHLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCcUcsQ0FBQyxDQUFDMUIsZUFBZSxDQUFDLENBQUM7SUFFbkIsSUFBTW1ELFdBQVcsR0FBR3pCLENBQUMsQ0FBQy9CLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ3ZELElBQU1tRSxjQUFjLEdBQUdaLFdBQVcsQ0FBQ3hILGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztJQUUxRW9JLGNBQWMsQ0FBQy9ILFNBQVMsQ0FBQ3lILE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDaERNLGNBQWMsQ0FBQ3BJLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDZ0ksS0FBSyxDQUFDLENBQUM7RUFDMUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRlbHRhYmxvdC9kcm9wem9uZS9kaXN0L2Ryb3B6b25lLm1qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL1NvbmF0YUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL1NvbmF0YUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Ryb3B6b25lLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvU29uYXRhQWRtaW4vYXNzZXRzL2pzL2NvbXBvbmVudHMvZm9sZGVyU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9Tb25hdGFBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9tZWRpYVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvU29uYXRhQWRtaW4vYXNzZXRzL3N0eWxlcy9qb2xpbWVkaWEuY3NzPzRiZmMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9Tb25hdGFBZG1pbi9hc3NldHMvanMvam9saS1tZWRpYS1zb25hdGEtYWRtaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIEVtaXR0ZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY2FsbCBgLm9uKClgIG9uIERyb3B6b25lIHRvIGxpc3RlblxuLy8gdG8gZXZlbnRzLlxuLy8gSXQgaXMgc3Ryb25nbHkgYmFzZWQgb24gY29tcG9uZW50J3MgZW1pdHRlciBjbGFzcywgYW5kIEkgcmVtb3ZlZCB0aGVcbi8vIGZ1bmN0aW9uYWxpdHkgYmVjYXVzZSBvZiB0aGUgZGVwZW5kZW5jeSBoZWxsIHdpdGggZGlmZmVyZW50IGZyYW1ld29ya3MuXG5jbGFzcyAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5IHtcbiAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50XG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgLy8gQ3JlYXRlIG5hbWVzcGFjZSBmb3IgdGhpcyBldmVudFxuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudF0pIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSBbXTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykgZm9yIChsZXQgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKWNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAvLyB0cmlnZ2VyIGEgY29ycmVzcG9uZGluZyBET00gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQodGhpcy5tYWtlRXZlbnQoXCJkcm9wem9uZTpcIiArIGV2ZW50LCB7XG4gICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG1ha2VFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IGRldGFpbFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgcGFyYW1zKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJRSAxMSBzdXBwb3J0XG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmb3IgZ2l2ZW4gZXZlbnQuIElmIGZuIGlzIG5vdCBwcm92aWRlZCwgYWxsIGV2ZW50XG4gICAgLy8gbGlzdGVuZXJzIGZvciB0aGF0IGV2ZW50IHdpbGwgYmUgcmVtb3ZlZC4gSWYgbmVpdGhlciBpcyBwcm92aWRlZCwgYWxsXG4gICAgLy8gZXZlbnQgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICBvZmYoZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG5cbnZhciAkYjVjYjVmMDk0YzJlMTc2NCRleHBvcnQkMmUyYmNkODczOWFlMDM5ID0gYFxuPGRpdiBjbGFzcz1cImR6LXByZXZpZXcgZHotZmlsZS1wcmV2aWV3XCI+XG4gIDxkaXYgY2xhc3M9XCJkei1pbWFnZVwiPjxpbWcgZGF0YS1kei10aHVtYm5haWwgLz48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImR6LWRldGFpbHNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZHotc2l6ZVwiPjxzcGFuIGRhdGEtZHotc2l6ZT48L3NwYW4+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImR6LWZpbGVuYW1lXCI+PHNwYW4gZGF0YS1kei1uYW1lPjwvc3Bhbj48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkei1wcm9ncmVzc1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiZHotdXBsb2FkXCIgZGF0YS1kei11cGxvYWRwcm9ncmVzcz48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWVzc2FnZVwiPjxzcGFuIGRhdGEtZHotZXJyb3JtZXNzYWdlPjwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImR6LXN1Y2Nlc3MtbWFya1wiPlxuICAgIDxzdmdcbiAgICAgIHdpZHRoPVwiNTRcIlxuICAgICAgaGVpZ2h0PVwiNTRcIlxuICAgICAgdmlld0JveD1cIjAgMCA1NCA1NFwiXG4gICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgPlxuICAgICAgPHBhdGhcbiAgICAgICAgZD1cIk0xMC4yMDcxIDI5Ljc5MjlMMTQuMjkyOSAyNS43MDcxQzE0LjY4MzQgMjUuMzE2NiAxNS4zMTY2IDI1LjMxNjYgMTUuNzA3MSAyNS43MDcxTDIxLjI5MjkgMzEuMjkyOUMyMS42ODM0IDMxLjY4MzQgMjIuMzE2NiAzMS42ODM0IDIyLjcwNzEgMzEuMjkyOUwzOC4yOTI5IDE1LjcwNzFDMzguNjgzNCAxNS4zMTY2IDM5LjMxNjYgMTUuMzE2NiAzOS43MDcxIDE1LjcwNzFMNDMuNzkyOSAxOS43OTI5QzQ0LjE4MzQgMjAuMTgzNCA0NC4xODM0IDIwLjgxNjYgNDMuNzkyOSAyMS4yMDcxTDIyLjcwNzEgNDIuMjkyOUMyMi4zMTY2IDQyLjY4MzQgMjEuNjgzNCA0Mi42ODM0IDIxLjI5MjkgNDIuMjkyOUwxMC4yMDcxIDMxLjIwNzFDOS44MTY1OCAzMC44MTY2IDkuODE2NTggMzAuMTgzNCAxMC4yMDcxIDI5Ljc5MjlaXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWFya1wiPlxuICAgIDxzdmdcbiAgICAgIHdpZHRoPVwiNTRcIlxuICAgICAgaGVpZ2h0PVwiNTRcIlxuICAgICAgdmlld0JveD1cIjAgMCA1NCA1NFwiXG4gICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgPlxuICAgICAgPHBhdGhcbiAgICAgICAgZD1cIk0yNi4yOTI5IDIwLjI5MjlMMTkuMjA3MSAxMy4yMDcxQzE4LjgxNjYgMTIuODE2NiAxOC4xODM0IDEyLjgxNjYgMTcuNzkyOSAxMy4yMDcxTDEzLjIwNzEgMTcuNzkyOUMxMi44MTY2IDE4LjE4MzQgMTIuODE2NiAxOC44MTY2IDEzLjIwNzEgMTkuMjA3MUwyMC4yOTI5IDI2LjI5MjlDMjAuNjgzNCAyNi42ODM0IDIwLjY4MzQgMjcuMzE2NiAyMC4yOTI5IDI3LjcwNzFMMTMuMjA3MSAzNC43OTI5QzEyLjgxNjYgMzUuMTgzNCAxMi44MTY2IDM1LjgxNjYgMTMuMjA3MSAzNi4yMDcxTDE3Ljc5MjkgNDAuNzkyOUMxOC4xODM0IDQxLjE4MzQgMTguODE2NiA0MS4xODM0IDE5LjIwNzEgNDAuNzkyOUwyNi4yOTI5IDMzLjcwNzFDMjYuNjgzNCAzMy4zMTY2IDI3LjMxNjYgMzMuMzE2NiAyNy43MDcxIDMzLjcwNzFMMzQuNzkyOSA0MC43OTI5QzM1LjE4MzQgNDEuMTgzNCAzNS44MTY2IDQxLjE4MzQgMzYuMjA3MSA0MC43OTI5TDQwLjc5MjkgMzYuMjA3MUM0MS4xODM0IDM1LjgxNjYgNDEuMTgzNCAzNS4xODM0IDQwLjc5MjkgMzQuNzkyOUwzMy43MDcxIDI3LjcwNzFDMzMuMzE2NiAyNy4zMTY2IDMzLjMxNjYgMjYuNjgzNCAzMy43MDcxIDI2LjI5MjlMNDAuNzkyOSAxOS4yMDcxQzQxLjE4MzQgMTguODE2NiA0MS4xODM0IDE4LjE4MzQgNDAuNzkyOSAxNy43OTI5TDM2LjIwNzEgMTMuMjA3MUMzNS44MTY2IDEyLjgxNjYgMzUuMTgzNCAxMi44MTY2IDM0Ljc5MjkgMTMuMjA3MUwyNy43MDcxIDIwLjI5MjlDMjcuMzE2NiAyMC42ODM0IDI2LjY4MzQgMjAuNjgzNCAyNi4yOTI5IDIwLjI5MjlaXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gIDwvZGl2PlxuPC9kaXY+YDtcblxuXG5sZXQgJDRjYTM2NzE4Mjc3NmY4MGIkdmFyJGRlZmF1bHRPcHRpb25zID0ge1xuICAgIC8qKlxuICAgKiBIYXMgdG8gYmUgc3BlY2lmaWVkIG9uIGVsZW1lbnRzIG90aGVyIHRoYW4gZm9ybSAob3Igd2hlbiB0aGUgZm9ybSBkb2Vzbid0XG4gICAqIGhhdmUgYW4gYGFjdGlvbmAgYXR0cmlidXRlKS5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmRcbiAgICogYGRhdGFCbG9ja3NgICBhbmQgbXVzdCByZXR1cm4gdGhlIHVybCBhcyBzdHJpbmcuXG4gICAqLyB1cmw6IG51bGwsXG4gICAgLyoqXG4gICAqIENhbiBiZSBjaGFuZ2VkIHRvIGBcInB1dFwiYCBpZiBuZWNlc3NhcnkuIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgZnVuY3Rpb25cbiAgICogdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kIG11c3QgcmV0dXJuIHRoZSBtZXRob2QgKHNpbmNlIGB2My4xMi4wYCkuXG4gICAqLyBtZXRob2Q6IFwicG9zdFwiLFxuICAgIC8qKlxuICAgKiBXaWxsIGJlIHNldCBvbiB0aGUgWEhSZXF1ZXN0LlxuICAgKi8gd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAvKipcbiAgICogVGhlIHRpbWVvdXQgZm9yIHRoZSBYSFIgcmVxdWVzdHMgaW4gbWlsbGlzZWNvbmRzIChzaW5jZSBgdjQuNC4wYCkuXG4gICAqIElmIHNldCB0byBudWxsIG9yIDAsIG5vIHRpbWVvdXQgaXMgZ29pbmcgdG8gYmUgc2V0LlxuICAgKi8gdGltZW91dDogbnVsbCxcbiAgICAvKipcbiAgICogSG93IG1hbnkgZmlsZSB1cGxvYWRzIHRvIHByb2Nlc3MgaW4gcGFyYWxsZWwgKFNlZSB0aGVcbiAgICogRW5xdWV1aW5nIGZpbGUgdXBsb2FkcyBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mbylcbiAgICovIHBhcmFsbGVsVXBsb2FkczogMixcbiAgICAvKipcbiAgICogV2hldGhlciB0byBzZW5kIG11bHRpcGxlIGZpbGVzIGluIG9uZSByZXF1ZXN0LiBJZlxuICAgKiB0aGlzIGl0IHNldCB0byB0cnVlLCB0aGVuIHRoZSBmYWxsYmFjayBmaWxlIGlucHV0IGVsZW1lbnQgd2lsbFxuICAgKiBoYXZlIHRoZSBgbXVsdGlwbGVgIGF0dHJpYnV0ZSBhcyB3ZWxsLiBUaGlzIG9wdGlvbiB3aWxsXG4gICAqIGFsc28gdHJpZ2dlciBhZGRpdGlvbmFsIGV2ZW50cyAobGlrZSBgcHJvY2Vzc2luZ211bHRpcGxlYCkuIFNlZSB0aGUgZXZlbnRzXG4gICAqIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcbiAgICAvKipcbiAgICogV2hldGhlciB5b3Ugd2FudCBmaWxlcyB0byBiZSB1cGxvYWRlZCBpbiBjaHVua3MgdG8geW91ciBzZXJ2ZXIuIFRoaXMgY2FuJ3QgYmVcbiAgICogdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGB1cGxvYWRNdWx0aXBsZWAuXG4gICAqXG4gICAqIFNlZSBbY2h1bmtzVXBsb2FkZWRdKCNjb25maWctY2h1bmtzVXBsb2FkZWQpIGZvciB0aGUgY2FsbGJhY2sgdG8gZmluYWxpc2UgYW4gdXBsb2FkLlxuICAgKi8gY2h1bmtpbmc6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBJZiBgY2h1bmtpbmdgIGlzIGVuYWJsZWQsIHRoaXMgZGVmaW5lcyB3aGV0aGVyICoqZXZlcnkqKiBmaWxlIHNob3VsZCBiZSBjaHVua2VkLFxuICAgKiBldmVuIGlmIHRoZSBmaWxlIHNpemUgaXMgYmVsb3cgY2h1bmtTaXplLiBUaGlzIG1lYW5zLCB0aGF0IHRoZSBhZGRpdGlvbmFsIGNodW5rXG4gICAqIGZvcm0gZGF0YSB3aWxsIGJlIHN1Ym1pdHRlZCBhbmQgdGhlIGBjaHVua3NVcGxvYWRlZGAgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkLlxuICAgKi8gZm9yY2VDaHVua2luZzogZmFsc2UsXG4gICAgLyoqXG4gICAqIElmIGBjaHVua2luZ2AgaXMgYHRydWVgLCB0aGVuIHRoaXMgZGVmaW5lcyB0aGUgY2h1bmsgc2l6ZSBpbiBieXRlcy5cbiAgICovIGNodW5rU2l6ZTogMjA5NzE1MixcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgaW5kaXZpZHVhbCBjaHVua3Mgb2YgYSBmaWxlIGFyZSBiZWluZyB1cGxvYWRlZCBzaW11bHRhbmVvdXNseS5cbiAgICogVGhlIGxpbWl0IG9mIGNvbmN1cnJlbnQgY29ubmVjdGlvbnMgaXMgZ292ZXJuZWQgYnkgYHBhcmFsbGVsVXBsb2Fkc2AuXG4gICAqLyBwYXJhbGxlbENodW5rVXBsb2FkczogZmFsc2UsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgYSBjaHVuayBzaG91bGQgYmUgcmV0cmllZCBpZiBpdCBmYWlscy5cbiAgICovIHJldHJ5Q2h1bmtzOiBmYWxzZSxcbiAgICAvKipcbiAgICogSWYgYHJldHJ5Q2h1bmtzYCBpcyB0cnVlLCBob3cgbWFueSB0aW1lcyBzaG91bGQgaXQgYmUgcmV0cmllZC5cbiAgICovIHJldHJ5Q2h1bmtzTGltaXQ6IDMsXG4gICAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGZpbGVzaXplIChpbiBNaUIpIHRoYXQgaXMgYWxsb3dlZCB0byBiZSB1cGxvYWRlZC5cbiAgICovIG1heEZpbGVzaXplOiAyNTYsXG4gICAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBmaWxlIHBhcmFtIHRoYXQgZ2V0cyB0cmFuc2ZlcnJlZC5cbiAgICogKipOT1RFKio6IElmIHlvdSBoYXZlIHRoZSBvcHRpb24gIGB1cGxvYWRNdWx0aXBsZWAgc2V0IHRvIGB0cnVlYCwgdGhlblxuICAgKiBEcm9wem9uZSB3aWxsIGFwcGVuZCBgW11gIHRvIHRoZSBuYW1lLlxuICAgKi8gcGFyYW1OYW1lOiBcImZpbGVcIixcbiAgICAvKipcbiAgICogV2hldGhlciB0aHVtYm5haWxzIGZvciBpbWFnZXMgc2hvdWxkIGJlIGdlbmVyYXRlZFxuICAgKi8gY3JlYXRlSW1hZ2VUaHVtYm5haWxzOiB0cnVlLFxuICAgIC8qKlxuICAgKiBJbiBNQi4gV2hlbiB0aGUgZmlsZW5hbWUgZXhjZWVkcyB0aGlzIGxpbWl0LCB0aGUgdGh1bWJuYWlsIHdpbGwgbm90IGJlIGdlbmVyYXRlZC5cbiAgICovIG1heFRodW1ibmFpbEZpbGVzaXplOiAxMCxcbiAgICAvKipcbiAgICogSWYgYG51bGxgLCB0aGUgcmF0aW8gb2YgdGhlIGltYWdlIHdpbGwgYmUgdXNlZCB0byBjYWxjdWxhdGUgaXQuXG4gICAqLyB0aHVtYm5haWxXaWR0aDogMTIwLFxuICAgIC8qKlxuICAgKiBUaGUgc2FtZSBhcyBgdGh1bWJuYWlsV2lkdGhgLiBJZiBib3RoIGFyZSBudWxsLCBpbWFnZXMgd2lsbCBub3QgYmUgcmVzaXplZC5cbiAgICovIHRodW1ibmFpbEhlaWdodDogMTIwLFxuICAgIC8qKlxuICAgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgdGh1bWJuYWlsV2lkdGhgIGFuZCBgdGh1bWJuYWlsSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXG4gICAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cbiAgICovIHRodW1ibmFpbE1ldGhvZDogXCJjcm9wXCIsXG4gICAgLyoqXG4gICAqIElmIHNldCwgaW1hZ2VzIHdpbGwgYmUgcmVzaXplZCB0byB0aGVzZSBkaW1lbnNpb25zIGJlZm9yZSBiZWluZyAqKnVwbG9hZGVkKiouXG4gICAqIElmIG9ubHkgb25lLCBgcmVzaXplV2lkdGhgICoqb3IqKiBgcmVzaXplSGVpZ2h0YCBpcyBwcm92aWRlZCwgdGhlIG9yaWdpbmFsIGFzcGVjdFxuICAgKiByYXRpbyBvZiB0aGUgZmlsZSB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICpcbiAgICogVGhlIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uIHVzZXMgdGhlc2Ugb3B0aW9ucywgc28gaWYgdGhlIGB0cmFuc2Zvcm1GaWxlYCBmdW5jdGlvblxuICAgKiBpcyBvdmVycmlkZGVuLCB0aGVzZSBvcHRpb25zIGRvbid0IGRvIGFueXRoaW5nLlxuICAgKi8gcmVzaXplV2lkdGg6IG51bGwsXG4gICAgLyoqXG4gICAqIFNlZSBgcmVzaXplV2lkdGhgLlxuICAgKi8gcmVzaXplSGVpZ2h0OiBudWxsLFxuICAgIC8qKlxuICAgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSByZXNpemVkIGltYWdlIChiZWZvcmUgaXQgZ2V0cyB1cGxvYWRlZCB0byB0aGUgc2VydmVyKS5cbiAgICogSWYgYG51bGxgIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgd2lsbCBiZSB1c2VkLiBUbyBmb3JjZSBqcGVnLCBmb3IgZXhhbXBsZSwgdXNlIGBpbWFnZS9qcGVnYC5cbiAgICogU2VlIGByZXNpemVXaWR0aGAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqLyByZXNpemVNaW1lVHlwZTogbnVsbCxcbiAgICAvKipcbiAgICogVGhlIHF1YWxpdHkgb2YgdGhlIHJlc2l6ZWQgaW1hZ2VzLiBTZWUgYHJlc2l6ZVdpZHRoYC5cbiAgICovIHJlc2l6ZVF1YWxpdHk6IDAuOCxcbiAgICAvKipcbiAgICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgYXJlIHByb3ZpZGVkLlxuICAgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXG4gICAqLyByZXNpemVNZXRob2Q6IFwiY29udGFpblwiLFxuICAgIC8qKlxuICAgKiBUaGUgYmFzZSB0aGF0IGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSAqKmRpc3BsYXllZCoqIGZpbGVzaXplLiBZb3UgY2FuXG4gICAqIGNoYW5nZSB0aGlzIHRvIDEwMjQgaWYgeW91IHdvdWxkIHJhdGhlciBkaXNwbGF5IGtpYmlieXRlcywgbWViaWJ5dGVzLFxuICAgKiBldGMuLi4gMTAyNCBpcyB0ZWNobmljYWxseSBpbmNvcnJlY3QsIGJlY2F1c2UgYDEwMjQgYnl0ZXNgIGFyZSBgMSBraWJpYnl0ZWBcbiAgICogbm90IGAxIGtpbG9ieXRlYC4gWW91IGNhbiBjaGFuZ2UgdGhpcyB0byBgMTAyNGAgaWYgeW91IGRvbid0IGNhcmUgYWJvdXRcbiAgICogdmFsaWRpdHkuXG4gICAqLyBmaWxlc2l6ZUJhc2U6IDEwMDAsXG4gICAgLyoqXG4gICAqIElmIG5vdCBgbnVsbGAgZGVmaW5lcyBob3cgbWFueSBmaWxlcyB0aGlzIERyb3B6b25lIGhhbmRsZXMuIElmIGl0IGV4Y2VlZHMsXG4gICAqIHRoZSBldmVudCBgbWF4ZmlsZXNleGNlZWRlZGAgd2lsbCBiZSBjYWxsZWQuIFRoZSBkcm9wem9uZSBlbGVtZW50IGdldHMgdGhlXG4gICAqIGNsYXNzIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgYWNjb3JkaW5nbHkgc28geW91IGNhbiBwcm92aWRlIHZpc3VhbFxuICAgKiBmZWVkYmFjay5cbiAgICovIG1heEZpbGVzOiBudWxsLFxuICAgIC8qKlxuICAgKiBBbiBvcHRpb25hbCBvYmplY3QgdG8gc2VuZCBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gdGhlIHNlcnZlci4gRWc6XG4gICAqIGB7IFwiTXktQXdlc29tZS1IZWFkZXJcIjogXCJoZWFkZXIgdmFsdWVcIiB9YFxuICAgKi8gaGVhZGVyczogbnVsbCxcbiAgICAvKipcbiAgICogU2hvdWxkIHRoZSBkZWZhdWx0IGhlYWRlcnMgYmUgc2V0IG9yIG5vdD9cbiAgICogQWNjZXB0OiBhcHBsaWNhdGlvbi9qc29uIDwtIGZvciByZXF1ZXN0aW5nIGpzb24gcmVzcG9uc2VcbiAgICogQ2FjaGUtQ29udHJvbDogbm8tY2FjaGUgPC0gUmVxdWVzdCBzaG91bGRuJ3QgYmUgY2FjaGVkXG4gICAqIFgtUmVxdWVzdGVkLVdpdGg6IFhNTEh0dHBSZXF1ZXN0IDwtIFdlIHNlbnQgdGhlIHJlcXVlc3QgdmlhIFhNTEh0dHBSZXF1ZXN0XG4gICAqLyBkZWZhdWx0SGVhZGVyczogdHJ1ZSxcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgZHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgd2lsbCBiZSBjbGlja2FibGUsIGlmIGBmYWxzZWBcbiAgICogbm90aGluZyB3aWxsIGJlIGNsaWNrYWJsZS5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHBhc3MgYW4gSFRNTCBlbGVtZW50LCBhIENTUyBzZWxlY3RvciAoZm9yIG11bHRpcGxlIGVsZW1lbnRzKVxuICAgKiBvciBhbiBhcnJheSBvZiB0aG9zZS4gSW4gdGhhdCBjYXNlLCBhbGwgb2YgdGhvc2UgZWxlbWVudHMgd2lsbCB0cmlnZ2VyIGFuXG4gICAqIHVwbG9hZCB3aGVuIGNsaWNrZWQuXG4gICAqLyBjbGlja2FibGU6IHRydWUsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgaGlkZGVuIGZpbGVzIGluIGRpcmVjdG9yaWVzIHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi8gaWdub3JlSGlkZGVuRmlsZXM6IHRydWUsXG4gICAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBhY2NlcHRgIGNoZWNrcyB0aGUgZmlsZSdzIG1pbWUgdHlwZSBvclxuICAgKiBleHRlbnNpb24gYWdhaW5zdCB0aGlzIGxpc3QuIFRoaXMgaXMgYSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBtaW1lXG4gICAqIHR5cGVzIG9yIGZpbGUgZXh0ZW5zaW9ucy5cbiAgICpcbiAgICogRWcuOiBgaW1hZ2UvKixhcHBsaWNhdGlvbi9wZGYsLnBzZGBcbiAgICpcbiAgICogSWYgdGhlIERyb3B6b25lIGlzIGBjbGlja2FibGVgIHRoaXMgb3B0aW9uIHdpbGwgYWxzbyBiZSB1c2VkIGFzXG4gICAqIFtgYWNjZXB0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHQpXG4gICAqIHBhcmFtZXRlciBvbiB0aGUgaGlkZGVuIGZpbGUgaW5wdXQgYXMgd2VsbC5cbiAgICovIGFjY2VwdGVkRmlsZXM6IG51bGwsXG4gICAgLyoqXG4gICAqIElmIGZhbHNlLCBmaWxlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWV1ZSBidXQgdGhlIHF1ZXVlIHdpbGwgbm90IGJlXG4gICAqIHByb2Nlc3NlZCBhdXRvbWF0aWNhbGx5LlxuICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgeW91IG5lZWQgc29tZSBhZGRpdGlvbmFsIHVzZXIgaW5wdXQgYmVmb3JlIHNlbmRpbmdcbiAgICogZmlsZXMgKG9yIGlmIHlvdSB3YW50IHdhbnQgYWxsIGZpbGVzIHNlbnQgYXQgb25jZSkuXG4gICAqIElmIHlvdSdyZSByZWFkeSB0byBzZW5kIHRoZSBmaWxlIHNpbXBseSBjYWxsIGBteURyb3B6b25lLnByb2Nlc3NRdWV1ZSgpYC5cbiAgICpcbiAgICogU2VlIHRoZSBbZW5xdWV1aW5nIGZpbGUgdXBsb2Fkc10oI2VucXVldWluZy1maWxlLXVwbG9hZHMpIGRvY3VtZW50YXRpb25cbiAgICogc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG4gICAgLyoqXG4gICAqIElmIGZhbHNlLCBmaWxlcyBhZGRlZCB0byB0aGUgZHJvcHpvbmUgd2lsbCBub3QgYmUgcXVldWVkIGJ5IGRlZmF1bHQuXG4gICAqIFlvdSdsbCBoYXZlIHRvIGNhbGwgYGVucXVldWVGaWxlKGZpbGUpYCBtYW51YWxseS5cbiAgICovIGF1dG9RdWV1ZTogdHJ1ZSxcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGlzIHdpbGwgYWRkIGEgbGluayB0byBldmVyeSBmaWxlIHByZXZpZXcgdG8gcmVtb3ZlIG9yIGNhbmNlbCAoaWZcbiAgICogYWxyZWFkeSB1cGxvYWRpbmcpIHRoZSBmaWxlLiBUaGUgYGRpY3RDYW5jZWxVcGxvYWRgLCBgZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbmBcbiAgICogYW5kIGBkaWN0UmVtb3ZlRmlsZWAgb3B0aW9ucyBhcmUgdXNlZCBmb3IgdGhlIHdvcmRpbmcuXG4gICAqLyBhZGRSZW1vdmVMaW5rczogZmFsc2UsXG4gICAgLyoqXG4gICAqIERlZmluZXMgd2hlcmUgdG8gZGlzcGxheSB0aGUgZmlsZSBwcmV2aWV3cyDigJMgaWYgYG51bGxgIHRoZVxuICAgKiBEcm9wem9uZSBlbGVtZW50IGl0c2VsZiBpcyB1c2VkLiBDYW4gYmUgYSBwbGFpbiBgSFRNTEVsZW1lbnRgIG9yIGEgQ1NTXG4gICAqIHNlbGVjdG9yLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYGRyb3B6b25lLXByZXZpZXdzYCBjbGFzcyBzb1xuICAgKiB0aGUgcHJldmlld3MgYXJlIGRpc3BsYXllZCBwcm9wZXJseS5cbiAgICovIHByZXZpZXdzQ29udGFpbmVyOiBudWxsLFxuICAgIC8qKlxuICAgKiBTZXQgdGhpcyB0byBgdHJ1ZWAgaWYgeW91IGRvbid0IHdhbnQgcHJldmlld3MgdG8gYmUgc2hvd24uXG4gICAqLyBkaXNhYmxlUHJldmlld3M6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBlbGVtZW50IHRoZSBoaWRkZW4gaW5wdXQgZmllbGQgKHdoaWNoIGlzIHVzZWQgd2hlbiBjbGlja2luZyBvbiB0aGVcbiAgICogZHJvcHpvbmUgdG8gdHJpZ2dlciBmaWxlIHNlbGVjdGlvbikgd2lsbCBiZSBhcHBlbmRlZCB0by4gVGhpcyBtaWdodFxuICAgKiBiZSBpbXBvcnRhbnQgaW4gY2FzZSB5b3UgdXNlIGZyYW1ld29ya3MgdG8gc3dpdGNoIHRoZSBjb250ZW50IG9mIHlvdXIgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nLCBvciBhbiBlbGVtZW50IGRpcmVjdGx5LlxuICAgKi8gaGlkZGVuSW5wdXRDb250YWluZXI6IFwiYm9keVwiLFxuICAgIC8qKlxuICAgKiBJZiBudWxsLCBubyBjYXB0dXJlIHR5cGUgd2lsbCBiZSBzcGVjaWZpZWRcbiAgICogSWYgY2FtZXJhLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgY2FtZXJhXG4gICAqIElmIG1pY3JvcGhvbmUsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgbWljcm9waG9uZVxuICAgKiBJZiBjYW1jb3JkZXIsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgY2FtZXJhIGluIHZpZGVvIG1vZGVcbiAgICogT24gYXBwbGUgZGV2aWNlcyBtdWx0aXBsZSBtdXN0IGJlIHNldCB0byBmYWxzZS4gIEFjY2VwdGVkRmlsZXMgbWF5IG5lZWQgdG9cbiAgICogYmUgc2V0IHRvIGFuIGFwcHJvcHJpYXRlIG1pbWUgdHlwZSAoZS5nLiBcImltYWdlLypcIiwgXCJhdWRpby8qXCIsIG9yIFwidmlkZW8vKlwiKS5cbiAgICovIGNhcHR1cmU6IG51bGwsXG4gICAgLyoqXG4gICAqICoqRGVwcmVjYXRlZCoqLiBVc2UgYHJlbmFtZUZpbGVgIGluc3RlYWQuXG4gICAqLyByZW5hbWVGaWxlbmFtZTogbnVsbCxcbiAgICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWQgYmVmb3JlIHRoZSBmaWxlIGlzIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIgYW5kIHJlbmFtZXMgdGhlIGZpbGUuXG4gICAqIFRoaXMgZnVuY3Rpb24gZ2V0cyB0aGUgYEZpbGVgIGFzIGFyZ3VtZW50IGFuZCBjYW4gdXNlIHRoZSBgZmlsZS5uYW1lYC4gVGhlIGFjdHVhbCBuYW1lIG9mIHRoZVxuICAgKiBmaWxlIHRoYXQgZ2V0cyB1c2VkIGR1cmluZyB0aGUgdXBsb2FkIGNhbiBiZSBhY2Nlc3NlZCB0aHJvdWdoIGBmaWxlLnVwbG9hZC5maWxlbmFtZWAuXG4gICAqLyByZW5hbWVGaWxlOiBudWxsLFxuICAgIC8qKlxuICAgKiBJZiBgdHJ1ZWAgdGhlIGZhbGxiYWNrIHdpbGwgYmUgZm9yY2VkLiBUaGlzIGlzIHZlcnkgdXNlZnVsIHRvIHRlc3QgeW91ciBzZXJ2ZXJcbiAgICogaW1wbGVtZW50YXRpb25zIGZpcnN0IGFuZCBtYWtlIHN1cmUgdGhhdCBldmVyeXRoaW5nIHdvcmtzIGFzXG4gICAqIGV4cGVjdGVkIHdpdGhvdXQgZHJvcHpvbmUgaWYgeW91IGV4cGVyaWVuY2UgcHJvYmxlbXMsIGFuZCB0byB0ZXN0XG4gICAqIGhvdyB5b3VyIGZhbGxiYWNrcyB3aWxsIGxvb2suXG4gICAqLyBmb3JjZUZhbGxiYWNrOiBmYWxzZSxcbiAgICAvKipcbiAgICogVGhlIHRleHQgdXNlZCBiZWZvcmUgYW55IGZpbGVzIGFyZSBkcm9wcGVkLlxuICAgKi8gZGljdERlZmF1bHRNZXNzYWdlOiBcIkRyb3AgZmlsZXMgaGVyZSB0byB1cGxvYWRcIixcbiAgICAvKipcbiAgICogVGhlIHRleHQgdGhhdCByZXBsYWNlcyB0aGUgZGVmYXVsdCBtZXNzYWdlIHRleHQgaXQgdGhlIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICovIGRpY3RGYWxsYmFja01lc3NhZ2U6IFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZHJhZyduJ2Ryb3AgZmlsZSB1cGxvYWRzLlwiLFxuICAgIC8qKlxuICAgKiBUaGUgdGV4dCB0aGF0IHdpbGwgYmUgYWRkZWQgYmVmb3JlIHRoZSBmYWxsYmFjayBmb3JtLlxuICAgKiBJZiB5b3UgcHJvdmlkZSBhICBmYWxsYmFjayBlbGVtZW50IHlvdXJzZWxmLCBvciBpZiB0aGlzIG9wdGlvbiBpcyBgbnVsbGAgdGhpcyB3aWxsXG4gICAqIGJlIGlnbm9yZWQuXG4gICAqLyBkaWN0RmFsbGJhY2tUZXh0OiBcIlBsZWFzZSB1c2UgdGhlIGZhbGxiYWNrIGZvcm0gYmVsb3cgdG8gdXBsb2FkIHlvdXIgZmlsZXMgbGlrZSBpbiB0aGUgb2xkZW4gZGF5cy5cIixcbiAgICAvKipcbiAgICogSWYgdGhlIGZpbGVzaXplIGlzIHRvbyBiaWcuXG4gICAqIGB7e2ZpbGVzaXplfX1gIGFuZCBge3ttYXhGaWxlc2l6ZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHJlc3BlY3RpdmUgY29uZmlndXJhdGlvbiB2YWx1ZXMuXG4gICAqLyBkaWN0RmlsZVRvb0JpZzogXCJGaWxlIGlzIHRvbyBiaWcgKHt7ZmlsZXNpemV9fU1pQikuIE1heCBmaWxlc2l6ZToge3ttYXhGaWxlc2l6ZX19TWlCLlwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGUgZmlsZSBkb2Vzbid0IG1hdGNoIHRoZSBmaWxlIHR5cGUuXG4gICAqLyBkaWN0SW52YWxpZEZpbGVUeXBlOiBcIllvdSBjYW4ndCB1cGxvYWQgZmlsZXMgb2YgdGhpcyB0eXBlLlwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGUgc2VydmVyIHJlc3BvbnNlIHdhcyBpbnZhbGlkLlxuICAgKiBge3tzdGF0dXNDb2RlfX1gIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgc2VydmVycyBzdGF0dXMgY29kZS5cbiAgICovIGRpY3RSZXNwb25zZUVycm9yOiBcIlNlcnZlciByZXNwb25kZWQgd2l0aCB7e3N0YXR1c0NvZGV9fSBjb2RlLlwiLFxuICAgIC8qKlxuICAgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgZm9yIHRoZSBjYW5jZWwgdXBsb2FkIGxpbmsuXG4gICAqLyBkaWN0Q2FuY2VsVXBsb2FkOiBcIkNhbmNlbCB1cGxvYWRcIixcbiAgICAvKipcbiAgICogVGhlIHRleHQgdGhhdCBpcyBkaXNwbGF5ZWQgaWYgYW4gdXBsb2FkIHdhcyBtYW51YWxseSBjYW5jZWxlZFxuICAgKi8gZGljdFVwbG9hZENhbmNlbGVkOiBcIlVwbG9hZCBjYW5jZWxlZC5cIixcbiAgICAvKipcbiAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciBjb25maXJtYXRpb24gd2hlbiBjYW5jZWxsaW5nIHVwbG9hZC5cbiAgICovIGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb246IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCB0aGlzIHVwbG9hZD9cIixcbiAgICAvKipcbiAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIHRvIHJlbW92ZSBhIGZpbGUuXG4gICAqLyBkaWN0UmVtb3ZlRmlsZTogXCJSZW1vdmUgZmlsZVwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGlzIGlzIG5vdCBudWxsLCB0aGVuIHRoZSB1c2VyIHdpbGwgYmUgcHJvbXB0ZWQgYmVmb3JlIHJlbW92aW5nIGEgZmlsZS5cbiAgICovIGRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uOiBudWxsLFxuICAgIC8qKlxuICAgKiBEaXNwbGF5ZWQgaWYgYG1heEZpbGVzYCBpcyBzdCBhbmQgZXhjZWVkZWQuXG4gICAqIFRoZSBzdHJpbmcgYHt7bWF4RmlsZXN9fWAgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZS5cbiAgICovIGRpY3RNYXhGaWxlc0V4Y2VlZGVkOiBcIllvdSBjYW5ub3QgdXBsb2FkIGFueSBtb3JlIGZpbGVzLlwiLFxuICAgIC8qKlxuICAgKiBBbGxvd3MgeW91IHRvIHRyYW5zbGF0ZSB0aGUgZGlmZmVyZW50IHVuaXRzLiBTdGFydGluZyB3aXRoIGB0YmAgZm9yIHRlcmFieXRlcyBhbmQgZ29pbmcgZG93biB0b1xuICAgKiBgYmAgZm9yIGJ5dGVzLlxuICAgKi8gZGljdEZpbGVTaXplVW5pdHM6IHtcbiAgICAgICAgdGI6IFwiVEJcIixcbiAgICAgICAgZ2I6IFwiR0JcIixcbiAgICAgICAgbWI6IFwiTUJcIixcbiAgICAgICAga2I6IFwiS0JcIixcbiAgICAgICAgYjogXCJiXCJcbiAgICB9LFxuICAgIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBkcm9wem9uZSBpbml0aWFsaXplZFxuICAgKiBZb3UgY2FuIGFkZCBldmVudCBsaXN0ZW5lcnMgaGVyZVxuICAgKi8gaW5pdCAoKSB7fSxcbiAgICAvKipcbiAgICogQ2FuIGJlIGFuICoqb2JqZWN0Kiogb2YgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHRyYW5zZmVyIHRvIHRoZSBzZXJ2ZXIsICoqb3IqKiBhIGBGdW5jdGlvbmBcbiAgICogdGhhdCBnZXRzIGludm9rZWQgd2l0aCB0aGUgYGZpbGVzYCwgYHhocmAgYW5kLCBpZiBpdCdzIGEgY2h1bmtlZCB1cGxvYWQsIGBjaHVua2AgYXJndW1lbnRzLiBJbiBjYXNlXG4gICAqIG9mIGEgZnVuY3Rpb24sIHRoaXMgbmVlZHMgdG8gcmV0dXJuIGEgbWFwLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdGhpbmcgZm9yIG5vcm1hbCB1cGxvYWRzLCBidXQgYWRkcyByZWxldmFudCBpbmZvcm1hdGlvbiBmb3JcbiAgICogY2h1bmtlZCB1cGxvYWRzLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBzYW1lIGFzIGFkZGluZyBoaWRkZW4gaW5wdXQgZmllbGRzIGluIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAqLyBwYXJhbXMgKGZpbGVzLCB4aHIsIGNodW5rKSB7XG4gICAgICAgIGlmIChjaHVuaykgcmV0dXJuIHtcbiAgICAgICAgICAgIGR6dXVpZDogY2h1bmsuZmlsZS51cGxvYWQudXVpZCxcbiAgICAgICAgICAgIGR6Y2h1bmtpbmRleDogY2h1bmsuaW5kZXgsXG4gICAgICAgICAgICBkenRvdGFsZmlsZXNpemU6IGNodW5rLmZpbGUuc2l6ZSxcbiAgICAgICAgICAgIGR6Y2h1bmtzaXplOiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplLFxuICAgICAgICAgICAgZHp0b3RhbGNodW5rY291bnQ6IGNodW5rLmZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCxcbiAgICAgICAgICAgIGR6Y2h1bmtieXRlb2Zmc2V0OiBjaHVuay5pbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgZ2V0cyBhIFtmaWxlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS9GaWxlKVxuICAgKiBhbmQgYSBgZG9uZWAgZnVuY3Rpb24gYXMgcGFyYW1ldGVycy5cbiAgICpcbiAgICogSWYgdGhlIGRvbmUgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgdGhlIGZpbGUgaXMgXCJhY2NlcHRlZFwiIGFuZCB3aWxsXG4gICAqIGJlIHByb2Nlc3NlZC4gSWYgeW91IHBhc3MgYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWQsIGFuZCB0aGUgZXJyb3JcbiAgICogbWVzc2FnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG5vdCBiZSBjYWxsZWQgaWYgdGhlIGZpbGUgaXMgdG9vIGJpZyBvciBkb2Vzbid0IG1hdGNoIHRoZSBtaW1lIHR5cGVzLlxuICAgKi8gYWNjZXB0IChmaWxlLCBkb25lKSB7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gYWxsIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgZm9yIGEgZmlsZS5cbiAgICogSXQgZ2V0cyB0aGUgZmlsZSBmb3Igd2hpY2ggdGhlIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcbiAgICogYW5kIHRoZSBgZG9uZWAgZnVuY3Rpb24gYXMgc2Vjb25kLiBgZG9uZSgpYCBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gZXZlcnl0aGluZ1xuICAgKiBuZWVkZWQgdG8gZmluaXNoIHRoZSB1cGxvYWQgcHJvY2VzcyBpcyBkb25lLlxuICAgKi8gY2h1bmtzVXBsb2FkZWQ6IGZ1bmN0aW9uKGZpbGUsIGRvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIFNlbmRzIHRoZSBmaWxlIGFzIGJpbmFyeSBibG9iIGluIGJvZHkgaW5zdGVhZCBvZiBmb3JtIGRhdGEuXG4gICAqIElmIHRoaXMgaXMgc2V0LCB0aGUgYHBhcmFtc2Agb3B0aW9uIHdpbGwgYmUgaWdub3JlZC5cbiAgICogSXQncyBhbiBlcnJvciB0byBzZXQgdGhpcyB0byBgdHJ1ZWAgYWxvbmcgd2l0aCBgdXBsb2FkTXVsdGlwbGVgIHNpbmNlXG4gICAqIG11bHRpcGxlIGZpbGVzIGNhbm5vdCBiZSBpbiBhIHNpbmdsZSBiaW5hcnkgYm9keS5cbiAgICovIGJpbmFyeUJvZHk6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBHZXRzIGNhbGxlZCB3aGVuIHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNob3dzIHRoZSBmYWxsYmFjayBpbnB1dCBmaWVsZCBhbmQgYWRkc1xuICAgKiBhIHRleHQuXG4gICAqLyBmYWxsYmFjayAoKSB7XG4gICAgICAgIC8vIFRoaXMgY29kZSBzaG91bGQgcGFzcyBpbiBJRTcuLi4gOihcbiAgICAgICAgbGV0IG1lc3NhZ2VFbGVtZW50O1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gYCR7dGhpcy5lbGVtZW50LmNsYXNzTmFtZX0gZHotYnJvd3Nlci1ub3Qtc3VwcG9ydGVkYDtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpKWlmICgvKF58IClkei1tZXNzYWdlKCR8ICkvLnRlc3QoY2hpbGQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICAgIGNoaWxkLmNsYXNzTmFtZSA9IFwiZHotbWVzc2FnZVwiOyAvLyBSZW1vdmVzIHRoZSAnZHotZGVmYXVsdCcgY2xhc3NcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50ID0gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJkei1tZXNzYWdlXCI+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3BhbiA9IG1lc3NhZ2VFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKVswXTtcbiAgICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgICAgIGlmIChzcGFuLnRleHRDb250ZW50ICE9IG51bGwpIHNwYW4udGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHNwYW4uaW5uZXJUZXh0ICE9IG51bGwpIHNwYW4uaW5uZXJUZXh0ID0gdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja01lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmdldEZhbGxiYWNrRm9ybSgpKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBHZXRzIGNhbGxlZCB0byBjYWxjdWxhdGUgdGhlIHRodW1ibmFpbCBkaW1lbnNpb25zLlxuICAgKlxuICAgKiBJdCBnZXRzIGBmaWxlYCwgYHdpZHRoYCBhbmQgYGhlaWdodGAgKGJvdGggbWF5IGJlIGBudWxsYCkgYXMgcGFyYW1ldGVycyBhbmQgbXVzdCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmc6XG4gICAqXG4gICAqICAtIGBzcmNXaWR0aGAgJiBgc3JjSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAqICAtIGB0cmdXaWR0aGAgJiBgdHJnSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAqICAtIGBzcmNYYCAmIGBzcmNZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuICAgKiAgLSBgdHJnWGAgJiBgdHJnWWAgKG9wdGlvbmFsLCBkZWZhdWx0IGAwYClcbiAgICpcbiAgICogVGhvc2UgdmFsdWVzIGFyZSBnb2luZyB0byBiZSB1c2VkIGJ5IGBjdHguZHJhd0ltYWdlKClgLlxuICAgKi8gcmVzaXplIChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpIHtcbiAgICAgICAgbGV0IGluZm8gPSB7XG4gICAgICAgICAgICBzcmNYOiAwLFxuICAgICAgICAgICAgc3JjWTogMCxcbiAgICAgICAgICAgIHNyY1dpZHRoOiBmaWxlLndpZHRoLFxuICAgICAgICAgICAgc3JjSGVpZ2h0OiBmaWxlLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICBsZXQgc3JjUmF0aW8gPSBmaWxlLndpZHRoIC8gZmlsZS5oZWlnaHQ7XG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlIGRpbWVuc2lvbnMgaWYgbm90IHNwZWNpZmllZFxuICAgICAgICBpZiAod2lkdGggPT0gbnVsbCAmJiBoZWlnaHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgd2lkdGggPSBpbmZvLnNyY1dpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gaW5mby5zcmNIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPT0gbnVsbCkgd2lkdGggPSBoZWlnaHQgKiBzcmNSYXRpbztcbiAgICAgICAgZWxzZSBpZiAoaGVpZ2h0ID09IG51bGwpIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgIC8vIE1ha2Ugc3VyZSBpbWFnZXMgYXJlbid0IHVwc2NhbGVkXG4gICAgICAgIHdpZHRoID0gTWF0aC5taW4od2lkdGgsIGluZm8uc3JjV2lkdGgpO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1pbihoZWlnaHQsIGluZm8uc3JjSGVpZ2h0KTtcbiAgICAgICAgbGV0IHRyZ1JhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGlmIChpbmZvLnNyY1dpZHRoID4gd2lkdGggfHwgaW5mby5zcmNIZWlnaHQgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIEltYWdlIGlzIGJpZ2dlciBhbmQgbmVlZHMgcmVzY2FsaW5nXG4gICAgICAgICAgICBpZiAocmVzaXplTWV0aG9kID09PSBcImNyb3BcIikge1xuICAgICAgICAgICAgICAgIGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjSGVpZ2h0ID0gZmlsZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjV2lkdGggPSBpbmZvLnNyY0hlaWdodCAqIHRyZ1JhdGlvO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjV2lkdGggPSBmaWxlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnNyY0hlaWdodCA9IGluZm8uc3JjV2lkdGggLyB0cmdSYXRpbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc2l6ZU1ldGhvZCA9PT0gXCJjb250YWluXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBNZXRob2QgJ2NvbnRhaW4nXG4gICAgICAgICAgICAgICAgaWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgICAgICAgICAgZWxzZSB3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNpemVNZXRob2QgJyR7cmVzaXplTWV0aG9kfSdgKTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnNyY1ggPSAoZmlsZS53aWR0aCAtIGluZm8uc3JjV2lkdGgpIC8gMjtcbiAgICAgICAgaW5mby5zcmNZID0gKGZpbGUuaGVpZ2h0IC0gaW5mby5zcmNIZWlnaHQpIC8gMjtcbiAgICAgICAgaW5mby50cmdXaWR0aCA9IHdpZHRoO1xuICAgICAgICBpbmZvLnRyZ0hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfSxcbiAgICAvKipcbiAgICogQ2FuIGJlIHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBmaWxlIChmb3IgZXhhbXBsZSwgcmVzaXplIGFuIGltYWdlIGlmIG5lY2Vzc2FyeSkuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgKGlmIHByb3ZpZGVkKSBhbmQgcmVzaXplc1xuICAgKiBpbWFnZXMgYWNjb3JkaW5nIHRvIHRob3NlIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEdldHMgdGhlIGBmaWxlYCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCBhbmQgYSBgZG9uZSgpYCBmdW5jdGlvbiBhcyB0aGUgc2Vjb25kLCB0aGF0IG5lZWRzXG4gICAqIHRvIGJlIGludm9rZWQgd2l0aCB0aGUgZmlsZSB3aGVuIHRoZSB0cmFuc2Zvcm1hdGlvbiBpcyBkb25lLlxuICAgKi8gdHJhbnNmb3JtRmlsZSAoZmlsZSwgZG9uZSkge1xuICAgICAgICBpZiAoKHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCB8fCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSAmJiBmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSkgcmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoZmlsZSwgdGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoLCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0LCB0aGlzLm9wdGlvbnMucmVzaXplTWV0aG9kLCBkb25lKTtcbiAgICAgICAgZWxzZSByZXR1cm4gZG9uZShmaWxlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBBIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSB0ZW1wbGF0ZSB1c2VkIGZvciBlYWNoIGRyb3BwZWRcbiAgICogZmlsZS4gQ2hhbmdlIGl0IHRvIGZ1bGZpbGwgeW91ciBuZWVkcyBidXQgbWFrZSBzdXJlIHRvIHByb3Blcmx5XG4gICAqIHByb3ZpZGUgYWxsIGVsZW1lbnRzLlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gYWN0dWFsIEhUTUwgZWxlbWVudCBpbnN0ZWFkIG9mIHByb3ZpZGluZyBhIFN0cmluZ1xuICAgKiBhcyBhIGNvbmZpZyBvcHRpb24sIHlvdSBjb3VsZCBjcmVhdGUgYSBkaXYgd2l0aCB0aGUgaWQgYHRwbGAsXG4gICAqIHB1dCB0aGUgdGVtcGxhdGUgaW5zaWRlIGl0IGFuZCBwcm92aWRlIHRoZSBlbGVtZW50IGxpa2UgdGhpczpcbiAgICpcbiAgICogICAgIGRvY3VtZW50XG4gICAqICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdHBsJylcbiAgICogICAgICAgLmlubmVySFRNTFxuICAgKlxuICAgKi8gcHJldmlld1RlbXBsYXRlOiAoMCwgJGI1Y2I1ZjA5NGMyZTE3NjQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSksXG4gICAgLypcbiAgIFRob3NlIGZ1bmN0aW9ucyByZWdpc3RlciB0aGVtc2VsdmVzIHRvIHRoZSBldmVudHMgb24gaW5pdCBhbmQgaGFuZGxlIGFsbFxuICAgdGhlIHVzZXIgaW50ZXJmYWNlIHNwZWNpZmljIHN0dWZmLiBPdmVyd3JpdGluZyB0aGVtIHdvbid0IGJyZWFrIHRoZSB1cGxvYWRcbiAgIGJ1dCBjYW4gYnJlYWsgdGhlIHdheSBpdCdzIGRpc3BsYXllZC5cbiAgIFlvdSBjYW4gb3ZlcndyaXRlIHRoZW0gaWYgeW91IGRvbid0IGxpa2UgdGhlIGRlZmF1bHQgYmVoYXZpb3IuIElmIHlvdSBqdXN0XG4gICB3YW50IHRvIGFkZCBhbiBhZGRpdGlvbmFsIGV2ZW50IGhhbmRsZXIsIHJlZ2lzdGVyIGl0IG9uIHRoZSBkcm9wem9uZSBvYmplY3RcbiAgIGFuZCBkb24ndCBvdmVyd3JpdGUgdGhvc2Ugb3B0aW9ucy5cbiAgICovIC8vIFRob3NlIGFyZSBzZWxmIGV4cGxhbmF0b3J5IGFuZCBzaW1wbHkgY29uY2VybiB0aGUgRHJhZ25Ecm9wLlxuICAgIGRyb3AgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIGRyYWdzdGFydCAoZSkge30sXG4gICAgZHJhZ2VuZCAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ2VudGVyIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBkcmFnb3ZlciAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ2xlYXZlIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBwYXN0ZSAoZSkge30sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZXJlIGFyZSBubyBmaWxlcyBsZWZ0IGluIHRoZSBkcm9wem9uZSBhbnltb3JlLCBhbmQgdGhlXG4gICAgLy8gZHJvcHpvbmUgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBpZiBpbiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LXN0YXJ0ZWRcIik7XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbiBhIGZpbGUgaXMgYWRkZWQgdG8gdGhlIHF1ZXVlXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgYWRkZWRmaWxlIChmaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IHRoaXMucHJldmlld3NDb250YWluZXIpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotc3RhcnRlZFwiKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlld3NDb250YWluZXIgJiYgIXRoaXMub3B0aW9ucy5kaXNhYmxlUHJldmlld3MpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQgPSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY3JlYXRlRWxlbWVudCh0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlLnRyaW0oKSk7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdUZW1wbGF0ZSA9IGZpbGUucHJldmlld0VsZW1lbnQ7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuICAgICAgICAgICAgZm9yICh2YXIgbm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1uYW1lXVwiKSlub2RlLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgZm9yIChub2RlIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXNpemVdXCIpKW5vZGUuaW5uZXJIVE1MID0gdGhpcy5maWxlc2l6ZShmaWxlLnNpemUpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGRSZW1vdmVMaW5rcykge1xuICAgICAgICAgICAgICAgIGZpbGUuX3JlbW92ZUxpbmsgPSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY3JlYXRlRWxlbWVudChgPGEgY2xhc3M9XCJkei1yZW1vdmVcIiBocmVmPVwiamF2YXNjcmlwdDp1bmRlZmluZWQ7XCIgZGF0YS1kei1yZW1vdmU+JHt0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGV9PC9hPmApO1xuICAgICAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsZS5fcmVtb3ZlTGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVtb3ZlRmlsZUV2ZW50ID0gKGUpPT57XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuc3RhdHVzID09PSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuVVBMT0FESU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbikgcmV0dXJuICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jb25maXJtKHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uLCAoKT0+dGhpcy5yZW1vdmVGaWxlKGZpbGUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24pIHJldHVybiAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY29uZmlybSh0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24sICgpPT50aGlzLnJlbW92ZUZpbGUoZmlsZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IHJlbW92ZUxpbmsgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotcmVtb3ZlXVwiKSlyZW1vdmVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVGaWxlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgYSBmaWxlIGlzIHJlbW92ZWQuXG4gICAgcmVtb3ZlZGZpbGUgKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQgIT0gbnVsbCAmJiBmaWxlLnByZXZpZXdFbGVtZW50LnBhcmVudE5vZGUgIT0gbnVsbCkgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuIGEgdGh1bWJuYWlsIGhhcyBiZWVuIGdlbmVyYXRlZFxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYGRhdGFVcmxgXG4gICAgdGh1bWJuYWlsIChmaWxlLCBkYXRhVXJsKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1maWxlLXByZXZpZXdcIik7XG4gICAgICAgICAgICBmb3IgKGxldCB0aHVtYm5haWxFbGVtZW50IG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXRodW1ibmFpbF1cIikpe1xuICAgICAgICAgICAgICAgIHRodW1ibmFpbEVsZW1lbnQuYWx0ID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRodW1ibmFpbEVsZW1lbnQuc3JjID0gZGF0YVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpPT5maWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1pbWFnZS1wcmV2aWV3XCIpLCAxKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIGFuIGVycm9yIG9jY3Vyc1xuICAgIC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYG1lc3NhZ2VgXG4gICAgZXJyb3IgKGZpbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWVycm9yXCIpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcInN0cmluZ1wiICYmIG1lc3NhZ2UuZXJyb3IpIG1lc3NhZ2UgPSBtZXNzYWdlLmVycm9yO1xuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1lcnJvcm1lc3NhZ2VdXCIpKW5vZGUudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcm11bHRpcGxlICgpIHt9LFxuICAgIC8vIENhbGxlZCB3aGVuIGEgZmlsZSBnZXRzIHByb2Nlc3NlZC4gU2luY2UgdGhlcmUgaXMgYSBxdWV1ZSwgbm90IGFsbCBhZGRlZFxuICAgIC8vIGZpbGVzIGFyZSBwcm9jZXNzZWQgaW1tZWRpYXRlbHkuXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgcHJvY2Vzc2luZyAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotcHJvY2Vzc2luZ1wiKTtcbiAgICAgICAgICAgIGlmIChmaWxlLl9yZW1vdmVMaW5rKSByZXR1cm4gZmlsZS5fcmVtb3ZlTGluay5pbm5lckhUTUwgPSB0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvY2Vzc2luZ211bHRpcGxlICgpIHt9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cbiAgICAvLyBSZWNlaXZlcyBgZmlsZWAsIGBwcm9ncmVzc2AgKHBlcmNlbnRhZ2UgMC0xMDApIGFuZCBgYnl0ZXNTZW50YC5cbiAgICAvLyBUbyBnZXQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBvZiB0aGUgZmlsZSwgdXNlIGBmaWxlLnNpemVgXG4gICAgdXBsb2FkcHJvZ3Jlc3MgKGZpbGUsIHByb2dyZXNzLCBieXRlc1NlbnQpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIGZvciAobGV0IG5vZGUgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotdXBsb2FkcHJvZ3Jlc3NdXCIpKW5vZGUubm9kZU5hbWUgPT09IFwiUFJPR1JFU1NcIiA/IG5vZGUudmFsdWUgPSBwcm9ncmVzcyA6IG5vZGUuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc30lYDtcbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdG90YWwgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cbiAgICAvLyBDYWxsZWQgd2l0aCB0b3RhbFVwbG9hZFByb2dyZXNzICgwLTEwMCksIHRvdGFsQnl0ZXMgYW5kIHRvdGFsQnl0ZXNTZW50XG4gICAgdG90YWx1cGxvYWRwcm9ncmVzcyAoKSB7fSxcbiAgICAvLyBDYWxsZWQganVzdCBiZWZvcmUgdGhlIGZpbGUgaXMgc2VudC4gR2V0cyB0aGUgYHhocmAgb2JqZWN0IGFzIHNlY29uZFxuICAgIC8vIHBhcmFtZXRlciwgc28geW91IGNhbiBtb2RpZnkgaXQgKGZvciBleGFtcGxlIHRvIGFkZCBhIENTUkYgdG9rZW4pIGFuZCBhXG4gICAgLy8gYGZvcm1EYXRhYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAgc2VuZGluZyAoKSB7fSxcbiAgICBzZW5kaW5nbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgY29tcGxldGUgdXBsb2FkIGlzIGZpbmlzaGVkIGFuZCBzdWNjZXNzZnVsXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgc3VjY2VzcyAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkgcmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LXN1Y2Nlc3NcIik7XG4gICAgfSxcbiAgICBzdWNjZXNzbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgdXBsb2FkIGlzIGNhbmNlbGVkLlxuICAgIGNhbmNlbGVkIChmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBmaWxlLCB0aGlzLm9wdGlvbnMuZGljdFVwbG9hZENhbmNlbGVkKTtcbiAgICB9LFxuICAgIGNhbmNlbGVkbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLCBlaXRoZXIgd2l0aCBzdWNjZXNzIG9yIGFuIGVycm9yLlxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgIGNvbXBsZXRlIChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLl9yZW1vdmVMaW5rKSBmaWxlLl9yZW1vdmVMaW5rLmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZTtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1jb21wbGV0ZVwiKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlbXVsdGlwbGUgKCkge30sXG4gICAgbWF4ZmlsZXNleGNlZWRlZCAoKSB7fSxcbiAgICBtYXhmaWxlc3JlYWNoZWQgKCkge30sXG4gICAgcXVldWVjb21wbGV0ZSAoKSB7fSxcbiAgICBhZGRlZGZpbGVzICgpIHt9LFxuICAgIGVtcHR5Zm9sZGVyICgpIHt9XG59O1xudmFyICQ0Y2EzNjcxODI3NzZmODBiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgPSAkNGNhMzY3MTgyNzc2ZjgwYiR2YXIkZGVmYXVsdE9wdGlvbnM7XG5cblxuY2xhc3MgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSBleHRlbmRzICgwLCAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5KSB7XG4gICAgc3RhdGljIGluaXRDbGFzcygpIHtcbiAgICAgICAgLy8gRXhwb3NpbmcgdGhlIGVtaXR0ZXIgY2xhc3MsIG1haW5seSBmb3IgdGVzdHNcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuRW1pdHRlciA9ICgwLCAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5KTtcbiAgICAgICAgLypcbiAgICAgVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBldmVudHMgeW91IGNhbiByZWdpc3RlciBvbiBhIGRyb3B6b25lIG9iamVjdC5cblxuICAgICBZb3UgY2FuIHJlZ2lzdGVyIGFuIGV2ZW50IGhhbmRsZXIgbGlrZSB0aGlzOlxuXG4gICAgIGRyb3B6b25lLm9uKFwiZHJhZ0VudGVyXCIsIGZ1bmN0aW9uKCkgeyB9KTtcblxuICAgICAqLyB0aGlzLnByb3RvdHlwZS5ldmVudHMgPSBbXG4gICAgICAgICAgICBcImRyb3BcIixcbiAgICAgICAgICAgIFwiZHJhZ3N0YXJ0XCIsXG4gICAgICAgICAgICBcImRyYWdlbmRcIixcbiAgICAgICAgICAgIFwiZHJhZ2VudGVyXCIsXG4gICAgICAgICAgICBcImRyYWdvdmVyXCIsXG4gICAgICAgICAgICBcImRyYWdsZWF2ZVwiLFxuICAgICAgICAgICAgXCJhZGRlZGZpbGVcIixcbiAgICAgICAgICAgIFwiYWRkZWRmaWxlc1wiLFxuICAgICAgICAgICAgXCJyZW1vdmVkZmlsZVwiLFxuICAgICAgICAgICAgXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICAgIFwiZXJyb3JtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJwcm9jZXNzaW5nXCIsXG4gICAgICAgICAgICBcInByb2Nlc3NpbmdtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJ1cGxvYWRwcm9ncmVzc1wiLFxuICAgICAgICAgICAgXCJ0b3RhbHVwbG9hZHByb2dyZXNzXCIsXG4gICAgICAgICAgICBcInNlbmRpbmdcIixcbiAgICAgICAgICAgIFwic2VuZGluZ211bHRpcGxlXCIsXG4gICAgICAgICAgICBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIFwic3VjY2Vzc211bHRpcGxlXCIsXG4gICAgICAgICAgICBcImNhbmNlbGVkXCIsXG4gICAgICAgICAgICBcImNhbmNlbGVkbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwiY29tcGxldGVcIixcbiAgICAgICAgICAgIFwiY29tcGxldGVtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJyZXNldFwiLFxuICAgICAgICAgICAgXCJtYXhmaWxlc2V4Y2VlZGVkXCIsXG4gICAgICAgICAgICBcIm1heGZpbGVzcmVhY2hlZFwiLFxuICAgICAgICAgICAgXCJxdWV1ZWNvbXBsZXRlXCIsXG4gICAgICAgICAgICBcImVtcHR5Zm9sZGVyXCJcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX3RodW1ibmFpbFF1ZXVlID0gW107XG4gICAgICAgIHRoaXMucHJvdG90eXBlLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgbGV0IGZhbGxiYWNrLCBsZWZ0O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmZpbGVzID0gW107IC8vIEFsbCBmaWxlc1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZWxlbWVudCA9PT0gXCJzdHJpbmdcIikgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVsZW1lbnQpO1xuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgYWN0dWFsbHkgaGF2ZSBhbiBIVE1MIEVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCA9PT0gbnVsbCB8fCAhdGhpcy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZHJvcHpvbmUgZWxlbWVudDogbm90IGFuIGluc3RhbmNlIG9mIEhUTUxFbGVtZW50LlwiKTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kcm9wem9uZSkgdGhyb3cgbmV3IEVycm9yKFwiRHJvcHpvbmUgYWxyZWFkeSBhdHRhY2hlZC5cIik7XG4gICAgICAgIC8vIE5vdyBhZGQgdGhpcyBkcm9wem9uZSB0byB0aGUgaW5zdGFuY2VzLlxuICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcy5wdXNoKHRoaXMpO1xuICAgICAgICAvLyBQdXQgdGhlIGRyb3B6b25lIGluc2lkZSB0aGUgZWxlbWVudCBpdHNlbGYuXG4gICAgICAgIHRoaXMuZWxlbWVudC5kcm9wem9uZSA9IHRoaXM7XG4gICAgICAgIGxldCBlbGVtZW50T3B0aW9ucyA9IChsZWZ0ID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpKSAhPSBudWxsID8gbGVmdCA6IHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCAoMCwgJDRjYTM2NzE4Mjc3NmY4MGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSksIGVsZW1lbnRPcHRpb25zLCBvcHRpb25zICE9IG51bGwgPyBvcHRpb25zIDoge30pO1xuICAgICAgICB0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlID0gdGhpcy5vcHRpb25zLnByZXZpZXdUZW1wbGF0ZS5yZXBsYWNlKC9cXG4qL2csIFwiXCIpO1xuICAgICAgICAvLyBJZiB0aGUgYnJvd3NlciBmYWlsZWQsIGp1c3QgY2FsbCB0aGUgZmFsbGJhY2sgYW5kIGxlYXZlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VGYWxsYmFjayB8fCAhJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSkgcmV0dXJuIHRoaXMub3B0aW9ucy5mYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICAvLyBAb3B0aW9ucy51cmwgPSBAZWxlbWVudC5nZXRBdHRyaWJ1dGUgXCJhY3Rpb25cIiB1bmxlc3MgQG9wdGlvbnMudXJsP1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVybCA9PSBudWxsKSB0aGlzLm9wdGlvbnMudXJsID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImFjdGlvblwiKTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBVUkwgcHJvdmlkZWQuXCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlICYmIHRoaXMub3B0aW9ucy5jaHVua2luZykgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCBzZXQgYm90aDogdXBsb2FkTXVsdGlwbGUgYW5kIGNodW5raW5nLlwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5ICYmIHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCBzZXQgYm90aDogYmluYXJ5Qm9keSBhbmQgdXBsb2FkTXVsdGlwbGUuXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5tZXRob2QgPT09IFwic3RyaW5nXCIpIHRoaXMub3B0aW9ucy5tZXRob2QgPSB0aGlzLm9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmICgoZmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkgJiYgZmFsbGJhY2sucGFyZW50Tm9kZSkgLy8gUmVtb3ZlIHRoZSBmYWxsYmFja1xuICAgICAgICBmYWxsYmFjay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZhbGxiYWNrKTtcbiAgICAgICAgLy8gRGlzcGxheSBwcmV2aWV3cyBpbiB0aGUgcHJldmlld3NDb250YWluZXIgZWxlbWVudCBvciB0aGUgRHJvcHpvbmUgZWxlbWVudCB1bmxlc3MgZXhwbGljaXRseSBzZXQgdG8gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIpIHRoaXMucHJldmlld3NDb250YWluZXIgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyLCBcInByZXZpZXdzQ29udGFpbmVyXCIpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnByZXZpZXdzQ29udGFpbmVyID0gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrYWJsZSA9PT0gdHJ1ZSkgdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBlbHNlIHRoaXMuY2xpY2thYmxlRWxlbWVudHMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnRzKHRoaXMub3B0aW9ucy5jbGlja2FibGUsIFwiY2xpY2thYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGhhdmUgYmVlbiBhY2NlcHRlZFxuICAgIGdldEFjY2VwdGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuYWNjZXB0ZWQpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGhhdmUgYmVlbiByZWplY3RlZFxuICAgIC8vIE5vdCBzdXJlIHdoZW4gdGhhdCdzIGdvaW5nIHRvIGJlIHVzZWZ1bCwgYnV0IGFkZGVkIGZvciBjb21wbGV0ZW5lc3MuXG4gICAgZ2V0UmVqZWN0ZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+IWZpbGUuYWNjZXB0ZWQpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICBnZXRGaWxlc1dpdGhTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuc3RhdHVzID09PSBzdGF0dXMpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGFyZSBpbiB0aGUgcXVldWVcbiAgICBnZXRRdWV1ZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEKTtcbiAgICB9XG4gICAgZ2V0VXBsb2FkaW5nRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORyk7XG4gICAgfVxuICAgIGdldEFkZGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkFEREVEKTtcbiAgICB9XG4gICAgLy8gRmlsZXMgdGhhdCBhcmUgZWl0aGVyIHF1ZXVlZCBvciB1cGxvYWRpbmdcbiAgICBnZXRBY3RpdmVGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HIHx8IGZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRCkubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdoZW4gRHJvcHpvbmUgaXMgaW5pdGlhbGl6ZWQuIFlvdVxuICAgIC8vIGNhbiAoYW5kIHNob3VsZCkgc2V0dXAgZXZlbnQgbGlzdGVuZXJzIGluc2lkZSB0aGlzIGZ1bmN0aW9uLlxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIEluIGNhc2UgaXQgaXNuJ3Qgc2V0IGFscmVhZHlcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSBcImZvcm1cIikgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImVuY3R5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpICYmICF0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kei1tZXNzYWdlXCIpKSB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50KGA8ZGl2IGNsYXNzPVwiZHotZGVmYXVsdCBkei1tZXNzYWdlXCI+PGJ1dHRvbiBjbGFzcz1cImR6LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj4ke3RoaXMub3B0aW9ucy5kaWN0RGVmYXVsdE1lc3NhZ2V9PC9idXR0b24+PC9kaXY+YCkpO1xuICAgICAgICBpZiAodGhpcy5jbGlja2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZXR1cEhpZGRlbkZpbGVJbnB1dCA9ICgpPT57XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0KSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImZpbGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCB0aGlzLmVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgPT09IG51bGwgfHwgdGhpcy5vcHRpb25zLm1heEZpbGVzID4gMSkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIiwgXCJtdWx0aXBsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5jbGFzc05hbWUgPSBcImR6LWhpZGRlbi1pbnB1dFwiO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAhPT0gbnVsbCkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsIHRoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNhcHR1cmUgIT09IG51bGwpIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImNhcHR1cmVcIiwgdGhpcy5vcHRpb25zLmNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIC8vIE1ha2luZyBzdXJlIHRoYXQgbm8gb25lIGNhbiBcInRhYlwiIGludG8gdGhpcyBmaWVsZC5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhcmlhbGFiZWwgZm9yIGExMXlcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiZHJvcHpvbmUgaGlkZGVuIGlucHV0XCIpO1xuICAgICAgICAgICAgICAgIC8vIE5vdCBzZXR0aW5nIGBkaXNwbGF5PVwibm9uZVwiYCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWNjZXB0IGNsaWNrc1xuICAgICAgICAgICAgICAgIC8vIG9uIGVsZW1lbnRzIHRoYXQgYXJlbid0IGRpc3BsYXllZC5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUud2lkdGggPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQodGhpcy5vcHRpb25zLmhpZGRlbklucHV0Q29udGFpbmVyLCBcImhpZGRlbklucHV0Q29udGFpbmVyXCIpLmFwcGVuZENoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCB7IGZpbGVzOiBmaWxlcyB9ID0gdGhpcy5oaWRkZW5GaWxlSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGgpIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5hZGRGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVzXCIsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dXBIaWRkZW5GaWxlSW5wdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVVJMID0gd2luZG93LlVSTCAhPT0gbnVsbCA/IHdpbmRvdy5VUkwgOiB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICAvLyBTZXR1cCBhbGwgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBEcm9wem9uZSBvYmplY3QgaXRzZWxmLlxuICAgICAgICAvLyBUaGV5J3JlIG5vdCBpbiBAc2V0dXBFdmVudExpc3RlbmVycygpIGJlY2F1c2UgdGhleSBzaG91bGRuJ3QgYmUgcmVtb3ZlZFxuICAgICAgICAvLyBhZ2FpbiB3aGVuIHRoZSBkcm9wem9uZSBnZXRzIGRpc2FibGVkLlxuICAgICAgICBmb3IgKGxldCBldmVudE5hbWUgb2YgdGhpcy5ldmVudHMpdGhpcy5vbihldmVudE5hbWUsIHRoaXMub3B0aW9uc1tldmVudE5hbWVdKTtcbiAgICAgICAgdGhpcy5vbihcInVwbG9hZHByb2dyZXNzXCIsICgpPT50aGlzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSk7XG4gICAgICAgIHRoaXMub24oXCJyZW1vdmVkZmlsZVwiLCAoKT0+dGhpcy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkpO1xuICAgICAgICB0aGlzLm9uKFwiY2FuY2VsZWRcIiwgKGZpbGUpPT50aGlzLmVtaXQoXCJjb21wbGV0ZVwiLCBmaWxlKSk7XG4gICAgICAgIC8vIEVtaXQgYSBgcXVldWVjb21wbGV0ZWAgZXZlbnQgaWYgYWxsIGZpbGVzIGZpbmlzaGVkIHVwbG9hZGluZy5cbiAgICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIChmaWxlKT0+e1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QWRkZWRGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDApIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVmZXJyZWQgc28gdGhhdCBgcXVldWVjb21wbGV0ZWAgcmVhbGx5IHRyaWdnZXJzIGFmdGVyIGBjb21wbGV0ZWBcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpPT50aGlzLmVtaXQoXCJxdWV1ZWNvbXBsZXRlXCIpLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zRmlsZXMgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5kYXRhVHJhbnNmZXIudHlwZXMgJiYgZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoXCJGaWxlc1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5vUHJvcGFnYXRpb24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gZmlsZXMsIHdlIGRvbid0IHdhbnQgdG8gc3RvcFxuICAgICAgICAgICAgLy8gcHJvcGFnYXRpb24gc28gd2UgZG9uJ3QgaW50ZXJmZXJlIHdpdGggb3RoZXJcbiAgICAgICAgICAgIC8vIGRyYWcgYW5kIGRyb3AgYmVoYXZpb3VyLlxuICAgICAgICAgICAgaWYgKCFjb250YWluc0ZpbGVzKGUpKSByZXR1cm47XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdzdGFydFwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2VudGVyOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ2VudGVyXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnb3ZlcjogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYWtlcyBpdCBwb3NzaWJsZSB0byBkcmFnIGZpbGVzIGZyb20gY2hyb21lJ3MgZG93bmxvYWQgYmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NTI2NDMwL2RyYWctYW5kLWRyb3AtZmlsZS11cGxvYWRzLWZyb20tY2hyb21lLWRvd25sb2Fkcy1iYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVmY3QgPSBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiID09PSBlZmN0IHx8IFwibGlua01vdmVcIiA9PT0gZWZjdCA/IFwibW92ZVwiIDogXCJjb3B5XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdvdmVyXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnbGVhdmU6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdsZWF2ZVwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcDogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcChlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2VuZDogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ2VuZFwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKChjbGlja2FibGVFbGVtZW50KT0+e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNsaWNrYWJsZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoZXZ0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSB0aGUgYWN0dWFsIGRyb3B6b25lIG9yIHRoZSBtZXNzYWdlIGVsZW1lbnQgc2hvdWxkIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2FibGVFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnQgfHwgZXZ0LnRhcmdldCA9PT0gdGhpcy5lbGVtZW50IHx8ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZWxlbWVudEluc2lkZShldnQudGFyZ2V0LCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kei1tZXNzYWdlXCIpKSkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuY2xpY2soKTsgLy8gRm9yd2FyZCB0aGUgY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmluaXQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLy8gTm90IGZ1bGx5IHRlc3RlZCB5ZXRcbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0ICE9IG51bGwgPyB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlIDogdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5lbGVtZW50LmRyb3B6b25lO1xuICAgICAgICByZXR1cm4gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbnN0YW5jZXMuc3BsaWNlKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIH1cbiAgICB1cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkge1xuICAgICAgICBsZXQgdG90YWxVcGxvYWRQcm9ncmVzcztcbiAgICAgICAgbGV0IHRvdGFsQnl0ZXNTZW50ID0gMDtcbiAgICAgICAgbGV0IHRvdGFsQnl0ZXMgPSAwO1xuICAgICAgICBsZXQgYWN0aXZlRmlsZXMgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCk7XG4gICAgICAgIGlmIChhY3RpdmVGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5nZXRBY3RpdmVGaWxlcygpKXtcbiAgICAgICAgICAgICAgICB0b3RhbEJ5dGVzU2VudCArPSBmaWxlLnVwbG9hZC5ieXRlc1NlbnQ7XG4gICAgICAgICAgICAgICAgdG90YWxCeXRlcyArPSBmaWxlLnVwbG9hZC50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAxMDAgKiB0b3RhbEJ5dGVzU2VudCAvIHRvdGFsQnl0ZXM7XG4gICAgICAgIH0gZWxzZSB0b3RhbFVwbG9hZFByb2dyZXNzID0gMTAwO1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwidG90YWx1cGxvYWRwcm9ncmVzc1wiLCB0b3RhbFVwbG9hZFByb2dyZXNzLCB0b3RhbEJ5dGVzLCB0b3RhbEJ5dGVzU2VudCk7XG4gICAgfVxuICAgIC8vIEBvcHRpb25zLnBhcmFtTmFtZSBjYW4gYmUgYSBmdW5jdGlvbiB0YWtpbmcgb25lIHBhcmFtZXRlciByYXRoZXIgdGhhbiBhIHN0cmluZy5cbiAgICAvLyBBIHBhcmFtZXRlciBuYW1lIGZvciBhIGZpbGUgaXMgb2J0YWluZWQgc2ltcGx5IGJ5IGNhbGxpbmcgdGhpcyB3aXRoIGFuIGluZGV4IG51bWJlci5cbiAgICBfZ2V0UGFyYW1OYW1lKG4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lKG4pO1xuICAgICAgICBlbHNlIHJldHVybiBgJHt0aGlzLm9wdGlvbnMucGFyYW1OYW1lfSR7dGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gYFske259XWAgOiBcIlwifWA7XG4gICAgfVxuICAgIC8vIElmIEBvcHRpb25zLnJlbmFtZUZpbGUgaXMgYSBmdW5jdGlvbixcbiAgICAvLyB0aGUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIHJlbmFtZSB0aGUgZmlsZS5uYW1lIGJlZm9yZSBhcHBlbmRpbmcgaXQgdG8gdGhlIGZvcm1EYXRhLlxuICAgIC8vIE1hY09TIDE0KyBzY3JlZW5zaG90cyBjb250YWluIG5hcnJvdyBub24tYnJlYWtpbmcgc3BhY2UgKFUrMjAyRikgY2hhcmFjdGVycyBpbiBmaWxlbmFtZXMgXG4gICAgLy8gKGUuZy4sIFwiU2NyZWVuc2hvdCAyMDI0LTAxLTMwIGF0IDEwLjMyLjA3IEFNLnBuZ1wiIHdoZXJlIHRoZSBzcGFjZSBhZnRlciBcIjA3XCIgYW5kIGJlZm9yZSBcIkFNXCIgaXMgVSsyMDJGKS5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG5vdyByZXBsYWNlcyB0aGVzZSB3aXRoIHJlZ3VsYXIgc3BhY2VzIHRvIHByZXZlbnQgdXBsb2FkIGlzc3VlcyBhbmQgbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIE1hY09TXG4gICAgX3JlbmFtZUZpbGUoZmlsZSkge1xuICAgICAgICBjb25zdCBjbGVhbkZpbGUgPSB7XG4gICAgICAgICAgICAuLi5maWxlLFxuICAgICAgICAgICAgbmFtZTogZmlsZS5uYW1lLnJlcGxhY2UoL1xcdTIwMkYvZywgJyAnKVxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBjbGVhbkZpbGUubmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlKGNsZWFuRmlsZSk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYSBmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgZmFsbGJhY2sgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBEcmFnbkRyb3BcbiAgICAvL1xuICAgIC8vIElmIHRoZSBkcm9wem9uZSBpcyBhbHJlYWR5IGEgZm9ybSwgb25seSB0aGUgaW5wdXQgZmllbGQgYW5kIGJ1dHRvbiBhcmUgcmV0dXJuZWQuIE90aGVyd2lzZSBhIGNvbXBsZXRlIGZvcm0gZWxlbWVudCBpcyBwcm92aWRlZC5cbiAgICAvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG4gICAgZ2V0RmFsbGJhY2tGb3JtKCkge1xuICAgICAgICBsZXQgZXhpc3RpbmdGYWxsYmFjaywgZm9ybTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkgcmV0dXJuIGV4aXN0aW5nRmFsbGJhY2s7XG4gICAgICAgIGxldCBmaWVsZHNTdHJpbmcgPSAnPGRpdiBjbGFzcz1cImR6LWZhbGxiYWNrXCI+JztcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tUZXh0KSBmaWVsZHNTdHJpbmcgKz0gYDxwPiR7dGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHR9PC9wPmA7XG4gICAgICAgIGZpZWxkc1N0cmluZyArPSBgPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cIiR7dGhpcy5fZ2V0UGFyYW1OYW1lKDApfVwiICR7dGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiB1bmRlZmluZWR9IC8+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlVwbG9hZCFcIj48L2Rpdj5gO1xuICAgICAgICBsZXQgZmllbGRzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50KGZpZWxkc1N0cmluZyk7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSAhPT0gXCJGT1JNXCIpIHtcbiAgICAgICAgICAgIGZvcm0gPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQoYDxmb3JtIGFjdGlvbj1cIiR7dGhpcy5vcHRpb25zLnVybH1cIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIG1ldGhvZD1cIiR7dGhpcy5vcHRpb25zLm1ldGhvZH1cIj48L2Zvcm0+YCk7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZW5jdHlwZSBhbmQgbWV0aG9kIGF0dHJpYnV0ZXMgYXJlIHNldCBwcm9wZXJseVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImVuY3R5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcIm1ldGhvZFwiLCB0aGlzLm9wdGlvbnMubWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsID8gZm9ybSA6IGZpZWxkcztcbiAgICB9XG4gICAgLy8gUmV0dXJucyB0aGUgZmFsbGJhY2sgZWxlbWVudHMgaWYgdGhleSBleGlzdCBhbHJlYWR5XG4gICAgLy9cbiAgICAvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG4gICAgZ2V0RXhpc3RpbmdGYWxsYmFjaygpIHtcbiAgICAgICAgbGV0IGdldEZhbGxiYWNrID0gZnVuY3Rpb24oZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVsIG9mIGVsZW1lbnRzKXtcbiAgICAgICAgICAgICAgICBpZiAoLyhefCApZmFsbGJhY2soJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IHRhZ05hbWUgb2YgW1xuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIFwiZm9ybVwiXG4gICAgICAgIF0pe1xuICAgICAgICAgICAgdmFyIGZhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKGZhbGxiYWNrID0gZ2V0RmFsbGJhY2sodGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpKSkgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcCgoZWxlbWVudExpc3RlbmVycyk9PigoKT0+e1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gZWxlbWVudExpc3RlbmVycy5ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSgpKTtcbiAgICB9XG4gICAgLy8gRGVhY3RpdmF0ZXMgYWxsIGxpc3RlbmVycyBzdG9yZWQgaW4gQGxpc3RlbmVyc1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKChlbGVtZW50TGlzdGVuZXJzKT0+KCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKCkpO1xuICAgIH1cbiAgICAvLyBSZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGNhbmNlbHMgYWxsIGZpbGVzIGluIHRoZSBxdWV1ZSBvciBiZWluZyBwcm9jZXNzZWQuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KT0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotY2xpY2thYmxlXCIpKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMubWFwKChmaWxlKT0+dGhpcy5jYW5jZWxVcGxvYWQoZmlsZSkpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRpc2FibGVkO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpPT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1jbGlja2FibGVcIikpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYSBuaWNlbHkgZm9ybWF0dGVkIGZpbGVzaXplXG4gICAgZmlsZXNpemUoc2l6ZSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRTaXplID0gMDtcbiAgICAgICAgbGV0IHNlbGVjdGVkVW5pdCA9IFwiYlwiO1xuICAgICAgICBpZiAoc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCB1bml0cyA9IFtcbiAgICAgICAgICAgICAgICBcInRiXCIsXG4gICAgICAgICAgICAgICAgXCJnYlwiLFxuICAgICAgICAgICAgICAgIFwibWJcIixcbiAgICAgICAgICAgICAgICBcImtiXCIsXG4gICAgICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdW5pdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGN1dG9mZiA9IE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKSAvIDEwO1xuICAgICAgICAgICAgICAgIGlmIChzaXplID49IGN1dG9mZikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNpemUgPSBzaXplIC8gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVuaXQgPSB1bml0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZFNpemUgPSBNYXRoLnJvdW5kKDEwICogc2VsZWN0ZWRTaXplKSAvIDEwOyAvLyBDdXR0aW5nIG9mIGRpZ2l0c1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgPHN0cm9uZz4ke3NlbGVjdGVkU2l6ZX08L3N0cm9uZz4gJHt0aGlzLm9wdGlvbnMuZGljdEZpbGVTaXplVW5pdHNbc2VsZWN0ZWRVbml0XX1gO1xuICAgIH1cbiAgICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgY2xhc3MgZnJvbSB0aGUgZm9ybS5cbiAgICBfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID09PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHRoaXMuZW1pdChcIm1heGZpbGVzcmVhY2hlZFwiLCB0aGlzLmZpbGVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LW1heC1maWxlcy1yZWFjaGVkXCIpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotbWF4LWZpbGVzLXJlYWNoZWRcIik7XG4gICAgfVxuICAgIGRyb3AoZSkge1xuICAgICAgICBpZiAoIWUuZGF0YVRyYW5zZmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuZW1pdChcImRyb3BcIiwgZSk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIEZpbGVMaXN0IHRvIGFuIEFycmF5XG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGZvciBJRTExXG4gICAgICAgIGxldCBmaWxlcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZS5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyBpKyspZmlsZXNbaV0gPSBlLmRhdGFUcmFuc2Zlci5maWxlc1tpXTtcbiAgICAgICAgLy8gRXZlbiBpZiBpdCdzIGEgZm9sZGVyLCBmaWxlcy5sZW5ndGggd2lsbCBjb250YWluIHRoZSBmb2xkZXJzLlxuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgeyBpdGVtczogaXRlbXMgfSA9IGUuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCAmJiBpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwpIC8vIFRoZSBicm93c2VyIHN1cHBvcnRzIGRyb3BwaW5nIG9mIGZvbGRlcnMsIHNvIGhhbmRsZSBpdGVtcyBpbnN0ZWFkIG9mIGZpbGVzXG4gICAgICAgICAgICB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XG4gICAgICAgICAgICBlbHNlIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChcImFkZGVkZmlsZXNcIiwgZmlsZXMpO1xuICAgIH1cbiAgICBwYXN0ZShlKSB7XG4gICAgICAgIGlmICgkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkX19ndWFyZF9fKGUgIT0gbnVsbCA/IGUuY2xpcGJvYXJkRGF0YSA6IHVuZGVmaW5lZCwgKHgpPT54Lml0ZW1zKSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuZW1pdChcInBhc3RlXCIsIGUpO1xuICAgICAgICBsZXQgeyBpdGVtczogaXRlbXMgfSA9IGUuY2xpcGJvYXJkRGF0YTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkgcmV0dXJuIHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcbiAgICB9XG4gICAgaGFuZGxlRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmFkZEZpbGUoZmlsZSk7XG4gICAgfVxuICAgIC8vIFdoZW4gYSBmb2xkZXIgaXMgZHJvcHBlZCAob3IgZmlsZXMgYXJlIHBhc3RlZCksIGl0ZW1zIG11c3QgYmUgaGFuZGxlZFxuICAgIC8vIGluc3RlYWQgb2YgZmlsZXMuXG4gICAgX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKSB7XG4gICAgICAgIHJldHVybiAoKCk9PntcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpe1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwgJiYgKGVudHJ5ID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHJlc3VsdC5wdXNoKHRoaXMuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSAvLyBBcHBlbmQgYWxsIGZpbGVzIGZyb20gdGhhdCBkaXJlY3RvcnkgdG8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBlbnRyeS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZ2V0QXNGaWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ua2luZCA9PSBudWxsIHx8IGl0ZW0ua2luZCA9PT0gXCJmaWxlXCIpIHJlc3VsdC5wdXNoKHRoaXMuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pKCk7XG4gICAgfVxuICAgIC8vIEdvZXMgdGhyb3VnaCB0aGUgZGlyZWN0b3J5LCBhbmQgYWRkcyBlYWNoIGZpbGUgaXQgZmluZHMgcmVjdXJzaXZlbHlcbiAgICBfYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGRpcmVjdG9yeSwgcGF0aCkge1xuICAgICAgICBsZXQgZGlyUmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICBsZXQgZXJyb3JIYW5kbGVyID0gKGVycm9yKT0+JDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRNZXRob2RfXyhjb25zb2xlLCBcImxvZ1wiLCAobyk9Pm8ubG9nKGVycm9yKSk7XG4gICAgICAgIGxldCBlbnRyeUNvdW50ID0gMDtcbiAgICAgICAgdmFyIHJlYWRFbnRyaWVzID0gKCk9PntcbiAgICAgICAgICAgIHJldHVybiBkaXJSZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpPT57XG4gICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2VudHJ5Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkuZmlsZSgoZmlsZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVIaWRkZW5GaWxlcyAmJiBmaWxlLm5hbWUuc3Vic3RyaW5nKDAsIDEpID09PSBcIi5cIikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmZ1bGxQYXRoID0gYCR7cGF0aH0vJHtmaWxlLm5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHRoaXMuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgYCR7cGF0aH0vJHtlbnRyeS5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGwgcmVhZEVudHJpZXMoKSBhZ2Fpbiwgc2luY2UgYnJvd3NlciBvbmx5IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgMTAwIGVudHJpZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RpcmVjdG9yeVJlYWRlciNyZWFkRW50cmllc1xuICAgICAgICAgICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnlDb3VudCA9PT0gMCkgdGhpcy5lbWl0KFwiZW1wdHlmb2xkZXJcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVhZEVudHJpZXMoKTtcbiAgICB9XG4gICAgLy8gSWYgYGRvbmUoKWAgaXMgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnQgdGhlIGZpbGUgaXMgYWNjZXB0ZWRcbiAgICAvLyBJZiB5b3UgY2FsbCBpdCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkXG4gICAgLy8gKFRoaXMgYWxsb3dzIGZvciBhc3luY2hyb25vdXMgdmFsaWRhdGlvbilcbiAgICAvL1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRoZSBmaWxlc2l6ZSwgYW5kIGlmIHRoZSBmaWxlLnR5cGUgcGFzc2VzIHRoZVxuICAgIC8vIGBhY2NlcHRlZEZpbGVzYCBjaGVjay5cbiAgICBhY2NlcHQoZmlsZSwgZG9uZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzaXplICYmIGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSAqIDEwNDg1NzYpIGRvbmUodGhpcy5vcHRpb25zLmRpY3RGaWxlVG9vQmlnLnJlcGxhY2UoXCJ7e2ZpbGVzaXplfX1cIiwgTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0IC8gMTAuMjQpIC8gMTAwKS5yZXBsYWNlKFwie3ttYXhGaWxlc2l6ZX19XCIsIHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSkpO1xuICAgICAgICBlbHNlIGlmICghJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pc1ZhbGlkRmlsZShmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcykpIGRvbmUodGhpcy5vcHRpb25zLmRpY3RJbnZhbGlkRmlsZVR5cGUpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG4gICAgICAgICAgICBkb25lKHRoaXMub3B0aW9ucy5kaWN0TWF4RmlsZXNFeGNlZWRlZC5yZXBsYWNlKFwie3ttYXhGaWxlc319XCIsIHRoaXMub3B0aW9ucy5tYXhGaWxlcykpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibWF4ZmlsZXNleGNlZWRlZFwiLCBmaWxlKTtcbiAgICAgICAgfSBlbHNlIHRoaXMub3B0aW9ucy5hY2NlcHQuY2FsbCh0aGlzLCBmaWxlLCBkb25lKTtcbiAgICB9XG4gICAgYWRkRmlsZShmaWxlKSB7XG4gICAgICAgIGZpbGUudXBsb2FkID0ge1xuICAgICAgICAgICAgLy8gbm90ZTogdGhpcyBvbmx5IHdvcmtzIGlmIHdpbmRvdy5pc1NlY3VyZUNvbnRleHQgaXMgdHJ1ZSwgd2hpY2ggaW5jbHVkZXMgbG9jYWxob3N0IGluIGh0dHBcbiAgICAgICAgICAgIHV1aWQ6IHdpbmRvdy5pc1NlY3VyZUNvbnRleHQgPyBzZWxmLmNyeXB0by5yYW5kb21VVUlEKCkgOiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LnV1aWR2NCgpLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSB0b3RhbCB1cGxvYWQgc2l6ZSB0byBmaWxlLnNpemUgZm9yIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIEl0J3MgYWN0dWFsIGRpZmZlcmVudCB0aGFuIHRoZSBzaXplIHRvIGJlIHRyYW5zbWl0dGVkLlxuICAgICAgICAgICAgdG90YWw6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIGJ5dGVzU2VudDogMCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiB0aGlzLl9yZW5hbWVGaWxlKGZpbGUpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkFEREVEO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVcIiwgZmlsZSk7XG4gICAgICAgIHRoaXMuX2VucXVldWVUaHVtYm5haWwoZmlsZSk7XG4gICAgICAgIHRoaXMuYWNjZXB0KGZpbGUsIChlcnJvcik9PntcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZpbGUuYWNjZXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvclByb2Nlc3NpbmcoW1xuICAgICAgICAgICAgICAgICAgICBmaWxlXG4gICAgICAgICAgICAgICAgXSwgZXJyb3IpOyAvLyBXaWxsIHNldCB0aGUgZmlsZS5zdGF0dXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsZS5hY2NlcHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUXVldWUpIHRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgIC8vIFdpbGwgc2V0IC5hY2NlcHRlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBXcmFwcGVyIGZvciBlbnF1ZXVlRmlsZVxuICAgIGVucXVldWVGaWxlcyhmaWxlcykge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbnF1ZXVlRmlsZShmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCAmJiBmaWxlLmFjY2VwdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gc2V0VGltZW91dCgoKT0+dGhpcy5wcm9jZXNzUXVldWUoKSwgMCk7IC8vIERlZmVycmluZyB0aGUgY2FsbFxuICAgICAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBmaWxlIGNhbid0IGJlIHF1ZXVlZCBiZWNhdXNlIGl0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkIG9yIHdhcyByZWplY3RlZC5cIik7XG4gICAgfVxuICAgIF9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jcmVhdGVJbWFnZVRodW1ibmFpbHMgJiYgZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykgJiYgZmlsZS5zaXplIDw9IHRoaXMub3B0aW9ucy5tYXhUaHVtYm5haWxGaWxlc2l6ZSAqIDEwNDg1NzYpIHtcbiAgICAgICAgICAgIHRoaXMuX3RodW1ibmFpbFF1ZXVlLnB1c2goZmlsZSk7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKT0+dGhpcy5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCksIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCkge1xuICAgICAgICBpZiAodGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCB8fCB0aGlzLl90aHVtYm5haWxRdWV1ZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IHRydWU7XG4gICAgICAgIGxldCBmaWxlID0gdGhpcy5fdGh1bWJuYWlsUXVldWUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHRoaXMub3B0aW9ucy50aHVtYm5haWxXaWR0aCwgdGhpcy5vcHRpb25zLnRodW1ibmFpbEhlaWdodCwgdGhpcy5vcHRpb25zLnRodW1ibmFpbE1ldGhvZCwgdHJ1ZSwgKGRhdGFVcmwpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgZmlsZSwgZGF0YVVybCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBDYW4gYmUgY2FsbGVkIGJ5IHRoZSB1c2VyIHRvIHJlbW92ZSBhIGZpbGVcbiAgICByZW1vdmVGaWxlKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORykgdGhpcy5jYW5jZWxVcGxvYWQoZmlsZSk7XG4gICAgICAgIHRoaXMuZmlsZXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkd2l0aG91dCh0aGlzLmZpbGVzLCBmaWxlKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlZGZpbGVcIiwgZmlsZSk7XG4gICAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuZW1pdChcInJlc2V0XCIpO1xuICAgIH1cbiAgICAvLyBSZW1vdmVzIGFsbCBmaWxlcyB0aGF0IGFyZW4ndCBjdXJyZW50bHkgcHJvY2Vzc2VkIGZyb20gdGhlIGxpc3RcbiAgICByZW1vdmVBbGxGaWxlcyhjYW5jZWxJZk5lY2Vzc2FyeSkge1xuICAgICAgICAvLyBDcmVhdGUgYSBjb3B5IG9mIGZpbGVzIHNpbmNlIHJlbW92ZUZpbGUoKSBjaGFuZ2VzIHRoZSBAZmlsZXMgYXJyYXkuXG4gICAgICAgIGlmIChjYW5jZWxJZk5lY2Vzc2FyeSA9PSBudWxsKSBjYW5jZWxJZk5lY2Vzc2FyeSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZmlsZXMuc2xpY2UoKSlpZiAoZmlsZS5zdGF0dXMgIT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HIHx8IGNhbmNlbElmTmVjZXNzYXJ5KSB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBSZXNpemVzIGFuIGltYWdlIGJlZm9yZSBpdCBnZXRzIHNlbnQgdG8gdGhlIHNlcnZlci4gVGhpcyBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZlxuICAgIC8vIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGlmIGByZXNpemVXaWR0aGAgb3IgYHJlc2l6ZUhlaWdodGAgYXJlIHNldC4gVGhlIGNhbGxiYWNrIGlzIGludm9rZWQgd2l0aFxuICAgIC8vIHRoZSByZXNpemVkIGJsb2IuXG4gICAgcmVzaXplSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCB0cnVlLCAoZGF0YVVybCwgY2FudmFzKT0+e1xuICAgICAgICAgICAgaWYgKGNhbnZhcyA9PSBudWxsKSAvLyBUaGUgaW1hZ2UgaGFzIG5vdCBiZWVuIHJlc2l6ZWRcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmaWxlKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB7IHJlc2l6ZU1pbWVUeXBlOiByZXNpemVNaW1lVHlwZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChyZXNpemVNaW1lVHlwZSA9PSBudWxsKSByZXNpemVNaW1lVHlwZSA9IGZpbGUudHlwZTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzaXplZERhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKHJlc2l6ZU1pbWVUeXBlLCB0aGlzLm9wdGlvbnMucmVzaXplUXVhbGl0eSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZU1pbWVUeXBlID09PSBcImltYWdlL2pwZWdcIiB8fCByZXNpemVNaW1lVHlwZSA9PT0gXCJpbWFnZS9qcGdcIikgLy8gTm93IGFkZCB0aGUgb3JpZ2luYWwgRVhJRiBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHJlc2l6ZWREYXRhVVJMID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlc3RvcmVFeGlmKGZpbGUuZGF0YVVSTCwgcmVzaXplZERhdGFVUkwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmRhdGFVUkl0b0Jsb2IocmVzaXplZERhdGFVUkwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgaWdub3JlRXhpZiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgZmlsZS5kYXRhVVJMID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgICAvLyBEb24ndCBib3RoZXIgY3JlYXRpbmcgYSB0aHVtYm5haWwgZm9yIFNWRyBpbWFnZXMgc2luY2UgdGhleSdyZSB2ZWN0b3JcbiAgICAgICAgICAgIC8vIEFsc28gc2tpcCBnaWYgKHNlZSAjMzkpXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlID09PSBcImltYWdlL3N2Zyt4bWxcIiB8fCBmaWxlLnR5cGUgPT09IFwiaW1hZ2UvZ2lmXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgY2FsbGJhY2soZmlsZVJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgdW5kZWZpbmVkLCBpZ25vcmVFeGlmKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgICAvLyBgbW9ja0ZpbGVgIG5lZWRzIHRvIGhhdmUgdGhlc2UgYXR0cmlidXRlczpcbiAgICAvL1xuICAgIC8vICAgICB7IG5hbWU6ICduYW1lJywgc2l6ZTogMTIzNDUsIGltYWdlVXJsOiAnJyB9XG4gICAgLy9cbiAgICAvLyBgY2FsbGJhY2tgIHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBpbWFnZSBoYXMgYmVlbiBkb3dubG9hZGVkIGFuZCBkaXNwbGF5ZWQuXG4gICAgLy8gYGNyb3NzT3JpZ2luYCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBgaW1nYCB0YWcgd2hlbiBhY2Nlc3NpbmcgdGhlIGZpbGUuXG4gICAgZGlzcGxheUV4aXN0aW5nRmlsZShtb2NrRmlsZSwgaW1hZ2VVcmwsIGNhbGxiYWNrLCBjcm9zc09yaWdpbiwgcmVzaXplVGh1bWJuYWlsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZVwiLCBtb2NrRmlsZSk7XG4gICAgICAgIGlmICghcmVzaXplVGh1bWJuYWlsKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgbW9ja0ZpbGUsIGltYWdlVXJsKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvbkRvbmUgPSAodGh1bWJuYWlsKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInRodW1ibmFpbFwiLCBtb2NrRmlsZSwgdGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbW9ja0ZpbGUuZGF0YVVSTCA9IGltYWdlVXJsO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKG1vY2tGaWxlLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsIHRoaXMub3B0aW9ucy50aHVtYm5haWxIZWlnaHQsIHRoaXMub3B0aW9ucy50aHVtYm5haWxNZXRob2QsIHRoaXMub3B0aW9ucy5maXhPcmllbnRhdGlvbiwgb25Eb25lLCBjcm9zc09yaWdpbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgY3Jvc3NPcmlnaW4sIGlnbm9yZUV4aWYgPSBmYWxzZSkge1xuICAgICAgICAvLyBOb3QgdXNpbmcgYG5ldyBJbWFnZWAgaGVyZSBiZWNhdXNlIG9mIGEgYnVnIGluIGxhdGVzdCBDaHJvbWUgdmVyc2lvbnMuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9wdWxsLzIyNlxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaWYgKGNyb3NzT3JpZ2luKSBpbWcuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgICAgLy8gZml4T3JpZW50YXRpb24gaXMgbm90IG5lZWRlZCBhbnltb3JlIHdpdGggYnJvd3NlcnMgaGFuZGxpbmcgaW1hZ2VPcmllbnRhdGlvblxuICAgICAgICBmaXhPcmllbnRhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbXCJpbWFnZU9yaWVudGF0aW9uXCJdID09IFwiZnJvbS1pbWFnZVwiID8gZmFsc2UgOiBmaXhPcmllbnRhdGlvbjtcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICBsZXQgbG9hZEV4aWYgPSAoY2FsbGJhY2spPT5jYWxsYmFjaygxKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRVhJRiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBFWElGICE9PSBudWxsICYmIGZpeE9yaWVudGF0aW9uKSBsb2FkRXhpZiA9IChjYWxsYmFjayk9PkVYSUYuZ2V0RGF0YShpbWcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soRVhJRi5nZXRUYWcodGhpcywgXCJPcmllbnRhdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbG9hZEV4aWYoKG9yaWVudGF0aW9uKT0+e1xuICAgICAgICAgICAgICAgIGZpbGUud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgZmlsZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGxldCByZXNpemVJbmZvID0gdGhpcy5vcHRpb25zLnJlc2l6ZS5jYWxsKHRoaXMsIGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCk7XG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdXaWR0aDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uID4gNCkge1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaChvcmllbnRhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgZmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxODDCsCByb3RhdGUgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZShNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBmbGlwXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA5MMKwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMCwgLWNhbnZhcy53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMuaGVpZ2h0LCAtY2FudmFzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOTDCsCByb3RhdGUgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jYW52YXMuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgYnVnZml4IGZvciBpT1MnIHNjYWxpbmcgYnVnLlxuICAgICAgICAgICAgICAgICQzZWQyNjlmMmYwZmIyMjRiJHZhciRkcmF3SW1hZ2VJT1NGaXgoY3R4LCBpbWcsIHJlc2l6ZUluZm8uc3JjWCAhPSBudWxsID8gcmVzaXplSW5mby5zcmNYIDogMCwgcmVzaXplSW5mby5zcmNZICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1kgOiAwLCByZXNpemVJbmZvLnNyY1dpZHRoLCByZXNpemVJbmZvLnNyY0hlaWdodCwgcmVzaXplSW5mby50cmdYICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1ggOiAwLCByZXNpemVJbmZvLnRyZ1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWSA6IDAsIHJlc2l6ZUluZm8udHJnV2lkdGgsIHJlc2l6ZUluZm8udHJnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgdGh1bWJuYWlsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgcmV0dXJuIGNhbGxiYWNrKHRodW1ibmFpbCwgY2FudmFzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgaW1nLm9uZXJyb3IgPSBjYWxsYmFjaztcbiAgICAgICAgdmFyIGRhdGFVUkwgPSBmaWxlLmRhdGFVUkw7XG4gICAgICAgIGlmIChpZ25vcmVFeGlmKSBkYXRhVVJMID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlbW92ZUV4aWYoZGF0YVVSTCk7XG4gICAgICAgIHJldHVybiBpbWcuc3JjID0gZGF0YVVSTDtcbiAgICB9XG4gICAgLy8gR29lcyB0aHJvdWdoIHRoZSBxdWV1ZSBhbmQgcHJvY2Vzc2VzIGZpbGVzIGlmIHRoZXJlIGFyZW4ndCB0b28gbWFueSBhbHJlYWR5LlxuICAgIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgbGV0IHsgcGFyYWxsZWxVcGxvYWRzOiBwYXJhbGxlbFVwbG9hZHMgfSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgbGV0IHByb2Nlc3NpbmdMZW5ndGggPSB0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IHByb2Nlc3NpbmdMZW5ndGg7XG4gICAgICAgIC8vIFRoZXJlIGFyZSBhbHJlYWR5IGF0IGxlYXN0IGFzIG1hbnkgZmlsZXMgdXBsb2FkaW5nIHRoYW4gc2hvdWxkIGJlXG4gICAgICAgIGlmIChwcm9jZXNzaW5nTGVuZ3RoID49IHBhcmFsbGVsVXBsb2FkcykgcmV0dXJuO1xuICAgICAgICBsZXQgcXVldWVkRmlsZXMgPSB0aGlzLmdldFF1ZXVlZEZpbGVzKCk7XG4gICAgICAgIGlmICghKHF1ZXVlZEZpbGVzLmxlbmd0aCA+IDApKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIC8vIFRoZSBmaWxlcyBzaG91bGQgYmUgdXBsb2FkZWQgaW4gb25lIHJlcXVlc3RcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0ZpbGVzKHF1ZXVlZEZpbGVzLnNsaWNlKDAsIHBhcmFsbGVsVXBsb2FkcyAtIHByb2Nlc3NpbmdMZW5ndGgpKTtcbiAgICAgICAgZWxzZSB3aGlsZShpIDwgcGFyYWxsZWxVcGxvYWRzKXtcbiAgICAgICAgICAgIGlmICghcXVldWVkRmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgLy8gTm90aGluZyBsZWZ0IHRvIHByb2Nlc3NcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0ZpbGUocXVldWVkRmlsZXMuc2hpZnQoKSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gV3JhcHBlciBmb3IgYHByb2Nlc3NGaWxlc2BcbiAgICBwcm9jZXNzRmlsZShmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhbXG4gICAgICAgICAgICBmaWxlXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvLyBMb2FkcyB0aGUgZmlsZSwgdGhlbiBjYWxscyBmaW5pc2hlZExvYWRpbmcoKVxuICAgIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXtcbiAgICAgICAgICAgIGZpbGUucHJvY2Vzc2luZyA9IHRydWU7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicHJvY2Vzc2luZ1wiLCBmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJwcm9jZXNzaW5nbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhmaWxlcyk7XG4gICAgfVxuICAgIF9nZXRGaWxlc1dpdGhYaHIoeGhyKSB7XG4gICAgICAgIGxldCBmaWxlcztcbiAgICAgICAgcmV0dXJuIGZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLnhociA9PT0geGhyKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgLy8gQ2FuY2VscyB0aGUgZmlsZSB1cGxvYWQgYW5kIHNldHMgdGhlIHN0YXR1cyB0byBDQU5DRUxFRFxuICAgIC8vICoqaWYqKiB0aGUgZmlsZSBpcyBhY3R1YWxseSBiZWluZyB1cGxvYWRlZC5cbiAgICAvLyBJZiBpdCdzIHN0aWxsIGluIHRoZSBxdWV1ZSwgdGhlIGZpbGUgaXMgYmVpbmcgcmVtb3ZlZCBmcm9tIGl0IGFuZCB0aGUgc3RhdHVzXG4gICAgLy8gc2V0IHRvIENBTkNFTEVELlxuICAgIGNhbmNlbFVwbG9hZChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcpIHtcbiAgICAgICAgICAgIGxldCBncm91cGVkRmlsZXMgPSB0aGlzLl9nZXRGaWxlc1dpdGhYaHIoZmlsZS54aHIpO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBlZEZpbGUgb2YgZ3JvdXBlZEZpbGVzKWdyb3VwZWRGaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpbGUueGhyICE9PSBcInVuZGVmaW5lZFwiKSBmaWxlLnhoci5hYm9ydCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBlZEZpbGUgb2YgZ3JvdXBlZEZpbGVzKXRoaXMuZW1pdChcImNhbmNlbGVkXCIsIGdyb3VwZWRGaWxlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgZ3JvdXBlZEZpbGVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCB8fCBmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5RVUVVRUQpIHtcbiAgICAgICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRDtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNhbmNlbGVkXCIsIGZpbGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwiY2FuY2VsZWRtdWx0aXBsZVwiLCBbXG4gICAgICAgICAgICAgICAgZmlsZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgcmVzb2x2ZU9wdGlvbihvcHRpb24sIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG9wdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG4gICAgdXBsb2FkRmlsZShmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEZpbGVzKFtcbiAgICAgICAgICAgIGZpbGVcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHVwbG9hZEZpbGVzKGZpbGVzKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUZpbGVzKGZpbGVzLCAodHJhbnNmb3JtZWRGaWxlcyk9PntcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2h1bmtpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBDaHVua2luZyBpcyBub3QgYWxsb3dlZCB0byBiZSB1c2VkIHdpdGggYHVwbG9hZE11bHRpcGxlYCBzbyB3ZSBrbm93XG4gICAgICAgICAgICAgICAgLy8gdGhhdCB0aGVyZSBpcyBvbmx5IF9fb25lX19maWxlLlxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEZpbGUgPSB0cmFuc2Zvcm1lZEZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkID0gdGhpcy5vcHRpb25zLmNodW5raW5nICYmICh0aGlzLm9wdGlvbnMuZm9yY2VDaHVua2luZyB8fCB0cmFuc2Zvcm1lZEZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5jaHVua1NpemUpO1xuICAgICAgICAgICAgICAgIGZpbGVzWzBdLnVwbG9hZC50b3RhbENodW5rQ291bnQgPSBNYXRoLmNlaWwodHJhbnNmb3JtZWRGaWxlLnNpemUgLyB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtZWRGaWxlLnNpemUgPT09IDApIGZpbGVzWzBdLnVwbG9hZC50b3RhbENodW5rQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBmaWxlIHNob3VsZCBiZSBzZW50IGluIGNodW5rcyFcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2h1bmtpbmcgb3B0aW9uIGlzIHNldCwgd2UgKiprbm93KiogdGhhdCB0aGVyZSBjYW4gb25seSBiZSAqKm9uZSoqIGZpbGUsIHNpbmNlXG4gICAgICAgICAgICAgICAgLy8gdXBsb2FkTXVsdGlwbGUgaXMgbm90IGFsbG93ZWQgd2l0aCB0aGlzIG9wdGlvbi5cbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEZpbGUgPSB0cmFuc2Zvcm1lZEZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVOZXh0Q2h1bmsgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2h1bmtJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIG5leHQgaXRlbSBpbiBmaWxlLnVwbG9hZC5jaHVua3MgdGhhdCBpcyBub3QgZGVmaW5lZCB5ZXQuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGZpbGUudXBsb2FkLmNodW5rc1tjaHVua0luZGV4XSAhPT0gdW5kZWZpbmVkKWNodW5rSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtZWFucywgdGhhdCBhbGwgY2h1bmtzIGhhdmUgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHVua0luZGV4ID49IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBjaHVua0luZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgdGhpcy5vcHRpb25zLmNodW5rU2l6ZSwgdHJhbnNmb3JtZWRGaWxlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUJsb2NrID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZ2V0UGFyYW1OYW1lKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlID8gdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlKHN0YXJ0LCBlbmQpIDogdHJhbnNmb3JtZWRGaWxlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUudXBsb2FkLmZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtJbmRleDogY2h1bmtJbmRleFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNodW5rSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQmxvY2s6IGRhdGFCbG9jayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJpZXM6IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBsb2FkRGF0YShmaWxlcywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJsb2NrXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuZmluaXNoZWRDaHVua1VwbG9hZCA9IChjaHVuaywgcmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUztcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGRhdGEgZnJvbSB0aGUgY2h1bmtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsuZGF0YUJsb2NrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsucmVzcG9uc2UgPSBjaHVuay54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICBjaHVuay5yZXNwb25zZUhlYWRlcnMgPSBjaHVuay54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIExlYXZpbmcgdGhpcyByZWZlcmVuY2UgdG8geGhyIHdpbGwgY2F1c2UgbWVtb3J5IGxlYWtzLlxuICAgICAgICAgICAgICAgICAgICBjaHVuay54aHIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFuZGxlTmV4dENodW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldLnN0YXR1cyAhPT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5TVUNDRVNTKSBhbGxGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxGaW5pc2hlZCkgdGhpcy5vcHRpb25zLmNodW5rc1VwbG9hZGVkKGZpbGUsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYWxsZWxDaHVua1VwbG9hZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBsaW1pdCBwYXJhbGxlbENodW5rVXBsb2FkcyB0byB0aGUgc2FtZSB2YWx1ZSBhcyBwYXJhbGxlbFVwbG9hZHMgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFsbGVsQ291bnQgPSBNYXRoLm1pbih0aGlzLm9wdGlvbnMucGFyYWxsZWxDaHVua1VwbG9hZHMgPT09IHRydWUgPyB0aGlzLm9wdGlvbnMucGFyYWxsZWxVcGxvYWRzIDogdGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzLCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYWxsZWxDb3VudDsgaSsrKWhhbmRsZU5leHRDaHVuaygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBoYW5kbGVOZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9ja3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspZGF0YUJsb2Nrc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZ2V0UGFyYW1OYW1lKGkpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1lZEZpbGVzW2ldLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZXNbaV0udXBsb2FkLmZpbGVuYW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vLyBSZXR1cm5zIHRoZSByaWdodCBjaHVuayBmb3IgZ2l2ZW4gZmlsZSBhbmQgeGhyXG4gICAgX2dldENodW5rKGZpbGUsIHhocikge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspe1xuICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS54aHIgPT09IHhocikgcmV0dXJuIGZpbGUudXBsb2FkLmNodW5rc1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFjdHVhbGx5IHVwbG9hZHMgdGhlIGZpbGUocykgdG8gdGhlIHNlcnZlci5cbiAgICAvL1xuICAgIC8vICBJZiBkYXRhQmxvY2tzIGNvbnRhaW5zIHRoZSBhY3R1YWwgZGF0YSB0byB1cGxvYWQgKG1lYW5pbmcsIHRoYXQgdGhpcyBjb3VsZFxuICAgIC8vIGVpdGhlciBiZSB0cmFuc2Zvcm1lZCBmaWxlcywgb3IgaW5kaXZpZHVhbCBjaHVua3MgZm9yIGNodW5rZWQgdXBsb2FkKSB0aGVuXG4gICAgLy8gdGhleSB3aWxsIGJlIHVzZWQgZm9yIHRoZSBhY3R1YWwgZGF0YSB0byB1cGxvYWQuXG4gICAgX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpIHtcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIGZpbGUgb2JqZWN0cyB0byBiZSBhYmxlIHRvIHJlZmVyZW5jZSBpdCBsYXRlci5cbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcylmaWxlLnhociA9IHhocjtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSAvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIHJpZ2h0IGNodW5rIG9iamVjdCwgc28gaXQgY2FuIGJlIGFzc29jaWF0ZWRcbiAgICAgICAgLy8gbGF0ZXIsIGFuZCBmb3VuZCB3aXRoIF9nZXRDaHVuay5cbiAgICAgICAgZmlsZXNbMF0udXBsb2FkLmNodW5rc1tkYXRhQmxvY2tzWzBdLmNodW5rSW5kZXhdLnhociA9IHhocjtcbiAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMubWV0aG9kLCBmaWxlcywgZGF0YUJsb2Nrcyk7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnVybCwgZmlsZXMsIGRhdGFCbG9ja3MpO1xuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgIC8vIFNldHRpbmcgdGhlIHRpbWVvdXQgYWZ0ZXIgb3BlbiBiZWNhdXNlIG9mIElFMTEgaXNzdWU6IGh0dHBzOi8vZ2l0bGFiLmNvbS9tZW5vL2Ryb3B6b25lL2lzc3Vlcy84XG4gICAgICAgIGxldCB0aW1lb3V0ID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy50aW1lb3V0LCBmaWxlcyk7XG4gICAgICAgIGlmICh0aW1lb3V0KSB4aHIudGltZW91dCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMudGltZW91dCwgZmlsZXMpO1xuICAgICAgICAvLyBIYXMgdG8gYmUgYWZ0ZXIgYC5vcGVuKClgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvaXNzdWVzLzE3OVxuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISF0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB4aHIub25sb2FkID0gKGUpPT57XG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyLCBgUmVxdWVzdCB0aW1lZG91dCBhZnRlciAke3RoaXMub3B0aW9ucy50aW1lb3V0IC8gMTAwMH0gc2Vjb25kc2ApO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU29tZSBicm93c2VycyBkbyBub3QgaGF2ZSB0aGUgLnVwbG9hZCBwcm9wZXJ0eVxuICAgICAgICBsZXQgcHJvZ3Jlc3NPYmogPSB4aHIudXBsb2FkICE9IG51bGwgPyB4aHIudXBsb2FkIDogeGhyO1xuICAgICAgICBwcm9ncmVzc09iai5vbnByb2dyZXNzID0gKGUpPT50aGlzLl91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMub3B0aW9ucy5kZWZhdWx0SGVhZGVycyA/IHtcbiAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxuICAgICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIlxuICAgICAgICB9IDoge307XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmluYXJ5Qm9keSkgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGZpbGVzWzBdLnR5cGU7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycykgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIGZvcihsZXQgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGxldCBoZWFkZXJWYWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgICAgICAgICBpZiAoaGVhZGVyVmFsdWUpIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBmaWxlIGlzIGdvaW5nIHRvIGJlIHNlbnQgYXMgYmluYXJ5IGJvZHksIGl0IGRvZXNuJ3QgbWFrZVxuICAgICAgICAgICAgLy8gYW55IHNlbnNlIHRvIGdlbmVyYXRlIGBGb3JtRGF0YWAgZm9yIGl0LlxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmVtaXQoXCJzZW5kaW5nXCIsIGZpbGUsIHhocik7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJzZW5kaW5nbXVsdGlwbGVcIiwgZmlsZXMsIHhocik7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdFJlcXVlc3QoeGhyLCBudWxsLCBmaWxlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIC8vIEFkZGluZyBhbGwgQG9wdGlvbnMgcGFyYW1ldGVyc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25hbFBhcmFtcyA9IHRoaXMub3B0aW9ucy5wYXJhbXM7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZGRpdGlvbmFsUGFyYW1zID09PSBcImZ1bmN0aW9uXCIpIGFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zLmNhbGwodGhpcywgZmlsZXMsIHhociwgZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgPyB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKSA6IG51bGwpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIGFkZGl0aW9uYWxQYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBhZGRpdGlvbmFsUGFyYW1zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgLy8gVGhlIGFkZGl0aW9uYWwgcGFyYW1ldGVyIGNvbnRhaW5zIGFuIGFycmF5LFxuICAgICAgICAgICAgICAgICAgICAvLyBzbyBsZXRzIGl0ZXJhdGUgb3ZlciBpdCB0byBhdHRhY2ggZWFjaCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBpbmRpdmlkdWFsbHkuXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKylmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExldCB0aGUgdXNlciBhZGQgYWRkaXRpb25hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmVtaXQoXCJzZW5kaW5nXCIsIGZpbGUsIHhociwgZm9ybURhdGEpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwic2VuZGluZ211bHRpcGxlXCIsIGZpbGVzLCB4aHIsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEZvcm1FbGVtZW50RGF0YShmb3JtRGF0YSk7XG4gICAgICAgICAgICAvLyBGaW5hbGx5IGFkZCB0aGUgZmlsZXNcbiAgICAgICAgICAgIC8vIEhhcyB0byBiZSBsYXN0IGJlY2F1c2Ugc29tZSBzZXJ2ZXJzIChlZzogUzMpIGV4cGVjdCB0aGUgZmlsZSB0byBiZSB0aGUgbGFzdCBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhQmxvY2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUJsb2NrID0gZGF0YUJsb2Nrc1tpXTtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoZGF0YUJsb2NrLm5hbWUsIGRhdGFCbG9jay5kYXRhLCBkYXRhQmxvY2suZmlsZW5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUcmFuc2Zvcm1zIGFsbCBmaWxlcyB3aXRoIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlIGFuZCBpbnZva2VzIGRvbmUgd2l0aCB0aGUgdHJhbnNmb3JtZWQgZmlsZXMgd2hlbiBkb25lLlxuICAgIF90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZG9uZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlcyA9IFtdO1xuICAgICAgICAvLyBDbHVtc3kgd2F5IG9mIGhhbmRsaW5nIGFzeW5jaHJvbm91cyBjYWxscywgdW50aWwgSSBnZXQgdG8gYWRkIGEgcHJvcGVyIEZ1dHVyZSBsaWJyYXJ5LlxuICAgICAgICBsZXQgZG9uZUNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspdGhpcy5vcHRpb25zLnRyYW5zZm9ybUZpbGUuY2FsbCh0aGlzLCBmaWxlc1tpXSwgKHRyYW5zZm9ybWVkRmlsZSk9PntcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRmlsZXNbaV0gPSB0cmFuc2Zvcm1lZEZpbGU7XG4gICAgICAgICAgICBpZiAoKytkb25lQ291bnRlciA9PT0gZmlsZXMubGVuZ3RoKSBkb25lKHRyYW5zZm9ybWVkRmlsZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVGFrZXMgY2FyZSBvZiBhZGRpbmcgb3RoZXIgaW5wdXQgZWxlbWVudHMgb2YgdGhlIGZvcm0gdG8gdGhlIEFKQVggcmVxdWVzdFxuICAgIF9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpIHtcbiAgICAgICAgLy8gVGFrZSBjYXJlIG9mIG90aGVyIGlucHV0IGVsZW1lbnRzXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gXCJGT1JNXCIpIGZvciAobGV0IGlucHV0IG9mIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvblwiKSl7XG4gICAgICAgICAgICBsZXQgaW5wdXROYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICAgIGxldCBpbnB1dFR5cGUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuICAgICAgICAgICAgaWYgKGlucHV0VHlwZSkgaW5wdXRUeXBlID0gaW5wdXRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgaW5wdXQgZG9lc24ndCBoYXZlIGEgbmFtZSwgd2UgY2FuJ3QgdXNlIGl0LlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dE5hbWUgPT09IFwidW5kZWZpbmVkXCIgfHwgaW5wdXROYW1lID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dC50YWdOYW1lID09PSBcIlNFTEVDVFwiICYmIGlucHV0Lmhhc0F0dHJpYnV0ZShcIm11bHRpcGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgLy8gUG9zc2libHkgbXVsdGlwbGUgdmFsdWVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIGlucHV0Lm9wdGlvbnMpaWYgKG9wdGlvbi5zZWxlY3RlZCkgZm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlucHV0VHlwZSB8fCBpbnB1dFR5cGUgIT09IFwiY2hlY2tib3hcIiAmJiBpbnB1dFR5cGUgIT09IFwicmFkaW9cIiB8fCBpbnB1dC5jaGVja2VkKSBmb3JtRGF0YS5hcHBlbmQoaW5wdXROYW1lLCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSW52b2tlZCB3aGVuIHRoZXJlIGlzIG5ldyBwcm9ncmVzcyBpbmZvcm1hdGlvbiBhYm91dCBnaXZlbiBmaWxlcy5cbiAgICAvLyBJZiBlIGlzIG5vdCBwcm92aWRlZCwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB1cGxvYWQgaXMgZmluaXNoZWQuXG4gICAgX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMsIHhociwgZSkge1xuICAgICAgICBpZiAoIWZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSAvLyBIYW5kbGUgZmlsZSB1cGxvYWRzIHdpdGhvdXQgY2h1bmtpbmdcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBpZiAoZmlsZS51cGxvYWQudG90YWwgJiYgZmlsZS51cGxvYWQuYnl0ZXNTZW50ICYmIGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9PSBmaWxlLnVwbG9hZC50b3RhbCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gMTAwICogZS5sb2FkZWQgLyBlLnRvdGFsO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsID0gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZXZlbnQsIHNvIHdlJ3JlIGF0IDEwMCVcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSBmaWxlLnVwbG9hZC50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChcInVwbG9hZHByb2dyZXNzXCIsIGZpbGUsIGZpbGUudXBsb2FkLnByb2dyZXNzLCBmaWxlLnVwbG9hZC5ieXRlc1NlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGNodW5rZWQgZmlsZSB1cGxvYWRzXG4gICAgICAgICAgICAvLyBDaHVua2VkIHVwbG9hZCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHVwbG9hZGluZyBtdWx0aXBsZSBmaWxlcyBpbiBvbmVcbiAgICAgICAgICAgIC8vIHJlcXVlc3QsIHNvIHdlIGtub3cgdGhlcmUncyBvbmx5IG9uZSBmaWxlLlxuICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1swXTtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoaXMgaXMgYSBjaHVua2VkIHVwbG9hZCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGFwcHJvcHJpYXRlIGNodW5rXG4gICAgICAgICAgICAvLyBwcm9ncmVzcy5cbiAgICAgICAgICAgIGxldCBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGUsIHhocik7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGNodW5rLnByb2dyZXNzID0gMTAwICogZS5sb2FkZWQgLyBlLnRvdGFsO1xuICAgICAgICAgICAgICAgIGNodW5rLnRvdGFsID0gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBjaHVuay5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZXZlbnQsIHNvIHdlJ3JlIGF0IDEwMCVcbiAgICAgICAgICAgICAgICBjaHVuay5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICBjaHVuay5ieXRlc1NlbnQgPSBjaHVuay50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vdyB0YWxseSB0aGUgKmZpbGUqIHVwbG9hZCBwcm9ncmVzcyBmcm9tIGl0cyBpbmRpdmlkdWFsIGNodW5rc1xuICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgPSAwO1xuICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gMDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKylpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldICYmIHR5cGVvZiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnRvdGFsO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmJ5dGVzU2VudCArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0uYnl0ZXNTZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2luY2UgdGhlIHByb2Nlc3MgaXMgYSBwZXJjZW50YWdlLCB3ZSBuZWVkIHRvIGRpdmlkZSBieSB0aGUgYW1vdW50IG9mXG4gICAgICAgICAgICAvLyBjaHVua3Mgd2UndmUgdXNlZC5cbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gZmlsZS51cGxvYWQucHJvZ3Jlc3MgLyBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBmaWxlLCBmaWxlLnVwbG9hZC5wcm9ncmVzcywgZmlsZS51cGxvYWQuYnl0ZXNTZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSkge1xuICAgICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQpIHJldHVybjtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlICE9PSBcImFycmF5YnVmZmVyXCIgJiYgeGhyLnJlc3BvbnNlVHlwZSAhPT0gXCJibG9iXCIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGlmICh4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikgJiYgfnhoci5nZXRSZXNwb25zZUhlYWRlcihcImNvbnRlbnQtdHlwZVwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24vanNvblwiKSkgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBcIkludmFsaWQgSlNPTiByZXNwb25zZSBmcm9tIHNlcnZlci5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIpO1xuICAgICAgICBpZiAoISgyMDAgPD0geGhyLnN0YXR1cyAmJiB4aHIuc3RhdHVzIDwgMzAwKSkgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpO1xuICAgICAgICBlbHNlIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgZmlsZXNbMF0udXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQodGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhociksIHJlc3BvbnNlKTtcbiAgICAgICAgZWxzZSB0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIGUpO1xuICAgIH1cbiAgICBfaGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRCkgcmV0dXJuO1xuICAgICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgJiYgdGhpcy5vcHRpb25zLnJldHJ5Q2h1bmtzKSB7XG4gICAgICAgICAgICBsZXQgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKTtcbiAgICAgICAgICAgIGlmIChjaHVuay5yZXRyaWVzKysgPCB0aGlzLm9wdGlvbnMucmV0cnlDaHVua3NMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsuZGF0YUJsb2NrXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGNvbnNvbGUud2FybihcIlJldHJpZWQgdGhpcyBjaHVuayB0b28gb2Z0ZW4uIEdpdmluZyB1cC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCByZXNwb25zZSB8fCB0aGlzLm9wdGlvbnMuZGljdFJlc3BvbnNlRXJyb3IucmVwbGFjZShcInt7c3RhdHVzQ29kZX19XCIsIHhoci5zdGF0dXMpLCB4aHIpO1xuICAgIH1cbiAgICBzdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3Qgc2VuZCB0aGlzIHJlcXVlc3QgYmVjYXVzZSB0aGUgWE1MSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSBpcyBub3QgT1BFTkVELlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIHtcbiAgICAgICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoY2h1bmsuZGF0YUJsb2NrLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHhoci5zZW5kKGZpbGVzWzBdKTtcbiAgICAgICAgfSBlbHNlIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICB9XG4gICAgLy8gQ2FsbGVkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIGlzIGZpbmlzaGVkLlxuICAgIC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cbiAgICBfZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlVGV4dCwgZSkge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXtcbiAgICAgICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5TVUNDRVNTO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiLCBmaWxlLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc211bHRpcGxlXCIsIGZpbGVzLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVtdWx0aXBsZVwiLCBmaWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgLy8gQ2FsbGVkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIGlzIGZpbmlzaGVkLlxuICAgIC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cbiAgICBfZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCBtZXNzYWdlLCB4aHIpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuRVJST1I7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBmaWxlLCBtZXNzYWdlLCB4aHIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JtdWx0aXBsZVwiLCBmaWxlcywgbWVzc2FnZSwgeGhyKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIHN0YXRpYyB1dWlkdjQoKSB7XG4gICAgICAgIHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIChjKT0+KCtjIF4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAxNSA+PiArYyAvIDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgfVxufVxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbml0Q2xhc3MoKTtcbi8vIFRoaXMgaXMgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmVzLiBBZGQgY29uZmlndXJhdGlvbnNcbi8vIHRvIHRoaXMgb2JqZWN0IGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZSBlbGVtZW50cy5cbi8vXG4vLyBFeGFtcGxlOlxuLy9cbi8vICAgICBEcm9wem9uZS5vcHRpb25zLm15RHJvcHpvbmVFbGVtZW50SWQgPSB7IG1heEZpbGVzaXplOiAxIH07XG4vL1xuLy8gQW5kIGluIGh0bWw6XG4vL1xuLy8gICAgIDxmb3JtIGFjdGlvbj1cIi91cGxvYWRcIiBpZD1cIm15LWRyb3B6b25lLWVsZW1lbnQtaWRcIiBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPlxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zID0ge307XG4vLyBSZXR1cm5zIHRoZSBvcHRpb25zIGZvciBhbiBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBub25lIGF2YWlsYWJsZS5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9uc0ZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgLy8gR2V0IHRoZSBgRHJvcHpvbmUub3B0aW9ucy5lbGVtZW50SWRgIGZvciB0aGlzIGVsZW1lbnQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIikgJiYgdHlwZW9mICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnNbJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGNhbWVsaXplKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIikpXTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG59O1xuLy8gSG9sZHMgYSBsaXN0IG9mIGFsbCBkcm9wem9uZSBpbnN0YW5jZXNcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzID0gW107XG4vLyBSZXR1cm5zIHRoZSBkcm9wem9uZSBmb3IgZ2l2ZW4gZWxlbWVudCBpZiBhbnlcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZm9yRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgIGlmICgoZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5kcm9wem9uZSA6IHVuZGVmaW5lZCkgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gRHJvcHpvbmUgZm91bmQgZm9yIGdpdmVuIGVsZW1lbnQuIFRoaXMgaXMgcHJvYmFibHkgYmVjYXVzZSB5b3UncmUgdHJ5aW5nIHRvIGFjY2VzcyBpdCBiZWZvcmUgRHJvcHpvbmUgaGFkIHRoZSB0aW1lIHRvIGluaXRpYWxpemUuIFVzZSB0aGUgYGluaXRgIG9wdGlvbiB0byBzZXR1cCBhbnkgYWRkaXRpb25hbCBvYnNlcnZlcnMgb24geW91ciBEcm9wem9uZS5cIik7XG4gICAgcmV0dXJuIGVsZW1lbnQuZHJvcHpvbmU7XG59O1xuLy8gTG9va3MgZm9yIGFsbCAuZHJvcHpvbmUgZWxlbWVudHMgYW5kIGNyZWF0ZXMgYSBkcm9wem9uZSBmb3IgdGhlbVxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5kaXNjb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBkcm9wem9uZXM7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIGRyb3B6b25lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJvcHpvbmVcIik7XG4gICAgZWxzZSB7XG4gICAgICAgIGRyb3B6b25lcyA9IFtdO1xuICAgICAgICAvLyBJRSA6KFxuICAgICAgICBsZXQgY2hlY2tFbGVtZW50cyA9IChlbGVtZW50cyk9PigoKT0+e1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbCBvZiBlbGVtZW50cylpZiAoLyhefCApZHJvcHpvbmUoJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSByZXN1bHQucHVzaChkcm9wem9uZXMucHVzaChlbCkpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgY2hlY2tFbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKSk7XG4gICAgICAgIGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJmb3JtXCIpKTtcbiAgICB9XG4gICAgcmV0dXJuICgoKT0+e1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGRyb3B6b25lIG9mIGRyb3B6b25lcykvLyBDcmVhdGUgYSBkcm9wem9uZSB1bmxlc3MgYXV0byBkaXNjb3ZlciBoYXMgYmVlbiBkaXNhYmxlZCBmb3Igc3BlY2lmaWMgZWxlbWVudFxuICAgICAgICBpZiAoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zRm9yRWxlbWVudChkcm9wem9uZSkgIT09IGZhbHNlKSByZXN1bHQucHVzaChuZXcgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOShkcm9wem9uZSkpO1xuICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKTtcbn07XG4vLyBDaGVja3MgaWYgdGhlIGJyb3dzZXIgaXMgc3VwcG9ydGVkIGJ5IHNpbXBseSBjaGVja2luZyBpZiBQcm9taXNlIGlzIGhlcmU6IGEgZ29vZCBjdXRvZmZcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNCcm93c2VyU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiO1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZGF0YVVSSXRvQmxvYiA9IGZ1bmN0aW9uKGRhdGFVUkkpIHtcbiAgICAvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgIC8vIGRvZXNuJ3QgaGFuZGxlIFVSTEVuY29kZWQgRGF0YVVSSXMgLSBzZWUgU08gYW5zd2VyICM2ODUwMjc2IGZvciBjb2RlIHRoYXQgZG9lcyB0aGlzXG4gICAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoXCIsXCIpWzFdKTtcbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgbGV0IG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KFwiLFwiKVswXS5zcGxpdChcIjpcIilbMV0uc3BsaXQoXCI7XCIpWzBdO1xuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgbGV0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yKGxldCBpID0gMCwgZW5kID0gYnl0ZVN0cmluZy5sZW5ndGgsIGFzYyA9IDAgPD0gZW5kOyBhc2MgPyBpIDw9IGVuZCA6IGkgPj0gZW5kOyBhc2MgPyBpKysgOiBpLS0paWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgLy8gd3JpdGUgdGhlIEFycmF5QnVmZmVyIHRvIGEgYmxvYlxuICAgIHJldHVybiBuZXcgQmxvYihbXG4gICAgICAgIGFiXG4gICAgXSwge1xuICAgICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSk7XG59O1xuLy8gUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSByZWplY3RlZCBpdGVtXG5jb25zdCAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkd2l0aG91dCA9IChsaXN0LCByZWplY3RlZEl0ZW0pPT5saXN0LmZpbHRlcigoaXRlbSk9Pml0ZW0gIT09IHJlamVjdGVkSXRlbSkubWFwKChpdGVtKT0+aXRlbSk7XG4vLyBhYmMtZGVmX2doaSAtPiBhYmNEZWZHaGlcbmNvbnN0ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRjYW1lbGl6ZSA9IChzdHIpPT5zdHIucmVwbGFjZSgvW1xcLV9dKFxcdykvZywgKG1hdGNoKT0+bWF0Y2guY2hhckF0KDEpLnRvVXBwZXJDYXNlKCkpO1xuLy8gQ3JlYXRlcyBhbiBlbGVtZW50IGZyb20gc3RyaW5nXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gc3RyaW5nO1xuICAgIHJldHVybiBkaXYuY2hpbGROb2Rlc1swXTtcbn07XG4vLyBUZXN0cyBpZiBnaXZlbiBlbGVtZW50IGlzIGluc2lkZSAob3Igc2ltcGx5IGlzKSB0aGUgY29udGFpbmVyXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmVsZW1lbnRJbnNpZGUgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIpIHtcbiAgICBpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSByZXR1cm4gdHJ1ZTtcbiAgICAgLy8gQ29mZmVlc2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBkby93aGlsZSBsb29wc1xuICAgIHdoaWxlKGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpe1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKGVsLCBuYW1lKSB7XG4gICAgbGV0IGVsZW1lbnQ7XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGVsc2UgaWYgKGVsLm5vZGVUeXBlICE9IG51bGwpIGVsZW1lbnQgPSBlbDtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgXFxgJHtuYW1lfVxcYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yIG9yIGEgcGxhaW4gSFRNTCBlbGVtZW50LmApO1xuICAgIHJldHVybiBlbGVtZW50O1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbihlbHMsIG5hbWUpIHtcbiAgICBsZXQgZWwsIGVsZW1lbnRzO1xuICAgIGlmIChlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChlbCBvZiBlbHMpZWxlbWVudHMucHVzaCh0aGlzLmdldEVsZW1lbnQoZWwsIG5hbWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnRzID0gW107XG4gICAgICAgIGZvciAoZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbHMpKWVsZW1lbnRzLnB1c2goZWwpO1xuICAgIH0gZWxzZSBpZiAoZWxzLm5vZGVUeXBlICE9IG51bGwpIGVsZW1lbnRzID0gW1xuICAgICAgICBlbHNcbiAgICBdO1xuICAgIGlmIChlbGVtZW50cyA9PSBudWxsIHx8ICFlbGVtZW50cy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBcXGAke25hbWV9XFxgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3IsIGEgcGxhaW4gSFRNTCBlbGVtZW50IG9yIGEgbGlzdCBvZiB0aG9zZS5gKTtcbiAgICByZXR1cm4gZWxlbWVudHM7XG59O1xuLy8gQXNrcyB0aGUgdXNlciB0aGUgcXVlc3Rpb24gYW5kIGNhbGxzIGFjY2VwdGVkIG9yIHJlamVjdGVkIGFjY29yZGluZ2x5XG4vL1xuLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24ganVzdCB1c2VzIGB3aW5kb3cuY29uZmlybWAgYW5kIHRoZW4gY2FsbHMgdGhlXG4vLyBhcHByb3ByaWF0ZSBjYWxsYmFjay5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuY29uZmlybSA9IGZ1bmN0aW9uKHF1ZXN0aW9uLCBhY2NlcHRlZCwgcmVqZWN0ZWQpIHtcbiAgICBpZiAod2luZG93LmNvbmZpcm0ocXVlc3Rpb24pKSByZXR1cm4gYWNjZXB0ZWQoKTtcbiAgICBlbHNlIGlmIChyZWplY3RlZCAhPSBudWxsKSByZXR1cm4gcmVqZWN0ZWQoKTtcbn07XG4vLyBWYWxpZGF0ZXMgdGhlIG1pbWUgdHlwZSBsaWtlIHRoaXM6XG4vL1xuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHRcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNWYWxpZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBhY2NlcHRlZEZpbGVzKSB7XG4gICAgaWYgKCFhY2NlcHRlZEZpbGVzKSByZXR1cm4gdHJ1ZTtcbiAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGFjY2VwdGVkIG1pbWUgdHlwZXMsIGl0J3MgT0tcbiAgICBhY2NlcHRlZEZpbGVzID0gYWNjZXB0ZWRGaWxlcy5zcGxpdChcIixcIik7XG4gICAgbGV0IG1pbWVUeXBlID0gZmlsZS50eXBlO1xuICAgIGxldCBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCBcIlwiKTtcbiAgICBmb3IgKGxldCB2YWxpZFR5cGUgb2YgYWNjZXB0ZWRGaWxlcyl7XG4gICAgICAgIHZhbGlkVHlwZSA9IHZhbGlkVHlwZS50cmltKCk7XG4gICAgICAgIGlmICh2YWxpZFR5cGUuY2hhckF0KDApID09PSBcIi5cIikge1xuICAgICAgICAgICAgaWYgKGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsaWRUeXBlLnRvTG93ZXJDYXNlKCksIGZpbGUubmFtZS5sZW5ndGggLSB2YWxpZFR5cGUubGVuZ3RoKSAhPT0gLTEpIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC9cXCokLy50ZXN0KHZhbGlkVHlwZSkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSBpbWFnZS8qIG1pbWUgdHlwZVxuICAgICAgICAgICAgaWYgKGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sIFwiXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtaW1lVHlwZSA9PT0gdmFsaWRUeXBlKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLy8gQXVnbWVudCBqUXVlcnlcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeSAhPT0gbnVsbCkgalF1ZXJ5LmZuLmRyb3B6b25lID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSh0aGlzLCBvcHRpb25zKTtcbiAgICB9KTtcbn07XG4vLyBEcm9wem9uZSBmaWxlIHN0YXR1cyBjb2Rlc1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCA9IFwiYWRkZWRcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEID0gXCJxdWV1ZWRcIjtcbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gTm93LCBpZiBhIGZpbGUgaXMgYWNjZXB0ZWQsIGl0J3MgZWl0aGVyIHF1ZXVlZFxuLy8gb3IgdXBsb2FkaW5nLlxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BQ0NFUFRFRCA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcgPSBcInVwbG9hZGluZ1wiO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5QUk9DRVNTSU5HID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkc7IC8vIGFsaWFzXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEID0gXCJjYW5jZWxlZFwiO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5FUlJPUiA9IFwiZXJyb3JcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUyA9IFwic3VjY2Vzc1wiO1xuLypcblxuIEJ1Z2ZpeCBmb3IgaU9TIDYgYW5kIDdcbiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE5MjkwOTkvaHRtbDUtY2FudmFzLWRyYXdpbWFnZS1yYXRpby1idWctaW9zXG4gYmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL3N0b21pdGEvaW9zLWltYWdlZmlsZS1tZWdhcGl4ZWxcblxuICovIC8vIERldGVjdGluZyB2ZXJ0aWNhbCBzcXVhc2ggaW4gbG9hZGVkIGltYWdlLlxuLy8gRml4ZXMgYSBidWcgd2hpY2ggc3F1YXNoIGltYWdlIHZlcnRpY2FsbHkgd2hpbGUgZHJhd2luZyBpbnRvIGNhbnZhcyBmb3Igc29tZSBpbWFnZXMuXG4vLyBUaGlzIGlzIGEgYnVnIGluIGlPUzYgZGV2aWNlcy4gVGhpcyBmdW5jdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG5sZXQgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRldGVjdFZlcnRpY2FsU3F1YXNoID0gZnVuY3Rpb24oaW1nKSB7XG4gICAgbGV0IGloID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzLndpZHRoID0gMTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaWg7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgIGxldCB7IGRhdGE6IGRhdGEgfSA9IGN0eC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgaWgpO1xuICAgIC8vIHNlYXJjaCBpbWFnZSBlZGdlIHBpeGVsIHBvc2l0aW9uIGluIGNhc2UgaXQgaXMgc3F1YXNoZWQgdmVydGljYWxseS5cbiAgICBsZXQgc3kgPSAwO1xuICAgIGxldCBleSA9IGloO1xuICAgIGxldCBweSA9IGloO1xuICAgIHdoaWxlKHB5ID4gc3kpe1xuICAgICAgICBsZXQgYWxwaGEgPSBkYXRhWyhweSAtIDEpICogNCArIDNdO1xuICAgICAgICBpZiAoYWxwaGEgPT09IDApIGV5ID0gcHk7XG4gICAgICAgIGVsc2Ugc3kgPSBweTtcbiAgICAgICAgcHkgPSBleSArIHN5ID4+IDE7XG4gICAgfVxuICAgIGxldCByYXRpbyA9IHB5IC8gaWg7XG4gICAgaWYgKHJhdGlvID09PSAwKSByZXR1cm4gMTtcbiAgICBlbHNlIHJldHVybiByYXRpbztcbn07XG4vLyBBIHJlcGxhY2VtZW50IGZvciBjb250ZXh0LmRyYXdJbWFnZVxuLy8gKGFyZ3MgYXJlIGZvciBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uKS5cbnZhciAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZHJhd0ltYWdlSU9TRml4ID0gZnVuY3Rpb24oY3R4LCBpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCkge1xuICAgIGxldCB2ZXJ0U3F1YXNoUmF0aW8gPSAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZGV0ZWN0VmVydGljYWxTcXVhc2goaW1nKTtcbiAgICByZXR1cm4gY3R4LmRyYXdJbWFnZShpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCAvIHZlcnRTcXVhc2hSYXRpbyk7XG59O1xuLy8gSW5zcGlyZWQgYnkgTWluaWZ5SnBlZ1xuLy8gU291cmNlOiBodHRwOi8vd3d3LnBlcnJ5LmN6L2ZpbGVzL0V4aWZSZXN0b3Jlci5qc1xuLy8gaHR0cDovL2VsaWNvbi5ibG9nNTcuZmMyLmNvbS9ibG9nLWVudHJ5LTIwNi5odG1sXG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkcmVtb3ZlRXhpZihvcmlnRmlsZUJhc2U2NCkge1xuICAgIHZhciBtYXJrZXIgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnO1xuICAgIGlmICghb3JpZ0ZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpKSByZXR1cm4gb3JpZ0ZpbGVCYXNlNjQ7XG4gICAgdmFyIG9yaWdGaWxlID0gd2luZG93LmF0b2Iob3JpZ0ZpbGVCYXNlNjQuc2xpY2UobWFya2VyLmxlbmd0aCkpO1xuICAgIGlmICghb3JpZ0ZpbGUuc3RhcnRzV2l0aChcIlxceEZGXFx4RDhcXHhGRlwiKSkgcmV0dXJuIG9yaWdGaWxlQmFzZTY0O1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgSlBFRyBmaWxlIHNlZ21lbnRzIGFuZCBjb3B5IGFsbCBidXQgRXhpZiBzZWdtZW50cyBpbnRvIHRoZSBmaWx0ZXJlZCBmaWxlLlxuICAgIHZhciBoZWFkID0gMDtcbiAgICB2YXIgZmlsdGVyZWRGaWxlID0gXCJcIjtcbiAgICB3aGlsZShoZWFkIDwgb3JpZ0ZpbGUubGVuZ3RoKXtcbiAgICAgICAgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4REFcIikge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc3RhcnQgb2YgdGhlIGltYWdlIGRhdGEsIHdlIGRvbid0IGV4cGVjdCBleGlmIGRhdGEgYWZ0ZXIgdGhhdC5cbiAgICAgICAgICAgIGZpbHRlcmVkRmlsZSArPSBvcmlnRmlsZS5zbGljZShoZWFkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4RDhcIikge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgZ2xvYmFsIHN0YXJ0IG1hcmtlci5cbiAgICAgICAgICAgIGZpbHRlcmVkRmlsZSArPSBvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMik7XG4gICAgICAgICAgICBoZWFkICs9IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgc2VnbWVudCBvZiB2YXJpYWJsZSBzaXplLlxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDIpICogMjU2ICsgb3JpZ0ZpbGUuY2hhckNvZGVBdChoZWFkICsgMyk7XG4gICAgICAgICAgICB2YXIgZW5kUG9pbnQgPSBoZWFkICsgbGVuZ3RoICsgMjtcbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCwgZW5kUG9pbnQpO1xuICAgICAgICAgICAgaWYgKCFzZWdtZW50LnN0YXJ0c1dpdGgoXCJcXHhGRlxceEUxXCIpKSBmaWx0ZXJlZEZpbGUgKz0gc2VnbWVudDtcbiAgICAgICAgICAgIGhlYWQgPSBlbmRQb2ludDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFya2VyICsgd2luZG93LmJ0b2EoZmlsdGVyZWRGaWxlKTtcbn1cbmZ1bmN0aW9uICQzZWQyNjlmMmYwZmIyMjRiJHZhciRyZXN0b3JlRXhpZihvcmlnRmlsZUJhc2U2NCwgcmVzaXplZEZpbGVCYXNlNjQpIHtcbiAgICB2YXIgbWFya2VyID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcbiAgICBpZiAoIShvcmlnRmlsZUJhc2U2NC5zdGFydHNXaXRoKG1hcmtlcikgJiYgcmVzaXplZEZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpKSkgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIHZhciBvcmlnRmlsZSA9IHdpbmRvdy5hdG9iKG9yaWdGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIW9yaWdGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBKUEVHIGZpbGUgc2VnbWVudHMgb25lIGJ5IG9uZSBhbmQgY29sbGVjdCBhbnkgRXhpZiBzZWdtZW50cyB3ZSBmaW5kLlxuICAgIHZhciBoZWFkID0gMDtcbiAgICB2YXIgZXhpZkRhdGEgPSBcIlwiO1xuICAgIHdoaWxlKGhlYWQgPCBvcmlnRmlsZS5sZW5ndGgpe1xuICAgICAgICBpZiAob3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpID09IFwiXFx4RkZcXHhEQVwiKSBicmVhaztcbiAgICAgICAgZWxzZSBpZiAob3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpID09IFwiXFx4RkZcXHhEOFwiKSAvLyB0aGlzIGlzIHRoZSBnbG9iYWwgc3RhcnQgbWFya2VyLlxuICAgICAgICBoZWFkICs9IDI7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHNlZ21lbnQgb2YgdmFyaWFibGUgc2l6ZS5cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAyKSAqIDI1NiArIG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDMpO1xuICAgICAgICAgICAgdmFyIGVuZFBvaW50ID0gaGVhZCArIGxlbmd0aCArIDI7XG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IG9yaWdGaWxlLnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnN0YXJ0c1dpdGgoXCJcXHhGRlxceEUxXCIpKSBleGlmRGF0YSArPSBzZWdtZW50O1xuICAgICAgICAgICAgaGVhZCA9IGVuZFBvaW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChleGlmRGF0YSA9PSBcIlwiKSByZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG4gICAgdmFyIHJlc2l6ZWRGaWxlID0gd2luZG93LmF0b2IocmVzaXplZEZpbGVCYXNlNjQuc2xpY2UobWFya2VyLmxlbmd0aCkpO1xuICAgIGlmICghcmVzaXplZEZpbGUuc3RhcnRzV2l0aChcIlxceEZGXFx4RDhcXHhGRlwiKSkgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIC8vIFRoZSBmaXJzdCBmaWxlIHNlZ21lbnQgaXMgYWx3YXlzIGhlYWRlciBpbmZvcm1hdGlvbiBzbyBpbnNlcnQgdGhlIEV4aWYgZGF0YSBhcyBzZWNvbmQgc2VnbWVudC5cbiAgICB2YXIgc3BsaXRQb2ludCA9IDQgKyByZXNpemVkRmlsZS5jaGFyQ29kZUF0KDQpICogMjU2ICsgcmVzaXplZEZpbGUuY2hhckNvZGVBdCg1KTtcbiAgICByZXNpemVkRmlsZSA9IHJlc2l6ZWRGaWxlLnNsaWNlKDAsIHNwbGl0UG9pbnQpICsgZXhpZkRhdGEgKyByZXNpemVkRmlsZS5zbGljZShzcGxpdFBvaW50KTtcbiAgICByZXR1cm4gbWFya2VyICsgd2luZG93LmJ0b2EocmVzaXplZEZpbGUpO1xufVxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRfXyh2YWx1ZSwgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCA/IHRyYW5zZm9ybSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkX19ndWFyZE1ldGhvZF9fKG9iaiwgbWV0aG9kTmFtZSwgdHJhbnNmb3JtKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmpbbWV0aG9kTmFtZV0gPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRyYW5zZm9ybShvYmosIG1ldGhvZE5hbWUpO1xuICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgeyQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgYXMgZGVmYXVsdCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSBhcyBEcm9wem9uZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcm9wem9uZS5tanMubWFwXG4iLCJjb25zdCBjb25maWd1cmVDbGlwYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29weSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNsaXBib2FyZC10YXJnZXRdJyk7XG5cbiAgICBjb3B5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbi5kYXRhc2V0LmNsaXBib2FyZFRhcmdldCkuaW5uZXJUZXh0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNsaXBib2FyZCBzdWNjZXNzZnVsbHkgc2V0XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnaXMtY29waWVkJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaXMtY29waWVkJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZUNsaXBib2FyZDtcbiIsImltcG9ydCB7IERyb3B6b25lIH0gZnJvbSBcIkBkZWx0YWJsb3QvZHJvcHpvbmVcIjtcblxuY29uc3QgYWRkRHJvcHpvbmUgPSAoZWxlbWVudCA9IG51bGwpID0+IHtcbiAgbGV0IGRyb3B6b25lID0gZWxlbWVudDtcblxuICBpZiAoZHJvcHpvbmUgPT09IG51bGwpIHtcbiAgICBkcm9wem9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbXBvbmVudD1kcm9wem9uZV0nKTtcbiAgfVxuXG4gIGlmIChkcm9wem9uZSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGRyb3B6b25lLmRhdGFzZXQuZHJvcHpvbmVDb25maWcgPyBKU09OLnBhcnNlKGRyb3B6b25lLmRhdGFzZXQuZHJvcHpvbmVDb25maWcpIDoge307XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgIGFkZFJlbW92ZUxpbmtzOiBmYWxzZSxcbiAgICAgIG1heEZpbGVzaXplOiAyMCwgLy8gTUJcbiAgICAgIHBhcmFtTmFtZTogJ3VwbG9hZFtmaWxlXScsXG4gICAgICBwcmV2aWV3VGVtcGxhdGU6IGRyb3B6b25lLnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3LXRlbXBsYXRlJykuaW5uZXJIVE1MLFxuICAgICAgdGh1bWJuYWlsV2lkdGg6IDE4MCxcbiAgICAgIHRodW1ibmFpbEhlaWdodDogMTA5LFxuICAgICAgc2VuZGluZyhmaWxlLCB4aHIpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlPy5maWxlc1swXT8ubGluaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbmZvID0gcmVzcG9uc2UuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICBcIltkYXRhLWR6LWxpbmtdXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmhyZWYgPSBmaWxlSW5mby5saW5rO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWVkaWEtZm9sZGVyXCIsIGZpbGVJbmZvLm1lZGlhRm9sZGVyKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLXVybFwiLCBmaWxlSW5mby5tZWRpYVVybCk7XG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1tZWRpYS10ZW1wbGF0ZVwiLCBmaWxlSW5mby5tZWRpYVRlbXBsYXRlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlSW5mby5tZWRpYVByZXZpZXcpIHtcbiAgICAgICAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWR6LXRodW1ibmFpbF1cIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5pbm5lckhUTUwgPSBmaWxlSW5mby5tZWRpYVByZXZpZXc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgRHJvcHpvbmUoZHJvcHpvbmUsIHsgLi4uZGVmYXVsdENvbmZpZywgLi4uY29uZmlnIH0pO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGREcm9wem9uZTtcbiIsImNvbnN0IHsgalF1ZXJ5LCBBZG1pbiB9ID0gd2luZG93O1xuXG5jb25zdCBGb2xkZXJTZWxlY3RvciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZm9ybScpO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJyNtb3ZlX3RvJyk7XG4gICAgdGhpcy5tb2RhbCA9IGZhbHNlO1xuICAgIHRoaXMubW9kYWxDb250ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50Rm9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBmZXRjaEZvbGRlciA9ICh1cmwpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRGb2xkZXIgPSB1cmw7XG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSk7XG4gIH07XG5cbiAgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgIHRoaXMubW9kYWxDb250ZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgQWRtaW4uc2hhcmVkX3NldHVwKHRoaXMubW9kYWwpO1xuICB9O1xuXG4gIGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYScpO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0ID09PSBudWxsIHx8XG4gICAgICB0YXJnZXQudGFnTmFtZSAhPT0gJ0EnIHx8XG4gICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYubGVuZ3RoID09PSAwIHx8XG4gICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLnZhbHVlID09PSAnIydcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRhcmdldC5kYXRhc2V0LmZvbGRlclBhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gdGhpcyBpcyBub3QgYSBzZWxlY3RhYmxlIG1lZGlhXG4gICAgICB0aGlzLmZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4odGhpcy5jb25maWd1cmVNb2RhbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0LmZvbGRlclBhdGgpO1xuICAgIGpRdWVyeSh0aGlzLm1vZGFsKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgaWYgKGNvbmZpcm0odGFyZ2V0LmRhdGFzZXQuY29uZmlybWF0aW9uKSkge1xuICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb2RhbFN1Ym1pdCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgIC50aGVuKHRoaXMuY29uZmlndXJlTW9kYWwpXG4gICAgO1xuICB9O1xuXG4gIHNldEZpZWxkVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gIH07XG5cbiAgY2hvb3NlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIGluaXRpYWxpemUgY29tcG9uZW50c1xuICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZF9kaWFsb2dfZm9sZGVyLWNob2ljZScpO1xuICAgICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlTW9kYWxDbGljayk7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5oYW5kbGVNb2RhbFN1Ym1pdCk7XG5cbiAgICAgIHRoaXMubW9kYWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ZpZWxkX2RpYWxvZ19mb2xkZXItY2hvaWNlIC5tb2RhbC1ib2R5YCk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgIGpRdWVyeSh0aGlzLm1vZGFsKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIHRoaXMuZmV0Y2hGb2xkZXIoZXZlbnQuY3VycmVudFRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUgKyAnLycgKyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZm9sZGVyKS50aGVuKChodG1sKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU1vZGFsKGh0bWwpO1xuICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCk7XG4gICAgICBBZG1pbi5zZXR1cF9saXN0X21vZGFsKHRoaXMubW9kYWwpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IGNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yID0gKCkgPT4ge1xuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLWNob2ljZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIG5ldyBGb2xkZXJTZWxlY3RvcigpLmNob29zZShlKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvcjtcbiIsImNvbnN0IHsgalF1ZXJ5LCBBZG1pbiB9ID0gd2luZG93O1xuXG5jb25zdCBNZWRpYVNlbGVjdG9yID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihtZWRpYUNob2ljZUNvbnRhaW5lcikge1xuICAgIHRoaXMubWVkaWFDaG9pY2VDb250YWluZXIgPSBtZWRpYUNob2ljZUNvbnRhaW5lcjtcbiAgICB0aGlzLmRlbGV0ZUJ1dHRvbiA9IG1lZGlhQ2hvaWNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5qcy1qb2xpLW1lZGlhLWNob2ljZS1kZWxldGUnKTtcbiAgICB0aGlzLmVkaXRCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuanMtam9saS1tZWRpYS1jaG9pY2UtZWRpdCcpO1xuICAgIHRoaXMuaWQgPSBtZWRpYUNob2ljZUNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG4gICAgdGhpcy5tZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBqb2xpLW1lZGlhLWNvbnRhaW5lcl8ke3RoaXMuaWR9YCk7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICB0aGlzLm1vZGFsID0gZmFsc2U7XG4gICAgdGhpcy5tb2RhbENvbnRlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRGb2xkZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGZldGNoRm9sZGVyID0gKHVybCkgPT4ge1xuICAgIHRoaXMuY3VycmVudEZvbGRlciA9IHVybDtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcbiAgfTtcblxuICBjb25maWd1cmVNb2RhbCA9IChodG1sKSA9PiB7XG4gICAgdGhpcy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBBZG1pbi5zaGFyZWRfc2V0dXAodGhpcy5tb2RhbCk7XG4gIH07XG5cbiAgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhJyk7XG5cbiAgICBpZiAoXG4gICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgIHRhcmdldC50YWdOYW1lICE9PSAnQScgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUgPT09ICcjJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIHRoaXMgaXMgbm90IGEgc2VsZWN0YWJsZSBtZWRpYVxuICAgICAgdGhpcy5mZXRjaEZvbGRlcih0YXJnZXQuYXR0cmlidXRlcy5ocmVmLnZhbHVlKS50aGVuKHRoaXMuY29uZmlndXJlTW9kYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubWVkaWFDb250YWluZXIuaW5uZXJIVE1MID0gdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZTtcbiAgICB0aGlzLm1lZGlhQ2hvaWNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgdGhpcy5zZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsKTtcbiAgICB0aGlzLmVkaXRCdXR0b24uZGF0YXNldC5mb2xkZXIgPSB0YXJnZXQuZGF0YXNldC5tZWRpYUZvbGRlcjtcbiAgICBqUXVlcnkodGhpcy5tb2RhbCkubW9kYWwoJ2hpZGUnKTtcbiAgfTtcblxuICBoYW5kbGVNb2RhbFN1Ym1pdCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgLnRoZW4odGhpcy5jb25maWd1cmVNb2RhbClcbiAgICA7XG4gIH07XG5cbiAgc2V0RmllbGRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcbiAgfTtcblxuICBjaG9vc2UoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjb21wb25lbnRzXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpZWxkX2RpYWxvZ18ke3RoaXMuaWR9YCk7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVNb2RhbENsaWNrKTtcbiAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgICAgdGhpcy5tb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZmllbGRfZGlhbG9nXyR7dGhpcy5pZH0gLm1vZGFsLWJvZHlgKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxDb250ZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgdGhpcy5mZXRjaEZvbGRlcih0aGlzLmVkaXRCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgJy8nICsgdGhpcy5lZGl0QnV0dG9uLmRhdGFzZXQuZm9sZGVyKS50aGVuKChodG1sKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU1vZGFsKGh0bWwpO1xuICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCk7XG4gICAgICBBZG1pbi5zZXR1cF9saXN0X21vZGFsKHRoaXMubW9kYWwpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMubWVkaWFDaG9pY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0ZW1wbGF0ZS1udWxsLWxhYmVsLSR7dGhpcy5pZH1gKTtcbiAgICB0aGlzLm1lZGlhQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5tZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLmVkaXRCdXR0b24uZGF0YXNldC5mb2xkZXIgPSAnJztcbiAgICB0aGlzLnNldEZpZWxkVmFsdWUoJycpO1xuICB9XG59XG5cbmNvbnN0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IgPSAoKSA9PiB7XG4gIGNvbnN0IG1lZGlhU2VsZWN0b3JzID0ge307XG5cbiAgY29uc3QgZ2V0TWVkaWFTZWxlY3RvciA9IChub2RlKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5jbG9zZXN0KCcuanMtam9saS1tZWRpYS1jaG9pY2UtY29udGFpbmVyJyk7XG4gICAgY29uc3QgbWVkaWFJZCA9IGNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG5cbiAgICBpZiAoIW1lZGlhU2VsZWN0b3JzW21lZGlhSWRdKSB7XG4gICAgICBtZWRpYVNlbGVjdG9yc1ttZWRpYUlkXSA9IG5ldyBNZWRpYVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhU2VsZWN0b3JzW21lZGlhSWRdO1xuICB9XG5cbiAgalF1ZXJ5KGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWpvbGktbWVkaWEtY2hvaWNlLWRlbGV0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZ2V0TWVkaWFTZWxlY3RvcihlLnRhcmdldCkuZGVsZXRlKGUpO1xuICB9KTtcblxuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtam9saS1tZWRpYS1jaG9pY2UtZWRpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZ2V0TWVkaWFTZWxlY3RvcihlLnRhcmdldCkuY2hvb3NlKGUpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3I7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zdHlsZXMvam9saW1lZGlhLmNzcyc7XG5pbXBvcnQgYWRkRHJvcHpvbmUgZnJvbSAnLi9jb21wb25lbnRzL2Ryb3B6b25lJztcbmltcG9ydCBjb25maWd1cmVGb2xkZXJTZWxlY3RvciBmcm9tICcuL2NvbXBvbmVudHMvZm9sZGVyU2VsZWN0b3InO1xuaW1wb3J0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL21lZGlhU2VsZWN0b3InO1xuaW1wb3J0IGNvbmZpZ3VyZUNsaXBib2FyZCBmcm9tICcuL2NvbXBvbmVudHMvY2xpcGJvYXJkJztcblxuY29uc3QgeyBqUXVlcnkgfSA9IHdpbmRvdztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uZmlndXJlRm9sZGVyU2VsZWN0b3IoKTtcbiAgY29uZmlndXJlTWVkaWFTZWxlY3RvcigpO1xuICBjb25maWd1cmVDbGlwYm9hcmQoKTtcbiAgbGV0IGRyb3B6b25lSW5zdGFuY2UgPSBudWxsO1xuXG4gIGNvbnN0IHN3aXRjaFRvb2wgPSAodGFyZ2V0LCBjdXJyZW50VG9vbCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlclRvb2xzID0gdGFyZ2V0LmNsb3Nlc3QoJy5qb2xpLW1lZGlhLWhlYWRlci10b29scycpO1xuICAgIGxldCBhY3RpdmVUb29sID0gbnVsbDtcblxuICAgIGZvciAoY29uc3QgdG9vbCBvZiBbJ2Ryb3B6b25lJywgJ25ldy1kaXJlY3RvcnknLCAncmVuYW1lLWRpcmVjdG9yeSddKSB7XG4gICAgICBjb25zdCB0b29sQ29udGFpbmVyID0gaGVhZGVyVG9vbHMucXVlcnlTZWxlY3RvcignLicgKyB0b29sICsgJy1jb250YWluZXInKTtcblxuICAgICAgaWYgKHRvb2xDb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRvb2wgIT09IGN1cnJlbnRUb29sKSB7XG4gICAgICAgICAgdG9vbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRvb2wgKyAnLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2xDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSh0b29sICsgJy1hY3RpdmUnKTtcbiAgICAgICAgICBhY3RpdmVUb29sID0gdG9vbENvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhY3RpdmVUb29sO1xuICB9O1xuXG4gIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLWNyZWF0ZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGZvbGRlckNyZWF0ZUZvcm0gPSBzd2l0Y2hUb29sKGUudGFyZ2V0LCAnbmV3LWRpcmVjdG9yeScpO1xuICAgIGZvbGRlckNyZWF0ZUZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLmZvY3VzKCk7XG4gIH0pO1xuXG4gIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLXJlbmFtZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgY29uc3QgZm9sZGVyUmVuYW1lRm9ybSA9IHN3aXRjaFRvb2woZS50YXJnZXQsICdyZW5hbWUtZGlyZWN0b3J5Jyk7XG4gICAgZm9sZGVyUmVuYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykuZm9jdXMoKTtcbiAgfSk7XG5cbiAgalF1ZXJ5KCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBvbmVudD1mb2xkZXItZGVsZXRlXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoY29uZmlybShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb25maXJtKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RlbGV0ZS1kaXJlY3RvcnktZm9ybScpLnN1Ym1pdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgalF1ZXJ5KCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBvbmVudD1tZWRpYS1hZGRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IGRyb3B6b25lID0gc3dpdGNoVG9vbChlLnRhcmdldCwgJ2Ryb3B6b25lJyk7XG5cbiAgICBpZiAoIWRyb3B6b25lLmNsYXNzTGlzdC5jb250YWlucygnZHJvcHpvbmUtaW5pdGlhbGl6ZWQnKSkge1xuICAgICAgZHJvcHpvbmVJbnN0YW5jZSA9IGFkZERyb3B6b25lKGRyb3B6b25lLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbXBvbmVudD1kcm9wem9uZV0nKSk7XG4gICAgICBkcm9wem9uZS5jbGFzc0xpc3QuYWRkKCdkcm9wem9uZS1pbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIGlmICghZHJvcHpvbmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wem9uZS1hY3RpdmUnKSkge1xuICAgICAgZHJvcHpvbmVJbnN0YW5jZS5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9bWVkaWEtcmVuYW1lXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBoZWFkZXJUb29scyA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5jb250ZW50LWhlYWRlcicpO1xuICAgIGNvbnN0IGZpbGVSZW5hbWVGb3JtID0gaGVhZGVyVG9vbHMucXVlcnlTZWxlY3RvcignLnJlbmFtZS1maWxlLWNvbnRhaW5lcicpO1xuXG4gICAgZmlsZVJlbmFtZUZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgncmVuYW1lLWFjdGl2ZScpO1xuICAgIGZpbGVSZW5hbWVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKS5mb2N1cygpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImNvbmZpZ3VyZUNsaXBib2FyZCIsImNvcHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYnV0dG9uIiwiY3VycmVudFRhcmdldCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhc2V0IiwiY2xpcGJvYXJkVGFyZ2V0IiwiaW5uZXJUZXh0IiwidGhlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJEcm9wem9uZSIsImFkZERyb3B6b25lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiZHJvcHpvbmUiLCJjb25maWciLCJkcm9wem9uZUNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImRlZmF1bHRDb25maWciLCJhZGRSZW1vdmVMaW5rcyIsIm1heEZpbGVzaXplIiwicGFyYW1OYW1lIiwicHJldmlld1RlbXBsYXRlIiwiaW5uZXJIVE1MIiwidGh1bWJuYWlsV2lkdGgiLCJ0aHVtYm5haWxIZWlnaHQiLCJzZW5kaW5nIiwiZmlsZSIsInhociIsInByZXZpZXdFbGVtZW50Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIl9yZXNwb25zZSRmaWxlcyQiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsImZpbGVzIiwibGluayIsImZpbGVJbmZvIiwibGlua0VsZW1lbnQiLCJocmVmIiwic2V0QXR0cmlidXRlIiwibWVkaWFGb2xkZXIiLCJtZWRpYVVybCIsIm1lZGlhVGVtcGxhdGUiLCJtZWRpYVByZXZpZXciLCJfb2JqZWN0U3ByZWFkIiwiX3dpbmRvdyIsIndpbmRvdyIsImpRdWVyeSIsIkFkbWluIiwiRm9sZGVyU2VsZWN0b3IiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsInVybCIsImN1cnJlbnRGb2xkZXIiLCJmZXRjaCIsInRleHQiLCJodG1sIiwibW9kYWxDb250ZW50Iiwic2hhcmVkX3NldHVwIiwibW9kYWwiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFnTmFtZSIsImF0dHJpYnV0ZXMiLCJ2YWx1ZSIsInN0b3BQcm9wYWdhdGlvbiIsImZvbGRlclBhdGgiLCJmZXRjaEZvbGRlciIsImNvbmZpZ3VyZU1vZGFsIiwic2V0RmllbGRWYWx1ZSIsImNvbmZpcm0iLCJjb25maXJtYXRpb24iLCJmb3JtIiwic3VibWl0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFjdGlvbiIsIm1ldGhvZCIsImJvZHkiLCJoZWFkZXJzIiwiaW5wdXRFbGVtZW50IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJjaG9vc2UiLCJfdGhpczIiLCJoYW5kbGVNb2RhbENsaWNrIiwiaGFuZGxlTW9kYWxTdWJtaXQiLCJhcHBlbmRDaGlsZCIsImUiLCJmb2xkZXIiLCJzZXR1cF9saXN0X21vZGFsIiwiY29uZmlndXJlRm9sZGVyU2VsZWN0b3IiLCJvbiIsIk1lZGlhU2VsZWN0b3IiLCJtZWRpYUNob2ljZUNvbnRhaW5lciIsIm1lZGlhQ29udGFpbmVyIiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsImlkIiwibWVkaWFJZCIsImNvbmNhdCIsImRlbGV0ZSIsInRlbXBsYXRlIiwiY29udGVudCIsImNsb25lTm9kZSIsImNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IiLCJtZWRpYVNlbGVjdG9ycyIsImdldE1lZGlhU2VsZWN0b3IiLCJub2RlIiwiY29udGFpbmVyIiwiZHJvcHpvbmVJbnN0YW5jZSIsInN3aXRjaFRvb2wiLCJjdXJyZW50VG9vbCIsImhlYWRlclRvb2xzIiwiYWN0aXZlVG9vbCIsIl9pIiwiX2FyciIsInRvb2wiLCJ0b29sQ29udGFpbmVyIiwidG9nZ2xlIiwiZm9sZGVyQ3JlYXRlRm9ybSIsImZvY3VzIiwiZm9sZGVyUmVuYW1lRm9ybSIsImNvbnRhaW5zIiwicmVtb3ZlQWxsRmlsZXMiLCJmaWxlUmVuYW1lRm9ybSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9