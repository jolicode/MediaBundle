/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@deltablot/dropzone/dist/dropzone.mjs":
/*!************************************************************!*\
  !*** ./node_modules/@deltablot/dropzone/dist/dropzone.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dropzone: () => (/* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039),
/* harmony export */   "default": () => (/* binding */ $3ed269f2f0fb224b$export$2e2bcd8739ae039)
/* harmony export */ });

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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



var $c68c43e1c1295d33$exports = {};
$c68c43e1c1295d33$exports = "<html><head></head><body><div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail=\"\"></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size=\"\"></span></div>\n    <div class=\"dz-filename\"><span data-dz-name=\"\"></span></div>\n  </div>\n  <div class=\"dz-progress\">\n    <span class=\"dz-upload\" data-dz-uploadprogress=\"\"></span>\n  </div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage=\"\"></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z\"></path>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z\"></path>\n    </svg>\n  </div>\n</div>\n</body></html>";


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
   */ previewTemplate: (0, (/*@__PURE__*/$parcel$interopDefault($c68c43e1c1295d33$exports))),
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
            if (file.type === "image/svg+xml") {
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


/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/js/components/clipboard.js":
/*!****************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/clipboard.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/js/components/configureTrixToolbar.js":
/*!***************************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/configureTrixToolbar.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/js/components/dropzone.js":
/*!***************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/dropzone.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/js/components/folderSelector.js":
/*!*********************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/folderSelector.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/js/components/mediaSelector.js":
/*!********************************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/js/components/mediaSelector.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/EasyAdmin/assets/styles/jolimedia.css":
/*!**********************************************************!*\
  !*** ./src/Bridge/EasyAdmin/assets/styles/jolimedia.css ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

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
/* harmony import */ var _styles_jolimedia_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/jolimedia.css */ "./src/Bridge/EasyAdmin/assets/styles/jolimedia.css");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9saS1tZWRpYS1lYXN5LWFkbWluLmEwMWVhNjBmLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxQ0FBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxVQUFVLFNBQVMsYUFBYTtBQUN4QywwQ0FBMEMsVUFBVSxzQkFBc0IsYUFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxZQUFZO0FBQ3BCLGtEQUFrRCxhQUFhO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1DQUFtQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQ0FBaUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQsa0JBQWtCO0FBQ2xCLGNBQWM7QUFDZDtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLDZCQUE2QjtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQ0FBaUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLDJGQUEyRixZQUFZO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwyQkFBMkI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsS0FBSztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsMkVBQTJFLEtBQUs7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEdBQTBHO0FBQzFHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUksQ0FBQy9ELFFBQVEsQ0FBQ3BFLFNBQVMsQ0FBQ3VILFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3hEQyxnQkFBZ0IsR0FBR3RELGdFQUFXLENBQUNFLFFBQVEsQ0FBQ3pFLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25GeUUsUUFBUSxDQUFDcEUsU0FBUyxDQUFDQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7TUFDaEQ7TUFFQSxJQUFJLENBQUNtRSxRQUFRLENBQUNwRSxTQUFTLENBQUN1SCxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUNuREMsZ0JBQWdCLENBQUNpQixjQUFjLENBQUMsSUFBSSxDQUFDO01BQ3ZDO0lBQ0Y7SUFFQSxJQUFJTixTQUFTLENBQUNFLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxFQUFFO01BQ3REakosS0FBSyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUN0QkQsS0FBSyxDQUFDc0MsZUFBZSxDQUFDLENBQUM7TUFFdkIsSUFBTWlHLFdBQVcsR0FBR1EsU0FBUyxDQUFDM0gsT0FBTyxDQUFDLDBCQUEwQixDQUFDO01BQ2pFLElBQU1rSSxjQUFjLEdBQUdmLFdBQVcsQ0FBQ2hJLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztNQUUxRStJLGNBQWMsQ0FBQzFJLFNBQVMsQ0FBQ2lJLE1BQU0sQ0FBQyxlQUFlLENBQUM7TUFDaERTLGNBQWMsQ0FBQy9JLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDNEksS0FBSyxDQUFDLENBQUM7SUFDMUQ7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVsdGFibG90L2Ryb3B6b25lL2Rpc3QvZHJvcHpvbmUubWpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL0Vhc3lBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9jb25maWd1cmVUcml4VG9vbGJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL0Vhc3lBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9kcm9wem9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL0Vhc3lBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9mb2xkZXJTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL0Vhc3lBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9tZWRpYVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9zdHlsZXMvam9saW1lZGlhLmNzcz8yMTRiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvRWFzeUFkbWluL2Fzc2V0cy9qcy9qb2xpLW1lZGlhLWVhc3ktYWRtaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiAkcGFyY2VsJGludGVyb3BEZWZhdWx0KGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYS5kZWZhdWx0IDogYTtcbn1cbi8vIFRoZSBFbWl0dGVyIGNsYXNzIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIGNhbGwgYC5vbigpYCBvbiBEcm9wem9uZSB0byBsaXN0ZW5cbi8vIHRvIGV2ZW50cy5cbi8vIEl0IGlzIHN0cm9uZ2x5IGJhc2VkIG9uIGNvbXBvbmVudCdzIGVtaXR0ZXIgY2xhc3MsIGFuZCBJIHJlbW92ZWQgdGhlXG4vLyBmdW5jdGlvbmFsaXR5IGJlY2F1c2Ugb2YgdGhlIGRlcGVuZGVuY3kgaGVsbCB3aXRoIGRpZmZlcmVudCBmcmFtZXdvcmtzLlxuY2xhc3MgJDQwNDBhY2ZkODU4NDMzOGQkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSB7XG4gICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBnaXZlbiBldmVudFxuICAgIG9uKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgIC8vIENyZWF0ZSBuYW1lc3BhY2UgZm9yIHRoaXMgZXZlbnRcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnRdKSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gW107XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tldmVudF0ucHVzaChmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbWl0KGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIGZvciAobGV0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcyljYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgLy8gdHJpZ2dlciBhIGNvcnJlc3BvbmRpbmcgRE9NIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KHRoaXMubWFrZUV2ZW50KFwiZHJvcHpvbmU6XCIgKyBldmVudCwge1xuICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBtYWtlRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHBhcmFtcyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSUUgMTEgc3VwcG9ydFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50L0N1c3RvbUV2ZW50XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50LiBJZiBmbiBpcyBub3QgcHJvdmlkZWQsIGFsbCBldmVudFxuICAgIC8vIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCB3aWxsIGJlIHJlbW92ZWQuIElmIG5laXRoZXIgaXMgcHJvdmlkZWQsIGFsbFxuICAgIC8vIGV2ZW50IGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb2ZmKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT09IGZuKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxuXG52YXIgJGM2OGM0M2UxYzEyOTVkMzMkZXhwb3J0cyA9IHt9O1xuJGM2OGM0M2UxYzEyOTVkMzMkZXhwb3J0cyA9IFwiPGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PjxkaXYgY2xhc3M9XFxcImR6LXByZXZpZXcgZHotZmlsZS1wcmV2aWV3XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcImR6LWltYWdlXFxcIj48aW1nIGRhdGEtZHotdGh1bWJuYWlsPVxcXCJcXFwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotZGV0YWlsc1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImR6LXNpemVcXFwiPjxzcGFuIGRhdGEtZHotc2l6ZT1cXFwiXFxcIj48L3NwYW4+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImR6LWZpbGVuYW1lXFxcIj48c3BhbiBkYXRhLWR6LW5hbWU9XFxcIlxcXCI+PC9zcGFuPjwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJkei1wcm9ncmVzc1xcXCI+XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJkei11cGxvYWRcXFwiIGRhdGEtZHotdXBsb2FkcHJvZ3Jlc3M9XFxcIlxcXCI+PC9zcGFuPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJkei1lcnJvci1tZXNzYWdlXFxcIj48c3BhbiBkYXRhLWR6LWVycm9ybWVzc2FnZT1cXFwiXFxcIj48L3NwYW4+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJkei1zdWNjZXNzLW1hcmtcXFwiPlxcbiAgICA8c3ZnIHdpZHRoPVxcXCI1NFxcXCIgaGVpZ2h0PVxcXCI1NFxcXCIgdmlld0JveD1cXFwiMCAwIDU0IDU0XFxcIiBmaWxsPVxcXCJ3aGl0ZVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj5cXG4gICAgICA8cGF0aCBkPVxcXCJNMTAuMjA3MSAyOS43OTI5TDE0LjI5MjkgMjUuNzA3MUMxNC42ODM0IDI1LjMxNjYgMTUuMzE2NiAyNS4zMTY2IDE1LjcwNzEgMjUuNzA3MUwyMS4yOTI5IDMxLjI5MjlDMjEuNjgzNCAzMS42ODM0IDIyLjMxNjYgMzEuNjgzNCAyMi43MDcxIDMxLjI5MjlMMzguMjkyOSAxNS43MDcxQzM4LjY4MzQgMTUuMzE2NiAzOS4zMTY2IDE1LjMxNjYgMzkuNzA3MSAxNS43MDcxTDQzLjc5MjkgMTkuNzkyOUM0NC4xODM0IDIwLjE4MzQgNDQuMTgzNCAyMC44MTY2IDQzLjc5MjkgMjEuMjA3MUwyMi43MDcxIDQyLjI5MjlDMjIuMzE2NiA0Mi42ODM0IDIxLjY4MzQgNDIuNjgzNCAyMS4yOTI5IDQyLjI5MjlMMTAuMjA3MSAzMS4yMDcxQzkuODE2NTggMzAuODE2NiA5LjgxNjU4IDMwLjE4MzQgMTAuMjA3MSAyOS43OTI5WlxcXCI+PC9wYXRoPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotZXJyb3ItbWFya1xcXCI+XFxuICAgIDxzdmcgd2lkdGg9XFxcIjU0XFxcIiBoZWlnaHQ9XFxcIjU0XFxcIiB2aWV3Qm94PVxcXCIwIDAgNTQgNTRcXFwiIGZpbGw9XFxcIndoaXRlXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlxcbiAgICAgIDxwYXRoIGQ9XFxcIk0yNi4yOTI5IDIwLjI5MjlMMTkuMjA3MSAxMy4yMDcxQzE4LjgxNjYgMTIuODE2NiAxOC4xODM0IDEyLjgxNjYgMTcuNzkyOSAxMy4yMDcxTDEzLjIwNzEgMTcuNzkyOUMxMi44MTY2IDE4LjE4MzQgMTIuODE2NiAxOC44MTY2IDEzLjIwNzEgMTkuMjA3MUwyMC4yOTI5IDI2LjI5MjlDMjAuNjgzNCAyNi42ODM0IDIwLjY4MzQgMjcuMzE2NiAyMC4yOTI5IDI3LjcwNzFMMTMuMjA3MSAzNC43OTI5QzEyLjgxNjYgMzUuMTgzNCAxMi44MTY2IDM1LjgxNjYgMTMuMjA3MSAzNi4yMDcxTDE3Ljc5MjkgNDAuNzkyOUMxOC4xODM0IDQxLjE4MzQgMTguODE2NiA0MS4xODM0IDE5LjIwNzEgNDAuNzkyOUwyNi4yOTI5IDMzLjcwNzFDMjYuNjgzNCAzMy4zMTY2IDI3LjMxNjYgMzMuMzE2NiAyNy43MDcxIDMzLjcwNzFMMzQuNzkyOSA0MC43OTI5QzM1LjE4MzQgNDEuMTgzNCAzNS44MTY2IDQxLjE4MzQgMzYuMjA3MSA0MC43OTI5TDQwLjc5MjkgMzYuMjA3MUM0MS4xODM0IDM1LjgxNjYgNDEuMTgzNCAzNS4xODM0IDQwLjc5MjkgMzQuNzkyOUwzMy43MDcxIDI3LjcwNzFDMzMuMzE2NiAyNy4zMTY2IDMzLjMxNjYgMjYuNjgzNCAzMy43MDcxIDI2LjI5MjlMNDAuNzkyOSAxOS4yMDcxQzQxLjE4MzQgMTguODE2NiA0MS4xODM0IDE4LjE4MzQgNDAuNzkyOSAxNy43OTI5TDM2LjIwNzEgMTMuMjA3MUMzNS44MTY2IDEyLjgxNjYgMzUuMTgzNCAxMi44MTY2IDM0Ljc5MjkgMTMuMjA3MUwyNy43MDcxIDIwLjI5MjlDMjcuMzE2NiAyMC42ODM0IDI2LjY4MzQgMjAuNjgzNCAyNi4yOTI5IDIwLjI5MjlaXFxcIj48L3BhdGg+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuPC9ib2R5PjwvaHRtbD5cIjtcblxuXG5sZXQgJDRjYTM2NzE4Mjc3NmY4MGIkdmFyJGRlZmF1bHRPcHRpb25zID0ge1xuICAgIC8qKlxuICAgKiBIYXMgdG8gYmUgc3BlY2lmaWVkIG9uIGVsZW1lbnRzIG90aGVyIHRoYW4gZm9ybSAob3Igd2hlbiB0aGUgZm9ybSBkb2Vzbid0XG4gICAqIGhhdmUgYW4gYGFjdGlvbmAgYXR0cmlidXRlKS5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmRcbiAgICogYGRhdGFCbG9ja3NgICBhbmQgbXVzdCByZXR1cm4gdGhlIHVybCBhcyBzdHJpbmcuXG4gICAqLyB1cmw6IG51bGwsXG4gICAgLyoqXG4gICAqIENhbiBiZSBjaGFuZ2VkIHRvIGBcInB1dFwiYCBpZiBuZWNlc3NhcnkuIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgZnVuY3Rpb25cbiAgICogdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kIG11c3QgcmV0dXJuIHRoZSBtZXRob2QgKHNpbmNlIGB2My4xMi4wYCkuXG4gICAqLyBtZXRob2Q6IFwicG9zdFwiLFxuICAgIC8qKlxuICAgKiBXaWxsIGJlIHNldCBvbiB0aGUgWEhSZXF1ZXN0LlxuICAgKi8gd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAvKipcbiAgICogVGhlIHRpbWVvdXQgZm9yIHRoZSBYSFIgcmVxdWVzdHMgaW4gbWlsbGlzZWNvbmRzIChzaW5jZSBgdjQuNC4wYCkuXG4gICAqIElmIHNldCB0byBudWxsIG9yIDAsIG5vIHRpbWVvdXQgaXMgZ29pbmcgdG8gYmUgc2V0LlxuICAgKi8gdGltZW91dDogbnVsbCxcbiAgICAvKipcbiAgICogSG93IG1hbnkgZmlsZSB1cGxvYWRzIHRvIHByb2Nlc3MgaW4gcGFyYWxsZWwgKFNlZSB0aGVcbiAgICogRW5xdWV1aW5nIGZpbGUgdXBsb2FkcyBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mbylcbiAgICovIHBhcmFsbGVsVXBsb2FkczogMixcbiAgICAvKipcbiAgICogV2hldGhlciB0byBzZW5kIG11bHRpcGxlIGZpbGVzIGluIG9uZSByZXF1ZXN0LiBJZlxuICAgKiB0aGlzIGl0IHNldCB0byB0cnVlLCB0aGVuIHRoZSBmYWxsYmFjayBmaWxlIGlucHV0IGVsZW1lbnQgd2lsbFxuICAgKiBoYXZlIHRoZSBgbXVsdGlwbGVgIGF0dHJpYnV0ZSBhcyB3ZWxsLiBUaGlzIG9wdGlvbiB3aWxsXG4gICAqIGFsc28gdHJpZ2dlciBhZGRpdGlvbmFsIGV2ZW50cyAobGlrZSBgcHJvY2Vzc2luZ211bHRpcGxlYCkuIFNlZSB0aGUgZXZlbnRzXG4gICAqIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcbiAgICAvKipcbiAgICogV2hldGhlciB5b3Ugd2FudCBmaWxlcyB0byBiZSB1cGxvYWRlZCBpbiBjaHVua3MgdG8geW91ciBzZXJ2ZXIuIFRoaXMgY2FuJ3QgYmVcbiAgICogdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGB1cGxvYWRNdWx0aXBsZWAuXG4gICAqXG4gICAqIFNlZSBbY2h1bmtzVXBsb2FkZWRdKCNjb25maWctY2h1bmtzVXBsb2FkZWQpIGZvciB0aGUgY2FsbGJhY2sgdG8gZmluYWxpc2UgYW4gdXBsb2FkLlxuICAgKi8gY2h1bmtpbmc6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBJZiBgY2h1bmtpbmdgIGlzIGVuYWJsZWQsIHRoaXMgZGVmaW5lcyB3aGV0aGVyICoqZXZlcnkqKiBmaWxlIHNob3VsZCBiZSBjaHVua2VkLFxuICAgKiBldmVuIGlmIHRoZSBmaWxlIHNpemUgaXMgYmVsb3cgY2h1bmtTaXplLiBUaGlzIG1lYW5zLCB0aGF0IHRoZSBhZGRpdGlvbmFsIGNodW5rXG4gICAqIGZvcm0gZGF0YSB3aWxsIGJlIHN1Ym1pdHRlZCBhbmQgdGhlIGBjaHVua3NVcGxvYWRlZGAgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkLlxuICAgKi8gZm9yY2VDaHVua2luZzogZmFsc2UsXG4gICAgLyoqXG4gICAqIElmIGBjaHVua2luZ2AgaXMgYHRydWVgLCB0aGVuIHRoaXMgZGVmaW5lcyB0aGUgY2h1bmsgc2l6ZSBpbiBieXRlcy5cbiAgICovIGNodW5rU2l6ZTogMjA5NzE1MixcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgaW5kaXZpZHVhbCBjaHVua3Mgb2YgYSBmaWxlIGFyZSBiZWluZyB1cGxvYWRlZCBzaW11bHRhbmVvdXNseS5cbiAgICogVGhlIGxpbWl0IG9mIGNvbmN1cnJlbnQgY29ubmVjdGlvbnMgaXMgZ292ZXJuZWQgYnkgYHBhcmFsbGVsVXBsb2Fkc2AuXG4gICAqLyBwYXJhbGxlbENodW5rVXBsb2FkczogZmFsc2UsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgYSBjaHVuayBzaG91bGQgYmUgcmV0cmllZCBpZiBpdCBmYWlscy5cbiAgICovIHJldHJ5Q2h1bmtzOiBmYWxzZSxcbiAgICAvKipcbiAgICogSWYgYHJldHJ5Q2h1bmtzYCBpcyB0cnVlLCBob3cgbWFueSB0aW1lcyBzaG91bGQgaXQgYmUgcmV0cmllZC5cbiAgICovIHJldHJ5Q2h1bmtzTGltaXQ6IDMsXG4gICAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGZpbGVzaXplIChpbiBNaUIpIHRoYXQgaXMgYWxsb3dlZCB0byBiZSB1cGxvYWRlZC5cbiAgICovIG1heEZpbGVzaXplOiAyNTYsXG4gICAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBmaWxlIHBhcmFtIHRoYXQgZ2V0cyB0cmFuc2ZlcnJlZC5cbiAgICogKipOT1RFKio6IElmIHlvdSBoYXZlIHRoZSBvcHRpb24gIGB1cGxvYWRNdWx0aXBsZWAgc2V0IHRvIGB0cnVlYCwgdGhlblxuICAgKiBEcm9wem9uZSB3aWxsIGFwcGVuZCBgW11gIHRvIHRoZSBuYW1lLlxuICAgKi8gcGFyYW1OYW1lOiBcImZpbGVcIixcbiAgICAvKipcbiAgICogV2hldGhlciB0aHVtYm5haWxzIGZvciBpbWFnZXMgc2hvdWxkIGJlIGdlbmVyYXRlZFxuICAgKi8gY3JlYXRlSW1hZ2VUaHVtYm5haWxzOiB0cnVlLFxuICAgIC8qKlxuICAgKiBJbiBNQi4gV2hlbiB0aGUgZmlsZW5hbWUgZXhjZWVkcyB0aGlzIGxpbWl0LCB0aGUgdGh1bWJuYWlsIHdpbGwgbm90IGJlIGdlbmVyYXRlZC5cbiAgICovIG1heFRodW1ibmFpbEZpbGVzaXplOiAxMCxcbiAgICAvKipcbiAgICogSWYgYG51bGxgLCB0aGUgcmF0aW8gb2YgdGhlIGltYWdlIHdpbGwgYmUgdXNlZCB0byBjYWxjdWxhdGUgaXQuXG4gICAqLyB0aHVtYm5haWxXaWR0aDogMTIwLFxuICAgIC8qKlxuICAgKiBUaGUgc2FtZSBhcyBgdGh1bWJuYWlsV2lkdGhgLiBJZiBib3RoIGFyZSBudWxsLCBpbWFnZXMgd2lsbCBub3QgYmUgcmVzaXplZC5cbiAgICovIHRodW1ibmFpbEhlaWdodDogMTIwLFxuICAgIC8qKlxuICAgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgdGh1bWJuYWlsV2lkdGhgIGFuZCBgdGh1bWJuYWlsSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXG4gICAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cbiAgICovIHRodW1ibmFpbE1ldGhvZDogXCJjcm9wXCIsXG4gICAgLyoqXG4gICAqIElmIHNldCwgaW1hZ2VzIHdpbGwgYmUgcmVzaXplZCB0byB0aGVzZSBkaW1lbnNpb25zIGJlZm9yZSBiZWluZyAqKnVwbG9hZGVkKiouXG4gICAqIElmIG9ubHkgb25lLCBgcmVzaXplV2lkdGhgICoqb3IqKiBgcmVzaXplSGVpZ2h0YCBpcyBwcm92aWRlZCwgdGhlIG9yaWdpbmFsIGFzcGVjdFxuICAgKiByYXRpbyBvZiB0aGUgZmlsZSB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICpcbiAgICogVGhlIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uIHVzZXMgdGhlc2Ugb3B0aW9ucywgc28gaWYgdGhlIGB0cmFuc2Zvcm1GaWxlYCBmdW5jdGlvblxuICAgKiBpcyBvdmVycmlkZGVuLCB0aGVzZSBvcHRpb25zIGRvbid0IGRvIGFueXRoaW5nLlxuICAgKi8gcmVzaXplV2lkdGg6IG51bGwsXG4gICAgLyoqXG4gICAqIFNlZSBgcmVzaXplV2lkdGhgLlxuICAgKi8gcmVzaXplSGVpZ2h0OiBudWxsLFxuICAgIC8qKlxuICAgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSByZXNpemVkIGltYWdlIChiZWZvcmUgaXQgZ2V0cyB1cGxvYWRlZCB0byB0aGUgc2VydmVyKS5cbiAgICogSWYgYG51bGxgIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgd2lsbCBiZSB1c2VkLiBUbyBmb3JjZSBqcGVnLCBmb3IgZXhhbXBsZSwgdXNlIGBpbWFnZS9qcGVnYC5cbiAgICogU2VlIGByZXNpemVXaWR0aGAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqLyByZXNpemVNaW1lVHlwZTogbnVsbCxcbiAgICAvKipcbiAgICogVGhlIHF1YWxpdHkgb2YgdGhlIHJlc2l6ZWQgaW1hZ2VzLiBTZWUgYHJlc2l6ZVdpZHRoYC5cbiAgICovIHJlc2l6ZVF1YWxpdHk6IDAuOCxcbiAgICAvKipcbiAgICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgYXJlIHByb3ZpZGVkLlxuICAgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXG4gICAqLyByZXNpemVNZXRob2Q6IFwiY29udGFpblwiLFxuICAgIC8qKlxuICAgKiBUaGUgYmFzZSB0aGF0IGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSAqKmRpc3BsYXllZCoqIGZpbGVzaXplLiBZb3UgY2FuXG4gICAqIGNoYW5nZSB0aGlzIHRvIDEwMjQgaWYgeW91IHdvdWxkIHJhdGhlciBkaXNwbGF5IGtpYmlieXRlcywgbWViaWJ5dGVzLFxuICAgKiBldGMuLi4gMTAyNCBpcyB0ZWNobmljYWxseSBpbmNvcnJlY3QsIGJlY2F1c2UgYDEwMjQgYnl0ZXNgIGFyZSBgMSBraWJpYnl0ZWBcbiAgICogbm90IGAxIGtpbG9ieXRlYC4gWW91IGNhbiBjaGFuZ2UgdGhpcyB0byBgMTAyNGAgaWYgeW91IGRvbid0IGNhcmUgYWJvdXRcbiAgICogdmFsaWRpdHkuXG4gICAqLyBmaWxlc2l6ZUJhc2U6IDEwMDAsXG4gICAgLyoqXG4gICAqIElmIG5vdCBgbnVsbGAgZGVmaW5lcyBob3cgbWFueSBmaWxlcyB0aGlzIERyb3B6b25lIGhhbmRsZXMuIElmIGl0IGV4Y2VlZHMsXG4gICAqIHRoZSBldmVudCBgbWF4ZmlsZXNleGNlZWRlZGAgd2lsbCBiZSBjYWxsZWQuIFRoZSBkcm9wem9uZSBlbGVtZW50IGdldHMgdGhlXG4gICAqIGNsYXNzIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgYWNjb3JkaW5nbHkgc28geW91IGNhbiBwcm92aWRlIHZpc3VhbFxuICAgKiBmZWVkYmFjay5cbiAgICovIG1heEZpbGVzOiBudWxsLFxuICAgIC8qKlxuICAgKiBBbiBvcHRpb25hbCBvYmplY3QgdG8gc2VuZCBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gdGhlIHNlcnZlci4gRWc6XG4gICAqIGB7IFwiTXktQXdlc29tZS1IZWFkZXJcIjogXCJoZWFkZXIgdmFsdWVcIiB9YFxuICAgKi8gaGVhZGVyczogbnVsbCxcbiAgICAvKipcbiAgICogU2hvdWxkIHRoZSBkZWZhdWx0IGhlYWRlcnMgYmUgc2V0IG9yIG5vdD9cbiAgICogQWNjZXB0OiBhcHBsaWNhdGlvbi9qc29uIDwtIGZvciByZXF1ZXN0aW5nIGpzb24gcmVzcG9uc2VcbiAgICogQ2FjaGUtQ29udHJvbDogbm8tY2FjaGUgPC0gUmVxdWVzdCBzaG91bGRuJ3QgYmUgY2FjaGVkXG4gICAqIFgtUmVxdWVzdGVkLVdpdGg6IFhNTEh0dHBSZXF1ZXN0IDwtIFdlIHNlbnQgdGhlIHJlcXVlc3QgdmlhIFhNTEh0dHBSZXF1ZXN0XG4gICAqLyBkZWZhdWx0SGVhZGVyczogdHJ1ZSxcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgZHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgd2lsbCBiZSBjbGlja2FibGUsIGlmIGBmYWxzZWBcbiAgICogbm90aGluZyB3aWxsIGJlIGNsaWNrYWJsZS5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHBhc3MgYW4gSFRNTCBlbGVtZW50LCBhIENTUyBzZWxlY3RvciAoZm9yIG11bHRpcGxlIGVsZW1lbnRzKVxuICAgKiBvciBhbiBhcnJheSBvZiB0aG9zZS4gSW4gdGhhdCBjYXNlLCBhbGwgb2YgdGhvc2UgZWxlbWVudHMgd2lsbCB0cmlnZ2VyIGFuXG4gICAqIHVwbG9hZCB3aGVuIGNsaWNrZWQuXG4gICAqLyBjbGlja2FibGU6IHRydWUsXG4gICAgLyoqXG4gICAqIFdoZXRoZXIgaGlkZGVuIGZpbGVzIGluIGRpcmVjdG9yaWVzIHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi8gaWdub3JlSGlkZGVuRmlsZXM6IHRydWUsXG4gICAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBhY2NlcHRgIGNoZWNrcyB0aGUgZmlsZSdzIG1pbWUgdHlwZSBvclxuICAgKiBleHRlbnNpb24gYWdhaW5zdCB0aGlzIGxpc3QuIFRoaXMgaXMgYSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBtaW1lXG4gICAqIHR5cGVzIG9yIGZpbGUgZXh0ZW5zaW9ucy5cbiAgICpcbiAgICogRWcuOiBgaW1hZ2UvKixhcHBsaWNhdGlvbi9wZGYsLnBzZGBcbiAgICpcbiAgICogSWYgdGhlIERyb3B6b25lIGlzIGBjbGlja2FibGVgIHRoaXMgb3B0aW9uIHdpbGwgYWxzbyBiZSB1c2VkIGFzXG4gICAqIFtgYWNjZXB0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHQpXG4gICAqIHBhcmFtZXRlciBvbiB0aGUgaGlkZGVuIGZpbGUgaW5wdXQgYXMgd2VsbC5cbiAgICovIGFjY2VwdGVkRmlsZXM6IG51bGwsXG4gICAgLyoqXG4gICAqIElmIGZhbHNlLCBmaWxlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWV1ZSBidXQgdGhlIHF1ZXVlIHdpbGwgbm90IGJlXG4gICAqIHByb2Nlc3NlZCBhdXRvbWF0aWNhbGx5LlxuICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgeW91IG5lZWQgc29tZSBhZGRpdGlvbmFsIHVzZXIgaW5wdXQgYmVmb3JlIHNlbmRpbmdcbiAgICogZmlsZXMgKG9yIGlmIHlvdSB3YW50IHdhbnQgYWxsIGZpbGVzIHNlbnQgYXQgb25jZSkuXG4gICAqIElmIHlvdSdyZSByZWFkeSB0byBzZW5kIHRoZSBmaWxlIHNpbXBseSBjYWxsIGBteURyb3B6b25lLnByb2Nlc3NRdWV1ZSgpYC5cbiAgICpcbiAgICogU2VlIHRoZSBbZW5xdWV1aW5nIGZpbGUgdXBsb2Fkc10oI2VucXVldWluZy1maWxlLXVwbG9hZHMpIGRvY3VtZW50YXRpb25cbiAgICogc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG4gICAgLyoqXG4gICAqIElmIGZhbHNlLCBmaWxlcyBhZGRlZCB0byB0aGUgZHJvcHpvbmUgd2lsbCBub3QgYmUgcXVldWVkIGJ5IGRlZmF1bHQuXG4gICAqIFlvdSdsbCBoYXZlIHRvIGNhbGwgYGVucXVldWVGaWxlKGZpbGUpYCBtYW51YWxseS5cbiAgICovIGF1dG9RdWV1ZTogdHJ1ZSxcbiAgICAvKipcbiAgICogSWYgYHRydWVgLCB0aGlzIHdpbGwgYWRkIGEgbGluayB0byBldmVyeSBmaWxlIHByZXZpZXcgdG8gcmVtb3ZlIG9yIGNhbmNlbCAoaWZcbiAgICogYWxyZWFkeSB1cGxvYWRpbmcpIHRoZSBmaWxlLiBUaGUgYGRpY3RDYW5jZWxVcGxvYWRgLCBgZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbmBcbiAgICogYW5kIGBkaWN0UmVtb3ZlRmlsZWAgb3B0aW9ucyBhcmUgdXNlZCBmb3IgdGhlIHdvcmRpbmcuXG4gICAqLyBhZGRSZW1vdmVMaW5rczogZmFsc2UsXG4gICAgLyoqXG4gICAqIERlZmluZXMgd2hlcmUgdG8gZGlzcGxheSB0aGUgZmlsZSBwcmV2aWV3cyDigJMgaWYgYG51bGxgIHRoZVxuICAgKiBEcm9wem9uZSBlbGVtZW50IGl0c2VsZiBpcyB1c2VkLiBDYW4gYmUgYSBwbGFpbiBgSFRNTEVsZW1lbnRgIG9yIGEgQ1NTXG4gICAqIHNlbGVjdG9yLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYGRyb3B6b25lLXByZXZpZXdzYCBjbGFzcyBzb1xuICAgKiB0aGUgcHJldmlld3MgYXJlIGRpc3BsYXllZCBwcm9wZXJseS5cbiAgICovIHByZXZpZXdzQ29udGFpbmVyOiBudWxsLFxuICAgIC8qKlxuICAgKiBTZXQgdGhpcyB0byBgdHJ1ZWAgaWYgeW91IGRvbid0IHdhbnQgcHJldmlld3MgdG8gYmUgc2hvd24uXG4gICAqLyBkaXNhYmxlUHJldmlld3M6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBlbGVtZW50IHRoZSBoaWRkZW4gaW5wdXQgZmllbGQgKHdoaWNoIGlzIHVzZWQgd2hlbiBjbGlja2luZyBvbiB0aGVcbiAgICogZHJvcHpvbmUgdG8gdHJpZ2dlciBmaWxlIHNlbGVjdGlvbikgd2lsbCBiZSBhcHBlbmRlZCB0by4gVGhpcyBtaWdodFxuICAgKiBiZSBpbXBvcnRhbnQgaW4gY2FzZSB5b3UgdXNlIGZyYW1ld29ya3MgdG8gc3dpdGNoIHRoZSBjb250ZW50IG9mIHlvdXIgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nLCBvciBhbiBlbGVtZW50IGRpcmVjdGx5LlxuICAgKi8gaGlkZGVuSW5wdXRDb250YWluZXI6IFwiYm9keVwiLFxuICAgIC8qKlxuICAgKiBJZiBudWxsLCBubyBjYXB0dXJlIHR5cGUgd2lsbCBiZSBzcGVjaWZpZWRcbiAgICogSWYgY2FtZXJhLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgY2FtZXJhXG4gICAqIElmIG1pY3JvcGhvbmUsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgbWljcm9waG9uZVxuICAgKiBJZiBjYW1jb3JkZXIsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgY2FtZXJhIGluIHZpZGVvIG1vZGVcbiAgICogT24gYXBwbGUgZGV2aWNlcyBtdWx0aXBsZSBtdXN0IGJlIHNldCB0byBmYWxzZS4gIEFjY2VwdGVkRmlsZXMgbWF5IG5lZWQgdG9cbiAgICogYmUgc2V0IHRvIGFuIGFwcHJvcHJpYXRlIG1pbWUgdHlwZSAoZS5nLiBcImltYWdlLypcIiwgXCJhdWRpby8qXCIsIG9yIFwidmlkZW8vKlwiKS5cbiAgICovIGNhcHR1cmU6IG51bGwsXG4gICAgLyoqXG4gICAqICoqRGVwcmVjYXRlZCoqLiBVc2UgYHJlbmFtZUZpbGVgIGluc3RlYWQuXG4gICAqLyByZW5hbWVGaWxlbmFtZTogbnVsbCxcbiAgICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWQgYmVmb3JlIHRoZSBmaWxlIGlzIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIgYW5kIHJlbmFtZXMgdGhlIGZpbGUuXG4gICAqIFRoaXMgZnVuY3Rpb24gZ2V0cyB0aGUgYEZpbGVgIGFzIGFyZ3VtZW50IGFuZCBjYW4gdXNlIHRoZSBgZmlsZS5uYW1lYC4gVGhlIGFjdHVhbCBuYW1lIG9mIHRoZVxuICAgKiBmaWxlIHRoYXQgZ2V0cyB1c2VkIGR1cmluZyB0aGUgdXBsb2FkIGNhbiBiZSBhY2Nlc3NlZCB0aHJvdWdoIGBmaWxlLnVwbG9hZC5maWxlbmFtZWAuXG4gICAqLyByZW5hbWVGaWxlOiBudWxsLFxuICAgIC8qKlxuICAgKiBJZiBgdHJ1ZWAgdGhlIGZhbGxiYWNrIHdpbGwgYmUgZm9yY2VkLiBUaGlzIGlzIHZlcnkgdXNlZnVsIHRvIHRlc3QgeW91ciBzZXJ2ZXJcbiAgICogaW1wbGVtZW50YXRpb25zIGZpcnN0IGFuZCBtYWtlIHN1cmUgdGhhdCBldmVyeXRoaW5nIHdvcmtzIGFzXG4gICAqIGV4cGVjdGVkIHdpdGhvdXQgZHJvcHpvbmUgaWYgeW91IGV4cGVyaWVuY2UgcHJvYmxlbXMsIGFuZCB0byB0ZXN0XG4gICAqIGhvdyB5b3VyIGZhbGxiYWNrcyB3aWxsIGxvb2suXG4gICAqLyBmb3JjZUZhbGxiYWNrOiBmYWxzZSxcbiAgICAvKipcbiAgICogVGhlIHRleHQgdXNlZCBiZWZvcmUgYW55IGZpbGVzIGFyZSBkcm9wcGVkLlxuICAgKi8gZGljdERlZmF1bHRNZXNzYWdlOiBcIkRyb3AgZmlsZXMgaGVyZSB0byB1cGxvYWRcIixcbiAgICAvKipcbiAgICogVGhlIHRleHQgdGhhdCByZXBsYWNlcyB0aGUgZGVmYXVsdCBtZXNzYWdlIHRleHQgaXQgdGhlIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICovIGRpY3RGYWxsYmFja01lc3NhZ2U6IFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZHJhZyduJ2Ryb3AgZmlsZSB1cGxvYWRzLlwiLFxuICAgIC8qKlxuICAgKiBUaGUgdGV4dCB0aGF0IHdpbGwgYmUgYWRkZWQgYmVmb3JlIHRoZSBmYWxsYmFjayBmb3JtLlxuICAgKiBJZiB5b3UgcHJvdmlkZSBhICBmYWxsYmFjayBlbGVtZW50IHlvdXJzZWxmLCBvciBpZiB0aGlzIG9wdGlvbiBpcyBgbnVsbGAgdGhpcyB3aWxsXG4gICAqIGJlIGlnbm9yZWQuXG4gICAqLyBkaWN0RmFsbGJhY2tUZXh0OiBcIlBsZWFzZSB1c2UgdGhlIGZhbGxiYWNrIGZvcm0gYmVsb3cgdG8gdXBsb2FkIHlvdXIgZmlsZXMgbGlrZSBpbiB0aGUgb2xkZW4gZGF5cy5cIixcbiAgICAvKipcbiAgICogSWYgdGhlIGZpbGVzaXplIGlzIHRvbyBiaWcuXG4gICAqIGB7e2ZpbGVzaXplfX1gIGFuZCBge3ttYXhGaWxlc2l6ZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHJlc3BlY3RpdmUgY29uZmlndXJhdGlvbiB2YWx1ZXMuXG4gICAqLyBkaWN0RmlsZVRvb0JpZzogXCJGaWxlIGlzIHRvbyBiaWcgKHt7ZmlsZXNpemV9fU1pQikuIE1heCBmaWxlc2l6ZToge3ttYXhGaWxlc2l6ZX19TWlCLlwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGUgZmlsZSBkb2Vzbid0IG1hdGNoIHRoZSBmaWxlIHR5cGUuXG4gICAqLyBkaWN0SW52YWxpZEZpbGVUeXBlOiBcIllvdSBjYW4ndCB1cGxvYWQgZmlsZXMgb2YgdGhpcyB0eXBlLlwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGUgc2VydmVyIHJlc3BvbnNlIHdhcyBpbnZhbGlkLlxuICAgKiBge3tzdGF0dXNDb2RlfX1gIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgc2VydmVycyBzdGF0dXMgY29kZS5cbiAgICovIGRpY3RSZXNwb25zZUVycm9yOiBcIlNlcnZlciByZXNwb25kZWQgd2l0aCB7e3N0YXR1c0NvZGV9fSBjb2RlLlwiLFxuICAgIC8qKlxuICAgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgZm9yIHRoZSBjYW5jZWwgdXBsb2FkIGxpbmsuXG4gICAqLyBkaWN0Q2FuY2VsVXBsb2FkOiBcIkNhbmNlbCB1cGxvYWRcIixcbiAgICAvKipcbiAgICogVGhlIHRleHQgdGhhdCBpcyBkaXNwbGF5ZWQgaWYgYW4gdXBsb2FkIHdhcyBtYW51YWxseSBjYW5jZWxlZFxuICAgKi8gZGljdFVwbG9hZENhbmNlbGVkOiBcIlVwbG9hZCBjYW5jZWxlZC5cIixcbiAgICAvKipcbiAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciBjb25maXJtYXRpb24gd2hlbiBjYW5jZWxsaW5nIHVwbG9hZC5cbiAgICovIGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb246IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCB0aGlzIHVwbG9hZD9cIixcbiAgICAvKipcbiAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIHRvIHJlbW92ZSBhIGZpbGUuXG4gICAqLyBkaWN0UmVtb3ZlRmlsZTogXCJSZW1vdmUgZmlsZVwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGlzIGlzIG5vdCBudWxsLCB0aGVuIHRoZSB1c2VyIHdpbGwgYmUgcHJvbXB0ZWQgYmVmb3JlIHJlbW92aW5nIGEgZmlsZS5cbiAgICovIGRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uOiBudWxsLFxuICAgIC8qKlxuICAgKiBEaXNwbGF5ZWQgaWYgYG1heEZpbGVzYCBpcyBzdCBhbmQgZXhjZWVkZWQuXG4gICAqIFRoZSBzdHJpbmcgYHt7bWF4RmlsZXN9fWAgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZS5cbiAgICovIGRpY3RNYXhGaWxlc0V4Y2VlZGVkOiBcIllvdSBjYW5ub3QgdXBsb2FkIGFueSBtb3JlIGZpbGVzLlwiLFxuICAgIC8qKlxuICAgKiBBbGxvd3MgeW91IHRvIHRyYW5zbGF0ZSB0aGUgZGlmZmVyZW50IHVuaXRzLiBTdGFydGluZyB3aXRoIGB0YmAgZm9yIHRlcmFieXRlcyBhbmQgZ29pbmcgZG93biB0b1xuICAgKiBgYmAgZm9yIGJ5dGVzLlxuICAgKi8gZGljdEZpbGVTaXplVW5pdHM6IHtcbiAgICAgICAgdGI6IFwiVEJcIixcbiAgICAgICAgZ2I6IFwiR0JcIixcbiAgICAgICAgbWI6IFwiTUJcIixcbiAgICAgICAga2I6IFwiS0JcIixcbiAgICAgICAgYjogXCJiXCJcbiAgICB9LFxuICAgIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBkcm9wem9uZSBpbml0aWFsaXplZFxuICAgKiBZb3UgY2FuIGFkZCBldmVudCBsaXN0ZW5lcnMgaGVyZVxuICAgKi8gaW5pdCAoKSB7fSxcbiAgICAvKipcbiAgICogQ2FuIGJlIGFuICoqb2JqZWN0Kiogb2YgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHRyYW5zZmVyIHRvIHRoZSBzZXJ2ZXIsICoqb3IqKiBhIGBGdW5jdGlvbmBcbiAgICogdGhhdCBnZXRzIGludm9rZWQgd2l0aCB0aGUgYGZpbGVzYCwgYHhocmAgYW5kLCBpZiBpdCdzIGEgY2h1bmtlZCB1cGxvYWQsIGBjaHVua2AgYXJndW1lbnRzLiBJbiBjYXNlXG4gICAqIG9mIGEgZnVuY3Rpb24sIHRoaXMgbmVlZHMgdG8gcmV0dXJuIGEgbWFwLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdGhpbmcgZm9yIG5vcm1hbCB1cGxvYWRzLCBidXQgYWRkcyByZWxldmFudCBpbmZvcm1hdGlvbiBmb3JcbiAgICogY2h1bmtlZCB1cGxvYWRzLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBzYW1lIGFzIGFkZGluZyBoaWRkZW4gaW5wdXQgZmllbGRzIGluIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAqLyBwYXJhbXMgKGZpbGVzLCB4aHIsIGNodW5rKSB7XG4gICAgICAgIGlmIChjaHVuaykgcmV0dXJuIHtcbiAgICAgICAgICAgIGR6dXVpZDogY2h1bmsuZmlsZS51cGxvYWQudXVpZCxcbiAgICAgICAgICAgIGR6Y2h1bmtpbmRleDogY2h1bmsuaW5kZXgsXG4gICAgICAgICAgICBkenRvdGFsZmlsZXNpemU6IGNodW5rLmZpbGUuc2l6ZSxcbiAgICAgICAgICAgIGR6Y2h1bmtzaXplOiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplLFxuICAgICAgICAgICAgZHp0b3RhbGNodW5rY291bnQ6IGNodW5rLmZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCxcbiAgICAgICAgICAgIGR6Y2h1bmtieXRlb2Zmc2V0OiBjaHVuay5pbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgZ2V0cyBhIFtmaWxlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS9GaWxlKVxuICAgKiBhbmQgYSBgZG9uZWAgZnVuY3Rpb24gYXMgcGFyYW1ldGVycy5cbiAgICpcbiAgICogSWYgdGhlIGRvbmUgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgdGhlIGZpbGUgaXMgXCJhY2NlcHRlZFwiIGFuZCB3aWxsXG4gICAqIGJlIHByb2Nlc3NlZC4gSWYgeW91IHBhc3MgYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWQsIGFuZCB0aGUgZXJyb3JcbiAgICogbWVzc2FnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG5vdCBiZSBjYWxsZWQgaWYgdGhlIGZpbGUgaXMgdG9vIGJpZyBvciBkb2Vzbid0IG1hdGNoIHRoZSBtaW1lIHR5cGVzLlxuICAgKi8gYWNjZXB0IChmaWxlLCBkb25lKSB7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICogVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gYWxsIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgZm9yIGEgZmlsZS5cbiAgICogSXQgZ2V0cyB0aGUgZmlsZSBmb3Igd2hpY2ggdGhlIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcbiAgICogYW5kIHRoZSBgZG9uZWAgZnVuY3Rpb24gYXMgc2Vjb25kLiBgZG9uZSgpYCBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gZXZlcnl0aGluZ1xuICAgKiBuZWVkZWQgdG8gZmluaXNoIHRoZSB1cGxvYWQgcHJvY2VzcyBpcyBkb25lLlxuICAgKi8gY2h1bmtzVXBsb2FkZWQ6IGZ1bmN0aW9uKGZpbGUsIGRvbmUpIHtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIFNlbmRzIHRoZSBmaWxlIGFzIGJpbmFyeSBibG9iIGluIGJvZHkgaW5zdGVhZCBvZiBmb3JtIGRhdGEuXG4gICAqIElmIHRoaXMgaXMgc2V0LCB0aGUgYHBhcmFtc2Agb3B0aW9uIHdpbGwgYmUgaWdub3JlZC5cbiAgICogSXQncyBhbiBlcnJvciB0byBzZXQgdGhpcyB0byBgdHJ1ZWAgYWxvbmcgd2l0aCBgdXBsb2FkTXVsdGlwbGVgIHNpbmNlXG4gICAqIG11bHRpcGxlIGZpbGVzIGNhbm5vdCBiZSBpbiBhIHNpbmdsZSBiaW5hcnkgYm9keS5cbiAgICovIGJpbmFyeUJvZHk6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBHZXRzIGNhbGxlZCB3aGVuIHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNob3dzIHRoZSBmYWxsYmFjayBpbnB1dCBmaWVsZCBhbmQgYWRkc1xuICAgKiBhIHRleHQuXG4gICAqLyBmYWxsYmFjayAoKSB7XG4gICAgICAgIC8vIFRoaXMgY29kZSBzaG91bGQgcGFzcyBpbiBJRTcuLi4gOihcbiAgICAgICAgbGV0IG1lc3NhZ2VFbGVtZW50O1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gYCR7dGhpcy5lbGVtZW50LmNsYXNzTmFtZX0gZHotYnJvd3Nlci1ub3Qtc3VwcG9ydGVkYDtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpKWlmICgvKF58IClkei1tZXNzYWdlKCR8ICkvLnRlc3QoY2hpbGQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICAgIGNoaWxkLmNsYXNzTmFtZSA9IFwiZHotbWVzc2FnZVwiOyAvLyBSZW1vdmVzIHRoZSAnZHotZGVmYXVsdCcgY2xhc3NcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50ID0gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJkei1tZXNzYWdlXCI+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3BhbiA9IG1lc3NhZ2VFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKVswXTtcbiAgICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgICAgIGlmIChzcGFuLnRleHRDb250ZW50ICE9IG51bGwpIHNwYW4udGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHNwYW4uaW5uZXJUZXh0ICE9IG51bGwpIHNwYW4uaW5uZXJUZXh0ID0gdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja01lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmdldEZhbGxiYWNrRm9ybSgpKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBHZXRzIGNhbGxlZCB0byBjYWxjdWxhdGUgdGhlIHRodW1ibmFpbCBkaW1lbnNpb25zLlxuICAgKlxuICAgKiBJdCBnZXRzIGBmaWxlYCwgYHdpZHRoYCBhbmQgYGhlaWdodGAgKGJvdGggbWF5IGJlIGBudWxsYCkgYXMgcGFyYW1ldGVycyBhbmQgbXVzdCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmc6XG4gICAqXG4gICAqICAtIGBzcmNXaWR0aGAgJiBgc3JjSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAqICAtIGB0cmdXaWR0aGAgJiBgdHJnSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAqICAtIGBzcmNYYCAmIGBzcmNZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuICAgKiAgLSBgdHJnWGAgJiBgdHJnWWAgKG9wdGlvbmFsLCBkZWZhdWx0IGAwYClcbiAgICpcbiAgICogVGhvc2UgdmFsdWVzIGFyZSBnb2luZyB0byBiZSB1c2VkIGJ5IGBjdHguZHJhd0ltYWdlKClgLlxuICAgKi8gcmVzaXplIChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpIHtcbiAgICAgICAgbGV0IGluZm8gPSB7XG4gICAgICAgICAgICBzcmNYOiAwLFxuICAgICAgICAgICAgc3JjWTogMCxcbiAgICAgICAgICAgIHNyY1dpZHRoOiBmaWxlLndpZHRoLFxuICAgICAgICAgICAgc3JjSGVpZ2h0OiBmaWxlLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICBsZXQgc3JjUmF0aW8gPSBmaWxlLndpZHRoIC8gZmlsZS5oZWlnaHQ7XG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlIGRpbWVuc2lvbnMgaWYgbm90IHNwZWNpZmllZFxuICAgICAgICBpZiAod2lkdGggPT0gbnVsbCAmJiBoZWlnaHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgd2lkdGggPSBpbmZvLnNyY1dpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gaW5mby5zcmNIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPT0gbnVsbCkgd2lkdGggPSBoZWlnaHQgKiBzcmNSYXRpbztcbiAgICAgICAgZWxzZSBpZiAoaGVpZ2h0ID09IG51bGwpIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgIC8vIE1ha2Ugc3VyZSBpbWFnZXMgYXJlbid0IHVwc2NhbGVkXG4gICAgICAgIHdpZHRoID0gTWF0aC5taW4od2lkdGgsIGluZm8uc3JjV2lkdGgpO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1pbihoZWlnaHQsIGluZm8uc3JjSGVpZ2h0KTtcbiAgICAgICAgbGV0IHRyZ1JhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIGlmIChpbmZvLnNyY1dpZHRoID4gd2lkdGggfHwgaW5mby5zcmNIZWlnaHQgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIEltYWdlIGlzIGJpZ2dlciBhbmQgbmVlZHMgcmVzY2FsaW5nXG4gICAgICAgICAgICBpZiAocmVzaXplTWV0aG9kID09PSBcImNyb3BcIikge1xuICAgICAgICAgICAgICAgIGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjSGVpZ2h0ID0gZmlsZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjV2lkdGggPSBpbmZvLnNyY0hlaWdodCAqIHRyZ1JhdGlvO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjV2lkdGggPSBmaWxlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnNyY0hlaWdodCA9IGluZm8uc3JjV2lkdGggLyB0cmdSYXRpbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc2l6ZU1ldGhvZCA9PT0gXCJjb250YWluXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBNZXRob2QgJ2NvbnRhaW4nXG4gICAgICAgICAgICAgICAgaWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgICAgICAgICAgZWxzZSB3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZXNpemVNZXRob2QgJyR7cmVzaXplTWV0aG9kfSdgKTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnNyY1ggPSAoZmlsZS53aWR0aCAtIGluZm8uc3JjV2lkdGgpIC8gMjtcbiAgICAgICAgaW5mby5zcmNZID0gKGZpbGUuaGVpZ2h0IC0gaW5mby5zcmNIZWlnaHQpIC8gMjtcbiAgICAgICAgaW5mby50cmdXaWR0aCA9IHdpZHRoO1xuICAgICAgICBpbmZvLnRyZ0hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfSxcbiAgICAvKipcbiAgICogQ2FuIGJlIHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBmaWxlIChmb3IgZXhhbXBsZSwgcmVzaXplIGFuIGltYWdlIGlmIG5lY2Vzc2FyeSkuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgKGlmIHByb3ZpZGVkKSBhbmQgcmVzaXplc1xuICAgKiBpbWFnZXMgYWNjb3JkaW5nIHRvIHRob3NlIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEdldHMgdGhlIGBmaWxlYCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCBhbmQgYSBgZG9uZSgpYCBmdW5jdGlvbiBhcyB0aGUgc2Vjb25kLCB0aGF0IG5lZWRzXG4gICAqIHRvIGJlIGludm9rZWQgd2l0aCB0aGUgZmlsZSB3aGVuIHRoZSB0cmFuc2Zvcm1hdGlvbiBpcyBkb25lLlxuICAgKi8gdHJhbnNmb3JtRmlsZSAoZmlsZSwgZG9uZSkge1xuICAgICAgICBpZiAoKHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCB8fCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSAmJiBmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSkgcmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoZmlsZSwgdGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoLCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0LCB0aGlzLm9wdGlvbnMucmVzaXplTWV0aG9kLCBkb25lKTtcbiAgICAgICAgZWxzZSByZXR1cm4gZG9uZShmaWxlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBBIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSB0ZW1wbGF0ZSB1c2VkIGZvciBlYWNoIGRyb3BwZWRcbiAgICogZmlsZS4gQ2hhbmdlIGl0IHRvIGZ1bGZpbGwgeW91ciBuZWVkcyBidXQgbWFrZSBzdXJlIHRvIHByb3Blcmx5XG4gICAqIHByb3ZpZGUgYWxsIGVsZW1lbnRzLlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gYWN0dWFsIEhUTUwgZWxlbWVudCBpbnN0ZWFkIG9mIHByb3ZpZGluZyBhIFN0cmluZ1xuICAgKiBhcyBhIGNvbmZpZyBvcHRpb24sIHlvdSBjb3VsZCBjcmVhdGUgYSBkaXYgd2l0aCB0aGUgaWQgYHRwbGAsXG4gICAqIHB1dCB0aGUgdGVtcGxhdGUgaW5zaWRlIGl0IGFuZCBwcm92aWRlIHRoZSBlbGVtZW50IGxpa2UgdGhpczpcbiAgICpcbiAgICogICAgIGRvY3VtZW50XG4gICAqICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdHBsJylcbiAgICogICAgICAgLmlubmVySFRNTFxuICAgKlxuICAgKi8gcHJldmlld1RlbXBsYXRlOiAoMCwgKC8qQF9fUFVSRV9fKi8kcGFyY2VsJGludGVyb3BEZWZhdWx0KCRjNjhjNDNlMWMxMjk1ZDMzJGV4cG9ydHMpKSksXG4gICAgLypcbiAgIFRob3NlIGZ1bmN0aW9ucyByZWdpc3RlciB0aGVtc2VsdmVzIHRvIHRoZSBldmVudHMgb24gaW5pdCBhbmQgaGFuZGxlIGFsbFxuICAgdGhlIHVzZXIgaW50ZXJmYWNlIHNwZWNpZmljIHN0dWZmLiBPdmVyd3JpdGluZyB0aGVtIHdvbid0IGJyZWFrIHRoZSB1cGxvYWRcbiAgIGJ1dCBjYW4gYnJlYWsgdGhlIHdheSBpdCdzIGRpc3BsYXllZC5cbiAgIFlvdSBjYW4gb3ZlcndyaXRlIHRoZW0gaWYgeW91IGRvbid0IGxpa2UgdGhlIGRlZmF1bHQgYmVoYXZpb3IuIElmIHlvdSBqdXN0XG4gICB3YW50IHRvIGFkZCBhbiBhZGRpdGlvbmFsIGV2ZW50IGhhbmRsZXIsIHJlZ2lzdGVyIGl0IG9uIHRoZSBkcm9wem9uZSBvYmplY3RcbiAgIGFuZCBkb24ndCBvdmVyd3JpdGUgdGhvc2Ugb3B0aW9ucy5cbiAgICovIC8vIFRob3NlIGFyZSBzZWxmIGV4cGxhbmF0b3J5IGFuZCBzaW1wbHkgY29uY2VybiB0aGUgRHJhZ25Ecm9wLlxuICAgIGRyb3AgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIGRyYWdzdGFydCAoZSkge30sXG4gICAgZHJhZ2VuZCAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ2VudGVyIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBkcmFnb3ZlciAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ2xlYXZlIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBwYXN0ZSAoZSkge30sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZXJlIGFyZSBubyBmaWxlcyBsZWZ0IGluIHRoZSBkcm9wem9uZSBhbnltb3JlLCBhbmQgdGhlXG4gICAgLy8gZHJvcHpvbmUgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBpZiBpbiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LXN0YXJ0ZWRcIik7XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbiBhIGZpbGUgaXMgYWRkZWQgdG8gdGhlIHF1ZXVlXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgYWRkZWRmaWxlIChmaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IHRoaXMucHJldmlld3NDb250YWluZXIpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotc3RhcnRlZFwiKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlld3NDb250YWluZXIgJiYgIXRoaXMub3B0aW9ucy5kaXNhYmxlUHJldmlld3MpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQgPSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY3JlYXRlRWxlbWVudCh0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlLnRyaW0oKSk7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdUZW1wbGF0ZSA9IGZpbGUucHJldmlld0VsZW1lbnQ7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuICAgICAgICAgICAgZm9yICh2YXIgbm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1uYW1lXVwiKSlub2RlLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgZm9yIChub2RlIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXNpemVdXCIpKW5vZGUuaW5uZXJIVE1MID0gdGhpcy5maWxlc2l6ZShmaWxlLnNpemUpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGRSZW1vdmVMaW5rcykge1xuICAgICAgICAgICAgICAgIGZpbGUuX3JlbW92ZUxpbmsgPSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY3JlYXRlRWxlbWVudChgPGEgY2xhc3M9XCJkei1yZW1vdmVcIiBocmVmPVwiamF2YXNjcmlwdDp1bmRlZmluZWQ7XCIgZGF0YS1kei1yZW1vdmU+JHt0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGV9PC9hPmApO1xuICAgICAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsZS5fcmVtb3ZlTGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVtb3ZlRmlsZUV2ZW50ID0gKGUpPT57XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuc3RhdHVzID09PSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuVVBMT0FESU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbikgcmV0dXJuICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jb25maXJtKHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uLCAoKT0+dGhpcy5yZW1vdmVGaWxlKGZpbGUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24pIHJldHVybiAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY29uZmlybSh0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24sICgpPT50aGlzLnJlbW92ZUZpbGUoZmlsZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IHJlbW92ZUxpbmsgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotcmVtb3ZlXVwiKSlyZW1vdmVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVGaWxlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgYSBmaWxlIGlzIHJlbW92ZWQuXG4gICAgcmVtb3ZlZGZpbGUgKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQgIT0gbnVsbCAmJiBmaWxlLnByZXZpZXdFbGVtZW50LnBhcmVudE5vZGUgIT0gbnVsbCkgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuIGEgdGh1bWJuYWlsIGhhcyBiZWVuIGdlbmVyYXRlZFxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYGRhdGFVcmxgXG4gICAgdGh1bWJuYWlsIChmaWxlLCBkYXRhVXJsKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1maWxlLXByZXZpZXdcIik7XG4gICAgICAgICAgICBmb3IgKGxldCB0aHVtYm5haWxFbGVtZW50IG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXRodW1ibmFpbF1cIikpe1xuICAgICAgICAgICAgICAgIHRodW1ibmFpbEVsZW1lbnQuYWx0ID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRodW1ibmFpbEVsZW1lbnQuc3JjID0gZGF0YVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpPT5maWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1pbWFnZS1wcmV2aWV3XCIpLCAxKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIGFuIGVycm9yIG9jY3Vyc1xuICAgIC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYG1lc3NhZ2VgXG4gICAgZXJyb3IgKGZpbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWVycm9yXCIpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcInN0cmluZ1wiICYmIG1lc3NhZ2UuZXJyb3IpIG1lc3NhZ2UgPSBtZXNzYWdlLmVycm9yO1xuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1lcnJvcm1lc3NhZ2VdXCIpKW5vZGUudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlcnJvcm11bHRpcGxlICgpIHt9LFxuICAgIC8vIENhbGxlZCB3aGVuIGEgZmlsZSBnZXRzIHByb2Nlc3NlZC4gU2luY2UgdGhlcmUgaXMgYSBxdWV1ZSwgbm90IGFsbCBhZGRlZFxuICAgIC8vIGZpbGVzIGFyZSBwcm9jZXNzZWQgaW1tZWRpYXRlbHkuXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgcHJvY2Vzc2luZyAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotcHJvY2Vzc2luZ1wiKTtcbiAgICAgICAgICAgIGlmIChmaWxlLl9yZW1vdmVMaW5rKSByZXR1cm4gZmlsZS5fcmVtb3ZlTGluay5pbm5lckhUTUwgPSB0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvY2Vzc2luZ211bHRpcGxlICgpIHt9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cbiAgICAvLyBSZWNlaXZlcyBgZmlsZWAsIGBwcm9ncmVzc2AgKHBlcmNlbnRhZ2UgMC0xMDApIGFuZCBgYnl0ZXNTZW50YC5cbiAgICAvLyBUbyBnZXQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBvZiB0aGUgZmlsZSwgdXNlIGBmaWxlLnNpemVgXG4gICAgdXBsb2FkcHJvZ3Jlc3MgKGZpbGUsIHByb2dyZXNzLCBieXRlc1NlbnQpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIGZvciAobGV0IG5vZGUgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotdXBsb2FkcHJvZ3Jlc3NdXCIpKW5vZGUubm9kZU5hbWUgPT09IFwiUFJPR1JFU1NcIiA/IG5vZGUudmFsdWUgPSBwcm9ncmVzcyA6IG5vZGUuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc30lYDtcbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdG90YWwgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cbiAgICAvLyBDYWxsZWQgd2l0aCB0b3RhbFVwbG9hZFByb2dyZXNzICgwLTEwMCksIHRvdGFsQnl0ZXMgYW5kIHRvdGFsQnl0ZXNTZW50XG4gICAgdG90YWx1cGxvYWRwcm9ncmVzcyAoKSB7fSxcbiAgICAvLyBDYWxsZWQganVzdCBiZWZvcmUgdGhlIGZpbGUgaXMgc2VudC4gR2V0cyB0aGUgYHhocmAgb2JqZWN0IGFzIHNlY29uZFxuICAgIC8vIHBhcmFtZXRlciwgc28geW91IGNhbiBtb2RpZnkgaXQgKGZvciBleGFtcGxlIHRvIGFkZCBhIENTUkYgdG9rZW4pIGFuZCBhXG4gICAgLy8gYGZvcm1EYXRhYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAgc2VuZGluZyAoKSB7fSxcbiAgICBzZW5kaW5nbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgY29tcGxldGUgdXBsb2FkIGlzIGZpbmlzaGVkIGFuZCBzdWNjZXNzZnVsXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgc3VjY2VzcyAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkgcmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LXN1Y2Nlc3NcIik7XG4gICAgfSxcbiAgICBzdWNjZXNzbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgdXBsb2FkIGlzIGNhbmNlbGVkLlxuICAgIGNhbmNlbGVkIChmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBmaWxlLCB0aGlzLm9wdGlvbnMuZGljdFVwbG9hZENhbmNlbGVkKTtcbiAgICB9LFxuICAgIGNhbmNlbGVkbXVsdGlwbGUgKCkge30sXG4gICAgLy8gV2hlbiB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLCBlaXRoZXIgd2l0aCBzdWNjZXNzIG9yIGFuIGVycm9yLlxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgIGNvbXBsZXRlIChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLl9yZW1vdmVMaW5rKSBmaWxlLl9yZW1vdmVMaW5rLmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZTtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1jb21wbGV0ZVwiKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlbXVsdGlwbGUgKCkge30sXG4gICAgbWF4ZmlsZXNleGNlZWRlZCAoKSB7fSxcbiAgICBtYXhmaWxlc3JlYWNoZWQgKCkge30sXG4gICAgcXVldWVjb21wbGV0ZSAoKSB7fSxcbiAgICBhZGRlZGZpbGVzICgpIHt9LFxuICAgIGVtcHR5Zm9sZGVyICgpIHt9XG59O1xudmFyICQ0Y2EzNjcxODI3NzZmODBiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgPSAkNGNhMzY3MTgyNzc2ZjgwYiR2YXIkZGVmYXVsdE9wdGlvbnM7XG5cblxuY2xhc3MgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSBleHRlbmRzICgwLCAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5KSB7XG4gICAgc3RhdGljIGluaXRDbGFzcygpIHtcbiAgICAgICAgLy8gRXhwb3NpbmcgdGhlIGVtaXR0ZXIgY2xhc3MsIG1haW5seSBmb3IgdGVzdHNcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuRW1pdHRlciA9ICgwLCAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5KTtcbiAgICAgICAgLypcbiAgICAgVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBldmVudHMgeW91IGNhbiByZWdpc3RlciBvbiBhIGRyb3B6b25lIG9iamVjdC5cblxuICAgICBZb3UgY2FuIHJlZ2lzdGVyIGFuIGV2ZW50IGhhbmRsZXIgbGlrZSB0aGlzOlxuXG4gICAgIGRyb3B6b25lLm9uKFwiZHJhZ0VudGVyXCIsIGZ1bmN0aW9uKCkgeyB9KTtcblxuICAgICAqLyB0aGlzLnByb3RvdHlwZS5ldmVudHMgPSBbXG4gICAgICAgICAgICBcImRyb3BcIixcbiAgICAgICAgICAgIFwiZHJhZ3N0YXJ0XCIsXG4gICAgICAgICAgICBcImRyYWdlbmRcIixcbiAgICAgICAgICAgIFwiZHJhZ2VudGVyXCIsXG4gICAgICAgICAgICBcImRyYWdvdmVyXCIsXG4gICAgICAgICAgICBcImRyYWdsZWF2ZVwiLFxuICAgICAgICAgICAgXCJhZGRlZGZpbGVcIixcbiAgICAgICAgICAgIFwiYWRkZWRmaWxlc1wiLFxuICAgICAgICAgICAgXCJyZW1vdmVkZmlsZVwiLFxuICAgICAgICAgICAgXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICAgIFwiZXJyb3JtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJwcm9jZXNzaW5nXCIsXG4gICAgICAgICAgICBcInByb2Nlc3NpbmdtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJ1cGxvYWRwcm9ncmVzc1wiLFxuICAgICAgICAgICAgXCJ0b3RhbHVwbG9hZHByb2dyZXNzXCIsXG4gICAgICAgICAgICBcInNlbmRpbmdcIixcbiAgICAgICAgICAgIFwic2VuZGluZ211bHRpcGxlXCIsXG4gICAgICAgICAgICBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIFwic3VjY2Vzc211bHRpcGxlXCIsXG4gICAgICAgICAgICBcImNhbmNlbGVkXCIsXG4gICAgICAgICAgICBcImNhbmNlbGVkbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwiY29tcGxldGVcIixcbiAgICAgICAgICAgIFwiY29tcGxldGVtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJyZXNldFwiLFxuICAgICAgICAgICAgXCJtYXhmaWxlc2V4Y2VlZGVkXCIsXG4gICAgICAgICAgICBcIm1heGZpbGVzcmVhY2hlZFwiLFxuICAgICAgICAgICAgXCJxdWV1ZWNvbXBsZXRlXCIsXG4gICAgICAgICAgICBcImVtcHR5Zm9sZGVyXCJcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX3RodW1ibmFpbFF1ZXVlID0gW107XG4gICAgICAgIHRoaXMucHJvdG90eXBlLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgbGV0IGZhbGxiYWNrLCBsZWZ0O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbDtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmZpbGVzID0gW107IC8vIEFsbCBmaWxlc1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZWxlbWVudCA9PT0gXCJzdHJpbmdcIikgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVsZW1lbnQpO1xuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgYWN0dWFsbHkgaGF2ZSBhbiBIVE1MIEVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCA9PT0gbnVsbCB8fCAhdGhpcy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZHJvcHpvbmUgZWxlbWVudDogbm90IGFuIGluc3RhbmNlIG9mIEhUTUxFbGVtZW50LlwiKTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kcm9wem9uZSkgdGhyb3cgbmV3IEVycm9yKFwiRHJvcHpvbmUgYWxyZWFkeSBhdHRhY2hlZC5cIik7XG4gICAgICAgIC8vIE5vdyBhZGQgdGhpcyBkcm9wem9uZSB0byB0aGUgaW5zdGFuY2VzLlxuICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcy5wdXNoKHRoaXMpO1xuICAgICAgICAvLyBQdXQgdGhlIGRyb3B6b25lIGluc2lkZSB0aGUgZWxlbWVudCBpdHNlbGYuXG4gICAgICAgIHRoaXMuZWxlbWVudC5kcm9wem9uZSA9IHRoaXM7XG4gICAgICAgIGxldCBlbGVtZW50T3B0aW9ucyA9IChsZWZ0ID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpKSAhPSBudWxsID8gbGVmdCA6IHt9O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCAoMCwgJDRjYTM2NzE4Mjc3NmY4MGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSksIGVsZW1lbnRPcHRpb25zLCBvcHRpb25zICE9IG51bGwgPyBvcHRpb25zIDoge30pO1xuICAgICAgICB0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlID0gdGhpcy5vcHRpb25zLnByZXZpZXdUZW1wbGF0ZS5yZXBsYWNlKC9cXG4qL2csIFwiXCIpO1xuICAgICAgICAvLyBJZiB0aGUgYnJvd3NlciBmYWlsZWQsIGp1c3QgY2FsbCB0aGUgZmFsbGJhY2sgYW5kIGxlYXZlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VGYWxsYmFjayB8fCAhJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSkgcmV0dXJuIHRoaXMub3B0aW9ucy5mYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICAvLyBAb3B0aW9ucy51cmwgPSBAZWxlbWVudC5nZXRBdHRyaWJ1dGUgXCJhY3Rpb25cIiB1bmxlc3MgQG9wdGlvbnMudXJsP1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVybCA9PSBudWxsKSB0aGlzLm9wdGlvbnMudXJsID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImFjdGlvblwiKTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBVUkwgcHJvdmlkZWQuXCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlICYmIHRoaXMub3B0aW9ucy5jaHVua2luZykgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCBzZXQgYm90aDogdXBsb2FkTXVsdGlwbGUgYW5kIGNodW5raW5nLlwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5ICYmIHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCBzZXQgYm90aDogYmluYXJ5Qm9keSBhbmQgdXBsb2FkTXVsdGlwbGUuXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5tZXRob2QgPT09IFwic3RyaW5nXCIpIHRoaXMub3B0aW9ucy5tZXRob2QgPSB0aGlzLm9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmICgoZmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkgJiYgZmFsbGJhY2sucGFyZW50Tm9kZSkgLy8gUmVtb3ZlIHRoZSBmYWxsYmFja1xuICAgICAgICBmYWxsYmFjay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZhbGxiYWNrKTtcbiAgICAgICAgLy8gRGlzcGxheSBwcmV2aWV3cyBpbiB0aGUgcHJldmlld3NDb250YWluZXIgZWxlbWVudCBvciB0aGUgRHJvcHpvbmUgZWxlbWVudCB1bmxlc3MgZXhwbGljaXRseSBzZXQgdG8gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIpIHRoaXMucHJldmlld3NDb250YWluZXIgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyLCBcInByZXZpZXdzQ29udGFpbmVyXCIpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnByZXZpZXdzQ29udGFpbmVyID0gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrYWJsZSA9PT0gdHJ1ZSkgdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBlbHNlIHRoaXMuY2xpY2thYmxlRWxlbWVudHMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnRzKHRoaXMub3B0aW9ucy5jbGlja2FibGUsIFwiY2xpY2thYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGhhdmUgYmVlbiBhY2NlcHRlZFxuICAgIGdldEFjY2VwdGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuYWNjZXB0ZWQpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGhhdmUgYmVlbiByZWplY3RlZFxuICAgIC8vIE5vdCBzdXJlIHdoZW4gdGhhdCdzIGdvaW5nIHRvIGJlIHVzZWZ1bCwgYnV0IGFkZGVkIGZvciBjb21wbGV0ZW5lc3MuXG4gICAgZ2V0UmVqZWN0ZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+IWZpbGUuYWNjZXB0ZWQpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICBnZXRGaWxlc1dpdGhTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuc3RhdHVzID09PSBzdGF0dXMpLm1hcCgoZmlsZSk9PmZpbGUpO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGFyZSBpbiB0aGUgcXVldWVcbiAgICBnZXRRdWV1ZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEKTtcbiAgICB9XG4gICAgZ2V0VXBsb2FkaW5nRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORyk7XG4gICAgfVxuICAgIGdldEFkZGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkFEREVEKTtcbiAgICB9XG4gICAgLy8gRmlsZXMgdGhhdCBhcmUgZWl0aGVyIHF1ZXVlZCBvciB1cGxvYWRpbmdcbiAgICBnZXRBY3RpdmVGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HIHx8IGZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRCkubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdoZW4gRHJvcHpvbmUgaXMgaW5pdGlhbGl6ZWQuIFlvdVxuICAgIC8vIGNhbiAoYW5kIHNob3VsZCkgc2V0dXAgZXZlbnQgbGlzdGVuZXJzIGluc2lkZSB0aGlzIGZ1bmN0aW9uLlxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIEluIGNhc2UgaXQgaXNuJ3Qgc2V0IGFscmVhZHlcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSBcImZvcm1cIikgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImVuY3R5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpICYmICF0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kei1tZXNzYWdlXCIpKSB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50KGA8ZGl2IGNsYXNzPVwiZHotZGVmYXVsdCBkei1tZXNzYWdlXCI+PGJ1dHRvbiBjbGFzcz1cImR6LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj4ke3RoaXMub3B0aW9ucy5kaWN0RGVmYXVsdE1lc3NhZ2V9PC9idXR0b24+PC9kaXY+YCkpO1xuICAgICAgICBpZiAodGhpcy5jbGlja2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZXR1cEhpZGRlbkZpbGVJbnB1dCA9ICgpPT57XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0KSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImZpbGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCB0aGlzLmVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgPT09IG51bGwgfHwgdGhpcy5vcHRpb25zLm1heEZpbGVzID4gMSkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIiwgXCJtdWx0aXBsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5jbGFzc05hbWUgPSBcImR6LWhpZGRlbi1pbnB1dFwiO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAhPT0gbnVsbCkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsIHRoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNhcHR1cmUgIT09IG51bGwpIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImNhcHR1cmVcIiwgdGhpcy5vcHRpb25zLmNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIC8vIE1ha2luZyBzdXJlIHRoYXQgbm8gb25lIGNhbiBcInRhYlwiIGludG8gdGhpcyBmaWVsZC5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhcmlhbGFiZWwgZm9yIGExMXlcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiZHJvcHpvbmUgaGlkZGVuIGlucHV0XCIpO1xuICAgICAgICAgICAgICAgIC8vIE5vdCBzZXR0aW5nIGBkaXNwbGF5PVwibm9uZVwiYCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWNjZXB0IGNsaWNrc1xuICAgICAgICAgICAgICAgIC8vIG9uIGVsZW1lbnRzIHRoYXQgYXJlbid0IGRpc3BsYXllZC5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUud2lkdGggPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQodGhpcy5vcHRpb25zLmhpZGRlbklucHV0Q29udGFpbmVyLCBcImhpZGRlbklucHV0Q29udGFpbmVyXCIpLmFwcGVuZENoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCB7IGZpbGVzOiBmaWxlcyB9ID0gdGhpcy5oaWRkZW5GaWxlSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGgpIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5hZGRGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVzXCIsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dXBIaWRkZW5GaWxlSW5wdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuVVJMID0gd2luZG93LlVSTCAhPT0gbnVsbCA/IHdpbmRvdy5VUkwgOiB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICAvLyBTZXR1cCBhbGwgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBEcm9wem9uZSBvYmplY3QgaXRzZWxmLlxuICAgICAgICAvLyBUaGV5J3JlIG5vdCBpbiBAc2V0dXBFdmVudExpc3RlbmVycygpIGJlY2F1c2UgdGhleSBzaG91bGRuJ3QgYmUgcmVtb3ZlZFxuICAgICAgICAvLyBhZ2FpbiB3aGVuIHRoZSBkcm9wem9uZSBnZXRzIGRpc2FibGVkLlxuICAgICAgICBmb3IgKGxldCBldmVudE5hbWUgb2YgdGhpcy5ldmVudHMpdGhpcy5vbihldmVudE5hbWUsIHRoaXMub3B0aW9uc1tldmVudE5hbWVdKTtcbiAgICAgICAgdGhpcy5vbihcInVwbG9hZHByb2dyZXNzXCIsICgpPT50aGlzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSk7XG4gICAgICAgIHRoaXMub24oXCJyZW1vdmVkZmlsZVwiLCAoKT0+dGhpcy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkpO1xuICAgICAgICB0aGlzLm9uKFwiY2FuY2VsZWRcIiwgKGZpbGUpPT50aGlzLmVtaXQoXCJjb21wbGV0ZVwiLCBmaWxlKSk7XG4gICAgICAgIC8vIEVtaXQgYSBgcXVldWVjb21wbGV0ZWAgZXZlbnQgaWYgYWxsIGZpbGVzIGZpbmlzaGVkIHVwbG9hZGluZy5cbiAgICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIChmaWxlKT0+e1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QWRkZWRGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDApIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVmZXJyZWQgc28gdGhhdCBgcXVldWVjb21wbGV0ZWAgcmVhbGx5IHRyaWdnZXJzIGFmdGVyIGBjb21wbGV0ZWBcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpPT50aGlzLmVtaXQoXCJxdWV1ZWNvbXBsZXRlXCIpLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zRmlsZXMgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5kYXRhVHJhbnNmZXIudHlwZXMgJiYgZS5kYXRhVHJhbnNmZXIudHlwZXMuaW5jbHVkZXMoXCJGaWxlc1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5vUHJvcGFnYXRpb24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gZmlsZXMsIHdlIGRvbid0IHdhbnQgdG8gc3RvcFxuICAgICAgICAgICAgLy8gcHJvcGFnYXRpb24gc28gd2UgZG9uJ3QgaW50ZXJmZXJlIHdpdGggb3RoZXJcbiAgICAgICAgICAgIC8vIGRyYWcgYW5kIGRyb3AgYmVoYXZpb3VyLlxuICAgICAgICAgICAgaWYgKCFjb250YWluc0ZpbGVzKGUpKSByZXR1cm47XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdzdGFydFwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2VudGVyOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ2VudGVyXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnb3ZlcjogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYWtlcyBpdCBwb3NzaWJsZSB0byBkcmFnIGZpbGVzIGZyb20gY2hyb21lJ3MgZG93bmxvYWQgYmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NTI2NDMwL2RyYWctYW5kLWRyb3AtZmlsZS11cGxvYWRzLWZyb20tY2hyb21lLWRvd25sb2Fkcy1iYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVmY3QgPSBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiID09PSBlZmN0IHx8IFwibGlua01vdmVcIiA9PT0gZWZjdCA/IFwibW92ZVwiIDogXCJjb3B5XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdvdmVyXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnbGVhdmU6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImRyYWdsZWF2ZVwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcDogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcChlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2VuZDogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ2VuZFwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKChjbGlja2FibGVFbGVtZW50KT0+e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNsaWNrYWJsZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoZXZ0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSB0aGUgYWN0dWFsIGRyb3B6b25lIG9yIHRoZSBtZXNzYWdlIGVsZW1lbnQgc2hvdWxkIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2FibGVFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnQgfHwgZXZ0LnRhcmdldCA9PT0gdGhpcy5lbGVtZW50IHx8ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZWxlbWVudEluc2lkZShldnQudGFyZ2V0LCB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kei1tZXNzYWdlXCIpKSkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuY2xpY2soKTsgLy8gRm9yd2FyZCB0aGUgY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmluaXQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLy8gTm90IGZ1bGx5IHRlc3RlZCB5ZXRcbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0ICE9IG51bGwgPyB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlIDogdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5lbGVtZW50LmRyb3B6b25lO1xuICAgICAgICByZXR1cm4gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbnN0YW5jZXMuc3BsaWNlKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIH1cbiAgICB1cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkge1xuICAgICAgICBsZXQgdG90YWxVcGxvYWRQcm9ncmVzcztcbiAgICAgICAgbGV0IHRvdGFsQnl0ZXNTZW50ID0gMDtcbiAgICAgICAgbGV0IHRvdGFsQnl0ZXMgPSAwO1xuICAgICAgICBsZXQgYWN0aXZlRmlsZXMgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCk7XG4gICAgICAgIGlmIChhY3RpdmVGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5nZXRBY3RpdmVGaWxlcygpKXtcbiAgICAgICAgICAgICAgICB0b3RhbEJ5dGVzU2VudCArPSBmaWxlLnVwbG9hZC5ieXRlc1NlbnQ7XG4gICAgICAgICAgICAgICAgdG90YWxCeXRlcyArPSBmaWxlLnVwbG9hZC50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAxMDAgKiB0b3RhbEJ5dGVzU2VudCAvIHRvdGFsQnl0ZXM7XG4gICAgICAgIH0gZWxzZSB0b3RhbFVwbG9hZFByb2dyZXNzID0gMTAwO1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwidG90YWx1cGxvYWRwcm9ncmVzc1wiLCB0b3RhbFVwbG9hZFByb2dyZXNzLCB0b3RhbEJ5dGVzLCB0b3RhbEJ5dGVzU2VudCk7XG4gICAgfVxuICAgIC8vIEBvcHRpb25zLnBhcmFtTmFtZSBjYW4gYmUgYSBmdW5jdGlvbiB0YWtpbmcgb25lIHBhcmFtZXRlciByYXRoZXIgdGhhbiBhIHN0cmluZy5cbiAgICAvLyBBIHBhcmFtZXRlciBuYW1lIGZvciBhIGZpbGUgaXMgb2J0YWluZWQgc2ltcGx5IGJ5IGNhbGxpbmcgdGhpcyB3aXRoIGFuIGluZGV4IG51bWJlci5cbiAgICBfZ2V0UGFyYW1OYW1lKG4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lKG4pO1xuICAgICAgICBlbHNlIHJldHVybiBgJHt0aGlzLm9wdGlvbnMucGFyYW1OYW1lfSR7dGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gYFske259XWAgOiBcIlwifWA7XG4gICAgfVxuICAgIC8vIElmIEBvcHRpb25zLnJlbmFtZUZpbGUgaXMgYSBmdW5jdGlvbixcbiAgICAvLyB0aGUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIHJlbmFtZSB0aGUgZmlsZS5uYW1lIGJlZm9yZSBhcHBlbmRpbmcgaXQgdG8gdGhlIGZvcm1EYXRhLlxuICAgIC8vIE1hY09TIDE0KyBzY3JlZW5zaG90cyBjb250YWluIG5hcnJvdyBub24tYnJlYWtpbmcgc3BhY2UgKFUrMjAyRikgY2hhcmFjdGVycyBpbiBmaWxlbmFtZXMgXG4gICAgLy8gKGUuZy4sIFwiU2NyZWVuc2hvdCAyMDI0LTAxLTMwIGF0IDEwLjMyLjA3IEFNLnBuZ1wiIHdoZXJlIHRoZSBzcGFjZSBhZnRlciBcIjA3XCIgYW5kIGJlZm9yZSBcIkFNXCIgaXMgVSsyMDJGKS5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG5vdyByZXBsYWNlcyB0aGVzZSB3aXRoIHJlZ3VsYXIgc3BhY2VzIHRvIHByZXZlbnQgdXBsb2FkIGlzc3VlcyBhbmQgbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIE1hY09TXG4gICAgX3JlbmFtZUZpbGUoZmlsZSkge1xuICAgICAgICBjb25zdCBjbGVhbkZpbGUgPSB7XG4gICAgICAgICAgICAuLi5maWxlLFxuICAgICAgICAgICAgbmFtZTogZmlsZS5uYW1lLnJlcGxhY2UoL1xcdTIwMkYvZywgJyAnKVxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBjbGVhbkZpbGUubmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlKGNsZWFuRmlsZSk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYSBmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgZmFsbGJhY2sgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBEcmFnbkRyb3BcbiAgICAvL1xuICAgIC8vIElmIHRoZSBkcm9wem9uZSBpcyBhbHJlYWR5IGEgZm9ybSwgb25seSB0aGUgaW5wdXQgZmllbGQgYW5kIGJ1dHRvbiBhcmUgcmV0dXJuZWQuIE90aGVyd2lzZSBhIGNvbXBsZXRlIGZvcm0gZWxlbWVudCBpcyBwcm92aWRlZC5cbiAgICAvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG4gICAgZ2V0RmFsbGJhY2tGb3JtKCkge1xuICAgICAgICBsZXQgZXhpc3RpbmdGYWxsYmFjaywgZm9ybTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkgcmV0dXJuIGV4aXN0aW5nRmFsbGJhY2s7XG4gICAgICAgIGxldCBmaWVsZHNTdHJpbmcgPSAnPGRpdiBjbGFzcz1cImR6LWZhbGxiYWNrXCI+JztcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tUZXh0KSBmaWVsZHNTdHJpbmcgKz0gYDxwPiR7dGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHR9PC9wPmA7XG4gICAgICAgIGZpZWxkc1N0cmluZyArPSBgPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cIiR7dGhpcy5fZ2V0UGFyYW1OYW1lKDApfVwiICR7dGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiB1bmRlZmluZWR9IC8+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlVwbG9hZCFcIj48L2Rpdj5gO1xuICAgICAgICBsZXQgZmllbGRzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50KGZpZWxkc1N0cmluZyk7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSAhPT0gXCJGT1JNXCIpIHtcbiAgICAgICAgICAgIGZvcm0gPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQoYDxmb3JtIGFjdGlvbj1cIiR7dGhpcy5vcHRpb25zLnVybH1cIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIG1ldGhvZD1cIiR7dGhpcy5vcHRpb25zLm1ldGhvZH1cIj48L2Zvcm0+YCk7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZW5jdHlwZSBhbmQgbWV0aG9kIGF0dHJpYnV0ZXMgYXJlIHNldCBwcm9wZXJseVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImVuY3R5cGVcIiwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcIm1ldGhvZFwiLCB0aGlzLm9wdGlvbnMubWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsID8gZm9ybSA6IGZpZWxkcztcbiAgICB9XG4gICAgLy8gUmV0dXJucyB0aGUgZmFsbGJhY2sgZWxlbWVudHMgaWYgdGhleSBleGlzdCBhbHJlYWR5XG4gICAgLy9cbiAgICAvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG4gICAgZ2V0RXhpc3RpbmdGYWxsYmFjaygpIHtcbiAgICAgICAgbGV0IGdldEZhbGxiYWNrID0gZnVuY3Rpb24oZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVsIG9mIGVsZW1lbnRzKXtcbiAgICAgICAgICAgICAgICBpZiAoLyhefCApZmFsbGJhY2soJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IHRhZ05hbWUgb2YgW1xuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIFwiZm9ybVwiXG4gICAgICAgIF0pe1xuICAgICAgICAgICAgdmFyIGZhbGxiYWNrO1xuICAgICAgICAgICAgaWYgKGZhbGxiYWNrID0gZ2V0RmFsbGJhY2sodGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpKSkgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcCgoZWxlbWVudExpc3RlbmVycyk9PigoKT0+e1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gZWxlbWVudExpc3RlbmVycy5ldmVudHNbZXZlbnRdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSgpKTtcbiAgICB9XG4gICAgLy8gRGVhY3RpdmF0ZXMgYWxsIGxpc3RlbmVycyBzdG9yZWQgaW4gQGxpc3RlbmVyc1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKChlbGVtZW50TGlzdGVuZXJzKT0+KCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKCkpO1xuICAgIH1cbiAgICAvLyBSZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGNhbmNlbHMgYWxsIGZpbGVzIGluIHRoZSBxdWV1ZSBvciBiZWluZyBwcm9jZXNzZWQuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KT0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotY2xpY2thYmxlXCIpKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMubWFwKChmaWxlKT0+dGhpcy5jYW5jZWxVcGxvYWQoZmlsZSkpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRpc2FibGVkO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpPT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1jbGlja2FibGVcIikpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYSBuaWNlbHkgZm9ybWF0dGVkIGZpbGVzaXplXG4gICAgZmlsZXNpemUoc2l6ZSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRTaXplID0gMDtcbiAgICAgICAgbGV0IHNlbGVjdGVkVW5pdCA9IFwiYlwiO1xuICAgICAgICBpZiAoc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCB1bml0cyA9IFtcbiAgICAgICAgICAgICAgICBcInRiXCIsXG4gICAgICAgICAgICAgICAgXCJnYlwiLFxuICAgICAgICAgICAgICAgIFwibWJcIixcbiAgICAgICAgICAgICAgICBcImtiXCIsXG4gICAgICAgICAgICAgICAgXCJiXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdW5pdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGN1dG9mZiA9IE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKSAvIDEwO1xuICAgICAgICAgICAgICAgIGlmIChzaXplID49IGN1dG9mZikge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFNpemUgPSBzaXplIC8gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFVuaXQgPSB1bml0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZFNpemUgPSBNYXRoLnJvdW5kKDEwICogc2VsZWN0ZWRTaXplKSAvIDEwOyAvLyBDdXR0aW5nIG9mIGRpZ2l0c1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgPHN0cm9uZz4ke3NlbGVjdGVkU2l6ZX08L3N0cm9uZz4gJHt0aGlzLm9wdGlvbnMuZGljdEZpbGVTaXplVW5pdHNbc2VsZWN0ZWRVbml0XX1gO1xuICAgIH1cbiAgICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgY2xhc3MgZnJvbSB0aGUgZm9ybS5cbiAgICBfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID09PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHRoaXMuZW1pdChcIm1heGZpbGVzcmVhY2hlZFwiLCB0aGlzLmZpbGVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LW1heC1maWxlcy1yZWFjaGVkXCIpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotbWF4LWZpbGVzLXJlYWNoZWRcIik7XG4gICAgfVxuICAgIGRyb3AoZSkge1xuICAgICAgICBpZiAoIWUuZGF0YVRyYW5zZmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuZW1pdChcImRyb3BcIiwgZSk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIEZpbGVMaXN0IHRvIGFuIEFycmF5XG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGZvciBJRTExXG4gICAgICAgIGxldCBmaWxlcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZS5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyBpKyspZmlsZXNbaV0gPSBlLmRhdGFUcmFuc2Zlci5maWxlc1tpXTtcbiAgICAgICAgLy8gRXZlbiBpZiBpdCdzIGEgZm9sZGVyLCBmaWxlcy5sZW5ndGggd2lsbCBjb250YWluIHRoZSBmb2xkZXJzLlxuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgeyBpdGVtczogaXRlbXMgfSA9IGUuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCAmJiBpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwpIC8vIFRoZSBicm93c2VyIHN1cHBvcnRzIGRyb3BwaW5nIG9mIGZvbGRlcnMsIHNvIGhhbmRsZSBpdGVtcyBpbnN0ZWFkIG9mIGZpbGVzXG4gICAgICAgICAgICB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XG4gICAgICAgICAgICBlbHNlIHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChcImFkZGVkZmlsZXNcIiwgZmlsZXMpO1xuICAgIH1cbiAgICBwYXN0ZShlKSB7XG4gICAgICAgIGlmICgkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkX19ndWFyZF9fKGUgIT0gbnVsbCA/IGUuY2xpcGJvYXJkRGF0YSA6IHVuZGVmaW5lZCwgKHgpPT54Lml0ZW1zKSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuZW1pdChcInBhc3RlXCIsIGUpO1xuICAgICAgICBsZXQgeyBpdGVtczogaXRlbXMgfSA9IGUuY2xpcGJvYXJkRGF0YTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkgcmV0dXJuIHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcbiAgICB9XG4gICAgaGFuZGxlRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmFkZEZpbGUoZmlsZSk7XG4gICAgfVxuICAgIC8vIFdoZW4gYSBmb2xkZXIgaXMgZHJvcHBlZCAob3IgZmlsZXMgYXJlIHBhc3RlZCksIGl0ZW1zIG11c3QgYmUgaGFuZGxlZFxuICAgIC8vIGluc3RlYWQgb2YgZmlsZXMuXG4gICAgX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKSB7XG4gICAgICAgIHJldHVybiAoKCk9PntcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpe1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwgJiYgKGVudHJ5ID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHJlc3VsdC5wdXNoKHRoaXMuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSAvLyBBcHBlbmQgYWxsIGZpbGVzIGZyb20gdGhhdCBkaXJlY3RvcnkgdG8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBlbnRyeS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZ2V0QXNGaWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ua2luZCA9PSBudWxsIHx8IGl0ZW0ua2luZCA9PT0gXCJmaWxlXCIpIHJlc3VsdC5wdXNoKHRoaXMuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pKCk7XG4gICAgfVxuICAgIC8vIEdvZXMgdGhyb3VnaCB0aGUgZGlyZWN0b3J5LCBhbmQgYWRkcyBlYWNoIGZpbGUgaXQgZmluZHMgcmVjdXJzaXZlbHlcbiAgICBfYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGRpcmVjdG9yeSwgcGF0aCkge1xuICAgICAgICBsZXQgZGlyUmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICBsZXQgZXJyb3JIYW5kbGVyID0gKGVycm9yKT0+JDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRNZXRob2RfXyhjb25zb2xlLCBcImxvZ1wiLCAobyk9Pm8ubG9nKGVycm9yKSk7XG4gICAgICAgIGxldCBlbnRyeUNvdW50ID0gMDtcbiAgICAgICAgdmFyIHJlYWRFbnRyaWVzID0gKCk9PntcbiAgICAgICAgICAgIHJldHVybiBkaXJSZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpPT57XG4gICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2VudHJ5Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkuZmlsZSgoZmlsZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVIaWRkZW5GaWxlcyAmJiBmaWxlLm5hbWUuc3Vic3RyaW5nKDAsIDEpID09PSBcIi5cIikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmZ1bGxQYXRoID0gYCR7cGF0aH0vJHtmaWxlLm5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHRoaXMuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgYCR7cGF0aH0vJHtlbnRyeS5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGwgcmVhZEVudHJpZXMoKSBhZ2Fpbiwgc2luY2UgYnJvd3NlciBvbmx5IGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgMTAwIGVudHJpZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RpcmVjdG9yeVJlYWRlciNyZWFkRW50cmllc1xuICAgICAgICAgICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnlDb3VudCA9PT0gMCkgdGhpcy5lbWl0KFwiZW1wdHlmb2xkZXJcIiwgcGF0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVhZEVudHJpZXMoKTtcbiAgICB9XG4gICAgLy8gSWYgYGRvbmUoKWAgaXMgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnQgdGhlIGZpbGUgaXMgYWNjZXB0ZWRcbiAgICAvLyBJZiB5b3UgY2FsbCBpdCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkXG4gICAgLy8gKFRoaXMgYWxsb3dzIGZvciBhc3luY2hyb25vdXMgdmFsaWRhdGlvbilcbiAgICAvL1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRoZSBmaWxlc2l6ZSwgYW5kIGlmIHRoZSBmaWxlLnR5cGUgcGFzc2VzIHRoZVxuICAgIC8vIGBhY2NlcHRlZEZpbGVzYCBjaGVjay5cbiAgICBhY2NlcHQoZmlsZSwgZG9uZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzaXplICYmIGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSAqIDEwNDg1NzYpIGRvbmUodGhpcy5vcHRpb25zLmRpY3RGaWxlVG9vQmlnLnJlcGxhY2UoXCJ7e2ZpbGVzaXplfX1cIiwgTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0IC8gMTAuMjQpIC8gMTAwKS5yZXBsYWNlKFwie3ttYXhGaWxlc2l6ZX19XCIsIHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSkpO1xuICAgICAgICBlbHNlIGlmICghJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pc1ZhbGlkRmlsZShmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcykpIGRvbmUodGhpcy5vcHRpb25zLmRpY3RJbnZhbGlkRmlsZVR5cGUpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG4gICAgICAgICAgICBkb25lKHRoaXMub3B0aW9ucy5kaWN0TWF4RmlsZXNFeGNlZWRlZC5yZXBsYWNlKFwie3ttYXhGaWxlc319XCIsIHRoaXMub3B0aW9ucy5tYXhGaWxlcykpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibWF4ZmlsZXNleGNlZWRlZFwiLCBmaWxlKTtcbiAgICAgICAgfSBlbHNlIHRoaXMub3B0aW9ucy5hY2NlcHQuY2FsbCh0aGlzLCBmaWxlLCBkb25lKTtcbiAgICB9XG4gICAgYWRkRmlsZShmaWxlKSB7XG4gICAgICAgIGZpbGUudXBsb2FkID0ge1xuICAgICAgICAgICAgLy8gbm90ZTogdGhpcyBvbmx5IHdvcmtzIGlmIHdpbmRvdy5pc1NlY3VyZUNvbnRleHQgaXMgdHJ1ZSwgd2hpY2ggaW5jbHVkZXMgbG9jYWxob3N0IGluIGh0dHBcbiAgICAgICAgICAgIHV1aWQ6IHdpbmRvdy5pc1NlY3VyZUNvbnRleHQgPyBzZWxmLmNyeXB0by5yYW5kb21VVUlEKCkgOiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LnV1aWR2NCgpLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSB0b3RhbCB1cGxvYWQgc2l6ZSB0byBmaWxlLnNpemUgZm9yIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIEl0J3MgYWN0dWFsIGRpZmZlcmVudCB0aGFuIHRoZSBzaXplIHRvIGJlIHRyYW5zbWl0dGVkLlxuICAgICAgICAgICAgdG90YWw6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIGJ5dGVzU2VudDogMCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiB0aGlzLl9yZW5hbWVGaWxlKGZpbGUpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkFEREVEO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVcIiwgZmlsZSk7XG4gICAgICAgIHRoaXMuX2VucXVldWVUaHVtYm5haWwoZmlsZSk7XG4gICAgICAgIHRoaXMuYWNjZXB0KGZpbGUsIChlcnJvcik9PntcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZpbGUuYWNjZXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvclByb2Nlc3NpbmcoW1xuICAgICAgICAgICAgICAgICAgICBmaWxlXG4gICAgICAgICAgICAgICAgXSwgZXJyb3IpOyAvLyBXaWxsIHNldCB0aGUgZmlsZS5zdGF0dXNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsZS5hY2NlcHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUXVldWUpIHRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgIC8vIFdpbGwgc2V0IC5hY2NlcHRlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBXcmFwcGVyIGZvciBlbnF1ZXVlRmlsZVxuICAgIGVucXVldWVGaWxlcyhmaWxlcykge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbnF1ZXVlRmlsZShmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCAmJiBmaWxlLmFjY2VwdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gc2V0VGltZW91dCgoKT0+dGhpcy5wcm9jZXNzUXVldWUoKSwgMCk7IC8vIERlZmVycmluZyB0aGUgY2FsbFxuICAgICAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBmaWxlIGNhbid0IGJlIHF1ZXVlZCBiZWNhdXNlIGl0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkIG9yIHdhcyByZWplY3RlZC5cIik7XG4gICAgfVxuICAgIF9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jcmVhdGVJbWFnZVRodW1ibmFpbHMgJiYgZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykgJiYgZmlsZS5zaXplIDw9IHRoaXMub3B0aW9ucy5tYXhUaHVtYm5haWxGaWxlc2l6ZSAqIDEwNDg1NzYpIHtcbiAgICAgICAgICAgIHRoaXMuX3RodW1ibmFpbFF1ZXVlLnB1c2goZmlsZSk7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKT0+dGhpcy5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCksIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCkge1xuICAgICAgICBpZiAodGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCB8fCB0aGlzLl90aHVtYm5haWxRdWV1ZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IHRydWU7XG4gICAgICAgIGxldCBmaWxlID0gdGhpcy5fdGh1bWJuYWlsUXVldWUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHRoaXMub3B0aW9ucy50aHVtYm5haWxXaWR0aCwgdGhpcy5vcHRpb25zLnRodW1ibmFpbEhlaWdodCwgdGhpcy5vcHRpb25zLnRodW1ibmFpbE1ldGhvZCwgdHJ1ZSwgKGRhdGFVcmwpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgZmlsZSwgZGF0YVVybCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBDYW4gYmUgY2FsbGVkIGJ5IHRoZSB1c2VyIHRvIHJlbW92ZSBhIGZpbGVcbiAgICByZW1vdmVGaWxlKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORykgdGhpcy5jYW5jZWxVcGxvYWQoZmlsZSk7XG4gICAgICAgIHRoaXMuZmlsZXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkd2l0aG91dCh0aGlzLmZpbGVzLCBmaWxlKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlZGZpbGVcIiwgZmlsZSk7XG4gICAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuZW1pdChcInJlc2V0XCIpO1xuICAgIH1cbiAgICAvLyBSZW1vdmVzIGFsbCBmaWxlcyB0aGF0IGFyZW4ndCBjdXJyZW50bHkgcHJvY2Vzc2VkIGZyb20gdGhlIGxpc3RcbiAgICByZW1vdmVBbGxGaWxlcyhjYW5jZWxJZk5lY2Vzc2FyeSkge1xuICAgICAgICAvLyBDcmVhdGUgYSBjb3B5IG9mIGZpbGVzIHNpbmNlIHJlbW92ZUZpbGUoKSBjaGFuZ2VzIHRoZSBAZmlsZXMgYXJyYXkuXG4gICAgICAgIGlmIChjYW5jZWxJZk5lY2Vzc2FyeSA9PSBudWxsKSBjYW5jZWxJZk5lY2Vzc2FyeSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZmlsZXMuc2xpY2UoKSlpZiAoZmlsZS5zdGF0dXMgIT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HIHx8IGNhbmNlbElmTmVjZXNzYXJ5KSB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBSZXNpemVzIGFuIGltYWdlIGJlZm9yZSBpdCBnZXRzIHNlbnQgdG8gdGhlIHNlcnZlci4gVGhpcyBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZlxuICAgIC8vIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGlmIGByZXNpemVXaWR0aGAgb3IgYHJlc2l6ZUhlaWdodGAgYXJlIHNldC4gVGhlIGNhbGxiYWNrIGlzIGludm9rZWQgd2l0aFxuICAgIC8vIHRoZSByZXNpemVkIGJsb2IuXG4gICAgcmVzaXplSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCB0cnVlLCAoZGF0YVVybCwgY2FudmFzKT0+e1xuICAgICAgICAgICAgaWYgKGNhbnZhcyA9PSBudWxsKSAvLyBUaGUgaW1hZ2UgaGFzIG5vdCBiZWVuIHJlc2l6ZWRcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmaWxlKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB7IHJlc2l6ZU1pbWVUeXBlOiByZXNpemVNaW1lVHlwZSB9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChyZXNpemVNaW1lVHlwZSA9PSBudWxsKSByZXNpemVNaW1lVHlwZSA9IGZpbGUudHlwZTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzaXplZERhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKHJlc2l6ZU1pbWVUeXBlLCB0aGlzLm9wdGlvbnMucmVzaXplUXVhbGl0eSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZU1pbWVUeXBlID09PSBcImltYWdlL2pwZWdcIiB8fCByZXNpemVNaW1lVHlwZSA9PT0gXCJpbWFnZS9qcGdcIikgLy8gTm93IGFkZCB0aGUgb3JpZ2luYWwgRVhJRiBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHJlc2l6ZWREYXRhVVJMID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlc3RvcmVFeGlmKGZpbGUuZGF0YVVSTCwgcmVzaXplZERhdGFVUkwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmRhdGFVUkl0b0Jsb2IocmVzaXplZERhdGFVUkwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgaWdub3JlRXhpZiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgZmlsZS5kYXRhVVJMID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgICAvLyBEb24ndCBib3RoZXIgY3JlYXRpbmcgYSB0aHVtYm5haWwgZm9yIFNWRyBpbWFnZXMgc2luY2UgdGhleSdyZSB2ZWN0b3JcbiAgICAgICAgICAgIGlmIChmaWxlLnR5cGUgPT09IFwiaW1hZ2Uvc3ZnK3htbFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIGNhbGxiYWNrKGZpbGVSZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRodW1ibmFpbEZyb21VcmwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIHVuZGVmaW5lZCwgaWdub3JlRXhpZik7XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gICAgLy8gYG1vY2tGaWxlYCBuZWVkcyB0byBoYXZlIHRoZXNlIGF0dHJpYnV0ZXM6XG4gICAgLy9cbiAgICAvLyAgICAgeyBuYW1lOiAnbmFtZScsIHNpemU6IDEyMzQ1LCBpbWFnZVVybDogJycgfVxuICAgIC8vXG4gICAgLy8gYGNhbGxiYWNrYCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaW1hZ2UgaGFzIGJlZW4gZG93bmxvYWRlZCBhbmQgZGlzcGxheWVkLlxuICAgIC8vIGBjcm9zc09yaWdpbmAgd2lsbCBiZSBhZGRlZCB0byB0aGUgYGltZ2AgdGFnIHdoZW4gYWNjZXNzaW5nIHRoZSBmaWxlLlxuICAgIGRpc3BsYXlFeGlzdGluZ0ZpbGUobW9ja0ZpbGUsIGltYWdlVXJsLCBjYWxsYmFjaywgY3Jvc3NPcmlnaW4sIHJlc2l6ZVRodW1ibmFpbCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkZWRmaWxlXCIsIG1vY2tGaWxlKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICBpZiAoIXJlc2l6ZVRodW1ibmFpbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidGh1bWJuYWlsXCIsIG1vY2tGaWxlLCBpbWFnZVVybCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgb25Eb25lID0gKHRodW1ibmFpbCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgbW9ja0ZpbGUsIHRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1vY2tGaWxlLmRhdGFVUkwgPSBpbWFnZVVybDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChtb2NrRmlsZSwgdGhpcy5vcHRpb25zLnRodW1ibmFpbFdpZHRoLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsSGVpZ2h0LCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsTWV0aG9kLCB0aGlzLm9wdGlvbnMuZml4T3JpZW50YXRpb24sIG9uRG9uZSwgY3Jvc3NPcmlnaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVRodW1ibmFpbEZyb21VcmwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIGNyb3NzT3JpZ2luLCBpZ25vcmVFeGlmID0gZmFsc2UpIHtcbiAgICAgICAgLy8gTm90IHVzaW5nIGBuZXcgSW1hZ2VgIGhlcmUgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBsYXRlc3QgQ2hyb21lIHZlcnNpb25zLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvcHVsbC8yMjZcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGlmIChjcm9zc09yaWdpbikgaW1nLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG4gICAgICAgIC8vIGZpeE9yaWVudGF0aW9uIGlzIG5vdCBuZWVkZWQgYW55bW9yZSB3aXRoIGJyb3dzZXJzIGhhbmRsaW5nIGltYWdlT3JpZW50YXRpb25cbiAgICAgICAgZml4T3JpZW50YXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpW1wiaW1hZ2VPcmllbnRhdGlvblwiXSA9PSBcImZyb20taW1hZ2VcIiA/IGZhbHNlIDogZml4T3JpZW50YXRpb247XG4gICAgICAgIGltZy5vbmxvYWQgPSAoKT0+e1xuICAgICAgICAgICAgbGV0IGxvYWRFeGlmID0gKGNhbGxiYWNrKT0+Y2FsbGJhY2soMSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIEVYSUYgIT09IFwidW5kZWZpbmVkXCIgJiYgRVhJRiAhPT0gbnVsbCAmJiBmaXhPcmllbnRhdGlvbikgbG9hZEV4aWYgPSAoY2FsbGJhY2spPT5FWElGLmdldERhdGEoaW1nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVYSUYuZ2V0VGFnKHRoaXMsIFwiT3JpZW50YXRpb25cIikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGxvYWRFeGlmKChvcmllbnRhdGlvbik9PntcbiAgICAgICAgICAgICAgICBmaWxlLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgICAgICAgIGZpbGUuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgcmVzaXplSW5mbyA9IHRoaXMub3B0aW9ucy5yZXNpemUuY2FsbCh0aGlzLCBmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpO1xuICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2gob3JpZW50YXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGZsaXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTgwwrAgcm90YXRlIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmVydGljYWwgZmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgwLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmVydGljYWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOTDCsCByb3RhdGUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIC1jYW52YXMud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLmhlaWdodCwgLWNhbnZhcy53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDkwwrAgcm90YXRlIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoLTAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtY2FudmFzLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIGJ1Z2ZpeCBmb3IgaU9TJyBzY2FsaW5nIGJ1Zy5cbiAgICAgICAgICAgICAgICAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZHJhd0ltYWdlSU9TRml4KGN0eCwgaW1nLCByZXNpemVJbmZvLnNyY1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWCA6IDAsIHJlc2l6ZUluZm8uc3JjWSAhPSBudWxsID8gcmVzaXplSW5mby5zcmNZIDogMCwgcmVzaXplSW5mby5zcmNXaWR0aCwgcmVzaXplSW5mby5zcmNIZWlnaHQsIHJlc2l6ZUluZm8udHJnWCAhPSBudWxsID8gcmVzaXplSW5mby50cmdYIDogMCwgcmVzaXplSW5mby50cmdZICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1kgOiAwLCByZXNpemVJbmZvLnRyZ1dpZHRoLCByZXNpemVJbmZvLnRyZ0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IHRodW1ibmFpbCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHJldHVybiBjYWxsYmFjayh0aHVtYm5haWwsIGNhbnZhcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIGltZy5vbmVycm9yID0gY2FsbGJhY2s7XG4gICAgICAgIHZhciBkYXRhVVJMID0gZmlsZS5kYXRhVVJMO1xuICAgICAgICBpZiAoaWdub3JlRXhpZikgZGF0YVVSTCA9ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRyZW1vdmVFeGlmKGRhdGFVUkwpO1xuICAgICAgICByZXR1cm4gaW1nLnNyYyA9IGRhdGFVUkw7XG4gICAgfVxuICAgIC8vIEdvZXMgdGhyb3VnaCB0aGUgcXVldWUgYW5kIHByb2Nlc3NlcyBmaWxlcyBpZiB0aGVyZSBhcmVuJ3QgdG9vIG1hbnkgYWxyZWFkeS5cbiAgICBwcm9jZXNzUXVldWUoKSB7XG4gICAgICAgIGxldCB7IHBhcmFsbGVsVXBsb2FkczogcGFyYWxsZWxVcGxvYWRzIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGxldCBwcm9jZXNzaW5nTGVuZ3RoID0gdGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aDtcbiAgICAgICAgbGV0IGkgPSBwcm9jZXNzaW5nTGVuZ3RoO1xuICAgICAgICAvLyBUaGVyZSBhcmUgYWxyZWFkeSBhdCBsZWFzdCBhcyBtYW55IGZpbGVzIHVwbG9hZGluZyB0aGFuIHNob3VsZCBiZVxuICAgICAgICBpZiAocHJvY2Vzc2luZ0xlbmd0aCA+PSBwYXJhbGxlbFVwbG9hZHMpIHJldHVybjtcbiAgICAgICAgbGV0IHF1ZXVlZEZpbGVzID0gdGhpcy5nZXRRdWV1ZWRGaWxlcygpO1xuICAgICAgICBpZiAoIShxdWV1ZWRGaWxlcy5sZW5ndGggPiAwKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSAvLyBUaGUgZmlsZXMgc2hvdWxkIGJlIHVwbG9hZGVkIGluIG9uZSByZXF1ZXN0XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhxdWV1ZWRGaWxlcy5zbGljZSgwLCBwYXJhbGxlbFVwbG9hZHMgLSBwcm9jZXNzaW5nTGVuZ3RoKSk7XG4gICAgICAgIGVsc2Ugd2hpbGUoaSA8IHBhcmFsbGVsVXBsb2Fkcyl7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlZEZpbGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgIC8vIE5vdGhpbmcgbGVmdCB0byBwcm9jZXNzXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NGaWxlKHF1ZXVlZEZpbGVzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFdyYXBwZXIgZm9yIGBwcm9jZXNzRmlsZXNgXG4gICAgcHJvY2Vzc0ZpbGUoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzRmlsZXMoW1xuICAgICAgICAgICAgZmlsZVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLy8gTG9hZHMgdGhlIGZpbGUsIHRoZW4gY2FsbHMgZmluaXNoZWRMb2FkaW5nKClcbiAgICBwcm9jZXNzRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnByb2Nlc3NpbmcgPSB0cnVlOyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlVQTE9BRElORztcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInByb2Nlc3NpbmdcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwicHJvY2Vzc2luZ211bHRpcGxlXCIsIGZpbGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkRmlsZXMoZmlsZXMpO1xuICAgIH1cbiAgICBfZ2V0RmlsZXNXaXRoWGhyKHhocikge1xuICAgICAgICBsZXQgZmlsZXM7XG4gICAgICAgIHJldHVybiBmaWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS54aHIgPT09IHhocikubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIENhbmNlbHMgdGhlIGZpbGUgdXBsb2FkIGFuZCBzZXRzIHRoZSBzdGF0dXMgdG8gQ0FOQ0VMRURcbiAgICAvLyAqKmlmKiogdGhlIGZpbGUgaXMgYWN0dWFsbHkgYmVpbmcgdXBsb2FkZWQuXG4gICAgLy8gSWYgaXQncyBzdGlsbCBpbiB0aGUgcXVldWUsIHRoZSBmaWxlIGlzIGJlaW5nIHJlbW92ZWQgZnJvbSBpdCBhbmQgdGhlIHN0YXR1c1xuICAgIC8vIHNldCB0byBDQU5DRUxFRC5cbiAgICBjYW5jZWxVcGxvYWQoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBlZEZpbGVzID0gdGhpcy5fZ2V0RmlsZXNXaXRoWGhyKGZpbGUueGhyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwZWRGaWxlIG9mIGdyb3VwZWRGaWxlcylncm91cGVkRmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWxlLnhociAhPT0gXCJ1bmRlZmluZWRcIikgZmlsZS54aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwZWRGaWxlIG9mIGdyb3VwZWRGaWxlcyl0aGlzLmVtaXQoXCJjYW5jZWxlZFwiLCBncm91cGVkRmlsZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJjYW5jZWxlZG11bHRpcGxlXCIsIGdyb3VwZWRGaWxlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQgfHwgZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEKSB7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQ7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjYW5jZWxlZFwiLCBmaWxlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgW1xuICAgICAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIHJlc29sdmVPcHRpb24ob3B0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBvcHRpb24uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuICAgIHVwbG9hZEZpbGUoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhbXG4gICAgICAgICAgICBmaWxlXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICB1cGxvYWRGaWxlcyhmaWxlcykge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1GaWxlcyhmaWxlcywgKHRyYW5zZm9ybWVkRmlsZXMpPT57XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNodW5raW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2h1bmtpbmcgaXMgbm90IGFsbG93ZWQgdG8gYmUgdXNlZCB3aXRoIGB1cGxvYWRNdWx0aXBsZWAgc28gd2Uga25vd1xuICAgICAgICAgICAgICAgIC8vIHRoYXQgdGhlcmUgaXMgb25seSBfX29uZV9fZmlsZS5cbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcbiAgICAgICAgICAgICAgICBmaWxlc1swXS51cGxvYWQuY2h1bmtlZCA9IHRoaXMub3B0aW9ucy5jaHVua2luZyAmJiAodGhpcy5vcHRpb25zLmZvcmNlQ2h1bmtpbmcgfHwgdHJhbnNmb3JtZWRGaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBmaWxlc1swXS51cGxvYWQudG90YWxDaHVua0NvdW50ID0gTWF0aC5jZWlsKHRyYW5zZm9ybWVkRmlsZS5zaXplIC8gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybWVkRmlsZS5zaXplID09PSAwKSBmaWxlc1swXS51cGxvYWQudG90YWxDaHVua0NvdW50ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgZmlsZSBzaG91bGQgYmUgc2VudCBpbiBjaHVua3MhXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNodW5raW5nIG9wdGlvbiBpcyBzZXQsIHdlICoqa25vdyoqIHRoYXQgdGhlcmUgY2FuIG9ubHkgYmUgKipvbmUqKiBmaWxlLCBzaW5jZVxuICAgICAgICAgICAgICAgIC8vIHVwbG9hZE11bHRpcGxlIGlzIG5vdCBhbGxvd2VkIHdpdGggdGhpcyBvcHRpb24uXG4gICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1swXTtcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5jaHVua3MgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlTmV4dENodW5rID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNodW5rSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBuZXh0IGl0ZW0gaW4gZmlsZS51cGxvYWQuY2h1bmtzIHRoYXQgaXMgbm90IGRlZmluZWQgeWV0LlxuICAgICAgICAgICAgICAgICAgICB3aGlsZShmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gIT09IHVuZGVmaW5lZCljaHVua0luZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMsIHRoYXQgYWxsIGNodW5rcyBoYXZlIGFscmVhZHkgYmVlbiBzdGFydGVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtJbmRleCA+PSBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gY2h1bmtJbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHRoaXMub3B0aW9ucy5jaHVua1NpemUsIHRyYW5zZm9ybWVkRmlsZS5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9jayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2dldFBhcmFtTmFtZSgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZSA/IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZShzdGFydCwgZW5kKSA6IHRyYW5zZm9ybWVkRmlsZS5zbGljZShzdGFydCwgZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLnVwbG9hZC5maWxlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rSW5kZXg6IGNodW5rSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuY2h1bmtzW2NodW5rSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjaHVua0luZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJsb2NrOiBkYXRhQmxvY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyaWVzOiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCbG9ja1xuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQgPSAoY2h1bmssIHJlc3BvbnNlKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWxsRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaHVuay5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlNVQ0NFU1M7XG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHRoZSBkYXRhIGZyb20gdGhlIGNodW5rXG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmRhdGFCbG9jayA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rLnJlc3BvbnNlID0gY2h1bmsueGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsucmVzcG9uc2VIZWFkZXJzID0gY2h1bmsueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBMZWF2aW5nIHRoaXMgcmVmZXJlbmNlIHRvIHhociB3aWxsIGNhdXNlIG1lbW9yeSBsZWFrcy5cbiAgICAgICAgICAgICAgICAgICAgY2h1bmsueGhyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhbmRsZU5leHRDaHVuaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXS5zdGF0dXMgIT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUykgYWxsRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsRmluaXNoZWQpIHRoaXMub3B0aW9ucy5jaHVua3NVcGxvYWRlZChmaWxlLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gbGltaXQgcGFyYWxsZWxDaHVua1VwbG9hZHMgdG8gdGhlIHNhbWUgdmFsdWUgYXMgcGFyYWxsZWxVcGxvYWRzIG9wdGlvblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbGxlbENvdW50ID0gTWF0aC5taW4odGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzID09PSB0cnVlID8gdGhpcy5vcHRpb25zLnBhcmFsbGVsVXBsb2FkcyA6IHRoaXMub3B0aW9ucy5wYXJhbGxlbENodW5rVXBsb2FkcywgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFsbGVsQ291bnQ7IGkrKyloYW5kbGVOZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaGFuZGxlTmV4dENodW5rKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhQmxvY2tzID0gW107XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKWRhdGFCbG9ja3NbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX2dldFBhcmFtTmFtZShpKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtZWRGaWxlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGVzW2ldLnVwbG9hZC5maWxlbmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBsb2FkRGF0YShmaWxlcywgZGF0YUJsb2Nrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLy8gUmV0dXJucyB0aGUgcmlnaHQgY2h1bmsgZm9yIGdpdmVuIGZpbGUgYW5kIHhoclxuICAgIF9nZXRDaHVuayhmaWxlLCB4aHIpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gIT09IHVuZGVmaW5lZCAmJiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ueGhyID09PSB4aHIpIHJldHVybiBmaWxlLnVwbG9hZC5jaHVua3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhY3R1YWxseSB1cGxvYWRzIHRoZSBmaWxlKHMpIHRvIHRoZSBzZXJ2ZXIuXG4gICAgLy9cbiAgICAvLyAgSWYgZGF0YUJsb2NrcyBjb250YWlucyB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkIChtZWFuaW5nLCB0aGF0IHRoaXMgY291bGRcbiAgICAvLyBlaXRoZXIgYmUgdHJhbnNmb3JtZWQgZmlsZXMsIG9yIGluZGl2aWR1YWwgY2h1bmtzIGZvciBjaHVua2VkIHVwbG9hZCkgdGhlblxuICAgIC8vIHRoZXkgd2lsbCBiZSB1c2VkIGZvciB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkLlxuICAgIF91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKSB7XG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSBmaWxlIG9iamVjdHMgdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgaXQgbGF0ZXIuXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpZmlsZS54aHIgPSB4aHI7XG4gICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgLy8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSByaWdodCBjaHVuayBvYmplY3QsIHNvIGl0IGNhbiBiZSBhc3NvY2lhdGVkXG4gICAgICAgIC8vIGxhdGVyLCBhbmQgZm91bmQgd2l0aCBfZ2V0Q2h1bmsuXG4gICAgICAgIGZpbGVzWzBdLnVwbG9hZC5jaHVua3NbZGF0YUJsb2Nrc1swXS5jaHVua0luZGV4XS54aHIgPSB4aHI7XG4gICAgICAgIGxldCBtZXRob2QgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLm1ldGhvZCwgZmlsZXMsIGRhdGFCbG9ja3MpO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy51cmwsIGZpbGVzLCBkYXRhQmxvY2tzKTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICAvLyBTZXR0aW5nIHRoZSB0aW1lb3V0IGFmdGVyIG9wZW4gYmVjYXVzZSBvZiBJRTExIGlzc3VlOiBodHRwczovL2dpdGxhYi5jb20vbWVuby9kcm9wem9uZS9pc3N1ZXMvOFxuICAgICAgICBsZXQgdGltZW91dCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMudGltZW91dCwgZmlsZXMpO1xuICAgICAgICBpZiAodGltZW91dCkgeGhyLnRpbWVvdXQgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnRpbWVvdXQsIGZpbGVzKTtcbiAgICAgICAgLy8gSGFzIHRvIGJlIGFmdGVyIGAub3BlbigpYC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbnlvL2Ryb3B6b25lL2lzc3Vlcy8xNzlcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgeGhyLm9ubG9hZCA9IChlKT0+e1xuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgYFJlcXVlc3QgdGltZWRvdXQgYWZ0ZXIgJHt0aGlzLm9wdGlvbnMudGltZW91dCAvIDEwMDB9IHNlY29uZHNgKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKT0+e1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhocik7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgZG8gbm90IGhhdmUgdGhlIC51cGxvYWQgcHJvcGVydHlcbiAgICAgICAgbGV0IHByb2dyZXNzT2JqID0geGhyLnVwbG9hZCAhPSBudWxsID8geGhyLnVwbG9hZCA6IHhocjtcbiAgICAgICAgcHJvZ3Jlc3NPYmoub25wcm9ncmVzcyA9IChlKT0+dGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyLCBlKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdEhlYWRlcnMgPyB7XG4gICAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcbiAgICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCJcbiAgICAgICAgfSA6IHt9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBmaWxlc1swXS50eXBlO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIE9iamVjdC5hc3NpZ24oaGVhZGVycywgdGhpcy5vcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICBmb3IobGV0IGhlYWRlck5hbWUgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBsZXQgaGVhZGVyVmFsdWUgPSBoZWFkZXJzW2hlYWRlck5hbWVdO1xuICAgICAgICAgICAgaWYgKGhlYWRlclZhbHVlKSB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5KSB7XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgZmlsZSBpcyBnb2luZyB0byBiZSBzZW50IGFzIGJpbmFyeSBib2R5LCBpdCBkb2Vzbid0IG1ha2VcbiAgICAgICAgICAgIC8vIGFueSBzZW5zZSB0byBnZW5lcmF0ZSBgRm9ybURhdGFgIGZvciBpdC5cbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5lbWl0KFwic2VuZGluZ1wiLCBmaWxlLCB4aHIpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwic2VuZGluZ211bHRpcGxlXCIsIGZpbGVzLCB4aHIpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgbnVsbCwgZmlsZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAvLyBBZGRpbmcgYWxsIEBvcHRpb25zIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxQYXJhbXMgPSB0aGlzLm9wdGlvbnMucGFyYW1zO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWRkaXRpb25hbFBhcmFtcyA9PT0gXCJmdW5jdGlvblwiKSBhZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcy5jYWxsKHRoaXMsIGZpbGVzLCB4aHIsIGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkID8gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocikgOiBudWxsKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiBhZGRpdGlvbmFsUGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gYWRkaXRpb25hbFBhcmFtc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIC8vIFRoZSBhZGRpdGlvbmFsIHBhcmFtZXRlciBjb250YWlucyBhbiBhcnJheSxcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gbGV0cyBpdGVyYXRlIG92ZXIgaXQgdG8gYXR0YWNoIGVhY2ggdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5kaXZpZHVhbGx5LlxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMZXQgdGhlIHVzZXIgYWRkIGFkZGl0aW9uYWwgZGF0YSBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5lbWl0KFwic2VuZGluZ1wiLCBmaWxlLCB4aHIsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcInNlbmRpbmdtdWx0aXBsZVwiLCBmaWxlcywgeGhyLCBmb3JtRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpO1xuICAgICAgICAgICAgLy8gRmluYWxseSBhZGQgdGhlIGZpbGVzXG4gICAgICAgICAgICAvLyBIYXMgdG8gYmUgbGFzdCBiZWNhdXNlIHNvbWUgc2VydmVycyAoZWc6IFMzKSBleHBlY3QgdGhlIGZpbGUgdG8gYmUgdGhlIGxhc3QgcGFyYW1ldGVyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YUJsb2Nrcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9jayA9IGRhdGFCbG9ja3NbaV07XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGRhdGFCbG9jay5uYW1lLCBkYXRhQmxvY2suZGF0YSwgZGF0YUJsb2NrLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVHJhbnNmb3JtcyBhbGwgZmlsZXMgd2l0aCB0aGlzLm9wdGlvbnMudHJhbnNmb3JtRmlsZSBhbmQgaW52b2tlcyBkb25lIHdpdGggdGhlIHRyYW5zZm9ybWVkIGZpbGVzIHdoZW4gZG9uZS5cbiAgICBfdHJhbnNmb3JtRmlsZXMoZmlsZXMsIGRvbmUpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkRmlsZXMgPSBbXTtcbiAgICAgICAgLy8gQ2x1bXN5IHdheSBvZiBoYW5kbGluZyBhc3luY2hyb25vdXMgY2FsbHMsIHVudGlsIEkgZ2V0IHRvIGFkZCBhIHByb3BlciBGdXR1cmUgbGlicmFyeS5cbiAgICAgICAgbGV0IGRvbmVDb3VudGVyID0gMDtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKXRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlLmNhbGwodGhpcywgZmlsZXNbaV0sICh0cmFuc2Zvcm1lZEZpbGUpPT57XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZEZpbGVzW2ldID0gdHJhbnNmb3JtZWRGaWxlO1xuICAgICAgICAgICAgaWYgKCsrZG9uZUNvdW50ZXIgPT09IGZpbGVzLmxlbmd0aCkgZG9uZSh0cmFuc2Zvcm1lZEZpbGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFRha2VzIGNhcmUgb2YgYWRkaW5nIG90aGVyIGlucHV0IGVsZW1lbnRzIG9mIHRoZSBmb3JtIHRvIHRoZSBBSkFYIHJlcXVlc3RcbiAgICBfYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKSB7XG4gICAgICAgIC8vIFRha2UgY2FyZSBvZiBvdGhlciBpbnB1dCBlbGVtZW50c1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09IFwiRk9STVwiKSBmb3IgKGxldCBpbnB1dCBvZiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b25cIikpe1xuICAgICAgICAgICAgbGV0IGlucHV0TmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICBsZXQgaW5wdXRUeXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcbiAgICAgICAgICAgIGlmIChpbnB1dFR5cGUpIGlucHV0VHlwZSA9IGlucHV0VHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGlucHV0IGRvZXNuJ3QgaGF2ZSBhIG5hbWUsIHdlIGNhbid0IHVzZSBpdC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXROYW1lID09PSBcInVuZGVmaW5lZFwiIHx8IGlucHV0TmFtZSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoaW5wdXQudGFnTmFtZSA9PT0gXCJTRUxFQ1RcIiAmJiBpbnB1dC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSkge1xuICAgICAgICAgICAgICAgIC8vIFBvc3NpYmx5IG11bHRpcGxlIHZhbHVlc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiBpbnB1dC5vcHRpb25zKWlmIChvcHRpb24uc2VsZWN0ZWQpIGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpbnB1dFR5cGUgfHwgaW5wdXRUeXBlICE9PSBcImNoZWNrYm94XCIgJiYgaW5wdXRUeXBlICE9PSBcInJhZGlvXCIgfHwgaW5wdXQuY2hlY2tlZCkgZm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEludm9rZWQgd2hlbiB0aGVyZSBpcyBuZXcgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgZ2l2ZW4gZmlsZXMuXG4gICAgLy8gSWYgZSBpcyBub3QgcHJvdmlkZWQsIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLlxuICAgIF91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpIHtcbiAgICAgICAgaWYgKCFmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgLy8gSGFuZGxlIGZpbGUgdXBsb2FkcyB3aXRob3V0IGNodW5raW5nXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpe1xuICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLnRvdGFsICYmIGZpbGUudXBsb2FkLmJ5dGVzU2VudCAmJiBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPT0gZmlsZS51cGxvYWQudG90YWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDEwMCAqIGUubG9hZGVkIC8gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGV2ZW50LCBzbyB3ZSdyZSBhdCAxMDAlXG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gZmlsZS51cGxvYWQudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBmaWxlLCBmaWxlLnVwbG9hZC5wcm9ncmVzcywgZmlsZS51cGxvYWQuYnl0ZXNTZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjaHVua2VkIGZpbGUgdXBsb2Fkc1xuICAgICAgICAgICAgLy8gQ2h1bmtlZCB1cGxvYWQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB1cGxvYWRpbmcgbXVsdGlwbGUgZmlsZXMgaW4gb25lXG4gICAgICAgICAgICAvLyByZXF1ZXN0LCBzbyB3ZSBrbm93IHRoZXJlJ3Mgb25seSBvbmUgZmlsZS5cbiAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbMF07XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGlzIGlzIGEgY2h1bmtlZCB1cGxvYWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBhcHByb3ByaWF0ZSBjaHVua1xuICAgICAgICAgICAgLy8gcHJvZ3Jlc3MuXG4gICAgICAgICAgICBsZXQgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlLCB4aHIpO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICBjaHVuay5wcm9ncmVzcyA9IDEwMCAqIGUubG9hZGVkIC8gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBjaHVuay50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgICAgICAgY2h1bmsuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGV2ZW50LCBzbyB3ZSdyZSBhdCAxMDAlXG4gICAgICAgICAgICAgICAgY2h1bmsucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgICAgICAgY2h1bmsuYnl0ZXNTZW50ID0gY2h1bmsudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3cgdGFsbHkgdGhlICpmaWxlKiB1cGxvYWQgcHJvZ3Jlc3MgZnJvbSBpdHMgaW5kaXZpZHVhbCBjaHVua3NcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsID0gMDtcbiAgICAgICAgICAgIGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9IDA7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAmJiB0eXBlb2YgZmlsZS51cGxvYWQuY2h1bmtzW2ldLnByb2dyZXNzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLmJ5dGVzU2VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBwcm9jZXNzIGlzIGEgcGVyY2VudGFnZSwgd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIGFtb3VudCBvZlxuICAgICAgICAgICAgLy8gY2h1bmtzIHdlJ3ZlIHVzZWQuXG4gICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IGZpbGUudXBsb2FkLnByb2dyZXNzIC8gZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50O1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidXBsb2FkcHJvZ3Jlc3NcIiwgZmlsZSwgZmlsZS51cGxvYWQucHJvZ3Jlc3MsIGZpbGUudXBsb2FkLmJ5dGVzU2VudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZpbmlzaGVkVXBsb2FkaW5nKGZpbGVzLCB4aHIsIGUpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICBpZiAoZmlsZXNbMF0uc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEKSByZXR1cm47XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSAhPT0gXCJhcnJheWJ1ZmZlclwiICYmIHhoci5yZXNwb25zZVR5cGUgIT09IFwiYmxvYlwiKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBpZiAoeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpICYmIH54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikpIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gXCJJbnZhbGlkIEpTT04gcmVzcG9uc2UgZnJvbSBzZXJ2ZXIuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyKTtcbiAgICAgICAgaWYgKCEoMjAwIDw9IHhoci5zdGF0dXMgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHRoaXMuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKTtcbiAgICAgICAgZWxzZSBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIGZpbGVzWzBdLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkKHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpLCByZXNwb25zZSk7XG4gICAgICAgIGVsc2UgdGhpcy5fZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlLCBlKTtcbiAgICB9XG4gICAgX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQpIHJldHVybjtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkICYmIHRoaXMub3B0aW9ucy5yZXRyeUNodW5rcykge1xuICAgICAgICAgICAgbGV0IGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XG4gICAgICAgICAgICBpZiAoY2h1bmsucmV0cmllcysrIDwgdGhpcy5vcHRpb25zLnJldHJ5Q2h1bmtzTGltaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGxvYWREYXRhKGZpbGVzLCBbXG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmRhdGFCbG9ja1xuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBjb25zb2xlLndhcm4oXCJSZXRyaWVkIHRoaXMgY2h1bmsgdG9vIG9mdGVuLiBHaXZpbmcgdXAuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vycm9yUHJvY2Vzc2luZyhmaWxlcywgcmVzcG9uc2UgfHwgdGhpcy5vcHRpb25zLmRpY3RSZXNwb25zZUVycm9yLnJlcGxhY2UoXCJ7e3N0YXR1c0NvZGV9fVwiLCB4aHIuc3RhdHVzKSwgeGhyKTtcbiAgICB9XG4gICAgc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcykge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT0gMSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2Fubm90IHNlbmQgdGhpcyByZXF1ZXN0IGJlY2F1c2UgdGhlIFhNTEh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgaXMgbm90IE9QRU5FRC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iaW5hcnlCb2R5KSB7XG4gICAgICAgICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpO1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKGNodW5rLmRhdGFCbG9jay5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB4aHIuc2VuZChmaWxlc1swXSk7XG4gICAgICAgIH0gZWxzZSB4aHIuc2VuZChmb3JtRGF0YSk7XG4gICAgfVxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG4gICAgX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZVRleHQsIGUpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUztcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInN1Y2Nlc3NcIiwgZmlsZSwgcmVzcG9uc2VUZXh0LCBlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlXCIsIGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInN1Y2Nlc3NtdWx0aXBsZVwiLCBmaWxlcywgcmVzcG9uc2VUZXh0LCBlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG4gICAgX2Vycm9yUHJvY2Vzc2luZyhmaWxlcywgbWVzc2FnZSwgeGhyKSB7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpe1xuICAgICAgICAgICAgZmlsZS5zdGF0dXMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkVSUk9SO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZmlsZSwgbWVzc2FnZSwgeGhyKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlXCIsIGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVycm9ybXVsdGlwbGVcIiwgZmlsZXMsIG1lc3NhZ2UsIHhocik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZW11bHRpcGxlXCIsIGZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuICAgIH1cbiAgICBzdGF0aWMgdXVpZHY0KCkge1xuICAgICAgICByZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCAoYyk9PigrYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gK2MgLyA0KS50b1N0cmluZygxNikpO1xuICAgIH1cbn1cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5pdENsYXNzKCk7XG4vLyBUaGlzIGlzIGEgbWFwIG9mIG9wdGlvbnMgZm9yIHlvdXIgZGlmZmVyZW50IGRyb3B6b25lcy4gQWRkIGNvbmZpZ3VyYXRpb25zXG4vLyB0byB0aGlzIG9iamVjdCBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmUgZWxlbWVudHMuXG4vL1xuLy8gRXhhbXBsZTpcbi8vXG4vLyAgICAgRHJvcHpvbmUub3B0aW9ucy5teURyb3B6b25lRWxlbWVudElkID0geyBtYXhGaWxlc2l6ZTogMSB9O1xuLy9cbi8vIEFuZCBpbiBodG1sOlxuLy9cbi8vICAgICA8Zm9ybSBhY3Rpb249XCIvdXBsb2FkXCIgaWQ9XCJteS1kcm9wem9uZS1lbGVtZW50LWlkXCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9ucyA9IHt9O1xuLy8gUmV0dXJucyB0aGUgb3B0aW9ucyBmb3IgYW4gZWxlbWVudCBvciB1bmRlZmluZWQgaWYgbm9uZSBhdmFpbGFibGUuXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnNGb3JFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIC8vIEdldCB0aGUgYERyb3B6b25lLm9wdGlvbnMuZWxlbWVudElkYCBmb3IgdGhpcyBlbGVtZW50IGlmIGl0IGV4aXN0c1xuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpICYmIHR5cGVvZiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zWyQzZWQyNjlmMmYwZmIyMjRiJHZhciRjYW1lbGl6ZShlbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpKV07XG4gICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xufTtcbi8vIEhvbGRzIGEgbGlzdCBvZiBhbGwgZHJvcHpvbmUgaW5zdGFuY2VzXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcyA9IFtdO1xuLy8gUmV0dXJucyB0aGUgZHJvcHpvbmUgZm9yIGdpdmVuIGVsZW1lbnQgaWYgYW55XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgICBpZiAoKGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuZHJvcHpvbmUgOiB1bmRlZmluZWQpID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIERyb3B6b25lIGZvdW5kIGZvciBnaXZlbiBlbGVtZW50LiBUaGlzIGlzIHByb2JhYmx5IGJlY2F1c2UgeW91J3JlIHRyeWluZyB0byBhY2Nlc3MgaXQgYmVmb3JlIERyb3B6b25lIGhhZCB0aGUgdGltZSB0byBpbml0aWFsaXplLiBVc2UgdGhlIGBpbml0YCBvcHRpb24gdG8gc2V0dXAgYW55IGFkZGl0aW9uYWwgb2JzZXJ2ZXJzIG9uIHlvdXIgRHJvcHpvbmUuXCIpO1xuICAgIHJldHVybiBlbGVtZW50LmRyb3B6b25lO1xufTtcbi8vIExvb2tzIGZvciBhbGwgLmRyb3B6b25lIGVsZW1lbnRzIGFuZCBjcmVhdGVzIGEgZHJvcHpvbmUgZm9yIHRoZW1cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZGlzY292ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgZHJvcHpvbmVzO1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSBkcm9wem9uZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3B6b25lXCIpO1xuICAgIGVsc2Uge1xuICAgICAgICBkcm9wem9uZXMgPSBbXTtcbiAgICAgICAgLy8gSUUgOihcbiAgICAgICAgbGV0IGNoZWNrRWxlbWVudHMgPSAoZWxlbWVudHMpPT4oKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZWwgb2YgZWxlbWVudHMpaWYgKC8oXnwgKWRyb3B6b25lKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkgcmVzdWx0LnB1c2goZHJvcHpvbmVzLnB1c2goZWwpKTtcbiAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIikpO1xuICAgICAgICBjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9ybVwiKSk7XG4gICAgfVxuICAgIHJldHVybiAoKCk9PntcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkcm9wem9uZSBvZiBkcm9wem9uZXMpLy8gQ3JlYXRlIGEgZHJvcHpvbmUgdW5sZXNzIGF1dG8gZGlzY292ZXIgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIHNwZWNpZmljIGVsZW1lbnRcbiAgICAgICAgaWYgKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9uc0ZvckVsZW1lbnQoZHJvcHpvbmUpICE9PSBmYWxzZSkgcmVzdWx0LnB1c2gobmV3ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkoZHJvcHpvbmUpKTtcbiAgICAgICAgZWxzZSByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKCk7XG59O1xuLy8gQ2hlY2tzIGlmIHRoZSBicm93c2VyIGlzIHN1cHBvcnRlZCBieSBzaW1wbHkgY2hlY2tpbmcgaWYgUHJvbWlzZSBpcyBoZXJlOiBhIGdvb2QgY3V0b2ZmXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzQnJvd3NlclN1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIjtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmRhdGFVUkl0b0Jsb2IgPSBmdW5jdGlvbihkYXRhVVJJKSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICAvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuICAgIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KFwiLFwiKVsxXSk7XG4gICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdChcIixcIilbMF0uc3BsaXQoXCI6XCIpWzFdLnNwbGl0KFwiO1wiKVswXTtcbiAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxuICAgIGxldCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gICAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGZvcihsZXQgaSA9IDAsIGVuZCA9IGJ5dGVTdHJpbmcubGVuZ3RoLCBhc2MgPSAwIDw9IGVuZDsgYXNjID8gaSA8PSBlbmQgOiBpID49IGVuZDsgYXNjID8gaSsrIDogaS0tKWlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIC8vIHdyaXRlIHRoZSBBcnJheUJ1ZmZlciB0byBhIGJsb2JcbiAgICByZXR1cm4gbmV3IEJsb2IoW1xuICAgICAgICBhYlxuICAgIF0sIHtcbiAgICAgICAgdHlwZTogbWltZVN0cmluZ1xuICAgIH0pO1xufTtcbi8vIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgcmVqZWN0ZWQgaXRlbVxuY29uc3QgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHdpdGhvdXQgPSAobGlzdCwgcmVqZWN0ZWRJdGVtKT0+bGlzdC5maWx0ZXIoKGl0ZW0pPT5pdGVtICE9PSByZWplY3RlZEl0ZW0pLm1hcCgoaXRlbSk9Pml0ZW0pO1xuLy8gYWJjLWRlZl9naGkgLT4gYWJjRGVmR2hpXG5jb25zdCAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkY2FtZWxpemUgPSAoc3RyKT0+c3RyLnJlcGxhY2UoL1tcXC1fXShcXHcpL2csIChtYXRjaCk9Pm1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpKTtcbi8vIENyZWF0ZXMgYW4gZWxlbWVudCBmcm9tIHN0cmluZ1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmlubmVySFRNTCA9IHN0cmluZztcbiAgICByZXR1cm4gZGl2LmNoaWxkTm9kZXNbMF07XG59O1xuLy8gVGVzdHMgaWYgZ2l2ZW4gZWxlbWVudCBpcyBpbnNpZGUgKG9yIHNpbXBseSBpcykgdGhlIGNvbnRhaW5lclxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5lbGVtZW50SW5zaWRlID0gZnVuY3Rpb24oZWxlbWVudCwgY29udGFpbmVyKSB7XG4gICAgaWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikgcmV0dXJuIHRydWU7XG4gICAgIC8vIENvZmZlZXNjcmlwdCBkb2Vzbid0IHN1cHBvcnQgZG8vd2hpbGUgbG9vcHNcbiAgICB3aGlsZShlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKXtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnQgPSBmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgIGxldCBlbGVtZW50O1xuICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICBlbHNlIGlmIChlbC5ub2RlVHlwZSAhPSBudWxsKSBlbGVtZW50ID0gZWw7XG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIFxcYCR7bmFtZX1cXGAgb3B0aW9uIHByb3ZpZGVkLiBQbGVhc2UgcHJvdmlkZSBhIENTUyBzZWxlY3RvciBvciBhIHBsYWluIEhUTUwgZWxlbWVudC5gKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmdldEVsZW1lbnRzID0gZnVuY3Rpb24oZWxzLCBuYW1lKSB7XG4gICAgbGV0IGVsLCBlbGVtZW50cztcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoZWwgb2YgZWxzKWVsZW1lbnRzLnB1c2godGhpcy5nZXRFbGVtZW50KGVsLCBuYW1lKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVscyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKSllbGVtZW50cy5wdXNoKGVsKTtcbiAgICB9IGVsc2UgaWYgKGVscy5ub2RlVHlwZSAhPSBudWxsKSBlbGVtZW50cyA9IFtcbiAgICAgICAgZWxzXG4gICAgXTtcbiAgICBpZiAoZWxlbWVudHMgPT0gbnVsbCB8fCAhZWxlbWVudHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgXFxgJHtuYW1lfVxcYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yLCBhIHBsYWluIEhUTUwgZWxlbWVudCBvciBhIGxpc3Qgb2YgdGhvc2UuYCk7XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xufTtcbi8vIEFza3MgdGhlIHVzZXIgdGhlIHF1ZXN0aW9uIGFuZCBjYWxscyBhY2NlcHRlZCBvciByZWplY3RlZCBhY2NvcmRpbmdseVxuLy9cbi8vIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGp1c3QgdXNlcyBgd2luZG93LmNvbmZpcm1gIGFuZCB0aGVuIGNhbGxzIHRoZVxuLy8gYXBwcm9wcmlhdGUgY2FsbGJhY2suXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNvbmZpcm0gPSBmdW5jdGlvbihxdWVzdGlvbiwgYWNjZXB0ZWQsIHJlamVjdGVkKSB7XG4gICAgaWYgKHdpbmRvdy5jb25maXJtKHF1ZXN0aW9uKSkgcmV0dXJuIGFjY2VwdGVkKCk7XG4gICAgZWxzZSBpZiAocmVqZWN0ZWQgIT0gbnVsbCkgcmV0dXJuIHJlamVjdGVkKCk7XG59O1xuLy8gVmFsaWRhdGVzIHRoZSBtaW1lIHR5cGUgbGlrZSB0aGlzOlxuLy9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzVmFsaWRGaWxlID0gZnVuY3Rpb24oZmlsZSwgYWNjZXB0ZWRGaWxlcykge1xuICAgIGlmICghYWNjZXB0ZWRGaWxlcykgcmV0dXJuIHRydWU7XG4gICAgIC8vIElmIHRoZXJlIGFyZSBubyBhY2NlcHRlZCBtaW1lIHR5cGVzLCBpdCdzIE9LXG4gICAgYWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXMuc3BsaXQoXCIsXCIpO1xuICAgIGxldCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcbiAgICBsZXQgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgXCJcIik7XG4gICAgZm9yIChsZXQgdmFsaWRUeXBlIG9mIGFjY2VwdGVkRmlsZXMpe1xuICAgICAgICB2YWxpZFR5cGUgPSB2YWxpZFR5cGUudHJpbSgpO1xuICAgICAgICBpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gXCIuXCIpIHtcbiAgICAgICAgICAgIGlmIChmaWxlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlLm5hbWUubGVuZ3RoIC0gdmFsaWRUeXBlLmxlbmd0aCkgIT09IC0xKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHNvbWV0aGluZyBsaWtlIGEgaW1hZ2UvKiBtaW1lIHR5cGVcbiAgICAgICAgICAgIGlmIChiYXNlTWltZVR5cGUgPT09IHZhbGlkVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCBcIlwiKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWltZVR5cGUgPT09IHZhbGlkVHlwZSkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8vIEF1Z21lbnQgalF1ZXJ5XG5pZiAodHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkgIT09IG51bGwpIGpRdWVyeS5mbi5kcm9wem9uZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkodGhpcywgb3B0aW9ucyk7XG4gICAgfSk7XG59O1xuLy8gRHJvcHpvbmUgZmlsZSBzdGF0dXMgY29kZXNcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQgPSBcImFkZGVkXCI7XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRCA9IFwicXVldWVkXCI7XG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIE5vdywgaWYgYSBmaWxlIGlzIGFjY2VwdGVkLCBpdCdzIGVpdGhlciBxdWV1ZWRcbi8vIG9yIHVwbG9hZGluZy5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQUNDRVBURUQgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlFVRVVFRDtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HID0gXCJ1cGxvYWRpbmdcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUFJPQ0VTU0lORyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HOyAvLyBhbGlhc1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRCA9IFwiY2FuY2VsZWRcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuRVJST1IgPSBcImVycm9yXCI7XG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LlNVQ0NFU1MgPSBcInN1Y2Nlc3NcIjtcbi8qXG5cbiBCdWdmaXggZm9yIGlPUyA2IGFuZCA3XG4gU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExOTI5MDk5L2h0bWw1LWNhbnZhcy1kcmF3aW1hZ2UtcmF0aW8tYnVnLWlvc1xuIGJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG5cbiAqLyAvLyBEZXRlY3RpbmcgdmVydGljYWwgc3F1YXNoIGluIGxvYWRlZCBpbWFnZS5cbi8vIEZpeGVzIGEgYnVnIHdoaWNoIHNxdWFzaCBpbWFnZSB2ZXJ0aWNhbGx5IHdoaWxlIGRyYXdpbmcgaW50byBjYW52YXMgZm9yIHNvbWUgaW1hZ2VzLlxuLy8gVGhpcyBpcyBhIGJ1ZyBpbiBpT1M2IGRldmljZXMuIFRoaXMgZnVuY3Rpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc3RvbWl0YS9pb3MtaW1hZ2VmaWxlLW1lZ2FwaXhlbFxubGV0ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRkZXRlY3RWZXJ0aWNhbFNxdWFzaCA9IGZ1bmN0aW9uKGltZykge1xuICAgIGxldCBpaCA9IGltZy5uYXR1cmFsSGVpZ2h0O1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNhbnZhcy53aWR0aCA9IDE7XG4gICAgY2FudmFzLmhlaWdodCA9IGloO1xuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICBsZXQgeyBkYXRhOiBkYXRhIH0gPSBjdHguZ2V0SW1hZ2VEYXRhKDEsIDAsIDEsIGloKTtcbiAgICAvLyBzZWFyY2ggaW1hZ2UgZWRnZSBwaXhlbCBwb3NpdGlvbiBpbiBjYXNlIGl0IGlzIHNxdWFzaGVkIHZlcnRpY2FsbHkuXG4gICAgbGV0IHN5ID0gMDtcbiAgICBsZXQgZXkgPSBpaDtcbiAgICBsZXQgcHkgPSBpaDtcbiAgICB3aGlsZShweSA+IHN5KXtcbiAgICAgICAgbGV0IGFscGhhID0gZGF0YVsocHkgLSAxKSAqIDQgKyAzXTtcbiAgICAgICAgaWYgKGFscGhhID09PSAwKSBleSA9IHB5O1xuICAgICAgICBlbHNlIHN5ID0gcHk7XG4gICAgICAgIHB5ID0gZXkgKyBzeSA+PiAxO1xuICAgIH1cbiAgICBsZXQgcmF0aW8gPSBweSAvIGloO1xuICAgIGlmIChyYXRpbyA9PT0gMCkgcmV0dXJuIDE7XG4gICAgZWxzZSByZXR1cm4gcmF0aW87XG59O1xuLy8gQSByZXBsYWNlbWVudCBmb3IgY29udGV4dC5kcmF3SW1hZ2Vcbi8vIChhcmdzIGFyZSBmb3Igc291cmNlIGFuZCBkZXN0aW5hdGlvbikuXG52YXIgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRyYXdJbWFnZUlPU0ZpeCA9IGZ1bmN0aW9uKGN0eCwgaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcbiAgICBsZXQgdmVydFNxdWFzaFJhdGlvID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRldGVjdFZlcnRpY2FsU3F1YXNoKGltZyk7XG4gICAgcmV0dXJuIGN0eC5kcmF3SW1hZ2UoaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGggLyB2ZXJ0U3F1YXNoUmF0aW8pO1xufTtcbi8vIEluc3BpcmVkIGJ5IE1pbmlmeUpwZWdcbi8vIFNvdXJjZTogaHR0cDovL3d3dy5wZXJyeS5jei9maWxlcy9FeGlmUmVzdG9yZXIuanNcbi8vIGh0dHA6Ly9lbGljb24uYmxvZzU3LmZjMi5jb20vYmxvZy1lbnRyeS0yMDYuaHRtbFxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlbW92ZUV4aWYob3JpZ0ZpbGVCYXNlNjQpIHtcbiAgICB2YXIgbWFya2VyID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcbiAgICBpZiAoIW9yaWdGaWxlQmFzZTY0LnN0YXJ0c1dpdGgobWFya2VyKSkgcmV0dXJuIG9yaWdGaWxlQmFzZTY0O1xuICAgIHZhciBvcmlnRmlsZSA9IHdpbmRvdy5hdG9iKG9yaWdGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIW9yaWdGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiBvcmlnRmlsZUJhc2U2NDtcbiAgICAvLyBsb29wIHRocm91Z2ggdGhlIEpQRUcgZmlsZSBzZWdtZW50cyBhbmQgY29weSBhbGwgYnV0IEV4aWYgc2VnbWVudHMgaW50byB0aGUgZmlsdGVyZWQgZmlsZS5cbiAgICB2YXIgaGVhZCA9IDA7XG4gICAgdmFyIGZpbHRlcmVkRmlsZSA9IFwiXCI7XG4gICAgd2hpbGUoaGVhZCA8IG9yaWdGaWxlLmxlbmd0aCl7XG4gICAgICAgIGlmIChvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMikgPT0gXCJcXHhGRlxceERBXCIpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHN0YXJ0IG9mIHRoZSBpbWFnZSBkYXRhLCB3ZSBkb24ndCBleHBlY3QgZXhpZiBkYXRhIGFmdGVyIHRoYXQuXG4gICAgICAgICAgICBmaWx0ZXJlZEZpbGUgKz0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMikgPT0gXCJcXHhGRlxceEQ4XCIpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGdsb2JhbCBzdGFydCBtYXJrZXIuXG4gICAgICAgICAgICBmaWx0ZXJlZEZpbGUgKz0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpO1xuICAgICAgICAgICAgaGVhZCArPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHNlZ21lbnQgb2YgdmFyaWFibGUgc2l6ZS5cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAyKSAqIDI1NiArIG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDMpO1xuICAgICAgICAgICAgdmFyIGVuZFBvaW50ID0gaGVhZCArIGxlbmd0aCArIDI7XG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IG9yaWdGaWxlLnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcbiAgICAgICAgICAgIGlmICghc2VnbWVudC5zdGFydHNXaXRoKFwiXFx4RkZcXHhFMVwiKSkgZmlsdGVyZWRGaWxlICs9IHNlZ21lbnQ7XG4gICAgICAgICAgICBoZWFkID0gZW5kUG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcmtlciArIHdpbmRvdy5idG9hKGZpbHRlcmVkRmlsZSk7XG59XG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkcmVzdG9yZUV4aWYob3JpZ0ZpbGVCYXNlNjQsIHJlc2l6ZWRGaWxlQmFzZTY0KSB7XG4gICAgdmFyIG1hcmtlciA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCc7XG4gICAgaWYgKCEob3JpZ0ZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpICYmIHJlc2l6ZWRGaWxlQmFzZTY0LnN0YXJ0c1dpdGgobWFya2VyKSkpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICB2YXIgb3JpZ0ZpbGUgPSB3aW5kb3cuYXRvYihvcmlnRmlsZUJhc2U2NC5zbGljZShtYXJrZXIubGVuZ3RoKSk7XG4gICAgaWYgKCFvcmlnRmlsZS5zdGFydHNXaXRoKFwiXFx4RkZcXHhEOFxceEZGXCIpKSByZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG4gICAgLy8gR28gdGhyb3VnaCB0aGUgSlBFRyBmaWxlIHNlZ21lbnRzIG9uZSBieSBvbmUgYW5kIGNvbGxlY3QgYW55IEV4aWYgc2VnbWVudHMgd2UgZmluZC5cbiAgICB2YXIgaGVhZCA9IDA7XG4gICAgdmFyIGV4aWZEYXRhID0gXCJcIjtcbiAgICB3aGlsZShoZWFkIDwgb3JpZ0ZpbGUubGVuZ3RoKXtcbiAgICAgICAgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4REFcIikgYnJlYWs7XG4gICAgICAgIGVsc2UgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4RDhcIikgLy8gdGhpcyBpcyB0aGUgZ2xvYmFsIHN0YXJ0IG1hcmtlci5cbiAgICAgICAgaGVhZCArPSAyO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBzZWdtZW50IG9mIHZhcmlhYmxlIHNpemUuXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gb3JpZ0ZpbGUuY2hhckNvZGVBdChoZWFkICsgMikgKiAyNTYgKyBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAzKTtcbiAgICAgICAgICAgIHZhciBlbmRQb2ludCA9IGhlYWQgKyBsZW5ndGggKyAyO1xuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBvcmlnRmlsZS5zbGljZShoZWFkLCBlbmRQb2ludCk7XG4gICAgICAgICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKFwiXFx4RkZcXHhFMVwiKSkgZXhpZkRhdGEgKz0gc2VnbWVudDtcbiAgICAgICAgICAgIGhlYWQgPSBlbmRQb2ludDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhpZkRhdGEgPT0gXCJcIikgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIHZhciByZXNpemVkRmlsZSA9IHdpbmRvdy5hdG9iKHJlc2l6ZWRGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIXJlc2l6ZWRGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICAvLyBUaGUgZmlyc3QgZmlsZSBzZWdtZW50IGlzIGFsd2F5cyBoZWFkZXIgaW5mb3JtYXRpb24gc28gaW5zZXJ0IHRoZSBFeGlmIGRhdGEgYXMgc2Vjb25kIHNlZ21lbnQuXG4gICAgdmFyIHNwbGl0UG9pbnQgPSA0ICsgcmVzaXplZEZpbGUuY2hhckNvZGVBdCg0KSAqIDI1NiArIHJlc2l6ZWRGaWxlLmNoYXJDb2RlQXQoNSk7XG4gICAgcmVzaXplZEZpbGUgPSByZXNpemVkRmlsZS5zbGljZSgwLCBzcGxpdFBvaW50KSArIGV4aWZEYXRhICsgcmVzaXplZEZpbGUuc2xpY2Uoc3BsaXRQb2ludCk7XG4gICAgcmV0dXJuIG1hcmtlciArIHdpbmRvdy5idG9hKHJlc2l6ZWRGaWxlKTtcbn1cbmZ1bmN0aW9uICQzZWQyNjlmMmYwZmIyMjRiJHZhciRfX2d1YXJkX18odmFsdWUsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwgPyB0cmFuc2Zvcm0odmFsdWUpIDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRNZXRob2RfXyhvYmosIG1ldGhvZE5hbWUsIHRyYW5zZm9ybSkge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcInVuZGVmaW5lZFwiICYmIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqW21ldGhvZE5hbWVdID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cmFuc2Zvcm0ob2JqLCBtZXRob2ROYW1lKTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IHskM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5IGFzIGRlZmF1bHQsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgYXMgRHJvcHpvbmV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJvcHpvbmUubWpzLm1hcFxuIiwiY29uc3QgY29uZmlndXJlQ2xpcGJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvcHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jbGlwYm9hcmQtdGFyZ2V0XScpO1xuXG4gICAgY29weS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24uZGF0YXNldC5jbGlwYm9hcmRUYXJnZXQpLmlubmVyVGV4dCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBjbGlwYm9hcmQgc3VjY2Vzc2Z1bGx5IHNldFxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2lzLWNvcGllZCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWNvcGllZCcpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVDbGlwYm9hcmQ7XG4iLCJjb25zdCBjb25maWd1cmVUcml4VG9vbGJhciA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidHJpeC10b29sYmFyXCIpLmZvckVhY2goKHRvb2xiYXIpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uUm93ID0gdG9vbGJhci5xdWVyeVNlbGVjdG9yKFwiLnRyaXgtYnV0dG9uLXJvd1wiKTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdG9vbGJhci5jbG9zZXN0KFwiLmZvcm0td2lkZ2V0XCIpO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB3aWRnZXQucXVlcnlTZWxlY3RvcihcInRyaXgtZWRpdG9yXCIpO1xuXG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZCA9IGVkaXRvci5nZXRBdHRyaWJ1dGUoJ2lucHV0Jyk7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1tZWRpYS1jaG9pY2UnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgI21vZGFsLW1lZGlhLWNob2ljZV8ke2lkfSAubW9kYWwtYm9keWAsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFidXR0b25Sb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZldGNoRm9sZGVyID0gKHVybCkgPT4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcblxuICAgICAgICBjb25zdCBjb25maWd1cmVNb2RhbCA9IChodG1sKSA9PiB7XG4gICAgICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBoYW5kbGVFZGl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIG1lZGlhIHNlbGVjdGlvbiBtb2RhbFxuICAgICAgICAgICAgbW9kYWxDb250ZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBtb2RhbC5kYXRhc2V0LmZvbGRlciB8fCAnJztcblxuICAgICAgICAgICAgZmV0Y2hGb2xkZXIoXG4gICAgICAgICAgICAgICAgbW9kYWwuZGF0YXNldC5ocmVmICsgZm9sZGVyLFxuICAgICAgICAgICAgKS50aGVuKGNvbmZpZ3VyZU1vZGFsKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRhcmdldCA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRhdGFzZXQubWVkaWFVcmwgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBub3QgYSBzZWxlY3RhYmxlIG1lZGlhXG4gICAgICAgICAgICAgICAgZmV0Y2hGb2xkZXIodGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSkudGhlbihjb25maWd1cmVNb2RhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmRhdGFzZXQubWVkaWFUeXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmVkaXRvci5pbnNlcnRIVE1MKHRhcmdldC5kYXRhc2V0Lm1lZGlhT3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBuZXcgVHJpeC5BdHRhY2htZW50KHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGFyZ2V0LmRhdGFzZXQubWVkaWFPcmlnaW5hbFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVkaXRvci5lZGl0b3IuaW5zZXJ0QXR0YWNobWVudChhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kYWwuZGF0YXNldC5mb2xkZXIgPSB0YXJnZXQuZGF0YXNldC5tZWRpYUZvbGRlciB8fCAnJztcblxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZU1vZGFsU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImZvcm1cIik7XG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgICAgICAudGhlbihjb25maWd1cmVNb2RhbClcbiAgICAgICAgICAgIDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjbG9zZU1vZGFsID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbnMuaXRlbShjbG9zZUJ1dHRvbnMubGVuZ3RoIC0gMSkuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgY3VzdG9tIGJ1dHRvblxuICAgICAgICBjb25zdCBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYnV0dG9uR3JvdXAuY2xhc3NMaXN0LmFkZCgndHJpeC1idXR0b24tZ3JvdXAnLCAndHJpeC1idXR0b24tZ3JvdXAtLWpvbGltZWRpYS10b29scycpO1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10cml4LWF0dHJpYnV0ZScsICdqb2xpbWVkaWEnKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1icy10b2dnbGUnLCAnbW9kYWwnKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1icy10YXJnZXQnLCBgI21vZGFsLW1lZGlhLWNob2ljZV8ke2lkfWApO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgndHJpeC1idXR0b24nLCAndHJpeC1idXR0b24tLWljb24nLCAndHJpeC1idXR0b24tLWljb24taW1hZ2UnKTtcbiAgICAgICAgYnV0dG9uLnRpdGxlID0gJ0luc2VydCBtZWRpYSc7XG4gICAgICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVFZGl0KTtcbiAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU1vZGFsQ2xpY2spO1xuICAgICAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgICAgICAvLyBsb2NhdGUgdGhlIHNwYWNlciBhbmQgaW5zZXJ0IHRoZSBidXR0b24gZ3JvdXAgYmVmb3JlIGl0XG4gICAgICAgIGNvbnN0IHNwYWNlciA9IGJ1dHRvblJvdy5xdWVyeVNlbGVjdG9yKCcudHJpeC1idXR0b24tZ3JvdXAtc3BhY2VyJyk7XG4gICAgICAgIHNwYWNlci5iZWZvcmUoYnV0dG9uR3JvdXApO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlVHJpeFRvb2xiYXI7XG4iLCJpbXBvcnQgeyBEcm9wem9uZSB9IGZyb20gXCJAZGVsdGFibG90L2Ryb3B6b25lXCI7XG5cbmNvbnN0IGFkZERyb3B6b25lID0gKGVsZW1lbnQgPSBudWxsKSA9PiB7XG4gIGxldCBkcm9wem9uZSA9IGVsZW1lbnQ7XG5cbiAgaWYgKGRyb3B6b25lID09PSBudWxsKSB7XG4gICAgZHJvcHpvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21wb25lbnQ9ZHJvcHpvbmVdJyk7XG4gIH1cblxuICBpZiAoZHJvcHpvbmUpIHtcbiAgICBjb25zdCBjb25maWcgPSBkcm9wem9uZS5kYXRhc2V0LmRyb3B6b25lQ29uZmlnID8gSlNPTi5wYXJzZShkcm9wem9uZS5kYXRhc2V0LmRyb3B6b25lQ29uZmlnKSA6IHt9O1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gICAgICBhZGRSZW1vdmVMaW5rczogZmFsc2UsXG4gICAgICBtYXhGaWxlc2l6ZTogMjAsIC8vIE1CXG4gICAgICBwYXJhbU5hbWU6ICd1cGxvYWRbZmlsZV0nLFxuICAgICAgcHJldmlld1RlbXBsYXRlOiBkcm9wem9uZS5xdWVyeVNlbGVjdG9yKCcuZHotcHJldmlldy10ZW1wbGF0ZScpLmlubmVySFRNTCxcbiAgICAgIHRodW1ibmFpbFdpZHRoOiAxODAsXG4gICAgICB0aHVtYm5haWxIZWlnaHQ6IDEwOSxcbiAgICAgIHNlbmRpbmcoZmlsZSwgeGhyKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZT8uZmlsZXNbMF0/LmxpbmspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW5mbyA9IHJlc3BvbnNlLmZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgXCJbZGF0YS1kei1saW5rXVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5ocmVmID0gZmlsZUluZm8ubGluaztcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLWZvbGRlclwiLCBmaWxlSW5mby5tZWRpYUZvbGRlcik7XG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1tZWRpYS11cmxcIiwgZmlsZUluZm8ubWVkaWFVcmwpO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWVkaWEtZnVsbC11cmxcIiwgZmlsZUluZm8ubWVkaWFGdWxsVXJsKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLXRlbXBsYXRlXCIsIGZpbGVJbmZvLm1lZGlhVGVtcGxhdGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVJbmZvLm1lZGlhUHJldmlldykge1xuICAgICAgICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZHotdGh1bWJuYWlsXVwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmlubmVySFRNTCA9IGZpbGVJbmZvLm1lZGlhUHJldmlldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBEcm9wem9uZShkcm9wem9uZSwgeyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWcgfSk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZERyb3B6b25lO1xuIiwiY29uc3Qgb3BlbkZvbGRlckNob2ljZU1vZGFsID0gKGZvbGRlckNob2ljZUJ1dHRvbikgPT4ge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWZvbGRlci1jaG9pY2UnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICAgIGNvbnN0IHBhZ2VBY3Rpb25zID0gZm9sZGVyQ2hvaWNlQnV0dG9uLmNsb3Nlc3QoJy5wYWdlLWFjdGlvbnMnKTtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBwYWdlQWN0aW9ucy5xdWVyeVNlbGVjdG9yKCcjbW92ZV90bycpO1xuXG4gICAgY29uc3QgZmV0Y2hGb2xkZXIgPSAodXJsKSA9PiBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xuXG4gICAgY29uc3QgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgIGNsb3NlQnV0dG9ucy5pdGVtKGNsb3NlQnV0dG9ucy5sZW5ndGggLSAxKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWVsZFZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGFyZ2V0LmRhdGFzZXQuZm9sZGVyUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCB0aGUgZm9sZGVyIHNlbGVjdGlvbiBidXR0b25cbiAgICAgICAgICAgIGZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4oY29uZmlndXJlTW9kYWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RmllbGRWYWx1ZSh0YXJnZXQuZGF0YXNldC5mb2xkZXJQYXRoKTtcbiAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtbW92ZSBwJykudGV4dENvbnRlbnQgPSB0YXJnZXQuZGF0YXNldC5jb25maXJtYXRpb247XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1tb3ZlICNtb2RhbC1tb3ZlLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vdmUtZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW9kYWxTdWJtaXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiZm9ybVwiKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgICAgIGZldGNoKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbihjb25maWd1cmVNb2RhbClcbiAgICAgICAgO1xuICAgIH07XG5cbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxDbGljayk7XG4gICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVNb2RhbFN1Ym1pdCk7XG4gICAgY29uZmlndXJlTW9kYWwoJycpO1xuICAgIGZldGNoRm9sZGVyKFxuICAgICAgICBmb2xkZXJDaG9pY2VCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgZm9sZGVyQ2hvaWNlQnV0dG9uLmRhdGFzZXQuZm9sZGVyLFxuICAgICkudGhlbihjb25maWd1cmVNb2RhbCk7XG59O1xuXG5jb25zdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvciA9ICgpID0+IHtcbiAgICBjb25zdCBmb2xkZXJTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb21wb25lbnQ9bWVkaWEtbW92ZV1cIik7XG5cbiAgICBpZiAoIWZvbGRlclNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb2xkZXJTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBvcGVuRm9sZGVyQ2hvaWNlTW9kYWwoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvcjtcbiIsImNvbnN0IGNvbmZpZ3VyZU1lZGlhQ2hvaWNlQ29udGFpbmVyID0gKG1lZGlhQ2hvaWNlQ29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaWQgPSBtZWRpYUNob2ljZUNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG4gICAgY29uc3QgbWVkaWFDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgam9saS1tZWRpYS1jb250YWluZXJfJHtpZH1gKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5qb2xpLW1lZGlhLWNob2ljZS1kZWxldGVcIixcbiAgICApO1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvbGktbWVkaWEtY2hvaWNlLWVkaXRcIik7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1vZGFsLW1lZGlhLWNob2ljZV8ke2lkfWApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjbW9kYWwtbWVkaWEtY2hvaWNlXyR7aWR9IC5tb2RhbC1ib2R5YCxcbiAgICApO1xuXG4gICAgY29uc3QgZmV0Y2hGb2xkZXIgPSAodXJsKSA9PiBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xuXG4gICAgY29uc3QgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWJzLWRpc21pc3M9J21vZGFsJ11cIik7XG4gICAgICAgIGNsb3NlQnV0dG9ucy5pdGVtKGNsb3NlQnV0dG9ucy5sZW5ndGggLSAxKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRGaWVsZFZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYVwiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIkFcIiB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gXCIjXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXQuZGF0YXNldC5tZWRpYVRlbXBsYXRlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBhIHNlbGVjdGFibGUgbWVkaWFcbiAgICAgICAgICAgIGZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4oY29uZmlndXJlTW9kYWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVkaWFDb250YWluZXIuaW5uZXJIVE1MID0gdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZTtcbiAgICAgICAgbWVkaWFDaG9pY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImVtcHR5XCIpO1xuICAgICAgICBzZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlciA9IHRhcmdldC5kYXRhc2V0Lm1lZGlhRm9sZGVyO1xuICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZURlbGV0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtZWRpYUNob2ljZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGVtcGxhdGUtbnVsbC1sYWJlbC0ke2lkfWApO1xuICAgICAgICBtZWRpYUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBtZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlciA9IFwiXCI7XG4gICAgICAgIHNldEZpZWxkVmFsdWUoXCJcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRWRpdCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBmZXRjaEZvbGRlcihcbiAgICAgICAgICAgIGVkaXRCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgZWRpdEJ1dHRvbi5kYXRhc2V0LmZvbGRlcixcbiAgICAgICAgKS50aGVuKGNvbmZpZ3VyZU1vZGFsKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1vZGFsU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQuY2xvc2VzdChcImZvcm1cIik7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICBjb25zdCB1cmwgPSBmb3JtLmFjdGlvbjtcblxuICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4oY29uZmlndXJlTW9kYWwpXG4gICAgICAgIDtcbiAgICB9O1xuXG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVEZWxldGUpO1xuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUVkaXQpO1xuICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrKTtcbiAgICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgIG1lZGlhQ2hvaWNlQ29udGFpbmVyLmRhdGFzZXQuY29uZmlndXJlZCA9IHRydWU7XG59O1xuXG5jb25zdCBjb25maWd1cmVNZWRpYVNlbGVjdG9yID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb3JtLmVhLWVkaXQtZm9ybSwgZm9ybS5lYS1uZXctZm9ybVwiKS5mb3JFYWNoKChmb3JtKSA9PlxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmpzLWpvbGktbWVkaWEtY2hvaWNlLWNvbnRhaW5lclwiKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQuZGF0YXNldC5jb25maWd1cmVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmVNZWRpYUNob2ljZUNvbnRhaW5lcih0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqb2xpLW1lZGlhLWNob2ljZS1lZGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcmNlIHJlbG9hZCB0aGUgbW9kYWwgY29udGVudFxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuXG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtam9saS1tZWRpYS1jaG9pY2UtY29udGFpbmVyXCIpXG4gICAgICAgIC5mb3JFYWNoKGNvbmZpZ3VyZU1lZGlhQ2hvaWNlQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3I7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc3R5bGVzL2pvbGltZWRpYS5jc3MnO1xuaW1wb3J0IGFkZERyb3B6b25lIGZyb20gJy4vY29tcG9uZW50cy9kcm9wem9uZSc7XG5pbXBvcnQgY29uZmlndXJlRm9sZGVyU2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL2ZvbGRlclNlbGVjdG9yJztcbmltcG9ydCBjb25maWd1cmVNZWRpYVNlbGVjdG9yIGZyb20gJy4vY29tcG9uZW50cy9tZWRpYVNlbGVjdG9yJztcbmltcG9ydCBjb25maWd1cmVDbGlwYm9hcmQgZnJvbSAnLi9jb21wb25lbnRzL2NsaXBib2FyZCc7XG5pbXBvcnQgY29uZmlndXJlVHJpeFRvb2xiYXIgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpZ3VyZVRyaXhUb29sYmFyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uZmlndXJlRm9sZGVyU2VsZWN0b3IoKTtcbiAgY29uZmlndXJlTWVkaWFTZWxlY3RvcigpO1xuICBjb25maWd1cmVDbGlwYm9hcmQoKTtcbiAgY29uZmlndXJlVHJpeFRvb2xiYXIoKTtcbiAgbGV0IGRyb3B6b25lSW5zdGFuY2UgPSBudWxsO1xuXG4gIGNvbnN0IHN3aXRjaFRvb2wgPSAodGFyZ2V0LCBjdXJyZW50VG9vbCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlclRvb2xzID0gdGFyZ2V0LmNsb3Nlc3QoJy5qb2xpLW1lZGlhLWhlYWRlci10b29scycpO1xuICAgIGxldCBhY3RpdmVUb29sID0gbnVsbDtcblxuICAgIGZvciAoY29uc3QgdG9vbCBvZiBbJ2Ryb3B6b25lJywgJ25ldy1kaXJlY3RvcnknLCAncmVuYW1lLWRpcmVjdG9yeSddKSB7XG4gICAgICBjb25zdCB0b29sQ29udGFpbmVyID0gaGVhZGVyVG9vbHMucXVlcnlTZWxlY3RvcignLicgKyB0b29sICsgJy1jb250YWluZXInKTtcblxuICAgICAgaWYgKHRvb2xDb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRvb2wgIT09IGN1cnJlbnRUb29sKSB7XG4gICAgICAgICAgdG9vbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRvb2wgKyAnLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvb2xDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSh0b29sICsgJy1hY3RpdmUnKTtcbiAgICAgICAgICBhY3RpdmVUb29sID0gdG9vbENvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhY3RpdmVUb29sO1xuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VudGVyJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1jb21wb25lbnRdJyk7XG5cbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbXBvbmVudC5jbGljaygpO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1jb21wb25lbnRdJyk7XG5cbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQubWF0Y2hlcygnW2RhdGEtY29tcG9uZW50PWZvbGRlci1jcmVhdGVdJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IGZvbGRlckNyZWF0ZUZvcm0gPSBzd2l0Y2hUb29sKGNvbXBvbmVudCwgJ25ldy1kaXJlY3RvcnknKTtcbiAgICAgIGZvbGRlckNyZWF0ZUZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbXBvbmVudC5tYXRjaGVzKCdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLXJlbmFtZV0nKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBmb2xkZXJSZW5hbWVGb3JtID0gc3dpdGNoVG9vbChjb21wb25lbnQsICdyZW5hbWUtZGlyZWN0b3J5Jyk7XG4gICAgICBmb2xkZXJSZW5hbWVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQubWF0Y2hlcygnW2RhdGEtY29tcG9uZW50PW1lZGlhLWFkZF0nKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBkcm9wem9uZSA9IHN3aXRjaFRvb2woY29tcG9uZW50LCAnZHJvcHpvbmUnKTtcblxuICAgICAgaWYgKCFkcm9wem9uZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B6b25lLWluaXRpYWxpemVkJykpIHtcbiAgICAgICAgZHJvcHpvbmVJbnN0YW5jZSA9IGFkZERyb3B6b25lKGRyb3B6b25lLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbXBvbmVudD1kcm9wem9uZV0nKSk7XG4gICAgICAgIGRyb3B6b25lLmNsYXNzTGlzdC5hZGQoJ2Ryb3B6b25lLWluaXRpYWxpemVkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZHJvcHpvbmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wem9uZS1hY3RpdmUnKSkge1xuICAgICAgICBkcm9wem9uZUluc3RhbmNlLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb21wb25lbnQubWF0Y2hlcygnW2RhdGEtY29tcG9uZW50PW1lZGlhLXJlbmFtZV0nKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBoZWFkZXJUb29scyA9IGNvbXBvbmVudC5jbG9zZXN0KCcuam9saS1tZWRpYS1oZWFkZXItdG9vbHMnKTtcbiAgICAgIGNvbnN0IGZpbGVSZW5hbWVGb3JtID0gaGVhZGVyVG9vbHMucXVlcnlTZWxlY3RvcignLnJlbmFtZS1maWxlLWNvbnRhaW5lcicpO1xuXG4gICAgICBmaWxlUmVuYW1lRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdyZW5hbWUtYWN0aXZlJyk7XG4gICAgICBmaWxlUmVuYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOlsiY29uZmlndXJlQ2xpcGJvYXJkIiwiY29weSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJidXR0b24iLCJjdXJyZW50VGFyZ2V0IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwicXVlcnlTZWxlY3RvciIsImRhdGFzZXQiLCJjbGlwYm9hcmRUYXJnZXQiLCJpbm5lclRleHQiLCJ0aGVuIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsImNvbmZpZ3VyZVRyaXhUb29sYmFyIiwidG9vbGJhciIsImJ1dHRvblJvdyIsIndpZGdldCIsImNsb3Nlc3QiLCJlZGl0b3IiLCJpZCIsImdldEF0dHJpYnV0ZSIsIm1vZGFsIiwiYm9keSIsImFwcGVuZENoaWxkIiwibW9kYWxDb250ZW50IiwiY29uY2F0IiwiZmV0Y2hGb2xkZXIiLCJ1cmwiLCJmZXRjaCIsInJlc3BvbnNlIiwidGV4dCIsImNvbmZpZ3VyZU1vZGFsIiwiaHRtbCIsImlubmVySFRNTCIsImhhbmRsZUVkaXQiLCJzdG9wUHJvcGFnYXRpb24iLCJmb2xkZXIiLCJocmVmIiwiaGFuZGxlTW9kYWxDbGljayIsInRhcmdldCIsInRhZ05hbWUiLCJhdHRyaWJ1dGVzIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwidmFsdWUiLCJtZWRpYVRlbXBsYXRlIiwibWVkaWFVcmwiLCJtZWRpYVR5cGUiLCJpbnNlcnRIVE1MIiwibWVkaWFPcmlnaW5hbFRlbXBsYXRlIiwiYXR0YWNobWVudCIsIlRyaXgiLCJBdHRhY2htZW50IiwiY29udGVudCIsImluc2VydEF0dGFjaG1lbnQiLCJtZWRpYUZvbGRlciIsImNsb3NlTW9kYWwiLCJoYW5kbGVNb2RhbFN1Ym1pdCIsImZvcm0iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYWN0aW9uIiwibWV0aG9kIiwiaGVhZGVycyIsImNsb3NlQnV0dG9ucyIsIml0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJidXR0b25Hcm91cCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0aXRsZSIsInNwYWNlciIsImJlZm9yZSIsIkRyb3B6b25lIiwiYWRkRHJvcHpvbmUiLCJhcmd1bWVudHMiLCJkcm9wem9uZSIsImNvbmZpZyIsImRyb3B6b25lQ29uZmlnIiwiSlNPTiIsInBhcnNlIiwiZGVmYXVsdENvbmZpZyIsImFkZFJlbW92ZUxpbmtzIiwibWF4RmlsZXNpemUiLCJwYXJhbU5hbWUiLCJwcmV2aWV3VGVtcGxhdGUiLCJ0aHVtYm5haWxXaWR0aCIsInRodW1ibmFpbEhlaWdodCIsInNlbmRpbmciLCJmaWxlIiwieGhyIiwicHJldmlld0VsZW1lbnQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiX3Jlc3BvbnNlJGZpbGVzJCIsInJlc3BvbnNlVGV4dCIsImZpbGVzIiwibGluayIsImZpbGVJbmZvIiwibGlua0VsZW1lbnQiLCJtZWRpYUZ1bGxVcmwiLCJtZWRpYVByZXZpZXciLCJfb2JqZWN0U3ByZWFkIiwib3BlbkZvbGRlckNob2ljZU1vZGFsIiwiZm9sZGVyQ2hvaWNlQnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJwYWdlQWN0aW9ucyIsImlucHV0RWxlbWVudCIsInNldEZpZWxkVmFsdWUiLCJmb2xkZXJQYXRoIiwidGV4dENvbnRlbnQiLCJjb25maXJtYXRpb24iLCJzdWJtaXQiLCJjb25maWd1cmVGb2xkZXJTZWxlY3RvciIsImZvbGRlclNlbGVjdG9yIiwiY29uZmlndXJlTWVkaWFDaG9pY2VDb250YWluZXIiLCJtZWRpYUNob2ljZUNvbnRhaW5lciIsIm1lZGlhSWQiLCJtZWRpYUNvbnRhaW5lciIsImRlbGV0ZUJ1dHRvbiIsImVkaXRCdXR0b24iLCJoYW5kbGVEZWxldGUiLCJ0ZW1wbGF0ZSIsImNsb25lTm9kZSIsImNvbmZpZ3VyZWQiLCJjb25maWd1cmVNZWRpYVNlbGVjdG9yIiwiY29udGFpbnMiLCJkcm9wem9uZUluc3RhbmNlIiwic3dpdGNoVG9vbCIsImN1cnJlbnRUb29sIiwiaGVhZGVyVG9vbHMiLCJhY3RpdmVUb29sIiwiX2kiLCJfYXJyIiwidG9vbCIsInRvb2xDb250YWluZXIiLCJ0b2dnbGUiLCJrZXkiLCJjb21wb25lbnQiLCJjbGljayIsIm1hdGNoZXMiLCJmb2xkZXJDcmVhdGVGb3JtIiwiZm9jdXMiLCJmb2xkZXJSZW5hbWVGb3JtIiwicmVtb3ZlQWxsRmlsZXMiLCJmaWxlUmVuYW1lRm9ybSJdLCJzb3VyY2VSb290IjoiIn0=