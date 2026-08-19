// Builds a DOM element out of an HTML string.
export const createElement = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.childNodes[0];
};

// Returns a human readable file size, using powers of 1000 (kb, mb…), as the
// "file too big" message expresses its limit in the same unit.
const FILESIZE_BASE = 1000;
const FILESIZE_UNITS = {
  tb: 'TB',
  gb: 'GB',
  mb: 'MB',
  kb: 'KB',
  b: 'b',
};

export const filesize = (size) => {
  let selectedSize = 0;
  let selectedUnit = 'b';

  if (size > 0) {
    const units = ['tb', 'gb', 'mb', 'kb', 'b'];

    for (let i = 0; i < units.length; i++) {
      const cutoff = Math.pow(FILESIZE_BASE, 4 - i) / 10;

      if (size >= cutoff) {
        selectedSize = size / Math.pow(FILESIZE_BASE, 4 - i);
        selectedUnit = units[i];
        break;
      }
    }

    selectedSize = Math.round(10 * selectedSize) / 10;
  }

  return `<strong>${selectedSize}</strong> ${FILESIZE_UNITS[selectedUnit]}`;
};

// Checks a file against a comma separated list of accepted types, which may
// hold extensions (".png"), wildcards ("image/*") or full mime types.
export const isAcceptedType = (file, acceptedFiles) => {
  if (!acceptedFiles) {
    return true;
  }

  const mimeType = file.type;
  const baseMimeType = mimeType.replace(/\/.*$/, '');

  for (let validType of acceptedFiles.split(',')) {
    validType = validType.trim();

    if (validType.charAt(0) === '.') {
      const name = file.name.toLowerCase();

      if (name.indexOf(validType.toLowerCase(), name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      if (baseMimeType === validType.replace(/\/.*$/, '')) {
        return true;
      }
    } else if (mimeType === validType) {
      return true;
    }
  }

  return false;
};

// Replaces the "{{placeholder}}" markers of a translated message. The marker
// names are part of the translation contract and must not be renamed.
export const interpolate = (message, replacements) =>
  Object.entries(replacements).reduce(
    (result, [name, value]) => result.replace(`{{${name}}}`, value),
    message,
  );
