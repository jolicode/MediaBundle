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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/clipboard.js":
/*!******************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/clipboard.js ***!
  \******************************************************************/
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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/dropzone.js":
/*!*****************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/dropzone.js ***!
  \*****************************************************************/
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

/***/ "./src/Bridge/SonataAdmin/assets/js/components/folderSelector.js":
/*!***********************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/folderSelector.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/SonataAdmin/assets/js/components/mediaSelector.js":
/*!**********************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/js/components/mediaSelector.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/Bridge/SonataAdmin/assets/styles/jolimedia.css":
/*!************************************************************!*\
  !*** ./src/Bridge/SonataAdmin/assets/styles/jolimedia.css ***!
  \************************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9saS1tZWRpYS1zb25hdGEtYWRtaW4uZGM1MGViYTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFDQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFVBQVUsU0FBUyxhQUFhO0FBQ3hDLDBDQUEwQyxVQUFVLHNCQUFzQixhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFlBQVk7QUFDcEIsa0RBQWtELGFBQWE7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msd0JBQXdCO0FBQzVEO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEMsYUFBYTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUNBQW1DO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlDQUFpQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RCxrQkFBa0I7QUFDbEIsY0FBYztBQUNkO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsNkJBQTZCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsdUJBQXVCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlDQUFpQztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsMkZBQTJGLFlBQVk7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0EsNERBQTRELDJCQUEyQjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxLQUFLO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSwyRUFBMkUsS0FBSztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEc7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxhQUFhO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDeEgsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0lBRTFFb0ksY0FBYyxDQUFDL0gsU0FBUyxDQUFDeUgsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNoRE0sY0FBYyxDQUFDcEksYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUNnSSxLQUFLLENBQUMsQ0FBQztFQUMxRCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGVsdGFibG90L2Ryb3B6b25lL2Rpc3QvZHJvcHpvbmUubWpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvU29uYXRhQWRtaW4vYXNzZXRzL2pzL2NvbXBvbmVudHMvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9CcmlkZ2UvU29uYXRhQWRtaW4vYXNzZXRzL2pzL2NvbXBvbmVudHMvZHJvcHpvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9Tb25hdGFBZG1pbi9hc3NldHMvanMvY29tcG9uZW50cy9mb2xkZXJTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL1NvbmF0YUFkbWluL2Fzc2V0cy9qcy9jb21wb25lbnRzL21lZGlhU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JyaWRnZS9Tb25hdGFBZG1pbi9hc3NldHMvc3R5bGVzL2pvbGltZWRpYS5jc3M/NGJmYyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvQnJpZGdlL1NvbmF0YUFkbWluL2Fzc2V0cy9qcy9qb2xpLW1lZGlhLXNvbmF0YS1hZG1pbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmZ1bmN0aW9uICRwYXJjZWwkaW50ZXJvcERlZmF1bHQoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhLmRlZmF1bHQgOiBhO1xufVxuLy8gVGhlIEVtaXR0ZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY2FsbCBgLm9uKClgIG9uIERyb3B6b25lIHRvIGxpc3RlblxuLy8gdG8gZXZlbnRzLlxuLy8gSXQgaXMgc3Ryb25nbHkgYmFzZWQgb24gY29tcG9uZW50J3MgZW1pdHRlciBjbGFzcywgYW5kIEkgcmVtb3ZlZCB0aGVcbi8vIGZ1bmN0aW9uYWxpdHkgYmVjYXVzZSBvZiB0aGUgZGVwZW5kZW5jeSBoZWxsIHdpdGggZGlmZmVyZW50IGZyYW1ld29ya3MuXG5jbGFzcyAkNDA0MGFjZmQ4NTg0MzM4ZCRleHBvcnQkMmUyYmNkODczOWFlMDM5IHtcbiAgICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50XG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgLy8gQ3JlYXRlIG5hbWVzcGFjZSBmb3IgdGhpcyBldmVudFxuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudF0pIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSBbXTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykgZm9yIChsZXQgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKWNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAvLyB0cmlnZ2VyIGEgY29ycmVzcG9uZGluZyBET00gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQodGhpcy5tYWtlRXZlbnQoXCJkcm9wem9uZTpcIiArIGV2ZW50LCB7XG4gICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG1ha2VFdmVudChldmVudE5hbWUsIGRldGFpbCkge1xuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IGRldGFpbFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgcGFyYW1zKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJRSAxMSBzdXBwb3J0XG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmb3IgZ2l2ZW4gZXZlbnQuIElmIGZuIGlzIG5vdCBwcm92aWRlZCwgYWxsIGV2ZW50XG4gICAgLy8gbGlzdGVuZXJzIGZvciB0aGF0IGV2ZW50IHdpbGwgYmUgcmVtb3ZlZC4gSWYgbmVpdGhlciBpcyBwcm92aWRlZCwgYWxsXG4gICAgLy8gZXZlbnQgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICBvZmYoZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICAgICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG5cbnZhciAkYzY4YzQzZTFjMTI5NWQzMyRleHBvcnRzID0ge307XG4kYzY4YzQzZTFjMTI5NWQzMyRleHBvcnRzID0gXCI8aHRtbD48aGVhZD48L2hlYWQ+PGJvZHk+PGRpdiBjbGFzcz1cXFwiZHotcHJldmlldyBkei1maWxlLXByZXZpZXdcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotaW1hZ2VcXFwiPjxpbWcgZGF0YS1kei10aHVtYm5haWw9XFxcIlxcXCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJkei1kZXRhaWxzXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZHotc2l6ZVxcXCI+PHNwYW4gZGF0YS1kei1zaXplPVxcXCJcXFwiPjwvc3Bhbj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZHotZmlsZW5hbWVcXFwiPjxzcGFuIGRhdGEtZHotbmFtZT1cXFwiXFxcIj48L3NwYW4+PC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcImR6LXByb2dyZXNzXFxcIj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcImR6LXVwbG9hZFxcXCIgZGF0YS1kei11cGxvYWRwcm9ncmVzcz1cXFwiXFxcIj48L3NwYW4+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcImR6LWVycm9yLW1lc3NhZ2VcXFwiPjxzcGFuIGRhdGEtZHotZXJyb3JtZXNzYWdlPVxcXCJcXFwiPjwvc3Bhbj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcImR6LXN1Y2Nlc3MtbWFya1xcXCI+XFxuICAgIDxzdmcgd2lkdGg9XFxcIjU0XFxcIiBoZWlnaHQ9XFxcIjU0XFxcIiB2aWV3Qm94PVxcXCIwIDAgNTQgNTRcXFwiIGZpbGw9XFxcIndoaXRlXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlxcbiAgICAgIDxwYXRoIGQ9XFxcIk0xMC4yMDcxIDI5Ljc5MjlMMTQuMjkyOSAyNS43MDcxQzE0LjY4MzQgMjUuMzE2NiAxNS4zMTY2IDI1LjMxNjYgMTUuNzA3MSAyNS43MDcxTDIxLjI5MjkgMzEuMjkyOUMyMS42ODM0IDMxLjY4MzQgMjIuMzE2NiAzMS42ODM0IDIyLjcwNzEgMzEuMjkyOUwzOC4yOTI5IDE1LjcwNzFDMzguNjgzNCAxNS4zMTY2IDM5LjMxNjYgMTUuMzE2NiAzOS43MDcxIDE1LjcwNzFMNDMuNzkyOSAxOS43OTI5QzQ0LjE4MzQgMjAuMTgzNCA0NC4xODM0IDIwLjgxNjYgNDMuNzkyOSAyMS4yMDcxTDIyLjcwNzEgNDIuMjkyOUMyMi4zMTY2IDQyLjY4MzQgMjEuNjgzNCA0Mi42ODM0IDIxLjI5MjkgNDIuMjkyOUwxMC4yMDcxIDMxLjIwNzFDOS44MTY1OCAzMC44MTY2IDkuODE2NTggMzAuMTgzNCAxMC4yMDcxIDI5Ljc5MjlaXFxcIj48L3BhdGg+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJkei1lcnJvci1tYXJrXFxcIj5cXG4gICAgPHN2ZyB3aWR0aD1cXFwiNTRcXFwiIGhlaWdodD1cXFwiNTRcXFwiIHZpZXdCb3g9XFxcIjAgMCA1NCA1NFxcXCIgZmlsbD1cXFwid2hpdGVcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+XFxuICAgICAgPHBhdGggZD1cXFwiTTI2LjI5MjkgMjAuMjkyOUwxOS4yMDcxIDEzLjIwNzFDMTguODE2NiAxMi44MTY2IDE4LjE4MzQgMTIuODE2NiAxNy43OTI5IDEzLjIwNzFMMTMuMjA3MSAxNy43OTI5QzEyLjgxNjYgMTguMTgzNCAxMi44MTY2IDE4LjgxNjYgMTMuMjA3MSAxOS4yMDcxTDIwLjI5MjkgMjYuMjkyOUMyMC42ODM0IDI2LjY4MzQgMjAuNjgzNCAyNy4zMTY2IDIwLjI5MjkgMjcuNzA3MUwxMy4yMDcxIDM0Ljc5MjlDMTIuODE2NiAzNS4xODM0IDEyLjgxNjYgMzUuODE2NiAxMy4yMDcxIDM2LjIwNzFMMTcuNzkyOSA0MC43OTI5QzE4LjE4MzQgNDEuMTgzNCAxOC44MTY2IDQxLjE4MzQgMTkuMjA3MSA0MC43OTI5TDI2LjI5MjkgMzMuNzA3MUMyNi42ODM0IDMzLjMxNjYgMjcuMzE2NiAzMy4zMTY2IDI3LjcwNzEgMzMuNzA3MUwzNC43OTI5IDQwLjc5MjlDMzUuMTgzNCA0MS4xODM0IDM1LjgxNjYgNDEuMTgzNCAzNi4yMDcxIDQwLjc5MjlMNDAuNzkyOSAzNi4yMDcxQzQxLjE4MzQgMzUuODE2NiA0MS4xODM0IDM1LjE4MzQgNDAuNzkyOSAzNC43OTI5TDMzLjcwNzEgMjcuNzA3MUMzMy4zMTY2IDI3LjMxNjYgMzMuMzE2NiAyNi42ODM0IDMzLjcwNzEgMjYuMjkyOUw0MC43OTI5IDE5LjIwNzFDNDEuMTgzNCAxOC44MTY2IDQxLjE4MzQgMTguMTgzNCA0MC43OTI5IDE3Ljc5MjlMMzYuMjA3MSAxMy4yMDcxQzM1LjgxNjYgMTIuODE2NiAzNS4xODM0IDEyLjgxNjYgMzQuNzkyOSAxMy4yMDcxTDI3LjcwNzEgMjAuMjkyOUMyNy4zMTY2IDIwLjY4MzQgMjYuNjgzNCAyMC42ODM0IDI2LjI5MjkgMjAuMjkyOVpcXFwiPjwvcGF0aD5cXG4gICAgPC9zdmc+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48L2JvZHk+PC9odG1sPlwiO1xuXG5cbmxldCAkNGNhMzY3MTgyNzc2ZjgwYiR2YXIkZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgLyoqXG4gICAqIEhhcyB0byBiZSBzcGVjaWZpZWQgb24gZWxlbWVudHMgb3RoZXIgdGhhbiBmb3JtIChvciB3aGVuIHRoZSBmb3JtIGRvZXNuJ3RcbiAgICogaGF2ZSBhbiBgYWN0aW9uYCBhdHRyaWJ1dGUpLlxuICAgKlxuICAgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBgZmlsZXNgIGFuZFxuICAgKiBgZGF0YUJsb2Nrc2AgIGFuZCBtdXN0IHJldHVybiB0aGUgdXJsIGFzIHN0cmluZy5cbiAgICovIHVybDogbnVsbCxcbiAgICAvKipcbiAgICogQ2FuIGJlIGNoYW5nZWQgdG8gYFwicHV0XCJgIGlmIG5lY2Vzc2FyeS4gWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBmdW5jdGlvblxuICAgKiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmQgbXVzdCByZXR1cm4gdGhlIG1ldGhvZCAoc2luY2UgYHYzLjEyLjBgKS5cbiAgICovIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgLyoqXG4gICAqIFdpbGwgYmUgc2V0IG9uIHRoZSBYSFJlcXVlc3QuXG4gICAqLyB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBUaGUgdGltZW91dCBmb3IgdGhlIFhIUiByZXF1ZXN0cyBpbiBtaWxsaXNlY29uZHMgKHNpbmNlIGB2NC40LjBgKS5cbiAgICogSWYgc2V0IHRvIG51bGwgb3IgMCwgbm8gdGltZW91dCBpcyBnb2luZyB0byBiZSBzZXQuXG4gICAqLyB0aW1lb3V0OiBudWxsLFxuICAgIC8qKlxuICAgKiBIb3cgbWFueSBmaWxlIHVwbG9hZHMgdG8gcHJvY2VzcyBpbiBwYXJhbGxlbCAoU2VlIHRoZVxuICAgKiBFbnF1ZXVpbmcgZmlsZSB1cGxvYWRzIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvKVxuICAgKi8gcGFyYWxsZWxVcGxvYWRzOiAyLFxuICAgIC8qKlxuICAgKiBXaGV0aGVyIHRvIHNlbmQgbXVsdGlwbGUgZmlsZXMgaW4gb25lIHJlcXVlc3QuIElmXG4gICAqIHRoaXMgaXQgc2V0IHRvIHRydWUsIHRoZW4gdGhlIGZhbGxiYWNrIGZpbGUgaW5wdXQgZWxlbWVudCB3aWxsXG4gICAqIGhhdmUgdGhlIGBtdWx0aXBsZWAgYXR0cmlidXRlIGFzIHdlbGwuIFRoaXMgb3B0aW9uIHdpbGxcbiAgICogYWxzbyB0cmlnZ2VyIGFkZGl0aW9uYWwgZXZlbnRzIChsaWtlIGBwcm9jZXNzaW5nbXVsdGlwbGVgKS4gU2VlIHRoZSBldmVudHNcbiAgICogZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi8gdXBsb2FkTXVsdGlwbGU6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBXaGV0aGVyIHlvdSB3YW50IGZpbGVzIHRvIGJlIHVwbG9hZGVkIGluIGNodW5rcyB0byB5b3VyIHNlcnZlci4gVGhpcyBjYW4ndCBiZVxuICAgKiB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYHVwbG9hZE11bHRpcGxlYC5cbiAgICpcbiAgICogU2VlIFtjaHVua3NVcGxvYWRlZF0oI2NvbmZpZy1jaHVua3NVcGxvYWRlZCkgZm9yIHRoZSBjYWxsYmFjayB0byBmaW5hbGlzZSBhbiB1cGxvYWQuXG4gICAqLyBjaHVua2luZzogZmFsc2UsXG4gICAgLyoqXG4gICAqIElmIGBjaHVua2luZ2AgaXMgZW5hYmxlZCwgdGhpcyBkZWZpbmVzIHdoZXRoZXIgKipldmVyeSoqIGZpbGUgc2hvdWxkIGJlIGNodW5rZWQsXG4gICAqIGV2ZW4gaWYgdGhlIGZpbGUgc2l6ZSBpcyBiZWxvdyBjaHVua1NpemUuIFRoaXMgbWVhbnMsIHRoYXQgdGhlIGFkZGl0aW9uYWwgY2h1bmtcbiAgICogZm9ybSBkYXRhIHdpbGwgYmUgc3VibWl0dGVkIGFuZCB0aGUgYGNodW5rc1VwbG9hZGVkYCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQuXG4gICAqLyBmb3JjZUNodW5raW5nOiBmYWxzZSxcbiAgICAvKipcbiAgICogSWYgYGNodW5raW5nYCBpcyBgdHJ1ZWAsIHRoZW4gdGhpcyBkZWZpbmVzIHRoZSBjaHVuayBzaXplIGluIGJ5dGVzLlxuICAgKi8gY2h1bmtTaXplOiAyMDk3MTUyLFxuICAgIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBpbmRpdmlkdWFsIGNodW5rcyBvZiBhIGZpbGUgYXJlIGJlaW5nIHVwbG9hZGVkIHNpbXVsdGFuZW91c2x5LlxuICAgKiBUaGUgbGltaXQgb2YgY29uY3VycmVudCBjb25uZWN0aW9ucyBpcyBnb3Zlcm5lZCBieSBgcGFyYWxsZWxVcGxvYWRzYC5cbiAgICovIHBhcmFsbGVsQ2h1bmtVcGxvYWRzOiBmYWxzZSxcbiAgICAvKipcbiAgICogV2hldGhlciBhIGNodW5rIHNob3VsZCBiZSByZXRyaWVkIGlmIGl0IGZhaWxzLlxuICAgKi8gcmV0cnlDaHVua3M6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBJZiBgcmV0cnlDaHVua3NgIGlzIHRydWUsIGhvdyBtYW55IHRpbWVzIHNob3VsZCBpdCBiZSByZXRyaWVkLlxuICAgKi8gcmV0cnlDaHVua3NMaW1pdDogMyxcbiAgICAvKipcbiAgICogVGhlIG1heGltdW0gZmlsZXNpemUgKGluIE1pQikgdGhhdCBpcyBhbGxvd2VkIHRvIGJlIHVwbG9hZGVkLlxuICAgKi8gbWF4RmlsZXNpemU6IDI1NixcbiAgICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZpbGUgcGFyYW0gdGhhdCBnZXRzIHRyYW5zZmVycmVkLlxuICAgKiAqKk5PVEUqKjogSWYgeW91IGhhdmUgdGhlIG9wdGlvbiAgYHVwbG9hZE11bHRpcGxlYCBzZXQgdG8gYHRydWVgLCB0aGVuXG4gICAqIERyb3B6b25lIHdpbGwgYXBwZW5kIGBbXWAgdG8gdGhlIG5hbWUuXG4gICAqLyBwYXJhbU5hbWU6IFwiZmlsZVwiLFxuICAgIC8qKlxuICAgKiBXaGV0aGVyIHRodW1ibmFpbHMgZm9yIGltYWdlcyBzaG91bGQgYmUgZ2VuZXJhdGVkXG4gICAqLyBjcmVhdGVJbWFnZVRodW1ibmFpbHM6IHRydWUsXG4gICAgLyoqXG4gICAqIEluIE1CLiBXaGVuIHRoZSBmaWxlbmFtZSBleGNlZWRzIHRoaXMgbGltaXQsIHRoZSB0aHVtYm5haWwgd2lsbCBub3QgYmUgZ2VuZXJhdGVkLlxuICAgKi8gbWF4VGh1bWJuYWlsRmlsZXNpemU6IDEwLFxuICAgIC8qKlxuICAgKiBJZiBgbnVsbGAsIHRoZSByYXRpbyBvZiB0aGUgaW1hZ2Ugd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSBpdC5cbiAgICovIHRodW1ibmFpbFdpZHRoOiAxMjAsXG4gICAgLyoqXG4gICAqIFRoZSBzYW1lIGFzIGB0aHVtYm5haWxXaWR0aGAuIElmIGJvdGggYXJlIG51bGwsIGltYWdlcyB3aWxsIG5vdCBiZSByZXNpemVkLlxuICAgKi8gdGh1bWJuYWlsSGVpZ2h0OiAxMjAsXG4gICAgLyoqXG4gICAqIEhvdyB0aGUgaW1hZ2VzIHNob3VsZCBiZSBzY2FsZWQgZG93biBpbiBjYXNlIGJvdGgsIGB0aHVtYm5haWxXaWR0aGAgYW5kIGB0aHVtYm5haWxIZWlnaHRgIGFyZSBwcm92aWRlZC5cbiAgICogQ2FuIGJlIGVpdGhlciBgY29udGFpbmAgb3IgYGNyb3BgLlxuICAgKi8gdGh1bWJuYWlsTWV0aG9kOiBcImNyb3BcIixcbiAgICAvKipcbiAgICogSWYgc2V0LCBpbWFnZXMgd2lsbCBiZSByZXNpemVkIHRvIHRoZXNlIGRpbWVuc2lvbnMgYmVmb3JlIGJlaW5nICoqdXBsb2FkZWQqKi5cbiAgICogSWYgb25seSBvbmUsIGByZXNpemVXaWR0aGAgKipvcioqIGByZXNpemVIZWlnaHRgIGlzIHByb3ZpZGVkLCB0aGUgb3JpZ2luYWwgYXNwZWN0XG4gICAqIHJhdGlvIG9mIHRoZSBmaWxlIHdpbGwgYmUgcHJlc2VydmVkLlxuICAgKlxuICAgKiBUaGUgYG9wdGlvbnMudHJhbnNmb3JtRmlsZWAgZnVuY3Rpb24gdXNlcyB0aGVzZSBvcHRpb25zLCBzbyBpZiB0aGUgYHRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uXG4gICAqIGlzIG92ZXJyaWRkZW4sIHRoZXNlIG9wdGlvbnMgZG9uJ3QgZG8gYW55dGhpbmcuXG4gICAqLyByZXNpemVXaWR0aDogbnVsbCxcbiAgICAvKipcbiAgICogU2VlIGByZXNpemVXaWR0aGAuXG4gICAqLyByZXNpemVIZWlnaHQ6IG51bGwsXG4gICAgLyoqXG4gICAqIFRoZSBtaW1lIHR5cGUgb2YgdGhlIHJlc2l6ZWQgaW1hZ2UgKGJlZm9yZSBpdCBnZXRzIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIpLlxuICAgKiBJZiBgbnVsbGAgdGhlIG9yaWdpbmFsIG1pbWUgdHlwZSB3aWxsIGJlIHVzZWQuIFRvIGZvcmNlIGpwZWcsIGZvciBleGFtcGxlLCB1c2UgYGltYWdlL2pwZWdgLlxuICAgKiBTZWUgYHJlc2l6ZVdpZHRoYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovIHJlc2l6ZU1pbWVUeXBlOiBudWxsLFxuICAgIC8qKlxuICAgKiBUaGUgcXVhbGl0eSBvZiB0aGUgcmVzaXplZCBpbWFnZXMuIFNlZSBgcmVzaXplV2lkdGhgLlxuICAgKi8gcmVzaXplUXVhbGl0eTogMC44LFxuICAgIC8qKlxuICAgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgcmVzaXplV2lkdGhgIGFuZCBgcmVzaXplSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXG4gICAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cbiAgICovIHJlc2l6ZU1ldGhvZDogXCJjb250YWluXCIsXG4gICAgLyoqXG4gICAqIFRoZSBiYXNlIHRoYXQgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlICoqZGlzcGxheWVkKiogZmlsZXNpemUuIFlvdSBjYW5cbiAgICogY2hhbmdlIHRoaXMgdG8gMTAyNCBpZiB5b3Ugd291bGQgcmF0aGVyIGRpc3BsYXkga2liaWJ5dGVzLCBtZWJpYnl0ZXMsXG4gICAqIGV0Yy4uLiAxMDI0IGlzIHRlY2huaWNhbGx5IGluY29ycmVjdCwgYmVjYXVzZSBgMTAyNCBieXRlc2AgYXJlIGAxIGtpYmlieXRlYFxuICAgKiBub3QgYDEga2lsb2J5dGVgLiBZb3UgY2FuIGNoYW5nZSB0aGlzIHRvIGAxMDI0YCBpZiB5b3UgZG9uJ3QgY2FyZSBhYm91dFxuICAgKiB2YWxpZGl0eS5cbiAgICovIGZpbGVzaXplQmFzZTogMTAwMCxcbiAgICAvKipcbiAgICogSWYgbm90IGBudWxsYCBkZWZpbmVzIGhvdyBtYW55IGZpbGVzIHRoaXMgRHJvcHpvbmUgaGFuZGxlcy4gSWYgaXQgZXhjZWVkcyxcbiAgICogdGhlIGV2ZW50IGBtYXhmaWxlc2V4Y2VlZGVkYCB3aWxsIGJlIGNhbGxlZC4gVGhlIGRyb3B6b25lIGVsZW1lbnQgZ2V0cyB0aGVcbiAgICogY2xhc3MgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBhY2NvcmRpbmdseSBzbyB5b3UgY2FuIHByb3ZpZGUgdmlzdWFsXG4gICAqIGZlZWRiYWNrLlxuICAgKi8gbWF4RmlsZXM6IG51bGwsXG4gICAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIG9iamVjdCB0byBzZW5kIGFkZGl0aW9uYWwgaGVhZGVycyB0byB0aGUgc2VydmVyLiBFZzpcbiAgICogYHsgXCJNeS1Bd2Vzb21lLUhlYWRlclwiOiBcImhlYWRlciB2YWx1ZVwiIH1gXG4gICAqLyBoZWFkZXJzOiBudWxsLFxuICAgIC8qKlxuICAgKiBTaG91bGQgdGhlIGRlZmF1bHQgaGVhZGVycyBiZSBzZXQgb3Igbm90P1xuICAgKiBBY2NlcHQ6IGFwcGxpY2F0aW9uL2pzb24gPC0gZm9yIHJlcXVlc3RpbmcganNvbiByZXNwb25zZVxuICAgKiBDYWNoZS1Db250cm9sOiBuby1jYWNoZSA8LSBSZXF1ZXN0IHNob3VsZG4ndCBiZSBjYWNoZWRcbiAgICogWC1SZXF1ZXN0ZWQtV2l0aDogWE1MSHR0cFJlcXVlc3QgPC0gV2Ugc2VudCB0aGUgcmVxdWVzdCB2aWEgWE1MSHR0cFJlcXVlc3RcbiAgICovIGRlZmF1bHRIZWFkZXJzOiB0cnVlLFxuICAgIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBkcm9wem9uZSBlbGVtZW50IGl0c2VsZiB3aWxsIGJlIGNsaWNrYWJsZSwgaWYgYGZhbHNlYFxuICAgKiBub3RoaW5nIHdpbGwgYmUgY2xpY2thYmxlLlxuICAgKlxuICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhbiBIVE1MIGVsZW1lbnQsIGEgQ1NTIHNlbGVjdG9yIChmb3IgbXVsdGlwbGUgZWxlbWVudHMpXG4gICAqIG9yIGFuIGFycmF5IG9mIHRob3NlLiBJbiB0aGF0IGNhc2UsIGFsbCBvZiB0aG9zZSBlbGVtZW50cyB3aWxsIHRyaWdnZXIgYW5cbiAgICogdXBsb2FkIHdoZW4gY2xpY2tlZC5cbiAgICovIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAvKipcbiAgICogV2hldGhlciBoaWRkZW4gZmlsZXMgaW4gZGlyZWN0b3JpZXMgc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAqLyBpZ25vcmVIaWRkZW5GaWxlczogdHJ1ZSxcbiAgICAvKipcbiAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYGFjY2VwdGAgY2hlY2tzIHRoZSBmaWxlJ3MgbWltZSB0eXBlIG9yXG4gICAqIGV4dGVuc2lvbiBhZ2FpbnN0IHRoaXMgbGlzdC4gVGhpcyBpcyBhIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIG1pbWVcbiAgICogdHlwZXMgb3IgZmlsZSBleHRlbnNpb25zLlxuICAgKlxuICAgKiBFZy46IGBpbWFnZS8qLGFwcGxpY2F0aW9uL3BkZiwucHNkYFxuICAgKlxuICAgKiBJZiB0aGUgRHJvcHpvbmUgaXMgYGNsaWNrYWJsZWAgdGhpcyBvcHRpb24gd2lsbCBhbHNvIGJlIHVzZWQgYXNcbiAgICogW2BhY2NlcHRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0hUTUwvRWxlbWVudC9pbnB1dCNhdHRyLWFjY2VwdClcbiAgICogcGFyYW1ldGVyIG9uIHRoZSBoaWRkZW4gZmlsZSBpbnB1dCBhcyB3ZWxsLlxuICAgKi8gYWNjZXB0ZWRGaWxlczogbnVsbCxcbiAgICAvKipcbiAgICogSWYgZmFsc2UsIGZpbGVzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJ1dCB0aGUgcXVldWUgd2lsbCBub3QgYmVcbiAgICogcHJvY2Vzc2VkIGF1dG9tYXRpY2FsbHkuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgbmVlZCBzb21lIGFkZGl0aW9uYWwgdXNlciBpbnB1dCBiZWZvcmUgc2VuZGluZ1xuICAgKiBmaWxlcyAob3IgaWYgeW91IHdhbnQgd2FudCBhbGwgZmlsZXMgc2VudCBhdCBvbmNlKS5cbiAgICogSWYgeW91J3JlIHJlYWR5IHRvIHNlbmQgdGhlIGZpbGUgc2ltcGx5IGNhbGwgYG15RHJvcHpvbmUucHJvY2Vzc1F1ZXVlKClgLlxuICAgKlxuICAgKiBTZWUgdGhlIFtlbnF1ZXVpbmcgZmlsZSB1cGxvYWRzXSgjZW5xdWV1aW5nLWZpbGUtdXBsb2FkcykgZG9jdW1lbnRhdGlvblxuICAgKiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi8gYXV0b1Byb2Nlc3NRdWV1ZTogdHJ1ZSxcbiAgICAvKipcbiAgICogSWYgZmFsc2UsIGZpbGVzIGFkZGVkIHRvIHRoZSBkcm9wem9uZSB3aWxsIG5vdCBiZSBxdWV1ZWQgYnkgZGVmYXVsdC5cbiAgICogWW91J2xsIGhhdmUgdG8gY2FsbCBgZW5xdWV1ZUZpbGUoZmlsZSlgIG1hbnVhbGx5LlxuICAgKi8gYXV0b1F1ZXVlOiB0cnVlLFxuICAgIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoaXMgd2lsbCBhZGQgYSBsaW5rIHRvIGV2ZXJ5IGZpbGUgcHJldmlldyB0byByZW1vdmUgb3IgY2FuY2VsIChpZlxuICAgKiBhbHJlYWR5IHVwbG9hZGluZykgdGhlIGZpbGUuIFRoZSBgZGljdENhbmNlbFVwbG9hZGAsIGBkaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uYFxuICAgKiBhbmQgYGRpY3RSZW1vdmVGaWxlYCBvcHRpb25zIGFyZSB1c2VkIGZvciB0aGUgd29yZGluZy5cbiAgICovIGFkZFJlbW92ZUxpbmtzOiBmYWxzZSxcbiAgICAvKipcbiAgICogRGVmaW5lcyB3aGVyZSB0byBkaXNwbGF5IHRoZSBmaWxlIHByZXZpZXdzIOKAkyBpZiBgbnVsbGAgdGhlXG4gICAqIERyb3B6b25lIGVsZW1lbnQgaXRzZWxmIGlzIHVzZWQuIENhbiBiZSBhIHBsYWluIGBIVE1MRWxlbWVudGAgb3IgYSBDU1NcbiAgICogc2VsZWN0b3IuIFRoZSBlbGVtZW50IHNob3VsZCBoYXZlIHRoZSBgZHJvcHpvbmUtcHJldmlld3NgIGNsYXNzIHNvXG4gICAqIHRoZSBwcmV2aWV3cyBhcmUgZGlzcGxheWVkIHByb3Blcmx5LlxuICAgKi8gcHJldmlld3NDb250YWluZXI6IG51bGwsXG4gICAgLyoqXG4gICAqIFNldCB0aGlzIHRvIGB0cnVlYCBpZiB5b3UgZG9uJ3Qgd2FudCBwcmV2aWV3cyB0byBiZSBzaG93bi5cbiAgICovIGRpc2FibGVQcmV2aWV3czogZmFsc2UsXG4gICAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGVsZW1lbnQgdGhlIGhpZGRlbiBpbnB1dCBmaWVsZCAod2hpY2ggaXMgdXNlZCB3aGVuIGNsaWNraW5nIG9uIHRoZVxuICAgKiBkcm9wem9uZSB0byB0cmlnZ2VyIGZpbGUgc2VsZWN0aW9uKSB3aWxsIGJlIGFwcGVuZGVkIHRvLiBUaGlzIG1pZ2h0XG4gICAqIGJlIGltcG9ydGFudCBpbiBjYXNlIHlvdSB1c2UgZnJhbWV3b3JrcyB0byBzd2l0Y2ggdGhlIGNvbnRlbnQgb2YgeW91ciBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgYSBzZWxlY3RvciBzdHJpbmcsIG9yIGFuIGVsZW1lbnQgZGlyZWN0bHkuXG4gICAqLyBoaWRkZW5JbnB1dENvbnRhaW5lcjogXCJib2R5XCIsXG4gICAgLyoqXG4gICAqIElmIG51bGwsIG5vIGNhcHR1cmUgdHlwZSB3aWxsIGJlIHNwZWNpZmllZFxuICAgKiBJZiBjYW1lcmEsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSBjYW1lcmFcbiAgICogSWYgbWljcm9waG9uZSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIHRoZSBtaWNyb3Bob25lXG4gICAqIElmIGNhbWNvcmRlciwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIHRoZSBjYW1lcmEgaW4gdmlkZW8gbW9kZVxuICAgKiBPbiBhcHBsZSBkZXZpY2VzIG11bHRpcGxlIG11c3QgYmUgc2V0IHRvIGZhbHNlLiAgQWNjZXB0ZWRGaWxlcyBtYXkgbmVlZCB0b1xuICAgKiBiZSBzZXQgdG8gYW4gYXBwcm9wcmlhdGUgbWltZSB0eXBlIChlLmcuIFwiaW1hZ2UvKlwiLCBcImF1ZGlvLypcIiwgb3IgXCJ2aWRlby8qXCIpLlxuICAgKi8gY2FwdHVyZTogbnVsbCxcbiAgICAvKipcbiAgICogKipEZXByZWNhdGVkKiouIFVzZSBgcmVuYW1lRmlsZWAgaW5zdGVhZC5cbiAgICovIHJlbmFtZUZpbGVuYW1lOiBudWxsLFxuICAgIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZCBiZWZvcmUgdGhlIGZpbGUgaXMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlciBhbmQgcmVuYW1lcyB0aGUgZmlsZS5cbiAgICogVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBgRmlsZWAgYXMgYXJndW1lbnQgYW5kIGNhbiB1c2UgdGhlIGBmaWxlLm5hbWVgLiBUaGUgYWN0dWFsIG5hbWUgb2YgdGhlXG4gICAqIGZpbGUgdGhhdCBnZXRzIHVzZWQgZHVyaW5nIHRoZSB1cGxvYWQgY2FuIGJlIGFjY2Vzc2VkIHRocm91Z2ggYGZpbGUudXBsb2FkLmZpbGVuYW1lYC5cbiAgICovIHJlbmFtZUZpbGU6IG51bGwsXG4gICAgLyoqXG4gICAqIElmIGB0cnVlYCB0aGUgZmFsbGJhY2sgd2lsbCBiZSBmb3JjZWQuIFRoaXMgaXMgdmVyeSB1c2VmdWwgdG8gdGVzdCB5b3VyIHNlcnZlclxuICAgKiBpbXBsZW1lbnRhdGlvbnMgZmlyc3QgYW5kIG1ha2Ugc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgd29ya3MgYXNcbiAgICogZXhwZWN0ZWQgd2l0aG91dCBkcm9wem9uZSBpZiB5b3UgZXhwZXJpZW5jZSBwcm9ibGVtcywgYW5kIHRvIHRlc3RcbiAgICogaG93IHlvdXIgZmFsbGJhY2tzIHdpbGwgbG9vay5cbiAgICovIGZvcmNlRmFsbGJhY2s6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBUaGUgdGV4dCB1c2VkIGJlZm9yZSBhbnkgZmlsZXMgYXJlIGRyb3BwZWQuXG4gICAqLyBkaWN0RGVmYXVsdE1lc3NhZ2U6IFwiRHJvcCBmaWxlcyBoZXJlIHRvIHVwbG9hZFwiLFxuICAgIC8qKlxuICAgKiBUaGUgdGV4dCB0aGF0IHJlcGxhY2VzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgdGV4dCBpdCB0aGUgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgKi8gZGljdEZhbGxiYWNrTWVzc2FnZTogXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBkcmFnJ24nZHJvcCBmaWxlIHVwbG9hZHMuXCIsXG4gICAgLyoqXG4gICAqIFRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBhZGRlZCBiZWZvcmUgdGhlIGZhbGxiYWNrIGZvcm0uXG4gICAqIElmIHlvdSBwcm92aWRlIGEgIGZhbGxiYWNrIGVsZW1lbnQgeW91cnNlbGYsIG9yIGlmIHRoaXMgb3B0aW9uIGlzIGBudWxsYCB0aGlzIHdpbGxcbiAgICogYmUgaWdub3JlZC5cbiAgICovIGRpY3RGYWxsYmFja1RleHQ6IFwiUGxlYXNlIHVzZSB0aGUgZmFsbGJhY2sgZm9ybSBiZWxvdyB0byB1cGxvYWQgeW91ciBmaWxlcyBsaWtlIGluIHRoZSBvbGRlbiBkYXlzLlwiLFxuICAgIC8qKlxuICAgKiBJZiB0aGUgZmlsZXNpemUgaXMgdG9vIGJpZy5cbiAgICogYHt7ZmlsZXNpemV9fWAgYW5kIGB7e21heEZpbGVzaXplfX1gIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgcmVzcGVjdGl2ZSBjb25maWd1cmF0aW9uIHZhbHVlcy5cbiAgICovIGRpY3RGaWxlVG9vQmlnOiBcIkZpbGUgaXMgdG9vIGJpZyAoe3tmaWxlc2l6ZX19TWlCKS4gTWF4IGZpbGVzaXplOiB7e21heEZpbGVzaXplfX1NaUIuXCIsXG4gICAgLyoqXG4gICAqIElmIHRoZSBmaWxlIGRvZXNuJ3QgbWF0Y2ggdGhlIGZpbGUgdHlwZS5cbiAgICovIGRpY3RJbnZhbGlkRmlsZVR5cGU6IFwiWW91IGNhbid0IHVwbG9hZCBmaWxlcyBvZiB0aGlzIHR5cGUuXCIsXG4gICAgLyoqXG4gICAqIElmIHRoZSBzZXJ2ZXIgcmVzcG9uc2Ugd2FzIGludmFsaWQuXG4gICAqIGB7e3N0YXR1c0NvZGV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBzZXJ2ZXJzIHN0YXR1cyBjb2RlLlxuICAgKi8gZGljdFJlc3BvbnNlRXJyb3I6IFwiU2VydmVyIHJlc3BvbmRlZCB3aXRoIHt7c3RhdHVzQ29kZX19IGNvZGUuXCIsXG4gICAgLyoqXG4gICAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgdGhlIGNhbmNlbCB1cGxvYWQgbGluay5cbiAgICovIGRpY3RDYW5jZWxVcGxvYWQ6IFwiQ2FuY2VsIHVwbG9hZFwiLFxuICAgIC8qKlxuICAgKiBUaGUgdGV4dCB0aGF0IGlzIGRpc3BsYXllZCBpZiBhbiB1cGxvYWQgd2FzIG1hbnVhbGx5IGNhbmNlbGVkXG4gICAqLyBkaWN0VXBsb2FkQ2FuY2VsZWQ6IFwiVXBsb2FkIGNhbmNlbGVkLlwiLFxuICAgIC8qKlxuICAgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgZm9yIGNvbmZpcm1hdGlvbiB3aGVuIGNhbmNlbGxpbmcgdXBsb2FkLlxuICAgKi8gZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbjogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHRoaXMgdXBsb2FkP1wiLFxuICAgIC8qKlxuICAgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgdG8gcmVtb3ZlIGEgZmlsZS5cbiAgICovIGRpY3RSZW1vdmVGaWxlOiBcIlJlbW92ZSBmaWxlXCIsXG4gICAgLyoqXG4gICAqIElmIHRoaXMgaXMgbm90IG51bGwsIHRoZW4gdGhlIHVzZXIgd2lsbCBiZSBwcm9tcHRlZCBiZWZvcmUgcmVtb3ZpbmcgYSBmaWxlLlxuICAgKi8gZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb246IG51bGwsXG4gICAgLyoqXG4gICAqIERpc3BsYXllZCBpZiBgbWF4RmlsZXNgIGlzIHN0IGFuZCBleGNlZWRlZC5cbiAgICogVGhlIHN0cmluZyBge3ttYXhGaWxlc319YCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSBjb25maWd1cmF0aW9uIHZhbHVlLlxuICAgKi8gZGljdE1heEZpbGVzRXhjZWVkZWQ6IFwiWW91IGNhbm5vdCB1cGxvYWQgYW55IG1vcmUgZmlsZXMuXCIsXG4gICAgLyoqXG4gICAqIEFsbG93cyB5b3UgdG8gdHJhbnNsYXRlIHRoZSBkaWZmZXJlbnQgdW5pdHMuIFN0YXJ0aW5nIHdpdGggYHRiYCBmb3IgdGVyYWJ5dGVzIGFuZCBnb2luZyBkb3duIHRvXG4gICAqIGBiYCBmb3IgYnl0ZXMuXG4gICAqLyBkaWN0RmlsZVNpemVVbml0czoge1xuICAgICAgICB0YjogXCJUQlwiLFxuICAgICAgICBnYjogXCJHQlwiLFxuICAgICAgICBtYjogXCJNQlwiLFxuICAgICAgICBrYjogXCJLQlwiLFxuICAgICAgICBiOiBcImJcIlxuICAgIH0sXG4gICAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGRyb3B6b25lIGluaXRpYWxpemVkXG4gICAqIFlvdSBjYW4gYWRkIGV2ZW50IGxpc3RlbmVycyBoZXJlXG4gICAqLyBpbml0ICgpIHt9LFxuICAgIC8qKlxuICAgKiBDYW4gYmUgYW4gKipvYmplY3QqKiBvZiBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gdHJhbnNmZXIgdG8gdGhlIHNlcnZlciwgKipvcioqIGEgYEZ1bmN0aW9uYFxuICAgKiB0aGF0IGdldHMgaW52b2tlZCB3aXRoIHRoZSBgZmlsZXNgLCBgeGhyYCBhbmQsIGlmIGl0J3MgYSBjaHVua2VkIHVwbG9hZCwgYGNodW5rYCBhcmd1bWVudHMuIEluIGNhc2VcbiAgICogb2YgYSBmdW5jdGlvbiwgdGhpcyBuZWVkcyB0byByZXR1cm4gYSBtYXAuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZyBmb3Igbm9ybWFsIHVwbG9hZHMsIGJ1dCBhZGRzIHJlbGV2YW50IGluZm9ybWF0aW9uIGZvclxuICAgKiBjaHVua2VkIHVwbG9hZHMuXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIHNhbWUgYXMgYWRkaW5nIGhpZGRlbiBpbnB1dCBmaWVsZHMgaW4gdGhlIGZvcm0gZWxlbWVudC5cbiAgICovIHBhcmFtcyAoZmlsZXMsIHhociwgY2h1bmspIHtcbiAgICAgICAgaWYgKGNodW5rKSByZXR1cm4ge1xuICAgICAgICAgICAgZHp1dWlkOiBjaHVuay5maWxlLnVwbG9hZC51dWlkLFxuICAgICAgICAgICAgZHpjaHVua2luZGV4OiBjaHVuay5pbmRleCxcbiAgICAgICAgICAgIGR6dG90YWxmaWxlc2l6ZTogY2h1bmsuZmlsZS5zaXplLFxuICAgICAgICAgICAgZHpjaHVua3NpemU6IHRoaXMub3B0aW9ucy5jaHVua1NpemUsXG4gICAgICAgICAgICBkenRvdGFsY2h1bmtjb3VudDogY2h1bmsuZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50LFxuICAgICAgICAgICAgZHpjaHVua2J5dGVvZmZzZXQ6IGNodW5rLmluZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBnZXRzIGEgW2ZpbGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvRE9NL0ZpbGUpXG4gICAqIGFuZCBhIGBkb25lYCBmdW5jdGlvbiBhcyBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBJZiB0aGUgZG9uZSBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCB0aGUgZmlsZSBpcyBcImFjY2VwdGVkXCIgYW5kIHdpbGxcbiAgICogYmUgcHJvY2Vzc2VkLiBJZiB5b3UgcGFzcyBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZCwgYW5kIHRoZSBlcnJvclxuICAgKiBtZXNzYWdlIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGNhbGxlZCBpZiB0aGUgZmlsZSBpcyB0b28gYmlnIG9yIGRvZXNuJ3QgbWF0Y2ggdGhlIG1pbWUgdHlwZXMuXG4gICAqLyBhY2NlcHQgKGZpbGUsIGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiBhbGwgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBmb3IgYSBmaWxlLlxuICAgKiBJdCBnZXRzIHRoZSBmaWxlIGZvciB3aGljaCB0aGUgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLFxuICAgKiBhbmQgdGhlIGBkb25lYCBmdW5jdGlvbiBhcyBzZWNvbmQuIGBkb25lKClgIG5lZWRzIHRvIGJlIGludm9rZWQgd2hlbiBldmVyeXRoaW5nXG4gICAqIG5lZWRlZCB0byBmaW5pc2ggdGhlIHVwbG9hZCBwcm9jZXNzIGlzIGRvbmUuXG4gICAqLyBjaHVua3NVcGxvYWRlZDogZnVuY3Rpb24oZmlsZSwgZG9uZSkge1xuICAgICAgICBkb25lKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICogU2VuZHMgdGhlIGZpbGUgYXMgYmluYXJ5IGJsb2IgaW4gYm9keSBpbnN0ZWFkIG9mIGZvcm0gZGF0YS5cbiAgICogSWYgdGhpcyBpcyBzZXQsIHRoZSBgcGFyYW1zYCBvcHRpb24gd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBJdCdzIGFuIGVycm9yIHRvIHNldCB0aGlzIHRvIGB0cnVlYCBhbG9uZyB3aXRoIGB1cGxvYWRNdWx0aXBsZWAgc2luY2VcbiAgICogbXVsdGlwbGUgZmlsZXMgY2Fubm90IGJlIGluIGEgc2luZ2xlIGJpbmFyeSBib2R5LlxuICAgKi8gYmluYXJ5Qm9keTogZmFsc2UsXG4gICAgLyoqXG4gICAqIEdldHMgY2FsbGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gc2hvd3MgdGhlIGZhbGxiYWNrIGlucHV0IGZpZWxkIGFuZCBhZGRzXG4gICAqIGEgdGV4dC5cbiAgICovIGZhbGxiYWNrICgpIHtcbiAgICAgICAgLy8gVGhpcyBjb2RlIHNob3VsZCBwYXNzIGluIElFNy4uLiA6KFxuICAgICAgICBsZXQgbWVzc2FnZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBgJHt0aGlzLmVsZW1lbnQuY2xhc3NOYW1lfSBkei1icm93c2VyLW5vdC1zdXBwb3J0ZWRgO1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIikpaWYgKC8oXnwgKWR6LW1lc3NhZ2UoJHwgKS8udGVzdChjaGlsZC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBtZXNzYWdlRWxlbWVudCA9IGNoaWxkO1xuICAgICAgICAgICAgY2hpbGQuY2xhc3NOYW1lID0gXCJkei1tZXNzYWdlXCI7IC8vIFJlbW92ZXMgdGhlICdkei1kZWZhdWx0JyBjbGFzc1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQgPSAoMCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSkuY3JlYXRlRWxlbWVudCgnPGRpdiBjbGFzcz1cImR6LW1lc3NhZ2VcIj48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcGFuID0gbWVzc2FnZUVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzcGFuXCIpWzBdO1xuICAgICAgICBpZiAoc3Bhbikge1xuICAgICAgICAgICAgaWYgKHNwYW4udGV4dENvbnRlbnQgIT0gbnVsbCkgc3Bhbi50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xuICAgICAgICAgICAgZWxzZSBpZiAoc3Bhbi5pbm5lclRleHQgIT0gbnVsbCkgc3Bhbi5pbm5lclRleHQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0RmFsbGJhY2tGb3JtKCkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIEdldHMgY2FsbGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGh1bWJuYWlsIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEl0IGdldHMgYGZpbGVgLCBgd2lkdGhgIGFuZCBgaGVpZ2h0YCAoYm90aCBtYXkgYmUgYG51bGxgKSBhcyBwYXJhbWV0ZXJzIGFuZCBtdXN0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZzpcbiAgICpcbiAgICogIC0gYHNyY1dpZHRoYCAmIGBzcmNIZWlnaHRgIChyZXF1aXJlZClcbiAgICogIC0gYHRyZ1dpZHRoYCAmIGB0cmdIZWlnaHRgIChyZXF1aXJlZClcbiAgICogIC0gYHNyY1hgICYgYHNyY1lgIChvcHRpb25hbCwgZGVmYXVsdCBgMGApXG4gICAqICAtIGB0cmdYYCAmIGB0cmdZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuICAgKlxuICAgKiBUaG9zZSB2YWx1ZXMgYXJlIGdvaW5nIHRvIGJlIHVzZWQgYnkgYGN0eC5kcmF3SW1hZ2UoKWAuXG4gICAqLyByZXNpemUgKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCkge1xuICAgICAgICBsZXQgaW5mbyA9IHtcbiAgICAgICAgICAgIHNyY1g6IDAsXG4gICAgICAgICAgICBzcmNZOiAwLFxuICAgICAgICAgICAgc3JjV2lkdGg6IGZpbGUud2lkdGgsXG4gICAgICAgICAgICBzcmNIZWlnaHQ6IGZpbGUuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIGxldCBzcmNSYXRpbyA9IGZpbGUud2lkdGggLyBmaWxlLmhlaWdodDtcbiAgICAgICAgLy8gQXV0b21hdGljYWxseSBjYWxjdWxhdGUgZGltZW5zaW9ucyBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgIGlmICh3aWR0aCA9PSBudWxsICYmIGhlaWdodCA9PSBudWxsKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGluZm8uc3JjV2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBpbmZvLnNyY0hlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA9PSBudWxsKSB3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuICAgICAgICBlbHNlIGlmIChoZWlnaHQgPT0gbnVsbCkgaGVpZ2h0ID0gd2lkdGggLyBzcmNSYXRpbztcbiAgICAgICAgLy8gTWFrZSBzdXJlIGltYWdlcyBhcmVuJ3QgdXBzY2FsZWRcbiAgICAgICAgd2lkdGggPSBNYXRoLm1pbih3aWR0aCwgaW5mby5zcmNXaWR0aCk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgubWluKGhlaWdodCwgaW5mby5zcmNIZWlnaHQpO1xuICAgICAgICBsZXQgdHJnUmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgaWYgKGluZm8uc3JjV2lkdGggPiB3aWR0aCB8fCBpbmZvLnNyY0hlaWdodCA+IGhlaWdodCkge1xuICAgICAgICAgICAgLy8gSW1hZ2UgaXMgYmlnZ2VyIGFuZCBuZWVkcyByZXNjYWxpbmdcbiAgICAgICAgICAgIGlmIChyZXNpemVNZXRob2QgPT09IFwiY3JvcFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zcmNIZWlnaHQgPSBmaWxlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zcmNXaWR0aCA9IGluZm8uc3JjSGVpZ2h0ICogdHJnUmF0aW87XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zcmNXaWR0aCA9IGZpbGUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uc3JjSGVpZ2h0ID0gaW5mby5zcmNXaWR0aCAvIHRyZ1JhdGlvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzaXplTWV0aG9kID09PSBcImNvbnRhaW5cIikge1xuICAgICAgICAgICAgICAgIC8vIE1ldGhvZCAnY29udGFpbidcbiAgICAgICAgICAgICAgICBpZiAoc3JjUmF0aW8gPiB0cmdSYXRpbykgaGVpZ2h0ID0gd2lkdGggLyBzcmNSYXRpbztcbiAgICAgICAgICAgICAgICBlbHNlIHdpZHRoID0gaGVpZ2h0ICogc3JjUmF0aW87XG4gICAgICAgICAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHJlc2l6ZU1ldGhvZCAnJHtyZXNpemVNZXRob2R9J2ApO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uc3JjWCA9IChmaWxlLndpZHRoIC0gaW5mby5zcmNXaWR0aCkgLyAyO1xuICAgICAgICBpbmZvLnNyY1kgPSAoZmlsZS5oZWlnaHQgLSBpbmZvLnNyY0hlaWdodCkgLyAyO1xuICAgICAgICBpbmZvLnRyZ1dpZHRoID0gd2lkdGg7XG4gICAgICAgIGluZm8udHJnSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9LFxuICAgIC8qKlxuICAgKiBDYW4gYmUgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGZpbGUgKGZvciBleGFtcGxlLCByZXNpemUgYW4gaW1hZ2UgaWYgbmVjZXNzYXJ5KS5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBgcmVzaXplV2lkdGhgIGFuZCBgcmVzaXplSGVpZ2h0YCAoaWYgcHJvdmlkZWQpIGFuZCByZXNpemVzXG4gICAqIGltYWdlcyBhY2NvcmRpbmcgdG8gdGhvc2UgZGltZW5zaW9ucy5cbiAgICpcbiAgICogR2V0cyB0aGUgYGZpbGVgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIGFuZCBhIGBkb25lKClgIGZ1bmN0aW9uIGFzIHRoZSBzZWNvbmQsIHRoYXQgbmVlZHNcbiAgICogdG8gYmUgaW52b2tlZCB3aXRoIHRoZSBmaWxlIHdoZW4gdGhlIHRyYW5zZm9ybWF0aW9uIGlzIGRvbmUuXG4gICAqLyB0cmFuc2Zvcm1GaWxlIChmaWxlLCBkb25lKSB7XG4gICAgICAgIGlmICgodGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoIHx8IHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQpICYmIGZpbGUudHlwZS5tYXRjaCgvaW1hZ2UuKi8pKSByZXR1cm4gdGhpcy5yZXNpemVJbWFnZShmaWxlLCB0aGlzLm9wdGlvbnMucmVzaXplV2lkdGgsIHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQsIHRoaXMub3B0aW9ucy5yZXNpemVNZXRob2QsIGRvbmUpO1xuICAgICAgICBlbHNlIHJldHVybiBkb25lKGZpbGUpO1xuICAgIH0sXG4gICAgLyoqXG4gICAqIEEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIHRlbXBsYXRlIHVzZWQgZm9yIGVhY2ggZHJvcHBlZFxuICAgKiBmaWxlLiBDaGFuZ2UgaXQgdG8gZnVsZmlsbCB5b3VyIG5lZWRzIGJ1dCBtYWtlIHN1cmUgdG8gcHJvcGVybHlcbiAgICogcHJvdmlkZSBhbGwgZWxlbWVudHMuXG4gICAqXG4gICAqIElmIHlvdSB3YW50IHRvIHVzZSBhbiBhY3R1YWwgSFRNTCBlbGVtZW50IGluc3RlYWQgb2YgcHJvdmlkaW5nIGEgU3RyaW5nXG4gICAqIGFzIGEgY29uZmlnIG9wdGlvbiwgeW91IGNvdWxkIGNyZWF0ZSBhIGRpdiB3aXRoIHRoZSBpZCBgdHBsYCxcbiAgICogcHV0IHRoZSB0ZW1wbGF0ZSBpbnNpZGUgaXQgYW5kIHByb3ZpZGUgdGhlIGVsZW1lbnQgbGlrZSB0aGlzOlxuICAgKlxuICAgKiAgICAgZG9jdW1lbnRcbiAgICogICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0cGwnKVxuICAgKiAgICAgICAuaW5uZXJIVE1MXG4gICAqXG4gICAqLyBwcmV2aWV3VGVtcGxhdGU6ICgwLCAoLypAX19QVVJFX18qLyRwYXJjZWwkaW50ZXJvcERlZmF1bHQoJGM2OGM0M2UxYzEyOTVkMzMkZXhwb3J0cykpKSxcbiAgICAvKlxuICAgVGhvc2UgZnVuY3Rpb25zIHJlZ2lzdGVyIHRoZW1zZWx2ZXMgdG8gdGhlIGV2ZW50cyBvbiBpbml0IGFuZCBoYW5kbGUgYWxsXG4gICB0aGUgdXNlciBpbnRlcmZhY2Ugc3BlY2lmaWMgc3R1ZmYuIE92ZXJ3cml0aW5nIHRoZW0gd29uJ3QgYnJlYWsgdGhlIHVwbG9hZFxuICAgYnV0IGNhbiBicmVhayB0aGUgd2F5IGl0J3MgZGlzcGxheWVkLlxuICAgWW91IGNhbiBvdmVyd3JpdGUgdGhlbSBpZiB5b3UgZG9uJ3QgbGlrZSB0aGUgZGVmYXVsdCBiZWhhdmlvci4gSWYgeW91IGp1c3RcbiAgIHdhbnQgdG8gYWRkIGFuIGFkZGl0aW9uYWwgZXZlbnQgaGFuZGxlciwgcmVnaXN0ZXIgaXQgb24gdGhlIGRyb3B6b25lIG9iamVjdFxuICAgYW5kIGRvbid0IG92ZXJ3cml0ZSB0aG9zZSBvcHRpb25zLlxuICAgKi8gLy8gVGhvc2UgYXJlIHNlbGYgZXhwbGFuYXRvcnkgYW5kIHNpbXBseSBjb25jZXJuIHRoZSBEcmFnbkRyb3AuXG4gICAgZHJvcCAoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgIH0sXG4gICAgZHJhZ3N0YXJ0IChlKSB7fSxcbiAgICBkcmFnZW5kIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBkcmFnZW50ZXIgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIGRyYWdvdmVyIChlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWRyYWctaG92ZXJcIik7XG4gICAgfSxcbiAgICBkcmFnbGVhdmUgKGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICB9LFxuICAgIHBhc3RlIChlKSB7fSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlcmUgYXJlIG5vIGZpbGVzIGxlZnQgaW4gdGhlIGRyb3B6b25lIGFueW1vcmUsIGFuZCB0aGVcbiAgICAvLyBkcm9wem9uZSBzaG91bGQgYmUgZGlzcGxheWVkIGFzIGlmIGluIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotc3RhcnRlZFwiKTtcbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuIGEgZmlsZSBpcyBhZGRlZCB0byB0aGUgcXVldWVcbiAgICAvLyBSZWNlaXZlcyBgZmlsZWBcbiAgICBhZGRlZGZpbGUgKGZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCA9PT0gdGhpcy5wcmV2aWV3c0NvbnRhaW5lcikgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1zdGFydGVkXCIpO1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3c0NvbnRhaW5lciAmJiAhdGhpcy5vcHRpb25zLmRpc2FibGVQcmV2aWV3cykge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudCA9ICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jcmVhdGVFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUudHJpbSgpKTtcbiAgICAgICAgICAgIGZpbGUucHJldmlld1RlbXBsYXRlID0gZmlsZS5wcmV2aWV3RWxlbWVudDsgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIHRoaXMucHJldmlld3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZS5wcmV2aWV3RWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKHZhciBub2RlIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LW5hbWVdXCIpKW5vZGUudGV4dENvbnRlbnQgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICBmb3IgKG5vZGUgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotc2l6ZV1cIikpbm9kZS5pbm5lckhUTUwgPSB0aGlzLmZpbGVzaXplKGZpbGUuc2l6ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFkZFJlbW92ZUxpbmtzKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5fcmVtb3ZlTGluayA9ICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jcmVhdGVFbGVtZW50KGA8YSBjbGFzcz1cImR6LXJlbW92ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnVuZGVmaW5lZDtcIiBkYXRhLWR6LXJlbW92ZT4ke3RoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZX08L2E+YCk7XG4gICAgICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChmaWxlLl9yZW1vdmVMaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZW1vdmVGaWxlRXZlbnQgPSAoZSk9PntcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5zdGF0dXMgPT09ICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5VUExPQURJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uKSByZXR1cm4gKDAsICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpLmNvbmZpcm0odGhpcy5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb24sICgpPT50aGlzLnJlbW92ZUZpbGUoZmlsZSkpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbikgcmV0dXJuICgwLCAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5KS5jb25maXJtKHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbiwgKCk9PnRoaXMucmVtb3ZlRmlsZShmaWxlKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgcmVtb3ZlTGluayBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1yZW1vdmVdXCIpKXJlbW92ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZUZpbGVFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIENhbGxlZCB3aGVuZXZlciBhIGZpbGUgaXMgcmVtb3ZlZC5cbiAgICByZW1vdmVkZmlsZSAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCAhPSBudWxsICYmIGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZSAhPSBudWxsKSBmaWxlLnByZXZpZXdFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmlsZS5wcmV2aWV3RWxlbWVudCk7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpO1xuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW4gYSB0aHVtYm5haWwgaGFzIGJlZW4gZ2VuZXJhdGVkXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgIGFuZCBgZGF0YVVybGBcbiAgICB0aHVtYm5haWwgKGZpbGUsIGRhdGFVcmwpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWZpbGUtcHJldmlld1wiKTtcbiAgICAgICAgICAgIGZvciAobGV0IHRodW1ibmFpbEVsZW1lbnQgb2YgZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotdGh1bWJuYWlsXVwiKSl7XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsRWxlbWVudC5hbHQgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsRWxlbWVudC5zcmMgPSBkYXRhVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCk9PmZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWltYWdlLXByZXZpZXdcIiksIDEpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgYW4gZXJyb3Igb2NjdXJzXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgIGFuZCBgbWVzc2FnZWBcbiAgICBlcnJvciAoZmlsZSwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotZXJyb3JcIik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwic3RyaW5nXCIgJiYgbWVzc2FnZS5lcnJvcikgbWVzc2FnZSA9IG1lc3NhZ2UuZXJyb3I7XG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LWVycm9ybWVzc2FnZV1cIikpbm9kZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVycm9ybXVsdGlwbGUgKCkge30sXG4gICAgLy8gQ2FsbGVkIHdoZW4gYSBmaWxlIGdldHMgcHJvY2Vzc2VkLiBTaW5jZSB0aGVyZSBpcyBhIHF1ZXVlLCBub3QgYWxsIGFkZGVkXG4gICAgLy8gZmlsZXMgYXJlIHByb2Nlc3NlZCBpbW1lZGlhdGVseS5cbiAgICAvLyBSZWNlaXZlcyBgZmlsZWBcbiAgICBwcm9jZXNzaW5nIChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1wcm9jZXNzaW5nXCIpO1xuICAgICAgICAgICAgaWYgKGZpbGUuX3JlbW92ZUxpbmspIHJldHVybiBmaWxlLl9yZW1vdmVMaW5rLmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwcm9jZXNzaW5nbXVsdGlwbGUgKCkge30sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxuICAgIC8vIFJlY2VpdmVzIGBmaWxlYCwgYHByb2dyZXNzYCAocGVyY2VudGFnZSAwLTEwMCkgYW5kIGBieXRlc1NlbnRgLlxuICAgIC8vIFRvIGdldCB0aGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIG9mIHRoZSBmaWxlLCB1c2UgYGZpbGUuc2l6ZWBcbiAgICB1cGxvYWRwcm9ncmVzcyAoZmlsZSwgcHJvZ3Jlc3MsIGJ5dGVzU2VudCkge1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkgZm9yIChsZXQgbm9kZSBvZiBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei11cGxvYWRwcm9ncmVzc11cIikpbm9kZS5ub2RlTmFtZSA9PT0gXCJQUk9HUkVTU1wiID8gbm9kZS52YWx1ZSA9IHByb2dyZXNzIDogbm9kZS5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzfSVgO1xuICAgIH0sXG4gICAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB0b3RhbCB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxuICAgIC8vIENhbGxlZCB3aXRoIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgKDAtMTAwKSwgdG90YWxCeXRlcyBhbmQgdG90YWxCeXRlc1NlbnRcbiAgICB0b3RhbHVwbG9hZHByb2dyZXNzICgpIHt9LFxuICAgIC8vIENhbGxlZCBqdXN0IGJlZm9yZSB0aGUgZmlsZSBpcyBzZW50LiBHZXRzIHRoZSBgeGhyYCBvYmplY3QgYXMgc2Vjb25kXG4gICAgLy8gcGFyYW1ldGVyLCBzbyB5b3UgY2FuIG1vZGlmeSBpdCAoZm9yIGV4YW1wbGUgdG8gYWRkIGEgQ1NSRiB0b2tlbikgYW5kIGFcbiAgICAvLyBgZm9ybURhdGFgIG9iamVjdCB0byBhZGQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAgICBzZW5kaW5nICgpIHt9LFxuICAgIHNlbmRpbmdtdWx0aXBsZSAoKSB7fSxcbiAgICAvLyBXaGVuIHRoZSBjb21wbGV0ZSB1cGxvYWQgaXMgZmluaXNoZWQgYW5kIHN1Y2Nlc3NmdWxcbiAgICAvLyBSZWNlaXZlcyBgZmlsZWBcbiAgICBzdWNjZXNzIChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSByZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotc3VjY2Vzc1wiKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3NtdWx0aXBsZSAoKSB7fSxcbiAgICAvLyBXaGVuIHRoZSB1cGxvYWQgaXMgY2FuY2VsZWQuXG4gICAgY2FuY2VsZWQgKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChcImVycm9yXCIsIGZpbGUsIHRoaXMub3B0aW9ucy5kaWN0VXBsb2FkQ2FuY2VsZWQpO1xuICAgIH0sXG4gICAgY2FuY2VsZWRtdWx0aXBsZSAoKSB7fSxcbiAgICAvLyBXaGVuIHRoZSB1cGxvYWQgaXMgZmluaXNoZWQsIGVpdGhlciB3aXRoIHN1Y2Nlc3Mgb3IgYW4gZXJyb3IuXG4gICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgY29tcGxldGUgKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUuX3JlbW92ZUxpbmspIGZpbGUuX3JlbW92ZUxpbmsuaW5uZXJIVE1MID0gdGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlO1xuICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkgcmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWNvbXBsZXRlXCIpO1xuICAgIH0sXG4gICAgY29tcGxldGVtdWx0aXBsZSAoKSB7fSxcbiAgICBtYXhmaWxlc2V4Y2VlZGVkICgpIHt9LFxuICAgIG1heGZpbGVzcmVhY2hlZCAoKSB7fSxcbiAgICBxdWV1ZWNvbXBsZXRlICgpIHt9LFxuICAgIGFkZGVkZmlsZXMgKCkge30sXG4gICAgZW1wdHlmb2xkZXIgKCkge31cbn07XG52YXIgJDRjYTM2NzE4Mjc3NmY4MGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSA9ICQ0Y2EzNjcxODI3NzZmODBiJHZhciRkZWZhdWx0T3B0aW9ucztcblxuXG5jbGFzcyAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5IGV4dGVuZHMgKDAsICQ0MDQwYWNmZDg1ODQzMzhkJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpIHtcbiAgICBzdGF0aWMgaW5pdENsYXNzKCkge1xuICAgICAgICAvLyBFeHBvc2luZyB0aGUgZW1pdHRlciBjbGFzcywgbWFpbmx5IGZvciB0ZXN0c1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5FbWl0dGVyID0gKDAsICQ0MDQwYWNmZDg1ODQzMzhkJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkpO1xuICAgICAgICAvKlxuICAgICBUaGlzIGlzIGEgbGlzdCBvZiBhbGwgYXZhaWxhYmxlIGV2ZW50cyB5b3UgY2FuIHJlZ2lzdGVyIG9uIGEgZHJvcHpvbmUgb2JqZWN0LlxuXG4gICAgIFlvdSBjYW4gcmVnaXN0ZXIgYW4gZXZlbnQgaGFuZGxlciBsaWtlIHRoaXM6XG5cbiAgICAgZHJvcHpvbmUub24oXCJkcmFnRW50ZXJcIiwgZnVuY3Rpb24oKSB7IH0pO1xuXG4gICAgICovIHRoaXMucHJvdG90eXBlLmV2ZW50cyA9IFtcbiAgICAgICAgICAgIFwiZHJvcFwiLFxuICAgICAgICAgICAgXCJkcmFnc3RhcnRcIixcbiAgICAgICAgICAgIFwiZHJhZ2VuZFwiLFxuICAgICAgICAgICAgXCJkcmFnZW50ZXJcIixcbiAgICAgICAgICAgIFwiZHJhZ292ZXJcIixcbiAgICAgICAgICAgIFwiZHJhZ2xlYXZlXCIsXG4gICAgICAgICAgICBcImFkZGVkZmlsZVwiLFxuICAgICAgICAgICAgXCJhZGRlZGZpbGVzXCIsXG4gICAgICAgICAgICBcInJlbW92ZWRmaWxlXCIsXG4gICAgICAgICAgICBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICAgICAgXCJlcnJvcm11bHRpcGxlXCIsXG4gICAgICAgICAgICBcInByb2Nlc3NpbmdcIixcbiAgICAgICAgICAgIFwicHJvY2Vzc2luZ211bHRpcGxlXCIsXG4gICAgICAgICAgICBcInVwbG9hZHByb2dyZXNzXCIsXG4gICAgICAgICAgICBcInRvdGFsdXBsb2FkcHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIFwic2VuZGluZ1wiLFxuICAgICAgICAgICAgXCJzZW5kaW5nbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgXCJzdWNjZXNzbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwiY2FuY2VsZWRcIixcbiAgICAgICAgICAgIFwiY2FuY2VsZWRtdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJjb21wbGV0ZVwiLFxuICAgICAgICAgICAgXCJjb21wbGV0ZW11bHRpcGxlXCIsXG4gICAgICAgICAgICBcInJlc2V0XCIsXG4gICAgICAgICAgICBcIm1heGZpbGVzZXhjZWVkZWRcIixcbiAgICAgICAgICAgIFwibWF4ZmlsZXNyZWFjaGVkXCIsXG4gICAgICAgICAgICBcInF1ZXVlY29tcGxldGVcIixcbiAgICAgICAgICAgIFwiZW1wdHlmb2xkZXJcIlxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5fdGh1bWJuYWlsUXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBsZXQgZmFsbGJhY2ssIGxlZnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTsgLy8gQWxsIGZpbGVzXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbGVtZW50ID09PSBcInN0cmluZ1wiKSB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIGFuIEhUTUwgRWxlbWVudFxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSBudWxsIHx8ICF0aGlzLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkcm9wem9uZSBlbGVtZW50OiBub3QgYW4gaW5zdGFuY2Ugb2YgSFRNTEVsZW1lbnQuXCIpO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmRyb3B6b25lKSB0aHJvdyBuZXcgRXJyb3IoXCJEcm9wem9uZSBhbHJlYWR5IGF0dGFjaGVkLlwiKTtcbiAgICAgICAgLy8gTm93IGFkZCB0aGlzIGRyb3B6b25lIHRvIHRoZSBpbnN0YW5jZXMuXG4gICAgICAgICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzLnB1c2godGhpcyk7XG4gICAgICAgIC8vIFB1dCB0aGUgZHJvcHpvbmUgaW5zaWRlIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAgICAgICAgdGhpcy5lbGVtZW50LmRyb3B6b25lID0gdGhpcztcbiAgICAgICAgbGV0IGVsZW1lbnRPcHRpb25zID0gKGxlZnQgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnNGb3JFbGVtZW50KHRoaXMuZWxlbWVudCkpICE9IG51bGwgPyBsZWZ0IDoge307XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sICgwLCAkNGNhMzY3MTgyNzc2ZjgwYiRleHBvcnQkMmUyYmNkODczOWFlMDM5KSwgZWxlbWVudE9wdGlvbnMsIG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMgOiB7fSk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlLnJlcGxhY2UoL1xcbiovZywgXCJcIik7XG4gICAgICAgIC8vIElmIHRoZSBicm93c2VyIGZhaWxlZCwganVzdCBjYWxsIHRoZSBmYWxsYmFjayBhbmQgbGVhdmVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb3JjZUZhbGxiYWNrIHx8ICEkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzQnJvd3NlclN1cHBvcnRlZCgpKSByZXR1cm4gdGhpcy5vcHRpb25zLmZhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgIC8vIEBvcHRpb25zLnVybCA9IEBlbGVtZW50LmdldEF0dHJpYnV0ZSBcImFjdGlvblwiIHVubGVzcyBAb3B0aW9ucy51cmw/XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXJsID09IG51bGwpIHRoaXMub3B0aW9ucy51cmwgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy51cmwpIHRocm93IG5ldyBFcnJvcihcIk5vIFVSTCBwcm92aWRlZC5cIik7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgJiYgdGhpcy5vcHRpb25zLmNodW5raW5nKSB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IHNldCBib3RoOiB1cGxvYWRNdWx0aXBsZSBhbmQgY2h1bmtpbmcuXCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkgJiYgdGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IHNldCBib3RoOiBiaW5hcnlCb2R5IGFuZCB1cGxvYWRNdWx0aXBsZS5cIik7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm1ldGhvZCA9PT0gXCJzdHJpbmdcIikgdGhpcy5vcHRpb25zLm1ldGhvZCA9IHRoaXMub3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYgKChmYWxsYmFjayA9IHRoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSAmJiBmYWxsYmFjay5wYXJlbnROb2RlKSAvLyBSZW1vdmUgdGhlIGZhbGxiYWNrXG4gICAgICAgIGZhbGxiYWNrLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFsbGJhY2spO1xuICAgICAgICAvLyBEaXNwbGF5IHByZXZpZXdzIGluIHRoZSBwcmV2aWV3c0NvbnRhaW5lciBlbGVtZW50IG9yIHRoZSBEcm9wem9uZSBlbGVtZW50IHVubGVzcyBleHBsaWNpdGx5IHNldCB0byBmYWxzZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lcikgdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudCh0aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIsIFwicHJldmlld3NDb250YWluZXJcIik7XG4gICAgICAgICAgICBlbHNlIHRoaXMucHJldmlld3NDb250YWluZXIgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja2FibGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2thYmxlID09PSB0cnVlKSB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5jbGlja2FibGVFbGVtZW50cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudHModGhpcy5vcHRpb25zLmNsaWNrYWJsZSwgXCJjbGlja2FibGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIGFjY2VwdGVkXG4gICAgZ2V0QWNjZXB0ZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS5hY2NlcHRlZCkubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIHJlamVjdGVkXG4gICAgLy8gTm90IHN1cmUgd2hlbiB0aGF0J3MgZ29pbmcgdG8gYmUgdXNlZnVsLCBidXQgYWRkZWQgZm9yIGNvbXBsZXRlbmVzcy5cbiAgICBnZXRSZWplY3RlZEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT4hZmlsZS5hY2NlcHRlZCkubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIGdldEZpbGVzV2l0aFN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlKT0+ZmlsZS5zdGF0dXMgPT09IHN0YXR1cykubWFwKChmaWxlKT0+ZmlsZSk7XG4gICAgfVxuICAgIC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgYXJlIGluIHRoZSBxdWV1ZVxuICAgIGdldFF1ZXVlZEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5RVUVVRUQpO1xuICAgIH1cbiAgICBnZXRVcGxvYWRpbmdGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HKTtcbiAgICB9XG4gICAgZ2V0QWRkZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQpO1xuICAgIH1cbiAgICAvLyBGaWxlcyB0aGF0IGFyZSBlaXRoZXIgcXVldWVkIG9yIHVwbG9hZGluZ1xuICAgIGdldEFjdGl2ZUZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcgfHwgZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBEcm9wem9uZSBpcyBpbml0aWFsaXplZC4gWW91XG4gICAgLy8gY2FuIChhbmQgc2hvdWxkKSBzZXR1cCBldmVudCBsaXN0ZW5lcnMgaW5zaWRlIHRoaXMgZnVuY3Rpb24uXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gSW4gY2FzZSBpdCBpc24ndCBzZXQgYWxyZWFkeVxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09IFwiZm9ybVwiKSB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZW5jdHlwZVwiLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIik7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHpvbmVcIikgJiYgIXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmR6LW1lc3NhZ2VcIikpIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCgkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQoYDxkaXYgY2xhc3M9XCJkei1kZWZhdWx0IGR6LW1lc3NhZ2VcIj48YnV0dG9uIGNsYXNzPVwiZHotYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPiR7dGhpcy5vcHRpb25zLmRpY3REZWZhdWx0TWVzc2FnZX08L2J1dHRvbj48L2Rpdj5gKSk7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHNldHVwSGlkZGVuRmlsZUlucHV0ID0gKCk9PntcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWRkZW5GaWxlSW5wdXQpIHRoaXMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZmlsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJmb3JtXCIsIHRoaXMuZWxlbWVudC5pZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlcyA9PT0gbnVsbCB8fCB0aGlzLm9wdGlvbnMubWF4RmlsZXMgPiAxKSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LmNsYXNzTmFtZSA9IFwiZHotaGlkZGVuLWlucHV0XCI7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzICE9PSBudWxsKSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJhY2NlcHRcIiwgdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2FwdHVyZSAhPT0gbnVsbCkgdGhpcy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwiY2FwdHVyZVwiLCB0aGlzLm9wdGlvbnMuY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgLy8gTWFraW5nIHN1cmUgdGhhdCBubyBvbmUgY2FuIFwidGFiXCIgaW50byB0aGlzIGZpZWxkLlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFyaWFsYWJlbCBmb3IgYTExeVxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJkcm9wem9uZSBoaWRkZW4gaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgLy8gTm90IHNldHRpbmcgYGRpc3BsYXk9XCJub25lXCJgIGJlY2F1c2Ugc29tZSBicm93c2VycyBkb24ndCBhY2NlcHQgY2xpY2tzXG4gICAgICAgICAgICAgICAgLy8gb24gZWxlbWVudHMgdGhhdCBhcmVuJ3QgZGlzcGxheWVkLlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS53aWR0aCA9IFwiMFwiO1xuICAgICAgICAgICAgICAgICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudCh0aGlzLm9wdGlvbnMuaGlkZGVuSW5wdXRDb250YWluZXIsIFwiaGlkZGVuSW5wdXRDb250YWluZXJcIikuYXBwZW5kQ2hpbGQodGhpcy5oaWRkZW5GaWxlSW5wdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgZmlsZXM6IGZpbGVzIH0gPSB0aGlzLmhpZGRlbkZpbGVJbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmFkZEZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImFkZGVkZmlsZXNcIiwgZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNldHVwSGlkZGVuRmlsZUlucHV0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5VUkwgPSB3aW5kb3cuVVJMICE9PSBudWxsID8gd2luZG93LlVSTCA6IHdpbmRvdy53ZWJraXRVUkw7XG4gICAgICAgIC8vIFNldHVwIGFsbCBldmVudCBsaXN0ZW5lcnMgb24gdGhlIERyb3B6b25lIG9iamVjdCBpdHNlbGYuXG4gICAgICAgIC8vIFRoZXkncmUgbm90IGluIEBzZXR1cEV2ZW50TGlzdGVuZXJzKCkgYmVjYXVzZSB0aGV5IHNob3VsZG4ndCBiZSByZW1vdmVkXG4gICAgICAgIC8vIGFnYWluIHdoZW4gdGhlIGRyb3B6b25lIGdldHMgZGlzYWJsZWQuXG4gICAgICAgIGZvciAobGV0IGV2ZW50TmFtZSBvZiB0aGlzLmV2ZW50cyl0aGlzLm9uKGV2ZW50TmFtZSwgdGhpcy5vcHRpb25zW2V2ZW50TmFtZV0pO1xuICAgICAgICB0aGlzLm9uKFwidXBsb2FkcHJvZ3Jlc3NcIiwgKCk9PnRoaXMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpKTtcbiAgICAgICAgdGhpcy5vbihcInJlbW92ZWRmaWxlXCIsICgpPT50aGlzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSk7XG4gICAgICAgIHRoaXMub24oXCJjYW5jZWxlZFwiLCAoZmlsZSk9PnRoaXMuZW1pdChcImNvbXBsZXRlXCIsIGZpbGUpKTtcbiAgICAgICAgLy8gRW1pdCBhIGBxdWV1ZWNvbXBsZXRlYCBldmVudCBpZiBhbGwgZmlsZXMgZmluaXNoZWQgdXBsb2FkaW5nLlxuICAgICAgICB0aGlzLm9uKFwiY29tcGxldGVcIiwgKGZpbGUpPT57XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBZGRlZEZpbGVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGggPT09IDAgJiYgdGhpcy5nZXRRdWV1ZWRGaWxlcygpLmxlbmd0aCA9PT0gMCkgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWZlcnJlZCBzbyB0aGF0IGBxdWV1ZWNvbXBsZXRlYCByZWFsbHkgdHJpZ2dlcnMgYWZ0ZXIgYGNvbXBsZXRlYFxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCk9PnRoaXMuZW1pdChcInF1ZXVlY29tcGxldGVcIiksIDApO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY29udGFpbnNGaWxlcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmRhdGFUcmFuc2Zlci50eXBlcyAmJiBlLmRhdGFUcmFuc2Zlci50eXBlcy5pbmNsdWRlcyhcIkZpbGVzXCIpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgbm9Qcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBmaWxlcywgd2UgZG9uJ3Qgd2FudCB0byBzdG9wXG4gICAgICAgICAgICAvLyBwcm9wYWdhdGlvbiBzbyB3ZSBkb24ndCBpbnRlcmZlcmUgd2l0aCBvdGhlclxuICAgICAgICAgICAgLy8gZHJhZyBhbmQgZHJvcCBiZWhhdmlvdXIuXG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5zRmlsZXMoZSkpIHJldHVybjtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBDcmVhdGUgdGhlIGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdzdGFydDogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ3N0YXJ0XCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnZW50ZXI6IChlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9Qcm9wYWdhdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJkcmFnZW50ZXJcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRyYWdvdmVyOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ha2VzIGl0IHBvc3NpYmxlIHRvIGRyYWcgZmlsZXMgZnJvbSBjaHJvbWUncyBkb3dubG9hZCBiYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk1MjY0MzAvZHJhZy1hbmQtZHJvcC1maWxlLXVwbG9hZHMtZnJvbS1jaHJvbWUtZG93bmxvYWRzLWJhclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWZjdCA9IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCIgPT09IGVmY3QgfHwgXCJsaW5rTW92ZVwiID09PSBlZmN0ID8gXCJtb3ZlXCIgOiBcImNvcHlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ292ZXJcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRyYWdsZWF2ZTogKGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZHJhZ2xlYXZlXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcm9wOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcm9wKGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkcmFnZW5kOiAoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJkcmFnZW5kXCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goKGNsaWNrYWJsZUVsZW1lbnQpPT57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogY2xpY2thYmxlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IChldnQpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHRoZSBhY3R1YWwgZHJvcHpvbmUgb3IgdGhlIG1lc3NhZ2UgZWxlbWVudCBzaG91bGQgdHJpZ2dlciBmaWxlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrYWJsZUVsZW1lbnQgIT09IHRoaXMuZWxlbWVudCB8fCBldnQudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQgfHwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5lbGVtZW50SW5zaWRlKGV2dC50YXJnZXQsIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmR6LW1lc3NhZ2VcIikpKSB0aGlzLmhpZGRlbkZpbGVJbnB1dC5jbGljaygpOyAvLyBGb3J3YXJkIHRoZSBjbGlja1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICAvLyBOb3QgZnVsbHkgdGVzdGVkIHlldFxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW5GaWxlSW5wdXQgIT0gbnVsbCA/IHRoaXMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGUgOiB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5oaWRkZW5GaWxlSW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZHJvcHpvbmU7XG4gICAgICAgIHJldHVybiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lmluc3RhbmNlcy5zcGxpY2UoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKSwgMSk7XG4gICAgfVxuICAgIHVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSB7XG4gICAgICAgIGxldCB0b3RhbFVwbG9hZFByb2dyZXNzO1xuICAgICAgICBsZXQgdG90YWxCeXRlc1NlbnQgPSAwO1xuICAgICAgICBsZXQgdG90YWxCeXRlcyA9IDA7XG4gICAgICAgIGxldCBhY3RpdmVGaWxlcyA9IHRoaXMuZ2V0QWN0aXZlRmlsZXMoKTtcbiAgICAgICAgaWYgKGFjdGl2ZUZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiB0aGlzLmdldEFjdGl2ZUZpbGVzKCkpe1xuICAgICAgICAgICAgICAgIHRvdGFsQnl0ZXNTZW50ICs9IGZpbGUudXBsb2FkLmJ5dGVzU2VudDtcbiAgICAgICAgICAgICAgICB0b3RhbEJ5dGVzICs9IGZpbGUudXBsb2FkLnRvdGFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxVcGxvYWRQcm9ncmVzcyA9IDEwMCAqIHRvdGFsQnl0ZXNTZW50IC8gdG90YWxCeXRlcztcbiAgICAgICAgfSBlbHNlIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJ0b3RhbHVwbG9hZHByb2dyZXNzXCIsIHRvdGFsVXBsb2FkUHJvZ3Jlc3MsIHRvdGFsQnl0ZXMsIHRvdGFsQnl0ZXNTZW50KTtcbiAgICB9XG4gICAgLy8gQG9wdGlvbnMucGFyYW1OYW1lIGNhbiBiZSBhIGZ1bmN0aW9uIHRha2luZyBvbmUgcGFyYW1ldGVyIHJhdGhlciB0aGFuIGEgc3RyaW5nLlxuICAgIC8vIEEgcGFyYW1ldGVyIG5hbWUgZm9yIGEgZmlsZSBpcyBvYnRhaW5lZCBzaW1wbHkgYnkgY2FsbGluZyB0aGlzIHdpdGggYW4gaW5kZXggbnVtYmVyLlxuICAgIF9nZXRQYXJhbU5hbWUobikge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUobik7XG4gICAgICAgIGVsc2UgcmV0dXJuIGAke3RoaXMub3B0aW9ucy5wYXJhbU5hbWV9JHt0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgPyBgWyR7bn1dYCA6IFwiXCJ9YDtcbiAgICB9XG4gICAgLy8gSWYgQG9wdGlvbnMucmVuYW1lRmlsZSBpcyBhIGZ1bmN0aW9uLFxuICAgIC8vIHRoZSBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgdG8gcmVuYW1lIHRoZSBmaWxlLm5hbWUgYmVmb3JlIGFwcGVuZGluZyBpdCB0byB0aGUgZm9ybURhdGEuXG4gICAgLy8gTWFjT1MgMTQrIHNjcmVlbnNob3RzIGNvbnRhaW4gbmFycm93IG5vbi1icmVha2luZyBzcGFjZSAoVSsyMDJGKSBjaGFyYWN0ZXJzIGluIGZpbGVuYW1lcyBcbiAgICAvLyAoZS5nLiwgXCJTY3JlZW5zaG90IDIwMjQtMDEtMzAgYXQgMTAuMzIuMDcgQU0ucG5nXCIgd2hlcmUgdGhlIHNwYWNlIGFmdGVyIFwiMDdcIiBhbmQgYmVmb3JlIFwiQU1cIiBpcyBVKzIwMkYpLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gbm93IHJlcGxhY2VzIHRoZXNlIHdpdGggcmVndWxhciBzcGFjZXMgdG8gcHJldmVudCB1cGxvYWQgaXNzdWVzIGFuZCBtYWludGFpbiBjb21wYXRpYmlsaXR5IHdpdGggTWFjT1NcbiAgICBfcmVuYW1lRmlsZShmaWxlKSB7XG4gICAgICAgIGNvbnN0IGNsZWFuRmlsZSA9IHtcbiAgICAgICAgICAgIC4uLmZpbGUsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUucmVwbGFjZSgvXFx1MjAyRi9nLCAnICcpXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGNsZWFuRmlsZS5uYW1lO1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUoY2xlYW5GaWxlKTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBhIGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBmYWxsYmFjayBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IERyYWduRHJvcFxuICAgIC8vXG4gICAgLy8gSWYgdGhlIGRyb3B6b25lIGlzIGFscmVhZHkgYSBmb3JtLCBvbmx5IHRoZSBpbnB1dCBmaWVsZCBhbmQgYnV0dG9uIGFyZSByZXR1cm5lZC4gT3RoZXJ3aXNlIGEgY29tcGxldGUgZm9ybSBlbGVtZW50IGlzIHByb3ZpZGVkLlxuICAgIC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcbiAgICBnZXRGYWxsYmFja0Zvcm0oKSB7XG4gICAgICAgIGxldCBleGlzdGluZ0ZhbGxiYWNrLCBmb3JtO1xuICAgICAgICBpZiAoZXhpc3RpbmdGYWxsYmFjayA9IHRoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSByZXR1cm4gZXhpc3RpbmdGYWxsYmFjaztcbiAgICAgICAgbGV0IGZpZWxkc1N0cmluZyA9ICc8ZGl2IGNsYXNzPVwiZHotZmFsbGJhY2tcIj4nO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQpIGZpZWxkc1N0cmluZyArPSBgPHA+JHt0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrVGV4dH08L3A+YDtcbiAgICAgICAgZmllbGRzU3RyaW5nICs9IGA8aW5wdXQgdHlwZT1cImZpbGVcIiBuYW1lPVwiJHt0aGlzLl9nZXRQYXJhbU5hbWUoMCl9XCIgJHt0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6IHVuZGVmaW5lZH0gLz48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiVXBsb2FkIVwiPjwvZGl2PmA7XG4gICAgICAgIGxldCBmaWVsZHMgPSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQoZmllbGRzU3RyaW5nKTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lICE9PSBcIkZPUk1cIikge1xuICAgICAgICAgICAgZm9ybSA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuY3JlYXRlRWxlbWVudChgPGZvcm0gYWN0aW9uPVwiJHt0aGlzLm9wdGlvbnMudXJsfVwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgbWV0aG9kPVwiJHt0aGlzLm9wdGlvbnMubWV0aG9kfVwiPjwvZm9ybT5gKTtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBlbmN0eXBlIGFuZCBtZXRob2QgYXR0cmlidXRlcyBhcmUgc2V0IHByb3Blcmx5XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZW5jdHlwZVwiLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIik7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWV0aG9kXCIsIHRoaXMub3B0aW9ucy5tZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgPyBmb3JtIDogZmllbGRzO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIHRoZSBmYWxsYmFjayBlbGVtZW50cyBpZiB0aGV5IGV4aXN0IGFscmVhZHlcbiAgICAvL1xuICAgIC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcbiAgICBnZXRFeGlzdGluZ0ZhbGxiYWNrKCkge1xuICAgICAgICBsZXQgZ2V0RmFsbGJhY2sgPSBmdW5jdGlvbihlbGVtZW50cykge1xuICAgICAgICAgICAgZm9yIChsZXQgZWwgb2YgZWxlbWVudHMpe1xuICAgICAgICAgICAgICAgIGlmICgvKF58IClmYWxsYmFjaygkfCApLy50ZXN0KGVsLmNsYXNzTmFtZSkpIHJldHVybiBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgdGFnTmFtZSBvZiBbXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgXCJmb3JtXCJcbiAgICAgICAgXSl7XG4gICAgICAgICAgICB2YXIgZmFsbGJhY2s7XG4gICAgICAgICAgICBpZiAoZmFsbGJhY2sgPSBnZXRGYWxsYmFjayh0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkpKSByZXR1cm4gZmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKChlbGVtZW50TGlzdGVuZXJzKT0+KCgpPT57XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKCkpO1xuICAgIH1cbiAgICAvLyBEZWFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5tYXAoKGVsZW1lbnRMaXN0ZW5lcnMpPT4oKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yKGxldCBldmVudCBpbiBlbGVtZW50TGlzdGVuZXJzLmV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlbWVudExpc3RlbmVycy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgfVxuICAgIC8vIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQgY2FuY2VscyBhbGwgZmlsZXMgaW4gdGhlIHF1ZXVlIG9yIGJlaW5nIHByb2Nlc3NlZC5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpPT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1jbGlja2FibGVcIikpO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5tYXAoKGZpbGUpPT50aGlzLmNhbmNlbFVwbG9hZChmaWxlKSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCk9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWNsaWNrYWJsZVwiKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBhIG5pY2VseSBmb3JtYXR0ZWQgZmlsZXNpemVcbiAgICBmaWxlc2l6ZShzaXplKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFNpemUgPSAwO1xuICAgICAgICBsZXQgc2VsZWN0ZWRVbml0ID0gXCJiXCI7XG4gICAgICAgIGlmIChzaXplID4gMCkge1xuICAgICAgICAgICAgbGV0IHVuaXRzID0gW1xuICAgICAgICAgICAgICAgIFwidGJcIixcbiAgICAgICAgICAgICAgICBcImdiXCIsXG4gICAgICAgICAgICAgICAgXCJtYlwiLFxuICAgICAgICAgICAgICAgIFwia2JcIixcbiAgICAgICAgICAgICAgICBcImJcIlxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1bml0cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHVuaXQgPSB1bml0c1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY3V0b2ZmID0gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpIC8gMTA7XG4gICAgICAgICAgICAgICAgaWYgKHNpemUgPj0gY3V0b2ZmKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2l6ZSA9IHNpemUgLyBNYXRoLnBvdyh0aGlzLm9wdGlvbnMuZmlsZXNpemVCYXNlLCA0IC0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVW5pdCA9IHVuaXQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkU2l6ZSA9IE1hdGgucm91bmQoMTAgKiBzZWxlY3RlZFNpemUpIC8gMTA7IC8vIEN1dHRpbmcgb2YgZGlnaXRzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGA8c3Ryb25nPiR7c2VsZWN0ZWRTaXplfTwvc3Ryb25nPiAke3RoaXMub3B0aW9ucy5kaWN0RmlsZVNpemVVbml0c1tzZWxlY3RlZFVuaXRdfWA7XG4gICAgfVxuICAgIC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBjbGFzcyBmcm9tIHRoZSBmb3JtLlxuICAgIF91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlcyAhPSBudWxsICYmIHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPT09IHRoaXMub3B0aW9ucy5tYXhGaWxlcykgdGhpcy5lbWl0KFwibWF4ZmlsZXNyZWFjaGVkXCIsIHRoaXMuZmlsZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotbWF4LWZpbGVzLXJlYWNoZWRcIik7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1tYXgtZmlsZXMtcmVhY2hlZFwiKTtcbiAgICB9XG4gICAgZHJvcChlKSB7XG4gICAgICAgIGlmICghZS5kYXRhVHJhbnNmZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5lbWl0KFwiZHJvcFwiLCBlKTtcbiAgICAgICAgLy8gQ29udmVydCB0aGUgRmlsZUxpc3QgdG8gYW4gQXJyYXlcbiAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgZm9yIElFMTFcbiAgICAgICAgbGV0IGZpbGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlLmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGg7IGkrKylmaWxlc1tpXSA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzW2ldO1xuICAgICAgICAvLyBFdmVuIGlmIGl0J3MgYSBmb2xkZXIsIGZpbGVzLmxlbmd0aCB3aWxsIGNvbnRhaW4gdGhlIGZvbGRlcnMuXG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB7IGl0ZW1zOiBpdGVtcyB9ID0gZS5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoICYmIGl0ZW1zWzBdLndlYmtpdEdldEFzRW50cnkgIT0gbnVsbCkgLy8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgZHJvcHBpbmcgb2YgZm9sZGVycywgc28gaGFuZGxlIGl0ZW1zIGluc3RlYWQgb2YgZmlsZXNcbiAgICAgICAgICAgIHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkZWRmaWxlc1wiLCBmaWxlcyk7XG4gICAgfVxuICAgIHBhc3RlKGUpIHtcbiAgICAgICAgaWYgKCQzZWQyNjlmMmYwZmIyMjRiJHZhciRfX2d1YXJkX18oZSAhPSBudWxsID8gZS5jbGlwYm9hcmREYXRhIDogdW5kZWZpbmVkLCAoeCk9PnguaXRlbXMpID09IG51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5lbWl0KFwicGFzdGVcIiwgZSk7XG4gICAgICAgIGxldCB7IGl0ZW1zOiBpdGVtcyB9ID0gZS5jbGlwYm9hcmREYXRhO1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoKSByZXR1cm4gdGhpcy5fYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpO1xuICAgIH1cbiAgICBoYW5kbGVGaWxlcyhmaWxlcykge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXRoaXMuYWRkRmlsZShmaWxlKTtcbiAgICB9XG4gICAgLy8gV2hlbiBhIGZvbGRlciBpcyBkcm9wcGVkIChvciBmaWxlcyBhcmUgcGFzdGVkKSwgaXRlbXMgbXVzdCBiZSBoYW5kbGVkXG4gICAgLy8gaW5zdGVhZCBvZiBmaWxlcy5cbiAgICBfYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuICgoKT0+e1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcyl7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5O1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLndlYmtpdEdldEFzRW50cnkgIT0gbnVsbCAmJiAoZW50cnkgPSBpdGVtLndlYmtpdEdldEFzRW50cnkoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkgcmVzdWx0LnB1c2godGhpcy5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIC8vIEFwcGVuZCBhbGwgZmlsZXMgZnJvbSB0aGF0IGRpcmVjdG9yeSB0byBmaWxlc1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZW50cnksIGVudHJ5Lm5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5nZXRBc0ZpbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5raW5kID09IG51bGwgfHwgaXRlbS5raW5kID09PSBcImZpbGVcIikgcmVzdWx0LnB1c2godGhpcy5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSkoKTtcbiAgICB9XG4gICAgLy8gR29lcyB0aHJvdWdoIHRoZSBkaXJlY3RvcnksIGFuZCBhZGRzIGVhY2ggZmlsZSBpdCBmaW5kcyByZWN1cnNpdmVseVxuICAgIF9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZGlyZWN0b3J5LCBwYXRoKSB7XG4gICAgICAgIGxldCBkaXJSZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgIGxldCBlcnJvckhhbmRsZXIgPSAoZXJyb3IpPT4kM2VkMjY5ZjJmMGZiMjI0YiR2YXIkX19ndWFyZE1ldGhvZF9fKGNvbnNvbGUsIFwibG9nXCIsIChvKT0+by5sb2coZXJyb3IpKTtcbiAgICAgICAgbGV0IGVudHJ5Q291bnQgPSAwO1xuICAgICAgICB2YXIgcmVhZEVudHJpZXMgPSAoKT0+e1xuICAgICAgICAgICAgcmV0dXJuIGRpclJlYWRlci5yZWFkRW50cmllcygoZW50cmllcyk9PntcbiAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIGVudHJpZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrZW50cnlDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5maWxlKChmaWxlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlnbm9yZUhpZGRlbkZpbGVzICYmIGZpbGUubmFtZS5zdWJzdHJpbmcoMCwgMSkgPT09IFwiLlwiKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuZnVsbFBhdGggPSBgJHtwYXRofS8ke2ZpbGUubmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkgdGhpcy5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBgJHtwYXRofS8ke2VudHJ5Lm5hbWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgY2FsbCByZWFkRW50cmllcygpIGFnYWluLCBzaW5jZSBicm93c2VyIG9ubHkgaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCAxMDAgZW50cmllcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRGlyZWN0b3J5UmVhZGVyI3JlYWRFbnRyaWVzXG4gICAgICAgICAgICAgICAgICAgIHJlYWRFbnRyaWVzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbnRyeUNvdW50ID09PSAwKSB0aGlzLmVtaXQoXCJlbXB0eWZvbGRlclwiLCBwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sIGVycm9ySGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZWFkRW50cmllcygpO1xuICAgIH1cbiAgICAvLyBJZiBgZG9uZSgpYCBpcyBjYWxsZWQgd2l0aG91dCBhcmd1bWVudCB0aGUgZmlsZSBpcyBhY2NlcHRlZFxuICAgIC8vIElmIHlvdSBjYWxsIGl0IHdpdGggYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWRcbiAgICAvLyAoVGhpcyBhbGxvd3MgZm9yIGFzeW5jaHJvbm91cyB2YWxpZGF0aW9uKVxuICAgIC8vXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBjaGVja3MgdGhlIGZpbGVzaXplLCBhbmQgaWYgdGhlIGZpbGUudHlwZSBwYXNzZXMgdGhlXG4gICAgLy8gYGFjY2VwdGVkRmlsZXNgIGNoZWNrLlxuICAgIGFjY2VwdChmaWxlLCBkb25lKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUgJiYgZmlsZS5zaXplID4gdGhpcy5vcHRpb25zLm1heEZpbGVzaXplICogMTA0ODU3NikgZG9uZSh0aGlzLm9wdGlvbnMuZGljdEZpbGVUb29CaWcucmVwbGFjZShcInt7ZmlsZXNpemV9fVwiLCBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQgLyAxMC4yNCkgLyAxMDApLnJlcGxhY2UoXCJ7e21heEZpbGVzaXplfX1cIiwgdGhpcy5vcHRpb25zLm1heEZpbGVzaXplKSk7XG4gICAgICAgIGVsc2UgaWYgKCEkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmlzVmFsaWRGaWxlKGZpbGUsIHRoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKSkgZG9uZSh0aGlzLm9wdGlvbnMuZGljdEludmFsaWRGaWxlVHlwZSk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlcyAhPSBudWxsICYmIHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcbiAgICAgICAgICAgIGRvbmUodGhpcy5vcHRpb25zLmRpY3RNYXhGaWxlc0V4Y2VlZGVkLnJlcGxhY2UoXCJ7e21heEZpbGVzfX1cIiwgdGhpcy5vcHRpb25zLm1heEZpbGVzKSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJtYXhmaWxlc2V4Y2VlZGVkXCIsIGZpbGUpO1xuICAgICAgICB9IGVsc2UgdGhpcy5vcHRpb25zLmFjY2VwdC5jYWxsKHRoaXMsIGZpbGUsIGRvbmUpO1xuICAgIH1cbiAgICBhZGRGaWxlKGZpbGUpIHtcbiAgICAgICAgZmlsZS51cGxvYWQgPSB7XG4gICAgICAgICAgICAvLyBub3RlOiB0aGlzIG9ubHkgd29ya3MgaWYgd2luZG93LmlzU2VjdXJlQ29udGV4dCBpcyB0cnVlLCB3aGljaCBpbmNsdWRlcyBsb2NhbGhvc3QgaW4gaHR0cFxuICAgICAgICAgICAgdXVpZDogd2luZG93LmlzU2VjdXJlQ29udGV4dCA/IHNlbGYuY3J5cHRvLnJhbmRvbVVVSUQoKSA6ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkudXVpZHY0KCksXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIC8vIFNldHRpbmcgdGhlIHRvdGFsIHVwbG9hZCBzaXplIHRvIGZpbGUuc2l6ZSBmb3IgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gSXQncyBhY3R1YWwgZGlmZmVyZW50IHRoYW4gdGhlIHNpemUgdG8gYmUgdHJhbnNtaXR0ZWQuXG4gICAgICAgICAgICB0b3RhbDogZmlsZS5zaXplLFxuICAgICAgICAgICAgYnl0ZXNTZW50OiAwLFxuICAgICAgICAgICAgZmlsZW5hbWU6IHRoaXMuX3JlbmFtZUZpbGUoZmlsZSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQURERUQ7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZGVkZmlsZVwiLCBmaWxlKTtcbiAgICAgICAgdGhpcy5fZW5xdWV1ZVRodW1ibmFpbChmaWxlKTtcbiAgICAgICAgdGhpcy5hY2NlcHQoZmlsZSwgKGVycm9yKT0+e1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5hY2NlcHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yUHJvY2Vzc2luZyhbXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICAgICAgICBdLCBlcnJvcik7IC8vIFdpbGwgc2V0IHRoZSBmaWxlLnN0YXR1c1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWxlLmFjY2VwdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9RdWV1ZSkgdGhpcy5lbnF1ZXVlRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgLy8gV2lsbCBzZXQgLmFjY2VwdGVkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFdyYXBwZXIgZm9yIGVucXVldWVGaWxlXG4gICAgZW5xdWV1ZUZpbGVzKGZpbGVzKSB7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpdGhpcy5lbnF1ZXVlRmlsZShmaWxlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVucXVldWVGaWxlKGZpbGUpIHtcbiAgICAgICAgaWYgKGZpbGUuc3RhdHVzID09PSAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkFEREVEICYmIGZpbGUuYWNjZXB0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5RVUVVRUQ7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHJldHVybiBzZXRUaW1lb3V0KCgpPT50aGlzLnByb2Nlc3NRdWV1ZSgpLCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXG4gICAgICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGZpbGUgY2FuJ3QgYmUgcXVldWVkIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQgb3Igd2FzIHJlamVjdGVkLlwiKTtcbiAgICB9XG4gICAgX2VucXVldWVUaHVtYm5haWwoZmlsZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNyZWF0ZUltYWdlVGh1bWJuYWlscyAmJiBmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSAmJiBmaWxlLnNpemUgPD0gdGhpcy5vcHRpb25zLm1heFRodW1ibmFpbEZpbGVzaXplICogMTA0ODU3Nikge1xuICAgICAgICAgICAgdGhpcy5fdGh1bWJuYWlsUXVldWUucHVzaChmaWxlKTtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpPT50aGlzLl9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKSwgMCk7IC8vIERlZmVycmluZyB0aGUgY2FsbFxuICAgICAgICB9XG4gICAgfVxuICAgIF9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsIHx8IHRoaXMuX3RodW1ibmFpbFF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZpbGUgPSB0aGlzLl90aHVtYm5haWxRdWV1ZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoZmlsZSwgdGhpcy5vcHRpb25zLnRodW1ibmFpbFdpZHRoLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsSGVpZ2h0LCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsTWV0aG9kLCB0cnVlLCAoZGF0YVVybCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInRodW1ibmFpbFwiLCBmaWxlLCBkYXRhVXJsKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENhbiBiZSBjYWxsZWQgYnkgdGhlIHVzZXIgdG8gcmVtb3ZlIGEgZmlsZVxuICAgIHJlbW92ZUZpbGUoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HKSB0aGlzLmNhbmNlbFVwbG9hZChmaWxlKTtcbiAgICAgICAgdGhpcy5maWxlcyA9ICQzZWQyNjlmMmYwZmIyMjRiJHZhciR3aXRob3V0KHRoaXMuZmlsZXMsIGZpbGUpO1xuICAgICAgICB0aGlzLmVtaXQoXCJyZW1vdmVkZmlsZVwiLCBmaWxlKTtcbiAgICAgICAgaWYgKHRoaXMuZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5lbWl0KFwicmVzZXRcIik7XG4gICAgfVxuICAgIC8vIFJlbW92ZXMgYWxsIGZpbGVzIHRoYXQgYXJlbid0IGN1cnJlbnRseSBwcm9jZXNzZWQgZnJvbSB0aGUgbGlzdFxuICAgIHJlbW92ZUFsbEZpbGVzKGNhbmNlbElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGNvcHkgb2YgZmlsZXMgc2luY2UgcmVtb3ZlRmlsZSgpIGNoYW5nZXMgdGhlIEBmaWxlcyBhcnJheS5cbiAgICAgICAgaWYgKGNhbmNlbElmTmVjZXNzYXJ5ID09IG51bGwpIGNhbmNlbElmTmVjZXNzYXJ5ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5maWxlcy5zbGljZSgpKWlmIChmaWxlLnN0YXR1cyAhPT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcgfHwgY2FuY2VsSWZOZWNlc3NhcnkpIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIFJlc2l6ZXMgYW4gaW1hZ2UgYmVmb3JlIGl0IGdldHMgc2VudCB0byB0aGUgc2VydmVyLiBUaGlzIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mXG4gICAgLy8gYG9wdGlvbnMudHJhbnNmb3JtRmlsZWAgaWYgYHJlc2l6ZVdpZHRoYCBvciBgcmVzaXplSGVpZ2h0YCBhcmUgc2V0LiBUaGUgY2FsbGJhY2sgaXMgaW52b2tlZCB3aXRoXG4gICAgLy8gdGhlIHJlc2l6ZWQgYmxvYi5cbiAgICByZXNpemVJbWFnZShmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIHRydWUsIChkYXRhVXJsLCBjYW52YXMpPT57XG4gICAgICAgICAgICBpZiAoY2FudmFzID09IG51bGwpIC8vIFRoZSBpbWFnZSBoYXMgbm90IGJlZW4gcmVzaXplZFxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZpbGUpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHsgcmVzaXplTWltZVR5cGU6IHJlc2l6ZU1pbWVUeXBlIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZU1pbWVUeXBlID09IG51bGwpIHJlc2l6ZU1pbWVUeXBlID0gZmlsZS50eXBlO1xuICAgICAgICAgICAgICAgIGxldCByZXNpemVkRGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwocmVzaXplTWltZVR5cGUsIHRoaXMub3B0aW9ucy5yZXNpemVRdWFsaXR5KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzaXplTWltZVR5cGUgPT09IFwiaW1hZ2UvanBlZ1wiIHx8IHJlc2l6ZU1pbWVUeXBlID09PSBcImltYWdlL2pwZ1wiKSAvLyBOb3cgYWRkIHRoZSBvcmlnaW5hbCBFWElGIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgcmVzaXplZERhdGFVUkwgPSAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkcmVzdG9yZUV4aWYoZmlsZS5kYXRhVVJMLCByZXNpemVkRGF0YVVSTCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZGF0YVVSSXRvQmxvYihyZXNpemVkRGF0YVVSTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG4gICAgY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZml4T3JpZW50YXRpb24sIGNhbGxiYWNrLCBpZ25vcmVFeGlmID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICBmaWxlLmRhdGFVUkwgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgIC8vIERvbid0IGJvdGhlciBjcmVhdGluZyBhIHRodW1ibmFpbCBmb3IgU1ZHIGltYWdlcyBzaW5jZSB0aGV5J3JlIHZlY3RvclxuICAgICAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gXCJpbWFnZS9zdmcreG1sXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgY2FsbGJhY2soZmlsZVJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgdW5kZWZpbmVkLCBpZ25vcmVFeGlmKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgICAvLyBgbW9ja0ZpbGVgIG5lZWRzIHRvIGhhdmUgdGhlc2UgYXR0cmlidXRlczpcbiAgICAvL1xuICAgIC8vICAgICB7IG5hbWU6ICduYW1lJywgc2l6ZTogMTIzNDUsIGltYWdlVXJsOiAnJyB9XG4gICAgLy9cbiAgICAvLyBgY2FsbGJhY2tgIHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBpbWFnZSBoYXMgYmVlbiBkb3dubG9hZGVkIGFuZCBkaXNwbGF5ZWQuXG4gICAgLy8gYGNyb3NzT3JpZ2luYCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBgaW1nYCB0YWcgd2hlbiBhY2Nlc3NpbmcgdGhlIGZpbGUuXG4gICAgZGlzcGxheUV4aXN0aW5nRmlsZShtb2NrRmlsZSwgaW1hZ2VVcmwsIGNhbGxiYWNrLCBjcm9zc09yaWdpbiwgcmVzaXplVGh1bWJuYWlsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVcIiwgbW9ja0ZpbGUpO1xuICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZVwiLCBtb2NrRmlsZSk7XG4gICAgICAgIGlmICghcmVzaXplVGh1bWJuYWlsKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ0aHVtYm5haWxcIiwgbW9ja0ZpbGUsIGltYWdlVXJsKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvbkRvbmUgPSAodGh1bWJuYWlsKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInRodW1ibmFpbFwiLCBtb2NrRmlsZSwgdGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbW9ja0ZpbGUuZGF0YVVSTCA9IGltYWdlVXJsO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKG1vY2tGaWxlLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsIHRoaXMub3B0aW9ucy50aHVtYm5haWxIZWlnaHQsIHRoaXMub3B0aW9ucy50aHVtYm5haWxNZXRob2QsIHRoaXMub3B0aW9ucy5maXhPcmllbnRhdGlvbiwgb25Eb25lLCBjcm9zc09yaWdpbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaywgY3Jvc3NPcmlnaW4sIGlnbm9yZUV4aWYgPSBmYWxzZSkge1xuICAgICAgICAvLyBOb3QgdXNpbmcgYG5ldyBJbWFnZWAgaGVyZSBiZWNhdXNlIG9mIGEgYnVnIGluIGxhdGVzdCBDaHJvbWUgdmVyc2lvbnMuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9wdWxsLzIyNlxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaWYgKGNyb3NzT3JpZ2luKSBpbWcuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgICAgLy8gZml4T3JpZW50YXRpb24gaXMgbm90IG5lZWRlZCBhbnltb3JlIHdpdGggYnJvd3NlcnMgaGFuZGxpbmcgaW1hZ2VPcmllbnRhdGlvblxuICAgICAgICBmaXhPcmllbnRhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbXCJpbWFnZU9yaWVudGF0aW9uXCJdID09IFwiZnJvbS1pbWFnZVwiID8gZmFsc2UgOiBmaXhPcmllbnRhdGlvbjtcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICBsZXQgbG9hZEV4aWYgPSAoY2FsbGJhY2spPT5jYWxsYmFjaygxKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRVhJRiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBFWElGICE9PSBudWxsICYmIGZpeE9yaWVudGF0aW9uKSBsb2FkRXhpZiA9IChjYWxsYmFjayk9PkVYSUYuZ2V0RGF0YShpbWcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soRVhJRi5nZXRUYWcodGhpcywgXCJPcmllbnRhdGlvblwiKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbG9hZEV4aWYoKG9yaWVudGF0aW9uKT0+e1xuICAgICAgICAgICAgICAgIGZpbGUud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgZmlsZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGxldCByZXNpemVJbmZvID0gdGhpcy5vcHRpb25zLnJlc2l6ZS5jYWxsKHRoaXMsIGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCk7XG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdXaWR0aDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uID4gNCkge1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaChvcmllbnRhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgZmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxODDCsCByb3RhdGUgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZShNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBmbGlwXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA5MMKwIHJvdGF0ZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMCwgLWNhbnZhcy53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjYW52YXMuaGVpZ2h0LCAtY2FudmFzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOTDCsCByb3RhdGUgbGVmdFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jYW52YXMuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgYnVnZml4IGZvciBpT1MnIHNjYWxpbmcgYnVnLlxuICAgICAgICAgICAgICAgICQzZWQyNjlmMmYwZmIyMjRiJHZhciRkcmF3SW1hZ2VJT1NGaXgoY3R4LCBpbWcsIHJlc2l6ZUluZm8uc3JjWCAhPSBudWxsID8gcmVzaXplSW5mby5zcmNYIDogMCwgcmVzaXplSW5mby5zcmNZICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1kgOiAwLCByZXNpemVJbmZvLnNyY1dpZHRoLCByZXNpemVJbmZvLnNyY0hlaWdodCwgcmVzaXplSW5mby50cmdYICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1ggOiAwLCByZXNpemVJbmZvLnRyZ1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWSA6IDAsIHJlc2l6ZUluZm8udHJnV2lkdGgsIHJlc2l6ZUluZm8udHJnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgdGh1bWJuYWlsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgcmV0dXJuIGNhbGxiYWNrKHRodW1ibmFpbCwgY2FudmFzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgaW1nLm9uZXJyb3IgPSBjYWxsYmFjaztcbiAgICAgICAgdmFyIGRhdGFVUkwgPSBmaWxlLmRhdGFVUkw7XG4gICAgICAgIGlmIChpZ25vcmVFeGlmKSBkYXRhVVJMID0gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJHJlbW92ZUV4aWYoZGF0YVVSTCk7XG4gICAgICAgIHJldHVybiBpbWcuc3JjID0gZGF0YVVSTDtcbiAgICB9XG4gICAgLy8gR29lcyB0aHJvdWdoIHRoZSBxdWV1ZSBhbmQgcHJvY2Vzc2VzIGZpbGVzIGlmIHRoZXJlIGFyZW4ndCB0b28gbWFueSBhbHJlYWR5LlxuICAgIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgbGV0IHsgcGFyYWxsZWxVcGxvYWRzOiBwYXJhbGxlbFVwbG9hZHMgfSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgbGV0IHByb2Nlc3NpbmdMZW5ndGggPSB0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoO1xuICAgICAgICBsZXQgaSA9IHByb2Nlc3NpbmdMZW5ndGg7XG4gICAgICAgIC8vIFRoZXJlIGFyZSBhbHJlYWR5IGF0IGxlYXN0IGFzIG1hbnkgZmlsZXMgdXBsb2FkaW5nIHRoYW4gc2hvdWxkIGJlXG4gICAgICAgIGlmIChwcm9jZXNzaW5nTGVuZ3RoID49IHBhcmFsbGVsVXBsb2FkcykgcmV0dXJuO1xuICAgICAgICBsZXQgcXVldWVkRmlsZXMgPSB0aGlzLmdldFF1ZXVlZEZpbGVzKCk7XG4gICAgICAgIGlmICghKHF1ZXVlZEZpbGVzLmxlbmd0aCA+IDApKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIC8vIFRoZSBmaWxlcyBzaG91bGQgYmUgdXBsb2FkZWQgaW4gb25lIHJlcXVlc3RcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0ZpbGVzKHF1ZXVlZEZpbGVzLnNsaWNlKDAsIHBhcmFsbGVsVXBsb2FkcyAtIHByb2Nlc3NpbmdMZW5ndGgpKTtcbiAgICAgICAgZWxzZSB3aGlsZShpIDwgcGFyYWxsZWxVcGxvYWRzKXtcbiAgICAgICAgICAgIGlmICghcXVldWVkRmlsZXMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgLy8gTm90aGluZyBsZWZ0IHRvIHByb2Nlc3NcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0ZpbGUocXVldWVkRmlsZXMuc2hpZnQoKSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gV3JhcHBlciBmb3IgYHByb2Nlc3NGaWxlc2BcbiAgICBwcm9jZXNzRmlsZShmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhbXG4gICAgICAgICAgICBmaWxlXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvLyBMb2FkcyB0aGUgZmlsZSwgdGhlbiBjYWxscyBmaW5pc2hlZExvYWRpbmcoKVxuICAgIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXtcbiAgICAgICAgICAgIGZpbGUucHJvY2Vzc2luZyA9IHRydWU7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuVVBMT0FESU5HO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicHJvY2Vzc2luZ1wiLCBmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJwcm9jZXNzaW5nbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhmaWxlcyk7XG4gICAgfVxuICAgIF9nZXRGaWxlc1dpdGhYaHIoeGhyKSB7XG4gICAgICAgIGxldCBmaWxlcztcbiAgICAgICAgcmV0dXJuIGZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLnhociA9PT0geGhyKS5tYXAoKGZpbGUpPT5maWxlKTtcbiAgICB9XG4gICAgLy8gQ2FuY2VscyB0aGUgZmlsZSB1cGxvYWQgYW5kIHNldHMgdGhlIHN0YXR1cyB0byBDQU5DRUxFRFxuICAgIC8vICoqaWYqKiB0aGUgZmlsZSBpcyBhY3R1YWxseSBiZWluZyB1cGxvYWRlZC5cbiAgICAvLyBJZiBpdCdzIHN0aWxsIGluIHRoZSBxdWV1ZSwgdGhlIGZpbGUgaXMgYmVpbmcgcmVtb3ZlZCBmcm9tIGl0IGFuZCB0aGUgc3RhdHVzXG4gICAgLy8gc2V0IHRvIENBTkNFTEVELlxuICAgIGNhbmNlbFVwbG9hZChmaWxlKSB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcpIHtcbiAgICAgICAgICAgIGxldCBncm91cGVkRmlsZXMgPSB0aGlzLl9nZXRGaWxlc1dpdGhYaHIoZmlsZS54aHIpO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBlZEZpbGUgb2YgZ3JvdXBlZEZpbGVzKWdyb3VwZWRGaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpbGUueGhyICE9PSBcInVuZGVmaW5lZFwiKSBmaWxlLnhoci5hYm9ydCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXBlZEZpbGUgb2YgZ3JvdXBlZEZpbGVzKXRoaXMuZW1pdChcImNhbmNlbGVkXCIsIGdyb3VwZWRGaWxlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgZ3JvdXBlZEZpbGVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCB8fCBmaWxlLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5RVUVVRUQpIHtcbiAgICAgICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRDtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNhbmNlbGVkXCIsIGZpbGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwiY2FuY2VsZWRtdWx0aXBsZVwiLCBbXG4gICAgICAgICAgICAgICAgZmlsZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgcmVzb2x2ZU9wdGlvbihvcHRpb24sIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG9wdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG4gICAgdXBsb2FkRmlsZShmaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEZpbGVzKFtcbiAgICAgICAgICAgIGZpbGVcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHVwbG9hZEZpbGVzKGZpbGVzKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUZpbGVzKGZpbGVzLCAodHJhbnNmb3JtZWRGaWxlcyk9PntcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2h1bmtpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBDaHVua2luZyBpcyBub3QgYWxsb3dlZCB0byBiZSB1c2VkIHdpdGggYHVwbG9hZE11bHRpcGxlYCBzbyB3ZSBrbm93XG4gICAgICAgICAgICAgICAgLy8gdGhhdCB0aGVyZSBpcyBvbmx5IF9fb25lX19maWxlLlxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEZpbGUgPSB0cmFuc2Zvcm1lZEZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkID0gdGhpcy5vcHRpb25zLmNodW5raW5nICYmICh0aGlzLm9wdGlvbnMuZm9yY2VDaHVua2luZyB8fCB0cmFuc2Zvcm1lZEZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5jaHVua1NpemUpO1xuICAgICAgICAgICAgICAgIGZpbGVzWzBdLnVwbG9hZC50b3RhbENodW5rQ291bnQgPSBNYXRoLmNlaWwodHJhbnNmb3JtZWRGaWxlLnNpemUgLyB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtZWRGaWxlLnNpemUgPT09IDApIGZpbGVzWzBdLnVwbG9hZC50b3RhbENodW5rQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBmaWxlIHNob3VsZCBiZSBzZW50IGluIGNodW5rcyFcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2h1bmtpbmcgb3B0aW9uIGlzIHNldCwgd2UgKiprbm93KiogdGhhdCB0aGVyZSBjYW4gb25seSBiZSAqKm9uZSoqIGZpbGUsIHNpbmNlXG4gICAgICAgICAgICAgICAgLy8gdXBsb2FkTXVsdGlwbGUgaXMgbm90IGFsbG93ZWQgd2l0aCB0aGlzIG9wdGlvbi5cbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEZpbGUgPSB0cmFuc2Zvcm1lZEZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVOZXh0Q2h1bmsgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2h1bmtJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIG5leHQgaXRlbSBpbiBmaWxlLnVwbG9hZC5jaHVua3MgdGhhdCBpcyBub3QgZGVmaW5lZCB5ZXQuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGZpbGUudXBsb2FkLmNodW5rc1tjaHVua0luZGV4XSAhPT0gdW5kZWZpbmVkKWNodW5rSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtZWFucywgdGhhdCBhbGwgY2h1bmtzIGhhdmUgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHVua0luZGV4ID49IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBjaHVua0luZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgdGhpcy5vcHRpb25zLmNodW5rU2l6ZSwgdHJhbnNmb3JtZWRGaWxlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUJsb2NrID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZ2V0UGFyYW1OYW1lKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlID8gdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlKHN0YXJ0LCBlbmQpIDogdHJhbnNmb3JtZWRGaWxlLnNsaWNlKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUudXBsb2FkLmZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtJbmRleDogY2h1bmtJbmRleFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNodW5rSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQmxvY2s6IGRhdGFCbG9jayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJpZXM6IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBsb2FkRGF0YShmaWxlcywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJsb2NrXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQuZmluaXNoZWRDaHVua1VwbG9hZCA9IChjaHVuaywgcmVzcG9uc2UpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNodW5rLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUztcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGRhdGEgZnJvbSB0aGUgY2h1bmtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsuZGF0YUJsb2NrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsucmVzcG9uc2UgPSBjaHVuay54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICBjaHVuay5yZXNwb25zZUhlYWRlcnMgPSBjaHVuay54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIExlYXZpbmcgdGhpcyByZWZlcmVuY2UgdG8geGhyIHdpbGwgY2F1c2UgbWVtb3J5IGxlYWtzLlxuICAgICAgICAgICAgICAgICAgICBjaHVuay54aHIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFuZGxlTmV4dENodW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldLnN0YXR1cyAhPT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5TVUNDRVNTKSBhbGxGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxGaW5pc2hlZCkgdGhpcy5vcHRpb25zLmNodW5rc1VwbG9hZGVkKGZpbGUsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYWxsZWxDaHVua1VwbG9hZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBsaW1pdCBwYXJhbGxlbENodW5rVXBsb2FkcyB0byB0aGUgc2FtZSB2YWx1ZSBhcyBwYXJhbGxlbFVwbG9hZHMgb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFsbGVsQ291bnQgPSBNYXRoLm1pbih0aGlzLm9wdGlvbnMucGFyYWxsZWxDaHVua1VwbG9hZHMgPT09IHRydWUgPyB0aGlzLm9wdGlvbnMucGFyYWxsZWxVcGxvYWRzIDogdGhpcy5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzLCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYWxsZWxDb3VudDsgaSsrKWhhbmRsZU5leHRDaHVuaygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBoYW5kbGVOZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCbG9ja3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspZGF0YUJsb2Nrc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZ2V0UGFyYW1OYW1lKGkpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1lZEZpbGVzW2ldLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZXNbaV0udXBsb2FkLmZpbGVuYW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vLyBSZXR1cm5zIHRoZSByaWdodCBjaHVuayBmb3IgZ2l2ZW4gZmlsZSBhbmQgeGhyXG4gICAgX2dldENodW5rKGZpbGUsIHhocikge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspe1xuICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS54aHIgPT09IHhocikgcmV0dXJuIGZpbGUudXBsb2FkLmNodW5rc1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFjdHVhbGx5IHVwbG9hZHMgdGhlIGZpbGUocykgdG8gdGhlIHNlcnZlci5cbiAgICAvL1xuICAgIC8vICBJZiBkYXRhQmxvY2tzIGNvbnRhaW5zIHRoZSBhY3R1YWwgZGF0YSB0byB1cGxvYWQgKG1lYW5pbmcsIHRoYXQgdGhpcyBjb3VsZFxuICAgIC8vIGVpdGhlciBiZSB0cmFuc2Zvcm1lZCBmaWxlcywgb3IgaW5kaXZpZHVhbCBjaHVua3MgZm9yIGNodW5rZWQgdXBsb2FkKSB0aGVuXG4gICAgLy8gdGhleSB3aWxsIGJlIHVzZWQgZm9yIHRoZSBhY3R1YWwgZGF0YSB0byB1cGxvYWQuXG4gICAgX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpIHtcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIGZpbGUgb2JqZWN0cyB0byBiZSBhYmxlIHRvIHJlZmVyZW5jZSBpdCBsYXRlci5cbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcylmaWxlLnhociA9IHhocjtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSAvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIHJpZ2h0IGNodW5rIG9iamVjdCwgc28gaXQgY2FuIGJlIGFzc29jaWF0ZWRcbiAgICAgICAgLy8gbGF0ZXIsIGFuZCBmb3VuZCB3aXRoIF9nZXRDaHVuay5cbiAgICAgICAgZmlsZXNbMF0udXBsb2FkLmNodW5rc1tkYXRhQmxvY2tzWzBdLmNodW5rSW5kZXhdLnhociA9IHhocjtcbiAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMubWV0aG9kLCBmaWxlcywgZGF0YUJsb2Nrcyk7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnVybCwgZmlsZXMsIGRhdGFCbG9ja3MpO1xuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgIC8vIFNldHRpbmcgdGhlIHRpbWVvdXQgYWZ0ZXIgb3BlbiBiZWNhdXNlIG9mIElFMTEgaXNzdWU6IGh0dHBzOi8vZ2l0bGFiLmNvbS9tZW5vL2Ryb3B6b25lL2lzc3Vlcy84XG4gICAgICAgIGxldCB0aW1lb3V0ID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy50aW1lb3V0LCBmaWxlcyk7XG4gICAgICAgIGlmICh0aW1lb3V0KSB4aHIudGltZW91dCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMudGltZW91dCwgZmlsZXMpO1xuICAgICAgICAvLyBIYXMgdG8gYmUgYWZ0ZXIgYC5vcGVuKClgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvaXNzdWVzLzE3OVxuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISF0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB4aHIub25sb2FkID0gKGUpPT57XG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyLCBgUmVxdWVzdCB0aW1lZG91dCBhZnRlciAke3RoaXMub3B0aW9ucy50aW1lb3V0IC8gMTAwMH0gc2Vjb25kc2ApO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU29tZSBicm93c2VycyBkbyBub3QgaGF2ZSB0aGUgLnVwbG9hZCBwcm9wZXJ0eVxuICAgICAgICBsZXQgcHJvZ3Jlc3NPYmogPSB4aHIudXBsb2FkICE9IG51bGwgPyB4aHIudXBsb2FkIDogeGhyO1xuICAgICAgICBwcm9ncmVzc09iai5vbnByb2dyZXNzID0gKGUpPT50aGlzLl91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMub3B0aW9ucy5kZWZhdWx0SGVhZGVycyA/IHtcbiAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxuICAgICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIlxuICAgICAgICB9IDoge307XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmluYXJ5Qm9keSkgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGZpbGVzWzBdLnR5cGU7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycykgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIGZvcihsZXQgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGxldCBoZWFkZXJWYWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgICAgICAgICBpZiAoaGVhZGVyVmFsdWUpIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBmaWxlIGlzIGdvaW5nIHRvIGJlIHNlbnQgYXMgYmluYXJ5IGJvZHksIGl0IGRvZXNuJ3QgbWFrZVxuICAgICAgICAgICAgLy8gYW55IHNlbnNlIHRvIGdlbmVyYXRlIGBGb3JtRGF0YWAgZm9yIGl0LlxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmVtaXQoXCJzZW5kaW5nXCIsIGZpbGUsIHhocik7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB0aGlzLmVtaXQoXCJzZW5kaW5nbXVsdGlwbGVcIiwgZmlsZXMsIHhocik7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdFJlcXVlc3QoeGhyLCBudWxsLCBmaWxlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIC8vIEFkZGluZyBhbGwgQG9wdGlvbnMgcGFyYW1ldGVyc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25hbFBhcmFtcyA9IHRoaXMub3B0aW9ucy5wYXJhbXM7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZGRpdGlvbmFsUGFyYW1zID09PSBcImZ1bmN0aW9uXCIpIGFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zLmNhbGwodGhpcywgZmlsZXMsIHhociwgZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgPyB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKSA6IG51bGwpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIGFkZGl0aW9uYWxQYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBhZGRpdGlvbmFsUGFyYW1zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgLy8gVGhlIGFkZGl0aW9uYWwgcGFyYW1ldGVyIGNvbnRhaW5zIGFuIGFycmF5LFxuICAgICAgICAgICAgICAgICAgICAvLyBzbyBsZXRzIGl0ZXJhdGUgb3ZlciBpdCB0byBhdHRhY2ggZWFjaCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBpbmRpdmlkdWFsbHkuXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKylmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExldCB0aGUgdXNlciBhZGQgYWRkaXRpb25hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl0aGlzLmVtaXQoXCJzZW5kaW5nXCIsIGZpbGUsIHhociwgZm9ybURhdGEpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkgdGhpcy5lbWl0KFwic2VuZGluZ211bHRpcGxlXCIsIGZpbGVzLCB4aHIsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEZvcm1FbGVtZW50RGF0YShmb3JtRGF0YSk7XG4gICAgICAgICAgICAvLyBGaW5hbGx5IGFkZCB0aGUgZmlsZXNcbiAgICAgICAgICAgIC8vIEhhcyB0byBiZSBsYXN0IGJlY2F1c2Ugc29tZSBzZXJ2ZXJzIChlZzogUzMpIGV4cGVjdCB0aGUgZmlsZSB0byBiZSB0aGUgbGFzdCBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhQmxvY2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUJsb2NrID0gZGF0YUJsb2Nrc1tpXTtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoZGF0YUJsb2NrLm5hbWUsIGRhdGFCbG9jay5kYXRhLCBkYXRhQmxvY2suZmlsZW5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUcmFuc2Zvcm1zIGFsbCBmaWxlcyB3aXRoIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlIGFuZCBpbnZva2VzIGRvbmUgd2l0aCB0aGUgdHJhbnNmb3JtZWQgZmlsZXMgd2hlbiBkb25lLlxuICAgIF90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZG9uZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZWRGaWxlcyA9IFtdO1xuICAgICAgICAvLyBDbHVtc3kgd2F5IG9mIGhhbmRsaW5nIGFzeW5jaHJvbm91cyBjYWxscywgdW50aWwgSSBnZXQgdG8gYWRkIGEgcHJvcGVyIEZ1dHVyZSBsaWJyYXJ5LlxuICAgICAgICBsZXQgZG9uZUNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspdGhpcy5vcHRpb25zLnRyYW5zZm9ybUZpbGUuY2FsbCh0aGlzLCBmaWxlc1tpXSwgKHRyYW5zZm9ybWVkRmlsZSk9PntcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRmlsZXNbaV0gPSB0cmFuc2Zvcm1lZEZpbGU7XG4gICAgICAgICAgICBpZiAoKytkb25lQ291bnRlciA9PT0gZmlsZXMubGVuZ3RoKSBkb25lKHRyYW5zZm9ybWVkRmlsZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVGFrZXMgY2FyZSBvZiBhZGRpbmcgb3RoZXIgaW5wdXQgZWxlbWVudHMgb2YgdGhlIGZvcm0gdG8gdGhlIEFKQVggcmVxdWVzdFxuICAgIF9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpIHtcbiAgICAgICAgLy8gVGFrZSBjYXJlIG9mIG90aGVyIGlucHV0IGVsZW1lbnRzXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gXCJGT1JNXCIpIGZvciAobGV0IGlucHV0IG9mIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvblwiKSl7XG4gICAgICAgICAgICBsZXQgaW5wdXROYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICAgIGxldCBpbnB1dFR5cGUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuICAgICAgICAgICAgaWYgKGlucHV0VHlwZSkgaW5wdXRUeXBlID0gaW5wdXRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgaW5wdXQgZG9lc24ndCBoYXZlIGEgbmFtZSwgd2UgY2FuJ3QgdXNlIGl0LlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dE5hbWUgPT09IFwidW5kZWZpbmVkXCIgfHwgaW5wdXROYW1lID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChpbnB1dC50YWdOYW1lID09PSBcIlNFTEVDVFwiICYmIGlucHV0Lmhhc0F0dHJpYnV0ZShcIm11bHRpcGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgLy8gUG9zc2libHkgbXVsdGlwbGUgdmFsdWVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIGlucHV0Lm9wdGlvbnMpaWYgKG9wdGlvbi5zZWxlY3RlZCkgZm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlucHV0VHlwZSB8fCBpbnB1dFR5cGUgIT09IFwiY2hlY2tib3hcIiAmJiBpbnB1dFR5cGUgIT09IFwicmFkaW9cIiB8fCBpbnB1dC5jaGVja2VkKSBmb3JtRGF0YS5hcHBlbmQoaW5wdXROYW1lLCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSW52b2tlZCB3aGVuIHRoZXJlIGlzIG5ldyBwcm9ncmVzcyBpbmZvcm1hdGlvbiBhYm91dCBnaXZlbiBmaWxlcy5cbiAgICAvLyBJZiBlIGlzIG5vdCBwcm92aWRlZCwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB1cGxvYWQgaXMgZmluaXNoZWQuXG4gICAgX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMsIHhociwgZSkge1xuICAgICAgICBpZiAoIWZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSAvLyBIYW5kbGUgZmlsZSB1cGxvYWRzIHdpdGhvdXQgY2h1bmtpbmdcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBpZiAoZmlsZS51cGxvYWQudG90YWwgJiYgZmlsZS51cGxvYWQuYnl0ZXNTZW50ICYmIGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9PSBmaWxlLnVwbG9hZC50b3RhbCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gMTAwICogZS5sb2FkZWQgLyBlLnRvdGFsO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLnRvdGFsID0gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZXZlbnQsIHNvIHdlJ3JlIGF0IDEwMCVcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSBmaWxlLnVwbG9hZC50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChcInVwbG9hZHByb2dyZXNzXCIsIGZpbGUsIGZpbGUudXBsb2FkLnByb2dyZXNzLCBmaWxlLnVwbG9hZC5ieXRlc1NlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGNodW5rZWQgZmlsZSB1cGxvYWRzXG4gICAgICAgICAgICAvLyBDaHVua2VkIHVwbG9hZCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHVwbG9hZGluZyBtdWx0aXBsZSBmaWxlcyBpbiBvbmVcbiAgICAgICAgICAgIC8vIHJlcXVlc3QsIHNvIHdlIGtub3cgdGhlcmUncyBvbmx5IG9uZSBmaWxlLlxuICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1swXTtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoaXMgaXMgYSBjaHVua2VkIHVwbG9hZCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGFwcHJvcHJpYXRlIGNodW5rXG4gICAgICAgICAgICAvLyBwcm9ncmVzcy5cbiAgICAgICAgICAgIGxldCBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGUsIHhocik7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGNodW5rLnByb2dyZXNzID0gMTAwICogZS5sb2FkZWQgLyBlLnRvdGFsO1xuICAgICAgICAgICAgICAgIGNodW5rLnRvdGFsID0gZS50b3RhbDtcbiAgICAgICAgICAgICAgICBjaHVuay5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gZXZlbnQsIHNvIHdlJ3JlIGF0IDEwMCVcbiAgICAgICAgICAgICAgICBjaHVuay5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICBjaHVuay5ieXRlc1NlbnQgPSBjaHVuay50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vdyB0YWxseSB0aGUgKmZpbGUqIHVwbG9hZCBwcm9ncmVzcyBmcm9tIGl0cyBpbmRpdmlkdWFsIGNodW5rc1xuICAgICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgPSAwO1xuICAgICAgICAgICAgZmlsZS51cGxvYWQuYnl0ZXNTZW50ID0gMDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKylpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldICYmIHR5cGVvZiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnRvdGFsO1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkLmJ5dGVzU2VudCArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0uYnl0ZXNTZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2luY2UgdGhlIHByb2Nlc3MgaXMgYSBwZXJjZW50YWdlLCB3ZSBuZWVkIHRvIGRpdmlkZSBieSB0aGUgYW1vdW50IG9mXG4gICAgICAgICAgICAvLyBjaHVua3Mgd2UndmUgdXNlZC5cbiAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzID0gZmlsZS51cGxvYWQucHJvZ3Jlc3MgLyBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBmaWxlLCBmaWxlLnVwbG9hZC5wcm9ncmVzcywgZmlsZS51cGxvYWQuYnl0ZXNTZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSkge1xuICAgICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuQ0FOQ0VMRUQpIHJldHVybjtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlICE9PSBcImFycmF5YnVmZmVyXCIgJiYgeGhyLnJlc3BvbnNlVHlwZSAhPT0gXCJibG9iXCIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGlmICh4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikgJiYgfnhoci5nZXRSZXNwb25zZUhlYWRlcihcImNvbnRlbnQtdHlwZVwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24vanNvblwiKSkgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBcIkludmFsaWQgSlNPTiByZXNwb25zZSBmcm9tIHNlcnZlci5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIpO1xuICAgICAgICBpZiAoISgyMDAgPD0geGhyLnN0YXR1cyAmJiB4aHIuc3RhdHVzIDwgMzAwKSkgdGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpO1xuICAgICAgICBlbHNlIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkgZmlsZXNbMF0udXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQodGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhociksIHJlc3BvbnNlKTtcbiAgICAgICAgZWxzZSB0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIGUpO1xuICAgIH1cbiAgICBfaGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnN0YXR1cyA9PT0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5DQU5DRUxFRCkgcmV0dXJuO1xuICAgICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgJiYgdGhpcy5vcHRpb25zLnJldHJ5Q2h1bmtzKSB7XG4gICAgICAgICAgICBsZXQgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKTtcbiAgICAgICAgICAgIGlmIChjaHVuay5yZXRyaWVzKysgPCB0aGlzLm9wdGlvbnMucmV0cnlDaHVua3NMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtcbiAgICAgICAgICAgICAgICAgICAgY2h1bmsuZGF0YUJsb2NrXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGNvbnNvbGUud2FybihcIlJldHJpZWQgdGhpcyBjaHVuayB0b28gb2Z0ZW4uIEdpdmluZyB1cC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCByZXNwb25zZSB8fCB0aGlzLm9wdGlvbnMuZGljdFJlc3BvbnNlRXJyb3IucmVwbGFjZShcInt7c3RhdHVzQ29kZX19XCIsIHhoci5zdGF0dXMpLCB4aHIpO1xuICAgIH1cbiAgICBzdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3Qgc2VuZCB0aGlzIHJlcXVlc3QgYmVjYXVzZSB0aGUgWE1MSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSBpcyBub3QgT1BFTkVELlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJpbmFyeUJvZHkpIHtcbiAgICAgICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoY2h1bmsuZGF0YUJsb2NrLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHhoci5zZW5kKGZpbGVzWzBdKTtcbiAgICAgICAgfSBlbHNlIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgICB9XG4gICAgLy8gQ2FsbGVkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIGlzIGZpbmlzaGVkLlxuICAgIC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cbiAgICBfZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlVGV4dCwgZSkge1xuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXtcbiAgICAgICAgICAgIGZpbGUuc3RhdHVzID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5TVUNDRVNTO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiLCBmaWxlLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc211bHRpcGxlXCIsIGZpbGVzLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVtdWx0aXBsZVwiLCBmaWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSByZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgLy8gQ2FsbGVkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIGlzIGZpbmlzaGVkLlxuICAgIC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cbiAgICBfZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCBtZXNzYWdlLCB4aHIpIHtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBmaWxlLnN0YXR1cyA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuRVJST1I7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBmaWxlLCBtZXNzYWdlLCB4aHIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JtdWx0aXBsZVwiLCBmaWxlcywgbWVzc2FnZSwgeGhyKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIHN0YXRpYyB1dWlkdjQoKSB7XG4gICAgICAgIHJldHVybiBcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csIChjKT0+KCtjIF4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAxNSA+PiArYyAvIDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgfVxufVxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5pbml0Q2xhc3MoKTtcbi8vIFRoaXMgaXMgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmVzLiBBZGQgY29uZmlndXJhdGlvbnNcbi8vIHRvIHRoaXMgb2JqZWN0IGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZSBlbGVtZW50cy5cbi8vXG4vLyBFeGFtcGxlOlxuLy9cbi8vICAgICBEcm9wem9uZS5vcHRpb25zLm15RHJvcHpvbmVFbGVtZW50SWQgPSB7IG1heEZpbGVzaXplOiAxIH07XG4vL1xuLy8gQW5kIGluIGh0bWw6XG4vL1xuLy8gICAgIDxmb3JtIGFjdGlvbj1cIi91cGxvYWRcIiBpZD1cIm15LWRyb3B6b25lLWVsZW1lbnQtaWRcIiBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPlxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zID0ge307XG4vLyBSZXR1cm5zIHRoZSBvcHRpb25zIGZvciBhbiBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBub25lIGF2YWlsYWJsZS5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9uc0ZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgLy8gR2V0IHRoZSBgRHJvcHpvbmUub3B0aW9ucy5lbGVtZW50SWRgIGZvciB0aGlzIGVsZW1lbnQgaWYgaXQgZXhpc3RzXG4gICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIikgJiYgdHlwZW9mICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiAkM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5Lm9wdGlvbnNbJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGNhbWVsaXplKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIikpXTtcbiAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG59O1xuLy8gSG9sZHMgYSBsaXN0IG9mIGFsbCBkcm9wem9uZSBpbnN0YW5jZXNcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaW5zdGFuY2VzID0gW107XG4vLyBSZXR1cm5zIHRoZSBkcm9wem9uZSBmb3IgZ2l2ZW4gZWxlbWVudCBpZiBhbnlcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZm9yRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgIGlmICgoZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5kcm9wem9uZSA6IHVuZGVmaW5lZCkgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gRHJvcHpvbmUgZm91bmQgZm9yIGdpdmVuIGVsZW1lbnQuIFRoaXMgaXMgcHJvYmFibHkgYmVjYXVzZSB5b3UncmUgdHJ5aW5nIHRvIGFjY2VzcyBpdCBiZWZvcmUgRHJvcHpvbmUgaGFkIHRoZSB0aW1lIHRvIGluaXRpYWxpemUuIFVzZSB0aGUgYGluaXRgIG9wdGlvbiB0byBzZXR1cCBhbnkgYWRkaXRpb25hbCBvYnNlcnZlcnMgb24geW91ciBEcm9wem9uZS5cIik7XG4gICAgcmV0dXJuIGVsZW1lbnQuZHJvcHpvbmU7XG59O1xuLy8gTG9va3MgZm9yIGFsbCAuZHJvcHpvbmUgZWxlbWVudHMgYW5kIGNyZWF0ZXMgYSBkcm9wem9uZSBmb3IgdGhlbVxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5kaXNjb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBkcm9wem9uZXM7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIGRyb3B6b25lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJvcHpvbmVcIik7XG4gICAgZWxzZSB7XG4gICAgICAgIGRyb3B6b25lcyA9IFtdO1xuICAgICAgICAvLyBJRSA6KFxuICAgICAgICBsZXQgY2hlY2tFbGVtZW50cyA9IChlbGVtZW50cyk9PigoKT0+e1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbCBvZiBlbGVtZW50cylpZiAoLyhefCApZHJvcHpvbmUoJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSByZXN1bHQucHVzaChkcm9wem9uZXMucHVzaChlbCkpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgY2hlY2tFbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKSk7XG4gICAgICAgIGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJmb3JtXCIpKTtcbiAgICB9XG4gICAgcmV0dXJuICgoKT0+e1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGRyb3B6b25lIG9mIGRyb3B6b25lcykvLyBDcmVhdGUgYSBkcm9wem9uZSB1bmxlc3MgYXV0byBkaXNjb3ZlciBoYXMgYmVlbiBkaXNhYmxlZCBmb3Igc3BlY2lmaWMgZWxlbWVudFxuICAgICAgICBpZiAoJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5vcHRpb25zRm9yRWxlbWVudChkcm9wem9uZSkgIT09IGZhbHNlKSByZXN1bHQucHVzaChuZXcgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOShkcm9wem9uZSkpO1xuICAgICAgICBlbHNlIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKTtcbn07XG4vLyBDaGVja3MgaWYgdGhlIGJyb3dzZXIgaXMgc3VwcG9ydGVkIGJ5IHNpbXBseSBjaGVja2luZyBpZiBQcm9taXNlIGlzIGhlcmU6IGEgZ29vZCBjdXRvZmZcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNCcm93c2VyU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiO1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZGF0YVVSSXRvQmxvYiA9IGZ1bmN0aW9uKGRhdGFVUkkpIHtcbiAgICAvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgIC8vIGRvZXNuJ3QgaGFuZGxlIFVSTEVuY29kZWQgRGF0YVVSSXMgLSBzZWUgU08gYW5zd2VyICM2ODUwMjc2IGZvciBjb2RlIHRoYXQgZG9lcyB0aGlzXG4gICAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoXCIsXCIpWzFdKTtcbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgbGV0IG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KFwiLFwiKVswXS5zcGxpdChcIjpcIilbMV0uc3BsaXQoXCI7XCIpWzBdO1xuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgbGV0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgZm9yKGxldCBpID0gMCwgZW5kID0gYnl0ZVN0cmluZy5sZW5ndGgsIGFzYyA9IDAgPD0gZW5kOyBhc2MgPyBpIDw9IGVuZCA6IGkgPj0gZW5kOyBhc2MgPyBpKysgOiBpLS0paWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgLy8gd3JpdGUgdGhlIEFycmF5QnVmZmVyIHRvIGEgYmxvYlxuICAgIHJldHVybiBuZXcgQmxvYihbXG4gICAgICAgIGFiXG4gICAgXSwge1xuICAgICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSk7XG59O1xuLy8gUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSByZWplY3RlZCBpdGVtXG5jb25zdCAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkd2l0aG91dCA9IChsaXN0LCByZWplY3RlZEl0ZW0pPT5saXN0LmZpbHRlcigoaXRlbSk9Pml0ZW0gIT09IHJlamVjdGVkSXRlbSkubWFwKChpdGVtKT0+aXRlbSk7XG4vLyBhYmMtZGVmX2doaSAtPiBhYmNEZWZHaGlcbmNvbnN0ICQzZWQyNjlmMmYwZmIyMjRiJHZhciRjYW1lbGl6ZSA9IChzdHIpPT5zdHIucmVwbGFjZSgvW1xcLV9dKFxcdykvZywgKG1hdGNoKT0+bWF0Y2guY2hhckF0KDEpLnRvVXBwZXJDYXNlKCkpO1xuLy8gQ3JlYXRlcyBhbiBlbGVtZW50IGZyb20gc3RyaW5nXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gc3RyaW5nO1xuICAgIHJldHVybiBkaXYuY2hpbGROb2Rlc1swXTtcbn07XG4vLyBUZXN0cyBpZiBnaXZlbiBlbGVtZW50IGlzIGluc2lkZSAob3Igc2ltcGx5IGlzKSB0aGUgY29udGFpbmVyXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LmVsZW1lbnRJbnNpZGUgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIpIHtcbiAgICBpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSByZXR1cm4gdHJ1ZTtcbiAgICAgLy8gQ29mZmVlc2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBkby93aGlsZSBsb29wc1xuICAgIHdoaWxlKGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpe1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKGVsLCBuYW1lKSB7XG4gICAgbGV0IGVsZW1lbnQ7XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGVsc2UgaWYgKGVsLm5vZGVUeXBlICE9IG51bGwpIGVsZW1lbnQgPSBlbDtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgXFxgJHtuYW1lfVxcYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yIG9yIGEgcGxhaW4gSFRNTCBlbGVtZW50LmApO1xuICAgIHJldHVybiBlbGVtZW50O1xufTtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbihlbHMsIG5hbWUpIHtcbiAgICBsZXQgZWwsIGVsZW1lbnRzO1xuICAgIGlmIChlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChlbCBvZiBlbHMpZWxlbWVudHMucHVzaCh0aGlzLmdldEVsZW1lbnQoZWwsIG5hbWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnRzID0gW107XG4gICAgICAgIGZvciAoZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbHMpKWVsZW1lbnRzLnB1c2goZWwpO1xuICAgIH0gZWxzZSBpZiAoZWxzLm5vZGVUeXBlICE9IG51bGwpIGVsZW1lbnRzID0gW1xuICAgICAgICBlbHNcbiAgICBdO1xuICAgIGlmIChlbGVtZW50cyA9PSBudWxsIHx8ICFlbGVtZW50cy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBcXGAke25hbWV9XFxgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3IsIGEgcGxhaW4gSFRNTCBlbGVtZW50IG9yIGEgbGlzdCBvZiB0aG9zZS5gKTtcbiAgICByZXR1cm4gZWxlbWVudHM7XG59O1xuLy8gQXNrcyB0aGUgdXNlciB0aGUgcXVlc3Rpb24gYW5kIGNhbGxzIGFjY2VwdGVkIG9yIHJlamVjdGVkIGFjY29yZGluZ2x5XG4vL1xuLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24ganVzdCB1c2VzIGB3aW5kb3cuY29uZmlybWAgYW5kIHRoZW4gY2FsbHMgdGhlXG4vLyBhcHByb3ByaWF0ZSBjYWxsYmFjay5cbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuY29uZmlybSA9IGZ1bmN0aW9uKHF1ZXN0aW9uLCBhY2NlcHRlZCwgcmVqZWN0ZWQpIHtcbiAgICBpZiAod2luZG93LmNvbmZpcm0ocXVlc3Rpb24pKSByZXR1cm4gYWNjZXB0ZWQoKTtcbiAgICBlbHNlIGlmIChyZWplY3RlZCAhPSBudWxsKSByZXR1cm4gcmVqZWN0ZWQoKTtcbn07XG4vLyBWYWxpZGF0ZXMgdGhlIG1pbWUgdHlwZSBsaWtlIHRoaXM6XG4vL1xuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHRcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuaXNWYWxpZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBhY2NlcHRlZEZpbGVzKSB7XG4gICAgaWYgKCFhY2NlcHRlZEZpbGVzKSByZXR1cm4gdHJ1ZTtcbiAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGFjY2VwdGVkIG1pbWUgdHlwZXMsIGl0J3MgT0tcbiAgICBhY2NlcHRlZEZpbGVzID0gYWNjZXB0ZWRGaWxlcy5zcGxpdChcIixcIik7XG4gICAgbGV0IG1pbWVUeXBlID0gZmlsZS50eXBlO1xuICAgIGxldCBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCBcIlwiKTtcbiAgICBmb3IgKGxldCB2YWxpZFR5cGUgb2YgYWNjZXB0ZWRGaWxlcyl7XG4gICAgICAgIHZhbGlkVHlwZSA9IHZhbGlkVHlwZS50cmltKCk7XG4gICAgICAgIGlmICh2YWxpZFR5cGUuY2hhckF0KDApID09PSBcIi5cIikge1xuICAgICAgICAgICAgaWYgKGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsaWRUeXBlLnRvTG93ZXJDYXNlKCksIGZpbGUubmFtZS5sZW5ndGggLSB2YWxpZFR5cGUubGVuZ3RoKSAhPT0gLTEpIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC9cXCokLy50ZXN0KHZhbGlkVHlwZSkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSBpbWFnZS8qIG1pbWUgdHlwZVxuICAgICAgICAgICAgaWYgKGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sIFwiXCIpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtaW1lVHlwZSA9PT0gdmFsaWRUeXBlKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLy8gQXVnbWVudCBqUXVlcnlcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeSAhPT0gbnVsbCkgalF1ZXJ5LmZuLmRyb3B6b25lID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSh0aGlzLCBvcHRpb25zKTtcbiAgICB9KTtcbn07XG4vLyBEcm9wem9uZSBmaWxlIHN0YXR1cyBjb2Rlc1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BRERFRCA9IFwiYWRkZWRcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEID0gXCJxdWV1ZWRcIjtcbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gTm93LCBpZiBhIGZpbGUgaXMgYWNjZXB0ZWQsIGl0J3MgZWl0aGVyIHF1ZXVlZFxuLy8gb3IgdXBsb2FkaW5nLlxuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5BQ0NFUFRFRCA9ICQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuUVVFVUVEO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkcgPSBcInVwbG9hZGluZ1wiO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5QUk9DRVNTSU5HID0gJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5VUExPQURJTkc7IC8vIGFsaWFzXG4kM2VkMjY5ZjJmMGZiMjI0YiRleHBvcnQkMmUyYmNkODczOWFlMDM5LkNBTkNFTEVEID0gXCJjYW5jZWxlZFwiO1xuJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOS5FUlJPUiA9IFwiZXJyb3JcIjtcbiQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkuU1VDQ0VTUyA9IFwic3VjY2Vzc1wiO1xuLypcblxuIEJ1Z2ZpeCBmb3IgaU9TIDYgYW5kIDdcbiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE5MjkwOTkvaHRtbDUtY2FudmFzLWRyYXdpbWFnZS1yYXRpby1idWctaW9zXG4gYmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL3N0b21pdGEvaW9zLWltYWdlZmlsZS1tZWdhcGl4ZWxcblxuICovIC8vIERldGVjdGluZyB2ZXJ0aWNhbCBzcXVhc2ggaW4gbG9hZGVkIGltYWdlLlxuLy8gRml4ZXMgYSBidWcgd2hpY2ggc3F1YXNoIGltYWdlIHZlcnRpY2FsbHkgd2hpbGUgZHJhd2luZyBpbnRvIGNhbnZhcyBmb3Igc29tZSBpbWFnZXMuXG4vLyBUaGlzIGlzIGEgYnVnIGluIGlPUzYgZGV2aWNlcy4gVGhpcyBmdW5jdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG5sZXQgJDNlZDI2OWYyZjBmYjIyNGIkdmFyJGRldGVjdFZlcnRpY2FsU3F1YXNoID0gZnVuY3Rpb24oaW1nKSB7XG4gICAgbGV0IGloID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzLndpZHRoID0gMTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaWg7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgIGxldCB7IGRhdGE6IGRhdGEgfSA9IGN0eC5nZXRJbWFnZURhdGEoMSwgMCwgMSwgaWgpO1xuICAgIC8vIHNlYXJjaCBpbWFnZSBlZGdlIHBpeGVsIHBvc2l0aW9uIGluIGNhc2UgaXQgaXMgc3F1YXNoZWQgdmVydGljYWxseS5cbiAgICBsZXQgc3kgPSAwO1xuICAgIGxldCBleSA9IGloO1xuICAgIGxldCBweSA9IGloO1xuICAgIHdoaWxlKHB5ID4gc3kpe1xuICAgICAgICBsZXQgYWxwaGEgPSBkYXRhWyhweSAtIDEpICogNCArIDNdO1xuICAgICAgICBpZiAoYWxwaGEgPT09IDApIGV5ID0gcHk7XG4gICAgICAgIGVsc2Ugc3kgPSBweTtcbiAgICAgICAgcHkgPSBleSArIHN5ID4+IDE7XG4gICAgfVxuICAgIGxldCByYXRpbyA9IHB5IC8gaWg7XG4gICAgaWYgKHJhdGlvID09PSAwKSByZXR1cm4gMTtcbiAgICBlbHNlIHJldHVybiByYXRpbztcbn07XG4vLyBBIHJlcGxhY2VtZW50IGZvciBjb250ZXh0LmRyYXdJbWFnZVxuLy8gKGFyZ3MgYXJlIGZvciBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uKS5cbnZhciAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZHJhd0ltYWdlSU9TRml4ID0gZnVuY3Rpb24oY3R4LCBpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCkge1xuICAgIGxldCB2ZXJ0U3F1YXNoUmF0aW8gPSAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkZGV0ZWN0VmVydGljYWxTcXVhc2goaW1nKTtcbiAgICByZXR1cm4gY3R4LmRyYXdJbWFnZShpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCAvIHZlcnRTcXVhc2hSYXRpbyk7XG59O1xuLy8gSW5zcGlyZWQgYnkgTWluaWZ5SnBlZ1xuLy8gU291cmNlOiBodHRwOi8vd3d3LnBlcnJ5LmN6L2ZpbGVzL0V4aWZSZXN0b3Jlci5qc1xuLy8gaHR0cDovL2VsaWNvbi5ibG9nNTcuZmMyLmNvbS9ibG9nLWVudHJ5LTIwNi5odG1sXG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkcmVtb3ZlRXhpZihvcmlnRmlsZUJhc2U2NCkge1xuICAgIHZhciBtYXJrZXIgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnO1xuICAgIGlmICghb3JpZ0ZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpKSByZXR1cm4gb3JpZ0ZpbGVCYXNlNjQ7XG4gICAgdmFyIG9yaWdGaWxlID0gd2luZG93LmF0b2Iob3JpZ0ZpbGVCYXNlNjQuc2xpY2UobWFya2VyLmxlbmd0aCkpO1xuICAgIGlmICghb3JpZ0ZpbGUuc3RhcnRzV2l0aChcIlxceEZGXFx4RDhcXHhGRlwiKSkgcmV0dXJuIG9yaWdGaWxlQmFzZTY0O1xuICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgSlBFRyBmaWxlIHNlZ21lbnRzIGFuZCBjb3B5IGFsbCBidXQgRXhpZiBzZWdtZW50cyBpbnRvIHRoZSBmaWx0ZXJlZCBmaWxlLlxuICAgIHZhciBoZWFkID0gMDtcbiAgICB2YXIgZmlsdGVyZWRGaWxlID0gXCJcIjtcbiAgICB3aGlsZShoZWFkIDwgb3JpZ0ZpbGUubGVuZ3RoKXtcbiAgICAgICAgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4REFcIikge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc3RhcnQgb2YgdGhlIGltYWdlIGRhdGEsIHdlIGRvbid0IGV4cGVjdCBleGlmIGRhdGEgYWZ0ZXIgdGhhdC5cbiAgICAgICAgICAgIGZpbHRlcmVkRmlsZSArPSBvcmlnRmlsZS5zbGljZShoZWFkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKG9yaWdGaWxlLnNsaWNlKGhlYWQsIGhlYWQgKyAyKSA9PSBcIlxceEZGXFx4RDhcIikge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgZ2xvYmFsIHN0YXJ0IG1hcmtlci5cbiAgICAgICAgICAgIGZpbHRlcmVkRmlsZSArPSBvcmlnRmlsZS5zbGljZShoZWFkLCBoZWFkICsgMik7XG4gICAgICAgICAgICBoZWFkICs9IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgc2VnbWVudCBvZiB2YXJpYWJsZSBzaXplLlxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDIpICogMjU2ICsgb3JpZ0ZpbGUuY2hhckNvZGVBdChoZWFkICsgMyk7XG4gICAgICAgICAgICB2YXIgZW5kUG9pbnQgPSBoZWFkICsgbGVuZ3RoICsgMjtcbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gb3JpZ0ZpbGUuc2xpY2UoaGVhZCwgZW5kUG9pbnQpO1xuICAgICAgICAgICAgaWYgKCFzZWdtZW50LnN0YXJ0c1dpdGgoXCJcXHhGRlxceEUxXCIpKSBmaWx0ZXJlZEZpbGUgKz0gc2VnbWVudDtcbiAgICAgICAgICAgIGhlYWQgPSBlbmRQb2ludDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFya2VyICsgd2luZG93LmJ0b2EoZmlsdGVyZWRGaWxlKTtcbn1cbmZ1bmN0aW9uICQzZWQyNjlmMmYwZmIyMjRiJHZhciRyZXN0b3JlRXhpZihvcmlnRmlsZUJhc2U2NCwgcmVzaXplZEZpbGVCYXNlNjQpIHtcbiAgICB2YXIgbWFya2VyID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJztcbiAgICBpZiAoIShvcmlnRmlsZUJhc2U2NC5zdGFydHNXaXRoKG1hcmtlcikgJiYgcmVzaXplZEZpbGVCYXNlNjQuc3RhcnRzV2l0aChtYXJrZXIpKSkgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIHZhciBvcmlnRmlsZSA9IHdpbmRvdy5hdG9iKG9yaWdGaWxlQmFzZTY0LnNsaWNlKG1hcmtlci5sZW5ndGgpKTtcbiAgICBpZiAoIW9yaWdGaWxlLnN0YXJ0c1dpdGgoXCJcXHhGRlxceEQ4XFx4RkZcIikpIHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBKUEVHIGZpbGUgc2VnbWVudHMgb25lIGJ5IG9uZSBhbmQgY29sbGVjdCBhbnkgRXhpZiBzZWdtZW50cyB3ZSBmaW5kLlxuICAgIHZhciBoZWFkID0gMDtcbiAgICB2YXIgZXhpZkRhdGEgPSBcIlwiO1xuICAgIHdoaWxlKGhlYWQgPCBvcmlnRmlsZS5sZW5ndGgpe1xuICAgICAgICBpZiAob3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpID09IFwiXFx4RkZcXHhEQVwiKSBicmVhaztcbiAgICAgICAgZWxzZSBpZiAob3JpZ0ZpbGUuc2xpY2UoaGVhZCwgaGVhZCArIDIpID09IFwiXFx4RkZcXHhEOFwiKSAvLyB0aGlzIGlzIHRoZSBnbG9iYWwgc3RhcnQgbWFya2VyLlxuICAgICAgICBoZWFkICs9IDI7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHNlZ21lbnQgb2YgdmFyaWFibGUgc2l6ZS5cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBvcmlnRmlsZS5jaGFyQ29kZUF0KGhlYWQgKyAyKSAqIDI1NiArIG9yaWdGaWxlLmNoYXJDb2RlQXQoaGVhZCArIDMpO1xuICAgICAgICAgICAgdmFyIGVuZFBvaW50ID0gaGVhZCArIGxlbmd0aCArIDI7XG4gICAgICAgICAgICB2YXIgc2VnbWVudCA9IG9yaWdGaWxlLnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnN0YXJ0c1dpdGgoXCJcXHhGRlxceEUxXCIpKSBleGlmRGF0YSArPSBzZWdtZW50O1xuICAgICAgICAgICAgaGVhZCA9IGVuZFBvaW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChleGlmRGF0YSA9PSBcIlwiKSByZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG4gICAgdmFyIHJlc2l6ZWRGaWxlID0gd2luZG93LmF0b2IocmVzaXplZEZpbGVCYXNlNjQuc2xpY2UobWFya2VyLmxlbmd0aCkpO1xuICAgIGlmICghcmVzaXplZEZpbGUuc3RhcnRzV2l0aChcIlxceEZGXFx4RDhcXHhGRlwiKSkgcmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuICAgIC8vIFRoZSBmaXJzdCBmaWxlIHNlZ21lbnQgaXMgYWx3YXlzIGhlYWRlciBpbmZvcm1hdGlvbiBzbyBpbnNlcnQgdGhlIEV4aWYgZGF0YSBhcyBzZWNvbmQgc2VnbWVudC5cbiAgICB2YXIgc3BsaXRQb2ludCA9IDQgKyByZXNpemVkRmlsZS5jaGFyQ29kZUF0KDQpICogMjU2ICsgcmVzaXplZEZpbGUuY2hhckNvZGVBdCg1KTtcbiAgICByZXNpemVkRmlsZSA9IHJlc2l6ZWRGaWxlLnNsaWNlKDAsIHNwbGl0UG9pbnQpICsgZXhpZkRhdGEgKyByZXNpemVkRmlsZS5zbGljZShzcGxpdFBvaW50KTtcbiAgICByZXR1cm4gbWFya2VyICsgd2luZG93LmJ0b2EocmVzaXplZEZpbGUpO1xufVxuZnVuY3Rpb24gJDNlZDI2OWYyZjBmYjIyNGIkdmFyJF9fZ3VhcmRfXyh2YWx1ZSwgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCA/IHRyYW5zZm9ybSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiAkM2VkMjY5ZjJmMGZiMjI0YiR2YXIkX19ndWFyZE1ldGhvZF9fKG9iaiwgbWV0aG9kTmFtZSwgdHJhbnNmb3JtKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmpbbWV0aG9kTmFtZV0gPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRyYW5zZm9ybShvYmosIG1ldGhvZE5hbWUpO1xuICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgeyQzZWQyNjlmMmYwZmIyMjRiJGV4cG9ydCQyZTJiY2Q4NzM5YWUwMzkgYXMgZGVmYXVsdCwgJDNlZDI2OWYyZjBmYjIyNGIkZXhwb3J0JDJlMmJjZDg3MzlhZTAzOSBhcyBEcm9wem9uZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcm9wem9uZS5tanMubWFwXG4iLCJjb25zdCBjb25maWd1cmVDbGlwYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29weSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNsaXBib2FyZC10YXJnZXRdJyk7XG5cbiAgICBjb3B5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbi5kYXRhc2V0LmNsaXBib2FyZFRhcmdldCkuaW5uZXJUZXh0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNsaXBib2FyZCBzdWNjZXNzZnVsbHkgc2V0XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnaXMtY29waWVkJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaXMtY29waWVkJyk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZUNsaXBib2FyZDtcbiIsImltcG9ydCB7IERyb3B6b25lIH0gZnJvbSBcIkBkZWx0YWJsb3QvZHJvcHpvbmVcIjtcblxuY29uc3QgYWRkRHJvcHpvbmUgPSAoZWxlbWVudCA9IG51bGwpID0+IHtcbiAgbGV0IGRyb3B6b25lID0gZWxlbWVudDtcblxuICBpZiAoZHJvcHpvbmUgPT09IG51bGwpIHtcbiAgICBkcm9wem9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbXBvbmVudD1kcm9wem9uZV0nKTtcbiAgfVxuXG4gIGlmIChkcm9wem9uZSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGRyb3B6b25lLmRhdGFzZXQuZHJvcHpvbmVDb25maWcgPyBKU09OLnBhcnNlKGRyb3B6b25lLmRhdGFzZXQuZHJvcHpvbmVDb25maWcpIDoge307XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgIGFkZFJlbW92ZUxpbmtzOiBmYWxzZSxcbiAgICAgIG1heEZpbGVzaXplOiAyMCwgLy8gTUJcbiAgICAgIHBhcmFtTmFtZTogJ3VwbG9hZFtmaWxlXScsXG4gICAgICBwcmV2aWV3VGVtcGxhdGU6IGRyb3B6b25lLnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3LXRlbXBsYXRlJykuaW5uZXJIVE1MLFxuICAgICAgdGh1bWJuYWlsV2lkdGg6IDE4MCxcbiAgICAgIHRodW1ibmFpbEhlaWdodDogMTA5LFxuICAgICAgc2VuZGluZyhmaWxlLCB4aHIpIHtcbiAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlPy5maWxlc1swXT8ubGluaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbmZvID0gcmVzcG9uc2UuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICBcIltkYXRhLWR6LWxpbmtdXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LmhyZWYgPSBmaWxlSW5mby5saW5rO1xuICAgICAgICAgICAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWVkaWEtZm9sZGVyXCIsIGZpbGVJbmZvLm1lZGlhRm9sZGVyKTtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lZGlhLXVybFwiLCBmaWxlSW5mby5tZWRpYVVybCk7XG4gICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1tZWRpYS10ZW1wbGF0ZVwiLCBmaWxlSW5mby5tZWRpYVRlbXBsYXRlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlSW5mby5tZWRpYVByZXZpZXcpIHtcbiAgICAgICAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWR6LXRodW1ibmFpbF1cIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudC5pbm5lckhUTUwgPSBmaWxlSW5mby5tZWRpYVByZXZpZXc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgRHJvcHpvbmUoZHJvcHpvbmUsIHsgLi4uZGVmYXVsdENvbmZpZywgLi4uY29uZmlnIH0pO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGREcm9wem9uZTtcbiIsImNvbnN0IHsgalF1ZXJ5LCBBZG1pbiB9ID0gd2luZG93O1xuXG5jb25zdCBGb2xkZXJTZWxlY3RvciA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdmUtZm9ybScpO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJyNtb3ZlX3RvJyk7XG4gICAgdGhpcy5tb2RhbCA9IGZhbHNlO1xuICAgIHRoaXMubW9kYWxDb250ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50Rm9sZGVyID0gZmFsc2U7XG4gIH1cblxuICBmZXRjaEZvbGRlciA9ICh1cmwpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRGb2xkZXIgPSB1cmw7XG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSk7XG4gIH07XG5cbiAgY29uZmlndXJlTW9kYWwgPSAoaHRtbCkgPT4ge1xuICAgIHRoaXMubW9kYWxDb250ZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgQWRtaW4uc2hhcmVkX3NldHVwKHRoaXMubW9kYWwpO1xuICB9O1xuXG4gIGhhbmRsZU1vZGFsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYScpO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0ID09PSBudWxsIHx8XG4gICAgICB0YXJnZXQudGFnTmFtZSAhPT0gJ0EnIHx8XG4gICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYubGVuZ3RoID09PSAwIHx8XG4gICAgICB0YXJnZXQuYXR0cmlidXRlcy5ocmVmLnZhbHVlID09PSAnIydcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHRhcmdldC5kYXRhc2V0LmZvbGRlclBhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gdGhpcyBpcyBub3QgYSBzZWxlY3RhYmxlIG1lZGlhXG4gICAgICB0aGlzLmZldGNoRm9sZGVyKHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpLnRoZW4odGhpcy5jb25maWd1cmVNb2RhbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0LmZvbGRlclBhdGgpO1xuICAgIGpRdWVyeSh0aGlzLm1vZGFsKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgaWYgKGNvbmZpcm0odGFyZ2V0LmRhdGFzZXQuY29uZmlybWF0aW9uKSkge1xuICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb2RhbFN1Ym1pdCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgIC50aGVuKHRoaXMuY29uZmlndXJlTW9kYWwpXG4gICAgO1xuICB9O1xuXG4gIHNldEZpZWxkVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gIH07XG5cbiAgY2hvb3NlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIGluaXRpYWxpemUgY29tcG9uZW50c1xuICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZF9kaWFsb2dfZm9sZGVyLWNob2ljZScpO1xuICAgICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlTW9kYWxDbGljayk7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5oYW5kbGVNb2RhbFN1Ym1pdCk7XG5cbiAgICAgIHRoaXMubW9kYWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ZpZWxkX2RpYWxvZ19mb2xkZXItY2hvaWNlIC5tb2RhbC1ib2R5YCk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgIGpRdWVyeSh0aGlzLm1vZGFsKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIHRoaXMuZmV0Y2hGb2xkZXIoZXZlbnQuY3VycmVudFRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUgKyAnLycgKyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZm9sZGVyKS50aGVuKChodG1sKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU1vZGFsKGh0bWwpO1xuICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCk7XG4gICAgICBBZG1pbi5zZXR1cF9saXN0X21vZGFsKHRoaXMubW9kYWwpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IGNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yID0gKCkgPT4ge1xuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLWNob2ljZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIG5ldyBGb2xkZXJTZWxlY3RvcigpLmNob29zZShlKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVGb2xkZXJTZWxlY3RvcjtcbiIsImNvbnN0IHsgalF1ZXJ5LCBBZG1pbiB9ID0gd2luZG93O1xuXG5jb25zdCBNZWRpYVNlbGVjdG9yID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihtZWRpYUNob2ljZUNvbnRhaW5lcikge1xuICAgIHRoaXMubWVkaWFDaG9pY2VDb250YWluZXIgPSBtZWRpYUNob2ljZUNvbnRhaW5lcjtcbiAgICB0aGlzLmRlbGV0ZUJ1dHRvbiA9IG1lZGlhQ2hvaWNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5qcy1qb2xpLW1lZGlhLWNob2ljZS1kZWxldGUnKTtcbiAgICB0aGlzLmVkaXRCdXR0b24gPSBtZWRpYUNob2ljZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuanMtam9saS1tZWRpYS1jaG9pY2UtZWRpdCcpO1xuICAgIHRoaXMuaWQgPSBtZWRpYUNob2ljZUNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG4gICAgdGhpcy5tZWRpYUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBqb2xpLW1lZGlhLWNvbnRhaW5lcl8ke3RoaXMuaWR9YCk7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICB0aGlzLm1vZGFsID0gZmFsc2U7XG4gICAgdGhpcy5tb2RhbENvbnRlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRGb2xkZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGZldGNoRm9sZGVyID0gKHVybCkgPT4ge1xuICAgIHRoaXMuY3VycmVudEZvbGRlciA9IHVybDtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcbiAgfTtcblxuICBjb25maWd1cmVNb2RhbCA9IChodG1sKSA9PiB7XG4gICAgdGhpcy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBBZG1pbi5zaGFyZWRfc2V0dXAodGhpcy5tb2RhbCk7XG4gIH07XG5cbiAgaGFuZGxlTW9kYWxDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhJyk7XG5cbiAgICBpZiAoXG4gICAgICB0YXJnZXQgPT09IG51bGwgfHxcbiAgICAgIHRhcmdldC50YWdOYW1lICE9PSAnQScgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGFyZ2V0LmF0dHJpYnV0ZXMuaHJlZi5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRhcmdldC5hdHRyaWJ1dGVzLmhyZWYudmFsdWUgPT09ICcjJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIHRoaXMgaXMgbm90IGEgc2VsZWN0YWJsZSBtZWRpYVxuICAgICAgdGhpcy5mZXRjaEZvbGRlcih0YXJnZXQuYXR0cmlidXRlcy5ocmVmLnZhbHVlKS50aGVuKHRoaXMuY29uZmlndXJlTW9kYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubWVkaWFDb250YWluZXIuaW5uZXJIVE1MID0gdGFyZ2V0LmRhdGFzZXQubWVkaWFUZW1wbGF0ZTtcbiAgICB0aGlzLm1lZGlhQ2hvaWNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgdGhpcy5zZXRGaWVsZFZhbHVlKHRhcmdldC5kYXRhc2V0Lm1lZGlhVXJsKTtcbiAgICB0aGlzLmVkaXRCdXR0b24uZGF0YXNldC5mb2xkZXIgPSB0YXJnZXQuZGF0YXNldC5tZWRpYUZvbGRlcjtcbiAgICBqUXVlcnkodGhpcy5tb2RhbCkubW9kYWwoJ2hpZGUnKTtcbiAgfTtcblxuICBoYW5kbGVNb2RhbFN1Ym1pdCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGNvbnN0IHVybCA9IGZvcm0uYWN0aW9uO1xuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgLnRoZW4odGhpcy5jb25maWd1cmVNb2RhbClcbiAgICA7XG4gIH07XG5cbiAgc2V0RmllbGRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcbiAgfTtcblxuICBjaG9vc2UoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjb21wb25lbnRzXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpZWxkX2RpYWxvZ18ke3RoaXMuaWR9YCk7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVNb2RhbENsaWNrKTtcbiAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmhhbmRsZU1vZGFsU3VibWl0KTtcblxuICAgICAgdGhpcy5tb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZmllbGRfZGlhbG9nXyR7dGhpcy5pZH0gLm1vZGFsLWJvZHlgKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxDb250ZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgdGhpcy5mZXRjaEZvbGRlcih0aGlzLmVkaXRCdXR0b24uYXR0cmlidXRlcy5ocmVmLnZhbHVlICsgJy8nICsgdGhpcy5lZGl0QnV0dG9uLmRhdGFzZXQuZm9sZGVyKS50aGVuKChodG1sKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU1vZGFsKGh0bWwpO1xuICAgICAgalF1ZXJ5KHRoaXMubW9kYWwpLm1vZGFsKCk7XG4gICAgICBBZG1pbi5zZXR1cF9saXN0X21vZGFsKHRoaXMubW9kYWwpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMubWVkaWFDaG9pY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0ZW1wbGF0ZS1udWxsLWxhYmVsLSR7dGhpcy5pZH1gKTtcbiAgICB0aGlzLm1lZGlhQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5tZWRpYUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLmVkaXRCdXR0b24uZGF0YXNldC5mb2xkZXIgPSAnJztcbiAgICB0aGlzLnNldEZpZWxkVmFsdWUoJycpO1xuICB9XG59XG5cbmNvbnN0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IgPSAoKSA9PiB7XG4gIGNvbnN0IG1lZGlhU2VsZWN0b3JzID0ge307XG5cbiAgY29uc3QgZ2V0TWVkaWFTZWxlY3RvciA9IChub2RlKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5jbG9zZXN0KCcuanMtam9saS1tZWRpYS1jaG9pY2UtY29udGFpbmVyJyk7XG4gICAgY29uc3QgbWVkaWFJZCA9IGNvbnRhaW5lci5kYXRhc2V0Lm1lZGlhSWQ7XG5cbiAgICBpZiAoIW1lZGlhU2VsZWN0b3JzW21lZGlhSWRdKSB7XG4gICAgICBtZWRpYVNlbGVjdG9yc1ttZWRpYUlkXSA9IG5ldyBNZWRpYVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhU2VsZWN0b3JzW21lZGlhSWRdO1xuICB9XG5cbiAgalF1ZXJ5KGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWpvbGktbWVkaWEtY2hvaWNlLWRlbGV0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZ2V0TWVkaWFTZWxlY3RvcihlLnRhcmdldCkuZGVsZXRlKGUpO1xuICB9KTtcblxuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtam9saS1tZWRpYS1jaG9pY2UtZWRpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZ2V0TWVkaWFTZWxlY3RvcihlLnRhcmdldCkuY2hvb3NlKGUpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3I7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc3R5bGVzL2pvbGltZWRpYS5jc3MnO1xuaW1wb3J0IGFkZERyb3B6b25lIGZyb20gJy4vY29tcG9uZW50cy9kcm9wem9uZSc7XG5pbXBvcnQgY29uZmlndXJlRm9sZGVyU2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL2ZvbGRlclNlbGVjdG9yJztcbmltcG9ydCBjb25maWd1cmVNZWRpYVNlbGVjdG9yIGZyb20gJy4vY29tcG9uZW50cy9tZWRpYVNlbGVjdG9yJztcbmltcG9ydCBjb25maWd1cmVDbGlwYm9hcmQgZnJvbSAnLi9jb21wb25lbnRzL2NsaXBib2FyZCc7XG5cbmNvbnN0IHsgalF1ZXJ5IH0gPSB3aW5kb3c7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yKCk7XG4gIGNvbmZpZ3VyZU1lZGlhU2VsZWN0b3IoKTtcbiAgY29uZmlndXJlQ2xpcGJvYXJkKCk7XG4gIGxldCBkcm9wem9uZUluc3RhbmNlID0gbnVsbDtcblxuICBjb25zdCBzd2l0Y2hUb29sID0gKHRhcmdldCwgY3VycmVudFRvb2wpID0+IHtcbiAgICBjb25zdCBoZWFkZXJUb29scyA9IHRhcmdldC5jbG9zZXN0KCcuam9saS1tZWRpYS1oZWFkZXItdG9vbHMnKTtcbiAgICBsZXQgYWN0aXZlVG9vbCA9IG51bGw7XG5cbiAgICBmb3IgKGNvbnN0IHRvb2wgb2YgWydkcm9wem9uZScsICduZXctZGlyZWN0b3J5JywgJ3JlbmFtZS1kaXJlY3RvcnknXSkge1xuICAgICAgY29uc3QgdG9vbENvbnRhaW5lciA9IGhlYWRlclRvb2xzLnF1ZXJ5U2VsZWN0b3IoJy4nICsgdG9vbCArICctY29udGFpbmVyJyk7XG5cbiAgICAgIGlmICh0b29sQ29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0b29sICE9PSBjdXJyZW50VG9vbCkge1xuICAgICAgICAgIHRvb2xDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0b29sICsgJy1hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b29sQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUodG9vbCArICctYWN0aXZlJyk7XG4gICAgICAgICAgYWN0aXZlVG9vbCA9IHRvb2xDb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aXZlVG9vbDtcbiAgfTtcblxuICBqUXVlcnkoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcG9uZW50PWZvbGRlci1jcmVhdGVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBmb2xkZXJDcmVhdGVGb3JtID0gc3dpdGNoVG9vbChlLnRhcmdldCwgJ25ldy1kaXJlY3RvcnknKTtcbiAgICBmb2xkZXJDcmVhdGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKS5mb2N1cygpO1xuICB9KTtcblxuICBqUXVlcnkoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcG9uZW50PWZvbGRlci1yZW5hbWVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IGZvbGRlclJlbmFtZUZvcm0gPSBzd2l0Y2hUb29sKGUudGFyZ2V0LCAncmVuYW1lLWRpcmVjdG9yeScpO1xuICAgIGZvbGRlclJlbmFtZUZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLmZvY3VzKCk7XG4gIH0pO1xuXG4gIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9Zm9sZGVyLWRlbGV0ZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGNvbmZpcm0oZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29uZmlybSkpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZWxldGUtZGlyZWN0b3J5LWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wb25lbnQ9bWVkaWEtYWRkXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCBkcm9wem9uZSA9IHN3aXRjaFRvb2woZS50YXJnZXQsICdkcm9wem9uZScpO1xuXG4gICAgaWYgKCFkcm9wem9uZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B6b25lLWluaXRpYWxpemVkJykpIHtcbiAgICAgIGRyb3B6b25lSW5zdGFuY2UgPSBhZGREcm9wem9uZShkcm9wem9uZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21wb25lbnQ9ZHJvcHpvbmVdJykpO1xuICAgICAgZHJvcHpvbmUuY2xhc3NMaXN0LmFkZCgnZHJvcHpvbmUtaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWRyb3B6b25lLmNsYXNzTGlzdC5jb250YWlucygnZHJvcHpvbmUtYWN0aXZlJykpIHtcbiAgICAgIGRyb3B6b25lSW5zdGFuY2UucmVtb3ZlQWxsRmlsZXModHJ1ZSk7XG4gICAgfVxuICB9KTtcblxuICBqUXVlcnkoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcG9uZW50PW1lZGlhLXJlbmFtZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgY29uc3QgaGVhZGVyVG9vbHMgPSBlLnRhcmdldC5jbG9zZXN0KCcuY29udGVudC1oZWFkZXInKTtcbiAgICBjb25zdCBmaWxlUmVuYW1lRm9ybSA9IGhlYWRlclRvb2xzLnF1ZXJ5U2VsZWN0b3IoJy5yZW5hbWUtZmlsZS1jb250YWluZXInKTtcblxuICAgIGZpbGVSZW5hbWVGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ3JlbmFtZS1hY3RpdmUnKTtcbiAgICBmaWxlUmVuYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykuZm9jdXMoKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJjb25maWd1cmVDbGlwYm9hcmQiLCJjb3B5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImJ1dHRvbiIsImN1cnJlbnRUYXJnZXQiLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJxdWVyeVNlbGVjdG9yIiwiZGF0YXNldCIsImNsaXBib2FyZFRhcmdldCIsImlubmVyVGV4dCIsInRoZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiRHJvcHpvbmUiLCJhZGREcm9wem9uZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImRyb3B6b25lIiwiY29uZmlnIiwiZHJvcHpvbmVDb25maWciLCJKU09OIiwicGFyc2UiLCJkZWZhdWx0Q29uZmlnIiwiYWRkUmVtb3ZlTGlua3MiLCJtYXhGaWxlc2l6ZSIsInBhcmFtTmFtZSIsInByZXZpZXdUZW1wbGF0ZSIsImlubmVySFRNTCIsInRodW1ibmFpbFdpZHRoIiwidGh1bWJuYWlsSGVpZ2h0Iiwic2VuZGluZyIsImZpbGUiLCJ4aHIiLCJwcmV2aWV3RWxlbWVudCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJfcmVzcG9uc2UkZmlsZXMkIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJmaWxlcyIsImxpbmsiLCJmaWxlSW5mbyIsImxpbmtFbGVtZW50IiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsIm1lZGlhRm9sZGVyIiwibWVkaWFVcmwiLCJtZWRpYVRlbXBsYXRlIiwibWVkaWFQcmV2aWV3IiwiX29iamVjdFNwcmVhZCIsIl93aW5kb3ciLCJ3aW5kb3ciLCJqUXVlcnkiLCJBZG1pbiIsIkZvbGRlclNlbGVjdG9yIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJ1cmwiLCJjdXJyZW50Rm9sZGVyIiwiZmV0Y2giLCJ0ZXh0IiwiaHRtbCIsIm1vZGFsQ29udGVudCIsInNoYXJlZF9zZXR1cCIsIm1vZGFsIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRhZ05hbWUiLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJzdG9wUHJvcGFnYXRpb24iLCJmb2xkZXJQYXRoIiwiZmV0Y2hGb2xkZXIiLCJjb25maWd1cmVNb2RhbCIsInNldEZpZWxkVmFsdWUiLCJjb25maXJtIiwiY29uZmlybWF0aW9uIiwiZm9ybSIsInN1Ym1pdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhY3Rpb24iLCJtZXRob2QiLCJib2R5IiwiaGVhZGVycyIsImlucHV0RWxlbWVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImdldEVsZW1lbnRCeUlkIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwiY2hvb3NlIiwiX3RoaXMyIiwiaGFuZGxlTW9kYWxDbGljayIsImhhbmRsZU1vZGFsU3VibWl0IiwiYXBwZW5kQ2hpbGQiLCJlIiwiZm9sZGVyIiwic2V0dXBfbGlzdF9tb2RhbCIsImNvbmZpZ3VyZUZvbGRlclNlbGVjdG9yIiwib24iLCJNZWRpYVNlbGVjdG9yIiwibWVkaWFDaG9pY2VDb250YWluZXIiLCJtZWRpYUNvbnRhaW5lciIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJpZCIsIm1lZGlhSWQiLCJjb25jYXQiLCJkZWxldGUiLCJ0ZW1wbGF0ZSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJjb25maWd1cmVNZWRpYVNlbGVjdG9yIiwibWVkaWFTZWxlY3RvcnMiLCJnZXRNZWRpYVNlbGVjdG9yIiwibm9kZSIsImNvbnRhaW5lciIsImRyb3B6b25lSW5zdGFuY2UiLCJzd2l0Y2hUb29sIiwiY3VycmVudFRvb2wiLCJoZWFkZXJUb29scyIsImFjdGl2ZVRvb2wiLCJfaSIsIl9hcnIiLCJ0b29sIiwidG9vbENvbnRhaW5lciIsInRvZ2dsZSIsImZvbGRlckNyZWF0ZUZvcm0iLCJmb2N1cyIsImZvbGRlclJlbmFtZUZvcm0iLCJjb250YWlucyIsInJlbW92ZUFsbEZpbGVzIiwiZmlsZVJlbmFtZUZvcm0iXSwic291cmNlUm9vdCI6IiJ9