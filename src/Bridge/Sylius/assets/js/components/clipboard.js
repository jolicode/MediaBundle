const configureClipboard = () => {
    const copy = document.querySelectorAll('[data-clipboard-target]');

    copy.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            const label = button.querySelector('.btn-label');
            const originalText = label.textContent;

            navigator.clipboard.writeText(document.querySelector(button.dataset.clipboardTarget).innerText).then(() => {
                button.classList.add('is-copied');
                if (button.dataset.clipboardCopied) {
                    label.textContent = button.dataset.clipboardCopied;
                }
                setTimeout(() => {
                    button.classList.remove('is-copied');
                    label.textContent = originalText;
                }, 1000);
            });
        });
    });
};

export default configureClipboard;
