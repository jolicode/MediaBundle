// Helpers shared by the folder and media selector modals, whose content is
// re-rendered server-side on every navigation.

export const fetchFolder = (url) => fetch(url).then((response) => response.text());

// Appends the current search to a folder URL, leaving it untouched when no
// search is active.
export const getSearchUrl = (baseUrl, query) => {
    if (!query) return baseUrl;

    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('query', query);

    return `${url.pathname}${url.search}${url.hash}`;
};

// The folder URL must not retain pagination or search parameters, so that
// a new search (or clearing the search) always starts back at page 1
export const getFolderUrl = (href) => {
    const url = new URL(href, window.location.origin);
    url.searchParams.delete('page');
    url.searchParams.delete('query');

    return `${url.pathname}${url.search}${url.hash}`;
};

// Tells whether a click landed on a link the modal should handle itself.
export const isSelectableLink = (target) =>
    target !== null &&
    target.tagName === 'A' &&
    target.attributes.href !== undefined &&
    target.attributes.href.length !== 0 &&
    target.attributes.href.value !== '#';

export const setFieldValue = (input, value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
};
