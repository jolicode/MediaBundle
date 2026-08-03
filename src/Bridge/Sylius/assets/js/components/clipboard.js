const configureClipboard = () => {
    const copy = document.querySelectorAll('[data-clipboard-target]');

    copy.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            const label = button.querySelector('[data-clipboard-label]');
            const originalText = label.textContent;

            navigator.clipboard.writeText(document.querySelector(button.dataset.clipboardTarget).innerText).then(() => {
                button.toggleAttribute('data-copied', true);
                if (button.dataset.clipboardCopied) {
                    label.textContent = button.dataset.clipboardCopied;
                }
                setTimeout(() => {
                    button.toggleAttribute('data-copied', false);
                    label.textContent = originalText;
                }, 1000);
            });
        });
    });
};

export default configureClipboard;
