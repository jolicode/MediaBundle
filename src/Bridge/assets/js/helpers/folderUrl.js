// The templates render the media picker URLs with a "__FOLDER__" placeholder, because
// the folder to open is only known on the client side. The placeholder is used instead
// of a plain concatenation so that the same markup works with the pretty URLs generated
// by EasyAdmin (/admin/media/choose-file/__FOLDER__) and with the legacy ones
// (/admin?routeName=…&routeParams%5Bkey%5D=__FOLDER__).
const FOLDER_PLACEHOLDER = "__FOLDER__";

// slashes are left as-is: they are legal in both a path segment matching ".*" and
// in a query string value
const buildFolderUrl = (template, folder) =>
    template.replace(
        FOLDER_PLACEHOLDER,
        encodeURIComponent(folder || "").replace(/%2F/g, "/"),
    );

export default buildFolderUrl;
