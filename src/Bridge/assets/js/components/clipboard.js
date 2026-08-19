const DEFAULT_DELAY = 2000;

// Copies the content of the element targeted by "data-clipboard-target" and
// flags the button with "data-copied" while the feedback is shown. When the
// button holds a "data-clipboard-label" element and a "data-clipboard-copied"
// message, its label is swapped for the same duration.
const configureClipboard = () => {
    const copy = document.querySelectorAll('[data-clipboard-target]');

    copy.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            const label = button.querySelector('[data-clipboard-label]');
            const originalText = label ? label.textContent : null;
            const delay = button.dataset.clipboardDelay ? parseInt(button.dataset.clipboardDelay, 10) : DEFAULT_DELAY;

            navigator.clipboard.writeText(document.querySelector(button.dataset.clipboardTarget).innerText).then(() => {
                button.toggleAttribute('data-copied', true);

                if (label && button.dataset.clipboardCopied) {
                    label.textContent = button.dataset.clipboardCopied;
                }

                setTimeout(() => {
                    button.toggleAttribute('data-copied', false);

                    if (label) {
                        label.textContent = originalText;
                    }
                }, delay);
            });
        });
    });
};

export default configureClipboard;
