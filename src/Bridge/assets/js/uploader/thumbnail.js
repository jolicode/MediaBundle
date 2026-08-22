// Computes the source rectangle to read from the image so that it fills the
// target box entirely, cropping the overflowing side and keeping the center.
const cropInfo = (sourceWidth, sourceHeight, width, height) => {
  const info = {
    srcX: 0,
    srcY: 0,
    srcWidth: sourceWidth,
    srcHeight: sourceHeight,
  };
  const srcRatio = sourceWidth / sourceHeight;

  // never upscale
  const trgWidth = Math.min(width, sourceWidth);
  const trgHeight = Math.min(height, sourceHeight);
  const trgRatio = trgWidth / trgHeight;

  if (sourceWidth > trgWidth || sourceHeight > trgHeight) {
    if (srcRatio > trgRatio) {
      info.srcHeight = sourceHeight;
      info.srcWidth = info.srcHeight * trgRatio;
    } else {
      info.srcWidth = sourceWidth;
      info.srcHeight = info.srcWidth / trgRatio;
    }
  }

  info.srcX = (sourceWidth - info.srcWidth) / 2;
  info.srcY = (sourceHeight - info.srcHeight) / 2;
  info.trgWidth = trgWidth;
  info.trgHeight = trgHeight;

  return info;
};

// Reads the file and hands a data URL suitable for an <img> src to the callback.
// SVG and GIF are passed through untouched: the former is a vector, the latter
// would lose its animation through the canvas.
const createThumbnail = (file, width, height, callback) => {
  const fileReader = new FileReader();

  fileReader.onload = () => {
    file.dataURL = fileReader.result;

    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      callback(fileReader.result);

      return;
    }

    // not using "new Image" because of a bug in some Chrome versions
    const img = document.createElement('img');

    img.onload = () => {
      const info = cropInfo(img.width, img.height, width, height);
      const canvas = document.createElement('canvas');

      canvas.width = info.trgWidth;
      canvas.height = info.trgHeight;

      canvas
        .getContext('2d')
        .drawImage(
          img,
          info.srcX,
          info.srcY,
          info.srcWidth,
          info.srcHeight,
          0,
          0,
          info.trgWidth,
          info.trgHeight,
        );

      callback(canvas.toDataURL('image/png'));
    };

    // a file the browser cannot decode simply gets no thumbnail
    img.onerror = () => callback(null);
    img.src = file.dataURL;
  };

  fileReader.onerror = () => callback(null);
  fileReader.readAsDataURL(file);
};

export default createThumbnail;
