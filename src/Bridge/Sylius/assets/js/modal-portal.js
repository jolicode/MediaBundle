/**
 * Copied from Sylius waiting for a new bugfix release (v2.2.6)
 * https://github.com/Sylius/Sylius/pull/18989
 */
document.addEventListener('show.bs.modal', function (event) {
    if (event.target.parentElement !== document.body) {
        document.body.appendChild(event.target);
    }
});
